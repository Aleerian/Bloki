
const EstateAgency = artifacts.require("EstateAgency");

module.exports = function(deployer) {
  const admin1 = "0x1d7D1DF6F86c149bd6339E6825335AEaDbe51E47";
  const admin2 = "0x5a580C8545e1749f67bfEBDc22e320EE62395061";
  const owner1 = "0xc3b86722c7F91044c418133871129bE8772aB2DE";
  const owner2 = "0xE9faA1adeA500100255eddEd04792eB0c65889D2";

  deployer.deploy(EstateAgency, admin1, admin2, owner1, owner2);
};
