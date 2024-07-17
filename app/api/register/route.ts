import { PrismaClient } from '@prisma/client';
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

export async function POST(req: Request) {
    const {email, password, password2} = await req.json();
    if (!email || !password || !password2)
        return Response.json({message: 'Missing required fields'}, {status: 400});
    if (password !== password2)
        return Response.json({message: 'Confirm Password do not match'}, {status: 400});
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        await prisma.user.create({
            data: {
                email: email,
                password: hashedPassword
            }
        });
        return Response.json({'message': 'Account successfully created.'});
    } catch {
        return Response.json({'message': 'Something goes wrong'}, {status: 400});
    }
}
