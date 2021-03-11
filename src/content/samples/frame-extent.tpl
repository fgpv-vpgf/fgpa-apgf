<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta content="width=device-width,initial-scale=1" name="viewport">

    <link rel="stylesheet" href="https://viewer-visualiseur-dev.services.geo.ca/apps/RAMP/fgpv/fgpv-3.2.0/rv-styles.css" />

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
<div id="fgpmap" is="rv-map" class="myMap" data-rv-config="">
    <noscript>
        <p>This interactive map requires JavaScript. To view this content please enable JavaScript in your browser or download a browser that supports it.</p>

        <p>Cette carte interactive nécessite JavaScript. Pour voir ce contenu, s'il vous plaît, activer JavaScript dans votre navigateur ou télécharger un navigateur qui le prend en charge.</p>
    </noscript>
</div>

<script src="https://cdn.polyfill.io/v2/polyfill.min.js?features=default,Object.entries,Object.values,Array.prototype.find,Array.prototype.findIndex,Array.prototype.values,Array.prototype.includes,HTMLCanvasElement.prototype.toBlob,String.prototype.repeat,String.prototype.codePointAt,String.fromCodePoint,NodeList.prototype.@@iterator,Promise,Promise.prototype.finally"></script>

<script type="text/javascript">
    // set config name to data-rv-config
    document.getElementById('fgpmap').setAttribute('data-rv-config', './config/' + localStorage.getItem('configextent') + '.json');
    localStorage.removeItem('configextent');
</script>

<!-- IMPORTANT, keep the viewer to version 3.2.0 Modification of viewer version may impact functionnality -->
<script src="https://viewer-visualiseur-dev.services.geo.ca/apps/RAMP/fgpv/fgpv-3.2.0/legacy-api.js"></script>
<script src="https://viewer-visualiseur-dev.services.geo.ca/apps/RAMP/fgpv/fgpv-3.2.0/rv-main.js"></script>

<script type="text/javascript">
    // link to api from script to get new extent
    RAMP.mapAdded.subscribe(mapi => {
        // subscribe to extent change event to capture the new extent
        mapi.boundsChanged.subscribe(function(extent, a, b, c) {
            // set the new extent inside local storage to be retreive by the author later
            // use real extent in lcc because using lat/long and reproject it gives wrong result
            localStorage.setItem('mapextent', JSON.stringify(RAMP.mapById('fgpmap').mapI.extent));
        });
    });
</script>

</body>
</html>
