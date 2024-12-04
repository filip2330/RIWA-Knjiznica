const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql");

const app = express();
const port = 3000;

// Parser za JSON podatke
app.use(bodyParser.json());

// Parser za podatke iz formi
app.use(bodyParser.urlencoded({ extended: true }));

// Povezivanje na bazu
const connection = mysql.createConnection({
  host: "ucka.veleri.hr", 
  user: "fstefanac",
  password: "11",
  database: "fstefanac",
});

connection.connect(function (err) {
  if (err) {
    console.error("Greška prilikom spajanja na bazu:", err);
    process.exit(1); // Prekini aplikaciju ako CONNECTION ne uspije
  }
  console.log("Connected to the database!");
});

app.use(cors());

// API za sve knjige (lista)
app.get("/api/knjige", (req, res) => {
  connection.query("SELECT * FROM knjiga", (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

// API: lista knjiga po naslovu
app.get("/api/knjige/naslov/:naslov", (req, res) => {
  const naslov = `%${req.params.naslov}%`;
  connection.query(
    "SELECT * FROM knjiga WHERE naslov LIKE ?",
    [naslov],
    (error, results) => {
      if (error) throw error;
      res.send(results);
    }
  );
});

// API: lista knjiga po autoru
app.get("/api/knjige/autor/:autor", (req, res) => {
  const autor = `%${req.params.autor}%`;
  connection.query(
    "SELECT * FROM knjiga WHERE autor LIKE ?",
    [autor],
    (error, results) => {
      if (error) throw error;
      res.send(results);
    }
  );
});

// API: Lista slobodnih knjiga
app.get("/api/slob_knjige", (req, res) => {
  const query = `
  SELECT 
  (knjiga.stanje - COUNT(rezervacija.knjiga_id)) AS slobodne, 
  knjiga.id, knjiga.naslov, knjiga.stanje 
  FROM knjiga 
  LEFT JOIN rezervacija ON knjiga.id = rezervacija.knjiga_id 
  GROUP BY knjiga.id`;
  connection.query(query, (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

// API: Provjera ako je knjiga slobodna
app.get("/api/slob_knjige/:id_knjige", (req, res) => {
  const id_knjige = req.params.id_knjige;
  const query = `
  SELECT (knjiga.stanje - COUNT(rezervacija.knjiga_id)) AS slobodne 
  FROM knjiga 
  LEFT JOIN rezervacija ON knjiga.id = rezervacija.knjiga_id 
  WHERE knjiga.id = ? 
  GROUP BY knjiga.id`;
  connection.query(query, [id_knjige], (error, results) => {
    if (error) throw error;
    res.send(results[0] || { slobodne: 0 });
  });
});

// API: Lista rezerviranih knjiga
app.get("/api/rezerv_knjige", (req, res) => {
  const query = `
  SELECT * 
  FROM knjiga, rezervacija 
  WHERE knjiga.id = rezervacija.knjiga_id`;
  connection.query(query, (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

// API: Lista rezerviranih knjiga s korisnicima
app.get("/api/rezerv_knjige_korisnici", (req, res) => {
  const query = `
  SELECT * 
  FROM knjiga, rezervacija, korisnik 
  WHERE knjiga.id=rezervacija.knjiga_id 
  AND korisnik.id=rezervacija.korisnik_id`;
  connection.query(query, (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

// API: Lista rezerviranih knjiga za korisnika
app.get("/api/rezerv_knjige/:korisnik_id", (req, res) => {
  const korisnik_id = req.params.korisnik_id;
  const query = `
  SELECT * 
  FROM knjiga, rezervacija, korisnik 
  WHERE knjiga.id=rezervacija.knjiga_id 
  AND korisnik.id=rezervacija.korisnik_id
  AND korisnik.id= ?`;
  connection.query(query, [korisnik_id], (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

// API: Lista rezervacija za knjigu
app.get("/api/rezerv_knjige_knjiga/:knjiga_id", (req, res) => {
  const knjiga_id = req.params.knjiga_id;
  const query = `
  SELECT *
  FROM knjiga, rezervacija, korisnik  
  WHERE knjiga.id=rezervacija.knjiga_id
  AND korisnik.id=rezervacija.korisnik_id
  AND knjiga.id=?`;
  connection.query(query, [knjiga_id], (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

// API: Lista svih korisnika
app.get("/api/korisnici", (req, res) => {
  connection.query("SELECT * FROM korisnik", (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

// API: Detalji korisnika po ID-u
app.get("/api/korisnici/:korisnik_id", (req, res) => {
  const korisnik_id = req.params.korisnik_id;
  connection.query(
    "SELECT * FROM korisnik WHERE id = ?",
    [korisnik_id],
    (error, results) => {
      if (error) throw error;
      res.send(results[0]);
    }
  );
});

// API: Ažuriranje korisnika
app.put("/api/korisnici/:korisnik_id", (req, res) => {
  const korisnik_id = req.params.korisnik_id;
  const data = req.body;
  connection.query(
    "UPDATE korisnik SET ? WHERE id = ?",
    [data, korisnik_id],
    (error, results) => {
      if (error) throw error;
      res.send(results);
    }
  );
});

// API: Rezervacija knjige
app.post("/api/rezerv_knjige/:knjiga_id", (req, res) => {
  const knjiga_id = req.params.knjiga_id;
  const { korisnik_id, datum } = req.body;
  const query = `
  INSERT INTO rezervacija (datum_rezervacije, knjiga_id, korisnik_id) 
  VALUES (?, ?, ?)`;
  connection.query(query, [datum, knjiga_id, korisnik_id], (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

// API: Brisanje rezervacije
app.delete("/api/rezerv_knjige/:knjiga_id", (req, res) => {
  const knjiga_id = req.params.knjiga_id;
  connection.query(
    "DELETE FROM rezervacija WHERE knjiga_id = ?",
    [knjiga_id],
    (error, results) => {
      if (error) throw error;
      res.send(results);
    }
  );
});

// ZADATAK 1.
app.get("/api/broj_knjiga/:korisnik_id", (req, res) => {
  const korisnik_id = req.params.korisnik_id;
  const query =
    "SELECT COUNT(*) AS broj_knjiga FROM rezervacija WHERE korisnik_id = ?";
  connection.query(query, [korisnik_id], (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

// ZADATAK 2.
app.get("/api/slob_prim/:knjiga_id", (req, res) => {
  const knjiga_id = req.params.knjiga_id;
  const query = `
  SELECT stanje - (SELECT COUNT(*) FROM rezervacija WHERE knjiga_id = ?) AS slob_prim
  FROM knjiga
  WHERE id = ?;`;
  connection.query(query, [knjiga_id, knjiga_id], (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

// ZADATAK 3.
app.get("/api/rez_prim/:knjiga_id", (req, res) => {
  const knjiga_id = req.params.knjiga_id;
  const query = "SELECT COUNT(*) AS rez_prim FROM rezervacija WHERE id = ?";
  connection.query(query, [knjiga_id], (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

// ZADATAK 4.
app.get("/api/kor_za_knjigu/:knjiga_id", (req, res) => {
  const knjiga_id = req.params.knjiga_id;
  const query = `
  SELECT DISTINCT k.*
  FROM korisnik k
  JOIN rezervacija r ON k.id = r.korisnik_id
  WHERE r.knjiga_id = ?`;
  connection.query(query, [knjiga_id], (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

// ZADATAK 5.
app.get("/api/ukupno_prim", (req, res) => {
  const query = "SELECT SUM(stanje) AS ukupan_br_prim FROM knjiga";
  connection.query(query, (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

// ZADATAK 6.
app.get("/api/ukupno_rez", (req, res) => {
  const query = "SELECT COUNT(*) AS ukupan_br_rez FROM rezervacija";
  connection.query(query, (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

// ZADATAK 7.
app.get("/api/ukupno_slob", (req, res) => {
  const query = `
  SELECT SUM
  (stanje - COALESCE((SELECT COUNT(*) 
  FROM rezervacija 
  WHERE rezervacija.knjiga_id = knjiga.id), 0)) AS slob_prim
  FROM knjiga;`;
  connection.query(query, (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

// ZADATAK 8.
app.get("/api/knjige_manje_od_3", (req, res) => {
  const query = "SELECT * FROM knjiga WHERE stanje < 3";
  connection.query(query, (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

// ZADATAK 9.
app.get("/api/kor_duze_od_mj_dana", (req, res) => {
  const query = `
  SELECT k.*, r.knjiga_id, r.datum_rezervacije
  FROM korisnik k
  JOIN rezervacija r ON k.id = r.korisnik_id
  WHERE r.datum_rezervacije < CURDATE() - INTERVAL 1 MONTH`;
  connection.query(query, (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

// ZADATAK 11.
app.get("/api/kontakt_kor", (req, res) => {
  const query = `
  SELECT k.email, k.broj_telefona, knjiga.naslov, r.datum_rezervacije
  FROM korisnik k
  JOIN rezervacija r ON k.id = r.korisnik_id
  JOIN knjiga ON r.knjiga_id = knjiga.id
  WHERE r.datum_rezervacije < CURDATE() - INTERVAL 1 MONTH`;
  connection.query(query, (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

// ZADATAK 12.
app.get("/api/rez_iste_knjige/:korisnik_id", (req, res) => {
  const korisnik_id = req.params.korisnik_id;
  const query = `
  SELECT knjiga_id, COUNT(*) AS br_rez
  FROM rezervacija
  WHERE korisnik_id = ?
  GROUP BY knjiga_id
  HAVING COUNT(*) >= 2`;
  connection.query(query, [korisnik_id], (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

// ZADATAK 13.
app.put("/api/izmj_kor/:korisnik_id", (req, res) => {
  const korisnik_id = req.params.korisnik_id;
  const { ime, email, broj_telefona } = req.body;
  const query = `
  UPDATE korisnik 
  SET ime = ?, email = ?, broj_telefona = ? 
  WHERE korisnik_id = ?`;
  connection.query(
    query,
    [ime, email, broj_telefona, korisnik_id],
    (error, results) => {
      if (error) throw error;
      res.json({ message: "Podaci korisnika su ažurirani" });
    }
  );
});

// Pokretanje servera
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
