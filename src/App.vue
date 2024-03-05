<script lang="ts" setup>
import { useProjectsStore } from '@/stores/projects'
import type { Projects } from '@/types/globalTypes'
import { onMounted, ref, watchEffect } from 'vue'
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
const setDate = () => {
  console.log(date.value)
}
</script>

<template>
  <v-app id="inspire">
    <v-main>
      <v-container>
        <v-row class="main-container">
          <v-col cols="3" class="nav">
            <v-sheet class="nav-container d-flex justify-start align-center">
              <v-avatar color="grey-darken-1" size="64" />
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

          <v-col cols="9" class="">
            <RouterView />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<style lang="scss">
.nav {
  max-width: 380px !important;
  background-color: rgb(231, 231, 224) !important;
  border-radius: 16px !important;
}
.nav-container {
  background-color: white !important;
  border-radius: 12px !important;
  padding: 16px;
  margin-bottom: 16px;
}
.main-container {
  border-radius: 16px !important;
  background-color: rgb(231, 231, 224) !important;
  padding: 16px !important;
}
</style>
