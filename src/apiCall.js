//import { useQuery, useMutation } from '@apollo/client'

const fetchItems = async (tripSelection) => {
  const response = await fetch('https://packmate-be-d3fb267b5fee.herokuapp.com/graphql', {
    method: 'POST',

    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Credentials': 'true' },

    body: JSON.stringify({
      query: `query{
              items(category: "${tripSelection}") {
                  id
                  name
              }
          }`
    })
  })
  if (!response.ok) {
    throw new Error(`${response.status}`)
  } else {
    return response.json()
  }
}

export default fetchItems



