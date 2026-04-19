import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDoctorsStore } from '@/features/doctors/doctorsStore';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  ArrowLeft,
  Phone,
  MapPin,
  Clock,
  Calendar,
  Banknote,
  Loader2,
  AlertCircle,
} from 'lucide-react';

export default function DoctorsDetailsPage() {
  const { selectedDoctor, isLoading, error, loadDoctorById } =
    useDoctorsStore();

  const { id: doctorId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getDoctorDetails = async () => {
      try {
        await loadDoctorById(doctorId);
      } catch (err) {
        console.error('Failed to fetch doctor details', err);
      }
    };
    getDoctorDetails();
  }, [doctorId, loadDoctorById]);

  const doctorData = selectedDoctor;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !doctorData) {
    return (
      <div className="max-w-3xl mx-auto mt-12 px-4">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {error || 'Failed to load professional details'}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Directory
        </Button>

        {/* Profile Card */}
        <Card className="overflow-hidden">
          {/* Cover */}
          <div className="h-32 sm:h-40 bg-primary" />

          <CardContent className="pt-0 pb-10 px-6 sm:px-10">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end -mt-12 sm:-mt-16 mb-8 gap-4">
              {/* Avatar */}
              <div className="h-24 w-24 sm:h-32 sm:w-32 bg-background rounded-full p-2 border-4 border-background shadow-lg">
                <div className="h-full w-full bg-muted rounded-full flex items-center justify-center text-muted-foreground text-4xl font-bold">
                  {doctorData.name.charAt(0).toUpperCase()}
                </div>
              </div>

              {/* Availability Badge */}
              <div className="sm:pb-4">
                <Badge
                  variant={doctorData.available ? 'default' : 'secondary'}
                  className="gap-2 px-4 py-2"
                >
                  <span
                    className={`h-2 w-2 rounded-full ${doctorData.available ? 'bg-green-400' : 'bg-red-400'}`}
                  />
                  {doctorData.available
                    ? 'Accepting Clients'
                    : 'Currently Unavailable'}
                </Badge>
              </div>
            </div>

            {/* Name & Specialty */}
            <div className="mb-10 border-b border-border pb-8">
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
                {doctorData.name}
              </h1>
              <p className="text-xl text-primary font-semibold mt-2">
                {doctorData.specialty}
              </p>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Contact Info */}
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-foreground border-l-4 border-primary pl-3">
                  Contact Information
                </h3>

                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Phone Number
                    </p>
                    <p className="text-foreground font-medium">
                      {doctorData.phone || 'Not provided'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Location / Address
                    </p>
                    <p className="text-foreground font-medium">
                      {doctorData.clinicAddress || 'Not provided'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Schedule & Fees */}
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-foreground border-l-4 border-primary pl-3">
                  Schedule & Fees
                </h3>

                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Working Days
                    </p>
                    <p className="text-foreground font-medium">
                      {Array.isArray(doctorData.workingDays)
                        ? doctorData.workingDays.join(', ')
                        : doctorData.workingDays || 'Not specified'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Working Hours
                    </p>
                    <p className="text-foreground font-medium">
                      {doctorData.workingHours || 'Not specified'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Banknote className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Service Fee
                    </p>
                    <p className="text-primary font-bold text-2xl">
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
      </div>
    </div>
  );
}
