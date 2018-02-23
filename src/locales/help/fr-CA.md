# Generale

L'application Auteur pour la plateforme géospatiale fédérale est utiliser pour cree des fichier de configuration json pour le
visualisateur pour la plateforme géospatiale fédérale.

Ouvrir un fichier existante en cliqant sur l'icône ![](uparrow.png).

Creer un nouveau fichier de configuration en cliqant sur l'icône ![](plussign.png).

Sauvegarder un fichier de configuration en cliqant sur l'icône ![](diskette.png) .

Par defaut 3 gabarit de configuration sont disponible pour avoir des valeurs de defaut.

Selectionner entre config-authorA, config-AuthorB ou config-full.


# Carte

La section carte est composer des onglets qui contient les informations sur les composantes de la carte.

Cette section carte est diviser dans le onglets suivante:Extendues et details, composantes,cartes de base,couches,legende.


## Extendues et details

Cette section liste des sous sections: Schéma des tuiles,Extents et Lots d'étendues spatiales,Lots de niveaux de détail.

##Schéma des tuiles

L'identifiant unique d'un schéma de tuiles (combinaison de l'étendue et de l'échelle)

Nom
Le nom utilisé dans le sélecteur de cartes de base.

ID du lot d'étendues
Le lot d'étendues à utiliser pour la carte de base.

ID du lot de niv. de détail
Optionnel. Lot de niveaux de détail utilisé pour la carte de base.

Carte d'aperçu statique

Type de couche



URL
Le point de service de la couche. Le type de couche retourné par le service et le type de couche identifié dans les paramètres doivent être les mêmes.

# Lots d'étendues spatiales

Cette section liste les lots d'etendues spatiale pour la  carte de base.
Étendue par défaut,Étendue complète, Étendue maximale

ID
The id of the extext set indicates the projection

WKID
Entrez le numero de la projection a utiliser.

vcsWKID
Entrez le numero VcsWkid la plus recente a utiliser.


latestWKID
Entrez le numero Wkid la plus recente a utiliser

Étendue par défaut
Étendue utilisée par défaut ainsi que pour le chargement initial.

Étendue complète
Étendue utilisée lorsque l'utilisateur clique sur le bouton étendue initiale.
L'étendue par défaut sera utilisée si l'étendue complète n'est pas définie..

Étendue maximale
L'étendue maximale permet de limiter le zoom et le pan.
L'étendue complète ou par défaut sera utilisée si l'étendue maximale n'est pas définie



## Lots de niveaux de détail

Niveau de détail pour un schéma de tuiles spécifique.

Les niveaux de détail selon l'échelle offerts pour la carte.

Entrez les Lots de niveaux de détai
 par niveau, resolution, et echelle.

 Utilise les fleches pour selectionner les valeur pour niveau resoltion et echelle.




## Map Composantes


The maps components tab lists the if mouse coordinates are enabled

Coordonnées de la souris

Selectionner si les coordonnees de la sosuris est afficher.


Référence spatiale

Selectionner la projection utiliser pour afficher les coordonnes de a souris.
de la sourithe numerical values selectable by a click for the projection displayed by selecting the
 wkid,vcsid ( vertical coordinate wkid) and latestwkid,latestvcswkid, and wkt( Well-known text (WKT) is a text markup language for representing vector geometry objects on a map,
spatial reference systems of spatial objects and transformations between spatial reference systems.)
of the mouse cooordinates to be displayed at the bottom of the map.

It also lists the checkboxes if enabled for the north arrow displayed on the map,
scale bar displayed at the bottom of the map and if the overviewmap is displayed at the upper right corner.

It also list for the oveviewmap is enabled, its scale factor and if visible.

## Cartes de base

ID de la carte de base initiale

Carte de base utilisée lors du chargement initial. Si celle-ci n'a pas été configurée, une autre carte de base sera sélectionnée

Collection cartes de base

ID carte de base
Un identifiant unique pour la carte de base.

Nom
Nom de la carte de base utilisé pour l'étiquettage.

Description
Description de la carte de base. Apparaît lorsque le sélecteur de carte de base est étendu.

Type sommaire
Optionnel. Type de la carte de base à afficher dans le sélecteur de carte de base.

Texte alternatif
Texte alternatif pour l'imagette de la carte de base.

URL imagette
Chemin vers le fichier image à afficher dans le sélecteur de carte de base.

ID schéma de tuiles
Le schéma de tuiles pour la carte de base.

Couches

ID,
type de couche,
url Un ensemble d'URLs qui permettent la composition d'une carte de base

Crédit
texte
description -Optionnel. Contient la valeur de l'attribution. Si celle-ci est vide, l'attribution retournée par le serveur sera utilisée.
logo
texte alternatif
url -URL de la destination lorsque l'utilisateur clique sur le logo.


## Couches

Lot de couches

Sélecteur de type de couche -esrifeature, esridynamic,ogcWms
L'ID de la couche pour référencement interne au visualisateur ( n'est pas directement lié à un service externe).
Nom -Le nom de la couche pour les fins d'affichage. Si vide, le visualisateur tentera de trouver un nom
URL - Le point de service de la couche. Le type de couche retourné par le service et le type de couche identifié dans les paramètres doivent être les mêmes

URL des métadonnées
Type de couche

Basculer la symbologie

Permet de basculer la visibilité ( allumé/éteint ) pour un symbole particulier.

Tolerance -Spécifie la tolérance en pixels de la région cliquable entourant un élément. Doit êtreun entier positif

 Couches Utilisées

index- index de la couche dans la service de la carte.

nom - nom personnalise pourn la couche. Peut replacer celui fourni par le service.

champs externe - liste des nome des attributs separer par un virgule.

etat seulement - un indicateur afin d'informer que l'entree est utilisee suelement pourbble suivi de l'etat. Par consequent tous les controles seront abscent de l'interface.

controle et etat de la couche - contient un liste des controles possible qu'on peut selcetionner pour la couche.

 ## Table -

La section table specifie comment les champs et la recherche globales sont configurees.
de configuration.
titre - le ttire de la table.

maximiser - taille de ela table lors d'ouverture
appliquer a la carte - terminer si le filtres par defaut sont appliquer a la carte.
personnalisation des champs - permet utilisateur de changer le noms des champs

description - information additionnele a propos de la table a  afficher dans le panneau





## Legende

Sélecteur du type de légende

Type de legende



# Interface Usager

Plein ecran - Indique si le visualisateur utilise l'entièreté de la fenêtre d'affichage
theme -Le thème de l'interface utilisateur du visualisateur.

# Légende

Est réordonnable
Permettre l'importation de couches

Options d'ouverture de la légende
Indique si la légende est ouverte par défaut lors du chargement initial pour les fenêtres d'affichage restreinte, moyenne et étendue.


Ouvrir par défaut dans l'affichage étendu
Indique si la légende est ouverte par défaut lors du chargement initial pour une fenêtre d'affichage étendue
Ouvrir par défaut dans l'affichage moyen
Indique si la légende est ouverte par défaut lors du chargement initial pour une fenêtre d'affichage moyenne
Ouvrir par défaut dans l'affichage restreint
Indique si la légende est ouverte par défaut lors du chargement initial pour une fenêtre d'affichage restreinte
Options d'ouverture de la table
Indique si la table est ouverte par défaut lors du chargement initial pour les fenêtres d'affichage restreinte, moyenne et étendue.
ID de la couche
L'ID de la couche pour des fins de référencement à l'intérieur du visualisateur
Ouvrir par défaut dans l'affichage étendu
Indique si la table est ouverte par défaut lors du chargement initial pour une fenêtre d'affichage étendue
Ouvrir par défaut dans l'affichage moyen
Indique si la table est ouverte par défaut lors du chargement initial pour une fenêtre d'affichage moyenne
Ouvrir par défaut dans l'affichage restreint
Indique si la table est ouverte par défaut lors du chargement initial pour une fenêtre d'affichage restreinte

## Navigation

Navigation restreinte- Empêche l'utilisateur d'effectuer des déplacements au delà de l'étendue maximale.
Barre de navigation
Zoom
Composantes de navigation en extra
geoLocator
marquee
home
history
basemap
help
fullscreen
geoSearch
sideMenu

## Menu laterale

Titre (Optionnel) - Un titre pour remplacer celui utilisé par défaut par le visualisateur.
Afficher le logo - Indique si le logo doit être affiché dans le menu latéral à gauche.
URL du logo  - (Optionnel)- Une image pour remplacer le logo utilisé par défaut par le visualisateur.
Items du menu latéral
×Close
items
layers
basemap
geoSearch
about
fullscreen
export
share
touch
help
language
plugins
×Close
items
layers
basemap
geoSearch
about
fullscreen
export
share
touch
help
language
plugins
×Close
items
layers
basemap
geoSearch
about
fullscreen
export
share
touch
help
language
plugins
×Close
items
layers
basemap
geoSearch
about
fullscreen
export
share
touch
help
language
plugins


 Ajouter Fichier d'aide

Propriétés de l'aide
Nom du dossier
default
(success)
Nom du dossier contenant les fichiers d'aide et les images connexes
À propos de la carte- L'à propos de la carte provenant du fichier de configuration ou d'un répertoire contenant un fichier de type Markdown

Source de l'à propos
Texte - À propos provenant d'un texte fourni (chaîne de caractères).


# Services

## Liens oour les services

URL pour les coordonnées

URL pour l'impression

## Recherche par lieux

 URLs des points de service

URL noms géographiques -https://geogratis.gc.ca/services/geoname/en/geonames.json
(success)
URL du point de service pour les noms géographiques.
URL géolocalisation https://geogratis.gc.ca/services/geolocation/en/locate?q=
(success)
URL du point de service pour la géolocalisation
URL géosuggestion https://geogratis.gc.ca/services/geolocation/en/suggest?q=
(success)
URL du point de service pour la géosuggestion
URL provinces https://geogratis.gc.ca/services/geoname/en/codes/province.json
(success)
URL du point de service pour les provinces
URL types - https://geogratis.gc.ca/services/geoname/en/codes/concise.json
(success)
URL du point de service pour les types
Type de recherche à désactiver
SNRC
Code postal
Latitude / Longitude
Désactiver des types de recherche spécifiques (SNRC, code postal/RTA, ou LAT/LNG)

## Exporter la Carte

Vous pouvez exporter une image de la carte et de ses couches visibles avec une légende, un titre, la flèche nord avec scalebar, la note en bas de page personnalisée et un timestamp.

Le titre de l'image exportée peut être fabriqué sur commande en entrant une valeur.

Si customizable un dialogue apparaîtra avec une image de la carte et d'une option pour entrer dans un titre de carte si désiré.

Titre
Titre du graphique à exporter.
Composantes de la carte
Légende
Éléments de la carte
La flèche du Nord et l'échelle.
Note de bas de page
Note de bas de page de la carte à exporter
Horodateur

Si customizable un dialogue apparaîtra avec une image de la carte et d'une option pour entrer dans un titre de carte si désiré.

![](exportmapwindowv2.png)

Aussi, les utilisateurs peuvent ajouter ou enlever des sections de l'image exportée comme une légende,
en cliquant sur la roue  d'options dans l'en-tête.

Les utilisateurs seront en mesure de choisir/désélectionner les sections pour apparaître dans l'image exportée.

# Version

L'étiquette de version vous permet de choisir la version  de schéma de visualisateur FGP en utilisant un coup énumèrent en bas .

Par défaut la présente version est 2.0.


# Langue

L'étiquette de langue vous permet de choisir la langue du dossier de configuration, en utilisant un coup énumère en bas .
Choisissez demi-cadratin-CA pour l'anglais ou fr-CA pour le français.

La valeur est un ISO 639-1 code indiquant la langue de ficelles dans le dossier de schéma.


# Panneau Sommaire

Le panneau sommaire vous autorise à valider les champs dans le dossier de configuration en cliquant sur le bouton valide).![](valider.png)

Le  panneau sommaire vous autorise aussi à présenter le dossier de configuration dans un viewport en cliquant sur le bouton d'avant-première.
![](apercu.png)

![](previewsample.png)

Une apercu de la carte affiche toutes les couches d'il de la carte comme il sera affiché par le visualisateur FGP.
C'est un visualisateur complètement fonctionnel contenant toute la fonctionnalité de l'application de visualisateur.

L'avant-première peut exiger à quelques secondes d'afficher.

Le panneau sommaire vous permet de valider le fichier de configuration en appuyant sur le
 le bouton validez ![](valider.png) pour valider tous les champs dans le fichier de configuration.

 Une fleche vert ![](greencheckbox.png) apparaîtra à côté des champs qui sont
valide.

Une boîte rouge ![](redcircle.png) avec un point d'exclamation apparaît à côté des champs qui
ne sont pas valides.

Vous pouvez utiliser des boutons d'effondrement ou le fait de développer ![](expandcollapse.png) pour voir tous les champs dans les différentes sections de
le dossier de configuration de téléspectateur.


# Durée du chargement / Comportement imprévu

La durée des chargements peut varier selon:
- l’emplacement réseau
- la disponibilité de la bande passante
- le nombre de couches chargées
- types de couches et leur taille

Un comportement imprévu peut survenir lorsque des interactions avec la carte ont lieu avant la conclusion du chargement des données. Veuillez permettre le chargement complet de la page Web avant d’activer d’autres fonctions sur la carte.

**Remarque**: Si l'indicateur de chargement de ligne de défilement apparaît au bas de la carte ou dans la légende, ou lorsque le tableau de données affiche un message de chargement en cours, attendez que l’indicateur de chargement disparaisse avant d’activer d’autres fonctions sur la carte.
