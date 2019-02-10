//*Mapbox Initial file
mapboxgl.accessToken = 'pk.eyJ1IjoiaGFuZ3NoZSIsImEiOiJjamxkNnN6dTgwODZqM3FtaWJmaXZ6ZGtnIn0.-1sho4utN-F5kNO8we9Cpw';
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/hangshe/cjn2q0vwy6rn82ss6z24rpcia',
  center: [120, 30.000000],
  zoom: 3.0
});

/*Create show and hide function*/
var toggleableLayerIds = [ 'Port', 'ECA-Zone', 'testgreatlink'];  //找到每个layer得 id
for (var i = 0; i < toggleableLayerIds.length; i++) {
    var id = toggleableLayerIds[i];   //设置循环layer id

    var link = document.createElement('a');  //插入链接a,让layer和其他的相链接
    link.href = '#';  //
    link.className = 'active';
    link.textContent = id;  //

    link.onclick = function (e) {
        var clickedLayer = this.textContent;  //点击链接，获取layer的id
        e.preventDefault();
        e.stopPropagation();

        var visibility = map.getLayoutProperty(clickedLayer, 'visibility');

        if (visibility === 'visible') {
            map.setLayoutProperty(clickedLayer, 'visibility', 'none');
            this.className = '';
        } else {
            this.className = 'active';
            map.setLayoutProperty(clickedLayer, 'visibility', 'visible');
        }
    };

    var layers = document.getElementById('menu');
    layers.appendChild(link);
};



//Display Route info

map.on('click', 'testgreatlink', function (e) {
        var coordinates = e.features[0].geometry.coordinates.slice();
        var description = e.features[0].properties.OwnerShip;
        var eta = e.features[0].properties.ETA;
        var speed = e.features[0].properties.AverageOGSpeed;
        var waveh = e.features[0].properties.WaveHt;
        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        new mapboxgl.Popup({className:'popupvslclass'})
            .setLngLat(coordinates)
            .setHTML('Vessel Name: '+ description + '<br>' +'Speed: '+ speed + ' Knot'+'<br>' + 
                    'Wave Height: ' + waveh +' M')
            .addTo(map);
    });

    // Change the cursor to a pointer when the mouse is over the places layer.
    map.on('mouseenter', 'testgreatlink', function () {
        map.getCanvas().style.cursor = 'pointer';
    });

    // Change it back to a pointer when it leaves.
    map.on('mouseleave', 'testgreatlink', function () {
        map.getCanvas().style.cursor = '';
    });


