const port = process.env.PORT || 8080;
const cliport = process.env.CLI_PORT || 8082;
const wsmanager = process.env.WS_MANAGER || "192.168.1.131";
const { Server } = require("socket.io");
const socketcli = require("socket.io-client");
const ioclient = new socketcli.connect("http://" + wsmanager + ":" + cliport, {
  reconnection: true,
  reconnectionDelay: 500
});
var controller = "";
const io = new Server(port, { /* options */ });
io.on('connection', (socket) => {
  console.log("component connected");
  socket.on("component", (component) => {
    if (component == "hw01") {
      controller = socket;
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
  });
});
ioclient.on("control", (control) => {
  controller.emit("control", control);
});
ioclient.on("user_on", (status) => {
  controller.emit("user_on", status);
});