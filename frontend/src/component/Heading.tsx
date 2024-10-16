import React from 'react'

interface HeadingGroup {
  label: string;
}

function Heading({label}: HeadingGroup) {
  return (
    <h1 className='text-3xl whitespace-nowrap font-bold text-black'>{label}</h1>
  )
}

export default Heading;
