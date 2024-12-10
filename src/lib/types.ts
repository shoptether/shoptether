// Shopify Types
export type ShopifyConnectionDetails = {
    shopUrl: string
    accessToken: string
  }
  
  export type ShopifyProduct = {
    id: string | number
    title: string
    product_type?: string
    vendor: string
    status: string
    created_at: string
    updated_at: string
    variants: Array<{
      id: number
      price: string
      inventory_quantity: number
      sku: string
      barcode: string
      weight: number
      weight_unit: string
      requires_shipping: boolean
      taxable: boolean
    }>
    options: Array<{
      name: string
      values: string[]
    }>
    images: Array<{
      src: string
      alt: string
    }>
    tags: string[]
  }
  
  export type ShopifyOrder = {
    id: string | number
    order_number: string
    customer?: {
      id: number
      email?: string
      first_name?: string
      last_name?: string
    }
    total_price: string
    subtotal_price: string
    total_tax: string
    total_discounts: string
    financial_status: string
    fulfillment_status?: string
    created_at: string
    processed_at: string
    currency: string
    gateway: string // Payment method
    line_items: Array<{
      id: string | number
      product_id: string | number
      variant_id: string | number
      title: string
      quantity: number
      price: string
      variant_title?: string
      sku?: string
      grams: number
      vendor: string
      properties: Array<{
        name: string
        value: string
      }>
      fulfillable_quantity: number
      total_discount: string
    }>
    shipping_address: {
      country: string
      province: string
      city: string
      zip: string
    }
    billing_address: {
      country: string
      province: string
      city: string
      zip: string
    }
    discount_codes: Array<{
      code: string
      amount: string
      type: string
    }>
  }
  
  export type ShopifyCustomer = {
    id: string | number
    email?: string
    first_name?: string
    last_name?: string
    orders_count: number
    total_spent: string
    verified_email: boolean
    created_at: string
    updated_at: string
    last_order_id: string
    last_order_name: string
    accepts_marketing: boolean
    currency: string
    addresses: Array<{
      address1: string
      city: string
      province: string
      country: string
      zip: string
      default: boolean
    }>
    tax_exempt: boolean
    tags: string[]
    last_order_date: string
  }
  
  // Formatted Types
  export type FormattedProduct = {
    id: string | number
    title: string
    type: string
    vendor: string
    status: string
    price: string
    inventory: number
    created_at: string
  }
  
  export type FormattedOrder = {
    id: string | number
    order_number: string
    customer: string
    total_price: string
    status: string
    fulfillment: string
    created_at: string
    line_items: OrderLineItem[]
  }
  
  export type FormattedCustomer = {
    id: string | number
    email: string
    name: string
    orders_count: number
    total_spent: string
    verified_email: string
    created_at: string
  }
  
  // Analytics and Report Types
  export type AnalyticsData = {
    total_products: number
    total_orders: number
    total_customers: number
    average_order_value: number
    total_revenue: number
    date: string
  }
  
  export type ReportType = 
    | 'TOP_REVENUE_PRODUCTS'
    | 'PAYMENT_METHODS'
    | 'TOP_SELLING_PRODUCTS'
    | 'HOURLY_PATTERNS'
    | 'WEEKLY_TRENDS'
    | 'MONTHLY_TRENDS'
    | 'PRODUCT_COMBINATIONS'
  
  export type TimeFrame = 'day' | 'week' | 'month' | 'year' | 'all'
  
  export type Report = {
    title: string
    description: string
    data: {
      labels: string[]
      datasets: Array<{
        name: string
        data: number[]
      }>
    }
    metadata?: {
      timeframe?: TimeFrame
      total?: number
      average?: number
    }
  }
  
  export type SampleData<T> = {
    total: number
    fields: string[]
    sample: T[]
    isEmpty: boolean
  }
  
  export type QueryData = {
    products?: FormattedProduct[]
    orders?: FormattedOrder[]
    customers?: FormattedCustomer[]
    analytics?: AnalyticsData[]
  }
  
  export type ShopifyError = {
    message: string
    status?: number
  }
  
  export type ShopifyResponse<T> = {
    [key: string]: T[]
  }
  
  export interface OrderLineItem {
    id: number
    product_id: number
    product_title: string
    quantity: number
    price_per_item: number
    total_price: number
    variant_title?: string
    sku?: string
  }