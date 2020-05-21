// Find similar movies by common genres
// Find similar movies by common genres
MATCH (m:Movie) WHERE m.title = "Inception"
MATCH (m)-[:IN_GENRE]->(g:Genre)<-[:IN_GENRE]-(rec:Movie)

WITH m, rec, COUNT(*) AS gs

OPTIONAL MATCH (m)<-[:ACTED_IN]-(a:Person)-[:ACTED_IN]->(rec)
WITH m, rec, gs, COUNT(a) AS as

OPTIONAL MATCH (m)<-[:DIRECTED]-(d:Person)-[:DIRECTED]->(rec)
WITH m, rec, gs, as, COUNT(d) AS ds

OPTIONAL MATCH (m)-[:HAS_KEYWORD]->(k:Keyword)<-[:HAS_KEYWORD]-(rec)
WITH m, rec, gs, as, ds, COUNT(k) AS ks

RETURN rec.title AS recommendation, rec.id as id, (1*gs)+(1*as)+(1*ds)+(1*ks) AS score ORDER BY score DESC LIMIT 1