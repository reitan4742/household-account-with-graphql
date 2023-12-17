<script setup lang="ts">
import { ref } from 'vue';
import axios from "axios";
const props = defineProps(["id", "name", "date", "value", "cat"]);
const name = ref(props.name);
const date = ref(props.date);
const value = ref(props.value);
const emit = defineEmits(["reload"]);
const isOpen = ref(false);

const del = () => {
  axios.delete(`http://localhost:3000/${props.cat}/${props.id}`)
  .then(function (res) {
    console.log(res);
    isOpen.value = false;
    emit("reload");
  }).catch(function (error) {
    console.log(error);
  });
}

const update = () => {
  axios.put(`http://localhost:3000/${props.cat}/${props.id}`, {
    name: name.value,
    date: date.value,
    value: value.value
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
      <input type="text" class="text-center w-1/2 mx-auto border-2 rounded-md mt-4 mb-2" v-model="name">
      <input type="date" class="text-center w-1/2 mx-auto border-2 rounded-md mb-2" v-model="date">
      <input type="number" class="text-center w-1/2 mx-auto border-2 rounded-md mb-8" v-model="value">
      <div class="flex mb-4">
        <button @click="del" class="text-white bg-red-500 hover:bg-red-700 flex-1 rounded-lg mx-2">削除</button>
        <button @click="update" class="text-white bg-blue-500 hover:bg-blue-700 flex-1 rounded-lg mx-2">変更</button>
      </div>
    </div>
  </div>
  <button @click="isOpen = true" class="hover:bg-blue-500 rounded-lg">
    <div class="grid grid-cols-3 border-b-2 mt-2">
      <div class="text-2xl">{{  props.name }}</div>
      <div class="text-2xl">{{ props.date.substr(0,4) }}/{{ props.date.substr(5,2) }}/{{ props.date.substr(8,2) }}</div>
      <div class="text-2xl">￥{{  props.value.toLocaleString() }}</div>
    </div>
  </button>
</template>