const { createApp } = Vue;
const projectName = "gutenberg_block"
const allKeys = {
  anchor: {
    default: false,
    type: 'boolean'
  },
  align: {
    default: false,
    type: 'booleanOrArray',
  },
  alignWide: {
    default: true,
    type: 'boolean'
  },
  ariaLabel: {
    default: false,
    type: 'boolean'
  },
  className: {
    default: true,
    type: 'boolean'
  },
  color: {
    default: null,
    type: 'object',
    properties: {
      background: {
        type: 'boolean',
        default: true,
      },
      __experimentalDuotone: {
        type: 'string',
        default: undefined,
      },
      gradients: {
        type: 'boolean',
        default: false,
      },
      link: {
        type: 'boolean',
        default: false,
      },
      text: {
        type: 'boolean',
        default: true,
      },
    }
  },
  customClassName: {
    default: true,
    type: 'boolean'
  },
  defaultStylePicker: {
    default: true,
    type: 'boolean'
  },
  html: {
    default: true,
    type: 'boolean'
  },
  inserter: {
    default: true,
    type: 'boolean'
  },
  multiple: {
    default: true,
    type: 'boolean'
  },
  reusable: {
    default: true,
    type: 'boolean'
  },
  lock: {
    default: true,
    type: 'boolean'
  },
  spacing: {
    default: false,
    type: 'object',
    properties: {
      margin: {
        type: 'booleanOrArray',
        default: false
      },
      padding: {
        type: 'booleanOrArray',
        default: false
      },
      blockGap: {
        type: 'booleanOrArray',
        default: false
      },
    }
  },
  typography: {
    default: false,
    type: 'object',
    properties: {
      fontSize: {
        type: 'boolean',
        default: false
      },
      lineHeight: {
        type: 'boolean',
        default: false
      },
    }
  }
}
const filterSeal = (value = '') => {
  return value.trim().replace(/ /gm, '_')
}

createApp({
  data() {
    return {
      allKeys,
      dropdownKeyword: '',
      selectedItemIndex: 0,
      isShowPreviewJSON: false,
      formData: {
        keywords: [],
        attributes: [{
          type: 'string'
        }],
        supports: [{}]
      }
    };
  },
  computed: {
    types () {
      let result = [
        'null',
        'boolean',
        'object',
        'array',
        'string',
        'number',
        'enum'
      ]
      if (this.dropdownKeyword) {
        const reg = new RegExp(this.dropdownKeyword, 'gi')
        result = result.filter(e => e.match(reg))
      }
      return result
    },
    keys () {
      let result = Object.keys(allKeys)
      if (this.dropdownKeyword) {
        const reg = new RegExp(this.dropdownKeyword, 'gi')
        result = result.filter(e => e.match(reg))
      }
      return result
    },
    addNewSupportAble () {
      return this.formData.supports.length !== Object.keys(allKeys).length
    },
    addPropertyAble () {
      return this.formData.supports.map((supportObj, sIndex) => {
        return (supportObj.properties || []).length !== (this.properties[sIndex] || []).length
      })
    },
    properties () {
      return this.formData.supports.reduce((resultArr, supportObj) => {
        const keyObj = allKeys[supportObj.key]
        let result = keyObj && keyObj.type === 'object' ? Object.keys(keyObj.properties) : []
        if (this.dropdownKeyword) {
          const reg = new RegExp(this.dropdownKeyword, 'gi')
          result = result.filter(e => e.match(reg))
        }
        resultArr.push(result)
        return resultArr
      }, [])
    },
    json_result () {
      const { name, category, description, icon, keywords, attributes, supports } = this.formData
      let result = {
        "$schema": "https://schemas.wp.org/trunk/block.json",
        "apiVersion": 2,
        "name": `${projectName}/${filterSeal(name)}`,
        "title": name,
        "category": category,
        "parent": [ "core/group" ],
        "icon": icon,
        "description": description,
        "keywords": keywords,
        "version": "1.0.3",
        "textdomain": "my-plugin",
        "attributes": attributes.reduce((resultObj, attributeObj) => {
          const { label, type, enum: enums, example, source, selector, attribute } = attributeObj
          const itemObj = {
            example,
            source,
            selector,
            attribute
          }
          if (type === 'enum') {
            itemObj.enum = enums
          } else {
            itemObj.type = type
          }
          resultObj[label] = itemObj
          return resultObj
        }, {}),
        "providesContext": {
            "my-plugin/message": "message"
        },
        "usesContext": [ "groupId" ],
        "supports": supports.reduce((resultObj, supportObj) => {
          const { key, valueType, value, properties } = supportObj
          if (valueType === 'object') {
            resultObj[key] = (properties || []).reduce((_resultObj, propertyObj) => {
              _resultObj[propertyObj.property] = propertyObj.value
              return _resultObj
            }, {})
          } else {
            resultObj[key] = value
          }
          return resultObj
        }, {}),
        "example": {
          "attributes": {
              "message": "This is a notice!"
          }
        },
        "editorScript": "file:./index.js",
        "script": "file:./script.js",
        "viewScript": [ "file:./view.js", "example-shared-view-script" ],
        "editorStyle": "file:./index.css",
        "style": [ "file:./style.css", "example-shared-style" ],
        "render": "file:./render.php"
      }
      return JSON.stringify(result, 0, 2)
    }
  },
  methods: {
    addNewSupport () {
      if (!this.addNewSupportAble) {
        return
      }
      const errors = []
      for (const index in this.formData.supports) {
      }
      if (errors.length) {
        alert(`Errors:\n${errors.join('\n')}`)
        return
      }
      this.formData.supports.push({})
    },
    filterSelected (arr, selected, value) {
      return arr.filter(e => !selected.includes(e) || e === value)
    },
    addNewAttribute () {
      const errors = []
      for (const index in this.formData.attributes) {
        const { label, enum: enums, type } = this.formData.attributes[index]
        if (!label) {
          errors.push(`Attr #${Number(index) + 1}: Label is required`)
        }
        if ((type === 'enum' && !enums?.length)) {
          errors.push(`Attr #${Number(index) + 1}: Type Enum must have at least 1 item.`)
        }
      }
      if (errors.length) {
        alert(`Errors:\n${errors.join('\n')}`)
        return
      }
      this.formData.attributes.push({
        type: 'string'
      })
    },
    closeAllMenu () {
      this.selectedItemIndex = 0
      this.dropdownKeyword = ''
      for (const item of this.formData.attributes) {
        if (item.isShowTypeMenu) {
          item.isShowTypeMenu = false
        }
      }
      for (const item of this.formData.supports) {
        if (item.isShowKeyMenu) {
          item.isShowKeyMenu = false
        }
        for (const propertyObj of (item.properties || [])) {
          if (propertyObj.isShowPropertyMenu) {
            propertyObj.isShowPropertyMenu = false
          }
        }
      }
    },
    changeAttributeType (aIndex, typeStr) {
      if (this.formData.attributes[aIndex].type === typeStr) {
        return
      }
      this.formData.attributes[aIndex].type = typeStr
      if (typeStr === 'enum') {
        this.formData.attributes[aIndex].enum = []
      } else {
        delete this.formData.attributes[aIndex].enum
      }
    },
    async openTypeMenu (aIndex) {
      this.closeAllMenu()
      this.formData.attributes[aIndex].isShowTypeMenu = true
      await this.$nextTick()
      document.querySelector('#inputDropdownType').focus()
    },
    changeSupportKey (sIndex, keyStr) {
      if (this.formData.supports[sIndex].key === keyStr) {
        return
      }
      this.formData.supports[sIndex].key = keyStr
      const keyObj = allKeys[keyStr]
      this.formData.supports[sIndex].value = keyObj.default
      this.formData.supports[sIndex].valueType = keyObj.type
      if (keyObj.type === 'object') {
        this.formData.supports[sIndex].properties = [{}]
        delete this.formData.supports[sIndex].exactType
      } else if (keyObj.type === 'booleanOrArray') {
        this.formData.supports[sIndex].exactType = 'boolean'
      }
    },
    async openKeyMenu (sIndex) {
      this.closeAllMenu()
      this.formData.supports[sIndex].isShowKeyMenu = true
      await this.$nextTick()
      document.querySelector('#inputDropdownKey').focus()
    },
    onBlurInputKeyword () {
      this.createNewKeyword()
    },
    onKeydownDropdownKeyword (e, index, key, isProperties, subIndex) {
      let dropdown  = []
      if (isProperties) {
        dropdown = this.properties[index]
      } else {
        dropdown = key === 'attributes' ? this.types : this.keys
      }
      const value = dropdown[this.selectedItemIndex]
      if (['Enter', 'Tab'].includes(e.key)) {
        if (value) {
          if (isProperties) {
            this.changeSupportProperty(index, subIndex, value)
          } else {
            if (key === 'attributes') {
              this.changeAttributeType(index, value)
            } else {
              this.changeSupportKey(index, value)
            }
          }
        }
        this.closeAllMenu()
      } else if (e.key === 'ArrowDown') {
        this.selectedItemIndex++
        if (this.selectedItemIndex >= dropdown.length) {
          this.selectedItemIndex = 0
        }
      } else if (e.key === 'ArrowUp') {
        this.selectedItemIndex--
        if (this.selectedItemIndex < 0) {
          this.selectedItemIndex = dropdown.length ? dropdown.length - 1 : 0
        }
      }
    },
    onKeydownInputKeyword (e) {
      if (['Enter', 'Tab'].includes(e.key)) {
        e.preventDefault();
        this.createNewKeyword()
      }
    },
    removeKeyword (kIndex) {
      this.formData.keywords.splice(kIndex, 1)
    },
    createNewKeyword () {
      const { inputKeyword, keywords } = this.formData
      if (inputKeyword) {
        if (!keywords.includes(inputKeyword)) {
          keywords.push(this.formData.inputKeyword)
        }
        this.formData.inputKeyword = ''
        this.formData.keywords = keywords
      }
    },

    onBlurInputEnum (aIndex) {
      this.createNewEnumValue(aIndex)
    },
    onKeydownInputEnum (e, aIndex) {
      if (['Enter', 'Tab'].includes(e.key)) {
        e.preventDefault();
        this.createNewEnumValue(aIndex)
      }
    },
    removeEnum (aIndex, kIndex) {
      this.formData.attributes[aIndex].enum.splice(kIndex, 1)
    },
    createNewEnumValue (aIndex) {
      if (this.formData.attributes[aIndex].inputEnum) {
        this.formData.attributes[aIndex].enum = this.formData.attributes[aIndex].enum || []
        if (!this.formData.attributes[aIndex].enum.includes(this.formData.attributes[aIndex].inputEnum)) {
          this.formData.attributes[aIndex].enum.push(this.formData.attributes[aIndex].inputEnum)
        }
        this.formData.attributes[aIndex].inputEnum = ''
      }
    },

    onBlurInputValueItem (sIndex) {
      this.createNewValueItemValue(sIndex)
    },
    onKeydownInputValueItem (e, sIndex) {
      if (['Enter', 'Tab'].includes(e.key)) {
        e.preventDefault();
        this.createNewValueItemValue(sIndex)
      }
    },
    removeValueItem (sIndex, iIndex) {
      this.formData.supports[sIndex].value.splice(iIndex, 1)
    },
    createNewValueItemValue (sIndex) {
      if (this.formData.supports[sIndex].inputValueItem) {
        this.formData.supports[sIndex].value = this.formData.supports[sIndex].value || []
        if (!this.formData.supports[sIndex].value.includes(this.formData.supports[sIndex].inputValueItem)) {
          this.formData.supports[sIndex].value.push(this.formData.supports[sIndex].inputValueItem)
        }
        this.formData.supports[sIndex].inputValueItem = ''
      }
    },

    async openPropertyMenu (sIndex, pIndex) {
      this.closeAllMenu()
      this.formData.supports[sIndex].properties[pIndex].isShowPropertyMenu = true
      await this.$nextTick()
      document.querySelector('#inputDropdownProperty').focus()
    },
    changeSupportProperty (sIndex, pIndex, propertyStr) {
      if (this.formData.supports[sIndex].properties[pIndex].property === propertyStr) {
        return
      }
      this.formData.supports[sIndex].properties[pIndex].property = propertyStr
      const propertyObj = allKeys[this.formData.supports[sIndex].key].properties[propertyStr]
      this.formData.supports[sIndex].properties[pIndex].value = propertyObj.default
      this.formData.supports[sIndex].properties[pIndex].valueType = propertyObj.type
      if (propertyObj.type === 'booleanOrArray') {
        this.formData.supports[sIndex].properties[pIndex].exactType = 'boolean'
      }
    },

    onBlurInputPropertyValueItem (sIndex, pIndex) {
      this.createNewPropertyValueItemValue(sIndex, pIndex)
    },
    onKeydownInputPropertyValueItem (e, sIndex, pIndex) {
      if (['Enter', 'Tab'].includes(e.key)) {
        e.preventDefault();
        this.createNewPropertyValueItemValue(sIndex, pIndex)
      }
    },
    removePropertyValueItem (sIndex, pIndex, iIndex) {
      this.formData.supports[sIndex].properties[pIndex].value.splice(iIndex, 1)
    },
    createNewPropertyValueItemValue (sIndex, pIndex) {
      let { inputPropertyValueItem, value } = this.formData.supports[sIndex].properties[pIndex]
      if (inputPropertyValueItem) {
        value = value || []
        if (!value.includes(inputPropertyValueItem)) {
          value.push(inputPropertyValueItem)
        }
        this.formData.supports[sIndex].properties[pIndex].value = value
        this.formData.supports[sIndex].properties[pIndex].inputPropertyValueItem = ''
      }
    },
  },
  mounted () {
    document.addEventListener('click', () => {
      this.closeAllMenu()
    })
  }
})
.mount("#app");
