import json from "./FlashLoan.json";
const { ethers, toNumber } = require("ethers");

const DEPLOYED_CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
async function getAbi() {
  // const data = await fsPromises.readFile(ABI_FILE_PATH, 'utf8');
  const abi = json.abi;
  //console.log(abi);
  return abi;
}

async function getbalance(signer) {
  const abi = await getAbi();
  //   let provider = new ethers.providers.JsonRpcProvider(
  //     `https://rpc.sepolia.org`
  //   );
  // const provider = new ethers.BrowserProvider(window.ethereum);
  // const signer = await provider.getSigner();

  const flashloancontract = new ethers.Contract(
    DEPLOYED_CONTRACT_ADDRESS,
    abi,
    signer
  );
  let getbalance = flashloancontract.connect(signer);
  let tx = await getbalance.getBalance(
    "0x94a9D9AC8a22534E3FaCa9F4e7F2E2cf85d5E4C8"
  );
  let x = toNumber(tx);
  x = x / 1000000;
  return x;
}

export default getbalance;
