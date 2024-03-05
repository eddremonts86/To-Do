<script lang="ts" setup>
import projectsTasks from '@/components/projects/Details.vue'
import { useProjectsStore } from '@/stores/projects'
import { computed } from 'vue'
const store = useProjectsStore()
const projects = computed(() => store.projects)
</script>
<template>
  <div >
    <v-card class="mb-4" rounded="lg" elevation="0" v-for="project in projects" :key="project.id">
      <v-card-title class="d-flex justify-center align-center">
        <h3>{{ project.name }}</h3>
        <v-spacer />
        <v-btn icon small elevation="0"> <v-icon>mdi-plus</v-icon></v-btn>
      </v-card-title>
      <v-divider />
      <v-card-subtitle class="pa-4">
        <span class="text-bold">{{ project.startDate }} - {{ project.endDate }}</span>
        <p class="text-wrap">
          {{ project.description.slice(0, 150) }}{{ project.description.length > 150 ? '...' : '' }}
        </p>
      </v-card-subtitle>
      <v-divider />
      <v-card-text class="pa-4">
        <projectsTasks :projectId="project.id" />
      </v-card-text>
      <v-card-actions class="d-flex justify-center align-center">
        <v-btn text>View all</v-btn></v-card-actions
      >
    </v-card>
  </div>
</template>
<style lang="scss">

</style>
