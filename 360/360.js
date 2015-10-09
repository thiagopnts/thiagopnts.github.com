
var canvas = document.getElementById('surface');
var ctx = canvas.getContext('2d');
var video = document.getElementById('video');
canvas.height = 512;
canvas.width = 512 * 4;
video.play();

var draw = function() {
    ctx.clearRect(0, 0, 512, 512 * 4);

    ctx.drawImage(video, 512, 0, 512, 512, 0, 0, 512, 512);

    ctx.drawImage(video, 512, 512, 512, 512, 512 , 0, 512, 512);

    ctx.drawImage(video, 0, 0, 512, 512, 512 * 2, 0, 512, 512);

    ctx.drawImage(video, 1024, 512, 512, 512, 512 * 3, 0, 512, 512);

    requestAnimationFrame(draw)
};

document.getElementById('video').addEventListener('play', function() {
    console.log('loaded');
    draw();
});

var camera, scene, renderer;

var isUserInteracting = false;
var onMouseDownMouseX = 0;
var onMouseDownMouseY = 0;
var lon = 135;
var onMouseDownLon = 0;
var lat = 0;
var onMouseDownLat = 0;
var phi = 0;
var theta = 0;

init();
animate();

function init() {

    var container = document.getElementById('container');

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1100);
    camera.target = new THREE.Vector3(0, 0, 0);

    scene = new THREE.Scene();

    var geometry = new THREE.SphereGeometry(500, 60, 40);
    geometry.scale(-1, 1, 1);

    var canvas = document.getElementById('surface');
    var texture = new THREE.Texture(canvas);
    texture.minFilter = THREE.LinearFilter;
    texture.needsUpdate = true;
    var material = new THREE.MeshBasicMaterial({
        map: texture
    });

    var mesh = new THREE.Mesh(geometry, material);

    scene.add(mesh);

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    document.addEventListener('mousedown', onDocumentMouseDown, false);
    document.addEventListener('mousemove', onDocumentMouseMove, false);
    document.addEventListener('mouseup', onDocumentMouseUp, false);
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
    if (isUserInteracting === true) {
        lon = (onPointerDownPointerX - event.clientX) * 0.1 + onPointerDownLon;
        lat = (event.clientY - onPointerDownPointerY) * 0.1 + onPointerDownLat;
    }
}

function onDocumentMouseUp(event) {
    isUserInteracting = false;
}


function animate() {
    requestAnimationFrame(animate);
    update();
}

function update() {

    lat = Math.max(-85, Math.min(85, lat));
    phi = THREE.Math.degToRad(90 - lat);
    theta = THREE.Math.degToRad(lon);

    camera.target.x = 500 * Math.sin(phi) * Math.cos(theta);
    camera.target.y = 500 * Math.cos(phi);
    camera.target.z = 500 * Math.sin(phi) * Math.sin(theta);

    camera.lookAt(camera.target);
    scene.children[0].material.map.needsUpdate = true;
    renderer.render(scene, camera);
}


