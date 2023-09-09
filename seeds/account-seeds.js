// 🔥🔥🔥Imports🔥🔥🔥
const { account } = require('../models');

// 🔥🔥🔥Seed Data🔥🔥🔥
const accountData = [
{
    firstName: 'Toni',
    lastName: 'Morrison',
    email: 'toni@toni.com',
    password: 'beloved',
    id: 1,
},
{
    firstName: 'William',
    lastName: 'Faulkner',
    email: 'bill@bill.com',
    password: 'absolomabsolom',
    id: 2,
},
{
    firstName: 'Hillary',
    lastName: 'Mantel',
    email: 'hillary@hillary.com',
    password: 'wolfhall',
    id: 3,
},
{
    firstName: 'Donna',
    lastName: 'Tartt',
    email: 'donna@donna.com',
    password: 'secrethistory',
    id: 4,
},
{
    firstName: 'Don',
    lastName: 'DeLillo',
    email: 'don@don.com',
    password: 'whitenoise',
    id: 5,
},
];

//🔥🔥🔥Seed Function🔥🔥🔥
const seedAccounts = () => account.bulkCreate(accountData);

// 🔥🔥🔥Export🔥🔥🔥
module.export = seedAccounts;