export interface Experiencia {
  id?: number
  empresa: string
  puesto: string
  periodo: string
  descripcion: string
  tags: string[]
  activo: boolean
  orden: number
  created_at?: string
}

export interface Mensaje {
  id?: number
  nombre: string
  email: string
  asunto: string
  mensaje: string
  created_at?: string
  leido?: boolean
}

export interface Visita {
  id?: number
  pagina: string
  created_at?: string
}

export interface Ordenador {
  id?: number
  nombre: string
  marca: string
  categoria: string
  precio: number
  descripcion: string
  especificaciones: Record<string, string>
  imagen_url: string
  stock: number
  destacado: boolean
  created_at?: string
}
