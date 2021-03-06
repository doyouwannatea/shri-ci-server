import React from 'react'
import { formatDistanceStrict, format, parseISO } from 'date-fns'
import classNames from 'classnames'
import { BuildItem } from '../../../../models/Build'

import './Build.css'

interface BuildProps extends BuildItem {
    onClick?: (e?: React.MouseEvent) => void
}

const Build = (props: BuildProps) => {
    const {
        authorName,
        branchName,
        buildNumber,
        commitHash,
        commitMessage,
        duration,
        onClick,
        start,
        status
    } = props

    const className = classNames({
        'build': true,
        [`build--${status.toLowerCase()}`]: true
    })

    const onKeyPress = (e: React.KeyboardEvent<HTMLElement>) => {
        if (onClick && e.code === 'Enter') {
            onClick()
        }
    }

    const getDuration = (ms: number) => formatDistanceStrict(0, ms)

    return (
        <div onKeyPress={onKeyPress} onClick={onClick} tabIndex={0} className={className}>

            <div>
                <div className="build__inner">
                    <div className="build__number">#{buildNumber}</div>
                    <p className="build__message">{commitMessage}</p>
                </div>

                <div className="build__inner">
                    <div className="build__branch with-before">{branchName}</div>
                    <div className="build__hash">{commitHash}</div>
                    <div className="build__author with-before">{authorName}</div>
                </div>
            </div>

            <div className="build__timings">
                {start &&
                    <div className="build__time with-before">{format(parseISO(start), 'dd MMMM, HH:mm')}</div>}
                {duration &&
                    <div className="build__duration with-before">{getDuration(duration)}</div>}
            </div>

            <span className="build__icon"></span>

        </div>
    )
}



export default Build