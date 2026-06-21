import { useEffect, useState } from "react";
import { Trash2, Plus, List } from "lucide-react";
import { supabase } from "../../lib/supabase";

const EMPTY = {
  titulo: "",
  descripcion: "",
  categoria: "",
  tecnologias: "",
  imagen: ""
};

export default function AdminProductos() {
  const [productos, setProductos] = useState<any[]>([]);
  const [vista, setVista] = useState<"lista" | "nuevo">("lista");
  const [form, setForm] = useState(EMPTY);
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [ok, setOk] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const getProductos = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("productos")
        .select("*");
      
      if (error) throw error;
      setProductos(data || []);
    } catch (err: any) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProductos();
  }, []);

  if (loading) {
    return (
      <div className="apage">
        <p className="aempty">Cargando datos desde Supabase...</p>
      </div>
    );
  }

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

      const { error } = await supabase
        .from("productos")
        .insert([
          {
            titulo: form.titulo,
            descripcion: form.descripcion,
            categoria: form.categoria,
            tecnologias: form.tecnologias,
            imagen: form.imagen,
          }
        ]);

      if (error) throw error;

      setForm(EMPTY);
      setOk(true);
      await getProductos();

      setTimeout(() => {
        setOk(false);
        setVista("lista");
      }, 1400);

    } catch (err: any) {
      setErrMsg(err?.message || "Error al guardar el producto");
    } finally {
      setSaving(false);
    }
  };

  const deleteProducto = async (id: number) => {
    if (!window.confirm("¿Estás seguro de eliminar este producto?")) return;
    
    try {
      setSaving(true);
      const { error } = await supabase
        .from("productos")
        .delete()
        .eq("id", id);

      if (error) throw error;
      await getProductos();
    } catch (err: any) {
      alert(err?.message || "Error al eliminar el producto");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="apage">
      <div className="apage__header">
        <div>
          <h1 className="apage__titulo">Productos</h1>
          <p className="apage__sub">
            {productos.length} productos en Supabase
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
          {productos.length === 0 ? (
            <p className="aempty">No hay productos. Pulsa "Nuevo" para añadir uno.</p>
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
                {productos.map((p: any) => (
                  <tr key={p.id}>
                    <td className="atable__main">{p.titulo || p.nombre}</td>
                    <td>
                      <span className="abadge">{p.categoria || p.tipo || "General"}</span>
                    </td>
                    <td>
                      {Array.isArray(p.tecnologias) 
                        ? p.tecnologias.join(", ") 
                        : String(p.tecnologias || "")}
                    </td>
                    <td>
                      <button
                        className="adel"
                        onClick={() => deleteProducto(p.id)}
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
      )}

      {vista === "nuevo" && (
        <div className="aform-wrap">
          <div className="aform">
            <h2 className="aform__titulo">Insertar Nuevo Producto</h2>

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
            {ok && <div className="aform__ok">✓ Producto guardado correctamente</div>}

            <button className="aform__submit" onClick={onSubmit} disabled={saving}>
              {saving ? "Guardando..." : "Insertar Producto"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}