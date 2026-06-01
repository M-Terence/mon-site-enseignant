const maintenant = new Date();
const jour = maintenant.getDay();
const heure = maintenant.getHours();

// Semaine courante = du jeudi 15h au mercredi 15h suivant
const estSemaineCourante = (jour === 4 && heure >= 15) || jour === 5 || jour === 6 || jour === 0 || jour === 1 || jour === 2 || (jour === 3 && heure < 15);

if (estSemaineCourante) {
  document.getElementById("semaine-courante").style.display = "block";
  document.getElementById("semaine-suivante").style.display = "none";
} else {
  document.getElementById("semaine-courante").style.display = "none";
  document.getElementById("semaine-suivante").style.display = "block";
}