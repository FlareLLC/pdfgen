# PDFGen
This is a deployable Node.JS server that can convert HTML to PDFs. This is build on top of the Chrome automation framework called Puppeteer.

## API
#### `POST` /html
Send to this endpoint using multipart/form-data. Attach the HTML you'd like a PDF in a text/plain format.
For an example, check out [PDFGen.ts](https://gist.github.com/jacksonzamorano/4cfbdd2ae0f1952efe9b18354dcff605) - I use it for my own projects.

#### `GET` /gen
Sending a request to this endpoint will return a 30-character random string, which is the suggested length for a security key.

## How to deploy
### Heroku
1. Setup dyno with `heroku/nodejs` and `https://buildpack-registry.s3.amazonaws.com/buildpacks/jontewks/puppeteer.tgz` buildpacks.
2. Set `SECURITY_KEY` environment variable. You can generate one by calling the `/gen` endpoint and copying the output into the environment.
3. Restart dyons to save configuration.
### Manual
1. Clone repo.
2. `npm install`
3. Set `SECURITY_KEY` environment variable. You can generate one by calling the `/gen` endpoint and copying the output into the environment.
4. `npm start`


## Known Issues/Upcoming Updates
### Rate Limiting
A rate limit feature will be coming soon that would allow IPs that have invalid keys to be timed out.
