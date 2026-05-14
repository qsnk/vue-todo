<template>
  <div class="flex my-2 justify-center">
    <h1 class="text-2xl">Задачник</h1>
  </div>
  <div v-if="!isSearchedTodoEmpty">
    <SearchBar v-model="searchTerm" @clear="handleClear" @search="handleSearchTodo"></SearchBar>
    <div class="flex w-full p-2 gap-1">
      <span class="flex text-center items-center">Всего задач: {{ searchedTodos.length }}</span>
    </div>
    <div class="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1">
      <div
        v-for="item in searchedTodos"
        :key="item.id"
        class="flex flex-col gap-2 mx-4 my-2 p-4 rounded-md justify-between bg-gray-100 hover:bg-blue-500 hover:text-white transition shadow-sm"
      >
        <div class="flex justify-between gap-4">
          <p class="text-sm items-center text-left truncate">{{ item.title }}</p>
          <p
            class="text-sm font-extralight text-center shrink-0 rounded-full bg-blue-400 text-white w-5 h-5"
          >
            {{ item.id }}
          </p>
        </div>
        <div class="flex mx-2 justify-center gap-1">
          <button
            @click="selectedItem = item"
            type="button"
            class="p-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="currentColor"
            >
              <path d="M120-120v-320h80v184l504-504H520v-80h320v320h-80v-184L256-200h184v80H120Z" />
            </svg>
          </button>
          <button
            type="button"
            class="p-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="currentColor"
            >
              <path
                d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"
              />
            </svg>
          </button>
          <button
            @click="removeTask(item.id)"
            type="button"
            class="p-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="currentColor"
            >
              <path
                d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>

  <div v-else-if="!isTodoEmpty">
    <SearchBar v-model="searchTerm" @clear="handleClear" @search="handleSearchTodo"></SearchBar>
    <div class="flex p-2 gap-2">
      <span class="flex text-center items-center">Всего задач: {{ todos.length }}</span>
      <button
        @click="isModalOpen = true"
        class="w-10 h-10 p-2 border border-blue-600 rounded-md bg-white text-blue-600 hover:bg-blue-700 hover:text-white transition"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="currentColor"
        >
          <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
        </svg>
      </button>
      <ModalAdd :show="isModalOpen" @close="isModalOpen = false" @save="handleSave">
        <template #header>Добавление задачи</template>
      </ModalAdd>
    </div>

    <div class="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1">
      <div
        v-for="item in todos"
        :key="item.id"
        class="flex flex-col gap-2 mx-4 my-2 p-4 rounded-md justify-between bg-gray-100 hover:bg-blue-500 hover:text-white transition shadow-sm"
      >
        <div class="flex justify-between gap-4">
          <p class="text-sm items-center text-left truncate">{{ item.title }}</p>
          <p
            class="text-sm font-extralight text-center shrink-0 rounded-full bg-blue-400 text-white w-5 h-5"
          >
            {{ item.id }}
          </p>
        </div>
        <div class="flex mx-2 justify-center gap-1">
          <button
            @click="selectedItem = item"
            type="button"
            class="p-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="currentColor"
            >
              <path d="M120-120v-320h80v184l504-504H520v-80h320v320h-80v-184L256-200h184v80H120Z" />
            </svg>
          </button>
          <button
            type="button"
            class="p-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="currentColor"
            >
              <path
                d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"
              />
            </svg>
          </button>
          <button
            @click="removeTask(item.id)"
            type="button"
            class="p-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="currentColor"
            >
              <path
                d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"
              />
            </svg>
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
  </div>

  <ModalAdd :show="isModalOpen" @close="isModalOpen = false" @save="handleSave">
    <template #header>Добавление задачи</template>
  </ModalAdd>

  <ModalShow :show="!!selectedItem" @close="selectedItem = null">
    <template #header>Задача</template>
    <template #title>{{ selectedItem?.title }}</template>
    <template v-if="selectedItem?.has_description" #description>{{
      selectedItem?.description
    }}</template>
  </ModalShow>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import ModalAdd from '@/components/ModalTaskAdd.vue'
import ModalShow from '@/components/ModalTaskShow.vue'
import SearchBar from '@/components/SearchBar.vue'

interface TodoItem {
  title: string
  description: string
}

const isModalOpen = ref<boolean>(false)

const todos = ref<Array<object>>([])
const searchedTodos = ref<Array<object>>([])

const isTodoEmpty = computed(() => todos.value.length === 0)
const isSearchedTodoEmpty = computed(() => searchedTodos.value.length === 0)

const searchTerm = ref<string>('')
const selectedItem = ref<any>(null)

const handleSave = (item: TodoItem) => {
  todos.value.push({
    id: todos.value.length + 1,
    title: item.title.value,
    description: item.description.value,
    has_description: item.description.value.length > 0 ? true : false,
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

const handleClear = () => {
  searchTerm.value = ''
  searchedTodos.value = []
}

const handleSearchTodo = () => {
  searchedTodos.value = todos.value.filter((item) => {
    return item.title.toLowerCase().includes(searchTerm.value)
  })
}

onMounted(() => {
  document.title = 'Home'
})
</script>
