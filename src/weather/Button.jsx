import React from 'react'

const Button = ({ label, ...props }) => {
  return (
    <button {...props} style={{ padding: '1rem', border: '1px solid gray' }}>
      {label}
    </button>
  )
}

export default Button
