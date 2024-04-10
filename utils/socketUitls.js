const socketIO = require("socket.io");

exports.sio = (server) => {
  return socketIO(server, {
    transports: ["polling"],
    cors: {
      origin: "*",
    },
  });
};

exports.connection = (io) => {

  io.on("connection", (socket) => {
    console.log("A user is connected");

    socket.on("message", (message) => {
      console.log(`message from ${socket.id} : ${message}`);
    });

    socket.on("getBoardData", ({col,row}) => {
      
      const sampleData = Array.from({ length: row }, () =>
        Array.from({ length: col }, () => Math.floor(Math.random() * 100))
      );
      socket.emit("boardData", sampleData)
      console.log(sampleData);

    });
    socket.on("boardSelected", (message) => {
      console.log(`message from ${socket.id} : ${message}`);
      const sampleData = Array.from({ length: 5 }, () =>
      Array.from({ length: 5 }, () => Math.floor(Math.random() * 100))
    );
      socket.emit("boardSelectedResponse", sampleData)
      console.log(sampleData)

    });

    socket.on("play",()=>{
      socket.emit('derash',{'derash': 200, "gameState":"derash"})
      let count = 20;
      const countdownInterval = setInterval(() => {
          if (count >= 0) {
            socket.emit("countDown",{'countdown': count, "gameState":"countdown"})

              count--;
          } else {
            socket.emit("countDown",{'countdown': "Started", "gameState":"countdown"}            )
             socket.emit("active-call-number", {
              'number': 1,
              'letter':'GT',
              'color':'',
              'text':'',
              'calledNumber':34
          })
            clearInterval(countdownInterval); // 
          }
      }, 1000);
      
    })

    socket.on("disconnect", () => {
      console.log(`socket ${socket.id} disconnected`);
    });
  });
};