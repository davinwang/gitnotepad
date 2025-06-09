import { EditorState } from 'prosemirror-state'
import { EditorView } from 'prosemirror-view'
import { schema } from 'prosemirror-markdown'

export function initEditor() {
  const editorElement = document.getElementById('editor')
  const previewElement = document.getElementById('preview')
  
  const state = EditorState.create({
    schema,
    doc: schema.node('doc', null, [
      schema.node('paragraph', null, [
        schema.text('Welcome to GitNotepad! Start writing here...')
      ])
    ])
  })
  
  const view = new EditorView(editorElement, {
    state,
    dispatchTransaction(transaction) {
      const newState = view.state.apply(transaction)
      view.updateState(newState)
      updatePreview(newState.doc.content)
    }
  })
  
  function updatePreview(content) {
    previewElement.innerHTML = content.textContent
  }
}

document.addEventListener('DOMContentLoaded', initEditor)