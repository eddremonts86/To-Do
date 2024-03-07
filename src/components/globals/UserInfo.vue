<template>
  <v-sheet class="d-flex justify-start align-center px-0 pb-4" @click="goToHome">
    <v-avatar color="white" size="86">
      <v-img :alt="props.name" :src="props.img"></v-img>
    </v-avatar>
    <div class="pl-2">
      <p>{{ props.name }}</p>
      <p>{{ props.email }}</p>
    </div>
  </v-sheet>
</template>

<script lang="ts" setup>
import { useProjectsStore } from '@/stores/projects'
import type { Projects } from '@/types/globalTypes'
import { useRouter } from 'vue-router'
const store = useProjectsStore()
const router = useRouter()

interface Props {
  name: string
  email: string
  img: string
}
const props = defineProps<Props>()

const goToHome = () => {
  store.updateProject({} as Projects)
  router.push({ name: 'home' })
}
</script>
