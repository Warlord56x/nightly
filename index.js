const electron = require('electron')
//const app = electron.remote.app
//const BrowserWindow = electron.remote.BrowserWindow
const dialog = electron.remote.dialog
const fs = require('fs')
//const path = require('path')
//const url = require('url')

let win = electron.remote.getCurrentWindow()
let cm = new CodeMirror(document.body,{
  value: '',
  mode: 'null',
  lineSeparator: null,
  theme: 'nightly',
  indentUnit: 2,
  smartIndent: true,
  tabSize: 2,
  indentWithTab: false,
  //electricChars: boolean,
  //specialChars: RegExp,
  //specialCharPlaceholder: function(char) => Element
  //rtlMoveVisually: boolean,
  //keyMap: string,
  //extraKeys: object,
  //configureMouse: see codemirror's docs,
  lineWrapping: true,
  lineNumbers: false,
  firstLineNumber: 1,
  //lineNumberFormatter: function(line: integer) => string,
  //gutters: array<string>,
  fixedGutter: true,
  scrollbarStyle: 'native',
  //coverGutterNextToScrollbar: boolean,
  //inputStyle: 'contenteditable',
  readOnly: false,
  showCursorWhenSelecting: true,
  //lineWiseCopyCut: true,
  //pasteLinesPerSelection: true,
  //undoDepth: 200,
  //historyEventDelay: 1250,
  //tabindex: integer,
  autofocus: true,
  dragDrop: true,
  allowDropFileTypes: null, //array<string>
  //cursorBlinkRate: 530,
  //cursorScrollMargin: 0,
  //cursorHeight: 1,
  //resetSelectionOnContextMenu: true,
  //workTime: 200,
  //workDelay: 300,
  //pollInterval: 100,
  //flattenSpans: true,
  //addModeClass: true,
  //maxHighlightLength: Infinity,
  //viewportMargin: 10,

  matchBrackets: true,
  autoCloseBrackets: true,
  continueComments: true,
})
let doc = cm.getDoc()

cm.setOption('extraKeys',{
  'F11': (cm)=> {
    if (win.isFullScreen() === false) win.setFullScreen(true)
    else win.setFullScreen(false)
  },
  'F12': (cm)=> {
    win.webContents.toggleDevTools()
  },
  'Ctrl-Q': (cm)=> {
    win.close()
  },
  'Ctrl-O': (cm)=> {
    dialog.showOpenDialog({filters: [{name: 'text(.txt)',extensions: ['txt']},{name: 'all(*)', extensions: ['*']}]},(file)=> {
      if (file === undefined) return
      fs.readFile(file[0],'utf8',(err,data)=> {
        if (err) dialog.showErrorBox('error',err.message)
        else doc.setValue(data)
      })
    })
  },
  'Ctrl-S': (cm)=> {
    dialog.showSaveDialog({filters: [{name: 'text(.txt)',extensions: ['txt']},{name: 'all(*)',extensions: ['*']}]},(file)=> {
      if (file === undefined) return
      fs.writeFile(file,doc.getValue(),(err)=> {
        if (err) dialog.showErrorBox('error',err.message)
        else fs.readFile(file[0],'utf8',(error,data) => {
          if (error) dialog.showErrorBox('error',err.message)
          else doc.setValue(data)
        })
      })
    })
  }
})
