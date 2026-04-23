import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';

/**
 * Skeleton for the Doctors List page — mimics the card grid.
 */
export function DoctorsListSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
      {/* Header */}
      <div className="mb-8 sm:mb-10 border-b border-border pb-6">
        <Skeleton className="h-9 w-56 mb-3" />
        <Skeleton className="h-4 w-80 max-w-full" />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="flex flex-col overflow-hidden">
            {/* Cover banner */}
            <Skeleton className="h-20 sm:h-24 rounded-none" />
            <CardHeader className="pt-10 pb-3">
              <Skeleton className="h-6 w-40 mb-2" />
              <Skeleton className="h-4 w-28" />
            </CardHeader>
            <CardContent className="pt-0 pb-3">
              <Skeleton className="h-6 w-24 rounded-full" />
            </CardContent>
            <CardFooter className="pt-3 border-t border-border gap-2">
              <Skeleton className="h-9 flex-1 rounded-md" />
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

/**
 * Skeleton for the Doctor Details page — mimics the profile card.
 */
export function DoctorDetailsSkeleton() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
      <Skeleton className="h-9 w-40 mb-6 rounded-md" />

      <Card className="overflow-hidden">
        {/* Cover */}
        <Skeleton className="h-24 sm:h-32 md:h-40 rounded-none" />

        <CardContent className="pt-0 pb-8 sm:pb-12 px-4 sm:px-6 lg:px-8">
          {/* Avatar + badge row */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end -mt-12 sm:-mt-16 mb-8 gap-4">
            <Skeleton className="h-20 w-20 sm:h-28 sm:w-28 rounded-full" />
            <Skeleton className="h-8 w-36 rounded-full" />
          </div>

          {/* Name & specialty */}
          <div className="mb-8 sm:mb-10 border-b border-border pb-6 sm:pb-8">
            <Skeleton className="h-8 w-64 mb-2" />
            <Skeleton className="h-5 w-40" />
          </div>

          {/* Info grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-start gap-3">
                <Skeleton className="h-10 w-10 rounded-lg shrink-0" />
                <div className="flex-1">
                  <Skeleton className="h-3 w-20 mb-2" />
                  <Skeleton className="h-5 w-32" />
                </div>
              </div>
            ))}
          </div>

          {/* Working days */}
          <div>
            <Skeleton className="h-5 w-32 mb-3" />
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <Skeleton key={i} className="h-8 w-16 rounded-full" />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

/**
 * Skeleton for the Profile page — mimics the profile card.
 */
export function ProfileSkeleton() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
      <Skeleton className="h-9 w-24 mb-6 rounded-md" />

      <Card>
        <CardHeader className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <Skeleton className="h-7 w-36" />
              <Skeleton className="h-4 w-64" />
            </div>
            <Skeleton className="h-12 w-12 rounded-full" />
          </div>
        </CardHeader>

        <CardContent className="space-y-6 py-6 border-t border-border">
          {/* Account type */}
          <Skeleton className="h-16 w-full rounded-lg" />

          {/* Info rows */}
          <div className="space-y-3">
            <Skeleton className="h-16 w-full rounded-lg" />
            <Skeleton className="h-16 w-full rounded-lg" />
          </div>

          {/* Account info */}
          <Skeleton className="h-12 w-full rounded-lg" />
        </CardContent>

        <CardFooter className="border-t border-border gap-3 mt-4">
          <Skeleton className="h-10 flex-1 rounded-md" />
          <Skeleton className="h-10 flex-1 rounded-md" />
        </CardFooter>
      </Card>
    </div>
  );
}

/**
 * Skeleton for Admin Dashboard — mimics stat cards + application list.
 */
export function AdminDashboardSkeleton() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <Skeleton className="h-9 w-52 mb-2" />
          <Skeleton className="h-4 w-48" />
        </div>
        <Skeleton className="h-10 w-28 rounded-md" />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardHeader className="pb-3">
              <Skeleton className="h-5 w-24" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-12" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Applications */}
      <Skeleton className="h-7 w-48 mb-6" />
      <div className="space-y-4">
        {[1, 2].map((i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-5 w-40 mb-1" />
              <Skeleton className="h-4 w-56" />
            </CardHeader>
            <CardContent>
              <div className="flex gap-3">
                <Skeleton className="h-9 w-24 rounded-md" />
                <Skeleton className="h-9 w-24 rounded-md" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

/**
 * Skeleton for the Doctor Form — mimics the form fields.
 */
export function DoctorFormSkeleton() {
  return (
    <div className="space-y-6">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="space-y-2">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
      ))}
      <Skeleton className="h-11 w-full rounded-md" />
    </div>
  );
}

/**
 * Skeleton for Apply for Doctor page.
 */
export function ApplyDoctorSkeleton() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <Card>
        <CardHeader className="text-center">
          <Skeleton className="h-8 w-48 mx-auto mb-2" />
          <Skeleton className="h-4 w-72 mx-auto" />
        </CardHeader>
        <CardContent className="space-y-6">
          <Skeleton className="h-40 w-full rounded-lg" />
          <Skeleton className="h-16 w-full rounded-lg" />
          <Skeleton className="h-12 w-full rounded-md" />
        </CardContent>
      </Card>
    </div>
  );
}
