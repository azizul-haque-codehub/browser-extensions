document.addEventListener('DOMContentLoaded', () => {
  const enabledEl = document.getElementById('enabled');
  const playEl = document.getElementById('playTime');
  const breakEl = document.getElementById('breakTime');
  const status = document.getElementById('status');

  chrome.storage.sync.get(['enabled','playTime','breakTime'], (data) => {
    enabledEl.checked = (data.enabled === undefined) ? true : data.enabled;
    playEl.value = data.playTime || 5;
    breakEl.value = data.breakTime || 3;
  });

  document.getElementById('save').addEventListener('click', () => {
    const enabled = enabledEl.checked;
    const playTime = Math.max(1, parseInt(playEl.value) || 5);
    const breakTime = Math.max(1, parseInt(breakEl.value) || 3);
    chrome.storage.sync.set({enabled, playTime, breakTime}, () => {
      status.innerText = '✅ Saved';
      setTimeout(()=> status.innerText = '', 1200);
    });
  });

  document.getElementById('reset').addEventListener('click', () => {
    chrome.storage.sync.set({enabled:true, playTime:5, breakTime:3}, () => {
      enabledEl.checked = true;
      playEl.value = 5;
      breakEl.value = 3;
      status.innerText = 'Reset to defaults';
      setTimeout(()=> status.innerText = '', 1200);
    });
  });
});
