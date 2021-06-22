import React from 'react'
import { Link } from 'react-router-dom'

const Logo = () => (
    <h1 className="header__logo">
        <Link className="header__link" to="/">
            School CI server
        </Link>
    </h1>
)

export default Logo