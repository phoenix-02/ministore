<template>
  <GroupWithGoodItem v-for="group in groupsWithGoods" :key="group.G" :group="group" />
</template>
<script lang='ts'>
import { TypeGroup } from '~/types/group'

export default {
  setup () {
    const groupsWithGoods = ref<TypeGroup[]>([])

    onMounted(async () => {
      try {
        const data: any = await $fetch('/names.json') // actual type Map<string, TypeGroup>, but triggers TS2321: Excessive stack depth comparing types
        groupsWithGoods.value = Object.values(data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    })

    return {
      groupsWithGoods
    }
  }
}
</script>
