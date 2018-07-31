/**
 * VoiCo Extension for Firefox
 * Copyright (C) 2018 Olav Schettler
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
const VOICO = 'https://voico.de';
//const VOICO = 'http://voico.test';
const SHORTCODE = 'https://08sn6hlbok.execute-api.eu-west-1.amazonaws.com/default';
const ALEXA_PROMPT = 'Alexa, starte Chefkoch mit Rezept-Code: ';

function sayAlexa(words) {
  let u = new SpeechSynthesisUtterance();
  u.lang = 'de-DE';

  return function () {
    u.text = ALEXA_PROMPT + words;
    speechSynthesis.speak(u);
  }
}

function capWords(words) {
  return words.replace(/((\s|^)\S)/gi, m => m.toUpperCase()); 
}

function post(url, data, callback) {
  const xhr = new XMLHttpRequest();
  if (typeof callback === 'undefined') {
    callback = data;
    data = {};
  }
  xhr.open('POST', url);
  xhr.setRequestHeader('Content-type', 'application/json');
  
  xhr.onload = function() {
    if (xhr.status === 200) {
      callback(xhr.responseText);
    }
    else {
      console.log("POST failed", xhr.status);
    }
  };
  xhr.send(JSON.stringify(data));
}

function showInfo(tabs) {
  const p_btn = document.getElementById('btn');
  const p_command = document.getElementById('command');
  const input_code = document.getElementById('code');

  let qr_url = VOICO + '/qr/?url='
      + encodeURIComponent(tabs[0].url);

  document.getElementById('qr').src = qr_url;

  let match = tabs[0].url.match(/^https:\/\/www\.chefkoch\.de\/rezepte\/(\d+)/);

  console.log("MATCH", match);

  if (match) {
    post(SHORTCODE + '?url=' + encodeURIComponent(tabs[0].url), function (words) {
      let btn = document.createElement('button');
      btn.innerText = 'Dieses Rezept auf deiner Alexa!';
      btn.onclick = sayAlexa(words);
      p_btn.appendChild(btn);
      p_command.appendChild(document.createTextNode(
        ALEXA_PROMPT + capWords(words.replace(',', ', '))));
        input_code.value = words;
    });
  }
}

function onError(error) {
  console.log(`Error: ${error}`);
}

function feedback(e) {
  e.preventDefault();

  const form_feedback = document.getElementById('feedback');
  const p_alert = document.getElementById('alert');
  const values = {
    code: form_feedback.elements.code.value,
    worked: e.target.value
  };
  
  post(VOICO + '/feedback', values, () => {
    p_alert.appendChild(document.createTextNode('Vielen Dank für die Rückmeldung!'));
    setTimeout(() => { p_alert.innerHTML = ''; }, 2000);
  });
}

browser.tabs.query({active: true, currentWindow: true})
  .then(showInfo, onError);

document.getElementById('yes').onclick = feedback;
document.getElementById('no').onclick = feedback;