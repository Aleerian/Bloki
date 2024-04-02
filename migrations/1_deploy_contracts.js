
const EstateAgency = artifacts.require("EstateAgency");

module.exports = function(deployer) {
  const admin1 = "0x0273539C044C43FA3964a5FC3cb0Ab0964C4da4d";
  const admin2 = "0x76FD0737878a336D9751ce29eb119c4a37BbD713";
  const owner1 = "0xd4EC6f6941757F92fd18B99267aB62A456f7BC83";
  const owner2 = "0x227fB8147Fa9E92Ad5ff562F82346F7329B84a46";

  deployer.deploy(EstateAgency, admin1, admin2, owner1, owner2);
};
