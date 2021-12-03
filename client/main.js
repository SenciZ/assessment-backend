const complimentButton = document.getElementById("complimentButton")
const fortuneButton = document.getElementById('fortuneButton')
const fortuneDisplay = document.getElementById('fortuneDisplay')
const addNewPicture = document.getElementById('addImage')
const pictureContainer = document.getElementById('pictureContainer')

const newFortuneForm= document.getElementById('newFortune')
newFortuneForm.addEventListener('submit', newFortuneHandler);



const newImageForm = document.getElementById('newImage')
newImageForm.addEventListener('submit', submitHandler);

const errCallback = err => console.log(err)

const getNewCompliment = () => axios.get('http://localhost:4004/api/compliment').then(complimentCallback).catch(errCallback);
const complimentCallback = (response) => {const data = response.data; alert(data);}


const getNewFortune = () => axios.get('http://localhost:4004/api/fortune').then(fortuneCallback).catch(errCallback);
const fortuneCallback = (response) => {fortuneDisplay.textContent = "Your Fortune is... "+ response.data.fortune;}



const getAllImages = () => axios.get('http://localhost:4004/api/pictures').then(imageCallback).catch(errCallback);
const addNewImage = body => axios.post('http://localhost:4004/api/pictures', body).then(imageCallback).catch(errCallback)

const addNewFortune = body => axios.post('http://localhost:4004/api/fortune', body).then(alert("Your new fortune of " + body.fortune + " has been added!")).catch(errCallback)

const deleteImage = id => axios.delete(`http://localhost:4004/api/pictures/${id}`).then(imageCallback).catch(errCallback)

const imageCallback = ({data: images}) => renderImages(images);


function submitHandler(e){
    e.preventDefault();
    let imageURL = document.getElementById('img')

    let imgObj = {
        imageURL: imageURL.value,
    }

    addNewImage(imgObj)
    imageURL.value = '';
}

function newFortuneHandler(e){
    e.preventDefault();
    let newFortune = document.getElementById('fortuneId')

    let fortuneObj = {
        fortune: newFortune.value,
    }

    addNewFortune(fortuneObj)
    newFortune.value = '';
}


function createImageCard(image){
    const imageCard = document.createElement('div')
    imageCard.classList.add('imageCard')
    imageCard.innerHTML = `<img class="happyImage" alt="Happy Image" src="${image.imageURL}"><button class="deleteBtn" onclick="deleteImage(${image.id})">Delete Image</button>`
    pictureContainer.appendChild(imageCard)
}


function renderImages(arr){
    pictureContainer.innerHTML = '';
    for(let i =0; i<arr.length; i++){
        createImageCard(arr[i])
    }
}

getAllImages();














complimentButton.addEventListener("click", getNewCompliment);
fortuneButton.addEventListener('click', getNewFortune)
