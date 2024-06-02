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
        for (const mutation of mutationsList) {
            if (mutation.type === 'childList') {
                mutation.addedNodes.forEach(node => {
                    // Function to traverse through the descendants of a node
                    const traverseDescendants = (element) => {
                        if (element.nodeType === 1 && element.tagName.toLowerCase() === 'input' && element.getAttribute('type') === 'advancedEditor') {
                            appendEditor(element);
                        } else {
                            // Check descendants
                            element.childNodes.forEach(child => {
                                traverseDescendants(child);
                            });
                        }
                    };
                    
                    // Check if the added node itself is an input with advancedEditor type
                    if (node.nodeType === 1 && node.tagName.toLowerCase() === 'input' && node.getAttribute('type') === 'advancedEditor') {
                        appendEditor(node);
                    } else {
                        // Check descendants
                        traverseDescendants(node);
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

    // Create the textarea as an editiable div
    const contentField = document.createElement('div');
    contentField.setAttribute('contenteditable', 'true');
    contentField.classList.add('textarea');
    contentField.addEventListener('input', ()=>{
        input.value = contentField.innerHTML;
        input.dispatchEvent(new Event('change'));
        input.dispatchEvent(new Event('input'));
    })
    
    // Set the default value
    contentField.innerHTML = input.value;

    // Create the menu bar
    const menuBar = document.createElement('div');
    menuBar.classList.add('menuBar');

    // Bold
    {
        const button = document.createElement('button');
        button.innerHTML = '<img width="15" src="https://raw.githubusercontent.com/MJDaws0n/HTMLRichTextEditor/main/icons/bold-solid.svg"></img>';
        button.addEventListener('click', ()=>{
            execCmd('bold');
        })
    
        menuBar.append(button);
    }
    // Italic
    {
        const button = document.createElement('button');
        button.innerHTML = '<img width="15" src="https://raw.githubusercontent.com/MJDaws0n/HTMLRichTextEditor/main/icons/italic-solid.svg"></img>';
        button.addEventListener('click', ()=>{
            execCmd('italic');
        })
    
        menuBar.append(button);
    }
    // Underline
    {
        const button = document.createElement('button');
        button.innerHTML = '<img width="15" src="https://raw.githubusercontent.com/MJDaws0n/HTMLRichTextEditor/main/icons/underline-solid.svg"></img>';
        button.addEventListener('click', ()=>{
            execCmd('underline');
        })
    
        menuBar.append(button);
    }
    // Strikethrough
    {
        const button = document.createElement('button');
        button.innerHTML = '<img width="15" src="https://raw.githubusercontent.com/MJDaws0n/HTMLRichTextEditor/main/icons/strikethrough-solid.svg"></img>';
        button.addEventListener('click', ()=>{
            execCmd('strikethrough');
        })
    
        menuBar.append(button);
    }
    // Clear format
    {
        const button = document.createElement('button');
        button.innerHTML = '<img width="15" src="https://raw.githubusercontent.com/MJDaws0n/HTMLRichTextEditor/main/icons/xmark-solid.svg"></img>';
        button.addEventListener('click', ()=>{
            execCmd('removeFormat');
        })
    
        menuBar.append(button);
    }
    // Left align
    {
        const button = document.createElement('button');
        button.innerHTML = '<img width="15" src="https://raw.githubusercontent.com/MJDaws0n/HTMLRichTextEditor/main/icons/align-left-solid.svg"></img>';
        button.addEventListener('click', ()=>{
            execCmd('justifyLeft');
        })
    
        menuBar.append(button);
    }
    // Center align
    {
        const button = document.createElement('button');
        button.innerHTML = '<img width="15" src="https://raw.githubusercontent.com/MJDaws0n/HTMLRichTextEditor/main/icons/align-center-solid.svg"></img>';
        button.addEventListener('click', ()=>{
            execCmd('justifyCenter');
        })
    
        menuBar.append(button);
    }
    // Right align
    {
        const button = document.createElement('button');
        button.innerHTML = '<img width="15" src="https://raw.githubusercontent.com/MJDaws0n/HTMLRichTextEditor/main/icons/align-right-solid.svg"></img>';
        button.addEventListener('click', ()=>{
            execCmd('justifyRight');
        })
    
        menuBar.append(button);
    }
    // Justify align
    {
        const button = document.createElement('button');
        button.innerHTML = '<img width="15" src="https://raw.githubusercontent.com/MJDaws0n/HTMLRichTextEditor/main/icons/align-justify-solid.svg"></img>';
        button.addEventListener('click', ()=>{
            execCmd('justifyFull');
        })
    
        menuBar.append(button);
    }
    // Ordered list
    {
        const button = document.createElement('button');
        button.innerHTML = '<img width="15" src="https://raw.githubusercontent.com/MJDaws0n/HTMLRichTextEditor/main/icons/list-ol-solid.svg"></img>';
        button.addEventListener('click', ()=>{
            execCmd('insertOrderedList');
        })
    
        menuBar.append(button);
    }
    // Unordered list
    {
        const button = document.createElement('button');
        button.innerHTML = '<img width="15" src="https://raw.githubusercontent.com/MJDaws0n/HTMLRichTextEditor/main/icons/list-ul-solid.svg"></img>';
        button.addEventListener('click', ()=>{
            execCmd('insertUnorderedList');
        })
    
        menuBar.append(button);
    }
    // Header type
    {
        const div = document.createElement('div');
        const select = document.createElement('select');
        select.innerHTML += `
        <option value="h1">Heading 1</option>
        <option value="h2">Heading 2</option>
        <option value="h3">Heading 3</option>
        <option value="h4">Heading 4</option>
        <option value="h5">Heading 5</option>
        <option value="h6">Heading 6</option>
        <option value="p">Paragraph</option>
        `;

        select.value = 'p';

        // Function to update the select dropdown based on the current formatting
        function updateSelectDropdown() {
            const currentFormat = document.queryCommandValue('formatBlock');
            if(currentFormat == '' || currentFormat == 'div'){
                select.value = 'p';
            } else{
                select.value = currentFormat;
            }
        }

        // Listen for input or keyup events on the input section
        contentField.addEventListener('input', updateSelectDropdown);
        contentField.addEventListener('keyup', updateSelectDropdown);
        contentField.addEventListener('click', updateSelectDropdown);
        contentField.addEventListener('change', updateSelectDropdown);

        select.addEventListener('change', (event)=>{
            execCmd('formatBlock', event.target.value)
        })
    
        div.append(select);
        menuBar.append(div);
    }
    // Undo
    {
        const button = document.createElement('button');
        button.innerHTML = '<img width="15" src="https://raw.githubusercontent.com/MJDaws0n/HTMLRichTextEditor/main/icons/rotate-left-solid.svg"></img>';
        button.addEventListener('click', ()=>{
            document.execCommand('undo');
        })
    
        menuBar.append(button);
    }
    // Redo
    {
        const button = document.createElement('button');
        button.innerHTML = '<img width="15" src="https://raw.githubusercontent.com/MJDaws0n/HTMLRichTextEditor/main/icons/rotate-right-solid.svg"></img>';
        button.addEventListener('click', ()=>{
            document.execCommand('redo');
        })
    
        menuBar.append(button);
    }
    // Background Colour
    {    
        const button = document.createElement('button');
        button.innerHTML = '<img width="15" src="https://raw.githubusercontent.com/MJDaws0n/HTMLRichTextEditor/main/icons/fill-drip-solid.svg"></img>';
        button.addEventListener('click', ()=>{
            execCmd('hiliteColor', '#ff0000');
        })
    
        menuBar.append(button);
    }
    // Background Clear
    {    
        const button = document.createElement('button');
        button.innerHTML = '<img width="15" src="https://raw.githubusercontent.com/MJDaws0n/HTMLRichTextEditor/main/icons/fill-solid.svg"></img>';
        button.addEventListener('click', ()=>{
            execCmd('hiliteColor', '#00000000');
        })
    
        menuBar.append(button);
    }  
    // Create URL
    {
        const button = document.createElement('button');
        button.innerHTML = '<img width="15" src="https://raw.githubusercontent.com/MJDaws0n/HTMLRichTextEditor/main/icons/link-solid.svg"></img>';
        button.addEventListener('click', ()=>{
            const url = prompt('Enter the URL:');
            if (url) {
              execCmd('createLink', url);
            }
        })
    
        menuBar.append(button);
    }
    // Unlink
    {
        const button = document.createElement('button');
        button.innerHTML = '<img width="15" src="https://raw.githubusercontent.com/MJDaws0n/HTMLRichTextEditor/main/icons/link-slash-solid.svg"></img>';
        button.addEventListener('click', ()=>{
            execCmd('unlink');
        })
    
        menuBar.append(button);
    }

    // Append the elements in the correct order
    newEditor.append(menuBar);
    newEditor.append(contentField);
}
function execCmd(command, value = null) {
    document.execCommand(command, false, value);
}
