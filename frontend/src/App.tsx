import React from 'react'
import { ApolloProvider } from '@apollo/client'
import client from './graphql-client'
import { UserStateProvider } from './contexts/UserProvider.tsx'
import { RouterProvider } from 'react-router-dom'
import router from './router.tsx'

const App: React.FC = () => {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <ApolloProvider client={client}>
        <UserStateProvider>
          <RouterProvider router={router} />
        </UserStateProvider>
      </ApolloProvider>
    </React.Suspense>
  )
}

export default App
