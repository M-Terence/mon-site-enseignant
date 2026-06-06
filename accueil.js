// --- CALCUL DU NUMÉRO DE SEMAINE CIVILE ---
function numeroSemaine(date) {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const jourSemaine = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - jourSemaine);
  const debutAnnee = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil((((d - debutAnnee) / 86400000) + 1) / 7);
}

const maintenant = new Date();
const jour = maintenant.getDay();
const heure = maintenant.getHours();

// --- NUMÉRO DE SEMAINE POUR LE PLANNING (semaine civile normale) ---
const semaineAujourdhui = numeroSemaine(maintenant);

// --- NUMÉRO DE SEMAINE POUR LE JDC (bascule jeudi à 12h) ---
let semaineJdc = semaineAujourdhui;
if ((jour === 4 && heure >= 12) || jour === 5 || jour === 6 || jour === 0 || jour === 1 || jour === 2 || jour === 3) {
  semaineJdc++;
}

// ============================================================
// DONNÉES — PLANNING
// ============================================================
const horaires = [
  { label: "8h30 – 9h20",   pause: false },
  { label: "9h20 – 10h10",  pause: false },
  { label: "Récréation",    pause: true  },
  { label: "10h25 – 11h15", pause: false },
  { label: "11h15 – 12h05", pause: false },
  { label: "Temps de midi", pause: true  },
  { label: "13h30 – 14h20", pause: false },
  { label: "14h20 – 15h10", pause: false },
];

const plannings = {
  23: {
    titre: "Semaine 23 — 1er juin 2026",
    cours: [
      ["Français", "Maths", "Sciences", "Français", "Maths"],
      ["Maths", "Français", "Éveil", "Maths", "Français"],
      null,
      ["Sciences", "Éveil", "Français", "Sciences", "Éveil"],
      ["Éveil", "Sciences", "Maths", "Éveil", "Sciences"],
      null,
      ["Maths", "Français", "", "Sciences", "Français"],
      ["Français", "Éveil", "", "Français", "Maths"],
    ]
  },
  24: {
    titre: "Semaine 24 — 8 juin 2026",
    cours: [
      ["Français", "Maths", "Sciences", "Français", "Maths"],
      ["Maths", "Français", "Éveil", "Maths", "Français"],
      null,
      ["Sciences", "Éveil", "Français", "Sciences", "Éveil"],
      ["Éveil", "Sciences", "Maths", "Éveil", "Sciences"],
      null,
      ["Maths", "Français", "", "Sciences", "Français"],
      ["Français", "Éveil", "", "Français", "Maths"],
    ]
  },
};

// ============================================================
// DONNÉES — JDC
// ============================================================
const semaines = {
  23: {
    titre: "Semaine 23 — 1er juin 2026",
    jours: [
      { jour: "Lundi",    contenu: "..." },
      { jour: "Mardi",    contenu: "D : Problèmes : vitesse, durée et distance p5" },
      { jour: "Mercredi", contenu: "D : Grammaire : les accords du participe passé p16-17" },
      { jour: "Jeudi",    contenu: "D : Conjugaison : passé simple p9 | Eval : vitesse, durée et distance" },
      { jour: "Vendredi", contenu: "Dictée : texte 9" },
    ]
  },
  24: {
    titre: "Semaine 24 — 8 juin 2026",
    jours: [
      { jour: "Lundi",    contenu: "D : Géométrie : compensation dans l'addition et la soustraction p.6-7" },
      { jour: "Mardi",    contenu: "D : Géométrie : figures planes p.14" },
      { jour: "Mercredi", contenu: "D : Grammaire : pronoms personnels p10" },
      { jour: "Jeudi",    contenu: "D : Conjugaison : futur simple p.11" },
      { jour: "Vendredi", contenu: "D : Données : Echelles p.9" },
    ]
  },
};

// ============================================================
// AFFICHAGE — PLANNING
// ============================================================
const planning = plannings[semaineAujourdhui];
const corps = document.getElementById("corps-planning");

if (planning) {
  document.getElementById("titre-planning").textContent = planning.titre;
  horaires.forEach((horaire, index) => {
    const tr = document.createElement("tr");
    if (horaire.pause) {
      tr.className = "pause";
      tr.innerHTML = "<td colspan='6'>🔔 " + horaire.label + "</td>";
    } else {
      const cours = planning.cours[index];
      let html = "<td class='horaire'>" + horaire.label + "</td>";
      cours.forEach((matiere, i) => {
        if (i === 2 && (index === 6 || index === 7)) {
          html += "<td class='conge'>Fin de journée</td>";
        } else {
          html += "<td>" + matiere + "</td>";
        }
      });
      tr.innerHTML = html;
    }
    corps.appendChild(tr);
  });
} else {
  document.getElementById("titre-planning").textContent = "Aucun planning pour cette semaine.";
}

// ============================================================
// AFFICHAGE — JDC
// ============================================================
const semaine = semaines[semaineJdc];

if (semaine) {
  document.getElementById("titre-jdc").textContent = semaine.titre;
  const liste = document.getElementById("contenu-jdc");
  semaine.jours.forEach(j => {
    const li = document.createElement("li");
    li.innerHTML = "<strong>" + j.jour + " :</strong> " + j.contenu;
    liste.appendChild(li);
  });
} else {
  document.getElementById("titre-jdc").textContent = "Aucun contenu pour cette semaine.";
}
