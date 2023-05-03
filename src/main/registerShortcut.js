const { globalShortcut, BrowserWindow } = require("electron");

function registerGlobalShortcut(cb = () => {}) {
  let capsLockOn = false;
  let numLockOn = false;
  let scrollLockOn = false;

  return function (winInstance) {
    // 注册全局快捷键
    globalShortcut.register("CapsLock", () => {
      capsLockOn = !capsLockOn;
      cb("CapsLock", capsLockOn);
    });
    globalShortcut.register("NumLock", () => {
      numLockOn = !numLockOn;
      cb("NumLock", numLockOn);
    });
    globalShortcut.register("ScrollLock", () => {
      scrollLockOn = !scrollLockOn;
      cb("ScrollLock", scrollLockOn);
    });
  }
}

function toggleIndicator(type, status) {
  let win = BrowserWindow.getAllWindows()[0];
  if (!win) return;

  // getModifierState
  win.webContents.send("update-icon", { type, status });

  // if (win.isVisible()) return;
  win.show();
  setTimeout(() => {
    win.hide();
  }, 1000);
}

let registerShortcut = registerGlobalShortcut(toggleIndicator);

module.exports = {
  registerShortcut
}
