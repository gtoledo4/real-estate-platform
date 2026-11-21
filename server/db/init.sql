-- server/db/init.sql

CREATE TABLE IF NOT EXISTS properties (
    id VARCHAR(64) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    street VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(50) NOT NULL,
    zip_code VARCHAR(20) NOT NULL,
    price INT NOT NULL,
    bedrooms INT NOT NULL,
    bathrooms DECIMAL(3,1) NOT NULL,
    square_feet INT NOT NULL,
    image_url TEXT NOT NULL,
    image_alt TEXT NOT NULL,
    property_type VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS sponsors (
    id VARCHAR(64) PRIMARY KEY,
    business_name VARCHAR(255) NOT NULL,
    headline VARCHAR(255) NOT NULL,
    cta_text VARCHAR(100) NOT NULL,
    target_url TEXT NOT NULL,
    logo_url TEXT NOT NULL,
    logo_alt TEXT NOT NULL
);

-- Seed Initial Records
INSERT INTO properties VALUES
('prop-101', 'Mid-Century Modern Villa', '1428 Elm Avenue', 'Pasadena', 'CA', '91104', 1250000, 3, 2.0, 2100, 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80', 'Front view of single-story mid-century home with large floor-to-ceiling windows and xeriscaped lawn', 'single-family'),
('prop-102', 'Downtown High-Rise Loft', '400 South Spring St #8B', 'Los Angeles', 'CA', '90013', 789000, 1, 1.0, 950, 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80', 'Open-concept loft interior featuring exposed brick walls, concrete ceilings, and city views', 'condo'),
('prop-103', 'Craftsman Family Residence', '2214 Raymond Avenue', 'Long Beach', 'CA', '90806', 915000, 4, 3.0, 2450, 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=800&q=80', 'Two-story craftsman home with covered wood porch, tapered columns, and gabled roofline', 'single-family')
ON CONFLICT (id) DO NOTHING;

INSERT INTO sponsors VALUES
('spon-01', 'Pacific Coast Mortgage', 'Lock in 30-year fixed rates under 5.8% this week only.', 'Check Eligibility', 'https://example.com/rates', 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=100&q=80', 'Pacific Coast Mortgage geometric triangle corporate emblem')
ON CONFLICT (id) DO NOTHING;
