#Rapport   
####1dv449 Webbteknik II    

###Inledning    
Appen visar trafikvarningar/trafikstörningar för ett förutbestämt län. Det visas en översikt över hela länet, samt varningar för specifika vägar. Det är även möjligt att se trafikflödet, och om det är köbildning. Utöver detta har appen en logg-in funktion, där inloggade användare kan ställa in ett 'hemlän'. 
   
####Målgrupp   
Appens målgrupp är ambulanspersonal. Genom att tillhandahålla aktuellt väglag, samt trafikflöde, kan föraren välja den mest lämpliga vägen till destinationen.   
   
####Tech    
Applikationens backend är skriven i ASP.NET MVC. Databaskommunikationen till MSSQL sker via ramverket Entity Frameworks. Inloggningen är gjord i Microsofts Identity, som kan ses som en bootstrap. Till front-end har javascript och JQuery används. Offline.js är ett API som kontrollerar om applikationen är on- eller offline. Google maps Api används för kart- och positionering, och Trafikverkets API används för insamling av trafikinformation. 


###Schematisk bild över applikationen


###Säkerhet och prestandaoptimering
Appen har en logginfunktion, där användruppgifter sparas i en databas. Lösenordet sparas i databasen som en hash, och kan inte återskapas. Inloggningen sker via en sessionskaka. Alla formulär använder sig av en antiforgery kod, för att motverka CS???????. All indata valideras, dels på klienten, dels på servern för att inte otillåtna tecken ska nå databasen.    
    

###Offline-first    
I nuläget behöver användaren initialt ha internetuppkoppling för att alla resurser ska laddas in. Om användaren förlorar internetuppkoppling, kommer väglag för sepcifika vägar, samt den länsövergripande informationen finnas att tillgå. Denna datan finns lagrad i local storage. Google sparar kartan lokalt och aktuell kartbild kommer också att finnas, även om uppkopplingen förloras. Trafikflöde fungerar inte, eftersom detta är realtids-data. Om användaren skulle trycka på aktiveringsknappen för trafikflöde skulle kartbilden förloras. För att unvika detta kontrolleras först om internetuppkoppling finns. Är användaren offline, körs ett script som förhindrar att knappens 'normala funktion' körs (dvs knappen blir obrukbar). Likaså fungerar det inte att logga in, eller gå in på administratörssidan. Detta för att funktionerna där kräver att kod exekveras på servern (läsa/skriva från databas). Även denna knappen blir 'disabled' om användaren är offline. 


###Risker med applikationen
Uppkopplingen vid inloggningen, och även övriga sidor, sker inte över en säker uppkoppling. Appen har egentligen ingen känslig information bakom inloggningen, så jag ser inte det som ett stort problem (Efter inloggningen kan användaren endast välja län. Administratören kan skapa nya användare.). Ett problem som skulle kunna uppstå, är att någon tar administratörsinloggningen, och börjar producera nya användare i en oresonlig takt, vilket skulle kunna innebära att databasen fylls på med data, och skulle kunna innebära en ekonomisk förlust för databasägaren. En annan sak som skulle kunna hända är att någon stjäl en användares uppgifter och lägger ett skript som byter län med jämna mellanrum (t.ex. var 20:e sekund), vilket skulle göra appen oanvändbar för just den användaren. 


###Reflektion kring projektet
Det har varit mycket problem med min app. Jag fixade ett problem och då uppstod ett nytt. Jag har ägnat otroligt mycket tid till felsökning. Nedan redovisar jag saker som jag hade tänkt att implementera i appen, men som utteblev p.g.a. jag inte fick det att fungera. 
    
#####Inloggning med Google    
Jag hade en inloggningsfunktion som fungerade lokalt, men när jag körde den på en remote server skickar google ett felmeddelande och användaren blir inte inloggad. Jag har testat alla tänkbara förslag på lösningar, men har kommit fram till att felmeddelandet skickas, därför jag inte hade ett giltigt SSL certifikat. Att köra på okrypterad uppkoppling fungerar inte heller.    

#####ASP.NET WebApi    
Jag hade initialt en web service som backend, som skickade jsonformaterad data. Detta fick jag inte till att fungera över https. Jag fick det inte heller att fungera med olika användare.   
    
#####UpUp.js
Jag använde ett hjälpramverk till Service workers. När detta användes slutade url'er att fungera (bl.a. de url'erna som användes för att hämta data). Jag tog bort detta, men det tog flera dagar innan jag tillslut kom på att service workern var registrerad i chrome, trots att jag tagit bort koden i mitt projekt. Därför fungerade appen endast på remote server, men inte lokalt. 

#####Serverplatsproblem    
På mitt webbhotel fungerade inte appen (men fungerade lokalt). Jag konsulterade Mats om problemet och han hade aldrig varit med om detta tidigare och hade ingen lösning. Istället testade jag att ladda upp appen på Azure (Microsoft). Detta gick inte heller. Jag tror att problemet där bestod i att deras brandvägg blockerade åtkomst till skolans databas (eller så blockerade skolan åtkomst). När jag la webserver och databas på skolans server fungerade det.


###Delar som är betygshöjande


