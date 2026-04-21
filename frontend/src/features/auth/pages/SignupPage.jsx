import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
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
import { AlertCircle, Eye, EyeOff, Loader2, CheckCircle2 } from 'lucide-react'
import { toast } from 'sonner'

export default function SignupPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [confirmPassword, setConfirmPassword] = useState('')
  const navigate = useNavigate()

  const { signup, error, isLoading, clearError } = useAuthStore()

  const isPasswordValid = password.length >= 6
  const isConfirmPasswordMatch = confirmPassword.length > 0 && confirmPassword === password
  const canSubmit = name && email && isPasswordValid && isConfirmPasswordMatch && !isLoading

  const handleSubmit = async (e) => {
    e.preventDefault()
    clearError?.()

    if (!isPasswordValid) {
      toast.error('Password must be at least 6 characters')
      return
    }

    if (!isConfirmPasswordMatch) {
      toast.error('Passwords do not match')
      return
    }

    const result = await signup(name, email, password)
    if (!result?.success) {
      toast.error(result?.error || error || 'Signup failed')
      return
    }

    toast.success('Account created! Check your email to verify.')
    navigate('/verify-email')
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 py-8">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl">Create account</CardTitle>
          <CardDescription>Join Sawahel to access all services</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Name Input */}
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Ahmed Ali"
                value={name}
                onChange={(e) => {
                  setName(e.target.value)
                  clearError?.()
                }}
                required
                disabled={isLoading}
                autoComplete="name"
                className="text-base"
              />
            </div>

            {/* Email Input */}
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="ahmed@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  clearError?.()
                }}
                required
                disabled={isLoading}
                autoComplete="email"
                className="text-base"
              />
            </div>

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
                    setPassword(e.target.value)
                    clearError?.()
                  }}
                  required
                  minLength={6}
                  disabled={isLoading}
                  autoComplete="new-password"
                  className="pr-10 text-base"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              <p className="text-xs text-muted-foreground">
                {isPasswordValid ? (
                  <span className="text-green-600 dark:text-green-400 flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3" />
                    Good password
                  </span>
                ) : (
                  <span className="text-yellow-600 dark:text-yellow-400">
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
                    setConfirmPassword(e.target.value)
                    clearError?.()
                  }}
                  required
                  disabled={isLoading}
                  className="pr-10 text-base"
                  aria-describedby="confirm-password-feedback"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((p) => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={
                    showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'
                  }
                  tabIndex={-1}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              <p
                id="confirm-password-feedback"
                className="text-xs"
              >
                {confirmPassword.length === 0 ? (
                  <span className="text-muted-foreground">Enter confirm password</span>
                ) : isConfirmPasswordMatch ? (
                  <span className="text-green-600 dark:text-green-400 flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3" />
                    Passwords match
                  </span>
                ) : (
                  <span className="text-red-600 dark:text-red-400">
                    Passwords do not match
                  </span>
                )}
              </p>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-4">
            <Button
              type="submit"
              className="w-full text-base"
              disabled={!canSubmit}
              size="lg"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating account...
                </>
              ) : (
                'Create Account'
              )}
            </Button>
            <p className="text-sm text-muted-foreground text-center">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-primary hover:underline">
                Login here
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </main>
  )
}
