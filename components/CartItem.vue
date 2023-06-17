<template>
  <div>
    <p>{{ getGroupName(String(item.G)) }}</p>
    <p>{{ getProductName(String(item.T)) }}</p>
    <p>{{ (item.C * currencyRate).toFixed(2) }}</p>
    <p>{{ item.P }}</p>
    <button @click="removeFromCart(item)">Удалить из корзины</button>
  </div>
</template>

<script lang="ts">
import { TypeProduct } from '@/types/product'
export default {
  props: {
    item: {
      type: Object as () => TypeProduct,
      required: true,
    },
  },
  setup() {
    const store = useStore()

    const removeFromCart = (item: any) => {
      store.removeFromCart( item)
    }

    return {
      removeFromCart,
      getGroupName: store.getGroupName,
      getProductName: store.getProductName,
      currencyRate: store.currencyRate,
    }
  },
}
</script>
