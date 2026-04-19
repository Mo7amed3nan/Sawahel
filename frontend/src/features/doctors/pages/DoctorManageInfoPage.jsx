import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useAuthStore } from '@/features/auth/authStore';
import { useDoctorsStore } from '@/features/doctors/doctorsStore';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import DoctorForm from '@/features/doctors/components/DoctorForm';

export default function DoctorManageInfoPage() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { myDoctor, isLoading, error, loadMyDoctor, addDoctor, editDoctor } =
    useDoctorsStore();
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!user?._id) {
      return;
    }

    loadMyDoctor(user._id).catch(() => {
      toast.error('Failed to load your profile data');
    });
  }, [loadMyDoctor, user?._id]);

  // Check if user is a doctor
  if (user?.role !== 'doctor') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground">Access Denied</h1>
          <p className="text-muted-foreground mt-2">
            You must be approved as a doctor to access this page.
          </p>
        </div>
      </div>
    );
  }

  const handleCreate = async (e, doctorData) => {
    try {
      setSaving(true);
      if (myDoctor?._id) {
        await editDoctor(myDoctor._id, doctorData);
        toast.success('Doctor profile updated successfully');
      } else {
        await addDoctor({
          ...doctorData,
          userId: user._id,
        });
        toast.success('Doctor profile created successfully');
      }
    } catch (err) {
      const message =
        err.response?.data?.message || err.message || 'Failed to save profile';
      toast.error(message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Button variant="ghost" onClick={() => navigate('/')} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back Home
        </Button>

        <div className="mb-8 border-b border-border pb-6">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            {myDoctor
              ? 'Update Your Doctor Profile'
              : 'Create Your Doctor Profile'}
          </h1>
          <p className="text-muted-foreground mt-2 text-lg">
            Fill in your profile details. Changes are reflected in the doctors
            list and details pages.
          </p>
        </div>

        <DoctorForm
          initialData={myDoctor || {}}
          onSubmit={handleCreate}
          error={error}
          saving={saving}
          loading={isLoading}
        />
      </div>
    </div>
  );
}
