import datetime
from pydantic import BaseModel


class GatherBase(BaseModel):
    platform: str
    source: str
    start_date: datetime.date
    end_date: datetime.date
    updating: str | None = None


class GatherCreate(GatherBase):
    pass


class Gather(GatherBase):
    id: int
    created_at: datetime.date
    last_run_at: datetime.datetime | None = None

    class Config:
        orm_mode = True


class InstanceBase(BaseModel):
    name: str
    description: str | None = None


class InstanceCreate(InstanceBase):
    pass


class Instance(InstanceBase):
    id: int
    status: str
    gathers: list[Gather] = []
    created_at: datetime.datetime
    last_run_at: datetime.datetime | None = None

    class Config:
        orm_mode = True


class RunBase(BaseModel):
    pass


class RunCreate(RunBase):
    pass


class Run(RunBase):
    id: int
    created_at: datetime.datetime
    completed_at: datetime.datetime | None = None

    class Config:
        orm_mode = True
