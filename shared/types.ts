// shared/types.ts
export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface Property {
  id: string;
  title: string;
  address: Address;
  price: number;
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  imageUrl: string;
  imageAlt: string;
  propertyType: 'single-family' | 'condo' | 'townhouse';
}

export interface Sponsor {
  id: string;
  businessName: string;
  headline: string;
  ctaText: string;
  targetUrl: string;
  logoUrl: string;
  logoAlt: string;
}
