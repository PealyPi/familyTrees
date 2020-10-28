/* ============================================================ */
/* ===                    Custom Scripts                    === */
/* ============================================================ */
/* preload info /relations data */
var PEOPLEINFO = personInfoStorage();
var PEOPLERELATIONS = nodeDataStorage();

class nodeLetterTag_info {
	constructor(){
		this.nodeLetterOrder =  ['nodeA', 'nodeAs', 'nodeB', 'nodeBs', 'nodeC', 'nodeCs', 'nodeD', 'nodeDs', 'nodeE', 'nodeEs'];
		
		this.nodeRelations = [
			'focusGchild', 'focusGchildS', 'focusChild', 'focusChildS', 
			'focus', 'focusS', 
			'focusParent', 'focusParentS', 'focusGparent', 'focusGparentS'	];
		
		this.nodeList = {
			'nodeA': '', 'nodeAs': '', 
			'nodeB': '', 'nodeBs': '', 
			'nodeC': '', 'nodeCs': '', 
			'nodeD': '', 'nodeDs': '', 
			'nodeE': '', 'nodeEs': ''	};
		this.currentFocus = '';
		this.initialiseNodeLetters();
		return this;
	}
	
	initialiseNodeLetters(){
		this.nodeLetterTags = {
			'focusGchild': 'nodeA',  'focusGchildS' : 'nodeAs', 
			'focusChild': 'nodeB', 	 'focusChildS' : 'nodeBs', 
			'focus': 'nodeC', 		 'focusS' : 'nodeCs', 
			'focusParent': 'nodeD',  'focusParentS' : 'nodeDs', 
			'focusGparent': 'nodeE', 'focusGparentS' : 'nodeEs'
		};		
	}
	
	updateNodeLetters(tag, letter){
		/*
		const objKeys = Object.keys(this.nodeLetterTags);
		for (const key in this.nodeLetterTags){
			if (this.nodeLetterTags[key] == letter){
				this.nodeLetterTags[key] = null;
			}
		}*/
		this.nodeLetterTags[tag] = letter;
	}
	
	updateNodeList(letter, obj){
		this.nodeList[letter] = obj;
		//console.log("letter:" + letter + ", objTag: " + obj.tagType);
	}
	
	updateFocus(newFocus){
		this.currentFocus = newFocus;
		//console.log("newFocus: " + newFocus.personTag + ", " +  newFocus.famName);
	}
	
	getNodeObj(nodeTag){
		const nodeLetter = this.nodeLetterTags[nodeTag];
		return this.nodeList[nodeLetter];		
	}
	
	isPersonAdjacent(personTag){
		//get current parent/child
		const currentParentLetter = this.nodeLetterTags.focusParent;
		const currentParentSLetter = this.nodeLetterTags.focusParentS;
		const currentChildLetter = this.nodeLetterTags.focusChild;
		
		const currentParentObj = this.nodeList[currentParentLetter];
		const currentParentSObj = this.nodeList[currentParentSLetter];
		const currentChildObj = this.nodeList[currentChildLetter];
		
		if (personTag == currentParentObj.personTag){
			return 'parent';
		} else if (personTag == currentChildObj.personTag){
			return 'child';
			
		} else if (personTag == currentParentSObj.personTag){	
			return 'parentS';
		} else {
			return 'none';
		}
	}
}

var NODEdetails = new nodeLetterTag_info();


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

function navBar_clickEvnt(event, link=false){
	var btn = event.target;
	const btnID = btn.id ?? '';		
	
	if (!isPageTransitioning){
		isPageTransitioning = true;
		
		if (link){
			btn = (btnID == 'infoTreeLinkBTN') ? document.getElementById("treeTab") : (btnID == 'treeInfoLinkBTN') ? document.getElementById("infoTab") : btn;
		}
		
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
				if (NODEdetails.currentFocus!= '')
					treeChange_focusPerson(NODEdetails.currentFocus.personTag, NODEdetails.currentFocus.famName);	
				else {
					//console.log("No focus");
					//svg.querySelector(".mainLine_GRP").style.opacity = 0;					
				}
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
				//check if its a nested element
				if ($(clickedElement).parents("#peopleDiv").length == 0){
					peopleDiv.classList.toggle("sliding");
					pplTab.classList.toggle("active");	
				}
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
var global_leafImgSlideshow_info, global_leafImgSlideshow_tree;

function openPerson(evnt, linked = false){
	var btnLI;
	if (linked){
		const dropdown = document.querySelector('.ppl_dropdownContainer');
		const dropdownDiv = document.getElementById("peopleDiv");
		const dropLIs = dropdownDiv.getElementsByTagName('li');
		const personNameWithComma = evnt.target.innerText;
		const personName = personNameWithComma.replace(",", "");
		
		//console.log(personName);
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
		NODEdetails.updateFocus({'personTag': personTag, 'famName': famName});
		
		//if page != info/tree, go to tree...		
		const navDiv = document.querySelector('.top_navbar');		
		const currentActive = navDiv.querySelector('.navTab.active');
		const treeBtn = navDiv.querySelector('#treeTab');
		
		if ( (currentActive.id != "treeTab") && (currentActive.id != "infoTab") ){
			navBar_openPage(treeBtn);
		} else if (currentActive.id == "treeTab"){
			//svg tree create
			treeChange_focusPerson(personTag, famName);			
		} else {			
			treeChange_focusPerson(personTag, famName);		
		}

		//close people div	
		const pplDiv = document.getElementById("peopleDiv");
		const pplTab = navDiv.querySelector("#pplTab");
		if (pplDiv.classList.contains("sliding")){
			peopleDiv.classList.toggle("sliding");
			pplTab.classList.toggle("active");	
		}
		
		
		
		setTimeout(()=>{isInfoChanging = false;}, 2000);
	}
}

function fillPersonInfo(infoDiv, famName, personTag){	

	const famInfo = PEOPLEINFO[famName] ?? {};
	const personInfo = famInfo[personTag] ?? {};
	const personRelationsData = PEOPLERELATIONS[famName][personTag] ?? {};
	
	const infoDivSec = infoDiv.querySelector(".infoDivSec");
	const infoDivMain = infoDivSec.querySelector(".infoMain");
	
	const mainContainerDiv = infoDivSec.querySelector(".mainContainerDiv");
	const infoAboutSect = infoDivSec.querySelector(".infoAboutSect");
	const divExtended = infoDivSec.querySelector(".infoMain_extended");
	
	const nameDiv = infoDivMain.querySelector(".info_name");
	const datesDiv = infoDivMain.querySelector(".info_dates");
	
	const leafSVG = infoDiv.querySelector("svg.leafSVG");	
	const infoDivType = (infoDiv.id == 'infoDiv') ? 'info' : 'tree';
	
	
	if (personTag == ''){
		clearPersonInfo(infoDiv);	
		
	} else {		
		if (mainContainerDiv.style.display == "block"){
			if (leafSVG.style.display != "none"){
				$(leafSVG).fadeOut(1000);
			}
			$([mainContainerDiv, infoAboutSect]).fadeOut(1000, function(){
				clearAndFill();			
			});	
			
			setTimeout(() => {extendDivAndShow()}, 1200);	
		} else {
			//first fill		
			clearAndFill();		
			extendDivAndShow();
			if (infoDivType == "info"){
				$(infoDiv.querySelector("#infoTreeLinkBTN")).fadeIn(500);
			} else {
				$(infoDiv.querySelector("#treeInfoLinkBTN")).fadeIn(500);
			}
		}		
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
		if (personInfo.hasOwnProperty('imgs')){
			if (personInfo.imgs.length > 1)
				addLeafImgs();
		}
		
		
		function addLeafImgs(){
			const personImgs = personInfo.imgs; //[{icon}, {url, config}]
			var leafImgArr = [];
			
			personImgs.forEach((img)=> {
				if (img.hasOwnProperty("leafImg")){
					leafImgArr.push(img);
				}
			});
			const clipPathURL = 'url(#' + infoDivType +  '_topLeaf_clipPath)';
			var leafSVGimgArr = [];
			leafImgArr.forEach((arrLeafImg)=> {
				const leafImgSVGobj = new createNewElement('image', { 
					'class': 'svg_leafImg',
					'href': arrLeafImg.leafImg,
					'x': arrLeafImg.leafTransform.x,
					'width': arrLeafImg.leafWidth,
					'clip-path': clipPathURL,
				});	
				leafSVG.querySelector('#topLeaf_fill').after(leafImgSVGobj);
				leafSVGimgArr.push(leafImgSVGobj);
			});
			
			shuffle(leafImgArr);
			setTimeout(() => { 
				$(leafSVGimgArr[0]).fadeIn(1000);//first image	
			}, 1400);
			
			var imgIndex = 0;
			var leafImgFades = function(){
				if (imgIndex == (leafSVGimgArr.length-1)){ //last img
					$(leafSVGimgArr[imgIndex]).fadeOut(1000);
					$(leafSVGimgArr[0]).fadeIn(1000);
					imgIndex = 0;
					
				} else {		
					$(leafSVGimgArr[imgIndex]).fadeOut(1000);
					$(leafSVGimgArr[imgIndex+1]).fadeIn(1000);			
					imgIndex++;
				}
			}
			
			setTimeout( () => {
				startLeafImgSlides(infoDivType, leafImgFades)
			}, 500);
			
			//fade in leaf
			$(leafSVG).fadeIn(1000);
		}
		
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
				if (!slot.classList.contains("marriedToVal")){
					slot.appendChild(childNode);					
				}
			} else {
				slot.innerHTML = '';				
			}
		});		
		
		//clear svgleaf imgs	
		stopLeafImgSlides(infoDivType);				
		
		const leafGrp = leafSVG.querySelector("#topLeaf_GRP")
		const allOldImgs = leafGrp.getElementsByTagName("image");
		
		if (allOldImgs.length > 0){
			for (i=0; i<allOldImgs.length; i++){
				leafGrp.removeChild(allOldImgs[i]);
			}
		}
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
			
			if (aboutKey == "marriedTo"){				
				const marriedToSpan = document.createElement('span');
				marriedToSpan.classList.add('personLink');
				const marriedToText = document.createTextNode(personAbout[aboutKey]);
				marriedToSpan.appendChild(marriedToText);
				relatedDiv.appendChild(marriedToSpan);
			
				//add click function
				marriedToSpan.classList.add('personLink');
				marriedToSpan.addEventListener("click", (evnt) => openPerson(evnt, linked=true));
				
			} else {
				relatedDiv.innerHTML = personAbout[aboutKey];				
			}			
		});	
	}
}

function startLeafImgSlides(type, fn){
	switch (type){
		case 'info': 
			if (!global_leafImgSlideshow_info){
				global_leafImgSlideshow_info = setInterval( fn, 10000);
			}
		break;
		case 'tree':
			if (!global_leafImgSlideshow_tree){
				global_leafImgSlideshow_tree = setInterval( fn, 10000);
			}
		break;
	}
	
}

function stopLeafImgSlides(type) {
	switch (type){
		case 'info': 
			if (global_leafImgSlideshow_info){
				clearInterval(global_leafImgSlideshow_info);
			}
		break;
		case 'tree':
			if (global_leafImgSlideshow_info){
				clearInterval(global_leafImgSlideshow_tree);
			}
		break;
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

function interchangeTreeInfo_Tabs(){
	//add click fn to btn
	const treeToInfoBTN = document.getElementById("treeInfoLinkBTN");
	const infoToTreeBTN = document.getElementById("infoTreeLinkBTN");
	
	for (const btn of [treeToInfoBTN, infoToTreeBTN]) {
		btn.addEventListener("click", (evnt) => navBar_clickEvnt(evnt, link=true));	
	}
}

/* -------------------- */

/*svg*/
class node {
	constructor(svg, tagType){
		this.svg = svg;
		this.tagType = tagType;	
		this._isSpouse = this.isSpouse();
		this._isRoot = this.isRoot();
		this.getWhichNode();
	}
	
	//all variables
	/*
	famTags, famName, nodeGrpContainer, parentSTag, personData, personDatesText,
	personNameText, personTag, svg. tagTyp, whichNode, _isRoot, _isSibling, _isSpouse
	*/
	
	getFamilyTags() {
		this.famTags = {
			'spouseTag': 	this.personData.spouse ?? 'none',
			'childTag': 	this.personData.childMain ?? 'none',
			'parentTag': 	this.personData.parentMain ?? 'none',
			'parentSTag': 	this.personData.parentSpouse ?? 'none',
		}
	}
	
	isRoot(){
		const rootPpl = {
			'roseHadkiss': 'kesby',
			'ronHadkiss': 'hadkiss',
		}
		if (rootPpl.hasOwnProperty(this.personTag))
			return true;
		else 
			return false;
	}
	
	isSpouse(){
		return (NODEdetails.nodeRelations.indexOf(this.tagType) % 2 == 1);
	}
	
	isSibling(){
		const isSiblingBool = this.personData.hasOwnProperty("siblingMain");
		
		if (isSiblingBool){
			this.mainSibling = this.personData.siblingMain;
			const mainSiblingData = PEOPLERELATIONS[this.famName][this.mainSibling];
			this.parentTag = mainSiblingData.parentMain;
			this.parentSTag = mainSiblingData.parentSpouse;
		}
		return isSiblingBool;
	}
	
	getLinkedFamily(){
		const linkedPeople = {
			'roseHadkiss': 'hadkiss',
			'ronHadkiss': 'kesby',			
		}
		this.otherFam = linkedPeople[this.personTag];
	}
	
	getNodeTypePosition(tagType){		
		const svgVB = this.svg.viewBox.baseVal;
		const svgWidth = svgVB.width;
		const svgHeight = svgVB.height;
		
		const midLine = (svgHeight/2)-70;
		const spouseLine = midLine+200;
		
		const childX = 115;
		const parentX = svgWidth - childX;
		const offScreenX = 130;
		
		switch (tagType){
			case 'focusGchild': 
				return {'x': (-offScreenX), 'y': midLine};
			break;				
			case 'focusGchildS': 
				return {'x': (-offScreenX), 'y': spouseLine};
			break;			
			case 'focusChild': 
				return {'x': childX, 'y': midLine};
			break;				
			case 'focusChildS': 
				return {'x': childX, 'y': spouseLine};
			break;						
			case 'focus': 
				return {'x': svgWidth/2, 'y': midLine};
			break;			
			case 'focusS': 
				return {'x': svgWidth/2, 'y': spouseLine};
			break;			
			case 'focusParent': 
				return {'x': parentX, 'y': midLine};
			break;				
			case 'focusParentS': 
				return {'x': parentX, 'y': spouseLine};
			break;				
			case 'focusGparent': 
				return {'x': (svgWidth+offScreenX), 'y': midLine};
			break;				
			case 'focusGparentS': 
				return {'x': (svgWidth+offScreenX), 'y': spouseLine};
			break;				
		}
		
	}
	
	initialise(personTag, famName){		
		const infoDiv = document.getElementById("infoDiv");
		const treeInfoDiv = document.getElementById("infoDivTree");
		const personInfo = PEOPLEINFO[famName][personTag] ?? {};
		
		const personData = PEOPLERELATIONS[famName][personTag] ?? {};
		this.personData = personData;
	
		this.personTag = personTag;
		this.famName = famName;
		
		this.getFamilyTags();
		
		this._isSibling = this.isSibling();
		
		this.nodeGrpContainer = this.createInitialNode(personTag, personInfo, this.getNodeTypePosition(this.tagType));
		
		//console.log(this.tagType + ", " + this.personTag);
		switch (this.tagType){
			case 'focus':	
				fillPersonInfo(infoDiv, famName, personTag);
				fillPersonInfo(treeInfoDiv, famName, personTag);
				
				var spouseNode = {};
				if (this._isRoot){	
					this.getLinkedFamily();	
					spouseNode = new node(this.svg, 'focusS').initialise(this.famTags.spouseTag, this.otherFam);					
				} else {	
					spouseNode = new node(this.svg, 'focusS').initialise(this.famTags.spouseTag, famName);				
				}
				var childNode = new node(this.svg, 'focusChild').initialise(this.famTags.childTag, famName);
				
				var parentNode = new node(this.svg, 'focusParent').initialise(this.famTags.parentTag, famName);	
				
				NODEdetails.updateNodeList('nodeC', this);
				NODEdetails.updateNodeList('nodeCs', spouseNode);
				NODEdetails.updateNodeList('nodeD', parentNode);
				NODEdetails.updateNodeList('nodeB', childNode);
				
				NODEdetails.updateFocus({'personTag': personTag, 'famName': famName});	
				
				this.checkRelationButtons();
				
			break;
			
			case 'focusParent':								
				var spouseNode = new node(this.svg, 'focusParentS').initialise(this.famTags.spouseTag, famName);
				var parentNode = new node(this.svg, 'focusGparent').initialise(this.famTags.parentTag, famName);	
				
				NODEdetails.updateNodeList('nodeDs', spouseNode);
				NODEdetails.updateNodeList('nodeE', parentNode);
			break;
			
			case 'focusChild':				
				var spouseNode = new node(this.svg, 'focusChildS').initialise(this.famTags.spouseTag, famName);
				var childNode = new node(this.svg, 'focusGchild').initialise(this.famTags.childTag, famName);	
				
				NODEdetails.updateNodeList('nodeBs', spouseNode);
				NODEdetails.updateNodeList('nodeA', childNode);
			break;
			
			case 'focusGchild':
				this.nodeGrpContainer.style.opacity = 0;
				
				var spouseNode = new node(this.svg, 'focusGchildS').initialise(this.famTags.spouseTag, famName);
				NODEdetails.updateNodeList('nodeAs', spouseNode);
				
			break;
			
			case 'focusGparent':
				this.nodeGrpContainer.style.opacity = 0;
				
				var spouseNode = new node(this.svg, 'focusGparentS').initialise(this.famTags.spouseTag, famName);
				NODEdetails.updateNodeList('nodeEs', spouseNode);
			break;
			
			case 'focusParentS':
				for (const line of this.nodeGrpContainer.querySelector('.spouseLine_GRP').children ){
					Velocity(line, { 'stroke-dashoffset': 0 }, { duration: 1100, queue: false });
				}
			break;
		}
		return this;
		
	}
	
	reinitialise(personTag, famName) {
		//console.log(personTag + ", " + famName + ", tagType: " + this.tagType + ", node: " + this.whichNode);
		const infoDiv = document.getElementById("infoDiv");
		const infoDivTree = document.getElementById("infoDivTree");
		
		const focusData = PEOPLERELATIONS[famName][personTag] ?? {};
		
		const focusData_spouse = focusData.spouse ?? 'none';
		const focusData_parent = focusData.parentMain ?? 'none';
		const focusData_parentS = focusData.parentSpouse ?? 'none';
		const focusData_child = focusData.childMain ?? 'none';
		
		const parentData = PEOPLERELATIONS[famName][focusData_parent] ?? {};
		const childData = PEOPLERELATIONS[famName][focusData_child] ?? {};
		
		const focusData_childS = childData.spouse ?? 'none';
		const focusData_gParent = parentData.parentMain ?? 'none';
		const focusData_gParentS = parentData.parentSpouse ?? 'none';
		const focusData_gChild = childData.childMain ?? 'none';
		
		const gChildData = PEOPLERELATIONS[famName][focusData_gChild] ?? {};
		const focusData_gChildS = gChildData.spouse ?? 'none';
		
		switch (this.tagType){
			case 'focus':	
				this.nodeSetPerson(personTag, famName, this.tagType);
				NODEdetails.updateFocus({'personTag': personTag, 'famName': famName});
				fillPersonInfo(infoDiv, famName, personTag);
				fillPersonInfo(infoDivTree, famName, personTag);
				
				this.checkRelationButtons();
				//console.log(personTag + ", tagType: " + this.tagType + ", node: " + this.whichNode);
			break;
			
			case 'focusParent':
				this.nodeSetPerson(focusData_parent, famName, this.tagType);
				//console.log(focusData_parent + ", tagType: " + this.tagType + ", node: " + this.whichNode);
			break;
				
			case 'focusChild':		
				this.nodeSetPerson(focusData_child, famName, this.tagType);
				//console.log(focusData_child + ", tagType: " + this.tagType + ", node: " + this.whichNode);
			break;
			
			case 'focusGchild':
				this.nodeSetPerson(focusData_gChild, famName, this.tagType);
				//console.log(focusData_gChild + ", tagType: " + this.tagType + ", node: " + this.whichNode);			
			break;
			
			case 'focusGparent':
				this.nodeSetPerson(focusData_gParent, famName, this.tagType);
				//console.log(focusData_gParent + ", tagType: " + this.tagType + ", node: " + this.whichNode);
			break;
			
			case 'focusS':
				this.nodeSetPerson(focusData_spouse, famName, this.tagType);
				//console.log(focusData_spouse + ", tagType: " + this.tagType + ", node: " + this.whichNode);
			break;
			
			case 'focusChildS':	 
				this.nodeSetPerson(focusData_childS, famName, this.tagType);
				//console.log(focusData_childS + ", tagType: " + this.tagType + ", node: " + this.whichNode);
			break;
			
			case 'focusGchildS':	
				this.nodeSetPerson(focusData_gChildS, famName, this.tagType);
				//console.log(focusData_gChildS + ", tagType: " + this.tagType + ", node: " + this.whichNode);
			break;		
			
			case 'focusParentS':  
				this.nodeSetPerson(focusData_parentS, famName, this.tagType);
				console.log(focusData_parentS + ", tagType: " + this.tagType + ", node: " + this.whichNode);
			break;
			
			case 'focusGparentS':
				this.nodeSetPerson(focusData_gParentS, famName, this.tagType);
				//console.log(focusData_gParentS + ", tagType: " + this.tagType + ", node: " + this.whichNode);
			break;
			
			default:
				//console.log("Tag doesn't match any...");
		}
	}
	
	getWhichNode(){		
		switch (this.tagType){
			case 'focus':
				this.whichNode = 'nodeC';	
			break;
			
			case 'focusParent':
				this.whichNode = 'nodeD';
			break;
			
			case 'focusChild':
				this.whichNode = 'nodeB';
			break;
			
			case 'focusGchild':
				this.whichNode = 'nodeA';					
			break;
			
			case 'focusGparent':
				this.whichNode = 'nodeE';
			break;			
			
			case 'focusS':
				this.whichNode = 'nodeCs';
			break;
			
			case 'focusChildS':
				this.whichNode = 'nodeBs';
			break;
			
			case 'focusGchildS':
				this.whichNode = 'nodeAs';
			break;
			
			case 'focusParentS':
				this.whichNode = 'nodeDs';
			break;				
			
			case 'focusGparentS':
				this.whichNode = 'nodeEs';
			break;			
		}
	}
	
	createInitialNode(personTag, personInfo, startXY){
		const nodeScale = (this.tagType == 'focus') ? 2 : 1; 
		const nodeOpacity = (this._isSpouse) ? (this.tagType == "focusParentS") ? 0.6 : 0 : 1;
		
		const nodeGrpContainer = new createNewElement('g', {
			'id': this.whichNode + '_GrpContainer',
			'class': 'nodeGrpContainer',
			'style': 'transform: translateX(' + startXY.x + 'px) translateY(' + startXY.y + 'px); opacity: '+ nodeOpacity,
		});
		
		if (this._isSpouse)
			this.svg.prepend(nodeGrpContainer);
		else
			this.svg.appendChild(nodeGrpContainer);
		
		const nodeGrp = new createNewElement('g', {
			'id': this.whichNode + '_Grp',
			'class': 'nodeGrp',
			'style': 'transform: scale(' + nodeScale + ')',
		});
		nodeGrpContainer.appendChild(nodeGrp);
		this.nodeGrpContainer = nodeGrpContainer;
		
		const circleGrp = new nodeCircle(nodeGrp).createCircle(this.whichNode);		
		
		var configs = {
			'fontSz': '20px',
			'dateFontSz': '16px',
			'textY': 95,
			'datesY': 70
		};
		
		//text
		const personDatesText = new createNewElement('text', {
			'class': 		'svgDatesTxt',
			'text-anchor': 	'middle',
			'font-family': 	"'Josefin Sans', sans-serif",
			'font-size': 	configs.dateFontSz,
			'fill':	'white',
			'x': 	0,	
			'y': 	configs.datesY,	
			
			'textContent': 	(personInfo.dates ?? ''),			
		});	
		nodeGrp.appendChild(personDatesText);
		
		const personNameText = new createNewElement('text', {
			'class': 		'svgNameTxt',
			'text-anchor': 	'middle',
			'font-family': 	"'Josefin Sans', sans-serif",
			'font-size': 	configs.fontSz,
			'fill':	'white',
			'x': 	0,	
			'y': 	configs.textY,	
			
			'textContent': 	(personInfo.name ?? ''),			
		});	
		nodeGrp.appendChild(personNameText);
		
		//this.personDatesText = personDatesText;
		//this.personNameText = personNameText;
		
		//image
		
		//spouse line
		var spouseLineGrp;
		if (this._isSpouse){			
			spouseLineGrp = this.createSpouseLine();
			if (personTag != 'none'){
				spouseLineGrp.style.opacity = 1;
			} else {
				spouseLineGrp.style.opacity = 0;
			}
			
		}
		
		if (personTag =="none"){
			//nodeGrp.setAttribute("visibility", "hidden");
			nodeGrpContainer.setAttribute("visibility", "hidden");
			if (this._isSpouse) spouseLineGrp.style.opacity = 0;
	
		} else {
			//nodeGrp.setAttribute("visibility", "");
			nodeGrpContainer.setAttribute("visibility", "");
			if (this._isSpouse) spouseLineGrp.style.opaicty = 0;
			
		}
		//add click event for non-focus
		circleGrp.addEventListener("click", (evnt) => treeChangeView(evnt, 'treeNode'));
		
		return nodeGrpContainer;
		
	}
	
	createSpouseLine(){		
		//console.log("Here: create spouse line for " + this.personTag);
		//const linePathD = 'm 0 0 h -120 v -200';
		const linePathD = 'm -120 -200 v 200 h 120';
		const lineDefine = {
			'fill': 'none',
			'stroke-width': 6,	
			'stroke-dasharray': 500,
			'stroke-dashoffset': 500,			
			'd': linePathD
		}
		const shadowLineDefine = Object.assign({}, lineDefine, {
			'class': 'lineShadow',
			'stroke': '#000',
			'stroke-opacity': 0.1,
		});
		
		const lineGrp = new createNewElement('g', {
			'class': 'spouseLine_GRP',
		});
		const mainLine = new createNewElement('path', 
			Object.assign({}, lineDefine, {
				'class': 'spouseLine',
				'stroke': '#FF928B'	
		}));
		const mainLineShadow1 = new createNewElement('path', shadowLineDefine);
		const mainLineShadow2 = new createNewElement('path', shadowLineDefine);
		
		this.nodeGrpContainer.prepend(lineGrp);
		lineGrp.appendChild(mainLine);
		lineGrp.prepend(mainLineShadow1);
		lineGrp.prepend(mainLineShadow2);
		
		//console.log(mainLine.getTotalLength()); //=320
		mainLineShadow1.setAttribute('transform', 'translate(-1.5, 1.5)');
		mainLineShadow2.setAttribute('transform', 'translate(-3, 3)');
		
		return lineGrp;
	}
	
	nodeShift(direction, first = false){
		//direction right => nodes moving left => relations index -ve	
		const oldPosition = this.getNodeTypePosition(this.tagType);
		const oldTag = this.tagType;	
		
		const oldRelationsIndex = NODEdetails.nodeRelations.indexOf(oldTag);
		var newRelationsIndex = (direction == 'left') ? (oldRelationsIndex + 2) :
			(direction == 'right') ? (oldRelationsIndex - 2) : '';	
		
		if (newRelationsIndex < 0){
			newRelationsIndex = 10 + newRelationsIndex;
		} else if (newRelationsIndex > 9){
			newRelationsIndex = newRelationsIndex % 10;
		}
		
		const newPosition = this.getNodeTypePosition(NODEdetails.nodeRelations[newRelationsIndex]);
		this.tagType = NODEdetails.nodeRelations[newRelationsIndex];			
		const newTag = this.tagType;
		
		
		const infoDiv = document.getElementById("infoDiv");
		const infoDivTree = document.getElementById("infoDivTree");
		
		//change global nodestore
		
		if (first != 'focusParentS'){
			this.animateShift(oldTag, oldPosition, newPosition);
			NODEdetails.updateNodeLetters(this.tagType, this.whichNode);
		}
		if (newTag == 'focus'){
			this.checkRelationButtons();
		}
		
		switch (first){
			case 'focusChild': //=> direction left
				//this becomes focus
				NODEdetails.updateFocus({'personTag': this.personTag, 'famName': this.famName});
				fillPersonInfo(infoDiv, this.famName, this.personTag);
				fillPersonInfo(infoDivTree, this.famName, this.personTag);
				
				const getGchildLetter = NODEdetails.nodeLetterTags['focusGchild'];
				NODEdetails.nodeList[getGchildLetter].nodeGrpContainer.style.opacity = 1;
				
				//set new gparent info
				//if famName change... other
				const getOldGparentLetter = NODEdetails.nodeLetterTags['focusGparent'];
				const getOldGparentSLetter = NODEdetails.nodeLetterTags['focusGparentS'];
				const oldgParentNode = NODEdetails.nodeList[getOldGparentLetter];
				const oldgParentSNode = NODEdetails.nodeList[getOldGparentSLetter];
				
				const getOldParentLetter = NODEdetails.nodeLetterTags['focusParent'];
				const oldParentNode = NODEdetails.nodeList[getOldParentLetter];
				
				for (const nodeLetter in NODEdetails.nodeList) {
					if (nodeLetter != this.whichNode)
						NODEdetails.nodeList[nodeLetter].nodeShift(direction);					
				}
				
				const newChildData = PEOPLERELATIONS[this.famName][this.famTags.childTag] ?? {};
				const newGchildName = newChildData.childMain ?? 'none';
				
				const newGchildData = PEOPLERELATIONS[this.famName][newGchildName] ?? {};
				const newGchildSName = newGchildData.spouse ?? 'none';
				
				//console.log(newGchildName + ", " + newGchildSName);
				const newGchildTag = 'focusGchild';
				const newGchildSTag = 'focusGchildS';			
				
				oldgParentNode.nodeSetPerson(newGchildName, this.famName, newGchildTag);
				oldgParentSNode.nodeSetPerson(newGchildSName, this.famName, newGchildSTag);
				
				setTimeout(()=> {
					oldParentNode.nodeGrpContainer.style.opacity = 0;
				}, 1000);
				
				//console.log('parent: ' + this.parentTag + ', child: ' + this.famTags.childTag );
				
			break;		
			case 'focusParent': //=> direction right		
				//this becomes focus
				NODEdetails.updateFocus({'personTag': this.personTag, 'famName': this.famName});
				fillPersonInfo(infoDiv, this.famName, this.personTag);
				fillPersonInfo(infoDivTree, this.famName, this.personTag);
				
				//set visibility of gParent and gChildren
				const getGparentLetter = NODEdetails.nodeLetterTags['focusGparent'];
				const getGparent = NODEdetails.nodeList[getGparentLetter];
				getGparent.nodeGrpContainer.style.opacity = 1;
				
				
				//set new gparent info
				//if famName change... other				
				const getOldGchildLetter = NODEdetails.nodeLetterTags['focusGchild'];
				const getOldGchildSLetter = NODEdetails.nodeLetterTags['focusGchildS'];
				const oldgChildNode = NODEdetails.nodeList[getOldGchildLetter];
				const oldgChildSNode = NODEdetails.nodeList[getOldGchildSLetter];
				
				const getOldChildLetter = NODEdetails.nodeLetterTags['focusChild'];
				const oldChildNode = NODEdetails.nodeList[getOldChildLetter];
				
				for (const nodeLetter in NODEdetails.nodeList) {
					if (nodeLetter != this.whichNode)
						NODEdetails.nodeList[nodeLetter].nodeShift(direction);					
				}	
				
				const newParentData = PEOPLERELATIONS[this.famName][this.famTags.parentTag] ?? {};
				const newGparentName = newParentData.parentMain ?? 'none';
				const newGparentSName = newParentData.parentSpouse ?? 'none';
				
				const newGparentTag = 'focusGparent';
				const newGparentSTag = 'focusGparentS';				
				
				oldgChildNode.nodeSetPerson(newGparentName, this.famName, newGparentTag);
				oldgChildSNode.nodeSetPerson(newGparentSName, this.famName, newGparentSTag);
				
				setTimeout(()=> {
					oldChildNode.nodeGrpContainer.style.opacity = 0;
				}, 1000);			
				
				//console.log('parent: ' + this.famTags.parentTag + ', child: ' + this.famTags.childTag );
				
			break;				
			case 'focusParentS': 
				this.shiftMainLine();
			break;	
		}		
	}
	
	shiftMainLine(){
		//create dummy for animation
		const dummyContainer = this.nodeGrpContainer.cloneNode(true);
		dummyContainer.classList.remove("nodeGrpContainer");	
		dummyContainer.classList.add("dummyContainer");	
		this.svg.appendChild(dummyContainer);		
		const dummyNodeGrp = dummyContainer.querySelector(".nodeGrp");
		const dummySpouseLineGrp = dummyContainer.querySelector(".spouseLine_GRP");
		
		this.nodeGrpContainer.style.opacity = 0;		
		const newFocusPosition = this.getNodeTypePosition('focus');
		const oldPosition = this.getNodeTypePosition('focusParentS');		
		
		//animate this node to focus position
		for (const line of dummySpouseLineGrp.children ){
			Velocity(line, { 'stroke-dashoffset': [500, 0] }, { duration: 1000, queue: false })
		}	
		
		setTimeout(()=>{
			Velocity(dummyContainer, { 
				translateX: [newFocusPosition.x , oldPosition.x], 
				translateY: [newFocusPosition.y , oldPosition.y], 
				opacity: [1 , 0.6], 
			}, { duration: 1500, queue: false,});
			
			Velocity(dummyNodeGrp, { 
				scale: 2
			}, { duration: 1500, queue: false,});
		}, 800);
		
		//animate away others
		tree.animateMainLineShift(dummyContainer, this.personTag, this.famName);
		
	}
	
	checkRelationButtons(){
		const siblingsCheck = this.personData.siblings ?? this.personData.siblingMain ?? 'none';
		const childrenCheck = this.personData.children ?? 'none';
		var tagChecks = {
			'childMain': 	'leftArrow',
			'parentMain': 	'rightArrow',
			'siblings': 	['siblingMain', 'sibling'],
			'children': 	'children'
		};
		for (const check in tagChecks){
			if (this.personData.hasOwnProperty(check)){
				if (Array.isArray(tagChecks[check])){
					if (this.personData.hasOwnProperty(tagChecks[check][0])){
						tree.showHideButtons('show', tagChecks[check][1]);
					}
				} else {
					tree.showHideButtons('show', tagChecks[check]);
				}
			}
			else
				tree.showHideButtons('hide', tagChecks[check]);
		}
		
		
	}
	
	animateShift (oldTag, oldPosition, newPosition) {		
		const scaleUp = (this.tagType =='focus') ? 2 : 1;
		const nodeGrp = this.nodeGrpContainer.querySelector(".nodeGrp"); 
		const lineGrp = this.nodeGrpContainer.querySelector(".spouseLine_GRP"); 
	
	
		Velocity.hook(this.nodeGrpContainer, "translateX", oldPosition.x); 
		Velocity.hook(this.nodeGrpContainer, "translateY", oldPosition.y); 
		if (oldTag =='focus') Velocity.hook(nodeGrp, "scale", 2); 
		else Velocity.hook(nodeGrp, "scale", 1); 
		
		
		
		Velocity(this.nodeGrpContainer, { 
			translateX: [newPosition.x , oldPosition.x], 
			translateY: [newPosition.y , oldPosition.y], 
		}, { duration: 1000, queue: false,});
		
		Velocity(nodeGrp, { 
			scale: scaleUp
		}, { duration: 1000, queue: false,});
		
		
		if (oldTag == "focusParentS"){ // disappear
			nodeGrp.classList.add("vivify");
			nodeGrp.classList.add("hitLeft");
			
			Velocity(this.nodeGrpContainer, { opacity: 0 }, { duration: 1100, queue: false });
			for (const line of lineGrp.children ){
				Velocity(line, { 'stroke-dashoffset': [500, 0] }, { duration: 1000, queue: false })
			}
			setTimeout(()=> {
				Velocity(lineGrp, { opacity: 0 }, { duration: 1100, queue: false });
			}, 500);
			
			setTimeout(()=> {
				nodeGrp.classList.remove("vivify");
				nodeGrp.classList.remove("hitLeft");
			}, 1500);
			
		} else if (this.tagType == "focusParentS"){ // appear
			nodeGrp.classList.add("vivify");
			nodeGrp.classList.add("hitLeft");
			Velocity(this.nodeGrpContainer, { opacity: 0.6 }, { duration: 1100, queue: false });
			Velocity(lineGrp, { opacity: 1 }, { duration: 1100, queue: false });
			
			for (const line of lineGrp.children ){
				setTimeout(()=> {
					Velocity(line, { 'stroke-dashoffset': [0, 500] }, { duration: 2000, queue: false})
				}, 100);
			}
			
			setTimeout(()=> {
				nodeGrp.classList.remove("vivify");
				nodeGrp.classList.remove("hitLeft");
			}, 1500);
		}
	}
	
	nodeSetPerson(newName, newFam, newTag){
		const nodeGrp = this.nodeGrpContainer.querySelector(".nodeGrp"); 
		
		const personData = PEOPLERELATIONS[newFam][newName] ?? {};
		const personInfo = PEOPLEINFO[newFam][newName] ?? {};	
		
		this.personData = personData;
		this.personTag = newName;
		this.famName = newFam;
		this.tagType = newTag;		
		
		this.getFamilyTags();	
		
		if (this.personTag == 'none'){
			this.nodeGrpContainer.setAttribute("visibility", "hidden");
		} else {
			this.nodeGrpContainer.setAttribute("visibility", "");	
		}
		
		const newNameText  = personInfo.name ?? '';
		const newDatesText  = personInfo.dates ?? '';
		
		this.nodeGrpContainer.querySelector(".svgDatesTxt").textContent = newDatesText;
		this.nodeGrpContainer.querySelector(".svgNameTxt").textContent = newNameText;	
		
		//if (this.tagType == 'focusGparent') console.log(this.personTag + ", tag :  " + this.tagType + ", name : " + (newNameText!= '') + ", dates : " + (newDatesText!= ''));
	}

}



class nodeCircle {
	constructor(container){
		this.container = container;
	}
	
	createCircle(whichNode){		
		const circleRadius = 50;
		const circleBorder = 4;
		const circleFullWidth = circleRadius + circleBorder;
		
		
		const circleGrp = new createNewElement('g', {
			'id': whichNode + '_circleGrp',
			'class': 'nodeCircleGrp',
		});
		this.container.appendChild(circleGrp);
		
		const circleDefine = {
			'r': circleRadius,
			'cx': 0, 'cy': 0,	
			'stroke-width': circleBorder,
		}
		
		const circle = new createNewElement('circle', Object.assign({}, circleDefine, {
			'class': 'nodeCircle',
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
		
		return circleGrp;
	}
}

class treeSVG {
	constructor(){
		this.svgDiv = document.getElementById('svgDiv');
		this.svgElem = document.getElementById('mainSVG');
	}
	createSVG() {
		const pageWidth = document.getElementsByTagName('body')[0].offsetWidth;
		this.svgWidth = pageWidth;
		
		const oldViewBox = this.svgElem.getAttribute('viewBox');
		const oldViewBoxArray = oldViewBox.split(' '); // 4 elements
		const newViewBox =  oldViewBoxArray[0] + ' ' + oldViewBoxArray[1] + ' ' + pageWidth + ' ' + oldViewBoxArray[3];
		this.svgElem.setAttribute('viewBox', newViewBox); 
		
		
		const svgCenterPt = {'x': (pageWidth/2),'y': (oldViewBoxArray[3]/2)};
		this.svgCenterPt = svgCenterPt;
		
		const mainLineGrp = this.createMainLine(
			{'x': - 10, 'y': (svgCenterPt.y - 70)}, 
			{'x': (pageWidth + 10), 'y': (svgCenterPt.y- 70)}
		);
		this.mainLineGrp = mainLineGrp;
		
		
	//	mainLineGrp.setAttribute("transform", "translate(0 -70)");	
		this.setFamilyText('');	
		
		this.svgElem.style.opacity = 0; 
		
		this.showHideButtons('hideAll');
		
		this.linkingTreeIcons();
	}
	
	createMainLine(startXY, endXY){
		var strokeWdth = 8, className = 'mainLine', 
		transXdir = 1, transYdir = 1 ;
		const lineDefine = {
			'x1': startXY.x, 'x2': endXY.x,
			'y1': startXY.y, 'y2': endXY.y,
			'fill': 'none',
			'stroke-width': strokeWdth,	
		}
		const shadowLineDefine = Object.assign({}, lineDefine, {
			'class': 'lineShadow',
			'stroke': '#000',
			'stroke-opacity': 0.1,
		});
		
		const lineGrp = new createNewElement('g', {
			'class': className + '_GRP',
		});
		const mainLine = new createNewElement('line', 
			Object.assign({}, lineDefine, {
				'class': className,
				'stroke': '#FF928B'	
		}));
		const mainLineShadow1 = new createNewElement('line', shadowLineDefine);
		const mainLineShadow2 = new createNewElement('line', shadowLineDefine);
		
		this.svgElem.prepend(lineGrp);
		lineGrp.appendChild(mainLine);
		lineGrp.prepend(mainLineShadow1);
		lineGrp.prepend(mainLineShadow2);
		
		mainLineShadow1.setAttribute('transform', 
			'translate(' + (transXdir * 1.5) + ', ' +  (transYdir * 1.5) + ')');
		mainLineShadow2.setAttribute('transform',
			'translate(' + (transXdir * 3) + ', ' +  (transYdir * 3) + ')');
		
		
		return lineGrp;
	}
	
	setFamilyText(famName){	
		const familyTextSpan = this.svgDiv.querySelector(".tree_familyText");
		familyTextSpan.innerHTML = famName.charAt(0).toUpperCase() + famName.slice(1);	
	}
	
	showHideButtons(showHide, icon = false){
		const btnDiv = this.svgDiv.querySelector(".arrowButtonsDiv") ;
		const btnArray = btnDiv.querySelectorAll("button");
		
		switch (showHide){
			case 'hideAll':
				if (btnDiv.style.opacity == 1){
					this.animateButtonDivEnterExit(btnDiv, 'exit');
					setTimeout(()=>{
						for (const btn of btnArray) {
							btn.style.opacity = 0;
						}
					}, 500);
				}
			break;
			case 'showAll':
				if (btnDiv.style.opacity == 0){
					for (const btn of btnArray) {
						btn.style.opacity = 1;
					}
					this.animateButtonDivEnterExit(btnDiv, 'enter');
				}
			break;
			case 'hide':	
				switch (icon){
					case 'sibling':
						const sibBtn = btnDiv.querySelector('.siblingIcon_button');
						this.animateButtonEnterExit(sibBtn, 'exit');
					break;
					case 'children':
						const chldBtn = btnDiv.querySelector('.childrenIcon_button');
						this.animateButtonEnterExit(chldBtn, 'exit');
					break;
					case 'leftArrow':
						const lftBtn = btnDiv.querySelector('.leftArrow_button');
						this.animateButtonEnterExit(lftBtn, 'exit');
					break;
					case 'rightArrow':
						const rghtBtn = btnDiv.querySelector('.rightArrow_button');
						this.animateButtonEnterExit(rghtBtn, 'exit');
					break;
				}
			break;			
			case 'show':	
				switch (icon){
					case 'sibling':
						const sibBtn = btnDiv.querySelector('.siblingIcon_button');
						this.animateButtonEnterExit(sibBtn, 'enter');
					break;
					case 'children':
						const chldBtn = btnDiv.querySelector('.childrenIcon_button');
						this.animateButtonEnterExit(chldBtn, 'enter');
					break;
					case 'leftArrow':
						const lftBtn = btnDiv.querySelector('.leftArrow_button');
						this.animateButtonEnterExit(lftBtn, 'enter');
					break;
					case 'rightArrow':
						const rghtBtn = btnDiv.querySelector('.rightArrow_button');
						this.animateButtonEnterExit(rghtBtn, 'enter');
					break;
				}
			break;
		}		
	}
	
	animateButtonDivEnterExit(div, enterExit){
		switch (enterExit){
			case 'enter':
				div.classList.add("vivify");
				div.classList.add("duration-1500");
				div.classList.add("driveInBottom");
				setTimeout(()=>{
					div.style.opacity = 1;
				}, 800);
				setTimeout(()=>{
					div.classList.remove("vivify");
					div.classList.remove("duration-1500");
					div.classList.remove("driveInBottom");
				}, 1000);			
			break;
			case 'exit':
				div.classList.add("vivify");
				div.classList.add("duration-1500");
				div.classList.add("driveOutBottom");
				setTimeout(()=>{
					div.style.opacity = 0;
				}, 800);
				setTimeout(()=>{
					div.classList.remove("vivify");
					div.classList.remove("duration-1500");
					div.classList.remove("driveOutBottom");
				}, 1000);
			break;
		}
	}
	
	animateButtonEnterExit(btn, enterExit){
		switch (enterExit){
			case 'enter':
				if (btn.style.opacity == 0){
					btn.classList.add("vivify");
					btn.classList.add("duration-1000");
					btn.classList.add("flipInX");
					setTimeout(()=>{
						btn.style.opacity = 1;
					}, 400);
					setTimeout(()=>{
						btn.classList.remove("vivify");
						btn.classList.remove("duration-1000");
						btn.classList.remove("flipInX");
					}, 1000);
				}
			break;
			case 'exit':
				if (btn.style.opacity == 1){
					btn.classList.add("vivify");
					btn.classList.add("duration-1000");
					btn.classList.add("flipOutX");
					setTimeout(()=>{
						btn.style.opacity = 0;
					}, 800);
					setTimeout(()=>{
						btn.classList.remove("vivify");
						btn.classList.remove("duration-1000");
						btn.classList.remove("flipOutX");
					}, 1000);
				}
			break;
		}
	}
	
	linkingTreeIcons(){
		//add click events
		this.treeBtns = {
			'leftArrow': this.svgDiv.querySelectorAll(".leftArrow_button"),
			'rightArrow': this.svgDiv.querySelectorAll(".rightArrow_button"),
			'siblings': this.svgDiv.querySelectorAll(".siblingIcon_button"),
			'children': this.svgDiv.querySelectorAll(".childrenIcon_button")
		};
		
		const famIcon_button = this.svgDiv.querySelectorAll(".famIcon");
		const arrowBtn_button = this.svgDiv.querySelectorAll(".arrowBtn");	
		const zoomBtn_button = this.svgDiv.querySelectorAll(".zoomBtn");
		
		for (const btn of famIcon_button){
			btn.addEventListener("click", (evnt) => treeChangeView(evnt, 'famView'));
		}		
		for (const btn of arrowBtn_button){
			btn.addEventListener("click", (evnt) => treeChangeView(evnt, 'arrows'));
		}
		for (const btn of zoomBtn_button){	
			btn.addEventListener("click", (evnt) => treeChangeView(evnt, 'zoom'));	
		}
	}
	
	initialiseNodes(personTag, famName, reinit = false) {
		this.showHideButtons('showAll');
		this.firstFocus = new node(this.svgElem, 'focus').initialise(personTag, famName);
		
		if (reinit == "lineShift") {	
			//group to enter
			const allNodesGrp = this.groupNodeContainers('group');
			const lineGrp = this.svgElem.querySelector(".mainLine_GRP");	
			
			NODEdetails.nodeList.nodeC.nodeGrpContainer.style.opacity = 0;
			
			this.animateGrpEnterExit(lineGrp, 'enter');
			this.animateGrpEnterExit(allNodesGrp, 'enter');
			
			setTimeout(()=>{
				NODEdetails.nodeList.nodeC.nodeGrpContainer.style.opacity = 1;
				this.groupNodeContainers('ungroup');
			}, 1500);
			
		} else {
			this.animateGrpEnterExit(this.svgElem, 'enter');
		}		
		
	}
	
	reInitialiseNodes(personTag, famName, lineShift = false) {
		switch (lineShift){
			case true:				
				NODEdetails.initialiseNodeLetters();
				this.initialiseNodes(personTag, famName, 'lineShift');
				
			break;				
			case false:
				this.animateGrpEnterExit(this.svgElem, 'exit');		
				
				NODEdetails.initialiseNodeLetters();
				setTimeout(()=> {
					//clearNodes;
					const allContainers = this.svgElem.querySelectorAll(".nodeGrpContainer");
					for (const container of allContainers){
						container.remove();
					}
					
					this.initialiseNodes(personTag, famName, true);
				}, 2000);
			break;		
		}
		
		
	}
	
	groupNodeContainers(type, exception = false){
		switch (type){
			case 'group':
				//group to enter
				const allNodesGrp = new createNewElement('g', {
					'class': 'allNodesGrp',
				});
				this.svgElem.appendChild(allNodesGrp);
				const nodesArray = this.svgElem.querySelectorAll(".nodeGrpContainer");
				const lineGrp = this.svgElem.querySelector(".mainLine_GRP");
		
				for (const node of nodesArray){
					if (node != exception){
						allNodesGrp.appendChild(node);
					}
				}
				$(this.svgElem).prepend(lineGrp);	
				return allNodesGrp;
				
			break;
			case 'ungroup':
				const grpToDisband = this.svgElem.querySelector(".allNodesGrp");
				for (const cntr of grpToDisband.querySelectorAll(".nodeGrpContainer")){
					this.svgElem.appendChild(cntr);
				}
				grpToDisband.remove();
			break;
			case 'delete':
				this.svgElem.querySelector(".allNodesGrp").remove();
			break;
		}
	}
	
	animateGrpEnterExit(grp, enterExit){
		switch (enterExit){
			case 'enter':
				grp.classList.add("vivify");
				grp.classList.add("duration-1500");
				grp.classList.add("popInBottom");
				setTimeout(()=>{
					grp.style.opacity = 1;
				}, 800);
				setTimeout(()=>{
					grp.classList.remove("vivify");
					grp.classList.remove("duration-1500");
					grp.classList.remove("popInBottom");
				}, 1500);
			break;
			case 'exit':
				grp.classList.add("vivify");
				grp.classList.add("duration-1500");
				grp.classList.add("popOutBottom");
				setTimeout(()=>{
					grp.style.opacity = 0;
				}, 800);
				setTimeout(()=>{
					grp.classList.remove("vivify");
					grp.classList.remove("duration-1500");
					grp.classList.remove("popOutBottom");
				}, 1500);
			break;
			
		}			
	}
	
	animateMainLineShift(dummyContainer, personTag, famName){	
		this.showHideButtons('hideAll');	
		//grp all node grps except this one
		const allNodesGrp_start = this.groupNodeContainers('group', dummyContainer);
		const lineGrp = this.svgElem.querySelector(".mainLine_GRP");
		
		//exit all 
		this.animateGrpEnterExit(allNodesGrp_start, 'exit');
		this.animateGrpEnterExit(lineGrp, 'exit');		
		
		//when exited, delete nodes and recreate
		setTimeout(()=>{
			this.groupNodeContainers('delete');		
			this.showHideButtons('showAll');	
			tree.reInitialiseNodes(personTag, famName, true);
			
			setTimeout(()=>{
				dummyContainer.remove();
			}, 1500);
		}, 2000);		
	}

}

const tree = new treeSVG();

function createLeafSVG(type) {
	const infoDiv = (type == 'tree') ?  document.getElementById("infoDivTree") : document.getElementById("infoDiv");
	const leafSVG = (type == 'tree') ? document.getElementById("leafSVGTree") : document.getElementById("leafSVGInfo");
	
	
	const leafPaths = getLeafPathData();
	const fillColour = '#EFE9AE';
	
	const defs = new createNewElement('defs', {
		'class': type + '_clipPaths',
	});
	const topClip = new createNewElement('clipPath', {
		'id': type + '_topLeaf_clipPath',
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


var changingTreeView = false;

function treeChangeView(event, type){
	//changing to sibling/child/ normal view
	if (!changingTreeView){
		changingTreeView = true;
		var btn = event.target;
		if ((btn.tagName == "DIV") || (btn.tagName == "I")){
			btn = $(btn).parents("button")[0];
		}
		
		switch (type){
			case 'famView':
				const whichFamType = (btn.classList.contains("siblingIcon_button")) ? 'sibling' 
					: (btn.classList.contains("childrenIcon_button")) ? 'children' : 'tree';
				treeChange_famView(btn, whichFamType);
			break;
			case 'arrows':
				const whichArrow = (btn.classList.contains("leftArrow_button")) ? 'left' : 'right';
				treeChange_focusArrows(btn, whichArrow);
			break;
			case 'zoom':
				const whichZoom = (btn.classList.contains("zoomMinus")) ? 'minus' : 'plus';
				treeChange_zoom(btn, whichZoom);
			break;
			case 'treeNode':
				if (btn.tagName == "circle") {
					btn = btn.parentElement;
				}
				const nodeLetter = btn.id.replace("_circleGrp", "");
				
				const nodeObj = NODEdetails.nodeList[nodeLetter];
				if (nodeObj.tagType != 'focus'){
					treeChange_shift(nodeObj);
				} else {
					//console.log("Focus clicked");
				}
			break;
		}
		setTimeout(()=> {changingTreeView = false;}, 2500);
	}
}

function treeChange_famView(btn, which){	
	const svgDiv = document.getElementById("svgDiv");
	
	console.log(which);
	
	
} 

function treeChange_shift(nodeObj){
	//direction right => nodes moving left
	const direction = ( (nodeObj.tagType == 'focusParent') || (nodeObj.tagType == 'focusParentS') ) ? 'right' : (nodeObj.tagType == 'focusChild') ? 'left' : '';
	
	nodeObj.nodeShift(direction, nodeObj.tagType);
}

function treeChange_focusPerson(personTag, famName){
	//from person click
	const personData = PEOPLERELATIONS[famName][personTag];
	NODEdetails.updateFocus({'personTag': personTag, 'famName':famName});	

	//if first click, initialise
	if (!svgDiv.querySelector(".nodeCircleGrp")){		
		tree.initialiseNodes(personTag, famName);
	} else {
		const isPersonAdjacent = NODEdetails.isPersonAdjacent(personTag);
		
		switch (isPersonAdjacent){
			case 'parent':
				const parentNodeObj = NODEdetails.getNodeObj('focusParent');
				parentNodeObj.nodeShift('right', parentNodeObj.tagType);
			break;
			case 'child':
				const childNodeObj = NODEdetails.getNodeObj('focusChild');
				childNodeObj.nodeShift('left', childNodeObj.tagType);
			break;
			case'parentS':
				const parentSnodeObj = NODEdetails.getNodeObj('focusParentS');
				//parentSnodeObj.nodeShift(direction, parentSnodeObj.tagType);
			break;
			default: 
				tree.reInitialiseNodes(personTag, famName);	
			break;
		}
		// if node != parent or child
	}	
}

function treeChange_focusArrows(btn, arrow){
	//from arrows	
	const shiftTag = (arrow == 'left') ? 'focusChild' : 'focusParent';
	const shiftObjLetter = NODEdetails.nodeLetterTags[shiftTag];
	const nodeObj = NODEdetails.nodeList[shiftObjLetter];
	nodeObj.nodeShift(arrow, shiftTag);
}

/*function treeChange_zoom(thisZoomBtn, which){
	const svgDiv = document.getElementById("svgDiv");	
	const otherZoomBtn = (which == "minus") ? svgDiv.querySelector(".zoomPlus") : svgDiv.querySelector(".zoomMinus");
	
	toggleZoomIcon();
	//do zoom
	switch (which){
		case 'minus': 
			treeZoomOut();
		break;
		case 'plus':
			treeZoomIn();
		break;
	}
	
	function toggleZoomIcon(){
		thisZoomBtn.classList.toggle("btnPulse");
		setTimeout(() => {
			$(thisZoomBtn).slideToggle(400, 'swing', function(){
				$(otherZoomBtn).slideToggle(500, 'swing', function(){
					otherZoomBtn.classList.toggle("btnPulse");
				}, 1000);
			}, 1000);
		}, 10);		
	}
	
	function treeZoomOut(){
		
	}
	function treeZoomIn(){
		
	}
	
}
*/



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

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function FAiconFail(){
	//if script get font awesome fails, replace with png?
	console.log("Replace Icons...");
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
	//icon error case
    /*$(".backup_picture").on("error", function(){
        $(this).attr('src', './images/nopicture.png');
    });*/

	
	//tree
	tree.createSVG();

	//peopleTab
	const peopleDropdowns = document.querySelectorAll('.ppl_dropdownBtn');
	for (const drop of peopleDropdowns) {
		drop.addEventListener("click", (evnt) => peopleDropdownDo(evnt));	
	}
	document.addEventListener("click", (evnt) => outsidePeopleDiv_clickDetect(evnt));
	
	//infoDiv
	createInfoDivs('tree');	createInfoDivs('info');
	addPeopleToList();
	interchangeTreeInfo_Tabs();
	
	
	
});
/* ------------------------------------------------ */