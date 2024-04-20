import React, { FormEvent } from 'react'
import { url } from '../api'

type ErrorLogin = {
  error: string;
}

type SuccessLogn = {
  success: string;
  token: string;
  _id: string;
}

type GetUser = {
  _id: string;
  name: string;
  email: string;
}


type IUserValues = {
  loginUser: (email: string, password: string, e: FormEvent) => Promise<boolean | undefined>;
  error: string | null;
  data: GetUser | null;
  getUser: (id: string) => Promise<void>;
  login: boolean;
  userLogout: () => void;
}

export const IUserContext = React.createContext<IUserValues | null>(null)

export const IUserContextProvider = ({
  children
}: React.PropsWithChildren ) => {
  const [data, setData] = React.useState<GetUser | null>(null)
  const [error, setError] = React.useState<string | null>(null)
  const [login, setLogin] = React.useState(false)

  function userLogout() {
    setData(null)
    setError(null)
    setLogin(false)
  }

  async function getUser(id: string) {
    const token = window.localStorage.getItem('token')
    const response = await fetch(`${url}/user/${id}`, {
      method: 'GET',
      headers: {
        authorization: 'Bearer ' + token
      }
    })
    const json = await response.json() as GetUser
    setData(json)
  }

  async function loginUser(email: string, password: string, e: FormEvent) {
    e.preventDefault()
    try {
      const response = await fetch(`${url}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      })
      if (!response.ok) {
        const json = await response.json() as ErrorLogin
        throw new Error(json.error)
      }
      const json = await response.json() as SuccessLogn
      window.localStorage.setItem('token', json.token)
      getUser(json._id)
      setLogin(true)
      return true
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message)
        setLogin(false)
        return false
      }
    }
  }

  const values = {
    loginUser,
    error,
    data,
    getUser,
    login,
    userLogout
  }

  return (
    <IUserContext.Provider value={values}>
      {children}
    </IUserContext.Provider>
  )
}
