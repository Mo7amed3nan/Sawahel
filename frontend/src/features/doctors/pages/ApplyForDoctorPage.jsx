import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useDoctorsStore } from '@/features/doctors/doctorsStore';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, CheckCircle2, Clock, Loader2 } from 'lucide-react';
import Loader from '@/components/common/Loader';
import { ApplyDoctorSkeleton } from '@/components/common/PageSkeletons';

export default function ApplyForDoctorPage() {
  const navigate = useNavigate();
  const {
    applicationStatus,
    isCheckingApplication,
    isSubmittingApplication,
    loadApplicationStatus,
    submitDoctorApplication,
  } = useDoctorsStore();

  // Check if user already has an application
  useEffect(() => {
    const checkStatus = async () => {
      try {
        await loadApplicationStatus();
      } catch (err) {
        toast.error('Failed to load your application status');
      }
    };
    checkStatus();
  }, [loadApplicationStatus]);

  const handleApply = async () => {
    try {
      await submitDoctorApplication();
      toast.success('Application submitted! Admin will review it soon.');
    } catch (err) {
      const message =
        err.response?.data?.message || 'Failed to submit application';
      toast.error(message);
    }
  };

  if (isCheckingApplication) {
    return (
      <div className="min-h-screen bg-background">
        <ApplyDoctorSkeleton />
      </div>
    );
  }

  // If application exists, show status
  if (applicationStatus) {
    return (
      <div className="min-h-screen bg-background py-12">
        <div className="max-w-2xl mx-auto px-4">
          <Card>
            <CardHeader>
              <CardTitle>Application Status</CardTitle>
              <CardDescription>Your doctor application status</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-start gap-4">
                {applicationStatus.status === 'pending' && (
                  <>
                    <div className="rounded-full bg-warning/10 p-2 mt-0.5">
                      <Clock className="h-6 w-6 text-warning" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Pending Review</h3>
                      <p className="text-muted-foreground mt-1">
                        Your application is under review by our admin team. You
                        will be notified once a decision is made.
                      </p>
                    </div>
                  </>
                )}

                {applicationStatus.status === 'approved' && (
                  <>
                    <div className="rounded-full bg-success/10 p-2 mt-0.5">
                      <CheckCircle2 className="h-6 w-6 text-success" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">
                        Application Approved
                      </h3>
                      <p className="text-muted-foreground mt-1">
                        Congratulations! You can now create your doctor profile.
                      </p>
                      <Button
                        onClick={() => navigate('/doctor/manage-info')}
                        className="mt-4"
                      >
                        Create Your Profile
                      </Button>
                    </div>
                  </>
                )}

                {applicationStatus.status === 'rejected' && (
                  <>
                    <div className="rounded-full bg-destructive/10 p-2 mt-0.5">
                      <AlertCircle className="h-6 w-6 text-destructive" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">
                        Application Rejected
                      </h3>
                      <p className="text-muted-foreground mt-1">
                        {applicationStatus.reason ||
                          'Your application was not approved at this time.'}
                      </p>
                      <Button
                        onClick={() => navigate('/')}
                        variant="outline"
                        className="mt-4"
                      >
                        Go Home
                      </Button>
                    </div>
                  </>
                )}
              </div>

              <div className="text-sm text-muted-foreground">
                Application submitted:{' '}
                {new Date(applicationStatus.createdAt).toLocaleDateString()}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Show apply form
  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-2xl mx-auto px-4">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-3xl">Become a Doctor</CardTitle>
            <CardDescription className="text-base mt-2">
              Apply to be a doctor on Sawahel and reach patients in need of your
              services
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-muted p-6 rounded-lg space-y-4">
              <h3 className="font-semibold text-lg">Why join as a doctor?</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-1 shrink-0" />
                  <span>
                    Reach thousands of patients looking for your services
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-1 shrink-0" />
                  <span>Manage your clinic information and availability</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-1 shrink-0" />
                  <span>Build your professional presence</span>
                </li>
              </ul>
            </div>

            <Alert className="bg-info/10 border-info/20">
              <AlertCircle className="h-5 w-5 text-info" />
              <AlertDescription className="text-foreground">
                <strong>Note:</strong> After approval, you'll be able to create
                and manage your doctor profile with clinic details, specialties,
                and availability.
              </AlertDescription>
            </Alert>

            <Button
              onClick={handleApply}
              disabled={isSubmittingApplication}
              size="lg"
              className="w-full"
            >
              {isSubmittingApplication ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Submitting...
                </>
              ) : (
                'Submit Application'
              )}
            </Button>

            <Button
              onClick={() => navigate('/')}
              variant="outline"
              size="lg"
              className="w-full"
            >
              Cancel
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
