// server/src/index.ts
import express, { Request, Response } from 'express';
import cors from 'cors';
import { Pool } from 'pg';

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Health check
app.get('/health', async (_req: Request, res: Response) => {
  try {
    await pool.query('SELECT 1');
    res.json({ status: 'healthy', database: 'connected' });
  } catch (err) {
    res.status(500).json({
      status: 'unhealthy',
      error: (err as Error).message
    });
  }
});

// API Routes
app.get('/api/properties', async (req: Request, res: Response) => {
  const { minPrice, propertyType } = req.query;
  let query = 'SELECT * FROM properties WHERE 1=1';
  const values: any[] = [];

  if (minPrice) {
    values.push(Number(minPrice));
    query += ` AND price >= $${values.length}`;
  }

  if (propertyType && propertyType !== 'all') {
    values.push(propertyType);
    query += ` AND property_type = $${values.length}`;
  }

  try {
    const result = await pool.query(query, values);
    const properties = result.rows.map(row => ({
      id: row.id,
      title: row.title,
      price: row.price,
      bedrooms: row.bedrooms,
      bathrooms: parseFloat(row.bathrooms),
      squareFeet: row.square_feet,
      imageUrl: row.image_url,
      imageAlt: row.image_alt,
      propertyType: row.property_type,
      address: {
        street: row.street,
        city: row.city,
        state: row.state,
        zipCode: row.zip_code
      }
    }));
    res.json(properties);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

app.get('/api/sponsors', async (_req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM sponsors LIMIT 1');

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'No sponsor available' });
    }

    const row = result.rows[0];

    res.json({
      id: row.id,
      businessName: row.business_name,
      headline: row.headline,
      ctaText: row.cta_text,
      targetUrl: row.target_url,
      logoUrl: row.logo_url,
      logoAlt: row.logo_alt
    });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
