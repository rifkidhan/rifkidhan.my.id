import { LinkPlugin as LexicalLinkPlugin } from '@lexical/react/LexicalLinkPlugin'
import { validateUrl } from '../utils/url'

export default function LinkPlugin() {
  return <LexicalLinkPlugin validateUrl={validateUrl} />
}
