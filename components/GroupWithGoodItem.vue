<template>
  <div class="">
    {{ group.G }}
    <div class="">
      <div v-for="(goodNameValue, goodKey) in goods" :key="goodKey" class="">
        {{ goodKey }} {{ goodNameValue }}
        <GoodsItem v-if="getProductById(goodKey)" :good="getProductById(goodKey)" :good-name="goodNameValue" />
      </div>
    </div>
  </div>
</template>
<script lang='ts'>
import { TypeGroup } from '~/types/group'
import { TypeProduct } from '~/types/product'
import { useStore } from '~/store'

export default defineComponent({
  props: {
    group: {
      type: Object as () => TypeGroup,
      required: true
    }
  },
  setup (props: any) {
    const goods: Map<string, TypeProduct> = reactive(props.group.B)
    const store = useStore()

    // const product = store.goods.find((item: TypeProduct) => item.T === id)

    return {
      goods,
      getProductById: store.getProductById
    }
  }
})
</script>
<style scoped>

</style>
