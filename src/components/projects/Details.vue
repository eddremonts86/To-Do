<!-- eslint-disable vue/multi-word-component-names -->
<script lang="ts" setup>
import Task from '@/components/tasks/Task.vue'
import { getTasksByProject, updateTask, deleteTask } from '@/services/apiTasks'
import type { Tasks } from '@/types/globalTypes'
import { computed, onMounted, ref, watchEffect } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const props = defineProps({
  projectId: {
    type: String,
    required: true
  }
})

const projectTasks = ref<Array<Tasks>>([])
const size = ref(3)

onMounted(async () => {
  watchEffect(async () => {
    fetchTasks()
  })
})

const projectRouter = computed(() => {
  return router.currentRoute.value.name === 'projects'
})

async function fetchTasks() {
  const tasks = await getTasksByProject(props.projectId) || []
  if (projectRouter.value) {
    projectTasks.value = tasks
  } else {
    projectTasks.value = tasks.length > size.value ? tasks.slice(size.value) : tasks
  }
}

async function updateStatus(task: Tasks) {
  await updateTask(task)
  await fetchTasks()
}

async function deleteTaskById(id: string) {
  await deleteTask(id)
  await fetchTasks()
}
</script>

<template>
  <div>
    <template v-for="task in projectTasks" :key="task.id">
      <Task :task="task" @updateTask="updateStatus($event)" @deleteTask="deleteTaskById($event)" />
    </template>
  </div>
</template>
