const ethers = require("ethers")
const fs = require("fs-extra")
require('dotenv').config()

async function main() {

    const provide = new ethers.JsonRpcProvider(process.env.RPC_URL)
    // const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provide)
    const encryptedKeyJson = fs.readFileSync("./.encryptedKey.json", "utf8")
    let wallet = ethers.Wallet.fromEncryptedJsonSync(
        encryptedKeyJson,
        process.env.PRIVATE_KEY_PASSWORD
    )
    wallet = await wallet.connect(provide)
    const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8")
    const binary = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.bin", "utf8")

    const contractFactory = new ethers.ContractFactory(abi, binary, wallet)
    console.log("please wait...")
    const contract = await contractFactory.deploy()
    //等待至少一个事务确认该事务
    await contract.deploymentTransaction().wait(1)
    //调用合约方法getNum()
    const currentFavourateNum = await contract.getNum()
    console.log(`currentFavourateNum: ${currentFavourateNum.toString()}`) //js不好识别bignum，所以转换成string
    //调用合约方法serNum()
    const transactionResponse = await contract.setNum("8");
    const transactionReceipt = await transactionResponse.wait(1)
    const updateDFavourateNum = await contract.getNum();
    console.log(`updateDFavourateNum: ${updateDFavourateNum}`)


    //手动创建一个合约
    //获取当前钱包的交易数
    // const nonce = await provide.getTransactionCount(wallet.address)
    // console.log("nonce:" + nonce)
    // const tx = {
    //     nonce: nonce,
    //     gasLimit: 6721975,
    //     gasPrice: 20000000000,
    //     to: null,
    //     value: 0,
    //     data: "0X608060405234801561000f575f80fd5b506101718061001d5f395ff3fe608060405234801561000f575f80fd5b506004361061003f575f3560e01c806367e0badb14610043578063b7796c9414610061578063cd16ecbf1461007f575b5f80fd5b61004b61009b565b60405161005891906100c9565b60405180910390f35b6100696100a3565b60405161007691906100c9565b60405180910390f35b61009960048036038101906100949190610110565b6100a8565b005b5f8054905090565b5f5481565b805f8190555050565b5f819050919050565b6100c3816100b1565b82525050565b5f6020820190506100dc5f8301846100ba565b92915050565b5f80fd5b6100ef816100b1565b81146100f9575f80fd5b50565b5f8135905061010a816100e6565b92915050565b5f60208284031215610125576101246100e2565b5b5f610132848285016100fc565b9150509291505056fea264697066735822122095a2c21bd81a05876f1c65d15babc76967ef7b3d73bbe9a2eb906c9cc3843f1664736f6c63430008140033",
    //     chainId: 5777
    // }
    // const signTrans = await wallet.sendTransaction(tx)
    // await signTrans.wait(1)
    // console.log(signTrans)

}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })