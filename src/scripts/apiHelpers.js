export const getAllUsers = (email) => {
  // I tried this function literally everywhere else that I could, but had difficulty triggering re-renders and needed to move on.
  return fetch('http://localhost:8080/users', {
    headers: {
      'content-type': 'application/json',
      authorization: email || 'greysonelkins@localhost:3000',
      // using this email for testing. would want to take time to research testing with context || implement environment variables to run this at the right time.
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.text().then(text => JSON.parse(text))
      } else {
        console.error(response)
        return []
      }
    })
    .catch((error) => {
      console.error(error)
    })
}
