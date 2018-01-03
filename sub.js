

function addProduct(product, scene)
{
	product.plateSquare = 0;
	product.topSquare = 0;
	product.plateEdgeLen = 0;
	product.topEdgeLen = 0;

	var half = product.profileThick / 2;
	var offset = 0.005;
	var hProfil = product.h - product.topThick - product.botThick;
	product.profileG = new THREE.BoxGeometry(product.profileThick, hProfil, product.profileThick);
	addProfile(0, -product.l / 2 + half + offset, hProfil / 2 + product.botThick, -product.w / 2 + half + offset, product, scene);	
	addProfile(1, product.l / 2 - half - offset, hProfil / 2 + product.botThick, -product.w / 2 + half + offset, product, scene);
	addProfile(2, -product.l / 2 + half + offset, hProfil / 2 + product.botThick, product.w / 2 - half - offset, product, scene);
	addProfile(3, product.l / 2 - half - offset, hProfil / 2 + product.botThick, product.w / 2 - half - offset, product, scene);	

	var wProfil = product.w - product.profileThick * 2 - offset * 2;
	product.profileG = new THREE.BoxGeometry(product.profileThick, product.profileThick, wProfil);
	addProfile(4, -product.l / 2 + half + offset, product.botThick + half, 0, product, scene);
	addProfile(5, -product.l / 2 + half + offset, hProfil + 0.010, 0, product, scene);
	addProfile(6, product.l / 2 - half - offset, product.botThick + half, 0, product, scene);
	addProfile(7, product.l / 2 - half - offset, hProfil + 0.010, 0, product, scene);

	var	lProfil = product.l - product.profileThick * 2 - offset * 2;
	product.profileG = new THREE.BoxGeometry(lProfil, product.profileThick, product.profileThick);
	addProfile(8, 0, hProfil + 0.01, product.w / 2 - half - offset, product, scene);
	addProfile(9, 0, hProfil + 0.01, -product.w / 2 + half + offset, product, scene);

	product.topG = new THREE.BoxGeometry(product.l, product.topThick, product.w);
//	var modifier = new THREE.BufferSubdivisionModifier(10);
//	modifier.modify(product.topG);
	product.topW = new THREE.Mesh(product.topG, product.woodMat[product.woodColor]);
	product.topW.position.set(0, product.h - product.topThick / 2, 0);
	product.topW.castShadow = true;
	scene.add(product.topW);

	product.topSquare += product.l * product.w;
	product.topEdgeLen += (product.l + product.w) * 2;

	if (segmentOptions[params.options] == 1)
	{
		var inputH = params.h - product.topThick - product.profileThick - 0.03;
		product.shelfG = new THREE.BoxGeometry(product.l - 0.01, product.topThick, product.w - 0.01 - 0.06);
		for (var i = 0; i != params.quantity; i++)
		{

			product.shelfs[i] = new THREE.Mesh(product.shelfG, product.woodMat[product.woodColor]);
			product.shelfs[i].position.set(0, 0.03 + (inputH / (params.quantity + 1) * (i + 1)) , 0);
			product.shelfs[i].castShadow = true;
			scene.add(product.shelfs[i]);

			product.topSquare += (product.l - 0.01) * (product.w - 0.01 - 0.06);
			product.topEdgeLen += ((product.l - 0.01) + (product.w - 0.01 - 0.06)) * 2;
		}
	}
	else if (segmentOptions[params.options] == 2)
	{

		var segmentL = product.l - product.profileThick * 2 - offset * 2;
		var segmentH = product.h - product.topThick - product.profileThick - 0.15;
		var segmentW = product.w - offset * 2;
		
		product.plateTopBotG = new THREE.BoxGeometry(segmentL, product.plateThick, segmentW - product.plateThick * 2);
		product.plateBotW = new THREE.Mesh(product.plateTopBotG, product.woodMat[product.woodColor]);
		product.plateBotW.position.set(0, product.plateThick / 2 + 0.15, 0);
		product.plateBotW.castShadow = true;
		scene.add(product.plateBotW);
		product.plateTopW = new THREE.Mesh(product.plateTopBotG, product.woodMat[product.woodColor]);
		product.plateTopW.position.set(0, -product.plateThick / 2 + segmentH + 0.15, 0);
		product.plateTopW.castShadow = true;
		scene.add(product.plateTopW);

		product.plateSquare += (segmentL * segmentW - product.plateThick * 2) * 2;
		product.plateEdgeLen += (segmentL + (segmentW - product.plateThick * 2)) * 2 * 2;

		var plateBackL = segmentL / params.quantity;
		product.plateBackG = new THREE.BoxGeometry(plateBackL, segmentH, product.plateThick);
		for (var i = 0; i != params.quantity; i++)
		{
			product.platesB[i] = new THREE.Mesh(product.plateBackG, product.woodMat[product.woodColor]);
			product.platesB[i].position.set((-plateBackL / 2 * params.quantity) + plateBackL / 2 + plateBackL * (i + 0),
				segmentH / 2 + 0.15,  -segmentW / 2 + product.plateThick / 2);
			product.platesB[i].castShadow = true;
			scene.add(product.platesB[i]);

			product.plateSquare += plateBackL * segmentH;
			product.plateEdgeLen += (plateBackL + segmentH) * 2;
		}

		var vPlatesQuantity = params.quantity + 1;
		product.plateVerticalG = new THREE.BoxGeometry(product.plateThick, segmentH - product.plateThick * 2, segmentW - product.plateThick * 2); 
		for (var i = 0; i != vPlatesQuantity; i++)
		{
			product.platesV[i] = new THREE.Mesh(product.plateVerticalG, product.woodMat[product.woodColor]);
			product.platesV[i].position.set((-segmentL / 2 + product.plateThick / 2) + ((segmentL - product.plateThick) / params.quantity * i), (segmentH - product.plateThick * 2) / 2 + 0.15 + product.plateThick, 0);
			product.platesV[i].castShadow = true;
			scene.add(product.platesV[i]);

			product.plateSquare += (segmentH - product.plateThick * 2) * (segmentW - product.plateThick * 2);
			product.plateEdgeLen += ((segmentH - product.plateThick * 2) + (segmentW - product.plateThick * 2)) * 2;
		}
	//	product.woodMat[product.woodColor].transparent = true;
	//	product.woodMat[product.woodColor].opacity = 0.5;
		var hPlatesL = (segmentL - product.plateThick * vPlatesQuantity) / params.quantity;
		product.plateHorisontalG = new THREE.BoxGeometry(hPlatesL, product.plateThick, segmentW - product.plateThick * 2 - 0.02);
		var k = 0, l = 0;
		var doorMat = {};
		for (var key in product.woodMat[product.woodColor])
			doorMat[key] = product.woodMat[product.woodColor][key];
		doorMat.transparent = true;
		doorMat.opacity = 0.8;
		for (var i = 0; i != params.quantity; i++)
		{
			for (var j = 0; j != segmentParams[i].quantity; j++)
			{
				product.platesH[k] = new THREE.Mesh(product.plateHorisontalG, product.woodMat[product.woodColor]);
				product.platesH[k].position.set((-segmentL / 2 + hPlatesL / 2 + product.plateThick) + (hPlatesL + product.plateThick) * i, 
					0.15 + (segmentH / (segmentParams[i].quantity + 1) * (j + 1)), -product.plateThick / 2);
				product.platesH[k].castShadow = true;
				scene.add(product.platesH[k]);
				k++;

				product.plateSquare += hPlatesL * (segmentW - product.plateThick * 2 - 0.02);
				product.plateEdgeLen += (hPlatesL + (segmentW - product.plateThick * 2 - 0.02)) * 2;

			}
			if (upperSegmentOptions[segmentParams[i].options] == 1)
			{
				var doorL = hPlatesL + product.plateThick;
				product.doorG = new THREE.BoxGeometry(doorL, segmentH - product.plateThick, product.plateThick);
				product.doors[l] = new THREE.Mesh(product.doorG, doorMat);
				product.doors[l].position.set((-segmentL / 2 + doorL / 2) + (doorL + product.plateThick) * i,
					segmentH / 2 + 0.15, segmentW / 2 - product.plateThick / 2);
				product.doors[l].castShadow = true;
				scene.add(product.doors[l]);
				l++;

				product.plateSquare += doorL * (segmentH - product.plateThick);
				product.plateEdgeLen += (doorL + (segmentH - product.plateThick)) * 2;
			}
		}
		
	}


//	product.segmentQuantity = params.vDivide;
	product.profileLen = hProfil * 4 + wProfil * 4 + lProfil * 2;

}

function addWoodMaterial(index, product, colorMat, mat1, mat2, mat3)
{
	product.woodMat[index] = new THREE.MeshStandardMaterial( {
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
		map.repeat.set( product.l * 2, product.w * 2);
		product.woodMat[index].map = map;
		product.woodMat[index].needsUpdate = true;
	} );
	texturesLoader.load( mat2, function( map ) {
		map.wrapS = THREE.RepeatWrapping;
		map.wrapT = THREE.RepeatWrapping;
		map.anisotropy = 4;
		map.repeat.set( product.l * 2, product.w * 2);
		product.woodMat[index].bumpMap = map;
		product.woodMat[index].needsUpdate = true;
	} );
	texturesLoader.load( mat3, function( map ) {
		map.wrapS = THREE.RepeatWrapping;
		map.wrapT = THREE.RepeatWrapping;
		map.anisotropy = 4;
		map.repeat.set( product.l * 2, product.w * 2);
		product.woodMat[index].roghnessMap = map;
		product.woodMat[index].needsUpdate = true;
	} );
}

function addProfileMaterial(index, product, colorMat, metalMat, mat1, mat2, mat3)
{
	product.profileMat[index] = new THREE.MeshStandardMaterial( {
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
		product.profileMat[index].map = map;
		product.profileMat[index].needsUpdate = true;
	} );
	texturesLoader.load( mat2, function( map ) {
		map.wrapS = THREE.RepeatWrapping;
		map.wrapT = THREE.RepeatWrapping;
		map.anisotropy = 4;
		map.repeat.set( 10, 24 );
		product.profileMat[index].bumpMap = map;
		product.profileMat[index].needsUpdate = true;
	} );
	texturesLoader.load( mat3, function( map ) {
		map.wrapS = THREE.RepeatWrapping;
		map.wrapT = THREE.RepeatWrapping;
		map.anisotropy = 4;
		map.repeat.set( 10, 24 );
		product.profileMat[index].roghnessMap = map;
		product.profileMat[index].needsUpdate = true;
	} );
}

function addProfile(n, l, h, w, product, scene)
{
	product.profile[n] = new THREE.Mesh(product.profileG, product.profileMat[product.profileColor]);
	product.profile[n].position.set(l, h, w);
	product.profile[n].castShadow = true;
	scene.add(product.profile[n]);
}

function delProduct(product, scene)
{
	var n = 0;
	while (product.profile[n])
		scene.remove(product.profile[n++]);
	scene.remove(product.topW);
	n = 0;
	while (product.shelfs[n])
		scene.remove(product.shelfs[n++]);
	n = 0;
	while (product.platesB[n])
		scene.remove(product.platesB[n++]);
	n = 0;
	while (product.platesV[n])
		scene.remove(product.platesV[n++]);
	n = 0;
	while (product.platesH[n])
		scene.remove(product.platesH[n++]);
	n = 0;
	while (product.doors[n])
		scene.remove(product.doors[n++]);
	if (product.plateTopW)
		scene.remove(product.plateTopW);
	if (product.plateBotW)
		scene.remove(product.plateBotW);

	
}

function guiRemoveSegm(from, to)
{
	for (var i = from; i < to; i++) // some problems
	{
		gui.remove(vOptions[i]);
		gui.remove(vQuantity[i]);
	}
}

function guiAddSegm(from, to)
{
	for (var i = from; i < to; i++)
	{
		segmentParams[i].quantity = Math.floor((params.h - 0.21) / 0.3);
		vOptions[i] = gui.add(segmentParams[i], 'options', Object.keys(upperSegmentOptions)).name('▪▪ Секція ' + (i + 1));
		vQuantity[i] = gui.add(segmentParams[i], 'quantity', 0, Math.floor((params.h - 0.21) / 0.2)).step(1).name('▪▪ Кількість ' + (i + 1));
	//	if (upperSegmentOptions.quantity > 1) 
	//	{
	//		guiAddSegm(0, 1);
	//		upperSegmentOprions.quantity = 0;
	//	}
	}
}

function guiCreate()
{
	params.quantity = 0; // ned to be set to needed value (or dont)
	gui = new dat.GUI();
	gui.add( params, 'hemiIrradiance', Object.keys( hemiLuminousIrradiances ) );
	gui.add( params, 'bulbPower', Object.keys( bulbLuminousPowers ) );
	gui.add( params, 'exposure', 0, 1 );
	gui.add( params, 'shadows' );
	gui.add( params, 'price').name('▪ Ціна (uah)').listen();
	gui.add( params, 'profileColor', Object.keys( profileColorChoose ) ).name('▪ Колір профіля');
	gui.add( params, 'woodColor', Object.keys( woodColorChoose ) ).name('▪ Текстура плити');
	gui.add( params, 'h', 0.2, 2.4 ).name('▪ Висота (m)').step(0.01);
	gui.add( params, 'w', 0.3, 0.8 ).name('▪ Ширина (m)').step(0.01);
	gui.add( params, 'l', 0.2, 2.4 ).name('▪ Довжина (m)').step(0.01);
	gui.add( params, 'options', Object.keys( segmentOptions) ).name('▪ Опції');


	//gui.add( params, 'quantity').step(1).name('▪ Quantity').min(0).max(params.l / 0.2).listen().updateDisplay(); //handle max
//	for (var i = 0; i < params.vDivide; i++)
//	{
//		if (params.vDivide > 0)
//			vFolders[i] = gui.add( params, 'test' );
//	}
//	var ggg = gui.add (params, 'test' );
//	gui.remove(ggg);
//	gui.add( params, 'profileLen').listen();
//	for (var n = 0; n != product.segmentQuantity; n++)
//	{
//	if (product.segmentQuantity > 0)
//		gui.add( params, 'test' );
//	}
//	var ggg = gui.add(params, 'test');

//	gui.add(params, 'test');
//	gui.hide(ggg);
//	ggg.domElement.setAttribute("hidden", true);
	gui.open();
}

function priceCalc()
{
	var topPrice = product.topSquare * 200 * 1.2;
	var topEdgePrice = product.topEdgeLen * 13 * 1.2;
	var platePrice = product.plateSquare * 150 * 1.2;
	var plateEdgePrice = product.plateEdgeLen * 4 * 1.2;
	profilePrice = profileColorChoose[params.profileColor] == 0 ? 100 : 200;
	var profileSum = product.profileLen * profilePrice * 1.2;
	var profileFurniture = 40 * 12;
	var	legs = 20 * 4;
	var otherFurniture = 40;
	var blumHinges = 0;
	var blumTandems = 0;
	var handles = 0;
	var total = topPrice + platePrice + profileSum + legs + 
		profileFurniture + topEdgePrice + plateEdgePrice + otherFurniture 
		+ blumHinges + blumTandems + handles;
	var coef = 1.6;
	return (total * coef);
}