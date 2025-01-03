from fastapi import FastAPI
from pydantic import BaseModel
from typing import List
import cx_Oracle
from couchbase.cluster import Cluster, ClusterOptions
from couchbase_core.cluster import PasswordAuthenticator

app = FastAPI()

# Oracle connection
oracle_dsn = cx_Oracle.makedsn("illin659", "1521", service_name="DMCNV")
oracle_conn = cx_Oracle.connect(user="soumyakp", password="soumyakp", dsn=oracle_dsn)

# Couchbase connection 
cluster = Cluster('couchbase://localhost', ClusterOptions(PasswordAuthenticator('username', 'password')))
#Administrator
bucket = cluster.bucket('Books')
collection = bucket.default_collection()

class Author(BaseModel):
    id: int
    name: str

class Book(BaseModel):
    id: int
    title: str
    author_id: int

@app.get("/authors", response_model=List[Author])
def get_authors():
    cursor = oracle_conn.cursor()
    cursor.execute("SELECT id, name FROM Authors")
    authors = cursor.fetchall()
    return [{"id": row[0], "name": row[1]} for row in authors]

@app.post("/authors")
def create_author(author: Author):
    cursor = oracle_conn.cursor()
    cursor.execute("INSERT INTO Authors (id, name) VALUES (:1, :2)", (author.id, author.name))
    oracle_conn.commit()
    return author

@app.get("/books", response_model=List[Book])
def get_books():
    query = "SELECT meta().id, title, author_id FROM `Books`"
    result = cluster.query(query)
    books = [{"id": row["id"], "title": row["title"], "author_id": row["author_id"]} for row in result]
    return books

@app.post("/books")
def create_book(book: Book):
    collection.upsert(str(book.id), {"title": book.title, "author_id": book.author_id})
    return book