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
    // this.registerEditorExtension(import_state.Prec.highest(import_view.keymap.of([{
    //   key: "Tab",
    //   run: () => {
    //     const view = this.app.workspace.getActiveViewOfType(import_obsidian.MarkdownView);
    //     if (!view)
    //       return false;
    //     let editor = view.editor;
    //     let cursorFrom = editor.getCursor("from");
    //     let cursorTo = editor.getCursor("to");
    //     let somethingSelected = cursorFrom.line != cursorTo.line || cursorFrom.ch != cursorTo.ch;
    //     const app = this.app;
    //     if (this.settings.useOutlinerBetterTab && RegExp("^[\\s]*(-|\\d+\\.)", "u").test(editor.getLine(cursorFrom.line))) {
    //       let prevLine = editor.getLine(cursorFrom.line);
    //       app.commands.executeCommandById("obsidian-outliner:indent-list");
    //       if (prevLine != editor.getLine(cursorFrom.line)) {
    //         return true;
    //       }
    //     }
    //     if (this.settings.useAdvancedTables && RegExp(`^\\|`, "u").test(editor.getLine(cursorFrom.line))) {
    //       app.commands.executeCommandById("table-editor-obsidian:next-cell");
    //       return true;
    //     }
    //     if (somethingSelected && this.settings.indentsIfSelection && (!this.settings.indentsIfSelectionOnlyForMultipleLines || cursorTo.line != cursorFrom.line)) {
    //       editor.exec("indentMore");
    //     } else {
    //       let cursorFrom2 = editor.getCursor("from");
    //       let tabStr = this.settings.useSpaces ? (this.settings.useHardSpace ? "\xA0" : " ").repeat(this.settings.alignSpaces ? this.settings.spacesCount - cursorFrom2.ch % this.settings.spacesCount : this.settings.spacesCount) : "	";
    //       if (!somethingSelected && this.settings.allowException) {
    //         if (RegExp(this.settings.exceptionRegex, "u").test(editor.getLine(cursorFrom2.line))) {
    //           editor.exec("indentMore");
    //           return true;
    //         }
    //       }
    //       editor.replaceSelection(tabStr);
    //       editor.setCursor({ line: cursorFrom2.line, ch: cursorFrom2.ch + tabStr.length });
    //     }
    //     return true;
    //   },
    //   preventDefault: true
    // }])));
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
  // display() {
  //   const { containerEl } = this;
  //   containerEl.empty();
  //   containerEl.createEl("h5", { text: "Obsidian Tab Key Plugin" });
  //   containerEl.createEl("i", { text: "Restore tab key behaviour: tab key inserts a tab, the way it should be." });
  //   containerEl.createEl("br");
  //   containerEl.createEl("br");
  //   containerEl.createEl("h2", { text: "Tab or Space Settings" });
  //   new import_obsidian.Setting(containerEl).setName("Use spaces instead of tab").setDesc("false(default): Insert tab (\\t) when tab key is pressed. true: Insert spaces (\xA0\xA0\xA0\xA0) when tab key is pressed.").addToggle((toggle) => toggle.setValue(this.plugin.settings.useSpaces).onChange(async (value) => {
  //     this.plugin.settings.useSpaces = value;
  //     this.display();
  //     await this.plugin.saveSettings();
  //   }));
  //   if (this.plugin.settings.useSpaces) {
  //     new import_obsidian.Setting(containerEl).setName("Use hard spaces").setDesc(`If "Indent using tabs" is false, space will be used to indent. If "Use hard spaces" is off, a normal space character will be used. Notice that with Markdown, repeated normal spaces will be rendered as one. Turn this option on to use hard spaces (U+00A0), which will not be truncated after Markdown render. To indent stuff in the processed Markdown output, move your cursor to the begin and press tab (indenting won't insert hard spaces)`).addToggle((toggle) => toggle.setValue(this.plugin.settings.useHardSpace).onChange(async (value) => {
  //       this.plugin.settings.useHardSpace = value;
  //       await this.plugin.saveSettings();
  //     }));
  //     new import_obsidian.Setting(containerEl).setName("Space count").setDesc("The number of spaces or hard spaces inserted when tab key is pressed. default: 4").addSlider((slider) => slider.setValue(this.plugin.settings.spacesCount).setLimits(2, 8, 1).setDynamicTooltip().onChange(async (value) => {
  //       this.plugin.settings.spacesCount = value;
  //       await this.plugin.saveSettings();
  //     }));
  //     new import_obsidian.Setting(containerEl).setName("Align spaces (just like how tabs behave)").setDesc('At space count of 4, pressing tab after "abc" inserts one space, "abcde" inserts 3, so the end position after pressing tab is always an integer multiple of the space count.').addToggle((toggle) => toggle.setValue(this.plugin.settings.alignSpaces).onChange(async (value) => {
  //       this.plugin.settings.alignSpaces = value;
  //       await this.plugin.saveSettings();
  //     }));
  //   }
  //   containerEl.createEl("h2", { text: "Tab Key Behaviour" });
  //   new import_obsidian.Setting(containerEl).setName("Indents when selection is not empty").setDesc("true(default): Select some text and press tab key will indent the selected lines. Same behaviour as most IDEs. \nfalse: Selection will be replaced with one tab").addToggle((toggle) => toggle.setValue(this.plugin.settings.indentsIfSelection).onChange(async (value) => {
  //     this.plugin.settings.indentsIfSelection = value;
  //     await this.plugin.saveSettings();
  //   }));
  //   if (this.plugin.settings.indentsIfSelection) {
  //     new import_obsidian.Setting(containerEl).setName("Indents only when selection contains multiple lines").setDesc("true(default): If the selection lies within one line, a tab (or spaces) will replace the selection instead").addToggle((toggle) => toggle.setValue(this.plugin.settings.indentsIfSelectionOnlyForMultipleLines).onChange(async (value) => {
  //       this.plugin.settings.indentsIfSelectionOnlyForMultipleLines = value;
  //       await this.plugin.saveSettings();
  //     }));
  //   }
  //   new import_obsidian.Setting(containerEl).setName("Allow exceptions for indenting").setDesc("Indent line even when the selection is empty when the line matches the regex").addToggle((toggle) => toggle.setValue(this.plugin.settings.allowException).onChange(async (value) => {
  //     this.plugin.settings.allowException = value;
  //     this.display();
  //     await this.plugin.saveSettings();
  //   }));
  //   if (this.plugin.settings.allowException) {
  //     new import_obsidian.Setting(containerEl).setName("Exception regex").setDesc("Default: Indents regardless in lists (zero or more whitespaces, followed by - or number. then optionally a checkbox and then a space). Remove the trailing $ to enable indentation in non-empty lists").addText((textbox) => textbox.setValue(this.plugin.settings.exceptionRegex).setPlaceholder("Regex").onChange(async (value) => {
  //       this.plugin.settings.exceptionRegex = value;
  //       await this.plugin.saveSettings();
  //     })).addExtraButton((button) => button.setIcon("rotate-ccw").onClick(async () => {
  //       this.plugin.settings.exceptionRegex = "^[\\s\xA0]*(-|\\d+\\.)( \\[ \\])?\\s*$";
  //       this.display();
  //       await this.plugin.saveSettings();
  //     }));
  //   }
  //   containerEl.createEl("h2", { text: "Plugin Compatibility" });
  //   new import_obsidian.Setting(containerEl).setName("Use with Advanced Tables plugin").setDesc("Creates a new table or go to next cell when cursor is in a table").addToggle((toggle) => toggle.setValue(this.plugin.settings.useAdvancedTables).onChange(async (value) => {
  //     this.plugin.settings.useAdvancedTables = value;
  //     await this.plugin.saveSettings();
  //   }));
  //   new import_obsidian.Setting(containerEl).setName("Use with Obsidian Outliner plugin").setDesc("Try execute Outliner indent operation when tab is pressed, if nothing changed, use default Restore Tab Key plugin behavior").addToggle((toggle) => toggle.setValue(this.plugin.settings.useOutlinerBetterTab).onChange(async (value) => {
  //     this.plugin.settings.useOutlinerBetterTab = value;
  //     await this.plugin.saveSettings();
  //   }));
  // }
};
