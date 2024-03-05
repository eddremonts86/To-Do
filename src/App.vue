<script lang="ts" setup>
import { useProjectsStore } from '@/stores/projects'
import type { Projects } from '@/types/globalTypes'
import { onMounted, ref, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import projectsOverview from './components/projects/Overview.vue'

const projects = ref<Array<Projects>>([])
const store = useProjectsStore()

onMounted(
  watchEffect(async () => {
    await store.fetchProjects()
    projects.value = store.projects
  })
)
const date = ref(new Date())
const router = useRouter() // Get the router instance

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
        <v-row class="main-container">
          <v-col cols="3" class="td-nav">
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
                elevation="0"
                title="Chose a day"
                v-model="date"
                show-adjacent-months
                @update:model-value="setDate()"
              />
            </div>
            <projectsOverview :projects="projects" class="nav-container" />
          </v-col>
          <v-col cols="8" class="td-main-content">
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
  background-color: rgb(231, 231, 224) !important;
  border-radius: 16px !important;
  margin: 0;
}
.td-main-content {
  margin: 0;
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
