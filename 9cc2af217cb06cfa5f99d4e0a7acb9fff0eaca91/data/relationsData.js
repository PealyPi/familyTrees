/* ============================================================ */
/* ===                 Person Info Storage                  === */
/* person node data, relations                    				*/
/* ============================================================ */
function nodeDataStorage(){//collapse lvl 2
	
	const kesby = {
		roseKesby : {	
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
		},
		jackKesby : {			
			'spouse': 		'juneKesby',	
		},
		
		// --- bobby
		//gen2
		maryBobby : {	
			'familyName': 'bobby',
			'parentMain': 	'sidneyCharlesBobby',	
			'parentSpouse': 'adaBerriman',
			'siblings': 	['floBobby', 'charlesEdwardBobby', 'lotBobby', 'sidBobby', 'harryBobby', 'jackBobby', 'jeanBobby'],
		},
		
			//gen3
			adaBerriman : {	
					'familyName': 'berriman',
					'parentMain': 	'johnBerriman',
					'parentSpouse': 'mariaBerriman',	
				},
				//gen4
				johnBerriman : {	
					'parentMain': 	'georgeBerriman',
					'parentSpouse': 'anneBerriman',	
				},
				mariaBerriman : {	
					'familyName': 'berriman',
				},
					//gen5
					georgeBerriman : {	
					},
					anneBerriman : {	
						'familyName': 	'berriman',
					},
		
			//gen3
			sidneyCharlesBobby : {	
				'parentMain': 	'benjaminBobby',
				'parentSpouse': 'fannyClarkChapman',	
				'siblings': 	['florencePrimroseBobby', 'margaretEllenBobby', 'charlotteBobby', 'samuelJamesBobby', 'annieFlorenceBobby', 'maryAnnBobby', 'janeClarkBobby', 'jamesHerbertBobby' ],
			},
			
				//gen4
				fannyClarkChapman : {	
					'familyName': 	'bobby',
				},
				benjaminBobby : {	
					'parentSpouse': 'charlotteAtkins',
					'parentMain': 	'william5Bobby',	
					'siblings': 	['nathonBobby', 'annBobby', 'carolineBobby', 'harrieBobby', 'walterBobby', 'williamBobby'],
				},
				
					//gen5
					charlotteAtkins : {
						'familyName': 	'bobby',
					},
					william5Bobby : {	
						'parentMain': 	'benjamin6Bobby',
						'parentSpouse': 'sarahHubbard',	
						'siblings': 	['caroline5Bobby', 'suzannahBobby', 'sarahBobby', 'benjamin5Bobby', 'estherBobby'],
					},			
					
					
						//gen6
						benjamin6Bobby : {	
							'parentMain': 	'jamesBobby',	
							'parentSpouse': 'suzannaBobby',
							'siblings': 	['susanBobby'],
							'otherSpouse':	'amyBobby',							
						},
						sarahHubbard : {	
							'familyName': 'bobby',
							'childMain': 	'william5Bobby', 
						},					
							
							//gen7
							jamesBobby : {		
								'parentMain': 	'benjamin8Bobby',
								'parentSpouse': 'ursulaPitman',	
								'siblings': 	['thomasBobby', 'john7Bobby', 'william7Bobby'],
							},
							suzannaBobby : {		
								'familyName':	'bobby',
								'siblings': 	['thomasBobby', 'john7Bobby', 'william7Bobby'],
							},			
							
								
								//gen8
								benjamin8Bobby : {	
									'parentMain': 	'johnBobby',
									'parentSpouse': 'maryHayward',	
									'siblings': 	['sarahBobby'],
									'half-siblings':['mary8Bobby', 'bridgetBobby', 'ellisBobby'],
								},
								ursulaPitman : {	
									'familyName': 	'bobby',
								},
								
									//gen9
									johnBobby : {	
										'parentMain': 	'johnBauby',
										'parentSpouse': 'elizabethFord',
										'otherSpouse':	'marthaPrime',
										'siblings':		['susan9Bobby', 'dorothyBobby', 'dorothy9Bobby2', 'hannahBobby', 'mary9Bobby', 'elizabethBobby'],
									},
									maryHayward : {		
										'familyName': 	'bobby',
									},
								
									
										//gen10
										johnBauby : {	
											'parentMain': 	'john11Bauby',
											'parentSpouse': 'mary11Bauby',	
											'siblings':		['elizabethBauby', 'thomasBauby'],
										},
										elizabethFord : {		
											'familyName': 	'bobby',
										},
										
											//gen11
											john11Bauby : {	
												'parentMain': 	'johnBolbi',
												'parentSpouse': 'maryBolbi',	
												'siblings':		['edmondBauby', 'annBauby', 'mary11Bauby_sib', 'susan11Bauby'],
											},
											mary11Bauby : {											
												'familyName': 	'bobby',
											},						
											
											
												//gen12
												johnBolbi : {	
													'parentMain': 	'edmundBawbeye',
													'parentSpouse': 'margretMaen',	
													'siblings':		['faithBolbi', 'williamBolbi', 'william12Bolbi2', 'thomasBolbi', 'mary12Bolbi', 'margaretBolbi', 'edmondBolbi', 'edwardBobli', 'aliceBolbi'],
												},
												maryBolbi : {		
													'familyName': 	'bobby',
												},
												
													//gen13
													edmundBawbeye : {	
														'parentMain': 	'robertBawbeye',
														'parentSpouse': 'allineBawbeye',	
														'siblings':		['sonBawbeye', 'daughterBawbeye', 'johnBawbeye', 'alynBawbeye', 'rogerBawbeye', 'robert13Bawbeye', 'alline13Bawbeye', 'richardBawbeye', 'susanBawbeye', 'susan13Bawbeye2', 'john13Bawbeye2'],
													},
													margretMaen : {	
														'familyName': 	'bobby',
													},
													
														//gen14
														robertBawbeye : {	
															'otherSpouse':	'mary14Bawbeye',														
														},
														allineBawbeye : {		
															'familyName': 	'bobby',
														},
														
												
		// --- kesby		
		//gen2
		johnNevilleKesby : {	
			'parentMain': 	'alfredSmithKesby',
			'parentSpouse': 'emmaMariaNeville',	
			'siblings': 	['williamKesby', 'beatriceHarrietKesby', 'nellKesby', 'charlesKesby', 'alfredKesby'],
		},
			
			//gen3
			emmaMariaNeville : {	
				'familyName': 	'neville',
				'parentMain': 	'johnNeville',	
				'parentSpouse': 'estherNeville',
				'siblings': 	['williamNeville', 'percyNeville', 'beatriceNeville', 'bernardNeville'],
			},
				
				//gen4
				estherNeville : {	
					'familyName':	'neville',
				},
				johnNeville : {	
					'parentMain': 	'unknownNeville',
					'parentSpouse': 'harrietNeville',	
				},
					//gen5
					unknownNeville : {	
					},
					harrietNeville : {	
						'familyName': 	'neville',
					},
				
				
			
			//gen3
			alfredSmithKesby : {	
				'parentMain': 		'johnKesby',
				'parentSpouse': 	'harrietSmith',
				'half-siblings': 	['charlesSmith', 'williamJamesSmith'],
			},		
			
				//gen4
				johnKesby : {	
					'spouse': 		'harrietSmith',					
				},
				harrietSmith : {	
					'familyName': 	'kesby',
					'otherSpouse': 	'benjaminSmith',
				},
		
	}; 
	
	const hadkiss = {
		ronaldHadkiss : {	
			'gen': 1,
			'isRoot':		true,
			'isMainLine':	true,	
			'isMainParent': true,
			'mainFamily':	'hadkiss',
			'familyName': 	'hadkiss',
			'spouseFamily': 'kesby',
			'parentSpouse':	'billHadkiss',
			'parentMain': 'berthaClaydon',	
			'siblings': 	['williamHadkiss', 'ivyHadkiss', 'ireneHadkiss'],
			//'spouse': 	'roseKesby',	
			//'childMain': 	['lesleyPeal'],
			//'children': 	['lesleyPeal, chrisHadkiss'],
		},
		
		// ----- hadkiss ----- //	
		//gen2	
		billHadkiss : {	
			'parentMain': 	'samuelHadkiss',	
			'parentSpouse': 'elizabethCoombs',
			'siblings': 	['nellHadkiss', 'maryAnnHadkiss', 'samuel2Hadkiss', 'leonardGeorgeHadkiss', 'elizabethEstherHadkiss'],
		},
			//gen3	
			samuelHadkiss : {	
				'parentMain': 	'william4Hadkiss',	
				'parentSpouse': 'juliaMitchell',
				'siblings': 	['annHadkiss', 'william3Hadkiss', 'johnHadkiss', 'thomasHadkiss', 'charlesHadkiss', 'juliaHadkiss'],
			},
				//gen4	
				william4Hadkiss : {	
					'parentMain': 	'thomas5Hadkiss',	
					'parentSpouse': 'unknown5Hadkiss1',				
				},
					//gen5	
					thomas5Hadkiss : {},
					unknown5Hadkiss1 : {},
				
				//gen4	
				juliaMitchell : {	
					'familyName': 	'mitchell',
					'parentMain': 	'johnMitchell',	
					'parentSpouse': 'unknownMitchell',				
				},
					//gen5	
					johnMitchell : {},
					unknownMitchell : {},
				
			//gen3	
			elizabethCoombs : {	
				'parentMain': 	'stephenGeorgeCoombs',	
				'parentSpouse': 'mariaCoombs',
				'siblings': 	['ellenCoombs', 'maryCoombs', 'stephenCoombs'],
			},
			/*stephenCoombs : {	
				'spouse': 	'roberthaCoombs',	
				'children': 	['stephen2Coombs', 'robertCoombs', 'henryCoombs', 'williamCoombs', 'adaCoombs', 'hectorCoombs'],
			},*/
				//gen4	
				stephenGeorgeCoombs : { },
				mariaCoombs : { },
			
		
		// ----- claydon ----- //	
		//gen2	
		berthaClaydon : {	
			'familyName': 'claydon',
			'parentMain': 	'georgeOliverClaydon',	
			'parentSpouse': 'fannyAtkinson',
			'siblings': 	['leonardClaydon', 'elsieClaydon', 'williamErnestClaydon', 'georgeClaydon', 'adaClaydon'],
		},
			//gen3	
			georgeOliverClaydon : {	
				'parentMain': 	'thomasClaydon',	
				'parentSpouse': 'maryRawlinson',
				'siblings': 	['florenceClaydon', 'majorClaydon', 'ernestEHClaydon', 'aliceClaydon', 'robertClaydon', 'harryClaydon', 'arthurClaydon', 'joshuaClaydon', 'maryClaydon', 'fredrickClaydon', 'arabellaClaydon'],
			},
				//gen4	
				thomasClaydon : {	
					'parentMain': 	'mary5Claydon',	
					'parentSpouse': 'unknown5Claydon',
				},
					//gen5	
					mary5Claydon : {},
					unknown5Claydon : {},
		
				//gen4	
				maryRawlinson : {	
					'parentMain': 	'elizabethRawlinson',	
					'parentSpouse': 'unknownRawlinson',
				},
					//gen5	
					elizabethRawlinson : {},
					unknownRawlinson : {},
		
			//gen3	
			fannyAtkinson : {	
				'parentMain': 	'jamesAtkinson',	
				'parentSpouse': 'rachelAtkinson',
				'siblings': 	['kateAtkinson', 'jamesRAtkinson', 'helenaAtkinson', 'annieAtkinson', 'adaAtkinson', 'florenceAtkinson', 'georgeAtkinson', 'gertrudeAtkinson', 'sidneyAtkinson'],
			},
				//gen4	
				jamesAtkinson : {},
				rachelAtkinson : {},
	};
	
	const peal = {};
	
	const mckenzie = {};	
		
	var allFams = {'kesby': kesby, 'hadkiss': hadkiss, 'peal': peal, 'mckenzie': mckenzie};

	return allFams;
}

/* ------------------------------------------------ */