// app/logout/page.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Logout() {
  const router = useRouter();

  useEffect(() => {
    const doLogout = async () => {
      await fetch('/api/logout', {
        method: 'POST',
      });
      router.push('/register'); // Redirect after logout
    };

    doLogout();
  }, [router]);

  return <p>Logging out...</p>;
}
