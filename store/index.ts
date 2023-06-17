import {defineStore} from 'pinia'
import {TypeProductName, TypeProduct} from '@/types/product'
import {TypeGroup} from '@/types/group'

type State = {
    cart: TypeProduct[]
    currencyRate: number
    goods: TypeProduct[]
    groups: Map<string, TypeGroup>
    productNames: TypeProductName[]
}

export const useStore = defineStore({
    id: 'mainStore',
    state: (): State => {
        return {
            cart: [],
            currencyRate: 1,
            goods: [],
            groups: new Map(),
            productNames: [],
        }
    },
    actions: {
        setData(goods: TypeProduct[]) {
            this.goods = goods
        },

        setGroups(groups: Record<string, TypeGroup>) {
            this.groups = new Map(Object.entries(groups))
        },

        setCurrencyRate(rate: number) {
            this.currencyRate = rate
        },

        addToCart(item: TypeProduct) {
            const found = this.cart.find((good) => good.T === item.T)

            if (found) {
                found.P++
            } else {
                this.cart.push({...item, P: 1})
            }
        },
        removeFromCart(item: TypeProduct) {
            const found = this.cart.find((good) => good.T === item.T)

            if (found && found.P > 1) {
                found.P--
            } else {
                this.cart = this.cart.filter((good) => good.T !== item.T)
            }
        },

        async fetchData() {
            const {data} = await useAsyncData(
                'data.json',
                () => $fetch(process.env.baseUrl + '/data.json')
            )

            const {data: groups} = await useAsyncData(
                'groups',
                () => $fetch('/data.json')
            )

            this.setData(data.Value.Goods)
            this.setGroups(groups)
        },

        async fetchCurrencyRate() {
            const {data} = await useAsyncData(
              'groups',
              () => $fetch(
                'https://api.exchangerate.host/latest?base=USD'
              )
            )
            this.setCurrencyRate(data.rates.RUB)
        },
    },
    getters: {
        totalSum: (state) => {
            return state.cart.reduce(
                (total: number, item: TypeProduct) =>
                    total + item.C * state.currencyRate * item.P,
                0
            )
        },
        getGroupName: (state) => {
            return (id: string): string => {
                return state.groups.get(id)?.G || '' // G - name
            }
        },

        getProductName() {
            return (id: string) => {
                const nameItem = this.productNames.find((item) => item.T === Number(id))
                return nameItem ? nameItem.N : ''
            }
        },
    },
})
