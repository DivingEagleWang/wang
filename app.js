var express = require("express");
var router = require("./router/router.js");
var cookie = require("cookie-parser");
var session = require("express-session");
var app = express();

app.set("view engine","ejs");
app.use(express.static("./public"));
app.use(cookie());
app.use(session({ secret:'12345',cookie:{ maxAge: 600000 }}));
//登录类
app.get("/login",router.login);
app.post("/login",router.loging);
//主页与退出类
app.get("/",router.getHomePage);
app.get("/HomePage",router.getHomePage);
app.get("/exit",router.exit);
//增加类
app.post("/addThing",router.addThing);
app.post("/addList",router.addList);
//删除类
app.get("/delete",router.delete);
app.get("/remove",router.remove);
app.get("/deleteList",router.deleteList);
//搜索类
app.post("/search",router.search);
app.use((request,response,next)=>{
	response.write("404");
	response.end();
});
app.listen(3000);
console.log("running at 127.0.0.1:3000");