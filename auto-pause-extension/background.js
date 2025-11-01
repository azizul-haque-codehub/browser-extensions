chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({
    enabled: true,
    playTime: 5,
    breakTime: 3
  });
});

chrome.commands.onCommand.addListener((command) => {
  if (command === "skip-break") {
    chrome.tabs.query({active:true, currentWindow:true}, (tabs) => {
      if (!tabs[0]) return;
      chrome.tabs.sendMessage(tabs[0].id, {action: "skipBreak"});
    });
  } else if (command === "toggle-auto-break") {
    chrome.storage.sync.get("enabled", (data) => {
      chrome.storage.sync.set({enabled: !data.enabled});
    });
  }
});
