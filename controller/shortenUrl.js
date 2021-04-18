const Url = require("../models/url");
const validUrl = require('valid-url');
const { nanoid } = require('nanoid');

const getShortenURL = async (args) => {
    const baseUrl = process.env.BASE_URL;
    let { longUrl } = args;
    
    if (!validUrl.isHttpsUri(baseUrl)) {
        throw Error('invalid base url');
    }

    // create url code
    const urlCode = nanoid(6);

    //check long url
    if (validUrl.isHttpsUri(longUrl) || validUrl.isHttpUri(longUrl)) {
        try {
            let url = await Url.findOne({ longUrl })
            if (url) {
                return {
                    shortUrl: url.shortUrl
                }
            } else {
                const shortUrl = `${baseUrl}/${urlCode}`;

                url = new Url({
                    longUrl,
                    shortUrl,
                    urlCode,
                    data: new Date()
                });

                await url.save();

                return {
                    shortUrl: url.shortUrl
                }
            }
        }
        catch (err) {
            console.error(err);
            throw Error('Server error')
        }
    } else {
        throw Error('invalid long url');
    }
}


module.exports = getShortenURL;