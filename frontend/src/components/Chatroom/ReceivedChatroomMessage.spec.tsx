import { render } from '@testing-library/react'
import { ReceivedChatroomMessageFragment } from '../../generated/graphql'
import ReceivedChatroomMessage from './ReceivedChatroomMessage'

describe('ReceivedChatroomMessage', () => {
  it('Should render props', () => {
    const props: ReceivedChatroomMessageFragment = {
      username: 'user',
      content: 'content',
      createdAt: '2022-10-10 timestring which we ignore',
      __typename: 'UserMessage'
    }
    const { getByText } = render(<ReceivedChatroomMessage message={props} />)
    expect(getByText(props.username)).toBeTruthy()
    expect(getByText(props.content!)).toBeTruthy()
    expect(getByText(props.createdAt.substring(0, 10))).toBeTruthy()
  })
})
