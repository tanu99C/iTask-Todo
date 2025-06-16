import React from 'react'

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700 text-white shadow-md">
      {/* Logo */}
      <div className="text-3xl font-bold tracking-wide text-white">
        iTask
      </div>

      {/* Navigation Links */}
      <ul className="flex space-x-10 text-lg font-medium">
        <li className="cursor-pointer hover:text-yellow-300 transition-all duration-300 ease-in-out">
          Home
        </li>
        <li className="cursor-pointer hover:text-yellow-300 transition-all duration-300 ease-in-out">
          Your Tasks
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
