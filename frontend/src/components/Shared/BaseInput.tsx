import React from 'react'

interface BaseInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  name: string
  placeholder?: string
}

const BaseInput: React.FC<BaseInputProps> = (props) => {
  return (
    <div className="flex flex-col">
      <label
        htmlFor={props.name}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-left"
      >
        {props.label}
      </label>
      <input
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        defaultValue={props.placeholder}
        {...props}
      />
    </div>
  )
}

export default BaseInput
