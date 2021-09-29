const {createHash} = require("crypto");

function hashCookie(value){

    const hash = createHash("sha256");
    return new Promise((resolve, reject) => {
        hash.on("readable", () =>{
            const data = hash.read()

            if(data){
                resolve(data.toString("hex"));
            }
        });

        hash.write(value);
        hash.end();
    });
}

module.exports = {hashCookie};