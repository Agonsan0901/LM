import { useState } from "react";
import { supabase } from "../lib/supabase";

export const Contacto = () => {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    mensaje: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setSuccess(false);
    setErrorMsg(null);

    try {
      const { error: supabaseError } = await supabase
        .from("mensajes")
        .insert([
          {
            nombre: form.nombre,
            email: form.email,
            mensaje: form.mensaje,
          },
        ]);

      if (supabaseError) throw supabaseError;

      setSuccess(true);
      setForm({ nombre: "", email: "", mensaje: "" });
    } catch (error: any) {
      console.error("Error:", error);
      setErrorMsg(error?.message || "Error al enviar el mensaje");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-3xl mx-auto py-20 px-6">
      <h1 className="text-5xl font-bold text-center mb-10">Contacto</h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-slate-800 p-6 rounded-xl shadow-lg"
      >
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={form.nombre}
          onChange={handleChange}
          className="w-full p-3 rounded bg-slate-900 text-white"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-3 rounded bg-slate-900 text-white"
          required
        />

        <textarea
          name="mensaje"
          placeholder="Mensaje"
          value={form.mensaje}
          onChange={handleChange}
          rows={5}
          className="w-full p-3 rounded bg-slate-900 text-white"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 transition py-3 rounded font-medium"
        >
          {loading ? "Enviando..." : "Enviar"}
        </button>

        {errorMsg && (
          <p className="text-red-400 text-center">✗ {errorMsg}</p>
        )}

        {success && (
          <p className="text-green-400 text-center">
            Mensaje enviado correctamente ✔
          </p>
        )}
      </form>
    </section>
  );
};