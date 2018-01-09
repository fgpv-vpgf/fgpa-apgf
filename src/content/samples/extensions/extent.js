// set default bound if user close the viewer without changing the extent
localStorage.setItem('mapextent', '-124,35,-12,57');

// subscribe to extent change event to capture the new extent
mapInstance.boundsChanged.subscribe(setExtent);

function setExtent() {
    // set the new extent inside local storage to be retreive by the author later
    // use real extent in lcc because using lat/long and reproject it gives wrong result
    localStorage.setItem('mapextent', JSON.stringify(RZ.mapById('fgpmap').mapI.extent));
}
