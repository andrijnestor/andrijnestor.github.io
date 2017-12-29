

function addSomething1(product, textureLoader, x, y, z, sizeX, sizeY, sizeZ) {
	product.ballGeometry = new THREE.SphereGeometry(sizeX, sizeY, sizeZ);
	product.ballMesh = new THREE.Mesh( product.ballGeometry, ballMat );
	product.ballMesh.position.set( x, y, z );
	product.ballMesh.rotation.y = Math.PI;
	product.ballMesh.castShadow = true;
	scene.add(product.ballMesh);
}

function addProduct(product, scene)
{
	var hProfil = product.h - product.hTop - product.hBot;
	product.profileG = new THREE.BoxGeometry(product.profileThick, hProfil, product.profileThick);

	addProfile(0, -product.l / 2, hProfil / 2 + product.hBot, -product.w / 2, product, scene);	
	addProfile(1, product.l / 2, hProfil / 2 + product.hBot, -product.w / 2, product, scene);
	addProfile(2, -product.l / 2, hProfil / 2 + product.hBot, product.w / 2, product, scene);
	addProfile(3, product.l / 2, hProfil / 2 + product.hBot, product.w / 2, product, scene);	
/*
	product.profile[0] = new THREE.Mesh(product.profileG, product.profileMat);
	product.profile[0].position.set(-product.l / 2, hProfil / 2 + product.hBot, -product.w / 2);
	product.profile[0].castShadow = true;
	scene.add(product.profile[0]);

	product.profile[1] = new THREE.Mesh(product.G, product.profileMat);
	product.profile[1].position.set(product.l / 2, hProfil / 2 + product.hBot, -product.w / 2);
	product.profile[1].castShadow = true;
	scene.add(product.profile[1]);

	product.profile[2] = new THREE.Mesh(product.horisontalG, product.profileMat);
	product.profile[2].position.set(-product.l / 2, hProfil / 2 + product.hBot, product.w / 2);
	product.profile[2].castShadow = true;
	scene.add(product.profile[2]);

	product.profile[3] = new THREE.Mesh(product.horisontalG, product.profileMat);
	product.profile[3].position.set(product.l / 2, hProfil / 2 + product.hBot, product.w / 2);
	product.profile[3].castShadow = true;
	scene.add(product.profile[3]);
*/
	var wProfil = product.w - product.profileThick;
	product.profileG = new THREE.BoxGeometry(product.profileThick, product.profileThick, wProfil);

	addProfile(4, -product.l / 2, product.hBot + product.profileThick / 2, 0, product, scene);
	addProfile(5, -product.l / 2, hProfil + 0.010, 0, product, scene);
	addProfile(6, product.l / 2, product.hBot + product.profileThick / 2, 0, product, scene);
	addProfile(7, product.l / 2, hProfil + 0.010, 0, product, scene);

	var	lProfil = product.l - product.profileThick;
	product.profileG = new THREE.BoxGeometry(lProfil, product.profileThick, product.profileThick);

	addProfile(8, 0, hProfil + 0.01, product.w / 2, product, scene);
	addProfile(9, 0, hProfil + 0.01, -product.w / 2, product, scene);

	product.profileLen = hProfil * 4 + wProfil * 4 + lProfil * 2;













}

function addProfile(n, l, h, w, product, scene)
{
	product.profile[n] = new THREE.Mesh(product.profileG, product.profileMat);
	product.profile[n].position.set(l, h, w);
	product.profile[n].castShadow = true;
	scene.add(product.profile[n]);

}

function delProduct(product, scene)
{
	var n = 0;
	while (product.profile[n])
		scene.remove(product.profile[n++]);

//	scene.remove(product.horisontalM[1]);
//	scene.remove(product.horisontalM[2]);
//	scene.remove(product.horisontalM[3]);

}
