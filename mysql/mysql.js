var mysql = require('mysql');

connectToDb();

function connectToDb () {
    var conn = mysql.createConnection({
        host: '127.0.0.1',
        user: 'root',
        password: 'Eric0809'
    });

    conn.connect(function (err) {
        if (err) {
            throw err;
        } else {
            console.log('Connection to mysql is done');
            createDB(conn);
        }
    });
}

function createDB (conn) {
    conn.query('CREATE DATABASE node', function (err) {
        if (err && err.number != conn.ERROR_DB_CREATE_EXISTS) {
            throw err;
        } else {
            console.log('Database is created or database is exist');
            useDB(conn);
        }
    });
}

function useDB (conn) {
    conn.query('USE node', function (err) {
        if (err) {
            throw err;
        } else {
            console.log ('Use database with success');
            createTable(conn);
        }
    });
}

function createTable (conn) {
    conn.query('CREATE TABLE IF NOT EXISTS users (' +
    'id INT(10) NOT NULL AUTO_INCREMENT, ' +
    'pwd VARCHAR(64) NOT NULL, ' +
    'PRIMARY KEY (id))', function (err) {
        if (err) {
            throw err;
        } else {
            console.log('Create table with success');
            insertTable(conn);
        }
    });
}

function insertTable (conn) {
    // or 'INSERT INTO users (pwd) VALUES (?)', ['pwd01']
    conn.query('INSERT INTO users SET pwd=?', ['pwd01'], function (err, results) {
        if (err) {
            throw err;
        } else {
            console.log('Inserted ' + results.affectedRows + ' row.');
            selectTable(conn);
        }
    });
}

function selectTable (conn) {
    conn.query('SELECT * FROM users', function (err, results) {
        if (err) {
            throw err;
        } else {
            console.log('Row count is ' + results.length);
            console.log(results);
            updateTable(conn);
        }
    });
}

function updateTable (conn) {
    conn.query('UPDATE users SET pwd=? WHERE id=?', ['pwd002', '1'], function (err, results) {
        if (err) {
            throw err;
        } else {
            console.log('Update table with success, and the affected row count is ' + results.affectedRows);
            emptyTable(conn);
        }
    });
}

function emptyTable(conn) {
    conn.query('DELETE FROM users', function (err, results) {
        if (err) {
            throw err;
        } else {
            console.log('Empty table with success, the affected rows is', results.affectedRows);
            dropTable(conn);
        }
    });
}

function dropTable(conn) {
    conn.query('DROP TABLE users', function (err) {
        if (err) {
            throw err;
        } else {
            console.log('Drop table users with success');
            conn.end();
        }
    });
}











