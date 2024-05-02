import React from 'react'
import { GET_PRODUCT, GET_PRODUCTS, url } from '../api'
import { useUser } from './useUser';
//import { useUser } from './useUser';

export type Product = {
  _id: string;
  name: string;
  description: string
  price: number;
  image: string;
  stock?: number;
  category?: string;
  quantity?: number;
}

export type Cart = {
  _id: string;
  name: string;
  description: string
  price: number;
  image: string;
  stock: number;
  category: string;
  quantity: number;
}

export type IProductsValues = {
  products: Product[] | null;
  getSingleProduct: (id: string) => Promise<Product>;
  filterCategory: (category: string) => Promise<Product[] | undefined>;
  cart: Cart[] | null;
  addCart: (id: string) => Promise<void>;
  setCart: React.Dispatch<React.SetStateAction<Cart[] | null>>;
  addFavorites: (id: string) => void;
  removeFavorites: (id: string) => void;
  favorites: Product[] | null;
  setFavorites: React.Dispatch<React.SetStateAction<Product[] | null>>;
  getCart: () => Promise<void>
}

export const ProductsContext = React.createContext<IProductsValues | null>(null)

export const ProductsProvider = ({
  children
}: { children: React.ReactNode }) => {
  const [products, setProducts] = React.useState<Product[] | null>(null)
  const [cart, setCart] = React.useState<Cart[] | null>(null)
  const [favorites, setFavorites] = React.useState<Product[] | null>(null)
  const { login, data } = useUser()

  React.useEffect(() => {
    async function getProducts() {
      const dataProd = await GET_PRODUCTS()
      setProducts(dataProd)
    }
    getProducts()
  }, [])

  React.useEffect(() => {
    async function getCart() {
      if (login && data) {
        const response = await fetch(`${url}/user/cart/${data?._id}`)
        const json = await response.json() as Cart[]
        if (json)
        setCart(json)
      }
    }
    getCart()
  }, [data, login])

  async function getCart() {
    if (login && data) {
      const response = await fetch(`${url}/user/cart/${data?._id}`)
      const json = await response.json() as Cart[]
      if (json)
      setCart(json)
    }
  }

  async function getSingleProduct(id: string) {
    const data = await GET_PRODUCT(id)
    return data
  }

  async function filterCategory(category: string) {
    const data = products?.filter((product) => product.category === category)
    return data
  }

  async function addCart(id: string) {
      const dataProduct = products?.find((product) => product._id === id)
      if (login) {
        try {
          await fetch(`${url}/user/cart/${data?._id}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              idProduct: dataProduct?._id
            })
          })
          await getCart()
        } catch (err) {
          console.log(err)
        }
      }
  }

  async function getFavorites() {
    if (login) {
      try {
        const response = await fetch(`${url}/user/favorites/${data?._id}`, {
          method: 'GET'
        })
        const json = await response.json() as Product[]
        setFavorites(json)
      } catch (error) {
        console.log(error)
      }
    }
  }

  async function addFavorites(id: string) {
    const dataProduct = products?.find((product) => product._id === id)
    if (login && data && dataProduct) {
      try {
        await fetch(`${url}/user/favorites/${data._id}`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            idFavorites: dataProduct._id
          })
        })
        await getFavorites()
      } catch (err) {
        console.log(err)
      }
    }
  }

  async function removeFavorites(id: string) {
    const dataFav = favorites?.find((favorite) => favorite._id === id)
    if (data && login && dataFav)
    try {
      await fetch(`${url}/user/favorites/update/${data._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          idFavorites: dataFav._id
        })
      })
      await getFavorites()
    } catch (error) {
      console.log(error)
    }
  }

  const values = {
    products,
    getSingleProduct,
    filterCategory,
    cart,
    addCart,
    setCart,
    addFavorites,
    removeFavorites,
    favorites,
    setFavorites,
    getCart
  }

  return (
    <ProductsContext.Provider value={values}>
      {children}
    </ProductsContext.Provider>
  )
}