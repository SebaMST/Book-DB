# Book-DB
Book DB is an offline web application that might be used in order to read and manage pdf books.

**Technologies**
-Node and Express for the server
-JSON for simple database file

*** All files MUST follow this naming convention: ***Author 1, ..., Author N - Title - Subtitle (Year, Publisher)***

**Usage**
1) Install latest version of node;

2) Use ```npm install``` in the project repository folder;

4) Create a new directory in ```public``` named ```document``` which will contain .pdf book documents;

5) Create a new directory in ```public/image``` named ```book``` which will contain .png normal size images for the book covers;

6) Create another new directory in ```public/image/book``` named ```small``` which will contain .png small (242px * 170px) images for book covers;

7) Use ```node createBookDbJson.js``` in the project repository folder, which creates the ```book-db.json``` file. There you might add/remeove book tags;
 
8) Use ```node server.js``` in the project repository folder, which will run the local server;

9) Front-end accessible on ```localhost:8080``` by default.
