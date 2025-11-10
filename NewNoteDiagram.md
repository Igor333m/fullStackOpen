sequenceDiagram
Browser->>+Server: When the button on the form is clicked, the browser will send the user input to the server.
Server-->>-Browser: The server responds with HTTP status code 302 redirect.
Browser->>+Server: Browser makes a new HTTP GET request to /notes.
Server-->>-Browser: Browser receives Notes HTML
Browser->>+Server: Browser makes a new HTTP GET request to /main.css.
Server-->>-Browser: Browser receives main.css
Browser->>+Server: Browser makes a new HTTP GET request to /main.js.
Server-->>-Browser: Browser receives main.js
Browser->>+Server: Browser makes a new HTTP GET request to /data.json.
Server-->>-Browser: Browser receives data.json
