<!-- eslint-disable vue/multi-word-component-names -->
<script lang="ts" setup>
import formsDialog from '@/components/globals/FormsDialog.vue'
import { items } from '@/components/projects/const/form'
import { createProject, deleteProject } from '@/services/apiProjects'
import { useProjectsStore } from '@/stores/projects'
import type { Projects } from '@/types/globalTypes'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import completeStatus from './CompleteStatus.vue'

let dialogValues = reactive({} as Projects)
const router = useRouter()
const store = useProjectsStore()
const dialog = ref(false)
const emits = defineEmits(['reloadProjects'])
const props = defineProps<{
  projects: Projects[]
}>()

const updateData = (data: any) => {
  dialogValues = data
}

const saveProjects = async () => {
  if (Object.keys(dialogValues).length) {
    await createProject(dialogValues)
  }
  emits('reloadProjects')
  dialog.value = false
}

const goToProject = (project: Projects) => {
  store.updateProject(project)
  router.push({ name: 'projects' })
}

const deleteProjectById = async (event: Event, id: string) => {
  store.updateProject({} as Projects)
  await deleteProject(id)
  emits('reloadProjects')
  event.stopImmediatePropagation
}
</script>

<template>
  <div class="pa-4">
    <div class="d-flex">
      <h2 class="mb-4">Projects</h2>
      <v-spacer />
      <formsDialog
        :items="items"
        :input="dialog"
        :values="{ projectId: store.project.id }"
        title="Create new project"
        @submit="updateData($event)"
        @save="saveProjects()"
        @update-input="dialog = $event"
      />
    </div>
    <v-divider class="mb-4" />
    <div
      v-for="project in props.projects"
      :key="project.id"
      class="cl-projects-items"
      @click="goToProject(project)"
    >
      <completeStatus :projectId="project.id" size="35" :key="project.updateId" />
      <spam class="projects-name">{{ project.name }}</spam>
      <v-spacer />
      <v-btn icon flat size="small" variant="text" @click="deleteProjectById($event, project.id)">
        <v-icon>mdi-delete-variant</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<style lang="scss">
.cl-projects-items {
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-items: center;
  background: #5199e552;
  margin-bottom: 5px;
  padding: 5px 8px;
  border-radius: 12px;
  color: #161616ba;
  &:hover {
    cursor: pointer;
    color: rgb(255, 255, 255);
    background: rgba(41, 133, 231, 0.616);
  }
}
</style>
