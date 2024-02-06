// const PinchZoomComponent = () => {
//     const [isOpen, setIsOpen] = useState(true);
//     const containerRef = useRef(null);
  
//     const togglePanel = () => {
//       setIsOpen(!isOpen);
//     };
//     const isCloseTo = (a, b, epsilon = 1e-10) => Math.abs(a - b) < epsilon;
//     const sum = (arr) => arr.reduce((acc, value) => acc + value, 0);
  
   
  
//     useEffect(() => {
//       if (typeof Array.from !== 'function') {
//         Array.from = function (object) {
//           return [].slice.call(object);
//         };
//       }
  
//       var detectGestures = function detectGestures(el, target) {
//         var interaction = null,
//           fingers = 0,
//           lastTouchStart = null,
//           startTouches = null,
//           setInteraction = function setInteraction(newInteraction, event) {
//             if (interaction !== newInteraction) {
//               if (interaction && !newInteraction) {
//                 switch (interaction) {
//                   case 'zoom':
//                     target.handleZoomEnd(event);
//                     break;
//                   case 'drag':
//                     target.handleDragEnd(event);
//                     break;
                  
//                   default:
//                     break;
//                 }
                
//               }
//               switch (newInteraction) {
//                 case 'zoom':
//                   target.handleZoomStart(event);
//                   break;
//                 case 'drag':
//                   target.handleDragStart(event);
//                   break;
//                 default:
//                   break;
//               }
//             }
//             interaction = newInteraction;
//           },
//           updateInteraction = function updateInteraction(event) {
//             if (fingers === 2) {
//               setInteraction('zoom');
//             } else if (fingers === 1 && target.canDrag()) {
//               setInteraction('drag', event);
//             } else {
//               setInteraction(null, event);
//             }
//           };
  
        
//           var targetTouches = function targetTouches(touches) {
//             return Array.from(touches).map(function (touch) {
//               return {
//                 x: touch.pageX,
//                 y: touch.pageY,
//               };
//             });
//           };
  
//           var getDistance = function getDistance(a, b) {
//             var x, y;
//             x = a.x - b.x;
//             y = a.y - b.y;
//             return Math.sqrt(x * x + y * y);
//           };
  
//           var calculateScale = function calculateScale(startTouches, endTouches) {
//             var startDistance = getDistance(startTouches[0], startTouches[1]),
//               endDistance = getDistance(endTouches[0], endTouches[1]);
//             return endDistance / startDistance;
//           };
  
//           var cancelEvent = function cancelEvent(event) {
//             event.stopPropagation();
//             event.preventDefault();
//           };
        
//           var detectDoubleTap = function detectDoubleTap(event) {
//             var time = new Date().getTime();
        
//             if (fingers > 1) {
//               lastTouchStart = null;
//             }
        
//             if (time - lastTouchStart < 300) {
//               cancelEvent(event);
        
//               target.handleDoubleTap(event);
//               switch (interaction) {
//                 case "zoom":
//                   target.handleZoomEnd(event);
//                   break;
//                 case 'drag':
//                   target.handleDragEnd(event);
//                   break;
//                 default:
//                   break;
//               }
//             } else {
//               target.isDoubleTap = false;
//             }
        
//             if (fingers === 1) {
//               lastTouchStart = time;
//             }
//           };
//           var firstMove = true;
  
//           el.addEventListener('touchstart', function (event) {
//             if (target.enabled) {
//               firstMove = true;
//               fingers = event.touches.length;
//               detectDoubleTap(event);
//             }
//           });
  
  
//           el.addEventListener('touchmove', function (event) {
//             if (target.enabled && !target.isDoubleTap) {
//               if (firstMove) {
//                 updateInteraction(event);
//                 if (interaction) {
//                   cancelEvent(event);
//                 }
//                 startTouches = targetTouches(event.touches);
//               } else {
//                 switch (interaction) {
//                   case 'zoom':
//                     target.handleZoom(event, calculateScale(startTouches, targetTouches(event.touches)));
//                     break;
//                   case 'drag':
//                     target.handleDrag(event);
//                     break;
//                   default:
//                     break;
                    
//                 }
//                 if (interaction) {
//                   cancelEvent(event);
//                   target.update();
//                 }
//               }
          
//               firstMove = false;
//             }
//           });
          
//           // Add touchend event listener
//           el.addEventListener('touchend', function (event) {
//             if (target.enabled) {
//               fingers = event.touches.length;
//               updateInteraction(event);
//             }
//           });
           
//       };
  
//       var buildElement = function buildElement(str) {
//         var tmp = document.implementation.createHTMLDocument('');
//         tmp.body.innerHTML = str;
//         return Array.from(tmp.body.children)[0];
//       };
  
//       var triggerEvent = function triggerEvent(el, name) {
//         var event = document.createEvent('HTMLEvents');
//         event.initEvent(name, true, false);
//         el.dispatchEvent(event);
//       };
  
//       var definePinchZoom = function definePinchZoom() {
//         var PinchZoom = function PinchZoom(el, options) {
//           this.el = el;
//           this.zoomFactor = 1;
//           this.lastScale = 1;
//           this.offset = {
//             x: 0,
//             y: 0
//           };
//           this.initialOffset = {
//             x: 0,
//             y: 0
//           };
//           this.options = Object.assign({}, this.defaults, options);
//           this.setupMarkup();
//           this.bindEvents();
//           this.update();
  
//           if (this.isImageLoaded(this.el)) {
//             this.updateAspectRatio();
//             this.setupInitialOffset();
//           }
  
//           this.enable();
//         };
       
//         PinchZoom.prototype = {
//           defaults: {
//             tapZoomFactor: 2,
//             zoomOutFactor: 1.3,
//             animationDuration: 300,
//             maxZoom: 4,
//             minZoom: 0.5,
//             draggableUnzoomed: true,
//             lockDragAxis: false,
//             use2d: true,
//             zoomStartEventName: 'pz_zoomstart',
//             zoomUpdateEventName: 'pz_zoomupdate',
//             zoomEndEventName: 'pz_zoomend',
//             dragStartEventName: 'pz_dragstart',
//             dragUpdateEventName: 'pz_dragupdate',
//             dragEndEventName: 'pz_dragend',
//             doubleTapEventName: 'pz_doubletap',
//             verticalPadding: 0,
//             horizontalPadding: 0
//           },
  
//           handleDragStart: function (event) {
//             triggerEvent(this.el, this.options.dragStartEventName);
//             this.stopAnimation();
//             this.lastDragPosition = false;
//             this.hasInteraction = true;
//             this.handleDrag(event);
//           },
  
//           handleDrag: function (event) {
//             var touch = this.getTouches(event)[0];
//             this.drag(touch, this.lastDragPosition);
//             this.offset = this.sanitizeOffset(this.offset);
//             this.lastDragPosition = touch;
//           },
  
//           handleDragEnd: function () {
//             triggerEvent(this.el, this.options.dragEndEventName);
//             this.end();
//           },
          
//           handleZoomStart: function (event) {
//             triggerEvent(this.el, this.options.zoomStartEventName);
//             this.stopAnimation();
//             this.lastScale = 1;
//             this.nthZoom = 0;
//             this.lastZoomCenter = false;
//             this.hasInteraction = true;
//           },
//           handleZoom: function (event, newScale) {
//             // a relative scale factor is used
//             var touchCenter = this.getTouchCenter(this.getTouches(event)),
//               scale = newScale / this.lastScale;
//             this.lastScale = newScale;
  
//             // the first touch events are thrown away since they are not precise
//             this.nthZoom += 1;
//             if (this.nthZoom > 3) {
//               this.scale(scale, touchCenter);
//               this.drag(touchCenter, this.lastZoomCenter);
//             }
//             this.lastZoomCenter = touchCenter;
//           },
  
//           handleZoomEnd: function () {
//             triggerEvent(this.el, this.options.zoomEndEventName);
//             this.end();
//           },
  
//           handleDoubleTap: function (event) {
//             var center = this.getTouches(event)[0],
//               zoomFactor = this.zoomFactor > 1 ? 1 : this.options.tapZoomFactor,
//               startZoomFactor = this.zoomFactor,
//               updateProgress = function (progress) {
//                 this.scaleTo(startZoomFactor + progress * (zoomFactor - startZoomFactor), center);
//               }.bind(this);
  
//             if (this.hasInteraction) {
//               return;
//             }
  
//             this.isDoubleTap = true;
  
//             if (startZoomFactor > zoomFactor) {
//               center = this.getCurrentZoomCenter();
//             }
  
//             this.animate(this.options.animationDuration, updateProgress, this.swing);
//             triggerEvent(this.el, this.options.doubleTapEventName);
//           },
  
//           computeInitialOffset: function () {
//             this.initialOffset = {
//               x: -Math.abs(this.el.offsetWidth * this.getInitialZoomFactor() - this.container.offsetWidth) / 2,
//               y: -Math.abs(this.el.offsetHeight * this.getInitialZoomFactor() - this.container.offsetHeight) / 2,
//             };
//           },
  
//           isImageLoaded: function (el) {
//             if (el.nodeName === 'IMG') {
//               return el.complete && el.naturalHeight !== 0;
//             } else {
//               return Array.from(el.querySelectorAll('img')).every(this.isImageLoaded);
//             }
//           },
  
//           setupInitialOffset: function () {
//             if (this._initialOffsetSetup) {
//               return;
//             }
  
//             this._initialOffsetSetup = true;
  
//             this.computeInitialOffset();
//             this.offset.x = this.initialOffset.x;
//             this.offset.y = this.initialOffset.y;
//           },
  
//           sanitizeOffset: function (offset) {
//             const elWidth = this.el.offsetWidth * this.getInitialZoomFactor() * this.zoomFactor;
//             const elHeight = this.el.offsetHeight * this.getInitialZoomFactor() * this.zoomFactor;
//             const maxX = elWidth - this.getContainerX() + this.options.horizontalPadding;
//             const maxY = elHeight - this.getContainerY() + this.options.verticalPadding;
//             const maxOffsetX = Math.max(maxX, 0);
//             const maxOffsetY = Math.max(maxY, 0);
//             const minOffsetX = Math.min(maxX, 0) - this.options.horizontalPadding;
//             const minOffsetY = Math.min(maxY, 0) - this.options.verticalPadding;
  
//             return {
//               x: Math.min(Math.max(offset.x, minOffsetX), maxOffsetX),
//               y: Math.min(Math.max(offset.y, minOffsetY), maxOffsetY),
//             };
//           },
  
//           scaleTo: function (zoomFactor, center) {
//             this.scale(zoomFactor / this.zoomFactor, center);
//           },
  
  
//           scale: function (_scale, center) {
//             const scaledZoomFactor = this.scaleZoomFactor(_scale);
//             this.addOffset({
//               x: (_scale - 1) * (center.x + this.offset.x),
//               y: (_scale - 1) * (center.y + this.offset.y),
//             });
//             triggerEvent(this.el, this.options.zoomUpdateEventName);
//           },
  
//           scaleZoomFactor: function (scale) {
//             const originalZoomFactor = this.zoomFactor;
//             this.zoomFactor *= scale;
//             this.zoomFactor = Math.min(this.options.maxZoom, Math.max(this.zoomFactor, this.options.minZoom));
//             return this.zoomFactor / originalZoomFactor;
//           },
  
//           canDrag: function () {
//             return this.options.draggableUnzoomed || !isCloseTo(this.zoomFactor, 1);
//           },
  
//           drag: function (center, lastCenter) {
//             if (lastCenter) {
//               if (this.options.lockDragAxis) {
//                 // lock scroll to position that was changed the most
//                 if (Math.abs(center.x - lastCenter.x) > Math.abs(center.y - lastCenter.y)) {
//                   this.addOffset({
//                     x: -(center.x - lastCenter.x),
//                     y: 0,
//                   });
//                 } else {
//                   this.addOffset({
//                     y: -(center.y - lastCenter.y),
//                     x: 0,
//                   });
//                 }
//               } else {
//                 this.addOffset({
//                   y: -(center.y - lastCenter.y),
//                   x: -(center.x - lastCenter.x),
//                 });
//               }
//               triggerEvent(this.el, this.options.dragUpdateEventName);
//             }
//           },
  
//           getTouchCenter: function (touches) {
//             return this.getVectorAvg(touches);
//           },
  
//           getVectorAvg: function (vectors) {
//             return {
//               x: vectors.map(function (v) {
//                 return v.x;
//               }).reduce(sum) / vectors.length,
//               y: vectors.map(function (v) {
//                 return v.y;
//               }).reduce(sum) / vectors.length,
//             };
//           },
  
//           addOffset: function (offset) {
//             this.offset = {
//               x: this.offset.x + offset.x,
//               y: this.offset.y + offset.y,
//             };
//           },
  
//           sanitize: function () {
//             if (this.zoomFactor < this.options.zoomOutFactor) {
//               this.zoomOutAnimation();
//             } else if (this.isInsaneOffset(this.offset)) {
//               this.sanitizeOffsetAnimation();
//             }
//           },
          
//           isInsaneOffset: function (offset) {
//             var sanitizedOffset = this.sanitizeOffset(offset);
//             return sanitizedOffset.x !== offset.x || sanitizedOffset.y !== offset.y;
//           },
          
//           sanitizeOffsetAnimation: function () {
//             var targetOffset = this.sanitizeOffset(this.offset),
//               startOffset = {
//                 x: this.offset.x,
//                 y: this.offset.y,
//               },
//               updateProgress = function (progress) {
//                 this.offset.x = startOffset.x + progress * (targetOffset.x - startOffset.x);
//                 this.offset.y = startOffset.y + progress * (targetOffset.y - startOffset.y);
//                 this.update();
//               }.bind(this);
          
//             this.animate(this.options.animationDuration, updateProgress, this.swing);
//           },
  
//           zoomOutAnimation: function () {
//             if (this.zoomFactor === 1) {
//               return;
//             }
          
//             var startZoomFactor = this.zoomFactor,
//               zoomFactor = 1,
//               center = this.getCurrentZoomCenter(),
//               updateProgress = function (progress) {
//                 this.scaleTo(startZoomFactor + progress * (zoomFactor - startZoomFactor), center);
//               }.bind(this);
          
//             this.animate(this.options.animationDuration, updateProgress, this.swing);
//           },
          
//           updateAspectRatio: function () {
//             this.setContainerY(this.container.parentElement.offsetHeight);
//           },
  
  
//           getInitialZoomFactor: function () {
//             var xZoomFactor = this.container.offsetWidth / this.el.offsetWidth;
//             var yZoomFactor = this.container.offsetHeight / this.el.offsetHeight;
          
//             return Math.min(xZoomFactor, yZoomFactor);
//           },
          
//           getAspectRatio: function () {
//             return this.el.offsetWidth / this.el.offsetHeight;
//           },
          
//           getCurrentZoomCenter: function () {
//             var offsetLeft = this.offset.x - this.initialOffset.x;
//             var centerX = -1 * this.offset.x - offsetLeft / (1 / this.zoomFactor - 1);
          
//             var offsetTop = this.offset.y - this.initialOffset.y;
//             var centerY = -1 * this.offset.y - offsetTop / (1 / this.zoomFactor - 1);
          
//             return {
//               x: centerX,
//               y: centerY,
//             };
//           },
  
  
//           getTouches: function (event) {
//             var rect = this.container.getBoundingClientRect();
//             var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
//             var scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft;
//             var posTop = rect.top + scrollTop;
//             var posLeft = rect.left + scrollLeft;
          
//             return Array.prototype.slice.call(event.touches).map(function (touch) {
//               return {
//                 x: touch.pageX - posLeft,
//                 y: touch.pageY - posTop,
//               };
//             });
//           },
          
//           animate: function (duration, framefn, timefn, callback) {
//             var startTime = new Date().getTime(),
//               renderFrame = function () {
//                 if (!this.inAnimation) {
//                   return;
//                 }
//                 var frameTime = new Date().getTime() - startTime,
//                   progress = frameTime / duration;
//                 if (frameTime >= duration) {
//                   framefn(1);
//                   if (callback) {
//                     callback();
//                   }
//                   this.update();
//                   this.stopAnimation();
//                   this.update();
//                 } else {
//                   if (timefn) {
//                     progress = timefn(progress);
//                   }
//                   framefn(progress);
//                   this.update();
//                   requestAnimationFrame(renderFrame);
//                 }
//               }.bind(this);
//             this.inAnimation = true;
//             requestAnimationFrame(renderFrame);
//           },
          
//           stopAnimation: function () {
//             this.inAnimation = false;
//           },
          
//           swing: function (p) {
//             return -Math.cos(p * Math.PI) / 2 + 0.5;
//           },
          
//           getContainerX: function () {
//             return this.container.offsetWidth;
//           },
          
//           getContainerY: function () {
//             return this.container.offsetHeight;
//           },
          
//           setContainerY: function (y) {
//             return (this.container.style.height = y + 'px');
//           },
          
//           setupMarkup: function () {
//             this.container = buildElement('<div class="pinch-zoom-container"></div>');
//             this.el.parentNode.insertBefore(this.container, this.el);
//             this.container.appendChild(this.el);
          
//             this.container.style.overflow = 'hidden';
//             this.container.style.position = 'relative';
          
//             this.el.style.webkitTransformOrigin = '0% 0%';
//             this.el.style.mozTransformOrigin = '0% 0%';
//             this.el.style.msTransformOrigin = '0% 0%';
//             this.el.style.oTransformOrigin = '0% 0%';
//             this.el.style.transformOrigin = '0% 0%';
          
//             this.el.style.position = 'absolute';
//           },
  
//           end: function () {
//             this.hasInteraction = false;
//             this.sanitize();
//             this.update();
//           },
          
//           bindEvents: function () {
//             var self = this;
//             detectGestures(this.container, this);
          
//             window.addEventListener('resize', this.update.bind(this));
//             Array.from(this.el.querySelectorAll('img')).forEach(function (imgEl) {
//               imgEl.addEventListener('load', self.update.bind(self));
//             });
          
//             if (this.el.nodeName === 'IMG') {
//               this.el.addEventListener('load', this.update.bind(this));
//             }
//           },
  
//           update: function (event) {
//             if (this.updatePlaned) {
//               return;
//             }
//             this.updatePlaned = true;
          
//             window.setTimeout(function () {
//               this.updatePlaned = false;
//               this.updateAspectRatio();
          
//               if (event && event.type === 'resize') {
//                 this.computeInitialOffset();
//               }
          
//               if (event && event.type === 'load') {
//                 this.setupInitialOffset();
//               }
          
//               var zoomFactor = this.getInitialZoomFactor() * this.zoomFactor,
//                 offsetX = -this.offset.x / zoomFactor,
//                 offsetY = -this.offset.y / zoomFactor,
//                 transform3d = 'scale3d(' + zoomFactor + ', ' + zoomFactor + ',1) ' + 'translate3d(' + offsetX + 'px,' + offsetY + 'px,0px)',
//                 transform2d = 'scale(' + zoomFactor + ', ' + zoomFactor + ') ' + 'translate(' + offsetX + 'px,' + offsetY + 'px)',
//                 removeClone = function () {
//                   if (this.clone) {
//                     this.clone.parentNode.removeChild(this.clone);
//                     delete this.clone;
//                   }
//                 }.bind(this);
          
//               // Scale 3d and translate3d are faster (at least on ios)
//               // but they also reduce the quality.
//               // PinchZoom uses the 3d transformations during interactions
//               // after interactions, it falls back to 2d transformations
//               if (!this.options.use2d || this.hasInteraction || this.inAnimation) {
//                 this.is3d = true;
//                 removeClone();
          
//                 this.el.style.webkitTransform = transform3d;
//                 this.el.style.mozTransform = transform2d;
//                 this.el.style.msTransform = transform2d;
//                 this.el.style.oTransform = transform2d;
//                 this.el.style.transform = transform3d;
//               } else {
//                 // When changing from 3d to 2d transform webkit has some glitches.
//                 // To avoid this, a copy of the 3d transformed element is displayed in the
//                 // foreground while the element is converted from 3d to 2d transform
//                 if (this.is3d) {
//                   this.clone = this.el.cloneNode(true);
//                   this.clone.style.pointerEvents = 'none';
//                   this.container.appendChild(this.clone);
//                   window.setTimeout(removeClone, 200);
//                 }
          
//                 this.el.style.webkitTransform = transform2d;
//                 this.el.style.mozTransform = transform2d;
//                 this.el.style.msTransform = transform2d;
//                 this.el.style.oTransform = transform2d;
//                 this.el.style.transform = transform2d;
          
//                 this.is3d = false;
//               }
//             }.bind(this), 0);
//           },
  
//           enable: function () {
//             this.enabled = true;
//           },
          
//           disable: function () {
//             this.enabled = false;
//           }
//           };
          
  
          
  
//           // ... (other PinchZoom methods)
//         };
  
  
//       definePinchZoom();
  
//     }, []); // Empty dependency array ensures the effect runs once after the initial render