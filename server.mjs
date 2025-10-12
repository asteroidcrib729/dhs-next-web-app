import { spawn } from "child_process";

// Run Next.js's built-in server bound to the Passenger/cPanel PORT
const child = spawn(
    process.execPath, // node binary
    [
        "node_modules/next/dist/bin/next",
        "start",
        "-p",
        process.env.PORT || "3000",
    ],
    { stdio: "inherit" }
);

child.on("close", (code) => process.exit(code));
child.on("error", (err) => {
    console.error(err);
    process.exit(1);
});
