// app/page.tsx
import Topbar from '../components/Topbar'
import Hero from '../components/Hero'
import Milestone from '../components/Milestone'
import Blog from '../components/Blog'
import Footer from '../components/Footer'
import Bottombar from '../components/Bottombar'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Topbar />
      <Hero />
      <Bottombar />
      <Milestone />
      <Blog />
      <Footer />
    </main>
  )
}