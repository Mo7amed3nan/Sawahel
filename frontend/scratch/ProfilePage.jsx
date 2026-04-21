import { useState, useRef } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import { useAuthStore } from '@/stores/authStore'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import {
  Mail,
  Shield,
  Stethoscope,
  User,
  Upload,
  LogOut,
  ArrowLeft,
  Edit2,
  Save,
  X,
  AlertCircle,
  Loader2,
} from 'lucide-react'
import toast from 'react-hot-toast'

export default function EnhancedProfilePage() {
  const router = useRouter()
  const { user, isAuthenticated, logout, updateUserInfo, updateProfileImage } = useAuthStore()

  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isUploadingImage, setIsUploadingImage] = useState(false)
  const fileInputRef = useRef(null)

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    bio: user?.bio || '',
    specialty: user?.specialty || '',
    clinicAddress: user?.clinicAddress || '',
  })

  if (!isAuthenticated) {
    return (
      <div className="min-h-[70vh] bg-background flex items-center justify-center px-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center">Sign in required</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-center">
            <p className="text-muted-foreground">Please log in to view your profile.</p>
            <Button onClick={() => router.push('/login')} className="w-full">
              Go to Login
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const handleImageChange = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image must be less than 5MB')
      return
    }

    // Validate file type
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      toast.error('Only JPEG, PNG, and WebP files are allowed')
      return
    }

    try {
      setIsUploadingImage(true)

      // TODO: Implement image upload to server/cloud storage
      // Example: const response = await uploadProfileImage(file)
      // For now, create a local preview
      const reader = new FileReader()
      reader.onload = (e) => {
        const imageUrl = e.target?.result
        updateProfileImage(imageUrl)
        toast.success('Profile image updated!')
      }
      reader.readAsDataURL(file)
    } catch (error) {
      console.error('Image upload error:', error)
      toast.error('Failed to upload image')
    } finally {
      setIsUploadingImage(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSaveChanges = async () => {
    try {
      setIsSaving(true)

      // TODO: Implement API call to save profile changes
      // Example: await updateProfile(formData)
      // For now, update store
      updateUserInfo(formData)
      toast.success('Profile updated successfully!')
      setIsEditing(false)
    } catch (error) {
      console.error('Profile update error:', error)
      toast.error('Failed to update profile')
    } finally {
      setIsSaving(false)
    }
  }

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      logout()
      toast.success('Logged out successfully')
      router.push('/')
    }
  }

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      bio: user?.bio || '',
      specialty: user?.specialty || '',
      clinicAddress: user?.clinicAddress || '',
    })
    setIsEditing(false)
  }

  const initials = user?.name
    ?.split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('') || 'U'

  return (
    <div className="min-h-screen bg-background px-4 py-12">
      <div className="mx-auto w-full max-w-4xl space-y-8">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="w-fit"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">My Profile</h1>
          <div className="flex gap-2">
            {!isEditing && (
              <Button onClick={() => setIsEditing(true)} variant="outline">
                <Edit2 className="mr-2 h-4 w-4" />
                Edit Profile
              </Button>
            )}
            <Button onClick={handleLogout} variant="destructive">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>

        {/* Profile Card */}
        <Card className="overflow-hidden">
          {/* Cover Banner */}
          <div className="h-32 sm:h-40 bg-gradient-to-r from-primary/90 via-primary to-primary/70" />

          <CardContent className="pt-0 pb-8 px-4 sm:px-6 lg:px-8">
            <div className="-mt-16 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              {/* Avatar & Basic Info */}
              <div className="flex items-end gap-4">
                <div className="relative">
                  {user?.profileImage ? (
                    <Image
                      src={user.profileImage}
                      alt={user.name}
                      width={128}
                      height={128}
                      className="h-32 w-32 rounded-full border-4 border-background bg-card object-cover shadow-lg"
                    />
                  ) : (
                    <div className="flex h-32 w-32 items-center justify-center rounded-full border-4 border-background bg-primary/10 text-4xl font-bold text-primary shadow-lg">
                      {initials}
                    </div>
                  )}

                  {isEditing && (
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isUploadingImage}
                      className="absolute bottom-0 right-0 bg-primary hover:bg-primary/90 disabled:opacity-50 text-white rounded-full p-2 shadow-lg transition-colors"
                    >
                      {isUploadingImage ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Upload className="h-4 w-4" />
                      )}
                    </button>
                  )}

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </div>

                <div className="pb-2">
                  <h2 className="text-2xl font-bold text-foreground">{user?.name}</h2>
                  <p className="mt-1 text-muted-foreground capitalize">{user?.role} account</p>
                </div>
              </div>

              {/* Role Badge */}
              <div className="flex w-fit items-center gap-2 rounded-full border border-border bg-muted px-4 py-2 text-sm text-muted-foreground">
                {user?.role === 'doctor' ? (
                  <Stethoscope className="h-4 w-4" />
                ) : user?.role === 'admin' ? (
                  <Shield className="h-4 w-4" />
                ) : (
                  <User className="h-4 w-4" />
                )}
                <span className="capitalize">{user?.role} Profile</span>
              </div>
            </div>

            {/* Profile Fields */}
            <div className="mt-8 space-y-6">
              {!isEditing ? (
                // View Mode
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-xl border border-border bg-muted/50 p-4">
                    <div className="mb-2 flex items-center gap-2 text-sm font-medium text-muted-foreground">
                      <User className="h-4 w-4" />
                      Full Name
                    </div>
                    <div className="text-base font-medium text-foreground">{user?.name}</div>
                  </div>

                  <div className="rounded-xl border border-border bg-muted/50 p-4">
                    <div className="mb-2 flex items-center gap-2 text-sm font-medium text-muted-foreground">
                      <Mail className="h-4 w-4" />
                      Email
                    </div>
                    <div className="text-base font-medium text-foreground break-all">{user?.email}</div>
                  </div>

                  {user?.phone && (
                    <div className="rounded-xl border border-border bg-muted/50 p-4">
                      <div className="mb-2 flex items-center gap-2 text-sm font-medium text-muted-foreground">
                        📞 Phone
                      </div>
                      <div className="text-base font-medium text-foreground">{user.phone}</div>
                    </div>
                  )}

                  <div className="rounded-xl border border-border bg-muted/50 p-4">
                    <div className="mb-2 flex items-center gap-2 text-sm font-medium text-muted-foreground">
                      <Shield className="h-4 w-4" />
                      Verification
                    </div>
                    <Badge variant={user?.isVerified ? 'default' : 'secondary'}>
                      {user?.isVerified ? 'Verified' : 'Pending'}
                    </Badge>
                  </div>

                  {user?.bio && (
                    <div className="rounded-xl border border-border bg-muted/50 p-4 sm:col-span-2">
                      <div className="mb-2 flex items-center gap-2 text-sm font-medium text-muted-foreground">
                        📝 Bio
                      </div>
                      <div className="text-base text-foreground">{user.bio}</div>
                    </div>
                  )}

                  {user?.role === 'doctor' && user?.specialty && (
                    <div className="rounded-xl border border-border bg-muted/50 p-4">
                      <div className="mb-2 flex items-center gap-2 text-sm font-medium text-muted-foreground">
                        <Stethoscope className="h-4 w-4" />
                        Specialty
                      </div>
                      <div className="text-base font-medium text-foreground">{user.specialty}</div>
                    </div>
                  )}

                  {user?.role === 'doctor' && user?.clinicAddress && (
                    <div className="rounded-xl border border-border bg-muted/50 p-4 sm:col-span-2">
                      <div className="mb-2 flex items-center gap-2 text-sm font-medium text-muted-foreground">
                        📍 Clinic Address
                      </div>
                      <div className="text-base text-foreground">{user.clinicAddress}</div>
                    </div>
                  )}
                </div>
              ) : (
                // Edit Mode
                <div className="space-y-4">
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      Click the camera icon on your profile image to change your photo
                    </AlertDescription>
                  </Alert>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Your full name"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Your phone number"
                      />
                    </div>

                    <div className="space-y-2 sm:col-span-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Input
                        id="bio"
                        name="bio"
                        value={formData.bio}
                        onChange={handleInputChange}
                        placeholder="Tell us about yourself"
                      />
                    </div>

                    {user?.role === 'doctor' && (
                      <>
                        <div className="space-y-2">
                          <Label htmlFor="specialty">Specialty</Label>
                          <Input
                            id="specialty"
                            name="specialty"
                            value={formData.specialty}
                            onChange={handleInputChange}
                            placeholder="Your medical specialty"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="clinicAddress">Clinic Address</Label>
                          <Input
                            id="clinicAddress"
                            name="clinicAddress"
                            value={formData.clinicAddress}
                            onChange={handleInputChange}
                            placeholder="Your clinic location"
                          />
                        </div>
                      </>
                    )}

                    <div className="space-y-2 sm:col-span-2">
                      <Label htmlFor="email">Email (Read-only)</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        disabled
                        className="opacity-60 cursor-not-allowed"
                      />
                      <p className="text-xs text-muted-foreground">Email cannot be changed after account creation</p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-border">
                    <Button onClick={handleSaveChanges} disabled={isSaving} className="sm:flex-1">
                      {isSaving ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="mr-2 h-4 w-4" />
                          Save Changes
                        </>
                      )}
                    </Button>
                    <Button onClick={handleCancel} variant="outline" className="sm:flex-1">
                      <X className="mr-2 h-4 w-4" />
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Additional Actions for Doctors */}
        {user?.role === 'doctor' && (
          <Card>
            <CardHeader>
              <CardTitle>Doctor Profile Management</CardTitle>
              <CardDescription>Manage your professional services and details</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild>
                <Link href="/doctor/manage-info">
                  <Stethoscope className="mr-2 h-4 w-4" />
                  Manage Doctor Profile
                </Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
