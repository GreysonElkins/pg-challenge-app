import { Redirect } from 'react-router-dom'
import { useUser } from '../context'
import { UserTable } from '../components'

const UserPage = () => {
  const { email } = useUser()

  if (!email) return <Redirect to="/" />

  return <UserTable />
}

const UserDirectory = {
  path: '/user-directory/:pageNumber',
  component: UserPage
}

export default UserDirectory