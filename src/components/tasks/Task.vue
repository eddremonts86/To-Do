<script lang="ts" setup>
import { sliceText } from '@/libs/helpers'
import type { Tasks } from '@/types/globalTypes'
import type { PropType } from 'vue'
import { formatDateToLocal } from '@/libs/helpers'


const props = defineProps({
  task: {
    type: Object as PropType<Tasks>,
    required: true
  }
})
const emits = defineEmits(['updateTask'])
const status = () => {
  emits('updateTask', { ...props.task, status: !props.task.status })
}
</script>

<template>
  <div @click="status()" :class="{ 'task-item': true, 'active-item': props.task.status }">
    <div class="pr-4">
      <v-checkbox :value="props.task.status" hide-details color="primary" />
    </div>
    <div class="task-info">
      <div class="d-flex justify-center align-center">
        <span class="name">{{ props.task.name }}</span>
        <v-spacer />
        <span class="date">{{ formatDateToLocal(props.task.date) }}</span>
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
