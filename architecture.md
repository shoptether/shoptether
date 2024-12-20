```mermaid
graph TD
    %% Client Entry Points
    Client[Browser Client] --> Auth[Clerk Authentication]
    
    %% Main API Routes
    Auth --> APIRoutes{API Routes}
    
    %% Shopify Store Management
    APIRoutes --> StoresAPI["/api/shopify/stores"]
    StoresAPI --> ListStores[GET: List Active Stores]
    StoresAPI --> DeleteStore[DELETE: Deactivate Store]
    
    %% Store Connection
    APIRoutes --> ConnectAPI["/api/shopify/connect"]
    ConnectAPI --> ValidateStore[Validate Credentials]
    ValidateStore --> StoreDB[(Database)]
    
    %% Store Data Operations
    APIRoutes --> StoreDataAPI["/api/shopify/store-data"]
    StoreDataAPI --> FetchProducts[Fetch Products]
    StoreDataAPI --> FetchOrders[Fetch Orders]
    StoreDataAPI --> FetchCustomers[Fetch Customers]
    StoreDataAPI --> FetchAnalytics[Fetch Analytics]
    
    %% Data Export
    APIRoutes --> ExportAPI["/api/shopify/export"]
    ExportAPI --> ExportProducts[Export Products CSV]
    ExportAPI --> ExportOrders[Export Orders CSV]
    ExportAPI --> ExportCustomers[Export Customers CSV]
    ExportAPI --> ExportAnalytics[Export Analytics CSV]
    
    %% Reports
    APIRoutes --> ReportsAPI["/api/shopify/reports"]
    ReportsAPI --> GenerateReport[Generate Report]
    ReportsAPI --> DetailedReport[Detailed Analysis]
    
    %% Chat System
    APIRoutes --> ChatAPI["/api/chat"]
    ChatAPI --> ChatSession[Create/Manage Sessions]
    ChatAPI --> ProcessQuery[Process Query]
    ProcessQuery --> FetchContext[Fetch Store Context]
    ProcessQuery --> AIAnalysis[OpenAI Analysis]
    
    %% External Services
    ShopifyAPI[Shopify API] --> |Responses| StoreDataAPI
    ShopifyAPI --> |Validation| ConnectAPI
    OpenAI[OpenAI API] --> |Analysis| ChatAPI
    
    %% Database Operations
    StoreDB --> StoresAPI
    StoreDB --> ChatSession
    StoreDB --> ReportsAPI
    
    %% Status Checks
    APIRoutes --> StatusAPI["/api/shopify/connection-status"]
    StatusAPI --> CheckConnection[Check Store Connection]
    
    %% Test Connection
    APIRoutes --> TestAPI["/api/shopify/test-connection"]
    TestAPI --> ValidateAccess[Validate Access Token]
    
    %% Styling
    classDef api fill:#f9f,stroke:#333,stroke-width:2px
    classDef external fill:#bbf,stroke:#333,stroke-width:2px
    classDef database fill:#dfd,stroke:#333,stroke-width:2px
    
    class StoresAPI,ConnectAPI,StoreDataAPI,ExportAPI,ReportsAPI,ChatAPI,StatusAPI,TestAPI api
    class ShopifyAPI,OpenAI external
    class StoreDB database