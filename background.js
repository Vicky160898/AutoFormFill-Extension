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
