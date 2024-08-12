async function getCurrentTab() {
  const [tab] = await chrome.tabs.query({
    active: true,
    lastFocusedWindow: true,
  });
  return tab;
}

function toggleMute() {
  const muteButton = document.querySelector(
    "div.video-container > div.player-bookmark.ui-draggable.ui-draggable-handle > div.av-controls > i:nth-child(1)",
  );
  muteButton.click();
}

chrome.commands.onCommand.addListener(async (command) => {
  console.log({ command });
  if (command === "toggle-mute") {
    const currentTab = await getCurrentTab();
    chrome.scripting.executeScript({
      target: { tabId: currentTab?.id },
      func: toggleMute,
      args: ["action"],
    });
  }
});
