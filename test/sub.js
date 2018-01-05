

function addProduct(product, scene)
{
	product.plateSquare = 0;
	product.topSquare = 0;
	product.plateEdgeLen = 0;
	product.topEdgeLen = 0;

	var half = product.profileThick / 2;
	var offset = product.topOffset;
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
		product.sectionL = product.l - product.profileThick * 2 - product.topOffset * 2;
		product.sectionH = product.h - product.topThick - product.profileThick - 0.15;
		product.sectionW = product.w - product.topOffset * 2;


		var segmentL = product.sectionL;
		var segmentH = product.sectionH;
		var segmentW = product.sectionW;
		
		product.plateTopBotG = new THREE.BoxGeometry(segmentL, product.plateThick, segmentW - product.plateThick);
		product.plateBotW = new THREE.Mesh(product.plateTopBotG, product.woodMat[product.woodColor]);
		product.plateBotW.position.set(0, product.plateThick / 2 + 0.15, product.plateThick / 2);
		product.plateBotW.castShadow = true;
		scene.add(product.plateBotW);
		product.plateTopW = new THREE.Mesh(product.plateTopBotG, product.woodMat[product.woodColor]);
		product.plateTopW.position.set(0, -product.plateThick / 2 + segmentH + 0.15, product.plateThick / 2);
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

		product.nVplates = params.quantity + 1;
		var vPlatesQuantity = product.nVplates;
		product.plateVerticalG = new THREE.BoxGeometry(product.plateThick, segmentH - product.plateThick * 2, segmentW - product.plateThick); 
		for (var i = 0; i != vPlatesQuantity; i++)
		{
			product.platesV[i] = new THREE.Mesh(product.plateVerticalG, product.woodMat[product.woodColor]);
			product.platesV[i].position.set((-segmentL / 2 + product.plateThick / 2) + ((segmentL - product.plateThick) / params.quantity * i),
								(segmentH - product.plateThick * 2) / 2 + 0.15 + product.plateThick, product.plateThick / 2);
			product.platesV[i].castShadow = true;
			scene.add(product.platesV[i]);

			product.plateSquare += (segmentH - product.plateThick * 2) * (segmentW - product.plateThick * 2);
			product.plateEdgeLen += ((segmentH - product.plateThick * 2) + (segmentW - product.plateThick * 2)) * 2;
		}
	//	product.woodMat[product.woodColor].transparent = true;
	//	product.woodMat[product.woodColor].opacity = 0.5;
	
		var hPlatesL = (segmentL - product.plateThick * vPlatesQuantity) / params.quantity;
		product.plateHorisontalG = new THREE.BoxGeometry(hPlatesL, product.plateThick, segmentW - product.plateThick * 2);
		product.shelfG = new THREE.BoxGeometry(hPlatesL, product.plateThick, segmentW - product.plateThick * 2 - 0.02);
		var k = 0, l = 0, s = 0;
		//var product.doorMat = {};
		for (var key in product.woodMat[product.woodColor])
			product.doorMat[key] = product.woodMat[product.woodColor][key];
		product.doorMat.transparent = true;
		product.doorMat.opacity = 0.8;
		//var doorL, doorH, div3;
		for (var i = 0; i != params.quantity; i++)
		{
			for (var r = 0; r != segmentParams[i].quantity; r++)
			{
				if (r > 0)
				{
					product.platesH[k] = new THREE.Mesh(product.plateHorisontalG, product.woodMat[product.woodColor]);
					product.platesH[k].position.set((-segmentL / 2 + hPlatesL / 2 + product.plateThick) + (hPlatesL + product.plateThick) * i, 
						0.15 + (segmentH / (segmentParams[i].quantity ) * (r)), product.plateThick);
					product.platesH[k].castShadow = true;
					scene.add(product.platesH[k]);
					k++;

					product.plateSquare += hPlatesL * (segmentW - product.plateThick * 2 - 0.02);
					product.plateEdgeLen += (hPlatesL + (segmentW - product.plateThick * 2 - 0.02)) * 2;
				}
				//polki
				for (var j = 0; j != segmentParams[i].segmentParams2[r].quantity; j++)
				{
					var div1 = (segmentH / segmentParams[i].quantity / (segmentParams[i].segmentParams2[r].quantity + 1) * (j + 1));
					var div2 = (segmentH / (segmentParams[i].quantity) * (r));
					product.shelfs[s] = new THREE.Mesh(product.plateHorisontalG, product.woodMat[product.woodColor]);
					product.shelfs[s].position.set((-segmentL / 2 + hPlatesL / 2 + product.plateThick) + (hPlatesL + product.plateThick) * i, 
						0.15 + div1 + div2, -product.plateThick / 2);
					product.shelfs[s].castShadow = true;
					scene.add(product.shelfs[s]);
					s++;

					product.plateSquare += hPlatesL * (segmentW - product.plateThick * 2 - 0.02);
					product.plateEdgeLen += (hPlatesL + (segmentW - product.plateThick * 2 - 0.02)) * 2;

				}
				if (secondSegmentOptions[segmentParams[i].segmentParams2[r].options] == 1)
				{
					l += addDoors(i, l, r);

					/*
					doorL = hPlatesL - 0.003;
					doorH = (segmentH - product.plateThick) / segmentParams[i].quantity - product.plateThick - 0.003;
					div3 = ((segmentH - product.plateThick) / (segmentParams[i].quantity) * (r)) + 0.15 + doorH / 2 + product.plateThick + 0.0015;
					product.doorG = new THREE.BoxGeometry(doorL, doorH, product.plateThick);
					product.doors[l] = new THREE.Mesh(product.doorG, doorMat);
					product.doors[l].position.set((-segmentL / 2 + doorL / 2 + product.plateThick + 0.0015) + (doorL + product.plateThick + 0.003) * i,
						div3, segmentW / 2 - product.plateThick / 2);
					product.doors[l].castShadow = true;
					scene.add(product.doors[l]);

					var handleSize;
					if (i == 0)
						handleSize = doorL - 0.05;
					else
						handleSize = 0.05;
					product.handleG = new THREE.BoxGeometry(0.04, 0.04, 0.01);
					product.handles[l] = new THREE.Mesh(product.handleG, product.profileMat[product.profileColor]);
					product.handles[l].position.set((-segmentL / 2 + handleSize + product.plateThick + 0.0015) + (doorL + product.plateThick + 0.003) * i,
						div3, segmentW / 2);
					product.handles[l].castWhadow = true;
					scene.add(product.handles[l]);


					l++;

					product.plateSquare += doorL * (segmentH - product.plateThick);
					product.plateEdgeLen += (doorL + (segmentH - product.plateThick)) * 2;
					*/
				}
			}
		}
	}


//	product.segmentQuantity = params.vDivide;
	product.profileLen = hProfil * 4 + wProfil * 4 + lProfil * 2;

}

function addDoors(i, l, r)
{
	var doorL = (product.sectionL - product.plateThick * product.nVplates) / params.quantity - 0.003;
	var doorH = (product.sectionH - product.plateThick) / segmentParams[i].quantity - product.plateThick - 0.003;
	var doorPosL = (-product.sectionL / 2 + doorL / 2 + product.plateThick + 0.0015) + (doorL + product.plateThick + 0.003) * i;
	var doorPosH = ((product.sectionH - product.plateThick) / (segmentParams[i].quantity) * (r)) + 0.15 + doorH / 2 + product.plateThick + 0.0015;
	
	if (doorL <= 0.6)
	{
		product.doorG = new THREE.BoxGeometry(doorL, doorH, product.plateThick);
		product.doors[l] = new THREE.Mesh(product.doorG, product.doorMat);
		product.doors[l].position.set(doorPosL, doorPosH, product.sectionW / 2 - product.plateThick / 2);
		product.doors[l].castShadow = true;
		scene.add(product.doors[l]);
		addHandle(doorL, doorPosH, i, l, i, 0);
		product.plateSquare += doorL * (product.sectionH - product.plateThick);
		product.plateEdgeLen += (doorL + (product.sectionH - product.plateThick)) * 2;
		return (1);
	}
	else
	{
		product.doorG = new THREE.BoxGeometry(doorL / 2 - 0.0015, doorH, product.plateThick);
		product.doors[l] = new THREE.Mesh(product.doorG, product.doorMat);
		product.doors[l].position.set(doorPosL - doorL / 4, doorPosH, product.sectionW / 2 - product.plateThick / 2);
		product.doors[l].castShadow = true;
		scene.add(product.doors[l]);
		addHandle(doorL, doorPosH, i, l, 0, -(doorL / 2));
		l++;
		product.plateSquare += doorL * (product.sectionH - product.plateThick);
		product.plateEdgeLen += (doorL + (product.sectionH - product.plateThick)) * 2;

		product.doors[l] = new THREE.Mesh(product.doorG, product.doorMat);
		product.doors[l].position.set(doorPosL + doorL / 4, doorPosH, product.sectionW / 2 - product.plateThick / 2);
		product.doors[l].castShadow = true;
		scene.add(product.doors[l]);
		addHandle(doorL, doorPosH, i, l, 1, doorL / 2);
		l++;
		product.plateSquare += doorL * (product.sectionH - product.plateThick);
		product.plateEdgeLen += (doorL + (product.sectionH - product.plateThick)) * 2;
		return (2);
	}
}

function addHandle(doorL, doorPosH, i, l, right, lOffset)
{
	var handleOffset;
	var handlePosL, handlePosH, handlePosW;

	if (right == 0)
		handleOffset = doorL - product.handleOffset;
	else
		handleOffset = product.handleOffset;
	handlePosL = (-product.sectionL / 2 + handleOffset + lOffset + product.plateThick + 0.0015) + (doorL + product.plateThick + 0.003) * i;
	handlePosH = doorPosH;
	handlePosW = product.sectionW / 2;
	product.handleG = new THREE.BoxGeometry(product.handleL, product.handleH, product.handleW);
	product.handles[l] = new THREE.Mesh(product.handleG, product.profileMat[product.profileColor]);
	product.handles[l].position.set(handlePosL, handlePosH, handlePosW);
	product.handles[l].castWhadow = true;
	scene.add(product.handles[l]);
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
	n = 0;
	while (product.handles[n])
		scene.remove(product.handles[n++]);
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


function renderProduct()
{
	var i, j;

	//rewrite
	product.h = params.h * scale;
	product.l = params.l * scale;
	product.w = params.w * scale;
	product.profileColor = profileColorChoose[params.profileColor];
	product.woodColor = woodColorChoose[params.woodColor];

	i = 0;
	while (gui.rebuild[i])
	{
		gui.rebuild[i].onFinishChange(function() {
			gui.destroy();
			guiCreate();
			delProduct(product, scene);
			addProduct(product, scene);
		});
		i++;
	}
	
	i = 0;
	while (gui.sectV[i])
	{
		gui.sectV[i].onFinishChange(function() {
			gui.destroy();
			guiCreate();
			delProduct(product, scene);
			addProduct(product, scene);
		});
		j = 0;
		while (gui.sectHn[i][j]) //or gui.sectHn
		{
			gui.sectHn[i][j].onFinishChange(function() {
				gui.destroy();
				guiCreate();
				delProduct(product, scene);
				addProduct(product, scene);
			});
			gui.sectHo[i][j].onFinishChange(function() {
				gui.destroy();
				guiCreate();
				delProduct(product, scene);
				addProduct(product, scene);
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