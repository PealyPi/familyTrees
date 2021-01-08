/* ============================================================ */
/* ===                 Person Info Storage                  === */
/* person node data, relations                    				*/
/* ============================================================ */
function nodeDataStorage(){//collapse lvl 2
	
	var kesby = {}, hadkiss = {}, peal = {}, mckenzie = {};
	
	//kesby
	kesby.roseHadkiss = {	
		'gen': 1,
		'isRoot':		true,
		'isMainLine':	true,	
		'isMainParent': true,
		'mainFamily':	'kesby',
		'familyName': 	'kesby',
		'spouseFamily': 'hadkiss',
		'parentMain':	'johnNevilleKesby',
		'parentSpouse': 'maryBobby',	
		'siblings': 	['jackKesby'],
		//'spouse': 	'ronaldHadkiss',	
		//'childMain': 	['lesleyPeal'],
		//'children': 	['lesleyPeal, chrisHadkiss'],
	};
	//Object.freeze(kesby.roseHadkiss);
	
	kesby.jackKesby = {			
		'spouse': 		'juneKesby',	
	};
	
	// --- bobby
	//gen2
	kesby.maryBobby = {	
		'familyName': 'bobby',
		'parentMain': 	'sidneyCharlesBobby',	
		'parentSpouse': 'adaBerriman',
		'siblings': 	['floBobby', 'charlesEdwardBobby', 'lotBobby', 'sidBobby', 'harryBobby', 'jackBobby', 'jeanBobby'],
	};
	
	
		//gen3
		kesby.adaBerriman = {	
			'familyName': 'berriman',
			'parentMain': 	'johnBerriman',
			'parentSpouse': 'mariaBerriman',	
		};
			//gen4
			kesby.johnBerriman = {	
				'parentMain': 	'georgeBerriman',
				'parentSpouse': 'anneBerriman',	
			};
			kesby.mariaBerriman = {	
				'familyName': 'berriman',
			};
				//gen5
				kesby.georgeBerriman = {	
				};
				kesby.anneBerriman = {	
					'familyName': 	'berriman',
				};
	
		//gen3
		kesby.sidneyCharlesBobby = {	
			'parentMain': 	'benjaminBobby',
			'parentSpouse': 'fannyClarkChapman',	
			'siblings': 	['florencePrimroseBobby', 'margaretEllenBobby', 'charlotteBobby', 'samuelJamesBobby', 'annieFlorenceBobby', 'maryAnnBobby', 'janeClarkBobby', 'jamesHerbertBobby' ],
		};
		
			//gen4
			kesby.fannyClarkChapman = {	
				'familyName': 	'bobby',
			};
			kesby.benjaminBobby = {	
				'parentSpouse': 'charlotteAtkins',
				'parentMain': 	'william5Bobby',	
				'siblings': 	['nathonBobby', 'annBobby', 'carolineBobby', 'harrieBobby', 'walterBobby', 'williamBobby'],
			};
			
				//gen5
				kesby.charlotteAtkins = {
					'familyName': 	'bobby',
				};
				kesby.william5Bobby = {	
					'parentMain': 	'benjamin6Bobby',
					'parentSpouse': 'sarahHubbard',	
					'siblings': 	['caroline5Bobby', 'suzannahBobby', 'sarahBobby', 'benjamin5Bobby', 'estherBobby'],
				};			
				
				
					//gen6
					kesby.benjamin6Bobby = {	
						'parentMain': 	'jamesBobby',	
						'parentSpouse': 'suzannaBobby',
						'siblings': 	['susanBobby'],
						'otherSpouse':	'amyBobby',							
					};
					kesby.sarahHubbard = {	
						'familyName': 'bobby',
						'childMain': 	'william5Bobby', 
					};					
						
						//gen7
						kesby.jamesBobby = {		
							'parentMain': 	'benjamin8Bobby',
							'parentSpouse': 'ursulaPitman',	
							'siblings': 	['thomasBobby', 'john7Bobby', 'william7Bobby'],
						};
						kesby.suzannaBobby = {		
							'familyName':	'bobby',
							'siblings': 	['thomasBobby', 'john7Bobby', 'william7Bobby'],
						};			
						
							
							//gen8
							kesby.benjamin8Bobby = {	
								'parentMain': 	'johnBobby',
								'parentSpouse': 'maryHayward',	
								'siblings': 	['sarahBobby'],
								'half-siblings':['mary8Bobby', 'bridgetBobby', 'ellisBobby'],
							};
							kesby.ursulaPitman = {	
								'familyName': 	'bobby',
							};
							
								//gen9
								kesby.johnBobby = {	
									'parentMain': 	'johnBauby',
									'parentSpouse': 'elizabethFord',
									'otherSpouse':	'marthaPrime',
									'siblings':		['susan9Bobby', 'dorothyBobby', 'dorothy9Bobby2', 'hannahBobby', 'mary9Bobby', 'elizabethBobby'],
								};
								kesby.maryHayward = {		
									'familyName': 	'bobby',
								};
							
								
									//gen10
									kesby.johnBauby = {	
										'parentMain': 	'john11Bauby',
										'parentSpouse': 'mary11Bauby',	
										'siblings':		['elizabethBauby', 'thomasBauby'],
									};
									kesby.elizabethFord = {		
										'familyName': 	'bobby',
									};
									
										//gen11
										kesby.john11Bauby = {	
											'parentMain': 	'johnBolbi',
											'parentSpouse': 'maryBolbi',	
											'siblings':		['edmondBauby', 'annBauby', 'mary11Bauby_sib', 'susan11Bauby'],
										};
										kesby.mary11Bauby = {											
											'familyName': 	'bobby',
										};						
										
										
											//gen12
											kesby.johnBolbi = {	
												'parentMain': 	'edmundBawbeye',
												'parentSpouse': 'margretMaen',	
												'siblings':		['faithBolbi', 'williamBolbi', 'william12Bolbi2', 'thomasBolbi', 'mary12Bolbi', 'margaretBolbi', 'edmondBolbi', 'edwardBobli', 'aliceBolbi'],
											};
											kesby.maryBolbi = {		
												'familyName': 	'bobby',
											};
											
												//gen13
												kesby.edmundBawbeye = {	
													'parentMain': 	'robertBawbeye',
													'parentSpouse': 'allineBawbeye',	
													'siblings':		['sonBawbeye', 'daughterBawbeye', 'johnBawbeye', 'alynBawbeye', 'rogerBawbeye', 'robert13Bawbeye', 'alline13Bawbeye', 'richardBawbeye', 'susanBawbeye', 'susan13Bawbeye2', 'john13Bawbeye2'],
												};
												kesby.margretMaen = {	
													'familyName': 	'bobby',
												};
												
													//gen14
													kesby.robertBawbeye = {	
														'otherSpouse':	'mary14Bawbeye',														
													};
													kesby.allineBawbeye = {		
														'familyName': 	'bobby',
													};
													
											
	// --- kesby		
	//gen2
	kesby.johnNevilleKesby = {	
		'parentMain': 	'alfredSmithKesby',
		'parentSpouse': 'emmaMariaNeville',	
		'siblings': 	['williamKesby', 'beatriceHarrietKesby', 'nellKesby', 'charlesKesby', 'alfredKesby'],
	};
		
		//gen3
		kesby.emmaMariaNeville = {	
			'familyName': 	'neville',
			'parentMain': 	'johnNeville',	
			'parentSpouse': 'estherNeville',
			'siblings': 	['williamNeville', 'percyNeville', 'beatriceNeville', 'bernardNeville'],
		};
			
			//gen4
			kesby.estherNeville = {	
				'familyName':	'neville',
			};
			kesby.johnNeville = {	
				'parentMain': 	'unknownNeville',
				'parentSpouse': 'harrietNeville',	
			};
				//gen5
				kesby.unknownNeville = {	
				};
				kesby.harrietNeville = {	
					'familyName': 	'neville',
				};
			
			
		
		//gen3
		kesby.alfredSmithKesby = {	
			'parentMain': 		'johnKesby',
			'parentSpouse': 	'harrietSmith',
			'half-siblings': 	['charlesSmith', 'williamJamesSmith'],
		};		
		
			//gen4
			kesby.johnKesby = {	
				'spouse': 		'harrietSmith',					
			};
			kesby.harrietSmith = {	
				'familyName': 	'kesby',
				'otherSpouse': 	'benjaminSmith',
			};
	
	

	//hadkiss
	hadkiss.ronaldHadkiss = {	
		'gen': 1,
		'isRoot':	true,
		'mainLine':		true,	
		'spouseFamily': 'kesby',
		'familyName': 'hadkiss',
		'spouse': 		'roseHadkiss',	
		//'children': 	['lesleyPeal, chrisHadkiss'],
	};
	
	
	var allFams = {'kesby': kesby, 'hadkiss': hadkiss, 'peal': peal, 'mckenzie': mckenzie};

	return allFams;
}

/* ------------------------------------------------ */