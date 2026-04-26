import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { useAuthStore } from '@/features/auth/authStore'
import { AlertCircle, Loader2, KeyRound } from 'lucide-react'
import { toast } from 'sonner'
import PageTitle from '@/components/common/PageTitle'

export default function ForgotPasswordPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const [email, setEmail] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)

  const { forgotPassword, error, isLoading, clearError } = useAuthStore()

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
    clearError?.()
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    clearError?.()

    if (!email) {
      toast.error('Please enter your email')
      return
    }

    const result = await forgotPassword(email)
    if (!result?.success) {
      toast.error(result?.error || error || 'Failed to send reset email')
      return
    }

    setIsSuccess(true)
    toast.success('Reset link sent to your email!')
  }

  const isButtonDisabled = !email || isLoading

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 py-8 relative">
      <Button
        variant="ghost"
        onClick={() => navigate('/login')}
        className="absolute top-4 sm:top-8 left-4 border border-border/50 bg-background/50 backdrop-blur-sm"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4"><path d="m15 18-6-6 6-6"/></svg>
        Back to Login
      </Button>
      <PageTitle title="Forgot Password" />
      <Card className="w-full max-w-md mt-6 sm:mt-0">
        <CardHeader className="text-center space-y-3 pb-2">
          <div className="flex justify-center">
            <div className="bg-primary/10 p-3 rounded-full">
              <KeyRound className="h-7 w-7 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl sm:text-3xl">Forgot Password</CardTitle>
          <CardDescription>
            {isSuccess 
              ? "Check your email for a reset link"
              : "Enter your email to reset your password"
            }
          </CardDescription>
        </CardHeader>

        {!isSuccess ? (
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-5 pt-4">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-5 w-5" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {/* Email Input */}
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="ahmed@example.com"
                  value={email}
                  onChange={handleEmailChange}
                  required
                  autoComplete="email"
                  disabled={isLoading}
                  className="text-base h-11 sm:h-10"
                />
              </div>
            </CardContent>

            <CardFooter className="flex flex-col gap-4 pt-2">
              <Button
                type="submit"
                className="w-full text-base h-12 sm:h-11"
                disabled={isButtonDisabled}
                size="lg"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Sending link...
                  </>
                ) : (
                  'Send Reset Link'
                )}
              </Button>
            </CardFooter>
          </form>
        ) : (
          <CardFooter className="flex flex-col gap-4 pt-4">
            <Button
              type="button"
              onClick={() => navigate('/login')}
              className="w-full text-base h-12 sm:h-11"
              variant="outline"
              size="lg"
            >
              Return to Login
            </Button>
            <p className="text-sm text-muted-foreground text-center mt-2">
              Didn't receive the email?{' '}
              <button 
                type="button"
                onClick={() => setIsSuccess(false)} 
                className="font-medium text-primary hover:underline"
              >
                Try again
              </button>
            </p>
          </CardFooter>
        )}
      </Card>
    </main>
  )
}
