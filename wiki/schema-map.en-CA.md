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
>#### [**`attributionNode JSON tree`**](#nodeattributionnode)

&emsp;{<br/>
&emsp;&emsp;&emsp;[**"text"**](#nodeattributiontext): {<br/>
&emsp;&emsp;&emsp;&emsp;["enabled"](#nodeattributiontext): ...<br/>
&emsp;&emsp;&emsp;&emsp;["value"](#nodeattributiontext): ...<br/>
&emsp;&emsp;&emsp;},<br/>
&emsp;&emsp;&emsp;[**"logo"**](#nodeattributionlogo): {<br/>
&emsp;&emsp;&emsp;&emsp;["enabled"](#nodeattributionlogo): ...<br/>
&emsp;&emsp;&emsp;&emsp;["altText"](#nodeattributionlogo): ...<br/>
&emsp;&emsp;&emsp;&emsp;["value"](#nodeattributionlogo): ...<br/>
&emsp;&emsp;&emsp;&emsp;["link"](#nodeattributionlogo): ...<br/>
&emsp;&emsp;&emsp;}<br/>
&emsp; }<br/>

[:arrow_up: back to Map](#map-json-tree)

>#### [**`extentSetNode JSON tree`**](#nodeextentsetnode)

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

>#### [**`extentWithReferenceNode JSON tree`**](#nodeextentwithreferencenode)

&emsp;{<br/>
&emsp;&emsp;&emsp;["xmin"](#nodeextentwithreferencenode): {<br/>
&emsp;&emsp;&emsp;["ymin"](#nodeextentwithreferencenode): {<br/>
&emsp;&emsp;&emsp;["xmax"](#nodeextentwithreferencenode): {<br/>
&emsp;&emsp;&emsp;["ymax"](#nodeextentwithreferencenode): {<br/>
&emsp;&emsp;&emsp;[**"spatialReference"**](##nodespatialreference): {<br/>
&emsp;&emsp;&emsp;&emsp;["wkid"](##nodespatialreferencewkid): ...<br/>
&emsp;&emsp;&emsp;},<br/>
&emsp; }<br/>

[:arrow_up: back to Map](#map-json-tree)

>#### [**`initialLayerSettings JSON tree`**](#nodeinitiallayersettings)

&emsp;&emsp;{<br/>
&emsp;&emsp;&emsp;["opacity"](#nodeinitiallayersettings): ...,<br/>
&emsp;&emsp;&emsp;["visibility"](#nodeinitiallayersettings): ...,<br/>
&emsp;&emsp;&emsp;["boundingBox"](#nodeinitiallayersettings): ...,<br/>
&emsp;&emsp;&emsp;["query"](#nodeinitiallayersettings): ...,<br/>
&emsp;&emsp;&emsp;["snapshot"](#nodeinitiallayersettings): ...,<br/>
&emsp;&emsp;&emsp;["hovertips"](#nodeinitiallayersettings): ...,<br/>
&emsp;&emsp;}<br/>

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
&emsp;&emsp;&emsp;["hasNorthPole"](#nodetileschemanodenorthpole): ...,<br/>
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
&emsp;&emsp;&emsp;&emsp;&emsp;["id"](#nodebasemapnodelayers): ...,<br/>
&emsp;&emsp;&emsp;&emsp;&emsp;["layerType"](#nodebasemapnodelayers): ...,<br/>
&emsp;&emsp;&emsp;&emsp;&emsp;["url"](#nodebasemapnodelayers): ...<br/>
&emsp;&emsp;&emsp;&emsp;},<br/>
&emsp;&emsp;&emsp;&emsp;{...},<br/>
&emsp;&emsp;&emsp;&emsp;{...}<br/>
&emsp;&emsp;&emsp;&emsp;],<br/>
&emsp;&emsp;&emsp;&emsp;["attribution"](#nodeattributionnode): ...,<br/>
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
&emsp;&emsp;&emsp;["**extent**"](#nodeextentwithreferencenode): {...},<br/>
&emsp;&emsp;&emsp;["**controls**"](#nodelegendentrycontrols): {...},<br/>
&emsp;&emsp;&emsp;["**disabledControls**"](#nodelegendentrycontrols): {...},<br/>
&emsp;&emsp;&emsp;["**state**"](#nodeinitiallayersettings): {...}<br/>
&emsp;&emsp;}<br/>

[:arrow_up: back to Map](#map-json-tree)

>#### [**`featureLayerNode JSON tree`**](#nodefeaturelayernode)

&emsp;&emsp;{<br/>
&emsp;&emsp;&emsp;["id"](#nodefeaturelayernodeid): ...,<br/>
&emsp;&emsp;&emsp;["name"](#nodefeaturelayernodename): ...,<br/>
&emsp;&emsp;&emsp;["url"](#nodefeaturelayernodeurl): ...,<br/>
&emsp;&emsp;&emsp;["refreshInterval"](#nodefeaturelayernoderefreshinterval): ...,<br/>
&emsp;&emsp;&emsp;["metadataUrl"](#nodefeaturelayernodemetadataurl): ...,<br/>
&emsp;&emsp;&emsp;["catalogueUrl"](#nodefeaturelayernodecatalogueurl): ...,<br/>
&emsp;&emsp;&emsp;["layerType"](#nodefeaturelayernodelayertype): ...,<br/>
&emsp;&emsp;&emsp;["toggleSymbology"](#nodefeaturelayernodetogglesymbology): {...},<br/>
&emsp;&emsp;&emsp;["tolerance"](#nodefeaturelayernodetolerance): {...},<br/>
&emsp;&emsp;&emsp;["**extent**"](#nodeextentwithreferencenode): {...},<br/>
&emsp;&emsp;&emsp;["**controls**"](#nodelegendentrycontrols): {...},<br/>
&emsp;&emsp;&emsp;["**disabledControls**"](#nodelegendentrycontrols): {...},<br/>
&emsp;&emsp;&emsp;["**state**"](#nodeinitiallayersettings): {...},<br/>
&emsp;&emsp;&emsp;["**table**"](#nodetablenode):<br/>
&emsp;&emsp;&emsp;&emsp;{<br/>
&emsp;&emsp;&emsp;&emsp;&emsp;[**`tableNode`**](#tablenode-json-tree)<br/>
&emsp;&emsp;&emsp;&emsp;}<br/>
&emsp;&emsp;}<br/>

[:arrow_up: back to Map](#map-json-tree)

>#### [**`wmsLayerNode JSON tree`**](#nodewmslayernode)

&emsp;&emsp;{<br/>
&emsp;&emsp;&emsp;["id"](#nodewmslayernodeid): ...,<br/>
&emsp;&emsp;&emsp;["name"](#nodewmslayernodename): ...,<br/>
&emsp;&emsp;&emsp;["url"](#nodewmslayernodeurl): ...,<br/>
&emsp;&emsp;&emsp;["refreshInterval"](#nodewmslayernoderefreshinterval): ...,<br/>
&emsp;&emsp;&emsp;["metadataUrl"](#nodewmslayernodemetadataurl): ...,<br/>
&emsp;&emsp;&emsp;["catalogueUrl"](#nodewmslayernodecatalogueurl): ...,<br/>
&emsp;&emsp;&emsp;["layerType"](#nodewmslayernodelayertype): ...,<br/>
&emsp;&emsp;&emsp;["featureInfoMimeType"](#nodewmslayernodefeatureinfomimetype): ...,<br/>
&emsp;&emsp;&emsp;["legendMimeType"](#nodewmslayernodelegendmimetype): ...,<br/>
&emsp;&emsp;&emsp;["**layerEntries**"](#nodewmslayernodelayerentries): [<br/>
&emsp;&emsp;&emsp;&emsp;{<br/>
&emsp;&emsp;&emsp;&emsp;&emsp;[**`wmsLayerEntryNode`**](#nodewmslayerentrynode-json-tree)<br/>
&emsp;&emsp;&emsp;&emsp;},<br/>
&emsp;&emsp;&emsp;&emsp;{...},<br/>
&emsp;&emsp;&emsp;&emsp;{...}<br/>
&emsp;&emsp;&emsp;],<br/>
&emsp;&emsp;&emsp;["**extent**"](#nodeextentwithreferencenode): {...},<br/>
&emsp;&emsp;&emsp;["**controls**"](#nodelegendentrycontrols): {...},<br/>
&emsp;&emsp;&emsp;["**disabledControls**"](#nodelegendentrycontrols): {...},<br/>
&emsp;&emsp;&emsp;["**state**"](#nodeinitiallayersettings): {...}<br/>
&emsp;&emsp;}<br/>

[:arrow_up: back to Map](#map-json-tree)

>#### [**`wmsLayerEntryNode JSON tree`**](#nodewmslayerentrynode)

&emsp;&emsp;{<br/>
&emsp;&emsp;&emsp;["id"](#nodewmslayerentrynodeid): ...,<br/>
&emsp;&emsp;&emsp;["name"](#nodewmslayerentrynodename): ...,<br/>
&emsp;&emsp;&emsp;["allStyles"](#nodewmslayerentrynodeallstyles): [...],<br/>
&emsp;&emsp;&emsp;["currentStyle"](#nodewmslayerentrynodecurrentstyle): ...,<br/>
&emsp;&emsp;&emsp;["**controls**"](#nodelegendentrycontrols): {...},<br/>
&emsp;&emsp;&emsp;["**state**"](#nodeinitiallayersettings): {...}<br/>
&emsp;&emsp;}<br/>

[:arrow_up: back to Map](#map-json-tree)

>#### [**`dynamicLayerNode JSON tree`**](#nodedynamiclayerNode)

&emsp;&emsp;{<br/>
&emsp;&emsp;&emsp;["id"](#nodedynamiclayernodeid): ...,<br/>
&emsp;&emsp;&emsp;["name"](#nodedynamiclayernodename): ...,<br/>
&emsp;&emsp;&emsp;["url"](#nodedynamiclayernodeurl): ...,<br/>
&emsp;&emsp;&emsp;["refreshInterval"](#nodedynamiclayernoderefreshinterval): ...,<br/>
&emsp;&emsp;&emsp;["metadataUrl"](#nodedynamiclayernodemetadataurl): ...,<br/>
&emsp;&emsp;&emsp;["catalogueUrl"](#nodedynamiclayernodecatalogueurl): ...,<br/>
&emsp;&emsp;&emsp;["layerType"](#nodedynamiclayernodelayertype): ...,<br/>
&emsp;&emsp;&emsp;["toggleSymbology"](#nodedynamiclayernodetogglesymbology): ...,<br/>
&emsp;&emsp;&emsp;["tolerance"](#nodedynamiclayernodetolerance): ...,<br/>
&emsp;&emsp;&emsp;["singleEntryCollapse"](#nodedynamiclayernodesingleentrycollapse): ...,<br/>
&emsp;&emsp;&emsp;["imageFormat"](#nodedynamiclayernodeimageformat): ...,<br/>
&emsp;&emsp;&emsp;["**layerEntries**"](#nodedynamiclayernodelayerentries): [<br/>
&emsp;&emsp;&emsp;&emsp;{<br/>
&emsp;&emsp;&emsp;&emsp;&emsp;[**`dynamicLayerEntryNode`**](#dynamiclayerentrynode-json-tree)<br/>
&emsp;&emsp;&emsp;&emsp;},<br/>
&emsp;&emsp;&emsp;&emsp;{...},<br/>
&emsp;&emsp;&emsp;&emsp;{...}<br/>
&emsp;&emsp;&emsp;],<br/>
&emsp;&emsp;&emsp;["**extent**"](#nodeextentwithreferencenode): {...},<br/>
&emsp;&emsp;&emsp;["**controls**"](#nodelegendentrycontrols): {...},<br/>
&emsp;&emsp;&emsp;["**disabledControls**"](#nodelegendentrycontrols): {...},<br/>
&emsp;&emsp;&emsp;["**state**"](#nodeinitiallayersettings): {...}<br/>
&emsp;&emsp;}<br/>

[:arrow_up: back to Map](#map-json-tree)

>#### [**`dynamicLayerEntryNode JSON tree`**](#nodedynamiclayerentrynode)

&emsp;&emsp;{<br/>
&emsp;&emsp;&emsp;["index"](#nodedynamiclayerentrynodeindex): ...,<br/>
&emsp;&emsp;&emsp;["name"](#nodedynamiclayerentrynodename): ...,<br/>
&emsp;&emsp;&emsp;["outfields"](#nodedynamiclayerentrynodeoutfields): ...,<br/>
&emsp;&emsp;&emsp;["stateOnly"](#nodedynamiclayerentrynodestateonly): ...,<br/>
&emsp;&emsp;&emsp;["**extent**"](#nodeextentwithreferencenode): {...},<br/>
&emsp;&emsp;&emsp;["**controls**"](#nodelegendentrycontrols): {...},<br/>
&emsp;&emsp;&emsp;["**state**"](#nodeinitiallayersettings): {...},<br/>
&emsp;&emsp;&emsp;["**table**"](#nodetablenode):<br/>
&emsp;&emsp;&emsp;&emsp;{<br/>
&emsp;&emsp;&emsp;&emsp;&emsp;[**`tableNode`**](#tablenode-json-tree)<br/>
&emsp;&emsp;&emsp;&emsp;}<br/>
&emsp;&emsp;}<br/>

[:arrow_up: back to Map](#map-json-tree)

>#### [**`tableNode JSON tree`**](#nodetablenode)

&emsp;&emsp;{<br/>
&emsp;&emsp;&emsp;["title"](#nodetablenodetitle): ...,<br/>
&emsp;&emsp;&emsp;["description"](#nodetablenodedescription): ...,<br/>
&emsp;&emsp;&emsp;["maximize"](#nodetablenodemaximize): ...,<br/>
&emsp;&emsp;&emsp;["search"](#nodetablenodesearch): ...,<br/>
&emsp;&emsp;&emsp;["applyMap"](#nodetablenodeapplymap): ...,<br/>
&emsp;&emsp;&emsp;["**columns**"](#nodecolumnsnode): [<br/>
&emsp;&emsp;&emsp;&emsp;&emsp;{<br/>
&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;[**`columnNode`**](#columnnode-json-tree)<br/>
&emsp;&emsp;&emsp;&emsp;&emsp;}<br/>
&emsp;&emsp;&emsp;&emsp;&emsp;{...},<br/>
&emsp;&emsp;&emsp;&emsp;&emsp;{...}<br/>
&emsp;&emsp;&emsp;&emsp;]<br/>
&emsp;&emsp;&emsp;["searchStrictMatch"](#nodetablenodesearchstrictmatch): ...,<br/>
&emsp;&emsp;&emsp;["printEnabled"](#nodetablenodeprintenabled): ...,<br/>
&emsp;&emsp;}<br/>

[:arrow_up: back to Map](#map-json-tree)

>#### [**`columnNode JSON tree`**](#nodecolumnnode)

&emsp;&emsp;{<br/>
&emsp;&emsp;&emsp;["data"](#columnnodedata): ...,<br/>
&emsp;&emsp;&emsp;["title"](#columnnodetitle): ...,<br/>
&emsp;&emsp;&emsp;["description"](#columnnodedescription): ...,<br/>
&emsp;&emsp;&emsp;["visible"](#columnnodevisible): ...,<br/>
&emsp;&emsp;&emsp;["width"](#columnnodewidth): ...,<br/>
&emsp;&emsp;&emsp;["sort"](#columnnodesort): ...,<br/>
&emsp;&emsp;&emsp;["searchable"](#columnnodesearchable): ...,<br/>
&emsp;&emsp;&emsp;["**filter**"](#nodefilternode): [<br/>
&emsp;&emsp;&emsp;&emsp;&emsp;{<br/>
&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;[**`filterNode`**](#filternode-json-tree)<br/>
&emsp;&emsp;&emsp;&emsp;&emsp;}<br/>
&emsp;&emsp;&emsp;&emsp;&emsp;{...},<br/>
&emsp;&emsp;&emsp;&emsp;&emsp;{...}<br/>
&emsp;&emsp;&emsp;&emsp;]<br/>
&emsp;&emsp;}<br/>

[:arrow_up: back to Map](#map-json-tree)

>#### [**`filterNode JSON tree`**](#nodefilternode)

&emsp;&emsp;{<br/>
&emsp;&emsp;&emsp;["type"](#filternodetype): ...,<br/>
&emsp;&emsp;&emsp;["value"](#filternodevalue): ...,<br/>
&emsp;&emsp;&emsp;["static"](#filternodestatic): ...<br/>
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


>### [node:attribution:_**`text`**_](#node--attribution--text)
>>Attribution text information.

| Name | Type | Description | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- | ------- | ------- |
| enabled | *boolean* | - | `true` | `"true"` | Map/Basemaps | Yes | Yes |
| value | *string* | Optional. Contains the attribution value. If empty, it will use copyright text from the server. | `-` | `-` | Map/Basemaps | Yes | Yes |



>### [node:attribution:_**`logo`**_](#node--attribution--logo)
>>Attribution logo.

| Name | Type | Description | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- | ------- | ------- |
| enabled | *boolean* | - | `true` | `true` | Map/Basemaps | Yes | Yes |
| value | *string* | URL for the image. | `-` | `"https://path2Image/myAttributionLogo.png"` | Map/Basemaps | Yes | Yes |
| altText | *string* | Alternate text for the image. | `-` | `"Attribution is here !"` | Map/Basemaps | Yes | Yes |
| link | *string* | URL to go to when clicked. | `-` | `http://www.canada.ca"` | Map/Basemaps | Yes | Yes |

[:arrow_up: back to attributionNode](#attributionnode-json-tree)
***

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
>>The service endpoint of the layer. It should match the type provided in [layerType]((#nodetileschemanodeoverviewurllayertype).

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *string* | - | `"https://services.arcgisonline.com/.../World_Street_Map/MapServer"` | Map/Extents and Levels of Details | Yes | Yes |

>### [node:tileSchemaNode:hasNorthPole](#node--tileschemanode--northpole)
>>Indicates if the map projection includes a north pole. Defaults to false to avoid errors.

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *boolean* | - | `true` | Map/Extents and Levels of Details | Yes | Yes |

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

[:arrow_up: back to extentNode](#extentnode-json-tree)
***

>### [node:_**`extentWithReferenceNode`**_](#node--extentwithreferencenode)
>>Extents coordinates in projection system used by the layer.

| Name | Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- | ------- |
| xmin | *number* | `-` | `-2681457` | Map/Layers | - | Yes |
| ymin | *number* | `-` | `-883440` | Map/Layers | - | Yes |
| xmax | *number* | `-` | `3549492` | Map/Layers | - | Yes |
| ymax | *number* | `-` | `3482193` | Map/Layers | - | Yes |

[:arrow_up: back to extentWithReferenceNode](#extentwithreferencenode-json-tree)
***

>### [node:_**`initialLayerSettings`**_](#node--initiallayersettings)
>>Initial layer settings.

| Name | Type | Description | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- | ------- | ------- |
| opacity | *number* | Initial opacity. | `1` | `true` | Map/Layers | Yes | - |
| visibility | *boolean* | Initial visibility setting. | `true` | `true` | Map/Layers | Yes | - |
| boundingBox | *boolean* | Display bounding box. | `false` | `true` | Map/Layers | Yes | - |
| query | *boolean* | Allow querying. | `true` | `true` | Map/Layers | Yes | - |
| snapshot | *boolean* | Retrieve all feature data immediately on load. | `false` | `true` | Map/Layers | Yes | - |
| hovertips | *boolean* | Disable hover tips. | `true` | `true` | Map/Layers | Yes | - |

[:arrow_up: back to initialLayerSettings](#initialLayerSettings-json-tree)
***

>### [node:_**`legendEntryControls`**_](#node--legendentrycontrols)
>>A list of all controls to be enabled on the specified layer. Possible values are:
`"opacity", "visibility", "boundingBox", "query", "snapshot", "metadata", "boundaryZoom", "refresh", "reload", "remove", "settings", "data", "styles"`

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *array* | - | `["opacity", "visibility", "boundingBox", "refresh", "reload", "remove", "settings"]` | Map/Layers | Yes | - |

[:arrow_up: back to layerNode](#layernode-json-tree)
***

>### [node:_**`baseMapNode`**_](#node--basemapnode)
>>BaseMaps node properties.

| Type | Author section | Advance | Required |
| ------- | ------- | ------- | ------- |
| *object* | Map/Basemaps | - | - |

>### [node:baseMapNode:_**`id`**_](#node--basemapnode--id)
>>A unique identifier for the basemap.

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *string* | - | `"baseRNCan_transport"` | Map/Basemaps | - | Yes |

>### [node:baseMapNode:_**`name`**_](#node--basemapnode--name)
>>Name of the basemap used for labeling.

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *string* | - | `"Transport with labels."` | Map/Basemaps | - | Yes |

>### [node:baseMapNode:_**`description`**_](#node--basemapnode--description)
>>Description of the basemap. Will be visible when basemap selector is expanded.Description of the basemap. Will be visible when basemap selector is expanded.

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *string* | - | `"This Canadian basemap provides geographic context with bilingual labels and an emphasis on transportation networks.  From Natural Resources Canada."` | Map/Basemaps | - | Yes |

>### [node:baseMapNode:_**`altText`**_](#node--basemapnode--alttext)
>>Alt text for the basemap thumbnail image.Alt text for the basemap thumbnail image.

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *string* | - | `"Transport with labels."` | Map/Basemaps | - | Yes |

>### [node:baseMapNode:_**`thumbnailUrl`**_](#node--basemapnode--thumbnailurl)
>>Path to image file to display in the basemap selector.

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *string* | - | `"https://path2Image/myThumbnailImage.png"` | Map/Basemaps | Yes | Yes |

>### [node:baseMapNode:_**`tileSchemaId`**_](#node--basemapnode--tileschemaid)
>The tile schema for this basemap (should reference [map.tileSchemas.id](#nodetileschemanodeid)).

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *string* | - | `"canadaLambert-01"` | Map/Basemaps | - | Yes |

>### [node:baseMapNode:_**`layers`**_](#node--basemapnode--layers)
>>A set of URLs which should be composited to form a basemap entry.

| Type | Author section | Advance | Required |
| ------- | ------- | ------- | ------- |
| *array* | Map/Basemaps | - | - |

Each item contains these three properties
| Name | Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- | ------- |
| id | *string* | `-` | `"CBMT"` | Map/Basemaps | Yes | Yes |
| layerType | *string* | `-` | `"esriFeature"` | Map/Basemaps | Yes | Yes |
| url | *string* | `-` | `"https://.../services/BaseMaps/CBMT3978/MapServer"` | Map/Basemaps | - | Yes |

[:arrow_up: back to baseMapNode](#basemapnode-json-tree)
***

>### [node:_**`basicLayerNode`**_](#node--basiclayernode)
>>Layers coming from either esri image or tile services.

| Type | Author section | Advance | Required |
| ------- | ------- | ------- | ------- |
| *object* | Map/Layers or Map/Extents and Levels of Details | - | - |

>### [node:basicLayerNode:_**`id`**_](#node--basiclayernode--id)
>>The id of the layer for referencing within the viewer (does not relate directly to any external service).

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *string* | - | `"basicLayer_1"` | Map/Layers or Map/Extents and Levels of Details | - | Yes |

>### [node:basicLayerNode:_**`name`**_](#node--basiclayernode--name)
>>The display name of the layer. If it is not present the viewer will make an attempt to scrape this information.

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *string* | - | `"Elevation"` | Map/Layers or Map/Extents and Levels of Details | - | Yes |

>### [node:basicLayerNode:_**`url`**_](#node--basiclayernode--url)
>>The service endpoint of the layer. It should match the type provided in [layerType](#nodebasiclayernodelayertype).

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *string* | - | `"https://.../arcgis/rest/services/tileService"` | Map/Layers or Map/Extents and Levels of Details | - | Yes |

>### [node:basicLayerNode:_**`refreshInterval`**_](#node--basiclayernode--refreshinterval)
>>The automatic refresh interval of the layer in minutes. Maximum interval is 100 minutes.

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *number* | `0` | `5` | Map/Layers or Map/Extents and Levels of Details | Yes | - |

>### [node:basicLayerNode:_**`metadataUrl`**_](#node--basiclayernode--metadataurl)
>>The metadata url of the layer service.

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *string* | `null` | `"https://.../metaDat"` | Map/Layers or Map/Extents and Levels of Details | Yes | - |

>### [node:basicLayerNode:_**`catalogueUrl`**_](#node--basiclayernode--catalogueurl)
>>The metadata url of the layer service.

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *string* | `null` | `"https://.../catalogue"` | Map/Layers or Map/Extents and Levels of Details | Yes | - |

>### [node:basicLayerNode:_**`layerType`**_](#node--basiclayernode--layertype)
>>Type of layer. Can be either `esriImage` or `esriTile`.

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *string* | `-` | `"esriFeature"` | Map/Layers or Map/Extents and Levels of Details | - | Yes |

[:arrow_up: back to basicLayerNode](#basiclayernode-json-tree)
***

>### [node:_**`featureLayerNode`**_](#node--featurelayernode)
>>Layers coming from an esri feature service.

| Type | Author section | Advance | Required |
| ------- | ------- | ------- | ------- |
| *object* | Map/Layers | - | - |

>### [node:featureLayerNode:_**`id`**_](#node--featurelayernode--id)
>>The id of the layer for referencing within the viewer (does not relate directly to any external service).

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *string* | - | `"featureLayer_1"` | Map/Layers | - | Yes |

>### [node:featureLayerNode:_**`name`**_](#node--featurelayernode--name)
>>The display name of the layer. If it is not present the viewer will make an attempt to scrape this information.

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *string* | - | `"Power plants"` | Map/Layers | - | Yes |

>### [node:featureLayerNode:_**`url`**_](#node--featurelayernode--url)
>>The service endpoint of the layer. It should match the type provided in [layerType](#nodefeaturelayernodelayertype).

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *string* | - | `"https://.../MapServer/20"` | Map/Layers | - | Yes |

>### [node:featureLayerNode:_**`refreshInterval`**_](#node--featurelayernode--refreshinterval)
>>The automatic refresh interval of the layer in minutes. Maximum interval is 100 minutes.

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *number* | `0` | `5` | Map/Layers | Yes | - |

>### [node:featureLayerNode:_**`metadataUrl`**_](#node--featurelayernode--metadataurl)
>>The metadata url of the layer service.

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *string* | `null` | `"https://.../metaDat"` | Map/Layers | Yes | - |

>### [node:featureLayerNode:_**`catalogueUrl`**_](#node--featurelayernode--catalogueurl)
>>The metadata url of the layer service.

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *string* | `null` | `"https://.../catalogue"` | Map/Layers | Yes | - |

>### [node:featureLayerNode:_**`layerType`**_](#node--featurelayernode--layertype)
>>Type of layer which can only be `esriFeature`.

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *string* | `-` | `"esriFeature"` | Map/Layers | - | Yes |

>### [node:featureLayerNode:_**`toggleSymbology`**_](#node--featurelayernode--togglesymbology)
>>Allows individual symbols to have visibility toggled on/off.

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *boolean* | `true` | `true` | Map/Layers | Yes | - |

>### [node:featureLayerNode:_**`tolerance`**_](#node--featurelayernode--tolerance)
>>Specifies the tolerance in pixels when determining if a feature was clicked. Should be non-negative integer.

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *boolean* | `5` | `8` | Map/Layers | Yes | - |

[:arrow_up: back to featureLayerNode](#featurelayernode-json-tree)
***

>### [node:_**`fileLayerNode`**_](#node--fileLayerNode)
>>Layers coming from file.

| Type | Author section | Advance | Required |
| ------- | ------- | ------- | ------- |
| *object* | Map/Layers | - | - |

>### [node:fileLayerNode:_**`id`**_](#node--fileLayerNode--id)
>>The id of the layer for referencing within the viewer (does not relate directly to any external service).

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *string* | - | `"featureLayer_1"` | Map/Layers | - | Yes |

>### [node:fileLayerNode:_**`name`**_](#node--fileLayerNode--name)
>>The display name of the layer.  If it is not present the viewer will make an attempt to scrape this information.

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *string* | - | `"Power plants"` | Map/Layers | - | Yes |

>### [node:fileLayerNode:_**`url`**_](#node--fileLayerNode--url)
>>The service endpoint of the layer. It should match the type provided in [layerType](#nodefileLayerNodelayertype).

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *string* | - | `"https://.../MapServer/20"` | Map/Layers | - | Yes |

>### [node:fileLayerNode:_**`refreshInterval`**_](#node--fileLayerNode--refreshinterval)
>>The automatic refresh interval of the layer in minutes. Maximum interval is 100 minutes.

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *number* | `0` | `5` | Map/Layers | Yes | - |

>### [node:fileLayerNode:_**`metadataUrl`**_](#node--fileLayerNode--metadataurl)
>>The metadata url of the layer service.

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *string* | `null` | `"https://.../metaDat"` | Map/Layers | Yes | - |

>### [node:fileLayerNode:_**`catalogueUrl`**_](#node--fileLayerNode--catalogueurl)
>>The catalogue url of the layer service.

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *string* | `null` | `"https://.../catalogue"` | Map/Layers | Yes | - |

>### [node:fileLayerNode:_**`layerType`**_](#node--fileLayerNode--layertype)
>>Type of layer which can only be `esriFeature`.

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *string* | `-` | `"esriFeature"` | Map/Layers | - | Yes |

>### [node:fileLayerNode:_**`toggleSymbology`**_](#node--fileLayerNode--togglesymbology)
>>Allows individual symbols to have visibility toggled on/off.

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *boolean* | `true` | `true` | Map/Layers | Yes | - |

>### [node:fileLayerNode:_**`tolerance`**_](#node--fileLayerNode--tolerance)
>>Specifies the tolerance in pixels when determining if a feature was clicked. Should be non-negative integer.

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *boolean* | `5` | `8` | Map/Layers | Yes | - |

[:arrow_up: back to fileLayerNode](#fileLayerNode-json-tree)
***

>### [node:_**`wmsLayerNode`**_](#node--wmslayernode)
>>Layers coming from an esri feature service.

| Type | Author section | Advance | Required |
| ------- | ------- | ------- | ------- |
| *object* | Map/Layers | - | - |

>### [node:wmsLayerNode:_**`id`**_](#node--wmslayernode--id)
>>The id of the layer for referencing within the viewer (does not relate directly to any external service).

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *string* | - | `"wmsLayer_1"` | Map/Layers | - | Yes |

>### [node:wmsLayerNode:_**`name`**_](#node--wmslayernode--name)
>>The display name of the layer. If it is not present the viewer will make an attempt to scrape this information.

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *string* | - | `"Power plants"` | Map/Layers | - | Yes |

>### [node:wmsLayerNode:_**`url`**_](#node--wmslayernode--url)
>>The service endpoint of the layer. It should match the type provided in [layerType](#nodewmslayernodelayertype).

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *string* | - | `"https://.../WMSServer"` | Map/Layers | - | Yes |

>### [node:wmsLayerNode:_**`refreshInterval`**_](#node--wmslayernode--refreshinterval)
>>The automatic refresh interval of the layer in minutes. Maximum interval is 100 minutes.

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *number* | `0` | `5` | Map/Layers | Yes | - |

>### [node:wmsLayerNode:_**`metadataUrl`**_](#node--wmslayernode--metadataurl)
>>The metadata url of the layer service.

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *string* | `null` | `"https://.../metaDat"` | Map/Layers | Yes | - |

>### [node:wmsLayerNode:_**`catalogueUrl`**_](#node--wmslayernode--catalogueurl)
>>The metadata url of the layer service.

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *string* | `null` | `"https://.../catalogue"` | Map/Layers | Yes | - |

>### [node:wmsLayerNode:_**`layerType`**_](#node--wmslayernode--layertype)
>>Type of layer which can only be `ogcWms`.

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *string* | `-` | `"ogcWms"` | Map/Layers | - | Yes |

>### [node:wmsLayerNode:_**`featureInfoMimeType`**_](#node--wmslayernode--featureinfomimetype)
>>If specified indicates that GetFeatureInfo should be enabled for this WMS and indicates the format that should be requested. Possible values are [ "text/html;fgpv=summary", "text/html", "text/plain", "application/json" ].

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *string* | `-` | `"text/plain"` | Map/Layers | - | - |

>### [node:wmsLayerNode:_**`legendMimeType`**_](#node--wmslayernode--legendmimetype)
>>If specified indicates that GetLegendGraphic should be enabled for this WMS and indicates the format that should be requested. Possible values are [ "image/png", "image/gif", "image/jpeg", "image/svg", "image/svg+xml" ].

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *string* | `-` | `"image/png"` | Map/Layers | - | - |

[:arrow_up: back to wmsLayerNode](#wmslayernode-json-tree)

***
>### [node:_**`wmsLayerEntryNode`**_](#node--wmslayerentrynode)
>>One layer entry in a WMS service.

| Type | Author section | Advance | Required |
| ------- | ------- | ------- | ------- |
| *object* | Map/Layers | - | - |

>### [node:wmsLayerEntryNode:_**`id`**_](#node--wmslayerentrynode--id)
>>The id of the layer entry in the WMS.

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *string* | - | `"wind_en"` | Map/Layers | - | Yes |

>### [node:wmsLayerEntryNode:_**`name`**_](#node--wmslayerentrynode--name)
>>A descriptive name for the layer.  To be used in the legend.

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *string* | - | `"Wind layer"` | Map/Layers | - | Yes |

>### [node:wmsLayerEntryNode:_**`allStyles`**_](#node--wmslayerentrynode--allstyles)
>>All the styles for the layer entry in the WMS.

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *array* | - | `[ "WINDARROW", "WINDARROWKMH", "WINDSPEED", "WINDSPEEDKMH" ]` | Map/Layers | - | Yes |

>### [node:wmsLayerEntryNode:_**`currentStyle`**_](#node--wmslayerentrynode--currentstyle)
>>The current style for the layer entry in the WMS.

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *string* | - | `"WINDSPEEDKMH"` | Map/Layers | Yes | - |

[:arrow_up: back to wmsLayerEntryNode](#wmslayerentrynode-json-tree)

***
>### [node:_**`dynamicLayerNode`**_](#node--dynamiclayernode)
>>Layers coming from an esri feature service.

| Type | Author section | Advance | Required |
| ------- | ------- | ------- | ------- |
| *object* | Map/Layers | - | - |

>### [node:dynamicLayerNode:_**`id`**_](#node--dynamiclayernode--id)
>>The id of the layer for referencing within the viewer (does not relate directly to any external service).

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *string* | - | `"dynamicLayer_1"` | Map/Layers | - | Yes |

>### [node:dynamicLayerNode:_**`name`**_](#node--dynamiclayernode--name)
>>The display name of the layer. If it is not present the viewer will make an attempt to scrape this information.

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *string* | - | `"Power plants"` | Map/Layers | - | Yes |

>### [node:dynamicLayerNode:_**`url`**_](#node--dynamiclayernode--url)
>>The service endpoint of the layer. It should match the type provided in [layerType](#nodedynamiclayernodelayertype).

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *string* | - | `"https://.../MapServer/"` | Map/Layers | - | Yes |

>### [node:dynamicLayerNode:_**`refreshInterval`**_](#node--dynamiclayernode--refreshinterval)
>>The automatic refresh interval of the layer in minutes. Maximum interval is 100 minutes.

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *number* | `0` | `5` | Map/Layers | Yes | - |

>### [node:dynamicLayerNode:_**`metadataUrl`**_](#node--dynamiclayernode--metadataurl)
>>The metadata url of the layer service.

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *string* | `null` | `"https://.../metaDat"` | Map/Layers | Yes | - |

>### [node:dynamicLayerNode:_**`catalogueUrl`**_](#node--dynamiclayernode--catalogueurl)
>>The metadata url of the layer service.

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *string* | `null` | `"https://.../catalogue"` | Map/Layers | Yes | - |

>### [node:dynamicLayerNode:_**`layerType`**_](#node--dynamiclayernode--layertype)
>>Type of layer which can only be `esriDynamic`.

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *string* | `-` | `"esriDynamic"` | Map/Layers | - | Yes |

>### [node:dynamicLayerNode:_**`toggleSymbology`**_](#node--dynamiclayernode--togglesymbology)
>>Allows individual symbols to have visibility toggled on/off.

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *boolean* | `true` | `true` | Map/Layers | Yes | - |

>### [node:dynamicLayerNode:_**`singleEntryCollapse`**_](#node--dynamiclayernode--singleentrycollapse)
>>Indicates that the dynamic layer with a single layer entry should be rendered without the root group.

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *boolean* | `true` | `true` | Map/Layers | - | - |

>### [node:dynamicLayerNode:_**`tolerance`**_](#node--dynamiclayernode--tolerance)
>>Specifies the tolerance in pixels when determining if a feature was clicked. Should be non-negative integer.

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *boolean* | `5` | `8` | Map/Layers | Yes | - |

[:arrow_up: back to dynamicLayerNode](#dynamiclayernode-json-tree)
***

>### [node:_**`dynamicLayerEntryNode`**_](#node--dynamiclayerentrynode)
>>Layer entry coming from an esri dynamic service.

| Type | Author section | Advance | Required |
| ------- | ------- | ------- | ------- |
| *object* | Map/Layers | - | - |

>### [node:dynamicLayerEntryNode:_**`index`**_](#node--dynamiclayerentrynode--id)
>>The index of the layer in the map service.

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *number* | - | `0` | Map/Layers | - | Yes |

>### [node:dynamicLayerEntryNode:_**`name`**_](#node--dynamiclayerentrynode--name)
>>A descriptive name for the layer, can override the name coming from the service.

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *string* | - | `"Solar stations"` | Map/Layers | - | - |

>### [node:dynamicLayerEntryNode:_**`outfields`**_](#node--dynamiclayerentrynode--outfields)
>>A descriptive name for the layer, can override the name coming from the service.

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *string* | - | `"Solar stations"` | Map/Layers | Yes | - |

>### [node:dynamicLayerEntryNode:_**`stateOnly`**_](#node--dynamiclayerentrynode--stateonly)
>>A flag indicating this entry is only for state tracking (i.e. it should not be displayed on the UI and all of the controls will be ignored, but the layer itself will be displayed on the map with the given state settings).

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *boolean* | `false` | `true` | Map/Layers | Yes | - |

[:arrow_up: back to dynamicLayerNode](#dynamiclayernode-json-tree)
***

>### [node:_**`tableNode`**_](#node--tablenode)
>>Specifies how layers columns and global search are set.

| Type | Author section | Advance | Required |
| ------- | ------- | ------- | ------- |
| *object* | Map/Layers | Yes | - |

>### [node:tableNode:_**`title`**_](#node--tablenode--title)
>>Specifies the table title to apply.

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *string* | - | `"GeoChronology"` | Map/Layers | Yes | - |

>### [node:tableNode:_**`description`**_](#node--tablenode--description)
>>Specifies the additional information to display in the setting panel to give more information about a table.

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *string* | - | `"Here is my description."` | Map/Layers | Yes | - |

>### [node:tableNode:_**`maximize`**_](#node--tablenode--maximize)
>>Specifies the default table size when first open. True: maximize view; False: split view.

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *boolean* | `false` | `true` | Map/Layers | Yes | - |

>### [node:tableNode:_**`search`**_](#node--tablenode--search)
>>Specifies the default filter to apply to a table (for global search).

| Name | Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- | ------- |
| enabled | *boolean* | `true` | `true` | Map/Layers | Yes | ------- |
| value | *string* | `null` | `"LAST_UPDATED:2005-02-22"` | Map/Layers | Yes | ------- |

>### [node:tableNode:_**`applyMap`**_](#node--tablenode--applymap)
>>Specifies if the default filters (from columns filter) are apply to the map (definition query). True: it is applied; False: it is not applied.

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *boolean* | `false` | `true` | Map/Layers | Yes | - |

[:arrow_up: back to tableNode](#tablenode-json-tree)
***
>### [node:tableNode:_**`searchStrictMatch`**_](#node--tablenode--searchStrictMatch)
>>Specifies if text must match identical (including accents) when filtering and searching. Defaults to false allowing for accents and such to be ignored. Used in table plugins (if applicable). Else has no effect.

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *boolean* | `false` | `true` | Map/Layers | Yes | - |

[:arrow_up: back to tableNode](#tablenode-json-tree)
***
>### [node:tableNode:_**`printEnabled`**_](#node--tablenode--printEnabled)
>>Specifies if print button is available on the datatable. Defaults to false.

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *boolean* | `false` | `true` | Map/Layers | Yes | - |

[:arrow_up: back to tableNode](#tablenode-json-tree)
***
>### [node:_**`columnNode`**_](#node--columnnode)
>>Specifies option for each column. OID field must be present, if not data will not appear. The order they appears inside the table is the same as the order of this array.

| Type | Author section | Advance | Required |
| ------- | ------- | ------- | ------- |
| *object* | Map/Layers | Yes | - |

>### [node:columnNode:_**`data`**_](#node--columnnode--data)
>>Specifies the field name (data) to use to link to the layer column. Must exist in the layer.

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *string* | - | `"LAST_UPDATED"` | Map/Layers | Yes | - |

>### [node:columnNode:_**`title`**_](#node--columnnode--title)
>>Specifies the column title, uses the layer column name or alias if missing.

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *string* | - | `"Last updated"` | Map/Layers | Yes | - |

>### [node:columnNode:_**`description`**_](#node--columnnode--description)
>>Specifies the additional information to display in the setting panel to give more information about a column. Do not add description if missing.

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *string* | - | `"Here is my description."` | Map/Layers | Yes | - |

>### [node:columnNode:_**`visible`**_](#node--columnnode--visible)
>>Specifies if column is visible by default. True: column is visible; False: column is hidden.

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *boolean* | `true` | `true` | Map/Layers | Yes | - |

>### [node:columnNode:_**`width`**_](#node--columnnode--width)
>>Specifies the column width. If missing, calculated column width will be used.

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *number* | - | `12` | Map/Layers | Yes | - |

>### [node:columnNode:_**`sort`**_](#node--columnnode--sort)
>>Specifies if column is sort. If missing, no sort is applied. Possible values are ["asc", "desc"].

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *string* | - | `"asc"` | Map/Layers | Yes | - |

>### [node:columnNode:_**`searchable`**_](#node--columnnode--searchable)
>>Specifies if column can be filtered. True: column can be filtered; False: no filter can be applied from global search or filter. If this is false, do not set a filter because it will not be use.

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *boolean* | `true` | `true` | Map/Layers | Yes | - |

[:arrow_up: back to columnNode](#columnnode-json-tree)
***

>### [node:_**`filterNode`**_](#node--filternode)
>>Specifies the filter information for a column.

| Type | Author section | Advance | Required |
| ------- | ------- | ------- | ------- |
| *object* | Map/Layers | Yes | - |

>### [node:filterNode:_**`type`**_](#node--filternode--type)
>>Specifies the filter type to use. If type is not specified, data field type will be use. String filter can be string or selector. Other filter must be the same type. If not, apply on map will fails. Possible values are [ "string", "number", "date", "selector" ].

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *string* | - | `"date"` | Map/Layers | Yes | Yes |

>### [node:filterNode:_**`value`**_](#node--filternode--value)
>>Specifies the filter value. For date and number values are split by ',' (e.g. 0,100 or for date 2005-02-22,2005-04-30). Dates need to be in the format YYYY-MM-DD. For selector it needs an array like [\"Fire\", \"Fatality\"].

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *string* | - | `"2005-02-22,2005-04-30"` | Map/Layers | Yes | - |

>### [node:filterNode:_**`static`**_](#node--filternode--static)
>>Specifies if filter is modifiable. True: filter value can't be modified; False: filter value can be modified.

| Type | Default value | Example | Author section | Advance | Required |
| ------- | ------- | ------- | ------- | ------- | ------- |
| *boolean* | `false` | `true` | Map/Layers | Yes | - |

[:arrow_up: back to filterNode](#filternode-json-tree)

[:arrow_up: back to Map top](#Map)
## **Annex**