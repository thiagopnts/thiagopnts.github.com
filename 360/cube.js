var canvas1 = document.getElementById('canvas1');
var canvas2 = document.getElementById('canvas2');
var canvas3 = document.getElementById('canvas3');
var canvas4 = document.getElementById('canvas4');
var canvas5 = document.getElementById('canvas5');
var canvas6 = document.getElementById('canvas6');
var ctx1 = canvas1.getContext('2d');
var ctx2 = canvas2.getContext('2d');
var ctx3 = canvas3.getContext('2d');
var ctx4 = canvas4.getContext('2d');
var ctx5 = canvas5.getContext('2d');
var ctx6 = canvas6.getContext('2d');
var video = document.getElementById('video');
video.play();
var draw = function() {
    ctx1.clearRect(0, 0, 512, 512);
    ctx2.clearRect(0, 0, 512, 512);
    ctx3.clearRect(0, 0, 512, 512);
    ctx4.clearRect(0, 0, 512, 512);
    ctx5.clearRect(0, 0, 512, 512);
    ctx6.clearRect(0, 0, 512, 512);

    ctx2.drawImage(video, 0, 0, 512, 512, 0, 0, 512, 512);
    ctx1.drawImage(video, 512, 0, 512, 512, 0, 0, 512, 512);
    ctx3.drawImage(video, 1024, 0, 512, 512, 0, 0, 512, 512);
    ctx4.drawImage(video, 0, 512, 512, 512, 0, 0, 512, 512);
    ctx5.drawImage(video, 512, 512, 512, 512, 0, 0, 512, 512);
    ctx6.drawImage(video, 1024, 512, 512, 512, 0, 0, 512, 512);

    requestAnimationFrame(draw)
};

video.addEventListener('play', function() {
    console.log('playing');
    draw();
});

var texture_placeholder,
            isUserInteracting = false,
            onMouseDownMouseX = 0, onMouseDownMouseY = 0,
            lon = 90, onMouseDownLon = 0,
            lat = 0, onMouseDownLat = 0,
            phi = 0, theta = 0,
            target = new THREE.Vector3();

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, 720 / 640, 1, 1100);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(720, 460);
document.body.appendChild(renderer.domElement);

var texture = new THREE.Texture(canvas1);
var texture2 = new THREE.Texture(canvas2);
var texture3 = new THREE.Texture(canvas3);
var texture4 = new THREE.Texture(canvas4);
var texture5 = new THREE.Texture(canvas5);
var texture6 = new THREE.Texture(canvas6);

var geometry = new THREE.BoxGeometry(300, 300, 300, 7, 7, 7);

var materials = [];

//texture3 = sky
//texture4 = middle bike
//texture6 = back bike
//texture = left bike
//texture2 = right bike

materials.push(new THREE.MeshBasicMaterial({map: texture2})); // ok
materials.push(new THREE.MeshBasicMaterial({map: texture}));  // ok
materials.push(new THREE.MeshBasicMaterial({map: texture3})); // ok
materials.push(new THREE.MeshBasicMaterial({map: texture4})); // ok
materials.push(new THREE.MeshBasicMaterial({map: texture5})); // ok
materials.push(new THREE.MeshBasicMaterial({map: texture6})); // ok

var material = new THREE.MeshFaceMaterial(materials);
//var material = new THREE.MeshBasicMaterial({color: 0xFF0000});
window.cube = new THREE.Mesh(geometry, material);

cube.scale.x = -1;

scene.add(cube);

for (var i = 0; i < cube.geometry.vertices.length; i++) {
    var v = cube.geometry.vertices[i];
    v.normalize();
    v.multiplyScalar(550);
}



//setTimeout(function() {
//var vertices = cube.geometry.vertices;
//var sqrt = Math.sqrt;
//
//
//for (var i = 0; i < vertices.length; i++) {
//    console.log('before', cube.geometry.vertices[i].x);
//    cube.geometry.dynamic = true;
//    var v = vertices[i];
//    var dx = v.x * sqrt(1.0 - ((v.y * v.y) / 2.0) - ((v.z * v.z) / 2.0) + ((v.y * v.y * v.z * v.z) / 3.0));
//    var dy = v.y * sqrt(1.0 - ((v.z * v.z) / 2.0) - ((v.x * v.x) / 2.0) + ((v.z * v.z * v.x * v.x) / 3.0));
//    var dz = v.z * sqrt(1.0 - ((v.x * v.x) / 2.0) - ((v.y * v.y) / 2.0) + ((v.x * v.x * v.y * v.y) / 3.0));
//    vertices[i].set(dx, dy, dz);
//    console.log('after', cube.geometry.vertices[i].x);
//    cube.geometry.verticesNeedUpdate = true;
//}
//}, 3000)

document.addEventListener( 'mousedown', onDocumentMouseDown, false );
document.addEventListener( 'mousemove', onDocumentMouseMove, false );
document.addEventListener( 'mouseup', onDocumentMouseUp, false );
document.addEventListener( 'mousewheel', onDocumentMouseWheel, false );

function onDocumentMouseDown( event ) {

    event.preventDefault();

    isUserInteracting = true;

    onPointerDownPointerX = event.clientX;
    onPointerDownPointerY = event.clientY;

    onPointerDownLon = lon;
    onPointerDownLat = lat;

}

function onDocumentMouseMove( event ) {

    if ( isUserInteracting === true ) {

        lon = ( onPointerDownPointerX - event.clientX ) * 0.2 + onPointerDownLon;
        lat = ( event.clientY - onPointerDownPointerY ) * 0.2 + onPointerDownLat;

    }
}

function onDocumentMouseUp( event ) {

    isUserInteracting = false;

}

function onDocumentMouseWheel( event ) {

    // WebKit

    if ( event.wheelDeltaY ) {

        camera.fov -= event.wheelDeltaY * 0.05;

    // Opera / Explorer 9

    } else if ( event.wheelDelta ) {

        camera.fov -= event.wheelDelta * 0.05;

    // Firefox

    } else if ( event.detail ) {

        camera.fov -= event.detail * 0.05;

    }

    camera.updateProjectionMatrix();

}

var render =  function() {
    requestAnimationFrame(render);
    texture.needsUpdate = true;
    texture2.needsUpdate = true;
    texture3.needsUpdate = true;
    texture4.needsUpdate = true;
    texture5.needsUpdate = true;
    texture6.needsUpdate = true;

if ( isUserInteracting === false ) {

                    lon += 0.1;

                }

                lat = Math.max( - 85, Math.min( 85, lat ) );
                phi = THREE.Math.degToRad( 90 - lat );
                theta = THREE.Math.degToRad( lon );

                target.x = 500 * Math.sin( phi ) * Math.cos( theta );
                target.y = 500 * Math.cos( phi );
                target.z = 500 * Math.sin( phi ) * Math.sin( theta );

                camera.position.copy( target ).negate();
                camera.lookAt( target );


    renderer.render(scene, camera);
}

render();
