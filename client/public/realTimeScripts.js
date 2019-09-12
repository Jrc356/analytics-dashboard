
const socket = io.connect();
socket.on('connect', function() {
  socket.send(window.location);
});