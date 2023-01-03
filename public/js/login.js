async function loginFormHandler(event) {
  event.preventDefault();

  const username = document.querySelector('#username').value.trime();
  const password = document.querySelector('#password').value.trim();

  if (username && password) {
    const response = await fetch('api/users/login' , {
      method: 'post',
      body: JSON.stringify({
        username,
        password
      }),
      headers: {'content-type': 'application/json'}
    });

    if (response.ok) {
      document.location.replace('/dashboards');
    } else {
      alert(response.statusText);
    }
  }
}

document.querySelector('#login-form').addEventListener('submit', loginFormHandler)