-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. Projects Table
-- Stores the websites being tracked by the user.
create table if not exists public.projects (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users not null,
  name text not null,
  domain text,
  api_key text default uuid_generate_v4(), -- For the tracking script
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Analytics Events (Raw Data)
-- Stores every hit to the website, classified by bot type.
-- Enum for cleaner data type
do $$
begin
    if not exists (select 1 from pg_type where typname = 'visitor_type_enum') then
        create type visitor_type_enum as enum ('human', 'ai_agent', 'bad_bot', 'search_bot');
    end if;
end$$;

create table if not exists public.analytics_events (
  id uuid default uuid_generate_v4() primary key,
  project_id uuid references public.projects on delete cascade not null,
  session_id text not null,
  visitor_type visitor_type_enum not null,
  agent_name text, -- e.g. 'ChatGPT', 'Claude' (Nullable if human or generic bot)
  path text not null,
  country text,
  device text,
  duration int, -- in seconds
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Daily Metrics (Aggregated)
-- Pre-calculated stats for fast dashboard loading.
create table if not exists public.daily_metrics (
  id uuid default uuid_generate_v4() primary key,
  project_id uuid references public.projects on delete cascade not null,
  date date default current_date not null,
  
  -- Counts
  total_visitors int default 0,
  human_visitors int default 0,
  bot_visitors int default 0,
  ai_agent_visitors int default 0,
  
  -- Performance
  bounce_rate_human float default 0,
  bounce_rate_total float default 0,
  avg_session_duration_human int default 0, -- seconds
  
  updated_at timestamp with time zone default timezone('utc'::text, now()),
  unique(project_id, date)
);

-- 4. Agent Opportunities
-- Tracks specifically which AI agents are visiting to populate the "AI Opportunities" card.
create table if not exists public.agent_opportunities (
  id uuid default uuid_generate_v4() primary key,
  project_id uuid references public.projects on delete cascade not null,
  agent_name text not null, -- 'ChatGPT', 'Perplexity', etc.
  visit_count_7d int default 0,
  trend_percentage float default 0,
  visibility_score int default 0, -- 0-100 score
  last_seen timestamp with time zone,
  unique(project_id, agent_name)
);

-- 5. Row Level Security Powers (RLS)
-- Ensure users can only see their own data.

-- Projects
alter table public.projects enable row level security;
drop policy if exists "Users can view own projects" on public.projects;
create policy "Users can view own projects" on public.projects for select using (auth.uid() = user_id);
drop policy if exists "Users can create own projects" on public.projects;
create policy "Users can create own projects" on public.projects for insert with check (auth.uid() = user_id);
drop policy if exists "Users can update own projects" on public.projects;
create policy "Users can update own projects" on public.projects for update using (auth.uid() = user_id);

-- Analytics Events
alter table public.analytics_events enable row level security;
drop policy if exists "Users view events for own projects" on public.analytics_events;
create policy "Users view events for own projects" on public.analytics_events for select using (
  exists (select 1 from public.projects where id = analytics_events.project_id and user_id = auth.uid())
);
-- Note: Insert policy typically needed for the tracking API, usually handled via Service Key or signed approach, 
-- but for client-side inserts (if any):
drop policy if exists "Ingest events" on public.analytics_events;
create policy "Ingest events" on public.analytics_events for insert with check (true); -- Usually restricted by API key in real backend logic

-- Daily Metrics
alter table public.daily_metrics enable row level security;
drop policy if exists "Users view metrics for own projects" on public.daily_metrics;
create policy "Users view metrics for own projects" on public.daily_metrics for select using (
  exists (select 1 from public.projects where id = daily_metrics.project_id and user_id = auth.uid())
);

-- Agent Opportunities
alter table public.agent_opportunities enable row level security;
drop policy if exists "Users view opportunities for own projects" on public.agent_opportunities;
create policy "Users view opportunities for own projects" on public.agent_opportunities for select using (
  exists (select 1 from public.projects where id = agent_opportunities.project_id and user_id = auth.uid())
);

-- Storage (Optional - for Reporting or Screenshots)
-- insert into storage.buckets (id, name, public) values ('reports', 'reports', true) on conflict do nothing;
-- create policy "Authenticated users can upload reports" on storage.objects for insert with check (bucket_id = 'reports' and auth.role() = 'authenticated');
