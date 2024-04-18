import express from "express";
import cors from "cors";
import { readEntries, writeEntries } from "./filesystem.js";

//* create server
const app = express();

//* corse middleware
// für sämtliche Anfragen die überhaupt reinkommen soll dieses cors gelten
app.use(cors());

//* logging middleware (für console.logs)
app.use((req, _, next) => {
  console.log("new request:", req.method, req.url);
  next();
});

//* body parser middleware
app.use(express.json());

// *Endpoints
// GET ALL  -> GET /api/v1/entries
app.get("/api/v1/entries", (_, res) => {
  // Funktion zum readen wird aufgerufen und im then wird der Status, dass alles passt, an den Client gesendet und die entries im json gespeichert,
  // bzw. wenn es einen error gibt dieser ausgegeben
  readEntries()
    .then((entries) => res.status(200).json(entries))
    .catch((err) =>
      res.status(500).json({ err, message: "Could not read all entries" })
    );
});

// POST one -> POST /api/v1/entries
app.post("/api/v1/entries", (req, res) => {
  const newEntry = {
    id: Date.now(),
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    message: req.body.message,
  };

  //   Funktion zum lesen wird aufgerufen
  readEntries()
    //   die bisherigen entries (...entries) werden mit dem neuen Eintrag (newEntry) zusammengefügt
    .then((entries) => [newEntry, ...entries])
    // das Zusammengefügte (updatedEntries) wird weitergegeben an die writeEntries Funktion, die aufgerufen wird
    .then((updatedEntries) => writeEntries(updatedEntries))
    // und das Zusammengefügte (updatedEntries) wird mit Status alles okay in der json gespeichert und an den Client weitergegeben
    // bzw. falls error dann wird error ausgegeben
    .then((updatedEntries) => res.status(200).json(updatedEntries))
    .catch((err) =>
      res.status(500).json({ err, message: "Could not post new entry" })
    );
});

//* port & port listener
const PORT = 4004;
app.listen(PORT, () => console.log("Server ready at port", PORT));
