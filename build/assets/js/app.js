(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
'use strict';

module.exports = function () {
  var mapOptions = {
    // Zoom
    zoom: 13,
    // Middle coordinate
    center: new google.maps.LatLng(49.8382, 24.02324), // Lviv
    // Stile map
    styles: [{"featureType": "administrative", "stylers": [{"visibility": "off"}]}, {
      "featureType": "poi",
      "stylers": [{"visibility": "simplified"}]
    }, {
      "featureType": "road",
      "elementType": "labels",
      "stylers": [{"visibility": "simplified"}]
    }, {"featureType": "water", "stylers": [{"visibility": "simplified"}]}, {
      "featureType": "transit",
      "stylers": [{"visibility": "simplified"}]
    }, {"featureType": "landscape", "stylers": [{"visibility": "simplified"}]}, {
      "featureType": "road.highway",
      "stylers": [{"visibility": "off"}]
    }, {"featureType": "road.local", "stylers": [{"visibility": "on"}]}, {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [{"visibility": "on"}]
    }, {"featureType": "water", "stylers": [{"color": "#abbaa4"}]}, {
      "featureType": "transit.line",
      "elementType": "geometry",
      "stylers": [{"color": "#f6f9fc"}]
    }, {"featureType": "road.highway", "stylers": [{"color": "#ad9b8d"}]}],
    // Switch off standart interface
    disableDefaultUI: true,
    // Disabling mouse wheel scrolling
    scrollwheel: false
  };

  // Select an item for the map
  var mapElement = document.getElementById('js-map');
  // Create the map
  var map = new google.maps.Map(mapElement, mapOptions);
};

},{}],2:[function(require,module,exports){
'use strict';

module.exports = function () {
  var startAnimationElement = $('.about-skills__category');

  if (!startAnimationElement.length) {
    return;
  }
  
  var
    startAnimationScroll = startAnimationElement.offset().top,
    items = $('.js-skill');

  $(window).scroll(function () {
    var scroll = $(window).scrollTop() + $(window).height();

    if (scroll >= startAnimationScroll) {
      items.each(function (i) {
        var
          $this = $(this),
          percent = $this.data('percent');

        $this.addClass('visible').css({
          'animation-delay': i / 5 + 's'
        }).find('.circle-progress__circle_fill').css({
          'animation-name': 'circle-progress-animation-' + percent,
          'animation-duration': '2s',
          'animation-fill-mode': 'both',
          'animation-delay': i / 5 + 's'
        });
      });
    }
  });
};
},{}],3:[function(require,module,exports){
'use strict';

function postAdd() {
  var form = $('.js-post-add-form');

  form.submit(function (e) {
    e.preventDefault();

    var $this = $(this);
    var data = {
      title: $this.find('input[name="title"]').val(),
      date: $this.find('input[name="date"]').val(),
      text: $this.find('textarea[name="text"]').val()
    };

    $.ajax({
      url: '/admin/post',
      data: JSON.stringify(data),
      type: 'POST',
      contentType: 'application/json'
    }).then(function (data) {
      $.fancybox('<h1>' + data.message + '</h1>');
    }, function () {
      $.fancybox('<h1>Error for connection with server</h1>');
    });
  });
}

module.exports = postAdd;
},{}],4:[function(require,module,exports){
'use strict';

function skillsSave() {
  $('.js-skills-save').submit(function (e) {
    e.preventDefault();
    
    var data = {};

    // Собираем данные с формы
    $('.js-skill').each(function () {
      var $this = $(this);
      var category = $this.data('category');
      var skill = $this.data('skill');

      if (!(category in data)) {
        data[category] = {};
      }

      data[category][skill] = $this.val();
    });

    $.ajax({
      url: '/admin/skills',
      data: JSON.stringify(data),
      type: 'POST',
      contentType: 'application/json'
    }).then(function (data) {
      $.fancybox('<h1>' + data.message + '</h1>');
    }, function () {
      $.fancybox('<h1>Ошибка соединения с сервером</h1>');
    });
  });
}

module.exports = skillsSave;

},{}],5:[function(require,module,exports){
'use strict';

module.exports = function () {
  var
    navItems = $('.admin-navigation__item'),
    tabs = $('.js-tab');

  function changeTab() {
    var
      hash = location.hash,
      activeTab = tabs.filter(hash),
      activeNavItem = navItems.find('a').filter('[href="' + hash + '"]').parent();

    tabs.filter(':not(' + hash + ')').removeClass('active');

    if (activeTab.length) {
      activeTab.addClass('active');
      navItems.removeClass('active');
      activeNavItem.addClass('active');
    } else {
      navItems.eq(0).addClass('active');
      tabs.eq(0).addClass('active');
    }
  }

  $(window).on('hashchange', changeTab);
  $(changeTab);
};
},{}],6:[function(require,module,exports){
'use strict';

function workAdd() {
  var form = $('.js-work-add-form');

  form.submit(function (e) {
    e.preventDefault();

    var $this = $(this);
    var data = new FormData($this[0]);

    console.log(data);

    $.ajax({
      url: '/admin/work',
      data: data,
      type: 'POST',
      processData: false,
      contentType: false
    }).then(function (data) {
      console.log(data);
      $.fancybox('<h1>' + data.message + '</h1>');
    }, function () {
      $.fancybox('<h1>Ошибка соединения с сервером</h1>');
    });
  });
}

module.exports = workAdd;
},{}],7:[function(require,module,exports){
(function () {
  'use strict';
  // Общие
  var pin = require('./common/pin');
  var initMenu = require('./common/menu');
  var cover = require('./common/cover');
  var scrollTo = require('./common/scroll-to');
  var preloader = require('./common/preloader');
  var parallax = require('./common/header-parallax');
  var validate = require('./common/validate');
  // Welcome
  var flip = require('./welcome/flip');
  var auth = require('./welcome/auth');
  // Works
  var slider = require('./works/slider');
  var worksParallax = require('./works/works-parallax');
  var blur = require('./works/blur');
  // About
  var mapInit = require('./about/map-init');
  var skillsAnimation = require('./about/skills-animation');
  // Blog
  var initSidebar = require('./blog/sidebar');
  var initSwipeSidebar = require('./blog/swipe-sidebar');
  // Admin
  var tabs = require('./admin/tabs');
  var skillsSave = require('./admin/skills-save');
  var postAdd = require('./admin/post-add');
  var workAdd = require('./admin/work-add');

  function isCurrent(page) {
    return $(page).length;
  }

  // Общие
  $.extend($.fancybox.defaults, {
    helpers: {
      overlay: {
        locked: false
      }
    }
  });

  if (!isCurrent('#page-welcome')) {
    initMenu();
  }

  preloader();

  svg4everybody();

  parallax();

  scrollTo('.js-scrollto', 500);

  // Welcome
  if (isCurrent('#page-welcome')) {
    flip();
    validate();
    auth();
  }

  // Works
  if (isCurrent('#page-works')) {
    window.onload = window.onresize = function () {
      cover('#footer', '#js-cover-target', blur);
    };
    slider();
    worksParallax();
    validate();
  }

  // About
  if (isCurrent('#page-about')) {
    window.onload = window.onresize = function () {
      cover('#footer');
    };
    skillsAnimation();
    google.maps.event.addDomListener(window, 'load', mapInit);
  }

  // Blog
  if (isCurrent('#page-blog')) {
    initSidebar();
    initSwipeSidebar();
  }

  // Admin
  if (isCurrent('#page-admin')) {
    tabs();
    skillsSave();
    postAdd();
    workAdd();
  }
})();

},{"./about/map-init":1,"./about/skills-animation":2,"./admin/post-add":3,"./admin/skills-save":4,"./admin/tabs":5,"./admin/work-add":6,"./blog/sidebar":8,"./blog/swipe-sidebar":9,"./common/cover":10,"./common/header-parallax":11,"./common/menu":12,"./common/pin":13,"./common/preloader":14,"./common/scroll-to":15,"./common/validate":17,"./welcome/auth":18,"./welcome/flip":19,"./works/blur":20,"./works/slider":21,"./works/works-parallax":22}],8:[function(require,module,exports){
'use strict';

var pin = require('../common/pin');

module.exports = function () {
  function checkArticle(articleSelector) {
    $(articleSelector).each(function () {
      var
        $this = $(this),
        topEdge = $this.offset().top - $(window).height(),
        bottomEdge = topEdge + $this.height(),
        wScroll = $(window).scrollTop();

      if (topEdge < wScroll && bottomEdge > wScroll) {
        var
          currentId = $this.data('article'),
          reqLink = $('.js-show-article').removeClass('active').filter('[href="#' + currentId + '"]');

        reqLink.addClass('active');
        window.location.hash = currentId;
      }
    });
  }

  function showArticle(article, isAnimate) {
    var
      direction = article.replace(/#/, ''),
      reqArticle = $('.blog-article').filter('[data-article="' + direction + '"]'),
      reqArticlePos = reqArticle.offset().top;

    if (isAnimate) {
      $('body, html').animate({
        scrollTop: reqArticlePos
      }, 500);
    } else {
      $('body, html').scrollTop(reqArticlePos);
    }
  }

  function sidebarInit() {
    var
      sidebar = $('.sidebar__nav'),
      header = $('.header'),
      startPos = header.offset().top + header.height(),
      wScroll = $(window).scrollTop(),
      sidebarPosition = {
        top: sidebar.offset().top - $('.blog__sidebar').offset().top,
        left: sidebar.offset().left
      };

    if (wScroll > startPos && $(window).width() > 1200 && !pin.isPinned(sidebar)) {
      pin.pin(sidebar, sidebarPosition);
    } else if ((wScroll < startPos || $(window).width() < 1200) && pin.isPinned(sidebar)) {
      pin.unpin(sidebar);
    }
  }

  $(document).ready(function () {
    sidebarInit();

    if (window.location.hash)
      showArticle(window.location.hash, false);

    $('.sidebar__link').on('click', function (e) {
      e.preventDefault();

      showArticle($(this).attr('href'), true);
    });
  });

  $(window).scroll(function () {
    sidebarInit();

    checkArticle('.js-article');
  });

  $(window).resize(function () {
    sidebarInit();
  });
};
},{"../common/pin":13}],9:[function(require,module,exports){
'use strict';

module.exports = function () {
  var
    body = $('body'),
    sidebar = $('#js-sidebar-container'),
    touchStartX = 0,
    touchEndX = 0,
    threshold = 100;

  body.on('touchstart', function (event) {
    if ($(window).width() >= 1200)
      return;

    var touch = event.originalEvent.touches[0] || event.originalEvent.changedTouches[0];

    touchStartX = touch.pageX;
  });

  body.on('touchend', function (event) {
    if ($(window).width() >= 1200)
      return;

    var touch = event.originalEvent.touches[0] || event.originalEvent.changedTouches[0];

    touchEndX = touch.pageX;

    if (touchEndX - touchStartX > threshold && !sidebar.hasClass('sidebar_open'))
      sidebar.addClass('sidebar_open');
    else if (touchEndX - touchStartX < -threshold && sidebar.hasClass('sidebar_open'))
      sidebar.removeClass('sidebar_open');
  });
};

},{}],10:[function(require,module,exports){
'use strict';

module.exports = function (element, target, callback) {
  element = element instanceof jQuery ? element : $(element);

  var elementHeight = element.height();

  element.css('margin-top', '-' + elementHeight + 'px');

  if (target) {
    target = target instanceof jQuery ? target : $(target);
    target.css('padding-bottom', elementHeight + 'px');
  }

  if (callback)
    callback(elementHeight);
};
},{}],11:[function(require,module,exports){
'use strict';

var slideIt = require('./slide-it');

module.exports = function () {
  var
    headerHeight = $('.js-header').height(),
    bg = $('.js-header__bg'),
    author = $('.js-header__author'),
    text = $('.js-header__text');

  function parallax() {
    var
      wScroll = $(window).scrollTop();

    // Немного ограничим параллакс
    if (wScroll < headerHeight) {
      slideIt(bg, -wScroll / 120);
      slideIt(text, -wScroll / 7);
      slideIt(author, wScroll / 4);
    }
  }


  $(window).scroll(parallax);
};

},{"./slide-it":16}],12:[function(require,module,exports){
'use strict';

module.exports = function () {
  var
    menu = $('#js-menu'),
    items = menu.find('.menu__item');

  $('#js-menu-checkbox').change(function () {
    if (!menu.hasClass('menu_opened')) {
      var delay = 0.35;
      menu.addClass('menu_opened');

      items.each(function () {
        delay = delay + 0.1;
        $(this).addClass('bounceIn').css('animation-delay', delay + 's');
      });
    } else {
      items.removeClass('bounceIn');
      menu.removeClass('menu_opened');
    }
  });
};
},{}],13:[function(require,module,exports){
'use strict';

module.exports = {
  pin: function (element, position) {
    element = element instanceof jQuery ? element : $(element);
    position = position ? position : element.offset();

    element.addClass('pinned').css({
      position: 'fixed',
      top: position.top + 'px',
      left: position.left + 'px'
    });
  },
  unpin: function (element) {
    element = element instanceof jQuery ? element : $(element);

    element.removeClass('pinned').css({
      position: '',
      top: '',
      right: '',
      bottom: '',
      left: ''
    });
  },
  isPinned: function (element) {
    element = element instanceof jQuery ? element : $(element);

    return element.hasClass('pinned');
  }
};
},{}],14:[function(require,module,exports){
'use strict';

module.exports = function () {
  function getImagesPaths() {
    var images = [];

    $('*').each(function () {
      var
        $this = $(this),
        img = $this.is('img'),
        path;

      if (img) {
        path = $this.attr('src');

        if (path)
          images.push(path);
      } else {
        var background = $this.css('background-image');

        if (background != 'none') {
          path = /url\(.*?\)/ig.test(background) && background.replace('url("', '').replace('")', '');

          if (path)
            images.push(path);
        }
      }
    });

    return images;
  }

  $(function () {
    var
      images = getImagesPaths(),
      total = images.length,
      current = 0;

    function updateProgress() {
      current += 1;

      $('#js-preloader-progress').text(Math.ceil(current * 100 / total));
    }

    images.map(function (path) {
      $('<img>', {
        attr: {
          src: path
        }
      }).load(updateProgress);
    });
  });

  $(window).load(function () {
    $('#js-preloader').fadeOut();
  });
};
},{}],15:[function(require,module,exports){
'use strict';

module.exports = function (elements, duration) {
  elements = elements instanceof jQuery ? elements : $(elements);

  $(function () {
    elements.click(function (event) {
      event.preventDefault();

      var
        targetPos = $($(this).attr('href')).offset().top;

      $('body, html').animate({
        scrollTop: targetPos
      }, duration);
    });
  });
};
},{}],16:[function(require,module,exports){
'use strict';

module.exports = function (block, parallaxAmount) {
  var
    parallax = -parallaxAmount + '%',
    transformString = 'translate3d(0,' + parallax + ',0)';

  block.css('transform', transformString);
};
},{}],17:[function(require,module,exports){
'use strict';

module.exports = function () {
  function validate(form) {
    var
      inputs = form.find('input, textarea'),
      empty = false,
      emailError = false;

    inputs.each(function () {
      var
        $this = $(this),
        value = $this.val();

      if (value === '') {
        empty = true;
        return;
      }

      if ($this.attr('type') === 'email') {
        var re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        emailError = !re.test(value);
      }
    });

    if (empty) {
      $.fancybox('<h1>Вы заполнили не все поля формы!</h1>');
      return false;
    }

    if (emailError) {
      $.fancybox('<h1>Введите корректный email!</h1>');
      return false;
    }

    return true;
  }

  $('form input[type=submit]').click(function (e) {
    var form = $(this).closest('form');

    return validate(form);
  });
};
},{}],18:[function(require,module,exports){
'use strict';

function auth() {
  var form = $('.js-authform');

  form.submit(function (e) {
    e.preventDefault();

    var $this = $(this);
    var data = {
      login: $this.find('input[name="login"]').val(),
      password: $this.find('input[name="password"]').val(),
      ishuman: $this.find('input[name="ishuman"]:checked').val(),
      norobot: $this.find('input[name="norobot"]:checked').val()
    };

    $.ajax({
      url: '/login',
      data: JSON.stringify(data),
      type: 'POST',
      contentType: 'application/json'
    }).then(function (data) {
      console.log(data);
      switch (data.status) {
        case 'success':
          window.location.assign(data.redirect);
          break;
        case 'error':
          $.fancybox('<h1>' + data.message + '</h1>');
          break;
      }
    }, function () {
      $.fancybox('<h1>Error with server connection</h1>');
    });
  })
}

module.exports = auth;
},{}],19:[function(require,module,exports){
'use strict';

module.exports = function () {
  var
    flipper = $('#js-flipper'),
    authorizationButton = $('#js-authorizetion-button');

  function isAuth() {
    return location.hash.replace(/^#/, '') === 'auth';
  }

  function flip() {
    if (isAuth() && !flipper.hasClass('welcome__flip_flipped')) {
      flipper.addClass('welcome__flip_flipped');
      authorizationButton.fadeOut(600);
    } else {
      flipper.removeClass('welcome__flip_flipped');
      authorizationButton.fadeIn(600);
    }
  }

  $(window).on('hashchange', flip);
  $(flip);
};
},{}],20:[function(require,module,exports){
'use strict';

module.exports = function (fix) {
  var
    bg = $('.js-blur-bg'),
    blur = $('.js-blur').css({
      top: 0,
      left: 0
    }),
    bgOffset = bg.offset(),
    blurOffset = blur.offset();

  fix = fix || 0;

  blur.css({
    width: bg.width(),
    height: bg.height(),
    top: bgOffset.top - blurOffset.top + fix,
    left: bgOffset.left - blurOffset.left
  });
};
},{}],21:[function(require,module,exports){
'use strict';

module.exports = function () {
  //noinspection JSDuplicatedDeclaration
  var
    slider = $('.js-slider'),
  // Инфа
    image = slider.find('.js-slider__slide-image'),
    name = slider.find('.js-slider__slide-name'),
    description = slider.find('.js-slider__slide-description'),
    link = slider.find('.js-slider__slide-link'),
  // Кнопки
    prevButton = slider.find('.js-slider__prev'),
    prevButtonImageCurrent = prevButton.find('.js-slider__control-image_current'),
    prevButtonImageNext = prevButton.find('.js-slider__control-image_next'),
    nextButton = slider.find('.js-slider__next'),
    nextButtonImageCurrent = nextButton.find('.js-slider__control-image_current'),
    nextButtonImageNext = nextButton.find('.js-slider__control-image_next'),
  // Слайды
    items = slider.find('.js-slider__item'),
    current = 0,
    currentSlideItem,
    prevSlideItem,
    nextSlideItem;

  function validate(num) {
    var result;

    if (num < 0)
      result = items.length - 1;
    else if (num > items.length - 1)
      result = 0;
    else
      result = num;

    return result;
  }

  function calcSlides() {
    var
      prev = validate(current - 1),
      next = validate(current + 1);

    currentSlideItem = items.eq(current);
    prevSlideItem = items.eq(prev);
    nextSlideItem = items.eq(next);
  }

  function init() {
    calcSlides();

    changeSlide();
  }

  function changeBackground(elem, background) {
    elem.css('background-image', 'url("' + background + '")');

    return elem;
  }

  function changeSlideControl(next, current, background, direction) {
    if (direction) {
      next.css('top', '100%')
    }

    changeBackground(next, background).animate({
      top: '0%'
    }, function () {
      $(this).css('top', direction ? '100%' : '-100%');
    });

    current.animate({
      top: direction ? '-100%' : '100%'
    }, function () {
      changeBackground($(this), background).css('top', '0');
    });
  }

  function textChange(elem, text, animationName) {
    text = '' + text;
    var letters = text.split('');
    var str = '<span style="display: inline-block;">';
    var animationDelay = 0;

    letters.forEach(function (letter, id) {
      animationDelay++;

      if (letter === ' ') {
        str += '&nbsp;</span><span style="display: inline-block;">';
      } else {
        str += '<span id="letter-' + id + '" class="' + animationName
          + '" style="display: inline-block; animation-delay:'
          + animationDelay / 20
          + 's">'
          + letter
          + '</span>';
      }

    });
    str += '</span>';
    elem.html(str);
  }

  function changeSlide() {
    // Смена главного изображения
    image.fadeOut(300, function () {
      changeBackground($(this), currentSlideItem.data('img')).fadeIn();
    });

    // Смена текста
    textChange(name, currentSlideItem.data('name'), 'bounceIn');
    textChange(description, currentSlideItem.data('description'), 'bounceIn');
    link.attr('href', currentSlideItem.data('link'));

    // Смена слайдов в контролах
    changeSlideControl(prevButtonImageNext, prevButtonImageCurrent, prevSlideItem.data('img'));
    changeSlideControl(nextButtonImageNext, nextButtonImageCurrent, nextSlideItem.data('img'), true);
  }

  function nextSlide() {
    current = validate(++current);
    calcSlides();
    slider.trigger('changeSlide');
  }

  function prevSlide() {
    current = validate(--current);
    calcSlides();
    slider.trigger('changeSlide');
  }

  $(window).load(init);
  slider.on('changeSlide', changeSlide);
  nextButton.click(nextSlide);
  prevButton.click(prevSlide);
};
},{}],22:[function(require,module,exports){
'use strict';

var slideIt = require('../common/slide-it');

module.exports = function () {
  var
    startParallaxOffset = $('.js-parallax').offset() ,
    leaf1 = $('.js-leaf_1'),
    leaf2 = $('.js-leaf_2'),
    leaf3 = $('.js-leaf_3');

  function parallax() {
    var wScroll = $(window).scrollTop() + $(window).height() - startParallaxOffset.top;

    if (wScroll > 0) {
      slideIt(leaf1, -wScroll / 10);
      slideIt(leaf2, -wScroll / 5);
      slideIt(leaf3, -wScroll / 15);
    }
  }
  
  $(window).scroll(parallax);
};
},{"../common/slide-it":16}]},{},[7])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzb3VyY2UvanMvYWJvdXQvbWFwLWluaXQuanMiLCJzb3VyY2UvanMvYWJvdXQvc2tpbGxzLWFuaW1hdGlvbi5qcyIsInNvdXJjZS9qcy9hZG1pbi9wb3N0LWFkZC5qcyIsInNvdXJjZS9qcy9hZG1pbi9za2lsbHMtc2F2ZS5qcyIsInNvdXJjZS9qcy9hZG1pbi90YWJzLmpzIiwic291cmNlL2pzL2FkbWluL3dvcmstYWRkLmpzIiwic291cmNlL2pzL2FwcC5qcyIsInNvdXJjZS9qcy9ibG9nL3NpZGViYXIuanMiLCJzb3VyY2UvanMvYmxvZy9zd2lwZS1zaWRlYmFyLmpzIiwic291cmNlL2pzL2NvbW1vbi9jb3Zlci5qcyIsInNvdXJjZS9qcy9jb21tb24vaGVhZGVyLXBhcmFsbGF4LmpzIiwic291cmNlL2pzL2NvbW1vbi9tZW51LmpzIiwic291cmNlL2pzL2NvbW1vbi9waW4uanMiLCJzb3VyY2UvanMvY29tbW9uL3ByZWxvYWRlci5qcyIsInNvdXJjZS9qcy9jb21tb24vc2Nyb2xsLXRvLmpzIiwic291cmNlL2pzL2NvbW1vbi9zbGlkZS1pdC5qcyIsInNvdXJjZS9qcy9jb21tb24vdmFsaWRhdGUuanMiLCJzb3VyY2UvanMvd2VsY29tZS9hdXRoLmpzIiwic291cmNlL2pzL3dlbGNvbWUvZmxpcC5qcyIsInNvdXJjZS9qcy93b3Jrcy9ibHVyLmpzIiwic291cmNlL2pzL3dvcmtzL3NsaWRlci5qcyIsInNvdXJjZS9qcy93b3Jrcy93b3Jrcy1wYXJhbGxheC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdklBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfXJldHVybiBlfSkoKSIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBtYXBPcHRpb25zID0ge1xuICAgIC8vIFpvb21cbiAgICB6b29tOiAxMyxcbiAgICAvLyBNaWRkbGUgY29vcmRpbmF0ZVxuICAgIGNlbnRlcjogbmV3IGdvb2dsZS5tYXBzLkxhdExuZyg0OS44MzgyLCAyNC4wMjMyNCksIC8vIEx2aXZcbiAgICAvLyBTdGlsZSBtYXBcbiAgICBzdHlsZXM6IFt7XCJmZWF0dXJlVHlwZVwiOiBcImFkbWluaXN0cmF0aXZlXCIsIFwic3R5bGVyc1wiOiBbe1widmlzaWJpbGl0eVwiOiBcIm9mZlwifV19LCB7XG4gICAgICBcImZlYXR1cmVUeXBlXCI6IFwicG9pXCIsXG4gICAgICBcInN0eWxlcnNcIjogW3tcInZpc2liaWxpdHlcIjogXCJzaW1wbGlmaWVkXCJ9XVxuICAgIH0sIHtcbiAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJyb2FkXCIsXG4gICAgICBcImVsZW1lbnRUeXBlXCI6IFwibGFiZWxzXCIsXG4gICAgICBcInN0eWxlcnNcIjogW3tcInZpc2liaWxpdHlcIjogXCJzaW1wbGlmaWVkXCJ9XVxuICAgIH0sIHtcImZlYXR1cmVUeXBlXCI6IFwid2F0ZXJcIiwgXCJzdHlsZXJzXCI6IFt7XCJ2aXNpYmlsaXR5XCI6IFwic2ltcGxpZmllZFwifV19LCB7XG4gICAgICBcImZlYXR1cmVUeXBlXCI6IFwidHJhbnNpdFwiLFxuICAgICAgXCJzdHlsZXJzXCI6IFt7XCJ2aXNpYmlsaXR5XCI6IFwic2ltcGxpZmllZFwifV1cbiAgICB9LCB7XCJmZWF0dXJlVHlwZVwiOiBcImxhbmRzY2FwZVwiLCBcInN0eWxlcnNcIjogW3tcInZpc2liaWxpdHlcIjogXCJzaW1wbGlmaWVkXCJ9XX0sIHtcbiAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJyb2FkLmhpZ2h3YXlcIixcbiAgICAgIFwic3R5bGVyc1wiOiBbe1widmlzaWJpbGl0eVwiOiBcIm9mZlwifV1cbiAgICB9LCB7XCJmZWF0dXJlVHlwZVwiOiBcInJvYWQubG9jYWxcIiwgXCJzdHlsZXJzXCI6IFt7XCJ2aXNpYmlsaXR5XCI6IFwib25cIn1dfSwge1xuICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcInJvYWQuaGlnaHdheVwiLFxuICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImdlb21ldHJ5XCIsXG4gICAgICBcInN0eWxlcnNcIjogW3tcInZpc2liaWxpdHlcIjogXCJvblwifV1cbiAgICB9LCB7XCJmZWF0dXJlVHlwZVwiOiBcIndhdGVyXCIsIFwic3R5bGVyc1wiOiBbe1wiY29sb3JcIjogXCIjYWJiYWE0XCJ9XX0sIHtcbiAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJ0cmFuc2l0LmxpbmVcIixcbiAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJnZW9tZXRyeVwiLFxuICAgICAgXCJzdHlsZXJzXCI6IFt7XCJjb2xvclwiOiBcIiNmNmY5ZmNcIn1dXG4gICAgfSwge1wiZmVhdHVyZVR5cGVcIjogXCJyb2FkLmhpZ2h3YXlcIiwgXCJzdHlsZXJzXCI6IFt7XCJjb2xvclwiOiBcIiNhZDliOGRcIn1dfV0sXG4gICAgLy8gU3dpdGNoIG9mZiBzdGFuZGFydCBpbnRlcmZhY2VcbiAgICBkaXNhYmxlRGVmYXVsdFVJOiB0cnVlLFxuICAgIC8vIERpc2FibGluZyBtb3VzZSB3aGVlbCBzY3JvbGxpbmdcbiAgICBzY3JvbGx3aGVlbDogZmFsc2VcbiAgfTtcblxuICAvLyBTZWxlY3QgYW4gaXRlbSBmb3IgdGhlIG1hcFxuICB2YXIgbWFwRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdqcy1tYXAnKTtcbiAgLy8gQ3JlYXRlIHRoZSBtYXBcbiAgdmFyIG1hcCA9IG5ldyBnb29nbGUubWFwcy5NYXAobWFwRWxlbWVudCwgbWFwT3B0aW9ucyk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIHN0YXJ0QW5pbWF0aW9uRWxlbWVudCA9ICQoJy5hYm91dC1za2lsbHNfX2NhdGVnb3J5Jyk7XG5cbiAgaWYgKCFzdGFydEFuaW1hdGlvbkVsZW1lbnQubGVuZ3RoKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIFxuICB2YXJcbiAgICBzdGFydEFuaW1hdGlvblNjcm9sbCA9IHN0YXJ0QW5pbWF0aW9uRWxlbWVudC5vZmZzZXQoKS50b3AsXG4gICAgaXRlbXMgPSAkKCcuanMtc2tpbGwnKTtcblxuICAkKHdpbmRvdykuc2Nyb2xsKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgc2Nyb2xsID0gJCh3aW5kb3cpLnNjcm9sbFRvcCgpICsgJCh3aW5kb3cpLmhlaWdodCgpO1xuXG4gICAgaWYgKHNjcm9sbCA+PSBzdGFydEFuaW1hdGlvblNjcm9sbCkge1xuICAgICAgaXRlbXMuZWFjaChmdW5jdGlvbiAoaSkge1xuICAgICAgICB2YXJcbiAgICAgICAgICAkdGhpcyA9ICQodGhpcyksXG4gICAgICAgICAgcGVyY2VudCA9ICR0aGlzLmRhdGEoJ3BlcmNlbnQnKTtcblxuICAgICAgICAkdGhpcy5hZGRDbGFzcygndmlzaWJsZScpLmNzcyh7XG4gICAgICAgICAgJ2FuaW1hdGlvbi1kZWxheSc6IGkgLyA1ICsgJ3MnXG4gICAgICAgIH0pLmZpbmQoJy5jaXJjbGUtcHJvZ3Jlc3NfX2NpcmNsZV9maWxsJykuY3NzKHtcbiAgICAgICAgICAnYW5pbWF0aW9uLW5hbWUnOiAnY2lyY2xlLXByb2dyZXNzLWFuaW1hdGlvbi0nICsgcGVyY2VudCxcbiAgICAgICAgICAnYW5pbWF0aW9uLWR1cmF0aW9uJzogJzJzJyxcbiAgICAgICAgICAnYW5pbWF0aW9uLWZpbGwtbW9kZSc6ICdib3RoJyxcbiAgICAgICAgICAnYW5pbWF0aW9uLWRlbGF5JzogaSAvIDUgKyAncydcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH0pO1xufTsiLCIndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIHBvc3RBZGQoKSB7XG4gIHZhciBmb3JtID0gJCgnLmpzLXBvc3QtYWRkLWZvcm0nKTtcblxuICBmb3JtLnN1Ym1pdChmdW5jdGlvbiAoZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgIHZhciAkdGhpcyA9ICQodGhpcyk7XG4gICAgdmFyIGRhdGEgPSB7XG4gICAgICB0aXRsZTogJHRoaXMuZmluZCgnaW5wdXRbbmFtZT1cInRpdGxlXCJdJykudmFsKCksXG4gICAgICBkYXRlOiAkdGhpcy5maW5kKCdpbnB1dFtuYW1lPVwiZGF0ZVwiXScpLnZhbCgpLFxuICAgICAgdGV4dDogJHRoaXMuZmluZCgndGV4dGFyZWFbbmFtZT1cInRleHRcIl0nKS52YWwoKVxuICAgIH07XG5cbiAgICAkLmFqYXgoe1xuICAgICAgdXJsOiAnL2FkbWluL3Bvc3QnLFxuICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoZGF0YSksXG4gICAgICB0eXBlOiAnUE9TVCcsXG4gICAgICBjb250ZW50VHlwZTogJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgfSkudGhlbihmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgJC5mYW5jeWJveCgnPGgxPicgKyBkYXRhLm1lc3NhZ2UgKyAnPC9oMT4nKTtcbiAgICB9LCBmdW5jdGlvbiAoKSB7XG4gICAgICAkLmZhbmN5Ym94KCc8aDE+RXJyb3IgZm9yIGNvbm5lY3Rpb24gd2l0aCBzZXJ2ZXI8L2gxPicpO1xuICAgIH0pO1xuICB9KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBwb3N0QWRkOyIsIid1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24gc2tpbGxzU2F2ZSgpIHtcbiAgJCgnLmpzLXNraWxscy1zYXZlJykuc3VibWl0KGZ1bmN0aW9uIChlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIFxuICAgIHZhciBkYXRhID0ge307XG5cbiAgICAvLyDQodC+0LHQuNGA0LDQtdC8INC00LDQvdC90YvQtSDRgSDRhNC+0YDQvNGLXG4gICAgJCgnLmpzLXNraWxsJykuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgJHRoaXMgPSAkKHRoaXMpO1xuICAgICAgdmFyIGNhdGVnb3J5ID0gJHRoaXMuZGF0YSgnY2F0ZWdvcnknKTtcbiAgICAgIHZhciBza2lsbCA9ICR0aGlzLmRhdGEoJ3NraWxsJyk7XG5cbiAgICAgIGlmICghKGNhdGVnb3J5IGluIGRhdGEpKSB7XG4gICAgICAgIGRhdGFbY2F0ZWdvcnldID0ge307XG4gICAgICB9XG5cbiAgICAgIGRhdGFbY2F0ZWdvcnldW3NraWxsXSA9ICR0aGlzLnZhbCgpO1xuICAgIH0pO1xuXG4gICAgJC5hamF4KHtcbiAgICAgIHVybDogJy9hZG1pbi9za2lsbHMnLFxuICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoZGF0YSksXG4gICAgICB0eXBlOiAnUE9TVCcsXG4gICAgICBjb250ZW50VHlwZTogJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgfSkudGhlbihmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgJC5mYW5jeWJveCgnPGgxPicgKyBkYXRhLm1lc3NhZ2UgKyAnPC9oMT4nKTtcbiAgICB9LCBmdW5jdGlvbiAoKSB7XG4gICAgICAkLmZhbmN5Ym94KCc8aDE+0J7RiNC40LHQutCwINGB0L7QtdC00LjQvdC10L3QuNGPINGBINGB0LXRgNCy0LXRgNC+0Lw8L2gxPicpO1xuICAgIH0pO1xuICB9KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBza2lsbHNTYXZlO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyXG4gICAgbmF2SXRlbXMgPSAkKCcuYWRtaW4tbmF2aWdhdGlvbl9faXRlbScpLFxuICAgIHRhYnMgPSAkKCcuanMtdGFiJyk7XG5cbiAgZnVuY3Rpb24gY2hhbmdlVGFiKCkge1xuICAgIHZhclxuICAgICAgaGFzaCA9IGxvY2F0aW9uLmhhc2gsXG4gICAgICBhY3RpdmVUYWIgPSB0YWJzLmZpbHRlcihoYXNoKSxcbiAgICAgIGFjdGl2ZU5hdkl0ZW0gPSBuYXZJdGVtcy5maW5kKCdhJykuZmlsdGVyKCdbaHJlZj1cIicgKyBoYXNoICsgJ1wiXScpLnBhcmVudCgpO1xuXG4gICAgdGFicy5maWx0ZXIoJzpub3QoJyArIGhhc2ggKyAnKScpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcblxuICAgIGlmIChhY3RpdmVUYWIubGVuZ3RoKSB7XG4gICAgICBhY3RpdmVUYWIuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgbmF2SXRlbXMucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgYWN0aXZlTmF2SXRlbS5hZGRDbGFzcygnYWN0aXZlJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG5hdkl0ZW1zLmVxKDApLmFkZENsYXNzKCdhY3RpdmUnKTtcbiAgICAgIHRhYnMuZXEoMCkuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICAgIH1cbiAgfVxuXG4gICQod2luZG93KS5vbignaGFzaGNoYW5nZScsIGNoYW5nZVRhYik7XG4gICQoY2hhbmdlVGFiKTtcbn07IiwiJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiB3b3JrQWRkKCkge1xuICB2YXIgZm9ybSA9ICQoJy5qcy13b3JrLWFkZC1mb3JtJyk7XG5cbiAgZm9ybS5zdWJtaXQoZnVuY3Rpb24gKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICB2YXIgJHRoaXMgPSAkKHRoaXMpO1xuICAgIHZhciBkYXRhID0gbmV3IEZvcm1EYXRhKCR0aGlzWzBdKTtcblxuICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuXG4gICAgJC5hamF4KHtcbiAgICAgIHVybDogJy9hZG1pbi93b3JrJyxcbiAgICAgIGRhdGE6IGRhdGEsXG4gICAgICB0eXBlOiAnUE9TVCcsXG4gICAgICBwcm9jZXNzRGF0YTogZmFsc2UsXG4gICAgICBjb250ZW50VHlwZTogZmFsc2VcbiAgICB9KS50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICQuZmFuY3lib3goJzxoMT4nICsgZGF0YS5tZXNzYWdlICsgJzwvaDE+Jyk7XG4gICAgfSwgZnVuY3Rpb24gKCkge1xuICAgICAgJC5mYW5jeWJveCgnPGgxPtCe0YjQuNCx0LrQsCDRgdC+0LXQtNC40L3QtdC90LjRjyDRgSDRgdC10YDQstC10YDQvtC8PC9oMT4nKTtcbiAgICB9KTtcbiAgfSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gd29ya0FkZDsiLCIoZnVuY3Rpb24gKCkge1xuICAndXNlIHN0cmljdCc7XG4gIC8vINCe0LHRidC40LVcbiAgdmFyIHBpbiA9IHJlcXVpcmUoJy4vY29tbW9uL3BpbicpO1xuICB2YXIgaW5pdE1lbnUgPSByZXF1aXJlKCcuL2NvbW1vbi9tZW51Jyk7XG4gIHZhciBjb3ZlciA9IHJlcXVpcmUoJy4vY29tbW9uL2NvdmVyJyk7XG4gIHZhciBzY3JvbGxUbyA9IHJlcXVpcmUoJy4vY29tbW9uL3Njcm9sbC10bycpO1xuICB2YXIgcHJlbG9hZGVyID0gcmVxdWlyZSgnLi9jb21tb24vcHJlbG9hZGVyJyk7XG4gIHZhciBwYXJhbGxheCA9IHJlcXVpcmUoJy4vY29tbW9uL2hlYWRlci1wYXJhbGxheCcpO1xuICB2YXIgdmFsaWRhdGUgPSByZXF1aXJlKCcuL2NvbW1vbi92YWxpZGF0ZScpO1xuICAvLyBXZWxjb21lXG4gIHZhciBmbGlwID0gcmVxdWlyZSgnLi93ZWxjb21lL2ZsaXAnKTtcbiAgdmFyIGF1dGggPSByZXF1aXJlKCcuL3dlbGNvbWUvYXV0aCcpO1xuICAvLyBXb3Jrc1xuICB2YXIgc2xpZGVyID0gcmVxdWlyZSgnLi93b3Jrcy9zbGlkZXInKTtcbiAgdmFyIHdvcmtzUGFyYWxsYXggPSByZXF1aXJlKCcuL3dvcmtzL3dvcmtzLXBhcmFsbGF4Jyk7XG4gIHZhciBibHVyID0gcmVxdWlyZSgnLi93b3Jrcy9ibHVyJyk7XG4gIC8vIEFib3V0XG4gIHZhciBtYXBJbml0ID0gcmVxdWlyZSgnLi9hYm91dC9tYXAtaW5pdCcpO1xuICB2YXIgc2tpbGxzQW5pbWF0aW9uID0gcmVxdWlyZSgnLi9hYm91dC9za2lsbHMtYW5pbWF0aW9uJyk7XG4gIC8vIEJsb2dcbiAgdmFyIGluaXRTaWRlYmFyID0gcmVxdWlyZSgnLi9ibG9nL3NpZGViYXInKTtcbiAgdmFyIGluaXRTd2lwZVNpZGViYXIgPSByZXF1aXJlKCcuL2Jsb2cvc3dpcGUtc2lkZWJhcicpO1xuICAvLyBBZG1pblxuICB2YXIgdGFicyA9IHJlcXVpcmUoJy4vYWRtaW4vdGFicycpO1xuICB2YXIgc2tpbGxzU2F2ZSA9IHJlcXVpcmUoJy4vYWRtaW4vc2tpbGxzLXNhdmUnKTtcbiAgdmFyIHBvc3RBZGQgPSByZXF1aXJlKCcuL2FkbWluL3Bvc3QtYWRkJyk7XG4gIHZhciB3b3JrQWRkID0gcmVxdWlyZSgnLi9hZG1pbi93b3JrLWFkZCcpO1xuXG4gIGZ1bmN0aW9uIGlzQ3VycmVudChwYWdlKSB7XG4gICAgcmV0dXJuICQocGFnZSkubGVuZ3RoO1xuICB9XG5cbiAgLy8g0J7QsdGJ0LjQtVxuICAkLmV4dGVuZCgkLmZhbmN5Ym94LmRlZmF1bHRzLCB7XG4gICAgaGVscGVyczoge1xuICAgICAgb3ZlcmxheToge1xuICAgICAgICBsb2NrZWQ6IGZhbHNlXG4gICAgICB9XG4gICAgfVxuICB9KTtcblxuICBpZiAoIWlzQ3VycmVudCgnI3BhZ2Utd2VsY29tZScpKSB7XG4gICAgaW5pdE1lbnUoKTtcbiAgfVxuXG4gIHByZWxvYWRlcigpO1xuXG4gIHN2ZzRldmVyeWJvZHkoKTtcblxuICBwYXJhbGxheCgpO1xuXG4gIHNjcm9sbFRvKCcuanMtc2Nyb2xsdG8nLCA1MDApO1xuXG4gIC8vIFdlbGNvbWVcbiAgaWYgKGlzQ3VycmVudCgnI3BhZ2Utd2VsY29tZScpKSB7XG4gICAgZmxpcCgpO1xuICAgIHZhbGlkYXRlKCk7XG4gICAgYXV0aCgpO1xuICB9XG5cbiAgLy8gV29ya3NcbiAgaWYgKGlzQ3VycmVudCgnI3BhZ2Utd29ya3MnKSkge1xuICAgIHdpbmRvdy5vbmxvYWQgPSB3aW5kb3cub25yZXNpemUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBjb3ZlcignI2Zvb3RlcicsICcjanMtY292ZXItdGFyZ2V0JywgYmx1cik7XG4gICAgfTtcbiAgICBzbGlkZXIoKTtcbiAgICB3b3Jrc1BhcmFsbGF4KCk7XG4gICAgdmFsaWRhdGUoKTtcbiAgfVxuXG4gIC8vIEFib3V0XG4gIGlmIChpc0N1cnJlbnQoJyNwYWdlLWFib3V0JykpIHtcbiAgICB3aW5kb3cub25sb2FkID0gd2luZG93Lm9ucmVzaXplID0gZnVuY3Rpb24gKCkge1xuICAgICAgY292ZXIoJyNmb290ZXInKTtcbiAgICB9O1xuICAgIHNraWxsc0FuaW1hdGlvbigpO1xuICAgIGdvb2dsZS5tYXBzLmV2ZW50LmFkZERvbUxpc3RlbmVyKHdpbmRvdywgJ2xvYWQnLCBtYXBJbml0KTtcbiAgfVxuXG4gIC8vIEJsb2dcbiAgaWYgKGlzQ3VycmVudCgnI3BhZ2UtYmxvZycpKSB7XG4gICAgaW5pdFNpZGViYXIoKTtcbiAgICBpbml0U3dpcGVTaWRlYmFyKCk7XG4gIH1cblxuICAvLyBBZG1pblxuICBpZiAoaXNDdXJyZW50KCcjcGFnZS1hZG1pbicpKSB7XG4gICAgdGFicygpO1xuICAgIHNraWxsc1NhdmUoKTtcbiAgICBwb3N0QWRkKCk7XG4gICAgd29ya0FkZCgpO1xuICB9XG59KSgpO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgcGluID0gcmVxdWlyZSgnLi4vY29tbW9uL3BpbicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gY2hlY2tBcnRpY2xlKGFydGljbGVTZWxlY3Rvcikge1xuICAgICQoYXJ0aWNsZVNlbGVjdG9yKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhclxuICAgICAgICAkdGhpcyA9ICQodGhpcyksXG4gICAgICAgIHRvcEVkZ2UgPSAkdGhpcy5vZmZzZXQoKS50b3AgLSAkKHdpbmRvdykuaGVpZ2h0KCksXG4gICAgICAgIGJvdHRvbUVkZ2UgPSB0b3BFZGdlICsgJHRoaXMuaGVpZ2h0KCksXG4gICAgICAgIHdTY3JvbGwgPSAkKHdpbmRvdykuc2Nyb2xsVG9wKCk7XG5cbiAgICAgIGlmICh0b3BFZGdlIDwgd1Njcm9sbCAmJiBib3R0b21FZGdlID4gd1Njcm9sbCkge1xuICAgICAgICB2YXJcbiAgICAgICAgICBjdXJyZW50SWQgPSAkdGhpcy5kYXRhKCdhcnRpY2xlJyksXG4gICAgICAgICAgcmVxTGluayA9ICQoJy5qcy1zaG93LWFydGljbGUnKS5yZW1vdmVDbGFzcygnYWN0aXZlJykuZmlsdGVyKCdbaHJlZj1cIiMnICsgY3VycmVudElkICsgJ1wiXScpO1xuXG4gICAgICAgIHJlcUxpbmsuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICB3aW5kb3cubG9jYXRpb24uaGFzaCA9IGN1cnJlbnRJZDtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHNob3dBcnRpY2xlKGFydGljbGUsIGlzQW5pbWF0ZSkge1xuICAgIHZhclxuICAgICAgZGlyZWN0aW9uID0gYXJ0aWNsZS5yZXBsYWNlKC8jLywgJycpLFxuICAgICAgcmVxQXJ0aWNsZSA9ICQoJy5ibG9nLWFydGljbGUnKS5maWx0ZXIoJ1tkYXRhLWFydGljbGU9XCInICsgZGlyZWN0aW9uICsgJ1wiXScpLFxuICAgICAgcmVxQXJ0aWNsZVBvcyA9IHJlcUFydGljbGUub2Zmc2V0KCkudG9wO1xuXG4gICAgaWYgKGlzQW5pbWF0ZSkge1xuICAgICAgJCgnYm9keSwgaHRtbCcpLmFuaW1hdGUoe1xuICAgICAgICBzY3JvbGxUb3A6IHJlcUFydGljbGVQb3NcbiAgICAgIH0sIDUwMCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICQoJ2JvZHksIGh0bWwnKS5zY3JvbGxUb3AocmVxQXJ0aWNsZVBvcyk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gc2lkZWJhckluaXQoKSB7XG4gICAgdmFyXG4gICAgICBzaWRlYmFyID0gJCgnLnNpZGViYXJfX25hdicpLFxuICAgICAgaGVhZGVyID0gJCgnLmhlYWRlcicpLFxuICAgICAgc3RhcnRQb3MgPSBoZWFkZXIub2Zmc2V0KCkudG9wICsgaGVhZGVyLmhlaWdodCgpLFxuICAgICAgd1Njcm9sbCA9ICQod2luZG93KS5zY3JvbGxUb3AoKSxcbiAgICAgIHNpZGViYXJQb3NpdGlvbiA9IHtcbiAgICAgICAgdG9wOiBzaWRlYmFyLm9mZnNldCgpLnRvcCAtICQoJy5ibG9nX19zaWRlYmFyJykub2Zmc2V0KCkudG9wLFxuICAgICAgICBsZWZ0OiBzaWRlYmFyLm9mZnNldCgpLmxlZnRcbiAgICAgIH07XG5cbiAgICBpZiAod1Njcm9sbCA+IHN0YXJ0UG9zICYmICQod2luZG93KS53aWR0aCgpID4gMTIwMCAmJiAhcGluLmlzUGlubmVkKHNpZGViYXIpKSB7XG4gICAgICBwaW4ucGluKHNpZGViYXIsIHNpZGViYXJQb3NpdGlvbik7XG4gICAgfSBlbHNlIGlmICgod1Njcm9sbCA8IHN0YXJ0UG9zIHx8ICQod2luZG93KS53aWR0aCgpIDwgMTIwMCkgJiYgcGluLmlzUGlubmVkKHNpZGViYXIpKSB7XG4gICAgICBwaW4udW5waW4oc2lkZWJhcik7XG4gICAgfVxuICB9XG5cbiAgJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCkge1xuICAgIHNpZGViYXJJbml0KCk7XG5cbiAgICBpZiAod2luZG93LmxvY2F0aW9uLmhhc2gpXG4gICAgICBzaG93QXJ0aWNsZSh3aW5kb3cubG9jYXRpb24uaGFzaCwgZmFsc2UpO1xuXG4gICAgJCgnLnNpZGViYXJfX2xpbmsnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICBzaG93QXJ0aWNsZSgkKHRoaXMpLmF0dHIoJ2hyZWYnKSwgdHJ1ZSk7XG4gICAgfSk7XG4gIH0pO1xuXG4gICQod2luZG93KS5zY3JvbGwoZnVuY3Rpb24gKCkge1xuICAgIHNpZGViYXJJbml0KCk7XG5cbiAgICBjaGVja0FydGljbGUoJy5qcy1hcnRpY2xlJyk7XG4gIH0pO1xuXG4gICQod2luZG93KS5yZXNpemUoZnVuY3Rpb24gKCkge1xuICAgIHNpZGViYXJJbml0KCk7XG4gIH0pO1xufTsiLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKCkge1xuICB2YXJcbiAgICBib2R5ID0gJCgnYm9keScpLFxuICAgIHNpZGViYXIgPSAkKCcjanMtc2lkZWJhci1jb250YWluZXInKSxcbiAgICB0b3VjaFN0YXJ0WCA9IDAsXG4gICAgdG91Y2hFbmRYID0gMCxcbiAgICB0aHJlc2hvbGQgPSAxMDA7XG5cbiAgYm9keS5vbigndG91Y2hzdGFydCcsIGZ1bmN0aW9uIChldmVudCkge1xuICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA+PSAxMjAwKVxuICAgICAgcmV0dXJuO1xuXG4gICAgdmFyIHRvdWNoID0gZXZlbnQub3JpZ2luYWxFdmVudC50b3VjaGVzWzBdIHx8IGV2ZW50Lm9yaWdpbmFsRXZlbnQuY2hhbmdlZFRvdWNoZXNbMF07XG5cbiAgICB0b3VjaFN0YXJ0WCA9IHRvdWNoLnBhZ2VYO1xuICB9KTtcblxuICBib2R5Lm9uKCd0b3VjaGVuZCcsIGZ1bmN0aW9uIChldmVudCkge1xuICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA+PSAxMjAwKVxuICAgICAgcmV0dXJuO1xuXG4gICAgdmFyIHRvdWNoID0gZXZlbnQub3JpZ2luYWxFdmVudC50b3VjaGVzWzBdIHx8IGV2ZW50Lm9yaWdpbmFsRXZlbnQuY2hhbmdlZFRvdWNoZXNbMF07XG5cbiAgICB0b3VjaEVuZFggPSB0b3VjaC5wYWdlWDtcblxuICAgIGlmICh0b3VjaEVuZFggLSB0b3VjaFN0YXJ0WCA+IHRocmVzaG9sZCAmJiAhc2lkZWJhci5oYXNDbGFzcygnc2lkZWJhcl9vcGVuJykpXG4gICAgICBzaWRlYmFyLmFkZENsYXNzKCdzaWRlYmFyX29wZW4nKTtcbiAgICBlbHNlIGlmICh0b3VjaEVuZFggLSB0b3VjaFN0YXJ0WCA8IC10aHJlc2hvbGQgJiYgc2lkZWJhci5oYXNDbGFzcygnc2lkZWJhcl9vcGVuJykpXG4gICAgICBzaWRlYmFyLnJlbW92ZUNsYXNzKCdzaWRlYmFyX29wZW4nKTtcbiAgfSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChlbGVtZW50LCB0YXJnZXQsIGNhbGxiYWNrKSB7XG4gIGVsZW1lbnQgPSBlbGVtZW50IGluc3RhbmNlb2YgalF1ZXJ5ID8gZWxlbWVudCA6ICQoZWxlbWVudCk7XG5cbiAgdmFyIGVsZW1lbnRIZWlnaHQgPSBlbGVtZW50LmhlaWdodCgpO1xuXG4gIGVsZW1lbnQuY3NzKCdtYXJnaW4tdG9wJywgJy0nICsgZWxlbWVudEhlaWdodCArICdweCcpO1xuXG4gIGlmICh0YXJnZXQpIHtcbiAgICB0YXJnZXQgPSB0YXJnZXQgaW5zdGFuY2VvZiBqUXVlcnkgPyB0YXJnZXQgOiAkKHRhcmdldCk7XG4gICAgdGFyZ2V0LmNzcygncGFkZGluZy1ib3R0b20nLCBlbGVtZW50SGVpZ2h0ICsgJ3B4Jyk7XG4gIH1cblxuICBpZiAoY2FsbGJhY2spXG4gICAgY2FsbGJhY2soZWxlbWVudEhlaWdodCk7XG59OyIsIid1c2Ugc3RyaWN0JztcblxudmFyIHNsaWRlSXQgPSByZXF1aXJlKCcuL3NsaWRlLWl0Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKCkge1xuICB2YXJcbiAgICBoZWFkZXJIZWlnaHQgPSAkKCcuanMtaGVhZGVyJykuaGVpZ2h0KCksXG4gICAgYmcgPSAkKCcuanMtaGVhZGVyX19iZycpLFxuICAgIGF1dGhvciA9ICQoJy5qcy1oZWFkZXJfX2F1dGhvcicpLFxuICAgIHRleHQgPSAkKCcuanMtaGVhZGVyX190ZXh0Jyk7XG5cbiAgZnVuY3Rpb24gcGFyYWxsYXgoKSB7XG4gICAgdmFyXG4gICAgICB3U2Nyb2xsID0gJCh3aW5kb3cpLnNjcm9sbFRvcCgpO1xuXG4gICAgLy8g0J3QtdC80L3QvtCz0L4g0L7Qs9GA0LDQvdC40YfQuNC8INC/0LDRgNCw0LvQu9Cw0LrRgVxuICAgIGlmICh3U2Nyb2xsIDwgaGVhZGVySGVpZ2h0KSB7XG4gICAgICBzbGlkZUl0KGJnLCAtd1Njcm9sbCAvIDEyMCk7XG4gICAgICBzbGlkZUl0KHRleHQsIC13U2Nyb2xsIC8gNyk7XG4gICAgICBzbGlkZUl0KGF1dGhvciwgd1Njcm9sbCAvIDQpO1xuICAgIH1cbiAgfVxuXG5cbiAgJCh3aW5kb3cpLnNjcm9sbChwYXJhbGxheCk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyXG4gICAgbWVudSA9ICQoJyNqcy1tZW51JyksXG4gICAgaXRlbXMgPSBtZW51LmZpbmQoJy5tZW51X19pdGVtJyk7XG5cbiAgJCgnI2pzLW1lbnUtY2hlY2tib3gnKS5jaGFuZ2UoZnVuY3Rpb24gKCkge1xuICAgIGlmICghbWVudS5oYXNDbGFzcygnbWVudV9vcGVuZWQnKSkge1xuICAgICAgdmFyIGRlbGF5ID0gMC4zNTtcbiAgICAgIG1lbnUuYWRkQ2xhc3MoJ21lbnVfb3BlbmVkJyk7XG5cbiAgICAgIGl0ZW1zLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICBkZWxheSA9IGRlbGF5ICsgMC4xO1xuICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdib3VuY2VJbicpLmNzcygnYW5pbWF0aW9uLWRlbGF5JywgZGVsYXkgKyAncycpO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGl0ZW1zLnJlbW92ZUNsYXNzKCdib3VuY2VJbicpO1xuICAgICAgbWVudS5yZW1vdmVDbGFzcygnbWVudV9vcGVuZWQnKTtcbiAgICB9XG4gIH0pO1xufTsiLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBwaW46IGZ1bmN0aW9uIChlbGVtZW50LCBwb3NpdGlvbikge1xuICAgIGVsZW1lbnQgPSBlbGVtZW50IGluc3RhbmNlb2YgalF1ZXJ5ID8gZWxlbWVudCA6ICQoZWxlbWVudCk7XG4gICAgcG9zaXRpb24gPSBwb3NpdGlvbiA/IHBvc2l0aW9uIDogZWxlbWVudC5vZmZzZXQoKTtcblxuICAgIGVsZW1lbnQuYWRkQ2xhc3MoJ3Bpbm5lZCcpLmNzcyh7XG4gICAgICBwb3NpdGlvbjogJ2ZpeGVkJyxcbiAgICAgIHRvcDogcG9zaXRpb24udG9wICsgJ3B4JyxcbiAgICAgIGxlZnQ6IHBvc2l0aW9uLmxlZnQgKyAncHgnXG4gICAgfSk7XG4gIH0sXG4gIHVucGluOiBmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgIGVsZW1lbnQgPSBlbGVtZW50IGluc3RhbmNlb2YgalF1ZXJ5ID8gZWxlbWVudCA6ICQoZWxlbWVudCk7XG5cbiAgICBlbGVtZW50LnJlbW92ZUNsYXNzKCdwaW5uZWQnKS5jc3Moe1xuICAgICAgcG9zaXRpb246ICcnLFxuICAgICAgdG9wOiAnJyxcbiAgICAgIHJpZ2h0OiAnJyxcbiAgICAgIGJvdHRvbTogJycsXG4gICAgICBsZWZ0OiAnJ1xuICAgIH0pO1xuICB9LFxuICBpc1Bpbm5lZDogZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICBlbGVtZW50ID0gZWxlbWVudCBpbnN0YW5jZW9mIGpRdWVyeSA/IGVsZW1lbnQgOiAkKGVsZW1lbnQpO1xuXG4gICAgcmV0dXJuIGVsZW1lbnQuaGFzQ2xhc3MoJ3Bpbm5lZCcpO1xuICB9XG59OyIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIGdldEltYWdlc1BhdGhzKCkge1xuICAgIHZhciBpbWFnZXMgPSBbXTtcblxuICAgICQoJyonKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhclxuICAgICAgICAkdGhpcyA9ICQodGhpcyksXG4gICAgICAgIGltZyA9ICR0aGlzLmlzKCdpbWcnKSxcbiAgICAgICAgcGF0aDtcblxuICAgICAgaWYgKGltZykge1xuICAgICAgICBwYXRoID0gJHRoaXMuYXR0cignc3JjJyk7XG5cbiAgICAgICAgaWYgKHBhdGgpXG4gICAgICAgICAgaW1hZ2VzLnB1c2gocGF0aCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgYmFja2dyb3VuZCA9ICR0aGlzLmNzcygnYmFja2dyb3VuZC1pbWFnZScpO1xuXG4gICAgICAgIGlmIChiYWNrZ3JvdW5kICE9ICdub25lJykge1xuICAgICAgICAgIHBhdGggPSAvdXJsXFwoLio/XFwpL2lnLnRlc3QoYmFja2dyb3VuZCkgJiYgYmFja2dyb3VuZC5yZXBsYWNlKCd1cmwoXCInLCAnJykucmVwbGFjZSgnXCIpJywgJycpO1xuXG4gICAgICAgICAgaWYgKHBhdGgpXG4gICAgICAgICAgICBpbWFnZXMucHVzaChwYXRoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIGltYWdlcztcbiAgfVxuXG4gICQoZnVuY3Rpb24gKCkge1xuICAgIHZhclxuICAgICAgaW1hZ2VzID0gZ2V0SW1hZ2VzUGF0aHMoKSxcbiAgICAgIHRvdGFsID0gaW1hZ2VzLmxlbmd0aCxcbiAgICAgIGN1cnJlbnQgPSAwO1xuXG4gICAgZnVuY3Rpb24gdXBkYXRlUHJvZ3Jlc3MoKSB7XG4gICAgICBjdXJyZW50ICs9IDE7XG5cbiAgICAgICQoJyNqcy1wcmVsb2FkZXItcHJvZ3Jlc3MnKS50ZXh0KE1hdGguY2VpbChjdXJyZW50ICogMTAwIC8gdG90YWwpKTtcbiAgICB9XG5cbiAgICBpbWFnZXMubWFwKGZ1bmN0aW9uIChwYXRoKSB7XG4gICAgICAkKCc8aW1nPicsIHtcbiAgICAgICAgYXR0cjoge1xuICAgICAgICAgIHNyYzogcGF0aFxuICAgICAgICB9XG4gICAgICB9KS5sb2FkKHVwZGF0ZVByb2dyZXNzKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgJCh3aW5kb3cpLmxvYWQoZnVuY3Rpb24gKCkge1xuICAgICQoJyNqcy1wcmVsb2FkZXInKS5mYWRlT3V0KCk7XG4gIH0pO1xufTsiLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGVsZW1lbnRzLCBkdXJhdGlvbikge1xuICBlbGVtZW50cyA9IGVsZW1lbnRzIGluc3RhbmNlb2YgalF1ZXJ5ID8gZWxlbWVudHMgOiAkKGVsZW1lbnRzKTtcblxuICAkKGZ1bmN0aW9uICgpIHtcbiAgICBlbGVtZW50cy5jbGljayhmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgIHZhclxuICAgICAgICB0YXJnZXRQb3MgPSAkKCQodGhpcykuYXR0cignaHJlZicpKS5vZmZzZXQoKS50b3A7XG5cbiAgICAgICQoJ2JvZHksIGh0bWwnKS5hbmltYXRlKHtcbiAgICAgICAgc2Nyb2xsVG9wOiB0YXJnZXRQb3NcbiAgICAgIH0sIGR1cmF0aW9uKTtcbiAgICB9KTtcbiAgfSk7XG59OyIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoYmxvY2ssIHBhcmFsbGF4QW1vdW50KSB7XG4gIHZhclxuICAgIHBhcmFsbGF4ID0gLXBhcmFsbGF4QW1vdW50ICsgJyUnLFxuICAgIHRyYW5zZm9ybVN0cmluZyA9ICd0cmFuc2xhdGUzZCgwLCcgKyBwYXJhbGxheCArICcsMCknO1xuXG4gIGJsb2NrLmNzcygndHJhbnNmb3JtJywgdHJhbnNmb3JtU3RyaW5nKTtcbn07IiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gdmFsaWRhdGUoZm9ybSkge1xuICAgIHZhclxuICAgICAgaW5wdXRzID0gZm9ybS5maW5kKCdpbnB1dCwgdGV4dGFyZWEnKSxcbiAgICAgIGVtcHR5ID0gZmFsc2UsXG4gICAgICBlbWFpbEVycm9yID0gZmFsc2U7XG5cbiAgICBpbnB1dHMuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICB2YXJcbiAgICAgICAgJHRoaXMgPSAkKHRoaXMpLFxuICAgICAgICB2YWx1ZSA9ICR0aGlzLnZhbCgpO1xuXG4gICAgICBpZiAodmFsdWUgPT09ICcnKSB7XG4gICAgICAgIGVtcHR5ID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAoJHRoaXMuYXR0cigndHlwZScpID09PSAnZW1haWwnKSB7XG4gICAgICAgIHZhciByZSA9IC9eKChbXjw+KClcXFtcXF1cXC4sOzpcXHNAXFxcIl0rKFxcLltePD4oKVxcW1xcXVxcLiw7Olxcc0BcXFwiXSspKil8KFxcXCIuK1xcXCIpKUAoKFtePD4oKVtcXF1cXC4sOzpcXHNAXFxcIl0rXFwuKStbXjw+KClbXFxdXFwuLDs6XFxzQFxcXCJdezIsfSkkL2k7XG4gICAgICAgIGVtYWlsRXJyb3IgPSAhcmUudGVzdCh2YWx1ZSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBpZiAoZW1wdHkpIHtcbiAgICAgICQuZmFuY3lib3goJzxoMT7QktGLINC30LDQv9C+0LvQvdC40LvQuCDQvdC1INCy0YHQtSDQv9C+0LvRjyDRhNC+0YDQvNGLITwvaDE+Jyk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKGVtYWlsRXJyb3IpIHtcbiAgICAgICQuZmFuY3lib3goJzxoMT7QktCy0LXQtNC40YLQtSDQutC+0YDRgNC10LrRgtC90YvQuSBlbWFpbCE8L2gxPicpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgJCgnZm9ybSBpbnB1dFt0eXBlPXN1Ym1pdF0nKS5jbGljayhmdW5jdGlvbiAoZSkge1xuICAgIHZhciBmb3JtID0gJCh0aGlzKS5jbG9zZXN0KCdmb3JtJyk7XG5cbiAgICByZXR1cm4gdmFsaWRhdGUoZm9ybSk7XG4gIH0pO1xufTsiLCIndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIGF1dGgoKSB7XG4gIHZhciBmb3JtID0gJCgnLmpzLWF1dGhmb3JtJyk7XG5cbiAgZm9ybS5zdWJtaXQoZnVuY3Rpb24gKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICB2YXIgJHRoaXMgPSAkKHRoaXMpO1xuICAgIHZhciBkYXRhID0ge1xuICAgICAgbG9naW46ICR0aGlzLmZpbmQoJ2lucHV0W25hbWU9XCJsb2dpblwiXScpLnZhbCgpLFxuICAgICAgcGFzc3dvcmQ6ICR0aGlzLmZpbmQoJ2lucHV0W25hbWU9XCJwYXNzd29yZFwiXScpLnZhbCgpLFxuICAgICAgaXNodW1hbjogJHRoaXMuZmluZCgnaW5wdXRbbmFtZT1cImlzaHVtYW5cIl06Y2hlY2tlZCcpLnZhbCgpLFxuICAgICAgbm9yb2JvdDogJHRoaXMuZmluZCgnaW5wdXRbbmFtZT1cIm5vcm9ib3RcIl06Y2hlY2tlZCcpLnZhbCgpXG4gICAgfTtcblxuICAgICQuYWpheCh7XG4gICAgICB1cmw6ICcvbG9naW4nLFxuICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoZGF0YSksXG4gICAgICB0eXBlOiAnUE9TVCcsXG4gICAgICBjb250ZW50VHlwZTogJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgfSkudGhlbihmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICBzd2l0Y2ggKGRhdGEuc3RhdHVzKSB7XG4gICAgICAgIGNhc2UgJ3N1Y2Nlc3MnOlxuICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5hc3NpZ24oZGF0YS5yZWRpcmVjdCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ2Vycm9yJzpcbiAgICAgICAgICAkLmZhbmN5Ym94KCc8aDE+JyArIGRhdGEubWVzc2FnZSArICc8L2gxPicpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH0sIGZ1bmN0aW9uICgpIHtcbiAgICAgICQuZmFuY3lib3goJzxoMT5FcnJvciB3aXRoIHNlcnZlciBjb25uZWN0aW9uPC9oMT4nKTtcbiAgICB9KTtcbiAgfSlcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBhdXRoOyIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoKSB7XG4gIHZhclxuICAgIGZsaXBwZXIgPSAkKCcjanMtZmxpcHBlcicpLFxuICAgIGF1dGhvcml6YXRpb25CdXR0b24gPSAkKCcjanMtYXV0aG9yaXpldGlvbi1idXR0b24nKTtcblxuICBmdW5jdGlvbiBpc0F1dGgoKSB7XG4gICAgcmV0dXJuIGxvY2F0aW9uLmhhc2gucmVwbGFjZSgvXiMvLCAnJykgPT09ICdhdXRoJztcbiAgfVxuXG4gIGZ1bmN0aW9uIGZsaXAoKSB7XG4gICAgaWYgKGlzQXV0aCgpICYmICFmbGlwcGVyLmhhc0NsYXNzKCd3ZWxjb21lX19mbGlwX2ZsaXBwZWQnKSkge1xuICAgICAgZmxpcHBlci5hZGRDbGFzcygnd2VsY29tZV9fZmxpcF9mbGlwcGVkJyk7XG4gICAgICBhdXRob3JpemF0aW9uQnV0dG9uLmZhZGVPdXQoNjAwKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZmxpcHBlci5yZW1vdmVDbGFzcygnd2VsY29tZV9fZmxpcF9mbGlwcGVkJyk7XG4gICAgICBhdXRob3JpemF0aW9uQnV0dG9uLmZhZGVJbig2MDApO1xuICAgIH1cbiAgfVxuXG4gICQod2luZG93KS5vbignaGFzaGNoYW5nZScsIGZsaXApO1xuICAkKGZsaXApO1xufTsiLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGZpeCkge1xuICB2YXJcbiAgICBiZyA9ICQoJy5qcy1ibHVyLWJnJyksXG4gICAgYmx1ciA9ICQoJy5qcy1ibHVyJykuY3NzKHtcbiAgICAgIHRvcDogMCxcbiAgICAgIGxlZnQ6IDBcbiAgICB9KSxcbiAgICBiZ09mZnNldCA9IGJnLm9mZnNldCgpLFxuICAgIGJsdXJPZmZzZXQgPSBibHVyLm9mZnNldCgpO1xuXG4gIGZpeCA9IGZpeCB8fCAwO1xuXG4gIGJsdXIuY3NzKHtcbiAgICB3aWR0aDogYmcud2lkdGgoKSxcbiAgICBoZWlnaHQ6IGJnLmhlaWdodCgpLFxuICAgIHRvcDogYmdPZmZzZXQudG9wIC0gYmx1ck9mZnNldC50b3AgKyBmaXgsXG4gICAgbGVmdDogYmdPZmZzZXQubGVmdCAtIGJsdXJPZmZzZXQubGVmdFxuICB9KTtcbn07IiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgpIHtcbiAgLy9ub2luc3BlY3Rpb24gSlNEdXBsaWNhdGVkRGVjbGFyYXRpb25cbiAgdmFyXG4gICAgc2xpZGVyID0gJCgnLmpzLXNsaWRlcicpLFxuICAvLyDQmNC90YTQsFxuICAgIGltYWdlID0gc2xpZGVyLmZpbmQoJy5qcy1zbGlkZXJfX3NsaWRlLWltYWdlJyksXG4gICAgbmFtZSA9IHNsaWRlci5maW5kKCcuanMtc2xpZGVyX19zbGlkZS1uYW1lJyksXG4gICAgZGVzY3JpcHRpb24gPSBzbGlkZXIuZmluZCgnLmpzLXNsaWRlcl9fc2xpZGUtZGVzY3JpcHRpb24nKSxcbiAgICBsaW5rID0gc2xpZGVyLmZpbmQoJy5qcy1zbGlkZXJfX3NsaWRlLWxpbmsnKSxcbiAgLy8g0JrQvdC+0L/QutC4XG4gICAgcHJldkJ1dHRvbiA9IHNsaWRlci5maW5kKCcuanMtc2xpZGVyX19wcmV2JyksXG4gICAgcHJldkJ1dHRvbkltYWdlQ3VycmVudCA9IHByZXZCdXR0b24uZmluZCgnLmpzLXNsaWRlcl9fY29udHJvbC1pbWFnZV9jdXJyZW50JyksXG4gICAgcHJldkJ1dHRvbkltYWdlTmV4dCA9IHByZXZCdXR0b24uZmluZCgnLmpzLXNsaWRlcl9fY29udHJvbC1pbWFnZV9uZXh0JyksXG4gICAgbmV4dEJ1dHRvbiA9IHNsaWRlci5maW5kKCcuanMtc2xpZGVyX19uZXh0JyksXG4gICAgbmV4dEJ1dHRvbkltYWdlQ3VycmVudCA9IG5leHRCdXR0b24uZmluZCgnLmpzLXNsaWRlcl9fY29udHJvbC1pbWFnZV9jdXJyZW50JyksXG4gICAgbmV4dEJ1dHRvbkltYWdlTmV4dCA9IG5leHRCdXR0b24uZmluZCgnLmpzLXNsaWRlcl9fY29udHJvbC1pbWFnZV9uZXh0JyksXG4gIC8vINCh0LvQsNC50LTRi1xuICAgIGl0ZW1zID0gc2xpZGVyLmZpbmQoJy5qcy1zbGlkZXJfX2l0ZW0nKSxcbiAgICBjdXJyZW50ID0gMCxcbiAgICBjdXJyZW50U2xpZGVJdGVtLFxuICAgIHByZXZTbGlkZUl0ZW0sXG4gICAgbmV4dFNsaWRlSXRlbTtcblxuICBmdW5jdGlvbiB2YWxpZGF0ZShudW0pIHtcbiAgICB2YXIgcmVzdWx0O1xuXG4gICAgaWYgKG51bSA8IDApXG4gICAgICByZXN1bHQgPSBpdGVtcy5sZW5ndGggLSAxO1xuICAgIGVsc2UgaWYgKG51bSA+IGl0ZW1zLmxlbmd0aCAtIDEpXG4gICAgICByZXN1bHQgPSAwO1xuICAgIGVsc2VcbiAgICAgIHJlc3VsdCA9IG51bTtcblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBmdW5jdGlvbiBjYWxjU2xpZGVzKCkge1xuICAgIHZhclxuICAgICAgcHJldiA9IHZhbGlkYXRlKGN1cnJlbnQgLSAxKSxcbiAgICAgIG5leHQgPSB2YWxpZGF0ZShjdXJyZW50ICsgMSk7XG5cbiAgICBjdXJyZW50U2xpZGVJdGVtID0gaXRlbXMuZXEoY3VycmVudCk7XG4gICAgcHJldlNsaWRlSXRlbSA9IGl0ZW1zLmVxKHByZXYpO1xuICAgIG5leHRTbGlkZUl0ZW0gPSBpdGVtcy5lcShuZXh0KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgY2FsY1NsaWRlcygpO1xuXG4gICAgY2hhbmdlU2xpZGUoKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNoYW5nZUJhY2tncm91bmQoZWxlbSwgYmFja2dyb3VuZCkge1xuICAgIGVsZW0uY3NzKCdiYWNrZ3JvdW5kLWltYWdlJywgJ3VybChcIicgKyBiYWNrZ3JvdW5kICsgJ1wiKScpO1xuXG4gICAgcmV0dXJuIGVsZW07XG4gIH1cblxuICBmdW5jdGlvbiBjaGFuZ2VTbGlkZUNvbnRyb2wobmV4dCwgY3VycmVudCwgYmFja2dyb3VuZCwgZGlyZWN0aW9uKSB7XG4gICAgaWYgKGRpcmVjdGlvbikge1xuICAgICAgbmV4dC5jc3MoJ3RvcCcsICcxMDAlJylcbiAgICB9XG5cbiAgICBjaGFuZ2VCYWNrZ3JvdW5kKG5leHQsIGJhY2tncm91bmQpLmFuaW1hdGUoe1xuICAgICAgdG9wOiAnMCUnXG4gICAgfSwgZnVuY3Rpb24gKCkge1xuICAgICAgJCh0aGlzKS5jc3MoJ3RvcCcsIGRpcmVjdGlvbiA/ICcxMDAlJyA6ICctMTAwJScpO1xuICAgIH0pO1xuXG4gICAgY3VycmVudC5hbmltYXRlKHtcbiAgICAgIHRvcDogZGlyZWN0aW9uID8gJy0xMDAlJyA6ICcxMDAlJ1xuICAgIH0sIGZ1bmN0aW9uICgpIHtcbiAgICAgIGNoYW5nZUJhY2tncm91bmQoJCh0aGlzKSwgYmFja2dyb3VuZCkuY3NzKCd0b3AnLCAnMCcpO1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gdGV4dENoYW5nZShlbGVtLCB0ZXh0LCBhbmltYXRpb25OYW1lKSB7XG4gICAgdGV4dCA9ICcnICsgdGV4dDtcbiAgICB2YXIgbGV0dGVycyA9IHRleHQuc3BsaXQoJycpO1xuICAgIHZhciBzdHIgPSAnPHNwYW4gc3R5bGU9XCJkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XCI+JztcbiAgICB2YXIgYW5pbWF0aW9uRGVsYXkgPSAwO1xuXG4gICAgbGV0dGVycy5mb3JFYWNoKGZ1bmN0aW9uIChsZXR0ZXIsIGlkKSB7XG4gICAgICBhbmltYXRpb25EZWxheSsrO1xuXG4gICAgICBpZiAobGV0dGVyID09PSAnICcpIHtcbiAgICAgICAgc3RyICs9ICcmbmJzcDs8L3NwYW4+PHNwYW4gc3R5bGU9XCJkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XCI+JztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHN0ciArPSAnPHNwYW4gaWQ9XCJsZXR0ZXItJyArIGlkICsgJ1wiIGNsYXNzPVwiJyArIGFuaW1hdGlvbk5hbWVcbiAgICAgICAgICArICdcIiBzdHlsZT1cImRpc3BsYXk6IGlubGluZS1ibG9jazsgYW5pbWF0aW9uLWRlbGF5OidcbiAgICAgICAgICArIGFuaW1hdGlvbkRlbGF5IC8gMjBcbiAgICAgICAgICArICdzXCI+J1xuICAgICAgICAgICsgbGV0dGVyXG4gICAgICAgICAgKyAnPC9zcGFuPic7XG4gICAgICB9XG5cbiAgICB9KTtcbiAgICBzdHIgKz0gJzwvc3Bhbj4nO1xuICAgIGVsZW0uaHRtbChzdHIpO1xuICB9XG5cbiAgZnVuY3Rpb24gY2hhbmdlU2xpZGUoKSB7XG4gICAgLy8g0KHQvNC10L3QsCDQs9C70LDQstC90L7Qs9C+INC40LfQvtCx0YDQsNC20LXQvdC40Y9cbiAgICBpbWFnZS5mYWRlT3V0KDMwMCwgZnVuY3Rpb24gKCkge1xuICAgICAgY2hhbmdlQmFja2dyb3VuZCgkKHRoaXMpLCBjdXJyZW50U2xpZGVJdGVtLmRhdGEoJ2ltZycpKS5mYWRlSW4oKTtcbiAgICB9KTtcblxuICAgIC8vINCh0LzQtdC90LAg0YLQtdC60YHRgtCwXG4gICAgdGV4dENoYW5nZShuYW1lLCBjdXJyZW50U2xpZGVJdGVtLmRhdGEoJ25hbWUnKSwgJ2JvdW5jZUluJyk7XG4gICAgdGV4dENoYW5nZShkZXNjcmlwdGlvbiwgY3VycmVudFNsaWRlSXRlbS5kYXRhKCdkZXNjcmlwdGlvbicpLCAnYm91bmNlSW4nKTtcbiAgICBsaW5rLmF0dHIoJ2hyZWYnLCBjdXJyZW50U2xpZGVJdGVtLmRhdGEoJ2xpbmsnKSk7XG5cbiAgICAvLyDQodC80LXQvdCwINGB0LvQsNC50LTQvtCyINCyINC60L7QvdGC0YDQvtC70LDRhVxuICAgIGNoYW5nZVNsaWRlQ29udHJvbChwcmV2QnV0dG9uSW1hZ2VOZXh0LCBwcmV2QnV0dG9uSW1hZ2VDdXJyZW50LCBwcmV2U2xpZGVJdGVtLmRhdGEoJ2ltZycpKTtcbiAgICBjaGFuZ2VTbGlkZUNvbnRyb2wobmV4dEJ1dHRvbkltYWdlTmV4dCwgbmV4dEJ1dHRvbkltYWdlQ3VycmVudCwgbmV4dFNsaWRlSXRlbS5kYXRhKCdpbWcnKSwgdHJ1ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBuZXh0U2xpZGUoKSB7XG4gICAgY3VycmVudCA9IHZhbGlkYXRlKCsrY3VycmVudCk7XG4gICAgY2FsY1NsaWRlcygpO1xuICAgIHNsaWRlci50cmlnZ2VyKCdjaGFuZ2VTbGlkZScpO1xuICB9XG5cbiAgZnVuY3Rpb24gcHJldlNsaWRlKCkge1xuICAgIGN1cnJlbnQgPSB2YWxpZGF0ZSgtLWN1cnJlbnQpO1xuICAgIGNhbGNTbGlkZXMoKTtcbiAgICBzbGlkZXIudHJpZ2dlcignY2hhbmdlU2xpZGUnKTtcbiAgfVxuXG4gICQod2luZG93KS5sb2FkKGluaXQpO1xuICBzbGlkZXIub24oJ2NoYW5nZVNsaWRlJywgY2hhbmdlU2xpZGUpO1xuICBuZXh0QnV0dG9uLmNsaWNrKG5leHRTbGlkZSk7XG4gIHByZXZCdXR0b24uY2xpY2socHJldlNsaWRlKTtcbn07IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgc2xpZGVJdCA9IHJlcXVpcmUoJy4uL2NvbW1vbi9zbGlkZS1pdCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyXG4gICAgc3RhcnRQYXJhbGxheE9mZnNldCA9ICQoJy5qcy1wYXJhbGxheCcpLm9mZnNldCgpICxcbiAgICBsZWFmMSA9ICQoJy5qcy1sZWFmXzEnKSxcbiAgICBsZWFmMiA9ICQoJy5qcy1sZWFmXzInKSxcbiAgICBsZWFmMyA9ICQoJy5qcy1sZWFmXzMnKTtcblxuICBmdW5jdGlvbiBwYXJhbGxheCgpIHtcbiAgICB2YXIgd1Njcm9sbCA9ICQod2luZG93KS5zY3JvbGxUb3AoKSArICQod2luZG93KS5oZWlnaHQoKSAtIHN0YXJ0UGFyYWxsYXhPZmZzZXQudG9wO1xuXG4gICAgaWYgKHdTY3JvbGwgPiAwKSB7XG4gICAgICBzbGlkZUl0KGxlYWYxLCAtd1Njcm9sbCAvIDEwKTtcbiAgICAgIHNsaWRlSXQobGVhZjIsIC13U2Nyb2xsIC8gNSk7XG4gICAgICBzbGlkZUl0KGxlYWYzLCAtd1Njcm9sbCAvIDE1KTtcbiAgICB9XG4gIH1cbiAgXG4gICQod2luZG93KS5zY3JvbGwocGFyYWxsYXgpO1xufTsiXX0=
