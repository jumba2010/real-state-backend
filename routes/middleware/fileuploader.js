const express = require('express');
const multer = require('multer');
const { Storage } = require('@google-cloud/storage');
const app = express();
const router=express.Router();

const WebSocket = require('ws');
const wss = new WebSocket.Server({ server: app });

const storage = new Storage();

const bucket = storage.bucket(process.env.BUCKET_NAME);
const upload = multer({ dest: 'uploads/' });

router.post('/', upload.array('files'), async (req, res) => {
  const files = req.files;
  const uploadId = generateId();
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const options = {
      gzip: true,
      metadata: {
        cacheControl: process.env.GCP_CACHE_CONTROL,
      },
      public: true,
      resumable: true,
      validation: 'crc32c',
    };
    const remoteFile = bucket.file(file.originalname);
    const stream = file.createReadStream();
    const writeStream = remoteFile.createWriteStream(options);

    stream.pipe(writeStream);

    writeStream.on('error', (err) => {
      console.error(`Error: ${err}`);
      res.status(500).send(err);
    });

    writeStream.on('finish', () => {
      res.send('File uploaded successfully');
    });

    writeStream.on('progress', (event) => {
        const progress = (event.bytesWritten / event.totalBytes) * 100;
        console.log(`Upload progress: ${progress}`);
        wss.clients.forEach(client => {
          if (client.uploadId === uploadId) {
            client.send(JSON.stringify({ progress }));
          }
        });

        /**
         * This progress will be consumed in the client side like this:
         * const ws = new WebSocket('ws://yourserver.com/upload');
         ws.onmessage = (event) => {
         const { progress } = JSON.parse(event.data);
         console.log(`Progress: ${progress}`);
         // update progress bar
          }
         * 
         */
      });
      

  }
});

module.exports=router;

