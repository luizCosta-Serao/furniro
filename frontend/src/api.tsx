import { Cart, Product } from "./context/ProductsContext"

export const url = 'https://furniro-13x5.onrender.com'

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

export async function POST_CONTACT_MESSAGE(
  name: string,
  email: string,
  subject: string,
  message: string,
  setError: React.Dispatch<React.SetStateAction<string | null>>
)  {
  try {
    await fetch(`${url}/contact`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        name,
        email,
        subject,
        message
      })
    })
  } catch (error) {
    if (error instanceof Error) {
      setError(error.message)
    }
  }
}