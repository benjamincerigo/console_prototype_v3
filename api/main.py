from fastapi import Depends, FastAPI, HTTPException
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware

from . import crud, models, schemas
from .database import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:5173",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.post("/instances/", response_model=schemas.Instance)
def create_instance(instance: schemas.InstanceCreate, db: Session = Depends(get_db)):
    db_instance = crud.get_instance_by_name(db, name=instance.name)
    if db_instance:
        raise HTTPException(status_code=400, detail="Email already registered")
    return crud.create_instance(db=db, instance=instance)


@app.get("/instances/", response_model=list[schemas.Instance])
def read_instances(start: int = 0, end: int = 100, db: Session = Depends(get_db)):
    limit = end - start
    instances = crud.get_instances(db, skip=start, limit=limit)
    return instances


@app.get("/instances/{instance_id}", response_model=schemas.Instance)
def read_instance(instance_id: int, db: Session = Depends(get_db)):
    db_instance = crud.get_instance(db, instance_id=instance_id)
    if db_instance is None:
        raise HTTPException(status_code=404, detail="Instance not found")
    return db_instance


@app.post("/instances/{instance_id}/gathers/", response_model=schemas.Gather)
def create_gather_for_instance(
    instance_id: int, gather: schemas.GatherCreate, db: Session = Depends(get_db)
):
    return crud.create_instance_gather(db=db, gather=gather, instance_id=instance_id)


@app.get("/instances/{instance_id}/gathers", response_model=list[schemas.Gather])
def get_gather_for_instance(
    instance_id: int, db: Session = Depends(get_db)
):
    return crud.get_gathers_for_instance(db=db, instance_id=instance_id)


@app.get("/gathers/", response_model=list[schemas.Gather])
def read_gathers(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    gathers = crud.get_gathers(db, skip=skip, limit=limit)
    return gathers
