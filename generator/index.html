<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Generator</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
  </head>
  <body class="py-5">
    <header class="header">
      <div class="container mx-auto">
        <div class="header-logo">
          <a href="#"><img src="assets/logo.svg" alt="9thwonder"></a>
        </div>
      </div>
    </header>

    <main>
      <h1 class="text-3xl font-bold text-center">Generator Blocks</h1>
      <div id="app" class="container mx-auto mt-3">
        <button class="bg-blue-500 text-white px-3 py-1 rounded-md font-bold fixed top-[50px] right-[50px] z-[2]" @click="isShowPreviewJSON = true">
          Preview JSON
        </button>
        <div v-if="isShowPreviewJSON" class="h-screen w-screen fixed top-0 left-0 flex items-center justify-center bg-[rgba(0,0,0,0.3)] z-[9999]" @click="isShowPreviewJSON = false">
          <div class="flex flex-col w-3/4 h-3/4 overflow-y-auto bg-white rounded p-4" @click.stop>
            <h1 class="text-3xl font-bold">Preview JSON</h1>
            <div class="flex-1 overflow-y-auto">
              <pre>{{ json_result }}</pre> 
            </div>
          </div>
        </div>
        <div class="flex flex-wrap -mx-2">
          <div class="w-full lg:w-1/2 px-2 mb-2">
            <label for="block-name" class="block mb-1">Name</label>
            <input v-model="formData.name" placeholder="Name..." id="block-name" class="border-2 rounded-md px-2 py-1 w-full" type="text">
            <div class="text-sm text-gray-500 mt-1">(Ex: Abc Xyz)</div>
          </div>
          <div class="w-full lg:w-1/2 px-2 mb-2">
            <label for="block-category" class="block mb-1">Category</label>
            <input v-model="formData.category" placeholder="Category..." id="block-category" class="border-2 rounded-md px-2 py-1 w-full" type="text">
            <div class="text-sm text-gray-500 mt-1">(Ex: Abc Xyz)</div>
          </div>
          <div class="w-full lg:w-1/2 px-2 mb-2">
            <label for="block-description" class="block mb-1">Description</label>
            <input v-model="formData.description" placeholder="Description..." id="block-description" class="border-2 rounded-md px-2 py-1 w-full" type="text">
            <div class="text-sm text-gray-500 mt-1">(Ex: Abc Xyz)</div>
          </div>
          <div class="w-full lg:w-1/2 px-2 mb-2">
            <label for="block-icon" class="block mb-1">Icon</label>
            <input v-model="formData.icon" placeholder="Icon..." id="block-icon" class="border-2 rounded-md px-2 py-1 w-full" type="text">
            <div class="text-sm text-gray-500 mt-1">(Ex: Abc Xyz)</div>
          </div>
        </div>
        <div class="inline-block">
          <label for="block-input-keyword" class="block mb-1">Keywords</label>
          <div class="border-2 rounded-md px-2 py-1">
            <div
              v-for="(keyword, kIndex) in formData.keywords" :key="`keyword-${kIndex}`"
              class="mr-2 mb-2 rounded-md bg-gray-800 text-white px-4 py-1 inline-flex items-center"
            >
              {{ keyword }}
              <span class="ml-2 cursor-pointer" @click="removeKeyword(kIndex)">&#10005</span>
            </div>
            <input v-model="formData.inputKeyword" placeholder="Keyword..." id="block-input-keyword" class="w-[200px] outline-0 border-b-2 focus:border-blue-500" type="text" @blur="onBlurInputKeyword" @keydown="onKeydownInputKeyword">
          </div>
        </div>
        <div>
          <label for="block-attributes" class="block mb-1">Attributes</label>
          <div class="flex flex-wrap -mx-2">
            <div
              v-for="(attributeObj, aIndex) in formData.attributes"
              :key="`attribute-${aIndex}`"
              class="w-full lg:w-1/2 px-2 mb-2"
            >
              <div class="mb-1 border-2 p-2 rounded-md ">
                <div class="flex justify-between items-center mb-1">
                  <div class="text-gray-400 text-sm font-semibold">Attribute #{{aIndex + 1}}</div>
                  <button v-if="formData.attributes.length > 1" class="ml-2 px-3 py-1 text-sm font-semibold bg-red-500 text-white rounded-md" @click="formData.attributes.splice(aIndex, 1)">Remove</button>
                </div>
                <div class="w-full">
                  <div class="flex items-center mb-1">
                    <span class="flex-[0_0_80px] text-sm font-semibold text-gray-500">Label</span>
                    <input v-model="attributeObj.label" placeholder="Label..." class="p-1 border-2 rounded-md w-full" type="text">
                  </div>
                  <div class="flex items-center mb-1">
                    <span class="flex-[0_0_80px] text-sm font-semibold text-gray-500">Type</span>
                    <div class="relative w-full">
                      <div class="capitalize p-1 border-2 rounded-md w-full h-[36px] cursor-pointer hover:bg-blue-50 flex items-center justify-between" :class="attributeObj.type ? '' : 'text-gray-400'" @click.stop="openTypeMenu(aIndex)">
                        <div>
                          {{ attributeObj.type || 'Select Type' }}
                        </div>
                        <div>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16" :class="attributeObj.isShowTypeMenu ? 'rotate-180' : ''">
                            <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                          </svg>
                        </div>
                      </div>
                      <ul v-if="attributeObj.isShowTypeMenu" class="absolute bg-white w-full shadow-md z-[2]">
                        <input
                          id="inputDropdownType" v-model="dropdownKeyword" 
                          class="px-2 py-1 border-b-2 last:border-b-0 w-full"
                          @input="selectedItemIndex = 0"
                          @keydown="onKeydownDropdownKeyword($event, aIndex, 'attributes')" 
                          @click.stop
                        >
                        <li
                          v-for="(typeStr, tIndex) in types"
                          class="capitalize px-2 py-1 border-b-2 last:border-b-0"
                          :class="[
                            attributeObj.type === typeStr ? 'bg-green-200 text-white' : 'hover:bg-gray-200 cursor-pointer',
                            selectedItemIndex === tIndex ? 'bg-blue-300' : ''
                          ]"
                          @click="changeAttributeType(aIndex, typeStr)"
                        >
                          {{typeStr}}
                        </li>
                      </ul>
                    </div>
                  </div>
                  <template v-if="attributeObj.type === 'enum'">
                    <div class="flex mb-1">
                      <span class="flex-[0_0_80px] text-sm font-semibold text-gray-500"></span>
                      <div class="border-2 rounded-md px-2 py-1">
                        <div
                          v-for="(value, iIndex) in attributeObj.enum" :key="`attribute-${aIndex}-value-${iIndex}`"
                          class="mr-2 mb-2 rounded-md bg-gray-800 text-white px-4 py-1 inline-flex items-center"
                        >
                          {{ value }}
                          <span class="ml-2 cursor-pointer" @click="removeEnum(aIndex, iIndex)">&#10005</span>
                        </div>
                        <input v-model="attributeObj.inputEnum" placeholder="Enter Enum..." class="w-[200px] outline-0 border-b-2 focus:border-blue-500" type="text" @blur="onBlurInputEnum(aIndex)" @keydown="onKeydownInputEnum($event, aIndex)">
                      </div>
                    </div>
                  </template>
                  <div class="flex items-center mb-2">
                    <span class="flex-[0_0_80px] text-sm font-semibold text-gray-500">Example</span>
                    <input v-model="attributeObj.example" placeholder="Example..." class="p-1 border-2 rounded-md w-full" type="text">
                  </div>
                  <div class="flex -mx-1 mb-1">
                    <div class="w-1/3 px-1">
                      <div class="text-sm font-semibold text-gray-500">Source</div>
                      <input v-model="attributeObj.source" placeholder="Source..." class="p-1 border-2 rounded-md w-full" type="text">
                    </div>
                    <div class="w-1/3 px-1">
                      <div class="text-sm font-semibold text-gray-500">Selector</div>
                      <input v-model="attributeObj.selector" placeholder="Selector..." class="p-1 border-2 rounded-md w-full" type="text">
                    </div>
                    <div class="w-1/3 px-1">
                      <div class="text-sm font-semibold text-gray-500">Attribute</div>
                      <input v-model="attributeObj.attribute" placeholder="Attribute..." class="p-1 border-2 rounded-md w-full" type="text">
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button class=" px-3 py-1 font-semibold bg-green-500 text-white rounded-md" @click="addNewAttribute">New</button>
        </div>

        <div class="mt-4">
          <label for="block-supports" class="block mb-1">Supports</label>
          <div class="flex flex-wrap -mx-2">
            <div
              v-for="(supportObj, sIndex) in formData.supports"
              :key="`support-${sIndex}`"
              class="w-full lg:w-1/2 px-2 mb-2"
            >
              <div class="mb-1 border-2 p-2 rounded-md ">
                <div class="flex justify-between items-center mb-1">
                  <div class="text-gray-400 text-sm font-semibold">Support #{{sIndex + 1}}</div>
                  <button v-if="formData.supports.length > 1" class="ml-2 px-3 py-1 text-sm font-semibold bg-red-500 text-white rounded-md" @click="formData.supports.splice(sIndex, 1)">Remove</button>
                </div>
                <div class="w-full">
                  <div class="flex items-center mb-1">
                    <span class="flex-[0_0_80px] text-sm font-semibold text-gray-500">Key</span>
                    <div class="relative w-full">
                      <div class="p-1 border-2 rounded-md w-full h-[36px] cursor-pointer hover:bg-blue-50 flex items-center justify-between" :class="supportObj.key ? '' : 'text-gray-400'" @click.stop="openKeyMenu(sIndex)">
                        <div>
                          {{ supportObj.key || 'Select Key' }}
                        </div>
                        <div>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16" :class="supportObj.isShowKeyMenu ? 'rotate-180' : ''">
                            <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                          </svg>
                        </div>
                      </div>
                      <ul v-if="supportObj.isShowKeyMenu" class="absolute bg-white w-full shadow-md z-[2] bottom-full left-0">
                        <input
                          id="inputDropdownKey" v-model="dropdownKeyword" 
                          class="px-2 py-1 border-b-2 last:border-b-0 w-full"
                          @input="selectedItemIndex = 0"
                          @keydown="onKeydownDropdownKeyword($event, sIndex, 'supports')" 
                          @click.stop
                        >
                        <li
                          v-for="(keyStr, kIndex) in filterSelected(keys, formData.supports.map(e => e.key), supportObj.key)"
                          class="px-2 py-1 border-b-2 last:border-b-0"
                          :class="[
                            supportObj.key === keyStr ? 'bg-green-200 text-white' : 'hover:bg-gray-200 cursor-pointer',
                            selectedItemIndex === kIndex ? 'bg-blue-300' : ''
                          ]"
                          @click="changeSupportKey(sIndex, keyStr)"
                        >
                          {{keyStr}}
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div v-if="supportObj.key" class="flex mb-2">
                    <span class="flex-[0_0_80px] text-sm font-semibold text-gray-500 mt-1">Value</span>
                    <div class="w-full">
                      <template v-if="supportObj.valueType === 'booleanOrArray'">
                        <div class="flex items-center">
                          <div class="flex items-center" @click="supportObj.value = []">
                            <input v-model="supportObj.exactType" type="radio" value="array" :id="`radio-Array-${sIndex}`" class="cursor-pointer">
                            <label :for="`radio-Array-${sIndex}`" class="ml-1 cursor-pointer">Array</label>
                          </div>
                          <div class="flex items-center ml-2" @click="supportObj.value = false">
                            <input v-model="supportObj.exactType" type="radio" value="boolean" :id="`radio-Boolean-${sIndex}`" class="cursor-pointer">
                            <label :for="`radio-Boolean-${sIndex}`" class="ml-1 cursor-pointer">Boolean</label>
                          </div>
                        </div>
                      </template>
                      <div v-if="(supportObj.valueType === 'boolean') || (supportObj.exactType === 'boolean')" class="flex items-center mt-1" @click="supportObj.value = !supportObj.value">
                        <div class="w-[50px] rounded-full h-[25px] relative cursor-pointer" :class="supportObj.value ? 'bg-green-500' : 'bg-gray-500'">
                          <span class="w-[25px] h-[25px] bg-white rounded-full absolute top-0 border-2" :class="supportObj.value ? 'right-0' : 'left-0'"></span>
                        </div>
                        <div class="ml-2">{{ supportObj.value ? 'Yes' : 'No'}}</div>
                      </div>
                      <template v-if="supportObj.exactType === 'array'">
                        <div class="border-2 rounded-md px-2 py-1">
                          <div
                            v-for="(item, iIndex) in supportObj.value" :key="`item-${iIndex}`"
                            class="mr-2 mb-2 rounded-md bg-gray-800 text-white px-4 py-1 inline-flex items-center"
                          >
                            {{ item }}
                            <span class="ml-2 cursor-pointer" @click="removeValueItem(sIndex, iIndex)">&#10005</span>
                          </div>
                          <input v-model="supportObj.inputValueItem" placeholder="Enter value..." class="w-[200px] outline-0 border-b-2 focus:border-blue-500" type="text" @blur="onBlurInputValueItem(sIndex)" @keydown="onKeydownInputValueItem($event, sIndex)">
                        </div>
                      </template>
                      <div v-if="supportObj.valueType === 'object'">
                        <div v-for="(propertyObj, pIndex) in supportObj.properties" :key="`support-${sIndex}-property-${pIndex}`" class="px-1 mb-1">
                          <div>
                            <div class="flex justify-between items-center">
                              <span class="text-sm font-semibold text-gray-500">Property #{{ pIndex + 1 }}</span>
                              <button v-if="supportObj.properties.length > 1" class="text-sm font-semibold bg-red-500 text-white px-2 py-1 rounded-md" @click="supportObj.properties.splice(pIndex, 1)">Remove</button>
                            </div>
                            <div class="flex items-center mb-1">
                              <div class="relative w-full">
                                <div class="p-1 border-2 rounded-md w-full h-[36px] cursor-pointer hover:bg-blue-50 flex items-center justify-between" :class="propertyObj.property ? '' : 'text-gray-400'" @click.stop="openPropertyMenu(sIndex, pIndex)">
                                  <div>
                                    {{ propertyObj.property || 'Select property' }}
                                  </div>
                                  <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16" :class="propertyObj.isShowPropertyMenu ? 'rotate-180' : ''">
                                      <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                                    </svg>
                                  </div>
                                </div>
                                <ul v-if="propertyObj.isShowPropertyMenu" class="absolute bg-white w-full shadow-md z-[2] bottom-full left-0">
                                  <input
                                    id="inputDropdownProperty" v-model="dropdownKeyword" 
                                    class="px-2 py-1 border-b-2 last:border-b-0 w-full"
                                    @input="selectedItemIndex = 0"
                                    @keydown="onKeydownDropdownKeyword($event, sIndex, 'supports', true, pIndex)" 
                                    @click.stop
                                  >
                                  <li
                                    v-for="(propertyStr, poIndex) in filterSelected(properties[sIndex], supportObj.properties.map(e => e.property), propertyObj.property)"
                                    class="px-2 py-1 border-b-2 last:border-b-0"
                                    :class="[
                                      propertyObj.property === propertyStr ? 'bg-green-200 text-white' : 'hover:bg-gray-200 cursor-pointer',
                                      selectedItemIndex === poIndex ? 'bg-blue-300' : ''
                                    ]"
                                    @click="changeSupportProperty(sIndex, pIndex, propertyStr)"
                                  >
                                    {{propertyStr}}
                                  </li>
                                </ul>
                              </div>
                            </div>

                            <template v-if="propertyObj.valueType === 'booleanOrArray'">
                              <div class="flex items-center">
                                <div class="flex items-center" @click="propertyObj.value = []">
                                  <input v-model="propertyObj.exactType" type="radio" value="array" :id="`radio-Array-s-${sIndex}-p-${pIndex}`" class="cursor-pointer">
                                  <label :for="`radio-Array-s-${sIndex}-p-${pIndex}`" class="ml-1 cursor-pointer">Array</label>
                                </div>
                                <div class="flex items-center ml-2" @click="propertyObj.value = false">
                                  <input v-model="propertyObj.exactType" type="radio" value="boolean" :id="`radio-Boolean-s-${sIndex}-p-${pIndex}`" class="cursor-pointer">
                                  <label :for="`radio-Boolean-s-${sIndex}-p-${pIndex}`" class="ml-1 cursor-pointer">Boolean</label>
                                </div>
                              </div>
                            </template>
                            <div v-if="(propertyObj.valueType === 'boolean') || (propertyObj.exactType === 'boolean')" class="flex items-center mt-1" @click="propertyObj.value = !propertyObj.value">
                              <div class="w-[50px] rounded-full h-[25px] relative cursor-pointer" :class="propertyObj.value ? 'bg-green-500' : 'bg-gray-500'">
                                <span class="w-[25px] h-[25px] bg-white rounded-full absolute top-0 border-2" :class="propertyObj.value ? 'right-0' : 'left-0'"></span>
                              </div>
                              <div class="ml-2">{{ propertyObj.value ? 'Yes' : 'No'}}</div>
                            </div>
                            <template v-if="propertyObj.exactType === 'array'">
                              <div class="border-2 rounded-md px-2 py-1">
                                <div
                                  v-for="(item, iIndex) in propertyObj.value" :key="`item-${iIndex}`"
                                  class="mr-2 mb-2 rounded-md bg-gray-800 text-white px-4 py-1 inline-flex items-center"
                                >
                                  {{ item }}
                                  <span class="ml-2 cursor-pointer" @click="removePropertyValueItem(sIndex, pIndex, iIndex)">&#10005</span>
                                </div>
                                <input v-model="propertyObj.inputPropertyValueItem" placeholder="Enter value..." class="w-[200px] outline-0 border-b-2 focus:border-blue-500" type="text" @blur="onBlurInputPropertyValueItem(sIndex, pIndex)" @keydown="onKeydownInputPropertyValueItem($event, sIndex, pIndex)">
                              </div>
                            </template>
                            <input v-if="propertyObj.valueType === 'string'" v-model="propertyObj.value" placeholder="Enter value..." class="border-2 rounded-md px-2 py-1 w-full outline-0 border-b-2 focus:border-blue-500" type="text">
                          </div>
                        </div>
                        <button :disabled="!addPropertyAble[sIndex]" :class="addPropertyAble[sIndex] ? '' : 'opacity-50'" class=" px-3 py-1 font-semibold bg-green-500 text-white rounded-md" @click="supportObj.properties.push({})">New</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button :disabled="!addNewSupportAble" :class="addNewSupportAble ? '' : 'opacity-50'" class=" px-3 py-1 font-semibold bg-green-500 text-white rounded-md" @click="addNewSupport">New</button>
        </div>

        <div class="text-center mt-3">
          <button class="px-5 py-2 bg-yellow-200 font-semibold rounded-lg">Generate</button>
        </div>
      </div>
    </main>
    <script src="./assets/script.js"></script>
  </body>
</html>