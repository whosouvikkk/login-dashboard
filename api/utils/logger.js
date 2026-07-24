const axios = require("axios");

async function send(url, message) {
    if (!url) return;

    try {
        await axios.post(url, {
            content: message
        });
    } catch (err) {
        console.error("Discord Logger Error:", err.message);
    }
}

module.exports = { send };
