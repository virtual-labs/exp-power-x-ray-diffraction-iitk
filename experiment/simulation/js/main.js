//Your JavaScript goes in here
// type text js and speech js 

var text;
const typeSpeed = 60;
let english = true; 
var matSelected = 1;
var timerId,
  typeTarget = $("#typer"),
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

//---------------------------------------------------------------
// TYPEWRITER
//---------------------------------------------------------------
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

//---------------------------------------------------------------
// START
//---------------------------------------------------------------
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

//---------------------------------------------------------------
// SPEECH
//---------------------------------------------------------------
function textToSpeech(text, lang) {
  const ok = 'SpeechSynthesisUtterance' in window;
  if (!ok) return;

  const utter = new SpeechSynthesisUtterance(text);
  if (lang) utter.lang = lang;

  if (window.speechSynthesis.paused) {
    window.speechSynthesis.resume();
  }

  window.speechSynthesis.speak(utter);
}

// Initial popup
$(function () {
  textToSpeech("WELCOME TO THE XRD SIMULATION");
  setTimeout(function () {
    textToSpeech("अपनी सुविधा अनुसार भाषा का चयन करें।", "hi-IN");
  }, 1000);
});

//---------------------------------------------------------------
// MACHINE ON/OFF
//---------------------------------------------------------------
const onButton = document.getElementById("onButton");
const offButton = document.getElementById("offButton");

onButton.addEventListener("click", () => {
  onButton.classList.add("green");
  offButton.classList.remove("green");
  onButton.disabled = true;

  $("#material").prop("disabled", false); 

  if (english) {
    type(" Select the Sample for testing ");
    textToSpeech(" Select the Sample for testing");
  } else {
    type(" अपने एक्सपेरिनेट के अनुसार सैंपल का चयन करे।");
    textToSpeech(" अपने एक्सपेरिनेट के अनुसार सैंपल का चयन करे।", "hi-IN");
  }
});

offButton.addEventListener("click", () => {
  offButton.classList.remove("green");
  onButton.classList.remove("green");
  onButton.disabled = false;
  window.location.reload();
});

//---------------------------------------------------------------
// SAMPLE SELECTION
//---------------------------------------------------------------
function changeSampleImage() {
  $("#toggle").prop("disabled", false);

  if (english) {
    type(" Open the Door of XRD Machine ! By Using Door Button ");
    textToSpeech(" Open the Door of XRD Machine ! By Using Door Button ");
  } else {
    type(" डोर बटन दबाकर एक्सआरडी मशीन के दरवाजे खोले।");
    textToSpeech(" डोर बटन दबाकर एक्सआरडी मशीन के दरवाजे खोले।", "hi-IN");
  }
}

//---------------------------------------------------
//---------------------------------------------------------------
// DOOR OPEN/CLOSE
//---------------------------------------------------------------
const toggle = document.getElementById("toggle");
const leftDoor = document.getElementById("leftDoor");
const rightDoor = document.getElementById("rightDoor");

function openGate() {
  if (toggle.checked) {
    leftDoor.style.transform = "rotateY(-90deg)";
    rightDoor.style.transform = "rotateY(90deg)";
    $("#option1").prop("disabled", true);

    if (english) {
      type(" Close the Door of XRD Machine !");
      textToSpeech(" Close the Door of XRD Machine !");
    } else {
      type(" मशीन का दरवाजा बंद करे।");
      textToSpeech(" मशीन का दरवाजा बंद करे।", "hi-IN");
    }

  } else {
    leftDoor.style.transform = "rotateY(0deg)";
    rightDoor.style.transform = "rotateY(0deg)";
    $("#material").prop("disabled", true);
    $("#option1").prop("disabled", false);

    if (english) {
      type(" On the X-ray tube using StandBy Button ");
      textToSpeech(" On the X-ray tube using StandBy Button ");
    } else {
      type(" स्टैंडबाइ बटन दबाकर एक्स रे चालू करें।");
      textToSpeech(" स्टैंडबाइ बटन दबाकर एक्स रे चालू करें।", "hi-IN");
    }
  }
}
toggle.addEventListener("change", openGate);

//---------------------------------------------------------------
// STANDBY CLICK → ENABLE VOLTAGE
//---------------------------------------------------------------
$("#option1").click(function () {
  $("#toggle").prop("disabled", true);
  $("#voltage-slider").prop("disabled", false);

  if (english) {
    type(" Now set Accelerating Voltage");
    textToSpeech(" Now set Accelerating Voltage");
  } else {
    type(" एकेलरेटिंग वोल्टेज सेट करें।");
    textToSpeech(" एकेलरेटिंग वोल्टेज सेट करें।", "hi-IN");
  }
});

//---------------------------------------------------------------
// DOUBLE CLICK VOLTAGE → ENABLE CURRENT

// VOLTAGE & CURRENT — INDEPENDENT SYSTEM (UPDATED)
// VOLTAGE & CURRENT — INDEPENDENT SYSTEM (UPDATED)
//---------------------------------------------------------------
//---------------------------------------------------------------
// VOLTAGE & CURRENT — INDEPENDENT SYSTEM (UPDATED)
//---------------------------------------------------------------
const voltageSlider = document.getElementById("voltage-slider");
const voltageValue = document.getElementById("voltage-value");

const currentSlider = document.getElementById("current-slider");
const currentValue = document.getElementById("current-value");

const setVoltage = document.getElementById("set-voltage");
const resetVoltage = document.getElementById("reset-voltage");

const setCurrent = document.getElementById("set-current");
const resetCurrent = document.getElementById("reset-current");

// LIVE VALUE UPDATE
voltageSlider.addEventListener("input", () => {
  voltageValue.textContent = `${voltageSlider.value} kV`;
});
currentSlider.addEventListener("input", () => {
  currentValue.textContent = `${currentSlider.value} mA`;
});

//----------------------
// SET VOLTAGE → ENABLE CURRENT
//----------------------
setVoltage.addEventListener("click", () => {
  window.speechSynthesis.cancel();  
  clearTimeout(timerId);
  typeTarget.html("");             

  // Disable voltage slider
  voltageSlider.disabled = true;

  // Enable current slider
  currentSlider.disabled = false;

  // Make voltage button colorless / disabled
  setVoltage.style.backgroundColor = "#d6d6d6";
  setVoltage.style.color = "#000";
  setVoltage.disabled = true;

  // Speak instructions for next step
  if (english) {
    type(" Now set the Current");
    textToSpeech(" Now set the Current");
  } else {
    type(" करंट सेट करें।");
    textToSpeech(" करंट सेट करें।", "hi-IN");
  }
});

//----------------------
// RESET VOLTAGE
//----------------------
resetVoltage.addEventListener("click", () => {
  voltageSlider.disabled = false;
  voltageSlider.value = 0;
  voltageValue.textContent = "0 kV";

  // Restore voltage button style
  setVoltage.style.backgroundColor = "";
  setVoltage.style.color = "";
  setVoltage.disabled = false;
});

//----------------------
// SET CURRENT → ENABLE START ANGLE
//----------------------
setCurrent.addEventListener("click", () => {
  window.speechSynthesis.cancel();  
  clearTimeout(timerId);
  typeTarget.html("");             

  // Disable current slider
  currentSlider.disabled = true;

  // Enable start angle input
  $("#start-angle").prop("disabled", false);

  // Make current button colorless / disabled
  setCurrent.style.backgroundColor = "#d6d6d6";
  setCurrent.style.color = "#000";
  setCurrent.disabled = true;

  // Speak instructions for next step
if (english) {
    type(" Now set all parameters: Start Angle (2θ), End Angle (2θ), Step Size, Scan Rate, and Scan Time. After setting all values, click on Start Scan to begin.");
    textToSpeech("Now set all parameters: Start Angle two theta, End Angle two theta, Step Size, Scan Rate, and Scan Time. After setting all values, click on Start Scan to begin.");
} else {
    type(" अब सभी मान सेट करें: प्रारंभिक कोण (2θ), अंतिम कोण (2θ), चरण आकार, स्कैन दर और स्कैन समय। सभी मान सेट करने के बाद, स्कैन शुरू करने के लिए Start Scan बटन पर क्लिक करें।");
    textToSpeech("अब सभी मान सेट करें: प्रारंभिक कोण दो थेटा, अंतिम कोण दो थेटा, चरण आकार, स्कैन दर और स्कैन समय। सभी मान सेट करने के बाद, स्कैन शुरू करने के लिए Start Scan बटन पर क्लिक करें।", "hi-IN");
}

});

//----------------------
// RESET CURRENT
//----------------------
resetCurrent.addEventListener("click", () => {
  currentSlider.disabled = false;
  currentSlider.value = 0;
  currentValue.textContent = "0 mA";

  // Restore current button style
  setCurrent.style.backgroundColor = "";
  setCurrent.style.color = "";
  setCurrent.disabled = false;
});


//---------------------------------------------------------------
// GRAPH + SCAN ANIMATION
//---------------------------------------------------------------
const startScan = document.getElementById('startScan');

startScan.addEventListener('click', () => {
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
    source.style.animationName = "moveUpDownToOriginal";
    detector.style.animationName = "oppMoveUpDownToOriginal";
  }, 10000);
});
function type(txt, cur = 0) {
  if (cur == txt.length) {
    timerId = -1;

    // Add scroll class after typing finishes
    $('#typer').addClass('scroll-animation');
    return;
  }
  if (cur == 0) {
    typeTarget.html("");
    clearTimeout(timerId);
  }
  typeTarget.append(txt.charAt(cur));
  timerId = setTimeout(type, typeSpeed, txt, cur + 1);
}

