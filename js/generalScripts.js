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

/* -------------------- */




/* ------ Run on Page Load -------- */
$(document).ready(function(){	
	loader_onReady(function() {
		mask_setVisible('.loading-mask', false);
	});
	
});
/* ------------------------------------------------ */