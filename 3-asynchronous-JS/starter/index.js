const fs = require('fs');
const superagent = require('superagent');

const readFilePro = file => {
    return new Promise((resolve, reject) => {
        fs.readFile(file, (err, data) => {
            if (err) reject('I could not find that file😭');  //So if there was an error here, then call the reject function. And whatever we pass into this one will be the error that is later available in the catch method.
            resolve(data);    //Whatever we pass into this function here, into the resolve function,is the result of the promise that will be available in the then handler.
        });
    });
};

const writeFilePro = (file, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(file, data, err => {
            if (err) reject('Could not find that file😭');
            resolve('success');
        });
    });
};


//So these asynchronous functions will do asynchronous work without ever blocking the Event Loop
const getDogPic = async () => {
    try {
        const data = await readFilePro(`${__dirname}/dog.txt`);
        console.log(`Breed: ${data}`);

        const res1Pro = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
        const res2Pro = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
        const res3Pro = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
        const all = await Promise.all([res1Pro, res2Pro, res3Pro]);
        const imgs = all.map(el => el.body.message)
        console.log(imgs)

        await writeFilePro('dog-img.txt', imgs.join('\n'));
        console.log('Random dog image to file!');
    } catch (err) {
        console.log(err);
    }
}
getDogPic();


/*
//so this data argument(in 'then' argu) here will be exactly what we returned from the promise in case it was successful.
readFilePro(`${__dirname}/dog.txt`)
    .then(data => {
        console.log(`Breed: ${data}`);
        return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
    })
    .then(res => {
        console.log(res.body.message);
        return writeFilePro('dog-img.txt', res.body.message);
    })
    .then(() => {
        console.log('Random dog image saved to file!!');
    })
    .catch(err => {
        console.log(err); 
    });


// We replace this callback with promise above :
// fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
    // console.log(`Breed: ${data}`);

    // superagent
    //     .get(`https://dog.ceo/api/breed/${data}/images/random`)
    //     .then(res => {
    //         console.log(res.body.message);

    //         fs.writeFile('dog-img.txt', res.body.message, err => {
    //             if (err) return console.log(err.message);
    //             console.log('Random dog image to file!');
    //         });
    //     })
    //     .catch(err => {
    //         console.log(err.message);
    //     })
// });

*/


