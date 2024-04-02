import React from 'react'
import { GET_PRODUCT, GET_PRODUCTS } from '../api'

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
  getSingleProduct: (id: string) => Promise<Product>;
  filterCategory: (category: string) => Promise<Product[] | undefined>;
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

  async function getSingleProduct(id: string) {
    const data = await GET_PRODUCT(id)
    return data
  }

  async function filterCategory(category: string) {
    const data = products?.filter((product) => product.category === category)
    return data
  }

  const values = {
    products,
    getSingleProduct,
    filterCategory
  }

  return (
    <ProductsContext.Provider value={values}>
      {children}
    </ProductsContext.Provider>
  )
}