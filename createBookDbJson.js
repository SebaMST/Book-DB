const fs = require(`fs`);

let id = 1;

function bookToObject(file) {
    /*Example book pdf file name:
        Auth name1, ..., Auth nameN - Title - Subtitle (Year, Publisher).pdf
    */
    let fileName = file.slice(0,-4);
    let fileNameSplit = fileName.split(` (`);
    let fileAuthorTitleSubtitle = fileNameSplit[0].split(` - `);
    let fileYearPublisher = fileNameSplit[1].slice(0,-1).split(`, `);
    return {
        id: id++,
        author: fileAuthorTitleSubtitle[0].split(`, `),
        title: fileAuthorTitleSubtitle[1],
        subtitle: fileAuthorTitleSubtitle[2],
        tags: [/*initially empty array, they will be addeed manually into JSON file, for each book, for example, tags: ["Java", "Spring", "Frontend"]*/],
        publisher: fileYearPublisher[1],
        year: fileYearPublisher[0]
    }
}

fs.readdir(`${__dirname}/public/document`, (err, files) => {
    if (err) {
        console.log(err);
    }
    else {
        bookObjects = [];
        files.forEach(
            (file) => { 
                bookObjects.push(bookToObject(file)); 
            }
        );
        fs.writeFile(`book-db.json`, JSON.stringify(bookObjects), `utf8`, (err) => {
            if(err) {
                console.log(err);
            }
        });
    }
});