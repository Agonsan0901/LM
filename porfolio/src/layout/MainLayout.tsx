import Footer from '@/components/main/Footer';
import Header from '@/components/main/Header';
import QSomos from '../sections/QSomos';
import Formacion from '@/sections/Formacion';

export const MainLayout = () => {
  return (
    <div className="min-h-screen w-full bg-slate-900 text-white">
        <Header />
        <main>
          <QSomos />
          <Formacion />
          
        </main>
        <Footer />
    </div>
  )
}