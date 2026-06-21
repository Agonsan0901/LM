import { useState } from "react";
import { Trash2, Plus, List } from "lucide-react";
import { useStore } from "../../Context/StoreContext";
import type { ITrabajo } from "../../model/interfaces/ITrabajo";

const EMPTY = {
  titulo: "",
  descripcion: "",
  categoria: "",
  tecnologias: "",
  imagen: ""
};

export default function AdminTrabajos() {
  const { trabajos, addTrabajo, deleteTrabajo, loading } = useStore();

  const [vista, setVista] = useState<"lista" | "nuevo">("lista");
  const [form, setForm] = useState(EMPTY);
  const [ok, setOk] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [saving, setSaving] = useState(false);

  if (loading)
    return (
      <div className="apage">
        <p className="aempty">Cargando datos desde Supabase...</p>
      </div>
    );

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((p) => ({
      ...p,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async () => {
    if (!form.titulo.trim()) return;

    try {
      setSaving(true);
      setErrMsg("");

      await addTrabajo({
        titulo: form.titulo,
        descripcion: form.descripcion,
        categoria: form.categoria,
        // CORRECCIÓN: Convierte el string del input en string[] (Array) para Supabase
        tecnologias: form.tecnologias.split(",").map((t) => t.trim()).filter(Boolean),
        imagen: form.imagen,
      });

      setForm(EMPTY);
      setOk(true);

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

  return (
    <div className="apage">
      <div className="apage__header">
        <div>
          <h1 className="apage__titulo">Trabajos</h1>
          <p className="apage__sub">
            {trabajos.length} trabajos en Supabase
          </p>
        </div>

        <div className="apage__btns">
          <button
            className={`apage__tab ${vista === "lista" ? "apage__tab--on" : ""}`}
            onClick={() => setVista("lista")}
          >
            <List size={13} /> Listado
          </button>

          <button
            className={`apage__tab ${vista === "nuevo" ? "apage__tab--on" : ""}`}
            onClick={() => setVista("nuevo")}
          >
            <Plus size={13} /> Nuevo
          </button>
        </div>
      </div>

      {vista === "lista" && (
        <div className="atable-wrap">
          {trabajos.length === 0 ? (
            <p className="aempty">No hay trabajos. Pulsa "Nuevo" para añadir uno.</p>
          ) : (
            <table className="atable">
              <thead>
                <tr>
                  <th>Título</th>
                  <th>Categoría</th>
                  <th>Tecnologías</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {trabajos.map((t: ITrabajo) => (
                  <tr key={t.id}>
                    <td className="atable__main">{t.titulo}</td>
                    <td>
                      <span className="abadge">{t.categoria}</span>
                    </td>
                    <td>{t.tecnologias.join(", ")}</td>
                    <td>
                      <button
                        className="adel"
                        onClick={() => deleteTrabajo(t.id)}
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
      )}

      {vista === "nuevo" && (
        <div className="aform-wrap">
          <div className="aform">
            <h2 className="aform__titulo">Insertar Nuevo Trabajo</h2>

            <div className="aform__grid">
              <div className="aform__field">
                <label>Título</label>
                <input name="titulo" value={form.titulo} onChange={onChange} />
              </div>

              <div className="aform__field">
                <label>Categoría</label>
                <input name="categoria" value={form.categoria} onChange={onChange} />
              </div>

              <div className="aform__field">
                <label>Tecnologías (separadas por coma)</label>
                <input name="tecnologias" value={form.tecnologias} onChange={onChange} placeholder="React, Node.js, Express" />
              </div>

              <div className="aform__field">
                <label>Imagen URL</label>
                <input name="imagen" value={form.imagen} onChange={onChange} />
              </div>

              <div className="aform__field aform__field--full">
                <label>Descripción</label>
                <input name="descripcion" value={form.descripcion} onChange={onChange} />
              </div>
            </div>

            {errMsg && <div className="aform__err">✗ {errMsg}</div>}
            {ok && <div className="aform__ok">✓ Trabajo guardado correctamente</div>}

            <button className="aform__submit" onClick={onSubmit} disabled={saving}>
              {saving ? "Guardando..." : "Insertar Trabajo"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}