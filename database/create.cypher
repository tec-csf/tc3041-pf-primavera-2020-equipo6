CREATE CONSTRAINT ON (movie:Movie) ASSERT movie.id IS UNIQUE;
CREATE CONSTRAINT ON (genre:Genre) ASSERT genre.id IS UNIQUE;
CREATE CONSTRAINT ON (person:Person) ASSERT person.id IS UNIQUE;
CREATE CONSTRAINT ON (user:User) ASSERT user.id IS UNIQUE;
CREATE CONSTRAINT ON (keyword:Keyword) ASSERT keyword.id IS UNIQUE;

LOAD CSV WITH HEADERS FROM "file:///genres.csv" AS row
MERGE (m:Movie {id: toInteger(row.movie_id), title:row.movie_title})
MERGE (g:Genre {id: toInteger(row.genre_id), name:row.genre_name})
MERGE (m)-[:IN_GENRE]->(g);

LOAD CSV WITH HEADERS FROM "file:///director.csv" AS row
MERGE (m:Movie {id: toInteger(row.movie_id), title:row.movie_title})
MERGE (p:Person {id: toInteger(row.director_id), name:row.director_name})
MERGE (p)-[:DIRECTED]->(m);

LOAD CSV WITH HEADERS FROM "file:///actor.csv" AS row
MERGE (m:Movie {id: toInteger(row.movie_id), title:row.movie_title})
MERGE (p:Person {id: toInteger(row.actor_id), name:row.actor_name})
MERGE (p)-[:ACTED_IN]->(m);

LOAD CSV WITH HEADERS FROM "file:///keyword.csv" AS row
MERGE (m:Movie {id: toInteger(row.movie_id), title:row.movie_title})
MERGE (k:Keyword {id: toInteger(row.keyword_id), name:row.keyword_name})
MERGE (m)-[:HAS_KEYWORD]->(k);