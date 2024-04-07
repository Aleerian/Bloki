
const EstateAgency = artifacts.require("EstateAgency");

module.exports = function(deployer) {
  const admin1 = "0x803f01E66E7E08771A8E0E9Ad2188A5FA377ad57";
  const admin2 = "0xF19944a7ABA23277CBe2124bD64BAC060DCDCC4D";
  const owner1 = "0xC7d8073912084969eB82F00A343A2b3f3D5A5636";
  const owner2 = "0x6DDa952e0f6B0578E2F63F819C66A721DecCbe63";

  deployer.deploy(EstateAgency, admin1, admin2, owner1, owner2);
};
