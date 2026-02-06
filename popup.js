async function updatePopup() {
  const tabs = await chrome.tabs.query({});
  const count = tabs.length;
  
  document.getElementById('count').textContent = count;
  
  chrome.storage.local.get(['peakTabs', 'times50', 'times100'], function(data) {
    let peakTabs = data.peakTabs || 0;
    let times50 = data.times50 || 0;
    let times100 = data.times100 || 0;

    if (count > peakTabs) {
      peakTabs = count;
      chrome.storage.local.set({ peakTabs: peakTabs });
    }
    
    document.getElementById('peakTabs').textContent = peakTabs;
    document.getElementById('times50').textContent = times50;
    document.getElementById('times100').textContent = times100;
  });
  
  
  let message = "";
  if (count < 5) message = "Looking good! ";
  if (count >= 9) message = "Getting a bit crowded in here...";
  if (count >= 13) message = "This is getting out of hand ";
  if (count >= 20) message = "Your RAM is starting to sweat ";
  if (count >= 25) message = "Okay what could you possibly be doing with all these? ";
  if (count >= 30) message = "Do you even remember what's in tab 1?";
  if (count >= 50) message = "Your browser hates you right now ";
  if (count >= 100) message = "SEEK PROFESSIONAL HELP ";
  
  document.getElementById('message').textContent = message;
}


document.getElementById('closeAllBtn').addEventListener('click', async () => {
  const tabs = await chrome.tabs.query({});

  const currentTab = await chrome.tabs.query({ active: true, currentWindow: true });
  const currentTabId = currentTab[0].id;
  
  const tabsToClose = tabs.filter(tab => tab.id !== currentTabId);
  const tabIdsToClose = tabsToClose.map(tab => tab.id);
  
  if (tabIdsToClose.length > 0) {
    chrome.tabs.remove(tabIdsToClose);
  }
  setTimeout(updatePopup, 100);
});

updatePopup();