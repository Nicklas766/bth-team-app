

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






Jag använder socket.io


även min egna `socket-mansion` modul som ska underlätta att skapa moduler och
kod för realtids relaterad kod, men den skriver jag mer om längst ner.



En trevlig historia är att från början var
modulen objektorienterad men då jag ville lära mig funktionell programmering
så frågade jag min vän Anders "litemerafrukt" om tips och hjälp hur man bör tänka.
Nu efter hans tips och vägledning så blev modulen funktionell.



### Testning

------ IDEEEEEEEEEEEEEEEEEEE, gör så man kan göra "target" för vilken katalog
som ska testas

### Koden växer

Vi vet att vår kod kommer att växa vid stora projekt. Som vi vet så vill vi
försöka strukturera detta så bra som möjligt, så inte allt rasar.

En sak som jag redan förslagit är TDD. Däremot så kan det
bli många tester som också kan bli jobbigt att hålla reda på. Därav så har jag
skapat ett npm-script så ni kan "npm run mocha DIN-KATALOG". I katalogen så
har du alla dina tester som ser ut såhär "name.spec.js".




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




## Säkerhet

När vi hanterar input så ska vi givetvis har "spärrar" i vår backend. Det jag
menar med spärrar är att vi kontrollera så en POST inte har null värden eller
tomma strängar. Absolut så ska vi ha spärrar i frontenden, men de spärrarna
existerar för att vägleda användaren i rätt riktning.







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


## Flertal fel i npm test, hur kan jag göra processen lättare?

MONGOD DB SETUP se till så i root


## Eventuella fel

mongodb startar inte, ubuntu den vill att du har den i root.


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


## Allmäna tips

## Redovisningtext

För mig så var det viktigt att inte skriva flera sidor för min readme, jag kände
att det inte riktigt var det som uppgiften gick ut på. Jag ser det som en större
skicklighet att med så liten text som möjligt förmedla mycket information. Därav så
jag arbetade mycket med att se till så texten var välskriven, tydlig och insiktsfull
till mitt team. Men jag ville även vara trovärdig och därav så försökte jag
ta in fördelar och nackdelar som stöder mitt resonemang.


Det var mycket text som jag behövde ta bort för att se till så texten inte blev
otydlig.



Det var mycket mer jag ville skriva om, t.ex min katalogstruktur är genomtänkt,
men jag kände att då hade jag inte följt instruktionerna i kravspecen, så jag
passar på att skriva lite extra här.




krav 5:

drifsatt, känner att jag skrev tydlig hur jag gör med testerna, som videon pratade om.
skriv om sessionen express.


Jag känner att texten förklarar ifall det är lätt eller svårt och förklarar
sedan lösningen.
