
/* -------------------- */
/* --- full tree tab --- */
class fullTreeSVG {
	constructor(){
		this.fullTreeDiv = document.getElementById('fullTreeDiv');
		this.svgElem = document.getElementById('fullTreeSVG');
		this.panzoomDiv = document.getElementById('fullTreePanzoom');
		this.resetBtn = this.fullTreeDiv.querySelector('.resetTree');
		
		this.createPanzoom();
		//this.createSVG();
		
		this.svgTransition = false;
	}
	
	createPanzoom(){
		this.panzoom = Panzoom(this.panzoomDiv, {
			minScale: 0.5,
			maxScale: 5,		
			startX: '0',
			startY: '0',
			startScale: 1,
			
			increment: 0.05,
			
			canvas: true,
			//excludeClass: 'personClickGuide'
			
		});
		//this.panzoom.pan(10, 10);
		//this.panzoom.zoom(2, { animate: true });

		
		this.panzoomDiv.parentElement.addEventListener('wheel', this.panzoom.zoomWithWheel);	
		this.resetBtn.addEventListener("click", (evnt) => {console.log(this.panzoom); this.panzoom.reset});
	
		this.svgElem.setAttribute("viewBox", "-500 -300 1000 600");
	}
	
	changeSVG(val){
		console.log(val);
		this.removeSVG();
		if (this.svgTransition == false){
			if ((val != '0')&&(val == 'Kesby')){
				this.svgTransition = true;
				
				this.createSVG(val);
				
				
				setTimeout(()=> {
					this.svgTransition = false;
				}, 4000);
			} else {
				//console.log("No SVG for this");
			}
		}	
		
	}
	
	removeSVG(){
		console.log("Here");
		if (this.svgElem.style.display != 'none'){
			animateGrpEnterExit(this.svgElem, 'exit');
			
			setTimeout(()=> {this.svgElem.style.display = 'none';}, 2000);
		}
	}
	
	createSVG(famName){	
		this.svgElem.style.display = 'block';
		setTimeout(()=> {
			
			let rootPerson = famDataInfoObj.rootPeople[famName];
			let rootNode = new fullTree_node(rootPerson, famName, {'x': 0, 'y': 0});
			
			this.formTreeFromRoot(rootPerson, famName);
			animateGrpEnterExit(this.svgElem, 'enter');
			
		}, 2000);		
	}
	
	formTreeFromRoot(rootPerson, famName){
		
	}
	
}

class fullTree_node {
	constructor( personTag, familyName, position){
		this.personTag = personTag;
		this.familyName = familyName;
		this.position = position;
		this.svgElem = document.getElementById('fullTreeSVG');
		
		this.personInfo = PEOPLEINFO[this.familyName][this.personTag] ?? {};		
		this.personData = PEOPLERELATIONS[this.familyName][this.personTag] ?? {};
		
		this.createCircle();
	}
	
	createCircle(){	
		this.nodeGrpContainer = new createNewElement('g', {
			'class': 'fullTree_nodeGrpContainer',
			'id': this.personTag + '_fullTree_nodeGrpContainer',
			//'style': 'transform: translateX(' + startXY.x + isPx + ') translateY(' + startXY.y + isPx + '); opacity: '+ nodeOpacity,
		});	
		this.nodeGrp = new createNewElement('g', {
			'class': 'fullTree_nodeGrp',
			'id': this.personTag + '_fullTree_nodeGrp',
			//'style': 'transform: scale(' + nodeScale + ')',
		});
		this.nodeGrpContainer.appendChild(this.nodeGrp);
		this.svgElem.appendChild(this.nodeGrpContainer);
		this.circleGrp = new nodeCircle(this.nodeGrp).createCircle(this.personTag);		
		
		if (this.personInfo.imgIcon)
			this.addNodeImg();
			
		this.createLabels();
	}
	
	createLabels(){
		let dateLabelD = fullRoundedRect(-52, 35, 110, 25, 10);
		const labelGrp = new createNewElement('g', {
			'class': 'nodeLabelGrp',
			'x': 0, 'y': 0,
		});
		const labelDate = new createNewElement('path', {
			'class': 'nodeLabelDate',
			'd': dateLabelD,
			'fill': '#AB7878',
			'stroke': '#7D5656',
			'stroke-width': '2px',
			
		});
		const labelDateText = new createNewElement('text', {
			'class': 		'fullTree_dateTxt',
			'text-anchor': 	'middle',
			'font-family': 	"'Galada', 'Verdana', serif",
			'font-size': 	'20',
			'fill':	'#402828',
			'x': 	0,	
			'y': 	55,			
			'textContent': 	(this.personInfo.dates ?? ''),			
		});	
		this.nodeGrp.appendChild(labelGrp);
		labelGrp.appendChild(labelDate);
		labelGrp.appendChild(labelDateText);
		
		
		const labelNameText = new createNewElement('text', {
			'class': 		'fullTree_nameTxt',
			'text-anchor': 	'middle',
			'font-family': 	"'Galada', 'Verdana', serif",
			'font-size': 	'30',
			'fill':	'white',
			'stroke': '#FF928B',
			'stroke-width': '0.6px',
			'x': 	0,	
			'y': 	90,			
			'textContent': 	(this.personInfo.name ?? ''),			
		});	
		labelGrp.appendChild(labelNameText);
	}
	
	addNodeImg(){
		let folderHashNm = '9cc2af217cb06cfa5f99d4e0a7acb9fff0eaca91';
		let personImgIconURL =  '../' + folderHashNm + '/media/images/icons/' + this.personTag + '.png';
		
		const iconSize = 90;
		
		const icon = new createNewElement('image', {				
			'class': 'fullTree_personIcon',
			'x': -(iconSize/2),	'y': -(iconSize/2),
			'width': iconSize, 'height': iconSize,	
			'href': personImgIconURL,
		});
		
		this.iconImg = icon;			
		this.circleGrp.appendChild(icon);
		
	}

}

function fullRoundedRect(x, y, width, height, radius) {
  return "M" + x + "," + y
       + "h" + (width - radius)
       + "a" + radius + "," + radius + " 0 0 1 " +  radius + "," +  radius
       + "v" + (height - 2 * radius)
       + "a" + radius + "," + radius + " 0 0 1 " + -radius + "," +  radius
       + "h" + (radius - width)
       + "a" + radius + "," + radius + " 0 0 1 " + -radius + "," + -radius
       + "v" + (2 * radius - height)
       + "a" + radius + "," + radius + " 0 0 1 " +  radius + "," + -radius
       + "z";
}

/* -------------------- */
const fullTreeElem	= new fullTreeSVG();

/* -------------------- */