# syntax=docker/dockerfile:1

FROM python:3.10

WORKDIR /app

COPY poetry.lock poetry.lock
COPY pyproject_for_docker.toml pyproject.toml

RUN python3 -m pip install "poetry==1.2.2"
RUN poetry config virtualenvs.create false && poetry install

COPY . .

CMD [ "poetry", "run", "uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "3000" ]