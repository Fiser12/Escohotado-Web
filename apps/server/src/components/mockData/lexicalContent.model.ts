import { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import { ExtendedSerializedEditorState } from "payload-lexical-blocks-builder/renderer";

export const mockLexicalContent: ExtendedSerializedEditorState = {
  root: {
    type: 'root',
    children: [],
    direction: null,
    format: '',
    indent: 0,
    version: 1,
  },
}
