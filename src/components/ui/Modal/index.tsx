'use client'

import { FC, useEffect, useRef, ReactNode, MutableRefObject } from 'react'
import {
  clearAllBodyScrollLocks,
  disableBodyScroll,
  enableBodyScroll
} from '@libs/scroll-lock'
import { Button } from '@components/ui'
import { X } from 'lucide-react'
import cn from 'clsx'
import s from './Modal.module.css'
import { animate } from 'motion'

interface ModalProps {
  children?: ReactNode
  className?: string
  title?: string
  onClose: () => void
}

const Modal = ((props) => {
  const { title, children, className, onClose } = props

  const ref = useRef() as MutableRefObject<HTMLDivElement>
  const modalRef = useRef() as MutableRefObject<HTMLDivElement>

  useEffect(() => {
    const modal = ref.current
    const canScroll = modalRef.current

    if (modal && canScroll) {
      enableBodyScroll(canScroll)
      disableBodyScroll(modal, { reserveScrollBarGap: true })
    }

    animate('.modal', { scale: [0, 1] })

    return () => {
      clearAllBodyScrollLocks()
    }
  }, [])

  const dialogCN = cn(s.modal, className, 'modal')

  return (
    <div className={s.root}>
      <div role="dialog" ref={ref} className={dialogCN}>
        <div className={s.topModal}>
          <div>
            <p className="h5 font-bold">{title}</p>
          </div>
          <Button
            type="button"
            variant="circle"
            icons={<X size={20} />}
            onClick={() => onClose()}
            aria-label="close modal"
          />
        </div>

        <div className={s.bottomModal} ref={modalRef}>
          {children}
        </div>
      </div>
    </div>
  )
}) satisfies FC<ModalProps>

export default Modal
