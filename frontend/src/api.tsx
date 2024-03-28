import { Product } from "./context/ProductsContext"


export const url = 'http://localhost:3333'

export async function GET_PRODUCTS() {
  const response = await fetch(`${url}/products`)
  const json = await response.json() as Product[]
  return json
}