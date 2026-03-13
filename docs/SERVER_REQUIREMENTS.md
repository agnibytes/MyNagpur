# 🖥️ Majha Nagpur - Server Requirements & Configuration Guide

> **Complete Documentation for Server Setup, AI Integration, and Cloud Deployment**

---

## 📋 Table of Contents
- [Project Overview](#project-overview)
- [Technology Stack Summary](#technology-stack-summary)
- [Server Requirements](#server-requirements)
- [Environment Configuration](#environment-configuration)
- [AI/ML Integration for Automation](#aiml-integration-for-automation)
- [Deployment Options](#deployment-options)
  - [Option 1: Self-Hosted (Buying)](#option-1-self-hosted-buying)
  - [Option 2: Azure Cloud (Renting)](#option-2-azure-cloud-renting)
  - [Option 3: AWS Cloud (Renting)](#option-3-aws-cloud-renting)
- [Cost Comparison](#cost-comparison)
- [Security & Compliance](#security--compliance)
- [Monitoring & Maintenance](#monitoring--maintenance)

---

## Project Overview

**Majha Nagpur** is a National-Scale E-Governance Initiative providing real-time, ward-wise performance dashboards for civic services. The platform serves citizens, administrators, and government officials with complaint management, service tracking, and AI-powered analytics.

### Key Components
| Component | Technology | Purpose |
|-----------|------------|---------|
| Frontend | Next.js 14, React 18 | Web Application UI |
| Backend | Express.js 4.18 | RESTful API Server |
| Database | MongoDB 9.x (Mongoose) | Primary Data Storage |
| Cache | Redis 4.6 | Session & Data Caching |
| Real-time | Socket.io 4.6 | Live Updates & Notifications |
| AI/ML | TensorFlow.js 4.15 | Predictive Analytics |
| Storage | AWS S3 / Azure Blob | File & Media Storage |

---

## Technology Stack Summary

### Core Dependencies (from package.json)
```
├── Frontend
│   ├── next: ^14.0.0
│   ├── react: ^18.2.0
│   ├── react-dom: ^18.2.0
│   ├── @mui/material: ^5.15.0
│   └── antd: ^5.12.0
│
├── Backend
│   ├── express: ^4.18.2
│   ├── mongoose: ^9.1.3
│   ├── jsonwebtoken: ^9.0.2
│   ├── bcryptjs: ^2.4.3
│   └── cors: ^2.8.5
│
├── AI/ML
│   ├── @tensorflow/tfjs: ^4.15.0
│   └── @tensorflow/tfjs-node: ^4.15.0
│
├── Caching & Queues
│   ├── redis: ^4.6.10
│   ├── ioredis: ^5.3.2
│   └── bull: ^4.12.0
│
├── Cloud Storage
│   ├── @aws-sdk/client-s3: ^3.478.0
│   └── @aws-sdk/s3-request-presigner: ^3.478.0
│
└── Real-time & Communication
    ├── socket.io: ^4.6.0
    ├── nodemailer: ^6.9.7
    └── twilio: ^4.20.0
```

---

## Server Requirements

### Minimum Requirements (Development/Testing)

| Resource | Specification |
|----------|---------------|
| **CPU** | 2 vCPU / 2 Cores |
| **RAM** | 4 GB |
| **Storage** | 50 GB SSD |
| **Network** | 100 Mbps |
| **OS** | Ubuntu 22.04 LTS / RHEL 8+ |

### Recommended Requirements (Production)

| Resource | Specification |
|----------|---------------|
| **CPU** | 4-8 vCPU / 4-8 Cores |
| **RAM** | 16-32 GB |
| **Storage** | 200 GB SSD (expandable) |
| **Network** | 1 Gbps |
| **OS** | Ubuntu 22.04 LTS / RHEL 8+ |

### Software Requirements

```bash
# Required Runtime Versions (from package.json engines)
Node.js         >= 18.0.0
npm             >= 9.0.0
Python          >= 3.9 (for AI/ML components)
MongoDB         >= 6.0
Redis           >= 7.0
```

### Port Configuration

| Service | Port | Description |
|---------|------|-------------|
| Next.js Frontend | 3000 | Web Application |
| Express Backend | 5000 | API Server |
| MongoDB | 27017 | Database |
| Redis | 6379 | Cache Server |
| Socket.io | 5000 (shared) | Real-time Events |

---

## Environment Configuration

### Required Environment Variables

Create a `.env` file in the project root:

```env
# ===========================
# APPLICATION CONFIG
# ===========================
NODE_ENV=production
PORT=5000
FRONTEND_URL=https://your-domain.com

# ===========================
# DATABASE CONFIG
# ===========================
MONGODB_URI=mongodb://localhost:27017/maja_nagpur_db
# For Production (replica set):
# MONGODB_URI=mongodb://user:password@host1:27017,host2:27017,host3:27017/maja_nagpur_db?replicaSet=rs0

# ===========================
# REDIS CONFIG
# ===========================
REDIS_URL=redis://localhost:6379
# For Production with auth:
# REDIS_URL=redis://:password@redis-host:6379

# ===========================
# AUTHENTICATION
# ===========================
JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters
JWT_EXPIRE=30d

# ===========================
# AWS S3 CONFIG
# ===========================
AWS_ACCESS_KEY_ID=your-aws-access-key
AWS_SECRET_ACCESS_KEY=your-aws-secret-key
AWS_REGION=ap-south-1
AWS_S3_BUCKET=majha-nagpur-assets

# ===========================
# AZURE BLOB CONFIG (Alternative to S3)
# ===========================
AZURE_STORAGE_ACCOUNT=your-storage-account
AZURE_STORAGE_KEY=your-storage-key
AZURE_CONTAINER_NAME=assets

# ===========================
# COMMUNICATION SERVICES
# ===========================
# Twilio (SMS)
TWILIO_ACCOUNT_SID=your-twilio-sid
TWILIO_AUTH_TOKEN=your-twilio-auth-token
TWILIO_PHONE_NUMBER=+1234567890

# Email (Nodemailer)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# ===========================
# MAPS API
# ===========================
MAPS_API_KEY=your-google-maps-or-mapmyindia-key

# ===========================
# AI/ML CONFIG
# ===========================
AI_MODEL_PATH=/models
TENSORFLOW_BACKEND=cpu
# For GPU: TENSORFLOW_BACKEND=gpu

# ===========================
# MONITORING
# ===========================
LOG_LEVEL=info
SENTRY_DSN=your-sentry-dsn-for-error-tracking
```

---

## AI/ML Integration for Automation

### Current AI Capabilities (TensorFlow.js)

The project includes TensorFlow.js (`@tensorflow/tfjs: ^4.15.0`) for:

1. **Predictive Maintenance Alerts**
   - Predict infrastructure failures before they occur
   - Water pipeline leak prediction
   - Street light failure forecasting

2. **Complaint Classification**
   - Auto-categorize citizen complaints
   - Priority scoring based on urgency patterns
   - Route complaints to appropriate departments

3. **Performance Analytics**
   - Ward scoring algorithm optimization
   - Trend analysis for service delivery
   - Seasonal demand prediction (monsoon, heatwaves)

4. **Smart Recommendations**
   - Resource allocation optimization
   - Budget vs. output efficiency analysis
   - Officer workload balancing

### Proposed AI Enhancements

```
┌─────────────────────────────────────────────────────────────┐
│                    AI AUTOMATION LAYER                       │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌─────────────────┐  ┌─────────────────┐  ┌──────────────┐ │
│  │   NLP Engine    │  │ Computer Vision │  │ Predictive   │ │
│  │   (Complaint    │  │ (Photo/Video    │  │ Analytics    │ │
│  │   Processing)   │  │ Analysis)       │  │              │ │
│  └────────┬────────┘  └────────┬────────┘  └──────┬───────┘ │
│           │                    │                   │         │
│           └────────────────────┴───────────────────┘         │
│                            │                                 │
│                    ┌───────▼───────┐                        │
│                    │  ML Pipeline  │                        │
│                    │  (Training &  │                        │
│                    │  Inference)   │                        │
│                    └───────────────┘                        │
└─────────────────────────────────────────────────────────────┘
```

### AI Service Requirements

| Feature | CPU Requirement | RAM | GPU (Optional) |
|---------|----------------|-----|----------------|
| Basic Inference | 2 vCPU | 4 GB | Not needed |
| NLP Processing | 4 vCPU | 8 GB | Recommended |
| Computer Vision | 4 vCPU | 16 GB | Highly Recommended |
| Model Training | 8+ vCPU | 32 GB | Required (NVIDIA T4+) |

---

## Deployment Options

---

### Option 1: Self-Hosted (Buying)

> **Best for**: Government data centers, high security requirements, long-term cost savings

#### Hardware Specifications

| Component | Specification | Estimated Cost (INR) |
|-----------|---------------|---------------------|
| **Server** | Dell PowerEdge R750xs / HPE ProLiant DL360 Gen10+ | ₹3,50,000 - ₹5,00,000 |
| **CPU** | Intel Xeon Gold 5318Y (24 cores) or AMD EPYC 7313 | Included |
| **RAM** | 64 GB DDR4 ECC (expandable to 512 GB) | Included |
| **Storage** | 2x 1TB NVMe SSD (RAID 1) + 4TB HDD for backups | ₹50,000 - ₹80,000 |
| **GPU (AI)** | NVIDIA T4 or A10 (optional for AI workloads) | ₹1,50,000 - ₹5,00,000 |
| **Network** | 10GbE Network Card | ₹15,000 - ₹25,000 |
| **UPS** | 3kVA Online UPS with 30 min backup | ₹40,000 - ₹60,000 |
| **Rack** | 42U Server Rack with cooling | ₹30,000 - ₹50,000 |

**Total Hardware: ₹6,35,000 - ₹10,15,000**

#### Monthly Operational Costs

| Item | Monthly Cost (INR) |
|------|-------------------|
| Electricity (1.5 kW avg) | ₹8,000 - ₹12,000 |
| Internet (100 Mbps dedicated) | ₹5,000 - ₹10,000 |
| System Administrator (part-time) | ₹15,000 - ₹25,000 |
| Maintenance & Backup | ₹5,000 - ₹10,000 |

**Monthly Operational: ₹33,000 - ₹57,000**

#### Installation Steps

```bash
# 1. Install Ubuntu Server 22.04 LTS

# 2. Update system
sudo apt update && sudo apt upgrade -y

# 3. Install Node.js 18+
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# 4. Install MongoDB
wget -qO - https://www.mongodb.org/static/pgp/server-7.0.asc | sudo gpg --dearmor -o /usr/share/keyrings/mongodb-server-7.0.gpg
echo "deb [ signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list
sudo apt update && sudo apt install -y mongodb-org
sudo systemctl enable mongod && sudo systemctl start mongod

# 5. Install Redis
sudo apt install -y redis-server
sudo systemctl enable redis-server && sudo systemctl start redis-server

# 6. Install Nginx (Reverse Proxy)
sudo apt install -y nginx

# 7. Install PM2 (Process Manager)
sudo npm install -g pm2

# 8. Clone and deploy application
git clone https://github.com/Pusparaj99op/Goverment_Project--Live_Civil_Report.git
cd Goverment_Project--Live_Civil_Report
npm install
npm run build

# 9. Start with PM2
pm2 start npm --name "majha-nagpur" -- run start
pm2 save
pm2 startup
```

#### Nginx Configuration

```nginx
# /etc/nginx/sites-available/majha-nagpur
server {
    listen 80;
    server_name your-domain.gov.in;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
    }

    location /socket.io {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
```

---

### Option 2: Azure Cloud (Renting)

> **Best for**: Indian government integration (MeghRaj), Azure Active Directory, hybrid cloud

#### Recommended Azure Architecture

```
┌──────────────────────────────────────────────────────────────────┐
│                        AZURE ARCHITECTURE                         │
├──────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌─────────────────┐        ┌─────────────────────────────────┐ │
│  │  Azure Front    │◄──────►│  Azure CDN                      │ │
│  │  Door           │        │  (Static Assets)                │ │
│  └────────┬────────┘        └─────────────────────────────────┘ │
│           │                                                      │
│           ▼                                                      │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │               Azure App Service (Web App)                   │ │
│  │         ┌──────────────┐     ┌──────────────┐              │ │
│  │         │  Next.js     │     │  Express.js  │              │ │
│  │         │  Frontend    │     │  Backend API │              │ │
│  │         │  (Plan: P2v3)│     │  (Plan: P2v3)│              │ │
│  │         └──────────────┘     └──────────────┘              │ │
│  └─────────────────────────────────────────────────────────────┘ │
│                              │                                   │
│           ┌──────────────────┼──────────────────┐               │
│           ▼                  ▼                  ▼               │
│  ┌────────────────┐ ┌────────────────┐ ┌────────────────┐      │
│  │ Azure Cosmos   │ │ Azure Cache    │ │ Azure Blob     │      │
│  │ DB for MongoDB │ │ for Redis      │ │ Storage        │      │
│  │ (M30 Cluster)  │ │ (Premium P1)   │ │                │      │
│  └────────────────┘ └────────────────┘ └────────────────┘      │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │                   AI/ML Services                          │   │
│  │  ┌────────────┐  ┌────────────┐  ┌────────────────────┐  │   │
│  │  │Azure ML    │  │Cognitive   │  │Azure Functions     │  │   │
│  │  │Studio      │  │Services    │  │(Serverless AI)     │  │   │
│  │  └────────────┘  └────────────┘  └────────────────────┘  │   │
│  └──────────────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────────────┘
```

#### Azure Services & Pricing (Central India Region)

| Service | SKU/Tier | Monthly Cost (INR) |
|---------|----------|-------------------|
| **App Service Plan** | P2v3 (2 vCPU, 8 GB) x2 | ₹22,000 |
| **Azure Cosmos DB** | M30 (MongoDB API) | ₹35,000 |
| **Azure Cache for Redis** | Premium P1 (6 GB) | ₹18,000 |
| **Azure Blob Storage** | 500 GB (Hot tier) | ₹1,500 |
| **Azure CDN** | Standard (100 GB egress) | ₹500 |
| **Azure Front Door** | Standard | ₹3,000 |
| **Azure AD B2C** | 50,000 MAU | Free tier |
| **Azure Monitor** | Basic logs & metrics | ₹2,000 |
| **Azure ML Studio** | Standard (4 vCPU, 16 GB) | ₹15,000 |
| **Cognitive Services** | Text Analytics (S1) | ₹8,000 |
| **Azure Functions** | Consumption (1M executions) | ₹200 |

**Estimated Monthly Total: ₹1,05,200** (~$1,260)

#### Azure AI Services Integration

```javascript
// Example: Azure Cognitive Services for Complaint Classification
const { TextAnalyticsClient, AzureKeyCredential } = require("@azure/ai-text-analytics");

const client = new TextAnalyticsClient(
    process.env.AZURE_TEXT_ANALYTICS_ENDPOINT,
    new AzureKeyCredential(process.env.AZURE_TEXT_ANALYTICS_KEY)
);

async function classifyComplaint(text) {
    const results = await client.analyzeSentiment([text]);
    const keyPhrases = await client.extractKeyPhrases([text]);

    return {
        sentiment: results[0].sentiment,
        category: categorizeFromKeyPhrases(keyPhrases[0].keyPhrases),
        priority: calculatePriority(results[0].confidenceScores)
    };
}
```

#### Azure Deployment Commands

```bash
# Install Azure CLI
curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash

# Login to Azure
az login

# Create Resource Group
az group create --name majha-nagpur-rg --location centralindia

# Create App Service Plan
az appservice plan create \
    --name majha-nagpur-plan \
    --resource-group majha-nagpur-rg \
    --sku P2V3 \
    --is-linux

# Create Web App
az webapp create \
    --name majha-nagpur-web \
    --resource-group majha-nagpur-rg \
    --plan majha-nagpur-plan \
    --runtime "NODE:18-lts"

# Create Cosmos DB (MongoDB)
az cosmosdb create \
    --name majha-nagpur-db \
    --resource-group majha-nagpur-rg \
    --kind MongoDB \
    --server-version 6.0

# Create Redis Cache
az redis create \
    --name majha-nagpur-cache \
    --resource-group majha-nagpur-rg \
    --location centralindia \
    --sku Premium \
    --vm-size P1

# Deploy from GitHub
az webapp deployment source config \
    --name majha-nagpur-web \
    --resource-group majha-nagpur-rg \
    --repo-url https://github.com/Pusparaj99op/Goverment_Project--Live_Civil_Report.git \
    --branch main
```

---

### Option 3: AWS Cloud (Renting)

> **Best for**: Scalability, global reach, mature cloud ecosystem

#### Recommended AWS Architecture

```
┌──────────────────────────────────────────────────────────────────┐
│                         AWS ARCHITECTURE                          │
├──────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌─────────────────┐        ┌─────────────────────────────────┐  │
│  │   Route 53      │◄──────►│   CloudFront CDN                │  │
│  │   (DNS)         │        │   (Static Assets + Cache)       │  │
│  └────────┬────────┘        └─────────────────────────────────┘  │
│           │                                                       │
│           ▼                                                       │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │            Application Load Balancer (ALB)                  │ │
│  └──────────────────────┬──────────────────────────────────────┘ │
│                         │                                        │
│           ┌─────────────┴─────────────┐                         │
│           ▼                           ▼                         │
│  ┌────────────────────┐     ┌────────────────────┐              │
│  │   ECS Fargate      │     │   ECS Fargate      │              │
│  │   (Next.js)        │     │   (Express API)    │              │
│  │   x2 Tasks         │     │   x2 Tasks         │              │
│  └────────────────────┘     └────────────────────┘              │
│                              │                                   │
│           ┌──────────────────┼──────────────────┐               │
│           ▼                  ▼                  ▼               │
│  ┌────────────────┐ ┌────────────────┐ ┌────────────────┐      │
│  │ DocumentDB     │ │ ElastiCache    │ │ S3 Bucket      │      │
│  │ (MongoDB)      │ │ (Redis)        │ │ (Assets)       │      │
│  │ r6g.large x2   │ │ cache.r6g.large│ │                │      │
│  └────────────────┘ └────────────────┘ └────────────────┘      │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │                   AI/ML Services                          │   │
│  │  ┌────────────┐  ┌────────────┐  ┌────────────────────┐  │   │
│  │  │SageMaker   │  │Comprehend  │  │Lambda              │  │   │
│  │  │Endpoints   │  │(NLP)       │  │(Serverless AI)     │  │   │
│  │  └────────────┘  └────────────┘  └────────────────────┘  │   │
│  └──────────────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────────────┘
```

#### AWS Services & Pricing (Mumbai Region - ap-south-1)

| Service | SKU/Tier | Monthly Cost (INR) |
|---------|----------|-------------------|
| **ECS Fargate** | 2 vCPU, 4 GB x4 Tasks | ₹18,000 |
| **Application Load Balancer** | Standard | ₹2,500 |
| **Amazon DocumentDB** | r6g.large x2 (cluster) | ₹45,000 |
| **ElastiCache Redis** | cache.r6g.large | ₹12,000 |
| **S3 Storage** | 500 GB (Standard) | ₹1,200 |
| **CloudFront** | 100 GB egress | ₹800 |
| **Route 53** | Hosted Zone + Queries | ₹500 |
| **CloudWatch** | Logs + Metrics | ₹2,000 |
| **SageMaker** | ml.m5.large (inference) | ₹20,000 |
| **Comprehend** | NLP (10K units) | ₹8,000 |
| **Lambda** | 1M requests | ₹200 |
| **WAF** | Standard rules | ₹3,000 |

**Estimated Monthly Total: ₹1,13,200** (~$1,360)

#### AWS AI Services Integration

```javascript
// Example: AWS Comprehend for Complaint Analysis
const { ComprehendClient, DetectSentimentCommand, DetectKeyPhrasesCommand } = require("@aws-sdk/client-comprehend");

const comprehend = new ComprehendClient({ region: "ap-south-1" });

async function analyzeComplaint(text) {
    const sentimentResult = await comprehend.send(new DetectSentimentCommand({
        Text: text,
        LanguageCode: "en"
    }));

    const keyPhrasesResult = await comprehend.send(new DetectKeyPhrasesCommand({
        Text: text,
        LanguageCode: "en"
    }));

    return {
        sentiment: sentimentResult.Sentiment,
        confidence: sentimentResult.SentimentScore,
        keyPhrases: keyPhrasesResult.KeyPhrases.map(kp => kp.Text),
        suggestedDepartment: routeToDepart(keyPhrasesResult.KeyPhrases)
    };
}
```

#### AWS Deployment with Terraform

```hcl
# main.tf
provider "aws" {
  region = "ap-south-1"
}

# ECS Cluster
resource "aws_ecs_cluster" "main" {
  name = "majha-nagpur-cluster"
}

# DocumentDB Cluster
resource "aws_docdb_cluster" "main" {
  cluster_identifier      = "majha-nagpur-db"
  engine                 = "docdb"
  master_username        = var.db_username
  master_password        = var.db_password
  backup_retention_period = 7
  preferred_backup_window = "02:00-04:00"
  skip_final_snapshot    = true
}

# ElastiCache Redis
resource "aws_elasticache_cluster" "main" {
  cluster_id           = "majha-nagpur-cache"
  engine               = "redis"
  node_type            = "cache.r6g.large"
  num_cache_nodes      = 1
  parameter_group_name = "default.redis7"
  port                 = 6379
}

# S3 Bucket
resource "aws_s3_bucket" "assets" {
  bucket = "majha-nagpur-assets"
}
```

#### AWS CLI Deployment Commands

```bash
# Configure AWS CLI
aws configure

# Create ECR Repository
aws ecr create-repository --repository-name majha-nagpur-frontend
aws ecr create-repository --repository-name majha-nagpur-backend

# Build and Push Docker Images
docker build -t majha-nagpur-frontend -f Dockerfile.frontend .
docker tag majha-nagpur-frontend:latest $AWS_ACCOUNT.dkr.ecr.ap-south-1.amazonaws.com/majha-nagpur-frontend:latest
docker push $AWS_ACCOUNT.dkr.ecr.ap-south-1.amazonaws.com/majha-nagpur-frontend:latest

# Create ECS Task Definition
aws ecs register-task-definition --cli-input-json file://task-definition.json

# Create ECS Service
aws ecs create-service \
    --cluster majha-nagpur-cluster \
    --service-name majha-nagpur-service \
    --task-definition majha-nagpur-task \
    --desired-count 2 \
    --launch-type FARGATE \
    --network-configuration "awsvpcConfiguration={subnets=[subnet-xxx],securityGroups=[sg-xxx],assignPublicIp=ENABLED}"
```

---

## Cost Comparison

### Monthly Cost Summary (INR)

| Deployment Option | Setup Cost | Monthly Cost | Year 1 Total | Year 3 Total |
|-------------------|------------|--------------|--------------|--------------|
| **Self-Hosted** | ₹8,00,000 | ₹45,000 | ₹13,40,000 | ₹21,20,000 |
| **Azure Cloud** | ₹0 | ₹1,05,200 | ₹12,62,400 | ₹37,87,200 |
| **AWS Cloud** | ₹0 | ₹1,13,200 | ₹13,58,400 | ₹40,75,200 |

### Recommendation Matrix

| Criteria | Self-Hosted | Azure | AWS |
|----------|-------------|-------|-----|
| Initial Investment | High | None | None |
| Long-term Cost (3+ years) | **Lowest** | Medium | Highest |
| Scalability | Limited | High | **Highest** |
| Maintenance Effort | **Highest** | Low | Low |
| Government Compliance | Good | **Best (MeghRaj)** | Good |
| AI/ML Integration | Manual | **Integrated** | **Integrated** |
| Disaster Recovery | Manual | Managed | Managed |

---

## Security & Compliance

### Required Security Measures

| Category | Requirement | Implementation |
|----------|-------------|----------------|
| **Data Encryption** | AES-256 at rest | MongoDB/DocumentDB encryption |
| **Transit Security** | TLS 1.3 | SSL certificates (Let's Encrypt/ACM) |
| **Authentication** | OAuth 2.0 / JWT | Already implemented |
| **Rate Limiting** | API throttling | express-rate-limit (installed) |
| **Helmet Security** | HTTP headers | helmet.js (installed) |
| **DPDP Compliance** | Data protection | Consent management, data deletion |
| **ISO 27001** | Security controls | Audit trails, access logging |

### Firewall Rules

```bash
# UFW Rules (Self-Hosted)
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow 22/tcp      # SSH
sudo ufw allow 80/tcp      # HTTP
sudo ufw allow 443/tcp     # HTTPS
sudo ufw deny 27017/tcp    # Block direct MongoDB access
sudo ufw deny 6379/tcp     # Block direct Redis access
sudo ufw enable
```

---

## Monitoring & Maintenance

### Recommended Monitoring Stack

| Tool | Purpose | Cloud Alternative |
|------|---------|-------------------|
| **PM2** | Node.js process management | ECS/App Service |
| **Prometheus** | Metrics collection | CloudWatch/Azure Monitor |
| **Grafana** | Dashboards | CloudWatch Dashboards |
| **Winston** | Logging | CloudWatch Logs/Log Analytics |
| **Sentry** | Error tracking | Application Insights |

### Health Check Endpoints

```javascript
// Add to server/index.js
app.get('/health', (req, res) => {
    res.json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        memory: process.memoryUsage()
    });
});

app.get('/ready', async (req, res) => {
    try {
        // Check MongoDB connection
        await mongoose.connection.db.admin().ping();
        // Check Redis connection
        await redis.ping();
        res.json({ status: 'ready' });
    } catch (error) {
        res.status(503).json({ status: 'not ready', error: error.message });
    }
});
```

### Backup Strategy

| Component | Backup Frequency | Retention | Method |
|-----------|-----------------|-----------|--------|
| MongoDB | Daily | 30 days | mongodump / DocumentDB snapshots |
| Redis | Hourly | 7 days | RDB persistence |
| Files (S3) | Real-time | 90 days | Versioning enabled |
| Application | On deploy | Unlimited | Git repository |

---

## Next Steps

1. **Choose deployment option** based on budget and requirements
2. **Set up development environment** with local MongoDB and Redis
3. **Configure AI services** (Azure Cognitive/AWS Comprehend)
4. **Implement CI/CD pipeline** for automated deployments
5. **Set up monitoring and alerting** before production launch
6. **Conduct security audit** and penetration testing
7. **Obtain SSL certificates** and configure HTTPS
8. **Document API endpoints** with Swagger/OpenAPI

---

> **Document Version**: 1.0
> **Created**: January 2026
> **Author**: Majha Nagpur Development Team
