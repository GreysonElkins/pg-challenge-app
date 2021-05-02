import { useState, useEffect } from 'react'
import { useParams, useLocation, useHistory } from 'react-router-dom'
import { useUser } from '../../context'
import { getAllUsers } from '../../scripts'
import UserCard from './UserCard'

import './UserTable.scss'

const UserTable = ({ usersPerPage = 8 }) => {
  const [ users, setUsers ] = useState([])
  const [ firstUserIndex, setFirstUserIndex ] = useState(1)
  const { email } = useUser()
  const { pageNumber } = useParams()
  const location = useLocation()
  const history = useHistory()

  useEffect(() => {
    getAllUsers(email).then(response => setUsers(response))
  }, [email])
 
  useEffect(() => {
    const makePagination = () => {
      const startAt = usersPerPage * pageNumber - (usersPerPage - 1)
      setFirstUserIndex(startAt)
    }
    if (users.length > 0)
    makePagination() 
  }, [pageNumber, users, usersPerPage])

  const makePageButtons = () => {
    // this would be great as it's own component
    if (users.length === 0) return <></>
    const howManyPages = Math.ceil(users.length / usersPerPage)

    const pageButtons = []
    for (let i = 1; i <= howManyPages; i++) {
      pageButtons.push(
        <button 
          onClick={() => goToPage(i)}
          key={`page-button-${i}`}>{i}
        </button>
      )
    }
    return pageButtons
  }

  const goToPage = (num) => {
    history.push(`${location.pathname.substring(0, location.length - 1)}${num}`)
  }

  const createUserCards = () => {
      const displayedUsers = []
      for (let i = firstUserIndex - 1; i <= firstUserIndex + usersPerPage - 2; i++) {
        if (users[i]) {
          displayedUsers.push(<UserCard {...users[i]} key={`user-card-${users[i].id}`} />)
        }
      }
      return displayedUsers
  }

  return (
    <>
      <div className="UserTable">{createUserCards()}</div>
      <div>
        <button disabled={pageNumber === "1"} onClick={() => goToPage(pageNumber - 1)}>
          {'<<'}
        </button>
        {makePageButtons()}
        <button
          disabled={pageNumber === Math.ceil(users.length / usersPerPage)}
          onClick={() => goToPage(parseInt(pageNumber) + 1)}
          // pageNumber isn't updating immediately
        >
          {'>>'}
        </button>
      </div>
    </>
  )
}

export default UserTable