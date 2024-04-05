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

export type Cart = {
  product: Product;
  quantity: number;
}

export type IProductsValues = {
  products: Product[] | null;
  getSingleProduct: (id: string) => Promise<Product>;
  filterCategory: (category: string) => Promise<Product[] | undefined>;
  cart: Cart[] | null;
  addCart: (id: string, quantity: number) => Promise<void>;
  setCart: React.Dispatch<React.SetStateAction<Cart[] | null>>;
}

export const ProductsContext = React.createContext<IProductsValues | null>(null)

export const ProductsProvider = ({
  children
}: { children: React.ReactNode }) => {
  const [products, setProducts] = React.useState<Product[] | null>(null)
  const [cart, setCart] = React.useState<Cart[] | null>(null)

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

  async function addCart(id: string, quantityCart: number) {
      const data = products?.find((product) => product._id === id)
      if (data && !cart) {
        setCart([{product: data, quantity: quantityCart}])
      }

      if (cart && data) {
        const newData: Cart = {product: data, quantity: quantityCart}
        const filterCart = cart.filter((item) => {
          return item.product._id !== newData.product._id
        })
        setCart([...filterCart, newData])
      }
  }

  const values = {
    products,
    getSingleProduct,
    filterCategory,
    cart,
    addCart,
    setCart,
  }

  return (
    <ProductsContext.Provider value={values}>
      {children}
    </ProductsContext.Provider>
  )
}