<script lang="ts" setup>
import Task from '@/components/tasks/Task.vue'
import { getTasksByProject, updateTask } from '@/services/tasks'
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
  const tasks = await getTasksByProject(props.projectId)
  if (projectRouter.value) {
    projectTasks.value = tasks
  } else {
    projectTasks.value = tasks.slice(size.value)
  }
}

async function updateStatus(task: Tasks) {
  await updateTask(task)
  await fetchTasks()
}
</script>

<template>
  <div>
    <template v-for="task in projectTasks" :key="task.id">
      <Task :task="task" @updateTask="updateStatus($event)" />
    </template>
  </div>
</template>
