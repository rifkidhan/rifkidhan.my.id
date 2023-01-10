import { FC, InputHTMLAttributes, forwardRef } from 'react'
import cn from 'clsx'
import s from './Input.module.css'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string
  icons?: JSX.Element
  iconPosition?: 'left' | 'right'
}

/* eslint-disable-next-line react/display-name */
const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { className, icons, iconPosition = 'left', children, ...rest } = props
  const rootCN = cn(s.root, [s[`${iconPosition}`]], className)
  return (
    <span className={rootCN}>
      {icons && <span>{icons}</span>}
      <input
        ref={ref}
        className={s.input}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
        {...rest}
      />
      {children}
    </span>
  )
}) satisfies FC

export default Input
