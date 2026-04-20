import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as LucideIcons from 'lucide-react';
import { ArrowRight } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useServicesStore } from '@/features/services/servicesStore';
import { useAuthStore } from '@/features/auth/authStore';

export default function ServicesList() {
  const { services, loadServices } = useServicesStore();
  const { isAuthenticated, user } = useAuthStore();
  const canApplyForDoctor = isAuthenticated && user?.role !== 'doctor';

  useEffect(() => {
    loadServices();
  }, [loadServices]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {services.map((service, index) => {
        const Icon = LucideIcons[service.icon] || LucideIcons.Stethoscope;
        const servicePath = service.path || '/services';

        if (service.isActive) {
          return (
            <Card
              key={service.id || index}
              className="h-full transition-colors hover:border-primary"
            >
              <Link to={servicePath} className="block text-left">
                <CardHeader className="flex-row items-start gap-4 space-y-0">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg">{service.name}</CardTitle>
                    <CardDescription className="mt-1">
                      {service.description}
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <span className="inline-flex items-center gap-2 text-sm font-medium text-primary">
                    Browse Directory <ArrowRight className="w-4 h-4" />
                  </span>
                </CardContent>
              </Link>

              {service.id === 'doctors' && canApplyForDoctor && (
                <CardContent className="pt-0">
                  <Button
                    variant="outline"
                    asChild
                    className="w-full sm:w-auto"
                  >
                    <Link to="/apply-for-doctor">Apply as Doctor</Link>
                  </Button>
                </CardContent>
              )}
            </Card>
          );
        }

        return (
          <Card
            key={service.id || index}
            className="h-full opacity-60 bg-muted/50"
          >
            <CardHeader className="flex-row items-start gap-4 space-y-0">
              <div className="bg-muted p-3 rounded-lg">
                <Icon className="w-6 h-6 text-muted-foreground" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between gap-2">
                  <CardTitle className="text-lg text-muted-foreground">
                    {service.name}
                  </CardTitle>
                  <Badge variant="secondary">Coming Soon</Badge>
                </div>
                <CardDescription className="mt-1">
                  {service.description}
                </CardDescription>
              </div>
            </CardHeader>
          </Card>
        );
      })}
    </div>
  );
}
