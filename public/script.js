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

async function onClick() {
  const tab = await getCurrentTab();
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: toggleMute,
  });
}

(async () => {
  const commands = await chrome.commands.getAll();
  const toggleCommand = commands.find(({ name }) => name === "toggle-mute");
  if (toggleCommand) {
    const hint = document.getElementById("hint");
    hint.innerText = toggleCommand.shortcut;
    hint.onclick = onClick;
  }
})();
