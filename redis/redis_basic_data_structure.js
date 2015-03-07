var redis = require('redis');
var conn = redis.createClient(6379, '127.0.0.1');

// check if there is a connection error
conn.on('err', function (err) {
    if (err) {
        console.log('Error ' + err);
    }
})

// set and get key-value
conn.set('lover', 'zhang_shaowan', redis.print);
conn.get('lover', function (err, value) {
    if (err) {
        throw err;
    } else {
        console.log('Got: ' + value);
    }
});

//set and get hash table
conn.hmset('camping', {
    'shelter': '2-person tent',
    'cooking': 'campstove'
}, redis.print);

conn.hmget('camping', 'cooking', function (err, value) {
    if (err) {
        throw err;
    } else {
        console.log('Will be cooking with ' + value);
    }
});

conn.hkeys('camping', function (err, keys) {
    if (err) {
        throw err;
    } else {
        keys.forEach(function (key, i) {
            console.log(' ' + key);
        });
    }
});

//set and get list
conn.lpush('tasks', 'Paint the bike red', redis.print);
conn.lpush('tasks', 'Paint the house white', redis.print);
conn.lrange('tasks', 0, -1, function (err, items) {
    if (err) {
        throw err;
    } else {
        items.forEach(function (item, i) {
            console.log(' ' + item);
        })
    }
});


// set and get sets: what is the difference between sets and list?
// 1. list takes O(n) for retrieving an element, but sets takes O(1)
// 2. list allows to store two identical values, but sets don't allow.
conn.sadd('ip_addresses', '192.168.0.1', redis.print);
conn.sadd('ip_addresses', '192.168.0.1', redis.print);
conn.sadd('ip_addresses', '192.168.255.255', redis.print);
conn.smembers('ip_addresses', function (err, membres) {
    if (err) {
        throw err;
    } else {
        console.log(membres);
    }
})