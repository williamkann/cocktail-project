<template>
  <div class="description">
    <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
      <div>
          <v-checkbox v-model="editable" class="mx-2" label="Edit"></v-checkbox>
          <button :class="{ 'is-active': isActive.bold() }" @click="commands.bold">
            <v-icon>mdi-format-bold</v-icon>
          </button>
          <button :class="{ 'is-active': isActive.italic() }" @click="commands.italic">
            <v-icon>mdi-format-italic</v-icon>
          </button>
          <button :class="{ 'is-active': isActive.underline() }" @click="commands.underline">
            <v-icon>mdi-format-underline</v-icon>
          </button>
          <button :class="{ 'is-active': isActive.heading({ levels: 1 }) }" @click="commands.heading({ levels: 1 })">
            <v-icon>mdi-format-header-1</v-icon>
          </button>
          <button :class="{ 'is-active': isActive.heading({ levels: 2 }) }" @click="commands.heading({ levels: 2 })">
            <v-icon>mdi-format-header-2</v-icon>
          </button>
          <button :class="{ 'is-active': isActive.heading({ levels: 3 }) }" @click="commands.heading({ levels: 3 })">
            <v-icon>mdi-format-header-3</v-icon>
          </button>
          <button :class="{ 'is-active': isActive.ordered_list() }" @click="commands.ordered_list">
            <v-icon>mdi-view-list</v-icon>
          </button>
          <button :class="{ 'is-active': isActive.bullet_list() }" @click="commands.bullet_list">
            <v-icon>mdi-format-list-bulleted</v-icon>
          </button>
          <button @click="commands.undo">
            <v-icon> mdi-undo</v-icon>
          </button>
          <button @click="commands.redo">
            <v-icon> mdi-redo</v-icon>
          </button>
      </div>
    </editor-menu-bar>
    <editor-content style="color:white;background:grey;" :editor="editor" />
  </div>
</template>

<script>
import { Editor, EditorContent, EditorMenuBar } from 'tiptap'
import {
  Blockquote,
  CodeBlock,
  HardBreak,
  Heading,
  OrderedList,
  BulletList,
  ListItem,
  TodoItem,
  TodoList,
  Bold,
  Code,
  Italic,
  Link,
  Strike,
  Underline,
  History
} from 'tiptap-extensions'

export default {

  name: 'descriptionEditor',
  components: {
    EditorMenuBar,
    EditorContent
  },
  watch: {
    editable () {
      this.editor.setOptions({
        editable: this.editable
      })
    }
  },
  data () {
    return {
      editor: new Editor({
        extensions: [
          new Blockquote(),
          new CodeBlock(),
          new HardBreak(),
          new Heading({ levels: [1, 2, 3] }),
          new BulletList(),
          new OrderedList(),
          new ListItem(),
          new TodoItem(),
          new TodoList(),
          new Bold(),
          new Code(),
          new Italic(),
          new Link(),
          new Strike(),
          new Underline(),
          new History()
        ],
        content: '',
        editable: false
      }),
      editable: false,
      showInstruc: true
    }
  },

  computed: {
  },
  async mounted () {

  },
  methods: {

  },
  beforeDestroy () {
    this.editor.destroy()
  }
}
</script>
