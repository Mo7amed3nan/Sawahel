import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home, ShieldAlert } from 'lucide-react';
import PageTitle from '@/components/common/PageTitle';

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <PageTitle title="Unauthorized" />
      <div className="text-center max-w-md">
        <div className="flex justify-center mb-6">
          <div className="bg-destructive/10 p-4 rounded-full">
            <ShieldAlert className="h-12 w-12 text-destructive" />
          </div>
        </div>

        <h1 className="text-6xl font-bold text-foreground mb-2">403</h1>
        <h2 className="text-2xl font-semibold text-foreground mb-4">
          Unauthorized Access
        </h2>
        <p className="text-muted-foreground mb-8 leading-relaxed">
          You do not have permission to access this page. Please log in with the correct account or go back to the home page.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild size="lg">
            <Link to="/">
              <Home className="mr-2 h-5 w-5" />
              Back to Home
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/login">Go to Login</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
