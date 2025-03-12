

export const handler = () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (!tabs || tabs.length === 0) {
      console.error("Không tìm thấy tab hợp lệ!");
      return;
    }
    const tabId = tabs[0].id;
    chrome.scripting.executeScript(
      {
        target: { tabId: tabId },
        files: ["/js/context/mbContext.js"],
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

                window.sendToBackend = async function (transactions) {
                  try {
                    const token = await chrome.storage.local.get("token");
                    console.log(token);
                    const API_ENDPONST = "http://localhost:2000/transaction/add";
                    const response = await fetch(API_ENDPONST, {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token.token}`,
                      },
                      body: JSON.stringify({ transactions }),
                    });
                    if (!response.ok) {
                      throw new Error(`Lỗi khi gửi dữ liệu: ${response.statusText}`);
                    }
                    console.log("Gửi dữ liệu thành công lên backend!");
                    alert("Đã lấy được dữ liệu giao dịch về hệ thống!");
                  } catch (error) {
                    console.error("Lỗi khi gửi dữ liệu", error);
                    alert("Có lỗi xảy ra, vui lòng thử lại!");
                  }
                  return;
                };
                console.log("Hàm sendToBackend đã được inject vào trang!");

                const observer = new MutationObserver((mutations, obs) => {
                  if (document.querySelector("table") && !window.isDataSent) {
                    obs.disconnect();
                    window.isDataSent = true;
                    let transactions = [];
                    let bankName = 'MBbank';

                    document.querySelectorAll("table tr").forEach((row) => {
                      let columns = row.querySelectorAll("td");
                      if (columns.length > 0) {
                        transactions.push({
                          date: columns[1] ? columns[1].innerText : "",
                          amount: columns[2] ? columns[2].innerText : "",
                          description: columns[4] ? columns[4].innerText : "",
                          bankName: bankName,
                        });
                      }
                    });
                    console.log(transactions);
                    if (window.sendToBackend) {
                      window.sendToBackend(transactions);
                    } else {
                      console.error("Hàm sendToBackend không tồn tại!");
                    }
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
};
