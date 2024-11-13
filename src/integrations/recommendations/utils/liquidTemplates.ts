export const generateLiquidTemplate = (location: string): string => {
    const baseTemplate = `
      {% if recommendations %}
        <div class="shoptether-recommendations">
          <style>
            .shoptether-recommendations {
              padding: 2rem 0;
            }
            .shoptether-grid {
              display: grid;
              grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
              gap: 1rem;
            }
            .shoptether-product-card {
              border: 1px solid #e5e7eb;
              border-radius: 0.5rem;
              padding: 1rem;
            }
            .shoptether-product-image {
              width: 100%;
              aspect-ratio: 1;
              object-fit: cover;
              border-radius: 0.375rem;
            }
          </style>
          
          <h2>Recommended Products</h2>
          <div class="shoptether-grid">
            {% for product in recommendations %}
              <div class="shoptether-product-card">
                <img 
                  src="{{ product.featured_image }}"
                  alt="{{ product.title }}"
                  class="shoptether-product-image"
                />
                <h3>{{ product.title }}</h3>
                <p>{{ product.price | money }}</p>
                <a href="/products/{{ product.handle }}">View Product</a>
              </div>
            {% endfor %}
          </div>
        </div>
      {% endif %}
    `;
  
    // Add location-specific wrapper if needed
    switch (location) {
      case 'product_page':
        return `{% if template == 'product' %}\n${baseTemplate}\n{% endif %}`;
      case 'home_page':
        return `{% if template == 'index' %}\n${baseTemplate}\n{% endif %}`;
      case 'collection_page':
        return `{% if template == 'collection' %}\n${baseTemplate}\n{% endif %}`;
      default:
        return baseTemplate;
    }
  };