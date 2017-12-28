# Applikation som exempel för nya tekniker inom vårt team


## Varför är denna applikation skapad?
Idén är att jag arbetar som en arkitekt och teamledare och ska leda vägen för
nya tekniker i mitt team, som vi kan använda i våra framtida stora projekt.

Denna applikation används som utvärderings- och utbildningsmaterial för mitt team.


## Databas
Vi använder MongoDB. Efter "mongodb" i routen så visar vi vår collection
så vi har koll på vilken del vi använder, sedan har vi den specifika routen som ska
göra något, likt `mongodb/users/delete`.


Vi använder modulär programmering, därav så ska vi alltid tänka på att försöka separera
kod i egna repon, så det inte blir huller om buller.



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

## TDD

Vi strävar att alltid skriva testerna innan vi skapar koden för att det oftast
blir tydligare för en själv och sina kollegor vad koden ska göra.

Då vi kan programmera i realtid i vår klient med hjälp av webpack så får man gärna
skriva kod på det "gamla hederliga sättet" och titta i webbläsaren och därefter testa med
enhetstester för att kontrollera så allt blev som man tänkt sig. Detta är för att
det blir oftast lättare att se vad man gör, när man arbetar med frontenden.

För servern däremot så behöver man skriva testerna innan koden, iallafall en grund
för tester, då det även är mycket smidigare att starta testerna än att starta
om servern många gånger för att göra sina kontroller.
