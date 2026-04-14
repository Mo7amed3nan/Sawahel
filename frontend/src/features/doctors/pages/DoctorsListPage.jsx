import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { fetchDoctors, deleteDoctor } from '../services/doctorsApi'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { ArrowLeft, Loader2, AlertCircle, Eye, Pencil, Trash2 } from 'lucide-react'
import toast from 'react-hot-toast'

export default function DoctorsListPage() {
  const [doctors, setDoctors] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const loadDoctors = async () => {
      try {
        const response = await fetchDoctors()
        setDoctors(response.data)
      } catch (err) {
        setError('Failed to fetch doctors')
      } finally {
        setLoading(false)
      }
    }
    loadDoctors()
  }, [])

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this doctor?')) return
    try {
      await deleteDoctor(id)
      setDoctors(doctors.filter((doctor) => doctor._id !== id))
      toast.success('Doctor deleted successfully')
    } catch (err) {
      toast.error('Failed to delete doctor')
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-10 border-b border-border pb-6">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Service Directory
          </h1>
          <p className="text-muted-foreground mt-2 text-lg">
            Browse and manage registered professionals in Ras Sedr.
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center min-h-[40vh]">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="max-w-3xl mx-auto">
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && doctors.length === 0 && (
          <Card className="text-center py-20 border-dashed">
            <CardContent>
              <p className="text-muted-foreground text-lg font-medium">
                No professionals found.
              </p>
              <p className="text-muted-foreground mt-1">Be the first to list a service!</p>
            </CardContent>
          </Card>
        )}

        {/* Grid of Doctor Cards */}
        {!loading && !error && doctors.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {doctors.map((doctor) => (
              <Card key={doctor._id} className="flex flex-col overflow-hidden">
                {/* Cover Banner */}
                <div className="h-16 bg-primary relative">
                  {/* Avatar */}
                  <div className="absolute -bottom-6 left-6 h-14 w-14 bg-background rounded-full p-1 border-2 border-background shadow-md">
                    <div className="h-full w-full bg-muted rounded-full flex items-center justify-center text-muted-foreground text-xl font-bold">
                      {doctor.name.charAt(0).toUpperCase()}
                    </div>
                  </div>
                </div>

                {/* Card Body */}
                <CardHeader className="pt-10 pb-4">
                  <h3 className="text-xl font-bold text-foreground truncate">
                    {doctor.name}
                  </h3>
                  <p className="text-sm font-semibold text-primary">
                    {doctor.specialty}
                  </p>
                </CardHeader>

                <CardContent className="pt-0 pb-4 flex-grow">
                  <Badge variant={doctor.available ? 'default' : 'secondary'} className="gap-1.5">
                    <span className={`h-2 w-2 rounded-full ${doctor.available ? 'bg-green-400' : 'bg-red-400'}`} />
                    {doctor.available ? 'Available' : 'Unavailable'}
                  </Badge>
                </CardContent>

                {/* Action Buttons */}
                <CardFooter className="pt-4 border-t border-border gap-2">
                  <Button variant="outline" size="lg" className="flex-1" asChild>
                    <Link to={`/doctors/${doctor._id}`}>
                      <Eye className="mr-1 h-4 w-4" />
                      View
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" className="flex-1" asChild>
                    <Link to={`/doctors/${doctor._id}/update`}>
                      <Pencil className="mr-1 h-4 w-4" />
                      Edit
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="flex-1 text-destructive hover:text-destructive"
                    onClick={() => handleDelete(doctor._id)}
                  >
                    <Trash2 className="mr-1 h-4 w-4" />
                    Delete
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}