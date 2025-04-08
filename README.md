## Database Setup
1.Create the Database:
CREATE DATABASE taskmanagerapp;

2.Optionally Run the SQL Script
(If you have a pre-defined schema and data in taskmanagerapp.sql, run it to set up the tables)
mysql -u <your-username> -p taskmanagerapp < path/to/taskmanagerapp.sql

## Update Backend Configuration
(Open src/main/resources/application.properties (or application.yml) in the backend project and ensure the database connection settings match)

spring.datasource.url=jdbc:mysql://localhost:3306/taskmanagerapp
spring.datasource.username=<your-username>
spring.datasource.password=<your-password>
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

## Running the Backend
Easy to run in intellij

## Running the Frontend
(Install the required Node.js packages)
npm install

## Run the Angular Application
(Start the Angular development server)
ng serve
