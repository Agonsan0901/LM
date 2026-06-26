import { useState, useEffect } from "react";
import { Trash2, Plus, List } from "lucide-react";
import { supabase } from "../../lib/supabase";

const EMPTY = {
  titulo: "",
  descripcion: "",
  categoria: "",
  tecnologias: "",
  imagen: ""
};

export default function AdminTrabajos() {
  const [trabajos, setTrabajos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [vista, setVista] = useState<"lista" | "nuevo">("lista");
  const [form, setForm] = useState(EMPTY);
  const [ok, setOk] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [saving, setSaving] = useState(false);

  // Función para cargar datos desde Supabase
  const fetchTrabajos = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("trabajos").select("*");
    if (data) setTrabajos(data);
    if (error) console.error("Error al cargar:", error);
    setLoading(false);
  };

  useEffect(() => {
    fetchTrabajos();
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const onSubmit = async () => {
    if (!form.titulo.trim()) return;

    try {
      setSaving(true);
      setErrMsg("");

      const { error } = await supabase.from("trabajos").insert([
        {
          titulo: form.titulo,
          descripcion: form.descripcion,
          categoria: form.categoria,
          tecnologias: form.tecnologias.split(",").map((t) => t.trim()).filter(Boolean),
          imagen: form.imagen,
        },
      ]);

      if (error) throw error;

      setForm(EMPTY);
      setOk(true);
      fetchTrabajos(); // Recargamos la lista

      setTimeout(() => {
        setOk(false);
        setVista("lista");
      }, 1400);
    } catch (err: any) {
      setErrMsg(err?.message || "Error al guardar el trabajo");
    } finally {
      setSaving(false);
    }
  };

  const deleteTrabajo = async (id: number) => {
    const { error } = await supabase.from("trabajos").delete().eq("id", id);
    if (!error) fetchTrabajos();
  };

  if (loading) return <div className="apage"><p className="aempty">Cargando datos desde Supabase...</p></div>;

  return (
    <div className="apage">
      <div className="apage__header">
        <div>
          <h1 className="apage__titulo">Trabajos</h1>
          <p className="apage__sub">{trabajos.length} trabajos en Supabase</p>
        </div>
        <div className="apage__btns">
          <button className={`apage__tab ${vista === "lista" ? "apage__tab--on" : ""}`} onClick={() => setVista("lista")}><List size={13} /> Listado</button>
          <button className={`apage__tab ${vista === "nuevo" ? "apage__tab--on" : ""}`} onClick={() => setVista("nuevo")}><Plus size={13} /> Nuevo</button>
        </div>
      </div>

      {vista === "lista" && (
        <table className="atable">
          <tbody>
            {trabajos.map((t) => (
              <tr key={t.id}>
                <td>{t.titulo}</td>
                <td><span className="abadge">{t.categoria}</span></td>
                <td>{Array.isArray(t.tecnologias) ? t.tecnologias.join(", ") : t.tecnologias}</td>
                <td>
                  <button className="adel" onClick={() => deleteTrabajo(t.id)}><Trash2 size={13} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {vista === "nuevo" && (
        <div className="aform">
          <input name="titulo" value={form.titulo} onChange={onChange} placeholder="Título" />
          <input name="categoria" value={form.categoria} onChange={onChange} placeholder="Categoría" />
          <input name="tecnologias" value={form.tecnologias} onChange={onChange} placeholder="Tecnologías (separadas por coma)" />
          <input name="imagen" value={form.imagen} onChange={onChange} placeholder="URL Imagen" />
          <input name="descripcion" value={form.descripcion} onChange={onChange} placeholder="Descripción" />
          
          {errMsg && <div className="aform__err">✗ {errMsg}</div>}
          {ok && <div className="aform__ok">✓ Trabajo guardado correctamente</div>}

          <button className="aform__submit" onClick={onSubmit} disabled={saving}>
            {saving ? "Guardando..." : "Insertar Trabajo"}
          </button>
        </div>
      )}
    </div>
  );
}