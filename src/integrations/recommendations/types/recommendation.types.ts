export interface RecommendationConfig {
    id?: string;
    userId?: string;
    enabled: boolean;
    productCount: number;
    algorithm: 'similar' | 'trending' | 'personalized';
    displayLocation: 'product_page' | 'home_page' | 'collection_page';
    shopifyConnectionId?: string;
    createdAt?: Date;
    updatedAt?: Date;
  }
  
  export interface ShopifyProduct {
    id: string;
    title: string;
    handle: string;
    price: string;
    featured_image: string;
    tags: string[];
    product_type: string;
  }
  
  export interface RecommendationMetrics {
    id?: string;
    configId?: string;
    impressions: number;
    clicks: number;
    conversions: number;
    date?: Date;
  }
  
  export interface RecommendationDashboard {
    store: string;
    status: 'active' | 'inactive';
    metrics: RecommendationMetrics;
    config: RecommendationConfig;
  }