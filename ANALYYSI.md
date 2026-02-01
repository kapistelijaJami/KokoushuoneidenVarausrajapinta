### 1. Mitä tekoäly teki hyvin?

Yritin alustaa keskustelun tekoälyn kanssa siten, että se ymmärtää mitä haluan sen tekevän, mitä kieltä ja kirjastoja haluan käyttää ja minkälaisen rakenteen projekti saa. Pyysin sitä tuottamaan esimerkiksi projektille hierarkkisen puun, joka on ollut itselle aikaisemmin hyvin kätevä apuväline. Se ensinnäkin laittaa tekoälyn miettimään rakennetta ennen kuin alkaa luomaan koodia että jakaisi sitä pienempiin moduuleihin, mutta myös auttaa sitä muistamaan minkälaista rakennetta suunniteltiin alussa, jotta myöhempi koodi vastaa suunnitelmaa. Se teki tämän hyvin.

Tekoäly myös seurasi ohjeitani hyvin. Pyysin sitä tuottamaan koodia kohtalaisen pienissä osissa. En halunnut että tekee koko projektia kerralla jotta pystyn ohjaamaan sitä matkan varrella haluamaani suuntaan. Mainitsemani muutokset se sai korjattua onnistuneesti. Koodissa ei ollut juurikaan logiikkavirheitä. Luin sen tuottaman koodin läpi huolella, ja testasin koodia hyvin esimerkiksi Postmanilla ja lopuksi yksikkötesteillä.

Se teki myös ymmärrettävää koodia. Minun ei tarvinnut erikseen kysellä mitä mikäkin kohta tekee, vaan ne oli helposti ymmärrettävissä ja vastausten mukana antoi vielä selkeitä selityksiäkin.


### 2. Mitä tekoäly teki huonosti?

Sanoisin, että suurimmalta osin ei ollut hirveästi valittamista. Muutamia koodinpätkiä erottelin omiin moduuleihinsa, ja refaktoroin esimerkiksi routerissa olevaa koodia kontrolleriin, sillä routerin tehtävä ei ole varauskohtaisen käyttäjän antaman datan purkaminen ja validointi tai esimerkiksi timestampien käsittely ja lähettäminen eteenpäin. Ne kuuluu kontrollerin ja servicen tehtäviin. Tekoäly myös aloitti projektin käyttämällä CommonJS:ää oletuksena, kun nykyään ehkä voi olla parempi aloittaa uudet projektit mieluummin ES Moduleilla. Vaihdoin tämän itse jälkikäteen. Toki tämänkin olisi voinut korjata vain AI:lta kysymällä.

Tekoäly on myös oletuksena aika verboosi. Sille pitää usein sanoa erikseen että "anna lyhyt vastaus", kun muuten selittää sen vastauksen lisäksi aika paljon ylimääräistä. Tämä ei toki ole hirveän suuri ongelma, mutta jos käy pidemmän aikaa keskustelua, niin se alkaa olemaan pitkä viestiketju hyvin nopeasti, ja sieltä voi olla vaikea löytää tiettyjä vastauksia myöhemmin.

Yksi huono puoli mikä tuli vastaan tässä projektissa oli se, että jos tiedostoja tekee yksitellen, niin niiden tekojärjestyksellä voi olla väliä. Tein ensin routerin, ja myöhemmin servicen. Mutta serviceen tekoäly laittoi throw komentoja kun input ei ole validi, mikä on kyllä hyvä idea, mutta routes oli jo siinä vaiheessa tehty, eikä sisältänyt try-catch blockeja, joten AI:n koodi tulosteli erroreita konsoliin ja palautti error sivua käyttäjälle jos sen inputti ei ollut validi. Päätin korjata tämän itse, vaikka AI olisi senkin voinut pyynnöstä toki korjata. Tällaisiin tilanteisiin pitää kiinnittää huomiota, ja siksi tekoälyn luoman koodin testaaminen on tärkeää.

Yksi pieni puute oli myös: Tekoäly teki alussa funktioita arrow-syntaksilla ja myöhemmin siirtyi määrittämään ne function-avainsanalla. Molemmat toki toimii tälle projektille, mutta ehkä kannattaa kuitenkin samassa projektissa käyttää yhtä tiettyä tapaa, niin muokkasin kaikki arrow-syntaksiin.


### 3. Mitkä olivat tärkeimmät parannukset, jotka teit tekoälyn tuottamaan koodiin ja miksi?

Refaktoroin koodia useammalla eri tavalla, kuten pilkoin koodin toiminnallisuuksia omiin moduuleihin, tein koodista konsistentimpaa yhtenäistämällä syntaksia ja siirryin CommonJS:stä ES-moduuleihin. Tämä tekee koodista luettavampaa ja helpottaa koodin ylläpidettävyyttä sekä laajentamista. Lisäsin myös virheenkäsittelyä try-catch blockeilla, ja palautin käyttäjälle virhetilanteet JSON viestinä. Tämä on tärkeä parannus, sillä käyttäjän pitää pystyä tietämään mistä syystä hänen pyyntönsä ei mennyt läpi, ja sen pitää olla käyttäjäystävällinen ja ymmärrettävä viesti, eikä vain error tulostus.

Lisäsin myös uuden ominaisuuden aloitusajan tarkistamiseen. Sen validointikoodi sallii nyt aloitusajan olevan muutaman minuutin menneisyydessä, kunhan lopetusaika on vielä tulevaisuudessa. Tämä on hyödyllinen sellaiseen tilanteeseen, missä halutaan huoneen varaus alkamaan heti, mutta joko palvelimen kello on hieman clientin edellä, tai muuten tulee pieni viive pyynnön aloitusajan ja serverissä tapahtuvan käsittelyajan välille (esim. internet viive, tai formissa valitaan aika etukäteen, ja lähetetään pyyntö myöhemmin). Pyyntö menee silti läpi, ja huone varautuu käsittelyhetkestä eteenpäin lopetusaikaan asti.

Testasin myös paljon tekoälyn tuottamaa koodia ja tein sille yksikkötestejä. Tämä on aina tärkeää tehdä kun tekoäly voi luoda virheellistä koodia.