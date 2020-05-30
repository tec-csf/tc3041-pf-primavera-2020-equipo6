import csv
import tmdbsimple as tmdb

from ast import literal_eval

BASE_URL = 'https://image.tmdb.org/t/p/w300'

def readCsvFile(filename):
    # initializing the titles and rows list
    rows = []

    # reading csv file
    with open(filename, 'r') as csvfile:
        # creating a csv reader object
        csvreader = csv.DictReader(csvfile)
        # extracting each data row one by one
        for row in csvreader:
            rows.append(row)

    return rows


def writeToFile(filename, fields, rows):
    with open(filename, 'w') as csvfile:
        writer = csv.DictWriter(csvfile, fieldnames=fields)
        writer.writeheader()
        for row in rows:
            writer.writerow(row)


def columnsToObject(rows, fields):
    for row in rows:
        for field in fields:
            row[field] = literal_eval(row[field])


def genGenreRelations(rows):
    res = []
    fields = ['movie_id', 'movie_title', 'genre_id', 'genre_name']
    for row in rows:
        movie_title = row['title']
        movie_id = row['id']
        for genre in row['genres']:
            entry = {
                'movie_id': movie_id,
                'movie_title': movie_title,
                'genre_id': genre['id'],
                'genre_name': genre['name']
            }
            res.append(entry)
    return fields, res


def genKeywordRelations(rows):
    res = []
    fields = ['movie_id', 'movie_title', 'keyword_id', 'keyword_name']
    for row in rows:
        movie_title = row['title']
        movie_id = row['id']
        for i, keyword in enumerate(row['keywords']):
            if i > 4: break
            entry = {
                'movie_id': movie_id,
                'movie_title': movie_title,
                'keyword_id': keyword['id'],
                'keyword_name': keyword['name']
            }
            res.append(entry)
    return fields, res


def genDirectorRelations(rows):
    res = []
    fields = ['movie_id', 'movie_title', 'director_id', 'director_name']
    for row in rows:
        movie_title = row['title']
        movie_id = row['movie_id']
        for crew in row['crew']:
            if crew['job'] == 'Director':
                entry = {
                    'movie_id': movie_id,
                    'movie_title': movie_title,
                    'director_id': crew['id'],
                    'director_name': crew['name']
                }
                res.append(entry)
    return fields, res


def genActorRelations(rows):
    res = []
    fields = ['movie_id', 'movie_title', 'actor_id', 'actor_name']
    for row in rows:
        movie_title = row['title']
        movie_id = row['movie_id']
        # Add up to 5 actors per movie
        for i, cast in enumerate(row['cast']):
            if i > 4: break
            entry = {
                'movie_id': movie_id,
                'movie_title': movie_title,
                'actor_id': cast['id'],
                'actor_name': cast['name']
            }
            res.append(entry)
    return fields, res

def getMoviePosters(rows):
    res = []
    fields = ['movie_id', 'movie_title', 'poster_url']
    for i, row in enumerate(rows):
        movie_title = row['title']
        movie_id = row['id']
        # Add up to 5 actors per movie
        movie = tmdb.Movies(movie_id)
        try:
            response = movie.info()
        except:
            continue
        url = response['poster_path']
        if url is None:
            continue
        poster_url = BASE_URL + url
        entry = {
            'movie_id': movie_id,
            'movie_title': movie_title,
            'poster_url': poster_url
        }
        res.append(entry)
    return fields, res


def main():
    tmdb.API_KEY = 'f191d6e48bdc99b7c4efe47235236f3a'
    rows_d = readCsvFile("dataset/tmdb_5000_movies.csv")
    rows_c = readCsvFile("dataset/tmdb_5000_credits.csv")
    columnsToObject(rows_d, ['genres', 'keywords'])
    columnsToObject(rows_c, ['cast', 'crew'])
    posters_f, posters_r = getMoviePosters(rows_d)
    writeToFile('gen/posters.csv', posters_f, posters_r)
    genres_f, genres_r = genGenreRelations(rows_d)
    writeToFile('gen/genres.csv', genres_f, genres_r)
    keyword_f, keyword_r = genKeywordRelations(rows_d)
    writeToFile('gen/keyword.csv', keyword_f, keyword_r)
    director_f, director_r = genDirectorRelations(rows_c)
    writeToFile('gen/director.csv', director_f, director_r)
    actor_f, actor_r = genActorRelations(rows_c)
    writeToFile('gen/actor.csv', actor_f, actor_r)


main()
