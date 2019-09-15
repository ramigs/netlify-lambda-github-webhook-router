exports.handler = function(event, context, callback) {

    let sites = [
        {
            siteFolder: "01-JavaScript-Drum-Kit",
            netlifyEndPoind: "https://api.netlify.com/build_hooks/5d7e2fff8202d6a2a653d93f"
        }, 
        {
            siteFolder: "02-JS-and-CSS-Clock",
            netlifyEndPoind: "https://api.netlify.com/build_hooks/5d7e2fff8202d6a2a653d93f"
        },
        {
            siteFolder: "03-CSS-Variables",
            netlifyEndPoind: "https://api.netlify.com/build_hooks/5d7e2fff8202d6a2a653d93f" 
        }
    ]

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

        let allFiles = added.concat(removed, modified);

        sites.forEach(site => {
            
            if (allFiles.some(file => file.includes(site.siteFolder))) {
                console.log(site.siteFolder);
            }
        });

        //send(added, removed, modified);
    }
}