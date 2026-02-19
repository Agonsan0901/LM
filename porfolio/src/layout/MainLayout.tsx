import Qsomos from '../sections/Qsomos'
import Training from '../sections/Training'
import Services from '../sections/Services'
import Contact from '../sections/Contact'
import Header from '../components/Header';

export const MainLayout = () => {
  return (
    <div className="min-h-screen w-full bg-slate-900 text-white">
    <Header />
    <main className="container mx-auto px-4 py-8">
      <Qsomos />
      <Training />
      <Services />
      <Contact />
    </main>
    </div>
  )
}