/* ============================================================ */
/* ===                    Custom Scripts                    === */
/* ============================================================ */

/* ------ loader -------- */
function loader_onReady(callback) {
	var intervalId = window.setInterval(function() {
		if (document.getElementsByTagName('body')[0] !== undefined) {
			window.clearInterval(intervalId);
			callback.call(this);
		}
	}, 1000);
}

function mask_setVisible(selector, visible) {
  document.querySelector(selector).style.display = visible ? 'block' : 'none';
}

/* ------ navbar -------- */
function navBar_openPage(event) {
	const btn = event.target;
	//if already activated, ignore
	if (!btn.classList.contains('active')){
		
		const navDiv = document.querySelector('.top_navbar');
		
		//get previous active & remove active class
		const oldActive = navDiv.querySelector('.navTab.active');
		const oldActiveDiv = navDiv.querySelector('.navTabDiv.active');
		
		const oldActiveID = oldActive.id;
		const oldTabColor = oldActiveID + "Colour";	
		
		
		oldActive.classList.remove("active");
		oldActiveDiv.classList.remove("active");
		navDiv.classList.remove(oldTabColor);
		
		
		const newActiveID = btn.id;
		const newActive = btn;
		const newActiveDiv = document.getElementById(newActiveID + '_div');
		const newTabColor = newActiveID + "Colour";		
		
		newActive.classList.add("active");
		newActiveDiv.classList.add("active");
		navDiv.classList.add(newTabColor);
		
	}
	
	
	
}


/* -------------------- */

/*svg*/
function createSVG(){
	const svg = document.getElementById("mainSVG");
	const pageWidth = document.getElementsByTagName('body')[0].offsetWidth;
	
	const oldViewBox = svg.getAttribute('viewBox');
	const oldViewBoxArray = oldViewBox.split(' '); // 4 elements
	const newViewBox =  oldViewBoxArray[0] + ' ' + oldViewBoxArray[1] + ' ' + pageWidth + ' ' + oldViewBoxArray[3];
	svg.setAttribute('viewBox', newViewBox); 
	
	
	
	const circleDefine = {
		'r': '100',
		'cx': (50 + (pageWidth/2)),
		'cy': (oldViewBoxArray[3]/2),	
		'stroke-width': 6,
	}
	
	const circle = new createSVGobj('circle', Object.assign({}, circleDefine, {
		'class': 'circle',
		'fill': '#FFAC81',
		'stroke': 'none',
	}));
	const circleBorderRight = new createSVGobj('circle', Object.assign({}, circleDefine, {
		'class': 'circleBorder',
		'fill': 'none',
		'stroke': '#FFDFA7',
	}));
	const circleBorderTop = new createSVGobj('circle', Object.assign({}, circleDefine, {
		'class': 'circleBorder',
		'fill': 'none',
		'stroke': '#FFE7AD',
	}));
	const circleBorderLeft = new createSVGobj('circle', Object.assign({}, circleDefine, {
		'class': 'circleBorder',
		'fill': 'none',
		'stroke': '#FFFFCB', 
	}));
	const circleBorderBot = new createSVGobj('circle', Object.assign({}, circleDefine, {
		'class': 'circleBorder',
		'fill': 'none',
		'stroke': '#FFC997',
	}));
	svg.appendChild(circle);
	svg.appendChild(circleBorderRight);
	svg.appendChild(circleBorderTop);
	svg.appendChild(circleBorderLeft);
	svg.appendChild(circleBorderBot);
	
	const circleBorderLength = circleBorderRight.getTotalLength();
	var offsetLngths = [0, (circleBorderLength/4), (circleBorderLength/2), ((3*circleBorderLength)/4)];
	
	offsetLngths = offsetLngths.map(x => (x + 70));
	
	const dashStr = circleBorderLength/4 + ", " + ((3*circleBorderLength)/4);
	circleBorderRight.setAttribute('stroke-dasharray', dashStr);
	circleBorderTop.setAttribute('stroke-dasharray', dashStr);
	circleBorderLeft.setAttribute('stroke-dasharray', dashStr);
	circleBorderBot.setAttribute('stroke-dasharray', dashStr);
	
	circleBorderRight.setAttribute('stroke-dashoffset', offsetLngths[0]);	
	circleBorderTop.setAttribute('stroke-dashoffset', offsetLngths[1]);
	circleBorderLeft.setAttribute('stroke-dashoffset', offsetLngths[2]);
	circleBorderBot.setAttribute('stroke-dashoffset', offsetLngths[3]);
	
}
/* -------------------- */

function createSVGobj(type, obj, noNS=false){
    var created = !noNS ? document.createElementNS('http://www.w3.org/2000/svg', type) 
	: document.createElement(type);
	
	for(var prop in obj) {
		if ( ( (type=='text')||(type=='tspan') ) &&(prop=='textContent'))
			created.textContent = (obj[prop]);
		else
			created.setAttribute(prop, obj[prop]);	
	}
	
    return created;
}



/* ------ Run on Page Load -------- */
$(document).ready(function(){	
	//loader
	loader_onReady(function() {
		mask_setVisible('.loading-mask', false);
	});
	//navbar
	//document.addEventListener("click", (evt) => outsideClickNav(evt));
	const navTabs = document.querySelectorAll('.navTab');
	for (const tab of navTabs) {
		tab.addEventListener("click", (btn) => navBar_openPage(btn));	
	}
	
	//createSVG();
});
/* ------------------------------------------------ */