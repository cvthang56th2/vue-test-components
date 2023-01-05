const { createApp } = Vue;

const filterSeal = (value = '') => {
  return value.trim().replace(/ /gm, '_')
}

createApp({
  components: {
    'input-tags': InputTags,
    'select-dropdown': SelectDropdown
  },
  data() {
    return {
      types: allTypes,
      allKeys,
      keys: Object.keys(allKeys),
      dropdownKeyword: '',
      selectedItemIndex: 0,
      isShowPreviewJSON: false,
      formData: {
        keywords: [],
        attributes: [{
          type: 'string'
        }],
        supports: []
      }
    };
  },
  computed: {
    addNewSupportAble () {
      return this.formData.supports.length !== Object.keys(allKeys).length
    },
    addPropertiesAble () {
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
    },
    errorsAttributes () {
      const resultObj = {}
      for (const index in this.formData.attributes) {
        const { label, enum: enums, type } = this.formData.attributes[index]
        if (!label) {
          resultObj[index] = resultObj[index] || {}
          resultObj[index].label = true
        }
        if ((type === 'enum' && !enums?.length)) {
          resultObj[index] = resultObj[index] || {}
          resultObj[index].enum = true
        }
      }
      return resultObj
    },
    errorsSupports () {
      const resultObj = {}
      for (const index in this.formData.supports) {
        const { key } = this.formData.supports[index]
        if (!key) {
          resultObj[index] = resultObj[index] || {}
          resultObj[index].key = true
        }
      }
      return resultObj
    }
  },
  methods: {
    filterSelected (arr, selected, value) {
      return arr.filter(e => !selected.includes(e) || e === value)
    },
    addNewSupport () {
      if (Object.keys(this.errorsSupports).length) {
        return
      }
      this.formData.supports.push({})
    },
    addNewAttribute () {
      if (Object.keys(this.errorsAttributes).length) {
        return
      }
      this.formData.attributes.push({
        type: 'string'
      })
    },
    onChangeAttributeType (aIndex, typeStr) {
      if (typeStr === 'enum') {
        this.formData.attributes[aIndex].enum = []
      } else {
        delete this.formData.attributes[aIndex].enum
      }
    },
    onChangeSupportKey (sIndex, keyStr) {
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
    onChangeSupportProperty (sIndex, pIndex, propertyStr) {
      const propertyObj = allKeys[this.formData.supports[sIndex].key].properties[propertyStr]
      this.formData.supports[sIndex].properties[pIndex].value = propertyObj.default
      this.formData.supports[sIndex].properties[pIndex].valueType = propertyObj.type
      if (propertyObj.type === 'booleanOrArray') {
        this.formData.supports[sIndex].properties[pIndex].exactType = 'boolean'
      }
    },
  }
})
.mount("#app");
