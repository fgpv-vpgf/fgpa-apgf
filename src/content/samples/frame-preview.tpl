<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta content="width=device-width,initial-scale=1" name="viewport">

    <script>
        var version = localStorage.getItem('viewerversion');
        var envar = localStorage.getItem('viewerenv');
        envar = (envar === 'dev') ? 'dev.' : '';

        // set css path
        var styles = document.createElement('link');
        styles.rel = 'stylesheet';
        styles.type = 'text/css';
        styles.href = 'https://s-bsc-geoappint.nrn.nrcan.gc.ca/fgpv/fgpv-x.x.x/rv-styles.css'.replace('x.x.x', version).replace('{env}', envar); // TODO: re enable when access 'https://{env}gcgeo.gc.ca/fgpv/fgpv-x.x.x/rv-styles.css'.replace('x.x.x', version).replace('{env}', envar);
        document.getElementsByTagName('head')[0].appendChild(styles);

        // set plugins js and css
        var plugins = localStorage.getItem('configplugins').replace(/"/g, '').replace('[', '').replace(']', '').split(',');
        for (var i = 0; i < plugins.length; i++) {
            var path = 'https://s-bsc-geoappint.nrn.nrcan.gc.ca/fgpv/fgpv-x.x.x/plugins/'.replace('x.x.x', version) + plugins[i] + '/' + plugins[i]; //TODO: re enable when access
            var script = document.createElement('script')
            script.src = path + '.js';
            document.getElementsByTagName('head')[0].appendChild(script);
            var style = document.createElement('link');
            style.rel = 'stylesheet';
            style.type = 'text/css';
            style.href = path + '.css';
            document.getElementsByTagName('head')[0].appendChild(style);
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
<div id="fgpmap" is="rv-map" class="myMap" data-rv-config="config" data-rv-langs='' rv-plugins=''>
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

    // set viewer version
    var scriptTag = document.createElement('script');
    var version = localStorage.getItem('viewerversion');
    var envar = localStorage.getItem('viewerenv');
    envar = (envar === 'dev') ? 'dev.' : '';
    scriptTag.src = 'https://s-bsc-geoappint.nrn.nrcan.gc.ca/fgpv/fgpv-x.x.x/rv-main.js'.replace('x.x.x', version).replace('{env}', envar); // TODO: re enable when access 'https://{env}gcgeo.gc.ca/fgpv/fgpv-x.x.x/rv-main.js'.replace('x.x.x', version).replace('{env}', envar);
    document.body.appendChild(scriptTag);
    localStorage.removeItem('configlangs');
    localStorage.removeItem('configpreview');
    localStorage.removeItem('configplugins');
    localStorage.removeItem('viewerversion');
    localStorage.removeItem('viewerenv');
</script>

</body>
</html>
