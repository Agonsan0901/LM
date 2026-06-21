import { useState, useEffect } from "react";
import { Trash2 } from "lucide-react";
import { supabase } from "../../lib/supabase";
import type { IMensaje } from "../../model/interfaces/IMensaje";

export default function AdminContactos() {
  const [mensajes, setMensajes] = useState<IMensaje[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Función para obtener los mensajes de la tabla "mensajes"
  const fetchMensajes = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("mensajes")
      .select("*")
      .order("created_at", { ascending: false });
    
    if (data) setMensajes(data);
    if (error) console.error("Error al cargar mensajes:", error);
    setLoading(false);
  };

  useEffect(() => {
    fetchMensajes();
  }, []);

  const handleEliminar = async (id: number) => {
    if (!confirm("¿Seguro que quieres eliminar este mensaje?")) return;
    
    try {
      setSaving(true);
      const { error } = await supabase.from("mensajes").delete().eq("id", id);
      
      if (error) throw error;
      
      // Actualizamos la lista después de eliminar
      fetchMensajes();
    } catch (err) {
      alert("Error al eliminar el mensaje");
    } finally {
      setSaving(false);
    }
  };

  if (loading)
    return (
      <div className="apage">
        <p className="aempty">Cargando mensajes desde Supabase...</p>
      </div>
    );

  return (
    <div className="apage">
      <div className="apage__header">
        <div>
          <h1 className="apage__titulo">Mensajes de Contacto</h1>
          <p className="apage__sub">
            {mensajes.length} mensajes recibidos en Supabase
          </p>
        </div>
      </div>

      <div className="atable-wrap">
        {mensajes.length === 0 ? (
          <p className="aempty">No hay mensajes pendientes en la bandeja de entrada.</p>
        ) : (
          <table className="atable">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Remitente</th>
                <th>Email</th>
                <th>Mensaje</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {mensajes.map((m: IMensaje) => (
                <tr key={m.id}>
                  <td>
                    {m.created_at ? new Date(m.created_at).toLocaleDateString() : "-"}
                  </td>
                  <td className="atable__main">{m.nombre}</td>
                  <td>
                    <span className="abadge">{m.email}</span>
                  </td>
                  <td>{m.mensaje}</td>
                  <td>
                    <button
                      className="adel"
                      onClick={() => handleEliminar(m.id)}
                      disabled={saving}
                    >
                      <Trash2 size={13} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}