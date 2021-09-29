const {
  scrypt,
  createCipheriv,
  scryptSync,
  createDecipheriv,
} = require("crypto");
const { Buffer } = require("buffer");

function encryptCookie(cookieValue) {
  const algorithm = "aes-192-cbc";
  const password = process.env.ENCRYPTION_PASSWORD;

  return new Promise((resolve, reject) => {
    scrypt(password, "salt", 24, (err, key) => {
      if (err) throw err;
      // Then, we'll generate a random initialization vector
      const iv = Buffer.alloc(16, 0);

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
}

function decryptCookie(encryptedCookie) {
  const algorithm = "aes-192-cbc";
  const password = process.env.ENCRYPTION_PASSWORD;
  // Key length is dependent on the algorithm. In this case for aes192, it is
  // 24 bytes (192 bits).
  // Use the async `crypto.scrypt()` instead.
  scrypt(password, "salt", 24, (err, key) => {
    if (err) throw err;

    // The IV is usually passed along with the cipher text.
    const iv = Buffer.alloc(16, 0); // Initialization vector.

    const decipher = createDecipheriv(algorithm, key, iv);

    return new Promise((resolve, reject) => {
      let decrypted = "";
      decipher.on("readable", () => {
        while (null !== (chunk = decipher.read())) {
          decrypted += chunk.toString("utf8");
        }
      });
      decipher.on("end", () => {
        resolve(decrypted);
      });
      decipher.write(encryptedCookie, "hex");
      decipher.end();
    });
  });
}

module.exports = { encryptCookie, decryptCookie };
