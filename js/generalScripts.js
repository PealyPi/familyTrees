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
		
		
		const newActive = btn;
		const newActiveID = btn.id;
		const newActiveDiv = document.getElementById(newActiveID + '_div');
		const newTabColor = newActiveID + "Colour";		
		
		newActive.classList.add("active");
		newActiveDiv.classList.add("active");
		navDiv.classList.add(newTabColor);
		
		
		const mainDiv = document.getElementById('mainDiv');
		const svgDiv = document.getElementById('svgDiv');
		const infoDiv = document.getElementById('infoDiv');
		const svg = document.getElementById("mainSVG");
		
		switch (newActiveID){
			case 'homeTab':				
				svgDiv.style.display = 'none';
				infoDiv.style.display = 'none';
				
			break;
			case 'treeTab':		
				svgDiv.style.display = 'block';
				if (svg.children.length == 0)
					createSVG();
				infoDiv.style.display = 'block';
			break;
			case 'infoTab':		
				svgDiv.style.display = 'none';
				infoDiv.style.display = 'block';
			break;
			case 'imgsTab':
				svgDiv.style.display = 'none';
				infoDiv.style.display = 'none';
			break;
			case 'pplTab':
			break;
			
		}
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
		'class': 		'personName',
		'text-anchor': 	'middle',
		'font-family': 	"'Josefin Sans', sans-serif",
		'font-size': 	'36px',
		'fill':	'white',
		'x': 	svgCenterPt.x,	
		'y': 	(svgCenterPt.y + 150),	
		
		'textContent': 	'Person Name',			
	});	
	svg.appendChild(personNameText);
	
	
}

function createLeafSVG() {
	const infoDiv = document.getElementById("infoDiv");
	const leafSVG = document.getElementById("leafSVG");
	
	const leafPaths = getLeafPathData();
	
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
		'style': 'fill:#CDEAC0; fill-opacity:0.75502;',
		'd': leafPaths.bottomLeaf_fill,
	});
	const bottomLeaf_outer = new createElement('path', {
		'id': 'bottomLeaf_outer', 
		'style': 'fill:#CDEAC0; fill-opacity:1;',
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
		'style': 'fill:#CDEAC0; fill-opacity:0.75502;',
		'd': leafPaths.topLeaf_fill,
	});
	const topLeaf_outer = new createElement('path', {
		'id': 'topLeaf_outer', 
		'style': 'fill:#CDEAC0; fill-opacity:1;',
		'd': leafPaths.topLeaf_outer,
	});
	leafSVG.appendChild(topLeafGRP);
	topLeafGRP.appendChild(topLeaf_fill);
	topLeafGRP.appendChild(topLeaf_outer);
	
}

/* -------------------- */

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
		tab.addEventListener("click", (btn) => navBar_openPage(btn));	
	}
	
	//infoDiv
	createLeafSVG();
	
});
/* ------------------------------------------------ */