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
  await getTasksData()
})

const getTasksData = async () => {
  loading.value = true
  const tasks: Tasks[] = await getTasksByProject(props.projectId) || []
  const completedTasks = tasks.filter((task) => task.status)
  completion.value = Math.round((completedTasks.length / tasks.length) * 100) || 0
  loading.value = false
}

const completionColor = (completion: number) => {
  if (completion < 50) {
    return 'blue-darken-1'
  }
  if (completion < 80) {
    return 'blue-darken-2'
  }
  return 'blue-darken-3'
}
</script>

<template>
  <v-progress-circular
    :indeterminate="loading"
    :model-value="completion"
    :rotate="360"
    :size="props.size || 40"
    :width="5"
    :color="completionColor(completion)"
    bg-color="#5199e5"
  >
    <template v-slot:default>
      <span class="cl-projects-items-completion">{{ loading ? '...' : completion }}%</span>
    </template>
  </v-progress-circular>
</template>

<style lang="scss" scoped>
.cl-projects-items-completion {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.5rem;
  font-weight: 600;
  color: #161616ba;
  border-radius: 12px;
  font-weight: 900;
}
</style>
