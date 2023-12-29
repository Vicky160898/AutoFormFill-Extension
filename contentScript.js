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

// function waitForElement(xpath, callback) {
//   try {
//     var element = document.evaluate(
//       xpath,
//       document,
//       null,
//       XPathResult.FIRST_ORDERED_NODE_TYPE,
//       null
//     ).singleNodeValue;

//     if (element) {
//       callback(element);
//     } else {
//       setTimeout(function () {
//         waitForElement(xpath, callback);
//       }, 100);
//     }
//   } catch (error) {
//     console.error("Error in waitForElement:", error);
//   }
// }

// function fillForm() {
//   waitForElement(
//     "/html/body/app-root/app-home/div[3]/app-login/p-dialog[1]/div/div/div[2]/div[2]/div/div[2]/div[2]/div[2]/form/div[1]/input",
//     function (usernameInput) {
//       waitForElement("//input[@type='password']", function (passwordInput) {
//         chrome.storage.sync.get("myKey", function (result) {
//           console.log("result.......", result);
//           const storedData = JSON.parse(result.myKey);

//           if (storedData) {
//             // Fill in the username and password

//             usernameInput.value = storedData.username;
//             passwordInput.value = storedData.password;

//             // Trigger change events

//             usernameInput.dispatchEvent(new Event("input"));
//             passwordInput.dispatchEvent(new Event("input"));

//             console.log("Form filled successfully!");

//             // Optionally, you can submit the form programmatically
//             //var form = usernameInput.closest('form');
//             //form.submit();
//             waitForElement(
//               "html/body/app-root/app-home/div[3]/div/app-main-page/div/div/div[1]/div[1]/div[1]/app-jp-input/div/form/div[2]/div[2]/div[1]/p-calendar/span/input",
//               function (firstElementInput) {
//                 // Split the date string by "-"
//                 const parts = storedData.date.split("-");
//                 const formattedDate = `${parts[2]}/${parts[1]}/${parts[0]}`;
//                 firstElementInput.value = formattedDate;
//                 // Trigger input and change events
//                 firstElementInput.dispatchEvent(new Event("input"));
//                 firstElementInput.dispatchEvent(new Event("change"));
//               }
//             );

//             waitForElement(
//               "html/body/app-root/app-home/div[3]/div/app-train-list/div[2]/app-modify-search/div/form/div[2]/div[1]/div[3]/p-calendar/span/input",
//               function (dateInputElement) {
//                 const parts = storedData.date.split("-");
//                 const formattedDate = `${parts[2]}/${parts[1]}/${parts[0]}`;

//                 // Log the current value before setting it
//                 console.log("Before setting value:", dateInputElement.value);

//                 // Set the value attribute of the input element
//                 dateInputElement.value = formattedDate;

//                 // Log the value after setting it
//                 console.log("After setting value:", dateInputElement.value);
//                 // Trigger input and change events
//                 firstElementInput.dispatchEvent(new Event("input"));
//                 firstElementInput.dispatchEvent(new Event("change"));
//               }
//             );

//             waitForElement(
//               "html/body/app-root/app-home/div[3]/div/app-main-page/div/div/div[1]/div[1]/div[1]/app-jp-input/div/form/div[2]/div[1]/div[1]/p-autocomplete/span/input",
//               function (firstElementInput) {
//                 firstElementInput.value = storedData.destination;
//                 firstElementInput.dispatchEvent(new Event("input"));
//               }
//             );
//             waitForElement(
//               "html/body/app-root/app-home/div[3]/div/app-main-page/div/div/div[1]/div[1]/div[1]/app-jp-input/div/form/div[2]/div[1]/div[2]/p-autocomplete/span/input",
//               function (firstElementInput) {
//                 firstElementInput.value = storedData.pickup;
//                 firstElementInput.dispatchEvent(new Event("input"));
//               }
//             );
//             waitForElement(
//               '//span[@class="ng-tns-c65-12 ui-dropdown-label ui-inputtext ui-corner-all ng-star-inserted"]',
//               function (firstElementInput) {
//                 firstElementInput.textContent = storedData.classCoach;
//                 firstElementInput.dispatchEvent(new Event("input"));
//                 firstElementInput.dispatchEvent(new Event("change"));
//               }
//             );
//             waitForElement(
//               '//span[@class="ng-tns-c65-33 ui-dropdown-label ui-inputtext ui-corner-all ng-star-inserted"]',
//               function (firstElementInput) {
//                 firstElementInput.textContent = storedData.classCoach;
//                 firstElementInput.dispatchEvent(new Event("input"));
//                 firstElementInput.dispatchEvent(new Event("change"));
//               }
//             );
//           } else {
//             console.log(
//               "Could not find the username or password input fields."
//             );
//           }
//         });
//       });
//     }
//   );
// }

// //Try logging inside the function
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

// contentScript.js

function waitForElement(xpath, callback) {
  try {
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
  } catch (error) {
    console.error("Error in waitForElement:", error);
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

            // Update the date input in the main page
            updateDateInput(
              "/html/body/app-root/app-home/div[3]/div/app-main-page/div/div/div[1]/div[1]/div[1]/app-jp-input/div/form/div[2]/div[2]/div[1]/p-calendar/span/input",
              storedData.date
            );

            // Update the date input in the train-list page
            updateDateInput(
              "html/body/app-root/app-home/div[3]/div/app-train-list/div[2]/app-modify-search/div/form/div[2]/div[1]/div[3]/p-calendar/span/input",
              storedData.date
            );

            // Update other input fields
            updateInputField(
              "html/body/app-root/app-home/div[3]/div/app-main-page/div/div/div[1]/div[1]/div[1]/app-jp-input/div/form/div[2]/div[1]/div[1]/p-autocomplete/span/input",
              storedData.destination
            );

            updateInputField(
              "html/body/app-root/app-home/div[3]/div/app-main-page/div/div/div[1]/div[1]/div[1]/app-jp-input/div/form/div[2]/div[1]/div[2]/p-autocomplete/span/input",
              storedData.pickup
            );

            // Update dropdowns
            updateDropdown(
              '//span[@class="ng-tns-c65-12 ui-dropdown-label ui-inputtext ui-corner-all ng-star-inserted"]',
              storedData.classCoach
            );

            updateDropdown(
              '//span[@class="ng-tns-c65-33 ui-dropdown-label ui-inputtext ui-corner-all ng-star-inserted"]',
              storedData.classCoach
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

function updateDateInput(xpath, date) {
  waitForElement(xpath, function (dateInputElement) {
    const parts = date.split("-");
    const formattedDate = `${parts[2]}/${parts[1]}/${parts[0]}`;

    // Log the current value before setting it
    console.log("Before setting value:", dateInputElement.value);

    // Set the value attribute of the input element
    dateInputElement.value = formattedDate;

    // Log the value after setting it
    console.log("After setting value:", dateInputElement.value);

    // Trigger input and change events
    dateInputElement.dispatchEvent(new Event("input"));
    dateInputElement.dispatchEvent(new Event("change"));
  });
}

function updateInputField(xpath, value) {
  waitForElement(xpath, function (inputElement) {
    inputElement.value = value;
    inputElement.dispatchEvent(new Event("input"));
  });
}

function updateDropdown(xpath, value) {
  waitForElement(xpath, function (dropdownElement) {
    dropdownElement.textContent = value;
    dropdownElement.dispatchEvent(new Event("input"));
    dropdownElement.dispatchEvent(new Event("change"));
  });
}

// Try logging inside the function
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

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "fillForm") {
    console.log("loaded the form");
    fillForm();
  }
});

// chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
//   if (changeInfo.status === "complete") {
//     fillForm();
//   }
//});
