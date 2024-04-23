import React from 'react'
import "./Header.css"
import { Link } from 'react-router-dom'
function Header() {
  return (
    <div>
      <header className='navbar'>
        <div className='navbar__title navbar__item'>
            <Link to ="/">Energy Grid</Link>
        </div>
        <div className='navbar__item' >
            <Link to ="/producer">Producer</Link>
        </div>
        <div className='navbar__item'>
            <Link to ="/consumer">Consumer</Link>
        </div>
    </header>
    </div>
  )
}

export default Header
