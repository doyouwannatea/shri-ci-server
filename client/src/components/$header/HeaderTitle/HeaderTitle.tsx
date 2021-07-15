import React from 'react'
import { Link } from 'react-router-dom'

interface HeaderTitleProps {
    color?: string
    title?: string
}

const HeaderTitle = ({ color, title }: HeaderTitleProps) => {
    return (
        <h1 style={{ color: color || undefined }} className="header__logo">
            <Link className="header__link" to="/">
                {title || 'School CI server'}
            </Link>
        </h1>
    )
}

export default HeaderTitle