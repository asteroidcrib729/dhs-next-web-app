import next from "next";
import * as http from "http";

process.env.NODE_ENV = "production";
process.env.NODE_OPTIONS = "--max-old-space-size=512";

const app = next({ dev: false });
const handle = app.getRequestHandler();

const port = process.env.PORT || 3000;

app.prepare().then(() => {
    http
        .createServer((req, res) => handle(req, res))
        .listen(port, () => {
            console.log(`Ready on port ${port}`);
        });
});
