<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta content="width=device-width,initial-scale=1" name="viewport">

    <link rel="stylesheet" href="http://fgpv.cloudapp.net/demo/develop/prod/rv-styles.css" />

    <style>
        body {
            display: flex;
            flex-direction: column;
        }

        .myMap {
            height: 100%;
        }
    </style>

    <script type="text/javascript" charset="utf-8" src="http://js.arcgis.com/3.20/dojox/gfx/svg.js"></script>
    <script type="text/javascript" charset="utf-8" src="http://js.arcgis.com/3.20/esri/dijit/Basemap.js"></script>
    <script type="text/javascript" charset="utf-8" src="http://js.arcgis.com/3.20/esri/dijit/BasemapGallery.js"></script>
    <script type="text/javascript" charset="utf-8" src="http://js.arcgis.com/3.20/esri/dijit/BasemapLayer.js"></script>
    <script type="text/javascript" charset="utf-8" src="http://js.arcgis.com/3.20/esri/dijit/OverviewMap.js"></script>
    <script type="text/javascript" charset="utf-8" src="http://js.arcgis.com/3.20/esri/dijit/Scalebar.js"></script>
    <script type="text/javascript" charset="utf-8" src="http://js.arcgis.com/3.20/esri/layers/ArcGISImageServiceLayer.js"></script>
    <script type="text/javascript" charset="utf-8" src="http://js.arcgis.com/3.20/esri/layers/WMSLayer.js"></script>
    <script type="text/javascript" charset="utf-8" src="http://js.arcgis.com/3.20/esri/tasks/IdentifyParameters.js"></script>
    <script type="text/javascript" charset="utf-8" src="http://js.arcgis.com/3.20/esri/tasks/IdentifyTask.js"></script>
    <script type="text/javascript" charset="utf-8" src="http://js.arcgis.com/3.20/esri/tasks/ProjectParameters.js"></script>
    <script type="text/javascript" charset="utf-8" src="http://js.arcgis.com/3.20/esri/tasks/PrintParameters.js"></script>
    <script type="text/javascript" charset="utf-8" src="http://js.arcgis.com/3.20/esri/tasks/PrintTask.js"></script>
    <script type="text/javascript" charset="utf-8" src="http://js.arcgis.com/3.20/esri/tasks/PrintTemplate.js"></script>
    <script type="text/javascript" charset="utf-8" src="http://js.arcgis.com/3.20/dojox/gfx/filters.js"></script>
    <script type="text/javascript" charset="utf-8" src="http://js.arcgis.com/3.20/dojox/gfx/svgext.js"></script>
    <script type="text/javascript" charset="utf-8" src="http://js.arcgis.com/3.20/esri/virtualearth/VETiledLayer.js"></script>
    <script type="text/javascript" charset="utf-8" src="http://js.arcgis.com/3.20/esri/tasks/IdentifyResult.js"></script>
    <script type="text/javascript" charset="utf-8" src="http://js.arcgis.com/3.20/esri/tasks/Geoprocessor.js"></script>
    <script type="text/javascript" charset="utf-8" src="http://js.arcgis.com/3.20/dojox/gfx/canvas.js"></script>
    <script type="text/javascript" charset="utf-8" src="http://js.arcgis.com/3.20/dojox/json/query.js"></script>
    <script type="text/javascript" charset="utf-8" src="http://js.arcgis.com/3.20/esri/tasks/LegendLayer.js"></script>
    <script type="text/javascript" charset="utf-8" src="http://js.arcgis.com/3.20/esri/tasks/JobInfo.js"></script>
    <script type="text/javascript" charset="utf-8" src="http://js.arcgis.com/3.20/esri/tasks/GPMessage.js"></script>
    <script type="text/javascript" charset="utf-8" src="http://js.arcgis.com/3.20/esri/tasks/LinearUnit.js"></script>
    <script type="text/javascript" charset="utf-8" src="http://js.arcgis.com/3.20/esri/tasks/DataFile.js"></script>
    <script type="text/javascript" charset="utf-8" src="http://js.arcgis.com/3.20/esri/tasks/RasterData.js"></script>
    <script type="text/javascript" charset="utf-8" src="http://js.arcgis.com/3.20/esri/tasks/Date.js"></script>
    <script type="text/javascript" charset="utf-8" src="http://js.arcgis.com/3.20/esri/tasks/ParameterValue.js"></script>
    <script type="text/javascript" charset="utf-8" src="http://js.arcgis.com/3.20/esri/tasks/GPResultImageLayer.js"></script>
    <script type="text/javascript" charset="utf-8" src="http://js.arcgis.com/3.20/dojox/main.js"></script>
    <script type="text/javascript" src="//js.arcgis.com/3.20/"></script>
</head>

<body>
<div id="fgpmap" is="rv-map" class="myMap" data-rv-config="" data-rv-langs='["en-CA"]' data-rv-service-endpoint="http://section917.cloudapp.net:8000/" data-rv-keys=''>
    <noscript>
        <p>This interactive map requires JavaScript. To view this content please enable JavaScript in your browser or download a browser that supports it.<p>

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
    document.getElementById("fgpmap").setAttribute("data-rv-config", localStorage.getItem('configpreview'));
    localStorage.removeItem('configpreview');
</script>

<script src="http://fgpv.cloudapp.net/demo/develop/prod/rv-main.js"></script>

</body>
</html>
