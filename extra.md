

## realtid sparad

I just denna applikationen så krävs det att man loggar in innan man får tillgång
till realtidsaspekten av appen. För att förtydliga att det är viktigt att vi
separerar utvecklingen på frontend och backend så använder jag `express-session`.
Man kan tänka att det bör vara okej att med hjälp av React göra så `sockets` sköter startas vid inlogg.
Däremot så kan vi få stora problem med vår app, ifall någon går in på en route som
vi antar att man redan har en socket-koppling startad.

Så för att undvika detta så ger vi vår express-server ansvaret att hålla reda på
ifall användaren är inloggad. Sedan kan vi i vår frontend också starta en socket-koppling
vid login, men det blir inte ett krav, vi har alltså lyckas göra vår klient och server
rätt så oberoende av varandra. De blir hyfsat oberoende då våra frontendutvecklare
vet att vid just kanske route "profile" så behöver en `express-session` existera
för att man ska kunna nå den, därefter kan vi koda hyfsat fritt utan att oroa oss över
att användaren är inloggad. Det är viktigt att tänka på att om man vill hålla
socket-kopplingen vid liv så går det bra, men det är fortfarande inte ett krav
då servern sköter sessionen.


Vi vet att alla vid routen /protected kommer man behöva vara inloggad för att nå
via en GET, POST, förutsätt att vi inte med hjälp av SPA tar oss in på routens.
Det behöver frontendutvecklarna tänka på.




även min egna `socket-mansion` modul som ska underlätta att skapa moduler och
kod för realtids relaterad kod, men den skriver jag mer om längst ner.



En trevlig historia är att från början var
modulen objektorienterad men då jag ville lära mig funktionell programmering
så frågade jag min vän Anders "litemerafrukt" om tips och hjälp hur man bör tänka.
Nu efter hans tips och vägledning så blev modulen funktionell.




--------------------------------------------------------------------------------
## Session

För att förtydliga att det är viktigt att vi separerar utvecklingen på frontend
och backend så använder jag `express-session`. Man kan tänka att det bör vara
okej att med hjälp av React göra så `sockets` sköter kopplingen vid login. Däremot
så kan vi få stora problem med våra routes, ifall någon användare skulle få för sig
att länka till en route som vi antar att användare är inloggad på.

Så för att undvika detta så ger vi vår express-server ansvaret att hålla reda på
så användaren är inloggad. Sedan kan vi i vår frontend också starta en socket-koppling
vid login, men det blir inte ett krav, vi har alltså lyckas göra vår klient och server
rätt så oberoende av varandra. De blir hyfsat oberoende då våra frontendutvecklare
vet att vid just kanske route "profile" så behöver en `express-session` existera
för att man ska kunna nå den, därefter kan vi koda hyfsat fritt utan att oroa oss över
att användaren är inloggad. Det är viktigt att tänka på att om man vill hålla
socket-kopplingen vid liv så går det bra, men det är fortfarande inte ett krav
då servern sköter sessionen.


Vi vet att alla vid routen /protected kommer man behöva vara inloggad för att nå
via en GET, POST, förutsätt att vi inte med hjälp av SPA tar oss in på routens.
Det behöver frontendutvecklarna tänka på.



## Katalog struktur

Jag har separerat klienten och serverns kod genom att skapa en `client` och
`backend`. Klienten har en egen package.json, så våra frontendutvecklare är
fria att ladda ner nya dependencies till klienten utan att det får en effekt
på vår server, det gör det även lättare att hålla reda på vart allt ligger.

Klienten gör en npm run build som kommer skapa en bundle.js och index.html
i vår `backend/public`, detta gör så våra backendutvecklare kan koda utan att
behöva tänka på vilken effekt det får på klienten, då vi har separerar utvecklingen på
dessa.

Backenden har inte en egen package.json, istället så har vi package.json i huvudkatalogen.
Vi har endast en egen package.json i klienten för att vi komplierar det till en bundle
som vi sedan låter vår server använda.



## Flertal fel i npm test, hur kan jag göra processen lättare?

Här så kan man absolut komma på egna bra lösningar. Men om det är så att npm test
ger dig riktigt många fel så skulle jag börja med en `npm run eslint-fix`, förhoppningsvis
så fixar eslint det flesta åt dig, om inte så behövs det göras manuellt. Då kan det
vara skönt att göra en sak i taget, därav så kan du i `.eslintignore` skriva sökvägarna
för de react-komponenter eller backend-del som du INTE vill ska köras, så kan du
göra en sak i taget.




### TDD


Däremot när vi vill se så en GET eller POST fungerar på en viss route, så ska
vi använda vår en mock-app (eller självaste appen) när vi testar routes. Detta
gör vi med Supertest som hjälper oss göra http-requests till vår app.

Vi kan ibland behöva starta en databas som t.ex "mongoDB" som jag använt i mitt
exempel. När jag testar den delen av api:et, så behöver man starta en mongoDB
på sin egna miljö eller med mongoDBs image (jag har ett exempel i mappen).


Jag ser gärna att ni skapar egna "setup funktioner" för era tester. T.ex så kan
testerna för sockets vara jobbiga att hålla reda på, då det finns många connections
som man vill hålla koll på, så jag skapade en "setup.js" kika gärna på den för
att få ett hum hur det kan se ut.



## Redovisningtext

### Applikationen

Jag valde att göra optionella kraven för 4, 5, 6. Jag har lagt ner mycket tid på
projektet för att jag siktar på högsta betyg. Jag har lagt in ljudeffekter, musik,
tilltalande design och den har "det där lilla extra" känner jag.

### Krav 4

För mig så var det viktigt att inte skriva flera sidor för min readme, jag kände
att det inte riktigt var det som uppgiften gick ut på. Jag ser det som en större
skicklighet att med så liten text som möjligt förmedla mycket information. Därav så
jag arbetade mycket med att se till så texten var välskriven, tydlig och insiktsfull
till mitt team. Men jag ville även vara trovärdig och därav så försökte jag
ta in fördelar och nackdelar som stöder mina resonemang.

### Krav 5

Det finns mycket jag vill skriva om, men det blir för mycket text. Däremot så
tar jag med det som jag känner förklarar varför jag bör få poäng för krav 5.
Det fanns tre andra varianter av detta krav som jag valde.

#### Driftsättning och hög kodtäckning
Den första är att jag har driftsatt min applikation, detta var också en riktigt
bra övning under kursens gång för mig personligen. Därefter så har min applikation en
hög kodtäckning, detta är för att jag utvecklade enligt TDD, testerna är logiska och det finns rätt så
många. Det finns ingen kodtäckning för klienten men jag förklarade rätt så utförligt
varför i min readme, det var ett genomtänkt beslut till mitt team. I min README så
känner jag att det är utförligt förklarat varför testerna görs och hur. Som grädde
på moset så har båda mina moduler också 100% kodtäckning.

#### Katalogstruktur
Sedan så är klienten och serverns separerade genom att skapa en `/client` och
`/backend`. Klienten har en egen package.json, mitt teams frontendutvecklare är
fria att ladda ner nya dependencies till klienten utan att det får en effekt
på vår server, det gör det även lättare att hålla reda på vart allt ligger.

Klienten gör en npm run build som kommer skapa en bundle.js och index.html
i vår `/backend/public`, detta gör så mitt teams backendutvecklare kan koda utan att
behöva tänka på vilken effekt det får på klienten, då vi har separerar utvecklingen på
dessa. Vi har endast en egen package.json i klienten för att vi komplierar det till en bundle
som vi sedan låter vår server använda, därefter så har applikationen en "huvud package.json".



### Krav 6

Länk till artikeln


## Allmänt

Jag gör det lite svårare för mig själv än vad det behöver vara, men det är lite
det jag älskar med programmering. Att kunna visuelera något och därefter skapa det,
är en otrolig bra känsla. Det är nog lite slöseri med tid att fixa en HTML-knapps
CSS i 1 timme, men det gör en stor skillnad.


https://github.com/Nicklas766/bth-team-app


## Feedback

Jag är riktigt nöjd med kursen. Det är så otroligt mycket jag lärt mig under
denna kursen.

10/10
