import { FC, InputHTMLAttributes } from 'react'
import cn from 'clsx'
import s from './Radio.module.css'

export interface RadioProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string
  labelPosition?: 'right' | 'left'
  variant?: 'radio' | 'check'
  disabled?: boolean
}

const Radio = ((props) => {
  const {
    variant = 'radio',
    labelPosition = 'right',
    id,
    disabled = false,
    className,
    children,
    ...rest
  } = props

  const rootCN = cn(s.root, className, [s[`${labelPosition}`]], {})
  const radioCN = cn([s[`${variant}`]], { [s.disabled]: disabled })
  return (
    <div className={rootCN}>
      <input
        id={id}
        type="radio"
        className={radioCN}
        disabled={disabled}
        {...rest}
      />
      <label htmlFor={id}>{children}</label>
    </div>
  )
}) satisfies FC<RadioProps>

export default Radio
