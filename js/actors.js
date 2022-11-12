const actorsDiv = document.getElementById('actors')
var actorsList = []

/* Get Data Using JS Fetch API */
async function getData() {
	let url = 'https://swapi.dev/api/people';
    fetch(url)
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("NETWORK RESPONSE ERROR");
            }
        })
        .then(data => {
            // Call Create HTML Elements and Display Data
            displayData(data.results)
        })
        .catch((error) => console.error("ERROR:", error));
}

getData()

// display actor data 
function displayData(data){
	console.log(data)
	for (var i in data){
		let row = document.createElement('div')
		row.className = 'actor-item'
		let img = document.createElement('img')
		img.setAttribute('src','images/actor.jpg')
		row.appendChild(img)

		let detailsDiv = document.createElement('div')
		detailsDiv.className = 'details'
		let actorName = document.createElement('h2')
		actorName.textContent = data[i].name
		detailsDiv.appendChild(actorName)
		
		let birthYear = document.createElement('p')
		birthYear.textContent = 'Year of Birth: '+data[i].birth_year
		detailsDiv.appendChild(birthYear)

		let height = document.createElement('p')
		height.textContent = 'Height: '+data[i].height
		detailsDiv.appendChild(height)
		let skin = document.createElement('p')
		skin.textContent = 'Skin Color: '+data[i].skin_color
		detailsDiv.appendChild(skin)

		let eye = document.createElement('p')
		eye.textContent = 'Eye Color: '+data[i].eye_color
		detailsDiv.appendChild(eye)
		let hair = document.createElement('p')
		hair.textContent = 'Hair Color: '+data[i].hair_color
		detailsDiv.appendChild(hair)

		row.appendChild(detailsDiv)
		actorsDiv.appendChild(row)


	}
}

