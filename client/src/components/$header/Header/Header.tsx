import React from 'react'

import './Header.css'

interface HeaderProps {
    children?: React.ReactNode,
    title: React.ReactNode
}

const Header = ({ children, title }: HeaderProps) => {
    return (
        <header className="header container">
            {title}
            <div className="header__actions">
                {children}
            </div>
        </header>
    )
}

export default Header