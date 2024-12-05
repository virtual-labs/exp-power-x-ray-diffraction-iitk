//Your JavaScript goes in here
// type text js and speech js 

var text;
const typeSpeed = 60;
let english = true; // Initialize the 'english' variable with a default value
var matSelected = 1;
var timerId,
  typeTarget = $("#typer"),
  // tWrapper = $("#toast-wrapper"),
  ti = 0,
  currentStep = 0,
  contrast = 0,
  brightness = 0,
  vac = 0,
  av = 0,
  on = false,
  dropped = false,
  imgs = [],
  mode = 1,
  removeButtonclicked = false,
  inp = 0;

let isImageYDropped = false; // Flag to track if image-y has been dropped
function type(txt, cur = 0) {
  if (cur == txt.length) {
    timerId = -1;
    return;
  }
  if (cur == 0) {
    typeTarget.html("");
    clearTimeout(timerId);
  }
  typeTarget.append(txt.charAt(cur));
  timerId = setTimeout(type, typeSpeed, txt, cur + 1);
}


function start() {
  if (english) {
    type("Welcome, Get started by switching on the machine.");
    textToSpeech("Welcome, Get started by switching on the machine.");
  } else {
    type("मशीन को स्टार्ट बटन द्वारा चालू  करें|");
    textToSpeech("मशीन को स्टार्ट बटन द्वारा चालू करें", "hi-IN");
  }
}

function hindiVoice(btn) {
  english = false;
  start();

  document.getElementById("dialogue-box-parent").style.display = 'none';
}

function englishVoice(btn) {
  english = true;
  start();
  document.getElementById("dialogue-box-parent").style.display = 'none';
}

// text to speech 

function textToSpeech(text, lang) {
  const isSpeechSynthesisSupported = 'SpeechSynthesisUtterance' in window;

  if (isSpeechSynthesisSupported) {
    const utterance = new SpeechSynthesisUtterance();

    utterance.text = text;

    if (lang) {
      utterance.lang = lang;
    }

    // Check if speech synthesis is paused and resume it if necessary
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
    }

    // Start the speech synthesis
    window.speechSynthesis.speak(utterance);
  } else {
    alert("Synthesis Not Supported !");
    console.error("Speech synthesis is not supported in this browser.");
  }
}


// initial popup function of screen

$(function () {
  textToSpeech("WELCOME TO THE XRD SIMULATION");

  // Trigger another text-to-speech function after 2 seconds
  setTimeout(function () {
    // Call your second text-to-speech function here
    textToSpeech("अपनी सुविधा अनुसार भाषा का चयन करें।", "hi-IN");
  }, 1000);
});
const box = document.querySelector(".box");

// function moveBox() {
//   box.classList.toggle("moved");
// }





// machine on off button
const onButton = document.getElementById("onButton");
const offButton = document.getElementById("offButton");

onButton.addEventListener("click", () => {
  onButton.classList.add("green");
 
  offButton.classList.remove("green");
  onButton.disabled = true; // Disable the "On" button
  $("#material").prop("disabled", false);  // material unable when machine on 

  if (english) {
    type(" Select the Sample for testing "); //text 
    textToSpeech(" Select the Sample for testing");  // voice
  } else {
    type(" अपने एक्सपेरिनेट के अनुसार सैंपल का चयन करे।");
    textToSpeech(" अपने एक्सपेरिनेट के अनुसार सैंपल का चयन करे।", "hi-IN");
  }


});

offButton.addEventListener("click", () => {
  offButton.classList.remove("green");
 
  onButton.classList.remove("green");
  onButton.disabled = false; // Enable the "On" button
  window.location.reload();  // reload the whole window

});


// sample selection js 

function changeSampleImage() {

  $("#toggle").prop("disabled", false);  // Enabling the door 

  if (english) {
    type(" Open the Door of XRD Machine ! By Using  Door Button ");
    textToSpeech(" Open the Door of XRD Machine ! By Using  Door Button ");
  } else {
    type("  डोर बटन दबाकर एक्सआरडी मशीन के दरवाजे खोले।");
    textToSpeech("  डोर बटन दबाकर एक्सआरडी मशीन के दरवाजे खोले।", "hi-IN");
  }


}


// js for slider button
const voltageSlider = document.getElementById("voltage-slider");
const voltageValue = document.getElementById("voltage-value");

const currentSlider = document.getElementById("current-slider");
const currentValue = document.getElementById("current-value");

voltageSlider.addEventListener("input", function () {
  voltageValue.textContent = `${voltageSlider.value} kV`;

});

currentSlider.addEventListener("input", function () {
  currentValue.textContent = `${currentSlider.value} mA`;


});


// js for open gate 
const toggle = document.getElementById("toggle");
const leftDoor = document.getElementById("leftDoor");
const rightDoor = document.getElementById("rightDoor");

// Function to open the gate when the toggle is switched on
function openGate() {
  if (toggle.checked) {
    leftDoor.style.transform = "rotateY(-90deg)";
    rightDoor.style.transform = "rotateY(90deg)";
    box.classList.toggle("moved");
    $("#option1").prop("disabled", true); // x-ray tube off when gate on 
    // door close instruction 
    if (english) {
      type("  Close the Door of XRD Machine ! By Using  Door Button ");
      textToSpeech("  Close the Door of XRD Machine ! By Using  Door Button ");
    } else {
      type("  सैंपल का चयन हो चुका है । मशीन का दरवाजे बंद करे ।");
      textToSpeech("  सैंपल का चयन हो चुका है । मशीन का दरवाजे बंद करे ।", "hi-IN");
    }


  } else {
    // Close the gate when the toggle is switched off
    leftDoor.style.transform = "rotateY(0deg)";
    rightDoor.style.transform = "rotateY(0deg)";
    $("#material").prop("disabled", true);
    $("#option1").prop("disabled", false);  //x-ray tube On when gate on

    // Instruction steps after closing the door 
    if (english) {
      type("  On the X-ray tube Button By Click on StandBy Button ");
      textToSpeech("  On the X-ray tube Button By Click on StandBy Button ");
    } else {
      type("  स्टैंडबाई बटन को क्लिक कर के एक्स रे ट्यूब को चालू करें।");
      textToSpeech("  स्टैंडबाई बटन को क्लिक कर के एक्स रे ट्यूब को चालू करें।", "hi-IN");
    }

  }
}

// Add an event listener to open the gate when the toggle is changed
toggle.addEventListener("change", openGate);



// X-ray tube Stand By On/OFF instrunction for voltage

$("#option1").click(function () {
  $("#toggle").prop("disabled",true);
$("#voltage-slider").prop("disabled",false);
  if(english){
      type("  Now set Accelerating Voltage");
      textToSpeech("  Now set Accelerating Voltage ");
  }
  else {
      type("    अपने एक्सपेरिमेट के अनुसार एक्लेरेटिंग वोल्टेज का सेटकरने का प्रयास करें |");
      textToSpeech("    अपने एक्सपेरिमेट के अनुसार एक्लेरेटिंग वोल्टेज को सेट करने का प्रयास करें |","hi-IN");
  }

});

//voltage slider  value setting by double click 

$("#voltage-slider").dblclick(function () {
  // Disable the current-slider on double-click
  $("#voltage-slider").prop("disabled", true);
      // Enable the current-slider
    $("#current-slider").prop("disabled", false);

    if(english){
      type("  Now set  the Current ");
      textToSpeech("  Now set the Current ");
  }
  else {
      type("    अपने एक्सपेरिमेट के अनुसार करेंट को  सेटकरने का प्रयास करें |");
      textToSpeech("    अपने एक्सपेरिमेट के अनुसार करेंट को सेट करने का प्रयास करें |","hi-IN");
  }

});

// current value set by double clicking 

$("#current-slider").dblclick(function () {
  // Disable the current-slider on double-click
  $("#current-slider").prop("disabled", true);
      // Enable the start angle
    $("#start-angle").prop("disabled", false);

// instructiion for start angle 
if(english){
  type("  Now set  the Start Angle (2θ)");
  textToSpeech("  Now set  the Start Angle (2θ) ");
}
else {
  type("    अपने एक्सपेरिमेट के अनुसार प्रारंभिक कोण को  सेट करने का प्रयास करें |");
  textToSpeech("    अपने एक्सपेरिमेट के अनुसार प्रारंभिक कोण को सेट करने का प्रयास करें |","hi-IN");
}

});

function cal(){
  var a = parseFloat(document.getElementById('options1').value);
var b = parseFloat(document.getElementById('options2').value);

document.getElementById('result').value = a*b;
}

// function startScan(){
//   var x = document.getElementById('result').value = a*b;

//   if(x!=0){
//     <div class="col-xl-4 themed-grid-col">
//     <img class="graph" src="images/output/graph.png" id="graph" style="height: 70%; width:98%; display: none; "/>
//    </div>
//   }

// }
function startScan1(){
  const visibilites = document.getElementById('x-ray-source1');
  const visibilites1 = document.getElementById('detector-image1');
  visibilites.style.visibility="visible";
  visibilites1.style.visibility="visible";
}




























//  rotation of xray source according to start angle


function rotateAndMoveImages() {
  // Get the user input value for the start angle
  const startAngle = document.getElementById("start-angle").value;

  // Calculate the y-translation based on the start angle (adjust the factor as needed)
  const yTranslation = (-Math.sin((startAngle * Math.PI) / 180) * 100) / 2;

  // Apply rotations and translations to both images based on the start angle
  const xRaySourceImage = document.getElementById("x-ray-source");
  const detectorImage = document.getElementById("detector-image");

  // Rotate the X-ray source image based on the start angle
  xRaySourceImage.style.transform = `rotate(${startAngle / 10}deg) translateY(${yTranslation}px)`;

  // Rotate the detector image in the opposite direction
  detectorImage.style.transform = `rotate(${-startAngle / 10}deg) translateY(${yTranslation}px)`;
}




// js code for the dotted ray 

function moveDottedLine() {
  // Get the user input value for the end angle
  const endAngle = parseInt(document.getElementById("end-angle").value);

  // Calculate the new rotation for the dotted line (opposite direction)
  //const rotation = 28 - (endAngle - 75); // Start at 75 degrees and subtract the difference

  // Apply the new rotation to the dotted line
  // document.getElementById("dotted-line").style.transform = `translateX(-50%) rotate(${rotation}deg)`;
}

function showDottedLine() {
  // Get the end angle input value
  const endAngle = parseInt(document.getElementById("end-angle").value);

  // Show the dotted line when the input is enabled (end angle is not empty)
  if (!isNaN(endAngle)) {
    document.getElementById("dotted-line").style.display = "block";
  } else {
    document.getElementById("dotted-line").style.display = "none";
  }
}
















// js for graph 
const startScan = document.getElementById('startScan');
const graphImg = document.querySelector('graph');

startScan.addEventListener('click', () => {
  // Show the overlay image when the "Open Door" button is clicked
  setTimeout(function () {
    document.getElementById("graph").style.display = "block";
  }, 2000);
});




startScan.addEventListener('click', function () {

  const detector = document.getElementById("detector");
  const source = document.getElementById("source");

  source.style.animationName = "moveUpDown";
  detector.style.animationName = "oppMoveUpDown";
  setTimeout(function () {
      source.style.animationName = "moveUpDownZeroToDown";
      detector.style.animationName = "oppMoveUpDownZeroToDown";
  }, 5000);

  setTimeout(function () {
      source.style.animationName = "moveUpDownToOriginal ";
      detector.style.animationName = "oppMoveUpDownToOriginal";
  }, 10000);

});