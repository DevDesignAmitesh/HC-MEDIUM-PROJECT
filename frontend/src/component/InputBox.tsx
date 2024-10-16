import React from 'react'

interface InputGroup {
  lable: string;
  type: string;
  placeholder: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function InputBox({lable, type, placeholder, onChange}: InputGroup) {
  return (
    <div className='w-[45%] gap-1 flex flex-col'>
      {lable && <label className='font-semibold'>{lable}</label>}
      <input className='p-2 outline-none border-2 border-gray-500 bg-transparent rounded-md' onInput={onChange} type={type} placeholder={placeholder} />
    </div>
  )
}

export default InputBox;
