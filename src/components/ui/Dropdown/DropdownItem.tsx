'use client'

import { useContext, useEffect, useRef, FC, ReactNode } from 'react'
import { DropdownContext } from './Dropdown'
import cn from 'clsx'
import s from './Dropdown.module.css'

interface DropdownItemProps {
  children: ReactNode
  className?: string
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  title?: string
}

const DropdownItem = ((props) => {
  const { className, onClick, title, children } = props
  const ref = useRef<HTMLButtonElement>(null)

  const dropdownContext = useContext(DropdownContext)

  if (dropdownContext === null) {
    throw new Error('DropDownItem must be used within a DropDown')
  }

  const { registerItem } = dropdownContext

  useEffect(() => {
    if (ref.current) {
      registerItem(ref)
    }
  }, [ref, registerItem])

  const itemCN = cn(s.item, className)

  return (
    <button
      type="button"
      className={itemCN}
      onClick={onClick}
      ref={ref}
      title={title}
    >
      {children}
    </button>
  )
}) satisfies FC<DropdownItemProps>

export default DropdownItem
