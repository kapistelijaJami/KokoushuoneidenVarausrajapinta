# Kokoushuoneiden Varausrajapinta (API)

Kokoushuoneiden varausrajapinta on yksinkertainen Node.js + Express -pohjainen REST API kokoushuoneiden varaamiselle. Sillä voi varata huoneita, sekä peruuttaa ja listata varauksia. Data säilytetään palvelimen muistissa, eikä erillistä tietokantaa käytetä. Se tarkistaa käyttäjän syötteet ja esimerkiksi varmistaa että varaukset eivät voi mennä päällekkäin tai sijoittua menneisyyteen.

## Ominaisuudet
- Huoneen varaaminen
- Varauksen poistaminen
- Varausten listaaminen tietylle huoneelle
- Tarkistaa käyttäjän syötteet:
	- Varaukset ei voi mennä päällekkäin
	- Alkuaika tulee olla ennen lopetusta
	- Varaukset ei saa sijoittua menneisyyteen. Aloitusaika voi kuitenkin olla muutaman minuutin menneisyydessä, kunhan lopetusaika on vielä tulevaisuudessa. Tämä sallii huoneen varaamisen siten, että aloitusajan voi laittaa alkamaan frontendissä heti nykyhetkestä, eikä tästä synny ongelmia vaikka olisi joitain viiveitä pyynnön lähettämisessä, ja palvelimen kello on jo ohittanut tämän alkuajan. (Tätä minuuttimäärää voi vaihtaa `constants/constants.js` tiedostossa.)
- Virheidenkäsittely ja virheviestit

## Asennus ja käynnistys

### 1. Kloonaa repositorio:

```
git clone <repository-url>
cd KokoushuoneidenVarausrajapinta
```

### 2. Asenna riippuvuudet:

```
npm install
```

### 3. Käynnistä palvelin:


```
//Normaalissa tilassa:
npm start

//Tai dev tilassa, jossa palvelin käynnistyy automaattisesti uudestaan kun tiedostoja päivitetään:
npm run dev
```

Palvelin käynnistyy oletuksena osoitteeseen `http://localhost:3000`.


## Käyttäminen
### 1. Huoneen varaaminen:

Lähetä `POST` -pyyntö osoitteeseen: `http://localhost:3000/api/rooms/{roomId}/reservations`.

ja lähetä pyynnön rungossa `JSON`, joka sisältää seuraavat propertyt: `username`, `startTime` ja `endTime` tässä formaatissa:

```
{
  "username": "matti.meikalainen",
  "startTime": "2026-01-26T09:00:00Z",
  "endTime": "2026-01-26T10:30:00Z"
}
```

Se lisää varauksen `roomId` -huoneeseen annettuun aikaväliin, ja palauttaa varauksen tiedot, kuten varauksen id:n.


### 2. Varausten listaaminen huonekohtaisesti:

Lähetä `GET` -pyyntö osoitteeseen: `http://localhost:3000/api/rooms/{roomId}/reservations`.

Se palauttaa listan `roomId` -huoneen varauksista.


### 3. Varausten peruuttaminen:

Lähetä `DELETE` -pyyntö osoitteeseen: `http://localhost:3000/api/reservations/{reservationId}`.

Onnistunut poistaminen palauttaa status-koodin `204`.

## Testien suorittaminen
Yksikkötestit voi suorittaa komennolla `npm test`.