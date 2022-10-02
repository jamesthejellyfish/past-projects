// credit to https://css-tricks.com/creating-a-panning-effect-for-svg/

// We select the SVG into the page
var svg = document.querySelector('svg');

var islocked = false;

// If browser supports pointer events
if (window.PointerEvent) {
  svg.addEventListener('pointerdown', onPointerDown); // Pointer is pressed
  svg.addEventListener('pointerup', onPointerUp); // Releasing the pointer
  svg.addEventListener('pointerleave', onPointerUp); // Pointer gets out of the SVG area
  svg.addEventListener('pointermove', onPointerMove); // Pointer is moving
} else {
  // Add all mouse events listeners fallback
  svg.addEventListener('mousedown', onPointerDown); // Pressing the mouse
  svg.addEventListener('mouseup', onPointerUp); // Releasing the mouse
  svg.addEventListener('mouseleave', onPointerUp); // Mouse gets out of the SVG area
  svg.addEventListener('mousemove', onPointerMove); // Mouse is moving

  // Add all touch events listeners fallback
  svg.addEventListener('touchstart', onPointerDown); // Finger is touching the screen
  svg.addEventListener('touchend', onPointerUp); // Finger is no longer touching the screen
  svg.addEventListener('touchmove', onPointerMove); // Finger is moving
}

// This function returns an object with X & Y values from the pointer event
function getPointFromEvent (event) {
  var point = {x:0, y:0};
  // If even is triggered by a touch event, we get the position of the first finger
  if (event.targetTouches) {
    point.x = event.targetTouches[0].clientX;
    point.y = event.targetTouches[0].clientY;
  } else {
    point.x = event.clientX;
    point.y = event.clientY;
  }
  
  return point;
}

// This variable will be used later for move events to check if pointer is down or not
var isPointerDown = false;

// This variable will contain the original coordinates when the user start pressing the mouse or touching the screen
var pointerOrigin = {
  x: 0,
  y: 0
};

// Function called by the event listeners when user start pressing/touching
function onPointerDown(event) {
  isPointerDown = true; // We set the pointer as down
  
  // We get the pointer position on click/touchdown so we can get the value once the user starts to drag
  var pointerPosition = getPointFromEvent(event);
  pointerOrigin.x = pointerPosition.x;
  pointerOrigin.y = pointerPosition.y;
}

// We save the original values from the viewBox
var viewBox = {
  x: 300,
  y: -150,
  width: 500,
  height: 500
};
var orig_width = viewBox.width;

// The distances calculated from the pointer will be stored here
var newViewBox = {
  x: 0,
  y: 0
};

// Calculate the ratio based on the viewBox width and the SVG width
var ratio = viewBox.width / svg.getBoundingClientRect().width;
window.addEventListener('resize', function() {
  ratio = viewBox.width / svg.getBoundingClientRect().width;
});


function zoom(amount){
    if(viewBox.width - (amount / 100 * orig_width)<=0){
        return;
    }
    viewBox.width = viewBox.width - (amount / 100 * orig_width);
    viewBox.height = viewBox.width;
    var viewBoxString = `${newViewBox.x} ${newViewBox.y} ${viewBox.width} ${viewBox.height}`;
    svg.setAttribute('viewBox', viewBoxString);
    ratio = viewBox.width / svg.getBoundingClientRect().width;
}

function resetView(){
    viewBox.x = 480 - viewBox.width / 2;
    viewBox.y = 30 - viewBox.height / 2;
    var viewBoxString = `${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}`;
    svg.setAttribute('viewBox', viewBoxString);
}

function Togglelock(){
    islocked = !islocked;
    lock = document.getElementById('lock')
    if(islocked){
        lock.setAttribute('class', 'fa fa-lock')
    }else{
        lock.setAttribute('class', 'fa fa-unlock-alt')
    }
}



// Function called by the event listeners when user start moving/dragging
function onPointerMove (event) {
  // Only run this function if the pointer is down
  if (!isPointerDown) {
    return;
  }
  if (islocked){
    return;
  }
  // This prevent user to do a selection on the page
  event.preventDefault();

  // Get the pointer position
  var pointerPosition = getPointFromEvent(event);

  // We calculate the distance between the pointer origin and the current position
  // The viewBox x & y values must be calculated from the original values and the distances
  newViewBox.x = viewBox.x - ((pointerPosition.x - pointerOrigin.x) * ratio);
  newViewBox.y = viewBox.y - ((pointerPosition.y - pointerOrigin.y) * ratio);

  // We create a string with the new viewBox values
  // The X & Y values are equal to the current viewBox minus the calculated distances
  var viewBoxString = `${newViewBox.x} ${newViewBox.y} ${viewBox.width} ${viewBox.height}`;
  // We apply the new viewBox values onto the SVG
  svg.setAttribute('viewBox', viewBoxString);
}

function onPointerUp() {
  // The pointer is no longer considered as down
  isPointerDown = false;

  // We save the viewBox coordinates based on the last pointer offsets
  viewBox.x = newViewBox.x;
  viewBox.y = newViewBox.y;
}