# BackendTheatre

## Steps to install:-
1. Assuming that you have node>=v8.9.0 installed, run ``npm install``
2. ``cd BackendTheatre``
3. Run `nodemon  -r babel-register bin/www.js` or via `debug` mode
 ``DEBUG=backendtheatre:*  nodemon  -r babel-register bin/www.js``



## For Production 
``"./node_modules/.bin/babel" -d ./build ./ -s ``
