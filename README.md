[![Build Status](https://travis-ci.org/Nicklas766/bth-team-app.svg?branch=master)](https://travis-ci.org/Nicklas766/bth-team-app)
[![Maintainability](https://api.codeclimate.com/v1/badges/427f5175b5f90bb75cc1/maintainability)](https://codeclimate.com/github/Nicklas766/bth-team-app/maintainability)
[![Code Coverage](https://scrutinizer-ci.com/g/Nicklas766/bth-team-app/badges/coverage.png?b=master)](https://scrutinizer-ci.com/g/Nicklas766/bth-team-app/?branch=master)
[![Build Status](https://scrutinizer-ci.com/g/Nicklas766/bth-team-app/badges/build.png?b=master)](https://scrutinizer-ci.com/g/Nicklas766/bth-team-app/build-status/master)


# Applikation som exempel för nya tekniker inom vårt team


## Introduktion

Hela detta repo är skapad för ett skolprojekt hos Blekinge Tekniska Högskola.
Projektet går kortfattat ut på att ska tänka mig in i rollen som en teknisk arkitekt
och teamledare som ska införa nya tekniker och riktlinjer till sitt team.

Jag skapar en applikation med teknikerna och riktlinjerna jag vill införa.
Applikationen är till för att hjälpa mig presentera dessa nya tekniker åt mina
medarbetare.


## (Nu går jag in i rollen som teamledare)

## Applikationen

För att göra det lättare för mig att förklara de nya teknikerna som jag gärna
vill införa, så har jag skapat en applikation som exempel. För att beskriva
just denna applikationens features tydligt, så har jag skapat några [user stories](https://en.wikipedia.org/wiki/User_story)


|  Feature  | Som användare vill jag                                       | För att                                                        | Valda |
|:---------:|:------------------------------------------------------------ |:-------------------------------------------------------------- |:-----:|
|   Konto   |                                                              |                                                                |       |
|     1     | Kunna skapa ett konto som sparas i en NoSQL-databas          | Kunna logga in                                                 |  ✅   |
|     2     | Kunna logga in på min sparade användare                      | Få tillgång till min profilsida och kunna gå med i ett spel    |  ✅   |
|     3     | Kunna välja mellan tre bilder som jag kan använda            | Det ska visas när man startat ett spel                         |  ❌   |
|     4     | Kunna se mina result på profilsidan                          | Kunna hur många jag vunnit eller förlorat                      |  ✅   |
| Community |                                                              |                                                                |       |
|     1     | Kunna skapa ett nytt spel                                    | Kunna gå med i ett spel                                        |  ✅   |
|     2     | Kunna gå med i ett spel med en annan användare               | Kunna spela ett 2 players versus 1 boss spel                   |  ✅   |
|     3     | Kunna se en lista med alla användare                         | Kunna se hur många poäng alla har                              |  ✅   |
|     4     | Se en chatt innan jag skapar ett spel                        | Kunna chatta med andra innan                                   |  ❌   |
|   Spel    |                                                              |                                                                |       |
|     1     | Kunna attackera bossen                                       | Kunna vinna spelet med den andra användaren                    |  ✅   |
|     2     | Kunna kasta en trollformel                                   | För att antingen ge hp till mig själv eller den andra spelaren |  ✅   |
|     3     | Vänta på andra spelaren efter jag gjort mitt val av handling | Den andra spelaren ska kunna göra en action                    |  ✅   |
|     4     | Ha health points och motta en attack från bossen             | Kunna förlora                                                  |  ✅   |
|     5     | Kunna chatta med den andra användaren                        | Diskutera taktik eller chatta allmänt                          |  ✅   |
|     6     | Att spelet avbryts om jag disconnecterar                     | Den andra spelaren ska veta                                    |  ✅   |
|           |                                                              |                                                                |       |
|           |                                                              |                                                                |       |
|  Allmänt  |                                                              |                                                                |       |
|     1     | Inte kunna nå routen /protected utan att vara inloggad       | Inte kunna starta ett spel utan namn                           |  ✅   |
|     2     | Att headern visar mitt namn och länk till profilsida         | Veta ifall jag är inloggad och når min profilsida              |  ✅   |
|     3     | Höra ett ljudeffekt när jag attackerar                       | Få en viss inlevelse i spelet                                  |  ✅   |
|     4     | Höra musik på första sidan och inlogg                        | Få en viss inlevelse i spelet                                  |  ✅   |



--------------------------------------------------------------------------------
## Teknikval

För att lösa dessa krav som jag skapade för mig själv, så använde jag React
och Express. Min idé är att vi ska börja använda dessa ramverk i vår egna miljö,
nedan så har jag skrivit, varför och vad de är för något.


### React

React är ett JavaScript-bibliotek skapat av Facebook. [React](https://reactjs.org/)
hjälper oss att se till så koden är hållbar då man kan återanvända komponenter.
Den låter oss skapa vyer med JSX, ekosystemet är stort den låter oss också
skapa en SPA. I vårt fall så kommer vi arbeta med realtid, då är det riktigt
bra att ha en SPA. Det är bra för att när klienten är "hyfsat smart" och inte
behöver ladda om sidan hela tiden, så kan vi enkelt samarbeta mellan
klienten och servern. Du kanske tänker "vänta lite, vyer ska vara dumma och simpla",
absolut du har helt rätt, däremot så kan vi med hjälp av React skapa
komponenter som har sitt egna "state", varför är det bra? Jo för att när komponenterna
har sina egna "tillstånd", så blir det lättare att hålla reda på vart allt ligger.

Jag säger inte att React är bäst, men det är välkänt för frontend och rätt så enkelt att använda
när man väl förstår hur det fungerar. Det underlättar även att inte "reinvent the wheel",
att vi skulle bygga något med vanlig JavaScript är inte riktigt nödvändigt och
vi bör använda det som finns tillgängligt. Men absolut så är det viktigt att förstå
grunderna i JavaScript, men det är en helt annan fråga.


### Express

[Express](http://expressjs.com/) är ett ramverk för Node.js. Då ramverket är skapad
med vanlig JavaScript så slipper vi skifta mellan olika programmeringspråk när vi
kodar för frontend och backend. Den hjälper oss med, request, response, routing
och mycket mer. Den låter oss skapa en MVC arkitektur på server-sidan. Den hjälper oss
skapa ett REST API, som kommer göra vår Single Page Applikation riktigt dynamisk
och mer användarbar, då vi helt plötsligt kan med AJAX eller Sockets be om data
från vår Express-server.

Som grädde på moset så är Express också standard ramverket för Node.js.


--------------------------------------------------------------------------------

## Installation & hur man testar

Här finns en konkret steg för steg guide, som visar hur du kan testa koden och starta applikationen.

### Basen
```
git clone https://github.com/Nicklas766/bth-team-app.git
cd bth-team-app
```

### Bra att veta

1. Du kan innan du startar servern använda `export DBWEBB_DSN='mongodb://minadress:27017/collection'`
om du skulle vilja använda en annan DSN än `localhost`.

2. `export DBWEBB_PORT=80` gör så servern kommer startas på port 80 istället för 1337,
du får valfritt välja.

3. När du använder Docker så kan du redigera `docker-compose.yml` om du skulle vilja
ändra någon port eller dsn. Det är `./data/db:/data/db` som default, om du använder
windows så kan du behöva ändra till `C:/data/db:/data/db` för MongoDB.

4. Om du inte använder docker så behöver du själv starta upp MongoDB. Tänk på att projektets
data-katalog ligger i `/backend`. Det spelar dock ingen roll vart katalogen ligger, om du
vill ha den på ett annat ställe så går det bra.

5. Om du använder Ubuntu och MongoDB inte startar, så kan det vara så att den vill att du har
`data/db` i root.


### Docker

För att starta upp en miljö så kan vi använda Docker, följande kommando
startar en MongoDB och en Express server (vår app).
```
npm run start-docker // starta
npm run stop-docker // stoppa
```

Du kan även starta testerna i tre olika versioner av Node via Docker, genom att göra
följande,

```
// Om MongoDB inte är igång så startas den automatiskt innan
npm run test-docker
npm run test-docker1
npm run test-docker2
```

### Testning lokalt
Kom ihåg tips 4, sedan har du följande valmöjligheter,
```
npm test
npm run mocha
npm run eslint
npm run eslint-fix
npm run stylelint
```

För att se kodtäckningen lokalt, öppnar du `/coverage` i en webbläsare.

### Utveckling frontend

Då express-servern använder en `bundle.js` så behöver vi starta klienten separat
vid utvecklingen av den.

1. `npm run start-docker` eller `npm start` och MongoDB lokalt.

2. Öppna en ny terminal och gå in klient katalogen
```
$ cd client
$ npm install
```
3. Redigera `webpack.config.js` (om du ser något som saknas), se även till så "proxy:n"
är samma adress som din Express-server. Dina ändringar kommer nu uppdateras automatiskt
i webbläsaren så fort du sparar en fil.

4. Gör `npm start`, därefter så är du 100% redo att börja koda.

5. Efter du är klar så kör du `npm run build` för att skapa en ny `bundle.js` i `backend/public/`


### Utveckling backend

Jag rekommenderar att man gör `npm run start-docker mongodb` och därefter `npm test`
när man utvecklar Express-servern.

### Produktion
Tänk på tips 4 och gör följande,

```
cd bth-team-app
npm install
npm start
```

--------------------------------------------------------------------------------

## Testning

### Verktyg

Följande verktyg och linters används för att testa koden, *Mocha*, *nyc*, *stylelint*,
*eslint*, *supertest*, *prop-types* och *concurrently*.

Mocha är ett test ramverk som gör det enkelt att testa koden, då den ger oss en
färdigbyggd struktur som gör så vi kan snabbt testa vår kod. Sedan för att få
kodtäckning så används nyc, "[istanbul](https://istanbul.js.org/)".

När vi vill testa en GET eller POST, så använder vi [supertest](https://www.npmjs.com/package/supertest).
Den hjälper oss att göra http-requests till vår app. För klienten så använder vi [proptypes](https://www.npmjs.com/package/prop-types),
som kontrollerar så att vi skickar rätt props till våra react-komponenter.

Linters användes till projektet, där användes [eslint](https://eslint.org/) och då vi har en react-klient
som har en JSX-syntax så används även pluginet [eslint-plugin-react](https://www.npmjs.com/package/eslint-plugin-react).
Sedan så används även [stylelint](https://www.npmjs.com/package/stylelint) som CSS linter.

Sist men inte minst, används [concurrently](https://www.npmjs.com/package/concurrently).
Den låter oss köra flera kommandon samtidigt i vår terminal, som gjorde
så att jag kunde först köra olika `npm script` för `npm test`. Testsuiten blev,
`"test": "concurrently \"npm run mocha\" \"npm run stylelint\" \"npm run eslint\"",`

### TDD

En sak som jag vill att vårt team ska prova är TDD. Som kortfattat betyder att
vi strävar att alltid skriva testerna innan vi skapar koden. Det gör vi då det oftast blir
tydligare för sig själv och sina kollegor vad koden ska göra. För denna applikationen
så kodade jag enligt TDD, därav så har jag en väldigt hög kodtäckning för backenden.

För servern så anser jag att man bör och ska skriva testerna innan koden, iallafall en grund
för tester. Då det är mycket smidigare att starta testerna än att starta
om servern många gånger för att se ifall sin kod är korrekt. Du slipper också
skriva testerna sedan som minskar efterarbetet också.

Det kan vara lite mer komplicerat och tidskrävande att testa klienten, vi ska
försöka använda TDD där också är min idé, men nedan så skriver jag mer detaljerad
om hur vi ska gå tillväga där.



### Test för klienten

Med hjälp av webpack så uppdateras webbläsaren automatiskt när vi sparar en fil.
Detta betyder att det är väldigt effektivt att skriva kod på det "gamla hederliga sättet"
och titta i webbläsaren. Då det handlar om frontenden så kan detta även kännas
mycket lättare, då du kan visuellt se direkt ifall det blev som du tänkt.

Men ska vi skriva tester för React? Jag ser just nu ingen nytta med att göra tester
för att prova våra komponenter, jag känner istället att vi ska använda "props-types"
för att markera vilka 'types' våra 'child-components' tar emot. Detta gör så vi
slipper hålla på att mocka en olika saker, som faktiskt kan göra hela projektet
rätt så förvirrande.

Anledningen varför jag valde prop-types är för att den varnar oss när vi skriver
kod ifall en `prop` som vi skickar till en komponent är fel. Ett exempel är att vi
vill skicka en array till en komponent, men någonstans så har vi skickat en sträng,
här varnar proptypes oss.

Det kan även göra vår kod mer läsbar, då vi slipper i vissa fall kommentera
vad komponenten gör, då komponentens namn och proptypes är tydliga.


--------------------------------------------------------------------------------

## Kedja för Continuous integration

CI-kedjan består av tjänsterna *Travis*, *Scrutinizer*, *CodeClimate*.

Jag valde dessa tre för att de alla erbjuder något eget. Travis erbjuder en riktigt
tydlig översikt ifall vår "build" fungerar. Scrutinizer sköter kodtäckningen, medan
CodeClimate sköter kodkvalitén.

Travis används då den är rätt så standard och är väldokumenterad, den är även
kopplad till Github, precis som Scrutinizer och CodeClimate också är. Travis kör våra
tester i olika node versioner. För att se till så Travis startar en MongoDB innan
man startar testerna så behöver man endast redigera `.travis.yml`.

Scrutinizer används för att kunna se kodtäckningen, den visar även en bra
översikt på hur man kan förbättra kodkvalitén. Däremot så anser jag att CodeClimate
är mycket tydligare på vad som kan förbättras, detta tycker jag för att deras design
gör det lättare att förstå, men detta kan vara en smaksak.

Jag använde samma kedja till mina moduler som även används till denna applikation.
Kedjan fungerar bra och jag stötte inte på några stora problem. För just denna
applikationen så är jag nöjd med vilka betyg den fick för kodkvalitén. Jag är nöjd
då mitt mål är övertyga er att dessa tekniker som jag skriver om är bra och därav
så känns det bra att CI-kedjan gett mig bra respons. En reflektion på hjälpen som
en CI-kedja ger oss är t.ex ett lint-verktyg, där vi får en respons av en dator
om vad vi kunde gjort annorlunda.

--------------------------------------------------------------------------------

## Realtid

Denna applikationen använder [socket.io](https://www.npmjs.com/package/socket.io)
för att enkelt kunna skapa realtid med event-baserad kommunikation mellan klient
och server.

I denna applikation så är det gjort så att en klient skickar ett meddelande till
servern, som därefter skickar ett meddelande till alla klienter (eller alla klienter
i ett specifikt rum). När en klient mottar ett meddelande så använder vi oss
av "reacts state" för att uppdatera något (om någon data ändrats). Så för att
vara väldigt konkret, så har klienten sina `on('event')` för att vara redo att göra
något, detta är också exakt samma för servern.

För att underlätta hanteringen av events så används min egna modul [socket-mansion](https://www.npmjs.com/package/socket-mansion),
som jag kommer att skriva mer om i slutet av texten. Kortfattat så låter den oss
lätt skapa olika `socket-rooms` som man kan gå med i, rummen har unika `on('event')`.
Därefter kan vi skapa en modul till vår server som symboliserar ett rum, i denna
applikationen så finns det två olika typer av rum, ett "game" och en "chat".
Vänligen notera att använda min modul inte är ett krav, detta är en exempel
applikation, som visar hur vi kan strukturera ett projekt.

Socket.io fungerade bra, den var lätt att förstå och gav utrymme till
att skapa egen kod.



--------------------------------------------------------------------------------

## Databas

MongoDB används för databasen, som är en "Document Database" och är en
av de mest populära NoSQL-databaser. Databasen är väldigt dynamisk då den inte
har en "schema". Då denna applikationen endast har användare just nu så blir
det svårt argumentera varför t.ex MySQL-databas inte kunnat fungera likabra. Men om
denna applikationen hade växt enormt mycket så hade vi enkelt kunna justera våra
objekt som vi har i MongoDB då den är väldigt dynamisk. Om vi hade skapat en grund för MySQL så hade
vi troligtvis behövt hålla oss till relationerna vi skapat, det kan vara både
en fördel och nackdel.


I framtida projekt så bör vi hålla ett möte innan, där vi går väger fördelar och
nackdelar angående vilken databas vi bör använda. Om vi upptäcker att vi vill
ha tydliga relationer för vår data? Bra, då bör vi nog använda MySQL. Vilken
budget har vi? Det är billigare med NoSQL-databaser då vi kan använda nya noder
när databasen växer, itsället för att uppgradera vårt befintliga system. Med
andra ord, så behöver vi veta vad vårt projekt är, innan vi kan göra ett logiskt
beslut tillsammans.

--------------------------------------------------------------------------------

## Egen modul på npm

### NPM
Då vi fokuserar på att skriva återanvändbar kod, så bör vi skapa moduler så
gott det går. Detta underlättar även processen att skriva tester, då vi strävar att
skapa så oberoende moduler som möjligt. NPM öppnar en värld av många olika
moduler som vi kan använda i vår kod.

Däremot så finns det fördelar och nackdelar med att använda moduler. Ett exempel på
en nackdel är när jag använde min modul `socket-mansion`, kortfattat så ville jag
kunna göra något i modulen, som modulen inte kunde göra. En stund så kände jag mig begränsad,
då jag insåg att min modul inte hade denna valmöjligheten. Som tur så var det
min egna modul så jag kunde lägga till funktionen i modulen, men tänk om det inte var
min modul och jag hade börjat skriva massor av kod till min applikation? Man
ska absolut använda sig av moduler då det är riktigt smidigt, men man ska
även vara vaksam hur beroende sin applikation blir av något.


### Egna moduler

Jag vill gärna att vi kodat enligt modulär programmering. Jag har redan förklarat
fördelarna med det, så jag visar nu två av mina egna moduler som jag skapade för
denna applikationen som underlättade databas-hanteringen och realtiden.

Den första jag skapade är [mongo-connecter](https://www.npmjs.com/package/mongo-connecter).
Modulen gör så man slipper skriva koden för "connect" som kan spara många rader.
Den har ett färdigt byggt API som man kan använda för generalla MongoDB-funktioner.
Däremot så är stjärnan i det hela `collectionDo` som använder funktionell programmering
för att låta dig använda din `collection` snabbt och väldigt lätt, läs gärna mer
på länken, där finns lite kod också.

Den andra modulen som jag skapade är [socket-mansion](https://www.npmjs.com/package/socket-mansion).
Denna modulen hjälpte mig mest, läs gärna introduktionstexten på NPM för att få
en uppfattning vad den gör (vill ej skriva för mycket här).

Om man tittar på båda modulerna så ser man att CI-kedjan ger väldigt bra resultat,
det var absolut lite arbete att fixa, men det var mycket skönt och smidigt då
de var i sina egna repon, jag hoppas det övertalar er att moduler är värt att använda.



--------------------------------------------------------------------------------

## En artikel om React

Jag skapade en artikel angående React, idén med artikeln är att ge er en kort
introduktion till vad React är och vad den används till,

https://dbwebb.se/forum/viewtopic.php?f=60&t=7215

--------------------------------------------------------------------------------

## Sammanfattning av tekniker

Så följande tekniker/verktyg föreslår jag:

### Utveckling:
* Express.js (server)
* React (klient)
* MongoDB
* Socket.io

#### Test:
* Mocha
* nyc
* stylelint
* eslint
* supertest
* prop-types
* concurrently

#### CI:
* Travis
* Scrutinizer
* CodeClimate

#### Övrigt:
* Docker
* TDD
