import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
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
import { AlertCircle, Eye, EyeOff, Loader2 } from 'lucide-react'
import { toast } from 'sonner'

export default function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const { login, error, isLoading, clearError } = useAuthStore()

  // Check if user was redirected due to session expiration
  useEffect(() => {
    const sessionExpired = location.state?.sessionExpired
    if (sessionExpired) {
      toast.error('Session expired. Please login again.')
    }
  }, [location.state])

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
    clearError?.()
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
    clearError?.()
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    clearError?.()

    if (!email || !password) {
      toast.error('Please enter email and password')
      return
    }

    const result = await login(email, password)
    if (!result?.success) {
      // Check if it's an authorization error (401/403)
      if (result?.statusCode === 401 || result?.statusCode === 403) {
        toast.error('Invalid email or password')
      } else if (result?.statusCode === 0) {
        toast.error('Connection error. Please check your internet connection.')
      } else {
        toast.error(result?.error || error || 'Login failed')
      }
      return
    }

    toast.success('Login successful!')

    // Redirect to intended page or dashboard
    const fromPath = location.state?.from?.pathname
    const fallbackPath = result?.user?.role === 'admin' ? '/admin/dashboard' : '/'
    navigate(fromPath || fallbackPath, { replace: true })
  }

  const isButtonDisabled = !email || !password || isLoading

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 py-8">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-3xl">Welcome back</CardTitle>
          <CardDescription>Login to access your account</CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
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
                className="text-base"
              />
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  to="/forgot-password"
                  className="text-xs text-primary hover:underline font-medium"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                  autoComplete="current-password"
                  disabled={isLoading}
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
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-4">
            <Button
              type="submit"
              className="w-full text-base"
              disabled={isButtonDisabled}
              size="lg"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Logging in...
                </>
              ) : (
                'Login'
              )}
            </Button>

            <div className="text-sm text-muted-foreground text-center space-y-2">
              <p>
                Don't have an account?{' '}
                <Link to="/signup" className="font-medium text-primary hover:underline">
                  Sign up here
                </Link>
              </p>
            </div>
          </CardFooter>
        </form>
      </Card>
    </main>
  )
}
   