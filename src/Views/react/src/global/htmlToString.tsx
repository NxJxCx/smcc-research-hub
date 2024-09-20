import { ReactDOMServer } from '/jsx/imports'

export default function htmlToString(jsx: JSX.Element) {
  return ReactDOMServer.renderToString(jsx)
}