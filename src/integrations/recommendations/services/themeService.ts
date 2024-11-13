import { ShopifyService } from './shopifyService'

export class ThemeService {
  private readonly shopifyService: ShopifyService

  constructor(
    private readonly shopDomain: string,
    private readonly accessToken: string
  ) {
    this.shopifyService = new ShopifyService(shopDomain, accessToken)
  }

  async injectRecommendationSnippet(): Promise<boolean> {
    try {
      const snippetContent = `
        {% if product %}
          <div id="ai-recommendations" 
               data-product-id="{{ product.id }}"
               data-shop-domain="{{ shop.domain }}">
          </div>
          <script src="{{ 'recommendations.js' | asset_url }}" defer></script>
        {% endif %}
      `

      const scriptContent = `
        document.addEventListener('DOMContentLoaded', function() {
          const container = document.getElementById('ai-recommendations');
          if (!container) return;

          const productId = container.dataset.productId;
          const shopDomain = container.dataset.shopDomain;

          fetch('/api/recommendations?productId=' + productId)
            .then(response => response.json())
            .then(products => {
              const html = products.map(product => \`
                <div class="recommendation-item">
                  <a href="/products/\${product.handle}">
                    <img src="\${product.featured_image}" alt="\${product.title}">
                    <h3>\${product.title}</h3>
                    <p>\${product.price}</p>
                  </a>
                </div>
              \`).join('');
              
              container.innerHTML = html;
            })
            .catch(console.error);
        });
      `

      return await this.shopifyService.updateThemeFiles(snippetContent, scriptContent)
    } catch (error) {
      console.error('Failed to inject theme:', error)
      return false
    }
  }
}