function clickHandler(e) {
  chrome.storage.local.clear();
  	
  alert("OK !");
}

document.addEventListener('DOMContentLoaded', function () {
  document.querySelector('button').addEventListener('click', clickHandler); 
});
