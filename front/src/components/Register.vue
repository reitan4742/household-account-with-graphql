<script setup lang="ts">
import { ref } from 'vue';
import axios from "axios";
const props = defineProps(["cat"]);
const emit = defineEmits(["reload"]);
const name = ref();
const date = ref();
const value = ref();
const isOpen = ref(false);

const submit = () => {
  axios({
    url: "http://localhost:4000/graphql",
    method: "POST",
    data: {
      mutation: `
      mutation ADDIncome {
        createIncome(createIncomeInput: {
          name: "aa"
          date: "2023-11-25"
          value: 10000
        })
        {
          id
          name
          date
          value
        }
      }
      `
    },
  })
  .then(function (res) {
    console.log(res);
    isOpen.value = false;
    emit("reload");
  })
  .catch(function (error) {
    console.log(error);
  });
}
</script>

<template>
  <div v-show="isOpen" class="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
    <div class="bg-white rounded-lg text-2xl w-1/2 flex flex-col relative">
      <button @click="isOpen = false" class="absolute top-0 right-0 rounded-md hover:bg-red-600 hover:text-white text-md w-6">✖</button>
      <input type="text" v-model="name" class="text-center w-1/2 mx-auto border-2 rounded-md mt-4 mb-2">
      <input type="date" v-model="date" class="text-center w-1/2 mx-auto border-2 rounded-md mb-2">
      <input type="number" v-model="value" class="text-center w-1/2 mx-auto border-2 rounded-md mb-8">
      <div class="flex mb-4">
        <button @click="submit" class="text-white bg-green-500 hover:bg-green-700 flex-1 rounded-lg mx-24">登録</button>
      </div>
    </div>
  </div>
  <button @click="isOpen = true" class="w-1/4 my-2 mx-auto rounded-lg text-white bg-green-500 text-2xl">新規登録</button>
</template>