var statusDisplay;
var worker;
var searchButton;
var rocket;
var primesBox;

window.onload = function() {
  primesBox = document.getElementById("primesBox");
  statusDisplay = document.getElementById("status");
  searchButton = document.getElementById("searchButton");
  rocket = document.querySelector('.rocket')
};

function doSearch() {
  searchButton.setAttribute('disabled', true);

  var fromNum = document.getElementById("from").value;
  var toNum = document.getElementById("to").value;

  worker = new Worker('worker.js');
  worker.onmessage = receiveWorkerMsg;
  worker.onerror = workerError;
  
  worker.postMessage({ 
     from: fromNum,
     to: toNum
  })

  statusDisplay.innerHTML = `
  A web worker is on the job from ${fromNum} to ${toNum}...
  `  
}

function receiveWorkerMsg(event) {
  var message = event.data;
  // Report precent progress for Progress Type message
  if(message.messageType == 'Progress') {
    statusDisplay.innerText = `T minus ${100 - message.data} and counting...`
    return
  }
  // If no primes found, report that
  if(message.data.length == 0) statusDisplay.innerHTML = "Search failed to find any results.";
  // If primes found then display them and ignite rocket!
  primesBox.innerHTML = message.data.join(', ')
  statusDisplay.innerHTML = "We have liftoff!!";
  searchButton.setAttribute('disabled', false);
  rocket.classList.add('lift')
}

function workerError(error) {
  statusDisplay.innerHTML = error.message;
}

function cancelSearch() {
  worker.terminate();
  worker = null;
  statusDisplay.innerHTML = "Search cancelled.";
  searchButton.setAttribute('disabled', false);
}

