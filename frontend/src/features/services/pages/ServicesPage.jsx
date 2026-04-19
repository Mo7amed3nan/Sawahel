import ServicesList from '@/features/services/components/ServicesList';

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-background">
      <section className="px-6 py-16 max-w-5xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground text-center mb-3">
          City Services
        </h1>
        <p className="text-muted-foreground text-center mb-10">
          Browse available services in Ras Sedr.
        </p>
        <ServicesList />
      </section>
    </div>
  );
}
