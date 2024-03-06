<script lang="ts" setup>
import { useProjectsStore } from '@/stores/projects'
import type { Projects } from '@/types/globalTypes'
import { onMounted, ref, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import { useDisplay } from 'vuetify'
import projectsOverview from './components/projects/Overview.vue'

const display = ref(useDisplay())
const projects = ref<Array<Projects>>([])
const store = useProjectsStore()
const date = ref(new Date())
const router = useRouter()

const loadProjects = async () => {
  await store.fetchProjects()
  projects.value = store.projects
}

onMounted(
  watchEffect(async () => {
    await loadProjects()
  })
)

const setDate = () => {
  router.push({ name: 'tasks' })
  store.updateTaskDate(date.value.toLocaleDateString())
}

const goToHome = () => {
  store.updateProject({} as Projects)
  router.push({ name: 'home' })
}
</script>

<template>
  <v-app id="inspire">
    <v-main>
      <v-container>
        <v-row class="main-container" no-gutters>
          <v-col xs="12" sm="12" md="4" lg="4" class="td-nav">
            <v-sheet class="nav-container d-flex justify-start align-center" @click="goToHome">
              <v-avatar color="white" size="86">
                <v-img
                  alt="John"
                  src="https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png"
                ></v-img>
              </v-avatar>
              <div class="pl-2">
                <p>Eduardo Inerarte</p>
                <p>eduardo.inerarte@gmail.com</p>
              </div>
            </v-sheet>
            <div class="nav-container">
              <v-date-picker
                v-if="display.smAndUp"
                hide-header
                elevation="0"
                title="Chose a day"
                v-model="date"
                show-adjacent-months
                @update:model-value="setDate()"
              />
              <v-text-field
                type="date"
                @change="setDate()"
                label="Chose a day"
                v-model="date"
                v-else
                hide-details
              ></v-text-field>
            </div>
            <projectsOverview
              :projects="projects"
              class="nav-container"
              @reloadProjects="loadProjects()"
            />
          </v-col>
          <v-col xs="12" sm="12" md="8" lg="8" class="td-main-content">
            <RouterView />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<style lang="scss">
.td-nav {
  max-width: 380px !important;
  border-radius: 16px !important;
  margin: 0;
   @media only screen and (max-width: 600px) {
    max-width: 100% !important;
  }
}
.td-main-content {
  margin: 0;
  padding: 0 16px !important;
  @media only screen and (max-width: 600px) {
    padding: 0 !important;
  }
}
.nav-container {
  background-color: white !important;
  border-radius: 12px !important;
  padding: 16px;
  margin-bottom: 16px;
  cursor: pointer;
}
.main-container {
  border-radius: 16px !important;
  background-color: rgb(231, 231, 224) !important;
  padding: 16px !important;
}
</style>
