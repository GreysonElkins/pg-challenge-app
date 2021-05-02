import { Redirect } from 'react-router-dom'
import { useUser } from '../context'
import { Login } from '../components'

const HomePage = () => {
  const { email } = useUser()

  if (email) return <Redirect to="/user-directory/1" />

  return <Login />
}

const Home = {
  path: '/',
  component: HomePage,
}

export default Home
