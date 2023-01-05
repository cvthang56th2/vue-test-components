const InputTags = {
  template: `
    <div class="border-2 rounded-md px-2 py-1">
      <div
        v-for="(keyword, kIndex) in keywords"
        class="mr-2 mb-2 rounded-md bg-gray-800 text-white px-4 py-1 inline-flex items-center"
      >
        {{ keyword }}
        <span class="ml-2 cursor-pointer" @click="removeKeyword(kIndex)">&#10005</span>
      </div>
      <input v-model="inputKeyword" :placeholder="placeholder" id="block-input-keyword" class="w-[200px] outline-0 border-b-2 focus:border-blue-500" type="text" @blur="onBlurInputKeyword" @keydown="onKeydownInputKeyword">
    </div>
  `,
  props: {
    modelValue: {
      type: Array
    },
    placeholder: {
      type: String,
      default: 'Enter value...'
    }
  },
  watch: {
    modelValue: {
      immediate: true,
      handler (v) {
        this.keywords = v || []
      }
    }
  },
  data: () => ({
    keywords: [],
    inputKeyword: ''
  }),
  methods: {
    onBlurInputKeyword () {
      this.createNewKeyword()
    },
    onKeydownInputKeyword (e) {
      if (['Enter', 'Tab'].includes(e.key)) {
        e.preventDefault();
        this.createNewKeyword()
      }
    },
    removeKeyword (kIndex) {
      this.keywords.splice(kIndex, 1)
      this.$emit('update:modelValue', this.keywords)
    },
    createNewKeyword () {
      const { inputKeyword, keywords } = this
      if (inputKeyword) {
        if (!keywords.includes(inputKeyword)) {
          keywords.push(this.inputKeyword)
        }
        this.inputKeyword = ''
        this.keywords = keywords
        this.$emit('update:modelValue', this.keywords)
      }
    },
  }
}