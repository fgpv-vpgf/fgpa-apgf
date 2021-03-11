<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta content="width=device-width,initial-scale=1" name="viewport">
    <script>
        var version = localStorage.getItem('viewerversion');

        // set css path for viewer
        var styles = document.createElement('link');
        styles.rel = 'stylesheet';
        styles.type = 'text/css';
        styles.href = 'https://viewer-visualiseur-dev.services.geo.ca/apps/RAMP/fgpv/fgpv-x.x.x/rv-styles.css'.replace('x.x.x', version);
        document.getElementsByTagName('head')[0].appendChild(styles);

        // set plugins js and css
        function addScriptTag(path){
            var script = document.createElement('script');
            script.src = path;
            document.getElementsByTagName('head')[0].appendChild(script);
        }

        function addStyleTag(path) {
            var style = document.createElement('link');
            style.rel = 'stylesheet';
            style.type = 'text/css';
            style.href = path;
            document.getElementsByTagName('head')[0].appendChild(style);
        }

        var plugins = localStorage.getItem('configplugins').replace(/"/g, '').replace('[', '').replace(']', '').split(',');
        if (plugins[0] === '') { plugins = []; }
        for (var i = 0; i < plugins.length; i++) {
            var pluginDash = plugins[i].replace(/([A-Z])/g, function(char) { return '-' + char[0].toLowerCase(); });

            // RAMP core plugins are not at the same as custom plugins
            var path = '';
            if (plugins[i] === 'coordInfo') {
                addScriptTag('https://viewer-visualiseur-dev.services.geo.ca/apps/RAMP/fgpv/fgpv-x.x.x/core-plugins/ramp-plugin-coordinate-info.js'.replace('x.x.x', version));
            } else if (plugins[i] === 'areasOfInterest') {
                addScriptTag('https://viewer-visualiseur-dev.services.geo.ca/apps/RAMP/fgpv/fgpv-x.x.x/core-plugins/ramp-plugin-areas-of-interest.js'.replace('x.x.x', version));
            } else {
                // TODO: remove version number from plugins name (Prod use prod version and dev use by dev version)
                path = 'https://viewer-visualiseur-dev.services.geo.ca/apps/RAMP/contributed-plugins/' + pluginDash + '/' + pluginDash;
                addScriptTag(path + '.js');
                addStyleTag(path + '.css');
            }
        }
    </script>

    <style>
        body {
            display: flex;
            flex-direction: column;
        }

        .myMap {
            height: 100%;
        }
    </style>
</head>

<body>
<div id="fgpmap" is="rv-map" class="myMap" data-rv-config="config" data-rv-langs="" rv-plugins="">
    <noscript>
        <p>This interactive map requires JavaScript. To view this content please enable JavaScript in your browser or download a browser that supports it.</p>

        <p>Cette carte interactive nécessite JavaScript. Pour voir ce contenu, s'il vous plaît, activer JavaScript dans votre navigateur ou télécharger un navigateur qui le prend en charge.</p>
    </noscript>
</div>

<script src="https://cdn.polyfill.io/v2/polyfill.min.js?features=default,Object.entries,Object.values,Array.prototype.find,Array.prototype.findIndex,Array.prototype.values,Array.prototype.includes,HTMLCanvasElement.prototype.toBlob,String.prototype.repeat,String.prototype.codePointAt,String.fromCodePoint,NodeList.prototype.@@iterator,Promise,Promise.prototype.finally"></script>
<script type="text/javascript">
    // set window.config to pass the config object to the data-rv-config
    // the object needs to be attach to the window object
    window.config = JSON.parse(localStorage.getItem('configpreview'));

    // set viewer array of languages
    document.getElementById('fgpmap').setAttribute('data-rv-langs', localStorage.getItem('configlangs'));

    // set viewer array of plugin
    document.getElementById('fgpmap').setAttribute('rv-plugins', localStorage.getItem('configplugins'));

    // set viewer version (rv-main and rv-legacy)
    var scriptTag = document.createElement('script');
    var scriptTagLegacy = document.createElement('script');
    var version = localStorage.getItem('viewerversion');
    scriptTag.src = 'https://viewer-visualiseur-dev.services.geo.ca/apps/RAMP/fgpv/fgpv-x.x.x/rv-main.js'.replace('x.x.x', version);
    scriptTagLegacy.src = 'https://viewer-visualiseur-dev.services.geo.ca/apps/RAMP/fgpv/fgpv-x.x.x/legacy-api.js'.replace('x.x.x', version);
    document.body.appendChild(scriptTagLegacy);
    document.body.appendChild(scriptTag);

    // remove local storage items
    localStorage.removeItem('configlangs');
    localStorage.removeItem('configpreview');
    localStorage.removeItem('configplugins');
    localStorage.removeItem('viewerversion');
</script>

</body>
</html>
