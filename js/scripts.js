

//Gathering and displying JSON data

var data,lon,lat,
    selected_data = {};

loadJSON();


function loadJSON() {
   var xobj = new XMLHttpRequest();
   //xobj.overrideMimeType("application/json");
   xobj.open('GET', 'harlem-data.json', true);
   xobj.onreadystatechange = function () {
         if (xobj.readyState == 4 && xobj.status == "200") {
           data = JSON.parse(xobj.responseText); //turn into a JS object
         }
       };
  xobj.send(null);
}


let btn_type = document.getElementById('buttons_pg1');
btn_type.addEventListener('click', runfoodfunction);

let btn_dist = document.getElementById('buttons_pg2');
btn_dist.addEventListener('click', rundistancefunction);

let btn_submit = document.getElementById('submit_data');
btn_submit.addEventListener('click', runoptions);


  function runfoodfunction(e){
    let type = e.target.dataset.type;
    console.log(type);
    selected_data.type = e.target.dataset.type;

    const cuisine_data = data.data;
        for (let i = 0; i < cuisine_data.length; i++){
          if (cuisine_data[i].what == type){
            // console.log(cuisine_data[i].name);
            // console.log(cuisine_data[i].distance);
            // console.log(cuisine_data[i].longitude);
            // console.log(cuisine_data[i].latitude);
          }
        }
      };

      function rundistancefunction(e){
        let far = e.target.dataset.far;
        selected_data.dist = e.target.dataset.far;
        console.log(far);
        // const distance_data = data.data;
        // for (let i = 0; i < distance_data.length; i++){
        //   if (distance_data[i].distance == far){
        //     console.log(distance_data[i].name);
        //   }
        // }
      };

      function runoptions(){
        var xobj = new XMLHttpRequest();
        //xobj.overrideMimeType("application/json");
        console.log("dd",selected_data);
        xobj.open('GET', 'harlem-data.json', true);
        xobj.onreadystatechange = function () {
              if (xobj.readyState == 4 && xobj.status == "200") {
                data = JSON.parse(xobj.responseText); //turn into a JS object
                console.log(data);
                for (let i = 0; i < data.data.length; i++){
                  if (data.data[i].what == selected_data.type && data.data[i].distance == selected_data.dist){
                    found_rest = data.data[i];
                    console.log('match found', found_rest);
                    break;
                  }
                }

                // DO WHAT YOU NEED WTH found_rest
                //callback(found_rest)
                var elem12 = document.getElementById("hiddenmoreinfo1");
                if (found_rest) {
                elem12.classList.add("show");
                elem12.classList.remove("hidden");

                }
              }
            };
       xobj.send(null);
      }

      function show_next(){
        var intro = document.getElementById("intro");
        var elem1 = document.getElementById("buttons_pg1");
        var elem2 = document.getElementById("buttons_pg2");
        var elem4 = document.getElementById("boxtriangle2");
        var elem6 = document.getElementById("hiddenartbox");
        var elem7 = document.getElementById("hiddendistancebox");
        var elem8 = document.getElementById("submit_data");
        var elem9 = document.getElementById("myCanvas");



        if (elem1.classList.contains('hidden') && elem2.classList.contains('hidden')) {
          intro.classList.add("hidden");

          elem1.classList.add("show");
          elem1.classList.remove("hidden");

          elem4.classList.add("hidden");
          elem4.classList.remove("show");

          elem9.classList.add("hidden");
          elem9.classList.remove("show");

        } else if (elem1.classList.contains('show') && elem2.classList.contains('hidden')) {

          elem1.classList.add("hidden");
          elem1.classList.remove("show");

          elem2.classList.add("show");
          elem2.classList.remove("hidden");

          elem6.classList.add("show");
          elem6.classList.remove("hidden");

        } else if(elem2.classList.contains('show') && elem7.classList.contains('hidden') ) {
          elem2.classList.add("hidden");
          elem2.classList.remove("show");

          elem7.classList.add("show");
          elem7.classList.remove("hidden");

          elem8.classList.add("show");
          elem8.classList.remove("hidden");
        }
      };

// function show_para(){
//   var elem11 = document.getElementById("finalbuttons_pg");
//   var elem12= document.getElementById("hiddenmoreinfo1");
//
//   if (elem11.classList.contains('hidden') && elem12.classList.contains('hidden')) {
//     elem11.classList.add("hidden");
//     elem11.classList.remove("show");
// console.log("working!");
//     elem12.classList.add("show");
//     elem12.classList.remove("hidden");
//
//   }
// };


//Geolocation JS code

    var loc = document.getElementById('myloc');
    //lon = position.coords.longitude;
    //lat = position.coords.latitude;

      function mylocation(){
        if(navigator.geolocation){
          navigator.geolocation.getCurrentPosition(showPosition);
        }else{
          loc.innerHTML = "Location can not be found";
        }


      function showPosition(position){
        lon = position.coords.longitude;
        lat = position.coords.latitude;
          console.log(lat, lon)
            myMap();

      function myMap(){
        var mapProp= {
            center:new google.maps.LatLng(lat, lon),
            zoom:19,
            styles: [
              {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
              {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
              {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
              {
                featureType: 'administrative.locality',
                elementType: 'labels.text.fill',
                stylers: [{color: '#d59563'}]
              },
              {
                featureType: 'poi',
                elementType: 'labels.text.fill',
                stylers: [{color: '#d59563'}]
              },
              {
                featureType: 'poi.park',
                elementType: 'geometry',
                stylers: [{color: '#263c3f'}]
              },
              {
                featureType: 'poi.park',
                elementType: 'labels.text.fill',
                stylers: [{color: '#6b9a76'}]
              },
              {
                featureType: 'road',
                elementType: 'geometry',
                stylers: [{color: '#38414e'}]
              },
              {
                featureType: 'road',
                elementType: 'geometry.stroke',
                stylers: [{color: '#212a37'}]
              },
              {
                featureType: 'road',
                elementType: 'labels.text.fill',
                stylers: [{color: '#9ca5b3'}]
              },
              {
                featureType: 'road.highway',
                elementType: 'geometry',
                stylers: [{color: '#746855'}]
              },
              {
                featureType: 'road.highway',
                elementType: 'geometry.stroke',
                stylers: [{color: '#1f2835'}]
              },
              {
                featureType: 'road.highway',
                elementType: 'labels.text.fill',
                stylers: [{color: '#f3d19c'}]
              },
              {
                featureType: 'transit',
                elementType: 'geometry',
                stylers: [{color: '#2f3948'}]
              },
              {
                featureType: 'transit.station',
                elementType: 'labels.text.fill',
                stylers: [{color: '#d59563'}]
              },
              {
                featureType: 'water',
                elementType: 'geometry',
                stylers: [{color: '#17263c'}]
              },
              {
                featureType: 'water',
                elementType: 'labels.text.fill',
                stylers: [{color: '#515c6d'}]
              },
              {
                featureType: 'water',
                elementType: 'labels.text.stroke',
                stylers: [{color: '#17263c'}]
              }
            ]
          };
        var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);
      }
    }
  }

//   var morphing = anime({
//   targets: '#morphing .polymorph',
//   points: [
//     { value: '70 41 118.574 59.369 111.145 132.631 60.855 84.631 20.426 60.369' },
//     { value: '70 6 119.574 60.369 100.145 117.631 39.855 117.631 55.426 68.369' },
//     { value: '70 57 136.574 54.369 89.145 100.631 28.855 132.631 38.426 64.369' },
//     { value: '70 24 119.574 60.369 100.145 117.631 50.855 101.631 3.426 54.369' }
//   ],
//   easing: 'easeOutQuad',
//   duration: 2000,
//   loop: true
// });

// ------------------------- canvas code inspired by Chris Courses ------------------

const canvas = document.getElementById('myCanvas')
const c = canvas.getContext('2d')

let mouseX
let mouseY

canvas.height = window.innerHeight
canvas.width = window.innerWidth

const canvasWidth = canvas.width + 1000
const canvasHeight = canvas.height

const maxRadius = 35

canvas.onmousemove = function(e) {
    mouseX = e.clientX
    mouseY = e.clientY
}

window.addEventListener('resize', function() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
})

function Circle(xCoordinate, yCoordinate, radius) {
    const randomNumber = Math.floor(Math.random() * 4)
    const randomTrueOrFalse = Math.floor(Math.random() * 2)

    this.xCoordinate = xCoordinate
    this.yCoordinate = yCoordinate
    this.radius = radius
    this.color = colorArray[randomNumber]

    if (randomTrueOrFalse == 1) {
        this.xVelocity = -Math.random() * 1
    } else {
        this.xVelocity = Math.random() * 1
    }

    if (randomTrueOrFalse == 1) {
        this.yVelocity = -Math.random() * 1
    } else {
        this.yVelocity = Math.random() * 1
    }

    // As distance gets closer to 0, increase radius

    this.update = function() {
        this.xCoordinate += this.xVelocity
        const xDistance = mouseX - this.xCoordinate
        const yDistance = mouseY - this.yCoordinate
        const originalRadius = radius
        this.yCoordinate += this.yVelocity

        // Movement Functions
        if (
            this.xCoordinate + this.radius > canvasWidth ||
            this.xCoordinate - this.radius < 0
        ) {
            this.xVelocity = -this.xVelocity
        }
        if (
            this.yCoordinate + this.radius > canvasHeight ||
            this.yCoordinate - this.radius < 0
        ) {
            this.yVelocity = -this.yVelocity
        }

        // Radius Decrease Functions
        // When distance between circle center and mouse on horizontal axis is less than 50, increase radius until it is equal to 35
        if (
            xDistance < 50 &&
            xDistance > -50 &&
            this.radius < maxRadius &&
            yDistance < 50 &&
            yDistance > -50
        ) {
            this.radius += 2
        } else if (
            (xDistance >= 50 && originalRadius < this.radius) ||
            (xDistance <= -50 && originalRadius < this.radius) ||
            (yDistance >= 50 && originalRadius < this.radius) ||
            (yDistance <= -50 && originalRadius < this.radius)
        ) {
            this.radius -= 2
        }

        this.draw()
    }

    this.draw = function() {
        c.beginPath()
        c.arc(
            this.xCoordinate,
            this.yCoordinate,
            Math.abs(this.radius),
            0,
            Math.PI * 2
        )
        c.fillStyle = this.color
        c.fill()
    }
}

const colorArray = ['#7A9E9F', '#FFE5D9', '#CFD8D7']
const myCircle = new Circle(30, 80, 10)
let circleArray = []

for (let i = 0; i < 800; i++) {
    const randomXCoordinate = Math.random() * canvasWidth
    const randomYCoordinate = Math.random() * canvasHeight
    const randomRadius = Math.random() * 5
    circleArray.push(
        new Circle(randomXCoordinate, randomYCoordinate, randomRadius)
    )
}

function updateAll() {
    c.clearRect(0, 0, canvasWidth, canvasHeight)
    myCircle.update()
    for (let i = 0; i < circleArray.length; i++) {
        circleArray[i].update()
    }
    window.requestAnimationFrame(updateAll)
}

updateAll()
