<template>
  {{ selectedRate }}
  <v-autocomplete
    v-model="selectedRate"
    :items="[{'name': 'rub', 'rate': 100}]"
    item-text="name"
    item-value="rate"
    label="Select a currency"
    return-object
  />
</template>

<script lang="ts">
import { ref, watch } from 'vue'
import { useStore } from '~/store'

export default {
  setup () {
    const store = useStore()
    const selectedRate = ref(store.selectedRate)
    const rates = computed(() => store.rates)

    watch(selectedRate, (newRate) => {
      // update the store with the selected rate
      store.$patch({
        selectedRate: newRate
      })
    })

    return {
      rates,
      selectedRate
    }
  }
}
</script>
