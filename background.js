(() => {
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log("request....", request);
    if (request) {
      // Save values to Chrome storage
      var key = "myKey",
        testPrefs = JSON.stringify(request.obj);
      var jsonfile = {};
      jsonfile[key] = testPrefs;
      chrome.storage.sync.set(jsonfile, function () {
        console.log("Saved", key, testPrefs);
        // chrome.runtime.sendMessage({ closePopup: true });
      });
    }
  });

  chrome.webNavigation.onCompleted.addListener(function (details) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { action: "fillForm" });
    });
  });

  // chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  //   if (changeInfo.status === "complete") {
  //     // Send a message to the content script to trigger fillForm
  //     chrome.tabs.sendMessage(tabId, { action: "fillForm" });
  //   }
  // });
})();

// chrome.tabs.onUpdated.addListener((tabId, tab) => {
//   console.log(tab, "tab");
//   if (tab.url && tab.url.includes("localhost:3000")) {
//     console.log(tab.url, "tgythhh");
//     // const queryParameters = tab.url.split("?")[1];
//     // const urlParameters = new URLSearchParams(queryParameters);

//     // chrome.tabs.sendMessage(tabId, {
//     //   type: "NEW",
//     //   videoId: urlParameters.get("v"),
//     // });
//   } else {
//     console.log("its not a correct url.");
//   }
// });
