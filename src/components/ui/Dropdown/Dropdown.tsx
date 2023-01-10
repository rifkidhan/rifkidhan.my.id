'use client'

import React, {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
  RefObject,
  FC,
  useRef
} from 'react'
import { useFloating, useMergeRefs, FloatingPortal } from '@floating-ui/react'
import { animate, spring } from 'motion'
import s from './Dropdown.module.css'
import cn from 'clsx'
import { ChevronDown } from 'lucide-react'

interface DropdownItemsProps {
  children: ReactNode
  dropdownRef: React.Ref<HTMLDivElement>
  onClose: () => void
}

type DropdownContextType = {
  registerItem: (ref: RefObject<HTMLButtonElement>) => void
}

interface DropdownProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  stopClose?: boolean
  children: ReactNode
  label?: string
  className?: string
  disabled?: boolean
}

export const DropdownContext = React.createContext<DropdownContextType | null>(
  null
)

DropdownContext.displayName = 'DropdownContext'

const DropdownItems = ((props) => {
  const { children, dropdownRef, onClose } = props

  const [items, setItems] = useState<RefObject<HTMLButtonElement>[]>()
  const [highlightItem, setHighlightItem] =
    useState<RefObject<HTMLButtonElement>>()

  const registerItem = useCallback(
    (itemRef: RefObject<HTMLButtonElement>) => {
      setItems((prev) => (prev ? [...prev, itemRef] : [itemRef]))
    },
    [setItems]
  )

  const handleKeydown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!items) return

    const key = e.key

    if (['Escape', 'ArrowUp', 'ArrowDown', 'Tab'].includes(key)) {
      e.preventDefault()
    }

    if (key === 'Escape' || key === 'Tab') {
      onClose()
    } else if (key === 'ArrowUp') {
      setHighlightItem((prev) => {
        if (!prev) return items[0]

        const index = items.indexOf(prev) - 1

        return items[index === -1 ? items.length - 1 : index]
      })
    } else if (key === 'ArrowDown') {
      setHighlightItem((prev) => {
        if (!prev) return items[0]
        return items[items.indexOf(prev) + 1]
      })
    }
  }

  const contextValue = useMemo(() => ({ registerItem }), [registerItem])

  useEffect(() => {
    if (items && !highlightItem) {
      setHighlightItem(items[0])
    }

    if (highlightItem && highlightItem.current) {
      highlightItem.current.focus()
    }
  }, [items, highlightItem])

  useEffect(() => {
    if (dropdownRef) {
      animate(
        `.dropdownItems`,
        {
          clipPath: [
            'polygon(0% 0%, 0 0%, 100% 0%, 100% 0)',
            'polygon(0% 0%, 0 100%, 100% 100%, 100% 0)'
          ]
        },
        {
          easing: spring({
            damping: 50,
            stiffness: 350,
            restSpeed: 15,
            restDistance: 0.25,
            velocity: 1200
          })
        }
      )
    } else {
      animate('.dropdownItems', {
        clipPath: [
          'polygon(0% 0%, 0 100%, 100% 100%, 100% 0)',
          'polygon(0% 0%, 0 0%, 100% 0%, 100% 0)'
        ]
      })
    }
  }, [dropdownRef])

  return (
    <DropdownContext.Provider value={contextValue}>
      <div
        ref={dropdownRef}
        className={cn(s.dropdown, 'dropdownItems')}
        onKeyDown={handleKeydown}
      >
        {children}
      </div>
    </DropdownContext.Provider>
  )
}) satisfies FC<DropdownItemsProps>

const Dropdown = ((props) => {
  const { stopClose, children, label, disabled = false, className } = props
  const buttonRef = useRef<HTMLButtonElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const [showDropdown, setShowDropdown] = useState(false)
  const { x, y, reference, floating, strategy, context } = useFloating({
    open: showDropdown,
    onOpenChange: setShowDropdown
  })

  const handleClose = () => {
    const button = buttonRef.current
    setShowDropdown(false)
    if (button) {
      button.focus()
    }
  }

  useEffect(() => {
    const button = buttonRef.current
    const dropdown = dropdownRef.current

    if (showDropdown && button !== null && dropdown !== null) {
      const { top, left } = button.getBoundingClientRect()
      dropdown.style.top = `${y ?? top}px`
      dropdown.style.left = `${x ?? left}px`
      dropdown.style.position = strategy
      dropdown.style.width = 'max-content'
    }
  }, [buttonRef, dropdownRef, showDropdown, strategy, y, x])

  useEffect(() => {
    const button = buttonRef.current

    if (button !== null && showDropdown) {
      const handle = (event: MouseEvent) => {
        const target = event.target
        if (stopClose) {
          if (
            dropdownRef.current &&
            dropdownRef.current.contains(target as Node)
          )
            return
        }
        if (!button.contains(target as Node)) {
          setShowDropdown(false)
        }
      }
      document.addEventListener('click', handle)

      return () => {
        document.removeEventListener('click', handle)
      }
    }
  }, [dropdownRef, buttonRef, showDropdown, stopClose])

  const dropdownCN = cn(s.root, className)
  const referenceRef = useMergeRefs([reference, buttonRef])
  const floatingRef = useMergeRefs([floating, dropdownRef])

  return (
    <>
      <button
        type="button"
        ref={referenceRef}
        className={dropdownCN}
        disabled={disabled}
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <span className={s.label}>{label}</span>
        <span className={s.icons}>
          <ChevronDown
            className={cn(s.chevron, { [s.chevronOpen]: showDropdown })}
          />
        </span>
      </button>

      <FloatingPortal>
        {showDropdown && (
          <DropdownItems dropdownRef={floatingRef} onClose={handleClose}>
            {children}
          </DropdownItems>
        )}
      </FloatingPortal>
    </>
  )
}) satisfies FC<DropdownProps>

export default Dropdown
