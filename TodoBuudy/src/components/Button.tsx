import React from 'react'

interface ButtonProps{
    children: React.ReactNode;
    onClick?: ()=>void;
    variant?: 'primary' | 'secondary' | 'danger';
    disabled?: boolean;
    type?: 'button' | 'submit' | 'reset';
    className?: string;
}

const variants = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-black',
    danger: 'bg-red-600 hover:bg-red-700 text-white',
}

const Button: React.FC<ButtonProps> = ({
    children,
    onClick,
    variant = 'primary',
    disabled = false,
    type = 'button',
    className
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={`px-4 py-2 rounded text-sm cursor-pointer font-medium focus:outline-none ${variants[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className} `}
    >
        {children}
    </button>
  )
}

export default Button