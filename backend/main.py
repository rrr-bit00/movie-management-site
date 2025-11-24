from fastapi import FastAPI, HTTPException, Depends
from sqlalchemy.orm import Session
from schemas import MovieCreate, MovieResponse, MovieUpdate
from crud import create_movie, get_movies, update_movie, delete_movie
from database import engine, Base, SessionLocal
from models import Movie

app = FastAPI()

Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/movies", response_model=MovieResponse)
def add_movie(movie: MovieCreate):
    return create_movie(movie)

@app.get("/movies", response_model=list[MovieResponse])
def list_movies():
    return get_movies()

@app.get("/movies/{movie_id}", response_model=MovieResponse)
def read_movie(movie_id: int, db: Session = Depends(get_db)):
    movie = db.query(Movie).filter(Movie.id == movie_id).first()
    if movie is None:
        raise HTTPException(status_code=404, detail="Movie not found")
    return movie

@app.put("/movies/{movie_id}", response_model=MovieResponse)
def update_movie_info(movie_id: int, movie: MovieUpdate, db: Session = Depends(get_db)):
    updated = update_movie(db, movie_id, movie)
    if updated is None:
        raise HTTPException(status_code=404, detail="Movie not found")
    return updated

@app.delete("/movies/{movie_id}", response_model=MovieResponse)
def delete_movie_info(movie_id: int, db: Session = Depends(get_db)):
    deleted = delete_movie(db, movie_id)
    if deleted is None:
        raise HTTPException(status_code=404, detail="Movie not found")
    return deleted
