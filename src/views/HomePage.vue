<template>
  <div class="flex my-2 justify-center">
    <h1 class="text-2xl">Задачник</h1>
  </div>
  <div class="flex w-full p-2 gap-1">
    <input type="text" class="flex-1 p-2 rounded-md bg-gray-200 text-blue-600" />
    <button
      @click="searchTodo"
      type="button"
      class="p-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
    >
      Поиск
    </button>
  </div>
  <div v-if="!isTodoEmpty">
    <div class="flex gap-2">
      <span class="flex text-center">Всего задач: {{ todos.length }}</span>
      <button
        @click="isModalOpen = true"
        class="w-10 h-10 p-2 border border-blue-600 rounded-md bg-white text-blue-600 hover:bg-blue-700 hover:text-white transition"
      >
        +
      </button>
      <Modal :show="isModalOpen" @close="isModalOpen = false" @save="handleSave">
        <template #header>Добавление задачи</template>
      </Modal>
    </div>

    <div class="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1">
      <div
        v-for="item in todos"
        :key="item.id"
        class="flex mx-4 my-2 p-4 rounded-md justify-between bg-gray-200 border border-blue-500 shadow-sm"
      >
        <p class="flex text-sm items-center text-center">Title: {{ item.title }}</p>
        <p class="flex text-sm items-center text-center">id: {{ item.id }}</p>
        <div class="flex gap-1">
          <button
            type="button"
            class="p-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Show
          </button>
          <button
            type="button"
            class="p-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Edit
          </button>
          <button
            @click="removeTask(item.id)"
            type="button"
            class="p-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="flex flex-col justify-center items-center">
    <span class="text-center">Нет задач ^:(</span>
    <button
      @click="isModalOpen = true"
      class="w-[200px] p-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
    >
      Добавить?
    </button>
    <Modal :show="isModalOpen" @close="isModalOpen = false" @save="handleSave">
      <template #header>Добавление задачи</template>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import Modal from '@/components/ModalTaskAdd.vue'

interface TodoItem {
  title: string
  description: string
}

const isModalOpen = ref<boolean>(false)
const todos = ref<Array<object>>([])
const searchTerm = ref<string>('')
const searchedTodos = ref<Array<object>>([])
const isTodoEmpty = computed(() => todos.value.length === 0)
const isSearchedTodoEmpty = computed(() => searchedTodos.value.length === 0)

const handleSave = (item: TodoItem) => {
  todos.value.push({
    id: todos.value.length + 1,
    title: item.title.value,
    description: item.description.value,
  })
  isModalOpen.value = false
}

const removeTask = (index: number) => {
  if (todos.value.length === 1) {
    todos.value.pop()
  } else {
    todos.value.push(todos.value.splice(index - 1, 1)[0])
    todos.value.pop()
  }
}

const searchTodo = () => {
  searchedTodos.value = todos.value.map((item) => {
    item.title.includes(searchTerm.value)
  })
}
</script>
