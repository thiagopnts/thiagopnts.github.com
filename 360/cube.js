var angles = [1, 2, 3, 4, 5, 6].map(function() {
    var canvas = document.createElement('canvas');
    canvas.height = 512;
    canvas.width = 512;
    return canvas;
});

var contexts = angles.map(function(canvas) {
    return canvas.getContext('2d');
})

var video = document.getElementById('video');

var frames = [
    [0, 0],
    [512, 0],
    [1024, 0],
    [0, 512],
    [512, 512],
    [1024, 512]
];

var draw = function() {
    frames.forEach(function(frame, i) {
        contexts[i].clearRect(0, 0, 512, 512);
        contexts[i].drawImage(video, frame[0], frame[1], 512, 512, 0, 0, 512, 512);
    });

    requestAnimationFrame(draw)
};
draw();

var isUserInteracting = false;
var onMouseDownMouseX = 0;
var onMouseDownMouseY = 0;
var lon = 90;
var onMouseDownLon = 0;
var lat = 0;
var onMouseDownLat = 0;
var phi = 0;
var theta = 0;
var target = new THREE.Vector3();

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, 720 / 640, 1, 1100);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(720, 460);
document.body.appendChild(renderer.domElement);

var materials = angles.map(function(angle) {
    return new THREE.MeshBasicMaterial({
        map: new THREE.Texture(angle),
        overdraw: 0.5
    });
});

var geometry = new THREE.BoxGeometry(300, 300, 300, 7, 7, 7);

var material = new THREE.MeshFaceMaterial(materials);
window.cube = new THREE.Mesh(geometry, material);

cube.scale.x = -1;

scene.add(cube);

for (var i = 0; i < cube.geometry.vertices.length; i++) {
    var v = cube.geometry.vertices[i];
    v.normalize();
    v.multiplyScalar(550);
}

document.addEventListener('mousedown', onDocumentMouseDown, false);
document.addEventListener('mousemove', onDocumentMouseMove, false);
document.addEventListener('mouseup', onDocumentMouseUp, false);

function onDocumentMouseUp() {
    isUserInteracting = false;
}

function onDocumentMouseDown(event) {
    event.preventDefault();

    isUserInteracting = true;

    onPointerDownPointerX = event.clientX;
    onPointerDownPointerY = event.clientY;

    onPointerDownLon = lon;
    onPointerDownLat = lat;
}

function onDocumentMouseMove(event) {
    if (isUserInteracting) {
        lon = (onPointerDownPointerX - event.clientX) * 0.2 + onPointerDownLon;
        lat = (event.clientY - onPointerDownPointerY) * 0.2 + onPointerDownLat;
    }
}


var render =  function() {
    materials.forEach(function(material) {
        material.map.needsUpdate = true;
    });

    lat = Math.max(-85, Math.min(85, lat) );
    phi = THREE.Math.degToRad(90 - lat);
    theta = THREE.Math.degToRad(lon);

    target.x = 500 * Math.sin(phi) * Math.cos(theta);
    target.y = 500 * Math.cos(phi);
    target.z = 500 * Math.sin(phi) * Math.sin(theta);

    camera.position.copy(target).negate();
    camera.lookAt(target);

    renderer.render(scene, camera);
    requestAnimationFrame(render);
}

render();
