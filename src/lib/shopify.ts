type ShopifyConnectionDetails = {
    shopUrl: string
    accessToken: string
  }
  
  type ShopifyProduct = {
    id: string | number
    title: string
    product_type?: string
    vendor: string
    status: string
    variants?: Array<{
      price?: string
      inventory_quantity?: number
    }>
    created_at: string
  }
  
  type ShopifyOrder = {
    id: string | number
    order_number: string
    customer?: {
      email?: string
    }
    total_price: string
    financial_status: string
    fulfillment_status?: string
    created_at: string
  }
  
  type ShopifyCustomer = {
    id: string | number
    email?: string
    first_name?: string
    last_name?: string
    orders_count: number
    total_spent: string
    verified_email: boolean
    created_at: string
  }
  
  type FormattedProduct = {
    id: string | number
    title: string
    type: string
    vendor: string
    status: string
    price: string
    inventory: number
    created_at: string
  }
  
  type FormattedOrder = {
    id: string | number
    order_number: string
    customer: string
    total_price: string
    status: string
    fulfillment: string
    created_at: string
  }
  
  type FormattedCustomer = {
    id: string | number
    email: string
    name: string
    orders_count: number
    total_spent: string
    verified_email: string
    created_at: string
  }
  
  type AnalyticsData = {
    total_products: number
    total_orders: number
    total_customers: number
    average_order_value: number
    total_revenue: number
    date: string
  }
  
  type SampleData<T> = {
    total: number
    fields: string[]
    sample: T[]
    isEmpty: boolean
  }
  
  type QueryData = {
    products?: FormattedProduct[]
    orders?: FormattedOrder[]
    customers?: FormattedCustomer[]
    analytics?: AnalyticsData[]
  }
  
  type ShopifyError = {
    message: string
    status?: number
  }
  
  type ShopifyResponse<T> = {
    [key: string]: T[]
  }
  
  export class ShopifyClient {
    private shopUrl: string
    private accessToken: string
    private apiVersion = '2024-01'
  
    constructor({ shopUrl, accessToken }: ShopifyConnectionDetails) {
      this.shopUrl = shopUrl
      this.accessToken = accessToken
    }
  
    private async fetchShopifyData<T>(endpoint: string): Promise<ShopifyResponse<T>> {
      try {
        const response = await fetch(`https://${this.shopUrl}/admin/api/${this.apiVersion}/${endpoint}`, {
          headers: {
            'X-Shopify-Access-Token': this.accessToken,
            'Content-Type': 'application/json',
          },
        })
  
        if (!response.ok) {
          throw new Error(`Shopify API error: ${response.statusText}`)
        }
  
        const data = await response.json()
        return data as ShopifyResponse<T>
      } catch (error) {
        throw new Error(error instanceof Error ? error.message : 'Unknown error occurred')
      }
    }
  
    async getAllProducts(): Promise<FormattedProduct[]> {
      try {
        const response = await this.fetchShopifyData<ShopifyProduct>('products.json?limit=250')
        if (!response.products) return []
        
        return response.products.map((product) => ({
          id: product.id,
          title: product.title,
          type: product.product_type || 'N/A',
          vendor: product.vendor,
          status: product.status,
          price: product.variants?.[0]?.price || 'N/A',
          inventory: product.variants?.[0]?.inventory_quantity || 0,
          created_at: new Date(product.created_at).toLocaleDateString(),
        }))
      } catch (error) {
        console.error('Error fetching products:', error)
        return []
      }
    }
  
    async getAllOrders(): Promise<FormattedOrder[]> {
      try {
        const response = await this.fetchShopifyData<ShopifyOrder>('orders.json?status=any&limit=250')
        if (!response.orders) return []
  
        return response.orders.map((order) => ({
          id: order.id,
          order_number: order.order_number,
          customer: order.customer?.email || 'N/A',
          total_price: order.total_price,
          status: order.financial_status,
          fulfillment: order.fulfillment_status || 'unfulfilled',
          created_at: new Date(order.created_at).toLocaleDateString(),
        }))
      } catch (error) {
        console.error('Error fetching orders:', error)
        return []
      }
    }
  
    async getAllCustomers(): Promise<FormattedCustomer[]> {
      try {
        const response = await this.fetchShopifyData<ShopifyCustomer>('customers.json?limit=250')
        if (!response.customers) return []
  
        return response.customers.map((customer) => ({
          id: customer.id,
          email: customer.email || 'N/A',
          name: `${customer.first_name || ''} ${customer.last_name || ''}`.trim() || 'N/A',
          orders_count: customer.orders_count,
          total_spent: customer.total_spent,
          verified_email: customer.verified_email ? 'Yes' : 'No',
          created_at: new Date(customer.created_at).toLocaleDateString(),
        }))
      } catch (error) {
        console.error('Error fetching customers:', error)
        return []
      }
    }
  
    async getAllAnalytics(): Promise<AnalyticsData[]> {
      try {
        const [products, orders, customers] = await Promise.all([
          this.getAllProducts(),
          this.getAllOrders(),
          this.getAllCustomers(),
        ])
  
        return [{
          total_products: products.length,
          total_orders: orders.length,
          total_customers: customers.length,
          average_order_value: orders.length ? 
            orders.reduce((acc, order) => acc + Number(order.total_price), 0) / orders.length : 
            0,
          total_revenue: orders.reduce((acc, order) => acc + Number(order.total_price), 0),
          date: new Date().toLocaleDateString(),
        }]
      } catch (error) {
        console.error('Error fetching analytics:', error)
        return []
      }
    }
  
    async getProductsSample(): Promise<SampleData<FormattedProduct>> {
      const products = await this.getAllProducts()
      return this.formatSampleData(products)
    }
  
    async getOrdersSample(): Promise<SampleData<FormattedOrder>> {
      const orders = await this.getAllOrders()
      return this.formatSampleData(orders)
    }
  
    async getCustomersSample(): Promise<SampleData<FormattedCustomer>> {
      const customers = await this.getAllCustomers()
      return this.formatSampleData(customers)
    }
  
    async getAnalyticsSample(): Promise<SampleData<AnalyticsData>> {
      const analytics = await this.getAllAnalytics()
      return this.formatSampleData(analytics)
    }
  
    private formatSampleData<T extends object>(data: T[]): SampleData<T> {
      return {
        total: data.length,
        fields: data.length ? Object.keys(data[0]) : [],
        sample: data.slice(0, 5),
        isEmpty: data.length === 0,
      }
    }
  
    async getDataForQuery(query: string): Promise<QueryData> {
      const data: QueryData = {
        products: await this.getAllProducts(),
        orders: await this.getAllOrders(),
        customers: await this.getAllCustomers(),
        analytics: await this.getAllAnalytics()
      }
  
      const relevantData: QueryData = {}
      
      if (query.toLowerCase().includes('product')) {
        relevantData.products = data.products
      }
      if (query.toLowerCase().includes('order')) {
        relevantData.orders = data.orders
      }
      if (query.toLowerCase().includes('customer')) {
        relevantData.customers = data.customers
      }
      if (query.toLowerCase().includes('analytic') || query.toLowerCase().includes('revenue')) {
        relevantData.analytics = data.analytics
      }
  
      return Object.keys(relevantData).length === 0 ? data : relevantData
    }
  
    async getProducts(limit: number = 1): Promise<ShopifyProduct[]> {
      try {
        const response = await this.fetchShopifyData<ShopifyProduct>(`products.json?limit=${limit}`)
        return response.products || []
      } catch (error) {
        console.error('Error fetching products:', error)
        return []
      }
    }
  }