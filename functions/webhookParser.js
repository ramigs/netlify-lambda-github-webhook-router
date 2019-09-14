exports.handler = function(event, context, callback) {

    const { head_commit: { added, removed, modified } } = JSON.parse(event.body)

/*     const send = (a, r, m) => {
        callback(null, {
            statusCode: 200,
            body: JSON.stringify({"added": a, "removed": r, "modified": m})
        });
    } */

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
        send(added, removed, modified);
    }
}