'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import { supabase } from '@/utils/supabase/client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAuthToast } from '@/utils/helpers';
import { ArrowLeft } from 'lucide-react';

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="text-center py-20">Loading...</div>}>
      <ResetPasswordContent />
    </Suspense>
  );
}

function ResetPasswordContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { error: showError, success: showSuccess } = useAuthToast();

  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [directing, setDirecting] = useState(false);

  useEffect(() => {
    const access_token = searchParams.get('access_token');
    const type = searchParams.get('type');

    if (access_token && type === 'recovery') {
      supabase.auth.setSession({
        access_token,
        refresh_token: '',
      });
    }
  }, [searchParams]);

  const handleUpdatePassword = async () => {
    if (!newPassword) {
      return showError('Please enter a new password.');
    }

    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    setLoading(false);

    if (error) return showError(error.message);

    showSuccess('Password updated. Redirecting to login...');
    setTimeout(() => router.push('/login'), 2000);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4">
      <button
        onClick={() => {
          setDirecting(true);
          router.push("/login");
        }}
        disabled={directing}
        className="absolute top-8 left-10 flex items-center gap-1 text-base sm:text-lg text-foreground transition-all hover:cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {directing ? <><p className='hidden sm:block'>Redirecting...</p></> : <><ArrowLeft className="size-4 sm:size-5" /><p className='hidden sm:block'>Back</p></>}
      </button>
      <div className="max-w-md w-full space-y-4">
        <h1 className="text-xl font-semibold text-center">Reset Your Password</h1>
        <Input
          type="password"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <Button className="w-full" onClick={handleUpdatePassword} disabled={loading}>
          {loading ? 'Updating...' : 'Update Password'}
        </Button>
      </div>
    </main>
  );
}
