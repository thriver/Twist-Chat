import React from 'react'
import { ApolloProvider } from '@apollo/client'
import client from './graphql-client'
import { UserStateProvider } from './contexts/UserProvider.tsx'
import AuthorizedRouterProvider from './helpers/AuthorizedRouterProvider.tsx'

const App: React.FC = () => {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <ApolloProvider client={client}>
        <UserStateProvider>
          <AuthorizedRouterProvider />
        </UserStateProvider>
      </ApolloProvider>
    </React.Suspense>
  )
}

export default App
