#Projektbeskrivning   
####1DV449, Andreas Bom, ab22cw     
    
#######Bakgrund     
Ambulanssjukvården i Halland har i varje ambulans en dator med två skärmar. Den ena skärmen är placerad bak i vårdarhytten, den andra sitter fram mellan föraren och passageraren. I den främre skärmen körs en programvara som består av flera olika moduler. Det är bl.a GPS, statusrapportering, program för att öppna portar, telefoni m.m. Eftersom programvaran är uppdelad i moduler, är enkelt att utöka funktionaliteten. I dagsläget finns ingen information om trafikstörningar, aktuellt väglag eller förväntat väglag.    
    
######Syfte/Mål    
Applikationen ska hämta data från trafikverkets API och presentera detta på en karta. Den information som ska hämtas är bl.a. väglag, trafikstörningar och väder (lufttemperatur och nederbörd) för Halland. Eftersom ambulanserna många gånger befinner sig på platser där internet fungerar dåligt, ska applikationen fungera även om internetuppkopplingen är bruten.     


######Tekniker    
Serversidan av applikationen kommer att skivas i C# med ramverket ASP.NET MVC. På klienten kommer Javascript och Javascriptbaserade ramverk användas (bl.a. JQuery, Leaflet.js). 
    
    
######Önskvärda funktioner som implementeras i mån av tid    
En administratör ska kunna logga in via en tredjepartsinloggning (tex google) för att ställa in ett specifikt område (t.ex annat område än Halland) som informationen hämtas från.     
Googles trafkflöde visas på kartan (vägstreckor visas röda, gula eller gröna beroende på trafikflödet).   





