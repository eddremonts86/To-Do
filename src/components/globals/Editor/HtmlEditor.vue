<template>
  <div
    ref="editor"
    class="trix-override w-100"
    :class="{ 'note-item': noteItem, focused }"
    :key="uniqueId"
  >
    <input id="trix-input-element" type="hidden" name="content" :value="model" />
    <trix-editor
      placeholder=""
      input="trix-input-element"
      @focus="focus(true)"
      @blur="focus(false)"
      @input="checkInput"
      @trix-initialize="setEditor"
      @trix-change="model = $event.target.value"
    />
  </div>
</template>

<script>
import { uniqueId } from '@/libs/helpers'
import 'trix/dist/trix.css'
import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    value: { type: String, default: '' },
    noteItem: { type: Boolean, default: false }
  },

  data() {
    return {
      lastValue: this.value,
      valueBank: [],
      focused: false,
      editor: null,
      flagDelete: false,
      tooLong: false,
      uniqueId: uniqueId('htmlEditor_')
    }
  },

  computed: {
    model: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    }
  },

  watch: {
    value(val) {
      this.lastValue = val
      if (!val) {
        // reset Trix input (does not accept 2-way data binding, only loads first value)
        this.editor.loadHTML('')
        this.valueBank = []
      }
    },

    focused() {
      this.handleFocused()
    },

    tooLong() {
      if (this.tooLong) {
        this.$emit('disable', true)
      } else {
        this.$emit('disable', false)
      }
    }
  },

  created() {
    import('trix')
  },

  mounted() {
    this.valueBank = []
    if (!this.noteItem) {
      this.$nextTick(() => {
        this.handleFocused()
      })
    }
    document.addEventListener('keydown', this.inputChecker)
    document.addEventListener('mouseup', this.preventRedirect)
  },

  beforeUnmount() {
    document.removeEventListener('keydown', this.inputChecker)
    document.removeEventListener('mouseup', this.preventRedirect)
  },

  methods: {
    handleFocused() {
      const mainEl = this.$refs.editor.childNodes?.[1]
      if (!mainEl) {
        return
      }
      mainEl.style.visibility = 'visible'
      const subEl = mainEl.childNodes?.[0]
      if (!subEl) {
        return
      }
      if (!this.focused) {
        subEl.style.display = 'none'
      } else {
        subEl.style.display = ''
      }
    },

    setEditor(e) {
      this.editor = e.target.editor
      const el = document.getElementsByClassName('trix-input--dialog')?.[0]
      if (!el) {
        return
      }
      el.type = 'text'
      // naive pattern match, will allow broken links
      // eslint-disable-next-line no-useless-escape
      el.pattern = '.+\..[.a-z, A-Z]+'
    },

    focus(bool) {
      this.focused = bool
      this.$emit('focused', bool)
    },

    checkInput(e) {
      const value = e.target.value
      const text = value.replace(/<\/?[^>]+(>|$)/g, '') // strips html tags
      if (text.length > 1000) {
        this.tooLong = true
      } else {
        this.tooLong = false
      }
      this.lastValue = value
      if (this.flagDelete) {
        this.flagDelete = false
        // bug: trix has a 'Maximum call stack size exceeded' situation sometimes
        try {
          this.editor.deleteInDirection('backward')
        } catch {
          // ignore
        }
      }
    },

    inputChecker(e) {
      if (this.focused) {
        if (['Enter', 'Backspace'].includes(e.key)) {
          this.valueBank = []
          return false
        }
        if (['1', '-'].includes(e.key)) {
          this.valueBank.push(e.key)
        } else if (['1', '-'].includes(this.valueBank[0])) {
          if (
            e.key === ' ' &&
            (this.valueBank[0] === '-' || (this.valueBank[0] === '1' && this.valueBank[1] === '.'))
          ) {
            // bug: trix has a 'Maximum call stack size exceeded' situation sometimes
            try {
              if (this.valueBank[0] === '-') {
                this.editor.activateAttribute('bullet')
                this.flagDelete = true
              } else {
                this.editor.deleteInDirection('backward')
                this.editor.activateAttribute('number')
                this.flagDelete = true
              }
            } catch {
              // ignore
            }
            this.valueBank = []
            return true
          } else {
            this.valueBank.push(e.key)
          }
        } else {
          this.valueBank.push(e.key)
        }
      }
      return false
    },

    preventRedirect(e) {
      if (
        (this.focused || !this.noteItem) &&
        e.target.href &&
        !e.target.classList.contains('v-list-item--link')
      ) {
        e.preventDefault()
        e.stopPropagation()
        e.target.target = '_blank'
        return false
      }
    }
  }
})
</script>

<style lang="scss" scoped>
::deep .v-text-field__slot {
  padding-bottom: 54px !important;
}
.trix-override {
  position: relative;
  ::deep .trix-content {
    color: #44444f !important;
    max-height: 450px;
    overflow-y: auto;
  }
  ::deep trix-editor {
    background-color: white !important;
    border: none;
    padding: 25px;
  }
  ::deep trix-toolbar {
    border: 1px solid lightgrey;
    border-radius: 5px;
    position: absolute;
    top: -34px;
    left: -1px;
    visibility: hidden;
  }
  ::deep .trix-button-group {
    background-color: white;
    border: none;
    margin-bottom: 0px;
    margin-left: 0px;
  }
  ::deep .trix-button--icon {
    width: 28px;
    height: 24px;
  }
  ::deep .trix-button--icon:before {
    margin: auto;
    width: 19px;
    height: 19px;
  }
  ::deep .trix-dialog--link {
    width: fit-content;
    padding: 2px 2px;
    border-top: none;
  }
  ::deep .trix-button--icon-bold {
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
  }
  ::deep .trix-button--icon-heading-1 {
    display: none !important;
  }
  ::deep .trix-button--icon-quote {
    display: none !important;
  }
  ::deep .trix-button--icon-code {
    display: none !important;
  }
  ::deep .trix-button-group--file-tools {
    display: none !important;
  }
  ::deep .trix-button--icon-undo {
    display: none !important;
  }
  ::deep .trix-button--icon-redo {
    display: none !important;
  }
  ::deep .trix-button--icon-link {
    border-right: 1px solid lightgrey;
  }
  ::deep .trix-button {
    border: none;
  }
  ::deep .trix-button:hover {
    background-color: rgb(244, 244, 244);
  }
  ::deep .trix-button.trix-active {
    background: blue !important;
  }
  ::deep .trix-button.trix-active::before {
    filter: invert(1) !important;
  }
}
.trix-override.note-item {
  ::deep trix-toolbar {
    top: -40px;
    left: 0px;
  }
}
.trix-override.focused {
  ::deep .trix-input--dialog {
    pointer-events: none !important;
  }
}
</style>
