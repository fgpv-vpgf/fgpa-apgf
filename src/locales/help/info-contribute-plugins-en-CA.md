##### See it in action

For demonstration page with information about configuration, go to the <a target="_blank" href="https://github.com/fgpv-vpgf/contributed-plugins">GitHub repository</a> and select the appropriate plugin.

You want more, consult our <a target="_blank" href="https://fgpguide.github.io/Guidelines/">complete guideline</a>.
<br /><br />

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

For more <a target="_blank" href="http://fgpv-vpgf.github.io/fgpv-vpgf/v3.2.0/#/developer/plugins">information</a> about plugins.
