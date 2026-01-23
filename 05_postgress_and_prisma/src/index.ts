import { Client } from 'pg'

const pgClient = new Client("postgresql://postgres:mysecretpassword@localhost:5432/postgres?sslmode=disable")


async function main() {
    await pgClient.connect()

    const response = await pgClient.query('SELECT * FROM users;')
    const response2 = await pgClient.query('SELECT * FROM posts;')

    const response3 = await pgClient.query('SELECT email, title FROM users JOIN posts ON users.id = posts.user_id')

    const response4 = await pgClient.query(`
        INSERT INTO posts (user_id, title)
        VALUES ($1, $2)
        RETURNING id, user_id, title, created_at
    `, ['1', 'third post of first user'])

    // console.log(response.rows)
    // console.log(response2.rows)
    // console.log(response3.rows)
    // console.log(response4.rows)
}

// main()

// USING PRISMA

import dotenv from 'dotenv'
dotenv.config()
import { PrismaClient } from './generated/prisma/client.js'
import { PrismaPg } from '@prisma/adapter-pg'
import express from 'express'

const connectionString = process.env.DATABASE_URL

if (!connectionString) throw new Error("DATABASE_URL is not defined")

const adapter = new PrismaPg({ connectionString })
const client = new PrismaClient({ adapter })

async function orm() {
    // const response = await client.user.create({
    //     data: {
    //         name: 'shobha',
    //         email: 'shobha@gmail.com',
    //     }
    // })

    // console.log(response)

    const users = await client.user.findMany()

    console.log(users)

    const firstUser = users[0]

    if(firstUser) {
        await client.chat.create({
            data: {
                title: 'chat-1-user-1',
                user_id: firstUser.id
            }
        })
    }
}

// orm()

// CREATING A SIMPLE EXPRESS APPLICATION ALONG WITH PRISMA

const app  = express()
app.use(express.json())

app.get('/users', async (req, res, next) => {
    const users = await client.user.findMany()

    res.json({
        success: true,
        users
    })
})

// getting user with specific id
app.get('/user/:id', async (req, res, next) => {
    const userId = req.params.id

    try {
        const user = await client.user.findUnique({
            where: {
                id: Number(userId)
            }
        })

        if(!user) {
            return res.json({
                success: false,
                error: "user not found"
            })
        }

        res.json({
            success: true,
            user
        })
    } catch (error) {
        res.json({
            success: false,
            error: error
        })
    }
})

app.post('/create-user', async (req, res, next) => {
    const name = req.body.name
    const email = req.body.email

    if(!name || !email) {
        return res.json({
            success: false,
            error: 'cannot find name or email'
        })
    }

    const userCreation = await client.user.create({
        data: {
            name: name,
            email: email
        }
    })

    console.log('created user : ', userCreation)

    if(!userCreation) {
        return res.json({
            success: false,
            error: 'failed to create user'
        })
    }

    res.json({
        success: true,
        message: `succesfully created user with ${userCreation.name}`
    })

})

app.post('/create-chat/:id', async (req, res, next) => {

    const userId = req.params.id

    const userInfo = await client.user.findUnique({
        where: {
            id: Number(userId)
        }
    })

    if(!userInfo) {
        return res.json({
            success: false,
            error: `no user found with id ${userId}`
        })
    }

    const title = req.body.title

    if(!title) {
        return res.json({
            success: false,
            error: 'cannot find title'
        })
    }

    const chatCreation = await client.chat.create({
        data: {
            title: title,
            user: {
                connect: {id: Number(userId)}
            }
        }
    })

    if(!chatCreation) {
        return res.json({
            success: false,
            error: 'failed to create chat'
        })
    }

    res.json({
        success: true,
        message: `succesfully created chat with ${chatCreation.title}`
    })
})


app.get('/user-with-chats/:id', async (req, res, next) => {
    const userId = req.params.id

    const userWithChats = await client.user.findUnique({
        where: {
            id: Number(userId),
        },
        include: {
            chats: true,
        },
        omit: {
            name: true,
            id: true,
            created_at: true
        }
    })

    if(!userWithChats) {
        return res.json({
            success: false,
            error: `no user with id ${userId}`
        })
    }

    res.json({
        success: true,
        userWithChats
    })
})

app.listen(3000, () => {
    console.log('app is listening on port 3000')
})