import { defineStore } from 'pinia'
import { TypeProductName, TypeProduct } from '@/types/product'
import { TypeCurrency } from '~/types/currency'

type State = {
  cart: TypeProduct[]
  rates: TypeCurrency[]
  selectedRate: TypeCurrency
  goods: TypeProduct[]
  productNames: TypeProductName[]
}
export const useStore = defineStore({
  id: 'mainStore',
  state: (): State => {
    return {
      cart: [],
      rates: [],
      selectedRate: { name: 'USD', rate: 1 },
      goods: [],
      productNames: []
    }
  },
  actions: {

    addToCart (item: TypeProduct) {
      const found = this.cart.find(good => good.T === item.T)

      if (found) {
        found.P++
      } else {
        this.cart.push({ ...item, P: 1 })
      }
    },

    removeFromCart (item: TypeProduct) {
      const found = this.cart.find((good: TypeProduct) => good.T === item.T)

      if (found && found.P > 1) {
        found.P--
      } else {
        this.cart = this.cart.filter((good: TypeProduct) => good.T !== item.T)
      }
    },

    async fetchGoods () {
      try {
        const response:any = await $fetch('/data.json')
        if (response?.Value?.Goods) {
          this.goods = response.Value.Goods
        }
      } catch (error) {
        console.error('Error fetching goods:', error)
      }
    },

    async fetchCurrencyRate () {
      try {
        const response:any = await $fetch('https://api.exchangerate.host/latest?base=USD')
        if (response?.rates) {
          console.log('rates in store')
          this.rates = response.rates
        }
      } catch (error) {
        console.error('Error fetching currency rate:', error)
      }
    }
  },
  getters: {
    getProductById (store: State, id: number):TypeProduct | undefined {
      return store.goods.find(item => item.T === Number(id))
    },
    totalSum (state: State) {
      return state.cart.reduce(
        (total: number, item: TypeProduct) =>
          total + item.C * state.selectedRate.rate * item.P,
        0
      )
    }
  }
})
