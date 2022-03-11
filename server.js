const fs = require(`fs`);
const path = require(`path`);
const express = require(`express`);
const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.get(`/`, function (req, res) {
    fs.readFile(`book-db.json`, `utf8`, function(err, data){
        const bookDbArray = JSON.parse(data);
        
        let content = `
            <head>
                <title>Book Database</title>
                <link rel="preconnect" href="https://fonts.googleapis.com">
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
                <link href="https://fonts.googleapis.com/css2?family=Big+Shoulders+Stencil+Text&display=swap" rel="stylesheet">
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
                <link rel="stylesheet" href="style/main.css">
            </head>
            <body>
                <div class="search__wrapper">
                    <span class="material-icons">menu</span>
                    <span>🔎</span> 
                    <span class="search__text">Search:</span>
                    <input type="search">
                </div>
                <div class="books__container">`;

        bookDbArray.forEach(
            (book) => {
                const longName = `${book.author.join(`, `)} - ${book.title} - ${book.subtitle} (${book.year}, ${book.publisher})`;
                content+=`
                    <div class="book__wrapper">
                        <div class="book__container">
                            <div>
                                <a href="document/${longName}.pdf" target="_blank">
                                    <img src="image/book/small/${longName}.png">
                                </a>
                            </div>
                            <div>
                                <hr>
                                <div class="book__title">
                                    ${book.title}
                                </div>
                                <div class="book__subtitle">
                                    ${book.subtitle}
                                </div>
                                <div class="book__tags">
                                    <span>${book.tags.join(`</span><span>`)}</span>
                                </div>
                                <div class="book__author">
                                    by ${book.author.join(`, `)}
                                </div>
                                <div class="book__publish-info">
                                    ${book.publisher}, ${book.year}
                                </div>
                            </div>
                        </div>
                    </div>`;
            }
        );

        content += `
                </div>
                <script src="script/main.js"></script>
            </body>`;
        res.send(content);
    });
});

const server = app.listen(8080, 
    () => {
        const host = server.address().address;
        const port = server.address().port;
        console.log(`Listening at http://${host}:${port}`);
    }
);