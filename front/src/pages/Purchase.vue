<script setup lang="ts">
import { onMounted, ref } from "vue";
import Cell from "../components/Cell.vue";
import Header from "../components/Header.vue";
import Register from "../components/Register.vue";
import axios from "axios";
const items = ref();
let reloadKey = ref(0);

onMounted(async () => {
  const res = await axios({
    url: "http://localhost:4000/graphql",
    method: "POST",
    data: {
      query: `
      query {
        purchases(orderBy: "ASC") {
          id
          name
          date
          value
        }
      }`,
    },
  });
  items.value = res.data.data.purchases;
});

const reload = async () => {
  const res = await axios({
    url: "http://localhost:4000/graphql",
    method: "POST",
    data: {
      query: `
      query {
        purchases(orderBy: "ASC") {
          id
          name
          date
          value
        }
      }`,
    },
  });
  items.value = res.data.data.purchases;
  reloadKey.value += 1;
}
</script>

<template>
  <Header />
  <div class="flex flex-col">
    <h1 class="text-4xl font-bold text-center">支出一覧</h1>
    <Register @reload="reload" cat="purchases" />
  </div>
  <div class="container mx-auto">
    <div :key="reloadKey" class="flex flex-col">
      <Cell @reload="reload" v-for="item in items" :id="item.id" :name="item.name" :date="item.date" :value="item.value" cat="purchases" />
    </div>
  </div>
</template>

<style scoped>
</style>