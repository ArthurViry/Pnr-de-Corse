/**
 * Observatoire de Territoire — PNR
 * Script principal : navigation par onglets & gestion des embeds ArcGIS
 */

/* ──────────────────────────────────────────
   NAVIGATION PRINCIPALE (5 pages / onglets)
   ────────────────────────────────────────── */

/**
 * Affiche la section ciblée et active l'onglet correspondant.
 * @param {string} id       – ID de la section à afficher (ex: 's-geo')
 * @param {HTMLElement} tabEl – Bouton onglet cliqué (pour l'état actif)
 */
function showSection(id, tabEl) {
  // Masquer toutes les sections
  document.querySelectorAll('.page-section').forEach(s => s.classList.remove('active'));

  // Désactiver tous les onglets
  document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));

  // Afficher la section cible
  const target = document.getElementById(id);
  if (target) target.classList.add('active');

  // Activer l'onglet cliqué
  if (tabEl) tabEl.classList.add('active');

  // Scroll doux jusqu'à la barre de navigation
  const nav = document.getElementById('main-nav');
  if (nav) nav.scrollIntoView({ behavior: 'smooth', block: 'start' });
}


/* ──────────────────────────────────────────
   SOUS-ONGLETS DES EMBEDS ARCGIS
   (StoryMap / Dashboard / MapTour)
   ────────────────────────────────────────── */

/**
 * Bascule l'embed ArcGIS actif dans la page Géographie.
 * @param {string} section  – Préfixe de section (ex: 'geo')
 * @param {string} panel    – Panneau cible : 'storymap' | 'dashboard' | 'maptour'
 * @param {HTMLElement} tabEl – Bouton sous-onglet cliqué
 */
function switchEmbed(section, panel, tabEl) {
  // Sélecteurs des trois panneaux possibles pour cette section
  const panelIds = [
    '#' + section + '-storymap',
    '#' + section + '-dashboard',
    '#' + section + '-maptour'
  ];

  // Masquer tous les panneaux
  document.querySelectorAll(panelIds.join(', ')).forEach(p => p.classList.remove('active'));

  // Désactiver tous les sous-onglets du conteneur parent
  if (tabEl && tabEl.parentElement) {
    tabEl.parentElement.querySelectorAll('.embed-tab').forEach(t => t.classList.remove('active'));
  }

  // Afficher le panneau cible
  const targetPanel = document.getElementById(section + '-' + panel);
  if (targetPanel) targetPanel.classList.add('active');

  // Activer le sous-onglet
  if (tabEl) tabEl.classList.add('active');
}


/* ──────────────────────────────────────────
   INITIALISATION AU CHARGEMENT
   ────────────────────────────────────────── */

document.addEventListener('DOMContentLoaded', function () {

  // S'assurer que la première section et le premier onglet sont actifs
  const firstSection = document.querySelector('.page-section');
  const firstTab     = document.querySelector('.nav-tab');
  if (firstSection) firstSection.classList.add('active');
  if (firstTab)     firstTab.classList.add('active');

  // S'assurer que le premier sous-onglet embed est actif dans chaque section
  document.querySelectorAll('.embed-tabs').forEach(function (tabsEl) {
    const firstEmbedTab   = tabsEl.querySelector('.embed-tab');
    const firstEmbedPanel = tabsEl.nextElementSibling; // le premier .embed-panel
    if (firstEmbedTab)  firstEmbedTab.classList.add('active');
    if (firstEmbedPanel) firstEmbedPanel.classList.add('active');
  });

  // Keyboard navigation : touches ← → pour changer d'onglet principal
  document.addEventListener('keydown', function (e) {
    const tabs = Array.from(document.querySelectorAll('.nav-tab'));
    const activeIdx = tabs.findIndex(t => t.classList.contains('active'));
    if (e.key === 'ArrowRight' && activeIdx < tabs.length - 1) {
      tabs[activeIdx + 1].click();
    }
    if (e.key === 'ArrowLeft' && activeIdx > 0) {
      tabs[activeIdx - 1].click();
    }
  });

});
