<!-- eslint-disable vue/multi-word-component-names -->
<script lang="ts" setup>
import formsDialog from '@/components/globals/FormsDialog.vue'
import { items } from '@/components/tasks/const/form'
import { formatDateToLocal } from '@/libs/helpers'
import { deleteTask, updateTask } from '@/services/apiTasks'
import { useProjectsStore } from '@/stores/projects'
import type { FormItem, Projects, Tasks } from '@/types/globalTypes'
import { computed, onMounted, ref, watch, type PropType } from 'vue'

const props = defineProps({
  task: {
    type: Object as PropType<Tasks>,
    required: true
  }
})
const emits = defineEmits(['updateTask'])
const store = useProjectsStore()
const formItems = ref<Array<FormItem>>([])
const dialog = ref(false)

onMounted(async () => {
  await init(store.projects)
})

const init = async (projects: Projects[]) => {
  const data = await items(projects)
  formItems.value = data
}

const status = () => {
  emits('updateTask', { ...props.task, status: !props.task.status })
  store.updateProjectId(props.task.projectId)
}

const completeStatus = computed(() => {
  const status = props.task.status
  if (status) {
    return {
      color: 'green darken-4',
      icon: 'mdi-checkbox-marked-circle-outline'
    }
  }
  return {
    color: 'grey darken-4',
    icon: 'mdi-checkbox-blank-circle-outline'
  }
})

const deleteTaskByID = async (event: Event, id: string) => {
  event.stopPropagation()
  await deleteTask(id)
  status()
}

const saveTask = async (data: Tasks) => {
  await updateTask({ ...data, id: props.task.id })
  emits('updateTask', data)
  store.updateProjectId(props.task.projectId)
  dialog.value = false
}

watch(dialog, async (actualValue) => {
  if (actualValue) {
    await init(store.projects)
  }
})
</script>

<template>
  <div @click="status()" :class="{ 'task-item': true, 'active-item': props.task.status }">
    <div class="pr-4">
      <v-icon :color="completeStatus.color">{{ completeStatus.icon }}</v-icon>
    </div>
    <div class="task-info">
      <div
        class="d-flex justify-center align-center positioner-to-right"
        :class="{
          'positioner-to-center': !props.task.subTitle
        }"
      >
        <v-spacer />
        <div
          :class="{
            'd-flex flex-column justify-end align-end': props.task.subTitle,
            'd-flex flex-row justify-center align-center': !props.task.subTitle
          }"
        >
          <span class="date">{{ formatDateToLocal(props.task.date) }}</span>
          <span class="date"
            >Priority: <b>{{ props.task.priority || 'None' }}</b></span
          >
        </div>
        <formsDialog
          class="mr-1"
          :items="formItems"
          title="Edit sub-task"
          :input="dialog"
          :values="{
            ...props.task
          }"
          icon="mdi-pencil"
          size="small"
          @save="saveTask($event)"
          @update-input="dialog = $event"
        />
        <v-btn
          icon
          flat
          size="small"
          variant="text"
          @click="deleteTaskByID($event, props.task.id)"
          class="mr-1"
        >
          <v-icon>mdi-delete-variant</v-icon></v-btn
        >
      </div>
      <div>
        <span class="name">{{ props.task.name }}</span>
        <h5 class="description">
          {{ props.task.subTitle }}
        </h5>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.task-item {
  background-color: rgb(194 216 237 / 23%) !important;
  padding: 15px;
  margin: 8px 0;
  border-radius: 12px;
  cursor: pointer;
  display: flex;
  justify-items: center;
  align-items: center;
  min-width: 100%;
  &:hover {
    background-color: rgb(194 216 237 / 90%) !important;
    color: white;
  }
  .task-info {
    width: 100%;
    position: relative;
    .name {
      font-size: 16px;
      font-weight: bold;
      display: block;
    }
    .date {
      font-size: 12px;
      font-weight: normal;
      display: block;
      margin-right: 5px;
    }
    .description {
      font-size: 14px;
      line-height: 24px;
      font-weight: normal;
      display: block;
      text-wrap: wrap;
    }
  }
}
.active-item {
  background-color: rgb(81 153 229 / 20%) !important;
  .task-info {
    .name,
    .description {
      text-decoration: line-through;
    }
  }
}
.positioner-to-right {
  position: absolute;
  bottom: 0;
  right: 0;
}
.positioner-to-center {
  bottom: -12px;
}
</style>
