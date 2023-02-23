const loginFormHandler = async (event) => {
  event.preventDefault();

  const emailInput = document.querySelector('#email-login');
  const passwordInput = document.querySelector('#password-login');

  if (emailInput && passwordInput) {
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      window.location.href = '/';
    } else {
      alert('Failed to log in');
    }
  }
};

document.querySelector('.login-form').addEventListener('submit', loginFormHandler);

const signupFormHandler = async (event) => {
  event.preventDefault();

  const nameInput = document.querySelector('#name-signup');
  const emailInput = document.querySelector('#email-signup');
  const passwordInput = document.querySelector('#password-signup');
  const confirmPasswordInput = document.querySelector('#confirmPassword-signup');
  let alertMessage = '';

  const name = nameInput ? nameInput.value.trim() : '';
  const email = emailInput ? emailInput.value.trim() : '';
  const password = passwordInput ? passwordInput.value.trim() : '';
  const confirmPassword = confirmPasswordInput ? confirmPasswordInput.value.trim() : '';

  if (!name) {
    alertMessage += 'Missing name\n';
  }
  if (!email) {
    alertMessage += 'Missing email\n';
  }
  if (!password) {
    alertMessage += 'Missing password\n';
  }
  if (password.length < 8) {
    alertMessage += 'Password is smaller than 8 characters\n';
  }
  if (!confirmPassword || password !== confirmPassword) {
    alertMessage += "Passwords don't match\n";
  }

  if (alertMessage.length !== 0) {
    alert(alertMessage);
  } else {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      window.location.href = '/';
    } else {
      alert('Failed to sign up');
    }
  }
};

document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);
document.querySelector('.login-form').addEventListener('submit', loginFormHandler);