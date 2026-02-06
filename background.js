chrome.tabs.onCreated.addListener(checkTabCount);
chrome.tabs.onRemoved.addListener(checkTabCount);

async function checkTabCount() {
  const tabs = await chrome.tabs.query({});
  const count = tabs.length;
  
  chrome.storage.local.get(['lastCount', 'times50', 'times100'], function(data) {
    const lastCount = data.lastCount || 0;
    let times50 = data.times50 || 0;
    let times100 = data.times100 || 0;
    
    if (lastCount < 50 && count >= 50) {
      times50++;
      chrome.storage.local.set({ times50: times50 });
    }
    
    if (lastCount < 100 && count >= 100) {
      times100++;
      chrome.storage.local.set({ times100: times100 });
    }
    
    chrome.storage.local.set({ lastCount: count });
  });
  
}

function showRoast(message) {
  chrome.notifications.create({
    type: 'basic',
    iconUrl: 'icon.png',
    title: 'Tab Overflow',
    message: message
  });
}