<script setup lang="ts">
import { onMounted } from 'vue';
import moment from "moment";


onMounted(() => {
  const date = moment().startOf("month");
  const tmp = date.day();
  console.log(date.subtract(tmp, "days"));
});
</script>

<template>
</template>