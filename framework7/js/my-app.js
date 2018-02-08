// Initialize your app
var myApp = new Framework7({

	onAjaxStart: function(xhr) {
		myApp.showIndicator();
	},
	onAjaxComplete: function(xhr) {
		myApp.hideIndicator();
	}
});

// Export selectors engine导出选择器引擎
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
	// Because we use fixed-through navbar we can enable dynamic navbar
	//因为我们使用固定导航栏，所以我们可以启用动态导航栏
	dynamicNavbar: true
});

// Callbacks to run specific code for specific pages, for example for About page:
//回调为特定页面运行特定代码，例如关于页面：
myApp.onPageInit('about', function(page) {
	// run createContentPage func after link was clicked
	//链接被点击后运行createContentPage func
	$$('.create-page').on('click', function() {
		createContentPage();
	});
});

// Generate dynamic page
//生成动态页面
var dynamicPageIndex = 0;

function createContentPage() {
	mainView.router.loadContent(
		'<!-- Top Navbar-->' +
		'<div class="navbar">' +
		'  <div class="navbar-inner">' +
		'    <div class="left"><a href="#" class="back link"><i class="icon icon-back"></i><span>Back</span></a></div>' +
		'    <div class="center sliding">动态页面 ' + (++dynamicPageIndex) + '</div>' +
		'  </div>' +
		'</div>' +
		'<div class="pages">' +
		'  <!-- Page, data-page contains page name-->' +
		'  <div data-page="dynamic-pages" class="page">' +
		'    <!-- Scrollable page content-->' +
		'    <div class="page-content">' +
		'      <div class="content-block">' +
		'        <div class="content-block-inner">' +
		'          <p>动态页面创建于 ' + new Date() + ' !</p>' +
		'          <p>Go <a href="#" class="back">back</a> or go to <a href="services.html">Services</a>.</p>' +
		'        </div>' +
		'      </div>' +
		'    </div>' +
		'  </div>' +
		'</div>'
	);
	return;
}