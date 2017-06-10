[![Build Status](https://travis-ci.org/murwa/ui-router-redirect.svg?branch=master)](https://travis-ci.org/murwa/ui-router-redirect)

## UI-Router Redirect

An angularjs module to easily handle redirects between states

### Installation

Bower:

~~~javascript
bower install ui-router-redirect
~~~

In your page, add:

~~~html
<script src="bower_components/ui-router-redirect/src/ui-router-redirect.js"></script>
~~~

### Usage

#### Load module

Add the module as a dependency to your app:

~~~javascript
var app = angular.module('app', ['ui-router-redirect']
~~~

#### State Definition

Add `redirectTo` key on a state definition. The value could be:

- `string`: redirects to the state

    ~~~javascript
    var state = {
        name: 'string-redirect',
        redirectTo: 'main'  // Redirects to main state
    }
    ~~~
    
- `object` : should have `state` and `params` keys. Will redirect to the named state with given parameters

    ~~~javascript
    var state = {
        name: 'string-redirect',
        redirectTo: {state: 'main', params: {param1: true}}  // Redirects to main state with params
    }
    ~~~

- `function` : should return either `string`, `object` or `promise` - promise will be resolved (should resolve to either `string` or `object`)

    ~~~javascript
    var state = {
        name: 'string-redirect',
        redirectTo: function(){
            return 'main' // Redirects to main state 
        } 
    }
    ~~~

    ~~~javascript
    // Promise example
    var state = {
        name: 'string-redirect',
        redirectTo: ['$timeout', function($timeout){
            return $timeout(function(){
                return 'main' // Redirects to main state 
            });
        } 
    }
    ~~~
