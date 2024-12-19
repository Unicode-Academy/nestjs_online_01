//Client truy cập đến file js ở trên server --> thông qua http
/*
- port là gì? ==> Không có service nào đang sử dụng
- hostname là gì? (domain, ip) ==> Mặc định máy cụ bộ hostname là localhost, ip là 127.0.0.1
*/
// const http = require("http"); //commonJS Module
import http from "http"; //ES Module
import url from "url";
const getUsers = (request, response) => {
  //response: Phản hồi từ server về client
  response.setHeader("Content-Type", "application/json; charset=utf-8");
  response.setHeader("Set-Cookie", "age=32; Max-Age=3600; Path=/");
  const user = {
    id: 1,
    name: "Huy",
    age: 20,
  };
  //   response.statusCode = 404;
  response.end(JSON.stringify(user));
};
const getProducts = (request, response) => {
  const products = {
    id: 1,
    name: "Sản phẩm 1",
    price: 1200,
  };
  response.setHeader("Content-Type", "application/json; charset=utf-8");
  response.end(JSON.stringify(products));
};
const server = http.createServer((request, response) => {
  //request: Nhận các yêu cầu từ phía client gửi lên
  //   const apiKey = request.headers["x-api-key"];
  //   console.log(apiKey);
  //   const cookie = request.headers["cookie"];
  //   console.log(cookie);
  const urlParse = url.parse(request.url);
  const pathname = urlParse.pathname;
  const method = request.method;

  if (pathname === "/api/users" && method === "GET") {
    return getUsers(request, response);
  }

  if (pathname === "/api/products" && method === "GET") {
    return getProducts(request, response);
  }
  //Routing
});
server.listen(3000, "localhost", () => {
  console.log(`Server running at http://localhost:3000`);
});

//ExpressJS
