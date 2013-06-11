<?php
	$id = trim($_GET['path']);
	$path = 'dl/'.$id.'/'.$id.'.png';
	$dir = 'dl/'.$id;
	if (file_exists($path)) {
		// header('Content-Transfer-Encoding: binary');
		// echo "Success! Downloading...";
		header('Content-Type: image/png');
		header('Content-Description: File Transfer');
		header('Content-Disposition: attachment; filename='.$id.'.png');
		header('Content-Transfer-Encoding: binary');
		header('Expires: 0');
		header('Cache-Control: must-revalidate, post-check=0, pre-check=0');
		header('Pragma: public');
		header('Content-Length: ' . filesize($path));
		ob_clean();
		flush();
		readfile($path);

		unlink($path);
		// rmdir($dir);
		exit; 
		// imagepng($output);
		// imagedestroy($output);
		// echo $base64Image;
	} else {
		echo 'Whoops. Something went wrong.';
	}
?>