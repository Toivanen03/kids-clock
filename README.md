# Kids Clock

> Lasten kellosovellus värisegmenteillä vuorokausirytmin opetteluun.

---

## Projektin idea

Tämä projekti on henkilökohtainen sivuprojektini, jonka tavoitteena on:
- Opettaa lapsille kellonajan hahmottamista visuaalisesti käyttämällä värillisiä sektoreita eri aktiviteeteille.
  - 🔴 Uni
  - 🟡 Koulu
  - 🔵 Harrastus
  - 🟢 Syöminen
- Sovelluksesta on valittavissa oppimisen edetessä:
  1. Värisektorit ja tuntiviisari
  2. Minuuttiviisari
  3. Numerot kellotauluun
- Asetukset valitaan vanhemman näkymästä, myöhemmässä kehitysvaiheessa mahdollisesti erillisestä vanhemman sovelluksesta.

---

## Teknologiat

- **Frontend:** React Native + Expo + TypeScript
- **State management:** React state / Context API
- **Version control:** Git + GitHub
- **CI/CD:** GitHub Actions (type-check, lint)
- **Build:** Expo Go / EAS Build (Android / iOS)
- **Backend (mahdollisesti tulevaisuudessa):** Node.js + MongoDB (asetusten tallennus)

---

## Branch-strategia

- `main` → tuotantoversion vakaa koodi
- `dev` → kehityshaara, johon lisätään uudet ominaisuudet ja testikoodi

---

## Projektin rakenne (suunnitelma)
```
/kids-clock
├── App.tsx # Sovelluksen pääkomponentti
├── components/ # UI-komponentit (kellotaulu, sektorit, viisari)
├── screens/ # Näytöt (lapsi, vanhempi)
├── types/ # TypeScript-tyypit
├── assets/ # Kuvat, fontit, ikonit
└── README.md
```
---