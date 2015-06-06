import Auth from "./auth";

class WebSocket {

  constructor() {
    this.init();
  }

  init() {
    let host = window.location.origin;
    console.log("WEBSOCKET connecting to", host);

    this.socket = io.connect(host);

    this.socket.on('connect', () => {
      let sessionId = this.socket.io.engine.id;

      console.log("WEBSOCKET connected with session id", sessionId);

      this.socket.emit('new_user', { id: sessionId });

      this.socket.on('new_connection', (data) => {
        if (data.user.id === sessionId) {
          Auth.setCurrentUser(data.user);
        }
      });
    });

    this.socket.on('error', (error) => {
      console.log("WEBSOCKET - error", error)
    });
  }

  emit(key, data) {
    this.socket.emit(key, data);
  }

  on(key, callback) {
    this.socket.on(key, callback);
  }

  off(key, callback) {
    this.socket.off(key, callback);
  }
}

let webSocket = new WebSocket();
export default webSocket;