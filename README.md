![Majha Nagpur Hero](/home/vinman/.gemini/antigravity/brain/67fadc72-5853-42a9-87ab-76f2340b53a0/majha_nagpur_banner_hero_1773384430012.png)

# 🏙️ Majha Nagpur: AI-Driven Urban Governance

### Transforming Nagpur into a Data-Powered Smart City

**Majha Nagpur** is a next-generation civic governance platform designed for the Nagpur Municipal Corporation (NMC). By integrating real-time urban datasets with cutting-edge AI, the platform empowers citizens and administrators to build a more transparent, efficient, and resilient city.

[![Status](https://img.shields.io/badge/Status-Beta--Live-brightgreen.svg)]()
[![Backend](https://img.shields.io/badge/Backend-FastAPI%20%26%20Python-blue.svg)]()
[![Frontend](https://img.shields.io/badge/Frontend-Next.js%20%26%20React-orange.svg)]()
[![AI](https://img.shields.io/badge/AI-Gemini%201.5%20Flash-red.svg)]()

---

## 🌟 Vision
To transition urban management from reactive complaint-handling to **proactive, data-backed governance**. Majha Nagpur provides a "Report Card" for every ward, ensuring public accountability and sustainable development.

## 🚀 Key Features

### 🧠 Smart City AI Analytics
- **AI Urban Insights**: Powered by **Google Gemini AI**, providing deep analysis of city metrics, complaint patterns, and infrastructure health.
- **Traffic Forecasting**: Predictive models estimating congestion levels at key junctions using historical data and ML pipelines.
- **Pollution Heatmaps**: Real-time visualization of AQI and environmental metrics across the city's zones.

### 🏛️ Official Governance Dashboard
- **Ward-wise Performance**: Dynamic scores (0-100) for all 136+ wards based on service delivery.
- **Priority Grievance Redressal**: AI-sorted complaint queues ensuring critical issues are addressed first.
- **Resource Optimization**: Live tracking of water supply, sanitation hygiene, and street infrastructure health.

### 👤 Citizen Empowerment Portal
- **One-Click Complaints**: Smart submission with photo/video support and automated routing.
- **Live Tracking**: Transparency in the resolution lifecycle with SMS/Push alerts.
- **Demo Access**: Simplified login for testing and developer demonstration.

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Frontend** | [Next.js 14](https://nextjs.org/), [React](https://reactjs.org/), [MUI](https://mui.com/) |
| **AI Backend** | [FastAPI](https://fastapi.tiangolo.com/), [Python 3.10+](https://www.python.org/) |
| **Generative AI**| [Google Gemini 1.5 Flash](https://aistudio.google.com/) |
| **Databases** | [MongoDB Atlas](https://www.mongodb.com/cloud/atlas), [PostgreSQL](https://www.postgresql.org/) |
| **Visualization**| [Leaflet.js](https://leafletjs.org/) (Maps), [Chart.js](https://www.chartjs.org/) |
| **DevOps** | [Docker](https://www.docker.com/), [Docker Compose](https://docs.docker.com/compose/) |

---

## ⚙️ Getting Started

### Prerequisites
- **Node.js**: v18.0+ 
- **Docker**: Latest version (for Backend services)
- **Git**

### 📦 Installation

#### 1. Clone the Repository
```bash
git clone https://github.com/agnibytes/MyNagpur.git
cd MyNagpur
```

#### 2. Frontend Setup (Next.js)
```bash
# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
# Edit .env and add your MONGODB_URI and JWT_SECRET

# Run in development mode
npm run dev
```

#### 3. AI Backend Setup (Docker)
The backend services (FastAPI, Redis, PostgreSQL) are containerized for easy deployment.
```bash
cd majha-nagpur-backend

# Setup environment variables in docker-compose.yml or a .env file
# Ensure GEMINI_API_KEY is provided

# Build and start services
docker-compose up --build
```

---

## 📊 Dashboard Preview

````carousel
![Full Dashboard](file:///home/vinman/.gemini/antigravity/brain/67fadc72-5853-42a9-87ab-76f2340b53a0/nagpur_gov_dashboard_full_1773382202251.png)
<!-- slide -->
![AI Analytics Section](file:///home/vinman/.gemini/antigravity/brain/67fadc72-5853-42a9-87ab-76f2340b53a0/ai_analytics_section_1773382807035.png)
<!-- slide -->
![Ward Complaints](file:///home/vinman/.gemini/antigravity/brain/67fadc72-5853-42a9-87ab-76f2340b53a0/nagpur_dashboard_complaints_1773379902115.png)
````

---

## 🗺️ Project Structure
```text
.
├── app/                    # Next.js App Router (Frontend)
├── components/             # Reusable UI Components
├── majha-nagpur-backend/  # Python AI Backend (FastAPI)
│   ├── app/                # API Routes & Logic
│   ├── data/               # Datasets & ML Models
│   └── docker-compose.yml  # Service Orchestration
├── server/                 # Node.js Support Server (Legacy/Admin)
└── public/                 # Static Assets
```

---

## 🤝 Contributing
We welcome contributions to help make Nagpur a smarter city!
1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

<div align="center">

**Built with ❤️ for Indian Urban Innovation**

*Empowering Citizens • Transforming Governance • Building Transparency*

⭐ Star us on GitHub!

</div>
