<!doctype html>
<html>
    <head>
        <meta charset="utf-8">
        <!-- Global site tag (gtag.js) - Google Analytics -->
        <script>
            (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
                (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
                m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
            })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

            ga('create', 'UA-66832240-1', 'auto');
            ga("set", "anonymizeIp", true);
            ga('send', 'pageview');
         </script>

        <% for (var index in htmlWebpackPlugin.files.css) { %>
            <% if (webpackConfig.output.crossOriginLoading) { %>
                <link rel="stylesheet" href="<%= htmlWebpackPlugin.files.css[index] %>" integrity="<%= htmlWebpackPlugin.files.cssIntegrity[index] %>" crossorigin="<%= webpackConfig.output.crossOriginLoading %>"/>
            <% } else { %>
                <link rel="stylesheet" href="<%= htmlWebpackPlugin.files.css[index] %>" />
            <% } %>
        <% } %>

        <!-- Google Tag Manager DO NOT REMOVE OR MODIFY - NE PAS SUPPRIMER OU MODIFIER -->
        <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-WNKVQCG');
        </script>
      	<!-- End Google Tag Manager -->
    </head>

    <body>
        <!-- Google Tag Manager DO NOT REMOVE OR MODIFY - NE PAS SUPPRIMER OU MODIFIER -->
        <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WNKVQCG"
        height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
        <!-- End Google Tag Manager -->

        <div class="fgpa av-large"
                data-av-langs='["en-CA", "fr-CA"]'
                data-av-extensions='["./extensions/ddr/ddr.js"]'
                data-av-schema="./schemaForm/"
                data-av-config='["./config/config-authorB.json", "./config/config-authorA.json", "./config/config-full.json"]'>
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
