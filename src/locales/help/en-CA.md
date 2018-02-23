# General Information

The Federal Geospatial Platform Author tool is can be used to create, read, validate and preview json format configuration files to be used by the Federal Geospatial Platform Viewer.

A configuration file may be read from an existing file, by clicking on the up arrow icon  ![](uparrow.png).

To created new configuration file, click on the plus sign icon ![](plussign.png).

To save the configuration file once finished, click on the diskette icon ![](diskette.png) .

By default 3 templates that contain default values for most settings are available when
creating a  configuration file. Select either config-authorA, config-AuthorB or config-full template.

A standard text search is used on the string entered.

You can change the language of this application by selecting the language at the right upper corner using the pull down list.

 ![](languagebutton.png).

To close this help window click on the X at the right upper corner of this help window.


# Map

The map section  lists tabs that contain information about the map to be created. It  is the default section that is displayed.

The map section is divided into tabs that contain information on : Extents and Levels of Detail, Map components, Basemaps, Layers, Legend.

## Extents and Levels of Detail

This section contains tabs that list the Tile schemas,Extents and Levels of detail.

## Tile Schemas

The first field to enter is the id of the tileschema ( combination of extent set and zoom scale)

Name
The projection name used to be displayed in the base map
selector for the set of basemaps referencing the schema)

Exendsetid
It is the extend set to be used for the basemap.

Lodsetid
This optional field indicates the level of detail to be used for a basemap.

Static overview map
Layer type
The layer type indicates ESRI type  of the layer.

URL
This filed indicates the service end point of the layer
and should match the type indicated in the layer type.

## Extents

This section lists the extents to be used by the basemap.
Setextend (default),Setextend (full), Setextend (maximum)

ID
The id of the extent set indicates the projection.

WKID
Select the number of the well known Id that corresponds to the projection to be used.

vcsWKID
Select the number of the vcswkid Id that corresponds to the projection to be used.

latestWKID
Set the number of the latestwkid  that corresponds to the projection to be used.

DefaultExtent
Enter the xmin and ymax extents either interactively or by scrolling over the + sign and
selecting a bounding box extent.

FullExtent
Enter the xmin and ymax extents either interactively or by scrolling over the + sign and
selecting a bounding box extent.

Mamixum Extent
Enter the xmin and ymax extents either interactively or by scrolling over the + sign and
selecting a bounding box extent.

## Levels of Detail Sets

The Levels of detail lists for each level
The level number, map resolution, scale corresponding to the levels of detail for the tile schema,
maps displayed. Scroll over the value and use the arrows to select the numerical value for the level,resolution or scale.

## Map Components

The maps components tab lists the if mouse coordinates are enabled and
the numerical values selectable by a click for the projection displayed by selecting the
 wkid,vcsid ( vertical coordinate wkid) and latestwkid,latestvcswkid, and wkt( Well-known text (WKT)
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
 -base mapid ( unique identifier of the basemap),
-name of the basemap used for labelling,
- description displayed when the basemap selector is expanded,
-type summary  which is an optional basemap type,
 -alternate text  to be displayed with the basemap thumbnail image,
-thumbnail url which is the path to the thumbnail image use with the basemap selector
-tileschema id to be used with the basemap,
 -layerid,
 -layertype from the pull down list either feature, dyhnamic, image , tile or ogcWms.
-url of he tlayer
- attribution

## Layers

The layers tab lists the map layers to be displayed.
For each map layer to be displayed the  fields to enter are:

layer type selector either one of these five types of layers that can be selected in the dropdown:

|Layer Type|Interactive|Server Renders|Datatable support|Notes|
|----|----|----|----|----|
| Feature | Yes | No | Yes | Fast, efficient - local rendering for small to medium size geometry sets |
| Dynamic | Yes | Yes | Yes | Good choice for large, complex geometry that would be slow to render locally |
| Image | No | Yes | No | Raster and image file support |
| Tile | No | Yes | No | Fast, efficient - server contains pre-rendered map tiles |
| WMS | Yes | Yes | No | Georeferenced map images which server generates using data from a GIS database |

layerid,
layer name to be displayed
url to the service endpoint of the layer
metadataurl
layer type of the service either ESRI Feature, ESRI Dynamic, ogcWMS,ESRI Tile or ESRI Image.

check box for symbology toggle to allow individual symbols display to be toggled on or off
tolerance in pixels to determine if a feature was selected by a click.

For each Layer entry the:

layer index of the layer indicating the
outfields is a comma separated list of attributes to be returned on a query
state only flag indicating the state setting of the layer

Layer Controls and state

![](layersettings.png)

This pull  down lists all the controls that  you can select for a specified layer.
The list of controls hat can be enabled on the specified layer are the following:

opacity,
visibility,
boundingBox,
query,
snapshot,
metadata,
boundaryZoom,
refresh,
reload,
remove,
settings,
data,
styles

There is a pull  down lists of same controls which are visible, but disabled for user modification.

## State

opacity - Initial opacity requires you select a numerical value using the up or down arrows.

Select the checkbox desired for the following settings:

Visibility -Initial visibility setting

Bounding box- Display bounding box

Query- Allow querying

Snapshot -Retrieve all feature data immediately on load

Hovertips -Disable hover tips

## Table

![](tablepanel.png)

The table section lists the fields to be returned on query in the table panel.

Title of table
description
maximize specifies if the table is to be maximized on open or if false in a split view
applymap specifies if the default filters (from columns filter) are applied to the map (definition query). True: it is applied; False: it is not applied.

## Fields section
customize fields -specifies the array of columns for the table. When there is an item in this array, it will be use to define which and how column will be set for the table. If a column is not in the array it will be assume as disabled.

Single entry collapse- indicates that the dynamic layer with a single layer entry should be rendered without the root group.

The list of fields that can be expanded or collapsed.

## Legend

This tab indicates if the legend is auto populated by the listed layers or a customized user built structured legend.


# User Interface

The user interface section table lists general information for the application bar, navigation bar and side menu.

## General tab

General tab lists the following information.

full screen checkbox if the viewer is to take the entire viewport.

theme - ui theme of the viewer

Failure message if the viewer fails to override the viewer default message.

Failure image url to be used to override the viewers default image.

![](menu.png)

legend is reorderable but the selection of a structured legend ignores this option.
Provides an alternative to the click-hold and drag reordering already available. When selected, layers are only reorderable by holding onto the handle icon next to each layer. Most useful for touch devices

![](reorder.png)

allows layers import indicates that users can import additional layers at runtime besides those in the configuration file.
Additional layers can be added to the map viewer. Supported formats include: ESRI Feature Layer, ESRI Dynamic Layer, ESRI Tile Layer, ESRI Image Layer, OGC Web Map Service, or a Raster Layer. The '+' button at the top of the Legend menu will launch the Add Layers menu.

![](add.png)

Legend opening options

Click on the checkbox to specify whether the legend is opened by default on initial loading of the map for small, medium, and large viewports

Open by default in large display- Whether the legend is opened by default on initial loading of the map for large viewports
Open by default in medium display- Whether the legend is opened by default on initial loading of the map for medium viewports
Open by default in small display- Whether the legend is opened by default on initial loading of the map for small viewports

![](tablepanel.png)

table panel is opened by default upon clicking on a layer.

layer id  for referencing table within the viewer

Table opening options

Click on the checkbox to specify whether the table panel is opened by default on initial loading of the map for small, medium, and large viewports

Open by default in large display -Whether the table panel is opened by default on initial loading of the map for large viewports
Open by default in medium display- Whether the table panel is opened by default on initial loading of the map for medium viewports
Open by default in small display- Whether the table panel is opened by default on initial loading of the map for small viewports



## Application bar

![](applicationbar.png)

The application bar lists the configuration of the main toolbar.
The tools that can be selectable via a check box in the main toolbar are the following:
side menu,
geosearch,
basemap selector,
layers selector.

## Navigation Bar

![](sidemenulist.png)

The navigation bar lists checkboxed fields  for extra navigation components:
geolocator,
marquee,
home,
history,
basemap,
help,
fullscreen,
geosearch,
restrict navigation to within the maximum extent

## Side Menu
The side menu tab list the following fields

showlogo if visible or not
logoUrl which is an optional image
Title used instead of the viewer default.

![](menulist.png)

Side Menu items to be listed in the side menu that are selectable via a check box:
layers,
basemap,
geosearch,
about,
fullscreen,
export,
share,
touch,
help,
language,
plugins

Helpfile folder name containing the help file and images.

# Services

This section lists  sections for service End points  for the coordinate info url and print url,
 Geosearch service endpoints and export of the map configuration settings.

## Service endpoints

This tab lists the url for the service endpoints for the coordinate information and print function.

For advanced configuration options this tabs let you change the following service endpoints.

Proxy URL- An optional proxy to be used for dealing with same-origin issues. URL must either be a relative path on the same server or an absolute path on a server which sets CORS headers.

Export Map URL - An ESRI service endpoint for generating map images. Should point directly to an endpoint that can be consumed by ESRI PrintTask.

Geometry URL - A URL to an ESRI ArcGIS geometry service REST endpoint.

Google API URL - Google API key to enable geo location and share link shortening.

## Geosearch

![](geosearchmenu.png)

This tab lists the customizable properties of the geosearch function and urls of it's service endpoints.

Geo Names URl - Endpoint url for geoNames service
Geo Location URl -Endpoint url for geoLocation service
Geo Suggest URl -Endpoint url for geoSuggest service
Provinces URL - Endpoint url for provinces service
Type URL- Endpoint url for types service

You can also use checkboxes to disable the NTS, Postal Code and Latitude/Longitude types of  which
are available in the geosearch window.

![](geosearchexample.png)

## Export map

You can export an image of the map and its visible layers along with a legend, title, north arrow with scalebar, custom footnote, and a timestamp.

The title of the exported graphic can be customized by entering a value.

Check boxes are used to indicate if each of the export components is present or customizable.
map component
legend component
map elements which are the north arrow and sidebar components.
footnote to be added to the exported map as text
timestamp component

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
