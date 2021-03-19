create database authapp;
use authapp;

create table users(
    email varchar(100) not null,
    password text not null,
    createdAt datetime default current_timestamp,
    updatedAt datetime update current_timestamp
);
