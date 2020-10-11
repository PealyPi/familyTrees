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
		
		
		const newActiveID = btn.id;
		const newActive = btn;
		const newActiveDiv = document.getElementById(newActiveID + '_div');
		const newTabColor = newActiveID + "Colour";		
		
		newActive.classList.add("active");
		newActiveDiv.classList.add("active");
		navDiv.classList.add(newTabColor);
		
	}
	
	
	
}


/* -------------------- */




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
});
/* ------------------------------------------------ */