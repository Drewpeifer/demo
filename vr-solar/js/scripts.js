// build UI
function buildUI(planets) {
  var scene = document.querySelector('a-scene');

  console.dir(planets);

  // loop through json and forge the solar system
  $(planets).each(function (index) {
    var planet = this,
        diameter = planet.relative_equatorial_diameter,
        displacement = 10 * planet.distance_au,
        sphere = document.createElement('a-sphere');

    if (this.name == 'earth') {
      texture = '../img/2k_earth_daymap.jpg';
    } else {
      texture = '../img/2k_' + planet.name + '.jpg';
    }

    sphere.setAttribute('material', { shader: 'flat', src: texture });

    // build planet
    sphere.setAttribute('position', { x: 0, y: 0, z: -displacement });
    sphere.setAttribute('scale', { x: diameter, y: diameter, z: diameter });
    // add planet to solar system
    scene.appendChild(sphere);
  });
}

$(function() {
  $.getJSON('data/planets.json', function(data) {
    AFRAME.registerComponent('solar-system', {
      init: buildUI(data)
    });
  });
});