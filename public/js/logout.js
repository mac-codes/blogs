const handleLogout = async (event) => {
  event.preventDefault();
  
  try {
    const response = await fetch('/api/users/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    
    if (response.ok) {
      window.location.replace('/login');
    } else {
      throw new Error(response.statusText);
    }
  } catch (error) {
    console.error(error);
    alert('Failed to log out');
  }
};

document.querySelector('#logout').addEventListener('click', handleLogout);