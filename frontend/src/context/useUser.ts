import React from "react"
import { IUserContext } from "./UserContext"

export const useUser = () => {
  const context = React.useContext(IUserContext)
  if (!context) {
    throw new Error('useUser must be inside the provider')
  }
  return context
}