// Create Skills
CREATE (s1:Skill {name: 'Java'})
CREATE (s2:Skill {name: 'React'})
CREATE (s3:Skill {name: 'Spring Boot'})
CREATE (s4:Skill {name: 'SQL'})

// Create Companies & Locations
CREATE (c1:Company {name: 'Tech Corp'})
CREATE (l1:Location {city: 'Hyderabad'})

// Create Sample Job and Link Relationships
CREATE (j1:Job {
  id: 'JOB001', 
  title: 'Full Stack Engineer', 
  description: 'Build enterprise web applications with React and Spring Boot', 
  experience: '1-3 years'
})

CREATE (j1)-[:POSTED_BY]->(c1)
CREATE (j1)-[:LOCATED_IN]->(l1)
CREATE (j1)-[:REQUIRES]->(s1)
CREATE (j1)-[:REQUIRES]->(s2)
CREATE (j1)-[:REQUIRES]->(s3);