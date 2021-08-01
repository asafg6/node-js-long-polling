const axios = require('axios').default;

async function main() {

    while (true) {
        var hadErr = false;
        console.log("requesting...");
        await axios.get('http://127.0.0.1:8080', { timeout: 10000 })
            .then(function (response) {
                console.log(response.data); // This will sometime be empty
            })
            .catch(function (error) {
                console.log('People we have an error!', error);
                hadErr = true;
            });
        if (hadErr) {
            // break out of the loop in case of error
            // maybe in a real live situation we could do something here*
            break;
        }
    }
}

main();

