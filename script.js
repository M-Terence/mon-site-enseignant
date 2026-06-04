const maintenant = new Date();
const jour = maintenant.getDay();
const heure = maintenant.getHours();

// Semaine courante : du jeudi 12h précédent jusqu'au jeudi 12h suivant
// = vendredi(5), samedi(6), dimanche(0), lundi(1), mardi(2), mercredi(3), jeudi avant 12h(4)
const estSemaineCourante = jour === 5 || jour === 6 || jour === 0 || jour === 1 || jour === 2 || jour === 3 || (jour === 4 && heure < 12);

if (estSemaineCourante) {
  document.getElementById("semaine-courante").style.display = "block";
  document.getElementById("semaine-suivante").style.display = "none";
} else {
  document.getElementById("semaine-courante").style.display = "none";
  document.getElementById("semaine-suivante").style.display = "block";
}
