<script setup lang="ts">
import { onMounted, ref } from "vue";
import Header from "../components/Header.vue";
import Cell from "../components/Cell.vue";
import axios from "axios";

const date = new Date();
const incomeItems = ref();
const purchaseItems = ref();
const reloadKey = ref(0);
const yd = ref(date.getFullYear() + "-" + ("00" + (date.getMonth()+1)).slice(-2));
const year = ref(String(date.getFullYear()));
const month = ref(("00" + (date.getMonth()+1)).slice(-2));
const total = ref(0);
const incomeTotal = ref(0);
const purchaseTotal = ref(0);

onMounted(async () => {
  const incomeRes = await axios.get(`http://localhost:3000/incomes?year=${year.value}&month=${month.value}`);
  incomeItems.value = incomeRes.data;
  for (let i = 0; i < incomeRes.data.length; i++) {
    incomeTotal.value += incomeRes.data[i].value;
  }
  const purchaseRes = await axios.get(`http://localhost:3000/purchases?year=${year.value}&month=${month.value}`);
  purchaseItems.value = purchaseRes.data;
  for (let i = 0; i < purchaseRes.data.length; i++) {
    purchaseTotal.value += purchaseRes.data[i].value;
  }
  total.value = incomeTotal.value - purchaseTotal.value;
})

const reloadIncomeItems = async () => {
  const res = await axios.get(`http://localhost:3000/incomes?year=${year.value}&month=${month.value}`);
  incomeItems.value = res.data;
  incomeTotal.value = 0;
  for (let i = 0; i < res.data.length; i++) {
    incomeTotal.value += res.data[i].value;
  }
  total.value = incomeTotal.value - purchaseTotal.value;
  reloadKey.value += 1;
}

const reloadPurchaseItems = async () => {
  const res = await axios.get(`http://localhost:3000/purchases?year=${year.value}&month=${month.value}`);
  purchaseItems.value = res.data;
  purchaseTotal.value = 0
  for (let i = 0; i < res.data.length; i++) {
    purchaseTotal.value += res.data[i].value;
  }
  total.value = incomeTotal.value - purchaseTotal.value;
  reloadKey.value += 1;
}

const reloadItems = async () => {
  incomeTotal.value = 0;
  purchaseTotal.value = 0;
  year.value = yd.value.substring(0,4);
  month.value = yd.value.substring(5,7);
  if (yd.value) {
    await reloadIncomeItems();
    await reloadPurchaseItems();
  } else {
    incomeItems.value = {};
    purchaseItems.value = {};
  }
  total.value = incomeTotal.value - purchaseTotal.value;
}
</script>

<template>
  <Header />
  <div class="flex flex-col">
    <input @change="reloadItems" class="text-4xl w-2/5 mx-auto border-2 rounded-md py-4" type="month" v-model="yd">
    <h1 class="text-4xl text-center">合計：￥{{ total.toLocaleString() }}</h1>
  </div>
  <div class="grid grid-cols-2 mx-2">
    <div class="container mr-2">
      <h1 class="text-3xl text-center">収入</h1>
      <h1 class="text-3xl text-center">収入合計：￥{{ incomeTotal.toLocaleString() }}</h1>
      <div :key="reloadKey" class="flex flex-col">
        <Cell @reload="reloadIncomeItems" v-for="item in incomeItems" :id="item.id" :name="item.name" :date="item.date" :value="item.value" cat="incomes" />
      </div>
    </div>
    <div class="container ml-2">
      <h1 class="text-3xl text-center">支出</h1>
      <h1 class="text-3xl text-center">支出合計：￥{{ purchaseTotal.toLocaleString() }}</h1>
      <div :key="reloadKey" class="flex flex-col">
        <Cell @reload="reloadPurchaseItems" v-for="item in purchaseItems" :id="item.id" :name="item.name" :date="item.date" :value="item.value" cat="purchases" />
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
