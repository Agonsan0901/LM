import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://dalhavhdmariibfwuvmm.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRhbGhhdmhkbWFyaWliZnd1dm1tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA4MTk4MzQsImV4cCI6MjA5NjM5NTgzNH0.oDRBVNLWEI4FFqzWVccqwUiHp3VnGlLWk1zudHJR1qs'
)

const { error } = await supabase.from('experiencias').select('id').limit(1)

if (error) {
  console.log('❌ Tabla no existe. Ejecuta este SQL en:')
  console.log('👉 https://supabase.com/dashboard/project/dalhavhdmariibfwuvmm/sql/new\n')
  console.log(`
create table experiencias (
  id bigint generated always as identity primary key,
  empresa text not null,
  puesto text not null,
  periodo text not null,
  descripcion text not null,
  tags text[] default '{}',
  activo boolean default true,
  orden int default 0,
  created_at timestamptz default now()
);

alter table experiencias enable row level security;

create policy "Leer experiencias" on experiencias for select to anon using (true);
create policy "Insertar experiencias" on experiencias for insert to anon with check (true);
create policy "Actualizar experiencias" on experiencias for update to anon using (true);
create policy "Eliminar experiencias" on experiencias for delete to anon using (true);

grant select, insert, update, delete on experiencias to anon;

insert into experiencias (empresa, puesto, periodo, descripcion, tags, activo, orden) values
('Empresa ABC', 'Técnico de Implantación de Sistemas', '2023 - Actualidad', 'Implantación y configuración de sistemas informáticos en entornos empresariales. Soporte técnico y resolución de incidencias.', ARRAY['Windows Server', 'VMware', 'Redes'], true, 1),
('Startup XYZ', 'Administrador de Base de Datos', '2021 - 2023', 'Gestión y mantenimiento de bases de datos relacionales con MySQL y SQL Server. Optimización de consultas y copias de seguridad.', ARRAY['MySQL', 'SQL Server', 'Backups'], true, 2);
  `)
} else {
  console.log('✅ Tabla experiencias OK')
}
