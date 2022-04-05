import NextAuth from "next-auth/next";
import Credentials from 'next-auth/providers/credentials';

import clientPromise from "./../../../lib/mongodb";

export default NextAuth({
    session: {
        jwt: true,
    },
    secret: process.env.SECRET,
    providers: [
        Credentials({
            // credentials: {
                // use if you want to use NextAuth Login Page
            // },
            async authorize(credentials){

                // NOTE: ensure client is connected
                const client = await clientPromise;

                // connect to database
                const db = await client.db('test');

                // check for existing user
                const user = await db.collection('users').findOne({
                    email: credentials.email,
                });

                if(!user){
                    // client.close();
                    throw new Error("No user found!");
                }

                // check for correct password
                const validPassword = await verifyPassword(credentials.password, user.password);

                if(!validPassword){
                    // client.close();
                    throw new Error('Incorrect Password!');
                }

                let response = {
                    email : user.email,
                    // return other things here
                    queryDb: user.queryDb,
                    instituteId: user.instituteId.toString(),
                    role: user.role,
                }

                return response;

            }
        })
    ],
    callbacks: {
        jwt: async ({ token, user }) => {
            user && (token.user = user)
            return token
        },
        session: async ({ session, token }) => {
            session.user = token.user
            return session
        }
    }

});