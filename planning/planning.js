// --- CALCUL DU NUMÉRO DE SEMAINE CIVILE ---
function numeroSemaine(date) {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const jourSemaine = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - jourSemaine);
  const debutAnnee = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil((((d - debutAnnee) / 86400000) + 1) / 7);
}

// --- STRUCTURE DES HORAIRES ---
const horaires = [
  { label: "8h30 – 9h20",  pause: false },
  { label: "9h20 – 10h10", pause: false },
  { label: "Récréation",   pause: true  },
  { label: "10h25 – 11h15",pause: false },
  { label: "11h15 – 12h05",pause: false },
  { label: "Temps de midi",pause: true  },
  { label: "13h30 – 14h20",pause: false },
  { label: "14h20 – 15h10",pause: false },
];

// --- CONTENU DU PLANNING PAR SEMAINE ---
const plannings = {
  23: {
    titre: "Semaine 23 — 1er juin 2026",
    cours: [
      // [lundi, mardi, mercredi, jeudi, vendredi]
      ["Français", "Maths", "Sciences", "Français", "Maths"],
      ["Maths", "Français", "Éveil", "Maths", "Français"],
      // pause récréation — laisser null
      null,
      ["Sciences", "Éveil", "Français", "Sciences", "Éveil"],
      ["Éveil", "Sciences", "Maths", "Éveil", "Sciences"],
      // pause midi — laisser null
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

/// --- LOGIQUE D'AFFICHAGE ---
const maintenant = new Date();
const jour = maintenant.getDay();
let semaineCourante = numeroSemaine(maintenant);

// --- AFFICHAGE ---
const planning = plannings[semaineCourante];
const corps = document.getElementById("corps-planning");

if (planning) {
  document.getElementById("titre-semaine").textContent = planning.titre;

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
  corps.innerHTML = "<tr><td colspan='6'>Aucun planning pour cette semaine.</td></tr>";
}