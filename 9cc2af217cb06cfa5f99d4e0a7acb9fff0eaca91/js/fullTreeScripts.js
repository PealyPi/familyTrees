
/* -------------------- */
/* --- full tree tab --- */
class fullTrees {
	constructor(){
		this.svgTransition = false;
		
		this.fullTreeArray = {};
		this.currentActiveTree = 'none';
	}
	
	changeSVG(val){
		if (this.svgTransition == false){
			
			var timeoutVal = 0;
			//hide current active svg
			if (this.currentActiveTree != 'none'){
				animateGrpEnterExit(this.currentActiveTree, 'exit');
				setTimeout(()=> {
					this.currentActiveTree.style.display = 'none';
				}, 2000);
				timeoutVal = 2000;
			}
			
			//show new svg
			if (val != 0){
				setTimeout(()=> {
					let selectedSVGobj = this.fullTreeArray[val.toLowerCase()];
					let showTreeSVG = selectedSVGobj.svgElem;
					if (!selectedSVGobj.isConstructed){
						selectedSVGobj.initialiseTree();
					}
					
					//reset panzoom
					
					
					selectedSVGobj.svgElem.style.display = 'block';
					animateGrpEnterExit(showTreeSVG, 'enter');
					this.currentActiveTree = showTreeSVG;					
				}, timeoutVal);		
				
			} else {
				this.currentActiveTree = 'none';
			}	
			
			setTimeout(()=> {
				this.svgTransition = false;
			}, 4000);			
		}	
		
	}
}

class fullTreeSVG {
	constructor(whichFam){
		this.fullTreeDiv = document.getElementById('fullTreeDiv');
		this.svgElem = document.getElementById('fullTree_' + whichFam);
		this.panzoomDiv = document.getElementById('fullTreePanzoom');
		this.resetBtn = this.fullTreeDiv.querySelector('.resetTree');
		
		this.fam = whichFam;		
		this.famData = PEOPLERELATIONS[whichFam];		
		
		this.createPanzoom();
		fullTreesObj.fullTreeArray[whichFam] = this;

		this.distanceFromRoot = {'xNeg': 0, 'xPos': 0, 'y': 0};	
		
		
		this.isConstructed = false;
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
	
	}
	
	initialiseTree(){	
		let rootPerson = famDataInfoObj.rootPeople[this.fam];
		let rootNode = new fullTree_node(this.svgElem, rootPerson, this.fam, {'x': 0, 'y': 0});		
		
		this.nodeWidth = 2*rootNode.circleRadius;
		this.nodeHeight = this.nodeWidth + 100;
		this.siblingSpacing = 100;
		this.relativeLineHeight = 25;
		this.parentLineHeight = this.nodeHeight + 25;
		
		this.formTreeFromRoot(rootNode);
		
		//change svg dimensions too fit
		let viewBoxWidth = 1000 + this.distanceFromRoot.xNeg + this.distanceFromRoot.xPos;
		let viewBoxHeight = 1000 + this.distanceFromRoot.y;
		let largerViewBoxDim = (viewBoxWidth >= viewBoxHeight) ? viewBoxWidth : viewBoxHeight;
		let viewBoxArray = [(-1*(largerViewBoxDim/2)), (-largerViewBoxDim+100), largerViewBoxDim, largerViewBoxDim];
		this.svgElem.setAttribute("viewBox", viewBoxArray.join(" "));
		
		
		this.isConstructed = true;
	}
	
	formTreeFromRoot(rootNode){	
		let siblingNodeData = this.generateSiblingNodes(rootNode, 'left');
		console.log(siblingNodeData);
		this.generateParentNode(rootNode, 'main', {'x': siblingNodeData.parentLpos, 'y': -1*(this.parentLineHeight + 50)});
		this.generateParentNode(rootNode, 'spouse', {'x': siblingNodeData.parentRpos, 'y': -1*(this.parentLineHeight + 50)});
	}
	
	generateSiblingNodes(personNode, leftRight){
		let siblingList = this.famData[personNode.personTag].siblings ?? [];
		
		let siblingDirection = (leftRight == 'left') ? -1 : 1;
		
		var lastSiblingPos = personNode.position;
		var siblingNodesArray = [];
		for (let sibling of siblingList){
			let newSibPos = {
				'x': lastSiblingPos.x + (siblingDirection * (this.siblingSpacing + this.nodeWidth)),
				'y': lastSiblingPos.y
			};
			let sibNode = new fullTree_node(personNode.nodeGrpContainer, sibling, this.fam, newSibPos);
			siblingNodesArray.push({
				'node': sibNode,
				'pos': newSibPos
			});
			
			lastSiblingPos = newSibPos;
		}
		
		let siblingNodeData = {
			'siblingList': siblingList,			
			'count': siblingList.length,
			'nodeArray': siblingNodesArray,
			
			'direction': siblingDirection,
			'firstPos': personNode.position,
			'lastPos': lastSiblingPos,
		};
		
		if (leftRight == 'left'){
			this.distanceFromRoot.xNeg = (-1*lastSiblingPos.x);
		} else {
			this.distanceFromRoot.xPos = lastSiblingPos.x;			
		}
		this.distanceFromRoot.y = (-1 * (this.parentLineHeight + this.relativeLineHeight));		
		
		this.generateSiblingLines(personNode, siblingNodeData);
		
		return siblingNodeData;
	}
	
	generateSiblingLines(personNode, siblingNodeData){
		let yPos = siblingNodeData.nodeArray[0].pos.y
		let siblingNodes = siblingNodeData.nodeArray;
		
		let personContainerChildren = Array.from(personNode.nodeGrpContainer.childNodes);
		var linesGrpCheck = false; var linesGrp;
		for (const containerChild of personContainerChildren){
			if (containerChild.classList.contains('fullTree_relationLines_GRP')){
				linesGrpCheck = true;
				linesGrp = containerChild;
			}
		}
		
		if (!linesGrpCheck){
			linesGrp = new createNewElement('g', {
				'class': 'fullTree_relationLines_GRP',
				'transform': 'translate(0 -' + (this.nodeWidth/2) + ')'
			});
			$(personNode.nodeGrpContainer).prepend(linesGrp);			
		}
		//lineAcross
		let lineAcrossDist = siblingNodeData.lastPos.x - siblingNodeData.firstPos.x;
		let lineAcrossPts = ['M', siblingNodeData.firstPos.x, (siblingNodeData.firstPos.y - this.relativeLineHeight), 'H', lineAcrossDist];
		this.createLines(linesGrp, lineAcrossPts, 'siblingAcross');
		
		//individual lines
		let personLinePoints = ['M', personNode.position.x, personNode.position.y, 'V', (-1 * this.relativeLineHeight)];			
		this.createLines(linesGrp, personLinePoints, 'sibling');
		
		for (const sibNode of siblingNodes){
			let sibLinePoints = ['M', sibNode.pos.x, sibNode.pos.y, 'V', (-1 * this.relativeLineHeight)];			
			this.createLines(linesGrp, sibLinePoints, 'sibling');
		}	
		
		//parentLineAcross
		let sibMidPointX = personNode.position.x - (siblingNodeData.direction * (lineAcrossDist/2));
		let parentLpoint = sibMidPointX - (this.siblingSpacing + this.nodeWidth)/2;
		
		let parentLineAcrossPoints = ['M', parentLpoint, (-1 * this.parentLineHeight), 'h', (this.siblingSpacing + this.nodeWidth)];			
		this.createLines(linesGrp, parentLineAcrossPoints, 'parentAcross');
		
		//lineUp
		let lineUpPoints = ['M', sibMidPointX, (-1 * this.relativeLineHeight), 'V', (-1 * this.parentLineHeight)];			
		this.createLines(linesGrp, lineUpPoints, 'parentUp');
		
		
		siblingNodeData.parentLpos = parentLpoint; 
		siblingNodeData.parentRpos = (parentLpoint + (this.siblingSpacing + this.nodeWidth));
	}
	
	createLines(container, points, type){ 		
		//points = ['M', startX, startY, 'H', distance]; / ['M', startX, startY, 'V', distance];
		var lineConfig, shadowDirection;
		const pathD = points.join(" ");
	
		lineConfig = {
			'fill': 'none',
			'stroke-width': 6,
			'stroke-linecap': 'round',		
			'd': pathD
		}
		shadowDirection = 'left';
		
		const shadowLineDefine = Object.assign({}, lineConfig, {
			'stroke': '#000',
			'stroke-opacity': 0.1,
		});
		
		const lineGrp = new createNewElement('g', {
			'class': 'fullTree_' + type + 'Line',	
		});
		const mainLine = new createNewElement('path', 
			Object.assign({}, lineConfig, {
				'stroke': '#FF928B'	
			})
		);
		const mainLineShadow1 = new createNewElement('path', shadowLineDefine);
		const mainLineShadow2 = new createNewElement('path', shadowLineDefine);
		
		$(container).prepend(lineGrp);
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
	
	generateParentNode(personNode, type, position){
		console.log(position);
		let parentDirection = (type == 'main') ? 'left' : 'right';
		
		let parentTag = (type == 'main') ? this.famData[personNode.personTag].parentMain : this.famData[personNode.personTag].parentSpouse;
		let parentNode = new fullTree_node(personNode.nodeGrpContainer, parentTag, this.fam, position);	
		
		let siblingNodeData = this.generateSiblingNodes(parentNode, parentDirection);
	//	this.generateParentNode(personNode, 'main', siblingNodeData.parentLpos);
	//	this.generateParentNode(personNode, 'spouse', siblingNodeData.parentRpos);
	}
	
}

class fullTree_node {
	constructor(nestingContainer, personTag, familyName, position){
		this.personTag = personTag;
		this.familyName = familyName;
		this.position = position;
		this.svgElem = nestingContainer;
		
		this.personInfo = PEOPLEINFO[this.familyName][this.personTag] ?? {};		
		this.personData = PEOPLERELATIONS[this.familyName][this.personTag] ?? {};
		
		this.createCircle();
	}
	
	createCircle(){	
		this.nodeGrpContainer = new createNewElement('g', {
			'class': 'fullTree_nodeGrpContainer',
			'id': this.personTag + '_fullTree_nodeGrpContainer',
			'style': 'transform: translate(' + this.position.x + 'px, ' + this.position.y + 'px);',
		});	
		this.nodeGrp = new createNewElement('g', {
			'class': 'fullTree_nodeGrp',
			'id': this.personTag + '_fullTree_nodeGrp',
		});
		this.nodeGrpContainer.appendChild(this.nodeGrp);
		this.svgElem.appendChild(this.nodeGrpContainer);
		
		let nodeCircleObj = new nodeCircle(this.nodeGrp);
		this.circleGrp = nodeCircleObj.createCircle(this.personTag);	

		this.circleRadius = nodeCircleObj.circleRadius;
		
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
		
		let personName = this.personInfo.name ?? '';
		
		var labelNameText;		
		if (personName.length < 14){
			labelNameText = new createNewElement('text', {
				'class': 		'fullTree_nameTxt',
				'text-anchor': 	'middle',
				'font-family': 	"'Galada', 'Verdana', serif",
				'font-size': 	30,
				'fill':	'white',
				'stroke': '#FF928B',
				'stroke-width': '0.6px',
				'x': 	0,	
				'y': 	90,			
				'textContent': 	personName,			
			});	
		} else {
			let nameArray = personName.match(/(.{1,13})(?:\s|$)/g);				
			
			labelNameText = new createNewElement('text', {
				'class': 		'fullTree_nameTxt',
				'text-anchor': 	'middle',
				'font-family': 	"'Galada', 'Verdana', serif",
				'font-size': 	28,
				'fill':	'white',
				'stroke': '#FF928B',
				'stroke-width': '0.6px',
				'x': 	0,	
				'y': 	90,				
			});	
			for (let nameLine of nameArray){
				const dyVal = (nameLine == nameArray[0]) ? "0em" : "1.2em";
				
				const nameTextLine = new createNewElement('tspan', {
					'class': 'fullTree_nameTxtSpan',
					'x': 	0,
					'dy':	dyVal,
					'textContent': 	nameLine ?? '',					
				});	
				labelNameText.appendChild(nameTextLine);
			}
		}
		
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

function changeFullTreeSVG(val){
	
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
const fullTreesObj	= new fullTrees();
const fullTreeElem_kesby	= new fullTreeSVG('kesby');
const fullTreeElem_hadkiss	= new fullTreeSVG('hadkiss');

/* -------------------- */