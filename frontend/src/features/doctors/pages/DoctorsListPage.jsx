import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/features/auth/authStore'
import { useDoctorsStore } from '@/features/doctors/doctorsStore'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  ArrowLeft,
  Eye,
  Pencil,
  Trash2,
  Users,
  Search,
} from 'lucide-react'
import { toast } from 'sonner'
import Loader from '@/components/common/Loader'
import ErrorState from '@/components/common/ErrorState'
import EmptyState from '@/components/common/EmptyState'
import PageTitle from '@/components/common/PageTitle'
import { DoctorsListSkeleton } from '@/components/common/PageSkeletons'
import StarRating from '@/features/doctors/components/StarRating'

export default function DoctorsListPage() {
  const { doctors, isLoading, error, loadDoctors, removeDoctor } =
    useDoctorsStore()
  const navigate = useNavigate()
  const { user } = useAuthStore()
  const isAdmin = user?.role === 'admin'
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState('all')

  useEffect(() => {
    const loadDoctorsData = async () => {
      try {
        await loadDoctors()
      } catch (err) {
        toast.error('Failed to fetch professionals')
      }
    }

    loadDoctorsData()
  }, [loadDoctors])

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete ${name}'s profile?`)) return

    try {
      await removeDoctor(id)
      toast.success('Profile deleted successfully')
    } catch (err) {
      toast.error(err?.message || 'Failed to delete profile')
    }
  }
  
  const filteredDoctors = doctors.filter((doc) => {
    const q = searchQuery.toLowerCase()
    const matchesSearch = doc.name.toLowerCase().includes(q) || doc.specialty?.toLowerCase().includes(q)
    
    if (activeTab === 'all') return matchesSearch
    
    const docSection = doc.section || 'doctors_and_clinics'
    return matchesSearch && docSection === activeTab
  })

  return (
    <div className="min-h-screen bg-background">
      <PageTitle title="Doctors" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
        {/* Header */}
        <div className="mb-6 sm:mb-8 pb-6 border-b border-border/60">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-4 sm:mb-6 border border-border/50 shadow-sm"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            <span className="font-medium">Back</span>
          </Button>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground mb-3">
            Service Directory
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg mb-6">
            Browse and connect with registered professionals in Ras Sedr
          </p>

          <div className="relative max-w-md mb-6">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-muted-foreground" />
            </div>
            <Input
              type="text"
              placeholder="Search by name or specialty..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 bg-background/50 backdrop-blur-sm border-border/80 shadow-sm text-base rounded-2xl focus-visible:ring-primary"
            />
          </div>

          {/* Section Filters */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', label: 'All Services' },
              { id: 'doctors_and_clinics', label: 'Doctors & Clinics' },
              { id: 'pharmacies', label: 'Pharmacies' },
              { id: 'nurses', label: 'Nurses' },
            ].map((tab) => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveTab(tab.id)}
                className={`rounded-full ${activeTab === tab.id ? 'shadow-sm' : 'bg-background/50'}`}
              >
                {tab.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {isLoading && <DoctorsListSkeleton />}

        {/* Error State */}
        {!isLoading && error && (
          <ErrorState
            title="Failed to load professionals"
            message={error}
            onRetry={() => loadDoctors()}
          />
        )}

        {/* Empty State */}
        {!isLoading && !error && doctors.length === 0 && (
          <EmptyState
            icon={Users}
            title="No professionals listed yet"
            description="Be the first to list a service in Ras Sedr!"
          />
        )}
        
        {/* Search Empty State */}
        {!isLoading && !error && doctors.length > 0 && filteredDoctors.length === 0 && (
          <EmptyState
            icon={Search}
            title="No matches found"
            description={`No professionals matching "${searchQuery}"`}
          />
        )}

        {/* Grid of Doctor Cards */}
        {!isLoading && !error && filteredDoctors.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
            {filteredDoctors.map((doctor) => (
              <Card
                key={doctor._id}
                className="group flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10 border-border/50 bg-card/80 backdrop-blur-sm relative"
              >
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                {/* Cover Banner */}
                <div className="h-24 sm:h-32 md:h-40 bg-gradient-to-r from-primary to-blue-900 relative">
                  {/* Avatar */}
                  <div className="absolute -bottom-6 left-5 h-16 w-16 bg-background rounded-2xl p-1 shadow-md transform transition-transform group-hover:scale-105 group-hover:-rotate-3 border border-border/50">
                    <div className="h-full w-full bg-primary/10 text-primary rounded-xl flex items-center justify-center text-xl font-bold">
                      {doctor.name.charAt(0).toUpperCase()}
                    </div>
                  </div>
                </div>

                {/* Card Body */}
                <CardHeader className="pt-10 pb-3 sm:pb-4 relative z-10">
                  <div className="mb-2">
                    <Badge variant="outline" className="text-[10px] uppercase tracking-wider bg-background/50 border-border/60">
                      {doctor.section === 'pharmacies' 
                        ? 'Pharmacy' 
                        : doctor.section === 'nurses' 
                          ? 'Nurse' 
                          : 'Doctor & Clinic'}
                    </Badge>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-foreground truncate group-hover:text-primary transition-colors">
                    {doctor.name}
                  </h3>
                  <p className="text-sm font-semibold text-muted-foreground truncate">
                    {doctor.specialty}
                  </p>
                </CardHeader>

                <CardContent className="pt-0 pb-4 flex-grow space-y-3 relative z-10">
                  {/* Rating */}
                  <div className="bg-muted/30 p-2 rounded-lg border border-border/50 inline-block">
                    <StarRating
                      value={doctor.averageRating || 0}
                      count={doctor.totalRatings || 0}
                      size="sm"
                      showValue
                    />
                  </div>

                  {/* Availability Badge */}
                  <div>
                    <Badge
                      variant={doctor.available ? 'default' : 'secondary'}
                      className={`gap-1.5 px-2.5 py-1 text-[11px] uppercase tracking-wider font-bold ${
                        doctor.available ? 'bg-success/10 text-success hover:bg-success/20 border-success/20' : 'opacity-80'
                      }`}
                    >
                      <span
                        className={`h-2 w-2 rounded-full ${
                          doctor.available ? 'bg-success animate-pulse-soft' : 'bg-muted-foreground'
                        }`}
                      />
                      {doctor.available ? 'Available Now' : 'Unavailable'}
                    </Badge>
                  </div>
                </CardContent>

                {/* Action Buttons */}
                <CardFooter className="pt-4 border-t border-border/50 gap-2 flex-wrap bg-muted/10 relative z-10">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 min-w-[80px] h-10 border-border/60 hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-sm"
                    asChild
                  >
                    <Link to={`/doctors/${doctor._id}`}>
                      <Eye className="mr-1.5 h-4 w-4" />
                      <span>View Profile</span>
                    </Link>
                  </Button>

                  {isAdmin && (
                    <>
                      <Button
                        variant="secondary"
                        size="sm"
                        className="flex-1 min-w-[80px] h-10 shadow-sm"
                        asChild
                      >
                        <Link to={`/doctors/${doctor._id}/update`}>
                          <Pencil className="mr-1.5 h-4 w-4" />
                          <span>Edit</span>
                        </Link>
                      </Button>

                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 min-w-[80px] text-destructive hover:text-destructive"
                        onClick={() => handleDelete(doctor._id, doctor.name)}
                      >
                        <Trash2 className="mr-1.5 h-5 w-5" />
                        <span>Delete</span>
                      </Button>
                    </>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
