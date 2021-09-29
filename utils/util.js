const { scrypt, randomFill, createCipheriv } = require("crypto");

function encryptCookie(cookieValue) {
  const algorithm = "aes-192-cbc";
  const password = process.env.ENCRYPTION_PASSWORD;

  return new Promise((resolve, reject) => {
    scrypt(password, "salt", 24, (err, key) => {
      if (err) throw err;
      // Then, we'll generate a random initialization vector
      randomFill(new Uint8Array(16), (err, iv) => {
        if (err) throw err;

        // Once we have the key and iv, we can create and use the cipher...
        const cipher = createCipheriv(algorithm, key, iv);

        let encrypted = "";
        cipher.setEncoding("hex");

        cipher.on("data", (chunk) => (encrypted += chunk));
        cipher.on("end", () => resolve(encrypted));

        cipher.write(cookieValue);
        cipher.end();
      });
    });
  });
}

function decryptCookie(encryptedCookie) {}

module.exports = { encryptCookie, decryptCookie };
