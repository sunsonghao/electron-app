const content = document.querySelector('#content > span');

window.electronAPI.onUpdateIcon((_event, data) => {
  content.innerText = `${data.type}: ${ data.status ? 'On' : 'Off'}`;
  _event.sender.send('update-success', data);
});