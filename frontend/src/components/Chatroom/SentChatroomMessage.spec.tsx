import { render } from '@testing-library/react'
import { SentChatroomMessageFragment } from '../../generated/graphql'
import SentChatroomMessage from './SentChatroomMessage'
describe('ReceivedChatroomMessage', () => {
  it('Should render props', () => {
    const props: SentChatroomMessageFragment = {
      username: 'user',
      content: 'content',
      createdAt: '2022-10-10 timestring which we ignore',
      __typename: 'UserMessage'
    }
    const { getByText } = render(<SentChatroomMessage message={props} />)
    expect(getByText(props.username)).toBeTruthy()
    expect(getByText(props.content!)).toBeTruthy()
    expect(getByText(props.createdAt.substring(0, 10))).toBeTruthy()
  })
})
