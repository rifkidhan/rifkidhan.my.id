import { FC, ReactNode, LabelHTMLAttributes } from 'react'
import s from './Field.module.css'

interface FieldProps extends LabelHTMLAttributes<HTMLLabelElement> {
  children?: ReactNode
  label?: string
}

const Field: FC<FieldProps> = (props) => {
  const { label, children, ...rest } = props
  return (
    <div className={s.root}>
      <label className={s.label} {...rest}>
        {label}
      </label>
      {children}
    </div>
  )
}

export default Field
