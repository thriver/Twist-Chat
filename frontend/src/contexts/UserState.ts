import { Dispatch, SetStateAction, createContext, useContext } from 'react'

export interface UserStateInterface {
  username: string | undefined
}

export const UserStateContext = createContext({
  state: {} as UserStateInterface,
  setState: {} as Dispatch<SetStateAction<UserStateInterface>>
})

export const useUserState = () => {
  const context = useContext(UserStateContext)
  if (!context) {
    throw new Error('useUserState must be used within a useUserState')
  }
  return context
}
