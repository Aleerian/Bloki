const EstateAgency = artifacts.require("EstateAgency");

contract("EstateAgency", async (accounts) => {
    let estateAgency;

    before(async () => {
        estateAgency = await EstateAgency.new(accounts[0], accounts[1], accounts[2], accounts[3]);
    });

    it("should register a property", async () => {
        const propertyAddress = accounts[4];
        const totalArea = 100;
        const usefulArea = 80;

        await estateAgency.registerProperty(propertyAddress, totalArea, usefulArea, { from: accounts[0] });

        const property = await estateAgency.properties(propertyAddress);

        assert.equal(property.owner, accounts[0], "Incorrect property owner");
        assert.equal(property.totalArea.toNumber(), totalArea, "Incorrect total area");
        assert.equal(property.usefulArea.toNumber(), usefulArea, "Incorrect useful area");
    });

    it("should offer rent for a property", async () => {
        const propertyAddress = accounts[4];
        const rentAmount = 1000;
        const rentDuration = 12;

        await estateAgency.offerRent(propertyAddress, rentAmount, rentDuration, { from: accounts[0] });

        const property = await estateAgency.properties(propertyAddress);

        assert.equal(property.rentAmount.toNumber(), rentAmount, "Incorrect rent amount");
        assert.equal(property.rentDuration.toNumber(), rentDuration, "Incorrect rent duration");
        assert.equal(property.rented, true, "Property not marked as rented");
    });

    it("should cancel rent offer for a property", async () => {
        const propertyAddress = accounts[4];

        await estateAgency.cancelRentOffer(propertyAddress, { from: accounts[0] });

        const property = await estateAgency.properties(propertyAddress);

        assert.equal(property.rented, false, "Property not marked as not rented");
        assert.equal(property.rentAmount.toNumber(), 0, "Incorrect rent amount");
        assert.equal(property.rentDuration.toNumber(), 0, "Incorrect rent duration");
    });

    it("should change user role", async () => {
        const user = accounts[5];
        const isAdmin = true;

        await estateAgency.changeUserRole(user, isAdmin, { from: accounts[0] });

        const isAdminAfterChange = await estateAgency.administrators(user);

        assert.equal(isAdminAfterChange, isAdmin, "User role not changed");
    });

    it("should confirm rent for a property", async () => {
        const propertyAddress = accounts[4];
        const rentAmount = 1000;
        const rentDuration = 12;

        // Владелец предлагает недвижимость в аренду
        await estateAgency.offerRent(propertyAddress, rentAmount, rentDuration, { from: accounts[0] });

        // Арендатор подтверждает аренду
        await estateAgency.confirmRent(propertyAddress, { from: accounts[4], value: rentAmount * rentDuration });

        const property = await estateAgency.properties(propertyAddress);

        // Проверяем, что недвижимость теперь арендована
        assert.equal(property.rented, true, "Property not marked as rented");
    });

    it("should transfer ownership of a property", async () => {
        const propertyAddress = accounts[4];
        const newOwner = accounts[5];

        // Передаем собственность недвижимости новому владельцу
        await estateAgency.transferOwnership(propertyAddress, newOwner, { from: accounts[0] });

        const property = await estateAgency.properties(propertyAddress);

        // Проверяем, что владелец недвижимости изменился
        assert.equal(property.owner, newOwner, "Property ownership not transferred");
    });

    it("should check balance of an account", async () => {
        const account = accounts[0];

        // Проверяем, что баланс возвращается
        const balance = await estateAgency.checkBalance(account);
        assert.notEqual(balance, 0, "Balance is zero");
    });

    it("should transfer ownership of a property", async () => {
        const propertyAddress = accounts[4];
        const newOwner = accounts[5];

        await estateAgency.transferOwnership(propertyAddress, newOwner, { from: accounts[0] });

        const property = await estateAgency.properties(propertyAddress);

        assert.equal(property.owner, newOwner, "Ownership not transferred");
    });


    it("should remove a property", async () => {
        const propertyAddress = accounts[4];

        await estateAgency.removeProperty(propertyAddress, { from: accounts[0] });

        const property = await estateAgency.properties(propertyAddress);

        assert.equal(property.owner, "0x0000000000000000000000000000000000000000", "Property not removed");
    });

    it("should update property areas", async () => {
        const propertyAddress = accounts[4];
        const newTotalArea = 120;
        const newUsefulArea = 100;

        await estateAgency.updatePropertyAreas(propertyAddress, newTotalArea, newUsefulArea, { from: accounts[0] });

        const property = await estateAgency.properties(propertyAddress);

        assert.equal(property.totalArea.toNumber(), newTotalArea, "Total area not updated");
        assert.equal(property.usefulArea.toNumber(), newUsefulArea, "Useful area not updated");
    });

});