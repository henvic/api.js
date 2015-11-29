Launchpad api client for JavaScript
===============

## Usage

Post

```javascript
Launchpad
    .url('/data/tasks')
    .post({ desc: 'Buy milk' });
```

Get

```javascript
Launchpad
   .url('/data/tasks')
   .get()
   .then(function(clientResponse) {
        console.log(clientResponse.body())
   });
```

## Setup

```
npm install
```

## Build

```
gulp build
```

```
gulp watch
```

## Test

```
gulp test
```

```
gulp test:watch
```
