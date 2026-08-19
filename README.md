
# JobGraph AI — React Frontend

JobGraph AI is an interactive web interface designed to connect job seekers with relevant job postings using graph-based skill analytics. Built with **React** and **Vite**, this application communicates directly with a **Spring Boot** backend powered by **CognoDB (Neo4j OpenCypher Engine)** to execute graph traversals and live node creation.

---

## 🌟 Why a Graph Database?

Relational databases struggle with multi-hop connections. Identifying jobs based on overlapping skill sets across various locations and companies requires heavy `JOIN` operations that slow down under scale.

By leveraging a **Graph Database**:
* **Direct Traversals:** Entities (`Job`, `Skill`, `Company`, `Location`) are nodes. Relationships (`(:Job)-[:REQUIRES]->(:Skill)`) are traversed directly.
* **Instant Skill Matching:** Real-time graph queries compute match percentage scores between candidate input skills and job requirements in milliseconds.
* **Flexible Data Structure:** Adding new relationships requires no complex schema migrations.

---

## 📐 Graph Model Overview

`text
 (Company) <------- [:POSTED_BY] ------- (Job) ------- [:LOCATED_IN] -------> (Location)
                                            |
                                       [:REQUIRES]
                                            |
                                            v
                                         (Skill)


* **Node Types:** `Job`, `Skill`, `Company`, `Location`
* **Relationships:** `[:REQUIRES]`, `[:POSTED_BY]`, `[:LOCATED_IN]`

---

## 🚀 Application Features

**Match Jobs Tab:**

* Enter candidate skills (e.g., Java, React, Spring Boot).
* Fetches real-time recommendations using multi-hop Cypher traversals.
* Renders match percentage badges based on skill node intersections.

**Post Job Tab:**

* Form interface to create and link new job nodes.
* Sends JSON payloads to Spring Boot, which writes Job, Company, Location, and Skill nodes directly to CognoDB.

---

## 🛠️ Tech Stack

* **Frontend:** React.js, Vite, CSS3, Fetch API
* **Backend:** Spring Boot REST API
* **Database:** CognoDB Cloud (Neo4j Bolt Protocol)

---

## 💻 Local Setup Instructions

1. **Clone the repository:**
``bash
git clone [https://github.com/yarlagaddaraja/jobgraph-application.git](https://github.com/yarlagaddaraja/jobgraph-application.git)
cd jobgraph-application



2. **Install Dependencies:**
``bash
npm install

``


3. **Run Development Server:**
`bash
npm run dev

``


Open `http://localhost:5173` in your browser.



## 🗄️ Database Seed Queries

A `seed.cypher` file is included in the project root containing Cypher scripts to populate sample data into the CognoDB Cloud console.

---
## 🔗 Project Links

* **Live Hosted Application: https://jobgraph-application.vercel.app/
* **Frontend Repo: https://github.com/yarlagaddaraja/jobgraph-application
* **Backend Repo:  https://github.com/yarlagaddaraja/jobgraph-backend

---
## 🖼️ Application Screenshot

<img width="1920" height="1080" alt="{2188E4D9-5D1F-4234-A5B6-12EF0086DA5E}" src="https://github.com/user-attachments/assets/fec59701-4ea8-462d-a814-2bb23f4e443e" />
<img width="1920" height="1080" alt="{7F3001B5-0E00-4EBD-8364-0D73BFB20921}" src="https://github.com/user-attachments/assets/8b05cef5-e9eb-40e7-aac8-a61f71568866" />
<img width="1920" height="1080" alt="{1A5180B3-E606-4349-8305-AA9A226147B5}" src="https://github.com/user-attachments/assets/d5d3ed2f-e197-4734-b82f-ffafbe494325" />



```
