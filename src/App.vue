<script setup lang="ts">
import Status from './components/Status.vue'
import Settings from './components/Settings.vue'
import { Vue3ToggleButton } from 'vue3-toggle-button'
import '../node_modules/vue3-toggle-button/dist/style.css'
import { ref } from 'vue'
import SimpleKeyboard from "./components/SimpleKeyboard.vue";

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
</script>

<template>
<!-- <Status /> -->
<!-- <Settings /> -->
<!-- <Vue3ToggleButton v-model:isActive="isActive" :handleColor="'#cc00cc'"> </Vue3ToggleButton>
<div class="mt-10">
  <div class="w-[150px] h-[150px] border-2 rounded-full">
    <div class="w-full h-full bg-blue-200 rounded-full circle-fill" :style="`--percent: ${percent}%`"></div>
  </div>
</div> -->
<input
  :value="data"
  class="input"
  @input="onInputChange"
  placeholder="Tap on the virtual keyboard to start"
>
<SimpleKeyboard @onChange="onChange" @onKeyPress="onKeyPress" :input="data"/>
</template>

<style scoped>
@import "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css";
.circle-fill {
  transition: all 1s;
  background: conic-gradient( blue var(--percent),#FFF var(--percent) );
}
</style>
