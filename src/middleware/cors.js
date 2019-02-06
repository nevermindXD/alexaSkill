export default function(req,res,next){
	res.header("Access-Control-Allow-Origin", '*');
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, Authorization, X-Requested-With, Content-Type, Accept"
	);
	res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    next();
}