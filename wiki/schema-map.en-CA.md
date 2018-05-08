# **Map**

Core map properties (extent sets, levels of detail).

>### **Map JSON tree**

&emsp; [**"map"**](#map): **{**<br/>
&emsp;&emsp;&emsp;[**"extentSets"**](#mapextentsets): [<br/>
&emsp;&emsp;&emsp;&emsp;**`{`**<br/>
&emsp;&emsp;&emsp;&emsp;&emsp; [**`extentSetNode`**](#extentsetnode-json-tree)<br/>
&emsp;&emsp;&emsp;&emsp;**`}`**,<br/>
&emsp;&emsp;&emsp;&emsp;[**`{...}`**](#extentsetnode-json-tree),<br/>
&emsp;&emsp;&emsp;&emsp;[**`{...}`**](#extentsetnode-json-tree),<br/>
&emsp;&emsp;&emsp;&emsp; ...<br/>
&emsp;&emsp;&emsp;],<br/>
&emsp;&emsp;&emsp;[**"lodSets"**](#maplodsets): [<br/>
&emsp;&emsp;&emsp;&emsp;**`{`**<br/>
&emsp;&emsp;&emsp;&emsp;&emsp; [**`lodSetNode`**](#lodsetnode-json-tree)<br/>
&emsp;&emsp;&emsp;&emsp;**`}`**,<br/>
&emsp;&emsp;&emsp;&emsp;[**`{...}`**](#lodsetnode-json-tree),<br/>
&emsp;&emsp;&emsp;&emsp;[**`{...}`**](#lodsetnode-json-tree)<br/>
&emsp;&emsp;&emsp;&emsp; ...<br/>
&emsp;&emsp;&emsp;],<br/>
&emsp;&emsp;&emsp;[**"tileSchemas"**](#maptileschemas): [<br/>
&emsp;&emsp;&emsp;**`{`**<br/>
&emsp;&emsp;&emsp;&emsp; [**`tileSchemaNode`**](#tileschemanode-json-tree)<br/>
&emsp;&emsp;&emsp;**`}`**,<br/>
&emsp;&emsp;&emsp;[**`{...}`**](#tileschemanode-json-tree),<br/>
&emsp;&emsp;&emsp;[**`{...}`**](#tileschemanode-json-tree)<br/>
&emsp;&emsp;&emsp; ...<br/>
&emsp;&emsp;&emsp;],<br/>
&emsp;&emsp;&emsp;[**"components"**](#mapcomponents): {<br/>
&emsp;&emsp;&emsp;&emsp;[**"mouseInfo"**](#mapcomponentsmouseinfo): {<br/>
&emsp;&emsp;&emsp;&emsp;&emsp;["enabled"](#mapcomponentsmouseinfoenabled): ...,<br/>
&emsp;&emsp;&emsp;&emsp;&emsp;[**"spatialReference"**](#mapcomponentsmouseinfospatialreference): {...}<br/>
&emsp;&emsp;&emsp;&emsp;},<br/>
&emsp;&emsp;&emsp;&emsp;[**"northArrow"**](#mapcomponentsnortharrow): {<br/>
&emsp;&emsp;&emsp;&emsp;&emsp;["enabled"](#mapcomponentsnortharrowenabled): ...,<br/>
&emsp;&emsp;&emsp;&emsp;&emsp;["arrowIcon"](#mapcomponentsnortharrowarrowicon): ...,<br/>
&emsp;&emsp;&emsp;&emsp;&emsp;["poleIcon"](#mapcomponentsnortharrowpoleicon): ...<br/>
&emsp;&emsp;&emsp;&emsp;},<br/>
&emsp;&emsp;&emsp;&emsp;[**"overviewMap"**](#mapcomponentsoverviewmap): {<br/>
&emsp;&emsp;&emsp;&emsp;&emsp;["enabled"](#mapcomponentsoverviewmap): ...,<br/>
&emsp;&emsp;&emsp;&emsp;&emsp;["expandFactor"](#mapcomponentsoverviewmap): ...<br/>
&emsp;&emsp;&emsp;&emsp;},<br/>
&emsp;&emsp;&emsp;&emsp;[**"scaleBar"**](#mapcomponentsscalebar): {<br/>
&emsp;&emsp;&emsp;&emsp;&emsp;["enabled"](#mapcomponentsscalebar): ...<br/>
&emsp;&emsp;&emsp;&emsp;},<br/>
&emsp;&emsp;&emsp;&emsp;[**"basemap"**](#mapcomponentsbasemap): {<br/>
&emsp;&emsp;&emsp;&emsp;&emsp;["enabled"](#mapcomponentsbasemap): ...<br/>
&emsp;&emsp;&emsp;&emsp;}<br/>
&emsp;&emsp;&emsp;},<br/>
&emsp;&emsp;&emsp;["initialBasemapId"](#mapinitialbasemapid): ...,<br/>
&emsp;&emsp;&emsp;[**"baseMaps"**](#mapbasemaps): [<br/>
&emsp;&emsp;&emsp;**`{`**<br/>
&emsp;&emsp;&emsp;&emsp; [**`baseMapNode`**](#basemapnode-json-tree)<br/>
&emsp;&emsp;&emsp;**`}`**,<br/>
&emsp;&emsp;&emsp;[**`{...}`**](#basemapnode-json-tree),<br/>
&emsp;&emsp;&emsp;[**`{...}`**](#basemapnode-json-tree)<br/>
&emsp;&emsp;&emsp; ...<br/>
&emsp;&emsp;&emsp;],<br/>
&emsp;&emsp;&emsp;[**"layers"**](#maplayers): [<br/>
&emsp;&emsp;&emsp;**`{`**<br/>
&emsp;&emsp;&emsp;&emsp; [**`layerNode`**](#layernode-json-tree)<br/>
&emsp;&emsp;&emsp;**`}`**,<br/>
&emsp;&emsp;&emsp;[**`{...}`**](#layernode-json-tree),<br/>
&emsp;&emsp;&emsp;[**`{...}`**](#layernode-json-tree)<br/>
&emsp;&emsp;&emsp; ...<br/>
&emsp;&emsp;&emsp;],<br/>
&emsp;&emsp;&emsp;[**"legend"**](#maplegend): { :construction: }<br/>
&emsp;}

***
>#### [**`ExtentSetNode JSON tree`**](#nodeextentsetnode)

&emsp;{<br/>
&emsp;&emsp;&emsp;["id"](#nodeextentsetnodeid): ...,<br/>
&emsp;&emsp;&emsp;[**"spatialReference"**](#nodespatialreference): {<br/>
&emsp;&emsp;&emsp;&emsp;["wkid"](#nodespatialreferencewkid): ...<br/>
&emsp;&emsp;&emsp;},<br/>
&emsp;&emsp;&emsp;[**"default"**](#nodeextentsetnodedefault): {...},<br/>
&emsp;&emsp;&emsp;[**"full"**](#nodeextentsetnodefull): {...},<br/>
&emsp;&emsp;&emsp;[**"maximum"**](#nodeextentsetnodemaximum): {...}<br/>
&emsp; }<br/>

[:arrow_up: back to Map](#map-json-tree)

>#### [**`lodSetNode JSON tree`**](#nodelodesetnode)

&emsp;{<br/>
&emsp;&emsp;["id"](#nodelodsetnodeid): ...,<br/>
&emsp;&emsp;[**"lods"**](#nodelodsetnodelods): [<br/>
&emsp;&emsp;&emsp;{<br/>
&emsp;&emsp;&emsp;&emsp;["level"](#nodelodsetnodelodslevel): ...,<br/>
&emsp;&emsp;&emsp;&emsp;["resolution"](#nodelodsetnodelodsresolution): ...,<br/>
&emsp;&emsp;&emsp;&emsp;["scale"](#nodelodsetnodelodsscale): ...<br/>
&emsp;&emsp;&emsp;},<br/>
&emsp;&emsp;&emsp;{...},<br/>
&emsp;&emsp;&emsp;{...},<br/>
&emsp;&emsp;&emsp;...<br/>
&emsp;&emsp;]<br/>
&emsp;}

[:arrow_up: back to Map](#map-json-tree)

>#### [**`tileSchemaNode JSON tree`**](#nodetileschemanode)

&emsp;&emsp;{<br/>
&emsp;&emsp;&emsp;["id"](#nodetileschemanodeid): ...,<br/>
&emsp;&emsp;&emsp;["name"](#nodetileschemanodename): ...,<br/>
&emsp;&emsp;&emsp;["extentSetId"](#nodetileschemanodeextentsetid): ...,<br/>
&emsp;&emsp;&emsp;["lodSetId"](#nodetileschemanodelodsetid): ...,<br/>
&emsp;&emsp;&emsp;[**"overviewUrl"**](#nodetileschemanodeoverviewurl): {<br/>
&emsp;&emsp;&emsp;&emsp;["layerType"](#nodetileschemanodeoverviewurllayertype): ...,<br/>
&emsp;&emsp;&emsp;&emsp;["url"](#nodetileschemanodeoverviewurlurl): ...<br/>
&emsp;&emsp;&emsp;&emsp;}<br/>
&emsp;&emsp;}<br/>

[:arrow_up: back to Map](#map-json-tree)

>#### [**`baseMapNode JSON tree`**](#nodebasemapnode)

&emsp;&emsp;{<br/>
&emsp;&emsp;&emsp;["id"](#nodebasemapnodeid): ...,<br/>
&emsp;&emsp;&emsp;["name"](#nodebasemapnodename): ...,<br/>
&emsp;&emsp;&emsp;["description"](#nodebasemapnodedescription): ...,<br/>
&emsp;&emsp;&emsp;["typeSummary"](#nodebasemapnodetypesummary): ...,<br/>
&emsp;&emsp;&emsp;["altText"](#nodebasemapnodealttext): ...,<br/>
&emsp;&emsp;&emsp;&emsp;["thumbnailUrl"](#nodebasemapnodethumbnailurl): ...,<br/>
&emsp;&emsp;&emsp;&emsp;["tileSchemaId"](#nodebasemapnodetileschemaid): ...,<br/>
&emsp;&emsp;&emsp;&emsp;[**"layers"**](#nodebasemapnodelayers): [<br/>
&emsp;&emsp;&emsp;&emsp;{<br/>
&emsp;&emsp;&emsp;&emsp;&emsp;["id"](#nodebasemapnodelayersid): ...,<br/>
&emsp;&emsp;&emsp;&emsp;&emsp;["layerType"](#nodebasemapnodelayerslayertype): ...,<br/>
&emsp;&emsp;&emsp;&emsp;&emsp;["url"](#nodebasemapnodelayersurl): ...<br/>
&emsp;&emsp;&emsp;&emsp;},<br/>
&emsp;&emsp;&emsp;&emsp;{...},<br/>
&emsp;&emsp;&emsp;&emsp;{...}<br/>
&emsp;&emsp;&emsp;&emsp;],<br/>
&emsp;&emsp;&emsp;&emsp;["attribution"](#nodebasemapnodeattribution): ...,<br/>
&emsp;&emsp;&emsp;&emsp;["zoomLevels"](#nodebasemapnodezoomlevels): ...<br/>
&emsp;&emsp;&emsp;&emsp;}<br/>
&emsp;&emsp;}<br/>

[:arrow_up: back to Map](#map-json-tree)

>#### [**`layerNode JSON tree`**](#nodelayersnode)

&emsp;&emsp;[<br/>
&emsp;&emsp;&emsp;**`{`**<br/>
&emsp;&emsp;&emsp;&emsp; [**`basicLayerNode`**](#basiclayernode-json-tree)<br/>
&emsp;&emsp;&emsp; **OR**<br/>
&emsp;&emsp;&emsp;&emsp; [**`featureLayerNode`**](#featurelayernode-json-tree)<br/>
&emsp;&emsp;&emsp; **OR**<br/>
&emsp;&emsp;&emsp;&emsp; [**`wmsLayerNode`**](#wmslayernode-json-tree)<br/>
&emsp;&emsp;&emsp; **OR**<br/>
&emsp;&emsp;&emsp;&emsp; [**`dynamicLayerNode`**](#dynamiclayernode-json-tree)<br/>
&emsp;&emsp;&emsp;**`}`**,<br/>
&emsp;&emsp;&emsp;**`{...}`**,<br/>
&emsp;&emsp;&emsp;**`{...}`**<br/>
&emsp;&emsp;]<br/>

[:arrow_up: back to Map](#map-json-tree)

>#### [**`basicLayerNode JSON tree`**](#nodebasiclayernode)

&emsp;&emsp;{<br/>
&emsp;&emsp;&emsp;["id"](#nodebasiclayernodeid): ...,<br/>
&emsp;&emsp;&emsp;["name"](#nodebasiclayernodename): ...,<br/>
&emsp;&emsp;&emsp;["url"](#nodebasiclayernodeurl): ...,<br/>
&emsp;&emsp;&emsp;["refreshInterval"](#nodebasiclayernoderefreshinterval): ...,<br/>
&emsp;&emsp;&emsp;["metadataUrl"](#nodebasiclayernodemetadataurl): ...,<br/>
&emsp;&emsp;&emsp;["catalogueUrl"](#nodebasiclayernodecatalogueurl): ...,<br/>
&emsp;&emsp;&emsp;["layerType"](#nodebasiclayernodelayertype): ...,<br/>
&emsp;&emsp;&emsp;["**extent**"](#nodebasiclayernodeextent): {...},<br/>
&emsp;&emsp;&emsp;["**controls**"](#nodebasiclayernodecontrols): {...},<br/>
&emsp;&emsp;&emsp;["**disabledControls**"](#nodebasiclayernodedisabledcontrols): {...},<br/>
&emsp;&emsp;&emsp;["**state**"](#nodebasiclayernodestate): {...}<br/>
&emsp;&emsp;}<br/>

[:arrow_up: back to Map](#map-json-tree)

>## **map**
>>Core map properties (extent sets, levels of detail).

| Type | Author section | Advance | Required |
| ------- | ------- | ------- | ------- |
| *object* | Map/Extents and Levels of Details | - | - |

[:arrow_up: back to Map](#map-json-tree)
***
>### [map:_**`extentSets`**_](#map--extentsets)
>>The default, full and maximum extents of the map. |

| Type | Author section | Advance | Required |
| ------- | ------- | ------- | ------- |
| *array* | Map/Extents and Levels of Details | - | - |

[:arrow_up: back to Map](#map-json-tree)
***
>### [map:_**`lodSets`**_](#map--lodsets)
>>The levels of detail (zoom scales) available for the map.

| Type | Author section | Advance | Required |
| ------- | ------- | ------- | ------- |
| *array* | Map/Extents and Levels of Details | - | Yes |

[:arrow_up: back to Map](#map-json-tree)
***
>### [map:_**`tileSchemas`**_](#map--tileschemas)
>>A unique combination of an LoD and an extent set (each basemap must fit into a tile schema).

| Type | Author section | Advance | Required |
| ------- | ------- | ------- | ------- |
| *array* | Map/Extents and Levels of Details | Yes | Yes |

[:arrow_up: back to Map](#map-json-tree)
***
>### [map:_**`components`**_](#map--components)
>>Map components.

| Type | Author section | Advance | Required |
| ------- | ------- | ------- | ------- |
| *object* | Map/Components | - | - |

>### [map:components:_**`mouseInfo`**_](#map--components--mouseinfo)
>>Display cursor coordinates at the bottom of the screen.

| Type | Author section | Advance | Required |
| ------- | ------- | ------- | ------- |
| *object* | Map/Components | - | - |

>### [map:components:mouseInfo:_**`enabled`**_](#map--components--mouseinfo)
>>Enabling mouse information at the bottom of the screen.

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *boolean* | - | `true` | Map/Components | - | - |

>### [map:components:mouseInfo:_**`spatialReference`**_](#map--components--mouseinfo--spatialreference)
>>Coordinates system and projection used to retrieve localization info from the mouse cursor. For more info see [node:**`spatialReference`**_](#nodespatialreference)

>### [map:components:_**`northArrow`**_](#map--components--northarrow)
>>Everything about the North arrow

| Type | Author section | Advance | Required |
| ------- | ------- | ------- | ------- |
| *object* | Map/Components | - | - |

>### [map:components:northArrow:_**`arrowIcon`**_](#map--components--northarrow--arrowicon)
>>The graphical icon url/data url of the north arrow.

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *string* | - | `"data:image/png;base64,image encoded"` | Map/Components | - | - |

>### [map:components:northArrow:_**`poleIcon`**_](#map--components--northarrow--poleicon)
>>The graphical icon url/data url of the north pole that replaces north arrow when it's on north pole.

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *string* | - | `"data:image/png;base64,image encoded"` | Map/Components | - | - |

>### [map:components:northArrow:_**`enabled`**_](#map--components--northarrow--enabled)
>>Enabling North arrow.

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *boolean* | true | `true` | Map/Components | - | - |

>### [map:components:_**`overviewMap`**_](#map--components--overviewmap)
>>Collapsable overview map.

| Type | Author section | Advance | Required |
| ------- | ------- | ------- | ------- |
| *object* | Map/Components | - | - |

| Name | Type | Description | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- | ------- | ------- |
| [**overviewMap : enabled**](#map--components--overviewmap)| *boolean* |  | - | `true` | Map/Components | - | - |
| [**overviewMap : expandFactor**](#map--components--overviewmap) | *number* |  | `2` | `5` | `true` | Map/Components | - | - |

>### [map:components:_**`scaleBar`**_](#map--components--scalebar)
>>Scale bar.

| Type | Author section | Advance | Required |
| ------- | ------- | ------- | ------- |
| *object* | Map/Components | - | - |

| Name | Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- | ------- |
| [**scaleBar : enabled**](#map--components--scalebar) | *boolean* | - | `true` | Map/Components | - | - |

>### [map:components:_**`basemap`**_](#map--components--basemap)
>>Collapsable overview map.

| Type | Author section | Advance | Required |
| ------- | ------- | ------- | ------- |
| *object* | Map/Components | - | - |

| Name | Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- | ------- |
| [**basemap : enabled**](#map--components--basemap) | *boolean* | - | `true` | Map/Components | - | - |

[:arrow_up: back to Map](#map-json-tree)
***
>### [map:_**`initialBasemapId`**_](#map--initialbasemapid)
>>Initial basemap to load. If not supplied viewer will select any basemap.

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *string* | `Viewer choice` | `"myBaseMapID"` | Map/Basemaps | - | - |

[:arrow_up: back to Map](#map-json-tree)

## **Nodes**
**Nodes are objects that are part of other object definition**

>### [node:extentSetNode:_**`id`**_](#node--extentsetnode)
>>Extents set id.

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *string* | `-` | `"EXT_Lambert_3978"` | Map/Extents and Levels of Details | - | Yes |

>### [node:extentSetNode:_**`default`**_](#node--extentsetnode)
>>The default (starting) extent. For more info see [**node:extentNode**](#nodeextentnode).

| Type | Author section | Advance | Required |
| ------- | ------- | ------- | ------- |
| *object* | Map/Extents and Levels of Details | - | - |

>### [node:extentSetNode:_**`full`**_](#node--extentsetnode)
>>The full extent (should give good view of the whole map, not necessarily the maximum extent); default will be used if not supplied. For more info see [**node:extentNode**](#nodeextentnode).

| Type | Author section | Advance | Required |
| ------- | ------- | ------- | ------- |
| *object* | Map/Extents and Levels of Details | - | - |

>### [node:extentSetNode:_**`maximum`**_](#node--extentsetnode)
>The maximum extent; full or default extents will be used if not supplied. For more info see [**node:extentNode**](#nodeextentnode).

| Type | Author section | Advance | Required |
| ------- | ------- | ------- | ------- |
| *object* | Map/Extents and Levels of Details | - | - |

[:arrow_up: back to extentSetNode](#extentsetnode-json-tree)
***

>### [node:_**`spatialReference`**_](#node--spatialreference)
>>Projection

| Type | Author section | Advance | Required |
| ------- | ------- | ------- | ------- |
| *object* | Map | - | - |

>### [node:spatialReference:_**`wkid`**_](#node--spatialreference--wkid)
>>Well-known identifier.

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *string* | `-` | `3978` | Map | - | - |

[:arrow_up: back to Map](#map-json-tree)
***
>### [node:lodSetNode:_**`id`**_](#node--lodsetnode--id)
>>Level of details Set id.

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *string* | `-` | `"LOD_Lambert_3978"` | Map/Extents and Levels of Details | Yes | Yes |

>### [node:lodSetNode:_**`lods`**_](#node--lodsetnode--lods)
>>Level of details for a specific tile schema.

| Type | Author section | Advance | Required |
| ------- | ------- | ------- | ------- |
| *array* | Map/Extents and Levels of Details | Yes | Yes |

>### [node:lodSetNode:lods:_**`level`**_](#node--lodsetnode--lods--level)
>>A sequential integer that identify a level.

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *number* | `-` | `3` | Map/Extents and Levels of Details | Yes | Yes |

>### [node:lodSetNode:lods:_**`resolution`**_](#node--lodsetnode--lods--resolution)
>>The smallest spaces between two display elements expressed in map unit of the corresponding projection.

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *number* | `-` | `38364.660062653464` | Map/Extents and Levels of Details | Yes | Yes |

>### [node:lodSetNode:lods:_**`scale`**_](#node--lodsetnode--lods--scale)
>>Ratio between distance measure on a map and the corresponding distance on the ground.

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *number* | `-` | `145000000` | Map/Extents and Levels of Details | Yes | Yes |

[:arrow_up: back to lodSetNode](#lodsetnode-json-tree)
***
>### [node:tileSchemaNode:_**`id`**_](#node--tileschemanode--id)
>>A unique id identifying a tile schema (combination of an extent set and a zoom scale).

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *string* | `-` | `"EXT_Lambert_3978#LOD_Lambert_3978"` | Map/Extents and Levels of Details | Yes | Yes |

>### [node:tileSchemaNode:_**`name`**_](#node--tileschemanode--name)
>>The name to display in the basemap selector for the set of basemaps referencing this schema.

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *string* | `-` | `"Lambert Maps"` | Map/Extents and Levels of Details | Yes | Yes |

>### [node:tileSchemaNode:_**`extentSetId`**_](#node--tileschemanode--extentsetid)
>>The extent set to be used for this basemap (should reference map.extentSets.id).

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *string* | `-` | `"EXT_Lambert_3978"` | Map/Extents and Levels of Details | Yes | Yes |

>### [node:tileSchemaNode:_**`lodSetId`**_](#node--tileschemanode--lodsetid)
>>Optional. The level of details set to be used for this basemap.

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *string* | `-` | `"LOD_Lambert_3978"` | Map/Extents and Levels of Details | Yes | Yes |

>### [node:tileSchemaNode:_**`overviewUrl`**_](#node--tileschemanode--overviewurl)
>>Optional. If set, the overview map will use this layer instead of the active basemap.

| Type | Author section | Advance | Required |
| ------- | ------- | ------- | ------- |
| *object* | Map/Extents and Levels of Details | Yes | - |

>### [node:tileSchemaNode:overviewUrl:_**`layerType`**_](#node--tileschemanode--overviewurl--layertype)
>>Layer type that can be of one of those values ["esriImage", "esriTile"]

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *string* | - | `"esriTile"` | Map/Extents and Levels of Details | Yes | Yes |

>### [node:tileSchemaNode:overviewUrl:_**`url`**_](#node--tileschemanode--overviewurl--url)
>>The service endpoint of the layer. It should match the type provided in [layerType]((#maptileschemasoverviewurllayertype).

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *string* | - | `"https://services.arcgisonline.com/.../World_Street_Map/MapServer"` | Map/Extents and Levels of Details | Yes | Yes |

[:arrow_up: back to tileSchemaNode](#tileschemanode-json-tree)
***
>### [node:_**`extentNode`**_](#node--extentnode)
>>Extents coordinates in projection system used by the layer.

| Name | Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- | ------- |
| xmin | *number* | `-` | `-2681457` | Map | - | - |
| ymin | *number* | `-` | `-883440` | Map | - | - |
| xmax | *number* | `-` | `3549492` | Map | - | - |
| ymax | *number* | `-` | `3482193` | Map | - | - |

[:arrow_up: back to Map top](#Map)

## **Annex**