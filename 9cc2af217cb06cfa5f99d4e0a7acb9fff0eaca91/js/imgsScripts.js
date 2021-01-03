
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
			
			if ( (personObj[personTag].left == 0) && (personObj[personTag].top == 0) ){
				personCircle.classList.add("todo");
			}
			
		}
		
		
		this.fillWoodInfo(imageObj);
		
	}
	
	
	circleClickEvnt(evnt){	
		if (!this.transitioning){
			this.transitioning = true;
			const clickedCircleDiv = event.target;
			let circleId = clickedCircleDiv.id;
			const personClicked = circleId.replace("_circleTag", "");
		
			let personFam = famDataInfoObj.findPersonsFamily(personClicked);
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
		
			let personFam = famDataInfoObj.findPersonsFamily(personClicked);
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
			gutter: 2,
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
			this.galleryOrder(imgArray);
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
					if (roundedDivide > 1.6)
						gridImgDiv.classList.add("grid-item--width3");
					else 
						gridImgDiv.classList.add("grid-item--width2");
					
				} else if (imgHeight > imgWidth){
					imgOrientation = 'portrait';
					//portrait
					if (roundedDivide > 1.6)
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
		
		this.galleryOrder(this.imageObjsArray);
	}
	
	galleryOrder(imageObjsArray){
		
		for (const imgObj of imageObjsArray){
			//check orientation, and if fits in row...
			
			//add orientation tag to obj
			//imag = {'imgRef': ..., 'tags': {...}}
			
			
		}
	}
	
	shuffleGallery(){
		var gridItemArray = [];
		for (const gridItem of Array.from(this.grid.childNodes)){
			gridItemArray.push(gridItem);
			gridItem.remove();	
		}
		
		shuffle(gridItemArray);
		for (const dupGridItem of gridItemArray){
			this.grid.appendChild(dupGridItem);
			this.msnry.prepended(dupGridItem);
		}		
		this.msnry.layout();
		
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


const imgOpenTab	= new imgTab();
const imgGalleryObj	= new imgGallery();
/* -------------------- */