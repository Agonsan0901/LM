import { useState } from "react";
import { Trash2 } from "lucide-react";
import { useStore } from "../../Context/StoreContext";

export default function AdminMensajes() {
  const { mensajes, deleteMensaje, loading } = useStore();
  const [saving, setSaving] = useState(false);

  if (loading) {
    return (
      <div className="apage">
        <p className="aempty">Cargando mensajes desde Supabase...</p>
      </div>
    );
  }

  const handleEliminar = async (id: number) => {
    if (!confirm("¿Seguro que quieres eliminar este mensaje?")) return;
    try {
      setSaving(true);
      await deleteMensaje(id);
    } catch (err) {
      alert("Error al eliminar el mensaje");
    } finally {
      setSaving(false);
    }
  };

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
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {mensajes.map((m) => (
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