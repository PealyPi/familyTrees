/* ============================================================ */
/* ===                    Custom Scripts                    === */
/* ============================================================ */
/* preload info /relations data */
var PEOPLEINFO = personInfoStorage();
var PEOPLERELATIONS = generateRelationsData(nodeDataStorage());
var PEOPLETAGfromNAME = storePeopleTagNames('tagFromName', PEOPLEINFO, PEOPLERELATIONS);
var PEOPLENAMEfromTAG = storePeopleTagNames('nameFromTag', PEOPLEINFO, PEOPLERELATIONS);
var PEOPLEIMGs = pplImageLinks();
//console.log(PEOPLERELATIONS.kesby);


function generateRelationsData(data) {
	
	var finalData = {'kesby': {}, 'hadkiss': {}, 'peal': {}, 'mckenzie': {}};
	let rootPeople = {'kesby': 'roseHadkiss', 'hadkiss': 'ronaldHadkiss', 'peal': '', 'mckenzie': ''};
	
	for (let fam in data){
		if (fam == 'kesby'){
		//get first of obj
		let rootPerson = rootPeople[fam];
		let rootData = data[fam][rootPerson];
		finalData[fam][rootPerson] = rootData;
		
		let keyChecks = (rootData.isRoot) ? (rootData.isMainLine) ? true : false : false;
		if (!keyChecks){
			console.log("Error: root person " + rootPerson + " has incorrect initial keys");
			
		} else {			
			generateParent(fam, rootPerson, rootData.parentMain, true);
			generateParent(fam, rootPerson, rootData.parentSpouse, false);
			generateSiblings(fam, rootPerson);
		}
		}
	}
	
	//change when hadkiss added
	finalData.hadkiss = nodeDataStorage().hadkiss;
	
	return finalData;
	
	function generateSiblings(fam, thisTag){
		var finalSiblingObj = {};
		let thisData = finalData[fam][thisTag];
		let siblingList = thisData.siblings ?? [];
		
		let newSiblingObj;
		if (siblingList != 0){
			//console.log((siblingList == 0) + " <=>" + (siblingList.length == 0));
			let thisSubFamily = finalData[fam][thisTag].familyName;
			let siblingObj = {
				'isMainLine':	false,
				'mainFamily':	fam,
				'familyName':	thisSubFamily,
				'siblingMain': 	thisTag
			};		
			
			let test = finalData.kesby.johnBobby ?? null;
			
			for (let sibling of siblingList){
				finalData[fam][sibling] = Object.assign({}, finalData[fam][sibling] ?? {}, siblingObj);				
				
			}
		}
		
		
		
	}
	
	function generateHalfSiblings(fam, subFamilyName, thisTag){
		let thisData = finalData[fam][thisTag];
		let halfSiblingList = thisData['half-siblings'];
		//check thisTags parents
		
		let thisParentMainTag = thisData.parentMain;
		let thisParentSpouseTag = thisData.parentSpouse;
		
		var halfSib_parentMain, halfSib_parentSpouse;
		for (let checkParent of [thisParentMainTag, thisParentSpouseTag]){
			let thisParentData = finalData[fam][checkParent];
			
			if (thisParentData.hasOwnProperty("otherSpouse")){
				halfSib_parentMain = checkParent;
				halfSib_parentSpouse = thisParentData.otherSpouse;	

				//add other spouse data
				generateOtherSpouse(fam, subFamilyName, halfSib_parentSpouse, halfSib_parentMain);
			}			
		}
		
		let halfSiblingObj = {
			'isMainLine':	false,
			'mainFamily':	fam,
			'familyName':	subFamilyName,
			'siblingMain': 	thisTag,
			'parentMain':	halfSib_parentMain,
			'parentSpouse':	halfSib_parentSpouse,
		};		
		
		for (let halfSibling of halfSiblingList){
			finalData[fam][halfSibling] = Object.assign({}, finalData[fam][halfSibling] ?? {}, halfSiblingObj);				
			
			let parentMainData = finalData[fam][halfSib_parentMain];
			let parentSpouseData = finalData[fam][halfSib_parentSpouse];
			
			if (!parentMainData)
				parentMainData = {'otherChildren': [halfSibling]};
			else {				
				if (parentMainData.hasOwnProperty("otherChildren"))
					parentMainData.otherChildren.push(halfSibling);
				else 
					parentMainData.otherChildren = [halfSibling];
			}
			
			if (!parentSpouseData)
				parentSpouseData = {'children': [halfSibling]};
			else {				
				if (parentSpouseData.hasOwnProperty("otherChildren"))
					parentSpouseData.otherChildren.push(halfSibling);
				else 
					parentSpouseData.otherChildren = [halfSibling];
			}
		}
		
		
	}
	
	function generateOtherSpouse(fam, subFamName, thisTag, mainSpouseTag){
		let otherSpouseObj = {
			'isMainLine':	false,
			'mainFamily':	fam,
			'familyName':	subFamName,
			'spouseMain': 	mainSpouseTag,
		};		
		finalData[fam][thisTag] = Object.assign({}, finalData[fam][thisTag], otherSpouseObj);
		//console.log("thisTag: " + thisTag + ", mainSpouseTag: " + mainSpouseTag + ", mainSpouse Main Bool: " + finalData[fam][mainSpouseTag].isMainLine);
	}
	
	function generateParent(fam, childTag, parentTag, parentMain = false){
		let childData = finalData[fam][childTag];
		let thisData = data[fam][parentTag];
		
		let subFamilyName = (parentMain) ? childData.familyName : thisData.familyName;
		let spouseTag = (parentMain) ? childData.parentSpouse : childData.parentMain;
		
		let childSiblings = childData.siblings ?? [];
		var childrenArray = [childTag].concat(childSiblings);
		
		//console.log("parent: " + parentTag + ", child: " + childTag);
		//console.log("create Siblings: " + childSiblings.join(", "));
		
		let baseObj = {
			'gen':	(childData.gen + 1),
			'isMainLine': 	true,
			'isMainParent': parentMain,
			'mainFamily':	fam,
			'familyName': 	subFamilyName,
			'spouse': 		spouseTag,
			'childMain':	childTag,
			'children':		childrenArray
		}
		let newThisObj = Object.assign({}, thisData, baseObj);
		finalData[fam][parentTag] = newThisObj;
		//console.log(parentTag);		console.log("gen" + newThisObj.gen); 
		//console.log( newThisObj.isMainLine);
		
		if (thisData.parentMain)
			generateParent(fam, parentTag, thisData.parentMain, true);
		if (thisData.parentSpouse)
			generateParent(fam, parentTag, thisData.parentSpouse, false);
		if (thisData.siblings)
			generateSiblings(fam, parentTag);
		if (thisData['half-siblings'])
			generateHalfSiblings(fam, subFamilyName, parentTag);
		if (thisData.otherSpouse)
			generateOtherSpouse(fam, subFamilyName, thisData.otherSpouse, parentTag);
			
	}
}

function storePeopleTagNames(type, infoData, relationsData){
	var nameFromTagObj = {}, tagFromNameObj = {};
	const famKeys = Object.keys(infoData);
	
	for (const fam of famKeys){
		const famData = infoData[fam];
		const eachFamKeys = Object.keys(famData);	
		
		eachFamKeys.forEach(function( personTag, i ) {
			const personData = relationsData[fam][personTag];
			const LIpersonName = famData[personTag].LI_name ?? famData[personTag].name;	

			nameFromTagObj[personTag] = LIpersonName;
			tagFromNameObj[LIpersonName] = personTag;
		});
	}	
	
	if (type == "tagFromName")
		return tagFromNameObj;
	else if (type == "nameFromTag")
		return nameFromTagObj;
}

checkDataMatches(PEOPLEINFO, PEOPLERELATIONS);
function checkDataMatches(infoData, relationsData){
	for (let fam in infoData){
		let infoKeys = Object.keys(infoData[fam]);
		let relKeys = Object.keys(relationsData[fam]);	
		
		let infoSorted = infoKeys.sort();
		let relSorted = relKeys.sort();
		
		var isEqual = function (firstArr, secondArr) {
			return firstArr.length === secondArr.length &&
				firstArr.every((value, index) => value === secondArr[index])		
		};		
		
		if ( !isEqual(infoSorted, relSorted) ){
			let unmatched = getArrayDiffs(infoSorted, relSorted);
			console.log("Info/Data People not matched");
			
			let infoNotRelations = unmatched.first.join(", ");
			let relationsNotInfo = unmatched.second.join(", ");
			if (infoNotRelations) console.log("In personInfo, not relationsData: " + infoNotRelations);
			if (relationsNotInfo) console.log("In relationsData, not personInfo: " + relationsNotInfo);
		}		
		
		function getArrayDiffs(firstArr, secondArr){
			var firstNonmatched = [], secondNonmatched = [];
			for (let person of firstArr){
				if (!secondArr.includes(person))
					firstNonmatched.push(person);
			}
			
			for (let person of secondArr){
				if (!firstArr.includes(person))
					secondNonmatched.push(person);
			}
			
			let firstDiffs = [], secondDiffs = [];
			return {'first': firstNonmatched, 'second': secondNonmatched}
		};
		
	}
}


function findPersonsFamily(personName, startFam = false){
	const famOptions = ['kesby', 'hadkiss', 'peal', 'mckenzie'];
	if (startFam){
		famOptions.splice(famOptions.indexOf(startFam), 1);
		famOptions.unshift(startFam);
	}

	var correctFam = '';
	for (fam of famOptions){
		const famBool = PEOPLERELATIONS[fam][personName] ?? false;
		if (famBool){
			correctFam = fam;
			return correctFam;
			break;
		}
	}
	
	if (!correctFam) {
		console.log("Error: person not in data"); 
		return false;
	}
	
}



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


/* ------ sect Objs ------ */

class navBar {
	constructor(){
		this.navDiv = document.querySelector(".top_navbar");
		this.leftNavDiv = document.querySelector(".left_navbar");
		this.homeBtn = this.navDiv.querySelector("#homeTab");
		this.infoBtn = this.navDiv.querySelector("#infoTab");
		this.fullTreeBtn = this.navDiv.querySelector("#fullTreeTab");
		this.treeBtn = this.navDiv.querySelector("#treeTab");
		this.pplBtn = this.navDiv.querySelector("#pplTab");
		
		this.mainDiv = document.getElementById('mainDiv');
		this.svgDiv = document.getElementById('svgDiv');
		this.fullTreeDiv = document.getElementById('fullTreeDiv');
		this.infoDiv = document.getElementById('infoDiv');
		this.imgsDiv = document.getElementById('imgsDiv');
		this.peopleDiv = document.getElementById('peopleDiv');		
		
		this.allNavBtns = this.navDiv.querySelectorAll(".navTab");	
		this.activeBtn = this.leftNavDiv.querySelector(".navTab.active");	
		this.activeDiv = this.leftNavDiv.querySelector(".navTabDiv.active");	
		this.activeColour = this.activeBtn.id + "Colour";
		
		this.isPageTransitioning = false;
		
		this.addClickEVENTs();
	}
	
	addClickEVENTs(){
		//tree&Info btns
		document.getElementById("treeInfoLinkBTN").addEventListener("click", (evnt) => this.navClick_EVENT(evnt, true));
		document.getElementById("infoTreeLinkBTN").addEventListener("click", (evnt) => this.navClick_EVENT(evnt, true));
	
		//nav btns
		for (const tab of this.allNavBtns) {
			tab.addEventListener("click", (evnt) => {this.navClick_EVENT(evnt)});	
		}
	}
	
	navClick_EVENT(event, link=false){
		var btn = event.target;
		const btnID = btn.id ?? '';		
		
		if (!this.isPageTransitioning){
			this.isPageTransitioning = true;
			
			if (link){
				btn = (btnID == 'infoTreeLinkBTN') ? this.treeBtn : 
					(btnID == 'treeInfoLinkBTN') ? this.infoBtn : btn;
			}
			
			this.openPage(btn);
			if (btnID =='pplTab'){
				setTimeout(()=> {
					this.isPageTransitioning = false;	
				}, 500);	
				
			} else {
				setTimeout(()=> {
					this.isPageTransitioning = false;	
				}, 3000);	
			}
		}
	}
	
	openPage(btn){				
		this.peachTree = document.querySelector('.peachyTree');	

		const newActive = btn;	const newActiveID = btn.id;			
		const newActiveDiv = document.getElementById(newActiveID + '_div');
		const newTabColor = newActiveID + "Colour";	
		
		if ( btn == this.pplBtn){
			if (this.pplBtn.classList.contains("active"))
				pplTab.focusSearchbox('blur');
			else 
				pplTab.focusSearchbox('focus');
			
			this.peopleDiv.classList.toggle("sliding");
			newActive.classList.toggle("active");
			
		} else if (btn != this.activeBtn){//if already activated, ignore	
			
			this.activeBtn.classList.remove("active");
			this.activeDiv.classList.remove("active");
			this.navDiv.classList.remove(this.activeColour);		
			
			newActive.classList.add("active");
			newActiveDiv.classList.add("active");
			this.navDiv.classList.add(newTabColor);	
			
			this.activeBtn = newActive;
			this.activeDiv = newActiveDiv;
			
			//hide all when maskTransition
			const maskTransitionSection = document.querySelector(".maskTransitionSection");
			const transitionMasks = document.querySelectorAll(".transitionMask");
			
			for (const mask of transitionMasks) {
				mask.classList.toggle("activeTransition");
			}
			
			pplTab.focusSearchbox('blur');
			
			const famViewBool = (document.getElementById("famViewSVG").children.length == 0) ? false : true;
			
			treeInfoTab.startStopImgSlideshow('stop');
			infoTab.startStopImgSlideshow('stop');
			
			if (imgGalleryObj.isOpen){
				imgGalleryObj.closeGallery();
			}
			
			//hide all				
			switch (newActiveID){
				case 'homeTab':		
					this.hideAllSects('');
				break;
				case 'treeTab':		
					this.hideAllSects(this.svgDiv);
					this.showSect(this.svgDiv);
					if ((!famViewBool) && (NODEdetails.currentFocus != '')){
						treeChange.newFocus(NODEdetails.currentFocus.personTag, NODEdetails.currentFocus.famName, true);
					}
					
					//start img slideshow
					treeInfoTab.startStopImgSlideshow('start');
				break;
				case 'fullTreeTab':		
					this.hideAllSects(this.fullTreeDiv);
					this.showSect(this.fullTreeDiv);					
					
				break;
				case 'infoTab':	
					this.hideAllSects(this.infoDiv);
					this.showSect(this.infoDiv);
					
					infoTab.startStopImgSlideshow('start');		
				break;
				case 'imgsTab':
					this.hideAllSects(this.imgsDiv);
					this.showSect(this.imgsDiv);
					if (!imgOpenTab.imgOpen){
						setTimeout(function(){imgGalleryObj.openGallery();}, 2000);
					}
				break;
				
			}
		}		
	}
	
	hideAllSects (active){
		const pageSections = document.querySelectorAll(".pageSection");
		var allHideSects = [];	
		for (const sect of pageSections){
			const sectID = sect.id;
			if (sectID != active.id)
				allHideSects.push(sect);				
		}
		
		for (const sect of allHideSects) {
			setTimeout(()=> {
				$(sect).fadeOut(1000, function(){ 		
					sect.style.opacity = 1;				
				});				
				this.peachTree.style.opacity = 1;	
			}, 800);	
			setTimeout(()=> {
				sect.style.display = 'none';	
			}, 3000);	
		};				
	}
	
	showSect (active){
		active.style.opacity = 0;
		active.style.display = 'block';
		setTimeout(()=> {
			$(active).fadeIn(1000, function(){ 		
				active.style.opacity = 1;
			});
			if ((active == imgsDiv) || (active == this.infoDiv)){
				this.peachTree.style.opacity = 0.4;
			}					
		}, 1000);
	}
	
}

class peopleTab {
	constructor(){
		this.peopleDiv = document.getElementById('peopleDiv');
		this.pplTab = document.getElementById('pplTab');
		this.pplList = this.peopleDiv.querySelector("#peopleList");
		this.allDropDivs = this.pplList.querySelector('.ppl_dropdownContainer');
		
		this.fillDropdowns();
		this.addClickEVENTs();		
		
		this.isInfoChanging = false;
	}
	
	fillDropdowns(){
		const famData = PEOPLEINFO;
		const famKeys = Object.keys(famData);	
		
		for (const fam of famKeys){
			const famData = PEOPLEINFO[fam];
			const eachFamKeys = Object.keys(famData);	
			let famDropDiv = this.pplList.querySelector("#" + fam + "DropdownDiv");
			let nonMainDropDiv = this.pplList.querySelector("#nonMainDropdownDiv");
			
			eachFamKeys.forEach(function( personTag, i ) {
				const personData = PEOPLERELATIONS[fam][personTag];
				const personName = famData[personTag].LI_name ?? famData[personTag].name;	

			
				const personLI = document.createElement("li");	
				personLI.id = 'li_' + fam + "_" + personTag;	
				personLI.classList.add('pplChooseLI');	
				
				
				const liIcon = document.createElement("i");	
				liIcon.classList.add('fas');
				liIcon.classList.add('fa-chevron-left');
				personLI.appendChild(liIcon);	
				
				const liSpan = document.createElement("span");
				personLI.appendChild(liSpan);
				const liSpanText = document.createTextNode(personName);
				liSpan.appendChild(liSpanText);	
				
				
				if (!personData.isMainLine){
					nonMainDropDiv.appendChild(personLI);
				} else {					
					famDropDiv.appendChild(personLI);
				}
			});
		}
		
		//add click event		
		this.allHeaderDropdowns = this.pplList.querySelectorAll('.ppl_dropdownBtn');
		
	}
	
	addClickEVENTs(){
		document.addEventListener("click", (evnt) => this.detectClick(evnt));
		
		//headerDropdowns
		for (const header of this.allHeaderDropdowns) {
			header.addEventListener("click", (evnt) => this.activateDropdown(evnt));	
		}
		
		//people click
		const peopleChoose = document.querySelectorAll('.pplChooseLI');
		for (const ppl of peopleChoose) {
			ppl.addEventListener("click", (evnt) => this.openPerson(evnt));	
		}
		
		const exitBtn = document.getElementById('peopleDivExit');
		exitBtn.addEventListener("click", (evnt) => this.closeTab());	
		
	}
	
	detectClick(event){
		const clickedElement = event.target;
		
		if ((this.peopleDiv.classList.contains("sliding"))
			&& (clickedElement != this.peopleDiv)
			&& (clickedElement != this.pplTab)			
			&& ($(clickedElement).parents("#peopleDiv").length == 0)	){
			
				this.peopleDiv.classList.toggle("sliding");
				this.pplTab.classList.toggle("active");				
				
				this.focusSearchbox('blur');
		}
	}
	
	activateDropdown(event){
		var btn = event.target;
		if (btn.tagName == "I"){
			btn = btn.parentElement;
		}
		const famName = btn.id.replace("DropdownBtn", "");
		
		const relativeDiv = this.pplList.querySelector("#" + famName + 'DropdownDiv');
		const btnIcon = btn.querySelector("i");
		
		const 	dropdownCaret_down = "fa-caret-down",
				dropdownCaret_up = "fa-caret-up";
		
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
	
	openPerson(event, linked = false){
		var btnLI = event.target;
		
		if (linked){
			const dropLIs = this.peopleDiv.getElementsByTagName('li');
			const personNameWithComma = event.target.innerText;
			const personName = personNameWithComma.replace(",", "");
			
			//console.log(personName);
			for (let i = 0; i < dropLIs.length; i++) {	
				if (dropLIs[i].innerText == personName) {
					btnLI = dropLIs[i];	
				}				
			};
			
		} else {
			if ((btnLI.tagName == "I")||(btnLI.tagName == "SPAN")){
				btnLI = btnLI.parentElement;
			}
		}
		
		if (!this.isInfoChanging){
			this.isInfoChanging = true;
			
			const btnLIid = btnLI.id;
			var famName, personTag;
			if ( (btnLI.tagName == "LI")||(btnLI.tagName == "SPAN") ){
				let relativeSpanArray = btnLIid.split("_");
				famName = relativeSpanArray[1]; 
				personTag = relativeSpanArray[2]; 
				
			}
			
			treeInfoTab.startStopImgSlideshow('stop');
			infoTab.startStopImgSlideshow('stop');
			
			infoTab.fillPersonInfo(famName, personTag);
			treeInfoTab.fillPersonInfo(famName, personTag);
			NODEdetails.updateFocus({'personTag': personTag, 'famName': famName});
			imgGalleryObj.setPerson(personTag);
			
			//if page != info/tree, go to tree...		
			const navDiv = document.querySelector('.top_navbar');		
			const currentActive = navDiv.querySelector('.navTab.active');
			const treeBtn = navDiv.querySelector('#treeTab');
			
			const famViewBool = (document.getElementById("famViewSVG").children.length == 0) ? false : true;
		
			if (famViewBool){
				if ((currentActive.id == "treeTab")){
					tree.famView_backToTree();
					
					treeInfoTab.startStopImgSlideshow('start');
					
				} else if ((currentActive.id == "infoTab")){
					tree.famView_backToTree();	
					treeChange.newFocus(personTag, famName);
					
					infoTab.startStopImgSlideshow('start');
					
				}  else if ((currentActive.id == "imgsTab")){
					imgGalleryObj.openGallery();
				} else {
					tree.famView_backToTree();	
					navObj.openPage(treeBtn);
				}
				
			} else {
				if ((currentActive.id == "treeTab") || (currentActive.id == "infoTab")){
					treeChange.newFocus(personTag, famName);	
					
					if ((currentActive.id == "treeTab"))
						treeInfoTab.startStopImgSlideshow('start');
					else if ((currentActive.id == "infoTab"))
						infoTab.startStopImgSlideshow('start');
					
				}  else if ((currentActive.id == "imgsTab")){
					if (!imgGalleryObj.imageGalleryDIV.classList.contains("galleryOpen")){
						imgGalleryObj.openGallery();
					}
				} else {
					navObj.openPage(treeBtn);					
				}
			}
			

			//close people div	
			const pplDiv = document.getElementById("peopleDiv");
			const pplTab = navDiv.querySelector("#pplTab");
			if (pplDiv.classList.contains("sliding")){
				peopleDiv.classList.toggle("sliding");
				pplTab.classList.toggle("active");	
			}
			
			
			
			setTimeout(()=>{this.isInfoChanging = false;}, 2000);
		}
	}
	
	closeTab(){
		this.peopleDiv.classList.toggle("sliding");
		this.pplTab.classList.toggle("active");
		
		this.focusSearchbox('blur');
	}

	toggleSearchIcon(type) {
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

	focusSearchbox(focusBlur){
		const searchbox = this.peopleDiv.querySelector("#peopleSearching");
		if (focusBlur == 'blur'){
			$(searchbox).blur();
		} else if (focusBlur == 'focus'){
			$(searchbox).focus();
		}
	}

}

class woodInfoTab {
	constructor(type){
		this.type = type;
		this.infoDiv = (type == 'tree') ? 
			document.getElementById('infoDivTree') : 
			document.getElementById('infoDivInfo');
		this.infoDivSec = this.infoDiv.querySelector(".infoDivSec");
		this.infoDivMain = this.infoDivSec.querySelector(".infoMain");		
		
		this.createInfoDivs(type);
		
		this.infoData = this.infoDivSec.querySelectorAll(".infoData");
		
		this._fillingInfo = false;
		
		this.leafObj = new leafImgs(type);
	}
	
	createInfoDivs(type){	
		const navDiv = navObj.navDiv;
		const activeTabBtn = navObj.activeBtn;
		const treeTabBtn = navObj.treeBtn;		
		
		this.divExtended = document.createElement("div");
		const divExtended = this.divExtended;
		
		divExtended.classList.add('infoMain_extended');
		this.infoDivSec.appendChild(divExtended);
		
		
		//main
		const containerDiv = document.createElement("div");
		this.containerDiv = containerDiv;
		containerDiv.classList.add('mainContainerDiv');
		this.infoDivMain.appendChild(containerDiv);
		
		const nameDiv = document.createElement("div");
		this.nameDiv = nameDiv;
		nameDiv.classList.add('infoData');
		nameDiv.classList.add('info_name');
		containerDiv.appendChild(nameDiv);			
		
			const nameSpan = document.createElement("span");	
			const nameSpanText = document.createTextNode(' ');
			nameDiv.appendChild(nameSpan);
			nameSpan.appendChild(nameSpanText);
		
		const datesDiv = document.createElement("div");
		this.datesDiv = datesDiv;
		datesDiv.classList.add('infoData');
		datesDiv.classList.add('info_dates');
		containerDiv.appendChild(datesDiv);
		
		const genDiv = document.createElement("div");
		this.genDiv = genDiv;
		genDiv.classList.add('infoData');
		genDiv.classList.add('aboutBold');
		genDiv.classList.add('info_gen');
		containerDiv.appendChild(genDiv);
		
		const bornNameDiv  = document.createElement("div");
		this.bornNameDiv = bornNameDiv;
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
		this.siblingDiv = siblingDiv;
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
		this.childrenDiv = childrenDiv;
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
		this.infoAboutDiv = infoAboutDiv;
		infoAboutDiv.classList.add('infoAboutSect');
		divExtended.appendChild(infoAboutDiv);
		
		this.createInfoTable(divExtended);
		
	}
	
	createInfoTable() {
		this.aboutTable = document.createElement("table");
		
		var aboutTable = this.aboutTable;
		aboutTable.classList.add('infoAboutTable');
		this.infoAboutDiv.appendChild(aboutTable);
		
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
		head_marriedCell.classList.add('aboutBold');		
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
	
	fillPersonInfo(famName, personName) {	
		this.famInfo = PEOPLEINFO[famName] ?? {};
		this.personInfo = this.famInfo[personName] ?? {};
		this.personRelationsData = PEOPLERELATIONS[famName][personName] ?? {};		
		
		const infoDivMain = this.infoDivMain;
		this.nameDiv = infoDivMain.querySelector(".info_name");
		this.datesDiv = infoDivMain.querySelector(".info_dates");
		this.genDiv = infoDivMain.querySelector(".info_gen");
		
		const leafSVG = this.leafObj.leafSVG;	
		const thisType = this.type;
		const thisObj = this;
		
		if (!this._fillingInfo){
			this._fillingInfo = true;
			
			if (personName == '')
				this.clearInfo();	
				
			else {		
				if (this.containerDiv.style.display == "block"){
					if (leafSVG.style.display != "none"){
						$(leafSVG).fadeOut(1000);
					}
					$([this.containerDiv, this.infoAboutDiv]).fadeOut(1000, function(){
						thisObj.clearInfo();
						thisObj.fillInfo(famName, personName);							
					});	
					
					setTimeout(() => {
						this.extendDivAndShow(this.personInfo.hasOwnProperty('about'), this.personInfo.about ?? '')
					}, 1200);	
				} else {
					//first fill		
					this.clearInfo();
					thisObj.fillInfo(famName, personName);	
					this.extendDivAndShow(this.personInfo.hasOwnProperty('about'), this.personInfo.about ?? '');
					
					if (this.type == "info"){
						$(this.infoDiv.querySelector("#infoTreeLinkBTN")).fadeIn(500);
					} else {
						$(this.infoDiv.querySelector("#treeInfoLinkBTN")).fadeIn(500);
					}
				}		
			}
			
			setTimeout(()=>{
				this._fillingInfo = false
			}, 2300);
		}
	}
	
	fillInfo(famName, personName){	
		//create and set name, dates
			//name length - reduce size
		let displayName = this.personInfo.name;
		
		const nameSpan = this.nameDiv.childNodes[0];
		const nameText = document.createTextNode(displayName);
		nameSpan.appendChild(nameText);
		
		if (displayName.length > 15){	
			nameSpan.classList.add('nameSmallerSizing');
		} 
		
		
		
		const datesText = document.createTextNode(this.personInfo.dates);
		this.datesDiv.appendChild(datesText);
		
		const genText = document.createTextNode("Gen " + this.personRelationsData.gen);
		if (this.personRelationsData.gen !== undefined)
			this.genDiv.appendChild(genText);
		
		
		//info dependent
		const bornNameDiv = this.infoDivMain.querySelector(".info_neeName");
	
		if (this.personInfo.hasOwnProperty('bornName')){
			const nameText = document.createTextNode(this.personInfo.bornName);
			bornNameDiv.appendChild(nameText);
			
			bornNameDiv.style.display = "block";
			
		} else {
			bornNameDiv.style.display = "none";			
		}
		
		
		//lists
		const infoVariables = { 
			'siblings': this.infoDivMain.querySelector(".info_siblings"), 
			'children': this.infoDivMain.querySelector(".info_children")
		};
		
		const infoVariablesKeys = Object.keys(infoVariables);
		infoVariablesKeys.forEach((infoVar)=>{
			if (this.personRelationsData.hasOwnProperty(infoVar)){
			
				const relativesList = this.personRelationsData[infoVar];
				
				var maxStrLength;
				if (window.innerWidth > 900){
					maxStrLength = (relativesList.length > 8) 
					? 80 : 50;		
				} /*else if (window.innerWidth > 650){
					maxStrLength = (relativesList.length > 8) 
					? 50 : 30;		
				} */else {
					maxStrLength = (relativesList.length > 8) 
					? 55 : 50;		
				}	
				
				//store spans in array to access if linecount > 1
				let currentDiv = infoVariables[infoVar] //eg info_siblings
				let sectTitle = currentDiv.querySelector("span.aboutBold");
				var firstLine_spanStore = [];
				var all_spanStore = [];
				
				var relativeNamesListStr = ''; var relativeLinesCount = 0;
				relativesList.forEach((relative)=>{		
					const relativeName = this.famInfo[relative].name;
					
					const varSpan = document.createElement('span');
					varSpan.classList.add('personLink');
					varSpan.setAttribute("id", "relative_" + famName + "_" + relative);
					const varText = document.createTextNode(relativeName + ", ");
					
					if (relativeLinesCount == 0)
						firstLine_spanStore.push(varSpan);
					
					all_spanStore.push(varSpan);
					
					//check current line # characters - new line if at max
					relativeNamesListStr += (relativeName + ", ");
					const stringLength = relativeNamesListStr.length;
					if (relativeNamesListStr.length > maxStrLength){
						
						relativeLinesCount += 1;
						relativeNamesListStr = '';
						const lineBreak = document.createElement('br');
						infoVariables[infoVar].appendChild(lineBreak);			
					} 
					
					infoVariables[infoVar].appendChild(varSpan);
					varSpan.appendChild(varText);
					
					//add click function
					varSpan.addEventListener("click", (evnt) => pplTab.openPerson(evnt, true));
				});
				
				//reduce lineheight if multiple lines
				if (relativeLinesCount > 0){
					sectTitle.classList.add('infoLineA');
					for (let firstLineSpan of firstLine_spanStore){
						firstLineSpan.classList.add('infoLineA');
					}
					if (relativeLinesCount > 2){
						for (let spanName of all_spanStore){
							spanName.classList.add('manyRelatives');
						}
					}
				}
				
				//const relativeNamesStr = relativeNamesList.join(", ");
				infoVariables[infoVar].style.display = "block";
				
			} else {
				infoVariables[infoVar].style.display = "none";					
			}
		});
		
		if (PEOPLEIMGs.hasOwnProperty(personName)){
			if (PEOPLEIMGs[personName].length > 0){
				this.leafObj.setLeafImages(famName, personName);	
			}				
		} else { 			
			$(this.leafObj.leafSVG).fadeIn(1000);
		}
		
	}
	
	fillInExtendedTable(personAbout){
		for (const aboutKey in personAbout){
			const dataClass = aboutKey + "Val";
			const relatedDiv = this.divExtended.querySelector('.' + dataClass);		

			if (aboutKey == "marriedTo"){
				let spouseTag = personAbout[aboutKey];	
				let spouseFam = findPersonsFamily(spouseTag);				
				let spouseInfo = PEOPLEINFO[spouseFam][spouseTag] ?? {};		
				let spouseName = spouseInfo.name
				
				const marriedToSpan = document.createElement('span');
				marriedToSpan.classList.add('personLink');
				marriedToSpan.setAttribute("id", "relative_" + spouseFam + "_" + spouseTag);
				const marriedToText = document.createTextNode(spouseName);
				marriedToSpan.appendChild(marriedToText);
				relatedDiv.appendChild(marriedToSpan);

				//add click function
				marriedToSpan.classList.add('personLink');
				marriedToSpan.addEventListener("click", (evnt) => pplTab.openPerson(evnt, true));

			} else {
				relatedDiv.innerHTML = personAbout[aboutKey];				
			}			
		}
	}
	
	extendDivAndShow (bool, about = false){
		switch (bool){
			case true:
				this.fillInExtendedTable(about);
				$(this.divExtended).fadeIn(1000);		
				$([this.containerDiv, this.infoAboutDiv]).fadeIn(700);
			break;
			
			case false:
				$(this.divExtended).fadeOut(500);	
				setTimeout(()=>{
					$([this.containerDiv, this.infoAboutDiv]).fadeIn(700);
				}, 100);				
			break;
		}
		
	}
	
	clearInfo () {		
		for (const slot of this.infoData){
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
				if (slot.classList.contains("info_name")){		
					if (childNode.classList.contains('nameSmallerSizing'))
						childNode.classList.remove('nameSmallerSizing');
					childNode.innerHTML = ' ';
				} else {			
					slot.innerHTML = '';		
					if (!slot.classList.contains("marriedToVal")){	
						slot.appendChild(childNode);									
					}
				}
				
			} else {
				//console.log(slot);	
				slot.innerHTML = '';	
			}
		}
		
		this.leafObj.clearLeafImages();
	}
	
	startStopImgSlideshow(startStop){
		if (startStop == 'start'){
			if (this.leafObj.imgCount > 0)
				this.leafObj.leafImgSlides('start');
			
		} else if (startStop == 'stop'){
			if (this.leafObj.leafImgSlideshow != null)
				this.leafObj.leafImgSlides('stop');
		}		
		
	}
}

class leafImgs {
	constructor(type){
		this.type = type;
		this.infoDiv = (type == 'tree') ? 
			document.getElementById('infoDivTree') : 
			document.getElementById('infoDivInfo');
		
		this.imageObjsArray = [];
		this.leafImgSlideshow = null;
		
		this.createLeafSVG();
	}
	
	createLeafSVG() {
		const leafSVG = (this.type == 'tree') ? 
			document.getElementById("leafSVGTree") : 
			document.getElementById("leafSVGInfo");
		
		this.leafSVG = leafSVG;
		
		const leafPaths = getLeafPathData();
		const fillColour = '#EFE9AE';
		
		const defs = new createNewElement('defs', {
			'class': this.type + '_clipPaths',
		});
		const topClip = new createNewElement('clipPath', {
			'id': this.type + '_topLeaf_clipPath',
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
	
	setLeafImages(famName, personName){
		//add svgLeaf imgs		
		const famInfo = PEOPLEINFO[famName] ?? {};
		const personInfo = famInfo[personName] ?? {};		
		
		let imgObjsArray = PEOPLEIMGs[personName];
		let imgCount = imgObjsArray.length;
		this.leafImgArr = [];
		
		this.imgObjsArray = imgObjsArray;
		this.imgCount = imgCount;
		
		let defaultImgConfig = {
			'transform': {'x': 0, 'y': 0},
			'width': 120
		}
		
		for (var i=0; i<imgCount; i++){					
			this.leafImgArr.push(imgObjsArray[i]);				
		}
		
		const clipPathURL = 'url(#' + this.type +  '_topLeaf_clipPath)';
		
		this.leafImgArr.forEach((arrImgObjs, i)=> {
			let imgConfigInclude = Object.assign(defaultImgConfig, arrImgObjs.imgLeafConfig);
			const leafImgSVGobj = new createNewElement('image', { 
				'class': 'svg_leafImg',
				'href': arrImgObjs.imgLink,
				'x': imgConfigInclude.transform.x,
				'y': imgConfigInclude.transform.y,
				'width': imgConfigInclude.width,
				'clip-path': clipPathURL,
			});	
			this.leafSVG.querySelector('#topLeaf_fill').after(leafImgSVGobj);
			if (!this.leafImgArr[i].hasOwnProperty('imgDOMelems'))
				this.leafImgArr[i].imgDOMelems = {'tree': '', 'info': ''};
				
			this.leafImgArr[i].imgDOMelems[this.type] = leafImgSVGobj;
			
		});
		
		shuffle(this.leafImgArr[0].imgDOMelems[this.type]);
		setTimeout(() => { 
			this.leafImgArr[0].imgDOMelems[this.type].classList.add("activeImg");
		}, 1400);
		
		this.imgIndex = 0;		
		
		if (this.type == 'tree')
			this.addImgDebugFnsToBtn();
		
		//fade in leaf
		$(this.leafSVG).fadeIn(1000);		
	
	}
	
	leafImgSlideFn_tree(){
		//console.log("treeinfo slide running...");
		let imgIndex = treeInfoTab.leafObj.imgIndex;
		let imgObjsArray =treeInfoTab.leafObj.imgObjsArray;		
		
		if (imgIndex == (imgObjsArray.length-1)){ //last img
			imgObjsArray[imgIndex].imgDOMelems.tree.classList.remove("activeImg");
			imgObjsArray[0].imgDOMelems.tree.classList.add("activeImg");
			treeInfoTab.leafObj.imgIndex = 0;
		} else {		
			imgObjsArray[imgIndex].imgDOMelems.tree.classList.remove("activeImg");
			imgObjsArray[imgIndex+1].imgDOMelems.tree.classList.add("activeImg");		
			treeInfoTab.leafObj.imgIndex++;
		}	
	}
	leafImgSlideFn_info(){
		//console.log("info slide running...");
		let imgIndex = infoTab.leafObj.imgIndex ;
		let imgObjsArray = infoTab.leafObj.imgObjsArray ;		
		
		if (imgIndex == (imgObjsArray.length-1)){ //last img
			imgObjsArray[imgIndex].imgDOMelems.info.classList.remove("activeImg");
			imgObjsArray[0].imgDOMelems.info.classList.add("activeImg");			
			infoTab.leafObj.imgIndex = 0;
		} else {		
			imgObjsArray[imgIndex].imgDOMelems.info.classList.remove("activeImg");
			imgObjsArray[imgIndex+1].imgDOMelems.info.classList.add("activeImg");	
			infoTab.leafObj.imgIndex++;
		}
		
	}
	
	clearLeafImages(){
		if (this.leafImgSlideshow){
			this.leafImgSlides('stop');
		}
		
		const leafGrp = this.leafSVG.querySelector("#topLeaf_GRP")
		const allOldImgs = this.leafSVG.getElementsByTagName("image");
		
		if (allOldImgs.length > 0){
			for (var i = 0; i < allOldImgs.length; i++){
				leafGrp.removeChild(allOldImgs[i]);
			}
		}
		this.leafImgArr = [];
	}
	
	leafImgSlides(startStop){
		switch (startStop){
			case 'start':					
				if (!this.leafImgSlideshow){
					//console.log("Start a Slideshow");
					if (this.type == 'tree')
						this.leafImgSlideshow = setInterval( this.leafImgSlideFn_tree, 10000);	
					else
						this.leafImgSlideshow = setInterval( this.leafImgSlideFn_info, 10000);	
				}
			break;
			
			case 'stop':
				//console.log("STOP SLIDES");
				if (this.leafImgSlideshow){
					clearInterval(this.leafImgSlideshow);
					this.leafImgSlideshow = null;
				}
			break;
		}
	}
	
	addImgDebugFnsToBtn(){ 
		let debugButtonDiv = document.querySelector("#imgDebugControlsDIV");
		
		let pauseBtn = debugButtonDiv.querySelector("#imgDebugPause");
		let nextBtn  = debugButtonDiv.querySelector("#imgDebugNext");
		pauseBtn.addEventListener("click", (evnt) => {treeInfoTab.leafObj.leafImgSlides('stop')});
		nextBtn.addEventListener( "click", (evnt) => {treeInfoTab.leafObj.nextSlideshowImg()});
	}
	
	nextSlideshowImg(){ 
		let imgObjsArray = treeInfoTab.leafObj.imgObjsArray;
		let imgArrayCount = imgObjsArray.length;
		if (imgArrayCount > 1){
			var imgIndex;
			for (var i=0; i < imgArrayCount; i++){
				if (imgObjsArray[i].imgDOMelems.tree.classList.contains("activeImg"))
					imgIndex = i;
			}
			
			if (imgIndex == (imgArrayCount-1)){ //last img
				imgObjsArray[imgIndex].imgDOMelems.tree.classList.remove("activeImg");
				imgObjsArray[0].imgDOMelems.tree.classList.add("activeImg");		
				treeInfoTab.leafObj.currentSlideImgTags(imgObjsArray[0]);		
			} else {		
				imgObjsArray[imgIndex].imgDOMelems.tree.classList.remove("activeImg");
				imgObjsArray[imgIndex+1].imgDOMelems.tree.classList.add("activeImg");		
				treeInfoTab.leafObj.currentSlideImgTags(imgObjsArray[imgIndex+1]);	
			}	
		}	
	}
	
	currentSlideImgTags(currentImgObj){
		//console.log(currentImgObj);
	}

}

/* -------------------- */

function peopleListSearch() {
	// Declare variables
	var input, filter, ul, li, a, i, txtValue;
	input = document.getElementById('peopleSearching');
	filter = input.value.toUpperCase();
	ul = document.getElementById("peopleList");
	li = ul.getElementsByTagName('li');
  
	//if first letter, change search icon
	if (filter.length == 0){
		pplTab.toggleSearchIcon('search');
	} else {
		pplTab.toggleSearchIcon('exit');	
	}
	//if search gen#,
	var genSearchBool = false, inputGenNum;
	const genRegExpr = /(GEN)\s*(\d+)/g, genRegExprFull = /(GENERATION)\s*(\d+)/g;
	let match = genRegExpr.exec(filter), matchFull = genRegExprFull.exec(filter);
	
	if ((match !== null) || (matchFull !== null)){
		genSearchBool = true;
		let rightMatch = match ?? matchFull;
		inputGenNum = `${rightMatch[2]}`;
	} 
	// Loop through all list items, and hide those who don't match the search query
	for (i = 0; i < li.length; i++) {
		txtValue = li[i].textContent || li[i].innerText;
		if (txtValue.toUpperCase().indexOf(filter) > -1) {
		  li[i].style.display = "";
		  
		} else if (genSearchBool){
			//get person data, check gen
			let personTag = PEOPLETAGfromNAME[txtValue];
			let personFam = findPersonsFamily(personTag);
			let personData = PEOPLERELATIONS[personFam][personTag];
			let personGen = personData.gen;
			
			if (personGen == inputGenNum)
				li[i].style.display = "";
			else 
				 li[i].style.display = "none";
			
		} else {
		  li[i].style.display = "none";
		}
	}
	
	//if all li values are display none, hide dropbutton
	const dropDivs = Array.from(ul.querySelectorAll('.ppl_dropdownContainer'));
	
	

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

function peopleListSearchExit(){
	const exitIcon = "fa-times-circle";
	const searchIcon = "fa-search";
	
	const searchIconDiv = document.getElementById('peopleSearchIcon');
	const targetIcon = searchIconDiv.querySelector("i");
	const searchInput = document.getElementById('peopleSearching');
	
	//check current icon is exit
	const iconType = targetIcon.classList[1];
	if (iconType == exitIcon){
		pplTab.focusSearchbox('focus');
		//clear search
		searchInput.value = "";
		peopleListSearch();
	}
	
	const dropBtns = document.querySelectorAll(".ppl_dropdownBtn");
	dropBtns.forEach((dropBtn)=>{
		dropBtn.style.display = "";
	});
	
}


function svgAnimate(type, enterExit, elemNodeObj, config){
	//Checking if Percentage	
	let container = elemNodeObj.nodeGrpContainer;
	let grp = container.querySelector(".nodeGrp");
	const queueVal = config.queue ?? false;
	Velocity.hook(elemNodeObj.nodeGrpContainer, "translateX", elemNodeObj.xy.x); 
	Velocity.hook(elemNodeObj.nodeGrpContainer, "translateY", elemNodeObj.xy.y);
	
	switch (type){
		case 'spin':
			switch (enterExit){
				case 'enter':
					Velocity(grp, { 
						scale: [config.scale, 0],
						rotateZ: '360deg',
						opacity: [1, 0],
					}, {duration: 1500, queue: queueVal, complete: function(elements) {
							grp.style.transform = "translateX(" + elemNode.xy.x + ") translateY(" + elemNode.xy.y + ")"; 
						}
					});
					
				break;
				case 'exit':
				break;
			}
		break;
		case 'rollFromLeft':
			case 'enter':
				Velocity.hook(grp, "translateX", '-10px');
				Velocity.hook(grp, "rotateZ", '145deg');
				Velocity(grp, { 
					translateX: 0,
					scale: [config.scale, 0],
					rotateZ: '380deg',
					opacity: [1, 0],
				}, {duration: 800, queue: queueVal});
				Velocity(grp, { 
					rotateZ: '360deg',
				}, {duration: 300, queue: queueVal, delay: 100});
			break;
			case 'exit':
			break;
		break;
		
		case 'rollFromTop':
			case 'enter':
				Velocity(container, { 
					opacity: [1, 0],
				}, {duration: 1500, queue: queueVal});
				Velocity.hook(grp, "translateY", '-10px');
				Velocity.hook(grp, "rotateZ", '215deg');
				Velocity(grp, { 
					translateY: 0,
					scale: [config.scale, 0],
					rotateZ: '380deg',
					opacity: [1, 0],
				}, {duration: 800, queue: queueVal});
				Velocity(grp, { 
					rotateZ: '360deg',
				}, {duration: 300, queue: queueVal, delay: 100});
			break;
			case 'exit':
			break;
		break;
		case 'rollFromRight':
			case 'enter':
				Velocity(container, { 
					opacity: [1, 0],
				}, {duration: 1500, queue: queueVal});
				Velocity.hook(grp, "translateY", '10px');
				Velocity.hook(grp, "rotateZ", '145deg');
				Velocity(grp, { 
					translateY: 0,
					scale: [config.scale, 0],
					rotateZ: '-20deg',
					opacity: [1, 0],
				}, {duration: 800, queue: queueVal});
				Velocity(grp, { 
					rotateZ: '0deg',
				}, {duration: 300, queue: queueVal, delay: 100});
			break;
			case 'exit':
			break;
		break;
	}
}

/* -- vivify animating -- */
function animateGrpEnterExit(grp, enterExit){
	switch (enterExit){
		case 'enter':
			grp.classList.add("vivify");
			grp.classList.add("duration-2000");
			grp.classList.add("popInBottom");
			setTimeout(()=>{
				grp.style.opacity = 1;
			}, 800);
			setTimeout(()=>{
				grp.classList.remove("vivify");
				grp.classList.remove("duration-2000");
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

function VIVIFY_animateElems(elem, type, enterExit){
	switch (type){
		case 'buttonDiv':
			switch (enterExit){
				case 'enter':
					//check nonactive btns re hidden
					for (let btn of elem.children){
						if (!btn.classList.contains("active")){
							btn.style.opacity = 0
						}
					}
					elem.classList.add("vivify");
					elem.classList.add("duration-1500");
					elem.classList.add("driveInBottom");
					setTimeout(()=>{
						elem.style.opacity = 1;
					}, 600);
					setTimeout(()=>{
						elem.classList.remove("vivify");
						elem.classList.remove("duration-1500");
						elem.classList.remove("driveInBottom");
					}, 1900);			
				break;
				case 'exit':
					elem.classList.add("vivify");
					elem.classList.add("duration-1500");
					elem.classList.add("driveOutBottom");
					setTimeout(()=>{
						elem.style.opacity = 0;
					}, 600);
					setTimeout(()=>{
						elem.classList.remove("vivify");
						elem.classList.remove("duration-1500");
						elem.classList.remove("driveOutBottom");
					}, 1000);
				break;
			}
		break;
		
		case 'buttons':
			switch (enterExit){
				case 'enter':
					if (elem.style.opacity == 0){
						elem.classList.add("active");
						setTimeout(()=>{
							elem.classList.add("vivify");
							elem.classList.add("duration-1000");
							elem.classList.add("flipInX");
							setTimeout(()=>{
								elem.style.opacity = 1;
							}, 400);
							setTimeout(()=>{
								elem.classList.remove("vivify");
								elem.classList.remove("duration-1000");
								elem.classList.remove("flipInX");
							}, 1000);
						}, 0);
					} 
				break;
				case 'exit':
					if (elem.style.opacity == 1){
						elem.classList.add("vivify");
						elem.classList.add("duration-1000");
						elem.classList.add("flipOutX");
						setTimeout(()=>{
							elem.style.opacity = 0;
							elem.classList.remove("active");
						}, 800);
						setTimeout(()=>{
							elem.classList.remove("vivify");
							elem.classList.remove("duration-1000");
							elem.classList.remove("flipOutX");
						}, 1000);
					}
				break;
			}
		break;
		
		case 'imgGallery':
			switch (enterExit){
				case 'enter':
					elem.classList.add("galleryOpen");
					elem.style.opacity = 1;
					elem.classList.add("vivify");
					elem.classList.add("duration-1500");
					elem.classList.add("popInRight");
					setTimeout(()=>{
						elem.classList.remove("vivify");
						elem.classList.remove("duration-1500");
						elem.classList.remove("popInRight");
					}, 1600);
				
				break;
				case 'exit':
					elem.classList.add("vivify");
					elem.classList.add("duration-1000");
					elem.classList.add("driveOutRight");
					setTimeout(()=>{
						elem.classList.remove("galleryOpen");
						elem.style.opacity = 0;
						elem.classList.remove("vivify");
						elem.classList.remove("duration-1000");
						elem.classList.remove("driveOutRight");
					}, 1600);
					
				break;
			}
		break;
		
		case 'imgArea':
			switch (enterExit){
				case 'enter':
					elem.style.opacity = 1;
					elem.classList.add("vivify");
					elem.classList.add("duration-1500");
					elem.classList.add("jumpInRight");
					setTimeout(()=>{
						elem.classList.remove("vivify");
						elem.classList.remove("duration-1500");
						elem.classList.remove("jumpInRight");
					}, 1600);
				
				break;
				case 'exit':
					elem.classList.add("vivify");
					elem.classList.add("duration-1000");
					elem.classList.add("jumpOutRight");
					setTimeout(()=>{
						elem.style.opacity = 0;
						elem.classList.remove("vivify");
						elem.classList.remove("duration-1000");
						elem.classList.remove("jumpOutRight");
					}, 1600);
					
				break;
			}
		break;
	}
}


/* -- otherFns -- */

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

function removeAllChildNodes(parent) {
	while (parent.firstChild) {
		parent.removeChild(parent.firstChild);
	}
}



const navObj 	= new navBar();
const pplTab 	= new peopleTab();
const infoTab 	= new woodInfoTab('info');
const treeInfoTab 	= new woodInfoTab('tree');

/* ------ Run on Page Load -------- */
$(document).ready(function(){	
	//loader
	loader_onReady(function() {
		mask_setVisible('.loading-mask', false);
	});
	
	//tree
	tree.createSVG();
	famView.createSVG(true);
});

/* ------------------------------------------------ */
