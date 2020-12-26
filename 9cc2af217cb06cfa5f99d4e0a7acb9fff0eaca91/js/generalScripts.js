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
		this.treeBtn = this.navDiv.querySelector("#treeTab");
		this.pplBtn = this.navDiv.querySelector("#pplTab");
		
		this.mainDiv = document.getElementById('mainDiv');
		this.svgDiv = document.getElementById('svgDiv');
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

/* -------------------- */
/* --- image tab --- */
class imgTab {
	constructor(){
		this.imageDiv = document.getElementById('imgsDiv');
		this.imgDisplay 	= this.imageDiv.querySelector(".imgDisplay");
		this.imageArea 		= this.imgDisplay.querySelector(".imgArea");
		this.imgFigure		= this.imageArea.querySelector("figure.imgContainer");
		this.circlesContainer	= this.imgFigure.querySelector(".circlesContainer");
		this.imageDivWood 	= this.imgDisplay.querySelector(".imageDivWood");
		
		this.initialWoodInfoDivs();
		
		this.currentImageObj = {};
		this.imgOpen = false;
		this.createdImg = null;
		
		this.circlesArray = [];
		this.circleSizes = {
			'normal': '80',
			'large': '120',
			'small': '60',
			'smaller': '40',
		}
		
		this.transitioning = false;
	}
	
	setImage(imageObj){	
		if (this.createdImg != null){
			VIVIFY_animateElems(this.imgFigure, 'imgArea', 'exit');
			this.imageInfo.classList.remove('fadeIn');
			
			setTimeout(()=> {
				this.clearImg();		
				this.setImageCreate(imageObj);	
				this.imgOpen = true;
			}, 1400);
			setTimeout(()=> {	
				VIVIFY_animateElems(this.imgFigure , 'imgArea', 'enter');
				this.imageInfo.classList.add('fadeIn');
			}, 1600);
		} else {		
			this.setImageCreate(imageObj);
			this.imgOpen = true;
			VIVIFY_animateElems(this.imgFigure , 'imgArea', 'enter');
			this.imageInfo.classList.add('fadeIn');
		}		
		
	}
	setImageCreate(imageObj){
		this.currentImageObj = imageObj;
		
		let imgAreaChildren = this.imageArea.children;
		
		const createdImg = new Image();
		this.createdImg = createdImg;		
		createdImg.src = imageObj.data.imgLink;
		
		const imgFigure = this.imgFigure;
		imgFigure.prepend(createdImg);
		
		let imgOrientation = imageObj.orientation;
		//console.log(imageObj);
		
		let orientationList = ["square", "portrait", "landscape"];
		orientationList.splice( orientationList.indexOf(imgOrientation), 1);
		
		if (!this.imgDisplay.classList.contains(imgOrientation)){
			this.imgDisplay.classList.add(imgOrientation);
			for (const ori of orientationList){
				if (this.imgDisplay.classList.contains(ori));
					this.imgDisplay.classList.remove(ori);		
			}
		}
		//this.imageArea change height to match photo height
		this.imageArea.style.height = (createdImg.height + 10) + "px";
		
		
		//people in img circles
		let peopleObjsArray = imageObj.data.tags.people;
		
		let personCircleContainer = this.circlesContainer;
		
		for (const personObj of peopleObjsArray){
			let personTag = Object.keys(personObj);
			
			let personCircle = document.createElement("div");
			let personCircleLabel = document.createElement("div");
			personCircleContainer.appendChild(personCircle);
			personCircle.appendChild(personCircleLabel);
			
			var circleSize, circleSizing;
			personCircle.classList.add("img_circleTag");
			personCircle.id = personTag + "_circleTag";
			personCircle.style.left = personObj[personTag].left + "px";
			personCircle.style.top = personObj[personTag].top + "px";
			if (personObj[personTag].hasOwnProperty("size")){
				circleSizing = personObj[personTag].size;
				personCircle.style.width = this.circleSizes[circleSizing] + "px";
				personCircle.style.height = this.circleSizes[circleSizing] + "px";
				
				personCircleLabel.classList.add(circleSizing);
				circleSize = this.circleSizes[circleSizing];
			} else {
				circleSize = this.circleSizes['normal'];
				
			}
			
			personCircleLabel.classList.add("img_circleTagLABEL");
			personCircleLabel.innerHTML = personTag;
			
			personCircle.addEventListener("click", (evnt) => this.circleClickEvnt(evnt));
			
		}
		
		
		this.fillWoodInfo(imageObj);
		
	}
	
	
	circleClickEvnt(evnt){	
		if (!this.transitioning){
			this.transitioning = true;
			const clickedCircleDiv = event.target;
			let circleId = clickedCircleDiv.id;
			const personClicked = circleId.replace("_circleTag", "");
		
			let personFam = findPersonsFamily(personClicked);
			changeGlobalFocus(personFam, personClicked);
			
			setTimeout(()=> {
				this.transitioning = false;
			}, 1000)
		}
	}
	
	changeFocus(clickedPerson){
		console.log("Change Focus " + clickedPerson);
		imgGalleryObj.setPerson(clickedPerson);
		
		if (navObj.activeBtn.id != 'imgsTab')
			this.clearImg();
			
	}
	
	clearImg(){			
		let areaImg = this.imgFigure.querySelector("img");
		if (areaImg != null)
			areaImg.remove();
		
		let areaCircleChildren = Array.from(this.circlesContainer.childNodes);
		
		for (const circleChild of areaCircleChildren){
			if (Array.from(circleChild.childNodes).length != 0){
				for (const circleLabel of Array.from(circleChild.childNodes)){
					circleLabel.remove();
				}
			}
			circleChild.removeEventListener("click", (evnt) => this.circleClickEvnt(evnt));
			circleChild.remove();
		}
		this.currentImageObj = {};
		this.circlesArray = [];		
		
		this.clearWoodInfo();
		
		this.imgOpen = false;
	}
	
	initialWoodInfoDivs(){
		this.woodInfoDiv = this.imgDisplay.querySelector(".imgDivWood");
		
		const infoContainer = document.createElement("div");
		this.imageInfo = infoContainer;
		infoContainer.classList.add('woodInfoContainer');
		this.woodInfoDiv.prepend(infoContainer);				
		
		const titleDiv = document.createElement("div");
		titleDiv.classList.add('imgData');
		titleDiv.classList.add('img_titleData');
		infoContainer.appendChild(titleDiv);	
		
			const titleSpan = document.createElement('span');
			this.titleSpan = titleSpan;
			titleSpan.classList.add('imgData_span');
			titleDiv.appendChild(titleSpan);	
		
		const yrDiv = document.createElement("div");
		yrDiv.classList.add('imgData');
		yrDiv.classList.add('img_yearData');
		infoContainer.appendChild(yrDiv);
		
			const yrSpan = document.createElement('span');
			this.yrSpan = yrSpan;
			yrSpan.classList.add('imgData_span');
			yrDiv.appendChild(yrSpan);	
		
		const locDiv = document.createElement("div");
		locDiv.classList.add('imgData');
		locDiv.classList.add('img_locData');
		infoContainer.appendChild(locDiv);	
		
			const locSpan = document.createElement('span');
			this.locSpan = locSpan;
			locSpan.classList.add('imgData_span');
			locDiv.appendChild(locSpan);	
		
		const pplDiv = document.createElement("div");
		this.pplDiv = pplDiv;
		pplDiv.classList.add('imgData');
		pplDiv.classList.add('img_pplData');
		infoContainer.appendChild(pplDiv);	
		
	}
	
	fillWoodInfo(imgObj){
		//console.log(imgObj);
		
		let imgTags 	= imgObj.data.tags;
		let imgTagsArray = [
			{'div': this.titleSpan,	'tag': imgTags.title ?? ''}, 
			{'div': this.yrSpan, 	'tag': imgTags.year ?? ''}, 
			{'div': this.locSpan,	'tag': imgTags.place ?? ''}, 
		];
		let imgPpl 		= imgTags.people ?? [];		
		
		for (const tagObj of imgTagsArray){
			if (tagObj.tag != ''){
				tagObj.div.innerHTML = tagObj.tag;
			}
		}
		
		if (imgPpl != []){
			for (const personObj of imgPpl){
				let person =  Object.keys(personObj);
				const pplSpan = document.createElement('span');
				pplSpan.id = "imgPplTags_" + person;
				pplSpan.classList.add('img_pplTag');
				pplSpan.innerHTML = ('#' + person);
				this.pplDiv.appendChild(pplSpan);	
				
				//add click event
				pplSpan.addEventListener("click", (evnt) => this.pplTagClickEvent(evnt));	
			}
		}
	}
	
	pplTagClickEvent(event){
		if (!this.transitioning){
			this.transitioning = true;
			const clickedPersonDiv = event.target;
			let clickedId = clickedPersonDiv.id;
			const personClicked = clickedId.replace("imgPplTags_", "");
		
			let personFam = findPersonsFamily(personClicked);
			changeGlobalFocus(personFam, personClicked);
			
			setTimeout(()=> {
				this.transitioning = false;
			}, 1000)
		}
	}
	
	clearWoodInfo(){
		let imgTagDivs = [this.titleSpan, this.yrSpan, this.locSpan];
		
		for (const tagDiv of imgTagDivs){
			tagDiv.innerHTML = '';
		}
		
		for (const pplTags of Array.from(this.pplDiv.childNodes)){
			pplTags.removeEventListener("click", (evnt) => this.pplTagClickEvent(evnt));
			pplTags.remove();
		}
		
		
	}
	
	
}

class imgGallery{
	constructor(){
		this.imageGalleryDIV = document.getElementById('imgGallery');
		this.galleryGridDIV = this.imageGalleryDIV.querySelector(".imgGalleryGrid");
		this.galleryPersonFocus = this.imageGalleryDIV.querySelector(".galleryPersonFocus");
		
		this.imageObjsArray = [];
		this.allImgsObjsArray = pplImageLinks(true);
		shuffle(this.allImgsObjsArray);
		
		this.transitioning = false;
		
		this.isOpen = false;
		this.initialGallery();
		
	}
	
	openGallery(){
		if (!this.transitioning){
			this.transitioning = true;
			this.isOpen = true;
			VIVIFY_animateElems(this.imageGalleryDIV, 'imgGallery', 'enter');
			setTimeout(()=>{
				this.transitioning = false;
			}, 2000);
		}
	}
	closeGallery(){
		if (!this.transitioning){
			this.transitioning = true;
			this.isOpen = false;
			VIVIFY_animateElems(this.imageGalleryDIV, 'imgGallery', 'exit');
			setTimeout(()=>{
				this.transitioning = false;
			}, 2000);
		}
	}
	
	clearGallery(){
		if (!this.transitioning){
			let noImgDivCheck = this.imageGalleryDIV.querySelector(".galleryNoImgs");
			if (noImgDivCheck != null){
				$(noImgDivCheck).fadeOut(500);
				setTimeout(function(){ noImgDivCheck.remove();}, 1000);
			}
			
			let galleryChildren = this.galleryGridDIV.children;
			for (const galleryChild of Array.from(galleryChildren)){
				galleryChild.remove();
			}
			this.imageObjsArray = [];
	}
	}
	
	initialGallery(){
		//allImgs		
		var grid = document.querySelector('.imgGalleryGrid');
		this.grid = grid;
		
		let msnry = new Masonry( grid, {
			itemSelector: '.grid-item',
			columnWidth: 165,
			isFitWidth: true,
			//gutter: 1,
		});
		this.msnry = msnry;
		
		this.addImagesToGrid(this.allImgsObjsArray, grid);		
		
		msnry.layout();
		
	}
	
	setPerson(personTag){
		this.clearGallery();
		this.galleryPersonFocus.innerHTML = personTag;
		
		//for each image from person, create div in grid,
		//if portrait, add class to span 2/3 rows (depending on size)
		//if landscape, add class to span columns?
		
		var imgArray;
		if (personTag == 'All'){
			imgArray = this.allImgsObjsArray;
			$('#imgGallery .galleryShowAll').fadeOut(500);
		} else {
			imgArray = PEOPLEIMGs[personTag] ?? 'none';
			shuffle(imgArray);	
			$('#imgGallery .galleryShowAll').fadeIn(500);
		}
		
		if (imgArray != 'none'){		
			this.addImagesToGrid(imgArray, this.grid);					
			this.msnry.layout();
			
		} else {
			let noImgDiv = document.createElement("div");
			this.imageGalleryDIV.appendChild(noImgDiv);
			noImgDiv.innerHTML = "No Images for this Person";
			noImgDiv.classList.add("galleryNoImgs");
			
			$(noImgDiv).fadeIn(500);
		}
		
		
		
	}
	
	addImagesToGrid(imgArray, grid){
		var imgCount = 1;
		for (const img of imgArray){
			const gridImg = new Image();
			const gridImgDiv = document.createElement('div');
			gridImg.src = img.imgLink;			
			
			//get img orig size
			const regexpNum = /width=([0-9]+)&height=([0-9]+)/g;
			let widthHeightMatch = regexpNum.exec(img.imgLink);
			let imgWidth = `${widthHeightMatch[1]}`;
			let imgHeight = `${widthHeightMatch[2]}`;
			
			
			let dimDivide = (imgWidth > imgHeight) ? imgWidth/imgHeight : imgHeight/imgWidth;
			let roundedDivide = Math.round(dimDivide * (10 ^ 2)) / (10 ^ 2);	
			
			var imgOrientation = '';
			if (roundedDivide > 1.3){
				if (imgWidth > imgHeight){
					//landscape
					imgOrientation = 'landscape';
					if (roundedDivide > 1.5)
						gridImgDiv.classList.add("grid-item--width3");
					else 
						gridImgDiv.classList.add("grid-item--width2");
					
				} else if (imgHeight > imgWidth){
					imgOrientation = 'portrait';
					//portrait
					if (roundedDivide > 1.5)
						gridImgDiv.classList.add("grid-item--width3");
					else 
						gridImgDiv.classList.add("grid-item--height2");
				} else {
					imgOrientation = 'square';					
				}
			} else {
					imgOrientation = 'square';					
				}
			
			//unique tags
			this.imageObjsArray.push({
				'data': img,
				'imgDOM': gridImg,
				'imgDivDOM': gridImgDiv,
				'id': 'imgDiv' + imgCount,
				'orientation': imgOrientation,
				'origWidth': imgWidth,
				'origHeight': imgHeight,
			});
			gridImgDiv.id = 'imgDiv' + imgCount;
			
			gridImgDiv.classList.add('grid-item');
			grid.appendChild(gridImgDiv);
			gridImgDiv.appendChild(gridImg);
			
			this.msnry.prepended( gridImgDiv );
			
			this.addClickEvent(gridImgDiv);
			
			imgCount++;
		}
	}
	
	addClickEvent(gridItem){
		gridItem.addEventListener("click", (evnt) => this.openImageFromGallery(evnt));	
	}
	
	openImageFromGallery(event){
		if (!this.transitioning){
			const clickedImDiv = event.target;
			let divId = clickedImDiv.parentElement.id;
		
			for (const imgObj of this.imageObjsArray){
				if (imgObj.id == divId){
					imgOpenTab.setImage(imgObj);
				}
			}
			this.closeGallery();
		}
	}
	
}


/* -------------------- */
/* -- tree Div -- */
class node {
	constructor(svg, tagType){
		this.svg = svg;
		this.tagType = tagType;	
		this._isSpouse = this.isSpouse();
		this._isRoot = this.isRoot();
		this.xy = this.getNodeTypePosition(tagType);
		this.getWhichNode();
	}
	
	// ---- info ----
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
	
	isOtherSpouse(){
		return this.personData.hasOwnProperty("spouseMain");
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
	
	isHalfSibling(){
		return this.personData.hasOwnProperty("isHalfSibling");
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
		
		// const childX = 115;
		const childX = svgWidth/5;
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
			
			case 'famView_parentNode':
				return {'x': svgWidth * 35/100, 'y': svgHeight * 22/100};
			break;
			case 'famView_spouseNode':
				return {'x': svgWidth * 65/100, 'y': svgHeight * 22/100};
			break;
			case 'famView_childNode':
				return {'x': svgWidth * 50/100, 'y': svgHeight * 70/100};
			break;
			
			/**/
			default:
				return {'x': 0, 'y': 0};
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

			default:
				this.whichNode = this.tagType;
		}
	}
	
	checkRelationButtons(){
		const siblingsCheck = this.personData.siblings ?? this.personData.siblingMain ?? 'none';
		const childrenCheck = this.personData.children ?? 'none';
		
		var tagChecks = {
			'childMain': 	'leftArrow',
			'parentMain': 	'rightArrow',
			'siblings': 	'siblings',
			'children': 	'children',
		};
		for (const check in tagChecks){
			if (this.personData.hasOwnProperty(check)){	
				//console.log(this.personTag + " check " + check + " ? " + this.personData.hasOwnProperty(check));
				tree.showHideButtons('show', tagChecks[check]);				
			}
			else {
				if ((check == "siblings") && this.personData.hasOwnProperty('siblingMain')){
					tree.showHideButtons('show', tagChecks[check]);	//isSibling
					//tree.showHideButtons('hide', tagChecks[check]);
				} else if ((check == "siblings") && this.personData.hasOwnProperty('siblingMain')){
					tree.showHideButtons('show', tagChecks[check]);	//isSibling
					//tree.showHideButtons('hide', tagChecks[check]);
				} else {
					tree.showHideButtons('hide', tagChecks[check]);
				}
			}
		}
		
		
	}
	
	nodeSetPerson(newName, newFam, newTag){
		const nodeGrp = this.nodeGrpContainer.querySelector(".nodeGrp"); 
		
		const personData = PEOPLERELATIONS[newFam][newName] ?? {};
		const personInfo = PEOPLEINFO[newFam][newName] ?? {};		
		
		this.personInfo = personInfo;	
		this.personData = personData;	
		this.personTag = newName;
		this.famName = newFam;	this.tagType = newTag;
		
		this.getFamilyTags();	
		
		if (this.personTag == 'none'){
			this.nodeGrpContainer.setAttribute("visibility", "hidden");
		} else {
			this.nodeGrpContainer.setAttribute("visibility", "");	
		}
		
		const newDatesText  = personInfo.dates ?? '';		
		this.nodeGrpContainer.querySelector(".svgDatesTxt").textContent = newDatesText;
		
		
		const svgNameTxt = this.nodeGrpContainer.querySelector(".svgNameTxt");
		removeAllChildNodes(svgNameTxt);
		
		//name length check
		var nameArray;
		const newNameText  = personInfo.name ?? '';

		if (newNameText){
			if (newNameText.length < 13) nameArray = newNameText;
			else nameArray = newNameText.match(/(.{1,13})(?:\s|$)/g);				
		}
		
		if (Array.isArray(nameArray)){
			for (let nameLine of nameArray){
				const dyVal = (nameLine == nameArray[0]) ? "0em" : "1.2em";
				
				const nameTextLine = new createNewElement('tspan', {
					'class': 'svgNameTxt_span',
					'x': 	0,
					'dy':	dyVal,
					'textContent': 	nameLine ?? '',					
				});	
				svgNameTxt.appendChild(nameTextLine);
			}
		} else {
			const nameTextLine = new createNewElement('tspan', {
				'class': 'svgNameTxt_span',
				'x': 	0,
				'textContent': 	nameArray ?? '',					
			});	
			svgNameTxt.appendChild(nameTextLine);
		}
		
	
		if ( this.personInfo.imgIcon ){
			if (this.iconImg)			
				this.iconImg.setAttribute('href', ('../familyTrees/media/images/icons/' + this.personTag + '.png'));
			else 
				this.addPersonIconImg();						
		} else {
			if (this.iconImg){
				this.iconImg.remove();
				this.iconImg = null;				
			}	
		}		
	}

	// ---- create ----
	initialise(personTag, famName){	
		const personInfo = PEOPLEINFO[famName][personTag] ?? {};		
		const personData = PEOPLERELATIONS[famName][personTag] ?? {};
		
		this.personInfo = personInfo;
		this.personData = personData;
	
		this.personTag = personTag;
		this.famName = famName;
		
		this.getFamilyTags();
		
		this._isSibling = this.isSibling();
		
		this.nodeGrpContainer = this.createInitialNode(personTag, personInfo, this.getNodeTypePosition(this.tagType));
		
		if (this.personInfo.imgIcon)
			this.addPersonIconImg();
		
		//console.log(this.tagType + ", " + this.personTag);
		switch (this.tagType){
			case 'focus':	
				infoTab.fillPersonInfo(famName, personTag);
				treeInfoTab.fillPersonInfo(famName, personTag);
				
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
				tree.setFamilyText(famName)
				
				setTimeout(()=>{					
					this.checkRelationButtons();
				}, 1000);
				
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
			
			default:
				
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
				infoTab.fillPersonInfo(famName, personTag);
				treeInfoTab.fillPersonInfo(famName, personTag);
				
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
	
	createInitialNode(personTag, personInfo, startXY){
		const nodeScale = (this.tagType == 'focus') ? 2 : 1; 
		const nodeOpacity = (this._isSpouse) ? (this.tagType == "focusParentS") ? 0.6 : 0 : 1;
		
		const isPx = (String(startXY.x).search('%') == -1) ? 'px' : '';
		
		const nodeGrpContainer = new createNewElement('g', {
			'class': 'nodeGrpContainer',
			'style': 'transform: translateX(' + startXY.x + isPx + ') translateY(' + startXY.y + isPx + '); opacity: '+ nodeOpacity,
		});		
		
		if (this._isSpouse)
			this.svg.prepend(nodeGrpContainer);
		else
			this.svg.appendChild(nodeGrpContainer);
		
		const nodeGrp = new createNewElement('g', {
			'class': 'nodeGrp',
			'style': 'transform: scale(' + nodeScale + ')',
		});
		nodeGrpContainer.appendChild(nodeGrp);
		this.nodeGrpContainer = nodeGrpContainer;
		
		if ( (this.whichNode == this.tagType) || (this.whichNode == this.tagType)){
			nodeGrpContainer.classList.add(this.whichNode + '_GrpContainer');
			nodeGrp.classList.add(this.whichNode + '_Grp');
		} else {
			//console.log(this.whichNode);
			nodeGrpContainer.setAttribute('id', this.whichNode + '_GrpContainer');
			nodeGrp.setAttribute('id', this.whichNode + '_Grp');
		}
		
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
		});	
		nodeGrp.appendChild(personNameText);
		
		const newNameText  = personInfo.name ?? '';
		
		var nameArray;
		if (newNameText){
			if (newNameText.length < 13) nameArray = newNameText;
			else nameArray = newNameText.match(/(.{1,13})(?:\s|$)/g);						
		}
		
		if (Array.isArray(nameArray)){
			for (let nameLine of nameArray){
				const dyVal = (nameLine == nameArray[0]) ? "0em" : "1.2em";
				
				const nameTextLine = new createNewElement('tspan', {
					'class': 'svgNameTxt_span',
					'x': 	0,
					'dy':	dyVal,
					'textContent': 	nameLine ?? '',					
				});	
				personNameText.appendChild(nameTextLine);
			}
		} else {
			const nameTextLine = new createNewElement('tspan', {
					'class': 'svgNameTxt_span',
					'x': 	0,
					'textContent': 	nameArray ?? '',					
				});	
				personNameText.appendChild(nameTextLine);
		}
		
		
		//spouse line
		var spouseLineGrp;
		if (this._isSpouse){			
			spouseLineGrp = tree.createLines(nodeGrpContainer, 'spouseLine', ['m', -120, -200, 'v', 200, 'h', 120]);
			if (personTag != 'none'){
				spouseLineGrp.style.opacity = 1;
			} else {
				spouseLineGrp.style.opacity = 0;
			}
			
		}
		
		if (personTag =="none"){
			nodeGrpContainer.setAttribute("visibility", "hidden");
			if (this._isSpouse) spouseLineGrp.style.opacity = 0;
	
		} else {
			nodeGrpContainer.removeAttribute("visibility");
			if (this._isSpouse) spouseLineGrp.style.opaicty = 0;
			
		}
		//add click event for non-focus
		$(circleGrp).click((evnt) => treeChange.treeChangeView(evnt, 'treeNode'));		
		
		return nodeGrpContainer;
		
	}
	
	addPersonIconImg(){
		let personIconBool = this.personInfo.imgIcon ?? false;
		let personImgIconURL =  '../familyTrees/media/images/icons/' + this.personTag + '.png';
		
		const iconSize = 90;
		if (personIconBool){
			if (!document.getElementById('def_nodeIconClipPath')){
				const def = this.svgElem ?? new createNewElement('defs', {
					'id':'def_nodeIconClipPath',
				});
					const clipPath = new createNewElement('clipPath', {
						'id' : 'imgCircleClipPath',				
					});
						const circleClip = new createNewElement('circle', {
							'cx': 0, 'cy': 0,
							'r' : iconSize,					
					});
				$(this.svgElem).prepend(def);
			}
			
			const icon = new createNewElement('image', {				
				'class': 'personIcon',
				'x': -(iconSize/2),	'y': -(iconSize/2),
				'width': iconSize, 'height': iconSize,	
				'href': personImgIconURL,
				'clip-path': 'url(#imgCircleClipPath)'
			});
			
			this.iconImg = icon;			
			const circleGrp = this.nodeGrpContainer.querySelector(".nodeCircleGrp");
			circleGrp.appendChild(icon);
		}
		
	}
	
	
	
	// ---- fns ----
	nodeShift(direction, first = false){
		//direction right => nodes moving left => relations index -ve	
		const oldPosition = this.xy;
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
		this.xy = newPosition;
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
				changeGlobalFocus(this.famName, this.personTag);
				
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
				changeGlobalFocus(this.famName, this.personTag);
				
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
				changeGlobalFocus(this.famName, this.personTag, 'imgsOnly');
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
	
	animateShift (oldTag, oldPosition, newPosition) {		
		const scaleUp = (this.tagType =='focus') ? 2 : 1;
		const nodeGrp = this.nodeGrpContainer.querySelector(".nodeGrp"); 
		const lineGrp = this.nodeGrpContainer.querySelector(".spouseLine_GRP"); 	
	
		// prevent animation jumping on start
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
		
		const circleBorderLength = (document.getElementById("svgDiv").style.display == 'none') ? 313.65
			: circleBorderRight.getTotalLength();
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
		
		
		//silhouette
		const silh = new createNewElement('path', {
			'class': 'nodeSilhouette',
			'd': nodeSilhouette(),
			'fill': '#fff',
			'fill-opacity': 0.4,
			'stroke': 'none',
		});
		circleGrp.appendChild(silh);
		
		return circleGrp;
	}
}

class treeSVG {
	constructor(svgElem){
		this.svgDiv = document.getElementById('svgDiv');
		this.svgElem = svgElem;
	}
	
	createSVG(famView = false) {
		const pageWidth = document.getElementsByTagName('body')[0].offsetWidth;
		this.svgWidth = pageWidth;
		
		const oldViewBox = this.svgElem.getAttribute('viewBox');
		const oldViewBoxArray = oldViewBox.split(' '); // 4 elements
		const newViewBox =  oldViewBoxArray[0] + ' ' + oldViewBoxArray[1] + ' ' + pageWidth + ' ' + oldViewBoxArray[3];
		this.svgElem.setAttribute('viewBox', newViewBox); 
		
		
		const svgCenterPt = {'x': (pageWidth/2),'y': (oldViewBoxArray[3]/2)};
		this.svgCenterPt = svgCenterPt;
		
		if (!famView){
			const mainLineGrp = this.createLines(this.svgElem, 'mainLine', ['m', -50, (svgCenterPt.y - 70), 'h', (pageWidth+80)]);
			this.mainLineGrp = mainLineGrp;	
			
			this.svgElem.style.opacity = 0; 
			
			const btnDiv = this.svgDiv.querySelector(".arrowButtonsDiv") ;
			const btnSib = btnDiv.querySelector("button.siblingIcon_button");
			const btnChld = btnDiv.querySelector("button.siblingIcon_button");
			btnSib.addEventListener("click", (evnt) => treeChange.treeChangeView(event, 'famView'));
			btnChld.addEventListener("click", (evnt) => treeChange.treeChangeView(event, 'famView'));
			
			
			this.showHideButtons('hideAll');
			
			this.treeIcon_EVENTS();
			
		} else {
			
		}
	}
	
	createLines(nodeContainer, type, points){ 		
		var lineConfig, shadowDirection;
		const pathD = points.join(" ");
		
		switch (type){
			case 'mainLine':
				// points = ['m', -10, (svgCenterPt.y - 70), 'h', pageWidth];
				lineConfig = {
					'fill': 'none',
					'stroke-width': 8,			
					'd': pathD
				}
				shadowDirection = 'default';
			break;
			case 'spouseLine': 
				// points = ['m', -120, -200, 'v', 200, 'h', 120];
				lineConfig = {
					'fill': 'none',
					'stroke-width': 6,	
					'stroke-dasharray': 500,
					'stroke-dashoffset': 500,			
					'd': pathD
				}
				shadowDirection = 'leftDown';
			break;	
		
			case 'famView_lineDown': 
				lineConfig = {
					'fill': 'none',
					'stroke-width': 6,	
					'stroke-dasharray': 500,
					'stroke-dashoffset': 500,			
					'd': pathD
				}
				shadowDirection = 'left';
			break;
			
			default:
				lineConfig = {
					'fill': 'none',
					'stroke-width': 6,	
					'stroke-dasharray': 500,
					'stroke-dashoffset': 500,			
					'd': pathD
				}
				shadowDirection = 'leftDown';
			
		}		
		
		const shadowLineDefine = Object.assign({}, lineConfig, {
			'class': type + '_lineShadow',
			'stroke': '#000',
			'stroke-opacity': 0.1,
		});
		
		const lineGrp = new createNewElement('g', {
			'class': type + '_GRP',
		});
		const mainLine = new createNewElement('path', 
			Object.assign({}, lineConfig, {
				'class': type,
				'stroke': '#FF928B'	
		}));
		const mainLineShadow1 = new createNewElement('path', shadowLineDefine);
		const mainLineShadow2 = new createNewElement('path', shadowLineDefine);
		
		nodeContainer.prepend(lineGrp);
		lineGrp.appendChild(mainLine);
		lineGrp.prepend(mainLineShadow1);
		lineGrp.prepend(mainLineShadow2);
		
		//console.log(mainLine.getTotalLength()); //=320
		const shadowXY = (shadowDirection == 'leftDown') ? {'x': -1, 'y': 1} : (shadowDirection == 'left') ? {'x': -1, 'y': 0} : {'x': 1, 'y': 1};
		
		mainLineShadow1.setAttribute('transform', 
			'translate(' + (shadowXY.x * 1.5) + ', ' +  (shadowXY.y * 1.5) + ')');
		mainLineShadow2.setAttribute('transform',
			'translate(' + (shadowXY.x * 3) + ', ' +  (shadowXY.y * 3) + ')');
		
		return lineGrp;
		
	}
	
	setFamilyText(famName){	
		const familyTextSpan = this.svgDiv.querySelector(".tree_familyText");
		familyTextSpan.innerHTML = famName.charAt(0).toUpperCase() + famName.slice(1);	
	}
	
	showHideButtons(showHide, icon = false){
		const btnDiv = this.svgDiv.querySelector(".arrowButtonsDiv") ;
		const btnArray = btnDiv.querySelectorAll("button");
		const topLeftDiv = this.svgDiv.querySelector(".svg_topLeftArea");
	
		switch (showHide){
			case 'hideAll':
				if (btnDiv.style.opacity == 1){
					VIVIFY_animateElems(btnDiv, 'buttonDiv', 'exit');
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
					VIVIFY_animateElems(btnDiv, 'buttonDiv', 'enter');
				}
			break;
			case 'hide':	
				//console.log("hiding " + icon);
				switch (icon){
					case 'siblings':
						const sibBtn = btnDiv.querySelector('.siblingIcon_button');
						VIVIFY_animateElems(sibBtn, 'buttons', 'exit');
					break;
					case 'children':
						const chldBtn = btnDiv.querySelector('.childrenIcon_button');
						VIVIFY_animateElems(chldBtn, 'buttons', 'exit');
					break;
					case 'leftArrow':
						const lftBtn = btnDiv.querySelector('.leftArrow_button');
						VIVIFY_animateElems(lftBtn, 'buttons', 'exit');
					break;
					case 'rightArrow':
						const rghtBtn = btnDiv.querySelector('.rightArrow_button');
						VIVIFY_animateElems(rghtBtn, 'buttons', 'exit');
					break;
					case 'famViewTree':
						const treeBtn = topLeftDiv.querySelector('.famView_treeIcon');
						let btnCSS = window.getComputedStyle(treeBtn);
						let btnDisplay = btnCSS.getPropertyValue('display'); 
						if (treeBtn.style.display == 'block'){
							treeBtn.style.display = 'none';
							
						} else if (btnDisplay == 'block'){
							treeBtn.style.display = 'none';
						}
						VIVIFY_animateElems(treeBtn, 'buttons', 'exit');
					break;
				}
			break;			
			case 'show':	
				//console.log("showing " + icon);
				switch (icon){
					case 'siblings':
						const sibBtn = btnDiv.querySelector('.siblingIcon_button');
						VIVIFY_animateElems(sibBtn, 'buttons', 'enter');
					break;
					case 'children':
						const chldBtn = btnDiv.querySelector('.childrenIcon_button');
						VIVIFY_animateElems(chldBtn, 'buttons', 'enter');
					break;
					case 'leftArrow':
						const lftBtn = btnDiv.querySelector('.leftArrow_button');
						VIVIFY_animateElems(lftBtn, 'buttons', 'enter');
					break;
					case 'rightArrow':
						const rghtBtn = btnDiv.querySelector('.rightArrow_button');
						VIVIFY_animateElems(rghtBtn, 'buttons', 'enter');
					break;
					case 'famViewTree':
						const treeBtn = topLeftDiv.querySelector('.famView_treeIcon');
						let btnCSS = window.getComputedStyle(treeBtn);
						let btnDisplay = btnCSS.getPropertyValue('display'); 
						if (treeBtn.style.display == 'none'){
							treeBtn.style.display = 'block';
						} else if (btnDisplay == 'none'){
							treeBtn.style.display = 'block';
						}
						VIVIFY_animateElems(treeBtn, 'buttons', 'enter');
					break;
				}
			break;
		}		
	}
	
	treeIcon_EVENTS(){
		//add click events
		this.treeBtns = {
			'leftArrow': 	this.svgDiv.querySelectorAll(".leftArrow_button"),
			'rightArrow': 	this.svgDiv.querySelectorAll(".rightArrow_button"),
			'siblings': 	this.svgDiv.querySelectorAll(".siblingIcon_button"),
			'children': 	this.svgDiv.querySelectorAll(".childrenIcon_button")
		};
		
		const famIcon_button  = this.svgDiv.querySelectorAll(".famIcon");
		const arrowBtn_button = this.svgDiv.querySelectorAll(".arrowBtn");	
		const zoomBtn_button  = this.svgDiv.querySelectorAll(".zoomBtn");
		
		for (const btn of famIcon_button){
			if (btn.classList.contains("famView_treeIcon"))
				btn.addEventListener("click", () => this.famView_backToTree());
			else 
				btn.addEventListener("click", (evnt) => treeChange.treeChangeView(evnt, 'famView'));
		}		
		for (const btn of arrowBtn_button){
			btn.addEventListener("click", (evnt) => treeChange.treeChangeView(evnt, 'arrows'));
		}
		
		
	}
	
	initialiseNodes(personTag, famName, reinit = false) {
		if (!reinit){ 
			setTimeout(()=>{
				this.showHideButtons('showAll');
			}, 900) ;
		}
		
		this.firstFocus = new node(this.svgElem, 'focus').initialise(personTag, famName);
		
		if (reinit == "lineShift") {	
			//group to enter
			const allNodesGrp = this.groupNodeContainers('group');
			const lineGrp = this.svgElem.querySelector(".mainLine_GRP");	
			
			NODEdetails.nodeList.nodeC.nodeGrpContainer.style.opacity = 0;
			
			animateGrpEnterExit(lineGrp, 'enter');
			animateGrpEnterExit(allNodesGrp, 'enter');
			
			setTimeout(()=>{
				NODEdetails.nodeList.nodeC.nodeGrpContainer.style.opacity = 1;
				this.groupNodeContainers('ungroup');
			}, 1500);
			
		} else {
			animateGrpEnterExit(this.svgElem, 'enter');
		}		
		
	}
	
	reInitialiseNodes(personTag, famName, lineShift = false) {
		switch (lineShift){
			case true:				
				NODEdetails.initialiseNodeLetters();
				this.initialiseNodes(personTag, famName, 'lineShift');
				
			break;				
			case false:
				animateGrpEnterExit(this.svgElem, 'exit');		
				
				NODEdetails.initialiseNodeLetters();
				setTimeout(()=> {
					//clearNodes;
					const allContainers = this.svgElem.querySelectorAll(".nodeGrpContainer");
					for (const container of allContainers){
						container.remove();
					}
					
					if (famName != 'famView'){
						this.initialiseNodes(personTag, famName, true);
					} 
					
				}, 2000);
			break;		
		}
		
		
	}
	
	groupNodeContainers(type, exception = false){
		switch (type){
			case 'group':
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
	
	animateMainLineShift(dummyContainer, personTag, famName){	
		this.showHideButtons('hideAll');	
		//grp all node grps except this one
		const allNodesGrp_start = this.groupNodeContainers('group', dummyContainer);
		const lineGrp = this.svgElem.querySelector(".mainLine_GRP");
		
		//exit all 
		animateGrpEnterExit(allNodesGrp_start, 'exit');
		animateGrpEnterExit(lineGrp, 'exit');		
		
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
	
	
	famView_backToTree(){
		tree.showHideButtons('showAll');
		tree.showHideButtons('hide', 'famViewTree');
		
		let currentFocus = NODEdetails.currentFocus;
		
		let famViewSVG = document.getElementById("famViewSVG");
		animateGrpEnterExit(famViewSVG, 'exit');
		setTimeout(()=> {
			//clearAll;
			removeAllChildNodes(famViewSVG);
			famViewSVG.style.display = "none";
			this.initialiseNodes(currentFocus.personTag, currentFocus.famName);
		}, 1000);		
		
	}
	
	animateToFamView(focusObj, type){		
		
		let svg = this.svgElem;
		
		const clonedFocusContainer = cloningFocus(focusObj);
		const clonedFocusGrp = clonedFocusContainer.querySelector(".nodeGrp");
		const clonedFocusHT = this.createFocusHighlight(clonedFocusContainer);
		clonedFocusHT.classList.add("focusHLT");
		
		hideTreeSVG();
		showFamViewSVG();
		const svgW = svg.getBoundingClientRect().width;
		const svgH = svg.getBoundingClientRect().height;
		
		const famObjs = this.createFamViewNodes(focusObj, type, clonedFocusContainer);	
		
		let kidCount = Object.keys(famObjs.children).length;		
		let positions = getPositions(type);	
		
		const childSpacing = getChildrenSpacing(famObjs);
		
		let lineDownY = (childSpacing.count < 5) ? svgH * 0.55 : svgH * 0.48;
		var allLines = formLines(famObjs);
		
		allLines['childLines'] = eachChildLines(allLines.grp, famObjs);
		var containersToQueue = animateNodes();
		animateLines(allLines);	
		
		setTimeout(()=> {
			allAnimationTimings(allLines, containersToQueue);
		}, 1000);
		
		
		function cloningFocus(focusObj){
			const clonedFocusContainer = focusObj.nodeGrpContainer.cloneNode(true);
			clonedFocusContainer.classList.add("focusContainer");
			clonedFocusContainer.setAttribute("id", "famView_focusNode_" + focusObj.personTag);			
			
		
			const clonedFocus_circleGrp = clonedFocusContainer.querySelector(".nodeCircleGrp");
			$(clonedFocus_circleGrp).off('click');
			clonedFocus_circleGrp.addEventListener("click", (evnt) => treeChange.famView_changeFocus(evnt));
			
			
			svg.appendChild(clonedFocusContainer);	
			return clonedFocusContainer; 
		}
		
		function hideTreeSVG(){
			tree.showHideButtons('hideAll');	
			focusObj.nodeGrpContainer.style.opacity = 0;	
		
			svg.style.display = 'block';
			svg.style.opacity = 1;			
			tree.reInitialiseNodes('', 'famView', false);	
		}
		
		function showFamViewSVG(){
			tree.showHideButtons('show', 'famViewTree');			
		}
		
		function getPositions(type){
			let focusPos = {}, midSpousePoint, spousePos;
			switch (type){
				case 'children': 
					let focusPos_percentage = {'x': '35', 'y': '22'};
					
					focusPos.x = svgW * parseFloat(focusPos_percentage.x /100);
					focusPos.y = svgH * parseFloat(focusPos_percentage.y /100);
					spousePos = famObjs.spouse.node.xy;
					
					midSpousePoint = focusPos.x + ((spousePos.x - focusPos.x) / 2);
					
					return {
						'focus': focusPos,
						'parentMain': focusPos,
						'spouse': famObjs.spouse.node.xy,
						'midSpouse': midSpousePoint
					}
				break;
				case 'sibling': 	
					focusPos = famObjs.children['focus'].xy;
					let parentMain = famObjs.parentMain.node.xy;	
					spousePos = famObjs.spouse.node.xy;				
					midSpousePoint = parentMain.x + ((spousePos.x - parentMain.x) / 2);
					
					return {
						'focus': famObjs.children['focus'].xy,
						'parentMain': parentMain,
						'spouse': famObjs.spouse.node.xy,
						'midSpouse': midSpousePoint
					}
				break;
			}
		}
		
		function getChildrenSpacing(famObjs){
			const xSpacing = [0, 20, 20, 20, 20, 15, 15, 10, 10, 10, 7.5, 7.5];
			
			var midIndex = Math.floor(kidCount / 2), 
				xSpacingForCount = xSpacing[kidCount];
				
			var firstKidPos_perc, lastKidPos_perc;
			if (kidCount % 2 == 1){
				firstKidPos_perc =  50 + ( (0 - midIndex) * xSpacingForCount);
				lastKidPos_perc =  50 + ( ((kidCount-1) - midIndex) * xSpacingForCount);
			} else {
				const midIndexAdapt = (midIndex - 1);
				firstKidPos_perc = (50 + (-1 * xSpacingForCount/2) + ( (0 - midIndexAdapt) * xSpacingForCount) );
				lastKidPos_perc = (50 + (1 * xSpacingForCount/2) + ( ((kidCount-1) - midIndex) * xSpacingForCount) );
			}
			
			var firstKidPos = svgW * parseFloat(firstKidPos_perc/100);
			var lastKidPos = svgW * parseFloat(lastKidPos_perc/100);
			return {'first': firstKidPos, 'last': lastKidPos};
		}
		
		function formLines(famObjs){
			let LINEADD = 2.9;
			
			const lineGrp = new createNewElement('g', {
				'class': 'famView_lines_GRP',
			});
			$(svg).prepend(lineGrp);
			
			const spousePathPoints = ['M', positions.parentMain.x, positions.parentMain.y, 'H', positions.spouse.x];	
			const lineDown_pathPoints = ['M', positions.midSpouse, positions.parentMain.y, 'V', (lineDownY - LINEADD + 0.1)];
			
			const lineAcrossL_pathPoints = ['M', positions.midSpouse, lineDownY, 'H', childSpacing.first - LINEADD];
			const lineAcrossR_pathPoints = ['M', positions.midSpouse, lineDownY, 'H', childSpacing.last + LINEADD];
			
			const spouseLine = famView.createLines(lineGrp, 'famView_spouseLine', spousePathPoints);			
			const lineDown = famView.createLines(lineGrp, 'famView_lineDown', lineDown_pathPoints);			
			const lineAcrossChildrenLeft = famView.createLines(lineGrp, 'famView_lineAcrossChildrenLLeft', lineAcrossL_pathPoints);
			const lineAcrossChildrenRight = famView.createLines(lineGrp, 'famView_lineAcrossChildrenRight', lineAcrossR_pathPoints);
			
			return {'grp': lineGrp, 'spouseLine': spouseLine, 'lineDown': lineDown, 'lineAcrossL': lineAcrossChildrenLeft, 'lineAcrossR': lineAcrossChildrenRight};
		}
		
		function eachChildLines(lineGrp, famObjs){
			var childLines = [];
			for (const kid in famObjs.children){
				let kidPos = famObjs.children[kid].xy;
				const kidPathPoints = ['M', kidPos.x, lineDownY, 'V', kidPos.y];
				const kidLines = famView.createLines(lineGrp, 'famView_childLine', kidPathPoints);
				childLines.push(kidLines);
			}
			return childLines;
		}
		
		function animateNodes(){
			var containersToQueue = {};
		
			Velocity.hook(clonedFocusContainer, "translateX", focusObj.xy.x); 
			Velocity.hook(clonedFocusContainer, "translateY", focusObj.xy.y); 
			Velocity.hook(clonedFocusGrp, "scale", 2); 
			Velocity(clonedFocusContainer, { 
				translateX: [(positions.focus.x) , focusObj.xy.x], 
				translateY: [(positions.focus.y) , focusObj.xy.y], 
			}, { duration: 1500, queue: false,});
			
			const clonedFocusScale = (type=="children") ? 1 :  (kidCount < 5) ? 1 : (kidCount < 8) ? 0.8 : 0.6;
			Velocity(clonedFocusGrp, { 
				scale: clonedFocusScale
			}, { duration: 1500, queue: false,});
			
			
			svgAnimate('rollFromLeft', 'enter', famObjs.spouse.node, {'queue': 'spouseNodeQueue', 'scale':1});
			if (type == "sibling") {
				svgAnimate('rollFromRight', 'enter', famObjs.parentMain.node, {'queue': 'spouseNodeQueue', 'scale':1});
				containersToQueue['parentMain'] = famObjs.parentMain.node.nodeGrpContainer;
			}
			var childNodesContainers = [];
			for (const kidName in famObjs.children){
				if (kidName != 'focus'){
					svgAnimate('rollFromTop', 'enter', famObjs.children[kidName].node, {'queue': 'childNodesQueue', 'scale': (kidCount < 5) ? 1 : (kidCount < 8) ? 0.8 : 0.6});
					childNodesContainers.push( famObjs.children[kidName].node.nodeGrpContainer );				
				}
			}
			
			containersToQueue['spouse'] = famObjs.spouse.node.nodeGrpContainer;
			containersToQueue['childNodes'] = childNodesContainers;
			
			return containersToQueue;
		}
		
		function animateLines(lines){
			Velocity(lines.spouseLine.children, { 'stroke-dashoffset': 0 }, { duration: 2000, queue: 'spouseQueue' });
			
			Velocity(lines.lineDown.children, { 'stroke-dashoffset': 0 }, { duration: 2000, queue: 'lineDownQueue' });
			
			Velocity(lines.lineAcrossL.children, { 'stroke-dashoffset': 0 }, { duration: 2000, queue: 'lineAcrossQueue' });
			Velocity(lines.lineAcrossR.children, { 'stroke-dashoffset': 0 }, { duration: 2000, queue: 'lineAcrossQueue' });
			
			
			var childLinesAll = [];
			for (const line of lines.childLines){
				for (const subline of line.children ){
					Velocity(subline, { 'stroke-dashoffset': 0 }, { duration: 2000, queue: 'childLineQueue' });
					childLinesAll.push(subline);
				}
			}
			lines['childrenAll'] = childLinesAll;
		}
		
		function allAnimationTimings(lines, containersToQueue){
			const lineAcross_startTime = (type == "sibling") ? 0 : 1000;
			
			setTimeout(()=>{
				Velocity.Utilities.dequeue(lines.spouseLine.children, "spouseQueue");
			}, 0);
			setTimeout(()=>{
				Velocity.Utilities.dequeue(lines.lineDown.children, "lineDownQueue")
			}, 500);
			setTimeout(()=>{
				Velocity.Utilities.dequeue(lines.lineAcrossL.children, "lineAcrossQueue");
				Velocity.Utilities.dequeue(lines.lineAcrossR.children, "lineAcrossQueue");
			}, lineAcross_startTime);
			setTimeout(()=>{
				Velocity.Utilities.dequeue(lines.childrenAll, "childLineQueue");
			}, (lineAcross_startTime + 500));
			
			
			setTimeout(()=>{
				Velocity.Utilities.dequeue(containersToQueue.spouse.querySelector(".nodeGrp"), "spouseNodeQueue");
				if (type == "sibling") Velocity.Utilities.dequeue(containersToQueue.parentMain.querySelector(".nodeGrp"), "spouseNodeQueue");
			}, 500);			
			
			setTimeout(()=>{
				for (const childContainer of containersToQueue.childNodes){					
					Velocity.Utilities.dequeue(childContainer.querySelector(".nodeGrp"), "childNodesQueue");
				}
			}, (lineAcross_startTime + 750));			
		}
		
		
	}
	
	createFocusHighlight(grpContainer){ //for all
		let grp = grpContainer.querySelector(".nodeGrp");		
		
		const hghltGrp = new createNewElement('g', {
			'class': 'focusHighlightGrp',
		});
		$(grp).prepend(hghltGrp);
		
		const hghltCircle = new createNewElement('circle', {
			'class': 'focusHighlightGrpCircle',
			'r': 60, 'cx': 0, 'cy': 0,
			'fill': '#fff',
			'fill-opacity': 0.5,
			'stroke': 'none',
		});
		hghltGrp.appendChild(hghltCircle);
		
		return hghltGrp;
	}
	
	createFamViewNodes (focusObj, type, focusContainer){
		let svg = this.svgElem;
		const svgW = this.svgElem.getBoundingClientRect().width;
		const svgH = this.svgElem.getBoundingClientRect().height;
		
		var famObjs = {
			'spouse': 		{'node': '', 'xy': ''}, 
			'children': 	{}, 
			'parentMain': 	{'node': '', 'xy': ''}
		};
		var childList = []; 
		var spouse, parentMain;
		var siblingMainObj, siblingMain;
		if (type == 'children'){
			spouse = focusObj.personData.spouse;
			childList = focusObj.personData.children;
			
		} else {
			let useFocusObjData;
	
			if (focusObj.isSibling()){				
				useFocusObjData = PEOPLERELATIONS[focusObj.famName][focusObj.mainSibling];	
			} else if (focusObj.isSpouse()){
				
			} else {
				useFocusObjData = PEOPLERELATIONS[focusObj.famName][focusObj.personTag];
				
			}
			
			spouse = useFocusObjData.parentSpouse;
			childList = useFocusObjData.siblings ?? [];		
			childList.splice (childList.indexOf(focusObj.personTag), 1);
			childList.unshift(focusObj.personTag);
			parentMain = useFocusObjData.parentMain;					

			createNode(parentMain, 'parentMain', 'famView_parentNode');				
			
		}
		
		createNode(spouse, 'spouse', 'famView_spouseNode');	
		
		let kidCount = childList.length;
		
		var getChildPos = function(i, kidCount){
			const xSpacing = [0, 20, 20, 20, 20, 15, 15, 10, 10, 10, 7.5, 7.5];
			var midIndex = Math.floor(kidCount / 2);
			var xCalcPerc;
			
			let kidSpacingY = (kidCount < 5) ? '70%' 
				: (kidCount < 8) ? ['60%', '75%'] 
				:['60%', '75%'];
			
			if (kidCount % 2 == 1){
				xCalcPerc =  50 + ( (i - midIndex) * xSpacing[kidCount]);
			} else {
				const negate = (i < midIndex) ? -1 : 1;
				const midIndexAdapt = (i < midIndex) ? (midIndex - 1) : midIndex;
				xCalcPerc = (50 + (negate * xSpacing[kidCount]/2) + ( (i - midIndexAdapt) * xSpacing[kidCount]) );	
			}
			
			let tYperc = 
				(kidCount < 5) ? parseInt(kidSpacingY.replace("%","")) : 
				(i % 2 == 0) ? parseInt(kidSpacingY[0].replace("%","")) : 
				parseInt(kidSpacingY[1].replace("%",""));
			
			const tY = svgH * (tYperc / 100);
			const tX = svgW * (xCalcPerc / 100);			
			
			return {'x': tX, 'y': tY};
		}
		
		doChildNodes(childList);		
		
		return famObjs;
		
		
		
		function createNode(member, memberType, classNm, xyPos=false){
			var nodeFam = focusObj.famName;
			if (memberType == 'children'){
				nodeFam = findPersonsFamily(member, focusObj.famName);	
			}
			let memberNode = new node(svg, classNm).initialise(member, nodeFam);
			memberNode.nodeGrpContainer.setAttribute('id', memberNode.tagType + "_" + memberNode.personTag);
			const nodeHLT = famView.createFocusHighlight(memberNode.nodeGrpContainer);
			
			if (memberType == 'children'){
				famObjs[memberType][memberNode.personTag] = {
					'node': memberNode,
					'xy': xyPos
				};	
				
				const tString = 'translateX(' + xyPos.x + 'px) translateY(' + xyPos.y + 'px) ';
				memberNode.nodeGrpContainer.style.transform = tString;				
				
			} else {
				famObjs[memberType]['node'] = memberNode;	
			}
			
			memberNode.nodeGrpContainer.querySelector(".nodeGrp").style.transform = 'scale(0)';		
			memberNode.nodeGrpContainer.querySelector(".nodeGrp").style.opacity = 0;
			
			let nodeCircleGrp = memberNode.nodeGrpContainer.querySelector(".nodeCircleGrp");
			$(nodeCircleGrp).off('click');
			nodeCircleGrp.addEventListener("click", (evnt) => treeChange.famView_changeFocus(evnt));			
		}
		
		function doChildNodes(childList){			
			for (let i=0; i < kidCount; i++){		
				let xyPos = getChildPos(i, kidCount);
				
				if ( (type=='sibling') && (i==0)){
					famObjs['children']['focus'] = {
						'nodeContainer': focusContainer,
						'xy': {'x': xyPos.x, 'y': xyPos.y}
					};
				} else {					
					createNode(childList[i], 'children', 'famView_childNode', xyPos);
				}		
				
			}
		}
		
	}
	
}

class treeChangeEvents {
	constructor(svgDiv){
		this.svgDiv = svgDiv;
		this.treeSVG = svgDiv.querySelector("#mainSVG");
		this.famViewSVG = svgDiv.querySelector("#famViewSVG");
		
		this.changingTreeView = false;
	}
	
	treeChangeView(event, type){
		if (!this.changingTreeView){
			this.changingTreeView = true;
			var btn = event.target;
			if ((btn.tagName == "DIV") || (btn.tagName == "I")){
				btn = $(btn).parents("button")[0];
			}
			
			switch (type){
				case 'famView':
					const whichFamType = (btn.classList.contains("siblingIcon_button")) ? 'sibling' 
						: (btn.classList.contains("childrenIcon_button")) ? 'children' : '';
					this.changeToFamView(whichFamType, 'to');
				break;
				case 'arrows':
					const whichArrow = (btn.classList.contains("leftArrow_button")) ? 'left' : 'right';
					this.arrowFocus(whichArrow);
				break;
				case 'treeNode':
					if ((btn.tagName == "circle") || (btn.tagName == "image") || (btn.tagName == "path")) {
						btn = btn.parentElement;
					}
					const nodeLetter = btn.id.replace("_circleGrp", "");
					
					const nodeObj = NODEdetails.nodeList[nodeLetter];
					if (nodeObj.tagType != 'focus'){
						this.shiftFocus(nodeObj);
					} 
				break;
			}
			setTimeout(()=> {this.changingTreeView = false;}, 1500);
		}
	}
	
	changeToFamView(type, toFrom){
		switch (toFrom){
			case 'to':
				const currentFocus = NODEdetails.getNodeObj('focus');
				famView.animateToFamView(currentFocus, type);	
			break;
			case 'from':
			break;			
		}
	}
	
	famView_changeFocus(event){
		let clickedCircleGrp = event.target;
		if ((clickedCircleGrp.tagName == "circle") || (clickedCircleGrp.tagName == "image") || (clickedCircleGrp.tagName == "path")) {
			clickedCircleGrp = clickedCircleGrp.parentElement;
		}
		
		const famViewSVG = document.getElementById("famViewSVG");
		const allHightlightGrps = famViewSVG.querySelectorAll(".focusHighlightGrp");
		
		for (const hlt of allHightlightGrps){
			if (hlt.classList.contains("focusHLT")) hlt.classList.remove("focusHLT");
		}		
		
		const clickedContainer = $(clickedCircleGrp).parents(".nodeGrpContainer")[0];
		
		var clickedId = clickedContainer.id;
		let clickedPerson;
		if (clickedId.search("famView_childNode_") != -1)
			clickedPerson = clickedId.replace("famView_childNode_", "");
		else if (clickedId.search("famView_spouseNode_") != -1)
			clickedPerson = clickedId.replace("famView_spouseNode_", "");
		else if (clickedId.search("famView_siblingNode_") != -1)
			clickedPerson = clickedId.replace("famView_siblingNode_", "");
		else if (clickedId.search("famView_parentNode_") != -1)
			clickedPerson = clickedId.replace("famView_parentNode_", "");
		else if (clickedId.search("famView_focusNode_") != -1)
			clickedPerson = clickedId.replace("famView_focusNode_", "");
		else 
			console.log("Error: famView change focus - famView_Xnode tag not right...");
		const clickedPersonFam = findPersonsFamily(clickedPerson);

		clickedContainer.querySelector(".focusHighlightGrp").classList.add("focusHLT");
		
		
		
		changeGlobalFocus(clickedPersonFam, clickedPerson);		
	}
	
	arrowFocus(direction){
		const shiftTag = (direction == 'left') ? 'focusChild' : 'focusParent';
		const shiftObjLetter = NODEdetails.nodeLetterTags[shiftTag];
		const nodeObj = NODEdetails.nodeList[shiftObjLetter];
		nodeObj.nodeShift(direction, shiftTag);		
	}
	
	shiftFocus(newFocusObj){
		//direction right => nodes moving left
		const direction = ( (newFocusObj.tagType == 'focusParent') || (newFocusObj.tagType == 'focusParentS') ) ? 'right' : (newFocusObj.tagType == 'focusChild') ? 'left' : '';
		
		newFocusObj.nodeShift(direction, newFocusObj.tagType);		
	}
	
	newFocus(personName, famName, tabChange = false){
		//from person click
		if (!tabChange)
			changeGlobalFocus(famName, personName, "treeSVG");
		
		
		const famViewBool = (document.getElementById("famViewSVG").children.length == 0) ? false : true;
		
		//if first click, initialise
		if ( (!this.svgDiv.querySelector(".nodeCircleGrp") && (!famViewBool)) ){		
			tree.initialiseNodes(personName, famName);
		} else if (famViewBool) {
			tree.famView_backToTree();
		} else {
			const isPersonAdjacent = NODEdetails.isPersonAdjacent(personName);
			
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
				break;
				default: 
					tree.reInitialiseNodes(personName, famName);	
				break;
			}
		}	
	}
	
}

function changeGlobalFocus(personFam, personName, source = false){	
	console.log("New Global Focus: " + personFam + ", " + personName );
	if (source == "treeSVG"){
		//console.log("changing global focus1 to " + personName);
		NODEdetails.updateFocus({'personTag': personName, 'famName': personFam});		
		imgOpenTab.changeFocus(personName);
		
	} else if (source == "imgsOnly"){
		//console.log("changing global focus2 to " + personName);
		imgOpenTab.changeFocus(personName);
	} else {
		//console.log("changing global focus3 to " + personName);
		NODEdetails.updateFocus({'personTag': personName, 'famName': personFam});
		
		infoTab.fillPersonInfo(personFam, personName);
		treeInfoTab.fillPersonInfo(personFam, personName);
		
		imgOpenTab.changeFocus(personName);
	}
	
}
/* -------------------- */

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
const treeChange 	= new treeChangeEvents(document.getElementById('svgDiv'));
const tree 		= new treeSVG(document.getElementById('mainSVG'));
const famView 	= new treeSVG(document.getElementById('famViewSVG'));
const imgOpenTab	= new imgTab();
const imgGalleryObj	= new imgGallery();

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