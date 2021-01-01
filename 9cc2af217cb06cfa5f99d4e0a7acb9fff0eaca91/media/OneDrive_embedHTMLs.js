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
				'people': [{'personTag': {'left': 0, 'top': 0}}],
			}
		},*/	

		
		// Rose Hadkiss
		// =============================	
		{	'imgRef':	'youngRose infront of factory with doll, roseHadkiss/roseHadkiss_young1.jpg',
			'imgLink': linkStartString + 'y4memW6TYWx6EZo2cqcal17VDaWv9-cBj-mjFmMYr3LTKV97CehKztdsdj4Ng3QKsFnjyT7DDgfuDzChqyZbC5zQSNEwl2xqFxN0PUwEJOz-Os42PuMbiNb-5WAX9gQGuScfB6BmYD9D1JkIHz2Q98HgzigClEBAMY1AeT0cYm8H-qhGhBrffKGcRA0z52dpxBs?width=1364&height=1971&cropmode=none',
			'imgLeafConfig': {
				'transform': {'x': 10, 'y': 10},
				'width': 120,
			},
			'tags': {
				//'title': '',
				//'year': '',
				//'place': '',
				'people': [{'roseHadkiss': {'left': 0, 'top': 0}}],
			}
		},			
		{	'imgRef':	'youngRose portrait, roseHadkiss/roseHadkiss_young2.jpg',
			'imgLink': linkStartString + 'y4mCtGrbVmSg2lDPxM8bbBj7yDbFNdvm3AcWzkt8G0ZNHVaYNbxpcnFGHhmuJ_gOmykFTlpEmitnUxJEQNZ5puU1sN42H4_wS3o2NELCJisExwYBTagKgeRdUyU5Oq7uVx8BWaTjnHBvZD8cmsl9eJCCBIZZgji872sJ7cH7Yj94c7HyiCEp39hN5crZd6ZkpBu?width=1187&height=1647&cropmode=none',
			'imgLeafConfig': {
				'transform': {'x': 10, 'y': -10},
				'width': 110,
			},
			'tags': {
				//'title': '',
				//'year': '',
				//'place': '',
				'people': [{'roseHadkiss': {'left': 0, 'top': 0}}],
			}
		},	
		{	'imgRef':	'youngRose sea, roseHadkiss/roseHadkiss_young3.jpg',
			'imgLink': linkStartString + 'y4mzGrzXDWrzX2_sNOg5pYc90XaOlo9lkD9OBbVcLIXxcRevt91D44ONgwt81j2cdzAAIzMeoTdS2SepSDt-adUkyC-vMni7bEdZWqQj87CXus-6Xm6Xbz52Fy_9z73sjWuwrA8GJ5MGhF5mbSWy5kPC_FTGXa4kFQJoUW0aXcm60_XF3Kq3ED6-dpRhjOMvwJ_?width=1357&height=2014&cropmode=none',
			'imgLeafConfig': {
				'transform': {'x': 15, 'y': -5},
				'width': 120,
			},
			'tags': {
				//'title': '',
				//'year': '',
				//'place': '',
				'people': [{'roseHadkiss': {'left': 0, 'top': 0}}],
			}
		},
		{	'imgRef':	'youngRose & Jack beach, roseHadkiss/roseHadkiss_young4.jpg',
			'imgLink': linkStartString + 'y4mAwMddPY0kX0bbHgHbmV1HMBOTbchrGQhDUsjsEXVkMnQxh8YVSNnxULlvZS0gM0Kd6gcYlCcSNL1cSe_BF9_vtjoOUz-c96Gbx36HRpiJSYuoTwT_wNQlJL-kP2dFYw0v3EWwENIMyr9iSADnMb05N3OGBtzxkJ3NzY-J6xSDhOrCVtbLsHK66EJgKPrml52?width=1341&height=1914&cropmode=none',
			'imgLeafConfig': {
				'transform': {'x': 15, 'y': 0},
				'width': 120,
			},
			'tags': {
				//'title': '',
				//'year': '',
				//'place': '',
				'people': [
					{'roseHadkiss': {'left': 89, 'top': 25}},
					{'jackKesby': {'left': 42, 'top': 153}},
				],
			}
		},
		{	'imgRef':	'youngRose & Parents at the beach, roseHadkiss/roseHadkiss_young5.jpg',
			'imgLink': linkStartString + 'y4mrTa6803ktZrmYpkw6f4gRzfkZV3e7aBwOy5r8Az663ewh9pt8LostbEdRc4MKpqb4hoNWYiNBrc1VEzIUGpVqPQOGfb0ISPqtceZXtPhFro-CEsRfKrO_HrY7utWB8rEIGbp20rS2IzrUBFpPWUhUxUkItBTqQVSdZucaWTDxGl8sGWwnX1jgh29fGRdslL3?width=3269&height=2062&cropmode=none',
			'imgLeafConfig': {
				'transform': {'x': 0, 'y': 7},
				'width': 140,
			},
			'tags': {
				//'title': '',
				//'year': '',
				//'place': '',
				'people': [
					{'roseHadkiss': {'left': 0, 'top': 0}},
					{'johnNevilleKesby': {'left': 0, 'top': 0}},
					{'maryBobby': {'left': 0, 'top': 0}},
				],
			}
		},
		{	'imgRef':	'youngRose & Parents at the beach 2, roseHadkiss/roseHadkiss_young6.jpg',
			'imgLink': linkStartString + 'y4mK7GmPVAE2c8PHi6r8wGqWQPdj9qdpOsQU-gy4ao4tYJQtMQzTj79D7H3vWzetnUyLH4RuL63TfZZrDfk-_axVujqZ2ZUPX8_90kq3xGJ67jWo8I8sCCTQWf0-NAmTtYRL73WqHenIu2UdIU3QP5AZEJUZvg9QNIIOdpeet8KDpJOD0Quh2HQKbdYeQEAkOFo?width=2176&height=3062&cropmode=none',
			'imgLeafConfig': {
				'transform': {'x': 0, 'y': -25},
				'width': 120,
			},
			'tags': {
				//'title': '',
				//'year': '',
				//'place': '',
				'people': [
					{'roseHadkiss': {'left': 0, 'top': 0}},
					{'johnNevilleKesby': {'left': 0, 'top': 0}},
					{'maryBobby': {'left': 0, 'top': 0}},
				],
			}
		},
		{	'imgRef':	'teenRose portrait, roseHadkiss/roseHadkiss_teen1.jpg',
			'imgLink': linkStartString + 'y4mAAosFFegbL3_fad-dKw0nk18la9J0et1WpJaMSnivc9S5pqdYoC7aSahy6ppkEhO_JTR67xO01qQbH0Kzyy5JvY7wEvpplT0KT5exNtXxp-B-9oOTB0hdc9DQ794_mr_wK7VsTdipjkiOJLoqtRhMBYk1OSAXTmZn1cyh3elsQQetBM-sy272dGvhNmofS3K?width=3961&height=5144&cropmode=none',
			'imgLeafConfig': {
				'transform': {'x': 10, 'y': -5},
				'width': 120,
			},
			'tags': {
				//'title': '',
				//'year': '',
				//'place': '',
				'people': [{'roseHadkiss': {'left': 0, 'top': 0}}],
			}
		},
		
		//------------------------
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
		//----------rose wedding----------------
		{	'imgRef':	'roseRon Wedding - rose&johnNeville, roseHadkiss/roseHadkiss_wedding1.jpg',
			'imgLink': linkStartString + 'y4mPiS_B2PzCkRHB0jGU2Pcfw-M3f6c-ao6dbtFNhfpoQ0nDr8zo5U-kbYRM1F0McS-TlR7Lg0UROwZnwFuK3_V1mD5OxMu4NjA5En_-LCsp7_fH60-dXMuMKf4eB5-ayzf--ntq4beqa7M_R1tDprVYmp1mdhpROOF7CamGo2IZoD5zQYalwweeC9H6XaeQ9ER?width=1780&height=2319&cropmode=none',
			'imgLeafConfig': {
				'transform': {'x': 10, 'y': 10},
				'width': 130,
			},
			'tags': {
				'title': 'Ron&Rose Wedding',
				'year': 'March 26th 1949',
				'place': 'St Peter and Paul Church, Swanscombe',
				'people': [
					{'roseHadkiss': {'left': 77, 'top': 35}},
					{'johnNevilleKesby': {'left': 154, 'top': 17}},
				],
			}
		},
		{	'imgRef':	'roseRon Wedding, roseHadkiss/roseHadkiss_wedding2.jpg',
			'imgLink': linkStartString + 'y4m5V9F2Ji7vCnwh6cZN4NM85nkCUhn5O9sDD57S_N5D297Z8pCD-F95zaEufrkIwqnq1JxaDcEYofXKz-_jXaTb7H3E-sineIMA1K33GgM7HPAI_a5dkM_Vw-G6hlDSVfmTA7XEzn9gMScjSebn86UaT7WOsqYND-tFPY0jFOvw-czgm9O5v6pUKTQn9iidK5Y?width=2811&height=3848&cropmode=none',
			'imgLeafConfig': {
				'transform': {'x': 10, 'y': 10},
				'width': 130,
			},
			'tags': {
				'title': 'Ron&Rose Wedding',
				'year': 'March 26th 1949',
				'place': 'St Peter and Paul Church, Swanscombe',
				'people': [
					{'roseHadkiss': {'left': 0, 'top': 0}},
					{'ronHadkiss': {'left': 0, 'top': 0}},
				],
			}
		},
		{	'imgRef':	'roseRon Wedding group, roseHadkiss/roseHadkiss_wedding3.jpg',
			'imgLink': linkStartString + 'y4mVAqGqxCAm5xEvO3ggg8W1O1-BLLRv3JBSU74KhKKbOznZa5h-AJALErr22PJOIc6rXHEufAAw641BY8u2hPlVcYgtggHa6Nbmup73Ld8MjMUxUfH_yymQZAxPExlU5pVaRoJp3YsTMIVG5HgKx-9_86Qi0NnyFLPeGS4rjRa22i3IKmBCM5VkAaytVBbb2tw?width=3719&height=2412&cropmode=none',
			'imgLeafConfig': {
				'transform': {'x': 10, 'y': 10},
				'width': 130,
			},
			'tags': {
				'title': 'Ron&Rose Wedding',
				'year': 'March 26th 1949',
				'place': 'St Peter and Paul Church, Swanscombe',
				'people': [
					{'roseHadkiss': {'left': 237, 'top': 46, 'size': 'smaller'}},
					{'ronHadkiss': {'left': 190, 'top': 37, 'size': 'smaller'}},
					{'johnNevilleKesby': {'left': 274, 'top': 31, 'size': 'smaller'}},
					{'maryBobby': {'left': 321, 'top': 44, 'size': 'smaller'}},
				],
			}
		},
		{	'imgRef':	'roseRon Wedding groupLarger, roseHadkiss/roseHadkiss_wedding4.jpg',
			'imgLink': linkStartString + 'y4mH55UWYrKjQ8Mc0I_r7mbrk40skvV_aRQljJiiCJuXoKZ5CpljmfxGxf1x4Vl_K2LIfhl32OVNSx_Z58mnsXeiHR1G_aHGugCNCT3z6H2kU51wfvH7_rK_9KUDg3MbzW7Ma_3iHsR260nJ8gMY14KGvv0URhHqpTpz6Gv6tq-7JyBJBmMlIQGf401NBLQAefd?width=3755&height=2335&cropmode=none',
			'imgLeafConfig': {
				'transform': {'x': 10, 'y': 10},
				'width': 130,
			},
			'tags': {
				'title': 'Ron&Rose Wedding',
				'year': 'March 26th 1949',
				'place': 'St Peter and Paul Church, Swanscombe',
				'people': [
					{'roseHadkiss': {'left': 0, 'top': 0}},
					{'ronHadkiss': {'left': 0, 'top': 0}},
				],
			}
		},
		{	'imgRef':	'roseRon Wedding roseDress, roseHadkiss/roseHadkiss_wedding5.jpg',
			'imgLink': linkStartString + 'y4myZv3Xk4Ov_jTcwsuUK5oO6HcOwG0eAM0bsxIS9a9-dPbNACezf9zABS6G3Q2eDWWAE7zJU1fY15RPyWDP2QX_B7piYQtV5IeeCZOtuQoJ2dWxgED4zfa2JoflUdOJGTvTDU4bYsDQWyW3_EJY9F1_PHCSkwb9yZs-CDgNz64qQBWh-BMWJlkfTqneqwmlVDj?width=1443&height=1465&cropmode=none',
			'imgLeafConfig': {
				'transform': {'x': 5, 'y': -10},
				'width': 120,
			},
			'tags': {
				'title': 'Ron&Rose Wedding',
				'year': 'March 26th 1949',
				'place': 'St Peter and Paul Church, Swanscombe',
				'people': [	{'roseHadkiss': {'left': 0, 'top': 0}} ],
			}
		},
		
		//--------------------------
		{	'imgRef':	'rose boat 2, roseHadkiss/roseHadkiss9.jpg',
			'imgLink': linkStartString + 'y4mxUFQ5IJSXLIxrkre-NrITYzbqUcWgrd2GC2lGRQhwGlf83mr7AR8zFda3iasbv_JDKLBGs1Pqf0zQDEpf-b_lqFyAHYTk4GwrdgtO859QHFY8k3MTzIUjyW6W0kU-5iQz6XU6O9R5S-B-h9ff4qODqtEBNxnbBnp_6VSIips7m-vr4NEc_1IURs8vMeQJDEK?width=1430&height=2100&cropmode=none',
			'imgLeafConfig': {
				'transform': {'x': 15, 'y': 0},
				'width': 120,
			},
			'tags': {
				//'title': '',
				//'year': '',
				//'place': '',
				'people': [{'roseHadkiss': {'left': 0, 'top': 0}}],
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