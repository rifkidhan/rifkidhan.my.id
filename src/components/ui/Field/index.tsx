import { FC, ReactNode, LabelHTMLAttributes } from 'react'
import s from './Field.module.css'

interface FieldProps extends LabelHTMLAttributes<HTMLLabelElement> {
  children?: ReactNode
  label?: string
}

const Field = ((props) => {
  const { label, children, ...rest } = props
  return (
    <div className={s.root}>
      <label className={s.label} {...rest}>
        {label}
      </label>
      {children}
    </div>
  )
}) satisfies FC<FieldProps>

export default Field
