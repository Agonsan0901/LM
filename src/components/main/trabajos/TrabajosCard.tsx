import { TrabajoCard } from "../../../components/main/trabajos/TrabajoCard";
import type { ITrabajo } from "../../../model/interfaces/ITrabajo";
// Añadimos NavLink aquí en el import:
import { NavLink } from "react-router-dom"; 

interface Props {
  trabajos: ITrabajo[];
}

export const TrabajosCard = ({ trabajos }: Props) => {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {
        trabajos.map((trabajo) => (
          // El key se coloca aquí en el NavLink directamente
          <NavLink 
            key={trabajo.id} 
            to={`/trabajos/${trabajo.id}`} 
            className="cursor-pointer hover:scale-105 transition"
          >
            <TrabajoCard trabajo={trabajo} />    
          </NavLink>
        ))
      }
    </div>
  );
};