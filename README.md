# BackendTheatre
## For Development 
### Prerequisites
   *   Install Node:-
   
        ```
        sudo apt-get install npm
        sudo npm install n -g
        sudo n stable
        ```
   *    Install `yarn`
        ```
        curl -o- -L https://yarnpkg.com/install.sh | bash
        export PATH="$HOME/.yarn/bin:$PATH"
        ```
   *   Install redis  `sudo apt-get install redis-server`
       * Starting Redis server  `redis-server &`
       * Open Redis CLI too. `redis-cli`
       * List all Keys. `KEYS *`
       * Retrieve information regarding particular key. `GET <key name>`
   * The first thing to do in order to check if Redis is working properly is sending a PING command using redis-cli:
      ```
      redis-cli ping
      ```
      You will see `PONG`
   *  Shutdown Redis `redis-cli shutdown`

### Steps to install:-
1. Assuming that you have node>=v8.9.0 installed, run ``npm install``
2. ``cd BackendTheatre``
3. Run `nodemon  -r babel-register bin/www.js` or via `debug` mode
 ``DEBUG=backendtheatre:*  nodemon  -r babel-register bin/www.js``



## For Production 
### Prerequisites
*   Install redis  `sudo apt-get install redis-server`
    * Starting Redis server  `redis-server &`
    * Open Redis CLI too. `redis-cli`
    * List all Keys. `KEYS *`
    * Retrieve information regarding particular key. `GET <key name>`

* Install `pm2` as `npm install pm2 -g`

* The first thing to do in order to check if Redis is working properly is sending a PING command using redis-cli:
  ```
  redis-cli ping
  ```
  You will see `PONG`
  
*  Shutdown Redis`redis-cli shutdown`
### Steps to install:-
1. Assuming that you have node>=v8.9.0 installed, run ``npm install``
2. ``cd BackendTheatre``

### Run
````
export NODE_ENV=production 
"./node_modules/.bin/babel" -d ./build ./ -s 
pm2 start build/bin/www.js --name "BackendTheatre" --watch
````
