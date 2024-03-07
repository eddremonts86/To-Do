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
const props = defineProps<{
  projects: Projects[]
}>()

const updateData = (data: any) => {
  dialogValues = data
}

const saveProjects = async () => {
  if (!Object.keys(dialogValues).length) {
    return
  }
  await createProject(dialogValues)
  await store.fetchProjects()
  dialog.value = false
  router.push({ name: 'home' })
}

const goToProject = (event: Event, project: Projects) => {
  event.stopImmediatePropagation
  store.updateProject(project)
  router.push({ name: 'projects' })
}

const deleteProjectById = async (event: Event, id: string) => {
  event.stopImmediatePropagation
  store.updateProject({} as Projects)
  await deleteProject(id)
  await store.fetchProjects()
  router.push({ name: 'home' })
}
</script>

<template>
  <div class="pa-4">
    <div class="d-flex justify-center align-center">
      <h2 @click="router.push({ name: 'home' })" data-cy="ProjectsList">Projects(Tasks)</h2>
      <v-spacer />
      <formsDialog
        :items="items"
        :input="dialog"
        icon="mdi-plus"
        size="large"
        :values="{ projectId: store.project.id }"
        title="Create new task"
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
      @click="goToProject($event, project)"
    >
      <completeStatus :projectId="project.id" size="35" :key="project.updateId" />
      <span class="projects-name">{{ project.name }}</span>
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
  background: rgb(81 153 229 / 20%);
  margin-bottom: 5px;
  padding: 5px 8px;
  border-radius: 12px;
  color: #161616ba;
  &:hover {
    cursor: pointer;
    color: rgb(255, 255, 255);
    background: rgb(0 105 217 / 62%);
  }
  .projects-name {
    font-size: 0.9rem;
  }
}
</style>
