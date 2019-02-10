//*Get Port info
map.on('click', 'Port', function(e) {
    
    //下面是，在mapbox中，找到layer里面的相关feature
var ports = map.queryRenderedFeatures(e.point, {
    layers: ['Port'] 
  });
  if (!ports.length) {
    return;
  }
  var port = ports[0];
  var popup = new mapboxgl.Popup({ offset: [0, -15], className:'popupclass'})
    .setLngLat(port.geometry.coordinates)
    .setHTML('PORT NAME: ' + port.properties.name + '<br>'+ 'PORT CODE: ' + port.properties.locode)
    .addTo(map);
});  


