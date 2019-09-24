require('dotenv').config()
const fetch = require('node-fetch').default;

exports.handler = function(event, context, callback) {

    const { head_commit: { added, removed, modified } } = JSON.parse(event.body)

    /* let sites = [
        {
            siteFolder: "01-JavaScript-Drum-Kit",
            netlifyEndPoint: "https://api.netlify.com/build_hooks/5d7e2fff8202d6a2a653d93f"
        }, 
        {
            siteFolder: "02-JS-and-CSS-Clock",
            netlifyEndPoint: "https://api.netlify.com/build_hooks/5d7fb3beeccc183b2829a418"
        }
    ] */
    
    let siteFolder = process.env['SITE_1_FOLDER'];
    let siteNetlifyEndpoint = process.env['SITE_1_NETLIFY_ENDPOINT'];

    let sites = [];

    for (let i = 2; siteFolder || siteNetlifyEndpoint; i++) {
        sites.push({
            siteFolder: siteFolder,
            netlifyEndPoint: siteNetlifyEndpoint
        });
        siteFolder = process.env[`SITE_${i}_FOLDER`];
        siteNetlifyEndpoint = process.env[`SITE_${i}_NETLIFY_ENDPOINT`];
    }
    
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

        const fetchOptions = {
            method: 'POST',
            headers: {
                'Content-type': 'application/x-www-form-urlencoded'
            }
        };
        
        sites.forEach(async ({ siteFolder, netlifyEndPoint }) => {
            
            const isSiteFolder = allFiles.some(file => file.includes(siteFolder));
            
            if (isSiteFolder) {
                console.log(`Triggering deploy for ${siteFolder}`);
                console.log(netlifyEndPoint);
        
                try {
                    await fetch(netlifyEndPoint, fetchOptions).then(console.log);
                } catch (error) {
                  console.log({ error });
                }
            }
        });

        send(added, removed, modified);
    }
}