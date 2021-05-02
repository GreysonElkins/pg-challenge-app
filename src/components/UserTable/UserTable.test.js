import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import UserTable from './UserTable'
import { useUser, UserProvider } from '../../context'
import { testUserData } from '../../scripts'

describe('UserTable', () => {

  let mockResponse;

  beforeEach(() => {
    mockResponse = {
      ok: true, 
      text: () => ({
        then: () => testUserData
      })
    }
    global.fetch = jest.fn()
    global.fetch.mockResolvedValue(mockResponse)
    render(
      <UserProvider>
        <MemoryRouter>
            <UserTable />
        </MemoryRouter>
      </UserProvider>
    )
    
  })

  it.skip('should have a back button', async () => {
    await waitFor(() => {
      expect(screen.getByRole('button', {name: '<<'})).toBeInTheDocument()
    })
  })

  // it('should render 8 users per page by default', async () => {
  //   expect(await screen.findAllByRole('img')).toHaveLength(8)
  // })
//   <button>
//             &lt;&lt;
//           </button>
//           <button>
//             &gt;&gt;
//           </button>

})
