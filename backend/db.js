const mysql = require('mysql2');

// 创建数据库连接池
const pool = mysql.createPool({
    host: '127.0.0.1',   // 数据库的主机名，通常是localhost或127.0.0.1
    port: 3306,          // 数据库端口，MySQL默认端口是3306
    user: 'root',        // 数据库用户名
    password: '这个得改一下，我啥密码都用一样的不能乱丢', // 数据库密码
    database: 'mod_database', // 修改为新的数据库名称
    waitForConnections: true, // 等待可用连接，默认为true
    connectionLimit: 10,      // 连接池中连接的最大数量
    queueLimit: 0             // 允许排队的最大连接数，0表示不限制
});

module.exports = pool.promise();
