# Node.js URL Shortener Microservice

Install:

	1. git clone https://github.com/evdokimovm/NodeJS-URL-Shortener-Microservice.git
	2. cd NodeJS-URL-Shortener-Microservice
	3. Run MongoDB use mongod in your terminal
	4. npm install
	5. node server.js

Usage example:

```
http://localhost:8080/new/http://google.com
```

```javascript
fetch('http://localhost:8080/new/http://google.com')
	.then((res) => {
		res.json().then((data) => {
			console.log(data);
		});
	})
	.catch((err) => {
		console.log(err);
	});
```

Output object:

```javascript
{
	original_url: "http://google.com",
	short_url: "http://localhost:8080/oODgYK"
}
```

With IP address:

```
http://localhost:8080/new/http://109.110.33.34
```

```javascript
fetch('http://localhost:8080/new/http://109.110.33.34')
	.then((res) => {
		res.json().then((data) => {
			console.log(data);
		});
	})
	.catch((err) => {
		console.log(err);
	});
```

Output object:

```javascript
{
	original_url: "http://109.110.33.34",
	short_url: "http://localhost:8080/ypN8ER"
}
```
