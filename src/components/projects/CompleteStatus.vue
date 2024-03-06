<script lang="ts" setup>
import { getTasksByProject } from '@/services/apiTasks'
import type { Tasks } from '@/types/globalTypes'
import { onMounted, ref } from 'vue'

const props = defineProps<{
  projectId: string
  size: string
}>()

const completion = ref(0)
const loading = ref(false)

onMounted(async () => {
  loading.value = true
  const tasks: Tasks[] = await getTasksByProject(props.projectId)
  const completedTasks = tasks.filter((task) => task.status)
  completion.value = Math.round((completedTasks.length / tasks.length) * 100) || 0
  loading.value = false
})

const completionColor = (completion: number) => {
  if (completion < 50) {
    return 'red-darken-4'
  }
  if (completion < 80) {
    return 'orange-darken-4'
  }
  return 'green-darken-4'
}
</script>

<template>
  <v-progress-circular
    :indeterminate="loading"
    :model-value="completion"
    :rotate="360"
    :size="props.size || 45"
    :width="5"
    :color="completionColor(completion)"
  >
    <template v-slot:default>
      <span v-if="loading">...</span>
      <span class="cl-projects-items-completion" v-else>{{ completion }} %</span>
    </template>
  </v-progress-circular>
</template>
