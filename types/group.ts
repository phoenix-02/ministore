import { TypeProduct } from '~/types/product'
export interface TypeGroup {
  G: string //  Name group
  B: Map<string, TypeProduct> //  Goods Map
}

export interface TypeGroupMap {
  [key: string]: TypeGroup
}
