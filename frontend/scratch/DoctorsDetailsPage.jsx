import { useState, useEffect } from 'react'
import { useRouter } from 'react-router-dom'
import {Link} from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import {
  ArrowLeft,
  Phone,
  MapPin,
  Clock,
  Calendar,
  Banknote,
  Loader2,
  AlertCircle,
  Copy,
  MessageCircle,
  Star,
} from 'lucide-react'
import toast from 'sonner'

// TODO: Install and configure Google Maps API
// npm install @react-google-maps/api
// Then uncomment the Google Maps section below

export default function DoctorsDetailsPage() {
  const router = useRouter()
  const { id } = router.query

  const [doctorData, setDoctorData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [copiedPhone, setCopiedPhone] = useState(false)

  useEffect(() => {
    const fetchDoctorDetails = async () => {
      try {
        // TODO: Replace with actual API call
        // const response = await fetch(`/api/doctors/${id}`)
        // const data = await response.json()
        // setDoctorData(data)

        // Mock data for demonstration
        setDoctorData({
          _id: id,
          name: 'Dr. Ahmed Hassan',
          specialty: 'Cardiologist',
          phone: '01012345678',
          email: 'ahmed@example.com',
          clinicAddress: 'Main Street, Ras Sedr',
          description: 'Experienced cardiologist with 15+ years in the field',
          workingDays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
          workingHours: { start: '09:00', end: '17:00' },
          price: 250,
          available: true,
          profileImage: null,
          rating: 4.8,
          reviews: 145,
          location: {
            lat: 28.7041,
            lng: 33.9537,
          },
          bio: 'Dedicated to providing the best cardiac care in Ras Sedr',
        })
      } catch (err) {
        console.error('Failed to fetch doctor details', err)
        setError('Failed to load professional details')
        toast.error('Failed to load doctor details')
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchDoctorDetails()
    }
  }, [id])

  const copyPhoneToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(doctorData.phone)
      setCopiedPhone(true)
      toast.success('Phone copied!')
      setTimeout(() => setCopiedPhone(false), 2000)
    } catch {
      toast.error('Failed to copy phone')
    }
  }

  const openWhatsApp = () => {
    const message = encodeURIComponent(
      `Hi Dr. ${doctorData.name.split(' ')[1]}, I would like to book an appointment.`
    )
    const whatsappUrl = `https://wa.me/20${doctorData.phone.slice(-10)}?text=${message}`
    window.open(whatsappUrl, '_blank')
  }

  const openGoogleMaps = () => {
    const mapsUrl = `https://maps.google.com/?q=${encodeURIComponent(doctorData.clinicAddress)}`
    window.open(mapsUrl, '_blank')
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    )
  }

  if (error || !doctorData) {
    return (
      <div className="min-h-screen bg-background px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <Button variant="ghost" onClick={() => router.back()} className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Directory
          </Button>
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </div>
      </div>
    )
  }

  const initials = doctorData.name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('')

  const isOpenNow = () => {
    const now = new Date()
    const dayIndex = now.getDay()
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const currentDay = dayNames[dayIndex]

    if (!doctorData.workingDays.includes(currentDay)) return false

    const [openHour, openMin] = doctorData.workingHours.start.split(':').map(Number)
    const [closeHour, closeMin] = doctorData.workingHours.end.split(':').map(Number)
    const currentTime = now.getHours() * 60 + now.getMinutes()
    const openTime = openHour * 60 + openMin
    const closeTime = closeHour * 60 + closeMin

    return currentTime >= openTime && currentTime <= closeTime
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* Back Button */}
        <Button variant="ghost" onClick={() => router.back()} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Directory
        </Button>

        {/* Profile Card */}
        <Card className="overflow-hidden mb-8">
          {/* Cover */}
          <div className="h-32 sm:h-40 bg-gradient-to-r from-primary/90 via-primary to-primary/70" />

          <CardContent className="pt-0 pb-10 px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between -mt-12 sm:-mt-16 mb-8">
              {/* Avatar */}
              <div className="flex items-end gap-4">
                <div className="h-32 w-32 bg-background rounded-full p-2 border-4 border-background shadow-lg flex items-center justify-center text-muted-foreground text-4xl font-bold">
                  {doctorData.profileImage ? (
                    <img
                      src={doctorData.profileImage}
                      alt={doctorData.name}
                      className="h-full w-full rounded-full object-cover"
                    />
                  ) : (
                    initials
                  )}
                </div>

                <div className="pb-4">
                  <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
                    {doctorData.name}
                  </h1>
                  <p className="text-xl text-primary font-semibold mt-1">{doctorData.specialty}</p>
                </div>
              </div>

              {/* Status Badge */}
              <div className="sm:pb-4">
                <Badge
                  variant={doctorData.available ? 'default' : 'secondary'}
                  className="gap-2 px-4 py-2"
                >
                  <span
                    className={`h-2 w-2 rounded-full ${
                      doctorData.available ? 'bg-green-400' : 'bg-red-400'
                    }`}
                  />
                  {doctorData.available ? 'Accepting Patients' : 'Currently Unavailable'}
                </Badge>
              </div>
            </div>

            {/* Divider */}
            <div className="border-b border-border mb-8 pb-8">
              <div className="flex flex-wrap gap-4 items-center">
                {/* Rating */}
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-bold text-foreground">{doctorData.rating}</span>
                  <span className="text-muted-foreground">({doctorData.reviews} reviews)</span>
                </div>

                {/* Open Status */}
                <Badge variant={isOpenNow() ? 'default' : 'secondary'}>
                  {isOpenNow() ? '🟢 Open Now' : '🔴 Closed'}
                </Badge>
              </div>

              {doctorData.bio && (
                <p className="text-muted-foreground mt-4">{doctorData.bio}</p>
              )}
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Contact Section */}
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-foreground border-l-4 border-primary pl-3">
                  Contact Information
                </h3>

                <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                  <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-muted-foreground">Phone</p>
                    <p className="text-foreground font-medium break-all">{doctorData.phone}</p>
                  </div>
                  <button
                    onClick={copyPhoneToClipboard}
                    className="p-2 hover:bg-background rounded-lg transition-colors flex-shrink-0"
                    title="Copy phone number"
                  >
                    <Copy
                      className={`h-4 w-4 transition-colors ${
                        copiedPhone ? 'text-green-500' : 'text-muted-foreground'
                      }`}
                    />
                  </button>
                </div>

                {doctorData.email && (
                  <div className="flex items-start gap-4 p-4 bg-muted/50 rounded-lg">
                    <span className="text-muted-foreground">✉️</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-muted-foreground">Email</p>
                      <p className="text-foreground font-medium break-all">{doctorData.email}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Schedule & Location Section */}
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-foreground border-l-4 border-primary pl-3">
                  Schedule & Location
                </h3>

                <div className="flex items-start gap-4 p-4 bg-muted/50 rounded-lg">
                  <Calendar className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Working Days</p>
                    <p className="text-foreground font-medium">
                      {Array.isArray(doctorData.workingDays)
                        ? doctorData.workingDays.join(', ')
                        : 'Not specified'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-muted/50 rounded-lg">
                  <Clock className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Working Hours</p>
                    <p className="text-foreground font-medium">
                      {doctorData.workingHours.start} - {doctorData.workingHours.end}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-muted/50 rounded-lg">
                  <Banknote className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Consultation Fee</p>
                    <p className="text-primary font-bold text-xl">{doctorData.price} EGP</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Location Map Section */}
            <div className="mt-8 space-y-4">
              <h3 className="text-lg font-bold text-foreground border-l-4 border-primary pl-3">
                Location
              </h3>

              <div className="rounded-lg border border-border overflow-hidden">
                {/* TODO: Integrate Google Maps
                  Install: npm install @react-google-maps/api
                  
                  <GoogleMap
                    mapContainerStyle={{ height: '400px' }}
                    center={{ lat: doctorData.location.lat, lng: doctorData.location.lng }}
                    zoom={15}
                  >
                    <MarkerF position={{ lat: doctorData.location.lat, lng: doctorData.location.lng }} />
                  </GoogleMap>
                */}

                <div className="h-96 bg-muted flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground font-medium mb-4">
                      {doctorData.clinicAddress}
                    </p>
                    <Button onClick={openGoogleMaps} size="sm">
                      <MapPin className="h-4 w-4 mr-2" />
                      Open in Google Maps
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                onClick={openWhatsApp}
                className="sm:flex-1 bg-green-600 hover:bg-green-700"
              >
                <MessageCircle className="h-5 w-5 mr-2" />
                Chat on WhatsApp
              </Button>

              <Button size="lg" variant="outline" className="sm:flex-1">
                <Calendar className="h-5 w-5 mr-2" />
                Book Appointment
              </Button>

              <Button size="lg" variant="outline" className="sm:flex-1">
                <Phone className="h-5 w-5 mr-2" />
                Call Directly
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
