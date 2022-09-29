const app = require("./app");
const connect = require("./models/index");

const port = process.env.PORT || 3000;
const start = async () => {
  await connect();
  app.listen(port, () => {
    console.log(`Server Listening =====>: https://localhost:${process.env.PORT}`);
  });
}
start();
