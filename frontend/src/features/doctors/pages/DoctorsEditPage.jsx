import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { updateDoctor, fetchDoctorById } from '../services/doctorsApi'
import DoctorForm from '../components/DoctorForm'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'

export default function DoctorsEditPage() {
  const navigate = useNavigate()
  const { id: doctorId } = useParams()

  const [initialData, setInitialData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const loadDoctor = async () => {
      try {
        const response = await fetchDoctorById(doctorId)
        setInitialData(response.data || response)
      } catch (err) {
        const errMsg = err.response?.data?.message || 'Failed to load profile data'
        console.error('Fetch Error:', err)
        toast.error(errMsg)
        navigate(-1)
      } finally {
        setLoading(false)
      }
    }
    loadDoctor()
  }, [doctorId, navigate])

  const handleSubmit = async (e, doctorData) => {
    try {
      setError(null)
      setSaving(true)
      await updateDoctor(doctorId, doctorData)
      toast.success('Profile updated successfully!')
      navigate(-1)
    } catch (err) {
      const errMsg = err.response?.data?.message || err.message || 'Failed to update profile'
      console.error('Update Error:', err)
      toast.error(errMsg)
      setError(errMsg)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-8"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        {/* Page Header */}
        <div className="mb-8 border-b border-border pb-6">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Edit Professional Profile
          </h1>
          <p className="text-muted-foreground mt-2 text-lg">
            Update the public information for this service provider.
          </p>
        </div>

        {/* Form */}
        <DoctorForm
          initialData={initialData}
          onSubmit={handleSubmit}
          error={error}
          saving={saving}
          loading={false}
        />
      </div>
    </div>
  )
}