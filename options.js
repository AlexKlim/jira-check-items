function clickHandler(e) {
  var red_color = document.getElementById('red_color').checked;

  var obj = {};
  obj['red_color'] = red_color;
  chrome.storage.local.set(obj);

}

document.addEventListener('DOMContentLoaded', function () {
  document.querySelector('button').addEventListener('click', clickHandler);
});

function afterLoad(){
  var check_box = document.getElementById('red_color');

  chrome.storage.local.get('red_color', function(items){
    var check = items.red_color;

    if(check != null) {
      check_box.checked = check;
    }
  });

}

window.onload = afterLoad;


