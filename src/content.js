// All site content lives here. To update the site, edit this file only.

export const PROFILE = {
  name: "Aaron Nguyen",
  title: "Data Analytics & Engineering",
  location: "Denton, TX",
  blurb:
    "M.S. Business Analytics & A.I. student at UT Dallas. I build data pipelines, analytics tooling, and backend systems that turn raw data into decisions.",
  email: "aaron.nguyen703@gmail.com",
  github: "https://github.com/M239852",
  linkedin: "https://linkedin.com/in/aaronnguyencs",
};

export const EXPERIENCE = [
  {
    role: "Data Analyst Intern",
    company: "Safran Helicopter Engines",
    period: "May 2026 — Aug 2026",
    stack: "Excel, Power Query, Power BI, SAP",
    points: [
      "Implemented a data search feature in Excel using Power Query to streamline manual workflows, reducing data search time by 3%.",
      "Built a KPI efficiency report to support daily Quality Control meetings, enabling faster, data-driven decision-making.",
      "Gathered and cleaned enterprise SAP data, then developed interactive Power BI visualizations for internal departments.",
    ],
  },
  {
    role: "Software Developer",
    company: "Synergy Solutions, University of North Texas",
    period: "2025 — 2026",
    stack: "Unity, C#, Meta Quest 3",
    points: [
      "Developed C# scripts for a VR cognitive assessment platform, including an event-driven architecture, session state machine, and hardware monitoring system.",
      "Built a minimalistic World Space UI with patient ID display, floor plan selection cards, and real-time hardware status indicators optimized for clinical VR use.",
      "Implemented VR locomotion controls with dynamic movement, snap/continuous turn, and teleportation, with automatic freezing during menu interactions via a custom event bus.",
    ],
  },
];

export const PROJECTS = [
  {
    title: "ETL Data Pipeline — Cryptocurrency Price Automation",
    year: "2025",
    stack: "Python, REST API, Pandas, SQL, Airflow",
    points: [
      "Engineered a Python-based ETL pipeline extracting live cryptocurrency data from the CoinGecko API, handling multiple coin IDs and dynamic query parameters.",
      "Designed a Pandas transformation layer to flatten nested JSON, standardize schema fields, and append UTC timestamps for time-series tracking.",
      "Automated refreshes using cron scheduling and Apache Airflow, simulating real-world data pipeline orchestration.",
    ],
  },
  {
    title: "FoodPal — AI Restaurant Recommendation System",
    year: "2025",
    stack: "Python, FastAPI, Streamlit, Yelp API",
    points: [
      "Built a conversational restaurant recommendation chatbot for the DFW area, parsing natural language queries with regex-based NLP for cuisine, price, distance, and dietary preferences.",
      "Designed a weighted ranking algorithm (40% rating, 30% price, 20% distance, 10% cuisine) scoring 300+ live Yelp listings.",
      "Developed a FastAPI backend with /extract and /recommend endpoints and a Streamlit frontend with real-time results and responsive card design.",
    ],
  },
  {
    title: "Retail Store Database Management System",
    year: "2023",
    stack: "Docker, Azure SQL",
    points: [
      "Built a containerized retail database to store and analyze business data within Azure SQL Edge.",
      "Designed relational schemas and data-modeling diagrams to manage inventory and sales operations.",
      "Implemented advanced SQL queries for filtering, aggregation, and table joins.",
    ],
  },
];

export const SKILLS = [
  { label: "Languages", items: "Python, SQL, C++, C, HTML, CSS, JavaScript" },
  {
    label: "Data & Analytics",
    items: "Pandas, PostgreSQL, ETL Pipelines, REST APIs, Data Modeling, Statistical Analysis",
  },
  {
    label: "Tools & Platforms",
    items: "Excel, Power BI, Databricks, Docker, Azure Data Studio, AWS, GCP, Microsoft Azure",
  },
  {
    label: "Frameworks",
    items: "FastAPI, Streamlit, Bootstrap, Apache Airflow, GitHub, Visual Studio",
  },
];

export const EDUCATION = [
  {
    school: "University of Texas at Dallas",
    degree: "M.S. Business Analytics & A.I.",
    period: "Aug 2026 — Present",
  },
  {
    school: "University of North Texas",
    degree: "B.S. Computer Science (ABET Accredited)",
    period: "Aug 2022 — May 2026",
  },
];

export const CERTIFICATIONS = [
  { org: "Amazon", name: "Cloud Technical Essentials" },
  { org: "Meta", name: "Introduction to Back-End Development" },
  { org: "Google", name: "Cloud Fundamentals: Core Infrastructure" },
  { org: "Microsoft", name: "Azure Data Fundamentals" },
];
