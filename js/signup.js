document.addEventListener('DOMContentLoaded', () => {
  const signupForm = document.querySelector('.signup_form');
  const signupBtn = document.getElementById('signup_btn');
  const backBtn = document.getElementById('btn_back');

  signupBtn.addEventListener('click', async (event) => {
    event.preventDefault();
    const email = document.getElementById('email').value.trim();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const rePassword = document.getElementById('re_password').value.trim();

    if(!email || !username || !password || !rePassword ) {
      alert('Vui long nhập thông tin đầy đủ');
      return;
    }
    if( password !== rePassword) {
      alert('Mật khẩu nhập lại không trung khớp');
      return;
    }

    try {
      const response = await fetch('http://localhost:2000/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, username, password}),
      });
      const data = await response.json();
      if(response.ok){
        alert('Đăng ký thành công! Hãy đăng nhập.');
        window.location.href = '/popup/signin.html';
      } else {
        alert(data.message || 'Đăng ký thất bại!');
      }
    }catch (error) {
      console.log('Lỗi khi gửi request:', error);
      alert('Có lỗi xảy ra, vui lòng thử lại!');
    }
  });
  backBtn.addEventListener('click', () => {
    window.location.href = '/popup/signin.html'
  })
})