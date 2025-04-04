1. Install PostgreSQL https://www.enterprisedb.com/downloads/postgres-postgresql-downloads(set password to admin)
2. Add bin path(C/Program Files/postgres/bin) to PATH env variables
3. In pgAdmin: Object -> Register-> Server (name: EventReport)

4. Connection Tab:
Host name/address: localhost
Port: 5432
Maintenance database: postgres
Username: postgres
Password: admin

5. Creare db numit events, dupa click dreapta pe el Query Tool si rulare query:
CREATE TABLE events_frontend (
    id SERIAL PRIMARY KEY,
    type VARCHAR(100) NOT NULL,
    coordinate_lat DOUBLE PRECISION NOT NULL,
    coordinate_long DOUBLE PRECISION NOT NULL,
    description TEXT,
    timestamp TIMESTAMP NOT NULL,
    email_user VARCHAR(255)
);

6. Adaugare eveniment -> rulare query pe db
INSERT INTO events_frontend (type, coordinate_lat, coordinate_long, description, timestamp, email_user)
VALUES ('Earthquake', 40.7128, -74.0060, 'A major earthquake occurred in New York City', '2025-03-09 10:00:00', 'user@example.com');

7. Rulare backend -> Intellij -> Open Project(backend). Apasat pe run in ProiectIbdApplication
8. Testare din Postman -> cerere de get la http://localhost:9090/report/get-events/1 sau cerere de post

9. Frontend -> deschis in vs code, in powershell instalat node.js si rulat npm install in folderul frontend, daca are probleme 'npm install --legacy-peer-deps'
-> npm install -g @angular/cli
-> pentru rulare: ng serve
-> ruleaza pe http://localhost:4200/

10. Android -> instalat android studio, instalat dispozitiv emulare si rulat
