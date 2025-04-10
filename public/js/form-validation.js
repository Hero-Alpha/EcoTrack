document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Simple validation
            if (!name) {
                alert('Please enter your name');
                return;
            }
            
            if (!email) {
                alert('Please enter your email');
                return;
            } else if (!isValidEmail(email)) {
                alert('Please enter a valid email address');
                return;
            }
            
            if (!message) {
                alert('Please enter your message');
                return;
            }
            
            // Form submission would go here
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
            
            // Reset labels
            const labels = contactForm.querySelectorAll('label');
            labels.forEach(label => {
                label.style.top = '15px';
                label.style.left = '15px';
                label.style.fontSize = '16px';
                label.style.backgroundColor = 'transparent';
                label.style.padding = '0';
                label.style.color = '#95a5a6';
            });
        });
    }
    
    // Email validation helper
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
});