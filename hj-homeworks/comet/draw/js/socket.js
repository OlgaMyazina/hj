'use strict';

const ws = new WebSocket('wss://neto-api.herokuapp.com/draw');

editor.addEventListener('update', event => {
  const canvas = event.canvas;
  canvas.toBlob(blob => ws.send(blob));
});

ws.addEventListener('message', event => {
  console.log(`send from server`, event);
});

ws.addEventListener('close', event => {
  console.log(event.code);
});



