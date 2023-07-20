const ethers = require("ethers")
const fs = require("fs-extra")
require("dotenv").config()

async function main() {
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY)
    const encryptKeyJson = await wallet.encrypt(process.env.PRIVATE_KEY_PASSWORD)
    // console.log(encryptKeyJson)
    fs.writeFileSync("./.encryptedKey.json", encryptKeyJson)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })    