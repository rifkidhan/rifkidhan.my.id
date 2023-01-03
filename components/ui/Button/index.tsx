import {
  ButtonHTMLAttributes,
  FC,
  JSXElementConstructor,
  AnchorHTMLAttributes,
  forwardRef,
  Ref
} from 'react'
import { LoadingDots, Icons } from '@components/ui'
import cn from 'clsx'
import s from './Button.module.css'

export type ButtonComponentType = 'button' | 'a' | JSXElementConstructor<any>

export interface ButtonProps<C extends ButtonComponentType = 'button'> {
  href?: string
  className?: string
  active?: boolean
  Component?: C
  type?: 'submit' | 'button' | 'reset'
  loading?: boolean
  disabled?: boolean
  variant?: 'primary' | 'secondary' | 'naked' | 'circle' | 'color' | string
  icons?: string
  iconPosition?: 'left' | 'right'
}

export type ButtonHTMLType<C extends ButtonComponentType = 'button'> =
  C extends 'a'
    ? AnchorHTMLAttributes<HTMLAnchorElement>
    : ButtonHTMLAttributes<HTMLButtonElement>

export type ButtonRefType<C extends ButtonComponentType = 'button'> =
  C extends 'a' ? HTMLAnchorElement : HTMLButtonElement

type ButtonFC<C extends ButtonComponentType = 'button'> = FC<
  ButtonHTMLType<C> & ButtonProps<C>
>

type ButtonType = <C extends ButtonComponentType = 'button'>(
  ...args: Parameters<ButtonFC<C>>
) => ReturnType<ButtonFC<C>>

/* eslint-disable-next-line react/display-name */
const Button = forwardRef((props, ref: Ref<ButtonRefType>) => {
  const {
    className,
    variant = 'primary',
    children,
    icons = '',
    iconPosition = 'left',
    active,
    loading = false,
    disabled = false,
    Component = 'button',
    style = {},
    ...rest
  } = props

  const iconCN = cn(s.icons, {
    [s.iconleft]: iconPosition === 'left',
    [s.iconRight]: iconPosition === 'right'
  })
  const rootCN = cn(
    s.root,
    [s[`${variant}`]],
    {
      [s.disabled]: disabled,
      [s.disabledCircle]: variant === 'circle' && disabled
    },
    { [s.loading]: loading, [iconCN]: icons },
    className
  )

  return (
    <Component
      ref={ref}
      aria-pressed={active}
      data-variant={variant}
      disabled={disabled}
      className={rootCN}
      style={{ ...style }}
      {...rest}
    >
      {loading ? (
        <LoadingDots />
      ) : (
        <>
          {icons && <Icons name={icons} />}
          {children}
        </>
      )}
    </Component>
  )
}) satisfies ButtonFC

export default Button as ButtonType
