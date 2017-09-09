create database "docker-demo-app";

\connect "docker-demo-app";

create table todo (
    id serial primary key,
    description text not null
)
