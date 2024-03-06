<!-- eslint-disable vue/multi-word-component-names -->
<script lang="ts" setup>
import formsDialog from '@/components/globals/FormsDialog.vue'
import Task from '@/components/tasks/Task.vue'
import { items } from '@/components/tasks/const/form'
import { createTask, getTaskByDate, updateTask } from '@/services/apiTasks'
import { useProjectsStore } from '@/stores/projects'
import type { FormItem, Tasks } from '@/types/globalTypes'
import { computed, onMounted, ref, watch, watchEffect } from 'vue'

const store = useProjectsStore()
const date = computed(() => store.taskDate)
const tasks = ref([])
const formItems = ref<Array<FormItem>>([])
const dialog = ref(false)

const fetchTasks = async () => {
  const data = await getTaskByDate(date.value)
  tasks.value = data
}

onMounted(
  watchEffect(async () => {
    await fetchTasks()
    const data = await items()
    formItems.value = data
  })
)
watch(date, async () => {
  await fetchTasks()
})

async function updateStatus(task: Tasks) {
  await updateTask(task)
  await fetchTasks()
}
const saveTask = async (data: Tasks) => {
  await createTask(data)
  await fetchTasks()
  dialog.value = false
}
</script>
<template>
  <v-card rounded="lg" class="mx-auto" elevation="0">
    <v-card-title class="d-flex justify-center align-center">
      <h3>Tasks</h3>
      <v-spacer></v-spacer>
      <formsDialog
        :items="formItems"
        title="Create new task"
        :input="dialog"
        :values="{ projectId: store.project.id }"
        @save="saveTask($event)"
        @update-input="dialog = $event"
      />
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
