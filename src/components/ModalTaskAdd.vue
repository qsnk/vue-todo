<template>
  <Teleport to="body">
    <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center p-4 font-mono">
      <div class="fixed inset-0 bg-black/50" @click="$emit('close')"></div>

      <div class="relative bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <h3 class="text-lg text-center font-bold mb-4">
          <slot name="header">Заголовок по умолчанию</slot>
        </h3>

        <div class="mb-6">
          <div class="flex flex-col my-4">
            <label>Заголовок</label>
            <input type="text" class="border border-blue-500" v-model="title" />
          </div>
          <div class="flex flex-col my-4">
            <label>Описание</label>
            <input type="text" class="border border-blue-500" v-model="description" />
          </div>
        </div>
        <div class="flex gap-2">
          <button
            @click="$emit('close')"
            class="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition"
          >
            Закрыть
          </button>
          <button
            @click="handleSave"
            class="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Сохранить
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const title = ref<string>('')
const description = ref<string>('')

defineProps(['show'])
const emit = defineEmits(['close', 'save'])

const handleSave = () => {
  emit('save', { title: title, description: description })
}
</script>
