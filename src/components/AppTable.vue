<script lang="ts" setup>
import { computed, ref } from 'vue'
import moment from 'moment'
import { get } from 'lodash'
const sortCallBack = (keyString:string, asc = true, type: string, getValueFunction: Function) => {
  return function (item1: any, item2: any) {
    let compareValue1 = item1
    let compareValue2 = item2
    if (keyString) {
      compareValue1 = get(compareValue1, keyString)
      compareValue2 = get(compareValue2, keyString)
    }
    if (typeof getValueFunction === 'function') {
      compareValue1 = getValueFunction(compareValue1)
      compareValue2 = getValueFunction(compareValue2)
    }

    switch (String(type).toLowerCase()) {
      case 'number':
        compareValue1 = Number(compareValue1) || 0
        compareValue2 = Number(compareValue2) || 0
        break
      case 'string':
        compareValue1 = String(compareValue1 || '').toUpperCase()
        compareValue2 = String(compareValue2 || '').toUpperCase()
        break
      case 'date':
        if (!compareValue1 && !compareValue2) {
          return 0
        }
        if (!compareValue1 && compareValue2) {
          return -1 * (asc ? 1 : -1)
        }
        if (compareValue1 && !compareValue2) {
          return (asc ? 1 : -1)
        }
        compareValue1 = moment.utc(compareValue1)
        compareValue2 = moment.utc(compareValue2)
        return (compareValue1.isAfter(compareValue2) ? 1 : -1) * (asc ? 1 : -1)
      case 'boolean':
        compareValue1 = typeof compareValue1 === 'boolean' ? String(compareValue1) : ''
        compareValue2 = typeof compareValue2 === 'boolean' ? String(compareValue2) : ''
        return (compareValue1 > compareValue2 ? 1 : -1) * (asc ? 1 : -1)
    }
    return (compareValue1 > compareValue2 ? 1 : -1) * (asc ? 1 : -1)
  }
}
const props = defineProps<{
  headers: array,
  items: array,
  isShowCheck?: boolean
}>()
const emit = defineEmits()
const sortData = ref({
  by: '',
  asc: false,
  type: 'string'
})
const checkedItems = ref([])

const computedItems = computed(() => {
  const { by, asc, type } = sortData.value
  let resultArr = JSON.parse(JSON.stringify(props.items))
  if (by) {
    resultArr = resultArr.sort(sortCallBack(by, asc, type, () => {}))
  }
  return resultArr
})

const setSort = (field: string, type: string) => {
  const { by, asc } = sortData.value
  if (by === field) {
    sortData.value.asc = !asc
  } else {
    sortData.value.type = type || 'string'
    sortData.value.by = field
    sortData.value.asc = false
  }
}

const onCheck = () => {
  emit('onCheckItems', JSON.parse(JSON.stringify(checkedItems.value.map(i => computedItems.value[i]))))
}
</script>

<template>
  <div>
    <div class="flex">
      <div v-if="isShowCheck" class="w-[100px]">
      </div>
      <div
        v-for="(headerObj, hIndex) in headers"
        :key="`header-${hIndex}`"
        class="flex items-center text-center px-2"
        :class="[headerObj.class || 'flex-1', headerObj.sortAble ? 'cursor-pointer' : '']"
        @click="headerObj.sortAble ? setSort(headerObj.field, headerObj.fieldType) : ''"
      >
        {{ headerObj.label }}
        <span v-if="sortData.by === headerObj.field">
          <i class="fa" :class="sortData.asc ? 'fa-sort-asc' :'fa-sort-desc'" aria-hidden="true"></i>
        </span>
      </div>
    </div>
    <div v-for="(itemObj, iIndex) in computedItems" :key="`item-${iIndex}`" class="flex" @click="$emit('onRowClicked', itemObj)">
      <div v-if="isShowCheck" class="w-[100px]">
        <input v-model="checkedItems" type="checkbox" class="cursor-pointer" :value="iIndex" @click.stop @change="onCheck">
      </div>
      <div
        v-for="(headerObj, hIndex) in headers"
        :key="`item-${iIndex}-cell-${hIndex}`"
        class="px-2"
        :class="headerObj.class || 'flex-1'"
      >
        {{itemObj[headerObj.field]}}
      </div>
    </div>
  </div>
</template>