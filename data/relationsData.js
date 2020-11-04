/* ============================================================ */
/* ===                 Person Info Storage                  === */
/* person node data, relations                    				*/
/* ============================================================ */
function nodeDataStorage(){//collapse lvl 2
	
	var kesby = {}, hadkiss = {}, peal = {}, mckenzie = {};
	
	//kesby
	kesby.roseHadkiss = {	
		'gen': 1,
		'isRoot':	true,
		'mainLine':		true,	
		'familyName': 'kesby',
		'spouseFamily': 'hadkiss',
		'parentSpouse':	'johnNevilleKesby',
		'parentMain': 	'maryBobby',	
		'siblings': 	['jackKesby'],
		//'spouse': 		'ronaldHadkiss',	
		//'childMain': 	['lesleyPeal'],
		//'children': 	['lesleyPeal, chrisHadkiss'],
	};
	
	kesby.jackKesby = {			
		'mainLine':		false,	
		'familyName': 	'kesby',
		'parentSpouse':	'johnNevilleKesby',
		'parentMain': 	'maryBobby',
		'spouse': 		'juneKesby',	
		'siblingMain': 	'roseHadkiss',
	};
	
	// --- bobby
	//gen2
	kesby.maryBobby = {	
		'gen': 2,
		'mainLine':		true,		
		'familyName': 'bobby',
		'parentMain': 	'sidneyCharlesBobby',	
		'parentSpouse': 'adaBerriman',
		'siblings': 	['floBobby', 'charlesEdwardBobby', 'lotBobby', 'sidBobby', 'harryBobby', 'jackBobby', 'jeanBobby'],
		'spouse': 		'johnNevilleKesby',	
		'childMain': 	'roseHadkiss', 
		'children': 	['roseHadkiss', 'jackKesby'], 
	};
	
	kesby.floBobby = {		
		'mainLine':		false,	
		'familyName': 	'bobby',
		'parentMain': 	'sidneyCharlesBobby',	
		'parentSpouse': 'adaBerriman',
		'siblingMain': 'maryBobby',
	};
	kesby.charlesEdwardBobby = {	
		'mainLine':		false,	
		'familyName': 	'bobby',
		'parentMain': 	'sidneyCharlesBobby',	
		'parentSpouse': 'adaBerriman',
		'siblingMain': 'maryBobby',
	};
	kesby.lotBobby = {	
		'mainLine':		false,	
		'familyName': 	'bobby',
		'parentMain': 	'sidneyCharlesBobby',	
		'parentSpouse': 'adaBerriman',
		'spouse': 		'jimCoyle',	
		'siblingMain': 	'maryBobby',
	};
	kesby.sidBobby = {		
		'mainLine':		false,	
		'familyName': 	'bobby',
		'parentMain': 	'sidneyCharlesBobby',	
		'parentSpouse': 'adaBerriman',
		'siblingMain': 	'maryBobby',
	};
	kesby.harryBobby = {		
		'mainLine':		false,	
		'familyName': 	'bobby',
		'parentMain': 	'sidneyCharlesBobby',	
		'parentSpouse': 'adaBerriman',
		'siblingMain': 	'maryBobby',
	};
	kesby.jackBobby = {			
		'mainLine':		false,	
		'familyName': 	'bobby',
		'parentMain': 		'sidneyCharlesBobby',	
		'parentSpouse': 	'adaBerriman',
		'siblingMain': 'maryBobby',
	};
	kesby.jeanBobby = {			
		'mainLine':		false,	
		'familyName': 	'bobby',
		'parentMain': 		'sidneyCharlesBobby',	
		'parentSpouse': 	'adaBerriman',
		'siblingMain': 'maryBobby',
	};
	
		//gen3
		kesby.adaBerriman = {	
			'gen': 3,
			'mainLine':		true,		
			'familyName': 'berriman',
			'parentMain': 	'johnBerriman',
			'parentSpouse': 'mariaBerriman',	
			'spouse': 		'sidneyCharlesBobby',	
			'childMain': 	'maryBobby', 
			'children': 	['maryBobby', 'floBobby', 'charlesEdwardBobby', 'lotBobby', 'sidBobby', 'harryBobby', 'jackBobby', 'jeanBobby'],
		};
			//gen4
			kesby.johnBerriman = {	
				'gen': 4,
				'mainLine':		true,		
				'familyName': 'berriman',
				'parentMain': 		'georgeBerriman',
				'parentSpouse': 		'anneBerriman',	
				'spouse': 		'mariaBerriman',	
				'childMain': 	'adaBerriman', 
			};
			kesby.mariaBerriman = {	
				'gen': 4,
				'mainLine':		true,		
				'familyName': 'berriman',
				'spouse': 		'johnBerriman',	
				'childMain': 	'adaBerriman', 
			};
				//gen5
				kesby.georgeBerriman = {	
					'gen': 5,
					'mainLine':		true,		
					'familyName': 'berriman',
					'spouse': 		'anneBerriman',	
					'childMain': 	'johnBerriman', 
				};
				kesby.anneBerriman = {	
					'gen': 5,
					'mainLine':		true,		
					'familyName': 	'berriman',
					'spouse': 		'georgeBerriman',	
					'childMain': 	'johnBerriman', 
				};
	
		//gen3
		kesby.sidneyCharlesBobby = {	
			'gen': 3,
			'mainLine':		true,		
			'familyName': 'bobby',
			'parentMain': 		'benjaminBobby',
			'parentSpouse': 	'fannyClarkChapman',	
			'siblings': 	['florencePrimroseBobby', 'margaretEllenBobby', 'charlotteBobby', 'samuelJamesBobby', 'annieFlorenceBobby', 'maryAnnBobby', 'janeClarkBobby', 'jamesHerbertBobby' ],
			'spouse': 		'adaBerriman',	
			'childMain': 	'maryBobby', 
			'children': 	['floBobby', 'charlesEdwardBobby', 'lotBobby', 'sidBobby', 'harryBobby', 'jackBobby', 'jeanBobby'],
		};
		
		kesby.florencePrimroseBobby = {	
			'mainLine':		false,	
			'familyName': 	'bobby',
			'siblingMain': 	'sidneyCharlesBobby',
		};
		kesby.margaretEllenBobby = {	
			'mainLine':		false,	
			'familyName': 	'bobby',
			'siblingMain': 	'sidneyCharlesBobby',
		};
		kesby.charlotteBobby = {	
			'mainLine':		false,	
			'familyName': 	'bobby',
			'siblingMain': 	'sidneyCharlesBobby',
		};
		kesby.samuelJamesBobby = {	
			'mainLine':		false,	
			'familyName': 	'bobby',
			'siblingMain': 	'sidneyCharlesBobby',
		};
		kesby.annieFlorenceBobby = {	
			'mainLine':		false,	
			'familyName': 	'bobby',
			'siblingMain': 	'sidneyCharlesBobby',
		};
		kesby.maryAnnBobby = {		
			'mainLine':		false,	
			'familyName': 	'bobby',
			'siblingMain': 	'sidneyCharlesBobby',
		};
		kesby.janeClarkBobby = {	
			'mainLine':		false,	
			'familyName': 	'bobby',
			'siblingMain': 	'sidneyCharlesBobby',
		};
		kesby.jamesHerbertBobby = {	
			'mainLine':		false,	
			'familyName': 	'bobby',
			'siblingMain': 	'sidneyCharlesBobby',
		};
			
			//gen4
			kesby.fannyClarkChapman = {	
				'gen': 4,
				'mainLine':		true,		
				'familyName': 'bobby',
				'spouse': 		'benjaminBobby',	
				'childMain': 	'sidneyCharlesBobby',
			};
			kesby.benjaminBobby = {	
				'gen': 4,
				'mainLine':		true,		
				'familyName': 'bobby',
				'parentSpouse': 		'charlotteAtkins',
				'parentMain': 		'william5Bobby',	
				'siblings': 	['nathonBobby', 'annBobby', 'carolineBobby', 'harrieBobby', 'walterBobby', 'williamBobby'],
				'spouse': 		'fannyClarkChapman',	
				'childMain': 	'sidneyCharlesBobby', 
				'children':		['maryBobby', 'floBobby', 'charlesEdwardBobby', 'lotBobby', 'sidBobby', 'harryBobby', 'jackBobby', 'jeanBobby']
			};
			
			kesby.nathonBobby = {		
				'mainLine':		false,	
				'familyName': 	'bobby',
				'siblingMain': 	'benjaminBobby',
			};
			kesby.annBobby = {		
				'mainLine':		false,	
				'familyName': 	'bobby',
				'siblingMain': 	'benjaminBobby',
			};	
			kesby.carolineBobby = {	
				'mainLine':		false,	
				'familyName': 	'bobby',
				'siblingMain': 	'benjaminBobby',
			};
			kesby.harrieBobby = {		
				'mainLine':		false,	
				'familyName': 	'bobby',
				'siblingMain': 	'benjaminBobby',
			};
			kesby.walterBobby = {		
				'mainLine':		false,	
				'familyName': 	'bobby',
				'siblingMain': 	'benjaminBobby',
			};
			kesby.williamBobby = {			
				'mainLine':		false,	
				'familyName': 	'bobby',
				'siblingMain': 	'benjaminBobby',
			};
				
				//gen5
				kesby.charlotteAtkins = {
					'gen': 5,
					'mainLine':		true,		
					'familyName': 'bobby',
					'spouse': 		'william5Bobby',	
					'childMain': 	'benjaminBobby', 
				};
				kesby.william5Bobby = {	
					'gen': 5,
					'mainLine':		true,		
					'familyName': 'bobby',
					'parentMain': 		'benjamin6Bobby',
					'parentSpouse': 		'sarahHubbard',	
					'siblings': 	['carolineBobby', 'suzannahBobby', 'sarahBobby', 'benjamin5Bobby', 'estherBobby'],
					'spouse': 		'charlotteAtkins',	
					'childMain': 	'benjaminBobby', 
				};
				
				kesby.caroline5Bobby = {		
					'mainLine':		false,	
					'familyName': 	'bobby',
					'siblingMain': 	'william5Bobby',
				};
				kesby.suzannahBobby = {	
					'mainLine':		false,	
					'familyName': 	'bobby',
					'siblingMain': 	'william5Bobby',
				};
				kesby.sarahBobby = {	
					'mainLine':		false,	
					'familyName': 	'bobby',
					'siblingMain': 	'william5Bobby',
				};
				kesby.benjamin5Bobby = {	
					'mainLine':		false,	
					'familyName': 	'bobby',
					'siblingMain': 	'william5Bobby',
				};
				kesby.estherBobby = {		
					'mainLine':		false,	
					'familyName': 	'bobby',
					'siblingMain': 	'william5Bobby',
				};
				
					//gen6
					kesby.benjamin6Bobby = {	
						'gen': 6,
						'mainLine':		true,		
						'familyName': 'bobby',
						'parentSpouse': 'suzannaBobby',
						'parentMain': 	'jamesBobby',	
						'siblings': 	['susanBobby'],
						'spouse': 		['sarahHubbard', 'amyBobby'],	
						'childMain': 	'william5Bobby',
					};
					kesby.sarahHubbard = {	
						'gen': 6,
						'mainLine':		true,		
						'familyName': 'bobby',
						'spouse': 		'benjamin6Bobby',	
						'childMain': 	'william5Bobby', 
					};
					
					kesby.amyBobby = {	
						'mainLine':		false,	
						'familyName': 	'bobby',
						'spouseMain': 	'benjamin6Bobby',
					};
					kesby.susanBobby = {	
						'mainLine':		false,	
						'familyName': 	'bobby',
						'siblingMain': 	'benjamin6Bobby',
					};
						
						//gen7
						kesby.jamesBobby = {	
							'gen': 7,
							'mainLine':		true,		
							'familyName': 'bobby',
							'parentMain': 	'benjamin8Bobby',
							'parentSpouse': 'ursulaPitman',	
							'siblings': 	['thomasBobby', 'johnBobby', 'william7Bobby'],
							'spouse': 		['suzannaBobby'],	
							'childMain': 	'benjamin6Bobby', 
						};
						kesby.suzannaBobby = {	
							'gen': 7,
							'mainLine':		true,		
							'familyName': 'bobby',
							'siblings': 	['thomasBobby', 'johnBobby', 'william7Bobby'],
							'spouse': 		['jamesBobby'],	
							'childMain': 	'benjamin6Bobby', 
						};
						
						kesby.thomasBobby = {		
							'mainLine':		false,	
							'familyName': 	'bobby',
							'siblingMain': 	'jamesBobby',
						};
						kesby.johnBobby = {	
							'mainLine':		false,	
							'familyName': 	'bobby',
							'siblingMain': 	'jamesBobby',
						};
						kesby.william7Bobby = {	
							'mainLine':		false,	
							'familyName': 	'bobby',
							'siblingMain': 	'jamesBobby',
						};
							
							//gen8
							kesby.benjamin8Bobby = {	
								'gen': 8,
								'mainLine':		true,		
								'familyName': 'bobby',
								'parentMain': 	'johnBobby',
								'parentSpouse': 'maryHayward',	
								'spouse': 		'ursulaPitman',
								'otherSpouse': 	'marthaPrime',
								'siblings': 	['sarahBobby'],
								'half-siblings':['mary8Bobby', 'bridgetBobby', 'ellisBobby'],
								'childMain': 	'jamesBobby', 
							};
							kesby.ursulaPitman = {	
								'gen': 8,
								'mainLine':		true,		
								'familyName': 'bobby',
								'spouse': 		['benjamin8Bobby'],	
								'childMain': 	'jamesBobby', 
							};
							
							kesby.sarahBobby = {		
								'mainLine':		false,	
								'familyName': 	'bobby',
								'siblingMain': 	'benjamin8Bobby',
							};
							kesby.mary8Bobby = {		
								'mainLine':		false,	
								'familyName': 	'bobby',
								'siblingMain': 	'benjamin8Bobby',
							};		
							kesby.bridgetBobby = {		
								'mainLine':		false,	
								'familyName': 	'bobby',
								'siblingMain': 	'benjamin8Bobby',
							};					
							kesby.ellisBobby = {		
								'mainLine':		false,	
								'familyName': 	'bobby',
								'siblingMain': 	'benjamin8Bobby',
							};
							
								//gen9
								kesby.johnBobby = {	
									'gen': 8,
									'mainLine':		true,		
									'familyName': 	'bobby',
									'parentMain': 	'johnBauby',
									'parentSpouse': 'elizabethFord',	
									'spouse': 		'maryHayward',
									'otherSpouse': 	'marthaPrime',
									'childMain': 	'benjamin8Bobby', 
									'children': 	['benjamin8Bobby', 'sarahBobby'],
									'otherChildren':['mary8Bobby', 'bridgetBobby', 'ellisBobby'],
									'siblings':		['susan9Bobby', 'dorothyBobby', 'dorothy9Bobby2', 'hannahBobby', 'mary9Bobby', 'elizabethBobby'],
								};
								kesby.maryHayward = {		
									'mainLine':		false,	
									'familyName': 	'bobby',
									'spouseMain': 	'johnBobby',
									'childMain': 	'benjamin8Bobby', 
									'children': 	['benjamin8Bobby', 'sarahBobby'],
								};
							
								kesby.marthaPrime = {		
									'mainLine':		false,	
									'familyName': 	'bobby',
									'spouseMain': 	'benjamin8Bobby',
								};
								
								kesby.susan9Bobby = {		
									'mainLine':		false,	
									'familyName': 	'bobby',
									'siblingMain': 	'johnBobby',
								};
								kesby.dorothyBobby = {		
									'mainLine':		false,	
									'familyName': 	'bobby',
									'siblingMain': 	'johnBobby',
								};
								kesby.dorothy9Bobby2 = {		
									'mainLine':		false,	
									'familyName': 	'bobby',
									'siblingMain': 	'johnBobby',
								};
								kesby.hannahBobby = {		
									'mainLine':		false,	
									'familyName': 	'bobby',
									'siblingMain': 	'johnBobby',
								};
								kesby.mary9Bobby = {		
									'mainLine':		false,	
									'familyName': 	'bobby',
									'siblingMain': 	'johnBobby',
								};
								kesby.elizabethBobby = {		
									'mainLine':		false,	
									'familyName': 	'bobby',
									'siblingMain': 	'johnBobby',
								};
								
									//gen10
									kesby.johnBauby = {	
										'gen': 8,
										'mainLine':		true,		
										'familyName': 	'bobby',
										'parentMain': 	'john11Bauby',
										'parentSpouse': 'mary11Bauby',	
										'spouse': 		'elizabethFord',
										'childMain': 	'johnBobby', 
										'children': 	['johnBobby', 'susan9Bobby', 'dorothyBobby', 'dorothy9Bobby2', 'hannahBobby', 'mary9Bobby', 'elizabethBobby'],
										'siblings':		['elizabethBauby', 'thomasBauby'],
									};
									kesby.elizabethFord = {		
										'mainLine':		false,	
										'familyName': 	'bobby',
										'spouseMain': 	'johnBauby',
										'childMain': 	'johnBobby', 
										'children': 	['johnBobby', 'susan9Bobby', 'dorothyBobby', 'dorothy9Bobby2', 'hannahBobby', 'mary9Bobby', 'elizabethBobby'],
									};
									
									kesby.elizabethBauby = {		
										'mainLine':		false,	
										'familyName': 	'bobby',
										'siblingMain': 	'johnBauby',
									};
									kesby.thomasBauby = {		
										'mainLine':		false,	
										'familyName': 	'bobby',
										'siblingMain': 	'johnBauby',
									};
										
										//gen11
										kesby.john11Bauby = {	
											'gen': 8,
											'mainLine':		true,		
											'familyName': 	'bobby',
											'parentMain': 	'johnBolbi',
											'parentSpouse': 'maryBolbi',	
											'spouse': 		'mary11Bauby',
											'childMain': 	'johnBobby', 
											'children': 	['johnBobby', 'elizabethBauby', 'thomasBauby'],
											'siblings':		['edmondBauby', 'annBauby', 'mary11Bauby_sib', 'susan11Bauby'],
										};
										kesby.mary11Bauby = {		
											'mainLine':		false,	
											'familyName': 	'bobby',
											'spouseMain': 	'john11Bauby',
											'childMain': 	'johnBobby', 
											'children': 	['johnBobby', 'elizabethBauby', 'thomasBauby'],
										};
										
										kesby.edmondBauby = {		
											'mainLine':		false,	
											'familyName': 	'bobby',
											'siblingMain': 	'john11Bauby',
										};
										kesby.annBauby = {		
											'mainLine':		false,	
											'familyName': 	'bobby',
											'siblingMain': 	'john11Bauby',
										};
										kesby.mary11Bauby_sib = {		
											'mainLine':		false,	
											'familyName': 	'bobby',
											'siblingMain': 	'john11Bauby',
										};
										kesby.susan11Bauby = {		
											'mainLine':		false,	
											'familyName': 	'bobby',
											'siblingMain': 	'john11Bauby',
										};
										
											//gen12
											kesby.johnBolbi = {	
												'gen': 8,
												'mainLine':		true,		
												'familyName': 	'bobby',
												'parentMain': 	'edmundBawbeye',
												'parentSpouse': 'margretMaen',	
												'spouse': 		'maryBolbi',
												'childMain': 	'john11Bauby', 
												'children': 	['john11Bauby', 'edmondBauby', 'annBauby', 'mary11Bauby_sib', 'susan11Bauby'],
												'siblings':		['faithBolbi', 'williamBolbi', 'william12Bolbi2', 'thomasBolbi', 'mary12Bolbi', 'margaretBolbi', 'edmondBolbi', 'edwardBobli', 'aliceBolbi'],
											};
											kesby.maryBolbi = {		
												'mainLine':		false,	
												'familyName': 	'bobby',
												'spouseMain': 	'johnBolbi',
												'childMain': 	'john11Bauby', 
												'children': 	['john11Bauby', 'edmondBauby', 'annBauby', 'mary11Bauby_sib', 'susan11Bauby'],
											};
											
											kesby.faithBolbi = {		
												'mainLine':		false,	
												'familyName': 	'bobby',
												'siblingMain': 	'johnBolbi',
											};
											kesby.williamBolbi = {		
												'mainLine':		false,	
												'familyName': 	'bobby',
												'siblingMain': 	'johnBolbi',
											};
											kesby.william12Bolbi2 = {		
												'mainLine':		false,	
												'familyName': 	'bobby',
												'siblingMain': 	'johnBolbi',
											};
											kesby.thomasBolbi = {		
												'mainLine':		false,	
												'familyName': 	'bobby',
												'siblingMain': 	'johnBolbi',
											};
											kesby.mary12Bolbi = {		
												'mainLine':		false,	
												'familyName': 	'bobby',
												'siblingMain': 	'johnBolbi',
											};
											kesby.margaretBolbi = {		
												'mainLine':		false,	
												'familyName': 	'bobby',
												'siblingMain': 	'johnBolbi',
											};
											kesby.edmondBolbi = {		
												'mainLine':		false,	
												'familyName': 	'bobby',
												'siblingMain': 	'johnBolbi',
											};
											kesby.edwardBobli = {		
												'mainLine':		false,	
												'familyName': 	'bobby',
												'siblingMain': 	'johnBolbi',
											};
											kesby.aliceBolbi = {		
												'mainLine':		false,	
												'familyName': 	'bobby',
												'siblingMain': 	'johnBolbi',
											};
											
												//gen13
												kesby.edmundBawbeye = {	
													'gen': 8,
													'mainLine':		true,		
													'familyName': 	'bobby',
													'parentMain': 	'robertBawbeye',
													'parentSpouse': 'allineBawbeye',	
													'spouse': 		'margretMaen',
													'childMain': 	'johnBolbi', 
													'children': 	['johnBolbi', 'faithBolbi', 'williamBolbi', 'william12Bolbi2', 'thomasBolbi', 'mary12Bolbi', 'margaretBolbi', 'edmondBolbi', 'edwardBobli', 'aliceBolbi'],
													'siblings':		['sonBawbeye', 'daughterBawbeye', 'johnBawbeye', 'alynBawbeye', 'rogerBawbeye', 'robert13Bawbeye', 'alline13Bawbeye', 'richardBawbeye', 'susanBawbeye', 'susan13Bawbeye2', 'john13Bawbeye2'],
												};
												kesby.margretMaen = {		
													'mainLine':		false,	
													'familyName': 	'bobby',
													'spouseMain': 	'johnBolbi',
													'childMain': 	'johnBolbi', 
													'children': 	['johnBolbi', 'faithBolbi', 'williamBolbi', 'william12Bolbi2', 'thomasBolbi', 'mary12Bolbi', 'margaretBolbi', 'edmondBolbi', 'edwardBobli', 'aliceBolbi'],
												};
												
												kesby.sonBawbeye = {		
													'mainLine':		false,	
													'familyName': 	'bobby',
													'siblingMain': 	'edmundBawbeye',
												};
												kesby.daughterBawbeye = {		
													'mainLine':		false,	
													'familyName': 	'bobby',
													'siblingMain': 	'edmundBawbeye',
												};
												kesby.johnBawbeye = {		
													'mainLine':		false,	
													'familyName': 	'bobby',
													'siblingMain': 	'edmundBawbeye',
												};
												kesby.alynBawbeye = {		
													'mainLine':		false,	
													'familyName': 	'bobby',
													'siblingMain': 	'edmundBawbeye',
												};
												kesby.rogerBawbeye = {		
													'mainLine':		false,	
													'familyName': 	'bobby',
													'siblingMain': 	'edmundBawbeye',
												};
												kesby.robert13Bawbeye = {		
													'mainLine':		false,	
													'familyName': 	'bobby',
													'siblingMain': 	'edmundBawbeye',
												};
												kesby.alline13Bawbeye = {		
													'mainLine':		false,	
													'familyName': 	'bobby',
													'siblingMain': 	'edmundBawbeye',
												};
												kesby.richardBawbeye = {		
													'mainLine':		false,	
													'familyName': 	'bobby',
													'siblingMain': 	'edmundBawbeye',
												};
												kesby.susanBawbeye = {		
													'mainLine':		false,	
													'familyName': 	'bobby',
													'siblingMain': 	'edmundBawbeye',
												};
												kesby.susan13Bawbeye2 = {		
													'mainLine':		false,	
													'familyName': 	'bobby',
													'siblingMain': 	'edmundBawbeye',
												};
												kesby.john13Bawbeye2 = {		
													'mainLine':		false,	
													'familyName': 	'bobby',
													'siblingMain': 	'edmundBawbeye',
												};
												
												
													//gen14
													kesby.robertBawbeye = {	
														'gen': 8,
														'mainLine':		true,		
														'familyName': 	'bobby',	
														'spouse': 		'allineBawbeye',
														'otherSpouse':	'mary14Bawbeye',
														'childMain': 	'edmundBawbeye', 
														'children': 	['edmundBawbeye', 'sonBawbeye', 'daughterBawbeye', 'johnBawbeye', 'alynBawbeye', 'rogerBawbeye', 'robert13Bawbeye', 'alline13Bawbeye', 'richardBawbeye', 'susanBawbeye', 'susan13Bawbeye2', 'john13Bawbeye2'],
													};
													kesby.allineBawbeye = {		
														'mainLine':		false,	
														'familyName': 	'bobby',
														'spouseMain': 	'johnBolbi',
														'childMain': 	'edmundBawbeye', 
														'children': 	['edmundBawbeye', 'sonBawbeye', 'daughterBawbeye', 'johnBawbeye', 'alynBawbeye', 'rogerBawbeye', 'robert13Bawbeye', 'alline13Bawbeye', 'richardBawbeye', 'susanBawbeye', 'susan13Bawbeye2', 'john13Bawbeye2'],
													};
													kesby.mary14Bawbeye = {		
													'mainLine':		false,	
													'familyName': 	'bobby',
													'spouseMain': 	'robertBawbeye',
												};
											
	// --- kesby		
	//gen2
	kesby.johnNevilleKesby = {	
		'gen': 2,
		'mainLine': true,		
		'familyName': 'kesby',
		'parentL': 		'alfredSmithKesby',
		'parentR': 		'emmaMariaNeville',	
		'siblings': 	['williamKesby', 'beatriceHarrietKesby', 'nellKesby', 'charlesKesby', 'alfredKesby'],
		'spouse': 		'maryBobby',	
		'childMain': 	'roseHadkiss', 
	};
		
	kesby.williamKesby = {		
		'mainLine':		false,	
		'familyName': 	'kesby',
		'siblingMain': 'johnNevilleKesby',
	};
	kesby.beatriceHarrietKesby = {		
		'mainLine':		false,	
		'familyName': 	'kesby',
		'siblingMain': 'johnNevilleKesby',
	};
	kesby.nellKesby = {		
		'mainLine':		false,	
		'familyName': 	'kesby',
		'siblingMain': 'johnNevilleKesby',
	};
	kesby.charlesKesby = {		
		'mainLine':		false,	
		'familyName': 	'kesby',
		'siblingMain': 'johnNevilleKesby',
	};
	kesby.alfredKesby = {	
		'mainLine':		false,	
		'familyName': 	'kesby',
		'siblingMain': 'johnNevilleKesby',
	};

		//gen3
		kesby.emmaMariaNeville = {	
			'gen': 3,
			'mainLine':		true,		
			'familyName': 'neville',
			'parentL': 		'estherNeville',
			'parentR': 		'johnNeville',	
			'siblings': 	['williamNeville', 'percyNeville', 'beatriceNeville', 'bernardNeville'],
			'spouse': 		'alfredSmithKesby',	
			'childMain': 	'johnNevilleKesby', 
		};
		
		kesby.williamNeville = {		
			'mainLine':		false,	
			'familyName': 	'neville',
			'siblingMain': 'emmaMariaNeville',
		};
		kesby.percyNeville = {		
			'mainLine':		false,	
			'familyName': 	'neville',
			'siblingMain': 'emmaMariaNeville',
		};
		kesby.beatriceNeville = {		
			'mainLine':		false,	
			'familyName': 	'neville',
			'siblingMain': 'emmaMariaNeville',
		};
		kesby.bernardNeville = {		
			'mainLine':		false,	
			'familyName': 	'neville',
			'siblingMain': 'emmaMariaNeville',
		};
		
			//gen4
			kesby.estherNeville = {	
				'gen': 4,
				'mainLine':		true,		
				'familyName': 'neville',
				'spouse': 		'johnNeville',	
				'childMain': 	'emmaMariaNeville', 
			};
			kesby.johnNeville = {	
				'gen': 4,
				'mainLine':		true,		
				'familyName': 'neville',
				'parentL': 		'unknownNeville',
				'parentR': 		'harrietNeville',	
				'spouse': 		'estherNeville',	
				'childMain': 	'emmaMariaNeville', 
			};
				//gen5
				kesby.unknownNeville = {	
					'gen': 5,
					'mainLine':		true,		
					'familyName': 'neville',
					'spouse': 		'harrietNeville',	
					'childMain': 	'johnNeville', 
				};
				kesby.harrietNeville = {	
					'gen': 5,
					'mainLine':		true,		
					'familyName': 'neville',
					'spouse': 		'unknownNeville',	
					'childMain': 	'johnNeville', 
				};
			
			
		
		//gen3
		kesby.alfredSmithKesby = {	
			'gen': 3,
			'mainLine':		true,		
			'familyName': 'kesby',
			'parentL': 		'harrietSmith',
			'parentR': 		'johnKesby',	
			'half-siblings': 	['charlesSmith', 'williamJamesSmith'],
			'spouse': 		'emmaMariaNeville',	
			'childMain': 	'johnNevilleKesby', 
		};
		
		kesby.charlesSmith = {		
			'mainLine':		false,	
			'halfSibling': 	true,
			'familyName': 	'kesby',
			'siblingMain': 	'alfredSmithKesby',
			'sameParent': 	'harrietSmith',
			'otherParent': 	'benjaminSmith',	
		};
		kesby.williamJamesSmith = {		
			'mainLine':		false,	
			'halfSibling': 	true,
			'familyName': 	'kesby',
			'siblingMain':	'alfredSmithKesby',
			'sameParent': 	'harrietSmith',
			'otherParent': 	'benjaminSmith',
		};
		
			//gen4
			kesby.johnKesby = {	
				'gen': 4,
				'mainLine':		true,		
				'familyName': 'kesby',
				'spouse': 		'harrietSmith',	
				'childMain': 	'alfredSmithKesby', 				
			};
			kesby.harrietSmith = {	
				'gen': 4,
				'mainLine':		true,		
				'familyName': 'kesby',
				'spouse': 		'johnKesby',	
				'childMain': 	'alfredSmithKesby', 
			};
	
			kesby.benjaminSmith = {	
				'gen': 4,
				'mainLine':		false,	
				'familyName': 	'kesby',
				'spouseMainR': 	'harrietSmith',
			}
			
	

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
	/*
	switch (famName){
		case 'kesby': 
			return allFams.kesby;
		break;
		case 'hadkiss': 
			return allFams.hadkiss;
		break;
		case 'peal': 
			return allFams.peal;
		break;
		case 'mckenzie': 
			return allFams.mckenzie;
		break;		
	}	*/
	return allFams;
}

/* ------------------------------------------------ */