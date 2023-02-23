const commentForm = document.getElementById('comment');

commentForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  // Extract input values from the form
  const content = event.target.elements.content.value;
  const blogId = event.target.dataset.blogid;

  // Create comment object
  const commentData = { content, blog_id: blogId };

  try {
    // Send POST request to server with comment data
    const response = await fetch('/api/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(commentData)
    });

    // If response is successful, redirect to the blog page
    if (response.ok) {
      window.location.href = `/blog/${blogId}`;
    } else {
      console.log('Error:', response.status);
    }
  } catch (error) {
    console.log(error);
  }
});
