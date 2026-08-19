
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

```text
 (Company) <------- [:POSTED_BY] ------- (Job) ------- [:LOCATED_IN] -------> (Location)
                                           |
                                      [:REQUIRES]
                                           |
                                           v
                                        (Skill)
Node Types: Job, Skill, Company, Location

Relationships: [:REQUIRES], [:POSTED_BY], [:LOCATED_IN]

🚀 Application Features
Match Jobs Tab:

Enter candidate skills (e.g., Java, React, Spring Boot).

Fetches real-time recommendations using multi-hop Cypher traversals.

Renders match percentage badges based on skill node intersections.

Post Job Tab:

Form interface to create and link new job nodes.

Sends JSON payloads to Spring Boot, which writes Job, Company, Location, and Skill nodes directly to CognoDB.

🛠️ Tech Stack
Frontend: React.js, Vite, CSS3, Fetch API

Backend Link: Spring Boot REST API (http://localhost:8080/api/jobs)

Database: CognoDB Cloud (Neo4j Bolt Protocol)

💻 Local Setup Instructions
Clone the repository:

Bash
git clone [https://github.com/](https://github.com/)<YOUR_GITHUB_USERNAME>/jobgraph-frontend.git
cd jobgraph-frontend
Install Dependencies:

Bash
npm install
Run Development Server:

Bash
npm run dev
Open http://localhost:5173 in your browser.

🗄️ Database Seed Queries
A seed.cypher file is included in the project root containing Cypher scripts to populate sample data into the CognoDB Cloud console.

🔗 Repository Links
Frontend Repo: https://github.com/yarlagaddaraja/jobgraph-application

Backend Repo: https://github.com/<YOUR_GITHUB_USERNAME>/jobgraph-backend4

Deployment link:  https://jobgraph-application.vercel.app/

<img width="1920" height="1080" alt="{1FD3C26C-FB5E-4495-9766-354A883C44A0}" src="https://github.com/user-attachments/assets/bf2a9b81-f3d4-4564-af2d-be4c4fc27059" />




