import * as express from 'express'
import * as htmlpdf from 'html-pdf-node'
import * as multer from 'multer'

const validation_key = process.env.SECURITY_KEY || 'replace_me_please'
const app = express()

function createKey(): string {
    var result = [];
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < 30; i++) {
        result.push(characters.charAt(Math.floor(Math.random() *
            charactersLength)));
    }
    return result.join('');
}

app.get('/', function (req, res) {
    res.send({
        version: '1.0.0'
    })
})
app.get('/gen', function (req, res) {
    res.send(createKey())
})
app.use(function (req, res, next) {
    if (req.query.authorization == validation_key) {
        next()
    } else {
        res.status(403).send({ error: 'Validation failed and therefore this request has failed.' })
    }
})
app.post('/html', multer().single('html'), function (req, res) {
    htmlpdf.generatePdf({
        content: req.body.html
    }, {
        options: {
            format: 'Letter'
        }
    }).then((pdf) => {
        res.setHeader('Content-Type', 'application/pdf')
        res.setHeader('Content-Disposition', `attachment; filename=download.pdf`)
        res.send(pdf)
    })
})

console.log(`Started app with validation key: "${validation_key}"`)
app.listen(process.env.PORT || 4000)