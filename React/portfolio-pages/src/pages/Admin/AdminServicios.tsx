import { useState, useEffect } from "react";
import { Trash2, Plus, List } from "lucide-react";
import { supabase } from "../../lib/supabase";

const EMPTY = {
  nombre: "",
  descripcion: "",
  tipo: "",
  imagen: "",
  caracteristicas: ""
};

export default function AdminServicios() {
  const [servicios, setServicios] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [vista, setVista] = useState<"lista" | "nuevo">("lista");
  const [form, setForm] = useState(EMPTY);
  const [ok, setOk] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [saving, setSaving] = useState(false);

  const fetchServicios = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("servicios").select("*");
    if (data) setServicios(data);
    if (error) console.error("Error al cargar servicios:", error);
    setLoading(false);
  };

  useEffect(() => {
    fetchServicios();
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const onSubmit = async () => {
    if (!form.nombre.trim()) return;

    try {
      setSaving(true);
      setErrMsg("");

      const { error } = await supabase.from("servicios").insert([
        {
          nombre: form.nombre,
          descripcion: form.descripcion,
          tipo: form.tipo,
          imagen: form.imagen,
          caracteristicas: form.caracteristicas,
        },
      ]);

      if (error) throw error;

      setForm(EMPTY);
      setOk(true);
      fetchServicios();

      setTimeout(() => {
        setOk(false);
        setVista("lista");
      }, 1400);
    } catch (err: any) {
      setErrMsg(err?.message || "Error al guardar el servicio");
    } finally {
      setSaving(false);
    }
  };

  const deleteServicio = async (id: number) => {
    if (!confirm("¿Eliminar este servicio?")) return;
    const { error } = await supabase.from("servicios").delete().eq("id", id);
    if (!error) fetchServicios();
  };

  if (loading) return <div className="apage"><p className="aempty">Cargando datos...</p></div>;

  return (
    <div className="apage">
      <div className="apage__header">
        <div>
          <h1 className="apage__titulo">Servicios</h1>
          <p className="apage__sub">{servicios.length} servicios en Supabase</p>
        </div>
        <div className="apage__btns">
          <button className={`apage__tab ${vista === "lista" ? "apage__tab--on" : ""}`} onClick={() => setVista("lista")}><List size={13} /> Listado</button>
          <button className={`apage__tab ${vista === "nuevo" ? "apage__tab--on" : ""}`} onClick={() => setVista("nuevo")}><Plus size={13} /> Nuevo</button>
        </div>
      </div>

      {vista === "lista" && (
        <table className="atable">
          <thead>
            <tr><th>Nombre</th><th>Tipo</th><th>Características</th><th></th></tr>
          </thead>
          <tbody>
            {servicios.map((s) => (
              <tr key={s.id}>
                <td className="atable__main">{s.nombre}</td>
                <td><span className="abadge">{s.tipo}</span></td>
                <td>{s.caracteristicas}</td>
                <td>
                  <button className="adel" onClick={() => deleteServicio(s.id)}><Trash2 size={13} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {vista === "nuevo" && (
        <div className="aform">
          <h2 className="aform__titulo">Insertar Nuevo Servicio</h2>
          <input name="nombre" value={form.nombre} onChange={onChange} placeholder="Nombre" />
          <input name="tipo" value={form.tipo} onChange={onChange} placeholder="Tipo" />
          <input name="imagen" value={form.imagen} onChange={onChange} placeholder="Imagen URL" />
          <input name="descripcion" value={form.descripcion} onChange={onChange} placeholder="Descripción" />
          <input name="caracteristicas" value={form.caracteristicas} onChange={onChange} placeholder="Características (coma)" />
          
          {errMsg && <div className="aform__err">✗ {errMsg}</div>}
          {ok && <div className="aform__ok">✓ Servicio guardado correctamente</div>}

          <button className="aform__submit" onClick={onSubmit} disabled={saving}>
            {saving ? "Guardando..." : "Insertar Servicio"}
          </button>
        </div>
      )}
    </div>
  );
}