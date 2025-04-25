document.getElementById('reviewForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  // Get form values
  const title = document.getElementById('courseTitle').value.trim();
  const code = document.getElementById('courseCode').value.trim().toUpperCase();
  const rating = parseInt(document.getElementById('rating').value);
  const description = document.getElementById('reviewText').value.trim();
  
  // Validate form
  if (!title || !code || isNaN(rating) || !description) {
      alert('Please fill in all required fields!');
      return;
  }
  
  if (!/^[A-Za-z]{4}\d{3}$/.test(code)) {
      alert('Course code must be 4 letters followed by 3 digits (e.g., ITCS333)');
      return;
  }
  
  // Create review object
  const newReview = {
      id: Date.now(),
      title,
      code,
      rating,
      description,
      date: new Date().toISOString()
  };
  
  // Save to localStorage
  let reviews = JSON.parse(localStorage.getItem('reviews')) || [];
  reviews.push(newReview);
  localStorage.setItem('reviews', JSON.stringify(reviews));
  
  // Redirect to main page
  window.location.href = 'index.html';
});