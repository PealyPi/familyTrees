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
			'imgLeafConfig': {
				'transform': {'x': 0, 'y': 0},
				'width': 120,
			},
			'tags': {
				//'title': '',
				//'year': '',
				//'place': '',
				'people': [''],
				'peoplePositions': [{'personTag': {'left': 0, 'top': 0}}],
			}
		},*/		
		{	'imgRef':	'ron & rose hadkiss beachtrip2, roseHadkiss/roseHadkiss4.jpg',
			'imgLink': linkStartString + 'y4mcpObZD09Lfdb76aVA0h_kUcXmIthWy9JSd0L_AI9EoFivjP2yKf8UcFJEJwAoYnGstst-koEKnR5DaTf8V-8pzVGOmk7bLt3e_duF74L5O8IJz_Dm279-FrtCyv5MPi8OYj04u7SV9O6oqH5MUZpNKj2kFoKIfuLJjdoXh4TPVKhRT-duylXCZC47iQQSVvG?width=965&height=842&cropmode=none',
			'imgLeafConfig': {
				'transform': {'x': 10, 'y': 10},
				'width': 120,
			},
			'tags': {
				//'title': '',
				//'year': ''
				//'place': 
				'people': [
					{'roseHadkiss': {'left': 166, 'top': 30, 'size': 'large'}},
					{'ronHadkiss': {'left': 58, 'top': 4, 'size': 'large'}},
				],
			}
		},
		{	'imgRef':	'beachFamilyPhoto, roseHadkiss/roseHadkiss5.jpg',
			'imgLink': linkStartString + 'y4mAyk_N_niHpVsPEufdR3PjdgTwDkP9lFlGxhyIp5QXA9FKMaJQTGgSASrgRkAv7VSvl1W1TB8zZ-oFOi4SX9H8yBCo5AjhCzfa9abll8kqtQc2gPb8cuR6vCuDCj62AaZMWWVhU7LFAXyadHw2Q4aRLUp_OonkskBr6FyXjiONXrB_8w1SnNYP4C1lqhLq9Ag?width=1478&height=2089&cropmode=none',
			'imgLeafConfig': {
				'transform': {'x': 10, 'y': -20},
				'width': 120,
			},
			'tags': {
				'title': 'Kesby Beach Family Photo',
				//'year': ''
				//'place': 
				'people': [
					{'roseHadkiss': {'left': 36, 'top': 148}},
					{'johnNevilleKesby': {'left': 97, 'top': 95}},
					{'jackKesby': {'left': 215, 'top': 138}},
				],
			}
		},
		{	'imgRef':	'roseWork factory, roseHadkiss/roseHadkiss3.jpg',
			'imgLink': linkStartString + 'y4msqbnMSUVgC4kYOAw_ZWiFkGNnAsJSkMEcvdlGafdUOUPKwUkDABPqVbCEst3KOiYY8uvsIP-TnmRNa8Kju91BdzPgiiR22sr-ArSJu0GLlnAP7LRx3ZsrXvNpw9jzUnvMJQWbVLVa8QJL9WfzSKQZx-ye2X-mqIbRM5ssBUts_bhwEm2Qs6jACmAChKcJYKq?width=1312&height=1881&cropmode=none',
			'imgLeafConfig': {
				'transform': {'x': 5, 'y': 5},
				'width': 140,
			},
			'tags': {
				'title': 'Rose Kesby at the Factory',
				//'year': ''
				//'place': 
				'people': [{'roseHadkiss': {'left': 110, 'top': 40}}],
			}
		},
		{	'imgRef':	'rose&ron 1951 beach trip, roseHadkiss/roseHadkiss2.jpg',
			'imgLink': linkStartString + 'y4mYpdRKGVJEE4VpoeQWd6YpknLvuL30ENveCXBIFqrUHl8uBJXxxdw98Qf8WLpMt05WdD5qGfVihX-ILVdyReN5QC-p49ZYIsP9X_U1hC5O3oiHkrg00HlqXw5PPGmXdmCcELd_bHuB0cx7lCat_HC-4c7pQn6d6F2qYZ8GW-OrPonzh3eHZ8Z1-iNZL1JEVIr?width=1388&height=1426&cropmode=none',
			'imgLeafConfig': {
				'transform': {'x': -10, 'y': 0},
				'width': 160,
			},
			'tags': {
				//'title': '',
				//'year': ''
				//'place': 
				'people': [
					{'roseHadkiss': {'left': 169, 'top': 55, 'size': 'small'}},
					{'ronHadkiss': {'left': 118, 'top': 31, 'size': 'small'}},
				],
			}
		},
		{	'imgRef':	'rose devon ship, roseHadkiss/roseHadkiss6.jpg',
			'imgLink': linkStartString + 'y4maxrzHLIuKipQ7Q1LuJPLhmulYjPaV8dt6su3wciZLGPUNtQ1xiuGWMSPmoKyMvgHIF9ni28gbZqrXgc1E-PckHLm5ODULSTxxwG_B8Ci5DRTTYYvcx_SotrLeZ3hqIeRL5rlgvfPWC0m2ENCgXfVWJzpcmFlp1YKgyukEQUte5wyX1tsEI6v9pye6_BdtJAz?width=1466&height=1469&cropmode=none',
			'imgLeafConfig': {
				'transform': {'x': -23, 'y': -25},
				'width': 150,
			},
			'tags': {
				//'title': '',
				'year': '1951',
				//'place': '',
				'people': [{'roseHadkiss': {'left': 171, 'top': 130}}],
			}
		},
		{	'imgRef':	'rose hightor, roseHadkiss/roseHadkiss7.jpg',
			'imgLink': linkStartString + 'y4mCZglS38eYVce5cLUMwMRKMzfteEFXu1NJKh6rWv40g_JcxpCN_hGJ0gSVQh7r1wX7GSKsY66p8ZboHgAo-JZBxFDDmktLNxZu_XaHAhAaA80hLIzwapI_k0mF_DamGhX5PxnB6jEx6VUP7VXuKbTLEHIyy-Kt8NZ34E373pJvPhUr70lTysObmsHmqRWu9Kd?width=1446&height=1539&cropmode=none',
			'imgLeafConfig': {
				'transform': {'x': -20, 'y': -20},
				'width': 150,
			},
			'tags': {
				//'title': '',
				'year': '1951',
				//'place': '',
				'people': [{'roseHadkiss': {'left': 225, 'top': 110}}],
			}
		},
		{	'imgRef':	'roseRon Wedding, roseHadkiss/roseHadkiss8.jpg',
			'imgLink': linkStartString + 'y4mVAqGqxCAm5xEvO3ggg8W1O1-BLLRv3JBSU74KhKKbOznZa5h-AJALErr22PJOIc6rXHEufAAw641BY8u2hPlVcYgtggHa6Nbmup73Ld8MjMUxUfH_yymQZAxPExlU5pVaRoJp3YsTMIVG5HgKx-9_86Qi0NnyFLPeGS4rjRa22i3IKmBCM5VkAaytVBbb2tw?width=3719&height=2412&cropmode=none',
			'imgLeafConfig': {
				'transform': {'x': 10, 'y': 10},
				'width': 130,
			},
			'tags': {
				//'title': '',
				'year': '1950',
				//'place': '',
				'people': [
					{'roseHadkiss': {'left': 237, 'top': 46, 'size': 'smaller'}},
					{'ronHadkiss': {'left': 190, 'top': 37, 'size': 'smaller'}},
					{'johnNevilleKesby': {'left': 274, 'top': 31, 'size': 'smaller'}},
					{'maryKesby': {'left': 321, 'top': 44, 'size': 'smaller'}},
				],
			}
		},
		
	]
	
	var allPeoplesImgs = {};
	
	for (const img of allImgs){
		let peopleArray = img.tags.people; //={'personTag': {'x':, 'y':}}
		for (const personObj of peopleArray){
			let person = Object.keys(personObj);
			let personObjBool = allPeoplesImgs.hasOwnProperty(person);
			if (!personObjBool)
				allPeoplesImgs[person] = [];
			
			allPeoplesImgs[person].push(img);
		}
	}
	//console.log(allPeoplesImgs);
	
	
	if (imgArray)
		return allImgs;
	else	
		return allPeoplesImgs;
}

/* ------------------------------------------------ */