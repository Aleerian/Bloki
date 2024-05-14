const ganacheUrl = 'http://localhost:7545';
const web3 = new Web3(new Web3.providers.HttpProvider(ganacheUrl));

const contract =  new web3.eth.Contract( [
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "admin1",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "admin2",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "owner1",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "owner2",
                "type": "address"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "receiver",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "FundsWithdrawn",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "propertyAddress",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "newTotalArea",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "newUsefulArea",
                "type": "uint256"
            }
        ],
        "name": "PropertyAreasUpdated",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "propertyAddress",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "previousOwner",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
            }
        ],
        "name": "PropertyOwnerChanged",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "propertyAddress",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "totalArea",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "usefulArea",
                "type": "uint256"
            }
        ],
        "name": "PropertyRegistered",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "propertyAddress",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "renter",
                "type": "address"
            }
        ],
        "name": "RentCancelled",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "propertyAddress",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "renter",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "rentAmount",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "rentDuration",
                "type": "uint256"
            }
        ],
        "name": "RentConfirmed",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "propertyAddress",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "rentAmount",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "rentDuration",
                "type": "uint256"
            }
        ],
        "name": "RentOffered",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "user",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "bool",
                "name": "isAdmin",
                "type": "bool"
            }
        ],
        "name": "RoleChanged",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "administrators",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "balances",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "properties",
        "outputs": [
            {
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "totalArea",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "usefulArea",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "rentAmount",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "rentDuration",
                "type": "uint256"
            },
            {
                "internalType": "bool",
                "name": "rented",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "checkContract",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "pure",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "propertyAddress",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "totalArea",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "usefulArea",
                "type": "uint256"
            }
        ],
        "name": "registerProperty",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "propertyAddress",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "rentAmount",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "rentDuration",
                "type": "uint256"
            }
        ],
        "name": "offerRent",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "propertyAddress",
                "type": "address"
            }
        ],
        "name": "confirmRent",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "propertyAddress",
                "type": "address"
            }
        ],
        "name": "cancelRentOffer",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "withdrawFunds",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "user",
                "type": "address"
            },
            {
                "internalType": "bool",
                "name": "isAdmin",
                "type": "bool"
            }
        ],
        "name": "changeUserRole",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "propertyAddress",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
            }
        ],
        "name": "transferOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "propertyAddress",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "newRentAmount",
                "type": "uint256"
            }
        ],
        "name": "extendRent",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "propertyAddress",
                "type": "address"
            }
        ],
        "name": "removeProperty",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "propertyAddress",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "newTotalArea",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "newUsefulArea",
                "type": "uint256"
            }
        ],
        "name": "updatePropertyAreas",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "checkBalance",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getAllProperties",
        "outputs": [
            {
                "internalType": "address[]",
                "name": "",
                "type": "address[]"
            },
            {
                "internalType": "address[]",
                "name": "",
                "type": "address[]"
            },
            {
                "internalType": "uint256[]",
                "name": "",
                "type": "uint256[]"
            },
            {
                "internalType": "uint256[]",
                "name": "",
                "type": "uint256[]"
            },
            {
                "internalType": "uint256[]",
                "name": "",
                "type": "uint256[]"
            },
            {
                "internalType": "uint256[]",
                "name": "",
                "type": "uint256[]"
            },
            {
                "internalType": "bool[]",
                "name": "",
                "type": "bool[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
],'0x2D7533e281dD2Ce6b2d53326B47d4fC443d8db50' );
