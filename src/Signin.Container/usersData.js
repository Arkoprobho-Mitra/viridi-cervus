export const usersData = [
    {
        id: 1,
        name: "Rahul Sharma",
        phone: "9876543210",
        email: "rahul@example.com",
        password: "password12345",
        viridiCredit: 500,
        addresses: [
            "123, MG Road, Bangalore, Karnataka - 560001",
            "456, Indiranagar, Bangalore, Karnataka - 560038"
        ],
        savedCards: [
            { id: 1, type: "Visa", number: "**** **** **** 1234", holder: "Rahul Sharma", expiry: "12/26", bank: "HDFC Bank" },
            { id: 2, type: "MasterCard", number: "**** **** **** 5678", holder: "Rahul Sharma", expiry: "09/25", bank: "ICICI Bank" }
        ],
        giftCards: [
            { id: 1, code: "GIFT-1234-5678", balance: 1500, expiry: "31 Dec 2026", status: "Active" }
        ]
    },
    {
        id: 2,
        name: "Priya Patel",
        phone: "9876543211",
        email: "priya@example.com",
        password: "password12345",
        viridiCredit: 1250,
        addresses: [
            "789, Satellite Road, Ahmedabad, Gujarat - 380015",
            "101, Navrangpura, Ahmedabad, Gujarat - 380009"
        ],
        savedCards: [
            { id: 1, type: "RuPay", number: "**** **** **** 4321", holder: "Priya Patel", expiry: "01/27", bank: "SBI" },
            { id: 2, type: "Visa", number: "**** **** **** 8765", holder: "Priya Patel", expiry: "05/28", bank: "Axis Bank" },
            { id: 3, type: "MasterCard", number: "**** **** **** 2468", holder: "Priya Patel", expiry: "11/24", bank: "Kotak Bank" }
        ],
        giftCards: []
    },
    {
        id: 3,
        name: "Amit Singh",
        phone: "9876543212",
        email: "amit@example.com",
        password: "password12345",
        viridiCredit: 0,
        addresses: [
            "202, Connaught Place, New Delhi, Delhi - 110001",
            "303, Vasant Vihar, New Delhi, Delhi - 110057"
        ],
        savedCards: [
            { id: 1, type: "Visa", number: "**** **** **** 1357", holder: "Amit Singh", expiry: "08/29", bank: "Citi Bank" }
        ],
        giftCards: [
            { id: 1, code: "BDAY-9999-8888", balance: 5000, expiry: "15 Aug 2025", status: "Active" },
            { id: 2, code: "OFFR-7777-6666", balance: 500, expiry: "01 Jan 2025", status: "Expired" }
        ]
    },
    {
        id: 4,
        name: "Sneha Reddy",
        phone: "9876543213",
        email: "sneha@example.com",
        password: "password12345",
        viridiCredit: 2400,
        addresses: [
            "404, Banjara Hills, Hyderabad, Telangana - 500034",
            "505, Jubilee Hills, Hyderabad, Telangana - 500033"
        ],
        savedCards: [
            { id: 1, type: "MasterCard", number: "**** **** **** 9876", holder: "Sneha Reddy", expiry: "03/26", bank: "HDFC Bank" },
            { id: 2, type: "Visa", number: "**** **** **** 5432", holder: "Sneha Reddy", expiry: "12/27", bank: "ICICI Bank" },
            { id: 3, type: "RuPay", number: "**** **** **** 1111", holder: "Sneha Reddy", expiry: "07/25", bank: "SBI" },
            { id: 4, type: "Amex", number: "**** **** **** 2222", holder: "Sneha Reddy", expiry: "10/28", bank: "American Express" }
        ],
        giftCards: [
            { id: 1, code: "BONUS-3333-2222", balance: 2000, expiry: "20 Mar 2026", status: "Active" }
        ]
    },
    {
        id: 5,
        name: "Vikram Malhotra",
        phone: "9876543214",
        email: "vikram@example.com",
        password: "password12345",
        viridiCredit: 750,
        addresses: [
            "606, Marine Drive, Mumbai, Maharashtra - 400020",
            "707, Bandra West, Mumbai, Maharashtra - 400050"
        ],
        savedCards: [
            { id: 1, type: "Visa", number: "**** **** **** 3333", holder: "Vikram Malhotra", expiry: "02/26", bank: "HDFC Bank" },
            { id: 2, type: "MasterCard", number: "**** **** **** 4444", holder: "Vikram Malhotra", expiry: "06/25", bank: "Axis Bank" },
            { id: 3, type: "Visa", number: "**** **** **** 5555", holder: "Vikram Malhotra", expiry: "09/27", bank: "SBI" },
            { id: 4, type: "RuPay", number: "**** **** **** 6666", holder: "Vikram Malhotra", expiry: "04/24", bank: "PNB" },
            { id: 5, type: "MasterCard", number: "**** **** **** 7777", holder: "Vikram Malhotra", expiry: "01/29", bank: "IndusInd Bank" }
        ],
        giftCards: [
            { id: 1, code: "FEST-5555-4444", balance: 1000, expiry: "25 Dec 2025", status: "Active" }
        ]
    }
];
