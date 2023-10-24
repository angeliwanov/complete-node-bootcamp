const fs = require("fs");
const superagent = require("superagent");

const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject("I could not find that file");
      resolve(data);
    });
  });
};

const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject("Could not write the file");
      resolve("success");
    });
  });
};

//ASYNC PROMISSE
// readFilePro(`${__dirname}/dog.txt`)
//   .then((data) => {
//     console.log(`Breed ${data}`);
//     return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
//   })
//   .then((res) => {
//     console.log(res.body.message);
//     return writeFilePro("dog-img.txt", res.body.message);
//     // fs.writeFile("dog-img.txt", res.body.message, (err) => {
//     //   if (err) return console.log(err.message);
//     // });
//   })
//   .then(() => console.log(`Dog image saved to file`))
//   .catch((err) => console.log(err));

//ASYNC AWAIT
const getDogPic = async () => {
  try {
    const data = await readFilePro(`${__dirname}/dog.txt`);
    console.log(`Breed ${data}`);
    // const res = await superagent.get(
    //   `https://dog.ceo/api/breed/${data}/images/random`
    // );

    // AWAITING 3 PROMISES
    const res1 = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res2 = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res3 = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const all = await Promise.all([res1, res2, res3]);
    const imgs = all.map((el) => el.body.message);
    console.log(imgs);

    // console.log(res.body.message);
    // await writeFilePro("dog-img.txt", res.body.message);
    await writeFilePro("dog-img.txt", imgs.join("\n"));
    console.log("FILE SUCCESSFULLY CREATED");
  } catch (err) {
    console.log(err);
    throw err;
  }
  return "2: READY";
};

getDogPic();

//ASYNC AWAIT
// (async () => {
//   try {
//     console.log("1: GET DOG PICS");
//     const x = await getDogPic();
//     console.log(x);
//     console.log("3: DONE");
//   } catch (err) {
//     console.log(err);
//   }
// })();

//ASYNC PROMISE
// getDogPic()
//   .then((x) => {
//     console.log("1: GET DOG PICS");
//     console.log(x);
//     console.log("3: DONE");
//   })
//   .catch((err) => console.log(err));

//SYNC
// console.log("1: GET DOG PICS");
// const x = getDogPic();
// console.log(x);
// console.log("3: DONE");
