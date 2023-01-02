export interface SelectionRange {
  start: number
  end: number
}

export interface TextState {
  text: string
  selection: SelectionRange
}

export interface TextController {
  replaceSelection(text: string): TextState
  setSelectionRange(selection: SelectionRange): TextState
  getState(): TextState
}

export interface ExecuteOptions {
  initialState: TextState
  textApi: TextController
}

export interface Command {
  shouldUndo?: (options: Pick<ExecuteOptions, 'initialState'>) => boolean
  execute: (options: ExecuteOptions) => void
  undo?: (options: ExecuteOptions) => void
}

export interface CommandContext {
  type: string
}

export type CommandMap<CommandName extends string> = Record<
  CommandName,
  Command
>
