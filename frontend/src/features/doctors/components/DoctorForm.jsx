import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, AlertCircle, Plus, X, ImagePlus } from 'lucide-react'
import { DoctorFormSkeleton } from '@/components/common/PageSkeletons'

const DAYS_OF_WEEK = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
]

const buildFormData = (initialData = {}) => ({
  name: initialData?.name || '',
  specialty: initialData?.specialty || '',
  section: initialData?.section || 'doctors_and_clinics',
  phone: initialData?.phone || '',
  whatsappNumber: initialData?.whatsappNumber || '',
  clinicAddress: initialData?.clinicAddress || '',
  googleMapsUrl: initialData?.googleMapsUrl || '',
  bio: initialData?.bio || '',
  additionalInfo: initialData?.additionalInfo || '',
  available: initialData?.available || false,
  workingDays: Array.isArray(initialData?.workingDays)
    ? initialData.workingDays
    : [],
  startTime: initialData?.startTime || '09:00',
  endTime: initialData?.endTime || '17:00',
  price: initialData?.price || '',
  images: Array.isArray(initialData?.images) ? initialData.images : [],
})

const DoctorForm = ({ initialData = {}, onSubmit, error, saving, loading }) => {
  const [formData, setFormData] = useState(buildFormData(initialData))
  const [newImageUrl, setNewImageUrl] = useState('')

  useEffect(() => {
    setFormData(buildFormData(initialData))
  }, [initialData])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleDayToggle = (day) => {
    setFormData((prevData) => ({
      ...prevData,
      workingDays: prevData.workingDays.includes(day)
        ? prevData.workingDays.filter((d) => d !== day)
        : [...prevData.workingDays, day],
    }))
  }

  const handleCheckboxChange = (checked) => {
    setFormData((prevData) => ({
      ...prevData,
      available: checked,
    }))
  }

  const handleAddImage = () => {
    const url = newImageUrl.trim()
    if (!url) return
    setFormData((prevData) => ({
      ...prevData,
      images: [...prevData.images, url],
    }))
    setNewImageUrl('')
  }

  const handleRemoveImage = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      images: prevData.images.filter((_, i) => i !== index),
    }))
  }

  if (loading) {
    return <DoctorFormSkeleton />
  }

  return (
    <Card>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          onSubmit(e, {
            ...formData,
            workingHours: `${formData.startTime} - ${formData.endTime}`,
          })
        }}
      >
        <CardHeader className="bg-muted/50 border-b border-border">
          <CardTitle>Professional Information</CardTitle>
        </CardHeader>

        <CardContent className="pt-6 space-y-6">
          {/* Section */}
          <div className="space-y-2">
            <Label htmlFor="section">
              Category / Section <span className="text-destructive">*</span>
            </Label>
            <select
              id="section"
              name="section"
              required
              value={formData.section}
              onChange={handleChange}
              className="flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="doctors_and_clinics">Doctors & Clinics</option>
              <option value="pharmacies">Pharmacies</option>
              <option value="nurses">Nurses</option>
            </select>
          </div>

          {/* Name & Specialty */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">
                Full Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Dr. Ahmed Hassan"
                className="text-base"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="specialty">
                Specialty / Profession{' '}
                <span className="text-destructive">*</span>
              </Label>
              <Input
                id="specialty"
                name="specialty"
                type="text"
                required
                value={formData.specialty}
                onChange={handleChange}
                placeholder="e.g. Dentist, Physician, etc."
                className="text-base"
              />
            </div>
          </div>

          {/* Bio */}
          <div className="space-y-2">
            <Label htmlFor="bio">Bio / About</Label>
            <textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              placeholder="Write a brief introduction about yourself, your experience, qualifications, etc."
              className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-y"
              rows={4}
            />
          </div>

          {/* Phone & WhatsApp */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">
                Phone Number <span className="text-destructive">*</span>
              </Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                required
                value={formData.phone}
                onChange={handleChange}
                placeholder="01xxxxxxxxx"
                className="text-base"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="whatsappNumber">WhatsApp Number</Label>
              <Input
                id="whatsappNumber"
                name="whatsappNumber"
                type="tel"
                value={formData.whatsappNumber}
                onChange={handleChange}
                placeholder="01xxxxxxxxx"
                className="text-base"
              />
            </div>
          </div>

          {/* Address & Google Maps */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="clinicAddress">
                Location / Address <span className="text-destructive">*</span>
              </Label>
              <Input
                id="clinicAddress"
                name="clinicAddress"
                type="text"
                required
                value={formData.clinicAddress}
                onChange={handleChange}
                placeholder="e.g. Main Street, Ras Sedr"
                className="text-base"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="googleMapsUrl">Google Maps Link</Label>
              <Input
                id="googleMapsUrl"
                name="googleMapsUrl"
                type="url"
                value={formData.googleMapsUrl}
                onChange={handleChange}
                placeholder="Paste your Google Maps link here"
                className="text-base"
              />
            </div>
          </div>

          {/* Working Days */}
          <div className="space-y-3">
            <Label>Working Days</Label>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {DAYS_OF_WEEK.map((day) => (
                <button
                  key={day}
                  type="button"
                  onClick={() => handleDayToggle(day)}
                  className={`px-3 py-2 rounded-lg border-2 text-sm font-medium transition-colors ${
                    formData.workingDays.includes(day)
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-border bg-background hover:border-muted-foreground'
                  }`}
                >
                  {day.slice(0, 3)}
                </button>
              ))}
            </div>
          </div>

          {/* Working Hours */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startTime">Opening Time</Label>
              <Input
                id="startTime"
                name="startTime"
                type="time"
                value={formData.startTime}
                onChange={handleChange}
                className="text-base"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="endTime">Closing Time</Label>
              <Input
                id="endTime"
                name="endTime"
                type="time"
                value={formData.endTime}
                onChange={handleChange}
                className="text-base"
              />
            </div>
          </div>

          {/* Price & Availability */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Service Fee (EGP)</Label>
              <Input
                id="price"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                placeholder="e.g. 200"
                className="text-base"
              />
            </div>

            <div className="flex items-end h-full">
              <label className="flex items-center h-10 gap-3 px-4 bg-muted rounded-md border border-input w-full cursor-pointer hover:bg-muted/80 transition-colors">
                <Checkbox
                  checked={formData.available}
                  onCheckedChange={handleCheckboxChange}
                />
                <span className="font-medium text-sm">
                  Currently accepting clients
                </span>
              </label>
            </div>
          </div>

          {/* Additional Info */}
          <div className="space-y-2">
            <Label htmlFor="additionalInfo">Additional Information</Label>
            <textarea
              id="additionalInfo"
              name="additionalInfo"
              value={formData.additionalInfo}
              onChange={handleChange}
              placeholder="Services offered, special equipment, certifications, etc."
              className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-y"
              rows={3}
            />
          </div>

          {/* Images */}
          <div className="space-y-3 mb-4">
            <Label>Images</Label>
            <p className="text-sm text-muted-foreground -mt-1">
              Add image URLs to showcase your clinic, equipment, or
              certifications.
            </p>

            {/* Existing images */}
            {formData.images.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {formData.images.map((url, index) => (
                  <div
                    key={index}
                    className="group relative rounded-lg overflow-hidden border border-border bg-muted"
                  >
                    <img
                      src={url}
                      alt={`Image ${index + 1}`}
                      className="w-full h-32 object-cover"
                      onError={(e) => {
                        e.target.src = ''
                        e.target.alt = 'Failed to load'
                        e.target.className =
                          'w-full h-32 flex items-center justify-center bg-muted text-muted-foreground text-sm'
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="absolute top-2 right-2 p-1 rounded-full bg-background/80 text-destructive hover:bg-destructive hover:text-destructive-foreground transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Add image input */}
            <div className="flex gap-2">
              <Input
                type="url"
                value={newImageUrl}
                onChange={(e) => setNewImageUrl(e.target.value)}
                placeholder="Paste image URL..."
                className="text-base flex-1"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    handleAddImage()
                  }
                }}
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={handleAddImage}
                disabled={!newImageUrl.trim()}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-4 bg-muted/50 border-t border-border">
          {error && (
            <Alert variant="destructive" className="w-full">
              <AlertCircle className="h-5 w-5" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Button
            type="submit"
            disabled={saving || !formData.workingDays.length}
            className="w-full"
            size="lg"
          >
            {saving ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Saving...
              </>
            ) : (
              'Save Profile'
            )}
          </Button>

          {!formData.workingDays.length && (
            <p className="text-xs text-muted-foreground text-center">
              Please select at least one working day
            </p>
          )}
        </CardFooter>
      </form>
    </Card>
  )
}

export default DoctorForm
