/*
 * @Description:
 * @Author: sunsh
 * @Date: 2023-04-29 22:34:35
 * @LastEditors: sunsh
 * @LastEditTime: 2023-05-03 01:03:26
 */
// main.js

// electron 模块可以用来控制应用的生命周期和创建原生浏览窗口
const path = require("path");
const theme = require("./theme.js");
const { setTray } = require("./tray.js");
const { app, BrowserWindow, ipcMain } = require("electron");
const { throttle } = require('../util/index.js');
const { registerShortcut } = require('./registerShortcut.js');

const createWindow = () => {
  // 创建浏览窗口
  const win = new BrowserWindow({
    width: 250,
    height: 250,
    frame: false,
    resizable: false,
    maximizable: false,
    transparent: true,
    alwaysOnTop: true,
    show: false,
    webPreferences: {
      preload: path.join(__dirname, "..", "preload.js"),
    },
  });

  theme();

  win.loadFile(path.join(__dirname, "../renderer/index.html"));
};

let trayInstance = Object.create({});
app.setAboutPanelOptions({
  applicationName: "caps_lock",
  applicationVersion: app.getVersion(),
  copyright: "",
  authors: ["sunsh"],
  iconPath: path.join(__dirname, "../asset/icon.png"),
});

app
  .whenReady()
  .then(registerShortcut)
  .then(() => setTray(trayInstance))
  .then(() => {
    ipcMain.on("update-success", (e, value) => {
      console.log("update-success:", value);
    });

    createWindow();

    app.on("activate", () => {
      if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
  });

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

