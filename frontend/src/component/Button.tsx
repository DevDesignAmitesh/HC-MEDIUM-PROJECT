import React from 'react'

interface ButtonGroup {
  label: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

function Button({label, onClick}: ButtonGroup) {
  return (
    <button className='bg-gray-900 p-3 mt-4 rounded-md w-[45%] text-white font-semibold text-xl' onClick={onClick}>{label}</button>
  )
}

export default Button