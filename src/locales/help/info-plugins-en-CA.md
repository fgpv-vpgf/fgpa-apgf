##### How to use plugins on your own page

1.  Include the script and css (if needed) on the host page in the head section of the html
    ```
        <head>
            <script src="myPlugin.js" />
            <link rel="stylesheet" type="text/css" href="myPlugin.css" />
        </head>
    ```
2. Include the plugin in the property of the map element named ```rv-plugins```
    ```
        <div is="rv-map" rv-plugins="myPlugin"></div>
    ```


For more <a target="_blank" href="https://github.com/fgpv-vpgf/fgpv-vpgf/tree/master/packages">information</a> about core plugins (ramp-plugin-*).
<br />
For more <a target="_blank" href="http://fgpv-vpgf.github.io/fgpv-vpgf/v3.2.0/#/developer/plugins">information</a> about plugins.
