<script setup lang="ts">
import Status from './components/Status.vue'
import Settings from './components/Settings.vue'
import { Vue3ToggleButton } from 'vue3-toggle-button'
import '../node_modules/vue3-toggle-button/dist/style.css'
import { ref } from 'vue'
import SimpleKeyboard from "./components/SimpleKeyboard.vue";
import AppTable from './components/AppTable.vue'

const isActive = ref(false)
const percent = ref(0)
setInterval(() => {
  percent.value++
  if (percent.value === 100) {
    percent.value = 0
  }
}, 50)
const data = ref('')
const onChange = (input) => {
  data.value = input;
}
const onKeyPress = (button) => {
  console.log("button", button);
}
const onInputChange = (input) => {
  data.value = input.target.value;
}
const headers = Array.from(Array(10).keys()).map((e, i) => ({
  label: `col ${i}`,
  field: `field${i}`,
  class: i === 0 ? 'w-1/2' : '',
  sortAble: true
}))
const items = Array.from(Array(5).keys()).map((e, i) => ({
  ...Array.from(Array(10).keys()).reduce((resultObj:any, e, _i) => {
    resultObj[`field${_i}`] = `F${_i} - Value${i}`
    return resultObj
  }, {}),
  id: `id${i}`
}))
const onCheckItems = (items: any) => {
  console.log(items)
}
const onRowClicked = (item: any) => {
  console.log(item)
}
</script>

<template>
<!-- <Status /> -->
<!-- <Settings /> -->
<Vue3ToggleButton v-model:isActive="isActive" :handleColor="'#cc00cc'"> </Vue3ToggleButton>
<div class="mt-10">
  <div class="w-[150px] h-[150px] border-2 rounded-full">
    <div class="w-full h-full bg-blue-200 rounded-full circle-fill" :style="`--percent: ${percent}%`"></div>
  </div>
</div>
<input
  :value="data"
  class="input"
  @input="onInputChange"
  placeholder="Tap on the virtual keyboard to start"
>
<SimpleKeyboard @onChange="onChange" @onKeyPress="onKeyPress" :input="data"/>
<AppTable
  isShowCheck
  :headers="headers"
  :items="items"
  @onCheckItems="onCheckItems"
  @onRowClicked="onRowClicked"
/>
</template>

<style scoped>
@import "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css";
.circle-fill {
  transition: all 1s;
  background: conic-gradient( blue var(--percent),#FFF var(--percent) );
}
</style>
