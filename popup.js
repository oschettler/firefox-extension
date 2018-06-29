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

function showInfo(tabs) {
  let qr_url = VOICO + '/qr/?url='
      + encodeURIComponent(tabs[0].url);

  document.getElementById('qr').src = qr_url;

  let re = new RegExp('^https://www.chefkoch.de/rezepte/(\d+)');
  let match = tabs[0].url.match(re);
  let id;
  if (match) {
    let id = match[1];

    let u = new SpeechSynthesisUtterance();
    u.text = 'Alexa, starte Chefkoch mit Rezept ' + id;
    u.lang = 'de-DE';
    speechSynthesis.speak(u);
  }
}

function onError(error) {
  console.log(`Error: ${error}`);
}

browser.tabs.query({active: true, currentWindow: true})
  .then(showInfo, onError);
