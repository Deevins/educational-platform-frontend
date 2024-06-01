import React from 'react'

interface InputProps {
  label: string
  type: string
  id: string
  name: string
  value?: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  className?: string
  isRequired?: boolean
}

export const Input: React.FC<InputProps> = ({
  label,
  type,
  id,
  name,
  value,
  onChange,
  className,
  isRequired = false,
}) => {
  return (
    <div>
      <label htmlFor={id} className='block mb-1 font-semibold'>
        {label}
      </label>
      <input
        type={type}
        id={id}
        className={'w-full border rounded-lg py-2 px-4 ' + className}
        value={value}
        onChange={onChange}
        name={name}
        required={isRequired}
        placeholder={label}
      />
    </div>
  )
}

export default Input
