// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract EstateAgency {

    struct Property {
        address owner;
        uint totalArea;
        uint usefulArea;
        uint rentAmount;
        uint rentDuration;
        bool rented;
    }

    mapping(address => bool) public administrators;
    mapping(address => Property) public properties;
    mapping(address => uint) public balances;

    event PropertyRegistered(address indexed propertyAddress, address indexed owner, uint totalArea, uint usefulArea);
    event RentOffered(address indexed propertyAddress, uint rentAmount, uint rentDuration);
    event RentConfirmed(address indexed propertyAddress, address indexed renter, uint rentAmount, uint rentDuration);
    event RentCancelled(address indexed propertyAddress, address indexed renter);
    event FundsWithdrawn(address indexed receiver, uint amount);
    event RoleChanged(address indexed user, bool isAdmin);
    event PropertyAreasUpdated(address indexed propertyAddress, uint newTotalArea, uint newUsefulArea);
    event PropertyOwnerChanged(address indexed propertyAddress, address indexed previousOwner, address indexed newOwner);

    constructor(address admin1, address admin2, address owner1, address owner2)  {
        administrators[admin1] = true;
        administrators[admin2] = true;
        administrators[owner1] = false;
        administrators[owner2] = false;
        balances[admin1] = 100;
        balances[admin2] = 100;
        balances[owner1] = 100;
        balances[owner2] = 100;
    }


    modifier onlyAdmin() {
        require(administrators[msg.sender], "Only administrators can perform this action");
        _;
    }

    modifier onlyOwner(address propertyAddress) {
        require(properties[propertyAddress].owner == msg.sender, "Only the owner can perform this action");
        _;
    }


    function checkContract() public pure returns (string memory) {
        return "Contract is working!";
    }

    function registerProperty(address propertyAddress, uint totalArea, uint usefulArea) public onlyAdmin {
        require(properties[propertyAddress].owner == address(0), "Property is already registered");
        properties[propertyAddress] = Property(msg.sender, totalArea, usefulArea, 0, 0, false);
        emit PropertyRegistered(propertyAddress, msg.sender, totalArea, usefulArea);
    }

    function offerRent(address propertyAddress, uint rentAmount, uint rentDuration) public {
        require(properties[propertyAddress].owner != address(0), "Property is not registered");
        require(!properties[propertyAddress].rented, "Property is already rented");
        properties[propertyAddress].rentAmount = rentAmount;
        properties[propertyAddress].rentDuration = rentDuration;
        properties[propertyAddress].rented = true;
        emit RentOffered(propertyAddress, rentAmount, rentDuration);
    }

    function confirmRent(address propertyAddress) public payable {
        require(properties[propertyAddress].owner != address(0), "Property is not registered");
        require(properties[propertyAddress].rented, "Property is not available for rent");
        balances[properties[propertyAddress].owner] += msg.value;
        emit RentConfirmed(propertyAddress, msg.sender, msg.value, properties[propertyAddress].rentDuration);
    }

    function cancelRentOffer(address propertyAddress) public onlyOwner(propertyAddress) {
        require(properties[propertyAddress].rented, "Property is not rented");
        properties[propertyAddress].rentAmount = 0;
        properties[propertyAddress].rentDuration = 0;
        properties[propertyAddress].rented = false;
        emit RentCancelled(propertyAddress, msg.sender);
    }

    function withdrawFunds(uint amount) public {
        require(balances[msg.sender] >= amount, "Insufficient balance");
        balances[msg.sender] -= amount;
        address payable receiver = payable(msg.sender);
        receiver.transfer(amount);
        emit FundsWithdrawn(msg.sender, amount);
    }

    function changeUserRole(address user, bool isAdmin) public onlyAdmin {
        administrators[user] = isAdmin;
        emit RoleChanged(user, isAdmin);
    }

    // новички
    function transferOwnership(address propertyAddress, address newOwner) public {
        require(newOwner != address(0), "Invalid new owner address");
        properties[propertyAddress].owner = newOwner;
        emit PropertyOwnerChanged(propertyAddress, msg.sender, newOwner);
    }

    function extendRent(address propertyAddress, uint newRentAmount) public payable {
        require(properties[propertyAddress].owner != address(0), "Property is not registered");
        require(properties[propertyAddress].rented, "Property is not rented");

        properties[propertyAddress].rentAmount = newRentAmount;

        // Увеличиваем баланс владельца недвижимости на вновь полученную арендную плату
        balances[properties[propertyAddress].owner] += msg.value;

        emit RentConfirmed(propertyAddress, msg.sender, msg.value, properties[propertyAddress].rentDuration);
    }

    function removeProperty(address propertyAddress) public onlyAdmin {
        delete properties[propertyAddress];
    }

    function updatePropertyAreas(address propertyAddress, uint newTotalArea, uint newUsefulArea) public onlyAdmin {
        require(newTotalArea > 0, "Total area must be greater than zero");
        require(newUsefulArea <= newTotalArea, "Useful area cannot exceed total area");

        Property storage property = properties[propertyAddress];
        property.totalArea = newTotalArea;
        property.usefulArea = newUsefulArea;

        emit PropertyAreasUpdated(propertyAddress, newTotalArea, newUsefulArea);
    }

    function checkBalance(address account) public view returns (uint) {
        return balances[account];
    }

    //
    function getAllProperties() public view returns (address[] memory, address[] memory, uint[] memory, uint[] memory, uint[] memory, uint[] memory, bool[] memory) {
        uint length = address(this).balance;
        address[] memory propertyAddresses = new address[](length);
        address[] memory owners = new address[](length);
        uint[] memory totalAreas = new uint[](length);
        uint[] memory usefulAreas = new uint[](length);
        uint[] memory rentAmounts = new uint[](length);
        uint[] memory rentDurations = new uint[](length);
        bool[] memory rentedStatuses = new bool[](length);

        uint index = 0;
        for (uint i = 0; i < length; i++) {
            if (properties[propertyAddresses[i]].owner != address(0)) {
                Property storage property = properties[propertyAddresses[i]];
                propertyAddresses[index] = propertyAddresses[i];
                owners[index] = property.owner;
                totalAreas[index] = property.totalArea;
                usefulAreas[index] = property.usefulArea;
                rentAmounts[index] = property.rentAmount;
                rentDurations[index] = property.rentDuration;
                rentedStatuses[index] = property.rented;
                index++;
            }
        }

        return (propertyAddresses, owners, totalAreas, usefulAreas, rentAmounts, rentDurations, rentedStatuses);
    }
}