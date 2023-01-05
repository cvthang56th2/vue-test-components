const SelectDropdown = {
  template: `
    <div class="relative w-full">
      <div class="p-1 border-2 rounded-md w-full h-[36px] cursor-pointer hover:bg-blue-50 flex items-center justify-between" :class="[selectedValue ? '' : 'text-gray-400', capitalizeOption ? 'capitalize' : '', inputClass]" @click.stop="openDropdown()">
        <div>
          {{ selectedValue || placeholder }}
        </div>
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16" :class="isShowDropdown ? 'rotate-180' : ''">
            <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
          </svg>
        </div>
      </div>
      <ul v-if="isShowDropdown" class="absolute bg-white w-full shadow-md z-[2]" :class="dropdownClasses">
        <input
          id="inputDropdown" v-model="keyword" 
          class="px-2 py-1 border-b-2 last:border-b-0 w-full"
          @input="selectedItemIndex = 0"
          @keydown="onKeydownKeyword" 
          @click.stop
        >
        <li
          v-for="(optionStr, oIndex) in computedOptions"
          class="px-2 py-1 border-b-2 last:border-b-0"
          :class="[
            selectedValue === optionStr ? 'bg-green-200 text-white' : 'hover:bg-gray-200 cursor-pointer',
            selectedItemIndex === oIndex ? 'bg-blue-300' : '',
            capitalizeOption ? 'capitalize' : ''
          ]"
          @click="changeOption(optionStr)"
        >
          {{optionStr}}
        </li>
      </ul>
    </div>
  `,
  props: {
    options: {
      type: Array,
      required: true
    },
    modelValue: {
    },
    capitalizeOption: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: 'Select'
    },
    dropdownClasses: {
      type: String,
      default: ''
    },
    inputClass: {
      type: String,
      default: ''
    }
  },
  watch: {
    modelValue: {
      immediate: true,
      handler (v) {
        this.selectedValue = v
      }
    }
  },
  computed: {
    computedOptions () {
      let result = JSON.parse(JSON.stringify(this.options))
      if (this.keyword) {
        const reg = new RegExp(this.keyword, 'gi')
        result = result.filter(e => e.match(reg))
      }
      return result
    }
  },
  data: () => ({
    selectedValue: null,
    keyword: '',
    selectedItemIndex: 0,
    isShowDropdown: false
  }),
  methods: {
    changeOption (optionStr) {
      if (this.selectedValue === optionStr) {
        return
      }
      this.selectedValue = optionStr
      this.$emit('update:modelValue', this.selectedValue)
      this.$emit('selected', this.selectedValue)
    },
    async openDropdown () {
      this.isShowDropdown = true
      await this.$nextTick()
      document.querySelector('#inputDropdown').focus()
    },
    onKeydownKeyword (e) {
      const value = this.computedOptions[this.selectedItemIndex]
      if (['Enter', 'Tab'].includes(e.key)) {
        if (value) {
          this.changeOption(value)
        }
        this.closeDropdown()
      } else if (e.key === 'ArrowDown') {
        this.selectedItemIndex++
        if (this.selectedItemIndex >= this.computedOptions.length) {
          this.selectedItemIndex = 0
        }
      } else if (e.key === 'ArrowUp') {
        this.selectedItemIndex--
        if (this.selectedItemIndex < 0) {
          this.selectedItemIndex = this.computedOptions.length ? this.computedOptions.length - 1 : 0
        }
      }
    },
    closeDropdown () {
      this.keyword = ''
      this.selectedItemIndex = 0
      this.isShowDropdown = false
      this.$emit('closed')
    }
  },
  beforeDestroy() {
    document.removeEventListener('click', this.closeDropdown)
  },
  mounted () {
    document.addEventListener('click', this.closeDropdown)
  }
}