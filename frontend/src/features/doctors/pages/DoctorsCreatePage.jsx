import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createDoctor } from '../services/doctorsApi'
import DoctorForm from '../components/DoctorForm.jsx'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import toast from 'react-hot-toast'

export default function DoctorsCreatePage() {
  const navigate = useNavigate()
  const [error, setError] = useState(null)
  const [saving, setSaving] = useState(false)

  const handleSubmit = async (e, doctorData) => {
    try {
      setError(null)
      setSaving(true)
      await createDoctor(doctorData)
      toast.success('Professional profile created successfully!')
      navigate('/doctors')
    } catch (err) {
      const errMsg =
        err.response?.data?.message || err.message || 'Failed to create profile'
      console.error('Create Error:', err)
      toast.error(errMsg)
      setError(errMsg)
    } finally {
      setSaving(false)
    }
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
            List a New Professional
          </h1>
          <p className="text-muted-foreground mt-2 text-lg">
            Fill out the details below to add a new service provider to the Ras Sedr directory.
          </p>
        </div>

        {/* Form */}
        <DoctorForm
          onSubmit={handleSubmit}
          error={error}
          saving={saving}
          loading={false}
        />
      </div>
    </div>
  )
}