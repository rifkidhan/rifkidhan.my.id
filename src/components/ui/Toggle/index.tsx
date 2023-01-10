'use client'

import { FC, useEffect } from 'react'
import s from './Toggle.module.css'
import cn from 'clsx'
import Button, { ButtonProps } from '@components/ui/Button'
import { animate } from 'motion'

interface ToggleProps extends ButtonProps {
  size?: 'sm' | 'md' | 'lg'
  color?: 'yellow' | 'red' | 'blue' | 'pink' | 'green'
  disabled?: boolean
  label?: string
  onClick?: (...args: any[]) => void
  checked: boolean
}

const Toggle = (({
  color = 'yellow',
  size,
  label = '',
  onClick,
  checked,
  ...props
}) => {
  useEffect(() => {
    if (checked) {
      animate('.radio', {
        x: ['0%', '100%']
      })
    } else {
      animate('.radio', {
        x: ['100%', '0%']
      })
    }
  }, [checked])

  const rootCN = cn(s.root, {
    [s[`${color}`]]: checked
  })

  const radioCN = cn(s.circle, 'radio')
  return (
    <>
      <Button
        type="button"
        role="checkbox"
        aria-checked={checked}
        aria-label={label}
        className={rootCN}
        variant={color}
        onClick={onClick}
        {...props}
      >
        <span className={radioCN} aria-hidden={true}>
          <span className={s.inner} />
        </span>
      </Button>
      <input type="hidden" />
    </>
  )
}) satisfies FC<ToggleProps>

export default Toggle
