from sqlalchemy.orm import Session

from . import models, schemas


def get_instance(db: Session, instance_id: int):
    return db.query(models.Instance).filter(models.Instance.id == instance_id).first()


def get_instance_by_name(db: Session, name: str):
    return db.query(models.Instance).filter(models.Instance.name == name).first()


def get_instances(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Instance).offset(skip).limit(limit).all()


def create_instance(db: Session, instance: schemas.InstanceCreate):
    db_instance = models.Instance(**instance.dict())
    db.add(db_instance)
    db.commit()
    db.refresh(db_instance)
    return db_instance


def get_gathers(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Gather).offset(skip).limit(limit).all()


def get_gathers_for_instance(db: Session, instance_id: int):
    return db.query(models.Gather).filter(models.Gather.instance_id == instance_id).all()

def create_instance_gather(db: Session, gather: schemas.GatherCreate, instance_id: int):
    db_gather = models.Gather(**gather.dict(), instance_id=instance_id)
    db.add(db_gather)
    db.commit()
    db.refresh(db_gather)
    return db_gather
