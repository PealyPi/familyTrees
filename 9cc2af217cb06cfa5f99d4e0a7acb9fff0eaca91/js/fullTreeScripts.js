
/* -------------------- */
/* --- full tree tab --- */
class fullTreeSVG {
	constructor(){
		this.fullTreeDiv = document.getElementById('fullTreeDiv');
		this.svgElem = document.getElementById('fullTreeSVG');
		this.panzoomDiv = document.getElementById('fullTreePanzoom');
		this.resetBtn = this.fullTreeDiv.querySelector('.resetTree');
		
		this.createPanzoom();
		this.createSVGNodes();
	}
	
	createPanzoom(){
		this.panzoom = Panzoom(this.panzoomDiv, {
			minScale: 0.5,
			maxScale: 5,		
			startX: '0px',
			startY: '0px',
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
	
	createSVGNodes(){
		let circleTest = createNewElement('circle',{
			'class': 'circleTest',
			'fill': 'black',
			'r': '30px',
			'cx': '100px',
			'cy': '100px'
		});
		this.svgElem.appendChild(circleTest);
	}
}

/* -------------------- */
const fullTreeElem	= new fullTreeSVG();

/* -------------------- */