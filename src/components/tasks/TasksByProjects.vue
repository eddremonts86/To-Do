<script lang="ts" setup>
import formsDialog from '@/components/globals/FormsDialog.vue'
import projectsTasks from '@/components/projects/Details.vue'
import { items as itemsProjects } from '@/components/projects/const/form'
import { items } from '@/components/tasks/const/form'
import { uniqueId } from '@/libs/helpers'
import { deleteProject, updateProject } from '@/services/apiProjects'
import { createTask } from '@/services/apiTasks'
import { useProjectsStore } from '@/stores/projects'
import type { FormItem, IDictionary, Projects, Tasks } from '@/types/globalTypes'
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { useRouter } from 'vue-router'

import { formatDateToLocal } from '@/libs/helpers'
const router = useRouter()
const store = useProjectsStore()
const dialog = reactive({} as IDictionary)
const dialogProject = reactive({} as IDictionary)
const formItems = ref<Array<FormItem>>([])
const updateId = ref(uniqueId('task_'))

onMounted(async () => {
  await init(store.projects)
})

const projects = computed((): Projects[] => {
  if (projectRouter.value) {
    if (store.project.id) {
      return [store.project]
    }
  }
  return store.projects
})

const projectRouter = computed(() => {
  return router.currentRoute.value.name === 'projects'
})

const init = async (projects: Projects[]) => {
  const data = await items(projects)
  formItems.value = data
}

const goToProject = (project: Projects) => {
  store.updateProject(project)
  router.push({ name: 'projects' })
}

const saveTask = async (data: Tasks) => {
  await createTask(data)
  updateId.value = uniqueId('task_')
  dialog[data.projectId] = false
}

const deleteProjectById = async (id: string) => {
  store.updateProject({} as Projects)
  await deleteProject(id)
  await store.fetchProjects()
  router.push({ name: 'home' })
}

const updateProjects = async (data: Projects) => {
  store.updateProject(data)
  await updateProject(data)
  await store.fetchProjects()
  dialogProject[data.id] = false
  router.push({ name: 'projects' })
}

watch(dialog, async (actualValue) => {
  if (actualValue) {
    await init(store.projects)
  }
})
watch(dialogProject, async (actualValue) => {
  if (actualValue) {
    await init(store.projects)
  }
})
</script>
<template>
  <div v-if="projects.length" :key="projects.length">
    <v-card class="mb-4" rounded="lg" elevation="0" v-for="project in projects" :key="project.id">
      <v-card-title class="d-flex justify-center align-center">
        <p class="projects-name text-balanced">{{ project.name }}</p>
        <v-spacer />
        <v-btn
          icon
          flat
          size="small"
          variant="text"
          @click="updateProjects({ ...project, status: !project.status })"
        >
          <v-icon :color="project.status ? 'green darken-4' : 'grey darken-4'"
            >mdi-checkbox-marked-circle-outline</v-icon
          >
        </v-btn>
        <formsDialog
          :key="'dialog_' + project.id"
          :items="itemsProjects"
          title="Edit Task(project)"
          :input="dialogProject[project.id]"
          icon="mdi-pencil"
          size="small"
          :values="{
            ...project
          }"
          @save="updateProjects($event)"
          @update-input="dialogProject[project.id] = $event"
        />
        <v-btn icon flat size="small" variant="text" @click="deleteProjectById(project.id)">
          <v-icon>mdi-delete-variant</v-icon>
        </v-btn>
      </v-card-title>
      <v-divider />
      <v-card-subtitle class="pa-2">
        <v-expansion-panels multiple flat>
          <v-expansion-panel>
            <v-expansion-panel-title class="pl-2">
              <div>
                <h4 class="text-bold mb-1 text-balanced">{{ project.subTitle }}</h4>
                <p class="text-bold mb-2">
                  From: <b>{{ formatDateToLocal(project.startDate) }}</b> - To:
                  <b>{{ formatDateToLocal(project.endDate) }}</b>
                </p>
                <p>Description: <b>click to see here!!!</b></p>
              </div>
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <p class="text-wrap py-3" v-html="project.description"></p
            ></v-expansion-panel-text> </v-expansion-panel
        ></v-expansion-panels>
      </v-card-subtitle>
      <v-divider />
      <v-card-text class="pa-4">
        <v-row>
          <v-col cols="12" class="d-flex justify-center align-center mt-0 pt-0">
            <h3>Sub-Tasks</h3>
            <v-spacer />
            <formsDialog
              :key="project.id + '_task_'"
              :items="formItems"
              title="Create new sub-task"
              :input="dialog[project.id]"
              :icon="null"
              size="large"
              :values="{
                projectId: project.id
              }"
              @save="saveTask($event)"
              @update-input="dialog[project.id] = $event"
            />
          </v-col>
        </v-row>
        <projectsTasks :projectId="project.id" :key="updateId" />
      </v-card-text>
      <v-card-actions class="d-flex justify-center align-center" v-if="!projectRouter">
        <v-btn @click="goToProject(project)">See all</v-btn>
      </v-card-actions>
    </v-card>
  </div>
  <div v-else>
    <v-alert
      class="rounded-xl"
      text="No projects found, please create one"
      title="Create Project"
      type="info"
    ></v-alert>
  </div>
</template>
