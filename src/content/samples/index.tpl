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
        <div class="fgpa" av-langs='["en-CA", "fr-CA"]'>

            <av-header></av-header>

            <div class="av-tools">
                <div class="av-section">
                    <a href="#!map" translate>app.section.map</a>
                    <a href="#!ui" translate>app.section.ui</a>

                    <div ng-view></div>
                </div>
                <div class="av-summary">
                    <av-summary></av-summary>
                </div>
            </div>
        </div>

        <% for (var index in htmlWebpackPlugin.files.js) { %>
            <% if (webpackConfig.output.crossOriginLoading) { %>
                <script src="<%= htmlWebpackPlugin.files.js[index] %>" integrity="<%= htmlWebpackPlugin.files.jsIntegrity[index] %>" crossorigin="<%= webpackConfig.output.crossOriginLoading %>"></script>
            <% } else { %>
                <script src="<%= htmlWebpackPlugin.files.js[index] %>"></script>
            <% } %>
        <% } %>
    </body>
</html>
