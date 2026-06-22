import { ProductoCard } from "../productos/ProductoCard";
import type { IProducto } from "../../../model/interfaces/IProducto";
import { NavLink } from "react-router-dom";

interface Props {
  productos: IProducto[];
}

export const ProductosCard = ({ productos }: Props) => {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {productos.map((producto) => (
        <NavLink
          key={producto.id}
          to={`/productos/${producto.id}`}
          className="cursor-pointer hover:scale-105 transition"
        >
          <ProductoCard
            producto={producto}
          />
        </NavLink>
      ))}
    </div>
  );
};