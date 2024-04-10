import { Cart, Product } from "./context/ProductsContext"

export const url = 'http://localhost:3333'

export async function GET_PRODUCTS() {
  const response = await fetch(`${url}/products`)
  const json = await response.json() as Product[]
  return json
}

export async function GET_PRODUCT(id: string) {
  const response = await fetch(`${url}/products/${id}`)
  const json = await response.json() as Product
  return json
}

export async function POST_CHECKOUT(cartItems: Cart[] | null) {
    try {
      const response = await fetch(`${url}/create-checkout-session`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          cartItems
        })
      })
      console.log(response)
      const json = await response.json() as {url: string}
      if (json.url) {
        window.location.href = json.url
      } 
    } catch (error) {
      if (error instanceof Error) console.log(error.message)
    }
}