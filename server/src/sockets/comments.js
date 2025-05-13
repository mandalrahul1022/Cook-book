export default function commentSocket(io) {
  io.of("/comments").on("connection", socket => {
    socket.on("join", recipeId => socket.join(recipeId));
    socket.on("newComment", ({ recipeId, comment }) => {
      io.of("/comments").to(recipeId).emit("receiveComment", comment);
    });
  });
}
