import React from 'react'
import classNames from 'classnames'

import './Button.css'

type Action = (e: React.MouseEvent) => void
interface ButtonProps {
    variant?: 'silent' | 'primary' | 'default'
    type?: 'submit' | 'reset' | 'button'
    icon?: string
    testId?: string
    action?: Action
    children?: React.ReactNode
    adaptive?: boolean
    disabled?: boolean
}

const Button = (props: ButtonProps) => {
    const { type, variant, action, children, icon, adaptive, disabled, testId } = props
    const className = classNames({
        'btn': true,
        'btn--icon': Boolean(icon),
        'btn--contentless': !Boolean(children),
        'btn--adaptive': adaptive,
        [`btn--${variant}`]: true
    })

    return (
        <button
            data-testid={testId || 'button'}
            className={className}
            onClick={action}
            style={{ backgroundImage: `url(${icon})` }}
            disabled={disabled}
            type={type}>
            <span className="btn__content">
                {children}
            </span>
        </button>
    )
}

export default Button