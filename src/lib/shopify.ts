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
  
  type ShopifyOrder = {
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
  
  type ShopifyCustomer = {
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
    line_items: OrderLineItem[]
    gateway: string
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
  
  interface OrderLineItem {
    id: number
    product_id: number
    product_title: string
    quantity: number
    price_per_item: number
    total_price: number
    variant_title?: string
    sku?: string
  }
  
  type TimeBasedMetric = {
    hourly: Record<number, number>
    daily: Record<number, number>
    weekly: Record<number, number>
    monthly: Record<number, number>
    yearly: Record<number, number>
  }
  
  type ProductPerformance = {
    product_id: number
    title: string
    revenue: TimeBasedMetric
    units_sold: TimeBasedMetric
    average_price: number
  }
  
  type EnhancedAnalyticsData = {
    total_products: number
    total_orders: number
    total_customers: number
    average_order_value: number
    total_revenue: number
    date: string
    revenue_metrics: TimeBasedMetric
    sales_metrics: TimeBasedMetric
    product_performance: ProductPerformance[]
    payment_methods: Record<string, {
      count: number
      total_revenue: number
    }>
    product_combinations: Array<{
      products: [string, string]
      frequency: number
    }>
    peak_hours: {
      by_revenue: number[]
      by_orders: number[]
    }
    peak_days: {
      by_revenue: number[]
      by_orders: number[]
    }
    peak_months: {
      by_revenue: number[]
      by_orders: number[]
    }
  }
  
  type ReportType = 
    | 'TOP_REVENUE_PRODUCTS'
    | 'PAYMENT_METHODS'
    | 'TOP_SELLING_PRODUCTS'
    | 'HOURLY_PATTERNS'
    | 'WEEKLY_TRENDS'
    | 'MONTHLY_TRENDS'
    | 'PRODUCT_COMBINATIONS'
  
  type TimeFrame = 'day' | 'week' | 'month' | 'year' | 'all'
  
  type Report = {
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
          line_items: order.line_items.map(item => ({
            id: Number(item.id),
            product_id: Number(item.product_id),
            product_title: item.title,
            quantity: item.quantity,
            price_per_item: parseFloat(item.price),
            total_price: parseFloat(item.price) * item.quantity,
            variant_title: item.variant_title,
            sku: item.sku
          })),
          gateway: order.gateway
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
  
    async generateDetailedReport(type: ReportType, timeframe: TimeFrame): Promise<Report> {
      const orders = await this.getAllOrders()
      const products = await this.getAllProducts()
      
      switch(type) {
        case 'TOP_REVENUE_PRODUCTS':
          return this.generateTopRevenueReport(orders, timeframe)
        case 'PAYMENT_METHODS':
          return this.generatePaymentMethodReport(orders)
        case 'TOP_SELLING_PRODUCTS':
          return this.generateTopSellingReport(orders, timeframe)
        case 'HOURLY_PATTERNS':
          return this.generateHourlyPatternsReport(orders)
        case 'WEEKLY_TRENDS':
          return this.generateWeeklyTrendsReport(orders)
        case 'MONTHLY_TRENDS':
          return this.generateMonthlyTrendsReport(orders)
        case 'PRODUCT_COMBINATIONS':
          return this.generateProductCombinationsReport(orders)
        default:
          throw new Error('Invalid report type')
      }
    }
  
    private generateTopRevenueReport(orders: FormattedOrder[], timeframe: TimeFrame): Report {
      const productRevenue: Record<string, number> = {}

      orders.forEach(order => {
        order.line_items.forEach(item => {
          productRevenue[item.product_title] = (productRevenue[item.product_title] || 0) + item.total_price
        })
      })

      const sortedProducts = Object.entries(productRevenue)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)

      return {
        title: 'Top Revenue Generating Products',
        description: `Top 10 products by revenue for ${timeframe}`,
        data: {
          labels: sortedProducts.map(([title]) => title),
          datasets: [{
            name: 'Revenue',
            data: sortedProducts.map(([, revenue]) => revenue)
          }]
        }
      }
    }
  
    private generatePaymentMethodReport(orders: FormattedOrder[]): Report {
      const paymentMethods: Record<string, number> = {}

      orders.forEach(order => {
        paymentMethods[order.gateway] = (paymentMethods[order.gateway] || 0) + 1
      })

      const sortedMethods = Object.entries(paymentMethods)
        .sort((a, b) => b[1] - a[1])

      return {
        title: 'Payment Methods Usage',
        description: 'Distribution of payment methods used in orders',
        data: {
          labels: sortedMethods.map(([method]) => method),
          datasets: [{
            name: 'Usage Count',
            data: sortedMethods.map(([, count]) => count)
          }]
        }
      }
    }
  
    private generateTopSellingReport(orders: FormattedOrder[], timeframe: TimeFrame): Report {
      const productSales: Record<string, number> = {}

      orders.forEach(order => {
        order.line_items.forEach(item => {
          productSales[item.product_title] = (productSales[item.product_title] || 0) + item.quantity
        })
      })

      const sortedProducts = Object.entries(productSales)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)

      return {
        title: 'Top Selling Products',
        description: `Top 10 products by units sold for ${timeframe}`,
        data: {
          labels: sortedProducts.map(([title]) => title),
          datasets: [{
            name: 'Units Sold',
            data: sortedProducts.map(([, units]) => units)
          }]
        }
      }
    }
  
    private generateHourlyPatternsReport(orders: FormattedOrder[]): Report {
      const hourlySales: Record<number, number> = {}

      orders.forEach(order => {
        const hour = new Date(order.created_at).getHours()
        hourlySales[hour] = (hourlySales[hour] || 0) + 1
      })

      return {
        title: 'Hourly Sales Patterns',
        description: 'Sales distribution across different hours of the day',
        data: {
          labels: Object.keys(hourlySales).map(hour => `${hour}:00`),
          datasets: [{
            name: 'Sales Count',
            data: Object.values(hourlySales)
          }]
        }
      }
    }
  
    private generateWeeklyTrendsReport(orders: FormattedOrder[]): Report {
      const weeklySales: Record<number, number> = {}

      orders.forEach(order => {
        const week = new Date(order.created_at).getDay()
        weeklySales[week] = (weeklySales[week] || 0) + 1
      })

      return {
        title: 'Weekly Sales Trends',
        description: 'Sales distribution across different days of the week',
        data: {
          labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          datasets: [{
            name: 'Sales Count',
            data: Object.values(weeklySales)
          }]
        }
      }
    }
  
    private generateMonthlyTrendsReport(orders: FormattedOrder[]): Report {
      const monthlySales: Record<number, number> = {}

      orders.forEach(order => {
        const month = new Date(order.created_at).getMonth()
        monthlySales[month] = (monthlySales[month] || 0) + 1
      })

      return {
        title: 'Monthly Sales Trends',
        description: 'Sales distribution across different months of the year',
        data: {
          labels: [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
          ],
          datasets: [{
            name: 'Sales Count',
            data: Object.values(monthlySales)
          }]
        }
      }
    }
  
    private generateProductCombinationsReport(orders: FormattedOrder[]): Report {
      const combinations: Record<string, number> = {}

      orders.forEach(order => {
        const titles = order.line_items.map(item => item.product_title)
        titles.forEach((title, index) => {
          for (let j = index + 1; j < titles.length; j++) {
            const combination = [title, titles[j]].sort().join(' & ')
            combinations[combination] = (combinations[combination] || 0) + 1
          }
        })
      })

      const sortedCombinations = Object.entries(combinations)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)

      return {
        title: 'Product Combinations',
        description: 'Top 10 frequently bought together product combinations',
        data: {
          labels: sortedCombinations.map(([combo]) => combo),
          datasets: [{
            name: 'Frequency',
            data: sortedCombinations.map(([, frequency]) => frequency)
          }]
        }
      }
    }
  }