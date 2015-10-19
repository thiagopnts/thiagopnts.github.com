(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("Clappr"), require("THREE"));
	else if(typeof define === 'function' && define.amd)
		define(["Clappr", "THREE"], factory);
	else if(typeof exports === 'object')
		exports["Playback360"] = factory(require("Clappr"), require("THREE"));
	else
		root["Playback360"] = factory(root["Clappr"], root["THREE"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';Object.defineProperty(exports,'__esModule',{value:true});var _createClass=(function(){function defineProperties(target,props){for(var i=0;i < props.length;i++) {var descriptor=props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if('value' in descriptor)descriptor.writable = true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};})();var _get=function get(_x,_x2,_x3){var _again=true;_function: while(_again) {var object=_x,property=_x2,receiver=_x3;desc = parent = getter = undefined;_again = false;if(object === null)object = Function.prototype;var desc=Object.getOwnPropertyDescriptor(object,property);if(desc === undefined){var parent=Object.getPrototypeOf(object);if(parent === null){return undefined;}else {_x = parent;_x2 = property;_x3 = receiver;_again = true;continue _function;}}else if('value' in desc){return desc.value;}else {var getter=desc.get;if(getter === undefined){return undefined;}return getter.call(receiver);}}};function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError('Cannot call a class as a function');}}function _inherits(subClass,superClass){if(typeof superClass !== 'function' && superClass !== null){throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__ = superClass;}var _clappr=__webpack_require__(1);var _threeJs=__webpack_require__(2);var Playback360=(function(_HTML5Video){_inherits(Playback360,_HTML5Video);function Playback360(options){_classCallCheck(this,Playback360);_get(Object.getPrototypeOf(Playback360.prototype),'constructor',this).call(this,options);this.options = options;}_createClass(Playback360,[{key:'init',value:function init(){var _this=this;this.$el.hide();this.angles = [1,2,3,4,5,6].map(function(){var canvas=document.createElement('canvas');canvas.height = 512;canvas.width = 512;return canvas;});console.log(this.angles);this.contexts = this.angles.map(function(canvas){return canvas.getContext('2d');});this.frames = [[0,0],[512,0],[1024,0],[0,512],[512,512],[1024,512]];var draw=function draw(){_this.frames.forEach(function(frame,i){_this.contexts[i].clearRect(0,0,512,512);_this.contexts[i].drawImage(_this.el,frame[0],frame[1],512,512,0,0,512,512);});requestAnimationFrame(draw);};draw();this.isUserInteracting = false;this.onMouseDownMouseX = 0;this.onMouseDownMouseY = 0;this.lon = 90;this.onMouseDownLon = 0;this.lat = 0;this.onMouseDownLat = 0;this.phi = 0;this.theta = 0;this.target = new _threeJs.Vector3();this.scene = new _threeJs.Scene();this.camera = new _threeJs.PerspectiveCamera(75,this.options.width / this.options.height,1,1100);this.renderer = new _threeJs.WebGLRenderer();this.renderer.setSize(this.options.width,this.options.height);this.el.parentElement.appendChild(this.renderer.domElement);this.renderer.domElement.addEventListener('mouseup',function(){return _this.isUserInteracting = false;},false);this.renderer.domElement.addEventListener('mousemove',function(event){if(_this.isUserInteracting){_this.lon = (_this.onPointerDownPointerX - event.clientX) * 0.2 + _this.onPointerDownLon;_this.lat = (event.clientY - _this.onPointerDownPointerY) * 0.2 + _this.onPointerDownLat;}},false);this.renderer.domElement.addEventListener('mousedown',function(event){event.preventDefault();_this.isUserInteracting = true;_this.onPointerDownPointerX = event.clientX;_this.onPointerDownPointerY = event.clientY;_this.onPointerDownLon = _this.lon;_this.onPointerDownLat = _this.lat;},false);this.materials = this.angles.map(function(angle){return new _threeJs.MeshBasicMaterial({map:new _threeJs.Texture(angle),overdraw:0.5});});this.geometry = new _threeJs.BoxGeometry(300,300,300,7,7,7);this.material = new _threeJs.MeshFaceMaterial(this.materials);this.cube = new _threeJs.Mesh(this.geometry,this.material);this.camera.position.x += 0.1;this.cube.scale.x = -1;this.scene.add(this.cube);for(var i=0;i < this.cube.geometry.vertices.length;i++) {var v=this.cube.geometry.vertices[i];v.normalize();v.multiplyScalar(550);}var render=function render(){_this.materials.forEach(function(material){material.map.needsUpdate = true;});_this.lat = Math.max(-85,Math.min(85,_this.lat));_this.phi = _threeJs.Math.degToRad(90 - _this.lat);_this.theta = _threeJs.Math.degToRad(_this.lon);_this.target.x = 500 * Math.sin(_this.phi) * Math.cos(_this.theta);_this.target.y = 500 * Math.cos(_this.phi);_this.target.z = 500 * Math.sin(_this.phi) * Math.sin(_this.theta);_this.camera.position.copy(_this.target).negate();_this.camera.lookAt(_this.target);_this.renderer.render(_this.scene,_this.camera);requestAnimationFrame(render);};render();}},{key:'render',value:function render(){var _this2=this;_get(Object.getPrototypeOf(Playback360.prototype),'render',this).call(this);setTimeout(function(){return _this2.init();},0);return this;}}]);return Playback360;})(_clappr.HTML5Video);exports['default'] = Playback360;Playback360.canPlay = function(source){return (source || '').match(/#360$/);};module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ }
/******/ ])
});
;