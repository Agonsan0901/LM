import { NavBar } from '@/components/main/NavBar'
import { Outlet } from 'react-router-dom'

export const MainLayout = () => {
  return (
    <>
        <div className="min-h-screen w-full bg-slate-900 text-white">
            <header className="w-full bg-slate-950/80 backdrop-blur z-50">
                <NavBar />
            </header>
            <main  className="flex-1 min-h-150 items-center container mx-auto px-4 py-8">
                <Outlet />
            </main>
            <footer className="fixed bottom-0 w-full bg-slate-950/80 backdrop-blur z-50 h-30">
                Aitor González Sánchez 2026
            </footer>
        </div>
    
    </>
  )
}
