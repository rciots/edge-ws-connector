const port = process.env.PORT || 8080;
const cliport = process.env.CLI_PORT || 8081;
const { Server } = require("socket.io");
const socketcli = require("socket.io-client");
const ioclient = new socketcli.connect("http://192.168.1.131:" + cliport, {
  reconnection: true,
  reconnectionDelay: 500
});
const io = new Server(port, { /* options */ });
io.on('connection', (socket) => {
  socket.on("component", (component) => {
    if (component == "hw01") {
      console.log("connected hw01");
    } else if (component == "cam01") {
      console.log("connected cam01");
    }
  });
  socket.on("hello", (data) => {
      console.log(data);
  });
  socket.on("video", (data) => {
    ioclient.emit("video", data);
    console.log("video data:" + data)
  });
});
