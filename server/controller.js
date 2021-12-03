const fortunes = require('./fortunedb.json')
const pictures = require('./imagedb.json')
let imageId = 4

module.exports= {
    getImages: (req, res) =>{
        res.status(200).send(pictures)
    },

    getCompliment: (req, res) => {
        const compliments = ["Gee, you're a smart cookie!",
                           "Cool shirt!",
                           "Your Javascript skills are stellar.",
        ];
        // choose random compliment
        let randomIndex = Math.floor(Math.random() * compliments.length);
        let randomCompliment = compliments[randomIndex];
    
        res.status(200).send(randomCompliment);     
      },

      getFortune: (req, res) => {
          let randomFortune = Math.floor(Math.random()* fortunes.length);
          res.status(200).send(fortunes[randomFortune])
      },


      deletePicture: (req,res) =>{
        const {id} = req.params;
        let index = pictures.findIndex(image => +image.id === +id)
        pictures.splice(index, 1)
        res.status(200).send(pictures);
    },

    addPicture: (req, res) =>{
        const {imageURL} = req.body
        let newImage = {
            imageURL,
            id: imageId
        }
        imageId++
        pictures.push(newImage)
        res.status(200).send(pictures)
    }
}