import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'

const resizableBox = document.getElementsByClassName('image-left')[0];
const resizer = document.getElementsByClassName('vertical-line')[0];

const maxWidth = document.getElementsByClassName('grid-left')[0].clientWidth;

console.log(maxWidth)

let startX;
let startWidth;

resizer.addEventListener('mousedown', (e) => {
	startX = e.clientX;
	startWidth = parseInt(document.defaultView.getComputedStyle(resizableBox).width, 10);

	document.documentElement.addEventListener('mousemove', ImageSlider_onMouseMove);
	document.documentElement.addEventListener('mouseup', ImageSlider_onMouseUp);
});

function ImageSlider_onMouseMove(e) {
	var newWidth = startWidth + (e.clientX - startX);

	if (newWidth > maxWidth) newWidth = maxWidth;
	resizableBox.style.width = newWidth + 'px';
}

function ImageSlider_onMouseUp() {
	document.documentElement.removeEventListener('mousemove', ImageSlider_onMouseMove);
	document.documentElement.removeEventListener('mouseup', ImageSlider_onMouseUp);
}

const timeline1 = document.getElementsByClassName('timeline1')[0];
const btns1 = timeline1.querySelectorAll('.timeline-step');
const timeline2 = document.getElementsByClassName('timeline2')[0];
const btns2 = timeline2.querySelectorAll('.timeline-step');
const description_block = document.querySelector(".description-block")
const title_place = document.querySelector(".title-place")

let disasters = [] // event_discription.length = events.length
disasters.push(
	{
		events: [
			["./0722Hualien.png", "Jul22"],
            ["./0722Hualien.png", "Jul25\nFormation"], // TODO: Disable this button
			["./0908Hualien.png", "Sep08"],
			["./0920Hualien.png", "Sep20"],
			["./0920Hualien.png", "Sep23\nTyphoon Ragasa"], // TODO: Also this
			["./0930Hualien.png", "Sep30"],
		],
		buttonClassName: 'tag-event1',
		description: "description should also change according to the selected timestamp? And we should put the hypothesis (針對 SAR 的觀察) over here", /* TODO */
		title: "Fata'an Creek Barrier Lake Overflow Incident",
        mapEmbedUrl: "https://www.openstreetmap.org/export/embed.html?bbox=121.3639,23.4735,121.4039,23.4935&layer=mapnik&marker=23.4835,121.3839",
	} /* TODO: mapEmbedUrl needs to change according to the current selected event */
)

disasters.push(
	{
		events: [
			["./920.png", "BIG EVENT"],
			["./930.png", "Sep40"],
			["./920.png", "Sep40"],
			["./930.png", "BIG EVENT TOO!"],
		],
		buttonClassName: 'tag-event2',
		description: "so what event should be here?",
		title: "Jinsha River",
        mapEmbedUrl: "https://www.openstreetmap.org/export/embed.html?bbox=98.6313122525692%2C31.062934758216375%2C98.78323257117272%2C31.1593475455504&amp;layer=mapnik&amp;marker=31.11115339062677%2C98.70727241187092",
	} /* TODO */
)
var now_disaster = disasters[0]

function chooseTimeline(row, col) {
	var changed_btns;
	var tar;
	if (row == 1) {
		document.getElementsByClassName('image-left')[0].style.backgroundImage=`url(${now_disaster.events[col][0]})`
		console.log(now_disaster.events[col][0])
		changed_btns = btns1
		tar = btns1[col]
	}
	else {
		changed_btns = btns2;
		tar = btns2[col]
		document.getElementsByClassName('image-right')[0].src=now_disaster.events[col][0]
	}
	changed_btns.forEach( 
		function (btn, index) {
			btn.classList.remove('active')
			if (index >= now_disaster.events.length) {
				btn.style.display = 'none';
			}
			else {
				btn.querySelector('p').innerHTML = now_disaster.events[index][1]
				btn.style.display = 'grid'
			}
		}
	)
	tar.classList.add('active')
}

function reload(disaster) {
	now_disaster = disaster
	title_place.innerHTML = disaster.title;
	description_block.innerHTML = disaster.description;
	console.log(`reloading ${disaster.buttonClassName}`)
	chooseTimeline(1, 0);
	chooseTimeline(2, 0);
	disasters.forEach( function (disaster) {
		const tag = document.querySelector(`.${disaster.buttonClassName}`);
		console.log(tag)
		tag.onclick = function () {
			reload(disaster)
		}
	})
}

btns1.forEach(function(btn, index) {
	btn.onclick = function () {
		chooseTimeline(1, index);
	}
})
btns2.forEach(function(btn, index) {
	btn.onclick = function () {
		chooseTimeline(2, index);
	}
})

reload(disasters[0])

// --- Modal Pop-up Logic ---
const modalOverlay = document.getElementById('modal-overlay');
const modalCloseBtn = document.querySelector('.modal-close-btn');

function showModal() {
    modalOverlay.classList.remove('hidden');
}

function hideModal() {
    modalOverlay.classList.add('hidden');
}

// Close the modal when the 'X' button is clicked
modalCloseBtn.addEventListener('click', hideModal);

// Close the modal when the user clicks on the overlay background
modalOverlay.addEventListener('click', (event) => {
    // Only close if the click is on the overlay itself, not the content
    if (event.target === modalOverlay) {
        hideModal();
    }
});

// Close the modal when the 'Escape' key is pressed
window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !modalOverlay.classList.contains('hidden')) {
        hideModal();
    }
});

// Show the modal when the page first loads
// You can comment this out if you want to trigger it with a button instead
window.addEventListener('load', showModal);

// --- Map Modal Logic ---
const showMapBtn = document.getElementById('show-map-btn');
const mapModalOverlay = document.getElementById('map-modal-overlay');
const mapModalCloseBtn = document.querySelector('.map-modal-close-btn');
const eventMapIframe = document.getElementById('event-map-iframe');

function showMapModal() {
    mapModalOverlay.classList.remove('hidden');
}

function hideMapModal() {
    mapModalOverlay.classList.add('hidden');
}

// Open the map modal
showMapBtn.addEventListener('click', showMapModal);

// Close the map modal
mapModalCloseBtn.addEventListener('click', hideMapModal);
mapModalOverlay.addEventListener('click', (event) => {
    if (event.target === mapModalOverlay) {
        hideMapModal();
    }
});

// Also add Escape key functionality for the map modal
window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !mapModalOverlay.classList.contains('hidden')) {
        hideMapModal();
    }
});
