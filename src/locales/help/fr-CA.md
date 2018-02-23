# Generale

L'application Auteur pour la plateforme géospatiale fédérale est utiliser pour cree des fichier de configuration json pour le visualisateur pour la plateforme géospatiale fédérale.

Ouvrir un fichier existante en cliqant sur l'icône ![](uparrow.png).

Creer un nouveau fichier de configuration en cliqant sur l'icône ![](plussign.png).

Sauvegarder un fichier de configuration en cliqant sur l'icône ![](diskette.png) .

Par defaut 3 gabarits de configuration sont disponible pour des valeurs de defaut.

Choissiez entre config-authorA, config-AuthorB ou config-full.

# Carte

La section carte est composer des onglets qui contient les informations sur les composantes de la carte.

Cette section carte est diviser dans le onglets suivante:Extendues et details, composantes,cartes de base,couches,legende.

## Etendues et details

Cette section liste des sous sections: Schéma des tuiles,Extents et Lots d'étendues spatiales,Lots de niveaux de détail.

## Schéma des tuiles

+ L'identifiant - l'identifiant unique d'un schéma de tuiles (combinaison de l'étendue et de l'échelle)

+ Nom - Le nom utilisé dans le sélecteur de cartes de base.

+ ID du lot d'étendues - Le lot d'étendues à utiliser pour la carte de base.

+ ID du lot de niv. de détail - Optionnel. Lot de niveaux de détail utilisé pour la carte de base.

+ Carte d'aperçu statique

+ Type de couche -Selectionne entre esriTile ou esriImage.

+ URL - Le point de service de la couche. Le type de couche retourné par le service et le type de couche identifié dans les paramètres doivent être les mêmes.

# Lots d'étendues spatiales

Cette section liste les lots d'etendues spatiale pour la  carte de base.
Étendue par défaut,Étendue complète, Étendue maximale

+ ID -l'identifiant d'étendues spatiale.

+ WKID =Entrez le numero de la projection a utiliser.

+ VcsWKID - Entrez le numero VcsWkid la plus recente a utiliser.

+ latestWKID - Entrez le numero Wkid la plus recente a utiliser.

+ Étendue par défaut - Étendue utilisée par défaut ainsi que pour le chargement initial.

+ Étendue complète - Étendue utilisée lorsque l'utilisateur clique sur le bouton étendue initiale.
L'étendue par défaut sera utilisée si l'étendue complète n'est pas définie.

+ Étendue maximale - L'étendue maximale permet de limiter le zoom et le pan.
L'étendue complète ou par défaut sera utilisée si l'étendue maximale n'est pas définie.

## Lots de niveaux de détail

Niveau de détail pour un schéma de tuiles spécifique.

Les niveaux de détail selon l'échelle offerts pour la carte.

Entrez les Lots de niveaux de détai par

+ niveau

+ resolution

+ echelle.

Utilise les fleches pour selectionner les valeurs par niveau de resolution et echelle.

## Map Composantes

La section composantes liste si les Coordonnées de la souris sont afficher.

Coordonnées de la souris

Selectionnez si les coordonnees de la souris sont afficher.

Référence spatiale

Séléctionnez la référence spatiale utilisée pour l'affichage des coordonnées pour la souris.

Séléctionnez la

+ WKID - Well-Known ID

+ VcsWKID - Systeme de référence verticale WKID

+ WKID le plus récent

+ VcsWKID le plus récent

+ WKT - Well-Known Text

Aussi vous pouvez activée les composantes suivant.

+ flèche du Nord

+ echelle

+ carte d'aperçu

+ facteur d'expansion - facteur pour la carte d'aperçu peuvent etre activée.

## Cartes de base

+ ID - l'identifiant de la carte de base initiale.

 Carte de base utilisée lors du chargement initial. Si celle-ci n'a pas été configurée, une autre carte de base sera sélectionnée.

### Collection cartes de base

+ ID carte de base - Un identifiant unique pour la carte de base.

+ Nom - Nom de la carte de base utilisé pour l'étiquettage.

+ Description - Description de la carte de base. Apparaît lorsque le sélecteur de carte de base est étendu.

+ Type sommaire - Optionnel. Type de la carte de base à afficher dans le sélecteur de carte de base.

+ Texte alternatif - Texte alternatif pour l'imagette de la carte de base.

+ URL imagette - Chemin vers le fichier image à afficher dans le sélecteur de carte de base.

+ ID schéma de tuiles - Le schéma de tuiles pour la carte de base.

Couches

+ ID - L'identifiant de la couche pour référencement interne au visualisateur ( n'est pas directement lié à un service externe).

+ Type de couche - Selectionner entre esriFeature, esriDynamic, esriTile, EsriImage, ou ogcWms.

+ Url  - Un ensemble d'URLs qui permettent la composition d'un carte de base

Crédit

+ Texte - Activée ou non pour le description.

+ Description - Optionnel. Contient la valeur de l'attribution. Si celle-ci est vide, l'attribution retournée par le serveur sera utilisée.

Logo

+ Logo visibe - Activée ou non.

+ Texte alternatif - URL pour l'image.

+ Url - URL de la destination lorsque l'utilisateur clique sur le logo.


## Couches

### Lot de couches

+ Sélecteur de type de couche - selectionnez entre esriFeature, esriDynamic, esri Image, esriTile, ogcWms.

+ L'ID - L'identifiant de la couche - pour référencement interne au visualisateur ( n'est pas directement lié à un service externe).

+ Nom - Le nom de la couche pour les fins d'affichage. Si vide, le visualisateur tentera de trouver un nom

+ URL - Le point de service de la couche. Le type de couche retourné par le service et le type de couche identifié dans les paramètres doivent être les mêmes

+ URL des métadonnées - L'URL du service de carte pour les métadonnées.

+ Basculer la symbologie - Permet de basculer la visibilité ( allumé/éteint ) pour un symbole particulier.

+ Tolerance - Spécifie la tolérance en pixels de la région cliquable entourant un élément. Doit êtreun entier positif

 ### Couches Utilisées

+ Index- L'index de la couche dans la service de la carte.

+ nom - Nom personnalise pourn la couche. Peut replacer celui fourni par le service.

+ Champs externe - Liste des noms des attributs separer par un virgule.

+ Etat seulement - Un indicateur afin d'informer que l'entree est utilisee suelement pourbble suivi de l'etat. Par consequent tous les controles seront abscent de l'interface.

Controle et etat de la couche

![](layersettings.png)

Contient un liste des controles possible qu'on peut selcetionner pour la couche.

Une liste des contrôles à activer sur une couche en particulier

+ opacity
+ visibility
+ boundingBox
+ query
+ snapshot
+ metadata
+ boundaryZoom
+ refresh
+ reload
+ remove
+ settings
+ data
+ styles

 ### Table

 ![](tablepanel.png)

La section table specifie comment les champs et la recherche globales sont configurees.

+ Titre - Le titre de la table.

+ Description - Information additionnelle à propos de la table à afficher dans le panneau de configuration.

+ Maximiser - Taille de la table lors d'ouverture.

+ Appliquer a la carte - Determiner si le filtres par defaut sont appliquer a la carte.

Personnalisation des champs - Permet l'utilisateur de changer le noms des champs.

## Légende

+ Type de légende - Selectionner entre un type de legende automatique ou structuree.

Si un legende structuree et selectionner vous devez remplir la legende en fomat json avec un fichier json pour definir la legende personnaliser

+ Ajouter une section à la légende - Vosu pouvez ajouter une section à la légende entre entree, groupe, information, couche non liée, et groupe visibilité.

# Interface Usager

Général

+ Plein ecran - Indique si le visualisateur utilise l'entièreté de la fenêtre d'affichage

+ Theme - Le thème de l'interface utilisateur du visualisateur.

Lors de la défaillance du visualisateur

+ Message d'échec - (Optionnel) - Un message à afficher en cas de défaillance.

+ URL image d'échec - (Optionnel) - Une image à utiliser en cas de défaillance.

![](menu.png)

Légende

Cliquez pour accéder aux propriétés de la légende dans la section UI.

+ Est réordonnable - indique si les éléments de la légende sont réordonnables. Cette propriété est ignorée si la légende est du type structurée.

![](reorder.png)

+ Permettre l'importation de couches -Indique si l'utilisateur peut ajouter des couches à partir de l'interface.

![](add.png)

Options d'ouverture de la légende

+ Indique si la légende est ouverte par défaut lors du chargement initial pour les fenêtres d'affichage restreinte, moyenne et étendue.

+ Ouvrir par défaut dans l'affichage étendu - Indique si la légende est ouverte par défaut lors du chargement initial pour une fenêtre d'affichage étendue

+ Ouvrir par défaut dans l'affichage moyen - Indique si la légende est ouverte par défaut lors du chargement initial pour une fenêtre d'affichage moyenne

+ Ouvrir par défaut dans l'affichage restreint - Indique si la légende est ouverte par défaut lors du chargement initial pour une fenêtre d'affichage restreinte

+ Options d'ouverture de la table- Indique si la table est ouverte par défaut lors du chargement initial pour les fenêtres d'affichage restreinte, moyenne et étendue.

+ ID de la couche - L'identifiante de la couche pour des fins de référencement à l'intérieur du visualisateur

+ Ouvrir par défaut dans l'affichage étendu - Indique si la table est ouverte par défaut lors du chargement initial pour une fenêtre d'affichage étendue

+ Ouvrir par défaut dans l'affichage moyen - Indique si la table est ouverte par défaut lors du chargement initial pour une fenêtre d'affichage moyenne

+ Ouvrir par défaut dans l'affichage restreint - Indique si la table est ouverte par défaut lors du chargement initial pour une fenêtre d'affichage restreinte

## Barre d'application

![](applicationbar.png)

La Barre d'application vous permet de configuree la barre d'application et les boutons visible.

+ Menu latéral - Affiche le bouton du menu latéral dans la barre d'application principale.

+ Géorecherche - Affiche le bouton de la géorecherche dans la barre d'application principale. Le bouton sera cachée si la géorecherche est désactivée ou si aucun URL n'est fourni.

+ Sélecteur de carte de base - Affiche le bouton du sélecteur de carte de base dans la barre d'application principale.

+ Sélecteur de couches - Affiche le bouton du sélecteur de couches dans la barre d'application principale.

## Navigation

![](sidemenulist.png)

+ Navigation restreinte - Empêche l'utilisateur d'effectuer des déplacements au delà de l'étendue maximale.

+ Barre de navigation

+ Zoom

Composantes de navigation en extra.

Selectionner les options voulu dans la barre de navigation.

+ geoLocator
+ marquee
+ home
+ history
+ basemap
+ help
+ fullscreen
+ geoSearch
+ sideMenu
+ couches

## Menu latéral

+ Titre - (Optionnel)  Un titre pour remplacer celui utilisé par défaut par le visualisateur.

+ Afficher le logo - Indique si le logo doit être affiché dans le menu latéral à gauche.

+ URL du logo  - (Optionnel) Une image pour remplacer le logo utilisé par défaut par le visualisateur.

![](menulist.png)

Items du menu latéral

Selectionner les items voulu dans le menu latéral.

+ layers
+ basemap
+ geoSearch
+ about
+ fullscreen
+ export
+ share
+ touch
+ help
+ language
+ plugins

Fichier d'aide

Propriétés de l'aide

+ Nom du dossier - Nom du dossier contenant les fichiers d'aide et les images connexes.

À propos de la carte - L'à propos de la carte provenant du fichier de configuration ou d'un répertoire contenant un fichier de type Markdown.

+ Source de l'à propos - Indique si le texte est entree ou la source du contenu est dans un fichier.

+ Texte - À propos provenant d'un texte fourni (chaîne de caractères).

# Services

## Liens pour les services

+ URL du proxy - Un proxy optionnel pouvante être utilisé afin de pallier au problème des origines semblables. L'URL doit être soit un chemin relatif pointant vers le même serveur ou bien un chemin absolu pointant vers un serveur qui met en place les entêtes des requêtes d'origines croisées (CORS).

+ URL de la carte à exporter - Un point de service ESRI pour générer des images à partir de cartes. Doit pointer directement vers un point de service qui peut être utilisé par un service d'impression d'ESRI (ESRI PrintTask).

+ URL de la géométrie - URL pointant sur un point de service REST ArcGIS d'ESRI pour la géométrie.

+ URL de l'API Google - Clé de l'API Google afin d'activer la géolocalisation et la simplification du lien de partage.

+ URL de l'API de géolocalisation

+ URL pour les coordonnées

+ URL pour l'impression

## Recherche par lieux

![](geosearchmenu.png)

 URLs des service

 URLs des points de service

+ URL noms géographiques - URL du point de service pour les noms géographiques.

+ URL du point de service pour les noms géographiques  - URL du point de service pour la géolocalisation.

+ URL géolocalisation - URL du point de service pour la géolocalisation.

+ URL géosuggestion - URL du point de service pour la géosuggestion.

+ URL du point de service pour la géosuggestion.

+ URL provinces - URL du point de service pour les provinces.

+ URL types - URL du point de service pour les types.

Désactiver des types de recherche spécifiques (SNRC, code postal/RTA, ou LAT/LNG)

+ SNRC -  Recherche par numéro du systeme nationale de références.

+ Code postal - Recherche par code postale.

+ Latitude / Longitude - Recherche par coordonnée géographique.

![](geosearchexample.png)

## Exporter la Carte

Vous pouvez exporter une image de la carte et de ses couches visibles avec une légende, un titre, la flèche nord avec scalebar, la note en bas de page personnalisée et un horodateur.

Si personnalisable un dialogue apparaîtra avec une image de la carte et d'une option pour entrer dans un titre de carte si désiré.

Le titre de l'image exportée peut être fabriqué sur commande en entrant une valeur.

+ Titre - Valeur du Titre du graphique à exporter.

+ Composantes de la carte

+ Légende

Éléments de la carte

+ La flèche du Nord et l'échelle.

+ Note de bas de page - Valeur du note de bas de page de la carte à exporter.

+ Horodateur

Si personnalisable un dialogue apparaîtra avec une image de la carte et d'une option pour entrer dans un titre de carte si désiré.

![](exportmapwindowv2.png)

Aussi, les utilisateurs peuvent ajouter ou enlever des sections de l'image exportée comme une légende,
en cliquant sur la roue d'options dans l'en-tête.

Les utilisateurs seront en mesure de choisir/désélectionner les sections pour apparaître dans l'image exportée.

# Version

L'étiquette de version vous permet de choisir la version de schéma utilisé pour valider le fichier de configuration.

Par défaut la présente version est 2.0.

# Langue

L'étiquette de langue vous permet de choisir la langue du dossier de configuration, en utilisant un coup énumère en bas .

Choisissez entre en-CA pour l'anglais ou fr-CA pour le français.

La valeur est un ISO 639-1 code indiquant la langue de fichier de configuration.

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
