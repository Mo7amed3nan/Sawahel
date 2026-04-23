import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Waves, Users, MapPin, Heart } from 'lucide-react';
import PageTitle from '@/components/common/PageTitle';

const values = [
  {
    icon: Users,
    title: 'Community First',
    description:
      'We prioritize the needs of Ras Sedr residents, connecting them with trusted local services.',
  },
  {
    icon: MapPin,
    title: 'Local Knowledge',
    description:
      'Built by locals, for locals. We understand what our community truly needs.',
  },
  {
    icon: Heart,
    title: 'Quality Service',
    description:
      'Every professional listed is vetted to ensure you receive the best care and service.',
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <PageTitle title="About" />
      <section className="px-6 py-20 text-center border-b border-border">
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-center mb-6">
            <div className="bg-primary/10 p-4 rounded-full">
              <Waves className="h-12 w-12 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-foreground mb-4">
            About Sawahel
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Sawahel is your trusted digital companion for life in Ras Sedr. We
            connect residents with essential services, from healthcare to
            transportation, making everyday life simpler and more connected.
          </p>
        </div>
      </section>

      <section className="px-6 py-16 max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold text-foreground text-center mb-10">
          What We Stand For
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="flex justify-center mb-2">
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <Icon className="h-7 w-7 text-primary" />
                    </div>
                  </div>
                  <CardTitle className="text-lg">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="leading-relaxed">
                    {value.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>
    </div>
  );
}
