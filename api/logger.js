const axios = require("axios");

function ip(req) {
    return (
        req.headers["x-forwarded-for"]?.split(",")[0] ||
        req.headers["x-real-ip"] ||
        req.socket?.remoteAddress ||
        "Unknown"
    );
}

function browser(req) {
    return req.headers["user-agent"] || "Unknown";
}

function time() {
    return new Date().toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata"
    });
}

async function send(webhook, message) {
    if (!webhook) return;

    try {
        await axios.post(webhook, {
            content: message
        });
    } catch (err) {
        console.error("Discord Logger:", err.message);
    }
}

module.exports = {

    async login(req, user) {

        await send(
            process.env.LOGIN_WEBHOOK,

`━━━━━━━━━━━━━━━━━━━━━━

🔐 LOGIN

Username : ${user.username}
Email    : ${user.email}

IP       : ${ip(req)}

Browser  :
${browser(req)}

Time     :
${time()}

━━━━━━━━━━━━━━━━━━━━━━`
        );
    },

    async register(req, user) {

        await send(
            process.env.REGISTER_WEBHOOK,

`━━━━━━━━━━━━━━━━━━━━━━

🆕 REGISTER

Username : ${user.username}
Email    : ${user.email}

IP       : ${ip(req)}

Browser  :
${browser(req)}

Time     :
${time()}

━━━━━━━━━━━━━━━━━━━━━━`
        );
    },

    async service(req, user, service, query, status) {

        await send(
            process.env.SERVICE_WEBHOOK,

`━━━━━━━━━━━━━━━━━━━━━━

🚀 SERVICE USED

Username : ${user.username}
Email    : ${user.email}

Service  : ${service}

Query    :
${query}

Status   : ${status}

IP       : ${ip(req)}

Browser  :
${browser(req)}

Time     :
${time()}

━━━━━━━━━━━━━━━━━━━━━━`
        );
    },

    async admin(req, admin, action) {

        await send(
            process.env.ADMIN_WEBHOOK,

`━━━━━━━━━━━━━━━━━━━━━━

👑 ADMIN ACTION

Admin :

${admin.username}

Action :

${action}

IP :

${ip(req)}

Browser :

${browser(req)}

Time :

${time()}

━━━━━━━━━━━━━━━━━━━━━━`
        );
    },

    async error(req, route, error) {

        await send(
            process.env.ERROR_WEBHOOK,

`━━━━━━━━━━━━━━━━━━━━━━

❌ ERROR

Route :

${route}

Error :

${error}

IP :

${ip(req)}

Browser :

${browser(req)}

Time :

${time()}

━━━━━━━━━━━━━━━━━━━━━━`
        );
    }

};
