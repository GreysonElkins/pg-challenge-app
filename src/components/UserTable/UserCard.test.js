import React from 'react'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import UserCard from './UserCard'

describe('userCard', () => {

  const user = {
    avatar: "https://scontent.fapa1-2.fna.fbcdn.net/v/t1.6435-9/67871819_2434063816830946_7127810300035727360_n.jpg?_nc_cat=105&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=BtL3Os_N_zkAX-LZUEZ&_nc_ht=scontent.fapa1-2.fna&oh=cb4b13d13d71a7aa63a049245a407e74&oe=60B383F2",
    email: "greysonelkins@localhost:3000",
    firstName: "Greyson",
    id: 1,
    lastName: "Elkins",
    products: [1]
  }

  beforeEach(() => {
    render(
      <MemoryRouter>
        <UserCard {...user} />
      </MemoryRouter>
    )
  })

  it('should render the users avatar', () => {
    const myFace = screen.getByAltText("Greyson's avatar")
    expect(myFace).toBeInTheDocument()
  })

  it('should display the users full name', () => {
    const username = screen.getByText("Greyson Elkins")
    expect(username).toBeInTheDocument()
  })

  it('should display the users email', () => {
    const email = screen.getByText(user.email)  
    expect(email).toBeInTheDocument()
  })
})
