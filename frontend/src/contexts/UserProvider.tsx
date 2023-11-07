import { useState } from 'react'
import { UserStateContext, UserStateInterface } from './UserState'

export const UserStateProvider = ({
  children,
  value = {} as UserStateInterface
}: {
  children: React.ReactNode
  value?: UserStateInterface
}) => {
  const [state, setState] = useState(value)

  return (
    <UserStateContext.Provider value={{ state, setState }}>
      {children}
    </UserStateContext.Provider>
  )
}
