// Load jquery
if (typeof jQuery === 'undefined') {
    var script = document.createElement('script');
    script.src = 'https://code.jquery.com/jquery-3.6.0.min.js';

    script.onload = function() {
        console.log('jQuery is loaded!');
    };

    document.head.appendChild(script);
} else {
    // jQuery is already loaded
    console.log('jQuery is already loaded!');
}

// Code for checking for new and old editors
document.addEventListener('DOMContentLoaded', ()=>{
    const advancedEditorInputs = document.querySelectorAll('input[type="advancedEditor"]');
    advancedEditorInputs.forEach(input => {
        appendEditor(input);
    });


    // Select the target node
    const targetNode = document.body;

    // Options for the observer (which mutations to observe)
    const config = { attributes: false, childList: true, subtree: true };

    // Callback function to execute when mutations are observed
    const callback = function(mutationsList, observer) {
        for(const mutation of mutationsList) {
            if (mutation.type === 'childList') {
                mutation.addedNodes.forEach(node => {
                    if (node.nodeType === 1 && node.tagName.toLowerCase() === 'input' && node.getAttribute('type') === 'advancedEditor') {
                        appendEditor(node);
                    }
                });
            }
        }
    };

    // Create an observer instance linked to the callback function
    const observer = new MutationObserver(callback);

    // Start observing the target node for configured mutations
    observer.observe(targetNode, config);
})

function appendEditor(input){
    // Create the base editor
    const newEditor = document.createElement('div');

    // Add details
    newEditor.setAttribute('data-advanced-edtior', 'true');

    // Add the editor
    input.before(newEditor);

    // Move the input field and set it invisible
    newEditor.append(input);
    input.type='hidden'

    // Create the textarea
    const contentField = document.createElement('textarea');
    contentField.addEventListener('input', ()=>{
        input.value = contentField.value;
        input.dispatchEvent(new Event('change'));
        input.dispatchEvent(new Event('input'));
    })

    // Create the menu bar
    const menuBar = document.createElement('div');
    menuBar.classList.add('menuBar');


    // Example button
    const testButton = document.createElement('button');
    testButton.textContent = 'Bold';

    menuBar.append(testButton);

    // Append the elements in the correct order
    newEditor.append(menuBar);
    newEditor.append(contentField);
}
