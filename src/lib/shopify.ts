type ShopifyConnectionDetails = {
    shopUrl: string
    accessToken: string
  }
  
  export class ShopifyClient {
    private shopUrl: string
    private accessToken: string
    private version = '2024-01'
  
    constructor({ shopUrl, accessToken }: ShopifyConnectionDetails) {
      this.shopUrl = shopUrl
      this.accessToken = accessToken
    }
  
    private async fetch(endpoint: string, options: RequestInit = {}) {
      const url = `https://${this.shopUrl}/admin/api/${this.version}/${endpoint}`
      const response = await fetch(url, {
        ...options,
        headers: {
          'X-Shopify-Access-Token': this.accessToken,
          'Content-Type': 'application/json',
          ...options.headers,
        },
      })
  
      if (!response.ok) {
        throw new Error(`Shopify API error: ${response.statusText}`)
      }
  
      return response.json()
    }
  
    async getProducts(limit = 50) {
      return this.fetch(`products.json?limit=${limit}`)
    }
  
    async getOrders(limit = 50) {
      return this.fetch(`orders.json?limit=${limit}&status=any`)
    }
  
    async getCustomers(limit = 50) {
      return this.fetch(`customers.json?limit=${limit}`)
    }
  
    async getAnalytics(days = 30) {
      const reports = await this.fetch('reports.json')
      // Process analytics data
      return reports
    }
  
    // Helper method to get relevant data based on query
    async getDataForQuery(query: string) {
      try {
        // Determine what data to fetch based on query keywords
        const needsProducts = query.toLowerCase().includes('product')
        const needsOrders = query.toLowerCase().includes('order') || 
                           query.toLowerCase().includes('sale')
        const needsCustomers = query.toLowerCase().includes('customer')
  
        const data: any = {}
  
        if (needsProducts) {
          data.products = await this.getProducts()
        }
        if (needsOrders) {
          data.orders = await this.getOrders()
        }
        if (needsCustomers) {
          data.customers = await this.getCustomers()
        }
  
        return data
      } catch (error) {
        console.error('Error fetching Shopify data:', error)
        throw error
      }
    }
  }