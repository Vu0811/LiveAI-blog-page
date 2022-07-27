const {spawn} = require('child_process');

export default async function handler(req, res) {
  //console.log(req);
  const filename = req.body.split('\n')[3];
  const args = '../public/uploads/' + filename;
  //console.log([`python/bird-classification.py`, args.replace(/\r?\n|\r/g, "")]);
    let python = spawn('python', [`python/bird-classification.py`, args.replace(/\r?\n|\r/g, "")]);
    let dataToSend = '';

    for await (const data of python.stdout){
      //console.log(data.toString());
      dataToSend += data.toString().split()[0];
    }
    return res.status(200).json({ message: dataToSend});
}