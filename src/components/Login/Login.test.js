import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import Login from './Login'

describe('Login', () => {
  let loginButton, emailInput
    
  beforeEach(() => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    )

    loginButton = screen.getByRole('button')
    emailInput = screen.getByPlaceholderText('e-mail address')
  })

  it('should render an input field', () => {
    expect(emailInput).toBeInTheDocument()
  })

  it("should display an error if a user doesn't enter an email address", async () => {
    fireEvent.click(loginButton)
    await waitFor(() => {
      // expect(testSubmit).not.toHaveBeenCalled()
      const message = screen.getByText('Required')
      expect(message).toBeInTheDocument()
    })
  })
    
  it("should prevent a user from using a non-email address", async () => {
    userEvent.type(emailInput, 'John')
    fireEvent.click(loginButton)
    await waitFor(() => {
      const message = screen.getByText('Please enter a valid email address')
      expect(message).toBeInTheDocument()
    })
  })
  
  it.skip("should leave the page if a user successfully logs in", async () => {
    userEvent.type(emailInput, 'travisbaker@tixsee.com')
      fireEvent.click(loginButton)
    await waitFor(() => {
      expect(emailInput).not.toBeInTheDocument()
    })
  })
})
