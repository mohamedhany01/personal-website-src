import { mkdirp } from 'mkdirp';

// The directory structure
const DIST = 'dist/script';

mkdirp(DIST).then((outputDir) => {
    console.log(`${outputDir} created successfully.`)
}).catch((err) => { console.log(err) });
