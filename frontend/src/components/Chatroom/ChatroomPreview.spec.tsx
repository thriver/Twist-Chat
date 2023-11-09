import { render, screen } from '@testing-library/react'
import ChatroomPreview from './ChatroomPreview'
import { ChatroomPreviewFragment } from '../../generated/graphql'
import { BrowserRouter } from 'react-router-dom'

describe('ChatroomPreview', () => {
  it('Should correctly handle props', () => {
    const props: ChatroomPreviewFragment = {
      id: '1',
      name: 'chat',
      username: 'user',
      __typename: 'Chatroom'
    }
    const { getByText } = render(
      <BrowserRouter>
        <ChatroomPreview chatroom={props} />
      </BrowserRouter>
    )
    expect(getByText(props.name!)).toBeTruthy()
    expect(getByText('Created by ' + props.username!)).toBeTruthy()
    expect(screen.queryByRole('link')?.hasAttribute('href')).toBeTruthy()
    expect(screen.queryByRole('link')?.getAttribute('href')).toBe(
      '/chatrooms/' + props.id
    )
  })
})
