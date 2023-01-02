import { FC, InputHTMLAttributes } from 'react'
import cn from 'clsx'
import { Icons } from '@components/ui'
import s from './Input.module.css'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string
  icons?: string
  iconPosition?: 'left' | 'right'
}

const Input = ((props) => {
  const {
    className,
    icons = '',
    iconPosition = 'left',
    children,
    ...rest
  } = props
  const rootCN = cn(s.root, [s[`${iconPosition}`]], className)
  return (
    <span className={rootCN}>
      {icons && (
        <span>
          <Icons name={icons} />
        </span>
      )}
      <input
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
}) satisfies FC<InputProps>

export default Input
