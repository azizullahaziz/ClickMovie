
const CAROUSAL = document.getElementById('movie-carousal')
const MOVIE_ITEM = document.querySelectorAll('.movie-item')
const BTN_NEXT = document.getElementById('next')
const BTN_PREV = document.getElementById('prev')
const FILM_LIST = document.getElementById('film-list')
const FILM_DETIALS = document.getElementById('film-details')
var currentSlide = 0;
const FILMS = [] 
const FILMS_ARRAY = []
$(document).ready(function(){
	getFilms()
})

// get list of films by fetch function
function getFilms(){
	fetch("https://swapi.dev/api/films")
		.then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("NETWORK RESPONSE ERROR");
            }
        })
		.then(data => {
			console.log(data.results)
			let items = data.results
			$(CAROUSAL).html('')
			for (var i in items) {
				FILMS_ARRAY[i] = items[i]
				FILMS[i] =`<div class="movie-item activ" id = "${i}" > 
							<div class = "movie-title">
								<h1>${items[i].title}</h1>
							</div>
							<div class="movie-desc">
								<p>${items[i].opening_crawl}</p>
							</div>
							<div class="movie-button">
								<a type="button" href="#" onClick = "filmDetails(${i})"> Read More ... </a>
							</div>

					</div>`
			}
			firstSlide()
			getFilmThumnails()

		})
}

//show the first slide by default
function firstSlide(){
	$(CAROUSAL).html(FILMS[currentSlide])
	console.log('first',FILMS[currentSlide])
}

// go to next slide on 'NEXT' button click
BTN_NEXT.addEventListener('click',function(e){
	e.preventDefault();
	if (currentSlide >= FILMS.length) {
		currentSlide = 0;
	}
	goToNext(currentSlide++);
})


// go to previous slide on 'PREV' button click
BTN_PREV.addEventListener('click',function(e){
	e.preventDefault();
	if (currentSlide <=0) {
		currentSlide = FILMS.length -1;
	}
	goToNext(currentSlide--);
})

// go to next slide
function goToNext(current){
	$(CAROUSAL).html(FILMS[current])
	console.log('image',current)
	document.getElementById(current).style.backgroundImage = `linear-gradient( rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7) ), url('images/${current}.jpg')`;
}

// go to previous slide
function goToPrev(current){
	$(CAROUSAL).html(FILMS[current])
	document.getElementById(current).style.backgroundImage = `linear-gradient( rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7) ), url('images/${current}.jpg')`;
}

// show list of films after slid show as thumnail
function getFilmThumnails(){
	for (var i in FILMS_ARRAY){
		$(FILM_LIST).append(`		
			<div class="film-list-item">
				<img src="images/${i}.jpg">
				<h2>${FILMS_ARRAY[i].title}</h2>
				<p>${FILMS_ARRAY[i].opening_crawl.substring(0,150)} ...</p>
				<div class="movie-button">
					<a type="button" href="#" onClick = "filmDetails(${i})"> Read More ... </a>
				</div>
			</div>
		`)

	}
}

//show film details
function filmDetails(img){
	FILM_DETIALS.innerHTML = '';
	let data = FILMS_ARRAY[img]
	const flmPosterDiv = document.createElement('div')
	flmPosterDiv.setAttribute('id','film-poster');
	const flmPosterImg = document.createElement('img')
	flmPosterImg.setAttribute('src','images/'+img+'.jpg')
	flmPosterDiv.appendChild(flmPosterImg)
	FILM_DETIALS.appendChild(flmPosterDiv)
	flmDescDiv = document.createElement('div')
	flmDescDiv.setAttribute('id','film-desc')
	const title = document.createElement('h1')
	title.textContent = data.title
	const directedBy = document.createElement('p')
	directedBy.textContent = 'Directed By: '+data.director
	const directionDate = document.createElement('p')
	directionDate.textContent = 'Directed On: '+data.created
	const producer = document.createElement('p')
	producer.textContent = 'Produced By: '+data.producer
	const details = document.createElement('p')
	details.textContent = data.opening_crawl
	flmDescDiv.appendChild(title)
	flmDescDiv.appendChild(directedBy)
	flmDescDiv.appendChild(directionDate)
	flmDescDiv.appendChild(producer)
	flmDescDiv.appendChild(details)
	FILM_DETIALS.appendChild(flmDescDiv)

}
