import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/features/auth/authStore'
import { useDoctorsStore } from '@/features/doctors/doctorsStore'
import { Button } from '@/components/ui/button'
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

  return (
    <div className="min-h-screen bg-background">
      <PageTitle title="Doctors" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
        {/* Header */}
        <div className="mb-8 sm:mb-10 border-b border-border pb-6">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-4 sm:mb-6"
          >
            <ArrowLeft className="mr-2 h-6 w-6 sm:h-5 sm:w-5" />
            Back
          </Button>

          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-2">
            Service Directory
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg">
            Browse and connect with registered professionals in Ras Sedr
          </p>
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

        {/* Grid of Doctor Cards */}
        {!isLoading && !error && doctors.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {doctors.map((doctor) => (
              <Card
                key={doctor._id}
                className="flex flex-col overflow-hidden hover:shadow-lg transition-shadow"
              >
                {/* Cover Banner */}
                <div className="h-20 sm:h-24 bg-gradient-to-r from-primary to-primary/70 relative">
                  {/* Avatar */}
                  <div className="absolute -bottom-6 left-4 sm:left-6 h-14 w-14 sm:h-16 sm:w-16 bg-background rounded-full p-1 border-3 border-background shadow-md">
                    <div className="h-full w-full bg-primary rounded-full flex items-center justify-center text-primary-foreground text-lg sm:text-2xl font-bold">
                      {doctor.name.charAt(0).toUpperCase()}
                    </div>
                  </div>
                </div>

                {/* Card Body */}
                <CardHeader className="pt-10 pb-3 sm:pb-4">
                  <h3 className="text-lg sm:text-xl font-bold text-foreground truncate">
                    {doctor.name}
                  </h3>
                  <p className="text-sm sm:text-base font-semibold text-primary truncate">
                    {doctor.specialty}
                  </p>
                </CardHeader>

                <CardContent className="pt-0 pb-3 flex-grow space-y-2">
                  {/* Rating */}
                  <StarRating
                    value={doctor.averageRating || 0}
                    count={doctor.totalRatings || 0}
                    size="sm"
                    showValue
                  />

                  {/* Availability Badge */}
                  <Badge
                    variant={doctor.available ? 'default' : 'secondary'}
                    className="gap-1.5 text-xs sm:text-sm"
                  >
                    <span
                      className={`h-2 w-2 rounded-full ${doctor.available ? 'bg-green-400' : 'bg-red-400'}`}
                    />
                    {doctor.available ? 'Available' : 'Unavailable'}
                  </Badge>
                </CardContent>

                {/* Action Buttons */}
                <CardFooter className="pt-3 border-t border-border gap-2 flex-wrap">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 min-w-[80px]"
                    asChild
                  >
                    <Link to={`/doctors/${doctor._id}`}>
                      <Eye className="mr-1.5 h-5 w-5" />
                      <span>View</span>
                    </Link>
                  </Button>

                  {isAdmin && (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 min-w-[80px]"
                        asChild
                      >
                        <Link to={`/doctors/${doctor._id}/update`}>
                          <Pencil className="mr-1.5 h-5 w-5" />
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
