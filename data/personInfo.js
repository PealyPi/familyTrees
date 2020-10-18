/* ============================================================ */
/* ===                 Person Info Storage                  === */
/* ============================================================ */
function personInfoStorage(famName, id=false){	
	//collapse level 3
	const leafTrs = 'translate(-65 70) scale(1 -1) rotate(20)';
	const leafWH = [200, 200];
	const kesbyInfo = {	
		'roseHadkiss': {
			'name':		'Rose Hadkiss',
			'bornName':	'Rosemary Kesby',
			'dates': 	'1925 - 2020',	
			'fullDates': '22 Sep 1925 - 28 Mar 2020', 
			'about': { 
				//'bornLoc': 		'', 
				'marriedDate':	'26 Mar 1949',
				'marriedLoc':	'St Peter and Paul Church, Swanscombe',
				'marriedPpl':	'Ronald Hadkiss',
				
				//'blurb':		'other info paragraph',		
			},	
				
			'imgs': [
				{ 'icon': //'../iconImgs/roseKesby.png', //first in array to go on tree,
					'https://pealypi.github.io/pealFamily/iconImgs/roseKesby.png'	
					}, 
					
				//imgs[1]	
				{'leafImg': //'../pageImgs/roseKesby_image2.jpg', 
					'https://pealypi.github.io/pealFamily/pageImgs/roseKesby_image2.jpg',
				'leafTransform': leafTrs,				
				'leafWH': leafWH	},
				
				//imgs[2]
				{'leafImg': //'../pageImgs/roseKesby_image3.jpg', 
					'https://pealypi.github.io/pealFamily/pageImgs/roseKesby_image3.jpg',
				'leafTransform': leafTrs,				
				'leafWH': leafWH},
				
				
			],
		},
		'jackKesby': {
			'name':		'Jack Kesby',
			'bornName':	'Neville John Kesby',
			'dates': 	'1932 - ', 	
			'fullDates': '',
			'about': {	
			},				
				
			'imgs': []
		},	
		
		
		// ----- Bobby ----- //		
		'maryBobby': {
			'name':		'Mary Kesby',
			'bornName':	'Mary Bobby',
			'dates': 	'1905 - 1969', 
			'fullDates': '',
			'about': { 	
			},				
				
			'imgs': []
		},
		
			'lotBobby': {
				'name':		'Lot Coyle',
				'bornName':	'Charlotte Bobby',
				'dates': 	'1906 - 1990', 
				'fullDates': '',
				'about': { 	
				},				
					
				'imgs': []
			},
			'floBobby': {
				'name':		'Flo Bobby',
				'bornName':	'Florence Bobby',
				'dates': 	'1901 - 1965', 
				'fullDates': '',
				'about': { 	
				},				
					
				'imgs': []
			},
			'charlesEdwardBobby': {
				'name':		'Charles Edward Bobby',
				'bornName':	'Charles Edward Bobby',
				'dates': 	'1904 - 1980', 
				'fullDates': '',
				'about': { 	
				},				
					
				'imgs': []
			},
			'sidBobby': {
				'name':		'Sid Bobby',
				'bornName':	'Sidney Grimwood Bobby',
				'dates': 	'1911 -', 
				'fullDates': '',
				'about': { 	
				},				
					
				'imgs': []
			},
			'harryBobby': {
				'name':		'Harry Bobby',
				'bornName':	'Henry Bobby',
				'dates': 	'1914 - 1984', 
				'fullDates': '',
				'about': { 	
				},				
					
				'imgs': []
			},
			'jackBobby': {
				'name':		'Jack Bobby',
				'bornName':	'John Bobby',
				'dates': 	'1914 -', 
				'fullDates': '',
				'about': { 	
				},				
					
				'imgs': []
			},
			'jeanBobby': {
				'name':		'Jean Bobby',
				'bornName':	'Margret Jean Bobby',
				'dates': 	'1921 -', 
				'fullDates': '',
				'about': { 	
				},				
					
				'imgs': []
			},
			
			'adaBerriman': {
				'name':		'Gran Bobby',
				'bornName':	'Ada Maria Berriman',
				'dates': 	'1883 - 1948',	
				'fullDates': '',
				'about': { 	
				},				
					
				'imgs': []
			},
				'mariaBerriman': {
					'name':		'Maria Berriman',
					'bornName':	'Maria',
					'dates': 	'1852 - ', 
					'fullDates': '',
					'about': { 	
					},				
						
					'imgs': []
				},
				'johnBerriman': {
					'name':		'John Berriman',
					'bornName':	'John Berriman',
					'dates': 	'1850 - ',	
					'fullDates': '',
					'about': { 	
					},				
						
					'imgs': [ ]
				},
					'georgeBerriman': {
						'name':		'George Berriman',
						'bornName':	'George Berriman',
						'dates': 	'1814 - ',	
						'fullDates': '',
						'about': { 	
						},				
							
						'imgs': [ ]
					},
					'anneBerriman': {
						'name':		'Anne Berriman',
						'bornName':	'Anne',
						'dates': 	'1823 - ',	
						'fullDates': '',
						'about': { 	
						},				
							
						'imgs': [ ]
					},
					
			
			'sidneyCharlesBobby': {
				'name':		'Sidney Charles Bobby',
				'bornName':	'Sidney Charles Bobby',
				'dates': 	'1877 - 1957', 	
				'fullDates': '',
				'about': { 	
				},				
					
				'imgs': []
			},
				'florencePrimroseBobby': {
					'name':		'Florence Primrose Bobby',
					'bornName':	'Florence Primrose Bobby',
					'dates': 	'1895 - 1895', 	
					'fullDates': '',
					'about': { 	
					},				
						
					'imgs': []
				},
				'margaretEllenBobby': {
					'name':		'Margaret Ellen Bobby',
					'bornName':	'Margaret Ellen Bobby',
					'dates': 	'1894 - 1972', 	
					'fullDates': '',
					'about': { 	
					},				
						
					'imgs': []
				},
				'charlotteBobby': {
					'name':		'Charlotte Bobby',
					'bornName':	'Charlotte Bobby',
					'dates': 	'1890 - 1974', 	
					'fullDates': '',
					'about': { 	
					},				
						
					'imgs': []
				},
				'samuelJamesBobby': {
					'name':		'Samuel James Bobby',
					'bornName':	'Samuel James Bobby',
					'dates': 	'1886 - 1957', 	
					'fullDates': '',
					'about': { 	
					},				
						
					'imgs': []
				},
				'annieFlorenceBobby': {
					'name':		'Annie Florence Bobby',
					'bornName':	'Annie Florence Bobby',
					'dates': 	'1886 - 1900', 	
					'fullDates': '',
					'about': { 	
					},				
						
					'imgs': []
				},
				'maryAnnBobby': {
					'name':		'Mary Ann Bobby',
					'bornName':	'Mary Ann Bobby',
					'dates': 	'1882 - 1937', 	
					'fullDates': '',
					'about': { 	
					},				
						
					'imgs': []
				},
				'janeClarkBobby': {
					'name':		'Jane Clark Bobby',
					'bornName':	'Jane Clark Bobby',
					'dates': 	'1881 - 1905', 	
					'fullDates': '',
					'about': { 	
					},				
						
					'imgs': []
				},
				'jamesHerbertBobby': {
					'name':		'James Herbert Bobby',
					'bornName':	'James Herbert Bobby',
					'dates': 	'1879 - 1884', 	
					'fullDates': '',
					'about': { 	
					},				
						
					'imgs': []
				},
		
					'fannyClarkChapman': {
						'name':		'Fanny Clark Bobby',
						'bornName':	'Fanny Clark Chapman',
						'dates': 	'1857 - 1926', 	
						'fullDates': '',
						'about': { 	
						},				
							
						'imgs': []
					},			
					
					'benjaminBobby': {
						'name':		'Benjamin Bobby',
						'bornName':	'Benjamin Bobby',
						'dates': 	'1856 - 1926', 	
						'fullDates': '',
						'about': { 	
						},				
							
						'imgs': []
					},
						'nathonBobby': {
							'name':		'Nathon Bobby',
							'bornName':	'Nathon Bobby',
							'dates': 	'1852 - 1906', 	
							'fullDates': '',
							'about': { 	
							},				
								
							'imgs': []
						},
						'annBobby': {
							'name':		'Ann Bobby',
							'bornName':	'Ann Bobby',
							'dates': 	'1849 - 1871', 	
							'fullDates': '',
							'about': { 	
							},				
								
							'imgs': []
						},
						'carolineBobby': {
							'name':		'Caroline Bobby',
							'bornName':	'Caroline Bobby',
							'dates': 	'1846 - 1870', 	
							'fullDates': '',
							'about': { 	
							},				
								
							'imgs': []
						},
						'harrieBobby': {
							'name':		'Harrie Bobby',
							'bornName':	'Harrie Bobby',
							'dates': 	'1841 - 1861', 	
							'fullDates': '',
							'about': { 	
							},				
								
							'imgs': []
						},	
						'walterBobby': {
							'name':		'Walter Bobby',
							'bornName':	'Walter Bobby',
							'dates': 	'1839 - 1886', 	
							'fullDates': '',
							'about': { 	
							},				
								
							'imgs': []
						},	
						'williamBobby': {
							'name':		'William Bobby',
							'bornName':	'William Bobby',
							'dates': 	'1835 - 1882', 	
							'fullDates': '',
							'about': { 	
							},				
								
							'imgs': []
						},
		
						'charlotteAtkins': {
							'name':		'Charlotte Atkins',
							'bornName':	'Charlotte Atkins',
							'dates': 	'1816 - 1900', 	
							'fullDates': '',
							'about': { 	
							},				
								
							'imgs': []
						},
						'william5Bobby': {
							'name':		'William Bobby',
							'bornName':	'William Bobby',
							'dates': 	'1814 - 1868', 	
							'fullDates': '',
							'about': { 	
							},				
								
							'imgs': []
						},							
							'caroline5Bobby': {
								'name':		'Caroline',
								'bornName':	'Caroline',
								'dates': 	'- 1826', 	
								'fullDates': '',
								'about': { 	
								},				
									
								'imgs': []
							},
							'suzannahBobby': {
								'name':		'Suzannah',
								'bornName':	'Suzannah',
								'dates': 	'1827 -', 	
								'fullDates': '',
								'about': { 	
								},				
									
								'imgs': []
							},
							'sarahBobby': {
								'name':		'Sarah',
								'bornName':	'Sarah',
								'dates': 	'1827 -', 	
								'fullDates': '',
								'about': { 	
								},				
									
								'imgs': []
							},
							'benjamin5Bobby': {
								'name':		'Benjamin',
								'bornName':	'Benjamin',
								'dates': 	'1824 -', 	
								'fullDates': '',
								'about': { 	
								},				
									
								'imgs': []
							},
							'estherBobby': {
								'name':		'Esther Bobby',
								'bornName':	'Esther Bobby',
								'dates': 	'1821 - 1881', 	
								'fullDates': '',
								'about': { 	
								},				
									
								'imgs': []
							},
		
							'benjamin6Bobby': {
								'name':		'Benjamin Bobby',
								'bornName':	'Benjamin Bobby',
								'dates': 	'1782 - 1857', 	
								'fullDates': '',
								'about': { 	
								},				
									
								'imgs': []
							},
								'sarahHubbard': {
								'name':		'Sarah Hubbard',
								'bornName':	'Sarah Hubbard',
								'dates': 	'1784 - 1845', 	
								'fullDates': '',
								'about': { 	
								},				
									
								'imgs': []
							},
								'amyBobby': {
								'name':		'Amy',
								'bornName':	'Amy',
								'dates': 	'1801 - 1841', 	
								'fullDates': '',
								'about': { 	
								},				
									
								'imgs': []
							},
								'susanBobby': {
									'name':		'Susan Bobby',
									'bornName':	'Susan Bobby',
									'dates': 	'1784 - 1853', 	
									'fullDates': '',
									'about': { 	
									},				
										
									'imgs': []
								},
								
								'jamesBobby': {
									'name':		'James Bobby',
									'bornName':	'James Bobby',
									'dates': 	'1761 - 1823', 	
									'fullDates': '',
									'about': { 	
									},				
										
									'imgs': []
								},
								'suzannaBobby': {
									'name':		'Suzanna',
									'bornName':	'Suzanna',
									'dates': 	'1758 - 1821', 	
									'fullDates': '',
									'about': { 	
									},				
										
									'imgs': []
								},
									'thomasBobby': {
										'name':		'Thomas Bobby',
										'bornName':	'Thomas Bobby',
										'dates': 	'1759 - 1816', 	
										'fullDates': '',
										'about': { 	
										},				
											
										'imgs': []
									},
									'johnBobby': {
										'name':		'John Bobby',
										'bornName':	'John Bobby',
										'dates': 	'1756 - 1764', 	
										'fullDates': '',
										'about': { 	
										},				
											
										'imgs': []
									},
									'william7Bobby': {
										'name':		'William Bobby',
										'bornName':	'William Bobby',
										'dates': 	'1763 - 1841', 	
										'fullDates': '',
										'about': { 	
										},				
											
										'imgs': []
									},
									'benjamin8Bobby': {
										'name':		'Benjamin Bobby',
										'bornName':	'Benjamin Bobby',
										'dates': 	'1729 - 1764', 	
										'fullDates': '',
										'about': { 	
										},				
											
										'imgs': []
									},
										'ursulaPitman': {
										'name':		'Ursula Pitman',
										'bornName':	'Ursula Pitman',
										'dates': 	'1727 - 1781', 	
										'fullDates': '',
										'about': { 	
										},				
											
										'imgs': []
									},
	
		// ----- Kesby ----- //	
		'johnNevilleKesby': {
			'name':		'John Neville Kesby',
			'bornName':	'John Neville Kesby',
			'dates': 	'1900 - 1997', 
			'fullDates': '',
			'about': { 	
			},				
				
			'imgs': []
		},
		
		'williamKesby': {
			'name':		'William Kesby',
			'bornName':	'William Kesby',
			'dates': 	'1901 - ', 
			'fullDates': '',
			'about': { 	
			},				
				
			'imgs': []
		},
		'beatriceHarrietKesby': {
			'name':		'Beatrice Harriet Kesby',
			'bornName':	'Beatrice Harriet Kesby',
			'dates': 	'', 
			'fullDates': '',
			'about': { 	
			},				
				
			'imgs': []
		},
		'nellKesby': {
			'name':		'Nell Kesby',
			'bornName':	'Rose Ellen Kesby',
			'dates': 	'1906 - 2008', 
			'fullDates': '',
			'about': { 	
			},				
				
			'imgs': []
		},
		'charlesKesby': {
			'name':		'Charles Kesby',
			'bornName':	'Charles Kesby',
			'dates': 	' - 1949', 
			'fullDates': '',
			'about': { 	
			},				
				
			'imgs': []
		},
		'alfredKesby': {
			'name':		'Alfred Kesby',
			'bornName':	'Alfred Kesby',
			'dates': 	'', 
			'fullDates': '',
			'about': { 	
			},				
				
			'imgs': []
		},
	
			'emmaMariaNeville': {
				'name':		'Emma Maria Kesby',
				'bornName':	'Emma Maria Neville',
				'dates': 	'1875 - ', 
				'fullDates': '',
				'about': { 	
				},				
					
				'imgs': []
			},
			
			'williamNeville': {
				'name':		'William Neville',
				'bornName':	'William Neville',
				'dates': 	'1878 -', 
				'fullDates': '',
				'about': { 	
				},				
					
				'imgs': []
			},			
			'percyNeville': {
				'name':		'Percy Neville',
				'bornName':	'Percy Neville',
				'dates': 	'1880 -', 
				'fullDates': '',
				'about': { 	
				},				
					
				'imgs': []
			},			
			'beatriceNeville': {
				'name':		'Beatrice Neville',
				'bornName':	'Beatrice Neville',
				'dates': 	'1885 -', 
				'fullDates': '',
				'about': { 	
				},				
					
				'imgs': []
			},			
			'bernardNeville': {
				'name':		'Bernard Neville',
				'bornName':	'Bernard Neville',
				'dates': 	'1887 -', 
				'fullDates': '',
				'about': { 	
				},				
					
				'imgs': []
			},
			
				'estherNeville': {
					'name':		'Esther',
					'bornName':	'Esther',
					'dates': 	'', 
					'fullDates': '',
					'about': { 	
					},				
						
					'imgs': []
				},
				'johnNeville': {
					'name':		'John Neville',
					'bornName':	'ohn Neville',
					'dates': 	'', 
					'fullDates': '',
					'about': { 	
					},				
						
					'imgs': []
				},
					'unknownNeville': {
						'name':		'-',
						'bornName':	'-',
						'dates': 	'', 
						'fullDates': '',
						'about': { 	
						},				
							
						'imgs': []
					},
					'harrietNeville': {
						'name':		'Harriet',
						'bornName':	'Harriet',
						'dates': 	'', 
						'fullDates': '',
						'about': { 	
						},				
							
						'imgs': []
					},
			
			
			'alfredSmithKesby': {
				'name':		'Alfred Smith Kesby',
				'bornName':	'Alfred Smith Kesby',
				'dates': 	'1877 - ', 
				'fullDates': '',
				'about': { 	
				},				
					
				'imgs': []
			},
			
			'charlesSmith': {
				'name':		'Charles Smith',
				'bornName':	'Charles Smith',
				'dates': 	'1856 - ', 
				'fullDates': '',
				'about': { 	
				},				
					
				'imgs': []
			},			
			'williamJamesSmith': {
				'name':		'William James Smith',
				'bornName':	'William James Smith',
				'dates': 	'1874 - ', 
				'fullDates': '',
				'about': { 	
				},				
					
				'imgs': []
			},
			
				'benjaminSmith': {
					'name':		'Benjamin Smith',
					'bornName':	'Benjamin Smith',
					'dates': 	'1830 - ', 
					'fullDates': '',
					'about': { 	
					},				
						
					'imgs': []
				},	
				
				'johnKesby': {
					'name':		'John Kesby',
					'bornName':	'John Kesby',
					'dates': 	'1852 - ', 
					'fullDates': '',
					'about': { 	
					},				
						
					'imgs': []
				},	
				'harrietSmith': {
					'name':		'Harriet Smith',
					'bornName':	'Harriet Smith',
					'dates': 	'1835 - ', 
					'fullDates': '',
					'about': { 	
					},				
						
					'imgs': []
				},		
		
	
	}
	
	
	const hadkissInfo = {	
	};
	const pealInfo = {	
	};
	const mckenzieInfo = {	
	};

	
	switch (famName){
		case 'kesby':
			if (id)
				return kesbyInfo[id];
			else 
				return kesbyInfo;
		break;
		case 'hadkiss':
			if (id)
				return hadkissInfo[id];
			else 
				return hadkissInfo;
		break;
		case 'peal':
			if (id)
				return pealInfo[id];
			else 
				return pealInfo;
		break;
		case 'mckenzie':
			if (id)
				return mckenzieInfo[id];
			else 
				return mckenzieInfo;
		break;
	}
}

/* ------------------------------------------------ */