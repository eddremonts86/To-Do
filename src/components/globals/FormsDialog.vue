<script lang="ts" setup>
import forms from '@/components/globals/Forms.vue'
import type { FormItem } from '@/types/globalTypes'
import { computed, type PropType } from 'vue'
const props = defineProps({
  items: {
    type: Array as PropType<FormItem[]>,
    required: true
  },
  input: {
    type: Boolean,
    required: true
  },
  title: {
    type: String,
    default: 'Create a new project'
  }
})

const emit = defineEmits(['submit', 'update-input', 'save'])

const input = computed({
  get: () => props.input,
  set: (value) => {
    emit('update-input', value)
  }
})

const submit = (dataSubmit: any) => {
  emit('submit', dataSubmit)
}

const save = () => {
  emit('save')
  input.value = false
}

</script>

<template>
  <v-dialog max-width="500" v-model="input">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn icon flat v-bind="activatorProps">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </template>

    <template v-slot:default="{ isActive }">
      <v-card>
        <v-card-title class="d-flex justify-center align-center">
          <h3>{{ props.title }}</h3>
          <v-spacer />
          <v-btn @click="isActive.value = false" icon flat>
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider />
        <v-card-text>
          <forms :items="props.items" @submit="submit($event)" />
        </v-card-text>
        <v-divider />
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            text="Save"
            @click="save()"
            class="text-none ms-4 text-white"
            color="blue-darken-4"
            rounded="4"
            variant="flat"
          ></v-btn>
          <v-btn
            text="Close"
            @click="isActive.value = false"
            class="text-none"
            color="grey-lighten-3"
            rounded="4"
            variant="flat"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<style></style>
