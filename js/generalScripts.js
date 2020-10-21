/* ============================================================ */
/* ===                    Custom Scripts                    === */
/* ============================================================ */
/* preload info /relations data */
var PEOPLEINFO = personInfoStorage();
var PEOPLERELATIONS = nodeDataStorage();


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
var isPageTransitioning = false;
function navBar_clickEvnt(event){
	const btn = event.target;
	const btnID = btn.id ?? '';	
	if (!isPageTransitioning){
		isPageTransitioning = true;
		navBar_openPage(btn);
		if (btnID =='pplTab'){
			setTimeout(()=> {
				isPageTransitioning = false;	
			}, 500);	
			
		} else {
			setTimeout(()=> {
				isPageTransitioning = false;	
			}, 3000);	
		}
	}
}

function navBar_openPage(btn) {
	const mainDiv = document.getElementById('mainDiv');
	const svgDiv = document.getElementById('svgDiv');
	const infoDiv = document.getElementById('infoDiv');
	const imgsDiv = document.getElementById('imgsDiv');
	const peopleDiv = document.getElementById('peopleDiv');
	
	const peachTree = document.querySelector('.peachyTree');
	
	const svg = document.getElementById("mainSVG");
	
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
					peachTree.style.opacity = 1;	
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
				if ((active == imgsDiv) || (active == infoDiv)){peachTree.style.opacity = 0.4;}
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
		$(relativeDiv).slideUp(700, function(){
			relativeDiv.classList.toggle("dropdownActive");	
		});	
	} else {
		//close -> open
		$(relativeDiv).slideDown(700, function(){
			relativeDiv.classList.toggle("dropdownActive");	
		});			
	}
	
	btnIcon.classList.toggle(dropdownCaret_down); 
	btnIcon.classList.toggle(dropdownCaret_up);
}

function outsidePeopleDiv_clickDetect(event){
	const peopleDiv = document.getElementById('peopleDiv');
	const pplTab = document.getElementById('pplTab');
	
	const clickedElement = event.target;
	
	if (peopleDiv.classList.contains("sliding")){
		if (clickedElement != peopleDiv){
			if (clickedElement != pplTab){
				peopleDiv.classList.toggle("sliding");
				pplTab.classList.toggle("active");	
			}
		} 
	}
}

//add list of people
function addPeopleToList(){
	//use infoFile and add completed people
	const peopleDiv = document.getElementById("peopleDiv");
	const peopleListUL = peopleDiv.querySelector("#peopleList");
	
	//guide: <li class="pplChooseLI" id="li_ronHadkiss"><i class="fas fa-chevron-left"></i><span>Ron Hadkiss</span></li>
	
	const famData = PEOPLEINFO;
	const famKeys = Object.keys(famData);	
	famKeys.forEach(function( fam, j ) {
		const famData = PEOPLEINFO[fam];
		const eachFamKeys = Object.keys(famData);	
		const famDropDiv = peopleListUL.querySelector("#" + fam + "DropdownDiv");
		
		eachFamKeys.forEach(function( personTag, i ) {
			const personName = famData[personTag].name;
			
			const personLI = document.createElement("li");	
			personLI.id = 'li_' + personTag;	
			personLI.classList.add('pplChooseLI');	
			famDropDiv.appendChild(personLI);
			
			
			const liIcon = document.createElement("i");	
			liIcon.classList.add('fas');
			liIcon.classList.add('fa-chevron-left');
			personLI.appendChild(liIcon);	
			
			const liSpan = document.createElement("span");
			personLI.appendChild(liSpan);
			const liSpanText = document.createTextNode(personName);
			liSpan.appendChild(liSpanText);		
		});
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
	const dropDivs = document.querySelectorAll('.ppl_dropdownContainer');
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
	
	const dropBtns = document.querySelectorAll(".ppl_dropdownBtn");
	dropBtns.forEach((dropBtn)=>{
		dropBtn.style.display = "";
	});
	
}


/* open tree */
var isInfoChanging = false;
function openPerson(evnt, linked = false){
	var btnLI;
	if (linked){
		const dropdown = document.querySelector('.ppl_dropdownContainer');
		const dropLIs = dropdown.getElementsByTagName('li');
		const personNameWithComma = evnt.target.innerText;
		const personName = personNameWithComma.replace(", ", "");
		
		for (i = 0; i < dropLIs.length; i++) {	
			if (dropLIs[i].innerText == personName) {
				btnLI = dropLIs[i];	
			}				
		};
		
	} else {
		btnLI = evnt.target;
		if ((btnLI.tagName == "I")||(btnLI.tagName == "SPAN")){
			btnLI = btnLI.parentElement;
		}
	}
	
	if (!isInfoChanging){
		isInfoChanging = true;
		const btnLIid = btnLI.id;
		const personTag = btnLIid.replace("li_", "");
		const liDropParent = btnLI.parentElement;
		const famName = liDropParent.id.replace("DropdownDiv", "");
		
		const infoDiv = document.getElementById("infoDiv");
		const infoDivTree = document.getElementById("infoDivTree");
		
		fillPersonInfo(infoDiv, famName, personTag);
		fillPersonInfo(infoDivTree, famName, personTag);
		
		setTimeout(()=>{isInfoChanging = false;}, 2000);
		//svg tree create
	}
}

function fillPersonInfo(infoDiv, famName, personTag){	
	const famInfo = PEOPLEINFO[famName];
	const personInfo = famInfo[personTag];
	const personRelationsData = PEOPLERELATIONS[famName][personTag];
	
	const infoDivSec = infoDiv.querySelector(".infoDivSec");
	const infoDivMain = infoDivSec.querySelector(".infoMain");
	
	const mainContainerDiv = infoDivSec.querySelector(".mainContainerDiv");
	const infoAboutSect = infoDivSec.querySelector(".infoAboutSect");
	const divExtended = infoDivSec.querySelector(".infoMain_extended");
	
	const nameDiv = infoDivMain.querySelector(".info_name");
	const datesDiv = infoDivMain.querySelector(".info_dates");
	
	if (mainContainerDiv.style.display == "block"){
		$([mainContainerDiv, infoAboutSect]).fadeOut(1000, function(){
			clearAndFill();			
		});
		setTimeout(() => {extendDivAndShow()}, 1200);	
	} else {
		clearAndFill();		
		extendDivAndShow();
	}
	
	
	//clear & hide
	function clearAndFill(){
		clearPersonInfo(infoDiv);
			
		//create and set name, dates
		const nameText = document.createTextNode(personInfo.name);
		nameDiv.appendChild(nameText);
		
		const datesText = document.createTextNode(personInfo.dates);
		datesDiv.appendChild(datesText);
		
	
		//info dependent
		const bornNameDiv = infoDivMain.querySelector(".info_neeName");
	
		if (personInfo.hasOwnProperty('bornName')){
			const nameText = document.createTextNode(personInfo.bornName);
			bornNameDiv.appendChild(nameText);
			
			bornNameDiv.style.display = "block";
			
		} else {
			bornNameDiv.style.display = "none";			
		}
		
		
		//lists
		const infoVariables = { 
			'siblings': infoDivMain.querySelector(".info_siblings"), 
			'children': infoDivMain.querySelector(".info_children")
		};
		
		const infoVariablesKeys = Object.keys(infoVariables);
		infoVariablesKeys.forEach((infoVar)=>{
			if (personRelationsData.hasOwnProperty(infoVar)){
				const relativesList = personRelationsData[infoVar];
				
				var relativeNamesListStr = ''; var relativeLinesCount = 0;
				relativesList.forEach((relative)=>{		
					const relativeName = famInfo[relative].name;
					
					const varSpan = document.createElement('span');
					varSpan.classList.add('personLink');
					const varText = document.createTextNode(relativeName + ", ");
					
					//check current line # characters - new line if at max
					relativeNamesListStr += (relativeName + ", ");
					const stringLength = relativeNamesListStr.length;
					const maxStrLength = (relativeLinesCount == 0) 
						? 50 : 50;
					if (relativeNamesListStr.length > maxStrLength){
						relativeLinesCount += 1;
						relativeNamesListStr = '';
						const lineBreak = document.createElement('br');
						infoVariables[infoVar].appendChild(lineBreak);			
					} 
					
					infoVariables[infoVar].appendChild(varSpan);
					varSpan.appendChild(varText);
					
					//add click function
					varSpan.addEventListener("click", (evnt) => openPerson(evnt, linked=true));
				});
				
				//const relativeNamesStr = relativeNamesList.join(", ");
				infoVariables[infoVar].style.display = "block";
				
			} else {
				infoVariables[infoVar].style.display = "none";					
			}
		});
		
		//add svgLeaf imgs			
	}
	
	function clearPersonInfo(infoDiv){
		const infoDivSec = infoDiv.querySelector(".infoDivSec");		
		const infoDataSlots = infoDivSec.querySelectorAll(".infoData");
		
		//change values
		infoDataSlots.forEach((slot) => {
			const childNode = slot.childNodes[0] ?? {'tagName': ''};
			//has more than text
			if (childNode.tagName == 'TABLE'){
				slot.innerHTML = '';
				//clear table
				const dataCells = childNode.querySelectorAll(".infoData");
				dataCells.forEach((dataCell) => {
					dataCell.innerHTML = '';
				});
				slot.appendChild(childNode);			
			} else if (childNode.tagName == 'SPAN'){
				slot.innerHTML = '';	
				slot.appendChild(childNode);
			} else {
				slot.innerHTML = '';				
			}
		});		
		//clear svgleaf imgs		
		
	}
	
	function extendDivAndShow(){
		if (personInfo.hasOwnProperty('about')){
			fillInExtendedTable(personInfo.about);
			$(divExtended).fadeIn(1000);		
			$([mainContainerDiv, infoAboutSect]).fadeIn(700);
			
		} else {			
			$(divExtended).fadeOut(500);	
			setTimeout(()=>{
				$([mainContainerDiv, infoAboutSect]).fadeIn(700);
			}, 100);
		}
	}
	
	function fillInExtendedTable(personAbout){
		const aboutKeys = Object.keys(personAbout);	
		aboutKeys.forEach((aboutKey) => {
			const dataClass = aboutKey + "Val";
			const relatedDiv = divExtended.querySelector('.' + dataClass);
			
			relatedDiv.innerHTML = personAbout[aboutKey];
		});	
	}
	
	
	
}

function createInfoDivs(type){	
	const navDiv = document.querySelector('.top_navbar');
	const activeTabBtn = navDiv.querySelector('.navTab.active');
	const treeTabBtn = navDiv.querySelector('#treeTab');
	
	const infoDiv = (type == "info") ? document.getElementById("infoDiv") : document.getElementById("infoDivTree");
	
	const infoDivSec = infoDiv.querySelector(".infoDivSec");
	const infoDivMain = infoDivSec.querySelector(".infoMain");	
	
	createLeafSVG(type);
	
	const divExtended = document.createElement("div");
	divExtended.classList.add('infoMain_extended');
	infoDivSec.appendChild(divExtended);
	
	
	//main
	const containerDiv = document.createElement("div");
	containerDiv.classList.add('mainContainerDiv');
	infoDivMain.appendChild(containerDiv);
	
	const nameDiv = document.createElement("div");
	nameDiv.classList.add('infoData');
	nameDiv.classList.add('info_name');
	containerDiv.appendChild(nameDiv);
	
	const datesDiv = document.createElement("div");
	datesDiv.classList.add('infoData');
	datesDiv.classList.add('info_dates');
	containerDiv.appendChild(datesDiv);
	
	const bornNameDiv  = document.createElement("div");
	bornNameDiv.classList.add('infoData');
	bornNameDiv.classList.add('info_neeName');
	containerDiv.appendChild(bornNameDiv);
	
		const bornNameTitle = document.createElement("span");
		bornNameTitle.classList.add('aboutBold');
		bornNameDiv.appendChild(bornNameTitle);
		const bornNameTitleText = document.createTextNode('Née: ');
		bornNameTitle.appendChild(bornNameTitleText);			
	
	//siblings
	const siblingDiv  = document.createElement("div");
	siblingDiv.classList.add('infoData');
	siblingDiv.classList.add('info_siblings');
	containerDiv.appendChild(siblingDiv);
	
		const siblingTitle = document.createElement("span");
		siblingTitle.classList.add('aboutBold');
		siblingDiv.appendChild(siblingTitle);
		const siblingTitleText = document.createTextNode('Siblings: ');
		siblingTitle.appendChild(siblingTitleText);
		
	//children
	const childrenDiv  = document.createElement("div");
	childrenDiv.classList.add('infoData');
	childrenDiv.classList.add('info_children');
	containerDiv.appendChild(childrenDiv);
	
		const childrenTitle = document.createElement("span");
		childrenTitle.classList.add('aboutBold');
		childrenDiv.appendChild(childrenTitle);
		const childrenTitleText = document.createTextNode('Children: ');
		childrenTitle.appendChild(childrenTitleText);	
	
	//extra
	const infoAboutDiv = document.createElement("div");
	infoAboutDiv.classList.add('infoAboutSect');
	divExtended.appendChild(infoAboutDiv);
	
	createInfoTable(divExtended);
	
	function createInfoTable(divExtended){
		var aboutTable = document.createElement("table");
		aboutTable.classList.add('infoAboutTable');
		infoAboutDiv.appendChild(aboutTable);
		
		const aboutRowBorn1 = aboutTable.insertRow(-1);
		const head_bornCell = document.createElement("th");
			head_bornCell.setAttribute('rowspan', '2');
		head_bornCell.setAttribute('class', 'aboutBold');
		aboutRowBorn1.appendChild(head_bornCell);
		const head_bornText = document.createTextNode('Born: ');
		head_bornCell.appendChild(head_bornText);			
		
		const about_bornOn = aboutRowBorn1.insertCell(-1);
		about_bornOn.setAttribute('class', 'aboutSubBold');
		const head_bornOnText = document.createTextNode('on ');
		about_bornOn.appendChild(head_bornOnText);			
		
			const about_bornOnVal = aboutRowBorn1.insertCell(-1);
			about_bornOnVal.setAttribute('class', 'infoData bornOnVal');
		
		
		const aboutRowBorn2 = aboutTable.insertRow(-1);
		const about_bornAt = aboutRowBorn2.insertCell(-1);
			about_bornAt.setAttribute('class', 'aboutSubBold');
		const head_bornAtText = document.createTextNode('at ');
		about_bornAt.appendChild(head_bornAtText);			
			
			const about_bornAtVal = aboutRowBorn2.insertCell(-1);
			about_bornAtVal.setAttribute('class', 'infoData bornAtVal');		
		
		
		const aboutRowMarried1 = aboutTable.insertRow(-1);
		const head_marriedCell = document.createElement("th");
		head_marriedCell.setAttribute('rowspan', '3');	
		head_marriedCell.setAttribute('class', 'aboutBold');		
		aboutRowMarried1.appendChild(head_marriedCell);
		const head_marriedText = document.createTextNode('Married: ');
		head_marriedCell.appendChild(head_marriedText);
		
		const about_marriedTo = aboutRowMarried1.insertCell(-1);	
		about_marriedTo.setAttribute('class', 'aboutSubBold');	
		const about_marriedToText = document.createTextNode('to ');
		about_marriedTo.appendChild(about_marriedToText);			
		
			const about_marriedToVal = aboutRowMarried1.insertCell(-1);
			about_marriedToVal.setAttribute('class', 'infoData marriedToVal');
		
		
		const aboutRowMarried2 = aboutTable.insertRow(-1);
		const about_marriedOn = aboutRowMarried2.insertCell(-1);
		about_marriedOn.setAttribute('class', 'aboutSubBold');
		const about_marriedOnText = document.createTextNode('on ');
		about_marriedOn.appendChild(about_marriedOnText);		
		
			const about_marriedOnVal = aboutRowMarried2.insertCell(-1);
			about_marriedOnVal.setAttribute('class', 'infoData marriedOnVal');
		
		
		const aboutRowMarried3 = aboutTable.insertRow(-1);
		const about_marriedAt = aboutRowMarried3.insertCell(-1);
		about_marriedAt.setAttribute('class', 'aboutSubBold');
		const about_marriedAtText = document.createTextNode('at ');
		about_marriedAt.appendChild(about_marriedAtText);		
		
			const about_marriedAtVal = aboutRowMarried3.insertCell(-1);
			about_marriedAtVal.setAttribute('class', 'infoData marriedAtVal');
		
		
		
		const aboutRowDied1 = aboutTable.insertRow(-1);
		const head_diedCell = document.createElement("th");
			head_diedCell.rowspan = '3';		
		head_diedCell.setAttribute('class', 'aboutBold');
		aboutRowDied1.appendChild(head_diedCell);
		const head_diedText = document.createTextNode('Died: ');
		head_diedCell.appendChild(head_diedText);
		
		const about_diedOn = aboutRowDied1.insertCell(-1);
		about_diedOn.setAttribute('class', 'aboutSubBold');
		const about_diedOnText = document.createTextNode('on ');
		about_diedOn.appendChild(about_diedOnText);		
		
			const about_diedOnVal = aboutRowDied1.insertCell(-1);
			about_diedOnVal.setAttribute('class', 'infoData diedOnVal');
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
		
		
		const circleGrp = new createNewElement('g', {
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
		
		const circle = new createNewElement('circle', Object.assign({}, circleDefine, {
			'class': 'circle',
			'fill': '#FFAC81',
			'stroke': 'none',
		}));
		
		//bevelborder
		const circleBorderRight = new createNewElement('circle', Object.assign({}, circleDefine, {
			'class': 'circleBorder',
			'fill': 'none',
			'stroke': '#FFDFA7',
		}));
		const circleBorderTop = new createNewElement('circle', Object.assign({}, circleDefine, {
			'class': 'circleBorder',
			'fill': 'none',
			'stroke': '#FFE7AD',
		}));
		const circleBorderLeft = new createNewElement('circle', Object.assign({}, circleDefine, {
			'class': 'circleBorder',
			'fill': 'none',
			'stroke': '#FFFFCB', 
		}));
		const circleBorderBot = new createNewElement('circle', Object.assign({}, circleDefine, {
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
		const circleContour = new createNewElement('circle', Object.assign({}, circleDefine, {
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
		const circleShadow1 = new createNewElement('circle', Object.assign({}, circleDefine, {
			'r': circleRadius,
			'cx': 1, 'cy': 1,	
			'stroke-width': circleBorder+2,
			'stroke-opacity': 0.3,
			'class': 'circleShadow',
			'fill': 'none',
			'stroke': '#000',
		}));
		const circleShadow2 = new createNewElement('circle', Object.assign({}, circleDefine, {
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
	const lineGrp = new createNewElement('g', {
		'class': 'mainLine_GRP',
	});
	const mainLine = new createNewElement('line', {
		'class': 'mainLine',
		'x1': 0, 'y1': svgCenterPt.y, 
		'x2': pageWidth, 'y2': svgCenterPt.y,
		'fill': 'none',
		'stroke': '#FF928B',
		'stroke-width': 10,		
	});
	const mainLineShadow1 = new createNewElement('line', {
		'class': 'mainLineShadow',
		'x1': 0, 'y1': (svgCenterPt.y+3), 
		'x2': pageWidth, 'y2': (svgCenterPt.y+3),
		'fill': 'none',
		'stroke': '#000',
		'stroke-width': 10,	
		'stroke-opacity': 0.1,
	});
	const mainLineShadow2 = new createNewElement('line', {
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
	const personNameText = new createNewElement('text', {
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
	
	const familyNameText = new createNewElement('text', {
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
	
	const defs = new createNewElement('defs', {
		'id': 'clipPaths',
	});
	const topClip = new createNewElement('clipPath', {
		'id': 'topLeaf_clipPath',
	});
	const topClipPath = new createNewElement('path', {
		'd': leafPaths.topLeaf_fill,
	});
	leafSVG.appendChild(defs);
	defs.appendChild(topClip);
	topClip.appendChild(topClipPath);
	
	const bottomLeafGRP = new createNewElement('g', {
		'id': 'bottomLeaf_GRP',
	});
	const bottomLeaf_fill = new createNewElement('path', {
		'id': 'bottomLeaf_fill', 
		'style': 'fill:' + fillColour + '; fill-opacity:0.75502;',
		'd': leafPaths.bottomLeaf_fill,
	});
	const bottomLeaf_outer = new createNewElement('path', {
		'id': 'bottomLeaf_outer', 
		'style': 'fill:' + fillColour + '; fill-opacity:1;',
		'd': leafPaths.bottomLeaf_outer,
	});
	leafSVG.appendChild(bottomLeafGRP);
	bottomLeafGRP.appendChild(bottomLeaf_fill);
	bottomLeafGRP.appendChild(bottomLeaf_outer);
	
	
	const topLeafGRP = new createNewElement('g', {
		'id': 'topLeaf_GRP',
	});
	const topLeaf_fill = new createNewElement('path', {
		'id': 'topLeaf_fill', 
		'style': 'fill:' + fillColour + '; fill-opacity:0.75502;',
		'd': leafPaths.topLeaf_fill,
	});
	const topLeaf_outer = new createNewElement('path', {
		'id': 'topLeaf_outer', 
		'style': 'fill:' + fillColour + '; fill-opacity:1;',
		'd': leafPaths.topLeaf_outer,
	});
	leafSVG.appendChild(topLeafGRP);
	topLeafGRP.appendChild(topLeaf_fill);
	topLeafGRP.appendChild(topLeaf_outer);
	
}

function createNewElement(type, obj, noNS=false){
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
	const peopleDropdowns = document.querySelectorAll('.ppl_dropdownBtn');
	for (const drop of peopleDropdowns) {
		drop.addEventListener("click", (evnt) => peopleDropdownDo(evnt));	
	}
	document.addEventListener("click", (evnt) => outsidePeopleDiv_clickDetect(evnt));
	
	//infoDiv
	createInfoDivs('tree');
	createInfoDivs('info');
	addPeopleToList();
	
});
/* ------------------------------------------------ */