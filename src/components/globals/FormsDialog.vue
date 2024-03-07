<script lang="ts" setup>
import AppForms from '@/components/globals/AppForms.vue'
import type { FormItem, IDictionary } from '@/types/globalTypes'
import { computed, reactive, ref } from 'vue'
const props = defineProps<{
  items: FormItem[]
  input: boolean
  title: String
  values: Object
  icon: string | null
  size: string | null
}>()

const emit = defineEmits(['submit', 'update-input', 'save'])
let data = reactive<IDictionary>({})
const validForm = ref(false)

const dialog = computed({
  get: () => props.input || false,
  set: (value) => {
    emit('update-input', value)
  }
})

const requiredItems = (dataValues: IDictionary) => {
  if (!Object.keys(dataValues).length) return false
  const requiredItems = props.items.reduce((acc, item: FormItem) => {
    if (item.required) {
      //@ts-ignore
      acc.push(item.name)
    }
    return acc
  }, [])

  validForm.value = requiredItems.every((name: keyof IDictionary) => {
    if (dataValues[name as string].length >= 3) {
      return true
    }
    return false
  })
}

const submit = (dataSubmit: any) => {
  requiredItems(dataSubmit)
  data = dataSubmit
  emit('submit', dataSubmit)
}

const save = () => {
  if (validForm.value) {
    emit('save', data)
  }
}
</script>

<template>
  <v-dialog max-width="500" v-model="dialog" persistent>
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn icon flat variant="text" v-bind="activatorProps" :size="props.size || 'large'">
        <v-icon>{{ icon ? icon : 'mdi-plus' }}</v-icon>
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
          <AppForms :items="props.items" :values="props.values" @submit="submit($event)" />
        </v-card-text>
        <v-divider />
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            text="Save"
            :disabled="!validForm"
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
