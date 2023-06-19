<template>
  <div class="card" v-if="good">
    <div class="card-header">
      <h4>{{ goodName.N }}</h4>
    </div>
    <div class="card-body">
      <p>{{ good.C * selectedRate.rate }} {{ selectedRate.name }} (осталось: {{ good.P }})</p>
      <button class="btn" @click="addToCart(good)">
        Добавить в корзину
      </button>
    </div>
  </div>
</template>

<script lang='ts'>
import { TypeProduct, TypeProductName } from '@/types/product'
import { useStore } from '~/store'

export default {
  props: {
    good: {
      type: Object as () => TypeProduct,
      required: true
    },
    goodName: {
      type: Object as () => TypeProductName,
      required: true
    }
  },
  setup () {
    const store = useStore()

    return {
      addToCart: store.addToCart,
      selectedRate: store.selectedRate
    }
  }
}
</script>

<style scoped>
.card {
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 10px;
  margin-bottom: 10px;
}

.card-header {
  margin-bottom: 5px;
}

.card-header h2 {
  margin: 0;
}

.card-body {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.btn {
  padding: 5px 10px;
  background-color: #3f51b5;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn:hover {
  background-color: #303f9f;
}
</style>
