import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/features/auth/authStore';
import { useDoctorsStore } from '@/features/doctors/doctorsStore';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  ArrowLeft,
  Loader2,
  AlertCircle,
  Eye,
  Pencil,
  Trash2,
} from 'lucide-react';
import { toast } from 'sonner';

export default function DoctorsListPage() {
  const { doctors, isLoading, error, loadDoctors, removeDoctor } =
    useDoctorsStore();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const isAdmin = user?.role === 'admin';

  useEffect(() => {
    const loadDoctorsData = async () => {
      try {
        await loadDoctors();
      } catch (err) {
        toast.error('Failed to fetch doctors');
      }
    };

    loadDoctorsData();
  }, [loadDoctors]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this doctor?')) return;
    try {
      await removeDoctor(id);
      toast.success('Doctor deleted successfully');
    } catch (err) {
      toast.error('Failed to delete doctor');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-10 border-b border-border pb-6">
          <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6">
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
        {isLoading && (
          <div className="flex justify-center items-center min-h-[40vh]">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
          </div>
        )}

        {/* Error State */}
        {!isLoading && error && (
          <div className="max-w-3xl mx-auto">
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && doctors.length === 0 && (
          <Card className="text-center py-20 border-dashed">
            <CardContent>
              <p className="text-muted-foreground text-lg font-medium">
                No professionals found.
              </p>
              <p className="text-muted-foreground mt-1">
                Be the first to list a service!
              </p>
            </CardContent>
          </Card>
        )}

        {/* Grid of Doctor Cards */}
        {!isLoading && !error && doctors.length > 0 && (
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

                <CardContent className="pt-0 pb-4 grow">
                  <Badge
                    variant={doctor.available ? 'default' : 'secondary'}
                    className="gap-1.5"
                  >
                    <span
                      className={`h-2 w-2 rounded-full ${doctor.available ? 'bg-green-400' : 'bg-red-400'}`}
                    />
                    {doctor.available ? 'Available' : 'Unavailable'}
                  </Badge>
                </CardContent>

                {/* Action Buttons */}
                <CardFooter className="pt-4 border-t border-border gap-2 flex flex-col sm:flex-row">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full sm:flex-1"
                    asChild
                  >
                    <Link to={`/doctors/${doctor._id}`}>
                      <Eye className="mr-1 h-4 w-4" />
                      View
                    </Link>
                  </Button>
                  {isAdmin && (
                    <>
                      <Button
                        variant="outline"
                        size="lg"
                        className="w-full sm:flex-1"
                        asChild
                      >
                        <Link to={`/doctors/${doctor._id}/update`}>
                          <Pencil className="mr-1 h-4 w-4" />
                          Edit
                        </Link>
                      </Button>
                      <Button
                        variant="outline"
                        size="lg"
                        className="w-full sm:flex-1 text-destructive hover:text-destructive"
                        onClick={() => handleDelete(doctor._id)}
                      >
                        <Trash2 className="mr-1 h-4 w-4" />
                        Delete
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
  );
}
