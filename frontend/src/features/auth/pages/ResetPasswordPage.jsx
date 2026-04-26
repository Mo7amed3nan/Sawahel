import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
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
import { AlertCircle, Eye, EyeOff, Loader2, ShieldCheck, CheckCircle2 } from 'lucide-react'
import { toast } from 'sonner'
import PageTitle from '@/components/common/PageTitle'

export default function ResetPasswordPage() {
  const navigate = useNavigate()
  const { token } = useParams()
  
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  
  const { resetPassword, error, isLoading, clearError } = useAuthStore()

  const isPasswordValid = password.length >= 6
  const isConfirmPasswordMatch = password === confirmPassword

  const handleSubmit = async (e) => {
    e.preventDefault()
    clearError?.()

    if (!password || !confirmPassword) {
      toast.error('Please fill in both password fields')
      return
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match')
      return
    }

    const result = await resetPassword(token, password)
    
    if (!result?.success) {
      toast.error(result?.error || error || 'Failed to reset password')
      return
    }

    toast.success('Password reset successfully! You can now log in.')
    navigate('/login')
  }

  const isButtonDisabled = !password || !confirmPassword || isLoading

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 py-8 relative">
      <PageTitle title="Reset Password" />
      <Card className="w-full max-w-md mt-6 sm:mt-0">
        <CardHeader className="text-center space-y-3 pb-2">
          <div className="flex justify-center">
            <div className="bg-primary/10 p-3 rounded-full">
              <ShieldCheck className="h-7 w-7 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl sm:text-3xl">Reset Password</CardTitle>
          <CardDescription>Enter your new password below</CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-5 pt-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-5 w-5" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Password Input */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="At least 6 characters"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    clearError?.();
                  }}
                  required
                  minLength={6}
                  disabled={isLoading}
                  autoComplete="new-password"
                  className="pr-12 text-base h-11 sm:h-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              <p className="text-xs text-muted-foreground">
                {isPasswordValid ? (
                  <span className="text-success flex items-center gap-1">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    Good password
                  </span>
                ) : (
                  <span className="text-warning">
                    Minimum 6 characters
                  </span>
                )}
              </p>
            </div>

            {/* Confirm Password Input */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Re-enter your password"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    clearError?.();
                  }}
                  required
                  disabled={isLoading}
                  className="pr-12 text-base h-11 sm:h-10"
                  aria-describedby="confirm-password-feedback"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((p) => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1"
                  aria-label={
                    showConfirmPassword
                      ? 'Hide confirm password'
                      : 'Show confirm password'
                  }
                  tabIndex={-1}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              <p id="confirm-password-feedback" className="text-xs">
                {confirmPassword.length === 0 ? (
                  <span className="text-muted-foreground">
                    Enter confirm password
                  </span>
                ) : isConfirmPasswordMatch ? (
                  <span className="text-success flex items-center gap-1">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    Passwords match
                  </span>
                ) : (
                  <span className="text-destructive">
                    Passwords do not match
                  </span>
                )}
              </p>
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
                  Resetting...
                </>
              ) : (
                'Reset Password'
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </main>
  )
}
