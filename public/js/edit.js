const updateBlog = document.getElementById('updateBlog');

updateBlog.addEventListener('submit', async (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);
  const updatedBlog = Object.fromEntries(formData.entries());
  const blogId = event.target.dataset.blogid;

  if (event.submitter.innerHTML === 'Update Post') {
    try {
      const response = await fetch(`/api/blogs/${blogId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedBlog)
      });

      if (response.ok) {
        window.location.href = '/dashboard';
      }
    } catch (error) {
      console.log(error);
    }
  } else if (event.submitter.innerHTML === 'Delete') {
    try {
      const response = await fetch(`/api/blogs/${blogId}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        window.location.href = '/dashboard';
      }
    } catch (error) {
      console.log(error);
    }
  }
});
