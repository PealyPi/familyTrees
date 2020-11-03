/* ============================================================ */
/* ===                    Custom Scripts                    === */
/* ============================================================ */
/* preload info /relations data */
var PEOPLEINFO = personInfoStorage();
var PEOPLERELATIONS = nodeDataStorage();

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
			
			//hide all				
			switch (newActiveID){
				case 'homeTab':		
					this.hideAllSects('');
				break;
				case 'treeTab':		
					this.hideAllSects(this.svgDiv);
					this.showSect(this.svgDiv);
					if ((!famViewBool) && (NODEdetails.currentFocus != ''))
						treeChange.newFocus(NODEdetails.currentFocus.personTag, NODEdetails.currentFocus.famName);	
				break;
				case 'infoTab':	
					this.hideAllSects(this.infoDiv);
					this.showSect(this.infoDiv);
				break;
				case 'imgsTab':
					this.hideAllSects(this.imgsDiv);
					this.showSect(this.imgsDiv);
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
				
				
				if (!personData.mainLine){
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
			
			infoTab.fillPersonInfo(famName, personTag);
			treeInfoTab.fillPersonInfo(famName, personTag);
			NODEdetails.updateFocus({'personTag': personTag, 'famName': famName});
			
			//if page != info/tree, go to tree...		
			const navDiv = document.querySelector('.top_navbar');		
			const currentActive = navDiv.querySelector('.navTab.active');
			const treeBtn = navDiv.querySelector('#treeTab');
			
			const famViewBool = (document.getElementById("famViewSVG").children.length == 0) ? false : true;
		
			if (famViewBool){
				if ((currentActive.id == "treeTab")){
					tree.famView_backToTree();
					
				} else if ((currentActive.id == "infoTab")){
					tree.famView_backToTree();	
					treeChange.newFocus(personTag, famName);
					
				} else {
					tree.famView_backToTree();	
					navObj.openPage(treeBtn);	
				}
				
			} else {
				if ((currentActive.id == "treeTab") || (currentActive.id == "infoTab")){
					treeChange.newFocus(personTag, famName);	
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
			document.getElementById('infoDiv');
		this.infoDivSec = this.infoDiv.querySelector(".infoDivSec");
		this.infoDivMain = this.infoDivSec.querySelector(".infoMain");
		
		this.leafImgSlideshow = null;
		
		this.createInfoDivs(type);
		
		this.infoData = this.infoDivSec.querySelectorAll(".infoData");
		
		this._fillingInfo = false;
	}
	
	createInfoDivs(type){	
		const navDiv = navObj.navDiv;
		const activeTabBtn = navObj.activeBtn;
		const treeTabBtn = navObj.treeBtn;
		
		this.createLeafSVG();
		
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
		
		const datesDiv = document.createElement("div");
		this.datesDiv = datesDiv;
		datesDiv.classList.add('infoData');
		datesDiv.classList.add('info_dates');
		containerDiv.appendChild(datesDiv);
		
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

	leafImgSlides(startStop, fn = false){
		switch (startStop){
			case 'start':					
				if (!this.leafImgSlideshow)
					this.leafImgSlideshow = setInterval( fn, 10000);	
			break;
			
			case 'stop':
				if (this.leafImgSlideshow)
					clearInterval(this.leafImgSlideshow);
			break;
		}
	}
	
	fillPersonInfo(famName, personName) {
		const famInfo = PEOPLEINFO[famName] ?? {};
		const personInfo = famInfo[personName] ?? {};
		const personRelationsData = PEOPLERELATIONS[famName][personName] ?? {};		
		
		const infoDivMain = this.infoDivMain;
		const nameDiv = infoDivMain.querySelector(".info_name");
		const datesDiv = infoDivMain.querySelector(".info_dates");
		
		const leafSVG = this.leafSVG;	
		const thisType = this.type;
		
		if (!this._fillingInfo){
			this._fillingInfo = true;
			
			if (personName == '')
				this.clearInfo();	
				
			else {		
				if (this.containerDiv.style.display == "block"){
					if (leafSVG.style.display != "none"){
						$(leafSVG).fadeOut(1000);
					}
					const thisObj = this;
					$([this.containerDiv, this.infoAboutDiv]).fadeOut(1000, function(){
						thisObj.clearInfo();
						fillInfo();							
					});	
					
					setTimeout(() => {this.extendDivAndShow(personInfo.hasOwnProperty('about'), personInfo.about ?? '')}, 1200);	
				} else {
					//first fill		
					this.clearInfo();
					fillInfo();	
					this.extendDivAndShow(personInfo.hasOwnProperty('about'), personInfo.about ?? '');
					
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
		
		function fillInfo(){
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
						varSpan.setAttribute("id", "relative_" + famName + "_" + relative);
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
						varSpan.addEventListener("click", (evnt) => pplTab.openPerson(evnt, true));
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
				const clipPathURL = 'url(#' + thisType +  '_topLeaf_clipPath)';
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
					infoTab.leafImgSlides('start', leafImgFades)
				}, 500);
				
				//fade in leaf
				$(leafSVG).fadeIn(1000);
			}
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
				slot.innerHTML = '';					
				if (!slot.classList.contains("marriedToVal")){
					slot.appendChild(childNode);					
				}
			} else {
				slot.innerHTML = '';				
			}
		}		
		
		//clear svgleaf imgs	
		this.leafImgSlides('stop');				
		
		const leafGrp = this.leafSVG.querySelector("#topLeaf_GRP")
		const allOldImgs = this.leafSVG.getElementsByTagName("image");
		
		if (allOldImgs.length > 0){
			for (var i = 0; i < allOldImgs.length; i++){
				leafGrp.removeChild(allOldImgs[i]);
			}
		}
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
					//tree.showHideButtons('show', tagChecks[check]);	//isSibling
					tree.showHideButtons('hide', tagChecks[check]);
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
		
	
		
		if ( (this.personInfo.imgs) && (this.personInfo.imgs[0].icon) ){
			if (this.iconImg)			
				this.iconImg.setAttribute('href', this.personInfo.imgs[0].icon);
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
		
		if (personInfo.hasOwnProperty("imgs"))
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
		const iconImg = this.personInfo.imgs[0];
		const iconUrl = iconImg.icon ?? false;
		
		const iconSize = 90;
		if (iconUrl){
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
				'href': iconUrl,
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
				NODEdetails.updateFocus({'personTag': this.personTag, 'famName': this.famName});
				infoTab.fillPersonInfo(this.famName, this.personTag);
				treeInfoTab.fillPersonInfo(this.famName, this.personTag);
				
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
				infoTab.fillPersonInfo(this.famName, this.personTag);
				treeInfoTab.fillPersonInfo(this.famName, this.personTag);
				
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
			const mainLineGrp = this.createLines(this.svgElem, 'mainLine', ['m', -10, (svgCenterPt.y - 70), 'h', pageWidth]);
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
		
		const famIcon_button = 	this.svgDiv.querySelectorAll(".famIcon");
		const arrowBtn_button = this.svgDiv.querySelectorAll(".arrowBtn");	
		const zoomBtn_button = 	this.svgDiv.querySelectorAll(".zoomBtn");
		
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
		if (type == 'children'){
			spouse = focusObj.personData.spouse;
			childList = focusObj.personData.children;
			
		} else {
			spouse = focusObj.personData.parentSpouse;
			childList = focusObj.personData.siblings ?? [];
			childList.unshift(focusObj.personTag);
			parentMain = focusObj.personData.parentMain;	

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
		
		NODEdetails.updateFocus({'personTag': clickedPerson, 'famName': clickedPersonFam});
		//update info
		
		infoTab.fillPersonInfo(clickedPersonFam, clickedPerson);
		treeInfoTab.fillPersonInfo(clickedPersonFam, clickedPerson);
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
	
	newFocus(personName, famName){
		//from person click
		const personData = PEOPLERELATIONS[famName][personName];
		NODEdetails.updateFocus({'personTag': personName, 'famName':famName});	
		
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
