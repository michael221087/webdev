(function() {
  require({
    baseUrl: "./js",
    paths: {
      modules: "modules",
      app: "modules/app",
      ui: "modules/ui",
      event: "modules/event",
      vendor: "vendor",
      angular: "../vendor/angular/stable/angular.min",
      angularTouch: "../vendor/angular/stable/angular-touch",
      angularRoute: "../vendor/angular/stable/angular-route.min",
      angularResource: "../vendor/angular/stable/angular-resource.min",
      angularAnimate: "../vendor/angular/stable/angular-animate.min",
      angularGesture: "../vendor/gestures/gestures.min",
      angularLoadingBar: "../vendor/angular-loading-bar/loading-bar",
      ngFacebook: "../vendor/ngFacebook/ngFacebook",
      jquery: "../vendor/jquery/jquery.min",
      jqueryMigrate: "../vendor/jquery/jquery-migrate.min",
      jqueryBridget: "../vendor/jquery/jquery.bridget",
      mousewheel: "../vendor/jscrollpane/jquery.mousewheel",
      jscrollpane: "../vendor/jscrollpane/jquery.jscrollpane.min",
      modernizr: "../vendor/modernizr/modernizr.custom.min",
      _: "../vendor/underscore/underscore-min",
      json3: "../vendor/iefix/json3",
      masonry: "../vendor/masonry/masonry.pkgd",
      swiper: "../vendor/swiper/idangerous.swiper-2.4.min",
      infiniteScroll: "../vendor/infiniteScroll/ng-infinite-scroll.min",
      fileUpload: "../vendor/angular-file-upload/angular-file-upload",
      tweenmax: "../vendor/tweenmax/TweenMax.min",
      easePack: "../vendor/tweenmax/easing/EasePack.min",
      imagesLoaded: "../vendor/imagesloaded/imagesloaded.pkgd"
    },
    shim: {
      'jquery': {
        exports: ["$", "jQuery"]
      },
      'jqueryMigrate': {
        deps: ['jquery']
      },
      'swiper': {
        deps: ['jquery']
      },
      'infiniteScroll': {
        deps: ['jquery', 'angular']
      },
      'angular': {
        exports: 'angular',
        deps: ['jquery']
      },
      'angularTouch': {
        deps: ['angular']
      },
      'angularGesture': {
        deps: ['angular']
      },
      'angularRoute': {
        deps: ['angular']
      },
      'angularResource': {
        deps: ['angular']
      },
      'angularAnimate': {
        deps: ['angular']
      },
      'angularLoadingBar': {
        deps: ['angular']
      },
      'ngFacebook': {
        deps: ['angular']
      },
      'fileUpload': {
        deps: ['angular']
      },
      'tweenmax': {
        deps: ['jquery', 'easePack'],
        exports: 'TweenMax'
      },
      'imagesLoaded': {
        deps: ['jquery']
      },
      '_': {
        exports: '_'
      },
      'facebook' : {
        exports: 'FB',
        deps: ['ngFacebook']
      }
    },
    priority: ["angular"],
    waitSeconds: 0
    //urlArgs: "bust=" + Math.random()//"bust=v2"
  });

}).call(this);