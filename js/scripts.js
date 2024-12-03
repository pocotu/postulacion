// JavaScript functions for the university registration application

// Function to validate the registration form
function validateRegistrationForm() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const phone = document.getElementById('phone').value;
    let valid = true;

    // Validate name
    if (name.trim() === '') {
        alert('Please enter your name.');
        valid = false;
    }

    // Validate email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert('Please enter a valid email address.');
        valid = false;
    }

    // Validate password
    if (password.length < 6) {
        alert('Password must be at least 6 characters long.');
        valid = false;
    }

    // Validate phone
    const phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(phone)) {
        alert('Please enter a valid phone number (10 digits).');
        valid = false;
    }

    return valid;
}

// Function to handle document upload progress
function handleDocumentUpload() {
    const uploadInput = document.getElementById('documentUpload');
    const progressBar = document.getElementById('uploadProgress');

    uploadInput.addEventListener('change', function() {
        const file = uploadInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadstart = function() {
                progressBar.style.width = '0%';
            };
            reader.onprogress = function(event) {
                if (event.lengthComputable) {
                    const percentComplete = (event.loaded / event.total) * 100;
                    progressBar.style.width = percentComplete + '%';
                }
            };
            reader.onloadend = function() {
                progressBar.style.width = '100%';
            };
            reader.readAsDataURL(file);
        }
    });
}

// Function to display notifications on the dashboard
function displayNotifications(notifications) {
    const notificationContainer = document.getElementById('notificationContainer');
    notificationContainer.innerHTML = '';

    notifications.forEach(notification => {
        const notificationElement = document.createElement('div');
        notificationElement.className = 'notification';
        notificationElement.textContent = notification;
        notificationContainer.appendChild(notificationElement);
    });
}

// Initialize functions on page load
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('registrationForm')) {
        document.getElementById('registrationForm').onsubmit = function() {
            return validateRegistrationForm();
        };
        handleDocumentUpload();
    }

    if (document.getElementById('dashboard')) {
        const notifications = ['Your application is under review.', 'Document missing: Proof of identity.'];
        displayNotifications(notifications);
    }
});