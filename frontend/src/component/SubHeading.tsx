import React from 'react'

interface SubHeadingGroup {
  label: string;
  label2: string;
  onClick: (event: React.MouseEvent<HTMLHeadingElement, MouseEvent>) => void;
}

function SubHeading({label, label2, onClick}: SubHeadingGroup) {
  return (
    <>
    <h1 onClick={onClick} className='text-[16px] mb-4 cursor-pointer text-gray-500 font-[600]'>{label} <span className='underline'>{label2}</span></h1>
    </>
  )
}

export default SubHeading