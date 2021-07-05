import PropTypes from 'prop-types'
import React, { useState } from 'react'

import './FormInput.css'

const FormInput = (props) => {
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
        max
    } = props

    const [clearBtnFocus, setClearBtnFocus] = useState(false)

    const onChange = (e) => {
        setValue(e.target.value)
    }

    const onClearBtnClick = (e) => {
        if (clearBtnFocus) {
            setValue('')
        }
    }

    const className = ['input']
    className.push(props.className)

    if (short) className.push('input--short')
    if (inline) className.push('input--inline')

    return (
        <label className={className.join(' ')} data-testid="form-input">
            <div style={{ margin: !label ? '0px' : null }} className="input__label">
                {label}
                {required && <span className="require-star" data-testid="require-star">*</span>}
            </div>
            <div className="input__wrapper">
                <input
                    data-testid="input"
                    style={{ paddingRight: clearBtn ? '28px' : null }}
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

FormInput.propTypes = {
    className: PropTypes.string,
    type: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    required: PropTypes.bool,
    short: PropTypes.bool,
    inline: PropTypes.bool,
    clearBtn: PropTypes.bool,
    value: PropTypes.string.isRequired,
    setValue: PropTypes.func.isRequired,
    min: PropTypes.number,
    max: PropTypes.number,
}

export default FormInput