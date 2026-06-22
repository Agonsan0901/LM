import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";

import { supabase } from "../lib/supabase";

export interface IProducto {
  id: number;
  titulo: string;
  descripcion: string;
  categoria: string;
  tecnologias: string | string[];
  imagen: string;
}

export interface ITrabajo {
  id: number;
  titulo: string;
  descripcion: string;
  categoria: string;
  tecnologias: string | string[];
  imagen: string;
}

export interface IServicio {
  id: number;
  nombre: string;
  descripcion: string;
  tipo: string;
  precio: number;
  icono: string;
  imagen: string;
  caracteristicas: string; 
}

export interface IMensaje {
  id: number;
  nombre: string;
  email: string;
  mensaje: string;
  created_at?: string;
}

import dataProductosLocal from "../model/data/productos.json";

interface Store {
  productos: IProducto[];
  trabajos: ITrabajo[];
  servicios: IServicio[];
  mensajes: IMensaje[]; 
  loading: boolean;
  error: string | null;
  addProducto: (producto: Omit<IProducto, "id">) => Promise<void>;
  addTrabajo: (trabajo: Omit<ITrabajo, "id">) => Promise<void>;
  addServicio: (servicio: Omit<IServicio, "id">) => Promise<void>;
  deleteProducto: (id: number) => Promise<void>;
  deleteTrabajo: (id: number) => Promise<void>;
  deleteServicio: (id: number) => Promise<void>;
  deleteMensaje: (id: number) => Promise<void>; 
}

const StoreContext = createContext<Store>({
  productos: [],
  trabajos: [],
  servicios: [],
  mensajes: [], 
  loading: true,
  error: null,
  addProducto: async () => {},
  addTrabajo: async () => {},
  addServicio: async () => {},
  deleteProducto: async () => {},
  deleteTrabajo: async () => {},
  deleteServicio: async () => {},
  deleteMensaje: async () => {}, 
});

export function StoreProvider({ children }: { children: ReactNode }) {
  const [productos, setProductos] = useState<IProducto[]>([]);
  const [trabajos, setTrabajos] = useState<ITrabajo[]>([]);
  const [servicios, setServicios] = useState<IServicio[]>([]);
  const [mensajes, setMensajes] = useState<IMensaje[]>([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 1. Memorizar funciones de carga para evitar bucles de referencia en memoria
  const cargarProductos = useCallback(async () => {
    try {
      if (!supabase) {
        setProductos(dataProductosLocal as IProducto[]);
        return;
      }
      const { data, error } = await supabase.from("productos").select("*").order("id", { ascending: false });
      if (error || !data || data.length === 0) {
        setProductos(dataProductosLocal as IProducto[]);
        return;
      }
      const productosMapeados: IProducto[] = data.map((prod: any) => ({
        id: prod.id,
        titulo: prod.Titulo || prod.titulo || "Sin título",
        descripcion: prod.descripcion || "",
        categoria: prod.Categoria || prod.categoria || "General",
        tecnologias: prod.Tecnologias || prod.tecnologias || [],
        imagen: prod.imagen || ""
      }));
      setProductos(productosMapeados);
    } catch (e) {
      console.error("Fallo crítico mapeando productos", e);
      setProductos(dataProductosLocal as IProducto[]);
    }
  }, []);

  const cargarTrabajos = useCallback(async () => {
    try {
      if (!supabase) return;
      const { data, error } = await supabase.from("trabajos").select("*").order("id", { ascending: false });
      if (error) { console.error("Error cargando trabajos", error); setError(error.message); return; }
      setTrabajos(data || []);
    } catch (e) {
      console.error("Fallo crítico cargando trabajos", e);
    }
  }, []);

  const cargarServicios = useCallback(async () => {
    try {
      if (!supabase) return;
      const { data, error } = await supabase.from("servicios").select("*").order("id", { ascending: false });
      if (error) { console.error("Error cargando servicios", error); setError(error.message); return; }
      
      const serviciosMapeados: IServicio[] = (data || []).map((s: any) => {
        let stringCaracteristicas = "";
        if (s.tecnologias) {
          stringCaracteristicas = Array.isArray(s.tecnologias) 
            ? s.tecnologias.join(", ") 
            : String(s.tecnologias);
        }

        return {
          id: s.id,
          nombre: s.titulo || "", 
          descripcion: s.descripcion || "",
          tipo: s.categoria || "", 
          precio: s.precio || 0,
          icono: s.icono || "",
          imagen: s.imagen || "",
          caracteristicas: stringCaracteristicas
        };
      });

      setServicios(serviciosMapeados);
    } catch (e) {
      console.error("Fallo crítico mapeando servicios", e);
    }
  }, []);

  const cargarMensajes = useCallback(async () => {
    try {
      if (!supabase) return;
      const { data, error } = await supabase.from("mensajes").select("*").order("id", { ascending: false });
      if (error) { console.error("Error cargando mensajes", error); setError(error.message); return; }
      setMensajes(data || []);
    } catch (e) {
      console.error("Fallo crítico cargando mensajes", e);
    }
  }, []);

  const cargarTodo = useCallback(async () => {
    setLoading(true);
    try {
      await Promise.all([
        cargarProductos().catch(e => console.error(e)),
        cargarTrabajos().catch(e => console.error(e)),
        cargarServicios().catch(e => console.error(e)),
        cargarMensajes().catch(e => console.error(e))
      ]);
    } catch (err) {
      console.error("Error en la carga inicial de datos:", err);
    } finally {
      setLoading(false);
    }
  }, [cargarProductos, cargarTrabajos, cargarServicios, cargarMensajes]);

  // 2. Controlar de forma limpia los efectos de inicialización y realtime
  useEffect(() => {
    cargarTodo();

    if (!supabase) return;

    const channel = supabase
      .channel("portfolio-realtime")
      .on("postgres_changes", { event: "*", schema: "public", table: "productos" }, () => { cargarProductos(); })
      .on("postgres_changes", { event: "*", schema: "public", table: "trabajos" }, () => { cargarTrabajos(); })
      .on("postgres_changes", { event: "*", schema: "public", table: "servicios" }, () => { cargarServicios(); })
      .on("postgres_changes", { event: "*", schema: "public", table: "mensajes" }, () => { cargarMensajes(); }) 
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [cargarTodo, cargarProductos, cargarTrabajos, cargarServicios, cargarMensajes]);

  async function addProducto(producto: Omit<IProducto, "id">) {
    if (!supabase) throw new Error("Supabase no está configurado");
    const { data, error } = await supabase.from("productos").insert({
      Titulo: producto.titulo,
      descripcion: producto.descripcion,
      Categoria: producto.categoria,
      Tecnologias: producto.tecnologias,
      imagen: producto.imagen || null,
    }).select();
    
    if (error) throw error;
    if (data && data.length > 0) {
      const registro = data[0];
      const nuevoProducto: IProducto = {
        id: registro.id,
        titulo: registro.Titulo,
        descripcion: registro.descripcion,
        categoria: registro.Categoria,
        tecnologias: registro.Tecnologias,
        imagen: registro.imagen
      };
      setProductos((prev) => [nuevoProducto, ...prev]);
    } else {
      await cargarProductos();
    }
  }

  async function addTrabajo(trabajo: Omit<ITrabajo, "id">) {
    if (!supabase) throw new Error("Supabase no está configurado");
    const { data, error } = await supabase.from("trabajos").insert({
      titulo: trabajo.titulo,
      descripcion: trabajo.descripcion,
      imagen: trabajo.imagen || null,
      Categoria: trabajo.categoria,
      Tecnologias: trabajo.tecnologias,
    }).select();
    
    if (error) throw error;
    if (data && data.length > 0) {
      setTrabajos((prev) => [data[0], ...prev]);
    } else {
      await cargarTrabajos();
    }
  }

  async function addServicio(servicio: Omit<IServicio, "id">) {
    if (!supabase) throw new Error("Supabase no está configurado");
    
    const { data, error } = await supabase.from("servicios").insert({
      titulo: servicio.nombre, 
      descripcion: servicio.descripcion,
      categoria: servicio.tipo, 
      imagen: servicio.imagen || null,
      tecnologias: servicio.caracteristicas || ""
    }).select();
    
    if (error) throw error;
    if (data && data.length > 0) {
      const registro = data[0];
      const nuevoServicio: IServicio = {
        id: registro.id,
        nombre: registro.titulo,
        descripcion: registro.descripcion,
        tipo: registro.categoria,
        precio: registro.precio || 0,
        icono: registro.icono || "",
        imagen: registro.imagen,
        caracteristicas: registro.tecnologias ? String(registro.tecnologias) : ""
      };
      setServicios((prev) => [nuevoServicio, ...prev]);
    } else {
      await cargarServicios();
    }
  }

  async function deleteProducto(id: number) {
    if (!supabase) return;
    const { error } = await supabase.from("productos").delete().eq("id", id);
    if (error) { console.error("Error borrando producto", error); return; }
    setProductos((prev) => prev.filter((p) => p.id !== id));
  }

  async function deleteTrabajo(id: number) {
    if (!supabase) return;
    const { error } = await supabase.from("trabajos").delete().eq("id", id);
    if (error) { console.error("Error borrando trabajo", error); return; }
    setTrabajos((prev) => prev.filter((t) => t.id !== id));
  }

  async function deleteServicio(id: number) {
    if (!supabase) return;
    const { error } = await supabase.from("servicios").delete().eq("id", id);
    if (error) { console.error("Error borrando servicio", error); return; }
    setServicios((prev) => prev.filter((s) => s.id !== id));
  }

  async function deleteMensaje(id: number) {
    if (!supabase) return;
    const { error } = await supabase.from("mensajes").delete().eq("id", id);
    if (error) { console.error("Error borrando mensaje", error); return; }
    setMensajes((prev) => prev.filter((m) => m.id !== id));
  }

  return (
    <StoreContext.Provider value={{
      productos, trabajos, servicios, mensajes, loading, error,
      addProducto, addTrabajo, addServicio,
      deleteProducto, deleteTrabajo, deleteServicio, deleteMensaje,
    }}>
      {children}
    </StoreContext.Provider>
  );
}

export const useStore = () => useContext(StoreContext);