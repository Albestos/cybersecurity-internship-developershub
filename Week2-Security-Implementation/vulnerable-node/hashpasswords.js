var bcrypt = require("bcrypt");
var { Client } = require("pg");

var client = new Client({
    host: "127.0.0.1",
    port: 5432,
    database: "vulnerablenode",
    user: "postgres",
    password: "postgres"
});

async function hashExistingPasswords() {
    try {
        console.log("Connecting...");
        await client.connect();
        console.log("Connected!");

        var result = await client.query("SELECT id, name, password FROM users;");
        console.log("Found " + result.rows.length + " users");

        for (var user of result.rows) {
            console.log("Hashing: " + user.name);
            var hashed = await bcrypt.hash(user.password, 10);
            await client.query("UPDATE users SET password = $1 WHERE id = $2;", [hashed, user.id]);
            console.log("Done: " + user.name);
        }

        console.log("All done!");
        await client.end();
    } catch (err) {
        console.error("Error:", err.message);
        await client.end();
    }
}

hashExistingPasswords();