import { fireEvent, render } from '@testing-library/react'
import BaseButton from './BaseButton'

describe('BaseButton', () => {
  it('Should correctly handle the text prop', () => {
    const { getByText } = render(<BaseButton text="test-content" />)
    expect(getByText('test-content')).toBeTruthy()
  })

  it('Should correctly pass a function to onClick', () => {
    const mockFunction = jest.fn()
    const { getByText } = render(
      <BaseButton text="test-content" onClick={mockFunction} />
    )
    fireEvent(getByText('test-content'), new MouseEvent('click'))
    expect(mockFunction).toHaveBeenCalledTimes(1)
  })
})
