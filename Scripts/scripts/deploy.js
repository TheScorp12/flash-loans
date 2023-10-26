const hre = require("hardhat");

async function main() {
  console.log("deploying...");
  const FlashLoan = await hre.ethers.getContractFactory("FlashLoan");
  const flashLoan = await FlashLoan.deploy(
    "0x012bAC54348C0E635dCAc9D5FB99f06F24136C9A" //PoolAddressesProvider-Aave 
  );

  await flashLoan.waitForDeployment();

  console.log("Flash loan contract deployed: ", flashLoan.target);
  //0x904abFd9D5042b2908f1E5F1cE76a77c7d0394A2
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});