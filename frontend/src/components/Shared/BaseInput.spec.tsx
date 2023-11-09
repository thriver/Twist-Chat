import { fireEvent, render } from '@testing-library/react'
import BaseInput from './BaseInput'

describe('BaseInput', () => {
  it('Should correctly handle props', () => {
    const { getByText, getByPlaceholderText, container } = render(
      <BaseInput placeholder="placeholder" label="label" name="name" />
    )
    expect(getByText('label')).toBeTruthy()
    expect(getByPlaceholderText('placeholder')).toBeTruthy()
    expect(container.querySelector('input[name="name"]')).toBeTruthy()
  })

  it('Should correctly pass an onChange event', () => {
    const mockFunction = jest.fn()
    const { getByPlaceholderText } = render(
      <BaseInput
        placeholder="placeholder"
        label="label"
        name="name"
        onChange={(e) => mockFunction(e.target.value)}
      />
    )
    fireEvent.change(getByPlaceholderText('placeholder'), {
      target: { value: 'value' }
    })
    expect(mockFunction).toHaveBeenCalledTimes(1)
    expect(mockFunction).toHaveBeenCalledWith('value')
  })
})
