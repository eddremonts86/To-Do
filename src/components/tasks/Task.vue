<script lang="ts" setup>
import { formatDateToLocal, sliceText } from '@/libs/helpers'
import type { Tasks } from '@/types/globalTypes'
import { computed, type PropType } from 'vue'

const props = defineProps({
  task: {
    type: Object as PropType<Tasks>,
    required: true
  }
})
const emits = defineEmits(['updateTask', 'deleteTask'])
const status = () => {
  emits('updateTask', { ...props.task, status: !props.task.status })
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

const deleteTask = (event: Event, id: string) => {
  event.stopImmediatePropagation()
  emits('deleteTask', id)
}
</script>

<template>
  <div @click="status()" :class="{ 'task-item': true, 'active-item': props.task.status }">
    <div class="pr-4">
      <v-icon :color="completeStatus.color">{{ completeStatus.icon }}</v-icon>
    </div>
    <div class="task-info">
      <div class="d-flex justify-center align-center">
        <span class="name">{{ props.task.name }}</span>
        <v-spacer />
        <span class="date">{{ formatDateToLocal(props.task.date) }}</span>
        <v-btn icon flat size="small" variant="text" @click="deleteTask($event, props.task.id)">
          <v-icon>mdi-delete-variant</v-icon></v-btn
        >
      </div>
      <span class="description">
        {{ sliceText(props.task.description, 0, 150) }}
      </span>
    </div>
  </div>
</template>

<style lang="scss">
.task-item {
  background-color: rgb(231, 231, 224);
  padding: 15px;
  margin: 8px 0;
  border-radius: 12px;
  cursor: pointer;
  display: flex;
  justify-items: center;
  align-items: center;
  min-width: 100%;
  &:hover {
    background-color: rgb(204, 204, 185);
  }
  .task-info {
    width: 100%;
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
  background-color: rgb(204, 204, 185) !important;
  .task-info {
    .name,
    .description {
      text-decoration: line-through;
    }
  }
}
</style>
