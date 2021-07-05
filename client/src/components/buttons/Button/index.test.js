import React from 'react'
import '@testing-library/jest-dom'
import { cleanup, render, fireEvent } from '@testing-library/react'
import Button from './Button'
import testIcon from './icons/12_settings.svg'

afterEach(cleanup)

describe('Button.js', () => {
    it('кнопка рендерится', () => {
        const jsx = <Button
            icon={testIcon}
            adaptive
            disabled
            type="button"
            variant="silent">кнопка</Button>
        const { getByTestId } = render(jsx)
        const button = getByTestId('button')

        expect(button).toHaveClass('btn btn--adaptive btn--silent btn--icon')
        expect(button).toHaveAttribute('disabled')
        expect(button).toHaveAttribute('type', 'button')
        expect(button).toHaveStyle({
            'background-image': `url(${testIcon})`
        })
    })

    it('клик сработал', () => {
        let isClicked = false
        const onBtnClick = () => {
            isClicked = true
        }

        const jsx = <Button action={onBtnClick}>кнопка</Button>
        const { getByTestId } = render(jsx)
        const button = getByTestId('button')

        fireEvent.click(button)
        expect(isClicked).toBeTruthy()
    })
})
