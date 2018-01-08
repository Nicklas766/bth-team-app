## Redovisningtext


### Till rättaren

Jag skulle verkligen uppskatta om du har ljudet på när du rättar, jag har lagt in
musik och ljudeffekter. Kan vara rätt så högt så sänk gärna volumen innan. Jag kom
inte på ett bra namn, så det fick bli "Games".

Ljudeffekterna fungerar i spelet, jag har provat med min macbook och stationära
samtidigt och då fungerar det, av någon anledning så kan det bli dubbel när
man använder endast en dator (jag hade stängt av ljudet på ena webbläsaren).

Jag kommer visa i min redovisning i hangout, men vänligen tänk på att ha två
olika kontot när man loggar in och startar ett spel.

http://165.227.232.212

### Applikationen

Min applikation går ut på att man ska kunna logga in på ett konto för att
att kunna skapa ett spel som man sedan går med i. Spelet går ut på att vinna
över en boss med en annan spelare. Jag tog grunden ur mitt redovisa-repo och
tog allt jag lärt mig från kursen och "började på nytt" med en bra grund.

Jag har lagt ner mycket tid på projektet för att jag siktar på högsta betyg. Sedan
så har jag även valt att göra optionella kraven för 4, 5, 6.

https://github.com/Nicklas766/bth-team-app

### Krav 4

För mig så var det viktigt att inte skriva flera sidor för min readme, jag kände
att det inte riktigt var det som uppgiften gick ut på. Jag ser det som en större
skicklighet att med så liten text som möjligt förmedla mycket information. Därav så
arbetadee jag mycket med att se till så texten var välskriven, tydlig och insiktsfull
till mitt team. Men jag ville även vara trovärdig och därav så försökte jag
ta in fördelar och nackdelar som stöder mina resonemang.

### Krav 5

Många extra saker har gjorts, det finns många saker jag vill skriva om, men
det blir för mycket text. Men nedan så försöker jag förklara varför jag känner
att jag ska få poäng för krav 5.

#### Driftsättning och hög kodtäckning

Den första är att jag har driftsatt min applikation, detta var också en riktigt
bra övning under kursens gång för mig personligen. Därefter så har min applikation en
hög kodtäckning, detta är för att jag utvecklade enligt TDD, testerna är logiska och det finns rätt så
många. Det finns ingen kodtäckning för klienten men jag förklarade rätt så utförligt
varför i min readme, det var ett genomtänkt beslut till mitt team. I min README så
känner jag att det är utförligt förklarat varför testerna görs och hur.

Som grädde på moset så har båda mina moduler också 100% kodtäckning.

#### Katalogstruktur

Sedan så är klienten och serverns separerade genom att skapa en `/client` och
`/backend`. Klienten har en egen package.json, som gör mitt teams frontendutvecklare
fria att ladda ner nya dependencies till klienten utan att det får en effekt
på vår server, det gör det även lättare att hålla reda på vart allt ligger.

Klienten gör en npm run build som kommer skapa en bundle.js och index.html
i vår `/backend/public`, detta gör så mitt teams backendutvecklare kan koda utan att
behöva tänka på vilken effekt det får på klienten, då vi har separerar utvecklingen på
dessa. Vi har endast en egen package.json i klienten för att vi komplierar det till en bundle
som vi sedan låter vår server använda, därefter så har applikationen en "huvud package.json".

### Krav 6

Jag valde att göra en artikel som handlar om "en kort introduktion till react".
Den ger bakgrunden till hur React kom till och hur det fungerar. Idén är för det
första att det ska vara en bra artikel för vem som helst på dbwebb men även för
mitt team, https://dbwebb.se/forum/viewtopic.php?f=60&t=7215


## Allmänt

Om jag hade valt att göra en väldigt simpel applikation så hade nog projektet
varit rätt så lätt. Men jag vill utmana mig själv, pusha mig själv. En sak jag
älskar med programmering är att kunna visualisera något och därefter göra det till
verklighet. Det är en otrolig bra känsla.

Jag är inte riktigt säker hur lång tid projektet tog, jag har iallafall suttit
14 timmar varje dag den sista veckan. Jag gjorde det lättare för mig själv
genom att skapa två moduler som jag skrivit om, dessa gjorde projektet lite
smidigare att jobba på. Mitt största problem var att få till CSS-effekterna på mitt
spel, då när en spelare gör en attack så gör bossen direkt en attack därefter. Däremot så
vill jag ha en lugn transaktion i klienten, så jag uppdaterade state sakta och
fint med hjälp av en SetTimeout mellan de två. Detta tog väldigt lång tid att få
till, men när jag väl hade gjort det så kunde jag lätt lägga till t.ex ljudeffekter.

Projektet var rimligt och det var intressant med att fokusera mer på texten i
detta projekt. Då det tvingar en att veta vad man något är innan man börjar skriva.


## Feedback

Jag är riktigt nöjd med kursen. En sak som var riktigt bra var att vi införde
testmiljön rätt så tidigt i kursen, så kunde man skapa en bra grund. Litteraturen
har varit bra, den hjälper en att komma igång med uppgiften som vanligt, därefter länkar
kursmomententet oftast till extra litteratur om det skulle behövas.

En riktigt rolig och lärorik kurs, speciellt då vi fick använda egna ramverk och tekniker.
Att kursen höll bra ihop även fast alla gjorde hyfsat olika saker är toppen. Jag
kan inte komma på något som jag störde mig på.

Det är så otroligt mycket jag lärt mig under denna kursen, jag kommer
prata mycket väl om den. 10/10


http://165.227.232.212
https://github.com/Nicklas766/bth-team-app
https://dbwebb.se/forum/viewtopic.php?f=60&t=7215
https://github.com/Nicklas766/mongo-connecter
https://github.com/Nicklas766/socket-mansion
