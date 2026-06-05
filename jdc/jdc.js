// --- CALCUL DU NUMÉRO DE SEMAINE CIVILE ---
function numeroSemaine(date) {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const jourSemaine = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - jourSemaine);
  const debutAnnee = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil((((d - debutAnnee) / 86400000) + 1) / 7);
}

// --- CONTENU DU JDC PAR SEMAINE ---
const semaines = {
  23: {
    titre: "Semaine 23 — 1er juin 2026",
    jours: [
      { jour: "Lundi", contenu: "..." },
      { jour: "Mardi", contenu: "D : Problèmes : vitesse, durée et distance p5" },
      { jour: "Mercredi", contenu: "D : Grammaire : les accords du participe passé p16-17" },
      { jour: "Jeudi", contenu: "D : Conjugaison : passé simple p9 | Eval : vitesse, durée et distance" },
      { jour: "Vendredi", contenu: "Dictée : texte 9" },
    ]
  },
  24: {
    titre: "Semaine 24 — 8 juin 2026",
    jours: [
      { jour: "Lundi", contenu: "D : Géométrie : compensation dans l'addition et la soustraction p.6-7" },
      { jour: "Mardi", contenu: "D : Géométrie : figures planes p.14" },
      { jour: "Mercredi", contenu: "D : Grammaire : pronoms personnels p10" },
      { jour: "Jeudi", contenu: "D : Conjugaison : futur simple p.11" },
      { jour: "Vendredi", contenu: "D : Données : Echelles p.9" },
    ]
  },
};

// --- LOGIQUE D'AFFICHAGE ---
const maintenant = new Date();
const jour = maintenant.getDay();
const heure = maintenant.getHours();

let semaineCourante = numeroSemaine(maintenant);

// Bascule jeudi à 12h vers la semaine suivante
if ((jour === 4 && heure >= 12) || jour === 5 || jour === 6 || jour === 0 || jour === 1 || jour === 2 || jour === 3) {
  semaineCourante++;
}

// --- AFFICHAGE ---
const semaine = semaines[semaineCourante];

if (semaine) {
  document.getElementById("titre-semaine").textContent = semaine.titre;
  const liste = document.getElementById("contenu-semaine");
  semaine.jours.forEach(j => {
    const li = document.createElement("li");
    li.innerHTML = "<strong>" + j.jour + " :</strong> " + j.contenu;
    liste.appendChild(li);
  });
} else {
  document.getElementById("titre-semaine").textContent = "Aucun contenu pour cette semaine.";
}