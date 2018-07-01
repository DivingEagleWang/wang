const formidable = require("formidable");
const dao = require("../dao/dao.js");

//登录信息的提交

exports.loging = function(req,res,next){ //提交登陆信息
	var form = new formidable.IncomingForm();
	form.parse(req, (err,info,files) => {
		if(err){
			console.log("前台表单传输错误");next();
		}
		else{
			var userName = info.userName;
			var userPass = info.userPass;
			var sql = "select * from login where user=? and pass=?";
			var params = [userName,userPass];
			dao.query(sql,params,function(err, results){
				if(err){
					console.log(err);
					next();
				}
				if(results.length == 0) {
					res.writeHead(302, {
						"Location": "http://127.0.0.1:3000/login?content=1"
					});
					res.end();
				}
				else{
					req.session.userName = userName;
					res.writeHead(302, {
						"Location": "http://127.0.0.1:3000/homePage?list=2"
					});
					res.end();
				}
			});
		}
	});
}

//主页的提示

exports.login = function(req, res, next){ 
	var contents = req.query.content;
	if(contents == 1)
		var content = "用户名或密码错误，请重新输入";
	else if(contents == 2)
		content = "请登陆";
	res.render("login",{
		"content": content
	});
}

//退出登录

exports.exit = function(request, response, next){
	request.session.userName = null;
	response.writeHead(302, {
		"Location": "http://127.0.0.1:3000/login?content=2"
	});
	response.end();
}

//主页的获取

exports.getHomePage = function(req,res,next){
	if(req.session.userName == null){
		res.writeHead(302, {
			"Location": "http://127.0.0.1:3000/login?content=2"
		});
		res.end();
	}
	if(req.query.list != null){
		var num = parseInt(req.query.list);
	}
	var sql = "select * from lists where type = 'child'";
	dao.query(sql, function(err, left_info){
		if(err){
			console.log(err);next();
		}
		if(num == 1)
		{
			var now = new Date();
			var year = now.getFullYear();
			var month = now.getMonth() + 1;
			var day = now.getDate();
			if(month < 10) month = "0" + month;
			if(day < 10) day = "0" + day;
			var now_date = year + "-" + month + "-" + day;
			sql = "select * from to_do where time=? and isdelete=0 order by urgent desc,time asc";
			var params = [now_date];
		}
		else if(num == 2){
			sql = "select * from to_do where isdelete=0 order by urgent desc,time asc";
		}
		else if(num == 3){
			sql = "select * from to_do where isdelete=1 order by urgent desc,time asc";
		}
		else{
			sql = "select * from to_do where list_id=? and isdelete=0 order by urgent desc,time asc";
			var params = [num];
		}
		dao.query(sql,params,function(err, right_info){
			if(err) {
				console.log(err);next();
			}
			res.render("homePage", {
				"lists": left_info,
				"contents": right_info,
				"flag": num
			});
		});
	});
}

//添加清单

exports.addList = function(request, response, next){ //新建列表
	if(request.session.userName == null) {
		response.writeHead(302, {
			"Location": "http://127.0.0.1:3000/login?content=2"
		});
		response.end();
	}
	var form = new formidable.IncomingForm();
	form.parse(request, function(err, info, files){
		if(err != null) {
			console.log("表单错误");next();
		}
		var listName = info.listName;
		var sql = "insert into lists values(null,?,'child')";
		dao.add(sql, [listName], (err, result) => {
			if(err) {
				console.log(err);
				next();
			}
			response.writeHead(302, {
				"Location": "http://127.0.0.1:3000/homePage?list=2"
			});
			response.end();
		});
	});
}

//添加事项

exports.addThing = function(request, response, next){
	if(request.session.userName == null) {
		response.writeHead(302, {
			"Location": "http://127.0.0.1:3000/login?content=2"
		});
		response.end();
	}
	var form = new formidable.IncomingForm();
	var list_id = 2;
	if(request.query.list != null) list_id = parseInt(request.query.list);
	form.parse(request, (err, fields, files) => {
		if(err != null) {
			console.log("表单错误");next();
		}
		var title = fields.title;
		var urgent = parseInt(fields.urgent);
		var year = fields.year;
		var month = fields.month;
		var day = fields.day;
		if(month < 10) month = "0" + parseInt(month);
		if(day < 10) day = "0" + parseInt(day);
		var time = year + "-" + month + "-" + day;
		var sql = "insert into to_do values(null,?,?,?,?,?)";
		var params = [title, urgent, time, list_id, 0];
		dao.add(sql,params,(err, result) => {
			if(err) {
				console.log(err);next();
			}
			response.writeHead(302, {
				"Location": "http://127.0.0.1:3000/homePage?list=" + list_id
			});
			response.end();
		});
	});
}

//移动事项到已完成的清单

exports.delete= function(request,response,next){
	if(request.session.userName == null) {
		response.writeHead(302, {
			"Location": "http://127.0.0.1:3000/login?content=2"
		});
		response.end();
	}
	var id = request.query.id;
	var list = request.query.list;
	var sql = "update to_do set isdelete=1 where id=?";
	params = [id]
	dao.update(sql,params,function(err,result){
		if(err) {
			console.log(err);next();
		}
		response.writeHead(302, {
			"Location": "http://127.0.0.1:3000/homePage?list=" + list
		});
		response.end();
	});
}

//删除事项

exports.remove = function(request, response, next){
	if(request.session.userName == null) {
		response.writeHead(302, {
			"Location": "http://127.0.0.1:3000/login?content=2"
		});
		response.end();
	}
	var id = request.query.id;
	var sql = "delete from to_do where id=" + id;
	dao.remove(sql, (err, result) => {
		if(err) {
			console.log(err);next();
		}
		response.writeHead(302, {
			"Location": "http://127.0.0.1:3000/homePage?list=3"
		});
		response.end();
	});
}

//删除清单

exports.deleteList = function(request, response, next){
	if(request.session.userName == null) {
		response.writeHead(302, {
			"Location": "http://127.0.0.1:3000/homePage?content=2"
		});
		response.end();
	}
	var id = parseInt(request.query.id);
	var sql = "delete from lists where id=" + id;
	dao.remove(sql, (err, result) => {
		if(err) {
			console.log(err);
			next();
		}
		sql = "delete from to_do where list_id=" + id;
		dao.remove(sql, (err, result) => {
			if(err) {
				console.log(err);next();
			}
			response.writeHead(302, {
				"Location": "http://127.0.0.1:3000/homePage?list=2"
			});
			response.end();
		});
	});
}

//搜素事项

exports.search = function(request, response, next){
	if(request.session.userName == null) {
		response.writeHead(302, {
			"Location": "http://127.0.0.1:3000/login?content=2"
		});
		response.end();
	}
	var form = new formidable.IncomingForm();
	form.parse(request, (err, info, files) => {
		if(err != null) {
			console.log("表单错误");next();
		}
		var search = info.search;
		var sql = "select * from to_do where title like '%" + search + "%' and isdelete=0 order by urgent desc,time asc";
		dao.query(sql,function(err, result){
			if(err) {
				console.log(err);next();
			}
			sql = "select * from lists where type='child'";
			dao.query(sql, (err, resl) => {
				if(err) {
					console.log(err);next();
				}
				response.render("homePage", {
					"lists": resl,
					"contents": result,
					"flag": -1
				});
			});
		});
	});
}
