import type { EditorThemeClasses } from 'lexical'

const theme: EditorThemeClasses = {
  blockCursor: 'lexical__blockCursor',
  characterLimit: 'lexical__characterLimit',
  code: 'lexical__code',
  codeHighlight: {
    atrule: 'lexical__tokenAttr',
    attr: 'lexical__tokenAttr',
    boolean: 'lexical__tokenProperty',
    builtin: 'lexical__tokenSelector',
    cdata: 'lexical__tokenComment',
    char: 'lexical__tokenSelector',
    class: 'lexical__tokenFunction',
    'class-name': 'lexical__tokenFunction',
    comment: 'lexical__tokenComment',
    constant: 'lexical__tokenProperty',
    deleted: 'lexical__tokenProperty',
    doctype: 'lexical__tokenComment',
    entity: 'lexical__tokenOperator',
    function: 'lexical__tokenFunction',
    important: 'lexical__tokenVariable',
    inserted: 'lexical__tokenSelector',
    keyword: 'lexical__tokenAttr',
    namespace: 'lexical__tokenVariable',
    number: 'lexical__tokenProperty',
    operator: 'lexical__tokenOperator',
    prolog: 'lexical__tokenComment',
    property: 'lexical__tokenProperty',
    punctuation: 'lexical__tokenPunctuation',
    regex: 'lexical__tokenVariable',
    selector: 'lexical__tokenSelector',
    string: 'lexical__tokenSelector',
    symbol: 'lexical__tokenProperty',
    tag: 'lexical__tokenProperty',
    url: 'lexical__tokenOperator',
    variable: 'lexical__tokenVariable'
  },
  embedBlock: {
    base: 'lexical__embedBlock',
    focus: 'lexical__embedBlockFocus'
  },
  hashtag: 'lexical__hashtag',
  heading: {
    h1: 'lexical__h1',
    h2: 'lexical__h2',
    h3: 'lexical__h3',
    h4: 'lexical__h4',
    h5: 'lexical__h5',
    h6: 'lexical__h6'
  },
  image: 'editor-image',
  link: 'lexical__link',
  list: {
    listitem: 'lexical__listItem',
    listitemChecked: 'lexical__listItemChecked',
    listitemUnchecked: 'lexical__listItemUnchecked',
    nested: {
      listitem: 'lexical__nestedListItem'
    },
    olDepth: [
      'lexical__ol1',
      'lexical__ol2',
      'lexical__ol3',
      'lexical__ol4',
      'lexical__ol5'
    ],
    ul: 'lexical__ul'
  },
  ltr: 'lexical__ltr',
  mark: 'lexical__mark',
  markOverlap: 'lexical__markOverlap',
  paragraph: 'lexical__paragraph',
  quote: 'lexical__quote',
  rtl: 'lexical__rtl',
  // table: 'lexical__table',
  // tableAddColumns: 'lexical__tableAddColumns',
  // tableAddRows: 'lexical__tableAddRows',
  // tableCell: 'lexical__tableCell',
  // tableCellActionButton: 'lexical__tableCellActionButton',
  // tableCellActionButtonContainer: 'lexical__tableCellActionButtonContainer',
  // tableCellEditing: 'lexical__tableCellEditing',
  // tableCellHeader: 'lexical__tableCellHeader',
  // tableCellPrimarySelected: 'lexical__tableCellPrimarySelected',
  // tableCellResizer: 'lexical__tableCellResizer',
  // tableCellSelected: 'lexical__tableCellSelected',
  // tableCellSortedIndicator: 'lexical__tableCellSortedIndicator',
  // tableResizeRuler: 'lexical__tableCellResizeRuler',
  // tableSelected: 'lexical__tableSelected',
  text: {
    bold: 'lexical__textBold',
    code: 'lexical__textCode',
    italic: 'lexical__textItalic',
    strikethrough: 'lexical__textStrikethrough',
    subscript: 'lexical__textSubscript',
    superscript: 'lexical__textSuperscript',
    underline: 'lexical__textUnderline',
    underlineStrikethrough: 'lexical__textUnderlineStrikethrough'
  }
}

export default theme
