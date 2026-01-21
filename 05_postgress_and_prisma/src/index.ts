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

main()