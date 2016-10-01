1. please install mongodb 
2. install node js with following libraries (cheerio,request,express)
3. install mongodb php driver
	If you use Linux install it easily via:
	sudo pecl install mongo 
	Add the line extension=mongo.so to your php.ini configuration and you’re good to go:
	sudo -i echo 'extension=mongo.so' >> /etc/php5/apache2/php.ini 
	Restart your web server and verify via command line:
	php -i |grep "mongo" php --re mongo 
4. place mongodatabase.php in htdocs folder 
5. run the readDataFromMongodb.js file 
6. open the url localhost:3000/data/from/mongodb/
