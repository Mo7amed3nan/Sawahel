import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDoctorsStore } from '@/features/doctors/doctorsStore'
import { useAuthStore } from '@/features/auth/authStore'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  ArrowLeft,
  Phone,
  MapPin,
  Clock,
  Calendar,
  Banknote,
  Copy,
  Check,
  MessageCircle,
  ExternalLink,
  Info,
  User,
  Image as ImageIcon,
} from 'lucide-react'
import { toast } from 'sonner'
import { DoctorDetailsSkeleton } from '@/components/common/PageSkeletons'
import ErrorState from '@/components/common/ErrorState'
import StarRating from '@/features/doctors/components/StarRating'

export default function DoctorsDetailsPage() {
  const {
    selectedDoctor,
    isLoading,
    error,
    loadDoctorById,
    doctorRatings,
    isLoadingRatings,
    isSubmittingRating,
    loadDoctorRatings,
    submitRating,
  } = useDoctorsStore()

  const { user, isAuthenticated } = useAuthStore()
  const { id: doctorId } = useParams()
  const navigate = useNavigate()
  const [copiedPhone, setCopiedPhone] = useState(false)
  const [copiedWhatsApp, setCopiedWhatsApp] = useState(false)
  const [lightboxImage, setLightboxImage] = useState(null)

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
    loadDoctorRatings(doctorId)
  }, [doctorId, loadDoctorById, loadDoctorRatings])

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

  const handleCopyWhatsApp = async () => {
    const number = selectedDoctor?.whatsappNumber
    if (!number) return

    try {
      await navigator.clipboard.writeText(number)
      setCopiedWhatsApp(true)
      toast.success('WhatsApp number copied!')
      setTimeout(() => setCopiedWhatsApp(false), 2000)
    } catch {
      toast.error('Failed to copy number')
    }
  }

  const handleWhatsAppClick = () => {
    const whatsappNum = selectedDoctor?.whatsappNumber
    if (!whatsappNum) return

    const cleanPhone = whatsappNum.replace(/\D/g, '')
    const formattedPhone = cleanPhone.startsWith('0')
      ? '20' + cleanPhone.slice(1)
      : cleanPhone.startsWith('20')
        ? cleanPhone
        : '20' + cleanPhone

    const message = `Hi ${selectedDoctor.name}, I would like to inquire about your services.`
    const whatsappUrl = `https://wa.me/${formattedPhone}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  const handleRating = async (rating) => {
    if (!isAuthenticated) {
      toast.error('Please log in to rate')
      return
    }

    try {
      await submitRating(doctorId, rating)
      toast.success('Rating submitted!')
    } catch (err) {
      toast.error(
        err?.response?.data?.message || 'Failed to submit rating'
      )
    }
  }

  const doctorData = selectedDoctor

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <DoctorDetailsSkeleton />
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
            <ArrowLeft className="mr-2 h-6 w-6 sm:h-5 sm:w-5" />
            Back
          </Button>
          <ErrorState
            title="Failed to load profile"
            message={error || 'This professional profile could not be found.'}
            onRetry={() => loadDoctorById(doctorId)}
          />
        </div>
      </div>
    )
  }

  const workingHours =
    formattedTime(doctorData.startTime) && formattedTime(doctorData.endTime)
      ? `${formattedTime(doctorData.startTime)} - ${formattedTime(doctorData.endTime)}`
      : doctorData.workingHours || 'Not specified'

  const whatsappDisplay = doctorData.whatsappNumber

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-6 w-6 sm:h-5 sm:w-5" />
          Back to Directory
        </Button>

        {/* Profile Header Card */}
        <Card className="overflow-hidden mb-8 border-border/50 bg-card/80 backdrop-blur-sm shadow-sm relative">
          {/* Cover */}
          <div className="h-24 sm:h-32 md:h-40 bg-gradient-to-r from-primary to-blue-900 relative overflow-hidden">
             {/* Decorative faint overlay */}
             <div className="absolute inset-0 bg-black/10 mix-blend-overlay"></div>
          </div>

          <CardContent className="pt-0 pb-6 px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end -mt-12 sm:-mt-16 mb-4 gap-4">
              {/* Avatar */}
              <div className="h-20 w-20 sm:h-28 sm:w-28 bg-background rounded-2xl p-1 shadow-lg shrink-0 border border-border/50 transform rotate-1">
                <div className="h-full w-full bg-primary/10 text-primary rounded-xl flex items-center justify-center text-3xl sm:text-4xl font-bold">
                  {doctorData.name.charAt(0).toUpperCase()}
                </div>
              </div>

              {/* Availability Badge */}
              <div className="flex flex-col items-start sm:items-end gap-2">
                <Badge
                  variant={doctorData.available ? 'default' : 'secondary'}
                  className="gap-2 px-3 py-1.5 text-sm"
                >
                  <span
                    className={`h-2.5 w-2.5 rounded-full ${doctorData.available ? 'bg-green-400' : 'bg-red-400'}`}
                  />
                  {doctorData.available ? 'Accepting Clients' : 'Unavailable'}
                </Badge>
              </div>
            </div>

            {/* Name, Specialty & Rating */}
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <Badge variant="outline" className="bg-primary/10 text-primary hover:bg-primary/20 border-primary/20">
                  {doctorData.section === 'pharmacies' 
                    ? 'Pharmacy' 
                    : doctorData.section === 'nurses' 
                      ? 'Nurse' 
                      : 'Doctor & Clinic'}
                </Badge>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground break-words">
                {doctorData.name}
              </h1>
              <p className="text-lg sm:text-xl text-primary font-semibold mt-1">
                {doctorData.specialty}
              </p>

              {/* Rating Display */}
              <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-3">
                <StarRating
                  value={doctorRatings.averageRating || doctorData.averageRating || 0}
                  count={doctorRatings.totalRatings || doctorData.totalRatings || 0}
                  showValue
                  size="md"
                />

                {/* User rating */}
                {isAuthenticated && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground ml-0 sm:ml-4 border-l-0 sm:border-l sm:pl-4 border-border">
                      Your rating:
                    </span>
                    <StarRating
                      value={doctorRatings.userRating || 0}
                      interactive
                      onChange={handleRating}
                      disabled={isSubmittingRating}
                      size="md"
                    />
                  </div>
                )}

                {!isAuthenticated && (
                  <p className="text-xs text-muted-foreground ml-0 sm:ml-4 border-l-0 sm:border-l sm:pl-4 border-border">
                    Log in to rate this professional
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs Content Navigation */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="flex flex-col sm:flex-row w-full mb-8 h-auto p-1 bg-muted/60 gap-1 sm:gap-0">
            <TabsTrigger value="overview" className="w-full sm:w-auto text-base data-[state=active]:bg-background">
              Overview
            </TabsTrigger>
            <TabsTrigger value="contact" className="w-full sm:w-auto text-base data-[state=active]:bg-background">
              Contact & Location
            </TabsTrigger>
            <TabsTrigger value="gallery" className="w-full sm:w-auto text-base data-[state=active]:bg-background">
              Gallery & Extra
            </TabsTrigger>
          </TabsList>

          {/* Tab 1: Overview */}
          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardContent className="p-6 sm:p-8 space-y-8">
                {/* Bio Section */}
                {doctorData.bio && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <User className="h-5 w-5 text-primary" />
                      <h3 className="text-lg font-bold text-foreground">About Me</h3>
                    </div>
                    <p className="text-foreground/80 leading-relaxed whitespace-pre-wrap">
                      {doctorData.bio}
                    </p>
                  </div>
                )}

                {/* Schedule & Fees Mini-Grid */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-bold text-foreground">Schedule & Fees</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-muted/30 p-5 rounded-xl border border-border">
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
                              <Badge key={day} variant="outline" className="bg-background">
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
                    <div className="flex items-start gap-3 md:col-span-2 mt-2 pt-4 border-t border-border">
                      <Banknote className="h-5 w-5 text-muted-foreground mt-1 shrink-0" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-muted-foreground">
                          Service Fee
                        </p>
                        <p className="text-primary font-bold text-xl mt-1">
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
          </TabsContent>

          {/* Tab 2: Contact & Location */}
          <TabsContent value="contact" className="space-y-6">
            <Card>
              <CardContent className="p-6 sm:p-8 space-y-8">
                {/* Contact Sub-section */}
                <div className="space-y-5">
                  <div className="flex items-center gap-2">
                    <Phone className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-bold text-foreground">Get In Touch</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Phone with Copy */}
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-muted-foreground">
                        Phone Number
                      </p>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <div className="flex-1 flex items-center gap-2 px-3 py-2 bg-muted/60 rounded-lg border border-border">
                          <Phone className="h-5 w-5 text-muted-foreground shrink-0" />
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
                          className="w-full sm:w-auto h-10"
                        >
                          {copiedPhone ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>

                    {/* WhatsApp Number */}
                    {whatsappDisplay && (
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-muted-foreground">
                          WhatsApp Number
                        </p>
                        <div className="flex flex-col sm:flex-row gap-2">
                          <div className="flex-1 flex items-center gap-2 px-3 py-2 bg-muted/60 rounded-lg border border-border">
                            <MessageCircle className="h-5 w-5 text-green-600 shrink-0" />
                            <span className="text-foreground font-medium break-all">
                              {whatsappDisplay}
                            </span>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={handleCopyWhatsApp}
                            className="w-full sm:w-auto h-10"
                          >
                            {copiedWhatsApp ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {whatsappDisplay && (
                    <Button
                      onClick={handleWhatsAppClick}
                      className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white mt-4"
                      size="lg"
                    >
                      <MessageCircle className="h-5 w-5 mr-2" />
                      Message Directly on WhatsApp
                    </Button>
                  )}
                </div>

                <div className="border-t border-border"></div>

                {/* Location Sub-section */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-bold text-foreground">Clinic Location</h3>
                  </div>

                  <div className="bg-muted/30 p-5 rounded-xl border border-border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-1">
                        Address
                      </p>
                      <p className="text-foreground font-medium break-words text-lg">
                        {doctorData.clinicAddress || 'Not provided'}
                      </p>
                    </div>

                    {doctorData.googleMapsUrl && (
                      <Button
                        variant="outline"
                        onClick={() => window.open(doctorData.googleMapsUrl, '_blank')}
                      >
                        <MapPin className="h-4 w-4 mr-2 text-red-500" />
                        Open Google Maps
                        <ExternalLink className="h-3.5 w-3.5 ml-2 text-muted-foreground" />
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab 3: Gallery & Extra */}
          <TabsContent value="gallery" className="space-y-6">
            <Card>
              <CardContent className="p-6 sm:p-8 space-y-8">
                {/* Additional Info */}
                {doctorData.additionalInfo ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Info className="h-5 w-5 text-primary" />
                      <h3 className="text-lg font-bold text-foreground">
                        Additional Information
                      </h3>
                    </div>
                    <div className="bg-muted/50 rounded-xl p-5 border border-border">
                      <p className="text-foreground/80 leading-relaxed whitespace-pre-wrap">
                        {doctorData.additionalInfo}
                      </p>
                    </div>
                  </div>
                ) : (
                  (!Array.isArray(doctorData.images) || doctorData.images.length === 0) && (
                    <div className="py-12 text-center text-muted-foreground">
                      <Info className="h-12 w-12 mx-auto mb-3 opacity-20" />
                      <p>No additional information or gallery images provided.</p>
                    </div>
                  )
                )}

                {/* Image Gallery */}
                {Array.isArray(doctorData.images) && doctorData.images.length > 0 && (
                  <div className="space-y-4">
                    {doctorData.additionalInfo && <div className="border-t border-border pt-6 mt-6"></div>}
                    <div className="flex items-center gap-2">
                      <ImageIcon className="h-5 w-5 text-primary" />
                      <h3 className="text-lg font-bold text-foreground">
                        Photo Gallery
                      </h3>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {doctorData.images.map((url, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => setLightboxImage(url)}
                          className="relative rounded-xl overflow-hidden border border-border shadow-sm group cursor-pointer aspect-square bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        >
                          <img
                            src={url}
                            alt={`${doctorData.name} - Gallery Image ${index + 1}`}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Fullscreen Image Lightbox */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex flex-col items-center justify-center p-4 cursor-zoom-out animate-in fade-in duration-200"
          onClick={() => setLightboxImage(null)}
        >
          <img
            src={lightboxImage}
            alt="Full size preview"
            className="max-w-full max-h-[90vh] object-contain rounded-md shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            onClick={() => setLightboxImage(null)}
            className="absolute top-4 right-4 sm:top-8 sm:right-8 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            aria-label="Close lightbox"
          >
            ✕
          </button>
        </div>
      )}
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
