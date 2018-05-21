<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>TFG Parkinson - Actividades</title>
	<link href="css/bootstrap.min.css" rel="stylesheet">
	<link href="css/font-awesome.min.css" rel="stylesheet">
	<link href="css/datepicker3.css" rel="stylesheet">
	<link href="css/styles.css" rel="stylesheet">
	
	<!--Custom Font-->
	<link href="https://fonts.googleapis.com/css?family=Montserrat:300,300i,400,400i,500,500i,600,600i,700,700i" rel="stylesheet">
	<!--[if lt IE 9]>
	<script src="js/html5shiv.js"></script>
	<script src="js/respond.min.js"></script>
	<![endif]-->
</head>
<body>
	<?php
		session_start();
		if (!isset($_SESSION['session_name'])){
			header("Location: login.php");
		}
	?>
	
	<nav class="navbar navbar-custom navbar-fixed-top" role="navigation">
		<div class="container-fluid">
			<div class="navbar-header">
				<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#sidebar-collapse"><span class="sr-only">Toggle navigation</span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span></button>
				<a class="navbar-brand" href="#"><span>TFG</span>Parkinson</a>				
	</nav>

	<div id="sidebar-collapse" class="col-sm-3 col-lg-2 sidebar">
		<div class="profile-sidebar">
			<div class="profile-userpic">
				<img src="http://placehold.it/50/30a5ff/fff" class="img-responsive" alt="">
			</div>
			<div class="profile-usertitle">
				<div class="profile-usertitle-name">Usuario</div>
				<div class="profile-usertitle-status"><span class="indicator label-success"></span>En línea</div>
			</div>
			<div class="clear"></div>
		</div>
		<div class="divider"></div>
		<ul class="nav menu">
			<li><a href="index.php"><em class="fa fa-users">&nbsp;</em> Pacientes</a></li>
			<li><a href="login.php"><em class="fa fa-power-off">&nbsp;</em> Cerrar sesión</a></li>
		</ul>
	</div><!--/.sidebar-->
		
	<div class="col-sm-9 col-sm-offset-3 col-lg-10 col-lg-offset-2 main">
		<div class="row">
			<ol class="breadcrumb">
				<li><a href="index.php">
					<em class="fa fa-home"></em>
				</a></li>
				<li class="active">Actividades</li>
				<li class="active">
					<?php
						echo $_GET['usuario'];
					?>
				</li>
			</ol>
		</div><!--/.row-->
		
		<div class="row">
			<div class="col-lg-12">
				<h1 class="page-header">Actividades</h1>
			</div>
		</div><!--/.row-->

		<div class="row">
			<div class="col-md-6">
				<div class="panel panel-default">
					<div class="panel-heading">
						Tipo
					</div>
					<div class="panel-body" style='height: 122px;'>
						<div class="form-group" id="tipo_actividad"></div>	
					</div>								  
				</div>			  
			</div>
			<div class="col-md-6">
				<div class="panel panel-default">
					<div class="panel-heading">
						Fecha
					</div>
					<div class="panel-body">
						<input type="date" class="form-control" id="fecha_inicio">
						<input type="date" class="form-control" id="fecha_fin">
					</div>								
				</div>			  
			</div>
		</div>
	
		<button type="button" class="btn btn-primary" id="buscar">Buscar</button>

		<div class="row text-center" style="margin-top:15px; margin-left:2px; margin-right:2px"> 
			<div class="col-md-4" style="background-color:rgba(255, 0, 0, 1)">Eje X</div>
			<div class="col-md-4" style="background-color:rgba(48, 164, 255, 1)">Eje Y</div>
			<div class="col-md-4" style="background-color:rgb(63, 191, 191, 1)">Eje Z</div>
		</div>

		<div class="row" style="margin-top:15px">
			<div class="col-lg-12">
				<div class="panel panel-default">
					<div class="panel-heading">
						Datos
					</div>
					<div class="panel-body">
						<div class="canvas-wrapper">
							<canvas class="main-chart" id="line-chart" height="200" width="600"></canvas>
						</div>
					</div>
				</div>
			</div>
		</div><!--/.row-->
	</div>	<!--/.main-->
	  
	<script src="js/jquery-1.11.1.min.js"></script>
	<script src="js/bootstrap.min.js"></script>
	<script src="js/chart.min.js"></script>
	<script src="js/chart-data.js"></script>
	<script src="js/easypiechart.js"></script>
	<script src="js/easypiechart-data.js"></script>
	<script src="js/bootstrap-datepicker.js"></script>
	<script src="js/custom.js"></script>
	<script src="js/actividades.js"></script>	
</body>
</html>
