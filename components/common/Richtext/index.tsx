'use client'

import {
  FC,
  TextareaHTMLAttributes,
  useState,
  Fragment,
  useEffect
} from 'react'
import s from './RichText.module.css'
import { Button } from '@components/ui'
import { Markdown } from '@components/common'
import {
  useTextAreaMarkdownEditor,
  boldCommand,
  italicCommand,
  strikethroughCommand,
  linkCommand,
  quoteCommand,
  codeCommand,
  codeBlockCommand,
  checkedListCommand,
  orderedListCommand,
  unorderedListCommand,
  imageCommand,
  headingLevel2Command,
  headingLevel3Command,
  headingLevel4Command,
  headingLevel5Command,
  headingLevel6Command,
  separatorCommand
} from './command'
import Toolbaricons from './Toolbaricons'

interface RichTextProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'value'> {
  disabled?: boolean
  placeholder?: string
  className?: string
  value?: string
}

const RichText: FC<RichTextProps> = (props) => {
  const { disabled = false, placeholder, value, className, ...rest } = props

  /**
   * add state for counting words and characters
   */
  const [counter, setCounter] = useState<{ words: number; chars: number }>({
    words: 0,
    chars: 0
  })

  const [preview, setPreview] = useState<boolean>(false)

  /**
   * add command
   */
  const { ref, commandController } = useTextAreaMarkdownEditor({
    commandMap: {
      bold: boldCommand,
      italic: italicCommand,
      strike: strikethroughCommand,
      link: linkCommand,
      quote: quoteCommand,
      codeInline: codeCommand,
      codeBlock: codeBlockCommand,
      checklist: checkedListCommand,
      order: orderedListCommand,
      unorder: unorderedListCommand,
      image: imageCommand,
      h2: headingLevel2Command,
      h3: headingLevel3Command,
      h4: headingLevel4Command,
      h5: headingLevel5Command,
      h6: headingLevel6Command,
      separator: separatorCommand
    }
  })

  /**
   * button component list
   */
  const buttonList = [
    {
      name: 'bold',
      title: 'Add bold text',
      action: async () => await commandController.executeCommand('bold')
    },
    {
      name: 'italic',
      title: 'Add italic text',
      action: async () => await commandController.executeCommand('italic')
    },
    {
      name: 'strike',
      title: 'Add strikethrough',
      action: async () => await commandController.executeCommand('strike')
    },
    {
      name: 'code',
      title: 'Add code',
      action: async () => await commandController.executeCommand('codeInline')
    },
    {
      name: 'link',
      title: 'Add a link',
      action: async () => await commandController.executeCommand('link')
    },
    {
      type: 'separator'
    },
    {
      name: 'h2',
      title: 'Add heading 2',
      action: async () => await commandController.executeCommand('h2')
    },
    {
      name: 'h3',
      title: 'Add heading 3',
      action: async () => await commandController.executeCommand('h3')
    },
    {
      name: 'h4',
      title: 'Add heading 4',
      action: async () => await commandController.executeCommand('h4')
    },
    {
      name: 'h5',
      title: 'Add heading 5',
      action: async () => await commandController.executeCommand('h5')
    },
    {
      name: 'h6',
      title: 'Add heading 6',
      action: async () => await commandController.executeCommand('h6')
    },
    {
      type: 'separator'
    },
    {
      name: 'separator',
      title: 'Add a separator',
      action: async () => await commandController.executeCommand('separator')
    },
    {
      name: 'image',
      title: 'Add a image',
      action: async () => await commandController.executeCommand('image')
    },
    {
      name: 'unorder',
      title: 'Add bullet list',
      action: async () => await commandController.executeCommand('unorder')
    },
    {
      name: 'order',
      title: 'Add order list',
      action: async () => await commandController.executeCommand('order')
    },
    {
      name: 'codeBlock',
      title: 'Add code block',
      action: async () => await commandController.executeCommand('codeBlock')
    },
    {
      name: 'quote',
      title: 'Add quote block',
      action: async () => await commandController.executeCommand('quote')
    },
    {
      type: 'separator'
    }
  ]

  useEffect(() => {
    const counter = () => {
      if (!ref.current) {
        return
      }
      let words = ref.current.value.split(' ').length
      let chars = ref.current.value.length
      setCounter({
        words: words,
        chars: chars
      })
    }

    window.addEventListener('input', counter)

    return () => {
      window.removeEventListener('input', counter)
    }
  }, [ref, counter])

  return (
    <div className={s.root}>
      <div className={s.toolbar}>
        {buttonList.map((item, i) => (
          <Fragment key={i}>
            {item.type === 'separator' ? (
              <div className={s.separator} />
            ) : (
              <Button
                variant="circle"
                type="button"
                title={item.title}
                onClick={item.action}
                disabled={preview || disabled}
              >
                <Toolbaricons name={item.name} />
              </Button>
            )}
          </Fragment>
        ))}
        <Button
          type="button"
          onClick={() => setPreview(true)}
          disabled={preview || disabled}
        >
          Preview
        </Button>
        <Button
          type="button"
          onClick={() => setPreview(false)}
          disabled={!preview || disabled}
        >
          Edit
        </Button>
      </div>

      {preview ? (
        <div className={s.preview}>
          {value ? <Markdown content={value} /> : 'tidak ada content'}
        </div>
      ) : (
        <textarea
          ref={ref}
          rows={10}
          placeholder={placeholder}
          disabled={disabled}
          className={s.editor}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
          value={value}
          {...rest}
        />
      )}
      <div className={s.counter}>
        <span>
          {counter.words} {counter.words > 1 ? 'words' : 'word'}
        </span>
        <span> & </span>
        <span>
          {counter.chars} {counter.chars > 1 ? 'characters' : 'character'}
        </span>
      </div>
    </div>
  )
}

export default RichText
