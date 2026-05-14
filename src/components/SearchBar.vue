<template>
  <div class="flex w-full p-2 gap-1">
    <input type="text" class="flex-1 p-2 rounded-md bg-gray-200 text-blue-600" v-model="model" />
    <button
      @click="$emit('clear')"
      type="button"
      class="p-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition"
    >
      Очистить
    </button>
    <button
      @click="$emit('search')"
      type="button"
      class="p-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
    >
      Поиск
    </button>
  </div>
</template>

<script setup lang="ts">
const model = defineModel<string>({ required: true })

defineProps(['query'])
defineEmits(['clear', 'search'])
</script>
