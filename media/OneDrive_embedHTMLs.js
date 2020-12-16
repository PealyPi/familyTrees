/* ============================================================ */
/* ===                 Person Image Links                  === */
/*         				*/
/* ============================================================ */
function pplImageLinks(imgArray = false){//collapse lvl 2
	
	//kesby
	let linkStartString = 'https://db3pap003files.storage.live.com/';
	var allImgs = [
		/*{	'imgRef':	'quickref, tagNameFolder/tagName#.jpg',
			'imgLink': linkStartString + '',
			'imgConfig': {
				'transform': {'x': 0, 'y': 0},
				'width': 120,
			},
			'tags': {
				//'year': ''
				//'place': 
				//'title': '',
				'people': [''],
			}
		},*/		
		{	'imgRef':	'ron & rose hadkiss, roseHadkiss/roseHadkiss4.jpg',
			'imgLink': linkStartString + 'y4mcpObZD09Lfdb76aVA0h_kUcXmIthWy9JSd0L_AI9EoFivjP2yKf8UcFJEJwAoYnGstst-koEKnR5DaTf8V-8pzVGOmk7bLt3e_duF74L5O8IJz_Dm279-FrtCyv5MPi8OYj04u7SV9O6oqH5MUZpNKj2kFoKIfuLJjdoXh4TPVKhRT-duylXCZC47iQQSVvG?width=965&height=842&cropmode=none',
			'imgConfig': {
				'transform': {'x': 10, 'y': 10},
				'width': 120,
			},
			'tags': {
				//'year': ''
				//'place': 
				//'title': '',
				'people': ['roseHadkiss', 'ronHadkiss'],
			}
		},
		{	'imgRef':	'beachFamilyPhoto, roseHadkiss/roseHadkiss5.jpg',
			'imgLink': linkStartString + 'y4mAyk_N_niHpVsPEufdR3PjdgTwDkP9lFlGxhyIp5QXA9FKMaJQTGgSASrgRkAv7VSvl1W1TB8zZ-oFOi4SX9H8yBCo5AjhCzfa9abll8kqtQc2gPb8cuR6vCuDCj62AaZMWWVhU7LFAXyadHw2Q4aRLUp_OonkskBr6FyXjiONXrB_8w1SnNYP4C1lqhLq9Ag?width=1478&height=2089&cropmode=none',
			'imgConfig': {
				'transform': {'x': 10, 'y': -20},
				'width': 120,
			},
			'tags': {
				//'year': ''
				//'place': 
				'title': 'Kesby Beach Family Photo',
				'people': ['roseHadkiss', 'johnNevilleKesby', 'jackKesby'],
			}
		},
		{	'imgRef':	'roseWork factory, roseHadkiss/roseHadkiss3.jpg',
			'imgLink': linkStartString + 'y4msqbnMSUVgC4kYOAw_ZWiFkGNnAsJSkMEcvdlGafdUOUPKwUkDABPqVbCEst3KOiYY8uvsIP-TnmRNa8Kju91BdzPgiiR22sr-ArSJu0GLlnAP7LRx3ZsrXvNpw9jzUnvMJQWbVLVa8QJL9WfzSKQZx-ye2X-mqIbRM5ssBUts_bhwEm2Qs6jACmAChKcJYKq?width=1312&height=1881&cropmode=none',
			'imgConfig': {
				'transform': {'x': 0, 'y': 0},
				'width': 160,
			},
			'tags': {
				//'year': ''
				//'place': 
				'title': 'Rose Kesby at the Factory',
				'people': ['roseHadkiss'],
			}
		},
		{	'imgRef':	'rose&ron 1951 beach trip, roseHadkiss/roseHadkiss2.jpg',
			'imgLink': linkStartString + 'y4mYpdRKGVJEE4VpoeQWd6YpknLvuL30ENveCXBIFqrUHl8uBJXxxdw98Qf8WLpMt05WdD5qGfVihX-ILVdyReN5QC-p49ZYIsP9X_U1hC5O3oiHkrg00HlqXw5PPGmXdmCcELd_bHuB0cx7lCat_HC-4c7pQn6d6F2qYZ8GW-OrPonzh3eHZ8Z1-iNZL1JEVIr?width=1388&height=1426&cropmode=none',
			'imgConfig': {
				'transform': {'x': -10, 'y': 0},
				'width': 160,
			},
			'tags': {
				//'year': ''
				//'place': 
				//'title': '',
				'people': ['roseHadkiss', 'ronHadkiss'],
			}
		},
		
		
	]
	
	var allPeoplesImgs = {};
	
	for (const img of allImgs){
		let peopleArray = img.tags.people;
		for (const person of peopleArray){
			let personObjBool = allPeoplesImgs.hasOwnProperty(person);
			if (!personObjBool)
				allPeoplesImgs[person] = [];
			
			allPeoplesImgs[person].push(img);
		}
	}
	console.log(allPeoplesImgs);
	
	
	if (imgArray)
		return allImgs;
	else	
		return allPeoplesImgs;
}

/* ------------------------------------------------ */