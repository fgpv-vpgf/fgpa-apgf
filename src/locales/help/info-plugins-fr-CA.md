##### Comment utiliser les modules sur votre propre page

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


Pour plus d'<a target="_blank" href="https://github.com/fgpv-vpgf/fgpv-vpgf/tree/master/packages">information</a> sur les principaux modules (ramp-plugin-*). _seulement en anglais_
<br />
Pour plus d'<a target="_blank" href="http://fgpv-vpgf.github.io/fgpv-vpgf/v3.2.0/#/developer/plugins">information</a> sur les modules. _seulement en anglais_