import React from 'react'
import '@testing-library/jest-dom'
import { cleanup, render, fireEvent, screen } from '@testing-library/react'
import FormInput from './FormInput'

afterEach(cleanup)

describe('FormInput.js', () => {
    it('Инпут рендерится', () => {
        const value = 'test value'
        const label = "test label"
        const placeholder = 'test placeholder'

        const jsx = <FormInput
            short
            inline
            required
            label={label}
            placeholder={placeholder}
            value={value}
            setValue={() => { }} />

        const { getByTestId } = render(jsx)

        const formInput = getByTestId('form-input')
        const input = getByTestId('input')
        const requireStar = getByTestId('require-star')

        expect(formInput).toBeInTheDocument()
        expect(formInput).toHaveClass('input input--short input--inline')
        expect(formInput).toHaveTextContent(label)
        expect(input).toHaveAttribute('placeholder', placeholder)
        expect(input).toHaveAttribute('value', value)
        expect(requireStar).toBeInTheDocument()
    })

    it('Событие ввода текста работает', () => {
        let value = 'test value'
        let newValue = 'changed value'
        const setValue = newValue => { value = newValue }

        const { getByTestId, rerender } = render(
            <FormInput
                setValue={setValue}
                value={value} />
        )
        const input = getByTestId('input')

        expect(input).toHaveAttribute('value', value)

        fireEvent.change(input, { target: { value: newValue } })
        expect(value).toBe(newValue)

        rerender(
            <FormInput
                setValue={setValue}
                value={value} />
        )
        expect(screen.getByTestId('input')).toHaveAttribute('value', value)
    })


    it('Кнопка очистки работает', () => {
        let value = ''
        let newValue = 'test value'

        const setValue = newValue => { value = newValue }

        const { queryByTestId, getByTestId, rerender } = render(
            <FormInput
                setValue={setValue}
                value={value}
                clearBtn />
        )

        const input = getByTestId('input')
        let clearBtn = queryByTestId('clear-btn')

        expect(clearBtn).not.toBeInTheDocument()
        fireEvent.change(input, { target: { value: newValue } })
        expect(value).toBe(newValue)

        rerender(
            <FormInput
                setValue={setValue}
                value={value}
                clearBtn />
        )

        clearBtn = queryByTestId('clear-btn')
        expect(clearBtn).toBeInTheDocument()

        fireEvent.focusIn(clearBtn)
        fireEvent.click(clearBtn)
        expect(value).toBe('')
    })
})
