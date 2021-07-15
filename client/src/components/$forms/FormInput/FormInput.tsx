import React, { useState } from 'react'

import './FormInput.css'

type SetInputValue = (value: string) => void

interface FormInputProps {
    className?: string
    type?: string
    label?: string
    placeholder?: string
    testId?: string
    required?: boolean
    short?: boolean
    inline?: boolean
    clearBtn?: boolean
    min?: number,
    max?: number,
    setValue: SetInputValue,
    value: string,
}

const FormInput = (props: FormInputProps) => {
    const {
        type,
        value,
        setValue,
        label,
        placeholder,
        required,
        short,
        clearBtn,
        inline,
        min,
        max,
        testId
    } = props

    const [clearBtnFocus, setClearBtnFocus] = useState(false)

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    }

    const onClearBtnClick = () => {
        if (clearBtnFocus) {
            setValue('')
        }
    }

    const className = ['input']
    if (props.className) className.push(props.className)
    if (short) className.push('input--short')
    if (inline) className.push('input--inline')

    return (
        <label className={className.join(' ')} data-testid="form-input">
            <div style={{ margin: !label ? '0px' : undefined }} className="input__label">
                {label}
                {required && <span className="require-star" data-testid="require-star">*</span>}
            </div>
            <div className="input__wrapper">
                <input
                    data-testid={testId || 'input'}
                    style={{ paddingRight: clearBtn ? '28px' : undefined }}
                    className="input__field"
                    placeholder={placeholder}
                    type={type ? type : 'text'}
                    value={value}
                    onChange={onChange}
                    required={required}
                    min={min}
                    max={max} />
                {(clearBtn && value) && <button
                    className="input__clear-btn"
                    onClick={onClearBtnClick}
                    onFocus={() => setClearBtnFocus(true)}
                    onBlur={() => setClearBtnFocus(false)}
                    data-testid="clear-btn"></button>}
            </div>
        </label>
    )
}


export default FormInput