import { ServicioCard } from "../servicios/ServicioCard";
import type { IServicio } from "../../../model/interfaces/IServicio";
import { NavLink } from "react-router-dom";

interface Props {
  servicios: IServicio[];
}

export const ServiciosCard = ({ servicios }: Props) => {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {servicios.map((servicio) => (
        <NavLink
          key={servicio.id}
          to={`/servicios/${servicio.id}`}
          className="cursor-pointer hover:scale-105 transition"
        >
          <ServicioCard
            servicio={servicio}
          />
        </NavLink>
      ))}
    </div>
  );
};