exports.handler = function(event, context, callback) {

    let listOfSiteFolders = ['01-JavaScript-Drum-Kit', '02-JS-and-CSS-Clock', '03-CSS-Variables'];

    const { head_commit: { added, removed, modified } } = JSON.parse(event.body)

    const send = (a, r, m) => {
        callback(null, {
            statusCode: 200,
            body: JSON.stringify(
                {
                    added: a,
                    removed: r,
                    modified: m
                })
        });
    }

    // Make sure HTTP method is POST
    if (event.httpMethod == 'POST') {

        listOfSiteFolders.forEach(siteFolder => {
            let allFiles = added.concat(removed, modified);

            if (allFiles.some(file => file.includes(siteFolder))) {
                console.log(siteFolder);
            }
        });

        send(added, removed, modified);
    }
}