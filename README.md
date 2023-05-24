# PWE projekt
### Martin Vondráček
- Backend je napsaný pomocí Node.js.
- Frontend je napsanýpomocí React.
- Zasílání zpráv a nových konverzací : socket.io
- Uživatelé, koonverzace a zprávy jsou uloženy v mongodb databázi.
- K designu uživatelského rozhraní je použit bootstrap ( + react-toastify pro zobrazení upozornění).
- k zahashování hesla v databázi se používá bcryp

## Popis objektů
- aplikace pracuje se 3 objekty : uživatel, konverzace, zpráva
- uživatel se skládá ze jména a hesla
- konverzace se skládá z jména konverzace a pole id uživatelů
- zpráva se skládá z textu, id odesílatele a id konverzace
- id jsou automaticky generovány pomocí mongo databáze

## Popis práce s aplikací
Aplikace umožňuje registraci a přihlášení uživatele. Po přihlášení se uživateli zobrazí seznam ostatních uživatelů, které může lze označit. Pod seznamem je textový vstup, kam lze zadat název nové konverzace. Po zvolení názvu, zaškrtnutí alespoň 1 uživatele a kliknutí na tlačítko "Create conversation" se vytvoří nová konverzace a zobrazí se v seznamu konverzací napravo (pro autora konverzace i všechny ostatní členy).

Konverzaci lze kliknutím na její název otevřít a psát zprávy, které se odešlou všem členům konverzace. Zprávy se zobrazují všem členům konverzace, pokud mají také otevřenou tuto konverzaci. Po otevření libovolné  konverzace se načtou všechny její zprávy, seřadí se dle času a celý chat se nascrolluje k nejnovější zprávě na konec chatu.

Z aplikace je možné se odhlásit červeným tlačítkem nahoře.

