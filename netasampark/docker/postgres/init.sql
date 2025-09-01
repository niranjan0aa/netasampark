-- Create additional databases for tenant isolation
-- This script runs when PostgreSQL container starts

-- Create template database for tenants
CREATE DATABASE netasampark_template;

-- Create some sample tenant databases for development
CREATE DATABASE tenant_test;
CREATE DATABASE tenant_demo;

-- Grant permissions
GRANT ALL PRIVILEGES ON DATABASE netasampark_central TO postgres;
GRANT ALL PRIVILEGES ON DATABASE netasampark_template TO postgres;
GRANT ALL PRIVILEGES ON DATABASE tenant_test TO postgres;
GRANT ALL PRIVILEGES ON DATABASE tenant_demo TO postgres;

-- Enable required extensions
\c netasampark_central;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

\c netasampark_template;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

\c tenant_test;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

\c tenant_demo;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";