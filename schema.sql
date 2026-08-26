
create extension if not exists "uuid-ossp";

create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  goal_weight_kg numeric default 90,
  calorie_goal integer default 2200,
  protein_goal_g integer default 190,
  water_goal_l numeric default 4.0,
  created_at timestamptz default now()
);

create table if not exists daily_checkins (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users(id) on delete cascade,
  date date not null,
  weight_kg numeric,
  sleep_hours numeric,
  energy_10 numeric check (energy_10 between 0 and 10),
  stress_10 numeric check (stress_10 between 0 and 10),
  elbow_10 numeric check (elbow_10 between 0 and 10),
  knee_10 numeric check (knee_10 between 0 and 10),
  notes text,
  created_at timestamptz default now(),
  unique(user_id, date)
);

create table if not exists food_entries (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users(id) on delete cascade,
  logged_at timestamptz default now(),
  meal text,
  food_name text not null,
  quantity_g numeric,
  calories numeric default 0,
  protein_g numeric default 0,
  carbs_g numeric default 0,
  fat_g numeric default 0,
  source text default 'manual'
);

create table if not exists water_entries (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users(id) on delete cascade,
  logged_at timestamptz default now(),
  liters numeric not null
);

create table if not exists workout_templates (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  subtitle text,
  estimated_minutes integer,
  sort_order integer default 0
);

create table if not exists exercises (
  id uuid primary key default uuid_generate_v4(),
  name text not null unique,
  primary_muscle text,
  secondary_muscles text[]
);

create table if not exists template_exercises (
  id uuid primary key default uuid_generate_v4(),
  template_id uuid not null references workout_templates(id) on delete cascade,
  exercise_id uuid not null references exercises(id),
  sort_order integer not null,
  target_sets integer,
  rep_min integer,
  rep_max integer,
  rest_seconds integer default 90,
  notes text
);

create table if not exists workouts (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users(id) on delete cascade,
  template_id uuid references workout_templates(id),
  started_at timestamptz not null,
  finished_at timestamptz,
  notes text
);

create table if not exists exercise_sets (
  id uuid primary key default uuid_generate_v4(),
  workout_id uuid not null references workouts(id) on delete cascade,
  exercise_id uuid not null references exercises(id),
  set_number integer not null,
  set_type text default 'working',
  load_kg numeric,
  reps integer,
  duration_seconds integer,
  rir numeric,
  rpe numeric,
  rest_seconds integer,
  completed_at timestamptz
);

create table if not exists recovery_logs (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users(id) on delete cascade,
  logged_at timestamptz default now(),
  body_area text,
  kind text check (kind in ('soreness','discomfort','stiffness')),
  severity_10 numeric check (severity_10 between 0 and 10),
  context text,
  notes text
);

create table if not exists body_scans (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users(id) on delete cascade,
  captured_at timestamptz default now(),
  front_path text,
  side_path text,
  back_path text,
  waist_cm numeric,
  chest_cm numeric,
  arm_left_cm numeric,
  arm_right_cm numeric,
  thigh_left_cm numeric,
  thigh_right_cm numeric,
  notes text
);

create table if not exists tennis_sessions (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users(id) on delete cascade,
  started_at timestamptz not null,
  session_type text check (session_type in ('training','match')),
  duration_minutes integer,
  intensity_10 numeric,
  opponent text,
  opponent_rank text,
  score text,
  result text,
  serve_10 numeric,
  forehand_10 numeric,
  backhand_10 numeric,
  movement_10 numeric,
  mental_10 numeric,
  elbow_after_10 numeric,
  knee_after_10 numeric,
  notes text
);

alter table profiles enable row level security;
alter table daily_checkins enable row level security;
alter table food_entries enable row level security;
alter table water_entries enable row level security;
alter table workout_templates enable row level security;
alter table workouts enable row level security;
alter table recovery_logs enable row level security;
alter table body_scans enable row level security;
alter table tennis_sessions enable row level security;

create policy "own profile" on profiles for all using (auth.uid() = id) with check (auth.uid() = id);
create policy "own checkins" on daily_checkins for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "own foods" on food_entries for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "own water" on water_entries for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "own templates" on workout_templates for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "own workouts" on workouts for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "own recovery" on recovery_logs for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "own scans" on body_scans for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "own tennis" on tennis_sessions for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
