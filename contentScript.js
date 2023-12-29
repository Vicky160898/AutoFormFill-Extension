//this for react app form.

// function fillForm() {
//   chrome.storage.sync.get("myKey", function (result) {
//     console.log("result.......", result);
//     const storedData = JSON.parse(result.myKey);
//     console.log("result data:", storedData);
//     if (storedData) {
//       // Find the username and password input fields using XPath
//       var usernameInput = document.evaluate(
//         '//*[@id="username"]',
//         document,
//         null,
//         XPathResult.FIRST_ORDERED_NODE_TYPE,
//         null
//       ).singleNodeValue;
//       var passwordInput = document.evaluate(
//         '//*[@id="password"]',
//         document,
//         null,
//         XPathResult.FIRST_ORDERED_NODE_TYPE,
//         null
//       ).singleNodeValue;

//       var rememberMeCheckbox = document.evaluate(
//         '//*[@id="rememberMe"]',
//         document,
//         null,
//         XPathResult.FIRST_ORDERED_NODE_TYPE,
//         null
//       ).singleNodeValue;

//       // Check if the input fields and checkbox are found
//       if (usernameInput && passwordInput && rememberMeCheckbox) {
//         // Fill in the username, password, and set the checkbox value
//         usernameInput.value = storedData.username;
//         passwordInput.value = storedData.password;
//         rememberMeCheckbox.checked = storedData.rememberMe;

//         console.log("Form filled successfully!");
//         // Optionally, you can submit the form programmatically
//         // var form = usernameInput.closest('form');
//         // form.submit();
//       } else {
//         console.log(
//           "Could not find the username, password, or rememberMe checkbox."
//         );
//       }
//     }
//     // Use storedData as needed
//   });
// }

// // Try logging inside the function
// fillForm();

// document.addEventListener("DOMContentLoaded", fillForm);

// // Listen for changes in the storage
// chrome.storage.onChanged.addListener(function (changes, namespace) {
//   for (var key in changes) {
//     if (key === "myKey" && namespace === "sync") {
//       fillForm(); // Update the form when storage changes
//     }
//   }
// });

//*[@id="rememberMe"]

//this is for the train login...
// console.log("Content script loaded!");

function waitForElement(xpath, callback) {
  var element = document.evaluate(
    xpath,
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null
  ).singleNodeValue;

  if (element) {
    callback(element);
  } else {
    setTimeout(function () {
      waitForElement(xpath, callback);
    }, 100);
  }
}

function fillForm() {
  waitForElement(
    "/html/body/app-root/app-home/div[3]/app-login/p-dialog[1]/div/div/div[2]/div[2]/div/div[2]/div[2]/div[2]/form/div[1]/input",
    function (usernameInput) {
      waitForElement("//input[@type='password']", function (passwordInput) {
        chrome.storage.sync.get("myKey", function (result) {
          console.log("result.......", result);
          const storedData = JSON.parse(result.myKey);

          if (storedData) {
            // Fill in the username and password

            usernameInput.value = storedData.username;
            passwordInput.value = storedData.password;

            // Trigger change events

            usernameInput.dispatchEvent(new Event("input"));
            passwordInput.dispatchEvent(new Event("input"));

            console.log("Form filled successfully!");

            // Optionally, you can submit the form programmatically
            // var form = usernameInput.closest('form');
            // form.submit();

            waitForElement(
              "html/body/app-root/app-home/div[3]/div/app-main-page/div/div/div[1]/div[1]/div[1]/app-jp-input/div/form/div[2]/div[2]/div[1]/p-calendar/span/input",
              function (firstElementInput) {
                firstElementInput.value = storedData.date;
                firstElementInput.dispatchEvent(new Event("input"));
              }
            );
            waitForElement(
              "html/body/app-root/app-home/div[3]/div/app-main-page/div/div/div[1]/div[1]/div[1]/app-jp-input/div/form/div[2]/div[1]/div[1]/p-autocomplete/span/input",
              function (firstElementInput) {
                firstElementInput.value = storedData.destination;
                firstElementInput.dispatchEvent(new Event("input"));
              }
            );
            waitForElement(
              "html/body/app-root/app-home/div[3]/div/app-main-page/div/div/div[1]/div[1]/div[1]/app-jp-input/div/form/div[2]/div[1]/div[2]/p-autocomplete/span/input",
              function (firstElementInput) {
                firstElementInput.value = storedData.pickup;
                firstElementInput.dispatchEvent(new Event("input"));
              }
            );
            waitForElement(
              '//*[@id="journeyQuota"]/div/div[2]/span',
              function (firstElementInput) {
                firstElementInput.value = storedData.classCoach;
                firstElementInput.dispatchEvent(new Event("change"));
              }
            );
          } else {
            console.log(
              "Could not find the username or password input fields."
            );
          }
        });
      });
    }
  );
}

//Try logging inside the function
fillForm();

document.addEventListener("DOMContentLoaded", fillForm);

// Listen for changes in the storage
chrome.storage.onChanged.addListener(function (changes, namespace) {
  for (var key in changes) {
    if (key === "myKey" && namespace === "sync") {
      fillForm(); // Update the form when storage changes
    }
  }
});
