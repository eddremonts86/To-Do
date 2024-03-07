<script lang="ts" setup>
import userInfo from '@/components/globals/UserInfo.vue'
import projectsOverview from '@/components/projects/Overview.vue'
import { useProjectsStore } from '@/stores/projects'
import type { Projects } from '@/types/globalTypes'
import { computed, onMounted, ref, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import { useDisplay } from 'vuetify'
const display = ref(useDisplay())
const store = useProjectsStore()
const date = ref(new Date())
const router = useRouter()

const loadProjects = async () => {
  await store.fetchProjects()
}
onMounted(
  watchEffect(async () => {
    await loadProjects()
  })
)

const projects = computed((): Projects[] => {
  const projects = store.projects
  return projects
})

const setDate = () => {
  router.push({ name: 'tasks' })
  store.updateTaskDate(date.value.toLocaleDateString())
  store.updateProject({} as Projects)
}
</script>

<template>
  <v-app id="inspire">
    <v-main>
      <v-container>
        <v-row class="main-container" no-gutters>
          <v-col class="td-nav" xs="12" sm="12" md="12" lg="3">
            <div class="nav-container d-flex flex-column justify-start align-center">
              <userInfo
                name="Eduardo Inerarte"
                email="eduardo.inerarte@gmail.com"
                img="https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png"
              />
              <v-divider />
              <v-date-picker
                v-if="display.smAndUp"
                hide-header
                elevation="0"
                title="Chose a day"
                v-model="date"
                show-adjacent-months
                @update:model-value="setDate()"
                class="pa-0"
              />
              <v-text-field
                type="date"
                @change="setDate()"
                label="Chose a day"
                v-model="date"
                v-else
                hide-details
                variant="outlined"
                class="w-100"
              ></v-text-field>
            </div>
            <projectsOverview :projects="projects" class="nav-container" />
          </v-col>
          <v-col class="td-main-content">
            <RouterView />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<style lang="scss">
.td-nav {
  border-radius: 16px !important;
  min-width: 380px !important;
  margin: 0;
  @media only screen and (max-width: 600px) {
    min-width: 100% !important;
  }
}
.td-main-content {
  margin: 0;
  padding: 0 16px !important;
  @media only screen and (max-width: 1024px) {
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
  background-color: rgb(81 153 229 / 8%) !important;
  padding: 16px !important;
  min-height: calc(100dvh - 32px);
  height: fit-content;
}
.v-date-picker-month {
  padding: 0 !important;
}
.w-100 {
  width: -webkit-fill-available !important;
}
</style>
