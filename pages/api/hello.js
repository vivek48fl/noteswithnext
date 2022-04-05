// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
    const client = await clientPromise;

    // connect to database
    const db = await client.db('test');

    // check for existing user
    const user = await db.collection('users').findOne({
        email: "demo@gmail.com",
    });

    res.json({ "data": user.email})
}
