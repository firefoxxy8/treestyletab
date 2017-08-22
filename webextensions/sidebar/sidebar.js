/*
# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at http://mozilla.org/MPL/2.0/.
*/

function init() {
  window.addEventListener('unload', destroy, { once: true });
  gAllTabs = document.getElementById('all-tabs');
  gAllTabs.addEventListener('mousedown', omMouseDown);
  chrome.tabs.onActivated.addListener(onSelect);
  chrome.tabs.onUpdated.addListener(onUpdated);
  chrome.tabs.onCreated.addListener(onCreated);
  chrome.tabs.onRemoved.addListener(onRemoved);
  chrome.tabs.onMoved.addListener(onMoved);
  chrome.tabs.onAttached.addListener(onAttached);
  chrome.tabs.onDetached.addListener(onDetached);
  rebuildAll();
}

function destroy() {
  chrome.tabs.onActivated.removeListener(onSelect);
  chrome.tabs.onUpdated.removeListener(onUpdated);
  chrome.tabs.onCreated.removeListener(onCreated);
  chrome.tabs.onRemoved.removeListener(onRemoved);
  chrome.tabs.onMoved.removeListener(onMoved);
  chrome.tabs.onAttached.removeListener(onAttached);
  chrome.tabs.onDetached.removeListener(onDetached);
  gAllTabs.removeEventListener('mousedown', omMouseDown);
  gAllTabs = undefined;
}

function rebuildAll() {
  chrome.tabs.query({ currentWindow: true }, (aTabs) => {
    clear();
    var container = buildTabsContainerFor(aTabs[0].windowId);
    for (let tab of aTabs) {
      container.appendChild(buildTab(tab));
    }
    gAllTabs.appendChild(container);
  });
}

function clear() {
  var range = document.createRange();
  range.selectNodeContents(gAllTabs);
  range.deleteContents();
  range.detach();
}

window.addEventListener('DOMContentLoaded', init, { once: true });