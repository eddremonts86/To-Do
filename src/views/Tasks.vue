<script lang="ts" setup>
import Task from '@/components/tasks/Task.vue'
import { getTaskByDate, updateTask } from '@/services/tasks'
import { useProjectsStore } from '@/stores/projects'
import type { Tasks } from '@/types/globalTypes'
import { computed, onMounted, ref, watch, watchEffect } from 'vue'

const store = useProjectsStore()
const date = computed(() => store.taskDate)
const tasks = ref([])

const fetchTasks = async () => {
  const data = await getTaskByDate(date.value)
  tasks.value = data
}

onMounted(
  watchEffect(async () => {
    await fetchTasks()
  })
)
watch(date, async () => {
  await fetchTasks()
})

async function updateStatus(task: Tasks) {
  await updateTask(task)
  await fetchTasks()
}
</script>
<template>
  <v-card rounded="lg" class="mx-auto">
    <v-card-title class="d-flex justify-center align-center">
      <h3>Tasks</h3>
      <v-spacer></v-spacer>
      <v-btn small flat color="primary">Add Task</v-btn>
    </v-card-title>
    <v-divider />
    <v-card-text class="pa-6">
      <v-row>
        <template v-for="task in tasks" :key="task.id">
          <Task :task="task" @updateTask="updateStatus($event)" />
        </template>
      </v-row>
    </v-card-text>
  </v-card>
</template>
@/services/apiTasks
