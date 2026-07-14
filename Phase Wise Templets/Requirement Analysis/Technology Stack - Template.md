Project Design Phase-II

Technology Stack (Architecture & Stack)

| Date | 10 July 2026 |
|---|---|
| Team ID |  |
| Project Name | HouseHunt |
| Maximum Marks | 4 Marks |


Technical Architecture:

The Deliverable shall include the architectural diagram as below and the information as per the table1 & table 2

Example: Order processing during pandemics for offline mode

Reference: https://developer.ibm.com/patterns/ai-powered-backend-system-for-order-processing-during-pandemics/

Table-1 : Components & Technologies:

| S.No | Component | Description | Technology |
|---|---|---|---|
|  | User Interface | How user interacts with application e.g. Web UI, Mobile App, Chatbot etc. | React.js, HTML, CSS |
|  | Application Logic-1 | Logic for a process in the application | Node.js, Express.js |
|  | Application Logic-2 | Logic for a process in the application | JWT Authentication |
|  | Application Logic-3 | Logic for a process in the application | Mongoose ODM |
|  | Database | Data Type, Configurations etc. | MongoDB |
|  | Cloud Database | Database Service on Cloud | MongoDB Atlas |
|  | File Storage | File storage requirements | Cloudinary / AWS S3 (Images) |
|  | External API-1 | Purpose of External API used in the application | Google Maps API |
|  | External API-2 | Purpose of External API used in the application | N/A |
|  | Machine Learning Model | Purpose of Machine Learning Model | N/A |
|  | Infrastructure (Server / Cloud) | Application Deployment on Local System / Cloud Local Server Configuration: Cloud Server Configuration : | Vercel/Netlify for Frontend, Render/Heroku for Backend |


Table-2: Application Characteristics:

| S.No | Characteristics | Description | Technology |
|---|---|---|---|
|  | Open-Source Frameworks | List the open-source frameworks used | React, Express, Node |
|  | Security Implementations | List all the security / access controls implemented, use of firewalls etc. | Bcrypt for password hashing, JWT for sessions, CORS enabled |
|  | Scalable Architecture | Justify the scalability of architecture (3 – tier, Micro-services) | Monolithic backend with scalable NoSQL DB (MongoDB Atlas) |
|  | Availability | Justify the availability of application (e.g. use of load balancers, distributed servers etc.) | Deployed on highly available cloud platforms (e.g. Render/Vercel) |
|  | Performance | Design consideration for the performance of the application (number of requests per sec, use of Cache, use of CDN’s) etc. | Optimized MongoDB queries, React Lazy loading |


References:

https://c4model.com/

https://developer.ibm.com/patterns/online-order-processing-system-during-pandemic/

https://www.ibm.com/cloud/architecture

https://aws.amazon.com/architecture

https://medium.com/the-internal-startup/how-to-draw-useful-technical-architecture-diagrams-2d20c9fda90d
