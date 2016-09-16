# gulp-reference-cdn
Replace asset directory references with specified base url

##Usage
example

```javascript
var cdnReplace = require('gulp-reference-cdn');

gulp.task('replace', function(){
	return gulp.src('assets/javascripts/*.js')
		.pipe(cdnReplace('http://my.cdn.here','index.html'));
});
```

###Before
index.html

```
	<script src="/assets/javascripts/myFile.js"></script>
```

###After
index.html

```
	<script src="http://my.cdn.here/myFile.js"></script>
```

##Also supports glob strings
example

```javascript
gulp.task('replace', function(){
	return gulp.src('assets/javascripts/*.js')
		.pipe(cdnReplace('http://my.cdn.here', 'html/**/*.html'));
})

```

This will search through all of the html files (recursively) for matching references of the file name