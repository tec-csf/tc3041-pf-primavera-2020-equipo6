// Find similar movies by common genres
MATCH (u:User {email:"email"})-[l:LIKES{score:1}]->(m:Movie)
MATCH (m)-[:IN_GENRE]->(g:Genre)<-[:IN_GENRE]-(rec:Movie)

WITH m, rec, COUNT(*) AS gs

OPTIONAL MATCH (m)<-[:ACTED_IN]-(a:Person)-[:ACTED_IN]->(rec)
WITH m, rec, gs, COUNT(a) AS as

OPTIONAL MATCH (m)<-[:DIRECTED]-(d:Person)-[:DIRECTED]->(rec)
WITH m, rec, gs, as, COUNT(d) AS ds

OPTIONAL MATCH (m)-[:HAS_KEYWORD]->(k:Keyword)<-[:HAS_KEYWORD]-(rec)
WITH m, rec, gs, as, ds, COUNT(k) AS ks

RETURN rec.title AS recommendation, rec.id as id, (1*gs)+(1*as)+(1*ds)+(1*ks) AS score ORDER BY score DESC LIMIT 10
// Find how similar two users are
MATCH (p1:User {id: "id1"})-[x:LIKES]->(m:Movie)<-[y:LIKES]-(p2:User {id: "id2"})
WITH COUNT(m) AS numbermovies, SUM(x.score * y.score) AS xyDotProduct,
SQRT(REDUCE(xDot = 0.0, a IN COLLECT(x.score) | xDot + a^2)) AS xLength,
SQRT(REDUCE(yDot = 0.0, b IN COLLECT(y.score) | yDot + b^2)) AS yLength,
p1, p2 WHERE numbermovies > 5
RETURN xyDotProduct / (xLength * yLength) as sim