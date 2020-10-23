# fgpa-apgf

[![Join the chat at https://gitter.im/fgpv-vpgf/fgpa-apgf](https://img.shields.io/badge/GITTER-join%20chat-green.svg?style=flat-square)](https://gitter.im/fgpv-vpgf/AuthoringTool?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

[![Code Climate](https://codeclimate.com/github/fgpv-vpgf/fgpa-apgf/badges/gpa.svg)](https://codeclimate.com/github/fgpv-vpgf/fgpa-apgf)
[![Issue Count](https://codeclimate.com/github/fgpv-vpgf/fgpa-apgf/badges/issue_count.svg)](https://codeclimate.com/github/fgpv-vpgf/fgpa-apgf)

-------------------------------------------------------------------
# Authoring tool for Federal Geospatial Platform (FGP) viewer

[Working Demo](https://jolevesq.github.io/fgpa-apgf/samples/fgpv-author.html)

*Notes: It is preferable to use Chrome or Firefox (Internet Explorer is not supported)*

[Documentation](https://fgpv-vpgf.github.io/fgpa-apgf/a2v2/0.1.0/index.html)

_Important: After npm install, modify angular-schema-form-bootstrap-bundled.min.js inside the node_modules folder. You need to modify this o.a.uppercase(t[0]) to t[0].toUpperCase().
This is important because uppercase is deprecated and the application won't work_

## Getting Started

Requirements:

- [NodeJS](https://nodejs.org/)

Running a local build:

0. Checkout the repo
0. Switch to the develop branch (master is for stable, released code)
0. Run `npm install` to install dependencies
0. Run `npm run serve` to build and launch a dev server

We use a fork and pull model for contributions, see our [contributing guidelines](https://github.com/fgpv-vpgf/fgpv-vpgf/blob/develop/CONTRIBUTING.md) for more details.

-------------------------------------------------------------------
# Auteur pour le visualisateur de la Plateforme géospatiale fédérale (PGF)

[Page Démonstration](https://jolevesq.github.io/fgpa-apgf/samples/fgpv-author.html)

*Notes: Il est préférable d'utiliser Chrome ou Firefox (Internet Explorer n'est pas supporté)*

_Important: Après npm install, modifer angular-schema-form-bootstrap-bundled.min.js qui se situe dans le répertoire node_modules. Vous devez modifier ceci o.a.uppercase(t[0]) pour t[0].toUpperCase().
Ceci est important car uppercase est déprécié et l'application de fonctionnera pas_

## Pour commencer

Exigences:

- [NodeJS](https://nodejs.org/)

Exécuter une compilation locale:

0. *Checkout* le dépôt
0. Sélectionnez la branche de *develop* (la branche *master* est pour le code stable et publié)
0. Exécuter `npm install` pour installer les dépendances
0. Exécuter `npm run serve` pour créer et lancer un serveur de développement


Nous utilisons un modèle dit *fork and pull* pour les contributions, voir nos [directives de contribution](https://github.com/fgpv-vpgf/fgpv-vpgf/blob/develop/CONTRIBUTING.md) pour plus de détails.

*Notes: la documentation est en anglais seulement*
