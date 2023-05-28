# PWE projekt
### Martin Vondráček
## Využité technologie:
- Node.js + Express.js (backend)
- React (frontend)
- socket.io (komunikace s ostatními uživateli)
- mongodb (záznamy uživatelů, konverzací a zpráv)
- bootstrap (UI) + react-toastify (pro zobrazení upozornění)
- bcryp (zahashování hesla)
- API Blueprint (návrh rozhraní) + apiary

## Popis práce s aplikací
Aplikace umožňuje registraci a přihlášení uživatele. Po přihlášení se uživateli zobrazí seznam ostatních uživatelů, které může lze označit. Pod seznamem je textový vstup, kam lze zadat název nové konverzace. Po zvolení názvu, zaškrtnutí alespoň 1 uživatele a kliknutí na tlačítko "Create conversation" se vytvoří nová konverzace a zobrazí se v seznamu konverzací napravo (pro autora konverzace i všechny ostatní členy).

Konverzaci lze kliknutím na její název otevřít a psát zprávy, které se odešlou všem členům konverzace. Zprávy se zobrazují všem členům konverzace, pokud mají také otevřenou tuto konverzaci. Po otevření libovolné  konverzace se načtou všechny její zprávy, seřadí se dle času a celý chat se nascrolluje k nejnovější zprávě na konec chatu.

Z aplikace je možné se odhlásit červeným tlačítkem nahoře.

Pro rychlé otestování obsahuje databáze několik již vytvořených uživatelů: martin, katka, pavel. Všichni mají hesla "12345678".

