<template>
  <div>
    <CurrencyAutocomplete />
    <GroupsWithGoodsList />

    <div v-for="item in cart" :key="item.T">
      <!--      <CartItem :item='item' />-->
    </div>

    <p>Сумма: {{ totalSum }}</p>
  </div>
</template>

<script lang='ts'>// import CartItem from '~/components/CartItem.vue'
import { useStore } from '~/store/index'
import GroupsWithGoodsList from '~/components/GroupsWithGoodsList.vue'

export default defineComponent({
  components: {
    GroupsWithGoodsList
    // CartItem
  },
  setup () {
    const store = useStore()
    let intervalId: number | undefined
    const viewStructure = ref()

    const goods = computed(() => store.goods)

    onMounted(async () => {
      await store.fetchGoods()
      await store.fetchCurrencyRate()
      intervalId = window.setInterval(store.fetchCurrencyRate, 15000)
    })

    onBeforeUnmount(() => {
      if (intervalId) {
        window.clearInterval(intervalId)
      }
    })

    return {
      viewStructure,
      goods,
      cart: store.cart,
      totalSum: store.totalSum
    }
  }
})
</script>
