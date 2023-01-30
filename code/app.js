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
var camera = "";
computervision = "";
const io = new Server(port, { /* options */ });
io.on('connection', (socket) => {
  console.log("component connected");
  socket.on("component", (component) => {
    socket.component = component;
    if (component == "hw01") {
      controller = socket;
      console.log("connected hw01");
    } else if (component == "cam01") {
      camera = socket;
      console.log("connected cam01");
    } else if (component == "cv01") {
      computervision = socket;
      console.log("connected cv01");
    }
  });
  socket.on("video", (data) => {
    ioclient.emit("video", data);
  });
});
ioclient.on("control", (control, act) => {
  console.log("control: " + control + "act: " + act);
  controller.emit("control", control, act);
});
ioclient.on("user_on", (status) => {
  controller.emit("user_on", status);
});