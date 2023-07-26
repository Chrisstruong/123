import { useEffect } from "react";
import * as monaco from 'monaco-editor'
// import onedarkpro from '../themes/one_dark_pro.json'
const MonacoEditorComponent = () => {
    useEffect(() => {
      // Fetch the theme JSON file (Replace 'your_theme.json' with the actual path to your theme JSON file)
      fetch('../themes/one_dark_pro.json')
        .then((response) => response.json())
        .then((themeData) => {
          // Apply the theme to Monaco Editor
          monaco.editor.defineTheme('myTheme', themeData);
  
          // Get the Monaco Editor instance
          const editor = monaco.editor.create(document.getElementById('editor'), {
            value: 'Your code goes here',
            language: 'javascript', // Replace with the language you are using
            theme: 'myTheme', // Use the theme name you defined above
          });
        })
        .catch((error) => {
          console.error('Error loading theme:', error);
        });
    }, []);
  
    return <div id="editor" style={{ height: '500px' }}></div>;
  };
  
  export default MonacoEditorComponent;