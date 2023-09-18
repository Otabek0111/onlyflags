// 🔥🔥🔥Imports🔥🔥🔥
const { Account } = require('../models');

// 🔥🔥🔥Seed Data🔥🔥🔥
const accountData = [
{
    id: 1,
    email: 'ethan@gmail.com',
    password: 'abc123',
    
},
{
    id: 2,
    email: 'liam@gmail.com',
    password: 'abc123',
   
},
{
    id: 3,
    email: 'noah@gmail.com',
    password: 'abc123',
},
{
    id: 4,
    email: 'ben@gmail.com',
    password: 'abc123',
    
},
{
    id: 5,
    email: 'sam@gmail..com',
    password: 'whitenoise',
},
{
    id: 6,
    email: 'jackson@gmail.com',
    password: 'abc123',
    
},
{
    id: 7,
    email: 'alex@gmail.com',
    password: 'abc123',
   
},
{
    id: 8,
    email: 'dan@gmail.com',
    password: 'abc123',
},
{
    id: 9,
    email: 'mason@gmail.com',
    password: 'abc123',
    
},
{
    id: 10,
    email: 'chris@gmail..com',
    password: 'abc123',
},
{
    id: 11,
    email: 'nathan@gmail.com',
    password: 'abc123',
    
},
{
    id: 12,
    email: 'owen@gmail.com',
    password: 'abc123',
   
},
{
    id: 13,
    email: 'henry@gmail.com',
    password: 'abc123',
},
{
    id: 14,
    email: 'caleb@gmail.com',
    password: 'abc123',
    
},
{
    id: 15,
    email: 'sebastian@gmail..com',
    password: 'whitenoise',
},
{
    id: 16,
    email: 'emma@gmail.com',
    password: 'abc123',
    
},
{
    id: 17,
    email: 'olivia@gmail.com',
    password: 'abc123',
   
},
{
    id: 18,
    email: 'sophia@gmail.com',
    password: 'abc123',
},
{
    id: 19,
    email: 'ava@gmail.com',
    password: 'abc123',
    
},
{
    id: 20,
    email: 'mia@gmail..com',
    password: 'abc123',
},
{
    id: 21,
    email: 'charlotte@gmail.com',
    password: 'abc123',
    
},
{
    id: 22,
    email: 'amelia@gmail.com',
    password: 'abc123',
   
},
{
    id: 23,
    email: 'harper@gmail.com',
    password: 'abc123',
},
{
    id: 24,
    email: 'evelyn@gmail.com',
    password: 'abc123',
    
},
{
    id: 25,
    email: 'abigail@gmail..com',
    password: 'whitenoise',
},
{
    id: 26,
    email: 'lily@gmail.com',
    password: 'abc123',
    
},
{
    id: 27,
    email: 'zoe@gmail.com',
    password: 'abc123',
   
},
{
    id: 28,
    email: 'emily@gmail.com',
    password: 'abc123',
},
{
    id: 29,
    email: 'grace@gmail.com',
    password: 'abc123',
    
},
{
    id: 30,
    email: 'sofia@gmail..com',
    password: 'abc123',
},

];

//🔥🔥🔥Seed Function🔥🔥🔥
const seedAccounts = () => Account.bulkCreate(accountData);

// 🔥🔥🔥Export🔥🔥🔥
module.exports = seedAccounts;