## Link24 — Full-Stack URL-Shortener

Ein umfassender Full-Stack-URL-Verkürzungsdienst für anonyme und registrierte Benutzer. Anonyme Nutzer können schnell temporäre Kurzlinks erstellen; registrierte Benutzer erhalten ein persönliches Dashboard mit Verlauf, benutzerdefinierten Slugs, Ablaufdatumsteuerung und Klick-Tracking. Das System besteht aus einem Next.js-Frontend, einer Node.js/Express-REST-API und einer MongoDB-Datenbank – alles containerisiert mit Docker.

### Hauptfunktionen

- **Benutzerauthentifizierung:** Sichere Registrierung und Anmeldung mit JWT und bcrypt-Password-Hashing.
- **Öffentliche Link-Verkürzung:** Anonyme Benutzer erstellen Kurzlinks mit zufälligem Slug und 30-Tage-Ablaufzeit.
- **Authentifiziertes Dashboard:** Vollständige Verlaufsübersicht aller erstellten Links.
- **Benutzerdefinierte Slugs & Ablaufdaten:** Nutzer legen eigene Slugs und Gültigkeitsdauern fest.
- **CRUD-Operationen:** Vollständiges Erstellen, Lesen, Aktualisieren und Löschen persönlicher Links.
- **Klick-Tracking:** Zählt und zeigt Klickstatistiken je Kurzlink an.

### Technische Highlights

Das Backend ist eine RESTful API mit Node.js und Express.js in serviceorientierter Architektur. Mongoose verwaltet MongoDB-Datenmodelle; ein MongoDB-TTL-Index auf `expiresAt` löscht abgelaufene Links automatisch. Das Frontend verwendet Next.js mit Tailwind CSS und Cypress für End-to-End-Tests. Eine GitLab-CI-Pipeline führt Backend- (Jest/Supertest) und Frontend-Tests bei jedem Push aus. Der gesamte Stack wird mit Docker Compose orchestriert.

### Ergebnis

Ein eigenständiges Projekt, das moderne Full-Stack- und DevOps-Praktiken demonstriert: sicheres REST-API-Design, containerisierte Multi-Service-Orchestrierung und automatisierte CI/CD. Die wichtigste Erkenntnis war die Implementierung der vollständigen Pipeline vom Code-Commit bis zum verifizierten Build mit Docker und GitLab CI.
