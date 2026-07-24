const { send } = require("./logger");

function getIP(req) {
    return (
        req.headers["x-forwarded-for"]?.split(",")[0] ||
        req.socket.remoteAddress ||
        "Unknown"
    );
}

function getBrowser(req) {
    return req.headers["user-agent"] || "Unknown";
}

function now() {
    return new Date().toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata"
    });
}

async function service(req, user, service, query, status) {

    const msg = `
━━━━━━━━━━━━━━━━━━━━━━

🚀 SERVICE USED

User : ${user.username}
Email : ${user.email}

Service : ${service}

Query : ${query}

Status : ${status}

IP : ${getIP(req)}

Browser :

${getBrowser(req)}

Time :

${now()}

━━━━━━━━━━━━━━━━━━━━━━
`;

    await send(process.env.SERVICE_WEBHOOK, msg);
}

async function login(req, user) {

    const msg = `
━━━━━━━━━━━━━━━━━━━━━━

🔐 LOGIN

User : ${user.username}

Email : ${user.email}

IP : ${getIP(req)}

Browser :

${getBrowser(req)}

Time :

${now()}

━━━━━━━━━━━━━━━━━━━━━━
`;

    await send(process.env.LOGIN_WEBHOOK, msg);
}

async function register(req, user) {

    const msg = `
━━━━━━━━━━━━━━━━━━━━━━

🆕 REGISTER

User : ${user.username}

Email : ${user.email}

IP : ${getIP(req)}

Browser :

${getBrowser(req)}

Time :

${now()}

━━━━━━━━━━━━━━━━━━━━━━
`;

    await send(process.env.REGISTER_WEBHOOK, msg);
}

async function admin(req, admin, action) {

    const msg = `
━━━━━━━━━━━━━━━━━━━━━━

👑 ADMIN

Admin : ${admin.username}

Action :

${action}

IP :

${getIP(req)}

Time :

${now()}

━━━━━━━━━━━━━━━━━━━━━━
`;

    await send(process.env.ADMIN_WEBHOOK, msg);
}

async function error(route, err) {

    const msg = `
━━━━━━━━━━━━━━━━━━━━━━

❌ ERROR

Route :

${route}

Error :

${err}

Time :

${now()}

━━━━━━━━━━━━━━━━━━━━━━
`;

    await send(process.env.ERROR_WEBHOOK, msg);
}

module.exports = {
    service,
    login,
    register,
    admin,
    error
};
