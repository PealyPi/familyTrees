/* ============================================================ */
/* ===                    Custom Scripts                    === */
/* ============================================================ */

/* ------ loader ------ */
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

/* ------ navbar ------ */
function navBar_clickEvnt(event){
	const btn = event.target;
	navBar_openPage(btn);
}

function navBar_openPage(btn) {
	const mainDiv = document.getElementById('mainDiv');
	const svgDiv = document.getElementById('svgDiv');
	const infoDiv = document.getElementById('infoDiv');
	const imgsDiv = document.getElementById('imgsDiv');
	const svg = document.getElementById("mainSVG");
	const peopleDiv = document.getElementById('peopleDiv');
	
	const newActive = btn;
	const newActiveID = btn.id;	
	const navDiv = document.querySelector('.top_navbar');
	
	const newActiveDiv = document.getElementById(newActiveID + '_div');
	const newTabColor = newActiveID + "Colour";		
	
	if ( newActiveID == 'pplTab'){
		peopleDiv.classList.toggle("sliding");
		newActive.classList.toggle("active");
		
	} else if (!btn.classList.contains('active')){//if already activated, ignore
		
		const navDiv = document.querySelector('.top_navbar');
		
		//get previous active & remove active class
		const oldActive = navDiv.querySelector('.navTab.active');
		const oldActiveDiv = navDiv.querySelector('.navTabDiv.active');
		
		const oldActiveID = oldActive.id;
		const oldTabColor = oldActiveID + "Colour";			
		
		oldActive.classList.remove("active");
		oldActiveDiv.classList.remove("active");
		navDiv.classList.remove(oldTabColor);		
		
		newActive.classList.add("active");
		newActiveDiv.classList.add("active");
		navDiv.classList.add(newTabColor);	
		
		//hide all when maskTransition
		const maskTransitionSection = document.querySelector(".maskTransitionSection");
		const transitionMasks = document.querySelectorAll(".transitionMask");
		
		for (const mask of transitionMasks) {
			mask.classList.toggle("activeTransition");
		}
		//hide all	
		const pageSections = document.querySelectorAll(".pageSection");
		
		function hideAllSects(active){
			var allHideSects = [];		
			pageSections.forEach(sect => { 
				const sectID = sect.id;
				if (sectID != active.id)
					allHideSects.push(sect);
			});			
			
			for (const sect of allHideSects) {
				setTimeout(()=> {
					sect.style.visibility = 'hidden';		
				}, 1000);	
				setTimeout(()=> {
					sect.style.display = 'none';	
				}, 3000);	
			};				
		}
		
		function showSect(active){
			active.style.visibility = 'hidden';
			active.style.display = 'block';
			setTimeout(()=> {
				active.style.visibility = 'visible';					
			}, 1000);
		}
		
		switch (newActiveID){
			case 'homeTab':		
				hideAllSects('');
			break;
			case 'treeTab':		
				hideAllSects(svgDiv);
				showSect(svgDiv);
				if (svg.children.length == 0)
					createSVG();						
			break;
			case 'infoTab':	
				hideAllSects(infoDiv);
				showSect(infoDiv);
			break;
			case 'imgsTab':
				hideAllSects(imgsDiv);
				showSect(imgsDiv);
			break;
			
		}
	}
	
	
}


/* ------ peopleSlideTab ------ */
function closePeopleTab(){
	const peopleDiv = document.getElementById('peopleDiv');
	const pplTab = document.getElementById('pplTab');

	peopleDiv.classList.toggle("sliding");
	pplTab.classList.toggle("active");	
}

function peopleDropdownDo(event) {
	var btn = event.target;
	if (btn.tagName == "I"){
		btn = btn.parentElement;
	}
	const famName = btn.id.replace("DropdownBtn", "");
	
	const peopleListUL = document.getElementById("peopleList");
	const relativeDiv = peopleListUL.querySelector("#" + famName + 'DropdownDiv');
	
	const dropdownCaret_down = "fa-caret-down";
	const dropdownCaret_up = "fa-caret-up";
	const btnIcon = btn.querySelector("i");
	
	//check if going up or down
	if (relativeDiv.classList.contains('dropdownActive')){
		//open -> close
		$(relativeDiv).slideUp(function(){
			relativeDiv.classList.toggle("dropdownActive");	
		});	
	} else {
		//close -> open
		$(relativeDiv).slideDown(function(){
			relativeDiv.classList.toggle("dropdownActive");	
		});			
	}
	
	btnIcon.classList.toggle(dropdownCaret_down); 
	btnIcon.classList.toggle(dropdownCaret_up);
}

//add list of people
function addPeopleToList(){
	//use infoFile and add completed people
	const peopleDiv = document.getElementById("peopleDiv");
	const peopleListUL = peopleDiv.querySelector("#peopleList");
	
	const kesbyDiv = peopleListUL.querySelector("#kesbyDropdownDiv");
	const hadkissDiv = peopleListUL.querySelector("#hadkissDropdownDiv");
	const pealDiv = peopleListUL.querySelector("#pealDropdownDiv");
	const mckenzieDiv = peopleListUL.querySelector("#mckenzieDropdownDiv");
	
	//guide: <li class="pplChooseLI" id="li_ronHadkiss"><i class="fas fa-chevron-left"></i><span>Ron Hadkiss</span></li>
	
	const kesbyData = personInfoStorage('kesby');
	var kesbyKeys = Object.keys(kesbyData);		
	kesbyKeys.forEach(function( personTag, i ) {
		const personName = kesbyData[personTag].name;
		
		const personLI = new createElement("li", {
			'id': 'li_' + personTag,		
			'class': 'pplChooseLI',
		});	
		const liIcon = new createElement("i", {
			'class': 'fas fa-chevron-left',		
		});
		const liSpan = new createElement("span");
		kesbyDiv.appendChild(personLI);
		personLI.appendChild(liIcon);
		personLI.appendChild(liSpan);
		liSpan.innerHTML = personName;
	});
	
	//add click event
	const peopleChoose = document.querySelectorAll('.pplChooseLI');
	for (const ppl of peopleChoose) {
		ppl.addEventListener("click", (evnt) => openPerson(evnt));	
	}
}

function peopleListSearch() {
	// Declare variables
	var input, filter, ul, li, a, i, txtValue;
	input = document.getElementById('peopleSearching');
	filter = input.value.toUpperCase();
	ul = document.getElementById("peopleList");
	li = ul.getElementsByTagName('li');
  
	//if first letter, change search icon
	if (filter.length == 0){
		toggleSearchIcon('search');
	} else {
		toggleSearchIcon('exit');	
	}
	// Loop through all list items, and hide those who don't match the search query
	for (i = 0; i < li.length; i++) {
		txtValue = li[i].textContent || li[i].innerText;
		if (txtValue.toUpperCase().indexOf(filter) > -1) {
		  li[i].style.display = "";
		} else {
		  li[i].style.display = "none";
		}
	}
	
	//if all li values are display none, hide dropbutton
	const dropDivs = document.querySelectorAll('.ppl_dropdown-container');
	for (const dropDiv of dropDivs){
		const dropFamName = dropDiv.id.replace("DropdownDiv", "");
		const dropBtn = document.getElementById(dropFamName + "DropdownBtn");
		
		const dropLIs = dropDiv.getElementsByTagName("li");
		var allHidden = true;
		for (j = 0; j < dropLIs.length; j++) {
			if (dropLIs[j].style.display == ""){
				allHidden = false;
			}
		}
		if (allHidden){
			dropBtn.style.display = "none";
		} else {
			dropBtn.style.display = "";
		}
	};
}

function toggleSearchIcon(type){
	const exitIcon = "fa-times-circle";
	const searchIcon = "fa-search";
	
	const searchIconDiv = document.getElementById('peopleSearchIcon');
	const targetIcon = searchIconDiv.querySelector("i");
	
	//check old
	const iconOld = targetIcon.classList[1];
	switch (type){
		case 'exit':
			if (iconOld == searchIcon){
				targetIcon.classList.toggle(searchIcon);
				targetIcon.classList.toggle(exitIcon);					
			}
			
		break;
		case 'search':
			if (iconOld == exitIcon){
				targetIcon.classList.toggle(searchIcon);
				targetIcon.classList.toggle(exitIcon);					
			}
		
		break;
		
	}
}

function peopleListSearchExit(){
	const exitIcon = "fa-times-circle";
	const searchIcon = "fa-search";
	
	const searchIconDiv = document.getElementById('peopleSearchIcon');
	const targetIcon = searchIconDiv.querySelector("i");
	const searchInput = document.getElementById('peopleSearching');
	
	//check current icon is exit
	const iconType = targetIcon.classList[1];
	if (iconType == exitIcon){
		//clear search
		searchInput.value = "";
		peopleListSearch();
	}
	
	
}


/* open tree */
function openPerson(evnt){
	const btnLI = evnt.target;
	const btnLIid = btnLI.id;
	const personTag = btnLIid.replace("li_", "");
	
	const liDropParent = btnLI.parentElement();
	console.log(liDropParent);
	const famName = liDropParent.id.replace("DropdownDiv", "");
	
	
	const navDiv = document.querySelector('.top_navbar');
	const activeTabBtn= navDiv.querySelector('.navTab.active');
	const treeTabBtn = navDiv.querySelector('#treeTab');
	
	//fill in info in infoDiv (for treeTab or for infoTab)
	//if treeTab, set node
	
	if (activeTabBtn.id == "infoTab"){
		const infoDiv = document.getElementById("infoDiv");
		fillPersonInfo(infoDiv);
		
	} else { //treeTab
		const infoDivTree = document.getElementById("infoDivTree");
		
		if (activeTabBtn.id != "treeTab"){
			navBar_openPage(treeTabBtn);
		}
		
		fillPersonInfo(infoDivTree);
		
	}
	
	function fillPersonInfo(infoDiv){
		const personInfo = personInfoStorage(famName, personTag);
		
	}
	
	function setTreeBaseNode(){
		
	}
	
}
/* -------------------- */

/*svg*/
class personNode {
	constructor(svg, family, personTag){
		this.svg = svg;
		this.personTag = personTag;
		this.family = family;
	}
	
	createCircle(positionXY){
		this.positionXY = positionXY;
		
		const circleRadius = 100;
		const circleBorder = 6;
		const circleFullWidth = circleRadius + circleBorder;
		
		
		const circleGrp = new createElement('g', {
			'id': this.personTag + 'CircleGrp',
			'class': 'personCircleGrp',
			'transform': 'translate(' + this.positionXY.x + ' ' + this.positionXY.y + ')',
		});
		
		const circleDefine = {
			'r': circleRadius,
			//'cx': circleFullWidth, 'cy': circleFullWidth,	
			'cx': 0, 'cy': 0,	
			'stroke-width': circleBorder,
		}
		
		const circle = new createElement('circle', Object.assign({}, circleDefine, {
			'class': 'circle',
			'fill': '#FFAC81',
			'stroke': 'none',
		}));
		
		//bevelborder
		const circleBorderRight = new createElement('circle', Object.assign({}, circleDefine, {
			'class': 'circleBorder',
			'fill': 'none',
			'stroke': '#FFDFA7',
		}));
		const circleBorderTop = new createElement('circle', Object.assign({}, circleDefine, {
			'class': 'circleBorder',
			'fill': 'none',
			'stroke': '#FFE7AD',
		}));
		const circleBorderLeft = new createElement('circle', Object.assign({}, circleDefine, {
			'class': 'circleBorder',
			'fill': 'none',
			'stroke': '#FFFFCB', 
		}));
		const circleBorderBot = new createElement('circle', Object.assign({}, circleDefine, {
			'class': 'circleBorder',
			'fill': 'none',
			'stroke': '#FFC997',
		}));
		this.svg.appendChild(circleGrp);
		circleGrp.appendChild(circle);
		circleGrp.appendChild(circleBorderRight);
		circleGrp.appendChild(circleBorderTop);
		circleGrp.appendChild(circleBorderLeft);
		circleGrp.appendChild(circleBorderBot);
		
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
		
		//contour
		const circleContour = new createElement('circle', Object.assign({}, circleDefine, {
			'r': circleRadius,
			'cx': 0, 'cy': 0,	
			'stroke-width': circleBorder+2,
			'stroke-opacity': 0.6,
			'class': 'circleContour',
			'fill': 'none',
			'stroke': '#BF6A3E',
		}));
		circleGrp.prepend(circleContour);
		
		//shadow
		const circleShadow1 = new createElement('circle', Object.assign({}, circleDefine, {
			'r': circleRadius,
			'cx': 1, 'cy': 1,	
			'stroke-width': circleBorder+2,
			'stroke-opacity': 0.3,
			'class': 'circleShadow',
			'fill': 'none',
			'stroke': '#000',
		}));
		const circleShadow2 = new createElement('circle', Object.assign({}, circleDefine, {
			'r': circleRadius,
			'cx': 2, 'cy': 2,	
			'stroke-width': circleBorder+2,
			'stroke-opacity': 0.1,
			'class': 'circleShadow',
			'fill': 'none',
			'stroke': '#000',
		}));
		circleGrp.prepend(circleShadow1);
		circleGrp.prepend(circleShadow2);
	}
}

function createSVG(){
	const svgDiv = document.getElementById("svgDiv");
	const svg = document.getElementById("mainSVG");
	const pageWidth = document.getElementsByTagName('body')[0].offsetWidth;
	
	const oldViewBox = svg.getAttribute('viewBox');
	const oldViewBoxArray = oldViewBox.split(' '); // 4 elements
	const newViewBox =  oldViewBoxArray[0] + ' ' + oldViewBoxArray[1] + ' ' + pageWidth + ' ' + oldViewBoxArray[3];
	svg.setAttribute('viewBox', newViewBox); 
	
	const svgCenterPt = {'x': (pageWidth/2),'y': (oldViewBoxArray[3]/2)};
	
	//line
	const lineGrp = new createElement('g', {
		'class': 'mainLine_GRP',
	});
	const mainLine = new createElement('line', {
		'class': 'mainLine',
		'x1': 0, 'y1': svgCenterPt.y, 
		'x2': pageWidth, 'y2': svgCenterPt.y,
		'fill': 'none',
		'stroke': '#FF928B',
		'stroke-width': 10,		
	});
	const mainLineShadow1 = new createElement('line', {
		'class': 'mainLineShadow',
		'x1': 0, 'y1': (svgCenterPt.y+3), 
		'x2': pageWidth, 'y2': (svgCenterPt.y+3),
		'fill': 'none',
		'stroke': '#000',
		'stroke-width': 10,	
		'stroke-opacity': 0.1,
	});
	const mainLineShadow2 = new createElement('line', {
		'class': 'mainLineShadow',
		'x1': 0, 'y1': (svgCenterPt.y+1.5), 
		'x2': pageWidth, 'y2': (svgCenterPt.y+1.5),
		'fill': 'none',
		'stroke': '#000',
		'stroke-width': 10,	
		'stroke-opacity': 0.1,
	});
	svg.appendChild(lineGrp);
	lineGrp.appendChild(mainLine);
	lineGrp.prepend(mainLineShadow1);
	lineGrp.prepend(mainLineShadow2);
	
	
	const initialPersonNode = new personNode(svg, 'kesby', 'roseHadkiss').createCircle(svgCenterPt);
	
	//text
	const personNameText = new createElement('text', {
		'class': 		'svgTxt',
		'text-anchor': 	'middle',
		'font-family': 	"'Josefin Sans', sans-serif",
		'font-size': 	'36px',
		'fill':	'white',
		'x': 	svgCenterPt.x,	
		'y': 	(svgCenterPt.y + 150),	
		
		'textContent': 	'Person Name',			
	});	
	svg.appendChild(personNameText);
	
	const familyNameText = new createElement('text', {
		'class': 		'svgTxt',
		'text-anchor': 	'middle',
		'font-family': 	"'Josefin Sans', sans-serif",
		'font-size': 	'38px',
		'fill':	'white',
		'x': 	150,	
		'y': 	70,	
		
		'textContent': 	'Kesby',			
	});	
	svg.appendChild(familyNameText);
	
	
}

function createLeafSVG(type) {
	const infoDiv = (type == 'tree') ?  document.getElementById("infoDivTree") : document.getElementById("infoDiv");
	const leafSVG = (type == 'tree') ? document.getElementById("leafSVGTree") : document.getElementById("leafSVGInfo");
	
	const leafPaths = getLeafPathData();
	const fillColour = '#EFE9AE';
	
	const defs = new createElement('defs', {
		'id': 'clipPaths',
	});
	const topClip = new createElement('clipPath', {
		'id': 'topLeaf_clipPath',
	});
	const topClipPath = new createElement('path', {
		'd': leafPaths.topLeaf_fill,
	});
	leafSVG.appendChild(defs);
	defs.appendChild(topClip);
	topClip.appendChild(topClipPath);
	
	const bottomLeafGRP = new createElement('g', {
		'id': 'bottomLeaf_GRP',
	});
	const bottomLeaf_fill = new createElement('path', {
		'id': 'bottomLeaf_fill', 
		'style': 'fill:' + fillColour + '; fill-opacity:0.75502;',
		'd': leafPaths.bottomLeaf_fill,
	});
	const bottomLeaf_outer = new createElement('path', {
		'id': 'bottomLeaf_outer', 
		'style': 'fill:' + fillColour + '; fill-opacity:1;',
		'd': leafPaths.bottomLeaf_outer,
	});
	leafSVG.appendChild(bottomLeafGRP);
	bottomLeafGRP.appendChild(bottomLeaf_fill);
	bottomLeafGRP.appendChild(bottomLeaf_outer);
	
	
	const topLeafGRP = new createElement('g', {
		'id': 'topLeaf_GRP',
	});
	const topLeaf_fill = new createElement('path', {
		'id': 'topLeaf_fill', 
		'style': 'fill:' + fillColour + '; fill-opacity:0.75502;',
		'd': leafPaths.topLeaf_fill,
	});
	const topLeaf_outer = new createElement('path', {
		'id': 'topLeaf_outer', 
		'style': 'fill:' + fillColour + '; fill-opacity:1;',
		'd': leafPaths.topLeaf_outer,
	});
	leafSVG.appendChild(topLeafGRP);
	topLeafGRP.appendChild(topLeaf_fill);
	topLeafGRP.appendChild(topLeaf_outer);
	
}

function createElement(type, obj, noNS=false){
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
		tab.addEventListener("click", (evnt) => navBar_clickEvnt(evnt));	
	}
	
	//peopleTab
	const peopleDropdowns = document.querySelectorAll('.ppl_dropdown-btn');
	for (const drop of peopleDropdowns) {
		drop.addEventListener("click", (evnt) => peopleDropdownDo(evnt));	
	}
	
	//infoDiv
	createLeafSVG('tree');
	createLeafSVG('info');
	addPeopleToList();
	
});
/* ------------------------------------------------ */