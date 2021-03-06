import { keymap } from 'prosemirror-keymap';
import { history } from 'prosemirror-history';
import { baseKeymap } from 'prosemirror-commands';
import { dropCursor } from 'prosemirror-dropcursor';
import { gapCursor } from 'prosemirror-gapcursor';
import { collab } from 'prosemirror-collab';
import schema from '../schema';
import suggestion from './suggestion';
import { buildKeymap } from '../keymap';
import inputrules from '../inputrules';
import { store } from '../../connect';
import * as views from '../views';
import { editablePlugin } from './editable';
import { handleSuggestion } from '../../store/suggestion/actions';
import linkViewPlugin from './link';
import previewPlugin from './preview';
import commentsPlugin from './comments';

export function getPlugins(stateKey: any, version: number, startEditable: boolean) {
  return [
    editablePlugin(startEditable),
    ...suggestion(
      (action) => store.dispatch(handleSuggestion(action)),
      /(?:^|\s)(:|\/|(?:(?:^[a-zA-Z0-9_]+)\s?=)|(?:\{\{)|(?:\[\[))$/,
      // Cancel on space after some of the triggers
      (trigger) => !trigger?.match(/(?:(?:[a-zA-Z0-9_]+)\s?=)|(?:\{\{)/),
    ),
    commentsPlugin(),
    linkViewPlugin,
    previewPlugin,
    views.image.getImagePlaceholderPlugin(),
    inputrules(schema),
    keymap(buildKeymap(stateKey, schema)),
    keymap(baseKeymap),
    dropCursor(),
    gapCursor(),
    collab({ version }),
    history(),
  ];
}
