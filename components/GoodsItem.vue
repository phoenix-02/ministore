<template>
  <v-card>
    <v-card-title>{{ getProductName(String(item.T)) }}</v-card-title>
    <v-card-subtitle>{{ getGroupName(String(item.G)) }}</v-card-subtitle>
    <v-card-text>{{ item.C * currencyRate }} (осталось: {{ item.P }})</v-card-text>
    <v-card-actions>
      <v-btn color='primary' @click='addToCart(item)'>Добавить в корзину</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang='ts'>
import { TypeProduct } from '@/types/product'
export default {
  props: {
    item: {
      type: Object as () => TypeProduct,
      required: true
    }
  },
  setup() {
    const store = useStore()

    const addToCart = (item: TypeProduct) => {
      addToCart(item)
    }

    return {
      addToCart,
      getGroupName: store.getGroupName,
      getProductName: store.getProductName,
      currencyRate: store.currencyRate
    }
  }
}
</script>
