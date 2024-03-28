import React from 'react'
import { GET_PRODUCTS } from '../api'

export type Product = {
  _id: string;
  name: string;
  description: string
  price: number;
  image: string;
  stock: number;
  category: string;
}

export type IProductsValues = {
  products: Product[] | null;
}

export const ProductsContext = React.createContext<IProductsValues | null>(null)

export const ProductsProvider = ({
  children
}: { children: React.ReactNode }) => {
  const [products, setProducts] = React.useState<Product[] | null>(null)

  React.useEffect(() => {
    async function getProducts() {
      const data = await GET_PRODUCTS()
      setProducts(data)

    }
    getProducts()
  }, [])

  const values = {
    products,
  }

  return (
    <ProductsContext.Provider value={values}>
      {children}
    </ProductsContext.Provider>
  )
}