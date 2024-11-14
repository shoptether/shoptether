-- CreateTable
CREATE TABLE "ShopifyConnection" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "shopUrl" TEXT NOT NULL,
    "accessToken" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ShopifyConnection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecommendationConfig" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT false,
    "productCount" INTEGER NOT NULL DEFAULT 4,
    "algorithm" TEXT NOT NULL DEFAULT 'similar',
    "displayLocation" TEXT NOT NULL DEFAULT 'product_page',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "shopifyConnectionId" TEXT NOT NULL,

    CONSTRAINT "RecommendationConfig_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecommendationMetrics" (
    "id" TEXT NOT NULL,
    "configId" TEXT NOT NULL,
    "impressions" INTEGER NOT NULL DEFAULT 0,
    "clicks" INTEGER NOT NULL DEFAULT 0,
    "conversions" INTEGER NOT NULL DEFAULT 0,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RecommendationMetrics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecommendationMetric" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "configId" TEXT NOT NULL,
    "productId" TEXT,
    "userId" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RecommendationMetric_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ShopifyConnection_userId_shopUrl_key" ON "ShopifyConnection"("userId", "shopUrl");

-- CreateIndex
CREATE UNIQUE INDEX "RecommendationConfig_shopifyConnectionId_key" ON "RecommendationConfig"("shopifyConnectionId");

-- CreateIndex
CREATE INDEX "RecommendationMetrics_date_idx" ON "RecommendationMetrics"("date");

-- CreateIndex
CREATE UNIQUE INDEX "RecommendationMetrics_configId_date_key" ON "RecommendationMetrics"("configId", "date");

-- CreateIndex
CREATE INDEX "RecommendationMetric_configId_idx" ON "RecommendationMetric"("configId");

-- CreateIndex
CREATE INDEX "RecommendationMetric_timestamp_idx" ON "RecommendationMetric"("timestamp");

-- CreateIndex
CREATE INDEX "RecommendationMetric_type_idx" ON "RecommendationMetric"("type");

-- AddForeignKey
ALTER TABLE "RecommendationConfig" ADD CONSTRAINT "RecommendationConfig_shopifyConnectionId_fkey" FOREIGN KEY ("shopifyConnectionId") REFERENCES "ShopifyConnection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecommendationMetrics" ADD CONSTRAINT "RecommendationMetrics_configId_fkey" FOREIGN KEY ("configId") REFERENCES "RecommendationConfig"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecommendationMetric" ADD CONSTRAINT "RecommendationMetric_configId_fkey" FOREIGN KEY ("configId") REFERENCES "RecommendationConfig"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
