# General Information

The Federal Geospatial Platform Author tool is can be used to create, read, validate and preview json format configuration files to be used by the Federal Geospatial Platform Viewer.

A configuration file may be read from an existing file, by clicking on the up arrow icon  ![](uparrow.png).

To created new configuration file, click on the plus sign icon ![](plussign.png).

To save the configuration file once finished, click on the diskette icon ![](diskette.png) .

By default 3 templates that contain default values for your organization when
creating a configuration file are listed. Select either the config-authorA, config-AuthorB or config-full template.

You can change the language of this application by selecting the language at the right upper corner using the pull down list.

 ![](languagebutton.png).

To close this help window click on the X at the right upper corner of this help window.


# Map

The map section  lists tabs that contain information about the map to be created. It  is the default section that is displayed.

The map section is divided into tabs that contain information on : Extents and Levels of Detail, Map components, Basemaps, Layers and Legend.

## Extents and Levels of Detail

This section contains tabs that list the Tile schemas,Extents and Levels of detail.

## Tile Schemas

The fields to enter are the following:

+ Id - The unique identifier of the tileschema ( combination of extent set and zoom scale).

+ Name - The projection name used to be displayed for this base map selector and for the set of basemaps referencing the schema.

+ Exendsetid - It is the extend set to be used for the basemap. It should reference the map.extentSets.id .

+ Lodsetid - This field indicates the level of detail to be used for this basemap. It should reference the map.lod.id .

+ Static overview map - The overview map displayed at top left corner of viewer viewport.

+ Layer type - The layer type indicates ESRI type  of the layer for the overview map. It only works with esriImage and esriTile layers.

+ URL - This field indicates the service end point of the layer of the static overview map and should match the type indicated in the layer type.

## Extents

This section lists the extents to be used by the basemap.

Setextend (default),Setextend (full), Setextend (maximum)

Click on the set extent button to select a default , full, or maximum extent dynamically.

+ Id - The identifier of the extent set.

+ WKID - Select the number of the well known Id that corresponds to the projection to be used.

+ VcsWKID - Select the number of the vertical control system wkid Id that corresponds to the vertical datum to be used.

+ LatestWKID - Set the number of the Latest wkid  that corresponds to the projection to be used.

+ LatestVcsWKID - Set the well known text to be used.

+ WKT - Select the number of the Well Known Text that corresponds to the projection to be used.

+ Default Extent - Enter the xmin and ymax extent when the extent is first loaded either interactively or by scrolling over the + sign and select a bounding box extent or a whole extent set.

+ Full Extent - Enter the xmin and ymax extent when the user selects the home button either interactively or by scrolling over the + sign and select a bounding box extent or a whole extent set.

+ Maximum Extent - Enter the xmin and ymax extent when the user zooms or pans out to a maximum level either interactively or by scrolling over the + sign and select a bounding box extent or a whole extent set. The default extent is used if no maximum is supplied.

## Levels of Detail Sets

The id of the level of detail set is listed.

The Levels of detail lists for each level:

+ level number
+ map resolution
+ scale

Click on the set level of details button to enter a tile cache layer url from which to obtain the levels of detail set.

You may click on the X button to remove a level of detail entry from the set of entries.

## Map Components

The maps components tab lists the if mouse coordinates are enabled and
the numerical values selectable by a click for the projection displayed by selecting the
 wkid, vcsid ( vertical coordinate wkid) and latestwkid, latestvcswkid, and wkt( Well-known text (WKT)
is a text markup language for representing vector geometry objects on a map,
spatial reference systems of spatial objects and transformations between spatial reference systems.

The mouse coordinates to be displayed at the bottom of the map.

The positioning coordinates can be in degrees minutes seconds (DMS), decimal degrees or
meters depending on the projection and configuration used.

It also lists the checkboxes if enabled for the display of the north arrow ![](northarrow.png).

The display of the scale bar at the bottom of the map ![](scalebar.png).

The display of the over view map at the upper right corner ![](overviewmap.png).

It also lists if the over view map is enabled, its scale factor and if visible.

## Basemaps

The Basemaps tab lists the base map id of the initial base map to be used and all basemaps that are available listed under the basemaps collection.

For all base maps the fields to be entered are the following:

+ Basemap Id - The identifier of the basemap.

+ Name - The name of the basemap used for labelling.

+ Description - The description of basemap displayed when the basemap selector is expanded.

+ Type summary - A summary which is an optional basemap type.

+ Alternate Text - The text to be displayed with the basemap thumbnail image.

+ Thumbnail Url - The url which is the path to the thumbnail image use with the basemap selector.

+ Tileschema Id - The tile schema identifier to be used with the basemap.

+ Id - The identifier of the layer

+ Layertype - The type from the pull down list either feature, dynamic, image , tile or ogcWms.

+ Url - The url of the layer

  Attribution   

  + Text checkbox - If the text description is enabled.

  + Description - This optional field contains the attribution value. If empty, it will use copyright text from the server.

  + Logo checkbox - Select the checkbox if enabled.

  + Alternate text - The alternate text to be displayed.

  + URL - The url if the basemap if clicked.

## Layers

The layers tab lists the map layers to be displayed.
For each map layer to be displayed the  fields to enter are:

+ layer type selector - either one of these five types of layers that can be selected in the dropdown:

|Layer Type|Interactive|Server Renders|Datatable support|Notes|
|----|----|----|----|----|
| Feature | Yes | No | Yes | Fast, efficient - local rendering for small to medium size geometry sets |
| Dynamic | Yes | Yes | Yes | Good choice for large, complex geometry that would be slow to render locally |
| Image | No | Yes | No | Raster and image file support |
| Tile | No | Yes | No | Fast, efficient - server contains pre-rendered map tiles |
| WMS | Yes | Yes | No | Georeferenced map images which server generates using data from a GIS database |

+ Layerid - The identifier of the layer.

+ Layer name - The layer name to be displayed.

+ Url - The url of the service endpoint of the layer.

+ Meta data url  - The service endpoint for the metadata.

+ Layer type - The type of the service either ESRI Feature, ESRI Dynamic, ogcWMS,ESRI Tile or ESRI Image.

+ Check box for symbology toggle - This will allow individual symbols display to be toggled on or off
tolerance in pixels to determine if a feature was selected by a click.

For each Layer entry the:

+ Layer index - Index of the layer in the map service.

+ Name - A name for the layer that can override the name from the service.

+ Outfields - This is a comma separated list of attributes to be returned on a query

+ State only - This flag indicates that state tracking is set for the layer. All controls will be ignored but the layer will be displayed with it's given state settings.

Layer Controls and state

![](layersettings.png)

This list all the controls that you can select for a specified layer.
The checkboxes for all controls that can be enabled on the specified layer are the following:

+ opacity
+ visibility
+ boundingBox
+ query
+ snapshot
+ metadata
+ boundaryZoom
+ refresh
+ reload
+ remove
+ settings
+ data
+ styles

There is a pull down list of same controls which are visible, but disabled for user modification.

## State

Opacity - Initial opacity requires you select a numerical value using the up or down arrows.

Select the checkbox desired for the following settings:

+ Visibility - Initial visibility setting.

+ Bounding box - Display bounding box.

+ Query - Allow querying.

+ Snapshot - Retrieve all feature data immediately on load.

+ Hovertips - Disable hover tips.

## Table

![](tablepanel.png)

The table section lists the fields to be returned on query in the table panel.

+ Title of table - Specifies the title to apply.

+ Description - This field specifies additional information to be displayed in the settings panel.

+ Maximize - Specifies default table size if the table is to be maximized on open or if false in a split view.

+ Apply map - This specifies if the default filters (from columns filter) are applied to the map (definition query). True: it is applied; False: it is not applied.

## Fields section

Customize fields - Specifies the array of columns for the table. When there is an item in this array, it will be use to define which and how column will be set for the table. If a column is not in the array it will be assume as disabled.

Single entry collapse - Indicates that the dynamic layer with a single layer entry should be rendered without the root group. The list of fields that can be expanded or collapsed.

## Legend

This tab indicates if the legend is auto populated by the listed layers or  if a customized user built structured legend is used.


# User Interface

The user interface section table lists general information for the application bar, navigation bar and side menu.

## General tab

General tab lists the following information.

+ Full screen checkbox -  Selected if the viewer is to take the entire viewport.

+ Theme - Select the UI theme of the viewer from the pull down list.

+ Failure message -  Message if the viewer fails to override the viewer default message.

+ Failure Image Url- The url of the image to be used to override the viewers default image.

![](menu.png)

The legend is reorderable but the selection of a structured legend ignores this option.
Provides an alternative to the click-hold and drag reordering already available. When selected, layers are only reorderable by holding onto the handle icon next to each layer. Most useful for touch devices

![](reorder.png)

Allow layers import indicates that users can import additional layers at runtime besides those in the configuration file.
Additional layers can be added to the map viewer. Supported formats include: ESRI Feature Layer, ESRI Dynamic Layer, ESRI Tile Layer, ESRI Image Layer, OGC Web Map Service, or a Raster Layer. The '+' button at the top of the Legend menu will launch the Add Layers menu.

![](add.png)

Legend opening options

Click on the checkbox to specify whether the legend is opened by default on initial loading of the map for small, medium, and large viewports.

+ Open by default in large display- Whether the legend is opened by default on initial loading of the map for large viewports

+ Open by default in medium display- Whether the legend is opened by default on initial loading of the map for medium viewports

+ Open by default in small display- Whether the legend is opened by default on initial loading of the map for small viewports

![](tablepanel.png)

The following controls specify if the table panel is opened by default upon loading of a layer for different size viewports.

+ Layer Id - The id of the layer for referencing within the viewer.

Table opening options

Click on the checkbox to specify whether the table panel is opened by default on initial loading of the map for small, medium, and large viewports

+ Open by default in large display -Whether the table panel is opened by default on initial loading of the map for large viewports

+ Open by default in medium display- Whether the table panel is opened by default on initial loading of the map for medium viewports

+ Open by default in small display- Whether the table panel is opened by default on initial loading of the map for small viewports



## Application bar

![](applicationbar.png)

The application bar lists the configuration of the main toolbar.
The tools that can be selectable via a check box in the main toolbar are the following:

+ Side Menu - Shows the side menu button in the main app toolbar

+ Geosearch- Shows the geosearch button in the main app toolbar. The button will be hidden if the geosearch component is disabled or no search service URLs are provided.

+ Basemap Selector -Shows the basemap selector button in the main app toolbar.

+ Layers Selector -Shows the layers button in the main app toolbar.

## Navigation Bar

![](sidemenulist.png)

The navigation bar lists check boxed fields for extra navigation components:

+ geolocator

+ marquee

+ home

+ history

+ basemap

+ help

+ fullscreen

+ geosearch

+ restrict navigation to within the maximum extent

## Side Menu

The side menu tab list the following fields

+ Title - Specifies an optional title instead of the viewer default.

+ Showlogo - Checkbox if the logo should be shown on the left side window.

+ Logo Url - Specifies a Url for an optional viewer logo.


![](menulist.png)

The Side Menu items to be listed in the side menu that are selectable via a check box:

+ layers
+ basemap
+ geosearch
+ about
+ fullscreen
+ export
+ share
+ touch
+ help
+ language
+ plugins


Help File

+ Folder name  - Specifies the folder name containing the help description and images.

The following fields are for About Map properties specified from a configuration file or markdown folder.

+ About source - Specifies a string or file content from a pull down list.

+ Content - Enter a string containing the about map text.


# Services

This section lists  sections for service End points for the coordinate info url and print url,
Geosearch service endpoints and export of the map configuration settings.

## Service endpoints

This tab lists the url for the service endpoints for the coordinate information and print function.

For advanced configuration options this tabs let you change the following service endpoints.

+ Proxy URL- An optional proxy to be used for dealing with same-origin issues. The URL must either be a relative path on the same server or an absolute path on a server which sets CORS headers.

+ Export Map URL - An ESRI service endpoint for generating map images. Should point directly to an endpoint that can be consumed by ESRI PrintTask.

+ Geometry URL - A URL to an ESRI ArcGIS geometry service REST endpoint.

+ Google API URL - Google API key to enable geo location and share link shortening.

## Geosearch

![](geosearchmenu.png)

This tab lists the customizable properties of the geosearch function and urls of it's service endpoints.

+ Geo Names URl - Endpoint url for geoNames service

+ Geo Location URl -Endpoint url for geoLocation service

+ Geo Suggest URl -Endpoint url for geoSuggest service

+ Provinces URL - Endpoint url for provinces service

+ Type URL- Endpoint url for types service

You can also use checkboxes to disable the NTS, Postal Code and Latitude/Longitude types of  which
are available in the geosearch window.

![](geosearchexample.png)

## Export map

You can export an image of the map and its visible layers along with a legend, title, north arrow with scalebar, custom footnote, and a timestamp.

The title of the exported graphic can be customized by entering a value.

Check boxes are used to indicate if each of these export components is present or customizable.

+ Title - Enter the text value for the title of the exported graphic.

+ Map component - The map is included in the exported graphic.

+ Legend component - The legend is included in the exported graphic.

+ Map elements - The north arrow and sidebar components are included in the exported graphic.

+ Footnote - Enter a text footnote to be added to the exported map as text.

+ Timestamp component - The timestamp is included in the exported graphic.

If customizable a dialog will appear with an image of the map, and an option to enter a map title if desired.

![](exportmapwindowv2.png)

Also, users can add or remove sections of the exported image such as a legend,
by clicking on the options cogwheel in the header.
Users will be able to select/deselect the sections to appear in the exported image.


# Version

The version tab lets you select the version of the FGP viewer schema file using a pull down list.

By default the present version is 2.0.


#  Language

The language tab let you select the language of the configuration file , using a pull down list.
Select en-CA for english or fr-CA for french.

The value is a ISO 639-1 code indicating the language of strings in the schema file.


#  Summary Panel

![](summarypanel.png)

The summary panel permits you to validate the fields in the configuration file by clicking on the validate button ![](validate.png).

The summary panel also permits you to preview the configuration file in a viewport by clicking on the preview button ![](preview.png).

![](previewsample.png)

A preview of the map displays all the layers of he map as it will be displayed in the FGP viewer.
It is a fully functional viewer containing all the functionality of the viewer application.

The preview may require a few seconds to display.

The summary panel lets you  validate the configuration file by pressing on the
validate button ![](validate.png)to list all the fields in the file.

A green checkbox ![](greencheckbox.png) will appear beside the fields that are
valid.

A red box ![](redcircle.png) with an exclamation mark appears beside fields that
are not valid.

You can use the expand or collapse buttons ![](expandcollapse.png) to see all the fields in the different sections of
the viewer configuration file.



# Load Times/Unanticipated Behavior

![](startingwheel.png)

The spinning wheel occurs at the loading of the application and during execution of a file in preview mode.

You can press the F12 function key to enter into debug mode and select
the console tab to obtain additional error messages if execution time takes too long.

Load times for this application and the preview viewer configuration may vary based on:
- network location
- bandwidth availability
- number of layers being loaded
- Layer types and their sizes

Unanticipated behavior may occur if any interactions occur before data is fully loaded. Please allow the webpage to load completely before triggering any functions.
