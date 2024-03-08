<script lang="ts" setup>
import htmlEditor from '@/components/globals/Editor/HtmlEditor.vue'
import { formatDateToOther } from '@/libs/helpers'
import type { FormItem } from '@/types/globalTypes'
import type { PropType } from 'vue'
import { onMounted, reactive, watch } from 'vue'
const dataSubmit: any = reactive({})
const props = defineProps({
  items: {
    type: Array as PropType<FormItem[]>,
    required: true
  },
  values: {
    type: Object,
    required: true
  }
})

onMounted(() => {
  props.items.map((ele) => {
    if (ele.variant === 'date') {
      var todayDate = formatDateToOther()
      dataSubmit[ele.name] = props.values[ele.name] ? props.values[ele.name] : todayDate
    } else {
      dataSubmit[ele.name] = props.values[ele.name] || ''
    }
  })
})

const emit = defineEmits(['submit'])
function submit() {
  emit('submit', dataSubmit)
}

function multiple(type: string) {
  return type === 'MultiSelect'
}

watch(dataSubmit, () => {
  submit()
})
</script>

<template>
  <form class="form" @submit="submit()">
    <v-row>
      <v-col
        v-for="(item, index) in props.items"
        :key="index"
        cols="12"
        :md="props.items.length > 8 ? 6 : 12"
      >
        <v-text-field
          v-if="item.type === 'textField'"
          :class="item.name === 'id' ? 'd-none' : ''"
          v-model.trim="dataSubmit[item.name]"
          :label="item.label"
          :placeholder="item.placeholder"
          :required="item.required"
          :disabled="item.disabled"
          :type="item.variant || 'text'"
          variant="outlined"
          :hide-details="true"
          density="compact"
        />
        <v-textarea
          v-if="item.type === 'textArea'"
          v-model="dataSubmit[item.name]"
          variant="outlined"
          :label="item.label"
          :placeholder="item.placeholder"
          :required="item.required"
          :disabled="item.disabled"
          :hide-details="true"
          density="compact"
        />

        <v-checkbox
          v-if="item.type === 'checkbox'"
          v-model="dataSubmit[item.name]"
          variant="outlined"
          :label="item.label"
          :placeholder="item.placeholder"
          :required="item.required"
          :disabled="item.disabled"
          :hide-details="true"
          density="compact"
          color="primary"
        />

        <v-select
          v-if="item.type === 'select' || multiple(item.type)"
          v-model="dataSubmit[item.name]"
          variant="outlined"
          :label="item.label"
          :placeholder="item.placeholder"
          :required="item.required"
          :disabled="item.disabled"
          :items="item.options"
          :return-object="multiple(item.type)"
          :multiple="multiple(item.type)"
          item-title="label"
          item-value="value"
          :hide-details="true"
          density="compact"
        />

        <v-autocomplete
          v-if="item.type === 'autocomplete' || multiple(item.type)"
          v-model="dataSubmit[item.name]"
          variant="outlined"
          :label="item.label"
          :placeholder="item.placeholder"
          :required="item.required"
          :disabled="item.disabled"
          :items="item.options"
          :return-object="multiple(item.type)"
          :multiple="multiple(item.type)"
          item-title="label"
          item-value="value"
          :hide-details="true"
          density="compact"
          append-icon="mdi-magnify"
          persistent-hint
        />

        <div v-if="item.type === 'htmlEditor'">
          <span v-text="item.placeholder"></span>
          <htmlEditor
            :value="dataSubmit[item.name]"
            class="htmlEditor"
            @input="
              (value: string) => {
                dataSubmit[item.name] = value
              }
            "
          />
        </div>
      </v-col>
    </v-row>
  </form>
</template>

<style lang="scss" scoped>
.form {
  width: 100%;
  height: auto;
}
.htmlEditor {
  width: 100%;
  height: auto;
  border: 1px solid #ababab;
  border-radius: 4px;
  padding: 5px;
}
</style>
