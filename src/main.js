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
			["./930.png", ""],
			["./920.png", ""],
			["./930.png", "BIG EVENT"],
			["./920.png", ""],
			["./930.png", "BIG EVENT TOO!"],
		],
		buttonClassName: 'tag-event1',
		description: "88888888888888888",
		title: "Fata'an Creek Barrier Lake Overflow Incident",
	}
)

disasters.push(
	{
		events: [
			["./920.png", "BIG EVENT"],
			["./930.png", ""],
			["./920.png", ""],
			["./930.png", "BIG EVENT TOO!"],
		],
		buttonClassName: 'tag-event2',
		description: "a nearest one",
		title: "Event 2"
	}
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
