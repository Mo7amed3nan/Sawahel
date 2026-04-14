import { Link } from 'react-router-dom'
import { Stethoscope, Bus, Wrench, UtensilsCrossed, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const services = [
  {
    id: 1,
    name: 'Doctors & Clinics',
    description: 'Find specialized doctors and manage medical appointments.',
    icon: Stethoscope,
    isActive: true,
    path: '/doctors',
  },
  {
    id: 2,
    name: 'Transportation',
    description: 'Bus routes, taxis, and car rentals around the city.',
    icon: Bus,
    isActive: false,
  },
  {
    id: 3,
    name: 'Maintenance',
    description: 'Plumbers, electricians, and trusted local handymen.',
    icon: Wrench,
    isActive: false,
  },
  {
    id: 4,
    name: 'Food & Dining',
    description: 'Restaurants, cafes, and local delivery services.',
    icon: UtensilsCrossed,
    isActive: false,
  },
]
import {toggleDark} from '@/lib/utils'
export default function Home() {

  return (
    <div className="min-h-screen bg-background">
      
      {/* Hero Section */}
      <section className="px-6 py-24 text-center border-b border-border">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold tracking-tight text-foreground mb-4">
            Everything You Need in Sawahel
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            Your all-in-one guide to <span className="font-medium text-foreground">Ras Sedr</span>. 
            Discover the best services our city has to offer.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <Button asChild size="lg">
              <Link to="/doctors">Find a Doctor</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/doctors/create">Join as a Professional</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="px-6 py-16 max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold text-foreground text-center mb-10">
          Explore City Services
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {services.map((service) => {
            const Icon = service.icon

            if (service.isActive) {
              return (
                <Link key={service.id} to={service.path} className="block">
                  <Card className="h-full transition-colors hover:border-primary">
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
                      <span className="text-sm font-medium text-primary inline-flex items-center gap-1">
                        Browse Directory <ArrowRight className="w-4 h-4" />
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              )
            }

            return (
              <Card key={service.id} className="h-full opacity-60 bg-muted/50">
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
            )
          })}
        </div>
      </section>
    </div>
  )
}