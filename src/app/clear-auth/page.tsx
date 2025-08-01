'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export default function ClearAuthPage() {
  const router = useRouter();

  useEffect(() => {
    const clearAuth = async () => {
      try {
        // Clear Supabase session
        const supabase = createClient();
        await supabase.auth.signOut();
        
        // Clear all auth-related cookies
        const cookiesToClear = [
          'ventaro-auth',
          'ventaro-store-auth-token',
          'sb-bamqdxclctzwyplecoxt-auth-token',
          'sb-bamqdxclctzwyplecoxt-auth-token.0',
          'sb-bamqdxclctzwyplecoxt-auth-token.1'
        ];
        
        cookiesToClear.forEach(cookieName => {
          // Clear cookie by setting it to expire in the past
          document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=localhost`;
          document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        });
        
        console.log('All authentication cookies cleared');
        
        // Wait a moment then redirect to login
        setTimeout(() => {
          router.push('/login');
        }, 1000);
        
      } catch (error) {
        console.error('Error clearing auth:', error);
        router.push('/login');
      }
    };
    
    clearAuth();
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <p className="text-white text-lg">Clearing authentication data...</p>
        <p className="text-gray-400 text-sm mt-2">You will be redirected to login shortly.</p>
      </div>
    </div>
  );
}