document.addEventListener("DOMContentLoaded", () => {
  const transactionData = document.getElementById("transactionContainer");

  chrome.storage.local.get("transactions", (data) => {
    if(data.transactions && data.transactions.length > 0) {
      transactionData.innerHTML = "";
      data.transactions.forEach((tx) => {
        const messageDiv = document.createElement("div");
        messageDiv.classList.add("message");
        messageDiv.innerHTML = `<strong>${tx.date}</strong> | ${tx.description} | <b>${tx.amount}</b>`;
        transactionData.appendChild(messageDiv);
      })
    } else {
      transactionData.innerHTML = "Không có giao dịch nào.";
    }
  })
})