function submitForm(event) {
    event.preventDefault();
    
    // Get form values
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var date = document.getElementById('date').value;
    var cuisine = document.getElementById('cuisine').value;
    var comments = document.getElementById('comments').value;
    
    // Display confirmation message
    var confirmationMessage = document.createElement('p');
    confirmationMessage.textContent = 'Chef booked! Thank you, ' + name + ', for booking with us.';
    document.getElementById('bookingForm').appendChild(confirmationMessage);
  }
  