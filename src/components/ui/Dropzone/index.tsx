'use client'

import {
  InputHTMLAttributes,
  FC,
  useRef,
  SyntheticEvent,
  useState,
  ChangeEvent
} from 'react'
import cn from 'clsx'
import Image from 'next/image'
import { UploadCloud } from 'lucide-react'
import s from './Dropzone.module.css'

interface DropzoneProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string
  disabled?: boolean
  loading?: boolean
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  lastChange?: string
  multiple?: boolean
}

const Dropzone = ((props) => {
  const {
    className,
    disabled = false,
    loading = false,
    onChange,
    lastChange,
    multiple,
    ...rest
  } = props
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [previewSrc, setPreviewSrc] = useState<
    string | Array<string> | undefined
  >(lastChange)

  const rootCN = cn(
    s.dropzone,
    {
      [s.disabled]: disabled,
      [`${s.loading} skeleton`]: loading
    },
    {
      [s.preview]: previewSrc
    },
    className
  )

  const previewHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const allFiles = e.target.files
    if (allFiles) {
      const files = multiple ? allFiles : allFiles[0]
      if (files instanceof File) {
        setPreviewSrc(URL.createObjectURL(files))
      } else {
        for (let i = 0; i < files.length; i++) {
          const file = files[i]
          setPreviewSrc([URL.createObjectURL(file)])
        }
      }
    }
  }

  const handleClick = (e: SyntheticEvent) => {
    e.stopPropagation()
    if (inputRef && inputRef.current) {
      inputRef.current.click()
    }
  }

  return (
    <div className={rootCN} onClick={handleClick}>
      {previewSrc && typeof previewSrc === 'string' ? (
        <Image
          src={previewSrc}
          alt=""
          height={500}
          width={500}
          className="h-auto w-full"
        />
      ) : typeof previewSrc === 'object' ? (
        previewSrc.map((preview, i) => (
          <Image
            key={i}
            src={preview}
            alt=""
            height={500}
            width={500}
            className="h-auto w-full"
          />
        ))
      ) : (
        <>
          <UploadCloud />
          <p>Click to upload or drag and drop</p>
        </>
      )}

      <input
        type="file"
        ref={inputRef}
        onChange={(e) => {
          previewHandler(e)
          if (onChange) {
            onChange(e)
          }
        }}
        className="hidden"
        disabled={disabled}
        multiple={multiple}
        {...rest}
      />
    </div>
  )
}) satisfies FC<DropzoneProps>

export default Dropzone
