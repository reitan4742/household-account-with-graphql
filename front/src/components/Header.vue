<script setup lang="ts">
</script>

<template>
  <nav class="bg-white border-gray-200 border-b-2 mb-4">
    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <a href="/home" class="flex items-center space-x-3 rtl:space-x-reverse">
          <span class="self-center text-2xl font-bold whitespace-nowrap">家計簿アプリ</span>
      </a>
      <div class="hidden w-full md:block md:w-auto" id="navbar-default">
        <ul class="font-medium flex flex-cols">
          <li>
            <a href="/home" class="block py-2 px-3 rounded hover:text-blue-600">Home</a>
          </li>
          <li>
            <a href="/incomes" class="block py-2 px-3 rounded hover:text-blue-600">Incomes</a>
          </li>
          <li>
            <a href="/purchases" class="block py-2 px-3 rounded hover:text-blue-600">Purchases</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>