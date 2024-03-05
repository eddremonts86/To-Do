<script lang="ts" setup>
import formsDialog from '@/components/globals/FormsDialog.vue'
import { items } from '@/components/projects/const/form'
import { createProject } from '@/services/projects'
import { reactive, ref } from 'vue'
const props = defineProps<{
  projects: { id: number; name: string; completion: number }[]
}>()

const completionColor = (completion: number) => {
  if (completion < 50) {
    return 'red'
  } else if (completion < 80) {
    return 'orange'
  } else {
    return 'green'
  }
}
const dialog = ref(false)
const dialogValue = reactive({})

function updateData(data: any) {
  dialogValue.value = data
}

async function saveProjects() {
  await createProject(dialogValue.value)
}
</script>

<template>
  <div class="pa-4">
    <div class="d-flex">
      <h2 class="mb-4">Projects</h2>
      <v-spacer />
      <formsDialog
        :items="items"
        v-model="dialog"
        @submit="updateData($event)"
        @save="saveProjects()"
      />
    </div>

    <div v-for="project in props.projects" :key="project.id" class="cl-projects-items">
      <div>{{ project.name }}</div>
      <v-spacer />

      <v-progress-circular
        :model-value="project.completion"
        :rotate="360"
        :size="45"
        :width="5"
        :color="completionColor(project.completion)"
      >
        <template v-slot:default>
          <span class="cl-projects-items-completion">{{ project.completion }} %</span>
        </template>
      </v-progress-circular>
    </div>
  </div>
</template>

<style lang="scss">
.cl-projects-items {
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-items: center;
  background: black;
  margin-bottom: 5px;
  padding: 5px 25px;
  border-radius: 12px;
  color: white;
  .cl-projects-items-completion {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.7rem;
    font-weight: 600;
    color: white;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 12px;
  }
  &:hover {
    color: rgb(224, 224, 224);
    cursor: pointer;
  }
}
</style>