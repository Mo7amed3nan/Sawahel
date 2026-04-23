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
    color: 'bg-blue-50 dark:bg-blue-950',
    iconColor: 'text-blue-600 dark:text-blue-400',
  },
  {
    id: 2,
    name: 'Delivery & Shopping',
    description: 'Order from local shops and get fast delivery',
    icon: ShoppingCart,
    isActive: false,
    href: '#',
    color: 'bg-green-50 dark:bg-green-950',
    iconColor: 'text-green-600 dark:text-green-400',
  },
  {
    id: 3,
    name: 'Transportation',
    description: 'Find buses, taxis, and car rental services',
    icon: Navigation,
    isActive: false,
    href: '#',
    color: 'bg-purple-50 dark:bg-purple-950',
    iconColor: 'text-purple-600 dark:text-purple-400',
  },
]

// Unauthenticated Home — landing page
function UnauthenticatedHome() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <PageTitle title="Welcome" />
      {/* Hero */}
      <section className="px-4 py-16 sm:py-24">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-6 border border-primary/20">
            <Waves className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium text-primary">Welcome to Sawahel</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6">
            Everything You Need in{' '}
            <span className="bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
              Ras Sedr
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground mb-8 leading-relaxed max-w-2xl mx-auto">
            Your one-stop platform for local services — healthcare, shopping, and more.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild size="lg" className="group h-12 sm:h-11 text-base">
              <Link to="/signup">
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-12 sm:h-11 text-base">
              <Link to="/doctors">Browse Doctors</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="px-4 py-10 border-y border-border">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Users, label: 'Active Users', value: '100+' },
              { icon: Stethoscope, label: 'Doctors', value: '10+' },
              { icon: Clock, label: 'Availability', value: '24/7' },
              { icon: CheckCircle, label: 'Verified', value: '100%' },
            ].map((stat, i) => {
              const Icon = stat.icon
              return (
                <div key={i} className="text-center">
                  <Icon className="h-7 w-7 sm:h-8 sm:w-8 text-primary mx-auto mb-2" />
                  <div className="text-2xl sm:text-3xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">{stat.label}</div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground text-center mb-10">
            Explore Services
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {services.map((service) => {
              const Icon = service.icon
              if (!service.isActive) {
                return (
                  <Card key={service.id} className="opacity-50">
                    <CardHeader className="pb-3">
                      <div className={`w-12 h-12 rounded-lg ${service.color} flex items-center justify-center mb-3`}>
                        <Icon className={`h-6 w-6 ${service.iconColor}`} />
                      </div>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base text-muted-foreground">{service.name}</CardTitle>
                        <Badge variant="secondary" className="text-xs">Soon</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <CardDescription className="text-sm">{service.description}</CardDescription>
                    </CardContent>
                  </Card>
                )
              }

              return (
                <Link key={service.id} to={service.href} className="block group">
                  <Card className="h-full transition-all hover:shadow-md hover:border-primary/50">
                    <CardHeader className="pb-3">
                      <div className={`w-12 h-12 rounded-lg ${service.color} flex items-center justify-center mb-3`}>
                        <Icon className={`h-6 w-6 ${service.iconColor}`} />
                      </div>
                      <CardTitle className="text-base group-hover:text-primary transition-colors">{service.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <CardDescription className="text-sm">{service.description}</CardDescription>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-14 bg-primary/5">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">Ready to Get Started?</h2>
          <p className="text-muted-foreground mb-6">
            Join Sawahel today and connect with the best services in Ras Sedr
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild size="lg" className="h-12 sm:h-11">
              <Link to="/signup">Create Account</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-12 sm:h-11">
              <Link to="/login">Sign In</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

// Authenticated User Home — clean & simple
function UserHome() {
  return (
    <div className="min-h-screen bg-background">
      <PageTitle title="Home" />
      <section className="px-4 py-10 sm:py-14">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-1">Welcome Back 👋</h1>
          <p className="text-muted-foreground mb-8">What would you like to do today?</p>

          {/* Primary Action */}
          <Link to="/doctors" className="block mb-6">
            <Card className="hover:shadow-md transition-shadow bg-gradient-to-r from-primary/5 to-transparent border-primary/20 hover:border-primary/40">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-4">
                  <div className="bg-blue-50 dark:bg-blue-950 p-3 rounded-xl">
                    <Stethoscope className="h-7 w-7 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg">Find a Doctor</CardTitle>
                    <CardDescription>Browse healthcare professionals in Ras Sedr</CardDescription>
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground" />
                </div>
              </CardHeader>
            </Card>
          </Link>

          {/* Secondary Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
            <Link to="/apply-for-doctor" className="block">
              <Card className="h-full hover:shadow-md transition-shadow">
                <CardContent className="flex items-center gap-3 py-4">
                  <div className="bg-green-50 dark:bg-green-950 p-2.5 rounded-lg">
                    <Stethoscope className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <span className="text-sm font-medium">Become a Doctor</span>
                </CardContent>
              </Card>
            </Link>
            <Link to="/profile" className="block">
              <Card className="h-full hover:shadow-md transition-shadow">
                <CardContent className="flex items-center gap-3 py-4">
                  <div className="bg-purple-50 dark:bg-purple-950 p-2.5 rounded-lg">
                    <User className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <span className="text-sm font-medium">My Profile</span>
                </CardContent>
              </Card>
            </Link>
          </div>

          {/* Coming Soon Services */}
          <h2 className="text-lg font-semibold text-foreground mb-4">Coming Soon</h2>
          <div className="grid grid-cols-2 gap-3">
            {services.filter(s => !s.isActive).map((service) => {
              const Icon = service.icon
              return (
                <Card key={service.id} className="opacity-50">
                  <CardContent className="flex items-center gap-3 py-4">
                    <div className={`${service.color} p-2 rounded-lg`}>
                      <Icon className={`h-5 w-5 ${service.iconColor}`} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{service.name}</p>
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
      <section className="px-4 py-10 sm:py-14">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-1">Doctor Dashboard 🩺</h1>
          <p className="text-muted-foreground mb-8">Manage your practice and connect with patients</p>

          {/* Primary Action */}
          <Link to="/doctor/manage-info" className="block mb-6">
            <Card className="hover:shadow-md transition-shadow bg-gradient-to-r from-primary/5 to-transparent border-primary/20 hover:border-primary/40">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-4">
                  <div className="bg-blue-50 dark:bg-blue-950 p-3 rounded-xl">
                    <Settings className="h-7 w-7 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg">Manage Profile</CardTitle>
                    <CardDescription>Update your details, schedule, and availability</CardDescription>
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground" />
                </div>
              </CardHeader>
            </Card>
          </Link>

          {/* Quick Links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
            <Link to="/doctors" className="block">
              <Card className="h-full hover:shadow-md transition-shadow">
                <CardContent className="flex items-center gap-3 py-4">
                  <div className="bg-green-50 dark:bg-green-950 p-2.5 rounded-lg">
                    <Stethoscope className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <span className="text-sm font-medium">View Directory</span>
                </CardContent>
              </Card>
            </Link>
            <Link to="/profile" className="block">
              <Card className="h-full hover:shadow-md transition-shadow">
                <CardContent className="flex items-center gap-3 py-4">
                  <div className="bg-purple-50 dark:bg-purple-950 p-2.5 rounded-lg">
                    <User className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <span className="text-sm font-medium">My Account</span>
                </CardContent>
              </Card>
            </Link>
          </div>

          {/* Stats preview */}
          <h2 className="text-lg font-semibold text-foreground mb-4">Quick Stats</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: 'Views', value: '0', emoji: '👁️' },
              { label: 'Appointments', value: '0', emoji: '📅' },
              { label: 'Patients', value: '0', emoji: '👥' },
              { label: 'Rating', value: '5.0', emoji: '⭐' },
            ].map((stat, i) => (
              <Card key={i}>
                <CardContent className="py-4 text-center">
                  <div className="text-2xl mb-1">{stat.emoji}</div>
                  <div className="text-xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

// Admin Home — management focused
function AdminHome() {
  return (
    <div className="min-h-screen bg-background">
      <PageTitle title="Admin Panel" />
      <section className="px-4 py-10 sm:py-14">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-1">Admin Panel 🛡️</h1>
          <p className="text-muted-foreground mb-8">Manage the platform and review applications</p>

          {/* Primary Action */}
          <Link to="/admin/dashboard" className="block mb-6">
            <Card className="hover:shadow-md transition-shadow bg-gradient-to-r from-primary/5 to-transparent border-primary/20 hover:border-primary/40">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-4">
                  <div className="bg-blue-50 dark:bg-blue-950 p-3 rounded-xl">
                    <ShieldCheck className="h-7 w-7 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg">Doctor Applications</CardTitle>
                    <CardDescription>Review and manage pending applications</CardDescription>
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground" />
                </div>
              </CardHeader>
            </Card>
          </Link>

          {/* Secondary Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link to="/doctors" className="block">
              <Card className="h-full hover:shadow-md transition-shadow">
                <CardContent className="flex items-center gap-3 py-4">
                  <div className="bg-green-50 dark:bg-green-950 p-2.5 rounded-lg">
                    <Stethoscope className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <span className="text-sm font-medium">Manage Doctors</span>
                </CardContent>
              </Card>
            </Link>
            <Link to="/profile" className="block">
              <Card className="h-full hover:shadow-md transition-shadow">
                <CardContent className="flex items-center gap-3 py-4">
                  <div className="bg-purple-50 dark:bg-purple-950 p-2.5 rounded-lg">
                    <User className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <span className="text-sm font-medium">My Account</span>
                </CardContent>
              </Card>
            </Link>
          </div>
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

  if (!isAuthenticated) {
    return <UnauthenticatedHome />
  }

  if (user?.role === 'admin') {
    return <AdminHome />
  }

  if (user?.role === 'doctor') {
    return <DoctorHome />
  }

  return <UserHome />
}
