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
import { AlertCircle, Eye, EyeOff, Loader2, Waves } from 'lucide-react'
import { toast } from 'sonner'
import PageTitle from '@/components/common/PageTitle'

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

    clearError?.()

  }, [location.state, clearError])

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

    const fromPath = location.state?.from?.pathname
    const fallbackPath = result?.user?.role === 'admin' ? '/admin/dashboard' : '/'
    navigate(fromPath || fallbackPath, { replace: true })
  }

  const isButtonDisabled = !email || !password || isLoading

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 py-8 relative">
      <Button
        variant="ghost"
        onClick={() => navigate('/')}
        className="absolute top-4 sm:top-8 left-4 border border-border/50 bg-background/50 backdrop-blur-sm"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4"><path d="m15 18-6-6 6-6"/></svg>
        Back to Home
      </Button>
      <PageTitle title="Login" />
      <Card className="w-full max-w-md mt-6 sm:mt-0">
        <CardHeader className="text-center space-y-3 pb-2">
          <div className="flex justify-center">
            <div className="bg-primary/10 p-3 rounded-full">
              <Waves className="h-7 w-7 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl sm:text-3xl">Welcome back</CardTitle>
          <CardDescription>Login to access your account</CardDescription>
        </CardHeader>

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
                    <EyeOff className="h-5 w-5 sm:h-5 sm:w-5" />
                  ) : (
                    <Eye className="h-5 w-5 sm:h-5 sm:w-5" />
                  )}
                </button>
              </div>
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
                  Logging in...
                </>
              ) : (
                'Login'
              )}
            </Button>

            <p className="text-sm text-muted-foreground text-center">
              Don't have an account?{' '}
              <Link to="/signup" className="font-medium text-primary hover:underline">
                Sign up here
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </main>
  )
}