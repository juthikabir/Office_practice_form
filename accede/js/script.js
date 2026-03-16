// ============================================
// MESSAGE CONFIGURATION - Change messages here!
// ============================================
const MESSAGES = {
    emptyFields: '아이디 또는 비밀번호를 <br> 확인해 주세요.',
    loginSuccess: 'Login Successful!',
    welcomeBack: 'Welcome back!',
    invalidCredentials: 'Invalid ID or Password',
};


// FUNCTIONS

function clearInput(id) {
    const input = document.getElementById(id);
    input.value = '';
    input.focus();
    toggleClearIcon(input);
    toggleHintText(input);
}

function toggleClearIcon(input) {
    const icon = input.nextElementSibling;
    const idValue = document.getElementById('idInput').value;
    const passwordValue = document.getElementById('passwordInput').value;
    
    // Hide × if both fields are filled, otherwise show if current field has text
    if (idValue.length > 0 && passwordValue.length > 0) {
        icon.style.display = 'none';
    } else if (input.value.length > 0) {
        icon.style.display = 'inline';
    } else {
        icon.style.display = 'none';
    }
}

function toggleHintText(input) {
    const wrapper = input.closest('.mb-3');
    const hint = wrapper.querySelector('.input-hint');
    if (input.value.length > 0) {
        hint.style.display = 'none';
    } else {
        hint.style.display = 'block';
    }
}

// Modal function
function showModal(message) {
    const modalMessage = document.getElementById('modalMessage');
    modalMessage.innerHTML = message;

    const modal = new bootstrap.Modal(document.getElementById('customModal'));
    modal.show();
}

// Wait for page to fully load before attaching listeners
window.addEventListener('DOMContentLoaded', function() {
    // Login page functionality
    if(document.getElementById('idInput')) {
        document.getElementById('idInput').addEventListener('input', function() {
            toggleClearIcon(this);
            toggleHintText(this);
            // Also update password field's × button
            toggleClearIcon(document.getElementById('passwordInput'));
        });
    }
    
    if(document.getElementById('passwordInput')) {
        document.getElementById('passwordInput').addEventListener('input', function() {
            toggleClearIcon(this);
            toggleHintText(this);
            // Also update ID field's × button
            toggleClearIcon(document.getElementById('idInput'));
        });
    }

    // Form submission handler
    if(document.querySelector('form')) {
        document.querySelector('form').addEventListener('submit', function(e) {
            e.preventDefault();

            const id = document.getElementById('idInput').value;
            const password = document.getElementById('passwordInput').value;

            // Show Message using MESSAGES configuration
            if (!id || !password) {
                showModal(MESSAGES.emptyFields);
            } else {
                showModal(MESSAGES.loginSuccess);
            }
        });
    }

    // Selection Page - Card Click Handlers
    if(document.getElementById('employeeCard')) {
        document.getElementById('employeeCard').addEventListener('click', function() {
            window.location.href = 'join.html?type=login';
        });
    }

    if(document.getElementById('companyCard')) {
        document.getElementById('companyCard').addEventListener('click',function() {
            window.location.href = 'join.html?type=register';
        });
    }
});
