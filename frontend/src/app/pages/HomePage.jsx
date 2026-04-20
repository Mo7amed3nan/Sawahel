import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import ServicesList from '@/features/services/components/ServicesList';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <section className="px-6 py-24 text-center border-b border-border">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold tracking-tight text-foreground mb-4">
            Everything You Need in Sawahel
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            Your all-in-one guide to{' '}
            <span className="font-medium text-foreground">Ras Sedr</span>.
            Discover the best services our city has to offer.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <Button asChild size="lg">
              <Link to="/doctors">Find a Doctor</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold text-foreground text-center mb-10">
          Explore City Services
        </h2>
        <ServicesList />
      </section>
    </div>
  );
}
