import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuthStore } from '@/features/auth/authStore'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Stethoscope,
  ShoppingCart,
  Navigation,
  ArrowRight,
  Waves,
  Users,
  Clock,
  CheckCircle,
  Settings,
  User,
  ShieldCheck,
  Zap
} from 'lucide-react'
import PageTitle from '@/components/common/PageTitle'

const services = [
  {
    id: 1,
    name: 'Doctors & Clinics',
    description: 'Find medical professionals and get healthcare',
    icon: Stethoscope,
    isActive: true,
    href: '/doctors',
    color: 'bg-teal-50 dark:bg-teal-950/40 border-teal-200 dark:border-teal-800/50',
    iconColor: 'text-teal-600 dark:text-teal-400',
  },
  {
    id: 2,
    name: 'Delivery & Shopping',
    description: 'Order from local shops and get fast delivery',
    icon: ShoppingCart,
    isActive: false,
    href: '#',
    color: 'bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800/50',
    iconColor: 'text-blue-600 dark:text-blue-400',
  },
  {
    id: 3,
    name: 'Transportation',
    description: 'Find buses, taxis, and car rental services',
    icon: Navigation,
    isActive: false,
    href: '#',
    color: 'bg-indigo-50 dark:bg-indigo-950/40 border-indigo-200 dark:border-indigo-800/50',
    iconColor: 'text-indigo-600 dark:text-indigo-400',
  },
]

// Unauthenticated Home — landing page
function UnauthenticatedHome() {
  return (
    <div className="min-h-screen bg-background overflow-hidden relative">
      <PageTitle title="Welcome to Sawahel" />
      
      {/* Animated Background Mesh */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-40 dark:opacity-20 flex justify-center">
        <div className="absolute top-[-10%] left-[-10%] w-72 sm:w-96 h-72 sm:h-96 bg-primary/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute top-[20%] right-[-10%] w-72 sm:w-96 h-72 sm:h-96 bg-secondary/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[-20%] left-[20%] w-72 sm:w-96 h-72 sm:h-96 bg-accent/40 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      {/* Hero Section */}
      <section className="relative z-10 px-4 py-20 sm:py-32 flex items-center justify-center min-h-[85vh]">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full border border-primary/20 hover:bg-primary/20 transition-colors mx-auto">
            <Waves className="h-5 w-5 text-primary animate-pulse-soft" />
            <span className="text-sm font-semibold text-primary tracking-wide uppercase">Discover Ras Sedr</span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground leading-tight drop-shadow-sm">
            Your Gateway to{' '}
            <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-600 to-primary pb-2">
              Local Services
              <div className="absolute -bottom-1 left-0 w-full h-2 bg-gradient-to-r from-primary to-secondary opacity-30 blur-sm rounded-full"></div>
            </span>
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-2xl mx-auto font-medium">
            The premium platform for everything you need in Ras Sedr — tailored healthcare, quick shopping, and seamless travel.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button asChild size="lg" className="group h-14 px-8 text-base shadow-lg shadow-primary/25 rounded-xl">
              <Link to="/signup">
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-14 px-8 text-base bg-background/50 backdrop-blur-sm border-2 rounded-xl hover:bg-muted/80">
              <Link to="/doctors">
                <Stethoscope className="mr-2 h-5 w-5 text-primary" />
                Find a Doctor
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 px-4 py-12 border-y border-border/50 bg-muted/20 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Users, label: 'Active Members', value: '10+', color: 'text-blue-500' },
              { icon: Stethoscope, label: 'Verified Doctors', value: '5+', color: 'text-teal-500' },
              { icon: ShoppingCart, label: 'Daily Visits', value: '20+', color: 'text-amber-500' },
              { icon: CheckCircle, label: 'Trust Rating', value: '99%', color: 'text-green-500' },
            ].map((stat, i) => {
              const Icon = stat.icon
              return (
                <div key={i} className="text-center group p-4 rounded-2xl hover:bg-background/60 transition-colors">
                  <div className="mx-auto w-12 h-12 flex items-center justify-center bg-muted rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className={`h-6 w-6 sm:h-7 sm:w-7 ${stat.color}`} />
                  </div>
                  <div className="text-3xl sm:text-4xl font-extrabold text-foreground mb-1">{stat.value}</div>
                  <div className="text-sm sm:text-base font-medium text-muted-foreground uppercase tracking-wider">{stat.label}</div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="relative z-10 px-4 py-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
              Explore Premium Services
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              We vet and verify every service so you can book with absolute confidence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {services.map((service, index) => {
              const Icon = service.icon
              if (!service.isActive) {
                return (
                  <Card key={service.id} className="opacity-60 border-dashed border-2 bg-muted/10 blur-[0.5px]">
                    <CardHeader className="pb-4">
                      <div className={`w-14 h-14 rounded-2xl border ${service.color} flex items-center justify-center mb-4`}>
                        <Icon className={`h-7 w-7 ${service.iconColor}`} />
                      </div>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-xl text-muted-foreground">{service.name}</CardTitle>
                        <Badge variant="outline" className="font-semibold uppercase tracking-wider text-[10px]">Soon</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base">{service.description}</CardDescription>
                    </CardContent>
                  </Card>
                )
              }

              return (
                <Link key={service.id} to={service.href} className="block group">
                  <Card className="h-full transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/10 border-border/50 bg-card/80 backdrop-blur-sm overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <CardHeader className="pb-4 relative z-10">
                      <div className={`w-14 h-14 rounded-2xl border ${service.color} flex items-center justify-center mb-4 transform transition-transform group-hover:scale-110 group-hover:rotate-3`}>
                        <Icon className={`h-7 w-7 ${service.iconColor}`} />
                      </div>
                      <CardTitle className="text-xl group-hover:text-primary transition-colors">{service.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="relative z-10">
                      <CardDescription className="text-base text-muted-foreground/80">{service.description}</CardDescription>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 px-4 py-20 mt-10 border-t border-border/40 overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 backdrop-blur-sm"></div>
        <div className="relative max-w-3xl mx-auto text-center space-y-8 glass p-10 sm:p-14 rounded-3xl">
          <Waves className="h-12 w-12 text-primary mx-auto opacity-80" />
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">Ready to Dive In?</h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Join the Sawahel community today and experience the best local network in Ras Sedr.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button asChild size="lg" className="h-14 px-8 rounded-xl text-base shadow-lg shadow-primary/20">
              <Link to="/signup">Create Free Account</Link>
            </Button>
            <Button asChild variant="ghost" size="lg" className="h-14 px-8 rounded-xl text-base hover:bg-muted font-medium border border-transparent hover:border-border">
              <Link to="/login">Sign In Instead</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

// Authenticated User Home
function UserHome() {
  return (
    <div className="min-h-screen bg-background">
      <PageTitle title="Home" />
      <section className="px-4 py-12 sm:py-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground">Welcome Back</h1>
            <span className="text-3xl animate-blob origin-bottom">👋</span>
          </div>
          <p className="text-lg text-muted-foreground mb-10">What would you like to explore today?</p>

          {/* Primary Action */}
          <Link to="/doctors" className="block mb-6 group">
            <Card className="border-border/50 bg-background hover:bg-muted/30 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
              <CardHeader className="pb-4 sm:p-8">
                <div className="flex items-center gap-5 sm:gap-6">
                  <div className="bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800/50 p-4 rounded-2xl group-hover:scale-110 transition-transform">
                    <Stethoscope className="h-8 w-8 text-teal-600 dark:text-teal-400" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-xl sm:text-2xl mb-1 group-hover:text-primary transition-colors">Find a Doctor</CardTitle>
                    <CardDescription className="text-base">Browse top-rated healthcare professionals</CardDescription>
                  </div>
                  <ArrowRight className="h-6 w-6 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
              </CardHeader>
            </Card>
          </Link>

          {/* Secondary Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-12">
            <Link to="/apply-for-doctor" className="block group">
              <Card className="h-full border-border/50 hover:bg-muted/30 transition-colors">
                <CardContent className="flex items-center gap-4 p-6">
                  <div className="bg-green-50 dark:bg-green-950/50 p-3 rounded-xl group-hover:scale-110 transition-transform border border-green-200 dark:border-green-900">
                    <ShieldCheck className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <span className="text-lg font-semibold group-hover:text-foreground/80 transition-colors">Register as Doctor</span>
                </CardContent>
              </Card>
            </Link>
            <Link to="/profile" className="block group">
              <Card className="h-full border-border/50 hover:bg-muted/30 transition-colors">
                <CardContent className="flex items-center gap-4 p-6">
                  <div className="bg-indigo-50 dark:bg-indigo-950/50 p-3 rounded-xl group-hover:scale-110 transition-transform border border-indigo-200 dark:border-indigo-900">
                    <User className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <span className="text-lg font-semibold group-hover:text-foreground/80 transition-colors">My Profile Settings</span>
                </CardContent>
              </Card>
            </Link>
          </div>

          <h2 className="text-xl font-bold text-foreground mb-5 flex items-center gap-2">
            <Zap className="h-5 w-5 text-amber-500" /> Coming Soon
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {services.filter(s => !s.isActive).map((service) => {
              const Icon = service.icon
              return (
                <Card key={service.id} className="opacity-60 border-dashed bg-muted/10">
                  <CardContent className="flex items-center gap-4 p-5">
                    <div className={`${service.color} p-3 rounded-xl border`}>
                      <Icon className={`h-6 w-6 ${service.iconColor}`} />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{service.name}</p>
                      <p className="text-sm text-muted-foreground mt-0.5">Under development</p>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}

// Doctor Home — focused on managing practice
function DoctorHome() {
  return (
    <div className="min-h-screen bg-background">
      <PageTitle title="Doctor Dashboard" />
      <section className="px-4 py-12 sm:py-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">Doctor Dashboard <span className="animate-pulse-soft inline-block">🩺</span></h1>
          <p className="text-lg text-muted-foreground mb-10">Manage your practice setup and visibility.</p>

          <Link to="/doctor/manage-info" className="block mb-6 group">
            <Card className="border-border/50 bg-background hover:bg-muted/30 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
              <CardHeader className="pb-4 sm:p-8">
                <div className="flex items-center gap-5 sm:gap-6">
                  <div className="bg-primary/10 border border-primary/20 p-4 rounded-2xl group-hover:scale-110 transition-transform">
                    <Settings className="h-8 w-8 text-primary" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-xl sm:text-2xl mb-1 group-hover:text-primary transition-colors">Manage Profile</CardTitle>
                    <CardDescription className="text-base">Update availability, fees, and location details</CardDescription>
                  </div>
                  <ArrowRight className="h-6 w-6 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
              </CardHeader>
            </Card>
          </Link>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-12">
            <Link to="/doctors" className="block group">
              <Card className="h-full border-border/50 hover:bg-muted/30 transition-colors">
                <CardContent className="flex items-center gap-4 p-6">
                  <div className="bg-teal-50 dark:bg-teal-950/50 p-3 rounded-xl group-hover:scale-110 transition-transform border border-teal-200 dark:border-teal-900">
                    <Stethoscope className="h-6 w-6 text-teal-600 dark:text-teal-400" />
                  </div>
                  <span className="text-lg font-semibold group-hover:text-foreground/80 transition-colors">View Directory</span>
                </CardContent>
              </Card>
            </Link>
            <Link to="/profile" className="block group">
              <Card className="h-full border-border/50 hover:bg-muted/30 transition-colors">
                <CardContent className="flex items-center gap-4 p-6">
                  <div className="bg-indigo-50 dark:bg-indigo-950/50 p-3 rounded-xl group-hover:scale-110 transition-transform border border-indigo-200 dark:border-indigo-900">
                    <User className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <span className="text-lg font-semibold group-hover:text-foreground/80 transition-colors">Account Settings</span>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

// Admin Home
function AdminHome() {
  return (
    <div className="min-h-screen bg-background">
      <PageTitle title="Admin Panel" />
      <section className="px-4 py-12 sm:py-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">Admin Panel <span className="inline-block text-primary">🛡️</span></h1>
          <p className="text-lg text-muted-foreground mb-10">Control console for Sawahel platform.</p>

          <Link to="/admin/dashboard" className="block mb-6 group">
            <Card className="border-border/50 bg-background hover:bg-muted/30 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
              <CardHeader className="pb-4 sm:p-8">
                <div className="flex items-center gap-5 sm:gap-6">
                  <div className="bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900 p-4 rounded-2xl group-hover:scale-110 transition-transform">
                    <ShieldCheck className="h-8 w-8 text-rose-600 dark:text-rose-400" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-xl sm:text-2xl mb-1 group-hover:text-primary transition-colors">Review Applications</CardTitle>
                    <CardDescription className="text-base">Verify and approve pending professional registrations</CardDescription>
                  </div>
                  <ArrowRight className="h-6 w-6 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
              </CardHeader>
            </Card>
          </Link>
        </div>
      </section>
    </div>
  )
}


export default function HomePage() {
  const { user, isAuthenticated } = useAuthStore()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  if (!isAuthenticated) return <UnauthenticatedHome />
  if (user?.role === 'admin') return <AdminHome />
  if (user?.role === 'doctor') return <DoctorHome />
  
  return <UserHome />
}
