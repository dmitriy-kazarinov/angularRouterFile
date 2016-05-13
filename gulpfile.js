var gulp = require('gulp-param')(require('gulp'), process.argv),
	git = require('gulp-git');
	
// Clone a remote repo 
// gulp clone --url https://example.com
gulp.task('clone', function(url){
  git.clone(url, function (err) {
    if (err) throw err;
  });
});

// Create and switch to a git branch 
// gulp checkout --branch new-branch
gulp.task('checkout', function(branch){
  git.checkout(branch, {args:'-b'}, function (err) {
    if (err) throw err;
  });
});

// Run git add  
gulp.task('add', function(){
  return gulp.src('./git-test/*')
    .pipe(git.add());
});

// Run git commit 
// gulp commit --message "free text"
gulp.task('commit', function(message){
  return gulp.src('./*')
    .pipe(git.commit(message));
});

// Run git push 
// gulp push --branch branch-example
gulp.task('push', function(branch){
  git.push('origin', branch, function (err) {
    if (err) throw err;
  });
});

// Merge branches to master 
// gulp merge --branch branch-example
gulp.task('merge', function(branch){
  git.merge('branch', function (err) {
    if (err) throw err;
  });
});

//---------------------------------------------------------------------
// Working tree status 
gulp.task('status', function(){
  git.status({args: '--porcelain'}, function (err, stdout) {
    if (err) throw err;
  });
});
//---------------------------------------------------------------------


//Custom task
// gulp gitRun
//--c - commit
//--p - push
gulp.task('gitRun', function(c,p){
  return gulp.src('./*')
	.pipe(git.add())
    .pipe(git.commit(c));
});



// Rerun the task when the file was changing
gulp.task('watch', function() {
    gulp.watch('./*.js', ['js-transformers']);
});