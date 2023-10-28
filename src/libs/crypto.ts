import crypto from "crypto";

export const secureSecret = crypto.randomBytes(32).toString("hex");
console.log("Secret generado:", secureSecret);
