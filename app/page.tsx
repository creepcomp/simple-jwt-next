import { PrismaClient } from '@prisma/client';
import { Metadata } from 'next';
import { cookies } from 'next/headers';
import Link from 'next/link';
import Logout from './components/Logout';
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();

export const metadata: Metadata = {
  title: 'Simple JWT Authentication',
  description: 'Simple JWT Authentication written with NextJS & Prisma',
};

const Home = async () => {
  var user: any;
  const cookieStore = cookies();
  const session = cookieStore.get('session');
  if (session) {
    const data = jwt.verify(session.value, process.env['JWT_SECRET']);
    user = await prisma.user.findUnique({
      where: {
        email: data.username
      }
    });
  }

  return (
    <main className='flex justify-center items-center h-screen'>
      {user ? (
        <div className='text-center'>
          <table className='table'>
            <tbody>
              <tr>
                <td>Email:</td>
                <td>{user.email}</td>
              </tr>
              <tr>
                <td>Password:</td>
                <td>{user.password}</td>
              </tr>
            </tbody>
          </table>
          <Logout />
        </div>
      ): (
        <>
          <Link className='btn btn-primary m-1' href='/login'>Login</Link>
          <Link className='btn btn-secondary m-1' href='/register'>Register</Link>
        </>
      )}
    </main>
  );
};

export default Home;
