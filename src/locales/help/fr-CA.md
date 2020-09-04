# Information générale

L'outil APGF (Auteur de la Plateforme géospatiale fédérale) est utilisé pour créer, mettre à jour, valider et prévisualiser
les fichiers de configuration utilisés par la visualiseur de la Plateforme géospatiale fédérale (VPGF).

L'outil APGF est basé sur la bibliothèque
<a href="https://github.com/json-schema-form/angular-schema-form" target="_blank">Angular Schema Form </a> .
Cette bibliothèque permet de générer des formulaires à partir de schémas en format JSON en utilisant AngularJS. L'outil APGF
utilise le même schéma que le VPGF et permet à l'utilisateur de modifier facilement les valeurs afin de créer de nouveaux
fichiers de configuration. Le schéma est composé de 5 sections:
+ ** Carte **
    + La carte est divisée en 5 sections (Étendues et niveaux de détail, Cartes de base, Couches, Légende et Composantes)
+ ** UI **
    + L'interface utilisateur est divisée en 4 sections (Général, Barre d'application, Navigation et Menu latéral)
+ ** Services **
    + Les services sont divisés en 3 sections (Exporter la carte, Recherche par lieux et Liens pour les services)
+ ** Version **
+ ** Langue **

Pour plus d'informations sur la structure du schéma, vous pouvez consulter le
<a href="https://github.com/fgpv-vpgf/fgpa-apgf/wiki/FGPV_schema_doc" target="_blank">**schéma VPGF** </a>
dans notre page wiki. Cette section vous donnera également des informations sur les valeurs du schéma et leur effet dans le visualiseur.

##### Informations utiles

Pour changer la langue de l'interface, utilisez le menu déroulant _Langue_ situé dans le coin supérieur droit ![](languagebuttonFR.png "Menu déroulant Langue").

A tout moment, si disponible, vous pouvez utiliser les boutons Ouvrir ou Fermer ![](expandcollapseFR.png "Développer et réduire les boutons")
pour développer ou réduire tous les éléments d'une section.

Certains éléments de configuration sont utiles seulement pour des utilisateurs plus avancés. Vous pouvez afficher / masquer ces éléments
en utilisant la case à cocher _Affichier les options de configuration avancée_ situé sous chaque nom de section.

Certains éléments comme les cartes de base, les couches et les champs des tables de couche peuvent être réordonnés. Vous pouvez
facilement identifier les éléments réordonnable avec le symbole de poignée ![](draghandle.png "Symbol de poignée"). Pour réordonner
un élément, cliquez sur la poignée, puis faites glisser l'élément vers le position désirée. Une boîte jaune apparaîtra sous
l'élément où il sera placé lorsque vous relâchez la poignée.

_Note:_ il est plus facile de faire glisser un élément lorsque tous les éléments de la section sont réduits.

Pour charger le fichier de configuration ou le modèle directement depuis l'URL, vous pouvez utiliser la syntaxe suivante:
+ _votre instance url_?filename=_votre nom de fichier_ (par exemple https: //xxx/fgpv-author.html?filename=https ://myfolder/myfilename.json)
+ _votre instance url_?template=_votre nom de modèle_ (par exemple https: //xxx/fgpv-author.html? template=mytemplate.json)

_Remarque:_ si l'application ne peut pas lire le fichier de configuration ou si le modèle n'existe pas, elle ouvrira
une configuration par défaut ou le premier modèle dans la liste des modèles.

> Un comportement imprévu peut se produire si des interactions se produisent avant que les données soient entièrement chargées. Veuillez laissez la page Web
> charger complètement avant de l'utiliser. Si vous rencontrez toujours des bogues, veuillez
<a href="https://github.com/fgpv-vpgf/fgpa-apgf/issues" target="_blank">soumettre un problème</a>
> dans dépôt GitHub. Quelqu'un de notre équipe de développement s'en occupera le plus rapidement possible.


# Entête

![](headerFR.png "Vue d'ensemble de l'en-tête")

La barre d'outils d'en-tête vous permet de:
+ Ouvrir la fenêtre d'aide de l'outil APGF à partir du bouton point d'interrogation.
+ Créer un nouveau fichier de configuration à partir de zéro ![](plussign.png "Signe addition") _- uniquement disponible lorsque aucun modèle n'est fourni -_.
+ Créer un nouveau fichier de configuration à partir de modèles ![](templatesFR.png "Menu déroulant modèle") _- uniquement disponible lorsque des modèles sont fournis -_.
    + Les modèles sont gérés par l'organisation en charge de cette instance APGF. Contactez l'organisation si vous avez besoin de plus d'informations
    ou souhaitez une mise à jour de la liste des modèles.
+ Télécharger un fichier de configuration existant ![](uparrow.png "Flèche").
+ Enregistrer le fichier de configuration une fois terminé ![](diskette.png "Signe de disquette").
    + Tous les fichiers sont enregistrés dans votre dossier Téléchargements. L'application incrémente automatiquement le nom de fichier a chaque sauvegarde.

Le nom du fichier sur lequel vous travaillez est affiché à gauche de l'icône de sauvegarde. Cependant, si vous enregistrez
un fichier en utilisant un nom de fichier existant, il sera renommé par votre système d'exploitation et ne correspondra plus
au nom de fichier que vous avez utilisé (par exemple, Test est affiché comme le nom de fichier mais le nom de fichier renommé est Test (1)).

> Lorsque vous créez ou téléchargez un fichier de configuration, le temps de chargement peut varier en fonction du nombre
> de couches et de cartes de base en cours de chargement.


# Carte - Étendues et niveaux de détail

Cette section est utilisée pour définir les schémas de tuiles de votre application de visualisation. Pour chaque schéma de tuile,
un système de référence spatiale doit être définis dans la section _Lots d'étendues spatiales_. Encore une fois, pour chaque
schéma de tuile, les niveaux de détail (LOD) doivent être défini dans la section _Lots de niveaux de détail_. Pour cela,
une couche ESRI de type "tile cache" doit être utilisée pour extraire la liste des LOD. Chaque LD correspond à la carte à
une échelle ou une résolution donnée. Par conséquent, chaque carte de base doit être lié à un schéma de tuile et doit partager la même
étendue spatiale et les mêmes LOD.

> Pour plus d'informations sur la configuration de la section _Étendues et niveaux de détail_, consultez le menu déroulant
> d'aide situé sous l'en-tête de la section.


# Carte - Cartes de base

Cette section est utilisée pour ajouter des cartes de base à votre application de visualisation. Pour ajouter une carte de base,
un schéma de tuile approprié pour cette carte de base doit déjà avoir été créé. Une fois qu'une carte de base est ajoutée,
les informations suivantes doivent être fournies:
+ Nom _- il sera utilisé pour générer l'identifiant de la carte de base -_
+ Description
+ Texte alternatif
+ Identifiant du schéma de tuile (sélectionné un schéma de tuile existant)
+ Au moins une couche avec identifiant, type de couche et URL.

Vous devez définir la carte de base initiale qui apparaîtra au lancement du visualiseur. Pour ce faire, sélectionnez l'identifiant
de carte de base (nom-_clé unique_ à partir de _ID de la carte de base initiale_) dans le menu déroulant.

> Pour plus d'informations sur la configuration de la section _Cartes de base_, consultez le menu déroulant d'aide situé
> sous l'en-tête de la section.


# Carte - Couches

Cette section est utilisée pour ajouter des couches à votre application de visualisation. Une fois qu'une couche est ajoutée,
les informations suivantes doivent être fournies:
+ Type de couche
    + esriDynamic
    + esriFeature
    + esriImage
    + esriTile (un schéma de tuile approprié doit exister)
    + ogcWms
+ Nom _- il sera utilisé pour générer l'identifiant de la couche -_
+ URL

Au moins une entrée de couche doit être ajoutée si le type de couche sélectionné est esriDynamic ou ocgWms. Les propriétés
suivantes doivent être définies:
+ Index pour esriDynamic
+ Identifiant pour ogcWMS

Vous pouvez faire en sorte qu'une couche esriDynamic ressemble à une couche esriFeature avec l'option de légende _Grouper en une seule entrée_.
Cette option affichera une couche dynamique à une seule couche sans son groupe racine.

En option, vous pouvez définir des valeurs d'URL pour les métadonnées et le catalogue pour afficher ces informations à l'intérieur
du panneau de métadonnées accessible par _Contrôle de la couche_ .

Pour chaque couche et entrées de couche, les options _Contrôle de la couche_ suivantes peuvent être sélectionnées:
+ Opacité (_opacity_)
+ Visibilité (_visibility_)
+ Boîte de délimitation (_boundingBox_)
+ Requête (_query_)
+ Instantané (_snapshot_)
+ Métadonnée (_metadata_)
+ Zoom à la délimitation (_boundaryZoom_)
+ Rafraîchir (_refresh_)
+ Recharger (_reload_)
+ Enlever (_remove_)
+ Paramètres (_settings_)
+ Table (_data_)
+ Styles (_styles_)

Pour les entrées de couche et les couches, les options _État_ suivantes peuvent être sélectionnées:
+ Opacité - Valeur d'opacité initiale.
+ Visibilité - Réglage de la visibilité initiale.
+ Rectangle englobant - Définit l'affichage initial du rectangle englobant de la couche.
+ Requête - Activer l'interrogation de la couche et afficher les informations dans le panneau des détails de la visionneuse.
Ne fonctionnera qu'avec les couches de type esriFeature et esriDynamic.
+ Copie instantannée - Récupérer toutes les données d'entité immédiatement au chargement. Ne fonctionnera qu'avec les couches
de type esriFeature.
+ Affichage de survol - Activer l'affichage de survol. Ne fonctionnera qu'avec les couches de type esriFeature.

pour chaque couche esriFeature et chaque entrée de la couche esriDynamic, une table est créée automatiquement lorsque l'URL
ou l'option Index de l'entrée est réglée. La section table est facultative et est remplie à partir des informations du
service. Vous pouvez personnaliser les propriétés de la table suivantes:
+ Titre - Titre personnalisé de la table à appliquer. Le titre par défaut est le nom de la couche.
+ Description - Spécifie les informations supplémentaires à afficher dans le panneau des paramètres de la table.
+ Maximiser - Spécifie si la fenêtre de la table est agrandie à l'ouverture. La taille de la fenêtre par défaut est la vue partagée.
+ Appliquer à la carte - Spécifie si les filtres de la table (à partir des filtres de colonnes) sont appliqués à la carte
(requête de définition).
+ Personnalisation des champs - Spécifie les colonnes de la table à afficher. Les colonnes peuvent être réinitialisées
à l'aide du bouton _Définir les champs_. Les propriétés suivantes peuvent être personnalisées:
    + Titre - Titre personnalisé. Le titre par défaut est défini avec le nom d'alias de la colonne provenant du service.
    + Description - Spécifie les informations supplémentaires à afficher dans le panneau des paramètres de la table.
    + Visible - Indique si le champ est visible par défaut.
    + Largeur - Largeur de la colonne. Si aucune largeur n'est définie, la meilleure largeur sera calculée.
    + Tri - Tri ascendant (asc) ou descendant (dsc).
    + Interrogeable - Indique si la colonne peut être filtrée ou non.
    + Filtres - Pour chaque colonne, les propriétés de filtre suivantes peuvent être personnalisées:
        + Type - Spécifie le type de filtre à utiliser. Si le type n'est pas spécifié, le type de champ de données sera utilisé.
        Un filtre texte peut être une "string" ou un "selector". Les autres filtres doivent être du même type.
        + Valeur - Spécifie la valeur du filtre.
        + Statique - Spécifie si la valeur du filtre peut être modifiée ou non.

**Important** - Modifier le type de couche d'une couche existante n'est pas une bonne pratique. Il est préférable de créer
une nouvelle couche puis supprimez l'ancienne.

> Pour plus d'informations sur la configuration de la section _Couches_, consultez le menu déroulant de'aide situé sous
> l'en-tête de la section.


# Carte - Légende

Cette section est utilisée pour définir la légende de votre application de visualisation. Il y a 2 types de légendes disponibles:
"Autopopulate" et "Structured". La légende "Autopopulate" lit les couches telles qu'elles apparaissent dans la section Couches
afin de créer une légende par défaut. La légende "Structured" vous permet de personnaliser l'ordre d'affichage des couches,
le regroupement des couches, les descriptions et de nombreux autres paramètres.

> Pour plus d'informations sur les options de personnalisation des légendes, consultez le menu d'aide déroulant situé sous
> l'en-tête de la section.


# Carte - Composantes

Cette section est utilisée pour définir les composantes de la carte:
+ Coordonnées de la souris
    + WKID doit être configuré pour afficher les coordonnées de la souris sur la carte
    + Les coordonnées peuvent être en degrés minutes secondes (DMS) et en degrés décimaux ou mètres selon la projection (WKID)
+ Flèche du Nord
+ Échelle
+ Carte d'aperçu
    + Pour modifier la carte de base de la carte d'aperçu, utilisez _Carte d'aperçu statique_ dans le schéma de tuile approprié
    de la section _Étendues et niveaux de détaill_


# Interface utilisateur

##### Général

La section Général permet de personnaliser les informations suivantes:
+ Plein écran - Utilisé pour définir la taille initiale de l'application de visualisation.
+ Lors de la défaillance du visualiseur
    + Message d'échec - Message personnalisé à utiliser à la place du message d'échec par défaut.
    + ULR image d'échec - Image personnalisée à utiliser à la place de l'image d'échec par défaut.
+ Légende
    + _Est réordonnable_ Permet d'autoriser la réorganisation interactive des couches dans la légende de l'application.
    Les légendes structurées ignorent cette option.
    + _Permettre l'importation de couches_ Permet d'importer de manière interactive des couches supplémentaires dans l'application de visualisation.
    + Options d'ouverture de la légende - Permet d'afficher la vue initiale de la légende dans un affichage de petite, moyenne et / ou grande taille.
    + Options d'ouverture de table - Permet d'afficher la vue initiale de la table dans un affichage de petite, moyenne et / ou grande taille.
        + Pour que la table s'ouvre par défaut, un identifiant de couche doit être sélectionné.

##### Barre d'application

![](applicationbarFR.png "Barre d'application")

La section Barre d'application vous permet d'ajouter ou de supprimer les outils suivants:
+ Menu latéral
+ Géorecherche
+ Sélecteur de cartes de base
+ Sélecteur de couches (légende)

##### Navigation

La section navigation vous permet d'ajouter ou de supprimer les composantes de navigation suivantes:
+ Votre emplacement (_geolocator_) - Afficher la position de l'utilisateur sur la carte
+ Étendue initiale (_home_) - Zoom sur l'étendue initiale
+ Sélecteur de cartes de base (_basemaps_) - Ouvrir le sélecteur de fond de carte _- également disponible dans la barre d'application -_
+ Aide (_help_) - Ouvrir la fenêtre d'aide _- également disponible dans le menu latéral -_
+ Plein écran (_fullscreen_) - Ouvrir la visionneuse en plein écran _- également disponible dans le menu latéral -_
+ Géorecherche (_geoSearch_) - Ouvrir l'outil géorecherche _- également disponible dans la barre d'application -_
+ Menu latéral (_sidemenu_) - Ouvrir le menu latéral _- également disponible dans la barre d'application -_
+ Sélecteur de couches (_layers_) - Ouvrir le sélecteur de couches (légende) _- également disponible dans la barre d'application -_

Vous pouvez limiter la navigation à l'étendue maximale en cochant la case _Navigation restreinte_.

##### Menu latéral

Le menu latéral vous permet de configurer l'affichage du menu latéral. Vous pouvez d'abord définir un titre et un logo.
Si aucun titre ou logo ne sont fournis, le titre par défaut ("Visualiseur PGF R2") et le logo seront utilisés. Ensuite, vous
pouvez ajouter autant de groupes d'outils que vous le souhaitez parmi les options suivantes:
+ Sélecteur de couches (_layers_) - Sélecteur de couches (légende) _- également disponible dans la barre d'application -_
+ Sélecteur de cartes de base (_basemaps_) - Sélecteur de cartes de base _- également disponible dans la barre d'application -_
+ Géorecherche (_geoSearch_) - Outil de géorecherche _- également disponible dans la barre d'application -_
+ Description de la carte (_about_) - Afficher des informations supplémentaires sur la carte
    + "A propos de la carte" peut être de type texte ou contenu d'un fichier. Lorsque le type fichier est sélectionné, vous devez fournir
    un nom de dossier pour votre "A propos de la carte" personnalisé contenant les fichiers au format markdown situés à l'intérieur de l'instance VPGF.
    + **Important** "A propos de la carte" dde type fichier n'apparaîtra pas en mode aperçu.
+ Plein écran (_fullscreen_) - Ouvrir la visionneuse en plein écran _- également disponible dans la barre de navigation -_
+ Exporter la carte (_export_) - Exporter l'affichage de la carte en tant qu'image de format png
+ Partager la carte (_share_) - Créer un lien URL pour partager la carte
+ Mode tactile (_touch_) - Activer le mode pour écran tactile (pour améliorer l'espacement, la disposition et la taille du bouton)
+ Aide (_help_) - Ouvrir la fenêtre d'aide _- également disponible dans la barre de navigation -_
    + Si vous ne souhaitez pas utiliser l'aide par défaut, vous devez fournir un nom de dossier pour vos fichiers personnalisé d'aide en format markdown
    situé à l'intérieur de l'instance VPGF.
    + **Important** L'aide personnalisée n'apparaîtra pas en mode de mode aperçu.
+ Sélecteur de langues (_language_) - Définir la langue de l'interface
+ Section Liens (_plugins_) - Espace pour recevoir des liens personnalisés
    + **Important** La section Liens n'apparaîtra pas en mode de aperçu. Du code doit être ajouté à l'application de visualisation
    dans la page HTML pour activer le(s) lien(s).

_Note:_ les outils à l'intérieur des groupes ne sont pas classés tels qu'ils apparaissent dans la liste des groupes.
Ils sont classés par ordre de sélection. Par exemple, si vous cliquez sur _basemap_ puis _layers_, dans le menu latéral
_basemap_ apparaîtra d'abord parce que c'était le premier élément sélectionné dans le groupe.


# Services

##### Exporter la carte

La section exporter la carte vous permet de configurer les composantes qui seront affichés par défaut et / ou être personnalisables
sur la carte lorsqu'elle est exporté en tant qu'image png. La case à cocher _Est présent_ sous chaque composante vous permet
d'ajouter cette composante par défaut lorsque la carte est exportée. La case à cocher _L'utilisateur peut l'enlever_ vous permet
de choisir si vous voulez que l'utilisateur puisse supprimer la composante lorsque la carte est exportée.

Les composantes suivants peuvent être affichés ou personnalisés:
+ Titre _- une valeur par défaut peut être définie -_
+ Carte
+ Légende
+ Éléments de la carte (flèche du Nord et barre d'échelle)
+ Note de bas de page _- une valeur par défaut peut être définie -_.
+ Horodateur

##### Recherche par lieux

La section Recherche par lieux vous permet de configurer les capacités de l'outil de géorecherche. Il vous permet de trouver
des emplacements canadiens par différentes catégories comme les villes, les provinces, les entités topographiques et ainsi de suite
en utilisant l'API Geonames. En plus de cela, l'outil de géorecherche vous permet de trouver des emplacements selon le nom
du Système national de référence cartographique (SNRC), le code de zone de tri d'acheminement (RTA) et les valeurs de latitude / longitude.
Les 3 dernières options de recherche peuvent être activées en cochant la case correspondante.

Toutes les URL requises par l'outil de géorecherche sont des valeurs en lecture seule. Si vous rencontrez un problème avec ces services, contactez la personne
chargé de l'application APGF que vous utilisez et / ou
<a href="https://github.com/fgpv-vpgf/fgpa-apgf/issues" target="_blank">soumettre un problème</a>
à l'équipe des développeurs l'outil APGF.

##### Liens pour les services

La section Liens pour les services répertorie toutes les URL des services requises par l'application de visualisation.
Ces URL sont des valeurs en lecture seule et par conséquent ne peuvent pas être modifiées. Si vous rencontrez un problème avec ces services, contactez le responsable de l'application VPGF que vous utilisez.


# Version

La section version vous permet de sélectionner le numéro de version du visualiseur PGF que vous souhaitez utiliser.


#  La langue

La section langue vous permet de sélectionner la langue appropriée pour le fichier de configuration.


# Panneau de sommaire

![](summarypanelFR.png "Panneau de résumé")

Le panneau de sommaire vous permet de vérifier que votre fichier de configuration respecte le schéma VPGF. Vous pouvez
valider votre fichier de configuration en cliquant sur le bouton Valider ![](validate.png "Valider le bouton").

Après l'exécution d'une validation, des coches vertes ![](greencheckbox.png "Symbol crochet vert") apparaîtront à côté des
champs qui réussissent la validation et des points d'exclamation rouge ![](redcircle.png "Symbol point d'exclamation rouge") apparaîtront à côté des
des champs qui ne réussissent pas la validation. Pour être redirigé vers un champ spécifique dans l'application APGF,
cliquez sur le champ souhaité dans l'arbre de validation et vous serez automatiquement redirigé vers l'onglet ou le champ de saisie approprié.
+ Les éléments de couleur bleue indiquent les éléments contenus dans des groupes tels que les schéma de tuile, les lots d'étendues spatiales,
les lots de niveaux de détail, les groupes des cartes de base et des couches.
+ Les éléments en format _Italique_ sont des éléments de _configuration avancée_. Ces éléments sont masqués dans l'arborescence de validation sommaire
si la case _Afficher les options de configuration avancée_ n'est pas cochée.

Une fois que tous les champs du fichier de configuration sont validés, le bouton Aperçu ![](preview.png "Bouton Aperçu") sera activé.
Vous pourrez ensuite cliquer sur ce bouton pour prévisualiser votre fichier de configuration dans une instance de l'application VPGF. Cette
instance de prévisualisation affiche toutes les couches, cartes de base, menus et options comme ils apparaîtraient dans l'application VPGF.
Notez que toute aide personnalisée et "À propos de la carte" de type fichier ne peuvent pas être affichées dans l'instance de prévisualisation.

L'instance de prévisualisation peut nécessiter quelques secondes pour s'initialiser selon:
+ Emplacement du réseau
+ Disponibilité de la bande passante
+ Nombre de couches dans la carte + Types de couches et leurs tailles

![](previewsampleFR.png "Aperçu de la visionneuse")

Le panneau sommaire peut afficher d'autres boutons (fonctions) à côté du bouton Aperçu. Ces fonctions optionnelles sont des extensions
à l'application APGF et pourraient ne pas être disponibles pour tous les utilisateurs.

Vous trouverez les informations suivantes sur la version de l'application APGF au bas du panneau sommaire:
+ Version / numéro de gabarit
+ Date de la version / gabarit
+ Lien du référentiel APGF sur GitHub pour signaler les problèmes

![](summaryinfo.png "Informations sur la version APGF")


# Accessibilité

Cette page respecte les règles pour l’accessibilité des contenus Web WCAG 2.0 AA.

Accessibilité au clavier - La fonctionnalité du clavier est offerte en tant qu’alternative pour les utilisateurs qui sont dans l'impossibilité d’utiliser une souris. Utilisez la touche de tabulation pour naviguer vers les liens et les contrôles sur la page. Appuyez simultanément sur les touches « Majuscule+Tabulation » pour revenir un pas en arrière. Utilisez la touche « Entrée » ou la barre d’espacement pour activer les liens et les contrôles. Appuyez  simultanément sur les touches Alt+s/Alt+x pour ouvrir ou fermer le lot de couches.

Vous pouvez réorganiser le tableau des cartes de fond et des couches à partir du clavier. Pour ce faire, lorsque le focus est sur l'un de ces éléments, appuyez sur la touche flèche vers le bas pour le déplacer vers le bas ou appuyez sur la touche flèche vers le haut pour le déplacer vers le haut.

Vous pouvez focuser directement au panneau de sommaire en pressant Alt+q. En pressant Alt+a, le focus retournera
à l'élément original.


# Module Barre de dessin

![](drawtoolbar.png "Barre de dessin")

Le module Barre de dessin permettre les utilisateurs de dessiner des points, lignes, surfaces et les telechanger et téléverser des fichiers de dessin sur votre ordianteur dans le repertoire télédechargement avec le nom viewer.fgpv dans le foramt ArcGis serveur representation JSON.

Activer

Cliquez sur le cas à cocher activer, pour voir la barre de dessin dans le menu latéral de visualisateur. Une fois selectionner il faut chosisir la barre de dessin dans le menu latéral  pour le rendre visible et fonctionnel.  

![](activer_barre_de_dessin_fr.png "Main Menu")

Cliquez sur le cas à cocher ouvert par défaut, pour voir la barre de dessin dans la barre d'application de visualisateur.

Outils à ajouter à la barre d'outils de dessin

Les outils que vous pouvez ajouter à la barre de dessin sont les suivants.

Sélecteur de couleurs

Cliquez sur le cas à cocher Sélecteur de couleurs pour activer le sélecteur de couleurs dans la barre de dessin. Le sélecteur de couleurs vour permettre de selectionner des couleurs pour les point, lignes et polygones. Un fois selectionner le couleur choisi sera utilier pour des points, lignes ou polygones dessiner. Par defaut le couleur initiale est rouge.

Dessiner des points

Cliquez sur le cas à cocher dessiner des points pour ajouter un bouton pourr dessiner des points dans la barre de dessin. Les points seront afficher dans le couleur choisi. Cliquez sur le bouton point dans le visualisateur pour activer des points et après,cliquez sur la carte pour crée des points.

Dessiner des lignes

Cliquez sur le cas à cocher Dessiner des lignes pour ajouter un bouton pour dessiner des lignes dans la barre de dessin. Les lignes seront afficher dans le couleur choisi. Cliquez sur le bouton ligne dans le visualisateur pour activer des lignes et après,cliquez sur la carte pour crée le point de depart et apres cliquez sur les points et double clique pour terminer la ligne.

Dessiner des polygones
 
Cochez sur Dessiner des polygones pour ajouter un bouton pour dessiner des polygones dans la barre de dessin. Cliquez sur le bouton polygone dans le visualisateur pour activer des polygones et après,cliquez sur la carte pour crée le point de depart et apres cliquez sur les points et double clique pour terminer la polygone.

Éditer les dessins

Cliquez sur le cas à cocher editer les Dessins pour ajouter un bouton pour dessiner des polygones dans la barre de dessin et editer les coordonnees des  points , lignes  ou polygones sur la carte.  Cliquez sur le bouton editer les dessins dans le visualisateur pour editer les points, lignes et polygones. Cliquez sur le dessin pour editer le dessin.

Afficher / Cacher les mesures

Cliquez sur le cas à cocher Afficher / Cacher les mesures pour ajouter un bouton pour afficher u cacher les measures  dans la barre de dessin.

Supprimer des dessins par étendue

Cliquez sur le cas à cocher Supprimer des dessins par étendue pour ajouter un bouton pour afficher ou cacher les measures dans la barre de dessin.

Sauvegarder dessins

Cliquez sur le cas à cocher Sauvegarde dessins pour ajouter un bouton pour avoir capable de sauvegarder un fichier de dessins dans la barre de dessin. Le fichier de dessins sera sauver dans le répertoire de téléchargement avec le nom viewer.fgpv.

Charger dessins

Cliquez sur le cas à cocher Charger dessins pour ajouter un bouton pour avoir capable de charger un fichier de dessins dans la barre de dessin.


# Module Glisseur

![](swiper_en.png "Module Glisseur")

Cette section est utilisée pour définir le module glisseur. Il y a un seule type disponibles vertical.
Vous pouvez deplacer le glisseur avec le curseur pour visualiser les differences entre des couches. Une fois selectionner la barre de dessin ne peut pas etre deselectioner et n'apparaitera pas dans le menu latéral pour le rendre visible et fonctionnel.  

Activer

Cliquez sur le cas à cocher activer, pour activer le glisseur.

Type

Le type de glisseur par defaut est Vertical.

Déplacement clavier

Entrez la valeur en pixel du déplacement du glisseur. La valeur de defaut est 10 et le maximum est 100.

Couches

ID 

Choissisez l'identifiant de la couche dans la liste pour le référencement dans le visualiseur (ne concerne pas directement un service externe).


# Module Curseur de place thématique

![](thematic_slider_en.png "Curseur de place thématique")

La curseur de plage thématique affiche des couches en animation en sequence et affiche un titre et description dans un panneau.

Activer

Cliquez sur le cas à cocher activer pour rendre le curseur de plage thématique actif. Le module sera afficher dans le menu latéral .

Ouvert par défaut

Cliquez sur cette cas à cocher pour ouvrir l'animation sur execution du visualisateur. Le module sera aussi afficher dans le menu latéral. Vous devez cliquer sur le bouton jouer pour commencer l'animation.

Démarrer l'animation au chargement

Cliquez sur cette cas à cocher pour executer l'animation sur le chargement du visualisateur. Le module sera aussi afficher dans le menu latéral. Vous pouvez arreter or recommencer l'animation en cliquant sur les boutons au dessous le panneau qui contient le titre et description.

Jouer l'animation en boucle

Cliquez sur cette cas à cocher pour executer l'animation en boucle sur le chargement du visualisateur. Une fois activer l'animation va executer en boucle jusqu'au temps t'arrete l'animation avec le bouton Pause.

Activer la description

Cliquez sur cette cas à cocher  pour afficher la description dans un panneau.

Activer la barre de défilement

Cliquez sur cette cas à cocher pour activer la barre de défilement dessous le panneau qui decrit la couche afficher.

Empiler la visibilité des couches

Cliquez sur cette cas à cocher pour afficher toutes le couches en sequence. Si non, seulement le couche actif est afficher.

Couches

ID 

Choissisez l'identifiant de la couche dans la liste pour le référencement dans le visualiseur (ne concerne pas directement un service externe).

Durée de l'animation en millisecondes 

Entrez un temps en millisecondes pour l'affichage de la couche. La valauer de défaut est 3000.

Titre de l'animation de cette couche 

Entrez le titre de l'aniimation qui sera afficher dans le panneau.

Description de l'animation de cette couche 

Entrez le description de l'aniimation qui sera afficher dans le panneau.


# Module Curseur de plage 

Le mmodule Curseur de plage vous permettre d'afficher une animation en utilisant une chanp de type chiffre ou date. Une panneau est afficher en bas de fenetre avec des controles. Ca fonctionne avec des couches ESRI feature, ESRI dynamic, ESRI WMS and WMS-T.

![](thematic_slider_en.png "Curseur de plage ")

Activer

Cocher le cas à cocher activer pour rendre le curseur de plage actif. Le module sera afficher dans le menu latéral.

Ouvert par défaut

Cliquez cette cas à cocher pour ouvrir l'animation sur execution du visualisateur. Vous devez cliquer sur le bouton jouer pour commencer l'animation.

Contrôles de la barre de défilement

Cliquez sur cette cas à cocher pour afficher les Contrôles de la barre de défilement de l'animation. 

Barrer / débarrer la plage minimale

Cliquez sur cette cas à cocher pour barrer ou débarrer la plage minimale dans les contrôles de la barre de défilement de l'animation. 

Boucler l'animation

Cliquez sur cette cas à cocher pour executer l'animation em boucle.

Délais entre les animations

Choissisez de la liste des valeurs le délais entre les animations en secondes. La valeur de défaut est 3 secondes.

Exporter l'animation en format Gif

Cocher le cas à cocher exporter l'animation en format Gif pour sauver l'animation visualiser. 

Rafraîchir

Cocher le cas à cocher Rafraîchir pour sauver l'animation visualiser. 

## Paramètres

Type de curseur    

Choisissez nombre ou date de la liste des valeurs.
Si la valeur 'Date' est sélectionné, la valeur de la plage et de la limite est en millisecondes.

Délais entre les animations.

Par défault le délais est 3 secondes. Vous pouz selctionner autres valeurs de la liste.

Valeurs par défault de la plage

Les valeurs de la plage sont utiliser pour determiner l'intervale utiliser dans l'animation. Le plus petite l;intervale le  plus longue l'animation va executer.

Plage min 

La valeur minimale pour la plage. Si non défini, la limite minimale sera utilisée. Doit être définie pour les couches WMS.

Plage max 

La valeur maximale pour la plage. Si non défini, la limite maximale sera utilisée. Doit être définie pour les couches WMS.

Valeurs par défault de la limite

Limite min 
La valeur minimale pour la limite. Doit être définie pour les couches WMS.

Limite max 
La valeur maximale pour la limite. Doit être définie pour les couches WMS.

Couches

ID 

L'identifiant de la couche pour le référencement dans le visualiseur (ne concerne pas directement un service externe).

Nom du champ 

Entrez le nom du champ qui contient le nombre ou date a utiliser pour l'animation.


# Module Graphiques 
 
Le module Graphiques affiche des graphique quand vous choissisez un point sur la carte. Ca peut etre utiliser avec les couches ESRI dynamic et Feature. Ca peut aussi etre utiliser avec un fichier de type CVS ou GeoJson télécharger par un serveur..

![](charts_en.png "Graphiques ")

Activer

Cocher le cas à cocher activer pour rendre le curseur de plage actif. Le module sera afficher dans le menu latéral .

Type de graphique

Choissiez le type de graphique entre tarte, barre et ligne dans la liste.

Titre

Engtrez le titre pour le graphique.

## Options

Couleurs des jeux de données 

Entrez le code de couleur hexadécimal séparé par un point-virgule. Si non fourni, les couleurs par défaut seront utilisées.

Pourcentage de découpe 

Enterz un numero entre 10 et 80 pour le percentage de découpage.

## Étiquettes 

Type 

Choissiez le type d'étiquettes pour récupérer les étiquettes d'un champ ou de la configuration.

Valeurs 

Entrez des valeurs séparées par un point-virgule ou un nom de champ.

Caractère de division 

Entrez un caractère à utiliser pour scinder une liste de valeurs. Par defaut la  valeur est ; .

Couches

Identifiant de la Couche 

GeoApi ne prend pas en charge les identifiants des couches. Le module, pour le moment, ne fonctionnera que s'il y a une seule couche sur la carte.

Données

Type de données à l'intérieur du champ

Unique s'il n'y a qu'une seule valeur dans le champ. Combinez si vous utilisez l’axe temps et que le temps et la valeur font partie du champ.

Champ de mesure

Entrez le nom du champ a utiliser our cree le graphique.

Enter the field name to use for the measure to create the chart. It must be the field name, not the alias.

Separateur de donnees

Entrez la valeur regex pour fractionner les jeux de données à l'intérieur du champ 

Ce champ sert à gérer lorsque vous avez plusieurs jeux de données ou que vous combinez des valeurs dans un même champ. Pour pouvoir séparer les jeux de données des valeurs, nous devons utiliser une expression régulière. Nous vous encourageons à utiliser vos données et à tester votre expression sur un site en ligne tel que https://regex101.com. 

Vous trouverez ci-dessous une liste d’échantillons de jeux de données et de regex:

Exemple 1

Données: [255; 255; 255];[120; 232; 23];[32; 44; 134]

Regex: \\[|\\];\\[|\\]


Sortie: 3 jeux de données (par exemple 255;255;255). Les valeurs à l'intérieur du jeu de données seront divisées par le champ 'Séparateur de valeurs'.

Exemple 2

Données: (2011-03-28, 0.511),(2011-04-04,0.421)

Regex: \\(|\\),\\(|\\)

Sortie: 1 jeu de données, 2 paires de valeurs (par exemple 2011-03-28,0.511). Les valeurs sont combinées (axes y et x) et seront divisées par le champ 'Séparateur de valeurs'.

Remarque: nous devons doubler le caractère '\' .

Séparateur de valeurs 

Entrez un valeur pour le separateur de valeurs. Par defaut la valeur est ; .

Caractère à utiliser pour scinder des valeurs dans un champ. Par exemple, un champ contient '10;20;30' signifie qu'il y a 3 valeurs divisées par ';' ou [1,2,3];[4,5,6] signifie qu'il y a 2 jeux de données avec 3 valeurs, chacunes divisée par ','.

Étiquettes des jeux de données

Type 

Choissiez le type d'etiquette  de la liste. Les valeurs permissible sont configuration et champs.

Valeurs 

Entrez les Valeurs séparées par un point-virgule ou le nom d'un champ.

Caractère de division 

Entrez le caractere de division qui sera le caractère à utiliser pour scinder une liste de valeurs.

Caractère à utiliser pour scinder une liste de valeurs.

Préfixe 

Entrez le préfixe à ajouter au survol de données.

Suffixe 

Entrez le suffixe à ajouter au survol de données.

# Module Informations coordonnées 

![](coordinate_info_en.png "Informations coordonnées ")

Le module Informations coordonnées affiche les coordonnées du point sélectionner sur la carte. Les informations affiche sont lat/long, coordonnées UTM, élévation et déclianton magnétique.

Par defaut, le module informations coordonnées n'est pas activer. Le cursuer sera changer en une croix un fois activer. Vous devez choisir le module en le sélectionner dans le menu latéral. Pour le desctiver vous devez le desélectionner dans le menu latéral.

Activer

Cocher le cas à cocher activer pour rendre le module informations coordonnées actif. Le module sera afficher dans le menu latéral  du visualisateur.

Cochez le module dans le menu latéral du visualisateur pour l'activer. Le curseur sera changer en un croix un fois actif. Les coordonnées seront afficher dans un panneau. Pour desactiver le moodule deselectionner le module dans le menu latéral.


# Module Régions d intérêt

![](area_of_interest_en.png "Régions d'intérêt")

Cette module affiche les régions d'intérêt sur le visualisateur. Cliquer sur le region d'intérêt dans le panneau pour faire un zoom à la délimitation de la région d'intérêt .
 
Les régions d'intérêt sont affiche dans une panneau sur dessous le liste de couches et peut etre choici en cliquant sur une région. Pour fermer le panneau des régions d'intérêt cliquer sur le x à le coin droite superieur. Pour reactiver le panneau des régions d'intérêt cliquer sur le module dans le menu latéral.

Activer

Cocher le cas à cocher activer pour rendre le moduleRégions d'intérêt actif. Le module sera afficher dans le menu latéral du visualisateur.

Titre anglais 

Entrez le titre en anglais du régions d'intérêt qui sera afficher dans le panneau.

Titre français 

Entrez le titre en francais du régions d'intérêt qui sera afficher dans le panneau.

Definir la région

Entrez le titre en francais du régions d'intérêt qui sera afficher dans le panneau.

Cliquez sur le bouton définir la région pour ouvrir le fenetre d'apercu qui va vous pemettre de définir un région ei qui va entrées les coordonnées automatiquement un fois le fenetre est défini.

Les valeurs minimale et maximum ci dessous sont entrez automatiquement en utilisant le buton définir la région et ne sont pas editable.

Valeur minimum x 

La valeur de defaut est -4844430.
Valeur entrez automatiquement en utilisant le buton définir la région.

Valeur minimum y 

La valeur de defaut est -1052774.
Valeur entrez automatiquement en utilisant le buton définir la région.

Valeur maximal x 

La valeur de defaut est 5666163.
Valeur entrez automatiquement en utilisant le buton définir la région.

Valeur maximal y 

La valeur de defaut est 4170111.
Valeur entrez automatiquement en utilisant le buton définir la région.

URL de la vignette

Entrez l'adresse internet de la vignette qui sera afficher dans le panneau qui indique les régions d'intérêt. La vignette peut etre un fichier de type gif ou jpeg. xxxx

