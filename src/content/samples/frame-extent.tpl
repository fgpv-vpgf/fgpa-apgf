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

<script>
    var needIePolyfills = [
        'Promise' in window,
        'TextDecoder' in window,
        'findIndex' in Array.prototype,
        'find' in Array.prototype,
        'from' in Array,
        'startsWith' in String.prototype,
        'endsWith' in String.prototype,
        'outerHTML' in SVGElement.prototype
    ].some(function(x) { return !x; });
    if (needIePolyfills) {
        // NOTE: this is the only correct way of injecting scripts into a page and have it execute before loading/executing any other scripts after this point (ie polyfills must be executed before the bootstrap)
        // more info on script loading: https://www.html5rocks.com/en/tutorials/speed/script-loading/
        document.write('<script src="../ie-polyfills.js"><\/script>');
    }
</script>

<script type="text/javascript">
    // set config name to data-rv-config
    document.getElementById('fgpmap').setAttribute('data-rv-config', './config/' + localStorage.getItem('configextent') + '.json');

    localStorage.removeItem('configextent');
</script>

<script src="https://geoappext.nrcan.gc.ca/fgpv/fgpv-2.3.0/rv-main.js"></script>

</body>
</html>
