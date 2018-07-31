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
const SHORTCODE = 'https://08sn6hlbok.execute-api.eu-west-1.amazonaws.com/default';

function sayAlexa(words) {
  let u = new SpeechSynthesisUtterance();
  u.lang = 'de-DE';

  return function () {
    u.text = 'Alexa, starte Chefkoch mit Rezept Code, ' + words;
    speechSynthesis.speak(u);
  }
}

function post(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open('POST', url);
  xhr.onload = function() {
    if (xhr.status === 200) {
      callback(xhr.responseText);
    }
    else {
      console.log("POST failed", xhr.status);
    }
  };
  xhr.send();
}

function showInfo(tabs) {
  let p = document.getElementById('btn');
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
      p.appendChild(btn);
      p.appendChild(document.createTextNode(
          'Dein Browser spricht mit Alexa und startet so den Chefkoch Skill.'))
    });
  }
}

function onError(error) {
  console.log(`Error: ${error}`);
}

browser.tabs.query({active: true, currentWindow: true})
  .then(showInfo, onError);
