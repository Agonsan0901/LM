import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import { supabase } from "../lib/supabase";

import type { IProducto } from "../model/interfaces/IProducto";
import type { ITrabajo } from "../model/interfaces/ITrabajo";

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

  useEffect(() => {
    cargarTodo();

    const channel = supabase
      ?.channel("portfolio-realtime")
      .on("postgres_changes", { event: "*", schema: "public", table: "productos" }, cargarProductos)
      .on("postgres_changes", { event: "*", schema: "public", table: "trabajos" }, cargarTrabajos)
      .on("postgres_changes", { event: "*", schema: "public", table: "servicios" }, cargarServicios)
      .on("postgres_changes", { event: "*", schema: "public", table: "mensajes" }, cargarMensajes) 
      .subscribe();

    return () => {
      if (channel) supabase?.removeChannel(channel);
    };
  }, []);

  async function cargarTodo() {
    setLoading(true);
    try {
      // Usamos Promise.allSettled para asegurar que si una petición falla, las demás continúen
      await Promise.allSettled([
        cargarProductos(), 
        cargarTrabajos(), 
        cargarServicios(),
        cargarMensajes() 
      ]);
    } catch (err) {
      console.error("Error en la carga inicial de datos:", err);
    } finally {
      // Pase lo que pase, garantizamos apagar el estado 'loading'
      setLoading(false);
    }
  }

  async function cargarProductos() {
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
      titulo: prod.Titulo || prod.titulo,
      descripcion: prod.descripcion,
      categoria: prod.Categoria || prod.categoria,
      tecnologias: prod.Tecnologias || prod.tecnologias,
      imagen: prod.imagen
    }));
    setProductos(productosMapeados);
  }

  async function cargarTrabajos() {
    if (!supabase) return;
    const { data, error } = await supabase.from("trabajos").select("*").order("id", { ascending: false });
    if (error) { console.error("Error cargando trabajos", error); setError(error.message); return; }
    setTrabajos(data || []);
  }

  async function cargarServicios() {
    if (!supabase) return;
    const { data, error } = await supabase.from("servicios").select("*").order("id", { ascending: false });
    if (error) { console.error("Error cargando servicios", error); setError(error.message); return; }
    
    const serviciosMapeados: IServicio[] = (data || []).map((s: any) => ({
      id: s.id,
      nombre: s.titulo, 
      descripcion: s.descripcion,
      tipo: s.categoria, 
      precio: 0,
      icono: "",
      imagen: s.imagen,
      caracteristicas: s.tecnologias ? s.tecnologias.join(", ") : "" 
    }));

    setServicios(serviciosMapeados);
  }

  async function cargarMensajes() {
    if (!supabase) return;
    const { data, error } = await supabase.from("mensajes").select("*").order("id", { ascending: false });
    if (error) { console.error("Error cargando mensajes", error); setError(error.message); return; }
    setMensajes(data || []);
  }

  async function addProducto(producto: Omit<IProducto, "id">) {
    if (!supabase) throw new Error("Supabase no está configurado");
    const { data, error } = await supabase.from("productos").insert({
      Titulo: producto.titulo,
      descripcion: producto.descripcion,
      Categoria: producto.categoria,
      Tecnologias: producto.tecnologias,
      imagen: producto.imagen || null,
    }).select().single();
    if (error) throw error;
    if (data) {
      const nuevoProducto: IProducto = {
        id: data.id,
        titulo: data.Titulo,
        descripcion: data.descripcion,
        categoria: data.Categoria,
        tecnologias: data.Tecnologias,
        imagen: data.imagen
      };
      setProductos((prev) => [nuevoProducto, ...prev]);
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
    }).select().single();
    if (error) throw error;
    if (data) setTrabajos((prev) => [data, ...prev]);
  }

  async function addServicio(servicio: Omit<IServicio, "id">) {
    if (!supabase) throw new Error("Supabase no está configurado");
    
    const { data, error } = await supabase.from("servicios").insert({
      titulo: servicio.nombre, 
      descripcion: servicio.descripcion,
      categoria: servicio.tipo, 
      imagen: servicio.imagen || null,
      tecnologias: servicio.caracteristicas
        ? servicio.caracteristicas.split(",").map((t) => t.trim()).filter(Boolean)
        : [], 
    }).select().single();
    
    if (error) throw error;
    if (data) {
      const nuevoServicio: IServicio = {
        id: data.id,
        nombre: data.titulo,
        descripcion: data.descripcion,
        tipo: data.categoria,
        precio: 0,
        icono: "",
        imagen: data.imagen,
        caracteristicas: data.tecnologias ? data.tecnologias.join(", ") : ""
      };
      setServicios((prev) => [nuevoServicio, ...prev]);
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