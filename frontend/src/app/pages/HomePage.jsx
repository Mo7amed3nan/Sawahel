import { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import { useAuthStore } from '@/features/auth/authStore'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Stethoscope,
  Truck,
  ShoppingCart,
  Navigation,
  ArrowRight,
  Waves,
  Users,
  Clock,
  CheckCircle,
} from 'lucide-react'

const services = [
  {
    id: 1,
    name: 'Doctors & Clinics',
    description: 'Find medical professionals, book appointments, and get healthcare',
    icon: Stethoscope,
    isActive: true,
    href: '/doctors',
    color: 'bg-blue-50 dark:bg-blue-950',
    iconColor: 'text-blue-600 dark:text-blue-400',
  },
  {
    id: 2,
    name: 'Delivery & Shopping',
    description: 'Order from local shops and get fast delivery to your door',
    icon: ShoppingCart,
    isActive: false,
    href: '#',
    color: 'bg-green-50 dark:bg-green-950',
    iconColor: 'text-green-600 dark:text-green-400',
  },
  {
    id: 3,
    name: 'Transportation',
    description: 'Find buses, taxis, and car rental services around the city',
    icon: Navigation,
    isActive: false,
    href: '#',
    color: 'bg-purple-50 dark:bg-purple-950',
    iconColor: 'text-purple-600 dark:text-purple-400',
  },
]

// Unauthenticated Home
function UnauthenticatedHome() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      {/* Hero Section */}
      <section className="px-4 py-16 sm:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-6 border border-primary/20">
            <Waves className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Welcome to Sawahel</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-foreground mb-6">
            Everything You Need in{' '}
            <span className="bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
              Ras Sedr
            </span>
          </h1>

          <p className="text-xl text-muted-foreground mb-8 leading-relaxed max-w-2xl mx-auto">
            Your one-stop platform for local services. From healthcare to shopping, all in one
            place. Join thousands of satisfied users today.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="group">
              <Link to="/signup">
                Get Started Free
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/doctors">Browse Doctors</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-4 py-12 border-y border-border">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-12">
            {[
              { icon: Users, label: 'Active Users', value: '100+' },
              { icon: Stethoscope, label: 'Doctors', value: '10+' },
              { icon: Clock, label: 'Hours Available', value: '24/7' },
              { icon: CheckCircle, label: 'Verified', value: '100%' },
            ].map((stat, i) => {
              const Icon = stat.icon
              return (
                <div key={i} className="text-center">
                  <Icon className="h-8 w-8 text-primary mx-auto mb-2" />
                  <div className="text-2xl sm:text-3xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="px-4 py-16">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Explore Services
            </h2>
            <p className="text-muted-foreground text-lg">
              Browse our available services in Ras Sedr
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((service) => {
              const Icon = service.icon

              if (!service.isActive) {
                return (
                  <Card key={service.id} className="opacity-60 bg-muted/50">
                    <CardHeader>
                      <div className={`w-12 h-12 rounded-lg ${service.color} flex items-center justify-center mb-4`}>
                        <Icon className={`h-6 w-6 ${service.iconColor}`} />
                      </div>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg text-muted-foreground">
                            {service.name}
                          </CardTitle>
                        </div>
                        <Badge variant="secondary">Coming Soon</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>{service.description}</CardDescription>
                    </CardContent>
                  </Card>
                )
              }

              return (
                <Link key={service.id} to={service.href} className="block group">
                  <Card className="h-full transition-all hover:shadow-lg hover:border-primary">
                    <CardHeader>
                      <div
                        className={`w-12 h-12 rounded-lg ${service.color} flex items-center justify-center mb-4`}
                      >
                        <Icon className={`h-6 w-6 ${service.iconColor}`} />
                      </div>
                      <CardTitle className="text-lg group-hover:text-primary transition-colors">
                        {service.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <CardDescription>{service.description}</CardDescription>
                    </CardContent>
                    <div className="px-6 pb-6">
                      <span className="text-sm font-medium text-primary inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                        Explore <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-16 bg-primary/5">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">Ready to Get Started?</h2>
          <p className="text-muted-foreground mb-8">
            Join Sawahel today and connect with the best services in Ras Sedr
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link to="/signup">Create Account</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/login">Sign In</Link>
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
      {/* Welcome Section */}
      <section className="px-4 py-16 bg-gradient-to-r from-primary/10 to-primary/5 border-b border-border">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">Welcome Back!</h1>
          <p className="text-muted-foreground text-lg">
            Browse services and connect with professionals in Ras Sedr
          </p>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-foreground mb-6">Quick Access</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link to="/doctors" className="block">
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="bg-blue-50 dark:bg-blue-950 p-3 rounded-lg">
                      <Stethoscope className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <CardTitle>Find a Doctor</CardTitle>
                      <CardDescription>Browse healthcare professionals</CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </Link>

            <Link to="/apply-for-doctor" className="block">
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="bg-green-50 dark:bg-green-950 p-3 rounded-lg">
                      <Stethoscope className="h-6 w-6 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <CardTitle>Become a Doctor</CardTitle>
                      <CardDescription>Join our professional network</CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-foreground mb-6">Available Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((service) => {
              const Icon = service.icon

              if (!service.isActive) {
                return (
                  <Card key={service.id} className="opacity-60 bg-muted/50">
                    <CardHeader>
                      <div className={`w-12 h-12 rounded-lg ${service.color} flex items-center justify-center mb-4`}>
                        <Icon className={`h-6 w-6 ${service.iconColor}`} />
                      </div>
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-lg text-muted-foreground">
                          {service.name}
                        </CardTitle>
                        <Badge variant="secondary">Coming Soon</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>{service.description}</CardDescription>
                    </CardContent>
                  </Card>
                )
              }

              return (
                <Link key={service.id} to={service.href} className="block group">
                  <Card className="h-full transition-all hover:shadow-lg hover:border-primary">
                    <CardHeader>
                      <div
                        className={`w-12 h-12 rounded-lg ${service.color} flex items-center justify-center mb-4`}
                      >
                        <Icon className={`h-6 w-6 ${service.iconColor}`} />
                      </div>
                      <CardTitle className="text-lg group-hover:text-primary transition-colors">
                        {service.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <CardDescription>{service.description}</CardDescription>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}

// Doctor Home
function DoctorHome() {
  return (
    <div className="min-h-screen bg-background">
      {/* Welcome Section */}
      <section className="px-4 py-16 bg-gradient-to-r from-primary/10 to-primary/5 border-b border-border">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
            Welcome, Doctor!
          </h1>
          <p className="text-muted-foreground text-lg">Manage your profile and view patient interactions</p>
        </div>
      </section>

      {/* Quick Stats & Actions */}
      <section className="px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              { label: 'Profile Views', value: '0', icon: '👁️' },
              { label: 'Appointments', value: '0', icon: '📅' },
              { label: 'Patients', value: '0', icon: '👥' },
              { label: 'Rating', value: '5', icon: '⭐' },
            ].map((stat, i) => (
              <Card key={i}>
                <CardContent className="pt-6">
                  <div className="text-3xl mb-2">{stat.icon}</div>
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          <h2 className="text-2xl font-bold text-foreground mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link to="/doctor/manage-info" className="block">
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="bg-blue-50 dark:bg-blue-950 p-3 rounded-lg">
                      <Stethoscope className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <CardTitle>Manage Profile</CardTitle>
                      <CardDescription>Update your details and schedule</CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </Link>

            <Link to="/profile" className="block">
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="bg-purple-50 dark:bg-purple-950 p-3 rounded-lg">
                      <Users className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <CardTitle>My Account</CardTitle>
                      <CardDescription>View your profile settings</CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Available Services */}
      <section className="px-4 py-12 border-t border-border">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-foreground mb-6">Browse Other Services</h2>
          <p className="text-muted-foreground mb-8">As a healthcare professional, explore other services available on Sawahel</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((service) => {
              const Icon = service.icon

              if (!service.isActive) {
                return (
                  <Card key={service.id} className="opacity-60 bg-muted/50">
                    <CardHeader>
                      <div className={`w-12 h-12 rounded-lg ${service.color} flex items-center justify-center mb-4`}>
                        <Icon className={`h-6 w-6 ${service.iconColor}`} />
                      </div>
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-lg text-muted-foreground">
                          {service.name}
                        </CardTitle>
                        <Badge variant="secondary">Coming Soon</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>{service.description}</CardDescription>
                    </CardContent>
                  </Card>
                )
              }

              return (
                <Link key={service.id} to={service.href} className="block group">
                  <Card className="h-full transition-all hover:shadow-lg hover:border-primary">
                    <CardHeader>
                      <div
                        className={`w-12 h-12 rounded-lg ${service.color} flex items-center justify-center mb-4`}
                      >
                        <Icon className={`h-6 w-6 ${service.iconColor}`} />
                      </div>
                      <CardTitle className="text-lg group-hover:text-primary transition-colors">
                        {service.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <CardDescription>{service.description}</CardDescription>
                    </CardContent>
                    <div className="px-6 pb-6">
                      <span className="text-sm font-medium text-primary inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                        Explore <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                  </Card>
                </Link>
              )
            })}
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
      {/* Welcome Section */}
      <section className="px-4 py-16 bg-gradient-to-r from-primary/10 to-primary/5 border-b border-border">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground text-lg">Manage platform content and users</p>
        </div>
      </section>

      {/* Admin Stats */}
      <section className="px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              { label: 'Total Users', value: '10', color: 'bg-blue-50 dark:bg-blue-950' },
              { label: 'Doctors', value: '4', color: 'bg-green-50 dark:bg-green-950' },
              { label: 'Pending Reports', value: '-', color: 'bg-yellow-50 dark:bg-yellow-950' },
              { label: 'Platform Health', value: '100%', color: 'bg-purple-50 dark:bg-purple-950' },
            ].map((stat, i) => (
              <Card key={i}>
                <CardContent className="pt-6">
                  <div className={`w-12 h-12 rounded-lg ${stat.color} mb-3`} />
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          <h2 className="text-2xl font-bold text-foreground mb-6">Admin Tools</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link to="/admin/users" className="block">
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="bg-blue-50 dark:bg-blue-950 p-3 rounded-lg">
                      <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <CardTitle>Manage Users</CardTitle>
                      <CardDescription>View and manage user accounts</CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </Link>

            <Link to="/doctors" className="block">
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="bg-green-50 dark:bg-green-950 p-3 rounded-lg">
                      <Stethoscope className="h-6 w-6 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <CardTitle>Manage Doctors</CardTitle>
                      <CardDescription>Approve and verify professionals</CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}


export default function HomePage() {
  const { user, isAuthenticated, isCheckingAuth } = useAuthStore()
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
