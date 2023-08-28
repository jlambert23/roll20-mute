(async () => {
  const commands = await chrome.commands.getAll();
  const toggleCommand = commands.find(({ name }) => name === "toggle-mute");
  if (toggleCommand) {
    document.getElementById("hint").innerText = toggleCommand.shortcut;
  }
})();
