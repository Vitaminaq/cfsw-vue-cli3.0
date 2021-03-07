const express = require("express");
const app = express();
const ip = require("ip");
const path = require("path");

const resolve = (p) => path.resolve(__dirname, p);

app.use(require("compression")());

app.use(
    require("serve-static")(resolve("dist"), {
    //   setHeaders: (res) => {
    //     res.setHeader("Cache-Control", "public,max-age=60"); // 1000 * 60 * 60 * 24 * 30
    //   },
    })
  );

  // 设置静态文件路由
// app.use('/cfsw', express.static(
//     './dist/client'
// ));

app.listen(3001, () => {
  console.log("http://localhost:3001");
  console.log(`http://${ip.address()}:3001`);
})