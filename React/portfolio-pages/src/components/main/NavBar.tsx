import { NavLink } from "react-router-dom"



export const NavBar = () => {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
  isActive ? "text-blue-500 font-bold" : "text-white";
  return (
    <nav className="justify-center max-w-5xl mx-auto flex gap-6 p-4">
        <NavLink to="/" className={ linkClass }>Home</NavLink> | 
        <NavLink to="/trabajos" className={linkClass}>Trabajos</NavLink> |
        <NavLink to="/contacto" className={linkClass}>Contacto</NavLink> |
        <NavLink to="/servicios" className={linkClass}>Servicios</NavLink> |
        
    </nav>
  )
}