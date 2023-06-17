<template>
  <div>
    <div v-for='item in goods' :key='item.T'>
      <GoodsItem :item='item' />
    </div>

    <div v-for='item in cart' :key='item.T'>
      <CartItem :item='item' />
    </div>

    <p>Сумма: {{ totalSum }}</p>
  </div>
</template>

<script lang='ts'>
import { defineComponent, onBeforeUnmount, onMounted } from 'vue'
import { useStore } from '~/store'
import GoodsItem from '~/components/GoodsItem.vue'
import CartItem from '~/components/CartItem.vue'


export default defineComponent({
  components: {
    GoodsItem,
    CartItem
  },
  setup() {

    const store = useStore()
    let intervalId: number | undefined

    onMounted(async () => {
      await store.fetchData()
      await store.fetchCurrencyRate()

      intervalId = window.setInterval(store.fetchCurrencyRate, 15000)
    })

    onBeforeUnmount(() => {
      if (intervalId) {
        window.clearInterval(intervalId)
      }
    })

    return {
      goods: store.goods,
      cart: store.cart,
      totalSum: store.totalSum
    }
  }
})
</script>
