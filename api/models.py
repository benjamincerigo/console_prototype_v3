import datetime
from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Date, DateTime, func
from sqlalchemy.orm import relationship

from .database import Base


class Instance(Base):
    __tablename__ = 'instances'
    id = Column(String(200), primary_key=True)
    name = Column(String(200))
    description = Column(String(300))
    status = Column(String(100), default='initializing')
    environment_id = Column(String(100))
    created_at = Column(DateTime, default=func.current_timestamp())
    days_until_pi_expiration = Column(Integer, default=183)
    days_until_all_data_expiration = Column(Integer, default=183)
    gathers = relationship("Gather", back_populates="instance")
    instance_runs = relationship("InstanceRun", back_populates="instance")


class Gather(Base):
    __tablename__ = 'gathers'
    id = Column(Integer, primary_key=True)
    created_at = Column(Date, default=datetime.datetime.now)
    platform = Column(String(50), nullable=False)
    source = Column(String(50), nullable=False)
    start_date = Column(Date, nullable=False)
    end_date = Column(Date, nullable=False)
    updating = Column(String(50), nullable=True)
    last_run_at = Column(DateTime, nullable=True)

    # relationships
    instance_id = Column(Integer, ForeignKey('instances.id'))
    instance = relationship("Instance", back_populates="gathers")


class InstanceRun(Base):
    __tablename__ = 'instance_runs'
    id = Column(Integer, primary_key=True)
    created_at = Column(Date, default=datetime.datetime.now)
    completed_at = Column(Date, nullable=True)
    instance_id = Column(Integer, ForeignKey('instances.id'))
    instance = relationship("Instance", back_populates="instance_runs")
