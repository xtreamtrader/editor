import {
  wrapIn, setBlockType, chainCommands, toggleMark, exitCode,
  joinUp, joinDown, lift, selectParentNode,
} from 'prosemirror-commands';
import {
  wrapInList, splitListItem, liftListItem, sinkListItem,
} from 'prosemirror-schema-list';
import { undo, redo } from 'prosemirror-history';
import { undoInputRule } from 'prosemirror-inputrules';
import { Schema } from 'prosemirror-model';
import { EditorState, Transaction } from 'prosemirror-state';
import { store, opts } from '../connect';
import { focusSelectedEditorView } from '../store/ui/actions';
import { executeCommand } from '../store/actions';
import { CommandNames } from '../store/suggestion/commands';

type KeyMap = (
  state: EditorState<Schema>, dispatch?: ((p: Transaction<Schema>) => void)
) => boolean;

const mac = typeof navigator !== 'undefined' ? /Mac/.test(navigator.platform) : false;

export function buildKeymap(stateKey: any, schema: Schema) {
  const keys: { [index: string]: KeyMap } = {};

  const bind = (key: string, cmd: KeyMap) => { keys[key] = cmd; };

  const allUndo = chainCommands(undoInputRule, undo);
  bind('Mod-z', allUndo);
  bind('Backspace', undoInputRule);
  bind('Mod-Z', redo);
  if (!mac) bind('Mod-y', redo);

  bind('Alt-ArrowUp', joinUp);
  bind('Alt-ArrowDown', joinDown);
  bind('Mod-BracketLeft', lift);
  bind('Escape', chainCommands(undoInputRule, selectParentNode, () => {
    store.dispatch(focusSelectedEditorView(false));
    return true;
  }));
  // Immediately select the parent
  bind('Shift-Escape', chainCommands(undoInputRule, () => {
    store.dispatch(focusSelectedEditorView(false));
    return true;
  }));

  if (schema.marks.strong) {
    bind('Mod-b', toggleMark(schema.marks.strong));
    bind('Mod-B', toggleMark(schema.marks.strong));
  }
  if (schema.marks.em) {
    bind('Mod-i', toggleMark(schema.marks.em));
    bind('Mod-I', toggleMark(schema.marks.em));
  }
  if (schema.marks.underline) {
    bind('Mod-u', toggleMark(schema.marks.underline));
    bind('Mod-U', toggleMark(schema.marks.underline));
  }
  if (schema.marks.code) bind('Mod-C', toggleMark(schema.marks.code));
  if (schema.marks.link) {
    const addLink = () => {
      const { viewId } = store.getState().editor.ui;
      store.dispatch(executeCommand(CommandNames.link, viewId));
      return true;
    };
    bind('Mod-k', addLink);
    bind('Mod-K', addLink);
  }

  // if (schema.nodes.code_block) bind('Mod-M', setBlockType(schema.nodes.code_block));

  if (schema.nodes.blockquote) bind('Ctrl->', wrapIn(schema.nodes.blockquote));
  if (schema.nodes.hard_break) {
    const br = schema.nodes.hard_break;
    const cmd = chainCommands(exitCode, (state, dispatch) => {
      if (dispatch === undefined) return false;
      dispatch(state.tr.replaceSelectionWith(br.create()).scrollIntoView());
      return true;
    });
    bind('Mod-Enter', cmd);
    bind('Shift-Enter', cmd);
    if (mac) bind('Ctrl-Enter', cmd);
  }
  if (schema.nodes.list_item) {
    // TODO: Could improve this a bunch!!
    bind('Enter', splitListItem(schema.nodes.list_item));

    bind('Mod-Shift-7', chainCommands(liftListItem(schema.nodes.list_item), wrapInList(schema.nodes.ordered_list)));
    bind('Mod-Shift-8', chainCommands(liftListItem(schema.nodes.list_item), wrapInList(schema.nodes.bullet_list)));
    // Always capture the Tab.
    const cmdLift = chainCommands(liftListItem(schema.nodes.list_item), () => true);
    const cmdSink = chainCommands(sinkListItem(schema.nodes.list_item), () => true);
    bind('Shift-Tab', cmdLift);
    bind('Mod-[', cmdLift);
    bind('Tab', cmdSink);
    bind('Mod-]', cmdSink);
  }
  if (schema.nodes.paragraph) bind('Mod-Alt-0', setBlockType(schema.nodes.paragraph));

  if (schema.nodes.heading) for (let i = 1; i <= 6; i += 1) bind(`Mod-Alt-${i}`, setBlockType(schema.nodes.heading, { level: i }));
  if (schema.nodes.horizontal_rule) {
    const hr = schema.nodes.horizontal_rule;
    bind('Mod-_', (state, dispatch) => {
      if (dispatch === undefined) return false;
      dispatch(state.tr.replaceSelectionWith(hr.create()).scrollIntoView());
      return true;
    });
  }

  // Confluence and Google Docs comment shortcuts
  bind('Mod-Alt-c', (state, dispatch) => dispatch !== undefined && opts.addComment(stateKey, state));
  bind('Mod-Alt-m', (state, dispatch) => dispatch !== undefined && opts.addComment(stateKey, state));

  return keys;
}
