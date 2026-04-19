import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { InputOTP } from '@/components/ui/input-otp';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useAuthStore } from '@/features/auth/authStore';

export default function VerifyEmailPage() {
  const navigate = useNavigate();
  const otpLength = 6;
  const [verificationCode, setVerificationCode] = useState('');

  const { verifyEmail, error, isLoading } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await verifyEmail(verificationCode);
    if (!result?.success) {
      toast.error(result?.error || error || 'Email verification failed');
      return;
    }

    toast.success('Email verified successfully');
    navigate('/');
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Verify Your Email</CardTitle>
          <CardDescription>
            Enter the verification code sent to your email.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="verificationCode">Verification Code</Label>
              <InputOTP
                id="verificationCode"
                value={verificationCode}
                onChange={setVerificationCode}
                length={otpLength}
                className="flex gap-3 justify-center"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              className="w-full"
              disabled={verificationCode.length !== otpLength || isLoading}
            >
              {isLoading ? 'Verifying...' : 'Verify Email'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </main>
  );
}
