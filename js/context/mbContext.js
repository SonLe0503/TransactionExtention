const API_ENDPOINT = "";

async function senToBackend(transactions){
  try{
    const response = await fetch(API_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ transactions }),
    });
    if(!response.ok){
      throw new Error(`Lỗi khi gửi dữ liệu: ${response.statusText}`);
    }
    console.log("Gửi dữ liệu thành công lên backend!");
  }catch (error) {
    console.error("Lỗi khi gửi dữ liệu", error);
  }
}
export function extractTransactionsMB() {
  console.log(" Bắt đầu lấy dữ liệu giao dịch...");
  let transactions = [];

  document.querySelectorAll("table tr").forEach((row) => {
    let columns = row.querySelectorAll("td");
    if (columns.length > 0) {
      transactions.push({
        date: columns[1] ? columns[1].innerText : "", 
        amount: columns[2] ? columns[2].innerText : "",
        description: columns[4] ? columns[4].innerText : "",
      })
    }
  });
  console.log("Danh sách giao dịch:", transactions);
  senToBackend(transactions);
}