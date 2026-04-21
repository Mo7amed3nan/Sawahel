import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useAuthStore } from '@/features/auth/authStore'
import { AlertCircle, Loader2, Mail, RotateCcw } from 'lucide-react'

export default function VerifyEmailPage() {
  const navigate = useNavigate()
  const OTP_LENGTH = 6
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(''))
  const [isSubmitting, setIsSubmitting] = useState(false)
  const inputRefs = useRef([])

  const { verifyEmail, error, isLoading, clearError } = useAuthStore()

  useEffect(() => {
    // Focus first input on mount
    inputRefs.current[0]?.focus()
  }, [])

  const handleChange = (index, value) => {
    if (!/^\d?$/.test(value)) return

    const newOtp = [...otp]
    newOtp[index] = value

    setOtp(newOtp)
    clearError?.()

    // Auto focus next input
    if (value && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus()
    } else if (e.key === 'ArrowRight' && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handlePaste = (e) => {
    e.preventDefault()
    const pastedText = e.clipboardData.getData('text').replace(/\D/g, '')
    const pastedArray = pastedText.slice(0, OTP_LENGTH).split('')

    const newOtp = [...otp]
    pastedArray.forEach((char, idx) => {
      if (idx < OTP_LENGTH) {
        newOtp[idx] = char
      }
    })

    setOtp(newOtp)

    // Focus the last filled input or first empty one
    const lastFilledIndex = newOtp.findIndex((val) => !val)
    const focusIndex = lastFilledIndex === -1 ? OTP_LENGTH - 1 : lastFilledIndex
    inputRefs.current[focusIndex]?.focus()

    clearError?.()
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const code = otp.join('')
    if (code.length !== OTP_LENGTH) {
      toast.error('Please enter all 6 digits')
      return
    }

    setIsSubmitting(true)
    try {
      const result = await verifyEmail(code)
      if (!result?.success) {
        toast.error(result?.error || error || 'Verification failed')
        return
      }
      toast.success('Email verified! Welcome to Sawahel 🎉')
      navigate('/', { replace: true })
    } finally {
      setIsSubmitting(false)
    }
  }

  const isComplete = otp.every((digit) => digit !== '')

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 py-8">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-3">
          <div className="flex justify-center mb-2">
            <div className="bg-primary/10 p-3 rounded-full">
              <Mail className="h-7 w-7 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl">Check your email</CardTitle>
          <CardDescription className="text-base">
            We sent a 6-digit verification code to your email. It expires in 24 hours.
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            {error && (
              <div className="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg p-3 flex gap-3">
                <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400 mt-0.5 shrink-0" />
                <p className="text-sm text-red-700 dark:text-red-200">{error}</p>
              </div>
            )}

            <div className="space-y-3">
              <Label htmlFor="otp-0" className="text-center block">
                Verification Code
              </Label>

              {/* OTP Input Grid */}
              <div className="flex justify-center gap-2 sm:gap-3">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => {
                      inputRefs.current[index] = el
                    }}
                    id={`otp-${index}`}
                    type="text"
                    inputMode="numeric"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={handlePaste}
                    autoComplete="one-time-code"
                    className="h-12 w-12 sm:h-14 sm:w-14 text-center text-2xl font-bold rounded-lg border-2 border-border bg-background text-foreground focus:border-primary focus:outline-none transition-colors"
                    aria-label={`Digit ${index + 1}`}
                    disabled={isSubmitting || isLoading}
                  />
                ))}
              </div>

              <p className="text-xs text-muted-foreground text-center">
                {otp.filter((d) => d).length}/{OTP_LENGTH} digits entered
              </p>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-4">
            <Button
              type="submit"
              className="w-full text-base"
              disabled={!isComplete || isSubmitting || isLoading}
              size="lg"
            >
              {isLoading || isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Verifying...
                </>
              ) : (
                'Verify Email'
              )}
            </Button>

            <div className="space-y-2 text-center text-sm">
              <p className="text-muted-foreground">
                Didn't receive the code? Check your spam folder
              </p>
              <button
                type="button"
                onClick={() => {
                  setOtp(Array(OTP_LENGTH).fill(''))
                  inputRefs.current[0]?.focus()
                  clearError?.()
                }}
                className="text-primary hover:underline font-medium inline-flex items-center gap-1"
              >
                <RotateCcw className="h-3 w-3" />
                Clear and try again
              </button>
            </div>

            <button
              type="button"
              onClick={() => navigate('/signup')}
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Don&apos;t have the code? Back to sign up
            </button>
          </CardFooter>
        </form>
      </Card>
    </main>
  )
}
