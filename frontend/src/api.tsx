import { Product } from "./context/ProductsContext"

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