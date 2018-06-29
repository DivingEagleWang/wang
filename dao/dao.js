const mysql = require("mysql");

var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '123456',
	database: 'wang_li'
});
connection.connect();
exports.query = (sql,params,callback) => { 
	connection.query(sql,params, function(err, result) {
		if(err) {
			console.log(sql);
			callback("查询失败", null);
			return;
		}
		callback(null, result);
	});
}
exports.add = (sql, params, callback) => {
	connection.query(sql, params, function(err, result) {
		if(err) {
			console.log(sql);
			callback("插入失败", null);
			return;
		}
		callback(null, result);
	});
}
exports.update = (sql, params, callback) => {
	connection.query(sql, params, function(err, result) {
		if(err) {
			console.log(sql);
			callback("更新失败", null);
			return;
		}
		callback(null, result);
	});
}
exports.remove = (sql, callback) => {
	connection.query(sql, function(err, result) {
		if(err) {
			console.log(sql);
			callback("删除失败",null);
			return;
		}
		callback(null,result);
	});
}