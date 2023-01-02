import { useMemo, useRef } from 'react'
import { TextController, CommandMap } from './types'
import { CommandController } from './command-controller'
import { TextAreaTextController } from './text-controller'

export type UseTextAreaMarkdownEditorResult<CommandName extends string> = {
  ref: React.RefObject<HTMLTextAreaElement>
  textController: TextController
  commandController: CommandController<CommandName>
}

export type UseTextAreaMarkdownEditorOptions<CommandName extends string> = {
  commandMap: CommandMap<CommandName>
}

export function useTextAreaMarkdownEditor<CommandName extends string>(
  options: UseTextAreaMarkdownEditorOptions<CommandName>
): UseTextAreaMarkdownEditorResult<CommandName> {
  const textAreaRef = useRef<HTMLTextAreaElement>(null)

  const textController = useMemo(() => {
    return new TextAreaTextController(textAreaRef)
  }, [textAreaRef])

  const commandController = useMemo(
    () => new CommandController(textController, options.commandMap),
    [textController, options.commandMap]
  )

  // const commandController = useMemo(
  //   () => new CommandController(textController, options.commandMap),
  //   [textAreaRef]
  // )

  return {
    textController,
    commandController,
    ref: textAreaRef
  }
}
