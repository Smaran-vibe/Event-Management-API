const dns = require("dns");

dns.setServers(["8.8.8.8", "1.1.1.1"]);

dns.resolveSrv(
    "_mongodb._tcp.poweralert.chckap8.mongodb.net",
    (error, addresses) => {
        if (error) {
            console.error(error);
            return;
        }

        console.log(addresses);
    }
);