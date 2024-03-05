<script lang="ts" setup>
import { getTasksByProject, updateTask } from '@/services/tasks'
import type { Tasks } from '@/types/globalTypes'
import { onMounted, ref, watchEffect } from 'vue'
const props = defineProps({
  projectId: {
    type: String,
    required: true
  },
  seeAll: {
    type: Boolean,
    default: false
  }
})

const projectTasks = ref<Array<Tasks>>([])

onMounted(async () => {
  watchEffect(async () => {
    fetchTasks()
  })
})

async function fetchTasks() {
  const tasks = await getTasksByProject(props.projectId)
  if (props.seeAll) {
    projectTasks.value = tasks
  } else {
    projectTasks.value = tasks.slice(3)
  }
}

async function updateStatus(task: Tasks) {
  await updateTask({ ...task, status: !task.status })
  await fetchTasks()
}
</script>

<template>
  <div v-for="task in projectTasks" :key="task.id" @click="updateStatus(task)" class="task-item">
    <div>
      <v-checkbox v-model="task.status" hide-details color="primary" />
    </div>
    <div>
      <span class="name">{{ task.name }}</span>
      <span class="description">
        {{ task.description.slice(0, 150) }}{{ task.description.length > 150 ? '...' : '' }}
      </span>
    </div>
  </div>
</template>

<style lang="scss">
.task-item {
  background-color: rgb(231, 231, 224);
  padding: 15px;
  margin: 5px 0;
  border-radius: 12px;
  cursor: pointer;
  display: flex;
  justify-items: center;
  align-items: center;
  &:hover {
    background-color: rgb(204, 204, 185);
  }
  .name {
    font-size: 16px;
    font-weight: bold;
    display: block;
  }
  .description {
    font-size: 14px;
    font-weight: normal;
    display: block;
    text-wrap: wrap;
  }
}
</style>
