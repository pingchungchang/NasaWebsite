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
const mapModalOverlay = document.getElementById('modal-overlay');
const mapModalCloseBtn = document.querySelector('.modal-close-btn');
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

const timeline1 = document.getElementsByClassName('timeline1')[0];
const btns1 = timeline1.querySelectorAll('.timeline-step');
const timeline2 = document.getElementsByClassName('timeline2')[0];
const btns2 = timeline2.querySelectorAll('.timeline-step');
const description_block = document.querySelector(".description-block")
const incident_block = document.querySelector(".incident-block")
const hypothesis_block = document.querySelector(".hypothesis-block")
console.log(incident_block)
const title_place = document.querySelector(".title-place")

let disasters = [] // event_discription.length = events.length
disasters.push(
	{
		events: [ // button disabling done by empty string for images
			[
				"./0722Hualien.png", "Jul22",
				"The lake has not yet formed. We don’t see blue at the location of the barrier lake."
			],
            [
				"", "Jul25\nBarrier Lake Formed", ""
			], 
			[
				"./0908Hualien.png", "Sep08", 
				"We can clearly see the barrier lake has formed on the left side of the image"
			],
			[
				"./0920Hualien.png", "Sep20",
				"The lake remains"
			],
			[
				"", "Sep23\nTyphoon Ragasa", ""
			], 
			[
				"./0930Hualien.png", "Sep30", 
				"Downtown Guangfu has a large portion of green and blue, indicating the occurrence of the flood. The barrier lake lost its shape at this stage, but more blue dots exist in the surroundings, representing the burst of the lake."
			],
		],
		buttonClassName: 'tag-event1',
		hypothesis: "Through observation of VV data on SAR graphs, we could monitor the formation and evolution of barrier lakes. ",
		title: "Fata'an Creek Barrier Lake Overflow Incident",
		mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d16409.87735941618!2d121.44275951469577!3d23.674511120600098!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1szh-TW!2stw!4v1759644013456!5m2!1szh-TW!2stw",
		incidentText: "In late September 2025, Typhoon Ragasa triggered a landslide that caused a barrier lake on Fataan barrier lake to burst, leading to severe flooding in Guangfu Township, Hualien, killing 18 people and causing losses exceeding NT$20 million."
	}
)

disasters.push(
	{
		events: [
			[
				"./0430Pakistan.png", "4/30",
				""
			],
			["", "Start of Monsoon", ""],
			[
				"./0804Pakistan.png", "8/4",
				""
			],
			["", "Flood", ""],
			[
				"./0816Pakistan.png", "8/16",
				""
			],
			[
				"./0824Pakistan.png", "8/24",
				""
			],
		],
		buttonClassName: 'tag-event2',
		hypothesis: "so what event should be here?",
		title: "Pakistan",
		mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12574.408000275269!2d72.21630860376001!3d33.89536473266908!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38df275de55d828f%3A0x1a64033f155f9673!2zS2hhaXJhYmFkLCDlt7Tln7rmlq_lnaY!5e1!3m2!1szh-TW!2stw!4v1759643156833!5m2!1szh-TW!2stw",
		incidentText: "In late September 2025, Typhoon Ragasa triggered a landslide that caused a barrier lake on Fataan barrier lake to burst, leading to severe flooding in Guangfu Township, Hualien, killing 18 people and causing losses exceeding NT$20 million."
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
		description_block.innerHTML = now_disaster.events[col][2];
	}
	else {
		changed_btns = btns2;
		tar = btns2[col]
		document.getElementsByClassName('image-right')[0].src=now_disaster.events[col][0]
	}
	var button_number = 0;
	changed_btns.forEach(
		function (btn, index) {
			btn.classList.remove('active')
			if (index >= now_disaster.events.length) {
				btn.style.display = 'none';
			}
			else {
				console.log(now_disaster.events[index][0])
				if (now_disaster.events[index][0] != "") {
					button_number += 1;
					btn.classList.remove("disabled")
					btn.querySelector("span").innerHTML = button_number;
				}
				else {
					btn.querySelector("span").innerHTML = "";
					btn.classList.add("disabled")
				}
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
	console.log(disaster.incidentText)
	hypothesis_block.innerHTML = disaster.hypothesis;
	incident_block.innerHTML = disaster.incidentText;
	eventMapIframe.src = disaster.mapEmbedUrl;
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

