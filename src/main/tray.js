/*
 * @Description:
 * @Author: sunsh
 * @Date: 2023-05-01 11:37:43
 * @LastEditors: sunsh
 * @LastEditTime: 2023-05-02 12:21:42
 */
const path = require("path");
const { app, Tray, Menu, nativeImage } = require("electron");

function setTray(storeTray) {
  const icon = nativeImage.createFromPath(
    path.join(__dirname, "../asset/icon.png")
  );
  storeTray = new Tray(icon);
  const contextMenu = Menu.buildFromTemplate([
    {
      label: "关于",
      type: "normal",
      click() {
        app.showAboutPanel();
      },
    },
    {
      label: "开机启动",
      type: "checkbox",
      checked: app.getLoginItemSettings().openAtLogin,
      click() {
        if (!app.isPackaged) {
          app.setLoginItemSettings({
            openAtLogin: !app.getLoginItemSettings().openAtLogin,
            openAsHidden: false,
            path: process.execPath,
            args: [path.resolve(process.argv[1])]
          });
        } else {
          app.setLoginItemSettings({
            openAtLogin: !app.getLoginItemSettings().openAtLogin,
          });
        }
      },
    },
    { 
      label: '退出',
      click: () => app.quit() 
    }
  ]);

  storeTray.setContextMenu(contextMenu);
  storeTray.setToolTip("Caps lock");
  storeTray.setTitle("Caps lock");
}

exports.setTray = setTray;
