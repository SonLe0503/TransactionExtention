import { extractTransactionsMB } from "../context/mbContext.js";

export function runScriptInPage() {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (!tabs || tabs.length === 0) {
      console.error("Không tìm thấy tab hợp lệ!");
      return;
    }
    const tabId = tabs[0].id;
    chrome.scripting.executeScript(
      {
        target: { tabId: tabId },
        files: ["context/mbContext.js"],
      },
      () => {
        chrome.tabs.onUpdated.addListener(function listener(
          tabIdUpdated,
          changeInfo
        ) {
          if (tabIdUpdated === tabId && changeInfo.status === "complete") {
            chrome.scripting.executeScript({
              target: { tabId: tabId },
              func: () => {
                const interval = setInterval(() => {
                  const button = document.querySelector(
                    ".btn.btn-primary.abtn"
                  );

                  if (button) {
                    button.click();
                    clearInterval(interval);
                  }
                }, 1000);

                const observer = new MutationObserver((mutations, obs) => {
                  if (document.querySelector("table")) {
                    console.log(
                      "Table found, calling extractTransactionsMB..."
                    );
                    obs.disconnect();
                    extractTransactionsMB();
                  }
                });

                observer.observe(document.body, {
                  childList: true,
                  subtree: true,
                });
              },
            });
            chrome.tabs.onUpdated.removeListener(listener);
          }
        });
      }
    );
  });
}
runScriptInPage();
