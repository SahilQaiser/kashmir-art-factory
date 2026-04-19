-- D1 (SQLite) schema for Kashmir Art Factory

-- ─── Form submissions ────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS custom_orders (
  id TEXT PRIMARY KEY,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  product_type TEXT NOT NULL,
  description TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new'
);

CREATE TABLE IF NOT EXISTS contact_messages (
  id TEXT PRIMARY KEY,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL
);

-- ─── Site content ─────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  image TEXT NOT NULL,
  tag TEXT,
  featured INTEGER NOT NULL DEFAULT 0,
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS collections (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image TEXT NOT NULL,
  tag TEXT,
  piece_count TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS testimonials (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  quote TEXT NOT NULL,
  stars INTEGER NOT NULL DEFAULT 5,
  sort_order INTEGER NOT NULL DEFAULT 0
);

-- ─── Seed: collections ────────────────────────────────────────────────────────

INSERT OR IGNORE INTO collections (slug, title, description, image, tag, piece_count, sort_order) VALUES
  ('engravings',  'Carved Engravings',   'Intricate relief carvings — mandala art, rose panels, horse engravings — each piece a study in depth and detail.', '/assets/mandala.jpg',   'Bestseller',   '50+ pieces', 1),
  ('calligraphy', 'Islamic Calligraphy', 'Allah, Bismillah, Mashaallah — beautifully carved in walnut wood and premium engraved plaques.',                    '/assets/bismillah2.jpg','Most Gifted',  '30+ designs', 2),
  ('quote-art',   'Quote Wall Art',      'Laser-cut motivational and home decor pieces on rich felt backgrounds — personal and meaningful.',                   '/assets/love.jpg',      NULL,           '80+ designs', 3),
  ('clocks',      'Clocks & 3D Art',     'Handcrafted wooden wall clocks, desk clocks, and standout 3D sculptures for the modern home.',                       '/assets/clock2.jpg',    'New Arrivals', '20+ pieces',  4);

-- ─── Seed: products ───────────────────────────────────────────────────────────

INSERT OR IGNORE INTO products (id, name, category, description, image, tag, featured, sort_order) VALUES
  -- Carved Engravings
  ('KAF-101', 'Layered Mandala',        'Carved Engravings', 'Multi-layer mandala in walnut — each ring precisely cut to create dramatic shadow and depth.',               '/assets/mandala.jpg',         'Bestseller', 1, 10),
  ('KAF-103', 'Horse Relief Panel',     'Carved Engravings', 'High-relief horse carving in blue-patinated walnut with fine texture detail. Ready to hang.',                '/assets/horse_engraving.jpg', NULL,         1, 20),
  ('KAF-106', 'Rose Carved Panel',      'Carved Engravings', 'Intricate rose bouquet relief in dark-stained wood — a timeless piece for gifting.',                         '/assets/engraved_wall_art.jpg',NULL,        0, 30),
  ('KAF-107', 'Geometric Star Carving', 'Carved Engravings', 'Layered geometric star pattern with deep relief cuts — inspired by traditional Kashmiri motifs.',            '/assets/art1.jpg',            NULL,         0, 40),

  -- Islamic Calligraphy
  ('KAF-201', 'Allah — Engraved Plaque',  'Islamic Calligraphy', 'Beautifully engraved "Allah" in Arabic calligraphy on a rich walnut board with decorative borders.',              '/assets/allah.jpg',     'Most Gifted', 0, 50),
  ('KAF-202', 'Allah — Ornate Frame',     'Islamic Calligraphy', 'Engraved Allah calligraphy set within an ornate carved frame — premium finish, ready to display.',               '/assets/allah2.jpg',    NULL,          0, 60),
  ('KAF-203', 'Bismillah — Natural Walnut','Islamic Calligraphy','Clean, deep-engraved Bismillah on a natural walnut board. Minimal and elegant.',                                '/assets/bismillah.jpg', NULL,          0, 70),
  ('KAF-204', 'Bismillah — Bordered Plaque','Islamic Calligraphy','Deep-engraved Bismillah on natural walnut with decorative corner borders and rich wood grain.',               '/assets/bismillah2.jpg',NULL,          1, 80),
  ('KAF-205', 'Mashaallah Plaque',         'Islamic Calligraphy','Mashaallah in flowing Arabic script, engraved on a premium walnut board. A meaningful home piece.',            '/assets/mashaallah.jpg',NULL,          0, 90),

  -- Quote Wall Art
  ('KAF-301', '"Do What You Love"', 'Quote Wall Art', 'Laser-cut walnut lettering on green felt in a natural pine shadow box frame.',                            '/assets/love.jpg',      NULL,  1, 100),
  ('KAF-302', '"Relax"',            'Quote Wall Art', 'Minimalist laser-cut "Relax" on felt — a calm, simple piece for a bedroom or living room.',               '/assets/relax.jpg',     NULL,  0, 110),
  ('KAF-303', '"Adventure"',        'Quote Wall Art', 'Laser-cut adventure quote art on felt background — perfect for a travel enthusiast.',                      '/assets/adventure.jpg', NULL,  0, 120),
  ('KAF-304', '"Good Vibes"',       'Quote Wall Art', 'Uplifting quote wall art — laser-cut on felt in a clean shadow box. Great for gifting.',                  '/assets/vibes.jpg',     NULL,  0, 130),
  ('KAF-305', '"Home"',             'Quote Wall Art', 'A simple, warm "Home" piece in laser-cut walnut on felt. Makes any house feel like home.',                '/assets/home.jpg',      NULL,  0, 140),
  ('KAF-306', '"Today"',            'Quote Wall Art', 'Minimal motivational word art — laser-cut on rich felt in a natural wood frame.',                         '/assets/today.jpg',     NULL,  0, 150),
  ('KAF-307', '"Be" — Word Art',    'Quote Wall Art', 'Bold, simple laser-cut "Be" on felt. A quiet reminder that lands beautifully on any wall.',               '/assets/be.jpg',        NULL,  0, 160),
  ('KAF-308', 'RPT Quote Set',      'Quote Wall Art', 'A curated multi-piece quote set — laser-cut on felt, designed to be displayed together.',                 '/assets/rpt.jpg',       'Set', 0, 170),

  -- Clocks & 3D Art
  ('KAF-401', 'KAF Round Wall Clock',    'Clocks & 3D Art', 'Kashmir Art Factory branded clock with woven-border pattern in natural pine. Quartz movement.',          '/assets/clock2.jpg', 'New Arrival', 1, 180),
  ('KAF-402', 'Ornate Wall Clock',       'Clocks & 3D Art', 'Decorative round wall clock with carved ornate border — a statement piece for any room.',               '/assets/clock3.jpg', NULL,          0, 190),
  ('KAF-403', 'Desk Clock',             'Clocks & 3D Art', 'Compact wooden desk clock with clean lines — handcrafted for a workspace or bedside table.',            '/assets/clocl.jpg',  NULL,          0, 200),
  ('KAF-404', 'Eiffel Tower 3D Model',  'Clocks & 3D Art', 'Precision laser-cut Eiffel Tower model in layered wood — a standout 3D sculpture for any shelf.',      '/assets/eiffel.jpg', NULL,          0, 210);

CREATE TABLE IF NOT EXISTS videos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  video_path TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0
);

-- ─── Seed: videos ─────────────────────────────────────────────────────────────

INSERT OR IGNORE INTO videos (title, description, video_path, sort_order) VALUES
  ('Handcrafted Lamps', 'Our workshop brings traditional Kashmiri lamp-making to life — every curve carved by hand.', '/assets/vids/lamps.mp4', 1),
  ('The Craft in Motion', 'A glimpse into the making — from raw walnut to finished art, every step intentional.', '/assets/vids/game1.mp4', 2);

-- ─── Seed: testimonials ───────────────────────────────────────────────────────

INSERT OR IGNORE INTO testimonials (name, role, quote, stars, sort_order) VALUES
  ('Sarah Mitchell',    'Interior Designer, London',  'The carved wall panel I commissioned for a client''s dining room has become the centrepiece of the space. The level of detail and craftsmanship is extraordinary — nothing like it available in the UK.', 5, 1),
  ('Rahul Mehta',       'Architect, Mumbai',           'I''ve sourced bespoke pieces from Kashmir Art Factory for three luxury residential projects now. Every time, the quality exceeds expectations and the team is incredibly professional.',                   5, 2),
  ('Amelia Johansson',  'Homeowner, Stockholm',        'We ordered a custom chinar-motif panel for our living room. The communication throughout the process was wonderful, and the finished piece is absolutely breathtaking.',                                   5, 3);

CREATE TABLE IF NOT EXISTS media_mentions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  video_url TEXT NOT NULL,
  title TEXT NOT NULL,
  source TEXT NOT NULL,
  description TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0
);

-- ─── Seed: media_mentions ───────────────────────────────────────────────────

INSERT OR IGNORE INTO media_mentions (video_url, title, source, description, sort_order) VALUES
  ('https://www.youtube.com/watch?v=8pIn2078z5Q', 'Art of Woodworking in Kashmir', 'The Kashmir Monitor', 'Exploring the intricate craftsmanship and the story behind Kashmir Art Factory''s rise in the valley.', 1);
