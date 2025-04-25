import createError from "http-errors";

const users = [
    {
        id: 1,
        first_name: "Alice",
        last_name: "Dupont",
        birth_date: "1990-05-15",
        email: "alice.dupont@example.com",
        password: "securepassword1",
        picture: "path/to/picture1.jpg",
        balance: 100.50,
        role: "admin",
        created_at: "2022-01-10",
        updated_at: "2023-06-20",
        deleted_at: null
    },
    {
        id: 2,
        first_name: "Bob",
        last_name: "Martin",
        birth_date: "1985-08-22",
        email: "bob.martin@example.com",
        password: "securepassword2",
        picture: "path/to/picture2.jpg",
        balance: 250.00,
        role: "user",
        created_at: "2021-03-15",
        updated_at: "2023-07-10",
        deleted_at: null
    },
    {
        id: 3,
        first_name: "Charlie",
        last_name: "Garnier",
        birth_date: "1992-11-30",
        email: "charlie.garnier@example.com",
        password: "securepassword3",
        picture: "path/to/picture3.jpg",
        balance: 50.75,
        role: "user",
        created_at: "2020-05-20",
        updated_at: "2023-08-05",
        deleted_at: null
    },
    {
        id: 4,
        first_name: "Diane",
        last_name: "Rousseau",
        birth_date: "1988-03-05",
        email: "diane.rousseau@example.com",
        password: "securepassword4",
        picture: "path/to/picture4.jpg",
        balance: 300.25,
        role: "admin",
        created_at: "2019-07-12",
        updated_at: "2023-09-22",
        deleted_at: null
    },
    {
        id: 5,
        first_name: "Eva",
        last_name: "Lefebvre",
        birth_date: "1995-07-18",
        email: "eva.lefebvre@example.com",
        password: "securepassword5",
        picture: "path/to/picture5.jpg",
        balance: 120.00,
        role: "user",
        created_at: "2018-11-30",
        updated_at: "2023-10-15",
        deleted_at: null
    },
    {
        id: 6,
        first_name: "Frank",
        last_name: "Morel",
        birth_date: "1980-12-01",
        email: "frank.morel@example.com",
        password: "securepassword6",
        picture: "path/to/picture6.jpg",
        balance: 400.00,
        role: "admin",
        created_at: "2017-02-25",
        updated_at: "2023-11-10",
        deleted_at: null
    },
    {
        id: 7,
        first_name: "Grace",
        last_name: "Durand",
        birth_date: "1993-04-10",
        email: "grace.durand@example.com",
        password: "securepassword7",
        picture: "path/to/picture7.jpg",
        balance: 200.50,
        role: "user",
        created_at: "2016-06-05",
        updated_at: "2023-12-01",
        deleted_at: null
    },
    {
        id: 8,
        first_name: "Hugo",
        last_name: "Lambert",
        birth_date: "1987-09-28",
        email: "hugo.lambert@example.com",
        password: "securepassword8",
        picture: "path/to/picture8.jpg",
        balance: 350.75,
        role: "user",
        created_at: "2015-08-18",
        updated_at: "2024-01-05",
        deleted_at: null
    },
    {
        id: 9,
        first_name: "Ines",
        last_name: "Renaud",
        birth_date: "1991-02-14",
        email: "ines.renaud@example.com",
        password: "securepassword9",
        picture: "path/to/picture9.jpg",
        balance: 180.00,
        role: "admin",
        created_at: "2014-04-22",
        updated_at: "2024-02-10",
        deleted_at: null
    },
    {
        id: 10,
        first_name: "Jack",
        last_name: "Girard",
        birth_date: "1984-11-07",
        email: "jack.girard@example.com",
        password: "securepassword10",
        picture: "path/to/picture10.jpg",
        balance: 220.00,
        role: "user",
        created_at: "2013-09-30",
        updated_at: "2024-03-20",
        deleted_at: null
    }
];


export const create = (user) => {
    users.push(user)
}

export const getAll = () => {
    return users
}

export const getById = (id) => {
    const user =  users.find(user => user.id === Number(id))

    if (user === undefined) {
        throw createError(404, 'The user doesn\'t exist')
    }

    return user
}

export const update = (id, user) => {
    const updatedUser = users.find(user => user.id === Number(id))

    if (updatedUser === undefined) {
        throw createError(404, 'The user doesn\'t exist')
    }

    if (user.firstName !== undefined && user.firstName !== '') {
        updatedUser.first_name = user.firstName;
    }
    if (user.lastName !== undefined && user.lastName !== '') {
        updatedUser.last_name = user.lastName;
    }
    if (user.birthDate !== undefined && user.birthDate !== '') {
        updatedUser.birth_date = user.birthDate;
    }
    if (user.email !== undefined && user.email !== '') {
        updatedUser.email = user.email;
    }
    if (user.password !== undefined && user.password !== '') {
        updatedUser.password = user.password;
    }
    if (user.picture !== undefined && user.picture !== '') {
        updatedUser.picture = user.picture;
    }
    if (user.balance !== undefined && !isNaN(user.balance)) {
        updatedUser.balance = Number(user.balance);
    }

    updatedUser.updated_at = new Date().toISOString().split('T')[0];

    return updatedUser
}

export const remove = (id) => {
    const userToDelete = users.find(user => user.id === Number(id));

    if (userToDelete === undefined) {
        throw createError(404, 'The user doesn\'t exist')
    }

    userToDelete.deleted_at = new Date().toISOString().split('T')[0];

    return userToDelete
}