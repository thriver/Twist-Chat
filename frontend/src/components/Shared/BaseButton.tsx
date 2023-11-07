import React from 'react'

interface BaseButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string
}

const BaseButton: React.FC<BaseButtonProps> = (props) => {
  return (
    <button
      {...props}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full disabled:bg-gray-400 max-h-12"
    >
      {props.text}
    </button>
  )
}

export default BaseButton
