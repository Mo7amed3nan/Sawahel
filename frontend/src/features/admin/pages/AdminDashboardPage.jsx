import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useAuthStore } from '@/features/auth/authStore';
import { useAdminStore } from '@/features/admin/adminStore';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { CheckCircle2, XCircle, Clock, LogOut, ArrowLeft } from 'lucide-react';

export default function AdminDashboardPage() {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const {
    applications,
    isLoading,
    processingId,
    loadApplications,
    approveDoctorApplication,
    rejectDoctorApplication,
  } = useAdminStore();

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        await loadApplications();
      } catch (err) {
        toast.error('Failed to load applications');
      }
    };

    fetchApplications();
  }, [loadApplications]);

  if (user?.role !== 'admin') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">
            Access Denied
          </h1>
          <p className="text-muted-foreground mb-6">
            You must be logged in as admin to access this page.
          </p>
          <Button onClick={() => navigate('/login')}>Go to Login</Button>
        </div>
      </div>
    );
  }

  const handleApprove = async (applicationId) => {
    try {
      await approveDoctorApplication(applicationId);
      toast.success('Application approved');
    } catch (err) {
      toast.error('Failed to approve application');
    }
  };

  const handleReject = async (applicationId) => {
    const reason = window.prompt('Enter rejection reason (optional):');
    if (reason === null) return;

    try {
      await rejectDoctorApplication(applicationId, reason);
      toast.success('Application rejected');
    } catch (err) {
      toast.error('Failed to reject application');
    }
  };

  const handleLogout = () => {
    logout().finally(() => navigate('/login'));
  };

  const pendingApps = applications.filter((app) => app.status === 'pending');
  const approvedApps = applications.filter((app) => app.status === 'approved');
  const rejectedApps = applications.filter((app) => app.status === 'rejected');

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <Button variant="ghost" onClick={() => navigate('/')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back Home
            </Button>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
                Admin Dashboard
              </h1>
              <p className="text-muted-foreground mt-2">
                Manage doctor applications
              </p>
            </div>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>

        {isLoading ? (
          <div className="text-center text-muted-foreground py-12">
            Loading applications...
          </div>
        ) : (
          <>
            {/* Statistics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Clock className="h-4 w-4 text-yellow-500" />
                    Pending
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{pendingApps.length}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    Approved
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">
                    {approvedApps.length}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <XCircle className="h-4 w-4 text-red-500" />
                    Rejected
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">
                    {rejectedApps.length}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Pending Applications */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Clock className="h-6 w-6 text-yellow-500" />
                Pending Applications
              </h2>

              {pendingApps.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No pending applications
                </div>
              ) : (
                <div className="space-y-4">
                  {pendingApps.map((app) => (
                    <Card key={app._id}>
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle>{app.userId?.name}</CardTitle>
                            <CardDescription>
                              {app.userId?.email}
                            </CardDescription>
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {new Date(app.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex gap-3">
                          <Button
                            onClick={() => handleApprove(app._id)}
                            disabled={processingId === app._id}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            {processingId === app._id
                              ? 'Approving...'
                              : 'Approve'}
                          </Button>
                          <Button
                            onClick={() => handleReject(app._id)}
                            disabled={processingId === app._id}
                            variant="destructive"
                          >
                            {processingId === app._id
                              ? 'Rejecting...'
                              : 'Reject'}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>

            {/* Approved Applications */}
            {approvedApps.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <CheckCircle2 className="h-6 w-6 text-green-500" />
                  Approved Applications
                </h2>
                <div className="space-y-4">
                  {approvedApps.map((app) => (
                    <Card
                      key={app._id}
                      className="bg-green-50 dark:bg-green-950"
                    >
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle>{app.userId?.name}</CardTitle>
                            <CardDescription>
                              {app.userId?.email}
                            </CardDescription>
                          </div>
                          <span className="text-sm text-green-700 dark:text-green-300">
                            Approved
                          </span>
                        </div>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Rejected Applications */}
            {rejectedApps.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <XCircle className="h-6 w-6 text-red-500" />
                  Rejected Applications
                </h2>
                <div className="space-y-4">
                  {rejectedApps.map((app) => (
                    <Card key={app._id} className="bg-red-50 dark:bg-red-950">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle>{app.userId?.name}</CardTitle>
                            <CardDescription>
                              {app.userId?.email}
                            </CardDescription>
                          </div>
                          <span className="text-sm text-red-700 dark:text-red-300">
                            Rejected
                          </span>
                        </div>
                        {app.reason && (
                          <p className="text-sm mt-2 text-muted-foreground">
                            Reason: {app.reason}
                          </p>
                        )}
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
