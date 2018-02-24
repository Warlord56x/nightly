const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const path = require('path')
const url = require('url')

let win = null

function createWindow () {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    title: '',
    show: false
  })
  win.setMenu(null)
  win.loadURL(url.format({
    pathname: path.join(__dirname,'index.html'),
    protocol: 'file:',
    slashes: true
  }))
  win.once('ready-to-show',()=> {
    win.show()
  })
  win.on('closed',()=> {
    win = null
  })
}

app.on('ready',createWindow)
app.on('window-all-closed',()=> {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
app.on('activate',()=> {
  if (win === null) {
    createWindow()
  }
})
