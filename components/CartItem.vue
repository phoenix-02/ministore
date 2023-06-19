<template>
  <div>
    <p>{{ getProductName(item.T) }}</p>
    <p>{{ (item.C * currencyRate).toFixed(2) }} /шт</p>
    <p>{{ item.P }}</p>
    <button @click="removeFromCart(item)">
      Удалить из корзины
    </button>
  </div>
</template>

<script lang="ts">
import { TypeProduct } from '@/types/product'
import { useStore } from '~/store'
export default {
  props: {
    item: {
      type: Object as () => TypeProduct,
      required: true
    }
  },
  setup () {
    const store = useStore()

    const removeFromCart = (item: any) => {
      store.removeFromCart(item)
    }

    return {
      removeFromCart,
      getProductName: store.getProductName,
      currencyRate: store.currencyRate
    }
  }
}
</script>
