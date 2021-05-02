import { createContext, useContext, useState } from 'react'
import { useUser } from '.'

const apiContext = createContext({})

export const ApiProvider = ({ children }) => {
  const { email } = useUser()
  const [allUsers, setAllUsers] = useState([])

  const getAllUsers = () => {
    return fetch('http://localhost:8080/users', {
      headers: {
        'content-type': 'application/json',
        'authorization': email
      }
    })
      .then(response => {
        if (response.ok) {
          return response.text().then(text => setAllUsers(JSON.parse(text)))
        } else {
          console.error(response)
        }
      })
      .catch(error => {
        console.error(error)
      })
  }

  return <apiContext.Provider value={{ getAllUsers, allUsers }}>{children}</apiContext.Provider>
}

export const useApi = () => useContext(apiContext)
