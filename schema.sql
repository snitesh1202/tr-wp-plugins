-- Plugins table
CREATE TABLE plugins (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    version TEXT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    category TEXT,
    downloads INTEGER DEFAULT 0,
    changelog JSONB,
    zip_path TEXT,
    screenshots TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Orders table
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    plugin_id UUID REFERENCES plugins(id),
    buyer_email TEXT NOT NULL,
    buyer_name TEXT NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    cashfree_order_id TEXT UNIQUE,
    status TEXT NOT NULL DEFAULT 'pending', -- pending, paid, failed
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Licenses table
CREATE TABLE licenses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID REFERENCES orders(id),
    plugin_id UUID REFERENCES plugins(id),
    license_key TEXT UNIQUE NOT NULL,
    download_count INTEGER DEFAULT 0,
    max_downloads INTEGER DEFAULT 5,
    expires_at TIMESTAMP WITH TIME ZONE,
    activated_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Plugin Versions table
CREATE TABLE plugin_versions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    plugin_id UUID REFERENCES plugins(id),
    version TEXT NOT NULL,
    zip_path TEXT NOT NULL,
    release_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Download tokens table
CREATE TABLE download_tokens (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    token TEXT UNIQUE NOT NULL,
    license_id UUID REFERENCES licenses(id),
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
