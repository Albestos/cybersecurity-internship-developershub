var pg = require("pg");

function getClient() {
    var client = new pg.Client({
        host: "127.0.0.1",
        port: 5432,
        database: "vulnerablenode",
        user: "postgres",
        ssl: false
    });
    return client;
}

function list_products() {
    var client = getClient();
    return client.connect()
        .then(function() {
            return client.query("SELECT * FROM products;");
        })
        .then(function(result) {
            client.end();
            return result.rows;
        })
        .catch(function(err) {
            client.end();
            throw err;
        });
}

function getProduct(product_id) {
    var client = getClient();
    return client.connect()
        .then(function() {
            return client.query("SELECT * FROM products WHERE id = $1;", [product_id]);
        })
        .then(function(result) {
            client.end();
            return result.rows[0];
        })
        .catch(function(err) {
            client.end();
            throw err;
        });
}

function search(query) {
    var client = getClient();
    return client.connect()
        .then(function() {
            return client.query("SELECT * FROM products WHERE name ILIKE $1 OR description ILIKE $1;", ['%' + query + '%']);
        })
        .then(function(result) {
            client.end();
            return result.rows;
        })
        .catch(function(err) {
            client.end();
            throw err;
        });
}

function purchase(cart) {
    var client = getClient();
    return client.connect()
        .then(function() {
            return client.query(
                "INSERT INTO purchases(mail, product_name, user_name, product_id, address, phone, ship_date, price) VALUES($1,$2,$3,$4,$5,$6,$7,$8);",
                [cart.mail, cart.product_name, cart.username, cart.product_id, cart.address, cart.phone, cart.ship_date, cart.price]
            );
        })
        .then(function(result) {
            client.end();
            return result.rows[0];
        })
        .catch(function(err) {
            client.end();
            throw err;
        });
}

function get_purchased(username) {
    var client = getClient();
    return client.connect()
        .then(function() {
            return client.query("SELECT * FROM purchases WHERE user_name = $1;", [username]);
        })
        .then(function(result) {
            client.end();
            return result.rows;
        })
        .catch(function(err) {
            client.end();
            throw err;
        });
}

var actions = {
    "list": list_products,
    "getProduct": getProduct,
    "search": search,
    "purchase": purchase,
    "getPurchased": get_purchased
}

module.exports = actions;