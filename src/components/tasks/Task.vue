<!-- eslint-disable vue/multi-word-component-names -->
<script lang="ts" setup>
import formsDialog from '@/components/globals/FormsDialog.vue'
import { items } from '@/components/tasks/const/form'
import { formatDateToLocal } from '@/libs/helpers'
import { deleteTask, updateTask } from '@/services/apiTasks'
import { useProjectsStore } from '@/stores/projects'
import type { FormItem, Tasks } from '@/types/globalTypes'
import { computed, onMounted, ref, type PropType } from 'vue'

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
  const data = await items()
  formItems.value = data
})

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
</script>

<template>
  <div @click="status()" :class="{ 'task-item': true, 'active-item': props.task.status }">
    <div class="pr-4">
      <v-icon :color="completeStatus.color">{{ completeStatus.icon }}</v-icon>
    </div>
    <div class="task-info">
      <div class="d-flex justify-center align-center positioner-to-right">
        <v-spacer />
        <div class="d-flex flex-column justify-end align-end mr-1">
          <span class="date">{{ formatDateToLocal(props.task.date) }}</span>
          <span class="date">Priority: {{ props.task.priority|| 'None' }}</span>
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
  background-color: rgb(233 233 231 / 43%);
  padding: 15px;
  margin: 8px 0;
  border-radius: 12px;
  cursor: pointer;
  display: flex;
  justify-items: center;
  align-items: center;
  min-width: 100%;
  &:hover {
    background-color: rgb(194 216 237 / 33%);
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
  background-color: rgb(194 216 237 / 33%) !important;
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
</style>
