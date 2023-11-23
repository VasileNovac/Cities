# Cities
Searching cities and saving tourist information

Vom face o aplicație web unde utilizatorul va putea căuta orașe, o să vadă informații despre ele, și apoi le poate salva în favorite. 
Vom folosi diferite API-uri pentru a obține aceste informații. 
O parte din informații le vom stoca în baza noastră de date, pe baza cărora vom oferi recomandări utilizatorului.

Tehnologii recomandate:

- next.js
    Serverul aplicației, va servi clientului fișierele necesare, se va conecta la baza de date.
- react
    Se ocupă de UI. Noi scriem componente care depind de `state`. React are grijă să afișeze în DOM componentele noastre în dependență de `state`. Matematic vorbind:
`UI = React(state)`

Folosim hooks pentru cod frumos.

- chakra-ui
    Ne permite să scriem CSS fără să scriem CSS 🤩. Și mai are și multe componente gata făcute.

- swr
    Are grijă de operațiile async din React.

- mongodb
    O bază de date populară.
