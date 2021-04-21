##### Voyez les en action

Pour voir la page de démonstration avec des informations sur la configuration, allez au <a target="_blank" href="https://github.com/fgpv-vpgf/contributed-plugins">répertoire GitHub</a> et sélectionnez le module approprié. _seulement en anglais_

Vous en voulez plus, consultez notre <a target="_blank" href="https://fgpguide.github.io/Guidelines/">guide complet</a>. _seulement en anglais_
<br /><br />

##### Comment utiliser les modules sur votre page

1. Incluez le script et le css (si nécessaire) sur la page hôte dans la section **head** du fichier HTML.
    ```
        <head>
            <script src = "myPlugin.js" />
            <link rel = "stylesheet" type = "text / css" href = "myPlugin.css" />
        </ head>
    ```
2. Incluez le module dans la propriété de l'élément de la carte nommé ```rv-plugins```
    ```
        <div is = "rv-map" rv-plugins = "myPlugin"> </ div>
    ```

Pour plus d'<a target="_blank" href="http://fgpv-vpgf.github.io/fgpv-vpgf/v3.2.0/#/developer/plugins">information</a> sur les modules. _seulement en anglais_