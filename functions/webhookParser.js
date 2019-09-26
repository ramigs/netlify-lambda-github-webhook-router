require('dotenv').config()
const fetch = require('node-fetch').default;

exports.handler = function(event, context, callback) {

    const { head_commit: { added, removed, modified } } = JSON.parse(event.body)
    
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
        
        console.log({sites});
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