import { useState, createContext, useContext } from 'react'

const UserContext = createContext({})

export const UserProvider = ({ children }) => {
  // const [id, setId] = useState(0)
  // const [firstName, setFirstName] = useState('')
  // const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  // const [products, setProducts] = useState([])

  const setUser = ({ id, firstName, lastName, email, products }) => {
    // setId(id)
    // setFirstName(firstName)
    // setLastName(lastName)
    setEmail(email)
    // setProducts(products)
  }

  const decodeLoginErrorResponse = (response) => {
    switch (response.status) {
      case 400:
        return 'Please enter an email address'
      case 404:
        return 'That email address was not found'
      default:
        console.error(response)
        return 'Something went wrong'
    }
  }

  const login = ({ email }) => {
    return fetch('http://localhost:8080/login', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ email }),
    }).then((response) => {
      if (response.status === 200) {
        response.text().then((text) => setUser(JSON.parse(text)))
      } else {
        return decodeLoginErrorResponse(response)
      }
    }).catch((error) => {
      console.error(error)
    })
  }

  return (
    <UserContext.Provider value={{ email, login }}>{children}</UserContext.Provider>
  )

}  

export const useUser = () => useContext(UserContext)