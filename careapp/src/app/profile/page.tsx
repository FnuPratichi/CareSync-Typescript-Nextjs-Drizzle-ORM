'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

// Define user type
interface User {
  id: number;
  username: string;
  email: string;
  age?: number;
  roleid: number;
  createdAt: string;
}

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch('/api/profile', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include', // Send cookies
        });

        if (res.status === 401) {
          // Unauthorized: redirect to login
          router.push('/login');
          return;
        }

        if (!res.ok) {
          throw new Error('Failed to fetch profile');
        }

        const result = await res.json();
        setUser(result.data);
      } catch (err) {
        console.error("Error fetching profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [router]);

  if (loading) return <p className="p-4">Loading profile...</p>;
  if (!user) return <p className="p-4 text-red-600">Unable to load user info.</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-2">👤 Profile Info</h1>
      <p><strong>ID:</strong> {user.id}</p>
      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Age:</strong> {user.age ?? 'N/A'}</p>
      <p><strong>Role ID:</strong> {user.roleid}</p>
      <p><strong>Created At:</strong> {new Date(user.createdAt).toLocaleString()}</p>
    </div>
  );
}
