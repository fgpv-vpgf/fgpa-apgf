<!doctype html>
<html>
    <head>
        <% for (var index in htmlWebpackPlugin.files.css) { %>
            <% if (webpackConfig.output.crossOriginLoading) { %>
                <link rel="stylesheet" href="<%= htmlWebpackPlugin.files.css[index] %>" integrity="<%= htmlWebpackPlugin.files.cssIntegrity[index] %>" crossorigin="<%= webpackConfig.output.crossOriginLoading %>"/>
            <% } else { %>
                <link rel="stylesheet" href="<%= htmlWebpackPlugin.files.css[index] %>" />
            <% } %>
        <% } %>
    </head>

    <body>
        <div class="fgpa av-large"
                data-av-langs='["en-CA", "fr-CA"]'
                av-extensions="extensions/ddr/ddr.js"
                data-av-config='["config-authorA.json", "config-authorB.json", "config-full.json"]'>
            <av-header></av-header>

            <div class="av-tools" layout="row">
                <av-tab flex="70"></av-tab>
                <div class="av-summary" flex="30">
                    <av-summary></av-summary>
                </div>
            </div>
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

        <% for (var index in htmlWebpackPlugin.files.js) { %>
            <% if (webpackConfig.output.crossOriginLoading) { %>
                <script src="<%= htmlWebpackPlugin.files.js[index] %>" integrity="<%= htmlWebpackPlugin.files.jsIntegrity[index] %>" crossorigin="<%= webpackConfig.output.crossOriginLoading %>"></script>
            <% } else { %>
                <script src="<%= htmlWebpackPlugin.files.js[index] %>"></script>
            <% } %>
        <% } %>
    </body>
</html>
