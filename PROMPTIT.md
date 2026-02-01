# Keskustelu AI:n kanssa:
Tässä on listattu promptit ja niihin saadut AI:n vastaukset (käytin ChatGPT:tä). Olen jälkikäteen lisännyt ennen joitakin PROMPTI-headingejä oman kommentin promptin logiikasta ja mitä sillä yritän saavuttaa. Kopioin AI:n vastaukset markdown formaatilla, joka saattaa tehdä tämän tiedoston lukemisesta sekavampaa, mutta pelkän tekstin kopioiminen ei näyttänyt ollenkaan hyvältä. Olen merkannut promptin ja vastauksen otsikot isoilla kirjaimilla, jotta ne erottuvat AI:n vastauksista helpommin.


## Oma kommentti:
Alussa esittelen projektin lyhyesti, ja jopa samalla selvensin odotetaanko tehtävältä myös frontendia, vai pelkkää backendia. Oletin, että tässä tarkoitetaan vain backendia, ja AI oli samaa mieltä. Alussa suunnitelma on esittää projekti, ja alustaa mitä haluan että projekti tulee tekemään, ja mitä sen ei tarvitse tehdä, jotta AI ei luo turhan monimutkaista koodia heti alkuun.

# PROMPTI:
Jos tehtävänannossa sanotaan näin:

"Tehtäväsi on toteuttaa yksinkertainen kokoushuoneiden varausrajapinta (API).
Palvelun tulee tarjota käyttäjille seuraavat toiminnot:
● Varauksen luonti: Varaa huone tietylle aikavälille.
● Varauksen peruutus: Poista varaus.
● Varausten katselu: Listaa kaikki tietyn huoneen varaukset."

Onko tarkoitus luoda vain backend vai myös frontend?

# VASTAUS:
Hyvä kysymys – tätä miettii *todella* moni 👍

Lyhyt vastaus: **yleensä tarkoitus on tehdä vain backend**, ellei tehtävänannossa erikseen pyydetä käyttöliittymää.

Perustelut:

* Tehtävässä puhutaan nimenomaan **rajapinnasta (API)**
  → API = backend-palvelu, jota joku *muu* (esim. frontend tai testityökalu) kutsuu.
* Toiminnot on kuvattu teknisinä operaatioina:

  * varauksen luonti
  * varauksen peruutus
  * varausten listaus
    Nämä sopivat suoraan esim. REST-endpointeiksi (`POST`, `DELETE`, `GET`).
* Missään ei mainita:

  * käyttöliittymää
  * näkymiä
  * lomakkeita
  * selain- tai mobiilisovellusta

👉 Siksi oletusarvo on **pelkkä backend**, esim.:

* REST API (Node/Express, Spring Boot, FastAPI, tms.)
* JSON-pohjaiset pyynnöt ja vastaukset
* Mahdollisesti in-memory data tai yksinkertainen tietokanta

### Milloin frontend *kannattaisi* tehdä?

Vain jos:

* tehtävänannossa lukee erikseen “käyttöliittymä”, “UI”, “web-sovellus”
* tai haluat **vapaaehtoisesti** näyttää osaamista (esim. työhaastattelussa)

Tällöinkin frontend olisi **bonus**, ei vaatimus.

### Hyvä käytäntö tehtävässä

* Tee backend huolella
* Dokumentoi API (esim. README tai Swagger/OpenAPI)
* Kerro tekstissä:
  *“Ratkaisu sisältää vain backend-rajapinnan, kuten tehtävänannossa pyydettiin.”*

Jos haluat, voin:

* auttaa tulkitsemaan tehtävänantoa työnantajan/kurssin näkökulmasta
* ehdottaa konkreettista API-rakennetta (endpointit + esimerkit)
* tai katsoa, miten tämän kannattaisi vastata “ideaalisesti” arviointia varten 👌

---


## Oma kommentti:
Kerron alkuun millä kielellä ja mitä kirjastoja käyttäen haluan tehdä projektin, että seuraavat vastaukset vastaa omaa tilannetta mahdollisimman tarkasti. Aloitan kysymällä projektin rakennetta. Tämä on kokemukseni perusteella hyvä tapa saada AI jakamaan myöhemmin luotava koodi pienempiin osiin, jotta koodin luettavuus pysyisi hyvänä. Pyysin myös sitä luomaan hierarkisen puun projektin rakenteesta. Tämä on ollut erittäin kätevä prompti omissa projekteissani. Se auttaa projektin suunnittelua huomattavasti, varsinkin jos projekti on hieman monimutkaisempi kuin tämän tehtävän projekti.

# PROMPTI:
Näin oletin itsekin. Aion tehdä projektin Node.js:llä ja käytän Expressiä. Projekti ei tarvitse tietokantaa, vaan se hoidetaan vain palvelimen muistissa. Tee projektille rakenne ja listaa se hierarkisena puuna.

# VASTAUS:
Kuulostaa oikein hyvältä ratkaisulta 👌
Node + Express + in-memory data on **täysin linjassa** tuollaisen tehtävänannon kanssa.

Tässä **selkeä, siisti ja “tehtäväystävällinen” projektirakenne**, joka näyttää myös arvioijan silmissä hyvältä mutta ei ole ylipainoinen.

---

## Ehdotettu projektirakenne (hierarkkinen puu)

```
meeting-room-api/
├─ package.json
├─ package-lock.json
├─ README.md
├─ src/
│  ├─ app.js
│  ├─ server.js
│  │
│  ├─ routes/
│  │  └─ reservations.routes.js
│  │
│  ├─ controllers/
│  │  └─ reservations.controller.js
│  │
│  ├─ services/
│  │  └─ reservations.service.js
│  │
│  ├─ data/
│  │  └─ reservations.store.js
│  │
│  └─ utils/
│     └─ idGenerator.js
│
└─ .gitignore
```

---

## Roolit lyhyesti (miksi tämä rakenne toimii)

### Juuri

* **package.json**
  riippuvuudet (`express`, `nodemon` jne.)
* **README.md**
  erittäin tärkeä: kuvaus API:sta + esimerkkipyynnöt
* **.gitignore**
  esim. `node_modules`

---

### `src/`

#### `server.js`

* käynnistää HTTP-palvelimen
* kuuntelee porttia

```js
app.listen(3000)
```

#### `app.js`

* Express-appin konfigurointi
* middlewaret
* reittien rekisteröinti

---

### `routes/`

#### `reservations.routes.js`

* määrittelee endpointit
* **ei bisneslogiikkaa**

Esim:

* `POST /rooms/:roomId/reservations`
* `DELETE /reservations/:id`
* `GET /rooms/:roomId/reservations`

---

### `controllers/`

#### `reservations.controller.js`

* käsittelee HTTP-pyynnöt
* validoi inputin kevyesti
* kutsuu serviceä
* palauttaa HTTP-vastaukset

---

### `services/`

#### `reservations.service.js`

* varsinainen bisneslogiikka
* tarkistaa päällekkäiset varaukset
* luo / poistaa / hakee varaukset

👉 Tämä on “älykerros”

---

### `data/`

#### `reservations.store.js`

* **in-memory data**
* esim. taulukko tai objekti

```js
let reservations = []
```

* ei Express-riippuvuuksia

---

### `utils/`

#### `idGenerator.js`

* yksinkertainen ID-logiikka
* pitää servicen siistinä

---

## Miksi tämä on hyvä juuri tehtävää varten

✅ Selkeä vastuunjako
✅ Helppo testata Postmanilla / curlilla
✅ Helppo selittää arvioijalle
✅ Ei ylikomplisoitu (ei DB:tä, ei ORM:ia)
✅ Ammattimainen, muttei “overengineering”

---

Jos haluat seuraavaksi, voin:

* määritellä **tarkat endpointit + request/response-esimerkit**
* kirjoittaa **minimaalisen README.md:n**
* tai auttaa **päällekkäisten varausten logiikassa** (yleinen kompastuskivi)

Sano vaan, mihin mennään seuraavaksi 🚀

---


## Oma kommentti:
Vaikka en suunnitellut lisääväni tehtävään huoneiden listausta ja lisäämistä jne, halusin kuitenkin listan esimerkkihuoneista, joita voisi tulevaisuudessa hyödyntää. Tämä myös varmistaa, että AI:lla on käsitys minkälaisista huoneista on kyse, ja mitä tiedostotyyppejä nämä objektit saattaa pitää sisällään. Tässä heti huomasi, että esimerkiksi huoneen id:ksi AI laittoi stringin, vaikka itse menisin mieluummin vain numerolla. Se tekee esim url patheistä siistimpiä ja seuraa tarkemmin REST-API konventioita. Myös, jos data olisi tietokannassa, niin siellä id on todennäköisesti vain numero. Eli vaikka tämä tehtävä onkin vain palvelimen muistissa, niin on parempi vain suoraan vaihtaa id:t numeroksi tässäkin.

# PROMPTI:
Tee lista esimerkkihuoneista. Anna niille ainakin ID ja nimi, mutta voit listata myös esimerkiksi huoneen koon, ja rakennuksen nimen missä huone sijaitsee. Ei varmaan tarvitse monimutkaistaa tehtävää laittamalla esimerkiksi maksimivarauksen kestoa tähän nyt alkuun. Anna vastaus JSON muodossa.

# VASTAUS:
Tässä on **yksinkertainen mutta realistinen lista esimerkkikokoushuoneista**, juuri sopiva in-memory-käyttöön eikä turhaan monimutkainen. JSON on suoraan käyttökelpoinen Node/Express-projektissa.

```json
[
  {
    "id": "room-1",
    "name": "Neuvotteluhuone Aurora",
    "capacity": 8,
    "building": "Päärakennus"
  },
  {
    "id": "room-2",
    "name": "Neuvotteluhuone Borealis",
    "capacity": 12,
    "building": "Päärakennus"
  },
  {
    "id": "room-3",
    "name": "Projektihuone Atlas",
    "capacity": 6,
    "building": "Toimistosiipi A"
  },
  {
    "id": "room-4",
    "name": "Kokoustila Polaris",
    "capacity": 20,
    "building": "Toimistosiipi B"
  },
  {
    "id": "room-5",
    "name": "Ideahuone Nova",
    "capacity": 4,
    "building": "Innovaatiokeskus"
  }
]
```

💡 **Miksi tämä on hyvä tehtävää varten**

* ID on selkeä ja URL-ystävällinen (`room-1`)
* Nimet ovat yksilöllisiä ja uskottavia
* `capacity` ja `building` tuovat realismia mutta eivät lisää logiikkaa
* Helppo laajentaa myöhemmin, jos haluat

Jos haluat seuraavaksi, voin:

* liittää tämän suoraan `rooms.store.js`-tiedostoksi
* tehdä vastaavan **esimerkkivarauksen JSON-muodossa**
* tai auttaa mallintamaan varausten aikavälit fiksusti (ISO-aikaleimat jne.)

Jatketaanko 👌

---


# PROMPTI:
Vaihdetaan id olemaan pelkkä numero tekstin sijaan. Muuten pidä huoneet samanlaisina.

# VASTAUS:
Selvä 👍 Tässä sama huonelista, mutta **ID:t ovat nyt pelkkiä numeroita**. Kaikki muu pidetty ennallaan.

```json
[
  {
    "id": 1,
    "name": "Neuvotteluhuone Aurora",
    "capacity": 8,
    "building": "Päärakennus"
  },
  {
    "id": 2,
    "name": "Neuvotteluhuone Borealis",
    "capacity": 12,
    "building": "Päärakennus"
  },
  {
    "id": 3,
    "name": "Projektihuone Atlas",
    "capacity": 6,
    "building": "Toimistosiipi A"
  },
  {
    "id": 4,
    "name": "Kokoustila Polaris",
    "capacity": 20,
    "building": "Toimistosiipi B"
  },
  {
    "id": 5,
    "name": "Ideahuone Nova",
    "capacity": 4,
    "building": "Innovaatiokeskus"
  }
]
```

Tämä toimii hyvin esim.:

* URL-parametreissa: `/rooms/3/reservations`
* vertailuissa ilman string–number -sekoilua
* yksinkertaisessa ID-generoinnissa varauksille

Jos haluat, voin seuraavaksi:

* ehdottaa **varausten tietomallin** (id, roomId, startTime, endTime)
* tai kirjoittaa pienen helperin, joka tarkistaa onko huone olemassa ennen varausta.

Sano vain 👍

---


## Oma kommentti:
Kysyin seuraavaksi varauksille esimerkkivarauksen. Tämä määrittää mitä dataa ne pitää sisällään, ja minkä nimiset muuttujat siellä on sisällä, jotta myöhemmin luotava koodi suoraan käyttää samoja nimiä.

# PROMPTI:
Tehdään helperit myöhemmin. Mutta listaa vain varausten tietomalli. Anna lyhyt vastaus.

# VASTAUS:
Tässä **yksinkertainen varausten tietomalli**, sopiva in-memory-käyttöön:

```json
{
  "id": 101,
  "roomId": 3,
  "startTime": "2026-01-21T09:00:00Z",
  "endTime": "2026-01-21T10:30:00Z"
}
```

Minimi, selkeä ja helppo validoida.

---


## Oma kommentti:
Halusin varausten pitävän kirjaa kuka sen on luonut, vaikka en tehtävää varten teekään itse käyttäjiä.

# PROMPTI:
Lisätään siihen varaajan käyttäjänimi myös.

# VASTAUS:
Tässä päivitetty **varausten tietomalli**, lisättynä varaajan käyttäjänimi:

```json
{
  "id": 101,
  "roomId": 3,
  "username": "matti.meikalainen",
  "startTime": "2026-01-21T09:00:00Z",
  "endTime": "2026-01-21T10:30:00Z"
}
```

Yksinkertainen, mutta riittävän realistinen tähän tehtävään.

---


## Oma kommentti:
Nyt ollaan siis selvitetty minkälainen rakenne projektilla tulee olemaan, niin voidaan luoda koodia. Pyysin vain päätiedostot ensin ettei vastauksista tule liian pitkiä, ja tässä pystyy samalla lukemaan miten koodi toimii, ja tarkistamaan, että se näyttää järkevältä.

# PROMPTI:
Okei, tässä on nyt perusrakenne selvillä. Tee projektille päätiedostot nyt alkuun.

# VASTAUS:
Jes 👍 Tässä **projektin päätiedostot alkuun**, minimalistisesti mutta järkevästi. Nämä riittävät, että API käynnistyy ja on valmis laajennettavaksi.

---

## `src/app.js`

Express-sovelluksen konfigurointi.

```js
const express = require("express");

const reservationsRoutes = require("./routes/reservations.routes");

const app = express();

// Middlewaret
app.use(express.json());

// Reitit
app.use("/api", reservationsRoutes);

// Perus health check
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

module.exports = app;
```

---

## `src/server.js`

Palvelimen käynnistys.

```js
const app = require("./app");

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

---

## `src/routes/reservations.routes.js`

Reittien “luuranko” (logiikka lisätään myöhemmin).

```js
const express = require("express");
const router = express.Router();

// Luo varaus
router.post("/rooms/:roomId/reservations", (req, res) => {
  res.status(501).json({ message: "Not implemented yet" });
});

// Peruuta varaus
router.delete("/reservations/:id", (req, res) => {
  res.status(501).json({ message: "Not implemented yet" });
});

// Listaa huoneen varaukset
router.get("/rooms/:roomId/reservations", (req, res) => {
  res.status(501).json({ message: "Not implemented yet" });
});

module.exports = router;
```

---

## (valinnainen mutta suositeltava) `package.json` scriptit

Jos et ole vielä tehnyt:

```json
{
  "scripts": {
    "start": "node src/server.js",
    "dev": "nodemon src/server.js"
  }
}
```

---

### Tässä vaiheessa sinulla on:

✅ Käynnistyvä Express-palvelin
✅ Selkeä entry point (`server.js`)
✅ Valmis reittirakenne
✅ Helppo jatkaa controllereihin ja serviceihin

Seuraava luonteva askel olisi:

* in-memory `reservations.store.js`
* controller + service -jako
* päällekkäisten varausten tarkistus

Sano vaan, mihin haluat tarttua seuraavaksi 🚀

---


## Oma kommentti:
Seuraavaksi tehdään itse varauslogiikka. Se sisältää vain varausten listaamisen, luomisen ja poistamisen. Aikaisemman vastauksen router ei vielä käyttänyt tätä tiedostoa, joten sekin pitää päivittää heti perään.

# PROMPTI:
Tee seuraavaksi reservation service ja laita routeri käyttämään sitä

# VASTAUS:
Selvä 👍 Tehdään tämä **siististi mutta kevyesti**, ilman turhaa kikkailua.

Alla:

1. `reservations.service.js` (in-memory + peruslogiikka)
2. päivitetty `reservations.routes.js`, joka käyttää serviceä

---

## `src/services/reservations.service.js`

```js
let reservations = [];
let nextId = 1;

/**
 * Palauttaa kaikki tietyn huoneen varaukset
 */
function getReservationsByRoom(roomId) {
  return reservations.filter(r => r.roomId === roomId);
}

/**
 * Luo uuden varauksen
 */
function createReservation({ roomId, username, startTime, endTime }) {
  const reservation = {
    id: nextId++,
    roomId,
    username,
    startTime,
    endTime
  };

  reservations.push(reservation);
  return reservation;
}

/**
 * Poistaa varauksen id:n perusteella
 */
function deleteReservation(id) {
  const index = reservations.findIndex(r => r.id === id);
  if (index === -1) {
    return false;
  }

  reservations.splice(index, 1);
  return true;
}

module.exports = {
  getReservationsByRoom,
  createReservation,
  deleteReservation
};
```

---

## Päivitetty `src/routes/reservations.routes.js`

```js
const express = require("express");
const router = express.Router();

const reservationService = require("../services/reservations.service");

// Luo varaus
router.post("/rooms/:roomId/reservations", (req, res) => {
  const roomId = Number(req.params.roomId);
  const { username, startTime, endTime } = req.body;

  if (!username || !startTime || !endTime) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const reservation = reservationService.createReservation({
    roomId,
    username,
    startTime,
    endTime
  });

  res.status(201).json(reservation);
});

// Peruuta varaus
router.delete("/reservations/:id", (req, res) => {
  const id = Number(req.params.id);

  const deleted = reservationService.deleteReservation(id);
  if (!deleted) {
    return res.status(404).json({ message: "Reservation not found" });
  }

  res.status(204).send();
});

// Listaa huoneen varaukset
router.get("/rooms/:roomId/reservations", (req, res) => {
  const roomId = Number(req.params.roomId);

  const reservations =
    reservationService.getReservationsByRoom(roomId);

  res.json(reservations);
});

module.exports = router;
```

---

### Nyt sinulla on:

✅ Router → Service -ketju kunnossa
✅ In-memory varaukset
✅ ID-generointi
✅ Oikeat HTTP-statuskoodit

### Seuraava luonteva askel

* päällekkäisten varausten estäminen
* huoneen olemassaolon tarkistus
* aikaleimojen validointi (start < end)

Nämä on helppo lisätä tähän serviceen myöhemmin.
Jatketaanko niihin vai haluatko ensin store-tiedoston erikseen? 🚀

---


## Oma kommentti:
Testasin generoitua koodia Postmanilla, ja oli nopeampi vain kysyä raakaa esimerkkidataa AI:lta jonka pystyi vain kopioimaan postmaniin.

# PROMPTI:
Luon varauksen postmanilla, tee sille json body, jonka lähetän post metodilla serverille.

# VASTAUS:
Tässä **esimerkk JSON body**, jonka voit lähettää Postmanilla `POST`-metodilla:

**POST** `/api/rooms/3/reservations`
**Headers:** `Content-Type: application/json`

```json
{
  "username": "matti.meikalainen",
  "startTime": "2026-01-26T09:00:00Z",
  "endTime": "2026-01-26T10:30:00Z"
}
```

Tämä osuu suoraan nykyiseen routeen ja menee läpi ilman lisämuutoksia 👍

---


## Oma kommentti:
Nyt kun koodin perustoiminnallisuus on testattu, se tarvitsee inputin validoinnin. Annoin AI:lle tarvittavat tarkistukset, ja kysyin että palauttaisi vain muokattu funktio, eikä koko tiedoston koodia.

# PROMPTI:
Okei, varausten lisääminen, poistaminen ja listaaminen toimii. Seuraavaksi tarvitsee user inputin tarkistuksen. Varaukset ei saa mennä päällekäin aikaisemman kanssa, eikä ne saa olla menneisyydessä, ja aloitusajan täytyy olla ennen lopetusaikaa. Anna muokattu varauksen luomisfunktio.

# VASTAUS:
Tässä **muokattu `createReservation`-funktio**, jossa on kaikki pyytämäsi tarkistukset:

* aloitus ennen lopetusta
* ei menneisyyteen
* ei päällekkäisyyksiä saman huoneen varauksiin

```js
function createReservation({ roomId, username, startTime, endTime }) {
  const start = new Date(startTime);
  const end = new Date(endTime);
  const now = new Date();

  // Aloitus ennen lopetusta
  if (start >= end) {
    throw new Error("Start time must be before end time");
  }

  // Ei menneisyyteen
  if (start < now) {
    throw new Error("Reservation cannot be in the past");
  }

  // Päällekkäisyystarkistus
  const overlapping = reservations.some(r => {
    if (r.roomId !== roomId) return false;

    const existingStart = new Date(r.startTime);
    const existingEnd = new Date(r.endTime);

    return start < existingEnd && end > existingStart;
  });

  if (overlapping) {
    throw new Error("Reservation overlaps with an existing reservation");
  }

  const reservation = {
    id: nextId++,
    roomId,
    username,
    startTime,
    endTime
  };

  reservations.push(reservation);
  return reservation;
}
```

---


## Oma kommentti:
Tässä vaiheessa perustoiminnallisuus on valmis, ja aloin itse tekemään parannuksia koodiin. Halusin tehdä myös muutamia testejä, ja päätin käyttää niihin apuna AI:ta.

# PROMPTI:
Seuraavaksi voisi tehdä muutaman testin. Tee koodi varauksen luomisen testaukselle. Käytän node:test kirjastoa.

# VASTAUS:
Hyvä seuraava askel 👌 Alla on **yksinkertaiset mutta oleelliset testit varauksen luomiselle** käyttäen `node:test` + `assert`. Nämä testaavat juuri ne säännöt, jotka lisäsit.

Oletus:

* testit ajetaan Node 18+
* service on `src/services/reservations.service.js`

---

## `test/reservations.service.test.js`

```js
const test = require("node:test");
const assert = require("node:assert/strict");

const reservationService = require("../src/services/reservations.service");

function futureDate(minutesFromNow) {
  return new Date(Date.now() + minutesFromNow * 60 * 1000).toISOString();
}

test("creates a valid reservation", () => {
  const reservation = reservationService.createReservation({
    roomId: 1,
    username: "test.user",
    startTime: futureDate(60),
    endTime: futureDate(120)
  });

  assert.equal(reservation.roomId, 1);
  assert.equal(reservation.username, "test.user");
  assert.ok(reservation.id);
});

test("fails if start time is after end time", () => {
  assert.throws(() => {
    reservationService.createReservation({
      roomId: 1,
      username: "test.user",
      startTime: futureDate(120),
      endTime: futureDate(60)
    });
  });
});

test("fails if reservation is in the past", () => {
  const past = new Date(Date.now() - 60 * 60 * 1000).toISOString();

  assert.throws(() => {
    reservationService.createReservation({
      roomId: 1,
      username: "test.user",
      startTime: past,
      endTime: futureDate(60)
    });
  });
});

test("fails if reservation overlaps with existing one", () => {
  const start1 = futureDate(180);
  const end1 = futureDate(240);

  reservationService.createReservation({
    roomId: 2,
    username: "first.user",
    startTime: start1,
    endTime: end1
  });

  assert.throws(() => {
    reservationService.createReservation({
      roomId: 2,
      username: "second.user",
      startTime: futureDate(210),
      endTime: futureDate(270)
    });
  });
});

test("allows overlapping times in different rooms", () => {
  assert.doesNotThrow(() => {
    reservationService.createReservation({
      roomId: 99,
      username: "other.room",
      startTime: futureDate(210),
      endTime: futureDate(270)
    });
  });
});
```

---

## Testien ajo

Lisää `package.json`iin:

```json
{
  "scripts": {
    "test": "node --test"
  }
}
```

Ja aja:

```bash
npm test
```

---

### Pieni mutta tärkeä huomio (ammattimainen)

Koska käytät **in-memory dataa**, testit jakavat saman tilan.
Seuraava parannus olisi:

* `reset()`-funktio serviceen **tai**
* siirtää `reservations` omaan store-tiedostoon, jonka voi nollata testeissä

Halutessasi voin:

* tehdä `resetReservations()`-helperin
* tai refaktoroida servicen testattavammaksi (ilman että tehtävä monimutkaistuu)

Hyvää tekemistä – tämä projekti on jo tosi siisti 💪


---


## Oma kommentti:
Tässä vaiheessa muistin että vaihdoin projektin CommonJS:stä käyttämään modernimpaa ES Moduuleita, niin kerroin tästä AI:lle myös, ja kerroin, että reset-funktio löytyy nyt myös jota voi käyttää aina testien alussa, ettei tarvitse tehdä esim. aloitus- ja lopetusajoista monimutkaisia kun ne ei saa mennä päällekäin. Ilman tätä korjausta testien järjestyksen vaihtaminen ja uusien lisääminen saattaa hajottaa aikaisempia testejä.

# PROMPTI:
Vaidoin muuten projektin käyttämään ES moduuleita commonJS:n sijaan. Korjasin importit kuitenkin itse. Laitoin nyt myös reset funktion serviceen, niin nyt voidaan resettaa muisti ennen jokaista testiä. Pävitä testit käyttämään sitä.

# VASTAUS:
Jes, hyvä refaktorointi 👍 ES-moduulit + reset tekee testauksesta heti paljon siistimpää.

Alla **päivitetyt testit**, jotka:

* käyttävät ES module -syntaksia
* kutsuvat `reset()`-funktiota ennen jokaista testiä
* hyödyntävät `beforeEach` `node:test`-kirjastosta

---

## `test/reservations.service.test.js`

```js
import test, { beforeEach } from "node:test";
import assert from "node:assert/strict";

import {
  createReservation,
  reset
} from "../src/services/reservations.service.js";

function futureDate(minutesFromNow) {
  return new Date(Date.now() + minutesFromNow * 60 * 1000).toISOString();
}

beforeEach(() => {
  reset();
});

test("creates a valid reservation", () => {
  const reservation = createReservation({
    roomId: 1,
    username: "test.user",
    startTime: futureDate(60),
    endTime: futureDate(120)
  });

  assert.equal(reservation.roomId, 1);
  assert.equal(reservation.username, "test.user");
  assert.ok(reservation.id);
});

test("fails if start time is after end time", () => {
  assert.throws(() => {
    createReservation({
      roomId: 1,
      username: "test.user",
      startTime: futureDate(120),
      endTime: futureDate(60)
    });
  });
});

test("fails if reservation is in the past", () => {
  const past = new Date(Date.now() - 60 * 60 * 1000).toISOString();

  assert.throws(() => {
    createReservation({
      roomId: 1,
      username: "test.user",
      startTime: past,
      endTime: futureDate(60)
    });
  });
});

test("fails if reservation overlaps with existing one in same room", () => {
  createReservation({
    roomId: 2,
    username: "first.user",
    startTime: futureDate(180),
    endTime: futureDate(240)
  });

  assert.throws(() => {
    createReservation({
      roomId: 2,
      username: "second.user",
      startTime: futureDate(210),
      endTime: futureDate(270)
    });
  });
});

test("allows overlapping times in different rooms", () => {
  createReservation({
    roomId: 2,
    username: "first.user",
    startTime: futureDate(180),
    endTime: futureDate(240)
  });

  assert.doesNotThrow(() => {
    createReservation({
      roomId: 3,
      username: "other.room",
      startTime: futureDate(210),
      endTime: futureDate(270)
    });
  });
});
```

---

### Tämä on nyt **oikeasti hyvää tasoa**

* deterministiset testit
* ei tilavuotoa testien välillä
* moderni Node-tyyli (ESM + node:test)

Seuraava luonnollinen jatko olisi:

* testit **deleteReservation**-funktiolle
* tai HTTP-tason testit (supertestillä)
* tai virheviestien tarkempi tarkistus (`assert.throws(err => err.message === ...)`)


---


# PROMPTI:
Testit toimii, lisäsin muutaman oman testin myös. Viittaa tulevaisuudessa servicen funktioihin reservationService.funktionNimi(). Tee muutama testi varauksen poistamiselle.

# VASTAUS:
Mahtavaa 💪 Ja hyvä linjaus tuosta nimestämisestä – se tekee testeistä heti luettavampia.

Alla **muutama selkeä testi varauksen poistamiselle**, käyttäen
`reservationService.funktionNimi()`-tyyliä ja samaa reset-käytäntöä.

---

## Lisättävät testit: varauksen poisto

```js
import test, { beforeEach } from "node:test";
import assert from "node:assert/strict";

import * as reservationService from "../src/services/reservations.service.js";

function futureDate(minutesFromNow) {
  return new Date(Date.now() + minutesFromNow * 60 * 1000).toISOString();
}

beforeEach(() => {
  reservationService.reset();
});

test("deletes an existing reservation", () => {
  const reservation = reservationService.createReservation({
    roomId: 1,
    username: "delete.user",
    startTime: futureDate(60),
    endTime: futureDate(120)
  });

  const result = reservationService.deleteReservation(reservation.id);

  assert.equal(result, true);

  const reservations =
    reservationService.getReservationsByRoom(1);

  assert.equal(reservations.length, 0);
});

test("returns false when trying to delete non-existing reservation", () => {
  const result = reservationService.deleteReservation(999);

  assert.equal(result, false);
});

test("deleting one reservation does not affect others", () => {
  const r1 = reservationService.createReservation({
    roomId: 1,
    username: "user.one",
    startTime: futureDate(60),
    endTime: futureDate(120)
  });

  const r2 = reservationService.createReservation({
    roomId: 1,
    username: "user.two",
    startTime: futureDate(180),
    endTime: futureDate(240)
  });

  reservationService.deleteReservation(r1.id);

  const reservations =
    reservationService.getReservationsByRoom(1);

  assert.equal(reservations.length, 1);
  assert.equal(reservations[0].id, r2.id);
});
```

---

### Miksi nämä testit ovat hyviä

* testaa **onnistuneen poiston**
* testaa **virhetilanteen** (id ei löydy)
* varmistaa ettei poisto riko muuta dataa

Tässä vaiheessa sun projekti on jo:
✅ rakenteellisesti siisti
✅ testattu
✅ helposti laajennettavissa

Seuraava “viimeistelytaso” voisi olla:

* HTTP-tason delete-testit
* virheviestien yhdenmukaistaminen
* tai README + API-dokumentaatio

---