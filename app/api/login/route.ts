import { PrismaClient } from '@prisma/client';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();

export async function POST(req: Request) {
    const {email, password} = await req.json();
    if (!email || !password)
        return Response.json({message: 'Missing required fields'}, {status: 400});
    const user = await prisma.user.findUnique({where: {email: email}});
    if (user) {
        if (await bcrypt.compare(password, user.password)) {
            const session = jwt.sign({username: user.email}, process.env['JWT_SECRET']);
            const response = Response.json({message: 'You have successfully logged in.'});
            response.headers.set('Set-Cookie', `session=${session}; path=/`);
            return response;
        } else return Response.json({message: 'Invalid password'}, {status: 400});
    } else return Response.json({message: 'User not found'}, {status: 400});
}
