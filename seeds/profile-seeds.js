const { profile } = require('../models');

// Review foreign key relationship
const profileData = [
    {
        first_name: 'Toni',
        last_name: 'Morrison',
        age: 37,
        gender: 'female',
        pronoun: 'she/her',
        location: 'New York',
        green_flag: 'this is a green flag statement',
        yellow_flag: 'this is a yellow flag statement',
        red_flag: 'this is a red flag statement',
        id: 1,
        foreign_key: 1,
    },
    {
        first_name: 'William',
        last_name: 'Faulkner',
        age: 31,
        gender: 'male',
        pronoun: 'he/him',
        location: 'Yoknapatawpha County',
        green_flag: 'this is a green flag statement',
        yellow_flag: 'this is a yellow flag statement',
        red_flag: 'this is a red flag statement',
        id: 2,
        foreign_key: 2,
    },
    {
        first_name: 'Hillary',
        last_name: 'Mantel',
        age: 28,
        gender: 'female',
        pronoun: 'she/her',
        location: 'Tower of London',
        green_flag: 'this is a green flag statement',
        yellow_flag: 'this is a yellow flag statement',
        red_flag: 'this is a red flag statement',
        id: 3,
        foreign_key: 3,
    },
    {
        first_name: 'Donna',
        last_name: 'Tartt',
        age: 41,
        gender: 'female',
        pronoun: 'she/her',
        location: 'New York',
        green_flag: 'this is a green flag statement',
        yellow_flag: 'this is a yellow flag statement',
        red_flag: 'this is a red flag statement',
        id: 4,
        foreign_key: 4,
    },
    {
        first_name: 'Don',
        last_name: 'Delillo',
        age: 35,
        gender: 'male',
        pronoun: 'he/him',
        location: 'New York',
        green_flag: 'this is a green flag statement',
        yellow_flag: 'this is a yellow flag statement',
        red_flag: 'this is a red flag statement',
        id: 5,
        foreign_key: 5,
    },
]

//🔥🔥🔥Seed Function🔥🔥🔥
const seedProfiles = () => profile.bulkCreate(profileData);

// 🔥🔥🔥Export🔥🔥🔥
module.export = seedProfiles;