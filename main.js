var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// main.ts
var main_exports = {};
__export(main_exports, {
  default: () => TabKeyPlugin
});
module.exports = __toCommonJS(main_exports);
var import_obsidian = require("obsidian");
var import_state = require("@codemirror/state");
var import_view = require("@codemirror/view");
var DEFAULT_SETTINGS = {
  indentsIfSelection: true,
  indentsIfSelectionOnlyForMultipleLines: true,
  useSpaces: false,
  alignSpaces: false,
  useHardSpace: true,
  spacesCount: 4,
  allowException: true,
  exceptionRegex: "^[\\s\xA0]*(-|\\d+\\.)( \\[ \\])?\\s*$",
  useAdvancedTables: true,
  useOutlinerBetterTab: true
};
var TabKeyPlugin = class extends import_obsidian.Plugin {
  async onload() {
    await this.loadSettings();
    // this.addSettingTab(new SettingTab(this.app, this));
    this.registerEditorExtension(import_state.Prec.highest(import_view.keymap.of([{
      key: "Tab",
      run: () => {
        const view = this.app.workspace.getActiveViewOfType(import_obsidian.MarkdownView);
        if (!view)
          return false;
        let editor = view.editor;
        let cursorPos = editor.getCursor("from");
        let lineContent = editor.getLine(cursorPos.line);
        let endOfLinePos = { line: cursorPos.line, ch: lineContent.length };
    
        editor.setCursor(endOfLinePos);
        return true;
      },
      preventDefault: true
    }])));
  }
  createKeymapRunCallback() {
    return (view) => {
      return true;
    };
  }
  onunload() {
  }
  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }
  async saveSettings() {
    await this.saveData(this.settings);
  }
};
var SettingTab = class extends import_obsidian.PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }
};
