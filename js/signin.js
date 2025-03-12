document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.querySelector(".login_form");
  const loginBtn = document.querySelector("#login_btn");
  loginBtn.addEventListener("click", async function (event) {
    event.preventDefault();

    const username = document.querySelector("#username").value.trim();
    const password = document.querySelector("#password").value.trim();

    if(!username || !password) {
      alert("Vui lòng nhập tên và mật khẩu!");
      return;
    }

    try {
      const response = await fetch("http://localhost:2000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password}),
      });
      const data = await response.json();
      if(!response.ok){
        throw new Error(data.message || "Đăng nhập thất bại");
      }
      alert("Đăng nhập thành công!");
      chrome.storage.local.set({ token: data.access_token });
      console.log(data.access_token);
      console.log(chrome.storage.local.get("token"));
      window.location.href = "/popup/selectBank.html";
    } catch (error) {
      alert(error.message);
    }
  })
})