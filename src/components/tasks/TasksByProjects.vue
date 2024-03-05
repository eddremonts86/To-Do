<script lang="ts" setup>
import formsDialog from '@/components/globals/FormsDialog.vue'
import projectsTasks from '@/components/projects/Details.vue'
import { items } from '@/components/tasks/const/form'
import { createTask } from '@/services/apiTasks'
import { useProjectsStore } from '@/stores/projects'
import type { FormItem, Projects, Tasks } from '@/types/globalTypes'
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { sliceText } from '@/libs/helpers'

import { formatDateToLocal } from '@/libs/helpers'
const router = useRouter()
const store = useProjectsStore()
const dialog = ref(false)
const formItems = ref<Array<FormItem>>([])

onMounted(async () => {
  const data = await items()
  formItems.value = data
})

const projects = computed((): Projects[] => {
  const project = store.project
  if (!project?.id) {
    return store.projects
  }
  return [project]
})

const projectRouter = computed(() => {
  return router.currentRoute.value.name === 'projects'
})

const goToProject = (project: Projects) => {
  store.updateProject(project)
  router.push({ name: 'projects' })
}
const saveTask = (data: Tasks) => {
  createTask(data)
}
</script>
<template>
  <div v-if="projects.length">
    <v-card class="mb-4" rounded="lg" elevation="0" v-for="project in projects" :key="project.id">
      <v-card-title class="d-flex justify-center align-center">
        <h3>{{ project.name }}</h3>
        <v-spacer />
        <formsDialog
          :items="formItems"
          title="Create new task"
          v-model="dialog"
          @save="saveTask($event)"
        />
      </v-card-title>
      <v-divider />
      <v-card-subtitle class="pa-4">
        <span class="text-bold"
          >{{ formatDateToLocal(project.startDate) }} -
          {{ formatDateToLocal(project.endDate) }}</span
        >
        <p class="text-wrap">
          {{ sliceText(project.description, 0, 150) }}
        </p>
      </v-card-subtitle>
      <v-divider />
      <v-card-text class="pa-4">
        <projectsTasks :projectId="project.id" />
      </v-card-text>
      <v-card-actions class="d-flex justify-center align-center" v-if="!projectRouter">
        <v-btn @click="goToProject(project)">Go to project</v-btn>
      </v-card-actions>
    </v-card>
  </div>
  <div v-else>
    <v-alert
      text="No projects found, please create one"
      title="Create Project"
      type="info"
    ></v-alert>
  </div>
</template>
@/services/apiTasks
