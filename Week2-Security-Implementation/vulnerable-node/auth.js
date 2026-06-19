var bcrypt = require("bcrypt");
var pg = require("pg");

function do_auth(username, password) {
    var client = new pg.Client({
        host: "127.0.0.1",
        port: 5432,
        database: "vulnerablenode",
        user: "postgres",
        ssl: false
    });

    return client.connect()
        .then(function() {
            console.log("DB connected");
            return client.query("SELECT * FROM users WHERE name = $1;", [username]);
        })
        .then(function(result) {
            console.log("Query done");
            if (result.rows.length === 0) {
                return client.end().then(function() {
                    throw new Error("Invalid username or password");
                });
            }
            var user = result.rows[0];
            return bcrypt.compare(password, user.password)
                .then(function(match) {
                    console.log("Bcrypt done, match:", match);
                    return client.end().then(function() {
                        console.log("Client ended");
                        if (!match) {
                            throw new Error("Invalid username or password");
                        }
                        console.log("Returning user");
                        return user;
                    });
                });
        })
        .catch(function(err) {
            console.log("Error:", err.message);
            client.end();
            throw err;
        });
}

module.exports = do_auth;