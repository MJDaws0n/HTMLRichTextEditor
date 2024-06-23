const debug = new URLSearchParams(window.location.search).get('debug') === 'true';

// Load jquery
if (typeof jQuery === 'undefined') {
    var script = document.createElement('script');
    script.src = 'https://code.jquery.com/jquery-3.6.0.min.js';

    script.onload = function() {
        debug && console.log('jQuery is loaded!');
    };

    document.head.appendChild(script);
} else {
    // jQuery is already loaded
    debug && console.log('jQuery is already loaded!');
}
// Load Sweetalert2
if (typeof swal === 'undefined') {
    var script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/sweetalert2@11.11.0/dist/sweetalert2.all.min.js';

    script.onload = function() {
        debug && console.log('Sweetalert2 script is loaded!');
    };

    document.head.appendChild(script);

    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdn.jsdelivr.net/npm/sweetalert2@11.11.0/dist/sweetalert2.min.css';

    link.onload = function() {
        debug && console.log('Sweetalert2 styles are loaded!');
    };

    document.head.appendChild(link);
} else {
    // Sweetalert2 is already loaded
    debug && console.log('Sweetalert2 is already loaded!');
}
// Load Coloris
if (typeof swal === 'undefined') {
    var script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/gh/mdbassit/Coloris@latest/dist/coloris.min.js';

    script.onload = function() {
        debug && console.log('Coloris script is loaded!');

        Coloris({
            themeMode: 'dark',
            alpha: false
        });
    };

    document.head.appendChild(script);

    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdn.jsdelivr.net/gh/mdbassit/Coloris@latest/dist/coloris.min.css';

    link.onload = function() {
        debug && console.log('Coloris styles are loaded!');
    };

    document.head.appendChild(link);
} else {
    // Sweetalert2 is already loaded
    debug && console.log('Coloris is already loaded!');
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

    // Select listner
    document.addEventListener('selectionchange', (event) => {
        const selection = window.getSelection();
        if (selection && selection.rangeCount > 0) {
            const selectedText = selection.toString();
            const selectionParentElement = selection.getRangeAt(0).commonAncestorContainer;

            // Check if the selected text is within the contentField
            if (contentField.contains(selectionParentElement)) {
                processHighlight();
            }
        }
    });
    
    // Set the default value
    contentField.innerHTML = input.value;

    // Create the menu bar
    const menuBar = document.createElement('div');
    menuBar.classList.add('menuBar');

    {

        function makeStandard(imgW, imgSrc, format){
            const button = document.createElement('button');
            button.setAttribute('data-ad-type', 'ad-'+format);
            button.innerHTML = '<img width="'+imgW.toString()+'" src="https://raw.githubusercontent.com/MJDaws0n/HTMLRichTextEditor/main/icons/'+imgSrc+'.svg"></img>';
            button.addEventListener('click', ()=>{
                applyFormatting(format)
            })
        
            return button;
        }
        menuBar.append(makeStandard(15, 'bold-solid', 'bold'));
        menuBar.append(makeStandard(15, 'italic-solid', 'italic'));
        menuBar.append(makeStandard(15, 'underline-solid', 'underline'));
        menuBar.append(makeStandard(15, 'strikethrough-solid', 'strikethrough'));
        menuBar.append(makeStandard(15, 'xmark-solid', 'clear'));
        menuBar.append(makeStandard(15, 'align-left-solid', 'align-left'));
        menuBar.append(makeStandard(15, 'align-center-solid', 'align-center'));
        menuBar.append(makeStandard(15, 'align-right-solid', 'right-right'));
        menuBar.append(makeStandard(15, 'align-justify-solid', 'right-justify'));
        menuBar.append(makeStandard(15, 'list-ol-solid', 'ordered-list'));
        menuBar.append(makeStandard(15, 'list-ul-solid', 'un-ordered-list'));

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
        // Font Size
        {

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
            button.innerHTML = '<img width="15" src="https://raw.githubusercontent.com/MJDaws0n/HTMLRichTextEditor/main/icons/paint-roller.svg"></img>';
            button.addEventListener('click', ()=>{
                const colour = menuBar.querySelector('.colourCircle').style.backgroundColor;
                execCmd('hiliteColor', colour);
            })
        
            menuBar.append(button);
        }
        // Background Clear
        {    
            const button = document.createElement('button');
            button.innerHTML = '<img width="15" src="https://raw.githubusercontent.com/MJDaws0n/HTMLRichTextEditor/main/icons/paint-roller-thin.svg"></img>';
            
            button.addEventListener('click', ()=>{
                execCmd('hiliteColor', '#00000000');
            })
        
            menuBar.append(button);
        }
        // Text Colour
        {    
            const button = document.createElement('button');
            button.innerHTML = '<img width="15" src="https://raw.githubusercontent.com/MJDaws0n/HTMLRichTextEditor/main/icons/paintbrush-solid.svg"></img>';
            button.addEventListener('click', ()=>{
                const colour = menuBar.querySelector('.colourCircle').style.backgroundColor;
                execCmd('foreColor', colour);
            })
        
            menuBar.append(button);
        }
        // Text Colour Clear
        {    
            const button = document.createElement('button');
            button.innerHTML = '<img width="15" src="https://raw.githubusercontent.com/MJDaws0n/HTMLRichTextEditor/main/icons/paintbrush.svg"></img>';
            
            button.addEventListener('click', ()=>{
                execCmd('foreColor', '#000000');
            })
        
            menuBar.append(button);
        }
        // Colour
        {    
            const button = document.createElement('button');
            button.innerHTML = '<span class="colourCircle" style="background-color: #00ff00"></span>';
            
            button.addEventListener('click', ()=>{
                button.id = 'colourSelector';
                // Custom menu
                Swal.fire({
                    title: "Background colour",
                    html: `<input type="text" data-coloris id="inputColour" onInput="document.querySelector('#colourSelector').children[0].style.backgroundColor = event.target.value">`,
                    showCloseButton: true,
                    confirmButtonText: 'Done',
                }).then(() => {
                    button.id = '';
                });
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
    }

    // Append the elements in the correct order
    newEditor.append(menuBar);
    newEditor.append(contentField);
}
function execCmd(command, value = null) {
    // Not used anymore
}


var selectedNode;

function processHighlight() {
    let selection = window.getSelection();
    if (selection.rangeCount > 0) {
        let range = selection.getRangeAt(0);
        selectedNode = range.startContainer.parentNode;

        if(doesHighlightContain('ad-bold')){
            document.querySelector('[data-ad-type="ad-bold"]').classList.add('active');
        } else{
            document.querySelector('[data-ad-type="ad-bold"]').classList.remove('active');
        }
        if(doesHighlightContain('ad-italic')){
            document.querySelector('[data-ad-type="ad-italic"]').classList.add('active');
        } else{
            document.querySelector('[data-ad-type="ad-italic"]').classList.remove('active');
        }
    }
    return null;
}

document.addEventListener('keydown', function(event) {
    if ((event.ctrlKey || event.metaKey) && (event.key === 'p' || event.key === 'P')) {
        event.preventDefault();

        let selection = window.getSelection();
        if (selection.rangeCount > 0) {
            let range = selection.getRangeAt(0);
            selectedNode = range.startContainer.parentNode;
            
            console.log(selectedNode);
        }
    }
});


function doesHighlightContain(x) {
    let selection = window.getSelection();
    if (selection.rangeCount > 0) {
        let range = selection.getRangeAt(0);
        selectedNode = range.startContainer.parentNode;

        if(selectedNode.classList.contains(x)){
            return true;
        } else{
            // See if a parent contains it
            let tempFind = selectedNode;
            while(tempFind && !tempFind.classList.contains(x) && !tempFind.getAttribute('data-advanced-edtior') && !tempFind.classList.contains(x+'-off')){
                if(tempFind.parentElement){
                    tempFind = tempFind.parentElement;
                } else{
                    break;
                }
            }

            // Check if the parent does contain it
            if(tempFind.classList.contains(x)){
                return true;
            }
            return false;
        }
    }
    return false;
}
function applyFormatting(command){
    if(doesHighlightContain('ad-'+command)){
        command = command + '-off';
    }
    if(command == 'bold'){
        const html = '<span class="ad-bold">'+getSelectedText()+'</span>';
        insertHTMLAtCursor(html);
        removeSelectedText();
    }
    if(command == 'bold-off'){
        const html = '<span class="ad-bold-off">'+getSelectedText()+'</span>';
        insertHTMLAtCursor(html);
        removeSelectedText();
    }
    if(command == 'italic'){
        const html = '<span class="ad-italic">'+getSelectedText()+'</span>';
        insertHTMLAtCursor(html);
        removeSelectedText();
    }
    if(command == 'italic-off'){
        const html = '<span class="ad-italic-off">'+getSelectedText()+'</span>';
        insertHTMLAtCursor(html);
        removeSelectedText();
    }
    if(command == 'underline'){
        const html = '<span class="">'+getSelectedText()+'</span>';
        insertHTMLAtCursor(html);
        removeSelectedText();
    }
}
function insertHTMLAtCursor(html) {
    let sel, range;
    if (window.getSelection) {
        // IE9 and non-IE
        sel = window.getSelection();
        if (sel.getRangeAt && sel.rangeCount) {
            range = sel.getRangeAt(0);
            range.deleteContents();

            // Create a temporary div to hold the HTML and insert its contents
            let tempDiv = document.createElement("div");
            tempDiv.innerHTML = html;
            let frag = document.createDocumentFragment(), node, lastNode;
            while ((node = tempDiv.firstChild)) {
                lastNode = frag.appendChild(node);
            }
            range.insertNode(frag);

            // Move the cursor to the end of the inserted content
            if (lastNode) {
                range = range.cloneRange();
                range.setStartAfter(lastNode);
                range.collapse(true);
                sel.removeAllRanges();
                sel.addRange(range);
            }
        }
    } else if (document.selection && document.selection.type != "Control") {
        // IE < 9
        document.selection.createRange().pasteHTML(html);
    }
}
function removeSelectedText() {
    let sel, range;
    if (window.getSelection) {
        sel = window.getSelection();
        if (sel.rangeCount) {
            range = sel.getRangeAt(0);
            range.deleteContents();
        }
    } else if (document.selection && document.selection.type !== "Control") {
        range = document.selection.createRange();
        range.text = "";
    }
}
function getSelectedText() {
    return window.getSelection().toString();
}