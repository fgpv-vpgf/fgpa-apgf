<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta content="width=device-width,initial-scale=1" name="viewport">

    <link rel="stylesheet" href="https://geoappext.nrcan.gc.ca/fgpv/fgpv-latest-2.x/rv-styles.css" />

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
<div id="fgpmap" is="rv-map" class="myMap" data-rv-config="./config/..." rv-extensions="extensions/extent.js">
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

<!-- IMPORTANT, keep the viewer to version 2.5. Modification of viewer version may impact functionnality -->
<script src="https://geoappext.nrcan.gc.ca/fgpv/fgpv-2.5.0/rv-main.js"></script>

</body>
</html>
