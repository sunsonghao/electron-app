/*
 * @Description: 
 * @Author: sunsh
 * @Date: 2023-04-29 23:43:14
 * @LastEditors: sunsh
 * @LastEditTime: 2023-04-30 21:03:19
 */
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  onUpdateIcon: callback => ipcRenderer.on('update-icon', callback)
});