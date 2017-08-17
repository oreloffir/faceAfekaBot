function define(name, value) {
	Object.defineProperty(exports, name, {
		value:      value,
		enumerable: true
	});
}

define('DONE', 'Done');
define('FIRST_IMG', 0);
define('IMG_URL', 'url');

define('MILL_TO_WAIT', 30000);