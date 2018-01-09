

function addpdc(pdc, scene)
{
	pdc.plateSquare = 0;
	pdc.topSquare = 0;
	pdc.plateEdgeLen = 0;
	pdc.topEdgeLen = 0;

	var half = pdc.profileThk / 2;
	var offset = pdc.topOffset;
	var hProfil = pdc.h - pdc.topThk - pdc.botThk;
	pdc.profileG = new THREE.BoxGeometry(pdc.profileThk, hProfil, pdc.profileThk);
	addProfile(0, -pdc.l / 2 + half + offset, hProfil / 2 + pdc.botThk, -pdc.w / 2 + half + offset, pdc, scene);	
	addProfile(1, pdc.l / 2 - half - offset, hProfil / 2 + pdc.botThk, -pdc.w / 2 + half + offset, pdc, scene);
	addProfile(2, -pdc.l / 2 + half + offset, hProfil / 2 + pdc.botThk, pdc.w / 2 - half - offset, pdc, scene);
	addProfile(3, pdc.l / 2 - half - offset, hProfil / 2 + pdc.botThk, pdc.w / 2 - half - offset, pdc, scene);	

	var wProfil = pdc.w - pdc.profileThk * 2 - offset * 2;
	pdc.profileG = new THREE.BoxGeometry(pdc.profileThk, pdc.profileThk, wProfil);
	addProfile(4, -pdc.l / 2 + half + offset, pdc.botThk + half, 0, pdc, scene);
	addProfile(5, -pdc.l / 2 + half + offset, hProfil + 0.010, 0, pdc, scene);
	addProfile(6, pdc.l / 2 - half - offset, pdc.botThk + half, 0, pdc, scene);
	addProfile(7, pdc.l / 2 - half - offset, hProfil + 0.010, 0, pdc, scene);

	var	lProfil = pdc.l - pdc.profileThk * 2 - offset * 2;
	pdc.profileG = new THREE.BoxGeometry(lProfil, pdc.profileThk, pdc.profileThk);
	addProfile(8, 0, hProfil + 0.01, pdc.w / 2 - half - offset, pdc, scene);
	addProfile(9, 0, hProfil + 0.01, -pdc.w / 2 + half + offset, pdc, scene);

	pdc.topG = new THREE.BoxGeometry(pdc.l, pdc.topThk, pdc.w);
//	var modifier = new THREE.BufferSubdivisionModifier(10);
//	modifier.modify(pdc.topG);
	pdc.topW = new THREE.Mesh(pdc.topG, pdc.woodMat[pdc.woodColor]);
	pdc.topW.position.set(0, pdc.h - pdc.topThk / 2, 0);
	pdc.topW.castShadow = true;
	scene.add(pdc.topW);

	pdc.topSquare += pdc.l * pdc.w;
	pdc.topEdgeLen += (pdc.l + pdc.w) * 2;

	if (segmentOptions[params.options] == 1)
	{
		var inputH = params.h - pdc.topThk - pdc.profileThk - 0.03;
		pdc.shelfG = new THREE.BoxGeometry(pdc.l - 0.01, pdc.topThk, pdc.w - 0.01 - 0.06);
		for (var i = 0; i != params.quantity; i++)
		{

			pdc.shelfs[i] = new THREE.Mesh(pdc.shelfG, pdc.woodMat[pdc.woodColor]);
			pdc.shelfs[i].position.set(0, 0.03 + (inputH / (params.quantity + 1) * (i + 1)) , 0);
			pdc.shelfs[i].castShadow = true;
			scene.add(pdc.shelfs[i]);

			pdc.topSquare += (pdc.l - 0.01) * (pdc.w - 0.01 - 0.06);
			pdc.topEdgeLen += ((pdc.l - 0.01) + (pdc.w - 0.01 - 0.06)) * 2;
		}
	}
	else if (segmentOptions[params.options] == 2)
	{
		pdc.sectionL = pdc.l - pdc.profileThk * 2 - pdc.topOffset * 2;
		pdc.sectionH = pdc.h - pdc.topThk - pdc.profileThk - 0.15;
		pdc.sectionW = pdc.w - pdc.topOffset * 2;


		var segmentL = pdc.sectionL;
		var segmentH = pdc.sectionH;
		var segmentW = pdc.sectionW;
		
		pdc.plateTopBotG = new THREE.BoxGeometry(segmentL, pdc.plateThk, segmentW - pdc.plateThk);
		pdc.plateBotW = new THREE.Mesh(pdc.plateTopBotG, pdc.woodMat[pdc.woodColor]);
		pdc.plateBotW.position.set(0, pdc.plateThk / 2 + 0.15, pdc.plateThk / 2);
		pdc.plateBotW.castShadow = true;
		scene.add(pdc.plateBotW);
		pdc.plateTopW = new THREE.Mesh(pdc.plateTopBotG, pdc.woodMat[pdc.woodColor]);
		pdc.plateTopW.position.set(0, -pdc.plateThk / 2 + segmentH + 0.15, pdc.plateThk / 2);
		pdc.plateTopW.castShadow = true;
		scene.add(pdc.plateTopW);

		pdc.plateSquare += (segmentL * segmentW - pdc.plateThk * 2) * 2;
		pdc.plateEdgeLen += (segmentL + (segmentW - pdc.plateThk * 2)) * 2 * 2;

		var plateBackL = segmentL / params.quantity;
		pdc.plateBackG = new THREE.BoxGeometry(plateBackL, segmentH, pdc.plateThk);
		for (var i = 0; i != params.quantity; i++)
		{
			pdc.platesB[i] = new THREE.Mesh(pdc.plateBackG, pdc.woodMat[pdc.woodColor]);
			pdc.platesB[i].position.set((-plateBackL / 2 * params.quantity) + plateBackL / 2 + plateBackL * (i + 0),
				segmentH / 2 + 0.15,  -segmentW / 2 + pdc.plateThk / 2);
			pdc.platesB[i].castShadow = true;
			scene.add(pdc.platesB[i]);

			pdc.plateSquare += plateBackL * segmentH;
			pdc.plateEdgeLen += (plateBackL + segmentH) * 2;
		}

		pdc.nVplates = params.quantity + 1;
		var vPlatesQuantity = pdc.nVplates;
		pdc.plateVerticalG = new THREE.BoxGeometry(pdc.plateThk, segmentH - pdc.plateThk * 2, segmentW - pdc.plateThk); 
		for (var i = 0; i != vPlatesQuantity; i++)
		{
			pdc.platesV[i] = new THREE.Mesh(pdc.plateVerticalG, pdc.woodMat[pdc.woodColor]);
			pdc.platesV[i].position.set((-segmentL / 2 + pdc.plateThk / 2) + ((segmentL - pdc.plateThk) / params.quantity * i),
								(segmentH - pdc.plateThk * 2) / 2 + 0.15 + pdc.plateThk, pdc.plateThk / 2);
			pdc.platesV[i].castShadow = true;
			scene.add(pdc.platesV[i]);

			pdc.plateSquare += (segmentH - pdc.plateThk * 2) * (segmentW - pdc.plateThk * 2);
			pdc.plateEdgeLen += ((segmentH - pdc.plateThk * 2) + (segmentW - pdc.plateThk * 2)) * 2;
		}
	//	pdc.woodMat[pdc.woodColor].transparent = true;
	//	pdc.woodMat[pdc.woodColor].opacity = 0.5;
	
		var hPlatesL = (segmentL - pdc.plateThk * vPlatesQuantity) / params.quantity;
		pdc.plateHorisontalG = new THREE.BoxGeometry(hPlatesL, pdc.plateThk, segmentW - pdc.plateThk * 2);
		pdc.shelfG = new THREE.BoxGeometry(hPlatesL, pdc.plateThk, segmentW - pdc.plateThk * 2 - 0.02);
		var k = 0, l = 0, s = 0;
		//var pdc.doorMat = {};
		for (var key in pdc.woodMat[pdc.woodColor])
			pdc.doorMat[key] = pdc.woodMat[pdc.woodColor][key];
		pdc.doorMat.transparent = true;
		pdc.doorMat.opacity = 0.8;
		//var doorL, doorH, div3;
		for (var i = 0; i != params.quantity; i++)
		{
			for (var r = 0; r != segmentParams[i].quantity; r++)
			{
				if (r > 0)
				{
					pdc.platesH[k] = new THREE.Mesh(pdc.plateHorisontalG, pdc.woodMat[pdc.woodColor]);
					pdc.platesH[k].position.set((-segmentL / 2 + hPlatesL / 2 + pdc.plateThk) + (hPlatesL + pdc.plateThk) * i, 
						0.15 + (segmentH / (segmentParams[i].quantity ) * (r)), pdc.plateThk);
					pdc.platesH[k].castShadow = true;
					scene.add(pdc.platesH[k]);
					k++;

					pdc.plateSquare += hPlatesL * (segmentW - pdc.plateThk * 2);
					pdc.plateEdgeLen += (hPlatesL + (segmentW - pdc.plateThk * 2)) * 2;
				}
				//polki
				for (var j = 0; j != segmentParams[i].segmentParams2[r].quantity; j++)
				{
					var div1 = (segmentH / segmentParams[i].quantity / (segmentParams[i].segmentParams2[r].quantity + 1) * (j + 1));
					var div2 = (segmentH / (segmentParams[i].quantity) * (r));
					pdc.shelfs[s] = new THREE.Mesh(pdc.plateHorisontalG, pdc.woodMat[pdc.woodColor]);
					pdc.shelfs[s].position.set((-segmentL / 2 + hPlatesL / 2 + pdc.plateThk) + (hPlatesL + pdc.plateThk) * i, 
						0.15 + div1 + div2, -pdc.plateThk / 2);
					pdc.shelfs[s].castShadow = true;
					scene.add(pdc.shelfs[s]);
					s++;

					pdc.plateSquare += hPlatesL * (segmentW - pdc.plateThk * 2 - 0.02);
					pdc.plateEdgeLen += (hPlatesL + (segmentW - pdc.plateThk * 2 - 0.02)) * 2;

				}
				if (secondSegmentOptions[segmentParams[i].segmentParams2[r].options] == 1)
					l += addDoors(i, l, r);
			}
		}
	}


//	pdc.segmentQuantity = params.vDivide;
	pdc.profileLen = hProfil * 4 + wProfil * 4 + lProfil * 2;

}

function addDoors(i, l, r)
{
	var doorL = (pdc.sectionL - pdc.plateThk * pdc.nVplates) / params.quantity - 0.003;
	var doorH = (pdc.sectionH - pdc.plateThk) / segmentParams[i].quantity - pdc.plateThk - 0.003;
	var doorPosL = (-pdc.sectionL / 2 + doorL / 2 + pdc.plateThk + 0.0015) + (doorL + pdc.plateThk + 0.003) * i;
	var doorPosH = ((pdc.sectionH - pdc.plateThk) / (segmentParams[i].quantity) * (r)) + 0.15 + doorH / 2 + pdc.plateThk + 0.0015;
	
	if (doorL <= 0.6)
	{
		pdc.doorG = new THREE.BoxGeometry(doorL, doorH, pdc.plateThk);
		pdc.doors[l] = new THREE.Mesh(pdc.doorG, pdc.doorMat);
		pdc.doors[l].position.set(doorPosL, doorPosH, pdc.sectionW / 2 - pdc.plateThk / 2);
		pdc.doors[l].castShadow = true;
		scene.add(pdc.doors[l]);
		addHandle(doorL, doorPosH, i, l, i, 0);
		pdc.plateSquare += doorL * doorH;
		pdc.plateEdgeLen += (doorL + doorH) * 2;
		return (1);
	}
	else
	{
		pdc.doorG = new THREE.BoxGeometry(doorL / 2 - 0.0015, doorH, pdc.plateThk);
		pdc.doors[l] = new THREE.Mesh(pdc.doorG, pdc.doorMat);
		pdc.doors[l].position.set(doorPosL - doorL / 4, doorPosH, pdc.sectionW / 2 - pdc.plateThk / 2);
		pdc.doors[l].castShadow = true;
		scene.add(pdc.doors[l]);
		addHandle(doorL, doorPosH, i, l, 0, -(doorL / 2));
		pdc.plateSquare += (doorL / 2 - 0.0015) * doorH;
		pdc.plateEdgeLen += ((doorL / 2 - 0.0015) + doorH) * 2;
		l++;
		pdc.doors[l] = new THREE.Mesh(pdc.doorG, pdc.doorMat);
		pdc.doors[l].position.set(doorPosL + doorL / 4, doorPosH, pdc.sectionW / 2 - pdc.plateThk / 2);
		pdc.doors[l].castShadow = true;
		scene.add(pdc.doors[l]);
		addHandle(doorL, doorPosH, i, l, 1, doorL / 2);
		pdc.plateSquare += (doorL / 2 - 0.0015) * doorH;
		pdc.plateEdgeLen += ((doorL / 2 - 0.0015) + doorH) * 2;
		return (2);
	}
}

//lOffset for double doors, handleOffset for right handed and left handed doors
function addHandle(doorL, doorPosH, i, l, right, lOffset)
{
	var handleOffset;
	var handlePosL, handlePosH, handlePosW;

	if (right == 0)
		handleOffset = doorL - pdc.handleOffset;
	else
		handleOffset = pdc.handleOffset;
	handlePosL = (-pdc.sectionL / 2 + handleOffset + lOffset + pdc.plateThk + 0.0015) + (doorL + pdc.plateThk + 0.003) * i;
	handlePosH = doorPosH;
	handlePosW = pdc.sectionW / 2;
	pdc.handleG = new THREE.BoxGeometry(pdc.handleL, pdc.handleH, pdc.handleW);
	pdc.handles[l] = new THREE.Mesh(pdc.handleG, pdc.profileMat[pdc.profileColor]);
	pdc.handles[l].position.set(handlePosL, handlePosH, handlePosW);
	pdc.handles[l].castWhadow = true;
	scene.add(pdc.handles[l]);
}

function addWoodMaterial(index, pdc, colorMat, mat1, mat2, mat3)
{
	pdc.woodMat[index] = new THREE.MeshStandardMaterial( {
		roughness: 0.7,
		color: colorMat,
		bumpScale: 0.002,
		metalness: 0.5
	} );
	
	var texturesLoader = new THREE.TextureLoader();
	texturesLoader.load( mat1 , function( map ) {
		map.wrapS = THREE.RepeatWrapping;
		map.wrapT = THREE.RepeatWrapping;
		map.anisotropy = 4;
		map.repeat.set( pdc.l * 2, pdc.w * 2);
		pdc.woodMat[index].map = map;
		pdc.woodMat[index].needsUpdate = true;
	} );
	texturesLoader.load( mat2, function( map ) {
		map.wrapS = THREE.RepeatWrapping;
		map.wrapT = THREE.RepeatWrapping;
		map.anisotropy = 4;
		map.repeat.set( pdc.l * 2, pdc.w * 2);
		pdc.woodMat[index].bumpMap = map;
		pdc.woodMat[index].needsUpdate = true;
	} );
	texturesLoader.load( mat3, function( map ) {
		map.wrapS = THREE.RepeatWrapping;
		map.wrapT = THREE.RepeatWrapping;
		map.anisotropy = 4;
		map.repeat.set( pdc.l * 2, pdc.w * 2);
		pdc.woodMat[index].roghnessMap = map;
		pdc.woodMat[index].needsUpdate = true;
	} );
}

function addProfileMaterial(index, pdc, colorMat, metalMat, mat1, mat2, mat3)
{
	pdc.profileMat[index] = new THREE.MeshStandardMaterial( {
		roughness: 0.0,
		color: colorMat,
		bumpScale: 0.002,
		metalness: metalMat
	} );
	var texturesLoader = new THREE.TextureLoader();
	texturesLoader.load( mat1 , function( map ) {
		map.wrapS = THREE.RepeatWrapping;
		map.wrapT = THREE.RepeatWrapping;
		map.anisotropy = 4;
		map.repeat.set( 10, 24 );
		pdc.profileMat[index].map = map;
		pdc.profileMat[index].needsUpdate = true;
	} );
	texturesLoader.load( mat2, function( map ) {
		map.wrapS = THREE.RepeatWrapping;
		map.wrapT = THREE.RepeatWrapping;
		map.anisotropy = 4;
		map.repeat.set( 10, 24 );
		pdc.profileMat[index].bumpMap = map;
		pdc.profileMat[index].needsUpdate = true;
	} );
	texturesLoader.load( mat3, function( map ) {
		map.wrapS = THREE.RepeatWrapping;
		map.wrapT = THREE.RepeatWrapping;
		map.anisotropy = 4;
		map.repeat.set( 10, 24 );
		pdc.profileMat[index].roghnessMap = map;
		pdc.profileMat[index].needsUpdate = true;
	} );
}

function addProfile(n, l, h, w, pdc, scene)
{
	pdc.profile[n] = new THREE.Mesh(pdc.profileG, pdc.profileMat[pdc.profileColor]);
	pdc.profile[n].position.set(l, h, w);
	pdc.profile[n].castShadow = true;
	scene.add(pdc.profile[n]);
}

function delpdc(pdc, scene)
{
	var n = 0;

	while (pdc.profile[n])
		scene.remove(pdc.profile[n++]);
	scene.remove(pdc.topW);
	n = 0;
	while (pdc.shelfs[n])
		scene.remove(pdc.shelfs[n++]);
	n = 0;
	while (pdc.platesB[n])
		scene.remove(pdc.platesB[n++]);
	n = 0;
	while (pdc.platesV[n])
		scene.remove(pdc.platesV[n++]);
	n = 0;
	while (pdc.platesH[n])
		scene.remove(pdc.platesH[n++]);
	n = 0;
	while (pdc.doors[n])
		scene.remove(pdc.doors[n++]);
	n = 0;
	while (pdc.handles[n])
		scene.remove(pdc.handles[n++]);
	if (pdc.plateTopW)
		scene.remove(pdc.plateTopW);
	if (pdc.plateBotW)
		scene.remove(pdc.plateBotW);

	
}

function guiRemoveSegm(from, to)
{
	for (var i = from; i < to; i++) // some problems
	{
		gui.remove(vOptions[i]);
		gui.remove(vQuantity[i]);
	}
}

function guiAddhSegm(from, to, i)  // handle i
{
	for (var j = from; j < to; j++)
	{
		//gui.hOptions[j] = gui.add(segmentParams[i].segmentParams2[j], 'options', Object.keys(secondSegmentOptions)).name('▪▪▪ ' + (i + 1) + '.' + (j + 1) + ' Секція');
		//gui.hQuantity[j] = gui.add(segmentParams[i].segmentParams2[j], 'quantity', 0, Math.floor((params.h - 0.21) /
		//						segmentParams[i].quantity / 0.2)).step(1).name('▪▪▪ ' + (i + 1) + '.' + (j + 1) + ' Кількість');

		gui.sectHo[i][j] = gui.add(segmentParams[i].segmentParams2[j], 'options', Object.keys(secondSegmentOptions)).name('▪▪▪ ' + (i + 1) + '.' + (j + 1) + ' Секція');
		gui.sectHn[i][j] = gui.add(segmentParams[i].segmentParams2[j], 'quantity', 0, Math.floor((params.h - 0.21) /
								segmentParams[i].quantity / 0.2)).step(1).name('▪▪▪ ' + (i + 1) + '.' + (j + 1) + ' Кількість');

	}
}

function guiAddvSegm(from, to)
{
	for (var j = from; j < to; j++)
	{
		//segmentParams[j].quantity = Math.floor((params.h - 0.21) / 0.3);
		//gui.vOptions[j] = gui.add(segmentParams[j], 'options', Object.keys(secondSegmentOptions)).name('▪▪ ' + (j + 1) +  ' Секція');
		gui.sectV[j] = gui.add(segmentParams[j], 'quantity', 1, Math.floor((params.h - 0.21) / 0.2)).step(1).name('▪▪ ' + (j + 1) + ' Секція');
		//gui.sectV[j] = gui.add(segmentParams[j], 'quantity', 1, Math.floor((params.h - 0.21) / 0.2)).step(1).name('▪▪ ' + (j + 1) + ' Секція');
		//if (secondSegmentOptions[segmentParams[j].options] == 3)
		gui.sectHn[j] = [];
		gui.sectHo[j] = [];
		guiAddhSegm(0, segmentParams[j].quantity, j);
	}
}


function renderpdc()
{
	var i, j;

	//rewrite
	pdc.h = params.h * scale;
	pdc.l = params.l * scale;
	pdc.w = params.w * scale;
	//pdc.profileColor = profileColorChoose[params.profileColor];
	//pdc.woodColor = woodColorChoose[params.woodColor];

	i = 0;
	while (gui.rebuild[i])
	{
		gui.rebuild[i].onFinishChange(function() {
			gui.destroy();
			guiCreate();
			pdc.profileColor = profileColorChoose[params.profileColor];
			pdc.woodColor = woodColorChoose[params.woodColor];
			delpdc(pdc, scene);
			addpdc(pdc, scene);
		});
		i++;
	}
	
	i = 0;
	while (gui.sectV[i])
	{
		gui.sectV[i].onFinishChange(function() {
			gui.destroy();
			guiCreate();
			delpdc(pdc, scene);
			addpdc(pdc, scene);
		});
		j = 0;
		while (gui.sectHn[i][j]) //or gui.sectHn
		{
			gui.sectHn[i][j].onFinishChange(function() {
				gui.destroy();
				guiCreate();
				delpdc(pdc, scene);
				addpdc(pdc, scene);
			});
			gui.sectHo[i][j].onFinishChange(function() {
				gui.destroy();
				guiCreate();
				delpdc(pdc, scene);
				addpdc(pdc, scene);
			});
			j++;
		}
		i++;
	}
}

function renderGui()
{
	var i = 0;

	while (gui.rebuild[i])
	{
		gui.rebuild[i].onFinishChange(function() {
			gui.destroy();
			guiCreate();
		});
		i++;
	}
	i = 0;
	while (gui.vQuantity[i])
	{
		gui.vQuantity[i].onFinishChange(function() {
			gui.destroy();
			guiCreate();
		});
		i++;
	}
	i = 0;
	while (gui.vOptions[i])
	{
		gui.vOptions[i].onFinishChange(function() {
			gui.destroy();
			guiCreate();
		});
		i++;
	}
}

function guiCreate()
{
	var i = 0;
	gui = new dat.GUI();
	gui.rebuild = [];
	gui.sectV = [];
	gui.sectHn = [];
	gui.sectHo = [];

	//params.quantity = 2; // ned to be set to needed value (or dont) // asdasdasdasdasd

	//develop params
	gui.add( params, 'hemiIrradiance', Object.keys( hemiLuminousIrradiances ) );
	gui.add( params, 'bulbPower', Object.keys( bulbLuminousPowers ) );
	gui.add( params, 'exposure', 0, 1 );
	gui.add( params, 'shadows' );
	//main params
	gui.add( params, 'price').name('▪ Ціна (uah)').listen();

	gui.rebuild[i++] = gui.add( params, 'profileColor', Object.keys( profileColorChoose ) ).name('▪ Колір профіля');
	gui.rebuild[i++] = gui.add( params, 'woodColor', Object.keys( woodColorChoose ) ).name('▪ Текстура плити');
	//rebuild params (onChange rebuild GUI)
	gui.rebuild[i++] = gui.add( params, 'h', 0.2, 2.4 ).name('▪ Висота (m)').step(0.01);
	gui.rebuild[i++] = gui.add( params, 'w', 0.3, 0.8 ).name('▪ Глибина (m)').step(0.01);
	gui.rebuild[i++] = gui.add( params, 'l', 0.2, 2.4 ).name('▪ Ширина (m)').step(0.01);
	gui.rebuild[i++] = gui.add( params, 'options', Object.keys( segmentOptions) ).name('▪ Опції');

	if (segmentOptions[params.options] == 2)
	{
		gui.rebuild[i++] = gui.add( params, 'quantity', Math.ceil(params.l / 0.8), params.l / 0.2 ).step(1).name('▪ Секції');
		guiAddvSegm(0, params.quantity);
	}
	else if (segmentOptions[params.options] == 1)
	{
		//params.quantity = Math.floor(params.h / 0.3); // auto shelfs
		gui.rebuild[i++] = gui.add( params, 'quantity', 1, Math.floor(params.h / 0.2) ).step(1).name('▪ Кількість');
	}
	
	gui.open();
}

function priceCalc()
{
	var topPrice = pdc.topSquare * 190 * 1.1;
	var topEdgePrice = pdc.topEdgeLen * 13 * 1.1;
	var platePrice = pdc.plateSquare * 140 * 1.1;
	var plateEdgePrice = pdc.plateEdgeLen * 4 * 1.1;
	profilePrice = profileColorChoose[params.profileColor] == 0 ? 80 : 100
	var profileSum = pdc.profileLen * profilePrice * 1.1;
	var profileFurniture = 40 * 12;
	var	legs = 20 * 4;
	var otherFurniture = 30;
	var blumHinges = 0;
	var blumTandems = 0;
	var handles = 0;
	var total = topPrice + platePrice + profileSum + legs + 
		profileFurniture + topEdgePrice + plateEdgePrice + otherFurniture 
		+ blumHinges + blumTandems + handles;
	var coef = 1.5;
	return (total * coef);
}