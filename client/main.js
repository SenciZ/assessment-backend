const complimentButton = document.getElementById("complimentButton")


const getNewCompliment = () => axios.get('http://localhost:4004/api/compliment').then(function (response) {
    const data = response.data;
    alert(data);
});

complimentButton.addEventListener("click", getNewCompliment);
