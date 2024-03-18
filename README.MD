# Web Based Text Editor
This a basic web-based text editor written in HTML, CSS and JS

## Including
You can download the files and include with the following:
```html
<script src="textEditor.js"></script>
<link rel="stylesheet" href="textEditor.css">
```

Or, optionaly, you can use the WebWorks CDN with:
```html
<script src="https://webworkshub.online/cdn/rich_text_editor/textEditor.js?ver=1.0.2"></script>
<link rel="stylesheet" href="https://webworkshub.online/cdn/rich_text_editor/textEditor.css?ver=1.0">
```

## Usage
Simply use:
```HTML
<input type="advancedEditor"/>
```

To set a value you can use:
```HTML
<input type="advancedEditor" value="Text Content"/>
```

To set a value with bold or other features use:
```HTML
<input type="advancedEditor" value="<b>Bold text</b> <u>Underlined text</u>"/>
```

To access the value. You simply use .value. For example:
```HTML
<input type="advancedEditor" id="myInput"/>

<script>
// Example to get the value set
document.getElementById('myInput').value;
</script>
```

To check for updates you can simply use onchange or oninput
```HTML
<input type="advancedEditor" id="myInput"/>

<script>
// Example to get the value set
document.getElementById('myInput').addEventListener('input', (e)=>{
    console.log(e.target.value);
});
</script>
```

This could be simplified by using oninput rather than making a listner
```HTML
<input type="advancedEditor" id="myInput" oninput="console.log(this.value);"/> <!-- Optionaly use event.target.value -->
```

# Disclaimer
Some listners may not work propery as these have to be manually triggerd and the only events set are `change/onchange` and `input/oninput`
