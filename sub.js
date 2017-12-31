

function addProduct(product, scene)
{
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


	product.topSquare = product.l * product.w;
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
}

function guiCreate()
{
	params.quantity = 0; // ned to be set to needed value (or dont)
	gui = new dat.GUI();
	gui.add( params, 'hemiIrradiance', Object.keys( hemiLuminousIrradiances ) );
	gui.add( params, 'bulbPower', Object.keys( bulbLuminousPowers ) );
	gui.add( params, 'exposure', 0, 1 );
	gui.add( params, 'shadows' );
	gui.add( params, 'profileColor', Object.keys( profileColorChoose ) ).name('▪ Profile color');
	gui.add( params, 'woodColor', Object.keys( woodColorChoose ) ).name('▪ Wood color');
	gui.add( params, 'h', 0.2, 2 ).name('▪ Height');
	gui.add( params, 'w', 0.2, 1 ).name('▪ Width');
	gui.add( params, 'l', 0.2, 2 ).name('▪ Length');
	gui.add( params, 'options', Object.keys( segmentOptions) ).name('▪ Options');

	gui.add( params, 'quantity', 0, 10 ).step(1).name('▪ Quantity'); //handle max
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
	//var ggg = gui.add(params, 'test');
//	gui.add(params, 'test');
//	gui.hide(ggg);

//	ggg.domElement.setAttribute("hidden", true);
	gui.open();
}
