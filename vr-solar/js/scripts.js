// build UI
function buildUI(planets) {
  var scene = document.querySelector('a-scene'),
      rotationScale = 1,// rotational speed multiplier
      rotationDefault = '5000',// earth's rotation, in ms
      sizeScale = 10,// controls planet size
      displacementScale = 100;// multiplier applied to standard a-frame distance "unit"

  // Note:
  // displacementScale determines the "size" of one unit (aU),
  // which is the distance from earth to the sun. The relative ratio
  // of this to sizeScale (planet size) is what gives the solar system
  // proportion. In reality, 1aU = (11,000 * earth diameter) so we are scaling
  // down by a factor of 1000 for ease of navigation (otherwise an earth
  // scaled to a basketball size would take about 11K "VR Steps" to fly to).
  // The ratio of size / displacement scale should be at least 1:10 to avoid
  // clipping, and the planet size determines the texture detail.

  console.dir(planets);

  // loop through json and forge the solar system
  $(planets).each(function (index) {
    console.log(sizeScale);
    var planet = this,
        initialRotation = '' + planet.axial_tilt_degrees + ' 0 0',
        finalRotation = '' + planet.axial_tilt_degrees + ' 360 0',
        rotationSpeed = rotationScale * planet.rotation_period_days,
        diameter = sizeScale * planet.relative_equatorial_diameter,
        displacement = displacementScale * -planet.distance_au,
        sphere = document.createElement('a-sphere');

    // different layers and resolutions are available
    // for each planet
    if (this.name == 'earth') {
      texture = 'img/8k_earth_daymap.jpg';
    } else if (this.name == 'uranus' || 'neptune' || 'pluto' ){
      texture = 'img/2k_' + planet.name + '.jpg';
    } else {
      texture = 'img/8k_' + planet.name + '.jpg';
    }

    // build planet
    sphere.setAttribute('animation', {
      property: 'rotation',
      from: initialRotation,
      to: finalRotation,
      dur: rotationScale * rotationDefault,
      easing: 'linear',
      loop: 'true'
    });
    sphere.setAttribute('material', { shader: 'flat', src: texture });
    sphere.setAttribute('position', { x: 0, y: 0, z: displacement });
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