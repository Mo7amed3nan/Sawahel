import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDoctorsStore } from '@/features/doctors/doctorsStore'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
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
  Check,
  MessageCircle,
} from 'lucide-react'
import { toast } from 'sonner'

export default function DoctorsDetailsPage() {
  const { selectedDoctor, isLoading, error, loadDoctorById } =
    useDoctorsStore()

  const { id: doctorId } = useParams()
  const navigate = useNavigate()
  const [copiedPhone, setCopiedPhone] = useState(false)

  useEffect(() => {
    const getDoctorDetails = async () => {
      try {
        await loadDoctorById(doctorId)
      } catch (err) {
        console.error('Failed to fetch doctor details', err)
        toast.error('Failed to load professional details')
      }
    }
    getDoctorDetails()
  }, [doctorId, loadDoctorById])

  const handleCopyPhone = async () => {
    if (!selectedDoctor?.phone) return

    try {
      await navigator.clipboard.writeText(selectedDoctor.phone)
      setCopiedPhone(true)
      toast.success('Phone number copied!')
      setTimeout(() => setCopiedPhone(false), 2000)
    } catch {
      toast.error('Failed to copy phone number')
    }
  }

  const handleWhatsAppClick = () => {
    if (!selectedDoctor?.phone) return

    // Format phone: remove spaces, dashes, and leading +
    const cleanPhone = selectedDoctor.phone.replace(/\D/g, '')
    // If it starts with 0, replace with country code
    const formattedPhone = cleanPhone.startsWith('0')
      ? '20' + cleanPhone.slice(1)
      : cleanPhone.startsWith('20')
        ? cleanPhone
        : '20' + cleanPhone

    const message = `Hi ${selectedDoctor.name}, I would like to inquire about your services.`
    const whatsappUrl = `https://wa.me/${formattedPhone}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  const doctorData = selectedDoctor

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh] bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    )
  }

  if (error || !doctorData) {
    return (
      <div className="min-h-screen bg-background px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {error || 'Failed to load professional details'}
            </AlertDescription>
          </Alert>
        </div>
      </div>
    )
  }

  const workingHours =
    formattedTime(doctorData.startTime) && formattedTime(doctorData.endTime)
      ? `${formattedTime(doctorData.startTime)} - ${formattedTime(doctorData.endTime)}`
      : doctorData.workingHours || 'Not specified'

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Directory
        </Button>

        {/* Profile Card */}
        <Card className="overflow-hidden">
          {/* Cover */}
          <div className="h-24 sm:h-32 md:h-40 bg-gradient-to-r from-primary to-primary/70" />

          <CardContent className="pt-0 pb-8 sm:pb-12 px-4 sm:px-6 lg:px-8">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end -mt-12 sm:-mt-16 mb-8 gap-4">
              {/* Avatar */}
              <div className="h-20 w-20 sm:h-28 sm:w-28 bg-background rounded-full p-1 border-4 border-background shadow-lg shrink-0">
                <div className="h-full w-full bg-primary rounded-full flex items-center justify-center text-muted-foreground text-3xl sm:text-4xl font-bold">
                  {doctorData.name.charAt(0).toUpperCase()}
                </div>
              </div>

              {/* Availability Badge */}
              <div>
                <Badge
                  variant={doctorData.available ? 'default' : 'secondary'}
                  className="gap-2 px-3 py-1.5 text-sm"
                >
                  <span
                    className={`h-2 w-2 rounded-full ${doctorData.available ? 'bg-green-400' : 'bg-red-400'}`}
                  />
                  {doctorData.available ? 'Accepting Clients' : 'Unavailable'}
                </Badge>
              </div>
            </div>

            {/* Name & Specialty */}
            <div className="mb-8 sm:mb-10 border-b border-border pb-6 sm:pb-8">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground break-words">
                {doctorData.name}
              </h1>
              <p className="text-lg sm:text-xl text-primary font-semibold mt-2">
                {doctorData.specialty}
              </p>
            </div>

            {/* Contact & Schedule Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Contact Section */}
              <div className="space-y-5">
                <h3 className="text-lg font-bold text-foreground border-l-4 border-primary pl-3">
                  Contact Information
                </h3>

                {/* Phone with Copy & WhatsApp */}
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">
                    Phone Number
                  </p>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <div className="flex-1 flex items-center gap-2 px-3 py-2 bg-muted rounded-lg border border-border">
                      <Phone className="h-4 w-4 text-muted-foreground shrink-0" />
                      <a
                        href={`tel:${doctorData.phone}`}
                        className="text-foreground font-medium hover:text-primary transition-colors break-all"
                      >
                        {doctorData.phone || 'Not provided'}
                      </a>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleCopyPhone}
                      className="w-full sm:w-auto"
                    >
                      {copiedPhone ? (
                        <>
                          <Check className="h-4 w-4 mr-1" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4 mr-1" />
                          Copy
                        </>
                      )}
                    </Button>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-muted-foreground mt-0.5 shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-muted-foreground">
                      Location
                    </p>
                    <p className="text-foreground font-medium break-words">
                      {doctorData.clinicAddress || 'Not provided'}
                    </p>
                  </div>
                </div>

                {/* WhatsApp Button */}
                {doctorData.phone && (
                  <Button
                    onClick={handleWhatsAppClick}
                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                    size="lg"
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Message on WhatsApp
                  </Button>
                )}
              </div>

              {/* Schedule & Fees Section */}
              <div className="space-y-5">
                <h3 className="text-lg font-bold text-foreground border-l-4 border-primary pl-3">
                  Schedule & Fees
                </h3>

                {/* Working Days */}
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-muted-foreground mt-0.5 shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-muted-foreground">
                      Working Days
                    </p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {Array.isArray(doctorData.workingDays) &&
                      doctorData.workingDays.length > 0 ? (
                        doctorData.workingDays.map((day) => (
                          <Badge key={day} variant="outline">
                            {day.slice(0, 3)}
                          </Badge>
                        ))
                      ) : (
                        <p className="text-foreground font-medium">
                          {doctorData.workingDays || 'Not specified'}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Working Hours */}
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-muted-foreground mt-0.5 shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-muted-foreground">
                      Working Hours
                    </p>
                    <p className="text-foreground font-medium mt-1">
                      {workingHours}
                    </p>
                  </div>
                </div>

                {/* Service Fee */}
                <div className="flex items-start gap-3">
                  <Banknote className="h-5 w-5 text-muted-foreground mt-0.5 shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-muted-foreground">
                      Service Fee
                    </p>
                    <p className="text-primary font-bold text-2xl mt-1">
                      {doctorData.price
                        ? `${doctorData.price} EGP`
                        : 'Contact for price'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// Helper function to format time from HH:mm to readable format
function formattedTime(time24) {
  if (!time24) return null

  const [hours, minutes] = time24.split(':').map(Number)
  const ampm = hours >= 12 ? 'PM' : 'AM'
  const displayHours = hours % 12 || 12

  return `${displayHours}:${String(minutes).padStart(2, '0')} ${ampm}`
}
