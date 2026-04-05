import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { verifyToken } from '@/lib/auth';
import LogoutButton from './LogoutButton';

export default async function HomePage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  const payload = token ? verifyToken(token) : null;

  if (!payload) {
    redirect('/login');
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-bold text-gray-900">Welcome to Hello World!!</h1>
        <p className="text-gray-600 text-lg">{payload.email}</p>
        <p className="text-sm text-gray-400 font-mono">ID: {payload.userId}</p>
        <LogoutButton />
      </div>
    </main>
  );
}
