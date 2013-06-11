<?php

	$base64Image = $_POST['img'];
	$base64Image = str_replace('data:image/png;base64', '', $base64Image);
	$base64Image = substr($base64Image,strpos($base64Image,",")+1);
	$base64Image = base64_decode($base64Image);
	// $output = imagecreatefromstring($base64Image);

	$id = uniqid();
	$file = 'dl/' . $id . '/' . $id . '.png';

	mkdir('dl/'.$id, 0777);
	file_put_contents($file, $base64Image);

	echo $id;
	// echo $output;

	// echo $output;
	// $outputImage = imagecreatefromstring($base64Image);

?>