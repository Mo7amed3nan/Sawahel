import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuthStore } from '@/features/auth/authStore'
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
import { ArrowLeft, Loader2, AlertCircle, Mail, User, LogOut } from 'lucide-react'
import { toast } from 'sonner'

export default function ProfilePage() {
  const navigate = useNavigate()
  const { userId } = useParams()
  const { user, logout, isCheckingAuth } = useAuthStore()
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
  })

  useEffect(() => {
    // If user is not logged in, redirect to login
    if (!isCheckingAuth && !user) {
      toast.error('Please login to view your profile')
      navigate('/login', { state: { from: location } })
    }

    // If user is trying to view someone else's profile, redirect
    if (user && userId && userId !== user._id) {
      toast.error('You can only view your own profile')
      navigate('/')
    }
  }, [user, userId, isCheckingAuth, navigate])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      // TODO: Call zustand store to update user profile
      // await updateUserProfile(formData)
      toast.success('Profile updated successfully!')
      setIsEditing(false)
    } catch (error) {
      toast.error(error?.message || 'Failed to update profile')
    } finally {
      setIsSaving(false)
    }
  }

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      logout()
      toast.success('Logged out successfully')
      navigate('/')
    }
  }

  if (isCheckingAuth) {
    return (
      <div className="flex justify-center items-center min-h-[60vh] bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        {/* Profile Card */}
        <Card>
          <CardHeader className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <CardTitle className="text-2xl sm:text-3xl">My Profile</CardTitle>
                <CardDescription>
                  Manage your account information and settings
                </CardDescription>
              </div>
              <div className="bg-primary/10 p-3 rounded-full">
                <User className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-6 py-6 border-t border-border">
            {/* Account Type Badge */}
            <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Account Type
                </p>
                <p className="text-lg font-semibold text-foreground capitalize">
                  {user?.role || 'User'}
                </p>
              </div>
              {user?.role === 'doctor' && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate('/doctor/manage-info')}
                >
                  Manage Profile
                </Button>
              )}
            </div>

            {/* Personal Information */}
            {isEditing ? (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">
                  Edit Profile
                </h3>

                <div className="space-y-3">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      className="text-base"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      disabled
                      className="text-base text-muted-foreground bg-muted"
                    />
                    <p className="text-xs text-muted-foreground">
                      Email cannot be changed
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">
                  Personal Information
                </h3>

                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div>
                      <p className="text-sm text-muted-foreground">Full Name</p>
                      <p className="text-foreground font-medium">
                        {formData.name || 'Not provided'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-3 flex-1">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <div className="flex-1">
                        <p className="text-sm text-muted-foreground">Email Address</p>
                        <p className="text-foreground font-medium break-all">
                          {formData.email || 'Not provided'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Account Status */}
            <Alert className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
              <AlertCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <AlertDescription className="text-blue-900 dark:text-blue-100">
                Account created on{' '}
                {user?.createdAt
                  ? new Date(user.createdAt).toLocaleDateString()
                  : 'Unknown date'}
              </AlertDescription>
            </Alert>
          </CardContent>

          <CardFooter className="border-t border-border flex flex-col sm:flex-row gap-3 mt-4">
            {isEditing ? (
              <>
                <Button
                  onClick={() => {
                    setFormData({
                      name: user?.name || '',
                      email: user?.email || '',
                    })
                    setIsEditing(false)
                  }}
                  variant="outline"
                  className="flex-1 mt-4"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="flex-1"
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    'Save Changes'
                  )}
                </Button>
              </>
            ) : (
              <>
                <Button
                  onClick={() => setIsEditing(true)}
                  variant="outline"
                  className="flex-1 mt-4"
                >
                  Edit Profile
                </Button>
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  className="flex-1 text-destructive hover:text-destructive"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
