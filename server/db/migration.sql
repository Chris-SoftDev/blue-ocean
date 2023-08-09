DROP TABLE IF EXISTS nps;
DROP TABLE IF EXISTS assessments;
DROP TABLE IF EXISTS messages;
DROP TABLE IF EXISTS students;
DROP TABLE IF EXISTS cohorts;
DROP TABLE IF EXISTS instructors;

CREATE TABLE instructors (
    id serial primary key,
    name varchar,
    email varchar,
    picture varchar,
    password varchar,
    jwt varchar
);

CREATE TABLE cohorts (
    id serial primary key,
    name varchar,
    start_date varchar,
    end_date varchar,
    instructor_id integer references instructors(id)
);

CREATE TABLE students (
    id serial primary key,
    name varchar,
    instructor_name varchar,
    email varchar,
    picture varchar,
    last_login varchar,
    is_present boolean, -- present or absent status
    average_grade integer,
    absences integer,
    password varchar,
    jwt varchar,
    cohort_id integer references cohorts(id)
);

CREATE TABLE messages (
    id serial primary key,
    student_originated boolean, -- determines which side to show messages on: one side for student-sent messages, the other for instructor-sent messages
    date_sent varchar, -- values pulled from client using ${date.getMonth()}/${date.getDate()}/${date.getFullYear()} ${date.getHours() > 12 ? date.getHours() - 12 : date.getHours()}:${date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()} ${date.getHours() > 12 ? "PM" : "AM"}
    content varchar,
    student_id integer references students(id)
);

CREATE TABLE assessments (
    id serial primary key,
    name varchar,
    week integer,
    grade integer,
    student_id integer references students(id),
    cohort_id integer references cohorts(id)
);

CREATE TABLE nps (
    id serial primary key,
    week integer,
    score integer,
    student_id integer references students(id),
    cohort_id integer references cohorts(id)
);