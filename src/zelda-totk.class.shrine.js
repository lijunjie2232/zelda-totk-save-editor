/*
	The legend of Zelda: Tears of the Kingdom Savegame Editor (Shrine class) v20230605

	by Marc Robledo 2023
*/

var Shrine={
	countFound:function(){
		var count=0;
		var offsets=SavegameEditor._getOffsetsByHashes(Shrine.HASHES_FOUND);
		for(var i=0; i<Shrine.HASHES_FOUND.length; i++){
			var val=tempFile.readU32(offsets[Shrine.HASHES_FOUND[i]]);
			if(val===0 || val===1)
				count+=val;
			else
				console.error('invalid shrine found value: '+val);
		}
		return count;
	},
	setAllAsFound:function(){
		var count=0;
		var offsets=SavegameEditor._getOffsetsByHashes(Shrine.HASHES_FOUND);
		for(var i=0; i<Shrine.HASHES_FOUND.length; i++){
			var val=tempFile.readU32(offsets[Shrine.HASHES_FOUND[i]]);
			if(val===0){
				tempFile.writeU32(offsets[Shrine.HASHES_FOUND[i]], 1);
				count++;
			}
		}
		MarcDialogs.alert(count+' shrines set as found.');
		SavegameEditor.refreshShrineCounters();
		return count;
	},
	countClear:function(){
		var count=0;
		var offsets=SavegameEditor._getOffsetsByHashes(Shrine.HASHES_STATUS);
		for(var i=0; i<Shrine.HASHES_STATUS.length; i++){
			var val=tempFile.readU32(offsets[Shrine.HASHES_STATUS[i]]);
			if(val===0x62965740)
				count++;
			else if(val!==0x04a35d72 && val!==0x7698141c && val!==0x1818ec02 && val!==0x7e731eee)
				console.error('invalid shrine clear value: '+val);
		}
		return count;
	},
	setAllAsClear:function(){
		var count=0;
		var offsets=SavegameEditor._getOffsetsByHashes(Shrine.HASHES_STATUS);
		for(var i=0; i<Shrine.HASHES_STATUS.length; i++){
			var val=tempFile.readU32(offsets[Shrine.HASHES_STATUS[i]]);
			if(val!==0x62965740){
				tempFile.writeU32(offsets[Shrine.HASHES_STATUS[i]], 0x62965740);
				count++;
			}
		}
		this.setAllAsFound();

		MarcDialogs.alert(count+' shrines set as clear.');
		if(count)
			SavegameEditor.addItem('key', 'Obj_DungeonClearSeal', count);

		SavegameEditor.refreshShrineCounters();
		return count;
	},

	STATUS_VALUES:{
		0x04a35d72:'Hidden',
		0x7698141c:'Appear',
		0x1818ec02:'Open',
		0x7e731eee:'Enter',
		0x62965740:'Clear'
	},

	HASHES_FOUND:[
		/* IsVisitLocation.DungeonXXX (000-151) */
		0xa487c021,0xab281eb6,0xda2de4a7,0x4e2394a9,0x3ccbcd89,0xf736a246,0x9c9e1c68,0xa091a056,0x39afd018,0x180db7f3,0x39c9d1d4,0x13cc9bd7,0xa540ccd2,0x01dd0595,0xd580cb86,0x67c337b0,0x107d9629,0xe0e3ff58,0x3f03af01,0xb6fc752d,0x4ee4f23f,0x3a35c441,0x724b3238,0x569730c6,0x5e531088,0x7cc25004,0x5dc9e001,0x84d38c3c,0xc139022d,0x2e7c10e5,0x298deca4,0xa70e70d9,0xae9406f6,0x96b9c41d,0xa70ef442,0xec088269,0x29e63d24,0x48d9a29f,0x1070fba4,0x503465a8,0xcbfa18c1,0x821453d0,0xc85630ec,0x9165b447,0x6ef0a41c,0x879a218f,0x5add5c20,0xfa982dbe,0xfb362b82,0x4c436d40,0xb2a10197,0xe3be1265,0xa9ed9e29,0x07044ad8,0x8b7c26bf,0xfedda4fc,0xd0fee17c,0x7c21361d,0x771d3ccf,0x39e0db9c,0x5f6180d7,0xa157e40f,0xdf539d50,0x69dfea08,0x5b469590,0x4e6a1638,0xd56689f4,0xf7353b01,0xaa40992e,0x477a5925,0x4b867efc,0x74932295,0x8db68a3e,0x4d237a04,0x8a25ecfd,0x755e6fb9,0x5ab40b4c,0xd1ece5c8,0x42659e1a,0xb8f77bba,0x13efa92f,0x838a107b,0x4f7b0efc,0xfdb67136,0x9fd9c53c,0x47a34677,0x62a921fa,0xc76dd98f,0xe8ed3cbc,0xe7624117,0x31a1e31a,0xffb918b2,0x550c112e,0x87f8cee6,0x7be84fb7,0xd7cf23e7,0xe6483308,0xb9c6e801,0xef1fab75,0x6ebb8cf7,0x61612bc6,0x64e6ceb6,0x43d851e9,0x56ba76fc,0x7d7311e9,0x9367ab72,0xfd985cf2,0x2f6a787e,0x242c6acc,0x09cd13e8,0xc7f643f5,0x34ef0752,0xbf8e91ac,0xe5ac2a19,0xdc08634e,0xe11e7651,0xffe9a5f0,0x16096020,0x335381c5,0xa9f3ecfb,0xa223778b,0x0503fe33,0x441d05cd,0xd00ee7d1,0x16105bfe,0xba365dab,0x0a28eee4,0x8c62ab9f,0x392b0114,0xdcb9a2bf,0x224c4765,0x54c7c108,0x4f77d09f,0x7feca57b,0x021ab370,0x03afdbbb,0xa9086479,0x9795be29,0xce206725,0x688d9322,0xe32a554e,0xe82db3c3,0xddba6a33,0x337949fc,0xfd51c2cf,0x8a7be5a2,0x8658418d,0x589b2de1,0xeb5995d4,0xd8b78288,0xeb0fdc1b,0x70dc6f25
	],
	HASHES_STATUS:[
		/* surface + sky */
		0x3eb899d5,0xaba78c20,0x71f66c0a,0x188708f8,0xdc567b20,0x8b0f3d4e,0xc589e54a,0x0a71a913,0xbd9c3f11,0x1603e634,0x0897a195,0x50b05884,0x47310fe8,0x5ba580f7,0xdcfddda0,0xb0a1f717,0x19a6c29d,0x2636f89f,0xf583efb8,0x310a78d5,0x2cc8206e,0xcd9c47d9,0xc0001b13,0xa90dfa37,0xc66641dc,0xa1d0b517,0xb3421b7c,0x9f98fdf6,0x0243b01f,0xf8e6d311,0xda4b2bbe,0x3b219b4b,0xd1c47602,0x00e03162,0x23717d79,0x158d9363,0x40111fde,0x80ab4ea1,0xe3f7931d,0xc64d0291,0x75b0ce50,0xb3d4db5c,0x9feb4c99,0x1f210d1c,0x3d7e72eb,0xe5461c22,0x9039c6ac,0x4b6d77ff,0x9ae206d3,0x6e1e89e4,0xe956c974,0xe4a03313,0x4f8c7d71,0x9a92991a,0x61f39b77,0x0ce573ff,0x5dc2a1cc,0x882a6a8a,0xc3e555ab,0x1fe4e7d7,0x03b85cae,0xeb662ff7,0x635a7fec,0x75a7866a,0x7adf647f,0xf41c214f,0x20f9ea11,0xa19ef491,0x0400707c,0xd01b6667,0x60ddaf28,0xf4798f96,0xd1851f63,0x1a60a05b,0x6b5651e2,0x9356b9cf,0x0bbf88b9,0xcc216ab8,0x00c44710,0x8def4fd2,0x4479d9b4,0x4ce116fc,0x5821879f,0x52ab2c2c,0x559e494f,0xcac370bc,0x4381d3e3,0x4e1d51cc,0x10d6706c,0xf85d93b1,0x764f2259,0xc2b95f42,0x46d3a5cf,0xe4e38bc0,0xb9bc74f4,0xf3e20435,0x62db5348,0xf38397b5,0xc2261966,0xa0126c26,0x830c71b5,0x0f9410ba,0xcd3d992a,0xe8882446,0xbe035f89,0x2131d53e,0x3603e898,0xc3322c01,0x7445c20c,0xabe8b158,0x4554c022,0xeeb938f5,0x4983cb33,0x98d0cad4,0xcc69e5e9,0x8a4f5f90,0x11c67990,0xe8d56c4f,0x2c54c4cd,0x7bd07e53,0xfdc7415b,0x9ff1d245,0xb4a0dafe,0xb9b82618,0x5ab62997,0x20b07ac7,0x01779d8d,0x66974794,0x0ee473d5,0xcf7c5633,0xd644e361,0x69217c8f,0x22786cb5,0xa727f3e7,0x2f152a5a,0x05641932,0x90a2bcd3,0xab6f6cac,0x0cee37a9,0xe8a5ab17,0xec2bccf3,0x8d1db823,0x7869ca50,0x28c279e4,0xeb216531,0xd1c8656a,0x740e2ded,0x7757a518,0x76780513,0x0b0a7e4e,0x7996beaa,0x4d1ef1f3
	],
	COORDINATES:[
		[343.85880,135.69970,1009.02600], //3706669599997098509
		[4346.61700,284.19680,-2876.19100], //3706669599451864052
		[2369.06800,909.40000,-2596.35400], //4770193715620793208
		[-3078.51800,361.96360,-1617.26700], //6022860977194512716
		[-705.50000,150.61500,868.50000], //5884249694669007578
		[407.75810,263.23500,-2133.72900], //3706669597644926216
		[756.46430,201.34520,-823.93710], //16539779170063137974
		[-3354.11600,479.90000,-2386.28800], //13405483642948698553
		[-3407.00700,454.40000,1363.14300], //8860192180572767427
		[-4637.62100,571.78350,1513.26500], //16050442402269680510
		[-178.77890,399.09980,-1170.11900], //9298636874207633363
		[3299.94900,231.25270,-423.78990], //3706669600587269204
		[3469.54400,267.24730,2180.77700], //3706669600487081220
		[867.50000,260.49980,2278.40000], //15721881678295892633
		[-3538.89500,-14.31861,-850.99730], //3484393438511118739
		[-1715.41300,1268.46600,2118.70600], //4481796069518402693
		[-3882.20500,242.19670,2962.55100], //1544502840516710035
		[1269.90500,224.85220,-3733.42600], //12288157181790869597
		[4512.70700,120.66590,-2115.70700], //4564235428873871323
		[-1636.76400,358.27500,-2641.81500], //3706669597611391879
		[-1414.62400,208.04180,-756.84980], //9491726639789797584
		[-4538.60300,381.58100,-2880.47400], //17739253460342768120
		[915.49140,152.95700,251.00560], //3706669597357772780
		[698.54620,344.95000,-2793.05600], //16379162336903680645
		[-2445.69900,160.81900,3344.32000], //15771783894348194461
		[-3497.67700,184.99640,197.19090], //9338650269806293826
		[-1441.39700,208.44100,1616.09100], //7155360731604652807
		[4232.20900,106.72680,2178.16800], //16269416679489154857
		[-1166.91100,34.96000,-2602.42700], //14847552043580331356
		[-879.38790,168.40000,-422.53990], //3202239027597582890
		[-1106.74000,223.45320,-2087.81400], //1219319448910407936
		[1062.65100,164.77810,-1280.45900], //12284527712178542395
		[-1081.88500,248.05830,2186.94200], //5220738083176198347
		[-3727.70300,162.64600,3625.13000], //14921480893592442267
		[-970.18070,1130.74600,-3535.00000], //11427190267400183217
		[2567.84800,292.06950,-1245.93800], //3706669599556080402
		[-1404.49600,406.90440,-3677.91300], //14800086923534775594
		[-4153.18300,159.68540,-98.29942], //13342172519328099230
		[-3861.14600,821.75670,-2681.52000], //17817353031899869246
		[-2657.25400,186.78080,2237.30100], //7191917159863538220
		[-3651.68100,287.60000,-1806.02600], //3706669600060461460
		[3786.21700,604.86770,-577.77950], //470655870307890767
		[-1423.25000,186.90110,1350.75400], //3706669599761721576
		[-2947.92000,1015.87300,-3050.67500], //566497896325020658
		[3431.06700,189.97470,-3356.71700], //15940742935534635403
		[2915.87700,1070.28100,-534.32140], //5868318661063497950
		[221.74680,147.02710,-1085.05100], //13216567496985632702
		[-3290.62500,143.40000,2512.20500], //3886321805362048970
		[-785.41380,137.38160,434.04790], //8289506274315718108
		[3886.69100,283.20010,216.77190], //7501929949082738369
		[1881.97200,1370.10300,-1202.81600], //15401342467416107606
		[3304.87600,545.10100,-1442.98200], //3706669597704307786
		[4655.00000,1129.77100,-3499.54400], //9332168032648073450
		[-395.86790,406.61700,-2735.84900], //11341280796428223190
		[2400.26800,521.69530,-3275.06700], //13631206035683434662
		[-1795.00000,1130.29400,3294.60100], //18046839839417991218
		[669.99700,190.92600,3358.39400], //3706669600415844212
		[4266.91800,301.04940,1673.44000], //3706669596981818745
		[-1530.20100,440.32420,2928.76400], //6932476196341692752
		[-1921.50000,347.50000,358.50000], //12516050804968674671
		[274.90660,1579.28200,912.70840], //6194669915146089378
		[709.13000,1703.65000,1382.68600], //17020329877204665836
		[26.06718,1527.75000,1503.59800], //6584225077922070252
		[389.62920,2417.90700,1661.45400], //4786617568701405606
		[1762.48800,555.90000,-2509.65500], //8679504486284319794
		[-2529.98500,296.90000,-1170.17400], //14581002594613360321
		[4613.31400,1908.90000,947.12630], //2250303367775975576
		[-4058.43500,302.43740,-1990.00400], //2057224001439727101
		[-709.24540,125.28500,1551.04300], //6100761451613167203
		[3480.70800,1444.63300,-665.87850], //15807455737262066764
		[-2318.20700,292.70000,-2201.20700], //12133446213297895892
		[1075.27600,905.12240,3347.77200], //15689658867304973439
		[-3506.87700,506.16190,-3569.99800], //11059292586330540704
		[1842.02300,482.61550,-2842.03500], //14426024125931193716
		[3061.00100,335.47750,-1824.01900], //9170623054249873905
		[-4469.00600,628.53140,671.46730], //14979288695847647471
		[1218.44200,215.77990,2543.16300], //2578953829975462576
		[-177.79290,141.90000,1558.29300], //9360982685086656582
		[-2524.26400,250.50920,1770.11600], //14785290047383444481
		[-2036.95700,183.89720,1853.40100], //1178390866463876948
		[4166.69800,348.41260,-1322.74100], //15749518706488600034
		[3526.22300,286.85940,1482.28700], //5443891923631448858
		[162.46710,877.92500,-1971.65500], //9202906523206436946
		[2350.99000,1594.75600,1782.80700], //17664182441699345035
		[1202.08900,145.99920,-329.73130], //8447832919716545690
		[2825.82900,196.97200,3270.34800], //3706669600044767565
		[-4390.56700,331.53480,-3714.10100], //14603274400948347832
		[-4680.10000,173.72500,3086.43600], //7214969785032225392
		[2864.04200,360.05280,-3638.21600], //5203105769096758003
		[2960.00600,643.47250,-2758.11100], //12385279649734793255
		[4654.99000,250.00000,-3713.83600], //17485665379339192933
		[-1829.70000,266.77510,-1195.26600], //2072131998140003467
		[103.41430,30.97361,2518.05200], //14311940204292393413
		[2856.84800,1331.02500,2856.47400], //5975863457826967040
		[4413.22900,153.64550,613.12490], //9163936624076415760
		[3729.37900,308.03970,2058.65800], //15693931310568694896
		[-1795.00900,164.67620,3486.56200], //12032964585153506059
		[2276.22800,197.88310,-147.35280], //5861869558627218482
		[2679.24400,249.97740,-1904.45200], //8038234059898225338
		[4505.99700,1274.02100,-2166.01600], //12701036722233030766
		[-2138.97900,212.67610,874.44140], //13993165044825966276
		[2918.25000,274.15000,-507.00000], //11159300761559695025
		[1834.44500,376.78590,-3180.34600], //14998219935987265119
		[-3951.06000,230.90000,-1139.08000], //16168364867056534665
		[-3211.00000,68.99972,3006.50000], //8161412932709740336
		[-3296.00600,1466.74900,-3431.50600], //7549815870314025151
		[354.65410,297.70820,-1891.89400], //11192380528645083635
		[2304.06000,90.03803,2377.93100], //17518095894583343332
		[166.66010,298.16850,-2320.12600], //8050356554736513946
		[1376.40800,548.01390,3339.86000], //16559659105908682856
		[3670.70000,1276.90000,-1483.69700], //10321403316262478069
		[-2997.81100,633.92930,-3101.62700], //15663201104618704077
		[2755.53300,219.20460,1089.25300], //8029632291316616039
		[3346.26700,176.63530,1186.89400], //15616768917486777934
		[4631.17200,137.40130,3712.00900], //8422260082440600211
		[621.09620,283.77100,-2211.41100], //15779265771384956886
		[3093.97600,201.29350,3209.68200], //12422124679579260671
		[-3369.64500,1814.48200,-467.49020], //17148149742622196180
		[-4158.70700,146.90000,3825.29300], //13812044788472212303
		[2361.23800,275.39500,510.75050], //18320955024951674721
		[349.28310,92.14629,2051.54400], //258025124944826518
		[-2401.84400,734.31790,-825.22710], //14199645569445824140
		[1565.83800,276.56460,1944.80700], //3706669599740966765
		[333.15160,148.04060,-470.00590], //2116984015830799764
		[-74.91470,140.08480,1115.72300], //15035282945062776479
		[-824.81810,353.82600,-3535.03400], //14811327802033936260
		[-2846.96900,352.52400,-629.79110], //13942626539738256687
		[1758.48900,1042.96500,1208.38400], //3803494967063147861
		[-3596.14700,1817.96900,-960.78690], //6920521167051147138
		[3841.97300,167.40000,-2300.29200], //9598825215232031726
		[930.89060,149.13930,1903.41600], //12562602085856083332
		[-565.00000,248.20000,3524.00000], //16080669062060353362
		[-2559.44300,364.04060,-3353.75700], //8655043382873705766
		[-594.51100,104.63790,-1550.62200], //360091485100814377
		[3810.51700,209.67330,-1219.11300], //1616765883509243653
		[1769.89700,285.04570,1051.93300], //2610556981700923064
		[-205.15470,139.90000,-451.46670], //10695500624987356704
		[1799.54900,430.71170,-1639.53600], //13093707767515135502
		[1743.66100,144.45500,-17.58603], //6383063040059294959
		[4664.12400,120.94640,-3263.21800], //15017550175013001466
		[-4167.10700,169.11150,2143.19900], //1765800409617252384
		[1515.19400,261.14310,3577.11400], //3706669600511528823
		[-240.74390,145.90000,371.03410], //3575507920720413357
		[4497.82200,214.60000,-826.40550], //2554473647487672451
		[1181.58200,252.53150,779.39400], //14991808315346729211
		[-1257.24100,1127.16800,1486.95900], //10610809984558587818
		[4545.81600,1239.94300,846.09480], //12769683147038228295
		[393.85650,187.54430,-3484.64500], //17578465468269309307
		[-3546.68200,2083.98700,320.65480], //8915616496436459985
		[340.39370,1939.90000,-2814.73200], //2421293063711975271
		[1468.61100,704.81320,2168.89300], //7242573067115231041
		[-1802.01700,1067.90000,-3406.80700] //9837676963057931142
	]
};


var Lightroot={
	countFound:function(){
		var count=0;
		var offsets=SavegameEditor._getOffsetsByHashes(Lightroot.HASHES_FOUND);
		for(var i=0; i<Lightroot.HASHES_FOUND.length; i++){
			var val=tempFile.readU32(offsets[Lightroot.HASHES_FOUND[i]]);
			if(val===0 || val===1)
				count+=val;
			else
				console.error('invalid light root found value: '+val);
		}
		return count;
	},
	setAllAsFound:function(){
		var count=0;
		var offsets=SavegameEditor._getOffsetsByHashes(Lightroot.HASHES_FOUND);
		for(var i=0; i<Lightroot.HASHES_FOUND.length; i++){
			var val=tempFile.readU32(offsets[Lightroot.HASHES_FOUND[i]]);
			if(val===0){
				tempFile.writeU32(offsets[Lightroot.HASHES_FOUND[i]], 1);
				count++;
			}
		}
		MarcDialogs.alert(count+' lightroots set as found.');
		SavegameEditor.refreshLightrootCounters();
		return count;
	},
	countClear:function(){
		var count=0;
		var offsets=SavegameEditor._getOffsetsByHashes(Lightroot.HASHES_STATUS);
		for(var i=0; i<Lightroot.HASHES_STATUS.length; i++){
			var val=tempFile.readU32(offsets[Lightroot.HASHES_STATUS[i]]);
			if(val===0x1818ec02)
				count++;
			else if(val!==0x8a88c430)
				console.error('invalid lightroot clear value: '+val);
		}
		return count;
	},
	setAllAsClear:function(){
		var count=0;
		var offsets=SavegameEditor._getOffsetsByHashes(Lightroot.HASHES_STATUS);
		for(var i=0; i<Lightroot.HASHES_STATUS.length; i++){
			var val=tempFile.readU32(offsets[Lightroot.HASHES_STATUS[i]]);
			if(val!==0x1818ec02){
				tempFile.writeU32(offsets[Lightroot.HASHES_STATUS[i]], 0x1818ec02);
				count++;
			}
		}
		this.setAllAsFound();
		MarcDialogs.alert(count+' lightroots set as clear.');
		SavegameEditor.refreshLightrootCounters();
		return count;
	},

	STATUS_VALUES:{
		0x8a88c430:'Close',
		0x1818ec02:'Open',
	},

	HASHES_DISPLAY_FOLIAGE:[
		/* CheckPoint_IsDisplayFoliage.CheckPointXXX (000~147) */
		//0x0e7aeb1b,0x44f8c5ee,0xe9e39c0a,0x74acd11b,0x3cc2cd3f,0x89a21d18,0xc218ae9e,0x2926ed79,0x725bff6a,0x032b9123,0xda29f470,0x723f746f,0xfb01c1a7,0x641b9634,0x5b3fe625,0x0bd80c6c,0x2ec0d656,0xfc063553,0x8f4f97fa,0xb1b28103,0x5ec74ae8,0xd618386f,0x26b858fa,0xf422d6b7,0x9fc07ec7,0x24872bb3,0x6036408d,0xe49bfb8c,0xba171c26,0xf45335a8,0xb94fcf02,0xb03d548d,0x5b1cf0d3,0xf0d5728a,0x3dddbe98,0x37487d18,0x8793153f,0x3d668881,0x774b40ac,0x4aba4a05,0x788dd669,0x5ff0812b,0x58b2987a,0xca3bdd35,0x25bffb14,0x218857e9,0xe02ec552,0x9e2696bb,0xf5b2e7be,0xc94e54bb,0x6ab75159,0xec04023f,0x9565ace9,0xbf05cf73,0xf8f0ec24,0xfa0cf870,0x770cbe7c,0x2c1cd132,0xc098fb56,0x63219451,0x1605bd79,0xbdc58806,0xb446e1e1,0xacbbb523,0x8f9b8139,0xe17d3aa7,0xee4caeef,0x05eddd99,0x5f18a8d2,0xa0985c87,0xbc1bacd4,0xe3de91f5,0xf0e0d349,0xe3287ae0,0xf9fac1cb,0x7d90a83a,0xa548bf82,0xe3884a76,0xba062b89,0x6ffee3f9,0x17207ca5,0xd050d299,0x0c293091,0xb100339a,0x77671bcf,0x141dc69f,0xd9bd0e35,0x4c31d012,0x96fde534,0x34904a73,0x5a54149f,0x6cc92d32,0x7e611213,0x425f2379,0xc1068384,0xe378b5cb,0xe3edfa09,0x8f786300,0x09af145c,0x6424c778,0x99429cff,0x751c425c,0xed15393e,0x957cce85,0x23b2998b,0x9f378df1,0x170bca6e,0x1e83422a,0xb793e72a,0x6b8970a6,0xd7349109,0x910a4c6b,0x91422099,0x16b93d79,0xdb933d99,0x95b5e34c,0xe02932a4,0x661503c9,0x1ae8f540,0x87784090
	],
	HASHES_FOUND:[
		/* IsVisitLocation.CheckPointXXX (000~147) */
		0x7bce687d,0x8b69cec8,0xe7047303,0x597513c5,0x858d2ac0,0x5b5dfc20,0x8526bec2,0x8f91b33d,0x8233a664,0x67035946,0x88223fe5,0xb32c32c4,0xf3159456,0x17ecb8a2,0xe3e167d7,0x095e8a69,0x363464a8,0x599a3903,0x2b120f63,0x2a63694c,0xf5542404,0x1cb7eefa,0x2dfd5b6d,0x03832844,0x90634724,0x8329ff03,0xeee83601,0xbec33040,0x74b151b7,0xc15b2932,0x3e61c140,0xb4d06edb,0x6f5b6bad,0xb2f2865a,0xa2f31755,0xde268d00,0xd164048f,0xbbcb892e,0x36cbfed5,0x1a4d4c9b,0x052984ec,0x12ce4c4e,0x5b98f982,0xeaafe8c7,0x57b56abb,0x9dea19d8,0x9b06160b,0xbf9a10a2,0x949b655d,0x7332fddd,0x755f89d1,0x322f5f60,0x595521e7,0x4559b3ea,0x86e60d1c,0xf9850baf,0x6228c14c,0x1e879413,0xb13eda28,0x19754dd2,0xdb7d503d,0x2cd6c29b,0x6df0207f,0x51da3fdb,0x9ecde07d,0x453bb9a4,0x883dfe55,0x64ccbf17,0xa97795f2,0x58b1cb6c,0x258a7039,0xc3cc3a88,0x73b842c2,0x8f4d1cc3,0x04726d00,0x597963c3,0x63bdcf90,0x298b16a1,0x4c001ff4,0x6b49c8be,0xa812d7ab,0x122c88ec,0x0f6fca9e,0x699b3fd0,0x27d89912,0xd790a3f3,0x6728886d,0xbd38a8dc,0x5263d4af,0x296492f7,0xa5a1ca6f,0x3d777c0b,0x622a66b6,0xede17222,0x1909c91e,0x079c2dc3,0x961acc33,0x1de99fcb,0x10437217,0x62c0aef5,0xeebc2ef6,0x72844204,0x5d93b985,0x6df73ff1,0xfa0bbe02,0xfe77e85e,0x852ee934,0x6618c85d,0x9f9b6dc5,0x832bbf51,0xa8074bca,0xc301c569,0x721c18d9,0x571f855a,0xc103e463,0x587392b1,0x7f8fec03,0x8f6298c5,0xfbad4e18,0xb59ac43c
	],
	HASHES_STATUS:[
		/* depths */
		0x7983cce0,0x33333cf3,0x6ce18207,0x7501c055,0x9c33c0ee,0x95d2e545,0x530db3b0,0x9bd202cc,0xab0e7ef8,0x723b6d8e,0xeccad937,0x4116fa3e,0xaed0da21,0x0a2fdbc3,0xb31f1425,0xbee71ef6,0x4ac984db,0x86e292a9,0xf8b91db5,0xdb81082f,0xd4c93cc9,0xc7cb0492,0xc61ba8df,0x0bb75174,0x6201c8ac,0xa9a431cb,0xbbc09a60,0x13bc2e90,0xba91b753,0xaf882235,0xc2cd7915,0x9d2db8a6,0x2ec46dd2,0x0a33d50c,0x2793d5bb,0x49392f92,0x84355f56,0xfb2f476e,0xbe46eba7,0xb8d409fd,0xee57ca34,0x232909ae,0xc390c14c,0xabaea27b,0xc6bc55d7,0x4075b322,0x24328c5c,0xa0085daf,0x77799f4a,0x33d16080,0xbbf762e5,0x94086d71,0xfb6e8e6c,0xdac90992,0x006e7a5a,0xf5d75e0a,0x61e2866e,0x7bae4c8e,0xadf9154f,0x31c50a5f,0x140d736b,0xbfdd8d3f,0xb14fc97b,0xc181f676,0xa63867fd,0xa001d192,0x3b45aa8d,0x41fa367a,0xaa8adcf2,0x5ecd7ea3,0xec233a4a,0xb9611cee,0x35efab4e,0x283ee0a6,0x6a7ac761,0x4cf98564,0xb89fb0cd,0xd954340d,0x23695bda,0x6f55e393,0x2ff4ebb3,0x0d5ea2fd,0x6702abaa,0x53507726,0x74950956,0x9c935dcb,0x0d4edad3,0x719e8143,0xf3a643b9,0x5044e2d8,0xed5acc20,0x98dd1df6,0x713eebd5,0x5fa57783,0x530886a7,0x157c9e81,0xd70f9780,0xcf10361e,0x83c3d803,0xde71e3e3,0x6aa3fa2c,0x62c43124,0xc6b1451f,0x6507c376,0x5a3d6726,0x2141d33d,0xd93514dc,0x8e2c31ea,0xa994a428,0x043414d5,0x8d9c0736,0x620231c3,0x32b32061,0xa0e5c6ec,0xa014ed46,0xb54c7930,0x9b9723ae,0x643e2a3f,0xfc5e195a,0x1dd1086a
	],
	COORDINATES:[
		[343.38930,-383.81320,1008.14300], //2222982200064325555
		[4346.97600,-523.64130,-2877.12500], //5927532289172711421
		[2368.05300,-864.34160,-2596.93200], //1073446335131560504
		[-3077.60100,-602.50010,-1616.86800], //3494466116898860838
		[-705.50000,-396.47160,867.50000], //1188332605705855397
		[406.86900,-507.68760,-2134.18700], //7852504487885913902
		[757.46420,-447.30130,-823.94880], //5446600804276168807
		[-3353.50000,-718.12510,-2385.50000], //15332436707617377508
		[-3406.30000,-695.33230,1363.85000], //15133726274916334364
		[-4638.18800,-806.25010,1512.44100], //2632044899258854009
		[-177.85500,-430.88510,-1169.73600], //14759796370794016750
		[3298.18800,-664.75460,-419.85240], //7777138780163913269
		[3469.76500,-510.13580,2181.75200], //8851247571931353791
		[867.50000,-471.84830,2277.40000], //5617687387859725326
		[-3538.89500,-491.66360,-851.99730], //15979754958951728294
		[-3882.91200,-349.86460,2963.25800], //9853124154943816871
		[1269.00000,-468.93760,-3733.00000], //6705387379563065827
		[4512.00000,-368.78760,-2115.00000], //17569011928743444813
		[-1637.52800,-601.18430,-2642.46100], //7830177784118003046
		[-1415.61500,-453.75010,-756.71900], //13624668436923382497
		[-4537.86000,-623.12510,-2879.80500], //1553774110296074699
		[915.73300,-397.07980,251.97600], //15691772646333517729
		[697.56100,-586.93760,-2792.88500], //17047499894147630806
		[-2439.82600,-380.51010,3343.33500], //18297318738981885523
		[-3487.42700,-431.43990,214.52800], //14847003636554828827
		[-1442.39500,-453.70110,1616.15600], //16963756904315252021
		[4232.82000,-437.10900,2177.37600], //942715847652335116
		[-1167.90500,-266.01930,-2602.31900], //3938184961009095924
		[-878.50000,-412.93220,-423.00000], //9643672080647439998
		[-1106.74000,-469.41710,-2088.81400], //1078264261814837872
		[1063.05800,-411.12510,-1281.37200], //14160680716588417692
		[-1080.70500,-476.94930,2186.45000], //16782305106359315442
		[-3728.64200,-409.90640,3624.78800], //7353997067445509390
		[2568.26800,-516.06370,-1246.84600], //4196076068345192434
		[-1403.50000,-628.08830,-3678.00000], //5261844857660624968
		[-4154.08900,-405.06460,-97.87680], //16624547328645758630
		[-2656.33100,-403.63610,2237.68600], //187526045614146965
		[-3652.50000,-332.62510,-1806.60000], //526161824092106160
		[3785.35100,-841.79700,-578.27950], //3715004739223145212
		[-1423.25000,-433.21530,1351.75400], //15588242881506300672
		[3431.06700,-436.22790,-3357.71700], //16351189223151010223
		[221.11510,-389.87510,-1084.27600], //13194896299493018792
		[-3291.19800,-391.28190,2511.38600], //16075380490593988296
		[-785.00000,-385.12510,433.13750], //7543225414959936403
		[3886.34900,-524.25010,215.83220], //6960229581963146386
		[3304.00000,-705.82000,-1442.50000], //14406548105255292006
		[-396.57500,-640.75010,-2735.14200], //17409586108914469816
		[2400.56700,-760.19200,-3276.02100], //856002620845773382
		[670.97970,-399.30320,3358.20800], //3130979434012602480
		[4267.47200,-544.20030,1672.60700], //14870311718230209664
		[-1531.17200,-646.61300,2928.52700], //9446957189684574244
		[-1921.50000,-551.18230,359.50000], //3795320250055809500
		[1763.00600,-634.80250,-2510.51000], //988904475702885700
		[-2529.00000,-538.66140,-1170.00000], //7105978231220367103
		[-4057.83500,-590.22030,-1989.20400], //430492679262022050
		[-708.25150,-432.68760,1551.15300], //6672576738633253583
		[-2317.50000,-696.48560,-2200.50000], //9073201416910040203
		[-3508.26400,-742.26700,-3568.96400], //1964399962173331759
		[1842.17700,-753.95020,-2843.02300], //4506307247586698668
		[3060.80800,-578.39730,-1825.00000], //8950002860902977090
		[-4469.55100,-864.43760,672.30570], //7629193680127162509
		[1218.91900,-527.56260,2544.04200], //14958106492461393828
		[-178.50000,-389.15250,1559.00000], //10778756789868914821
		[-2525.12700,-629.09610,1769.60900], //9445971057540749693
		[-2037.14400,-420.06100,1852.41900], //10674686163105987590
		[4166.81600,-589.03590,-1321.74800], //3627143891404418287
		[3525.23500,-527.78400,1482.46100], //17593105975068887139
		[1201.39200,-490.06260,-330.44850], //9361904456587435139
		[2825.33000,-442.06260,3269.48200], //8261555810043328878
		[-4389.60200,-618.22220,-3713.84200], //15661384375043611638
		[-4681.00000,-419.22970,3086.00000], //5001411861114026574
		[2864.62500,-600.68760,-3639.02900], //9776046205053905990
		[2961.00000,-878.98690,-2758.00000], //15300157018943625844
		[4654.50000,-295.46980,-3732.00000], //11249560268426262525
		[-1829.34900,-638.62510,-1196.20200], //15292924324416583251
		[102.54650,-329.68210,2518.54900], //8560432106887742236
		[4413.19100,-429.06220,612.31960], //17977854599178279976
		[3728.45900,-581.06260,2059.05000], //2937876643219640696
		[-1795.00000,-372.52970,3497.96400], //15572937791109486610
		[2276.45800,-416.78480,-149.69030], //3613951084277037083
		[2679.82800,-603.96340,-1903.64000], //1537451556263800482
		[-2138.11000,-458.22340,874.93710], //16516341641098061200
		[2918.25000,-710.82210,-508.00000], //15775510696959450259
		[1835.06800,-753.43760,-3181.12800], //7024049064145212841
		[-3951.66000,-467.37760,-1139.88000], //15188440507379936302
		[-3211.00000,-386.35060,3005.50000], //14632121924956587691
		[355.42240,-541.35630,-1892.53400], //13927570019193239887
		[2303.24100,-533.10040,2378.50500], //12467162907237037140
		[166.84630,-541.28820,-2321.10800], //9276748500853091342
		[-2998.43800,-921.89530,-3100.82600], //1098212955050032340
		[2755.96900,-464.93760,1088.35300], //8114838972919647813
		[3346.26700,-525.50010,1185.89400], //12578049909514793367
		[4630.28500,-421.49870,3711.54800], //17361455694750609913
		[622.49170,-527.18590,-2211.11300], //7761453018459950974
		[3092.99700,-539.93760,3209.47400], //3899227484303438246
		[-4158.00000,-394.06260,3826.00000], //14516191386673860434
		[2360.32500,-504.79920,510.34400], //10092291397787492135
		[350.12140,-386.96930,2052.08900], //1395215114268221503
		[1563.41500,-379.52820,1944.99400], //3545345458671766266
		[333.76300,-395.14710,-469.21450], //17381961753032913225
		[-73.91613,-387.33880,1115.66900], //2602177704870095151
		[-849.82310,-531.78130,-3534.50000], //17032063559377736108
		[-2846.07000,-537.37510,-630.23000], //17068668257268574088
		[3840.99400,-403.36540,-2300.49300], //13832680745282739006
		[930.07150,-375.68790,1903.99000], //18215960929295425812
		[-564.00000,-490.06260,3524.00000], //12381965081678477176
		[-2558.53200,-605.62510,-3354.16900], //15567291360407722269
		[-595.15590,-514.74940,-1549.85800], //3458938780876686774
		[3811.51300,-452.18760,-1219.20000], //6100267830639268098
		[1769.31300,-524.06680,1052.74500], //18020607429271974229
		[-204.28300,-387.94380,-450.97600], //17000990336242649062
		[1799.97300,-664.93340,-1640.44100], //5934968231895753384
		[1742.84100,-375.27880,-18.15964], //4994019147886559674
		[4663.50000,-368.81260,-3264.00000], //3343250419064572858
		[-4168.96000,-403.25220,2142.15300], //12533003852582567682
		[1514.28800,-445.35500,3577.53600], //10526215084810760955
		[-240.48510,-393.62410,372.00000], //6666677982430176362
		[4497.35100,-451.13560,-827.28800], //1577897290662703489
		[1180.71100,-415.59020,778.90370], //13224911340921093339
		[394.15230,-510.25010,-3483.68900] //6692540450316233444
	]
};