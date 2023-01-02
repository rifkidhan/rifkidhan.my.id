import {
  getCharactersAfterSelection,
  getCharactersBeforeSelection,
  getBreaksNeededForEmptyLineAfter,
  getBreaksNeededForEmptyLineBefore,
  getSelectedText,
  selectWord,
  makeList,
  setHeader
} from './helpers'

import { Command } from './types'

export const boldCommand: Command = {
  shouldUndo: (options) => {
    return (
      getCharactersBeforeSelection(options.initialState, 2) === '**' &&
      getCharactersAfterSelection(options.initialState, 2) === '**'
    )
  },
  execute: ({ initialState, textApi }) => {
    // Adjust the selection to encompass the whole word if the caret is inside one
    const newSelectionRange = selectWord({
      text: initialState.text,
      selection: initialState.selection
    })
    const state1 = textApi.setSelectionRange(newSelectionRange)
    // Replaces the current selection with the bold mark up
    const state2 = textApi.replaceSelection(`**${getSelectedText(state1)}**`)
    // Adjust the selection to not contain the **
    textApi.setSelectionRange({
      start: state2.selection.end - 2 - getSelectedText(state1).length,
      end: state2.selection.end - 2
    })
  },
  undo: ({ initialState, textApi }) => {
    const text = getSelectedText(initialState)
    textApi.setSelectionRange({
      start: initialState.selection.start - 2,
      end: initialState.selection.end + 2
    })
    textApi.replaceSelection(text)
    textApi.setSelectionRange({
      start: initialState.selection.start - 2,
      end: initialState.selection.end - 2
    })
  }
}

export const checkedListCommand: Command = {
  execute: ({ initialState, textApi }) => {
    makeList(initialState, textApi, () => `- [ ] `)
  }
}

export const codeBlockCommand: Command = {
  execute: async ({ textApi, initialState }) => {
    // Adjust the selection to encompass the whole word if the caret is inside one
    const newSelectionRange = selectWord({
      text: initialState.text,
      selection: initialState.selection
    })
    const state1 = textApi.setSelectionRange(newSelectionRange)

    // when there's no breaking line
    if (getSelectedText(state1).indexOf('\n') === -1) {
      textApi.replaceSelection(`\`\`\`ts\n${getSelectedText(state1)}\n\`\`\``)
      // Adjust the selection to not contain the **

      const selectionStart = state1.selection.start + 6
      const selectionEnd = selectionStart + getSelectedText(state1).length

      textApi.setSelectionRange({
        start: selectionStart,
        end: selectionEnd
      })
      return
    }

    const breaksBeforeCount = getBreaksNeededForEmptyLineBefore(
      state1.text,
      state1.selection.start
    )
    const breaksBefore = Array(breaksBeforeCount + 1).join('\n')

    const breaksAfterCount = getBreaksNeededForEmptyLineAfter(
      state1.text,
      state1.selection.end
    )
    const breaksAfter = Array(breaksAfterCount + 1).join('\n')

    textApi.replaceSelection(
      `${breaksBefore}\`\`\`ts\n${getSelectedText(
        state1
      )}\n\`\`\`${breaksAfter}`
    )

    const selectionStart = state1.selection.start + breaksBeforeCount + 6
    const selectionEnd = selectionStart + getSelectedText(state1).length

    textApi.setSelectionRange({
      start: selectionStart,
      end: selectionEnd
    })
  }
}

export const codeCommand: Command = {
  shouldUndo: (options) => {
    return (
      getCharactersBeforeSelection(options.initialState, 1) === '`' &&
      getCharactersAfterSelection(options.initialState, 1) === '`'
    )
  },
  execute: ({ initialState, textApi }) => {
    // Adjust the selection to encompass the whole word if the caret is inside one
    const newSelectionRange = selectWord({
      text: initialState.text,
      selection: initialState.selection
    })
    const state1 = textApi.setSelectionRange(newSelectionRange)
    // Replaces the current selection with the italic mark up
    const state2 = textApi.replaceSelection(`\`${getSelectedText(state1)}\``)
    // Adjust the selection to not contain the *
    textApi.setSelectionRange({
      start: state2.selection.end - 1 - getSelectedText(state1).length,
      end: state2.selection.end - 1
    })
  },
  undo: ({ initialState, textApi }) => {
    const text = getSelectedText(initialState)
    textApi.setSelectionRange({
      start: initialState.selection.start - 1,
      end: initialState.selection.end + 1
    })
    textApi.replaceSelection(text)
    textApi.setSelectionRange({
      start: initialState.selection.start - 1,
      end: initialState.selection.end - 1
    })
  }
}

export const imageCommand: Command = {
  execute: ({ initialState, textApi }) => {
    // Replaces the current selection with the whole word selected
    const state1 = textApi.setSelectionRange(
      selectWord({
        text: initialState.text,
        selection: initialState.selection
      })
    )
    // Replaces the current selection with the image
    const imageTemplate =
      getSelectedText(state1) || 'https://example.com/your-image.png'
    textApi.replaceSelection(`![](${imageTemplate})`)
    // Adjust the selection to not contain the **
    textApi.setSelectionRange({
      start: state1.selection.start + 4,
      end: state1.selection.start + 4 + imageTemplate.length
    })
  }
}

export const italicCommand: Command = {
  shouldUndo: (options) => {
    return (
      getCharactersBeforeSelection(options.initialState, 1) === '_' &&
      getCharactersAfterSelection(options.initialState, 1) === '_'
    )
  },
  execute: ({ initialState, textApi }) => {
    // Adjust the selection to encompass the whole word if the caret is inside one
    const newSelectionRange = selectWord({
      text: initialState.text,
      selection: initialState.selection
    })
    const state1 = textApi.setSelectionRange(newSelectionRange)
    // Replaces the current selection with the italic mark up
    const state2 = textApi.replaceSelection(`_${getSelectedText(state1)}_`)
    // Adjust the selection to not contain the *
    textApi.setSelectionRange({
      start: state2.selection.end - 1 - getSelectedText(state1).length,
      end: state2.selection.end - 1
    })
  },
  undo: ({ initialState, textApi }) => {
    const text = getSelectedText(initialState)
    textApi.setSelectionRange({
      start: initialState.selection.start - 1,
      end: initialState.selection.end + 1
    })
    textApi.replaceSelection(text)
    textApi.setSelectionRange({
      start: initialState.selection.start - 1,
      end: initialState.selection.end - 1
    })
  }
}

export const linkCommand: Command = {
  execute: ({ initialState, textApi }) => {
    // Adjust the selection to encompass the whole word if the caret is inside one
    const newSelectionRange = selectWord({
      text: initialState.text,
      selection: initialState.selection
    })
    const state1 = textApi.setSelectionRange(newSelectionRange)
    // Replaces the current selection with the bold mark up
    const state2 = textApi.replaceSelection(`[${getSelectedText(state1)}](url)`)
    // Adjust the selection to not contain the **
    textApi.setSelectionRange({
      start: state2.selection.end - 6 - getSelectedText(state1).length,
      end: state2.selection.end - 6
    })
  }
}

export const orderedListCommand: Command = {
  execute: ({ initialState, textApi }) => {
    makeList(initialState, textApi, (item, index) => `${index + 1}. `)
  }
}

export const quoteCommand: Command = {
  execute: ({ initialState, textApi }) => {
    // Adjust the selection to encompass the whole word if the caret is inside one
    const newSelectionRange = selectWord({
      text: initialState.text,
      selection: initialState.selection
    })
    const state1 = textApi.setSelectionRange(newSelectionRange)

    const breaksBeforeCount = getBreaksNeededForEmptyLineBefore(
      state1.text,
      state1.selection.start
    )
    const breaksBefore = Array(breaksBeforeCount + 1).join('\n')

    const breaksAfterCount = getBreaksNeededForEmptyLineAfter(
      state1.text,
      state1.selection.end
    )
    const breaksAfter = Array(breaksAfterCount + 1).join('\n')

    // Replaces the current selection with the quote mark up
    textApi.replaceSelection(
      `${breaksBefore}> ${getSelectedText(state1)}${breaksAfter}`
    )

    const selectionStart = state1.selection.start + breaksBeforeCount + 2
    const selectionEnd = selectionStart + getSelectedText(state1).length

    textApi.setSelectionRange({
      start: selectionStart,
      end: selectionEnd
    })
  }
}

export const strikethroughCommand: Command = {
  execute: ({ initialState, textApi }) => {
    // Adjust the selection to encompass the whole word if the caret is inside one
    const newSelectionRange = selectWord({
      text: initialState.text,
      selection: initialState.selection
    })
    const state1 = textApi.setSelectionRange(newSelectionRange)
    // Replaces the current selection with the strikethrough mark up
    const state2 = textApi.replaceSelection(`~~${getSelectedText(state1)}~~`)
    // Adjust the selection to not contain the ~~
    textApi.setSelectionRange({
      start: state2.selection.end - 2 - getSelectedText(state1).length,
      end: state2.selection.end - 2
    })
  }
}

export const unorderedListCommand: Command = {
  execute: ({ initialState, textApi }) => {
    makeList(initialState, textApi, '- ')
  }
}

export const headingLevel1Command: Command = {
  execute: ({ initialState, textApi }) => {
    setHeader(initialState, textApi, '# ')
  }
}

export const headingLevel2Command: Command = {
  execute: ({ initialState, textApi }) => {
    setHeader(initialState, textApi, '## ')
  }
}

export const headingLevel3Command: Command = {
  execute: ({ initialState, textApi }) => {
    setHeader(initialState, textApi, '### ')
  }
}

export const headingLevel4Command: Command = {
  execute: ({ initialState, textApi }) => {
    setHeader(initialState, textApi, '#### ')
  }
}

export const headingLevel5Command: Command = {
  execute: ({ initialState, textApi }) => {
    setHeader(initialState, textApi, '##### ')
  }
}

export const headingLevel6Command: Command = {
  execute: ({ initialState, textApi }) => {
    setHeader(initialState, textApi, '###### ')
  }
}

export const separatorCommand: Command = {
  execute: ({ initialState, textApi }) => {
    setHeader(initialState, textApi, '---')
  }
}
