const complimentButton = document.getElementById("complimentButton")
const fortuneButton = document.getElementById('fortuneButton')
const fortuneDisplay = document.getElementById('fortuneDisplay')
const addNewPicture = document.getElementById('addImage')
const pictureContainer = document.getElementById('pictureContainer')
const newFortuneForm= document.getElementById('newFortune')
const newImageForm = document.getElementById('newImage')


newFortuneForm.addEventListener('submit', newFortuneHandler);

newImageForm.addEventListener('submit', submitHandler);


const getNewCompliment = () => axios.get('http://localhost:4004/api/compliment').then(complimentCallback).catch(errCallback);

const getNewFortune = () => axios.get('http://localhost:4004/api/fortune').then(fortuneCallback).catch(errCallback);

const getAllImages = () => axios.get('http://localhost:4004/api/pictures').then(imageCallback).catch(errCallback);

const addNewImage = body => axios.post('http://localhost:4004/api/pictures', body).then(imageCallback).catch(errCallback)

const addNewFortune = body => axios.post('http://localhost:4004/api/fortune', body).then(alert("Your new fortune of " + body.fortune + " has been added!")).catch(errCallback)

const deleteImage = id => axios.delete(`http://localhost:4004/api/pictures/${id}`).then(imageCallback).catch(errCallback)

const complimentCallback = (response) => {const data = response.data; alert(data);}
const imageCallback = ({data: images}) => renderImages(images);
const fortuneCallback = (response) => {fortuneDisplay.textContent = "Your Fortune is... "+ response.data.fortune;}
const errCallback = err => console.log(err)


function submitHandler(e){
    e.preventDefault();
    let imageURL = document.getElementById('img')
    
    let imgObj = {
        imageURL: imageURL.value,
    }
    
    addNewImage(imgObj)
    imageURL.value = '';
}

//Creates a new fortune when new fortune form is submitted
function newFortuneHandler(e){
    e.preventDefault();
    let newFortune = document.getElementById('fortuneId')
    //Creates new fortune object
    let fortuneObj = {
        fortune: newFortune.value,
    }
//Calls addNewFortune post request with the new object as argument
    addNewFortune(fortuneObj)
//Resets value of input to empty
    newFortune.value = '';
}

function renderImages(arr){
    pictureContainer.innerHTML = '';
    for(let i =0; i<arr.length; i++){
        createImageCard(arr[i])
    }
}

function createImageCard(image){
    const imageCard = document.createElement('div')
    imageCard.classList.add('imageCard')
    const happyImage = document.createElement('img')
    happyImage.setAttribute('alt', "Happy Image")
    happyImage.setAttribute('src', image.imageURL)
    const deleteImage = document.createElement("button")
    deleteImage.textContent = "Delete Image"
    deleteImage.setAttribute("onclick", `deleteImage(${image.id})`)
    imageCard.appendChild(happyImage)
    imageCard.appendChild(deleteImage)
    pictureContainer.appendChild(imageCard)
}


getNewFortune()
getAllImages();




complimentButton.addEventListener("click", getNewCompliment);
fortuneButton.addEventListener('click', getNewFortune)