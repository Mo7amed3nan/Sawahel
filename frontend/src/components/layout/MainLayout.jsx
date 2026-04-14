import { Outlet } from 'react-router-dom'
import NavBar from '@/components/layout/NavBar'
import Footer from '@/components/layout/Footer'

export default  function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <NavBar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}