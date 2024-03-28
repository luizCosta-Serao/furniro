import React from "react"
import { ProductsContext } from "./ProductsContext"

export const useProducts = () => {
  const context = React.useContext(ProductsContext)
  if (!context)
    throw new Error('useProducts must be inside the provider')
  return context
}