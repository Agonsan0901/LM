import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://dalhavhdmariibfwuvmm.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRhbGhhdmhkbWFyaWliZnd1dm1tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA4MTk4MzQsImV4cCI6MjA5NjM5NTgzNH0.oDRBVNLWEI4FFqzWVccqwUiHp3VnGlLWk1zudHJR1qs'
)

const { error } = await supabase.from('ordenadores').select('id').limit(1)

if (error) {
  console.log('❌ Tabla no existe:', error.message)
  console.log(`
👉 Ejecuta este SQL en: https://supabase.com/dashboard/project/dalhavhdmariibfwuvmm/sql/new

create table ordenadores (
  id bigint generated always as identity primary key,
  nombre text not null,
  marca text not null,
  categoria text not null,
  precio numeric not null,
  descripcion text,
  especificaciones jsonb,
  imagen_url text,
  stock int default 0,
  destacado boolean default false,
  created_at timestamptz default now()
);

alter table ordenadores enable row level security;

create policy "Permitir leer ordenadores"
on ordenadores for select to anon using (true);

grant select on ordenadores to anon;

insert into ordenadores (nombre, marca, categoria, precio, descripcion, especificaciones, imagen_url, stock, destacado) values
('MacBook Pro M3', 'Apple', 'Portátil', 1999, 'El portátil más potente de Apple con chip M3.', '{"RAM": "16GB", "Almacenamiento": "512GB SSD", "Pantalla": "14 pulgadas", "Procesador": "Apple M3"}', '', 5, true),
('Dell XPS 15', 'Dell', 'Portátil', 1599, 'Portátil premium con pantalla OLED 4K.', '{"RAM": "32GB", "Almacenamiento": "1TB SSD", "Pantalla": "15.6 OLED 4K", "Procesador": "Intel i9"}', '', 3, true),
('Gaming PC RTX 4080', 'Custom', 'Sobremesa', 2499, 'PC gaming de alto rendimiento para 4K.', '{"RAM": "32GB DDR5", "Almacenamiento": "2TB NVMe", "GPU": "RTX 4080", "Procesador": "AMD Ryzen 9"}', '', 2, true),
('Lenovo ThinkPad X1', 'Lenovo', 'Portátil', 1299, 'El portátil empresarial más fiable del mercado.', '{"RAM": "16GB", "Almacenamiento": "512GB SSD", "Pantalla": "14 pulgadas FHD", "Procesador": "Intel i7"}', '', 8, false),
('iMac 24 M3', 'Apple', 'Sobremesa', 1499, 'Todo en uno con diseño premium y pantalla Retina.', '{"RAM": "8GB", "Almacenamiento": "256GB SSD", "Pantalla": "24 pulgadas 4.5K", "Procesador": "Apple M3"}', '', 4, false),
('ASUS ROG Zephyrus', 'ASUS', 'Gaming', 1799, 'Portátil gaming ultradelgado con RTX 4070.', '{"RAM": "16GB", "Almacenamiento": "1TB SSD", "GPU": "RTX 4070", "Procesador": "AMD Ryzen 9"}', '', 6, true),
('HP Pavilion 15', 'HP', 'Portátil', 699, 'Portátil equilibrado para uso diario y trabajo.', '{"RAM": "8GB", "Almacenamiento": "512GB SSD", "Pantalla": "15.6 FHD", "Procesador": "Intel i5"}', '', 12, false),
('PC Oficina Intel i5', 'Custom', 'Sobremesa', 549, 'Sobremesa compacto ideal para oficina.', '{"RAM": "16GB", "Almacenamiento": "512GB SSD", "GPU": "Intel UHD", "Procesador": "Intel i5"}', '', 15, false);
  `)
} else {
  console.log('✅ Tabla ordenadores OK')
}
