function clearInput(id) {
    const input = document.getElementById(id);
    input.value = '';
    input.focus();
    toggleClearIcon(input);
    toggleHintText(input);  // This will show the hint text again
}

function toggleClearIcon(input) {
    const icon = input.nextElementSibling;
    if (input.value.length > 0) {
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

// Wait for page to fully load before attaching listeners
window.addEventListener('DOMContentLoaded', function() {
    document.getElementById('idInput').addEventListener('input', function() {
        toggleClearIcon(this);
        toggleHintText(this);
    });
    document.getElementById('passwordInput').addEventListener('input', function() {
        toggleClearIcon(this);
        toggleHintText(this);
    });
});