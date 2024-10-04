// WARNING! This file contains some subset of JS that is not supported by type inference.
// You can try checking 'Transpile to ES5' checkbox if you want the types to be inferred
/**
 * @license
 For license information please see app.js.LICENSE.txt */
'use strict';
(() => {
  function t(n) {
    var resource = cache[n];
    if (void 0 !== resource) {
      return resource.exports;
    }
    var module = cache[n] = {
      exports : {}
    };
    return m[n].call(module.exports, module, module.exports, t), module.exports;
  }
  var nodes;
  var m = {
    1 : (data, linkedEntities, force) => {
      force(807);
    },
    807 : (new_result, success_expected, factory) => {
      window.$ = window.jQuery = factory(755);
      factory(2);
    },
    2 : () => {
      if ("undefined" == typeof jQuery) {
        throw new Error("Bootstrap's JavaScript requires jQuery");
      }
      !function(canCreateDiscussions) {
        var e = jQuery.fn.jquery.split(" ")[0].split(".");
        if (e[0] < 2 && e[1] < 9 || 1 == e[0] && 9 == e[1] && e[2] < 1 || e[0] > 3) {
          throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher, but lower than version 4");
        }
      }();
      (function($) {
        $.fn.emulateTransitionEnd = function(duration) {
          var n = false;
          var unloadedImgElement = this;
          $(this).one("bsTransitionEnd", function() {
            n = true;
          });
          return setTimeout(function() {
            if (!n) {
              $(unloadedImgElement).trigger($.support.transition.end);
            }
          }, duration), this;
        };
        $(function() {
          $.support.transition = function() {
            var el = document.createElement("bootstrap");
            var transEndEventNames = {
              WebkitTransition : "webkitTransitionEnd",
              MozTransition : "transitionend",
              OTransition : "oTransitionEnd otransitionend",
              transition : "transitionend"
            };
            var name;
            for (name in transEndEventNames) {
              if (void 0 !== el.style[name]) {
                return {
                  end : transEndEventNames[name]
                };
              }
            }
            return false;
          }();
          if ($.support.transition) {
            $.event.special.bsTransitionEnd = {
              bindType : $.support.transition.end,
              delegateType : $.support.transition.end,
              handle : function(event) {
                if ($(event.target).is(this)) {
                  return event.handleObj.handler.apply(this, arguments);
                }
              }
            };
          }
        });
      })(jQuery);
      (function($) {
        var e = '[data-dismiss="alert"]';
        var Alert = function(type) {
          $(type).on("click", e, this.close);
        };
        Alert.VERSION = "3.4.1";
        Alert.TRANSITION_DURATION = 150;
        Alert.prototype.close = function(e) {
          function removeElement() {
            $parent.detach().trigger("closed.bs.alert").remove();
          }
          var $this = $(this);
          var val = $this.attr("data-target");
          if (!val) {
            val = (val = $this.attr("href")) && val.replace(/.*(?=#[^\s]*$)/, "");
          }
          val = "#" === val ? [] : val;
          var $parent = $(document).find(val);
          if (e) {
            e.preventDefault();
          }
          if (!$parent.length) {
            $parent = $this.closest(".alert");
          }
          $parent.trigger(e = $.Event("close.bs.alert"));
          if (!e.isDefaultPrevented()) {
            $parent.removeClass("in");
            if ($.support.transition && $parent.hasClass("fade")) {
              $parent.one("bsTransitionEnd", removeElement).emulateTransitionEnd(Alert.TRANSITION_DURATION);
            } else {
              removeElement();
            }
          }
        };
        var old = $.fn.alert;
        $.fn.alert = function(arg) {
          return this.each(function() {
            var $this = $(this);
            var data = $this.data("bs.alert");
            if (!data) {
              $this.data("bs.alert", data = new Alert(this));
            }
            if ("string" == typeof arg) {
              data[arg].call($this);
            }
          });
        };
        $.fn.alert.Constructor = Alert;
        $.fn.alert.noConflict = function() {
          return $.fn.alert = old, this;
        };
        $(document).on("click.bs.alert.data-api", e, Alert.prototype.close);
      })(jQuery);
      (function($) {
        function Plugin(key) {
          return this.each(function() {
            var $this = $(this);
            var data = $this.data("bs.button");
            var options = "object" == typeof key && key;
            if (!data) {
              $this.data("bs.button", data = new Button(this, options));
            }
            if ("toggle" == key) {
              data.toggle();
            } else {
              if (key) {
                data.setState(key);
              }
            }
          });
        }
        var Button = function(element, options) {
          this.$element = $(element);
          this.options = $.extend({}, Button.DEFAULTS, options);
          this.isLoading = false;
        };
        Button.VERSION = "3.4.1";
        Button.DEFAULTS = {
          loadingText : "loading..."
        };
        Button.prototype.setState = function(state) {
          var d = "disabled";
          var $el = this.$element;
          var val = $el.is("input") ? "val" : "html";
          var data = $el.data();
          state = state + "Text";
          if (null == data.resetText) {
            $el.data("resetText", $el[val]());
          }
          setTimeout($.proxy(function() {
            $el[val](null == data[state] ? this.options[state] : data[state]);
            if ("loadingText" == state) {
              this.isLoading = true;
              $el.addClass(d).attr(d, d).prop(d, true);
            } else {
              if (this.isLoading) {
                this.isLoading = false;
                $el.removeClass(d).removeAttr(d).prop(d, false);
              }
            }
          }, this), 0);
        };
        Button.prototype.toggle = function() {
          var t = true;
          var el_form_group = this.$element.closest('[data-toggle="buttons"]');
          if (el_form_group.length) {
            var $input = this.$element.find("input");
            if ("radio" == $input.prop("type")) {
              if ($input.prop("checked")) {
                t = false;
              }
              el_form_group.find(".active").removeClass("active");
              this.$element.addClass("active");
            } else {
              if ("checkbox" == $input.prop("type")) {
                if ($input.prop("checked") !== this.$element.hasClass("active")) {
                  t = false;
                }
                this.$element.toggleClass("active");
              }
            }
            $input.prop("checked", this.$element.hasClass("active"));
            if (t) {
              $input.trigger("change");
            }
          } else {
            this.$element.attr("aria-pressed", !this.$element.hasClass("active"));
            this.$element.toggleClass("active");
          }
        };
        var old = $.fn.button;
        $.fn.button = Plugin;
        $.fn.button.Constructor = Button;
        $.fn.button.noConflict = function() {
          return $.fn.button = old, this;
        };
        $(document).on("click.bs.button.data-api", '[data-toggle^="button"]', function(event) {
          var $btn = $(event.target).closest(".btn");
          Plugin.call($btn, "toggle");
          if (!$(event.target).is('input[type="radio"], input[type="checkbox"]')) {
            event.preventDefault();
            if ($btn.is("input,button")) {
              $btn.trigger("focus");
            } else {
              $btn.find("input:visible,button:visible").first().trigger("focus");
            }
          }
        }).on("focus.bs.button.data-api blur.bs.button.data-api", '[data-toggle^="button"]', function(e) {
          $(e.target).closest(".btn").toggleClass("focus", /^focus(in)?$/.test(e.type));
        });
      })(jQuery);
      (function($) {
        function Plugin(options) {
          return this.each(function() {
            var $this = $(this);
            var data = $this.data("bs.carousel");
            var _config = $.extend({}, Carousel.DEFAULTS, $this.data(), "object" == typeof options && options);
            var id = "string" == typeof options ? options : _config.slide;
            if (!data) {
              $this.data("bs.carousel", data = new Carousel(this, _config));
            }
            if ("number" == typeof options) {
              data.to(options);
            } else {
              if (id) {
                data[id]();
              } else {
                if (_config.interval) {
                  data.pause().cycle();
                }
              }
            }
          });
        }
        var Carousel = function(element, options) {
          this.$element = $(element);
          this.$indicators = this.$element.find(".carousel-indicators");
          this.options = options;
          this.paused = null;
          this.sliding = null;
          this.interval = null;
          this.$active = null;
          this.$items = null;
          if (this.options.keyboard) {
            this.$element.on("keydown.bs.carousel", $.proxy(this.keydown, this));
          }
          if ("hover" == this.options.pause && !("ontouchstart" in document.documentElement)) {
            this.$element.on("mouseenter.bs.carousel", $.proxy(this.pause, this)).on("mouseleave.bs.carousel", $.proxy(this.cycle, this));
          }
        };
        Carousel.VERSION = "3.4.1";
        Carousel.TRANSITION_DURATION = 600;
        Carousel.DEFAULTS = {
          interval : 5E3,
          pause : "hover",
          wrap : true,
          keyboard : true
        };
        Carousel.prototype.keydown = function(event) {
          if (!/input|textarea/i.test(event.target.tagName)) {
            switch(event.which) {
              case 37:
                this.prev();
                break;
              case 39:
                this.next();
                break;
              default:
                return;
            }
            event.preventDefault();
          }
        };
        Carousel.prototype.cycle = function(options) {
          return options || (this.paused = false), this.interval && clearInterval(this.interval), this.options.interval && !this.paused && (this.interval = setInterval($.proxy(this.next, this), this.options.interval)), this;
        };
        Carousel.prototype.getItemIndex = function(item) {
          return this.$items = item.parent().children(".item"), this.$items.index(item || this.$active);
        };
        Carousel.prototype.getItemForDirection = function(d, active) {
          var activeIndex = this.getItemIndex(active);
          if (("prev" == d && 0 === activeIndex || "next" == d && activeIndex == this.$items.length - 1) && !this.options.wrap) {
            return active;
          }
          var index = (activeIndex + ("prev" == d ? -1 : 1)) % this.$items.length;
          return this.$items.eq(index);
        };
        Carousel.prototype.to = function(pos) {
          var e = this;
          var activeIndex = this.getItemIndex(this.$active = this.$element.find(".item.active"));
          if (!(pos > this.$items.length - 1 || pos < 0)) {
            return this.sliding ? this.$element.one("slid.bs.carousel", function() {
              e.to(pos);
            }) : activeIndex == pos ? this.pause().cycle() : this.slide(pos > activeIndex ? "next" : "prev", this.$items.eq(pos));
          }
        };
        Carousel.prototype.pause = function(promisedResponse) {
          return promisedResponse || (this.paused = true), this.$element.find(".next, .prev").length && $.support.transition && (this.$element.trigger($.support.transition.end), this.cycle(true)), this.interval = clearInterval(this.interval), this;
        };
        Carousel.prototype.next = function() {
          if (!this.sliding) {
            return this.slide("next");
          }
        };
        Carousel.prototype.prev = function() {
          if (!this.sliding) {
            return this.slide("prev");
          }
        };
        Carousel.prototype.slide = function(type, next) {
          var $active = this.$element.find(".item.active");
          var item = next || this.getItemForDirection(type, $active);
          var isCycling = this.interval;
          var direction = "next" == type ? "left" : "right";
          var that = this;
          if (item.hasClass("active")) {
            return this.sliding = false;
          }
          var target = item[0];
          var event = $.Event("slide.bs.carousel", {
            relatedTarget : target,
            direction : direction
          });
          if (this.$element.trigger(event), !event.isDefaultPrevented()) {
            if (this.sliding = true, isCycling && this.pause(), this.$indicators.length) {
              this.$indicators.find(".active").removeClass("active");
              var formsearch = $(this.$indicators.children()[this.getItemIndex(item)]);
              if (formsearch) {
                formsearch.addClass("active");
              }
            }
            var name = $.Event("slid.bs.carousel", {
              relatedTarget : target,
              direction : direction
            });
            return $.support.transition && this.$element.hasClass("slide") ? (item.addClass(type), "object" == typeof item && item.length && item[0].offsetWidth, $active.addClass(direction), item.addClass(direction), $active.one("bsTransitionEnd", function() {
              item.removeClass([type, direction].join(" ")).addClass("active");
              $active.removeClass(["active", direction].join(" "));
              that.sliding = false;
              setTimeout(function() {
                that.$element.trigger(name);
              }, 0);
            }).emulateTransitionEnd(Carousel.TRANSITION_DURATION)) : ($active.removeClass("active"), item.addClass("active"), this.sliding = false, this.$element.trigger(name)), isCycling && this.cycle(), this;
          }
        };
        var old = $.fn.carousel;
        $.fn.carousel = Plugin;
        $.fn.carousel.Constructor = Carousel;
        $.fn.carousel.noConflict = function() {
          return $.fn.carousel = old, this;
        };
        var clickHandler = function(event) {
          var $this = $(this);
          var next = $this.attr("href");
          if (next) {
            next = next.replace(/.*(?=#[^\s]+$)/, "");
          }
          var selector = $this.attr("data-target") || next;
          var $target = $(document).find(selector);
          if ($target.hasClass("carousel")) {
            var module = $.extend({}, $target.data(), $this.data());
            var slideIndex = $this.attr("data-slide-to");
            if (slideIndex) {
              module.interval = false;
            }
            Plugin.call($target, module);
            if (slideIndex) {
              $target.data("bs.carousel").to(slideIndex);
            }
            event.preventDefault();
          }
        };
        $(document).on("click.bs.carousel.data-api", "[data-slide]", clickHandler).on("click.bs.carousel.data-api", "[data-slide-to]", clickHandler);
        $(window).on("load", function() {
          $('[data-ride="carousel"]').each(function() {
            var $spy = $(this);
            Plugin.call($spy, $spy.data());
          });
        });
      })(jQuery);
      (function($) {
        function getTargetFromTrigger($trigger) {
          var href;
          var i = $trigger.attr("data-target") || (href = $trigger.attr("href")) && href.replace(/.*(?=#[^\s]+$)/, "");
          return $(document).find(i);
        }
        function Plugin(config) {
          return this.each(function() {
            var $this = $(this);
            var data = $this.data("bs.collapse");
            var options = $.extend({}, Collapse.DEFAULTS, $this.data(), "object" == typeof config && config);
            if (!data && options.toggle && /show|hide/.test(config)) {
              options.toggle = false;
            }
            if (!data) {
              $this.data("bs.collapse", data = new Collapse(this, options));
            }
            if ("string" == typeof config) {
              data[config]();
            }
          });
        }
        var Collapse = function(element, options) {
          this.$element = $(element);
          this.options = $.extend({}, Collapse.DEFAULTS, options);
          this.$trigger = $('[data-toggle="collapse"][href="#' + element.id + '"],[data-toggle="collapse"][data-target="#' + element.id + '"]');
          this.transitioning = null;
          if (this.options.parent) {
            this.$parent = this.getParent();
          } else {
            this.addAriaAndCollapsedClass(this.$element, this.$trigger);
          }
          if (this.options.toggle) {
            this.toggle();
          }
        };
        Collapse.VERSION = "3.4.1";
        Collapse.TRANSITION_DURATION = 350;
        Collapse.DEFAULTS = {
          toggle : true
        };
        Collapse.prototype.dimension = function() {
          return this.$element.hasClass("width") ? "width" : "height";
        };
        Collapse.prototype.show = function() {
          if (!this.transitioning && !this.$element.hasClass("in")) {
            var data;
            var actives = this.$parent && this.$parent.children(".panel").children(".in, .collapsing");
            if (!(actives && actives.length && (data = actives.data("bs.collapse")) && data.transitioning)) {
              var event = $.Event("show.bs.collapse");
              if (this.$element.trigger(event), !event.isDefaultPrevented()) {
                if (actives && actives.length) {
                  Plugin.call(actives, "hide");
                  if (!data) {
                    actives.data("bs.collapse", null);
                  }
                }
                var dimension = this.dimension();
                this.$element.removeClass("collapse").addClass("collapsing")[dimension](0).attr("aria-expanded", true);
                this.$trigger.removeClass("collapsed").attr("aria-expanded", true);
                this.transitioning = 1;
                var complete = function() {
                  this.$element.removeClass("collapsing").addClass("collapse in")[dimension]("");
                  this.transitioning = 0;
                  this.$element.trigger("shown.bs.collapse");
                };
                if (!$.support.transition) {
                  return complete.call(this);
                }
                var scrollSize = $.camelCase(["scroll", dimension].join("-"));
                this.$element.one("bsTransitionEnd", $.proxy(complete, this)).emulateTransitionEnd(Collapse.TRANSITION_DURATION)[dimension](this.$element[0][scrollSize]);
              }
            }
          }
        };
        Collapse.prototype.hide = function() {
          if (!this.transitioning && this.$element.hasClass("in")) {
            var event = $.Event("hide.bs.collapse");
            if (this.$element.trigger(event), !event.isDefaultPrevented()) {
              var dimension = this.dimension();
              this.$element[dimension](this.$element[dimension]())[0].offsetHeight;
              this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded", false);
              this.$trigger.addClass("collapsed").attr("aria-expanded", false);
              this.transitioning = 1;
              var complete = function() {
                this.transitioning = 0;
                this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse");
              };
              if (!$.support.transition) {
                return complete.call(this);
              }
              this.$element[dimension](0).one("bsTransitionEnd", $.proxy(complete, this)).emulateTransitionEnd(Collapse.TRANSITION_DURATION);
            }
          }
        };
        Collapse.prototype.toggle = function() {
          this[this.$element.hasClass("in") ? "hide" : "show"]();
        };
        Collapse.prototype.getParent = function() {
          return $(document).find(this.options.parent).find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]').each($.proxy(function(canCreateDiscussions, tr) {
            var $element = $(tr);
            this.addAriaAndCollapsedClass(getTargetFromTrigger($element), $element);
          }, this)).end();
        };
        Collapse.prototype.addAriaAndCollapsedClass = function($element, $trigger) {
          var isOpen = $element.hasClass("in");
          $element.attr("aria-expanded", isOpen);
          $trigger.toggleClass("collapsed", !isOpen).attr("aria-expanded", isOpen);
        };
        var old = $.fn.collapse;
        $.fn.collapse = Plugin;
        $.fn.collapse.Constructor = Collapse;
        $.fn.collapse.noConflict = function() {
          return $.fn.collapse = old, this;
        };
        $(document).on("click.bs.collapse.data-api", '[data-toggle="collapse"]', function(event) {
          var $this = $(this);
          if (!$this.attr("data-target")) {
            event.preventDefault();
          }
          var $target = getTargetFromTrigger($this);
          var option = $target.data("bs.collapse") ? "toggle" : $this.data();
          Plugin.call($target, option);
        });
      })(jQuery);
      (function($) {
        function getParent($this) {
          var val = $this.attr("data-target");
          if (!val) {
            val = (val = $this.attr("href")) && /#[A-Za-z]/.test(val) && val.replace(/.*(?=#[^\s]*$)/, "");
          }
          var shootBtnGuts = "#" !== val ? $(document).find(val) : null;
          return shootBtnGuts && shootBtnGuts.length ? shootBtnGuts : $this.parent();
        }
        function clearMenus(e) {
          if (!(e && 3 === e.which)) {
            $(".dropdown-backdrop").remove();
            $(event).each(function() {
              var $this = $(this);
              var $parent = getParent($this);
              var options = {
                relatedTarget : this
              };
              if ($parent.hasClass("open")) {
                if (!(e && "click" == e.type && /input|textarea/i.test(e.target.tagName) && $.contains($parent[0], e.target))) {
                  $parent.trigger(e = $.Event("hide.bs.dropdown", options));
                  if (!e.isDefaultPrevented()) {
                    $this.attr("aria-expanded", "false");
                    $parent.removeClass("open").trigger($.Event("hidden.bs.dropdown", options));
                  }
                }
              }
            });
          }
        }
        var event = '[data-toggle="dropdown"]';
        var Dropdown = function(element) {
          $(element).on("click.bs.dropdown", this.toggle);
        };
        Dropdown.VERSION = "3.4.1";
        Dropdown.prototype.toggle = function(e) {
          var $this = $(this);
          if (!$this.is(".disabled, :disabled")) {
            var $parent = getParent($this);
            var isActive = $parent.hasClass("open");
            if (clearMenus(), !isActive) {
              if ("ontouchstart" in document.documentElement && !$parent.closest(".navbar-nav").length) {
                $(document.createElement("div")).addClass("dropdown-backdrop").insertAfter($(this)).on("click", clearMenus);
              }
              var options = {
                relatedTarget : this
              };
              if ($parent.trigger(e = $.Event("show.bs.dropdown", options)), e.isDefaultPrevented()) {
                return;
              }
              $this.trigger("focus").attr("aria-expanded", "true");
              $parent.toggleClass("open").trigger($.Event("shown.bs.dropdown", options));
            }
            return false;
          }
        };
        Dropdown.prototype.keydown = function(e) {
          if (/(38|40|27|32)/.test(e.which) && !/input|textarea/i.test(e.target.tagName)) {
            var $this = $(this);
            if (e.preventDefault(), e.stopPropagation(), !$this.is(".disabled, :disabled")) {
              var $parent = getParent($this);
              var isActive = $parent.hasClass("open");
              if (!isActive && 27 != e.which || isActive && 27 == e.which) {
                return 27 == e.which && $parent.find(event).trigger("focus"), $this.trigger("click");
              }
              var a = $parent.find(".dropdown-menu li:not(.disabled):visible a");
              if (a.length) {
                var l = a.index(e.target);
                if (38 == e.which && l > 0) {
                  l--;
                }
                if (40 == e.which && l < a.length - 1) {
                  l++;
                }
                if (!~l) {
                  l = 0;
                }
                a.eq(l).trigger("focus");
              }
            }
          }
        };
        var old = $.fn.dropdown;
        $.fn.dropdown = function(name) {
          return this.each(function() {
            var $this = $(this);
            var data = $this.data("bs.dropdown");
            if (!data) {
              $this.data("bs.dropdown", data = new Dropdown(this));
            }
            if ("string" == typeof name) {
              data[name].call($this);
            }
          });
        };
        $.fn.dropdown.Constructor = Dropdown;
        $.fn.dropdown.noConflict = function() {
          return $.fn.dropdown = old, this;
        };
        $(document).on("click.bs.dropdown.data-api", clearMenus).on("click.bs.dropdown.data-api", ".dropdown form", function(event) {
          event.stopPropagation();
        }).on("click.bs.dropdown.data-api", event, Dropdown.prototype.toggle).on("keydown.bs.dropdown.data-api", event, Dropdown.prototype.keydown).on("keydown.bs.dropdown.data-api", ".dropdown-menu", Dropdown.prototype.keydown);
      })(jQuery);
      (function($) {
        function Plugin(options, settings) {
          return this.each(function() {
            var $this = $(this);
            var data = $this.data("bs.modal");
            var _config = $.extend({}, Modal.DEFAULTS, $this.data(), "object" == typeof options && options);
            if (!data) {
              $this.data("bs.modal", data = new Modal(this, _config));
            }
            if ("string" == typeof options) {
              data[options](settings);
            } else {
              if (_config.show) {
                data.show(settings);
              }
            }
          });
        }
        var Modal = function(element, options) {
          this.options = options;
          this.$body = $(document.body);
          this.$element = $(element);
          this.$dialog = this.$element.find(".modal-dialog");
          this.$backdrop = null;
          this.isShown = null;
          this.originalBodyPad = null;
          this.scrollbarWidth = 0;
          this.ignoreBackdropClick = false;
          this.fixedContent = ".navbar-fixed-top, .navbar-fixed-bottom";
          if (this.options.remote) {
            this.$element.find(".modal-content").load(this.options.remote, $.proxy(function() {
              this.$element.trigger("loaded.bs.modal");
            }, this));
          }
        };
        Modal.VERSION = "3.4.1";
        Modal.TRANSITION_DURATION = 300;
        Modal.BACKDROP_TRANSITION_DURATION = 150;
        Modal.DEFAULTS = {
          backdrop : true,
          keyboard : true,
          show : true
        };
        Modal.prototype.toggle = function(_relatedTarget) {
          return this.isShown ? this.hide() : this.show(_relatedTarget);
        };
        Modal.prototype.show = function(_relatedTarget) {
          var that = this;
          var event = $.Event("show.bs.modal", {
            relatedTarget : _relatedTarget
          });
          this.$element.trigger(event);
          if (!(this.isShown || event.isDefaultPrevented())) {
            this.isShown = true;
            this.checkScrollbar();
            this.setScrollbar();
            this.$body.addClass("modal-open");
            this.escape();
            this.resize();
            this.$element.on("click.dismiss.bs.modal", '[data-dismiss="modal"]', $.proxy(this.hide, this));
            this.$dialog.on("mousedown.dismiss.bs.modal", function() {
              that.$element.one("mouseup.dismiss.bs.modal", function(jEvent) {
                if ($(jEvent.target).is(that.$element)) {
                  that.ignoreBackdropClick = true;
                }
              });
            });
            this.backdrop(function() {
              var o = $.support.transition && that.$element.hasClass("fade");
              if (!that.$element.parent().length) {
                that.$element.appendTo(that.$body);
              }
              that.$element.show().scrollTop(0);
              that.adjustDialog();
              if (o) {
                that.$element[0].offsetWidth;
              }
              that.$element.addClass("in");
              that.enforceFocus();
              var r = $.Event("shown.bs.modal", {
                relatedTarget : _relatedTarget
              });
              if (o) {
                that.$dialog.one("bsTransitionEnd", function() {
                  that.$element.trigger("focus").trigger(r);
                }).emulateTransitionEnd(Modal.TRANSITION_DURATION);
              } else {
                that.$element.trigger("focus").trigger(r);
              }
            });
          }
        };
        Modal.prototype.hide = function(e) {
          if (e) {
            e.preventDefault();
          }
          e = $.Event("hide.bs.modal");
          this.$element.trigger(e);
          if (this.isShown && !e.isDefaultPrevented()) {
            this.isShown = false;
            this.escape();
            this.resize();
            $(document).off("focusin.bs.modal");
            this.$element.removeClass("in").off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal");
            this.$dialog.off("mousedown.dismiss.bs.modal");
            if ($.support.transition && this.$element.hasClass("fade")) {
              this.$element.one("bsTransitionEnd", $.proxy(this.hideModal, this)).emulateTransitionEnd(Modal.TRANSITION_DURATION);
            } else {
              this.hideModal();
            }
          }
        };
        Modal.prototype.enforceFocus = function() {
          $(document).off("focusin.bs.modal").on("focusin.bs.modal", $.proxy(function(options) {
            if (!(document === options.target || this.$element[0] === options.target || this.$element.has(options.target).length)) {
              this.$element.trigger("focus");
            }
          }, this));
        };
        Modal.prototype.escape = function() {
          if (this.isShown && this.options.keyboard) {
            this.$element.on("keydown.dismiss.bs.modal", $.proxy(function(event) {
              if (27 == event.which) {
                this.hide();
              }
            }, this));
          } else {
            if (!this.isShown) {
              this.$element.off("keydown.dismiss.bs.modal");
            }
          }
        };
        Modal.prototype.resize = function() {
          if (this.isShown) {
            $(window).on("resize.bs.modal", $.proxy(this.handleUpdate, this));
          } else {
            $(window).off("resize.bs.modal");
          }
        };
        Modal.prototype.hideModal = function() {
          var that = this;
          this.$element.hide();
          this.backdrop(function() {
            that.$body.removeClass("modal-open");
            that.resetAdjustments();
            that.resetScrollbar();
            that.$element.trigger("hidden.bs.modal");
          });
        };
        Modal.prototype.removeBackdrop = function() {
          if (this.$backdrop) {
            this.$backdrop.remove();
          }
          this.$backdrop = null;
        };
        Modal.prototype.backdrop = function(callback) {
          var that = this;
          var animate = this.$element.hasClass("fade") ? "fade" : "";
          if (this.isShown && this.options.backdrop) {
            var doAnimate = $.support.transition && animate;
            if (this.$backdrop = $(document.createElement("div")).addClass("modal-backdrop " + animate).appendTo(this.$body), this.$element.on("click.dismiss.bs.modal", $.proxy(function(event) {
              if (this.ignoreBackdropClick) {
                this.ignoreBackdropClick = false;
              } else {
                if (event.target === event.currentTarget) {
                  if ("static" == this.options.backdrop) {
                    this.$element[0].focus();
                  } else {
                    this.hide();
                  }
                }
              }
            }, this)), doAnimate && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), !callback) {
              return;
            }
            if (doAnimate) {
              this.$backdrop.one("bsTransitionEnd", callback).emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION);
            } else {
              callback();
            }
          } else {
            if (!this.isShown && this.$backdrop) {
              this.$backdrop.removeClass("in");
              var callbackRemove = function() {
                that.removeBackdrop();
                if (callback) {
                  callback();
                }
              };
              if ($.support.transition && this.$element.hasClass("fade")) {
                this.$backdrop.one("bsTransitionEnd", callbackRemove).emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION);
              } else {
                callbackRemove();
              }
            } else {
              if (callback) {
                callback();
              }
            }
          }
        };
        Modal.prototype.handleUpdate = function() {
          this.adjustDialog();
        };
        Modal.prototype.adjustDialog = function() {
          var modalIsOverflowing = this.$element[0].scrollHeight > document.documentElement.clientHeight;
          this.$element.css({
            paddingLeft : !this.bodyIsOverflowing && modalIsOverflowing ? this.scrollbarWidth : "",
            paddingRight : this.bodyIsOverflowing && !modalIsOverflowing ? this.scrollbarWidth : ""
          });
        };
        Modal.prototype.resetAdjustments = function() {
          this.$element.css({
            paddingLeft : "",
            paddingRight : ""
          });
        };
        Modal.prototype.checkScrollbar = function() {
          var fullWindowWidth = window.innerWidth;
          if (!fullWindowWidth) {
            var documentElementRect = document.documentElement.getBoundingClientRect();
            fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left);
          }
          this.bodyIsOverflowing = document.body.clientWidth < fullWindowWidth;
          this.scrollbarWidth = this.measureScrollbar();
        };
        Modal.prototype.setScrollbar = function() {
          var bodyPad = parseInt(this.$body.css("padding-right") || 0, 10);
          this.originalBodyPad = document.body.style.paddingRight || "";
          var scrollbarWidth = this.scrollbarWidth;
          if (this.bodyIsOverflowing) {
            this.$body.css("padding-right", bodyPad + scrollbarWidth);
            $(this.fixedContent).each(function(canCreateDiscussions, elem) {
              var value = elem.style.paddingRight;
              var width = $(elem).css("padding-right");
              $(elem).data("padding-right", value).css("padding-right", parseFloat(width) + scrollbarWidth + "px");
            });
          }
        };
        Modal.prototype.resetScrollbar = function() {
          this.$body.css("padding-right", this.originalBodyPad);
          $(this.fixedContent).each(function(canCreateDiscussions, elem) {
            var padding = $(elem).data("padding-right");
            $(elem).removeData("padding-right");
            elem.style.paddingRight = padding || "";
          });
        };
        Modal.prototype.measureScrollbar = function() {
          var scrollDiv = document.createElement("div");
          scrollDiv.className = "modal-scrollbar-measure";
          this.$body.append(scrollDiv);
          var e = scrollDiv.offsetWidth - scrollDiv.clientWidth;
          return this.$body[0].removeChild(scrollDiv), e;
        };
        var old = $.fn.modal;
        $.fn.modal = Plugin;
        $.fn.modal.Constructor = Modal;
        $.fn.modal.noConflict = function() {
          return $.fn.modal = old, this;
        };
        $(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function(event) {
          var $this = $(this);
          var href = $this.attr("href");
          var type = $this.attr("data-target") || href && href.replace(/.*(?=#[^\s]+$)/, "");
          var media = $(document).find(type);
          var option = media.data("bs.modal") ? "toggle" : $.extend({
            remote : !/#/.test(href) && href
          }, media.data(), $this.data());
          if ($this.is("a")) {
            event.preventDefault();
          }
          media.one("show.bs.modal", function(event) {
            if (!event.isDefaultPrevented()) {
              media.one("hidden.bs.modal", function() {
                if ($this.is(":visible")) {
                  $this.trigger("focus");
                }
              });
            }
          });
          Plugin.call(media, option, this);
        });
      })(jQuery);
      (function($) {
        function func(elem, value) {
          var input = elem.nodeName.toLowerCase();
          if (-1 !== $.inArray(input, value)) {
            return -1 === $.inArray(input, keys) || Boolean(elem.nodeValue.match(r) || elem.nodeValue.match(p));
          }
          var args = $(value).filter(function(canCreateDiscussions, cached1) {
            return cached1 instanceof RegExp;
          });
          var a = 0;
          var argsLen = args.length;
          for (; a < argsLen; a++) {
            if (input.match(args[a])) {
              return true;
            }
          }
          return false;
        }
        function parse(text, obj, fn) {
          if (0 === text.length) {
            return text;
          }
          if (fn && "function" == typeof fn) {
            return fn(text);
          }
          if (!document.implementation || !document.implementation.createHTMLDocument) {
            return text;
          }
          var o = document.implementation.createHTMLDocument("sanitization");
          o.body.innerHTML = text;
          var r = $.map(obj, function(canCreateDiscussions, nonemptyvalue) {
            return nonemptyvalue;
          });
          var existingChoices = $(o.body).find("*");
          var i = 0;
          var patchLen = existingChoices.length;
          for (; i < patchLen; i++) {
            var c = existingChoices[i];
            var f = c.nodeName.toLowerCase();
            if (-1 !== $.inArray(f, r)) {
              var parents = $.map(c.attributes, function(nonemptyvalue) {
                return nonemptyvalue;
              });
              var iteratee = [].concat(obj["*"] || [], obj[f] || []);
              var i = 0;
              var l = parents.length;
              for (; i < l; i++) {
                if (!func(parents[i], iteratee)) {
                  c.removeAttribute(parents[i].nodeName);
                }
              }
            } else {
              c.parentNode.removeChild(c);
            }
          }
          return o.body.innerHTML;
        }
        var compareTerms = ["sanitize", "whiteList", "sanitizeFn"];
        var keys = ["background", "cite", "href", "itemtype", "longdesc", "poster", "src", "xlink:href"];
        var voidElements = {
          "*" : ["class", "dir", "id", "lang", "role", /^aria-[\w-]*$/i],
          a : ["target", "href", "title", "rel"],
          area : [],
          b : [],
          br : [],
          col : [],
          code : [],
          div : [],
          em : [],
          hr : [],
          h1 : [],
          h2 : [],
          h3 : [],
          h4 : [],
          h5 : [],
          h6 : [],
          i : [],
          img : ["src", "alt", "title", "width", "height"],
          li : [],
          ol : [],
          p : [],
          pre : [],
          s : [],
          small : [],
          span : [],
          sub : [],
          sup : [],
          strong : [],
          u : [],
          ul : []
        };
        var r = /^(?:(?:https?|mailto|ftp|tel|file):|[^&:/?#]*(?:[/?#]|$))/gi;
        var p = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[a-z0-9+/]+=*$/i;
        var Tooltip = function(type, target) {
          this.type = null;
          this.options = null;
          this.enabled = null;
          this.timeout = null;
          this.hoverState = null;
          this.$element = null;
          this.inState = null;
          this.init("tooltip", type, target);
        };
        Tooltip.VERSION = "3.4.1";
        Tooltip.TRANSITION_DURATION = 150;
        Tooltip.DEFAULTS = {
          animation : true,
          placement : "top",
          selector : false,
          template : '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
          trigger : "hover focus",
          title : "",
          delay : 0,
          html : false,
          container : false,
          viewport : {
            selector : "body",
            padding : 0
          },
          sanitize : true,
          sanitizeFn : null,
          whiteList : voidElements
        };
        Tooltip.prototype.init = function(type, field, options) {
          if (this.enabled = true, this.type = type, this.$element = $(field), this.options = this.getOptions(options), this.$viewport = this.options.viewport && $(document).find($.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : this.options.viewport.selector || this.options.viewport), this.inState = {
            click : false,
            hover : false,
            focus : false
          }, this.$element[0] instanceof document.constructor && !this.options.selector) {
            throw new Error("`selector` option must be specified when initializing " + this.type + " on the window.document object!");
          }
          var sArrTypes = this.options.trigger.split(" ");
          var iTempIndex = sArrTypes.length;
          for (; iTempIndex--;) {
            var sType = sArrTypes[iTempIndex];
            if ("click" == sType) {
              this.$element.on("click." + this.type, this.options.selector, $.proxy(this.toggle, this));
            } else {
              if ("manual" != sType) {
                var eventIn = "hover" == sType ? "mouseenter" : "focusin";
                var eventOut = "hover" == sType ? "mouseleave" : "focusout";
                this.$element.on(eventIn + "." + this.type, this.options.selector, $.proxy(this.enter, this));
                this.$element.on(eventOut + "." + this.type, this.options.selector, $.proxy(this.leave, this));
              }
            }
          }
          if (this.options.selector) {
            this._options = $.extend({}, this.options, {
              trigger : "manual",
              selector : ""
            });
          } else {
            this.fixTitle();
          }
        };
        Tooltip.prototype.getDefaults = function() {
          return Tooltip.DEFAULTS;
        };
        Tooltip.prototype.getOptions = function(options) {
          var defaultOptions = this.$element.data();
          var key;
          for (key in defaultOptions) {
            if (defaultOptions.hasOwnProperty(key) && -1 !== $.inArray(key, compareTerms)) {
              delete defaultOptions[key];
            }
          }
          return (options = $.extend({}, this.getDefaults(), defaultOptions, options)).delay && "number" == typeof options.delay && (options.delay = {
            show : options.delay,
            hide : options.delay
          }), options.sanitize && (options.template = parse(options.template, options.whiteList, options.sanitizeFn)), options;
        };
        Tooltip.prototype.getDelegateOptions = function() {
          var someStoreStorage = {};
          var defaults = this.getDefaults();
          return this._options && $.each(this._options, function(key, value) {
            if (defaults[key] != value) {
              someStoreStorage[key] = value;
            }
          }), someStoreStorage;
        };
        Tooltip.prototype.enter = function(obj) {
          var self = obj instanceof this.constructor ? obj : $(obj.currentTarget).data("bs." + this.type);
          if (self || (self = new this.constructor(obj.currentTarget, this.getDelegateOptions()), $(obj.currentTarget).data("bs." + this.type, self)), obj instanceof $.Event && (self.inState["focusin" == obj.type ? "focus" : "hover"] = true), self.tip().hasClass("in") || "in" == self.hoverState) {
            self.hoverState = "in";
          } else {
            if (clearTimeout(self.timeout), self.hoverState = "in", !self.options.delay || !self.options.delay.show) {
              return self.show();
            }
            self.timeout = setTimeout(function() {
              if ("in" == self.hoverState) {
                self.show();
              }
            }, self.options.delay.show);
          }
        };
        Tooltip.prototype.isInStateTrue = function() {
          var key;
          for (key in this.inState) {
            if (this.inState[key]) {
              return true;
            }
          }
          return false;
        };
        Tooltip.prototype.leave = function(obj) {
          var self = obj instanceof this.constructor ? obj : $(obj.currentTarget).data("bs." + this.type);
          if (self || (self = new this.constructor(obj.currentTarget, this.getDelegateOptions()), $(obj.currentTarget).data("bs." + this.type, self)), obj instanceof $.Event && (self.inState["focusout" == obj.type ? "focus" : "hover"] = false), !self.isInStateTrue()) {
            if (clearTimeout(self.timeout), self.hoverState = "out", !self.options.delay || !self.options.delay.hide) {
              return self.hide();
            }
            self.timeout = setTimeout(function() {
              if ("out" == self.hoverState) {
                self.hide();
              }
            }, self.options.delay.hide);
          }
        };
        Tooltip.prototype.show = function() {
          var event = $.Event("show.bs." + this.type);
          if (this.hasContent() && this.enabled) {
            this.$element.trigger(event);
            var n = $.contains(this.$element[0].ownerDocument.documentElement, this.$element[0]);
            if (event.isDefaultPrevented() || !n) {
              return;
            }
            var self = this;
            var $tip = this.tip();
            var tipId = this.getUID(this.type);
            this.setContent();
            $tip.attr("id", tipId);
            this.$element.attr("aria-describedby", tipId);
            if (this.options.animation) {
              $tip.addClass("fade");
            }
            var placement = "function" == typeof this.options.placement ? this.options.placement.call(this, $tip[0], this.$element[0]) : this.options.placement;
            var autoToken = /\s?auto?\s?/i;
            var autoPlace = autoToken.test(placement);
            if (autoPlace) {
              placement = placement.replace(autoToken, "") || "top";
            }
            $tip.detach().css({
              top : 0,
              left : 0,
              display : "block"
            }).addClass(placement).data("bs." + this.type, this);
            if (this.options.container) {
              $tip.appendTo($(document).find(this.options.container));
            } else {
              $tip.insertAfter(this.$element);
            }
            this.$element.trigger("inserted.bs." + this.type);
            var pos = this.getPosition();
            var actualWidth = $tip[0].offsetWidth;
            var actualHeight = $tip[0].offsetHeight;
            if (autoPlace) {
              var orgPlacement = placement;
              var viewportDim = this.getPosition(this.$viewport);
              placement = "bottom" == placement && pos.bottom + actualHeight > viewportDim.bottom ? "top" : "top" == placement && pos.top - actualHeight < viewportDim.top ? "bottom" : "right" == placement && pos.right + actualWidth > viewportDim.width ? "left" : "left" == placement && pos.left - actualWidth < viewportDim.left ? "right" : placement;
              $tip.removeClass(orgPlacement).addClass(placement);
            }
            var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight);
            this.applyPlacement(calculatedOffset, placement);
            var complete = function() {
              var dir = self.hoverState;
              self.$element.trigger("shown.bs." + self.type);
              self.hoverState = null;
              if ("out" == dir) {
                self.leave(self);
              }
            };
            if ($.support.transition && this.$tip.hasClass("fade")) {
              $tip.one("bsTransitionEnd", complete).emulateTransitionEnd(Tooltip.TRANSITION_DURATION);
            } else {
              complete();
            }
          }
        };
        Tooltip.prototype.applyPlacement = function(offset, placement) {
          var $tip = this.tip();
          var width = $tip[0].offsetWidth;
          var height = $tip[0].offsetHeight;
          var marginTop = parseInt($tip.css("margin-top"), 10);
          var marginLeft = parseInt($tip.css("margin-left"), 10);
          if (isNaN(marginTop)) {
            marginTop = 0;
          }
          if (isNaN(marginLeft)) {
            marginLeft = 0;
          }
          offset.top += marginTop;
          offset.left += marginLeft;
          $.offset.setOffset($tip[0], $.extend({
            using : function(props) {
              $tip.css({
                top : Math.round(props.top),
                left : Math.round(props.left)
              });
            }
          }, offset), 0);
          $tip.addClass("in");
          var actualWidth = $tip[0].offsetWidth;
          var actualHeight = $tip[0].offsetHeight;
          if ("top" == placement && actualHeight != height) {
            offset.top = offset.top + height - actualHeight;
          }
          var delta = this.getViewportAdjustedDelta(placement, offset, actualWidth, actualHeight);
          if (delta.left) {
            offset.left += delta.left;
          } else {
            offset.top += delta.top;
          }
          var isVertical = /top|bottom/.test(placement);
          var arrowDelta = isVertical ? 2 * delta.left - width + actualWidth : 2 * delta.top - height + actualHeight;
          var arrowOffsetPosition = isVertical ? "offsetWidth" : "offsetHeight";
          $tip.offset(offset);
          this.replaceArrow(arrowDelta, $tip[0][arrowOffsetPosition], isVertical);
        };
        Tooltip.prototype.replaceArrow = function(delta, dimension, isVertical) {
          this.arrow().css(isVertical ? "left" : "top", 50 * (1 - delta / dimension) + "%").css(isVertical ? "top" : "left", "");
        };
        Tooltip.prototype.setContent = function() {
          var $tip = this.tip();
          var c = this.getTitle();
          if (this.options.html) {
            if (this.options.sanitize) {
              c = parse(c, this.options.whiteList, this.options.sanitizeFn);
            }
            $tip.find(".tooltip-inner").html(c);
          } else {
            $tip.find(".tooltip-inner").text(c);
          }
          $tip.removeClass("fade in top bottom left right");
        };
        Tooltip.prototype.hide = function(callback) {
          function complete() {
            if ("in" != self.hoverState) {
              $tip.detach();
            }
            if (self.$element) {
              self.$element.removeAttr("aria-describedby").trigger("hidden.bs." + self.type);
            }
            if (callback) {
              callback();
            }
          }
          var self = this;
          var $tip = $(this.$tip);
          var event = $.Event("hide.bs." + this.type);
          if (this.$element.trigger(event), !event.isDefaultPrevented()) {
            return $tip.removeClass("in"), $.support.transition && $tip.hasClass("fade") ? $tip.one("bsTransitionEnd", complete).emulateTransitionEnd(Tooltip.TRANSITION_DURATION) : complete(), this.hoverState = null, this;
          }
        };
        Tooltip.prototype.fixTitle = function() {
          var $e = this.$element;
          if ($e.attr("title") || "string" != typeof $e.attr("data-original-title")) {
            $e.attr("data-original-title", $e.attr("title") || "").attr("title", "");
          }
        };
        Tooltip.prototype.hasContent = function() {
          return this.getTitle();
        };
        Tooltip.prototype.getPosition = function($element) {
          var el = ($element = $element || this.$element)[0];
          var isBody = "BODY" == el.tagName;
          var elRect = el.getBoundingClientRect();
          if (null == elRect.width) {
            elRect = $.extend({}, elRect, {
              width : elRect.right - elRect.left,
              height : elRect.bottom - elRect.top
            });
          }
          var isSvg = window.SVGElement && el instanceof window.SVGElement;
          var elOffset = isBody ? {
            top : 0,
            left : 0
          } : isSvg ? null : $element.offset();
          var scroll = {
            scroll : isBody ? document.documentElement.scrollTop || document.body.scrollTop : $element.scrollTop()
          };
          var outerDims = isBody ? {
            width : $(window).width(),
            height : $(window).height()
          } : null;
          return $.extend({}, elRect, scroll, outerDims, elOffset);
        };
        Tooltip.prototype.getCalculatedOffset = function(position, pos, actualWidth, actualHeight) {
          return "bottom" == position ? {
            top : pos.top + pos.height,
            left : pos.left + pos.width / 2 - actualWidth / 2
          } : "top" == position ? {
            top : pos.top - actualHeight,
            left : pos.left + pos.width / 2 - actualWidth / 2
          } : "left" == position ? {
            top : pos.top + pos.height / 2 - actualHeight / 2,
            left : pos.left - actualWidth
          } : {
            top : pos.top + pos.height / 2 - actualHeight / 2,
            left : pos.left + pos.width
          };
        };
        Tooltip.prototype.getViewportAdjustedDelta = function(placement, pos, actualWidth, actualHeight) {
          var delta = {
            top : 0,
            left : 0
          };
          if (!this.$viewport) {
            return delta;
          }
          var viewportPadding = this.options.viewport && this.options.viewport.padding || 0;
          var viewportDimensions = this.getPosition(this.$viewport);
          if (/right|left/.test(placement)) {
            var topEdgeOffset = pos.top - viewportPadding - viewportDimensions.scroll;
            var bottomEdgeOffset = pos.top + viewportPadding - viewportDimensions.scroll + actualHeight;
            if (topEdgeOffset < viewportDimensions.top) {
              delta.top = viewportDimensions.top - topEdgeOffset;
            } else {
              if (bottomEdgeOffset > viewportDimensions.top + viewportDimensions.height) {
                delta.top = viewportDimensions.top + viewportDimensions.height - bottomEdgeOffset;
              }
            }
          } else {
            var leftEdgeOffset = pos.left - viewportPadding;
            var rightEdgeOffset = pos.left + viewportPadding + actualWidth;
            if (leftEdgeOffset < viewportDimensions.left) {
              delta.left = viewportDimensions.left - leftEdgeOffset;
            } else {
              if (rightEdgeOffset > viewportDimensions.right) {
                delta.left = viewportDimensions.left + viewportDimensions.width - rightEdgeOffset;
              }
            }
          }
          return delta;
        };
        Tooltip.prototype.getTitle = function() {
          var $e = this.$element;
          var o = this.options;
          return $e.attr("data-original-title") || ("function" == typeof o.title ? o.title.call($e[0]) : o.title);
        };
        Tooltip.prototype.getUID = function(prefix) {
          do {
            prefix = prefix + ~~(1E6 * Math.random());
          } while (document.getElementById(prefix));
          return prefix;
        };
        Tooltip.prototype.tip = function() {
          if (!this.$tip && (this.$tip = $(this.options.template), 1 != this.$tip.length)) {
            throw new Error(this.type + " `template` option must consist of exactly 1 top-level element!");
          }
          return this.$tip;
        };
        Tooltip.prototype.arrow = function() {
          return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow");
        };
        Tooltip.prototype.enable = function() {
          this.enabled = true;
        };
        Tooltip.prototype.disable = function() {
          this.enabled = false;
        };
        Tooltip.prototype.toggleEnabled = function() {
          this.enabled = !this.enabled;
        };
        Tooltip.prototype.toggle = function(event) {
          var self = this;
          if (event) {
            if (!(self = $(event.currentTarget).data("bs." + this.type))) {
              self = new this.constructor(event.currentTarget, this.getDelegateOptions());
              $(event.currentTarget).data("bs." + this.type, self);
            }
          }
          if (event) {
            self.inState.click = !self.inState.click;
            if (self.isInStateTrue()) {
              self.enter(self);
            } else {
              self.leave(self);
            }
          } else {
            if (self.tip().hasClass("in")) {
              self.leave(self);
            } else {
              self.enter(self);
            }
          }
        };
        Tooltip.prototype.destroy = function() {
          var that = this;
          clearTimeout(this.timeout);
          this.hide(function() {
            that.$element.off("." + that.type).removeData("bs." + that.type);
            if (that.$tip) {
              that.$tip.detach();
            }
            that.$tip = null;
            that.$arrow = null;
            that.$viewport = null;
            that.$element = null;
          });
        };
        Tooltip.prototype.sanitizeHtml = function(html) {
          return parse(html, this.options.whiteList, this.options.sanitizeFn);
        };
        var old = $.fn.tooltip;
        $.fn.tooltip = function(config) {
          return this.each(function() {
            var $this = $(this);
            var data = $this.data("bs.tooltip");
            var options = "object" == typeof config && config;
            if (!(!data && /destroy|hide/.test(config))) {
              if (!data) {
                $this.data("bs.tooltip", data = new Tooltip(this, options));
              }
              if ("string" == typeof config) {
                data[config]();
              }
            }
          });
        };
        $.fn.tooltip.Constructor = Tooltip;
        $.fn.tooltip.noConflict = function() {
          return $.fn.tooltip = old, this;
        };
      })(jQuery);
      (function($) {
        var Popover = function(element, options) {
          this.init("popover", element, options);
        };
        if (!$.fn.tooltip) {
          throw new Error("Popover requires tooltip.js");
        }
        Popover.VERSION = "3.4.1";
        Popover.DEFAULTS = $.extend({}, $.fn.tooltip.Constructor.DEFAULTS, {
          placement : "right",
          trigger : "click",
          content : "",
          template : '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
        });
        (Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype)).constructor = Popover;
        Popover.prototype.getDefaults = function() {
          return Popover.DEFAULTS;
        };
        Popover.prototype.setContent = function() {
          var $tip = this.tip();
          var title = this.getTitle();
          var content = this.getContent();
          if (this.options.html) {
            var undefined = typeof content;
            if (this.options.sanitize) {
              title = this.sanitizeHtml(title);
              if ("string" === undefined) {
                content = this.sanitizeHtml(content);
              }
            }
            $tip.find(".popover-title").html(title);
            $tip.find(".popover-content").children().detach().end()["string" === undefined ? "html" : "append"](content);
          } else {
            $tip.find(".popover-title").text(title);
            $tip.find(".popover-content").children().detach().end().text(content);
          }
          $tip.removeClass("fade top bottom left right in");
          if (!$tip.find(".popover-title").html()) {
            $tip.find(".popover-title").hide();
          }
        };
        Popover.prototype.hasContent = function() {
          return this.getTitle() || this.getContent();
        };
        Popover.prototype.getContent = function() {
          var $e = this.$element;
          var o = this.options;
          return $e.attr("data-content") || ("function" == typeof o.content ? o.content.call($e[0]) : o.content);
        };
        Popover.prototype.arrow = function() {
          return this.$arrow = this.$arrow || this.tip().find(".arrow");
        };
        var old = $.fn.popover;
        $.fn.popover = function(option) {
          return this.each(function() {
            var $this = $(this);
            var data = $this.data("bs.popover");
            var options = "object" == typeof option && option;
            if (!(!data && /destroy|hide/.test(option))) {
              if (!data) {
                $this.data("bs.popover", data = new Popover(this, options));
              }
              if ("string" == typeof option) {
                data[option]();
              }
            }
          });
        };
        $.fn.popover.Constructor = Popover;
        $.fn.popover.noConflict = function() {
          return $.fn.popover = old, this;
        };
      })(jQuery);
      (function($) {
        function ScrollSpy(element, options) {
          this.$body = $(document.body);
          this.$scrollElement = $(element).is(document.body) ? $(window) : $(element);
          this.options = $.extend({}, ScrollSpy.DEFAULTS, options);
          this.selector = (this.options.target || "") + " .nav li > a";
          this.offsets = [];
          this.targets = [];
          this.activeTarget = null;
          this.scrollHeight = 0;
          this.$scrollElement.on("scroll.bs.scrollspy", $.proxy(this.process, this));
          this.refresh();
          this.process();
        }
        function Plugin(opts) {
          return this.each(function() {
            var $this = $(this);
            var data = $this.data("bs.scrollspy");
            var options = "object" == typeof opts && opts;
            if (!data) {
              $this.data("bs.scrollspy", data = new ScrollSpy(this, options));
            }
            if ("string" == typeof opts) {
              data[opts]();
            }
          });
        }
        ScrollSpy.VERSION = "3.4.1";
        ScrollSpy.DEFAULTS = {
          offset : 10
        };
        ScrollSpy.prototype.getScrollHeight = function() {
          return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight);
        };
        ScrollSpy.prototype.refresh = function() {
          var self = this;
          var min = "offset";
          var searchBarHeight = 0;
          this.offsets = [];
          this.targets = [];
          this.scrollHeight = this.getScrollHeight();
          if (!$.isWindow(this.$scrollElement[0])) {
            min = "position";
            searchBarHeight = this.$scrollElement.scrollTop();
          }
          this.$body.find(this.selector).map(function() {
            var e = $(this);
            var href = e.data("target") || e.attr("href");
            var set = /^#./.test(href) && $(href);
            return set && set.length && set.is(":visible") && [[set[min]().top + searchBarHeight, href]] || null;
          }).sort(function(subtractor, subtractee) {
            return subtractor[0] - subtractee[0];
          }).each(function() {
            self.offsets.push(this[0]);
            self.targets.push(this[1]);
          });
        };
        ScrollSpy.prototype.process = function() {
          var i;
          var scrollTop = this.$scrollElement.scrollTop() + this.options.offset;
          var scrollHeight = this.getScrollHeight();
          var maxScroll = this.options.offset + scrollHeight - this.$scrollElement.height();
          var offsets = this.offsets;
          var targets = this.targets;
          var activeTarget = this.activeTarget;
          if (this.scrollHeight != scrollHeight && this.refresh(), scrollTop >= maxScroll) {
            return activeTarget != (i = targets[targets.length - 1]) && this.activate(i);
          }
          if (activeTarget && scrollTop < offsets[0]) {
            return this.activeTarget = null, this.clear();
          }
          i = offsets.length;
          for (; i--;) {
            if (activeTarget != targets[i] && scrollTop >= offsets[i] && (void 0 === offsets[i + 1] || scrollTop < offsets[i + 1])) {
              this.activate(targets[i]);
            }
          }
        };
        ScrollSpy.prototype.activate = function(target) {
          this.activeTarget = target;
          this.clear();
          var columnContainer = this.selector + '[data-target="' + target + '"],' + this.selector + '[href="' + target + '"]';
          var active = $(columnContainer).parents("li").addClass("active");
          if (active.parent(".dropdown-menu").length) {
            active = active.closest("li.dropdown").addClass("active");
          }
          active.trigger("activate.bs.scrollspy");
        };
        ScrollSpy.prototype.clear = function() {
          $(this.selector).parentsUntil(this.options.target, ".active").removeClass("active");
        };
        var old = $.fn.scrollspy;
        $.fn.scrollspy = Plugin;
        $.fn.scrollspy.Constructor = ScrollSpy;
        $.fn.scrollspy.noConflict = function() {
          return $.fn.scrollspy = old, this;
        };
        $(window).on("load.bs.scrollspy.data-api", function() {
          $('[data-spy="scroll"]').each(function() {
            var $spy = $(this);
            Plugin.call($spy, $spy.data());
          });
        });
      })(jQuery);
      (function($) {
        function Plugin(element) {
          return this.each(function() {
            var $this = $(this);
            var data = $this.data("bs.tab");
            if (!data) {
              $this.data("bs.tab", data = new Tab(this));
            }
            if ("string" == typeof element) {
              data[element]();
            }
          });
        }
        var Tab = function(name) {
          this.element = $(name);
        };
        Tab.VERSION = "3.4.1";
        Tab.TRANSITION_DURATION = 150;
        Tab.prototype.show = function() {
          var $this = this.element;
          var result = $this.closest("ul:not(.dropdown-menu)");
          var value = $this.data("target");
          if (value || (value = (value = $this.attr("href")) && value.replace(/.*(?=#[^\s]*$)/, "")), !$this.parent("li").hasClass("active")) {
            var $previous = result.find(".active:last a");
            var tap = $.Event("hide.bs.tab", {
              relatedTarget : $this[0]
            });
            var event = $.Event("show.bs.tab", {
              relatedTarget : $previous[0]
            });
            if ($previous.trigger(tap), $this.trigger(event), !event.isDefaultPrevented() && !tap.isDefaultPrevented()) {
              var i = $(document).find(value);
              this.activate($this.closest("li"), result);
              this.activate(i, i.parent(), function() {
                $previous.trigger({
                  type : "hidden.bs.tab",
                  relatedTarget : $this[0]
                });
                $this.trigger({
                  type : "shown.bs.tab",
                  relatedTarget : $previous[0]
                });
              });
            }
          }
        };
        Tab.prototype.activate = function(element, target, callback) {
          function next() {
            $active.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", false);
            element.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded", true);
            if (transition) {
              element[0].offsetWidth;
              element.addClass("in");
            } else {
              element.removeClass("fade");
            }
            if (element.parent(".dropdown-menu").length) {
              element.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", true);
            }
            if (callback) {
              callback();
            }
          }
          var $active = target.find("> .active");
          var transition = callback && $.support.transition && ($active.length && $active.hasClass("fade") || !!target.find("> .fade").length);
          if ($active.length && transition) {
            $active.one("bsTransitionEnd", next).emulateTransitionEnd(Tab.TRANSITION_DURATION);
          } else {
            next();
          }
          $active.removeClass("in");
        };
        var old = $.fn.tab;
        $.fn.tab = Plugin;
        $.fn.tab.Constructor = Tab;
        $.fn.tab.noConflict = function() {
          return $.fn.tab = old, this;
        };
        var o = function(thing) {
          thing.preventDefault();
          Plugin.call($(this), "show");
        };
        $(document).on("click.bs.tab.data-api", '[data-toggle="tab"]', o).on("click.bs.tab.data-api", '[data-toggle="pill"]', o);
      })(jQuery);
      (function($) {
        function Plugin(opts) {
          return this.each(function() {
            var $this = $(this);
            var data = $this.data("bs.affix");
            var options = "object" == typeof opts && opts;
            if (!data) {
              $this.data("bs.affix", data = new Affix(this, options));
            }
            if ("string" == typeof opts) {
              data[opts]();
            }
          });
        }
        var Affix = function(element, options) {
          this.options = $.extend({}, Affix.DEFAULTS, options);
          var expandel = this.options.target === Affix.DEFAULTS.target ? $(this.options.target) : $(document).find(this.options.target);
          this.$target = expandel.on("scroll.bs.affix.data-api", $.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", $.proxy(this.checkPositionWithEventLoop, this));
          this.$element = $(element);
          this.affixed = null;
          this.unpin = null;
          this.pinnedOffset = null;
          this.checkPosition();
        };
        Affix.VERSION = "3.4.1";
        Affix.RESET = "affix affix-top affix-bottom";
        Affix.DEFAULTS = {
          offset : 0,
          target : window
        };
        Affix.prototype.getState = function(scrollHeight, height, offsetTop, offsetBottom) {
          var scrollTop = this.$target.scrollTop();
          var position = this.$element.offset();
          var targetHeight = this.$target.height();
          if (null != offsetTop && "top" == this.affixed) {
            return scrollTop < offsetTop && "top";
          }
          if ("bottom" == this.affixed) {
            return null != offsetTop ? !(scrollTop + this.unpin <= position.top) && "bottom" : !(scrollTop + targetHeight <= scrollHeight - offsetBottom) && "bottom";
          }
          var initializing = null == this.affixed;
          var colliderTop = initializing ? scrollTop : position.top;
          return null != offsetTop && scrollTop <= offsetTop ? "top" : null != offsetBottom && colliderTop + (initializing ? targetHeight : height) >= scrollHeight - offsetBottom && "bottom";
        };
        Affix.prototype.getPinnedOffset = function() {
          if (this.pinnedOffset) {
            return this.pinnedOffset;
          }
          this.$element.removeClass(Affix.RESET).addClass("affix");
          var scrollTop = this.$target.scrollTop();
          var position = this.$element.offset();
          return this.pinnedOffset = position.top - scrollTop;
        };
        Affix.prototype.checkPositionWithEventLoop = function() {
          setTimeout($.proxy(this.checkPosition, this), 1);
        };
        Affix.prototype.checkPosition = function() {
          if (this.$element.is(":visible")) {
            var height = this.$element.height();
            var offset = this.options.offset;
            var offsetTop = offset.top;
            var offsetBottom = offset.bottom;
            var scrollHeight = Math.max($(document).height(), $(document.body).height());
            if ("object" != typeof offset) {
              offsetBottom = offsetTop = offset;
            }
            if ("function" == typeof offsetTop) {
              offsetTop = offset.top(this.$element);
            }
            if ("function" == typeof offsetBottom) {
              offsetBottom = offset.bottom(this.$element);
            }
            var affix = this.getState(scrollHeight, height, offsetTop, offsetBottom);
            if (this.affixed != affix) {
              if (null != this.unpin) {
                this.$element.css("top", "");
              }
              var affixType = "affix" + (affix ? "-" + affix : "");
              var event = $.Event(affixType + ".bs.affix");
              if (this.$element.trigger(event), event.isDefaultPrevented()) {
                return;
              }
              this.affixed = affix;
              this.unpin = "bottom" == affix ? this.getPinnedOffset() : null;
              this.$element.removeClass(Affix.RESET).addClass(affixType).trigger(affixType.replace("affix", "affixed") + ".bs.affix");
            }
            if ("bottom" == affix) {
              this.$element.offset({
                top : scrollHeight - height - offsetBottom
              });
            }
          }
        };
        var old = $.fn.affix;
        $.fn.affix = Plugin;
        $.fn.affix.Constructor = Affix;
        $.fn.affix.noConflict = function() {
          return $.fn.affix = old, this;
        };
        $(window).on("load", function() {
          $('[data-spy="affix"]').each(function() {
            var $spy = $(this);
            var data = $spy.data();
            data.offset = data.offset || {};
            if (null != data.offsetBottom) {
              data.offset.bottom = data.offsetBottom;
            }
            if (null != data.offsetTop) {
              data.offset.top = data.offsetTop;
            }
            Plugin.call($spy, data);
          });
        });
      })(jQuery);
    },
    755 : function(module, args) {
      var multiple;
      !function(global, factory) {
        if ("object" == typeof module.exports) {
          module.exports = global.document ? factory(global, true) : function(range) {
            if (!range.document) {
              throw new Error("jQuery requires a window with a document");
            }
            return factory(range);
          };
        } else {
          factory(global);
        }
      }("undefined" != typeof window ? window : this, function(window, canCreateDiscussions) {
        function done(source, context, doc) {
          var key;
          var styleElId;
          var el = (doc = doc || document).createElement("script");
          if (el.text = source, context) {
            for (key in obj) {
              if (styleElId = context[key] || context.getAttribute && context.getAttribute(key)) {
                el.setAttribute(key, styleElId);
              }
            }
          }
          doc.head.appendChild(el).parentNode.removeChild(el);
        }
        function type(obj) {
          return null == obj ? obj + "" : "object" == typeof obj || "function" == typeof obj ? class2type[toString.call(obj)] || "object" : typeof obj;
        }
        function isArrayLike(obj) {
          var length = !!obj && "length" in obj && obj.length;
          var ltype = type(obj);
          return !isFunction(obj) && !isWindow(obj) && ("array" === ltype || 0 === length || "number" == typeof length && length > 0 && length - 1 in obj);
        }
        function callback(name, type) {
          return name.nodeName && name.nodeName.toLowerCase() === type.toLowerCase();
        }
        function winnow(result, value, not) {
          return isFunction(value) ? jQuery.grep(result, function(context, i) {
            return !!value.call(context, i, context) !== not;
          }) : value.nodeType ? jQuery.grep(result, function(elem) {
            return elem === value !== not;
          }) : "string" != typeof value ? jQuery.grep(result, function(name) {
            return indexOf.call(value, name) > -1 !== not;
          }) : jQuery.filter(value, result, not);
        }
        function sibling(cur, dir) {
          for (; (cur = cur[dir]) && 1 !== cur.nodeType;) {
          }
          return cur;
        }
        function v(v) {
          return v;
        }
        function undefined(state) {
          throw state;
        }
        function require(data, callback, error, items) {
          var request;
          try {
            if (data && isFunction(request = data.promise)) {
              request.call(data).done(callback).fail(error);
            } else {
              if (data && isFunction(request = data.then)) {
                request.call(data, callback, error);
              } else {
                callback.apply(void 0, [data].slice(items));
              }
            }
          } catch (attrName) {
            error.apply(void 0, [attrName]);
          }
        }
        function $__jsx_onload() {
          document.removeEventListener("DOMContentLoaded", $__jsx_onload);
          window.removeEventListener("load", $__jsx_onload);
          jQuery.ready();
        }
        function dashToCapital(context, match) {
          return match.toUpperCase();
        }
        function camelCase(str) {
          return str.replace(_kerningNamesHash_escapeEscape, "ms-").replace(rcharset, dashToCapital);
        }
        function Data() {
          this.expando = jQuery.expando + Data.uid++;
        }
        function render(elem, name, data) {
          var key;
          if (void 0 === data && 1 === elem.nodeType) {
            if (key = "data-" + name.replace(dashExpr, "-$&").toLowerCase(), "string" == typeof(data = elem.getAttribute(key))) {
              try {
                data = function(value) {
                  return "true" === value || "false" !== value && ("null" === value ? null : value === +value + "" ? +value : contribRegex.test(value) ? JSON.parse(value) : value);
                }(data);
              } catch (t) {
              }
              data_priv.set(elem, name, data);
            } else {
              data = void 0;
            }
          }
          return data;
        }
        function adjustCSS(elem, prop, valueParts, tween) {
          var adjusted;
          var scale;
          var s = 20;
          var currentValue = tween ? function() {
            return tween.cur();
          } : function() {
            return jQuery.css(elem, prop, "");
          };
          var initial = currentValue();
          var unit = valueParts && valueParts[3] || (jQuery.cssNumber[prop] ? "" : "px");
          var initialInUnit = elem.nodeType && (jQuery.cssNumber[prop] || "px" !== unit && +initial) && regex.exec(jQuery.css(elem, prop));
          if (initialInUnit && initialInUnit[3] !== unit) {
            initial = initial / 2;
            unit = unit || initialInUnit[3];
            initialInUnit = +initial || 1;
            for (; s--;) {
              jQuery.style(elem, prop, initialInUnit + unit);
              if ((1 - scale) * (1 - (scale = currentValue() / initial || .5)) <= 0) {
                s = 0;
              }
              initialInUnit = initialInUnit / scale;
            }
            initialInUnit = initialInUnit * 2;
            jQuery.style(elem, prop, initialInUnit + unit);
            valueParts = valueParts || [];
          }
          return valueParts && (initialInUnit = +initialInUnit || +initial || 0, adjusted = valueParts[1] ? initialInUnit + (valueParts[1] + 1) * valueParts[2] : +valueParts[2], tween && (tween.unit = unit, tween.start = initialInUnit, tween.end = adjusted)), adjusted;
        }
        function getDefaultDisplay(elem) {
          var temp;
          var doc = elem.ownerDocument;
          var nodeName = elem.nodeName;
          var display = defaultDisplayMap[nodeName];
          return display || (temp = doc.body.appendChild(doc.createElement(nodeName)), display = jQuery.css(temp, "display"), temp.parentNode.removeChild(temp), "none" === display && (display = "block"), defaultDisplayMap[nodeName] = display, display);
        }
        function showHide(elements, options) {
          var display;
          var elem;
          var values = [];
          var index = 0;
          var length = elements.length;
          for (; index < length; index++) {
            if ((elem = elements[index]).style) {
              display = elem.style.display;
              if (options) {
                if ("none" === display) {
                  values[index] = dataPriv.get(elem, "display") || null;
                  if (!values[index]) {
                    elem.style.display = "";
                  }
                }
                if ("" === elem.style.display && isHidden(elem)) {
                  values[index] = getDefaultDisplay(elem);
                }
              } else {
                if ("none" !== display) {
                  values[index] = "none";
                  dataPriv.set(elem, "display", display);
                }
              }
            }
          }
          index = 0;
          for (; index < length; index++) {
            if (null != values[index]) {
              elements[index].style.display = values[index];
            }
          }
          return elements;
        }
        function getAll(context, tag) {
          var n;
          return n = void 0 !== context.getElementsByTagName ? context.getElementsByTagName(tag || "*") : void 0 !== context.querySelectorAll ? context.querySelectorAll(tag || "*") : [], void 0 === tag || tag && callback(context, tag) ? jQuery.merge([context], n) : n;
        }
        function setGlobalEval(elems, refElements) {
          var i = 0;
          var length = elems.length;
          for (; i < length; i++) {
            dataPriv.set(elems[i], "globalEval", !refElements || dataPriv.get(refElements[i], "globalEval"));
          }
        }
        function buildFragment(elems, context, scripts, arr, result) {
          var elem;
          var tmp;
          var tag;
          var wrap;
          var template;
          var j;
          var fragment = context.createDocumentFragment();
          var results = [];
          var i = 0;
          var length = elems.length;
          for (; i < length; i++) {
            if ((elem = elems[i]) || 0 === elem) {
              if ("object" === type(elem)) {
                jQuery.merge(results, elem.nodeType ? [elem] : elem);
              } else {
                if (re_commas.test(elem)) {
                  tmp = tmp || fragment.appendChild(context.createElement("div"));
                  tag = (fullLinkRegex.exec(elem) || ["", ""])[1].toLowerCase();
                  wrap = wrapMap[tag] || wrapMap._default;
                  tmp.innerHTML = wrap[1] + jQuery.htmlPrefilter(elem) + wrap[2];
                  j = wrap[0];
                  for (; j--;) {
                    tmp = tmp.lastChild;
                  }
                  jQuery.merge(results, tmp.childNodes);
                  (tmp = fragment.firstChild).textContent = "";
                } else {
                  results.push(context.createTextNode(elem));
                }
              }
            }
          }
          fragment.textContent = "";
          i = 0;
          for (; elem = results[i++];) {
            if (arr && jQuery.inArray(elem, arr) > -1) {
              if (result) {
                result.push(elem);
              }
            } else {
              if (template = get(elem), tmp = getAll(fragment.appendChild(elem), "script"), template && setGlobalEval(tmp), scripts) {
                j = 0;
                for (; elem = tmp[j++];) {
                  if (opacityRe.test(elem.type || "")) {
                    scripts.push(elem);
                  }
                }
              }
            }
          }
          return fragment;
        }
        function returnTrue() {
          return true;
        }
        function returnFalse() {
          return false;
        }
        function moveHandler(event, data) {
          return event === function() {
            try {
              return document.activeElement;
            } catch (t) {
            }
          }() == ("focus" === data);
        }
        function bind(fn, obj, value, name, callback, useCapture) {
          var handler;
          var key;
          if ("object" == typeof obj) {
            for (key in "string" != typeof value && (name = name || value, value = void 0), obj) {
              bind(fn, key, value, name, obj[key], useCapture);
            }
            return fn;
          }
          if (null == name && null == callback ? (callback = value, name = value = void 0) : null == callback && ("string" == typeof value ? (callback = name, name = void 0) : (callback = name, name = value, value = void 0)), false === callback) {
            callback = returnFalse;
          } else {
            if (!callback) {
              return fn;
            }
          }
          return 1 === useCapture && (handler = callback, callback = function(type) {
            return jQuery().off(type), handler.apply(this, arguments);
          }, callback.guid = handler.guid || (handler.guid = jQuery.guid++)), fn.each(function() {
            jQuery.event.add(this, obj, callback, name, value);
          });
        }
        function on(elem, type, handler) {
          if (handler) {
            dataPriv.set(elem, type, false);
            jQuery.event.add(elem, type, {
              namespace : false,
              handler : function(event) {
                var promise;
                var attr;
                var data = dataPriv.get(this, type);
                if (1 & event.isTrigger && this[type]) {
                  if (data.length) {
                    if ((jQuery.event.special[type] || {}).delegateType) {
                      event.stopPropagation();
                    }
                  } else {
                    if (data = slice.call(arguments), dataPriv.set(this, type, data), promise = handler(this, type), this[type](), data !== (attr = dataPriv.get(this, type)) || promise ? dataPriv.set(this, type, false) : attr = {}, data !== attr) {
                      return event.stopImmediatePropagation(), event.preventDefault(), attr && attr.value;
                    }
                  }
                } else {
                  if (data.length) {
                    dataPriv.set(this, type, {
                      value : jQuery.event.trigger(jQuery.extend(data[0], jQuery.Event.prototype), data.slice(1), this)
                    });
                    event.stopImmediatePropagation();
                  }
                }
              }
            });
          } else {
            if (void 0 === dataPriv.get(elem, type)) {
              jQuery.event.add(elem, type, returnTrue);
            }
          }
        }
        function manipulationTarget(elem, content) {
          return callback(elem, "table") && callback(11 !== content.nodeType ? content : content.firstChild, "tr") && jQuery(elem).children("tbody")[0] || elem;
        }
        function p(s) {
          return s.type = (null !== s.getAttribute("type")) + "/" + s.type, s;
        }
        function createGeneNameGenomicState(cb) {
          return "true/" === (cb.type || "").slice(0, 5) ? cb.type = cb.type.slice(5) : cb.removeAttribute("type"), cb;
        }
        function cloneCopyEvent(node, elem) {
          var i;
          var tableslen;
          var type;
          var UIConfig;
          var pdataOld;
          var events;
          if (1 === elem.nodeType) {
            if (dataPriv.hasData(node) && (events = dataPriv.get(node).events)) {
              for (type in dataPriv.remove(elem, "handle events"), events) {
                i = 0;
                tableslen = events[type].length;
                for (; i < tableslen; i++) {
                  jQuery.event.add(elem, type, events[type][i]);
                }
              }
            }
            if (data_priv.hasData(node)) {
              UIConfig = data_priv.access(node);
              pdataOld = jQuery.extend({}, UIConfig);
              data_priv.set(elem, pdataOld);
            }
          }
        }
        function fixInput(src, dest) {
          var undefined = dest.nodeName.toLowerCase();
          if ("input" === undefined && path.test(src.type)) {
            dest.checked = src.checked;
          } else {
            if (!("input" !== undefined && "textarea" !== undefined)) {
              dest.defaultValue = src.defaultValue;
            }
          }
        }
        function domManip(collection, args, callback, ignored) {
          args = map(args);
          var fragment;
          var first;
          var element;
          var itl;
          var node;
          var data;
          var key = 0;
          var result = collection.length;
          var index = result - 1;
          var str = args[0];
          var func = isFunction(str);
          if (func || result > 1 && "string" == typeof str && !support.checkClone && partten.test(str)) {
            return collection.each(function(index) {
              var self = collection.eq(index);
              if (func) {
                args[0] = str.call(this, index, self.html());
              }
              domManip(self, args, callback, ignored);
            });
          }
          if (result && (first = (fragment = buildFragment(args, collection[0].ownerDocument, false, collection, ignored)).firstChild, 1 === fragment.childNodes.length && (fragment = first), first || ignored)) {
            itl = (element = jQuery.map(getAll(fragment, "script"), p)).length;
            for (; key < result; key++) {
              node = fragment;
              if (key !== index) {
                node = jQuery.clone(node, true, true);
                if (itl) {
                  jQuery.merge(element, getAll(node, "script"));
                }
              }
              callback.call(collection[key], node, key);
            }
            if (itl) {
              data = element[element.length - 1].ownerDocument;
              jQuery.map(element, createGeneNameGenomicState);
              key = 0;
              for (; key < itl; key++) {
                node = element[key];
                if (opacityRe.test(node.type || "") && !dataPriv.access(node, "globalEval") && jQuery.contains(data, node)) {
                  if (node.src && "module" !== (node.type || "").toLowerCase()) {
                    if (jQuery._evalUrl && !node.noModule) {
                      jQuery._evalUrl(node.src, {
                        nonce : node.nonce || node.getAttribute("nonce")
                      }, data);
                    }
                  } else {
                    done(node.textContent.replace(query, ""), node, data);
                  }
                }
              }
            }
          }
          return collection;
        }
        function remove(val, key, data) {
          var elem;
          var ret = key ? jQuery.filter(key, val) : val;
          var i = 0;
          for (; null != (elem = ret[i]); i++) {
            if (!(data || 1 !== elem.nodeType)) {
              jQuery.cleanData(getAll(elem));
            }
            if (elem.parentNode) {
              if (data && get(elem)) {
                setGlobalEval(getAll(elem, "script"));
              }
              elem.parentNode.removeChild(elem);
            }
          }
          return val;
        }
        function curCSS(elem, name, computed) {
          var minWidth;
          var width;
          var maxWidth;
          var ret;
          var style = elem.style;
          return (computed = computed || getStyles(elem)) && ("" !== (ret = computed.getPropertyValue(name) || computed[name]) || get(elem) || (ret = jQuery.style(elem, name)), !support.pixelBoxStyles() && rnumnonpx.test(ret) && inlineAttributeIgnoreCommentRegex.test(name) && (minWidth = style.width, width = style.minWidth, maxWidth = style.maxWidth, style.minWidth = style.maxWidth = style.width = ret, ret = computed.width, style.width = minWidth, style.minWidth = width, style.maxWidth = maxWidth)), 
          void 0 !== ret ? ret + "" : ret;
        }
        function addGetHookIf(conditionFn, hookFn) {
          return {
            get : function() {
              if (!conditionFn()) {
                return (this.get = hookFn).apply(this, arguments);
              }
              delete this.get;
            }
          };
        }
        function camelize(name) {
          var nameField = jQuery.cssProps[name] || aSupports[name];
          return nameField || (name in testStyle ? name : aSupports[name] = function(p) {
            var prop = p[0].toUpperCase() + p.slice(1);
            var i = prefixes.length;
            for (; i--;) {
              if ((p = prefixes[i] + prop) in testStyle) {
                return p;
              }
            }
          }(name) || name);
        }
        function set(elem, value, str) {
          var matches = regex.exec(value);
          return matches ? Math.max(0, matches[2] - (str || 0)) + (matches[3] || "px") : value;
        }
        function augmentWidthOrHeight(elem, name, extra, isBorderBox, styles, themeName) {
          var i = "width" === name ? 1 : 0;
          var value = 0;
          var val = 0;
          if (extra === (isBorderBox ? "border" : "content")) {
            return 0;
          }
          for (; i < 4; i = i + 2) {
            if ("margin" === extra) {
              val = val + jQuery.css(elem, extra + cssExpand[i], true, styles);
            }
            if (isBorderBox) {
              if ("content" === extra) {
                val = val - jQuery.css(elem, "padding" + cssExpand[i], true, styles);
              }
              if ("margin" !== extra) {
                val = val - jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
              }
            } else {
              val = val + jQuery.css(elem, "padding" + cssExpand[i], true, styles);
              if ("padding" !== extra) {
                val = val + jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
              } else {
                value = value + jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
              }
            }
          }
          return !isBorderBox && themeName >= 0 && (val = val + (Math.max(0, Math.ceil(elem["offset" + name[0].toUpperCase() + name.slice(1)] - themeName - val - value - .5)) || 0)), val;
        }
        function load(elem, name, extra) {
          var styles = getStyles(elem);
          var isBorderBox = (!support.boxSizingReliable() || extra) && "border-box" === jQuery.css(elem, "boxSizing", false, styles);
          var valueIsBorderBox = isBorderBox;
          var value = curCSS(elem, name, styles);
          var prop = "offset" + name[0].toUpperCase() + name.slice(1);
          if (rnumnonpx.test(value)) {
            if (!extra) {
              return value;
            }
            value = "auto";
          }
          return (!support.boxSizingReliable() && isBorderBox || !support.reliableTrDimensions() && callback(elem, "tr") || "auto" === value || !parseFloat(value) && "inline" === jQuery.css(elem, "display", false, styles)) && elem.getClientRects().length && (isBorderBox = "border-box" === jQuery.css(elem, "boxSizing", false, styles), (valueIsBorderBox = prop in elem) && (value = elem[prop])), (value = parseFloat(value) || 0) + augmentWidthOrHeight(elem, name, extra || (isBorderBox ? "border" : "content"), 
          valueIsBorderBox, styles, value) + "px";
        }
        function Tween(type, key, object, end, easing) {
          return new Tween.prototype.init(type, key, object, end, easing);
        }
        function step() {
          if (source) {
            if (false === document.hidden && window.requestAnimationFrame) {
              window.requestAnimationFrame(step);
            } else {
              window.setTimeout(step, jQuery.fx.interval);
            }
            jQuery.fx.tick();
          }
        }
        function createFxNow() {
          return window.setTimeout(function() {
            fxNow = void 0;
          }), fxNow = Date.now();
        }
        function genFx(type, includeWidth) {
          var which;
          var i = 0;
          var attrs = {
            height : type
          };
          includeWidth = includeWidth ? 1 : 0;
          for (; i < 4; i = i + (2 - includeWidth)) {
            attrs["margin" + (which = cssExpand[i])] = attrs["padding" + which] = type;
          }
          return includeWidth && (attrs.opacity = attrs.width = type), attrs;
        }
        function createTween(value, prop, animation) {
          var tween;
          var t = (Animation.tweeners[prop] || []).concat(Animation.tweeners["*"]);
          var o = 0;
          var oo = t.length;
          for (; o < oo; o++) {
            if (tween = t[o].call(animation, prop, value)) {
              return tween;
            }
          }
        }
        function Animation(elem, properties, options) {
          var result;
          var o;
          var index = 0;
          var ncells = Animation.prefilters.length;
          var deferred = jQuery.Deferred().always(function() {
            delete tick.elem;
          });
          var tick = function() {
            if (o) {
              return false;
            }
            var currentTime = fxNow || createFxNow();
            var remaining = Math.max(0, animation.startTime + animation.duration - currentTime);
            var percent = 1 - (remaining / animation.duration || 0);
            var i = 0;
            var length = animation.tweens.length;
            for (; i < length; i++) {
              animation.tweens[i].run(percent);
            }
            return deferred.notifyWith(elem, [animation, percent, remaining]), percent < 1 && length ? remaining : (length || deferred.notifyWith(elem, [animation, 1, 0]), deferred.resolveWith(elem, [animation]), false);
          };
          var animation = deferred.promise({
            elem : elem,
            props : jQuery.extend({}, properties),
            opts : jQuery.extend(true, {
              specialEasing : {},
              easing : jQuery.easing._default
            }, options),
            originalProperties : properties,
            originalOptions : options,
            startTime : fxNow || createFxNow(),
            duration : options.duration,
            tweens : [],
            createTween : function(prop, end) {
              var result = jQuery.Tween(elem, animation.opts, prop, end, animation.opts.specialEasing[prop] || animation.opts.easing);
              return animation.tweens.push(result), result;
            },
            stop : function(value) {
              var i = 0;
              var mid = value ? animation.tweens.length : 0;
              if (o) {
                return this;
              }
              o = true;
              for (; i < mid; i++) {
                animation.tweens[i].run(1);
              }
              return value ? (deferred.notifyWith(elem, [animation, 1, 0]), deferred.resolveWith(elem, [animation, value])) : deferred.rejectWith(elem, [animation, value]), this;
            }
          });
          var props = animation.props;
          !function(res, object) {
            var key;
            var name;
            var value;
            var obj;
            var hooks;
            for (key in res) {
              if (value = object[name = camelCase(key)], obj = res[key], Array.isArray(obj) && (value = obj[1], obj = res[key] = obj[0]), key !== name && (res[name] = obj, delete res[key]), (hooks = jQuery.cssHooks[name]) && "expand" in hooks) {
                for (key in obj = hooks.expand(obj), delete res[name], obj) {
                  if (!(key in res)) {
                    res[key] = obj[key];
                    object[key] = value;
                  }
                }
              } else {
                object[name] = value;
              }
            }
          }(props, animation.opts.specialEasing);
          for (; index < ncells; index++) {
            if (result = Animation.prefilters[index].call(animation, elem, props, animation.opts)) {
              return isFunction(result.stop) && (jQuery._queueHooks(animation.elem, animation.opts.queue).stop = result.stop.bind(result)), result;
            }
          }
          return jQuery.map(props, createTween, animation), isFunction(animation.opts.start) && animation.opts.start.call(elem, animation), animation.progress(animation.opts.progress).done(animation.opts.done, animation.opts.complete).fail(animation.opts.fail).always(animation.opts.always), jQuery.fx.timer(jQuery.extend(tick, {
            elem : elem,
            anim : animation,
            queue : animation.opts.queue
          })), animation;
        }
        function $(fn) {
          return (fn.match(context) || []).join(" ");
        }
        function getClass(el) {
          return el.getAttribute && el.getAttribute("class") || "";
        }
        function trim(value) {
          return Array.isArray(value) ? value : "string" == typeof value && value.match(context) || [];
        }
        function fn(s, data, params, next) {
          var i;
          if (Array.isArray(data)) {
            jQuery.each(data, function(canCreateDiscussions, response) {
              if (params || regCls.test(s)) {
                next(s, response);
              } else {
                fn(s + "[" + ("object" == typeof response && null != response ? canCreateDiscussions : "") + "]", response, params, next);
              }
            });
          } else {
            if (params || "object" !== type(data)) {
              next(s, data);
            } else {
              for (i in data) {
                fn(s + "[" + i + "]", data[i], params, next);
              }
            }
          }
        }
        function addToPrefiltersOrTransports(structure) {
          return function(name, n) {
            if ("string" != typeof name) {
              n = name;
              name = "*";
            }
            var type;
            var callbackCount = 0;
            var callbackVals = name.toLowerCase().match(context) || [];
            if (isFunction(n)) {
              for (; type = callbackVals[callbackCount++];) {
                if ("+" === type[0]) {
                  type = type.slice(1) || "*";
                  (structure[type] = structure[type] || []).unshift(n);
                } else {
                  (structure[type] = structure[type] || []).push(n);
                }
              }
            }
          };
        }
        function inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR) {
          function inspect(dataType) {
            var selected;
            return inspected[dataType] = true, jQuery.each(structure[dataType] || [], function(canCreateDiscussions, prefilterOrFactory) {
              var dataTypeOrTransport = prefilterOrFactory(options, originalOptions, jqXHR);
              return "string" != typeof dataTypeOrTransport || seekingTransport || inspected[dataTypeOrTransport] ? seekingTransport ? !(selected = dataTypeOrTransport) : void 0 : (options.dataTypes.unshift(dataTypeOrTransport), inspect(dataTypeOrTransport), false);
            }), selected;
          }
          var inspected = {};
          var seekingTransport = structure === transports;
          return inspect(options.dataTypes[0]) || !inspected["*"] && inspect("*");
        }
        function ajaxExtend(target, opts) {
          var key;
          var deep;
          var flatOptions = jQuery.ajaxSettings.flatOptions || {};
          for (key in opts) {
            if (void 0 !== opts[key]) {
              (flatOptions[key] ? target : deep || (deep = {}))[key] = opts[key];
            }
          }
          return deep && jQuery.extend(true, target, deep), target;
        }
        var arr = [];
        var getProto = Object.getPrototypeOf;
        var slice = arr.slice;
        var map = arr.flat ? function(item) {
          return arr.flat.call(item);
        } : function(item) {
          return arr.concat.apply([], item);
        };
        var push = arr.push;
        var indexOf = arr.indexOf;
        var class2type = {};
        var toString = class2type.toString;
        var hasOwn = class2type.hasOwnProperty;
        var fnToString = hasOwn.toString;
        var Mixin2 = fnToString.call(Object);
        var support = {};
        var isFunction = function(obj) {
          return "function" == typeof obj && "number" != typeof obj.nodeType && "function" != typeof obj.item;
        };
        var isWindow = function(obj) {
          return null != obj && obj === obj.window;
        };
        var document = window.document;
        var obj = {
          type : true,
          src : true,
          nonce : true,
          noModule : true
        };
        var core_version = "3.6.0";
        var jQuery = function(element, context) {
          return new jQuery.fn.init(element, context);
        };
        jQuery.fn = jQuery.prototype = {
          jquery : core_version,
          constructor : jQuery,
          length : 0,
          toArray : function() {
            return slice.call(this);
          },
          get : function(num) {
            return null == num ? slice.call(this) : num < 0 ? this[num + this.length] : this[num];
          },
          pushStack : function(a) {
            var elm = jQuery.merge(this.constructor(), a);
            return elm.prevObject = this, elm;
          },
          each : function(fn) {
            return jQuery.each(this, fn);
          },
          map : function(fn) {
            return this.pushStack(jQuery.map(this, function(elem, event) {
              return fn.call(elem, event, elem);
            }));
          },
          slice : function() {
            return this.pushStack(slice.apply(this, arguments));
          },
          first : function() {
            return this.eq(0);
          },
          last : function() {
            return this.eq(-1);
          },
          even : function() {
            return this.pushStack(jQuery.grep(this, function(canCreateDiscussions, isSlidingUp) {
              return (isSlidingUp + 1) % 2;
            }));
          },
          odd : function() {
            return this.pushStack(jQuery.grep(this, function(canCreateDiscussions, isSlidingUp) {
              return isSlidingUp % 2;
            }));
          },
          eq : function(i) {
            var len = this.length;
            var j = +i + (i < 0 ? len : 0);
            return this.pushStack(j >= 0 && j < len ? [this[j]] : []);
          },
          end : function() {
            return this.prevObject || this.constructor();
          },
          push : push,
          sort : arr.sort,
          splice : arr.splice
        };
        jQuery.extend = jQuery.fn.extend = function() {
          var options;
          var name;
          var value;
          var copy;
          var copyIsArray;
          var clone;
          var target = arguments[0] || {};
          var i = 1;
          var l = arguments.length;
          var deep = false;
          if ("boolean" == typeof target) {
            deep = target;
            target = arguments[i] || {};
            i++;
          }
          if (!("object" == typeof target || isFunction(target))) {
            target = {};
          }
          if (i === l) {
            target = this;
            i--;
          }
          for (; i < l; i++) {
            if (null != (options = arguments[i])) {
              for (name in options) {
                copy = options[name];
                if ("__proto__" !== name && target !== copy) {
                  if (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = Array.isArray(copy)))) {
                    value = target[name];
                    clone = copyIsArray && !Array.isArray(value) ? [] : copyIsArray || jQuery.isPlainObject(value) ? value : {};
                    copyIsArray = false;
                    target[name] = jQuery.extend(deep, clone, copy);
                  } else {
                    if (void 0 !== copy) {
                      target[name] = copy;
                    }
                  }
                }
              }
            }
          }
          return target;
        };
        jQuery.extend({
          expando : "jQuery" + (core_version + Math.random()).replace(/\D/g, ""),
          isReady : true,
          error : function(name) {
            throw new Error(name);
          },
          noop : function() {
          },
          isPlainObject : function(obj) {
            var proto;
            var hasOwnProperty;
            return !(!obj || "[object Object]" !== toString.call(obj)) && (!(proto = getProto(obj)) || "function" == typeof(hasOwnProperty = hasOwn.call(proto, "constructor") && proto.constructor) && fnToString.call(hasOwnProperty) === Mixin2);
          },
          isEmptyObject : function(obj) {
            var key;
            for (key in obj) {
              return false;
            }
            return true;
          },
          globalEval : function(code, data, url) {
            done(code, {
              nonce : data && data.nonce
            }, url);
          },
          each : function(result, state) {
            var n;
            var i = 0;
            if (isArrayLike(result)) {
              n = result.length;
              for (; i < n && false !== state.call(result[i], i, result[i]); i++) {
              }
            } else {
              for (i in result) {
                if (false === state.call(result[i], i, result[i])) {
                  break;
                }
              }
            }
            return result;
          },
          makeArray : function(arr, o) {
            var obj = o || [];
            return null != arr && (isArrayLike(Object(arr)) ? jQuery.merge(obj, "string" == typeof arr ? [arr] : arr) : push.call(obj, arr)), obj;
          },
          inArray : function(elem, arr, i) {
            return null == arr ? -1 : indexOf.call(arr, elem, i);
          },
          merge : function(a, b) {
            var cell_amount = +b.length;
            var i = 0;
            var l = a.length;
            for (; i < cell_amount; i++) {
              a[l++] = b[i];
            }
            return a.length = l, a;
          },
          grep : function(elements, callback, a) {
            var ret = [];
            var i = 0;
            var eL = elements.length;
            var booA = !a;
            for (; i < eL; i++) {
              if (!callback(elements[i], i) !== booA) {
                ret.push(elements[i]);
              }
            }
            return ret;
          },
          map : function(object, fn, val) {
            var aLength;
            var result;
            var i = 0;
            var s = [];
            if (isArrayLike(object)) {
              aLength = object.length;
              for (; i < aLength; i++) {
                if (null != (result = fn(object[i], i, val))) {
                  s.push(result);
                }
              }
            } else {
              for (i in object) {
                if (null != (result = fn(object[i], i, val))) {
                  s.push(result);
                }
              }
            }
            return map(s);
          },
          guid : 1,
          support : support
        });
        if ("function" == typeof Symbol) {
          jQuery.fn[Symbol.iterator] = arr[Symbol.iterator];
        }
        jQuery.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function(canCreateDiscussions, p_Interval) {
          class2type["[object " + p_Interval + "]"] = p_Interval.toLowerCase();
        });
        var Sizzle = function(options) {
          function Sizzle(selector, context, results, seed) {
            var m;
            var i;
            var elem;
            var nid;
            var match;
            var groups;
            var newSelector;
            var newContext = context && context.ownerDocument;
            var undefined = context ? context.nodeType : 9;
            if (results = results || [], "string" != typeof selector || !selector || 1 !== undefined && 9 !== undefined && 11 !== undefined) {
              return results;
            }
            if (!seed && (setDocument(context), context = context || document, documentIsHTML)) {
              if (11 !== undefined && (match = customSelectorReg.exec(selector))) {
                if (m = match[1]) {
                  if (9 === undefined) {
                    if (!(elem = context.getElementById(m))) {
                      return results;
                    }
                    if (elem.id === m) {
                      return results.push(elem), results;
                    }
                  } else {
                    if (newContext && (elem = newContext.getElementById(m)) && contains(context, elem) && elem.id === m) {
                      return results.push(elem), results;
                    }
                  }
                } else {
                  if (match[2]) {
                    return push.apply(results, context.getElementsByTagName(selector)), results;
                  }
                  if ((m = match[3]) && support.getElementsByClassName && context.getElementsByClassName) {
                    return push.apply(results, context.getElementsByClassName(m)), results;
                  }
                }
              }
              if (support.qsa && !tokenCache[selector + " "] && (!rbuggyQSA || !rbuggyQSA.test(selector)) && (1 !== undefined || "object" !== context.nodeName.toLowerCase())) {
                if (newSelector = selector, newContext = context, 1 === undefined && (negativeRegex.test(selector) || RE_PSEUDOS.test(selector))) {
                  if (!((newContext = _.test(selector) && testContext(context.parentNode) || context) === context && support.scope)) {
                    if (nid = context.getAttribute("id")) {
                      nid = nid.replace(rescape, fcssescape);
                    } else {
                      context.setAttribute("id", nid = expando);
                    }
                  }
                  i = (groups = tokenize(selector)).length;
                  for (; i--;) {
                    groups[i] = (nid ? "#" + nid : ":scope") + " " + toSelector(groups[i]);
                  }
                  newSelector = groups.join(",");
                }
                try {
                  return push.apply(results, newContext.querySelectorAll(newSelector)), results;
                } catch (e) {
                  tokenCache(selector, true);
                } finally {
                  if (nid === expando) {
                    context.removeAttribute("id");
                  }
                }
              }
            }
            return select(selector.replace(rtrim, "$1"), context, results, seed);
          }
          function createCache() {
            var messages = [];
            return function cache(attr, fn) {
              return messages.push(attr + " ") > Expr.cacheLength && delete cache[messages.shift()], cache[attr + " "] = fn;
            };
          }
          function markFunction(fn) {
            return fn[expando] = true, fn;
          }
          function assert(expect) {
            var wrap = document.createElement("fieldset");
            try {
              return !!expect(wrap);
            } catch (t) {
              return false;
            } finally {
              if (wrap.parentNode) {
                wrap.parentNode.removeChild(wrap);
              }
              wrap = null;
            }
          }
          function addHandle(attrs, handler) {
            var arr = attrs.split("|");
            var i = arr.length;
            for (; i--;) {
              Expr.attrHandle[arr[i]] = handler;
            }
          }
          function siblingCheck(a, b) {
            var cur = b && a;
            var .num_const = cur && 1 === a.nodeType && 1 === b.nodeType && a.sourceIndex - b.sourceIndex;
            if (.num_const) {
              return .num_const;
            }
            if (cur) {
              for (; cur = cur.nextSibling;) {
                if (cur === b) {
                  return -1;
                }
              }
            }
            return a ? 1 : -1;
          }
          function run(name) {
            return function(section) {
              return "input" === section.nodeName.toLowerCase() && section.type === name;
            };
          }
          function createButtonPseudo(type) {
            return function(section) {
              var undefined = section.nodeName.toLowerCase();
              return ("input" === undefined || "button" === undefined) && section.type === type;
            };
          }
          function createDisabledPseudo(disabled) {
            return function(elem) {
              return "form" in elem ? elem.parentNode && false === elem.disabled ? "label" in elem ? "label" in elem.parentNode ? elem.parentNode.disabled === disabled : elem.disabled === disabled : elem.isDisabled === disabled || elem.isDisabled !== !disabled && disabledAncestor(elem) === disabled : elem.disabled === disabled : "label" in elem && elem.disabled === disabled;
            };
          }
          function createPositionalPseudo(fn) {
            return markFunction(function(value) {
              return value = +value, markFunction(function(self, global) {
                var name;
                var val = fn([], self.length, value);
                var j = val.length;
                for (; j--;) {
                  if (self[name = val[j]]) {
                    self[name] = !(global[name] = self[name]);
                  }
                }
              });
            });
          }
          function testContext(context) {
            return context && void 0 !== context.getElementsByTagName && context;
          }
          function setFilters() {
          }
          function toSelector(tokens) {
            var len = 0;
            var i = tokens.length;
            var selector = "";
            for (; len < i; len++) {
              selector = selector + tokens[len].value;
            }
            return selector;
          }
          function addCombinator(matcher, combinator, base) {
            var dir = combinator.dir;
            var skip = combinator.next;
            var key = skip || dir;
            var checkNonElements = base && "parentNode" === key;
            var doneName = done++;
            return combinator.first ? function(elem, stat, context) {
              for (; elem = elem[dir];) {
                if (1 === elem.nodeType || checkNonElements) {
                  return matcher(elem, stat, context);
                }
              }
              return false;
            } : function(elem, context, xml) {
              var oldCache;
              var uniqueCache;
              var outerCache;
              var newCache = [dirruns, doneName];
              if (xml) {
                for (; elem = elem[dir];) {
                  if ((1 === elem.nodeType || checkNonElements) && matcher(elem, context, xml)) {
                    return true;
                  }
                }
              } else {
                for (; elem = elem[dir];) {
                  if (1 === elem.nodeType || checkNonElements) {
                    if (uniqueCache = (outerCache = elem[expando] || (elem[expando] = {}))[elem.uniqueID] || (outerCache[elem.uniqueID] = {}), skip && skip === elem.nodeName.toLowerCase()) {
                      elem = elem[dir] || elem;
                    } else {
                      if ((oldCache = uniqueCache[key]) && oldCache[0] === dirruns && oldCache[1] === doneName) {
                        return newCache[2] = oldCache[2];
                      }
                      if (uniqueCache[key] = newCache, newCache[2] = matcher(elem, context, xml)) {
                        return true;
                      }
                    }
                  }
                }
              }
              return false;
            };
          }
          function elementMatcher(matchers) {
            return matchers.length > 1 ? function(elem, context, xml) {
              var i = matchers.length;
              for (; i--;) {
                if (!matchers[i](elem, context, xml)) {
                  return false;
                }
              }
              return true;
            } : matchers[0];
          }
          function get(t, date, e, n, o) {
            var c;
            var s = [];
            var i = 0;
            var pal = t.length;
            var colorChange = null != date;
            for (; i < pal; i++) {
              if (c = t[i]) {
                if (!(e && !e(c, n, o))) {
                  s.push(c);
                  if (colorChange) {
                    date.push(i);
                  }
                }
              }
            }
            return s;
          }
          function create(id, src, callback, fn, parent, body) {
            return fn && !fn[expando] && (fn = create(fn)), parent && !parent[expando] && (parent = create(parent, body)), markFunction(function(child, data, context, text) {
              var key;
              var i;
              var item;
              var object = [];
              var v = [];
              var ref = data.length;
              var right = child || function(selector, set, results) {
                var i = 0;
                var l = set.length;
                for (; i < l; i++) {
                  Sizzle(selector, set[i], results);
                }
                return results;
              }(src || "*", context.nodeType ? [context] : context, []);
              var r = !id || !child && src ? right : get(right, object, id, context, text);
              var result = callback ? parent || (child ? id : ref || fn) ? [] : data : r;
              if (callback && callback(r, result, context, text), fn) {
                key = get(result, v);
                fn(key, [], context, text);
                i = key.length;
                for (; i--;) {
                  if (item = key[i]) {
                    result[v[i]] = !(r[v[i]] = item);
                  }
                }
              }
              if (child) {
                if (parent || id) {
                  if (parent) {
                    key = [];
                    i = result.length;
                    for (; i--;) {
                      if (item = result[i]) {
                        key.push(r[i] = item);
                      }
                    }
                    parent(null, result = [], key, text);
                  }
                  i = result.length;
                  for (; i--;) {
                    if ((item = result[i]) && (key = parent ? indexOf(child, item) : object[i]) > -1) {
                      child[key] = !(data[key] = item);
                    }
                  }
                }
              } else {
                result = get(result === data ? result.splice(ref, result.length) : result);
                if (parent) {
                  parent(null, data, result, text);
                } else {
                  push.apply(data, result);
                }
              }
            });
          }
          function matcherFromTokens(tokens) {
            var checkContext;
            var matcher;
            var j;
            var len = tokens.length;
            var leadingRelative = Expr.relative[tokens[0].type];
            var implicitRelative = leadingRelative || Expr.relative[" "];
            var i = leadingRelative ? 1 : 0;
            var matchContext = addCombinator(function(elem) {
              return elem === checkContext;
            }, implicitRelative, true);
            var matchAnyContext = addCombinator(function(value) {
              return indexOf(checkContext, value) > -1;
            }, implicitRelative, true);
            var matchers = [function(elem, context, xml) {
              var o = !leadingRelative && (xml || context !== outermostContext) || ((checkContext = context).nodeType ? matchContext(elem, context, xml) : matchAnyContext(elem, context, xml));
              return checkContext = null, o;
            }];
            for (; i < len; i++) {
              if (matcher = Expr.relative[tokens[i].type]) {
                matchers = [addCombinator(elementMatcher(matchers), matcher)];
              } else {
                if ((matcher = Expr.filter[tokens[i].type].apply(null, tokens[i].matches))[expando]) {
                  j = ++i;
                  for (; j < len && !Expr.relative[tokens[j].type]; j++) {
                  }
                  return create(i > 1 && elementMatcher(matchers), i > 1 && toSelector(tokens.slice(0, i - 1).concat({
                    value : " " === tokens[i - 2].type ? "*" : ""
                  })).replace(rtrim, "$1"), matcher, i < j && matcherFromTokens(tokens.slice(i, j)), j < len && matcherFromTokens(tokens = tokens.slice(j)), j < len && toSelector(tokens));
                }
                matchers.push(matcher);
              }
            }
            return elementMatcher(matchers);
          }
          var i;
          var support;
          var Expr;
          var $;
          var isXML;
          var tokenize;
          var compile;
          var select;
          var outermostContext;
          var sortInput;
          var stability;
          var setDocument;
          var document;
          var docElem;
          var documentIsHTML;
          var rbuggyQSA;
          var rbuggyMatches;
          var matches;
          var contains;
          var expando = "sizzle" + 1 * new Date;
          var el = options.document;
          var dirruns = 0;
          var done = 0;
          var classCache = createCache();
          var next = createCache();
          var compilerCache = createCache();
          var tokenCache = createCache();
          var event = function(type, uuid) {
            return type === uuid && (stability = true), 0;
          };
          var hasOwn = {}.hasOwnProperty;
          var arr = [];
          var pop = arr.pop;
          var push_native = arr.push;
          var push = arr.push;
          var slice = arr.slice;
          var indexOf = function(list, value) {
            var i = 0;
            var listLength = list.length;
            for (; i < listLength; i++) {
              if (list[i] === value) {
                return i;
              }
            }
            return -1;
          };
          var value = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped";
          var pqEnc = "[\\x20\\t\\r\\n\\f]";
          var escRightBracket = "(?:\\\\[\\da-fA-F]{1,6}[\\x20\\t\\r\\n\\f]?|\\\\[^\\r\\n\\f]|[\\w-]|[^\x00-\\x7f])+";
          var _end2 = "\\[[\\x20\\t\\r\\n\\f]*(" + escRightBracket + ")(?:" + pqEnc + "*([*^$|!~]?=)" + pqEnc + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + escRightBracket + "))|)" + pqEnc + "*\\]";
          var pseudos = ":(" + escRightBracket + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + _end2 + ")*)|.*)\\)|)";
          var ucregex = new RegExp(pqEnc + "+", "g");
          var rtrim = new RegExp("^[\\x20\\t\\r\\n\\f]+|((?:^|[^\\\\])(?:\\\\.)*)[\\x20\\t\\r\\n\\f]+$", "g");
          var rquickIs = new RegExp("^[\\x20\\t\\r\\n\\f]*,[\\x20\\t\\r\\n\\f]*");
          var RE_PSEUDOS = new RegExp("^[\\x20\\t\\r\\n\\f]*([>+~]|[\\x20\\t\\r\\n\\f])[\\x20\\t\\r\\n\\f]*");
          var negativeRegex = new RegExp(pqEnc + "|>");
          var rpseudo = new RegExp(pseudos);
          var ridentifier = new RegExp("^" + escRightBracket + "$");
          var matchExpr = {
            ID : new RegExp("^#(" + escRightBracket + ")"),
            CLASS : new RegExp("^\\.(" + escRightBracket + ")"),
            TAG : new RegExp("^(" + escRightBracket + "|[*])"),
            ATTR : new RegExp("^" + _end2),
            PSEUDO : new RegExp("^" + pseudos),
            CHILD : new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\([\\x20\\t\\r\\n\\f]*(even|odd|(([+-]|)(\\d*)n|)[\\x20\\t\\r\\n\\f]*(?:([+-]|)[\\x20\\t\\r\\n\\f]*(\\d+)|))[\\x20\\t\\r\\n\\f]*\\)|)", "i"),
            bool : new RegExp("^(?:" + value + ")$", "i"),
            needsContext : new RegExp("^[\\x20\\t\\r\\n\\f]*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\([\\x20\\t\\r\\n\\f]*((?:-\\d)?\\d*)[\\x20\\t\\r\\n\\f]*\\)|)(?=[^-]|$)", "i")
          };
          var reKeyword = /HTML$/i;
          var inputNodeNames = /^(?:input|select|textarea|button)$/i;
          var rnoType = /^h\d$/i;
          var rnative = /^[^{]+\{\s*\[native \w/;
          var customSelectorReg = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/;
          var _ = /[+~]/;
          var a = new RegExp("\\\\[\\da-fA-F]{1,6}[\\x20\\t\\r\\n\\f]?|\\\\([^\\r\\n\\f])", "g");
          var name = function(handler, name) {
            var charCodeUpperA = "0x" + handler.slice(1) - 65536;
            return name || (charCodeUpperA < 0 ? String.fromCharCode(charCodeUpperA + 65536) : String.fromCharCode(charCodeUpperA >> 10 | 55296, 1023 & charCodeUpperA | 56320));
          };
          var rescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g;
          var fcssescape = function(text, ch) {
            return ch ? "\x00" === text ? "\ufffd" : text.slice(0, -1) + "\\" + text.charCodeAt(text.length - 1).toString(16) + " " : "\\" + text;
          };
          var unloadHandler = function() {
            setDocument();
          };
          var disabledAncestor = addCombinator(function(t) {
            return true === t.disabled && "fieldset" === t.nodeName.toLowerCase();
          }, {
            dir : "parentNode",
            next : "legend"
          });
          try {
            push.apply(arr = slice.call(el.childNodes), el.childNodes);
            arr[el.childNodes.length].nodeType;
          } catch (t) {
            push = {
              apply : arr.length ? function(target, array) {
                push_native.apply(target, slice.call(array));
              } : function(array, obj) {
                var length = array.length;
                var objCursor = 0;
                for (; array[length++] = obj[objCursor++];) {
                }
                array.length = length - 1;
              }
            };
          }
          for (i in support = Sizzle.support = {}, isXML = Sizzle.isXML = function(elem) {
            var nType = elem && elem.namespaceURI;
            var id = elem && (elem.ownerDocument || elem).documentElement;
            return !reKeyword.test(nType || id && id.nodeName || "HTML");
          }, setDocument = Sizzle.setDocument = function(root) {
            var e;
            var subWindow;
            var doc = root ? root.ownerDocument || root : el;
            return doc != document && 9 === doc.nodeType && doc.documentElement ? (docElem = (document = doc).documentElement, documentIsHTML = !isXML(document), el != document && (subWindow = document.defaultView) && subWindow.top !== subWindow && (subWindow.addEventListener ? subWindow.addEventListener("unload", unloadHandler, false) : subWindow.attachEvent && subWindow.attachEvent("onunload", unloadHandler)), support.scope = assert(function(elem) {
              return docElem.appendChild(elem).appendChild(document.createElement("div")), void 0 !== elem.querySelectorAll && !elem.querySelectorAll(":scope fieldset div").length;
            }), support.attributes = assert(function(elm) {
              return elm.className = "i", !elm.getAttribute("className");
            }), support.getElementsByTagName = assert(function(testee) {
              return testee.appendChild(document.createComment("")), !testee.getElementsByTagName("*").length;
            }), support.getElementsByClassName = rnative.test(document.getElementsByClassName), support.getById = assert(function(body) {
              return docElem.appendChild(body).id = expando, !document.getElementsByName || !document.getElementsByName(expando).length;
            }), support.getById ? (Expr.filter.ID = function(elem) {
              var i = elem.replace(a, name);
              return function(t) {
                return t.getAttribute("id") === i;
              };
            }, Expr.find.ID = function(elem, context) {
              if (void 0 !== context.getElementById && documentIsHTML) {
                var c_style = context.getElementById(elem);
                return c_style ? [c_style] : [];
              }
            }) : (Expr.filter.ID = function(elem) {
              var n = elem.replace(a, name);
              return function(elem) {
                var exported = void 0 !== elem.getAttributeNode && elem.getAttributeNode("id");
                return exported && exported.value === n;
              };
            }, Expr.find.ID = function(value, context) {
              if (void 0 !== context.getElementById && documentIsHTML) {
                var attr;
                var callbackCount;
                var _ref5;
                var m = context.getElementById(value);
                if (m) {
                  if ((attr = m.getAttributeNode("id")) && attr.value === value) {
                    return [m];
                  }
                  _ref5 = context.getElementsByName(value);
                  callbackCount = 0;
                  for (; m = _ref5[callbackCount++];) {
                    if ((attr = m.getAttributeNode("id")) && attr.value === value) {
                      return [m];
                    }
                  }
                }
                return [];
              }
            }), Expr.find.TAG = support.getElementsByTagName ? function(v, view) {
              return void 0 !== view.getElementsByTagName ? view.getElementsByTagName(v) : support.qsa ? view.querySelectorAll(v) : void 0;
            } : function(name, elem) {
              var arg;
              var results = [];
              var u = 0;
              var r = elem.getElementsByTagName(name);
              if ("*" === name) {
                for (; arg = r[u++];) {
                  if (1 === arg.nodeType) {
                    results.push(arg);
                  }
                }
                return results;
              }
              return r;
            }, Expr.find.CLASS = support.getElementsByClassName && function(name, titleDiv) {
              if (void 0 !== titleDiv.getElementsByClassName && documentIsHTML) {
                return titleDiv.getElementsByClassName(name);
              }
            }, rbuggyMatches = [], rbuggyQSA = [], (support.qsa = rnative.test(document.querySelectorAll)) && (assert(function(container) {
              var element;
              docElem.appendChild(container).innerHTML = "<a id='" + expando + "'></a><select id='" + expando + "-\r\\' msallowcapture=''><option selected=''></option></select>";
              if (container.querySelectorAll("[msallowcapture^='']").length) {
                rbuggyQSA.push("[*^$]=[\\x20\\t\\r\\n\\f]*(?:''|\"\")");
              }
              if (!container.querySelectorAll("[selected]").length) {
                rbuggyQSA.push("\\[[\\x20\\t\\r\\n\\f]*(?:value|" + value + ")");
              }
              if (!container.querySelectorAll("[id~=" + expando + "-]").length) {
                rbuggyQSA.push("~=");
              }
              (element = document.createElement("input")).setAttribute("name", "");
              container.appendChild(element);
              if (!container.querySelectorAll("[name='']").length) {
                rbuggyQSA.push("\\[[\\x20\\t\\r\\n\\f]*name[\\x20\\t\\r\\n\\f]*=[\\x20\\t\\r\\n\\f]*(?:''|\"\")");
              }
              if (!container.querySelectorAll(":checked").length) {
                rbuggyQSA.push(":checked");
              }
              if (!container.querySelectorAll("a#" + expando + "+*").length) {
                rbuggyQSA.push(".#.+[+~]");
              }
              container.querySelectorAll("\\\f");
              rbuggyQSA.push("[\\r\\n\\f]");
            }), assert(function(el) {
              el.innerHTML = "<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";
              var input = document.createElement("input");
              input.setAttribute("type", "hidden");
              el.appendChild(input).setAttribute("name", "D");
              if (el.querySelectorAll("[name=d]").length) {
                rbuggyQSA.push("name[\\x20\\t\\r\\n\\f]*[*^$|!~]?=");
              }
              if (2 !== el.querySelectorAll(":enabled").length) {
                rbuggyQSA.push(":enabled", ":disabled");
              }
              docElem.appendChild(el).disabled = true;
              if (2 !== el.querySelectorAll(":disabled").length) {
                rbuggyQSA.push(":enabled", ":disabled");
              }
              el.querySelectorAll("*,:x");
              rbuggyQSA.push(",.*:");
            })), (support.matchesSelector = rnative.test(matches = docElem.matches || docElem.webkitMatchesSelector || docElem.mozMatchesSelector || docElem.oMatchesSelector || docElem.msMatchesSelector)) && assert(function(el) {
              support.disconnectedMatch = matches.call(el, "*");
              matches.call(el, "[s!='']:x");
              rbuggyMatches.push("!=", pseudos);
            }), rbuggyQSA = rbuggyQSA.length && new RegExp(rbuggyQSA.join("|")), rbuggyMatches = rbuggyMatches.length && new RegExp(rbuggyMatches.join("|")), e = rnative.test(docElem.compareDocumentPosition), contains = e || rnative.test(docElem.contains) ? function(a, b) {
              var adown = 9 === a.nodeType ? a.documentElement : a;
              var bup = b && b.parentNode;
              return a === bup || !(!bup || 1 !== bup.nodeType || !(adown.contains ? adown.contains(bup) : a.compareDocumentPosition && 16 & a.compareDocumentPosition(bup)));
            } : function(selector, elem) {
              if (elem) {
                for (; elem = elem.parentNode;) {
                  if (elem === selector) {
                    return true;
                  }
                }
              }
              return false;
            }, event = e ? function(a, b) {
              if (a === b) {
                return stability = true, 0;
              }
              var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
              return compare || (1 & (compare = (a.ownerDocument || a) == (b.ownerDocument || b) ? a.compareDocumentPosition(b) : 1) || !support.sortDetached && b.compareDocumentPosition(a) === compare ? a == document || a.ownerDocument == el && contains(el, a) ? -1 : b == document || b.ownerDocument == el && contains(el, b) ? 1 : sortInput ? indexOf(sortInput, a) - indexOf(sortInput, b) : 0 : 4 & compare ? -1 : 1);
            } : function(a, b) {
              if (a === b) {
                return stability = true, 0;
              }
              var cur;
              var i = 0;
              var aup = a.parentNode;
              var bup = b.parentNode;
              var ap = [a];
              var bp = [b];
              if (!aup || !bup) {
                return a == document ? -1 : b == document ? 1 : aup ? -1 : bup ? 1 : sortInput ? indexOf(sortInput, a) - indexOf(sortInput, b) : 0;
              }
              if (aup === bup) {
                return siblingCheck(a, b);
              }
              cur = a;
              for (; cur = cur.parentNode;) {
                ap.unshift(cur);
              }
              cur = b;
              for (; cur = cur.parentNode;) {
                bp.unshift(cur);
              }
              for (; ap[i] === bp[i];) {
                i++;
              }
              return i ? siblingCheck(ap[i], bp[i]) : ap[i] == el ? -1 : bp[i] == el ? 1 : 0;
            }, document) : document;
          }, Sizzle.matches = function(expr, set) {
            return Sizzle(expr, null, null, set);
          }, Sizzle.matchesSelector = function(elem, selector) {
            if (setDocument(elem), support.matchesSelector && documentIsHTML && !tokenCache[selector + " "] && (!rbuggyMatches || !rbuggyMatches.test(selector)) && (!rbuggyQSA || !rbuggyQSA.test(selector))) {
              try {
                var ret = matches.call(elem, selector);
                if (ret || support.disconnectedMatch || elem.document && 11 !== elem.document.nodeType) {
                  return ret;
                }
              } catch (t) {
                tokenCache(selector, true);
              }
            }
            return Sizzle(selector, document, null, [elem]).length > 0;
          }, Sizzle.contains = function(context, elem) {
            return (context.ownerDocument || context) != document && setDocument(context), contains(context, elem);
          }, Sizzle.attr = function(elem, name) {
            if ((elem.ownerDocument || elem) != document) {
              setDocument(elem);
            }
            var fn = Expr.attrHandle[name.toLowerCase()];
            var val = fn && hasOwn.call(Expr.attrHandle, name.toLowerCase()) ? fn(elem, name, !documentIsHTML) : void 0;
            return void 0 !== val ? val : support.attributes || !documentIsHTML ? elem.getAttribute(name) : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null;
          }, Sizzle.escape = function(text) {
            return (text + "").replace(rescape, fcssescape);
          }, Sizzle.error = function(key) {
            throw new Error("Syntax error, unrecognized expression: " + key);
          }, Sizzle.uniqueSort = function(arr) {
            var v;
            var indices = [];
            var i = 0;
            var j = 0;
            if (stability = !support.detectDuplicates, sortInput = !support.sortStable && arr.slice(0), arr.sort(event), stability) {
              for (; v = arr[j++];) {
                if (v === arr[j]) {
                  i = indices.push(j);
                }
              }
              for (; i--;) {
                arr.splice(indices[i], 1);
              }
            }
            return sortInput = null, arr;
          }, $ = Sizzle.getText = function(t) {
            var parent;
            var y = "";
            var k = 0;
            var type = t.nodeType;
            if (type) {
              if (1 === type || 9 === type || 11 === type) {
                if ("string" == typeof t.textContent) {
                  return t.textContent;
                }
                t = t.firstChild;
                for (; t; t = t.nextSibling) {
                  y = y + $(t);
                }
              } else {
                if (3 === type || 4 === type) {
                  return t.nodeValue;
                }
              }
            } else {
              for (; parent = t[k++];) {
                y = y + $(parent);
              }
            }
            return y;
          }, Expr = Sizzle.selectors = {
            cacheLength : 50,
            createPseudo : markFunction,
            match : matchExpr,
            attrHandle : {},
            find : {},
            relative : {
              ">" : {
                dir : "parentNode",
                first : true
              },
              " " : {
                dir : "parentNode"
              },
              "+" : {
                dir : "previousSibling",
                first : true
              },
              "~" : {
                dir : "previousSibling"
              }
            },
            preFilter : {
              ATTR : function(result) {
                return result[1] = result[1].replace(a, name), result[3] = (result[3] || result[4] || result[5] || "").replace(a, name), "~=" === result[2] && (result[3] = " " + result[3] + " "), result.slice(0, 4);
              },
              CHILD : function(match) {
                return match[1] = match[1].toLowerCase(), "nth" === match[1].slice(0, 3) ? (match[3] || Sizzle.error(match[0]), match[4] = +(match[4] ? match[5] + (match[6] || 1) : 2 * ("even" === match[3] || "odd" === match[3])), match[5] = +(match[7] + match[8] || "odd" === match[3])) : match[3] && Sizzle.error(match[0]), match;
              },
              PSEUDO : function(match) {
                var excess;
                var unquoted = !match[6] && match[2];
                return matchExpr.CHILD.test(match[0]) ? null : (match[3] ? match[2] = match[4] || match[5] || "" : unquoted && rpseudo.test(unquoted) && (excess = tokenize(unquoted, true)) && (excess = unquoted.indexOf(")", unquoted.length - excess) - unquoted.length) && (match[0] = match[0].slice(0, excess), match[2] = unquoted.slice(0, excess)), match.slice(0, 3));
              }
            },
            filter : {
              TAG : function(elem) {
                var nodeName = elem.replace(a, name).toLowerCase();
                return "*" === elem ? function() {
                  return true;
                } : function(elem) {
                  return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
                };
              },
              CLASS : function(className) {
                var pattern = classCache[className + " "];
                return pattern || (pattern = new RegExp("(^|[\\x20\\t\\r\\n\\f])" + className + "(" + pqEnc + "|$)")) && classCache(className, function(t) {
                  return pattern.test("string" == typeof t.className && t.className || void 0 !== t.getAttribute && t.getAttribute("class") || "");
                });
              },
              ATTR : function(name, string, result) {
                return function(elem) {
                  var value = Sizzle.attr(elem, name);
                  return null == value ? "!=" === string : !string || (value = value + "", "=" === string ? value === result : "!=" === string ? value !== result : "^=" === string ? result && 0 === value.indexOf(result) : "*=" === string ? result && value.indexOf(result) > -1 : "$=" === string ? result && value.slice(-result.length) === result : "~=" === string ? (" " + value.replace(ucregex, " ") + " ").indexOf(result) > -1 : "|=" === string && (value === result || value.slice(0, result.length + 
                  1) === result + "-"));
                };
              },
              CHILD : function(type, what, argument, first, last) {
                var simple = "nth" !== type.slice(0, 3);
                var forward = "last" !== type.slice(-4);
                var isStrict = "of-type" === what;
                return 1 === first && 0 === last ? function(tplDiv) {
                  return !!tplDiv.parentNode;
                } : function(elem, n, isParentStrict) {
                  var cache;
                  var uniqueCache;
                  var outerCache;
                  var node;
                  var nodeIndex;
                  var start;
                  var dir = simple !== forward ? "nextSibling" : "previousSibling";
                  var parent = elem.parentNode;
                  var iteratedVal = isStrict && elem.nodeName.toLowerCase();
                  var dependency = !isParentStrict && !isStrict;
                  var diff = false;
                  if (parent) {
                    if (simple) {
                      for (; dir;) {
                        node = elem;
                        for (; node = node[dir];) {
                          if (isStrict ? node.nodeName.toLowerCase() === iteratedVal : 1 === node.nodeType) {
                            return false;
                          }
                        }
                        start = dir = "only" === type && !start && "nextSibling";
                      }
                      return true;
                    }
                    if (start = [forward ? parent.firstChild : parent.lastChild], forward && dependency) {
                      diff = (nodeIndex = (cache = (uniqueCache = (outerCache = (node = parent)[expando] || (node[expando] = {}))[node.uniqueID] || (outerCache[node.uniqueID] = {}))[type] || [])[0] === dirruns && cache[1]) && cache[2];
                      node = nodeIndex && parent.childNodes[nodeIndex];
                      for (; node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop();) {
                        if (1 === node.nodeType && ++diff && node === elem) {
                          uniqueCache[type] = [dirruns, nodeIndex, diff];
                          break;
                        }
                      }
                    } else {
                      if (dependency && (diff = nodeIndex = (cache = (uniqueCache = (outerCache = (node = elem)[expando] || (node[expando] = {}))[node.uniqueID] || (outerCache[node.uniqueID] = {}))[type] || [])[0] === dirruns && cache[1]), false === diff) {
                        for (; (node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop()) && ((isStrict ? node.nodeName.toLowerCase() !== iteratedVal : 1 !== node.nodeType) || !++diff || (dependency && ((uniqueCache = (outerCache = node[expando] || (node[expando] = {}))[node.uniqueID] || (outerCache[node.uniqueID] = {}))[type] = [dirruns, diff]), node !== elem));) {
                        }
                      }
                    }
                    return (diff = diff - last) === first || diff % first == 0 && diff / first >= 0;
                  }
                };
              },
              PSEUDO : function(pseudo, argument) {
                var args;
                var fn = Expr.pseudos[pseudo] || Expr.setFilters[pseudo.toLowerCase()] || Sizzle.error("unsupported pseudo: " + pseudo);
                return fn[expando] ? fn(argument) : fn.length > 1 ? (args = [pseudo, pseudo, "", argument], Expr.setFilters.hasOwnProperty(pseudo.toLowerCase()) ? markFunction(function(seed, result) {
                  var j;
                  var matched = fn(seed, argument);
                  var i = matched.length;
                  for (; i--;) {
                    seed[j = indexOf(seed, matched[i])] = !(result[j] = matched[i]);
                  }
                }) : function(responce) {
                  return fn(responce, 0, args);
                }) : fn;
              }
            },
            pseudos : {
              not : markFunction(function(selector) {
                var a = [];
                var results = [];
                var matcher = compile(selector.replace(rtrim, "$1"));
                return matcher[expando] ? markFunction(function(a, leftbuffer, n, context) {
                  var value;
                  var result = matcher(a, null, context, []);
                  var i = a.length;
                  for (; i--;) {
                    if (value = result[i]) {
                      a[i] = !(leftbuffer[i] = value);
                    }
                  }
                }) : function(sNewObjName, canCreateDiscussions, context) {
                  return a[0] = sNewObjName, matcher(a, null, context, results), a[0] = null, !results.pop();
                };
              }),
              has : markFunction(function(selector) {
                return function(elem) {
                  return Sizzle(selector, elem).length > 0;
                };
              }),
              contains : markFunction(function(t) {
                return t = t.replace(a, name), function(element) {
                  return (element.textContent || $(element)).indexOf(t) > -1;
                };
              }),
              lang : markFunction(function(lang) {
                return ridentifier.test(lang || "") || Sizzle.error("unsupported lang: " + lang), lang = lang.replace(a, name).toLowerCase(), function(elem) {
                  var elemLang;
                  do {
                    if (elemLang = documentIsHTML ? elem.lang : elem.getAttribute("xml:lang") || elem.getAttribute("lang")) {
                      return (elemLang = elemLang.toLowerCase()) === lang || 0 === elemLang.indexOf(lang + "-");
                    }
                  } while ((elem = elem.parentNode) && 1 === elem.nodeType);
                  return false;
                };
              }),
              target : function(key) {
                var charListNotLatin = options.location && options.location.hash;
                return charListNotLatin && charListNotLatin.slice(1) === key.id;
              },
              root : function(elem) {
                return elem === docElem;
              },
              focus : function(elem) {
                return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
              },
              enabled : createDisabledPseudo(false),
              disabled : createDisabledPseudo(true),
              checked : function(elem) {
                var custom = elem.nodeName.toLowerCase();
                return "input" === custom && !!elem.checked || "option" === custom && !!elem.selected;
              },
              selected : function(elem) {
                return elem.parentNode && elem.parentNode.selectedIndex, true === elem.selected;
              },
              empty : function(elem) {
                elem = elem.firstChild;
                for (; elem; elem = elem.nextSibling) {
                  if (elem.nodeType < 6) {
                    return false;
                  }
                }
                return true;
              },
              parent : function(elem) {
                return !Expr.pseudos.empty(elem);
              },
              header : function(elem) {
                return rnoType.test(elem.nodeName);
              },
              input : function(target) {
                return inputNodeNames.test(target.nodeName);
              },
              button : function(elem) {
                var left = elem.nodeName.toLowerCase();
                return "input" === left && "button" === elem.type || "button" === left;
              },
              text : function(elem) {
                var EXT;
                return "input" === elem.nodeName.toLowerCase() && "text" === elem.type && (null == (EXT = elem.getAttribute("type")) || "text" === EXT.toLowerCase());
              },
              first : createPositionalPseudo(function() {
                return [0];
              }),
              last : createPositionalPseudo(function(canCreateDiscussions, isSlidingUp) {
                return [isSlidingUp - 1];
              }),
              eq : createPositionalPseudo(function(canCreateDiscussions, pageHeight, srcY) {
                return [srcY < 0 ? srcY + pageHeight : srcY];
              }),
              even : createPositionalPseudo(function(lastshuffle, inclusiveMin) {
                var value = 0;
                for (; value < inclusiveMin; value = value + 2) {
                  lastshuffle.push(value);
                }
                return lastshuffle;
              }),
              odd : createPositionalPseudo(function(lastshuffle, inclusiveMin) {
                var value = 1;
                for (; value < inclusiveMin; value = value + 2) {
                  lastshuffle.push(value);
                }
                return lastshuffle;
              }),
              lt : createPositionalPseudo(function(newNodeLists, max, value) {
                var itemNodeList = value < 0 ? value + max : value > max ? max : value;
                for (; --itemNodeList >= 0;) {
                  newNodeLists.push(itemNodeList);
                }
                return newNodeLists;
              }),
              gt : createPositionalPseudo(function(newNodeLists, pageHeight, srcY) {
                var itemNodeList = srcY < 0 ? srcY + pageHeight : srcY;
                for (; ++itemNodeList < pageHeight;) {
                  newNodeLists.push(itemNodeList);
                }
                return newNodeLists;
              })
            }
          }, Expr.pseudos.nth = Expr.pseudos.eq, {
            radio : true,
            checkbox : true,
            file : true,
            password : true,
            image : true
          }) {
            Expr.pseudos[i] = run(i);
          }
          for (i in{
            submit : true,
            reset : true
          }) {
            Expr.pseudos[i] = createButtonPseudo(i);
          }
          return setFilters.prototype = Expr.filters = Expr.pseudos, Expr.setFilters = new setFilters, tokenize = Sizzle.tokenize = function(node, root) {
            var e;
            var match;
            var tokens;
            var type;
            var selector;
            var groups;
            var preFilters;
            var name = next[node + " "];
            if (name) {
              return root ? 0 : name.slice(0);
            }
            selector = node;
            groups = [];
            preFilters = Expr.preFilter;
            for (; selector;) {
              for (type in e && !(match = rquickIs.exec(selector)) || (match && (selector = selector.slice(match[0].length) || selector), groups.push(tokens = [])), e = false, (match = RE_PSEUDOS.exec(selector)) && (e = match.shift(), tokens.push({
                value : e,
                type : match[0].replace(rtrim, " ")
              }), selector = selector.slice(e.length)), Expr.filter) {
                if (!(!(match = matchExpr[type].exec(selector)) || preFilters[type] && !(match = preFilters[type](match)))) {
                  e = match.shift();
                  tokens.push({
                    value : e,
                    type : type,
                    matches : match
                  });
                  selector = selector.slice(e.length);
                }
              }
              if (!e) {
                break;
              }
            }
            return root ? selector.length : selector ? Sizzle.error(node) : next(node, groups).slice(0);
          }, compile = Sizzle.compile = function(selector, group) {
            var i;
            var setMatchers = [];
            var elementMatchers = [];
            var cached = compilerCache[selector + " "];
            if (!cached) {
              if (!group) {
                group = tokenize(selector);
              }
              i = group.length;
              for (; i--;) {
                if ((cached = matcherFromTokens(group[i]))[expando]) {
                  setMatchers.push(cached);
                } else {
                  elementMatchers.push(cached);
                }
              }
              cached = compilerCache(selector, function(elementMatchers, setMatchers) {
                var bySet = setMatchers.length > 0;
                var byElement = elementMatchers.length > 0;
                var superMatcher = function(seed, context, xml, results, outermost) {
                  var elem;
                  var j;
                  var matcher;
                  var matchedCount = 0;
                  var i = "0";
                  var unmatched = seed && [];
                  var data = [];
                  var contextBackup = outermostContext;
                  var elems = seed || byElement && Expr.find.TAG("*", outermost);
                  var dirrunsUnique = dirruns = dirruns + (null == contextBackup ? 1 : Math.random() || .1);
                  var length = elems.length;
                  if (outermost) {
                    outermostContext = context == document || context || outermost;
                  }
                  for (; i !== length && null != (elem = elems[i]); i++) {
                    if (byElement && elem) {
                      j = 0;
                      if (!(context || elem.ownerDocument == document)) {
                        setDocument(elem);
                        xml = !documentIsHTML;
                      }
                      for (; matcher = elementMatchers[j++];) {
                        if (matcher(elem, context || document, xml)) {
                          results.push(elem);
                          break;
                        }
                      }
                      if (outermost) {
                        dirruns = dirrunsUnique;
                      }
                    }
                    if (bySet) {
                      if (elem = !matcher && elem) {
                        matchedCount--;
                      }
                      if (seed) {
                        unmatched.push(elem);
                      }
                    }
                  }
                  if (matchedCount = matchedCount + i, bySet && i !== matchedCount) {
                    j = 0;
                    for (; matcher = setMatchers[j++];) {
                      matcher(unmatched, data, context, xml);
                    }
                    if (seed) {
                      if (matchedCount > 0) {
                        for (; i--;) {
                          if (!(unmatched[i] || data[i])) {
                            data[i] = pop.call(results);
                          }
                        }
                      }
                      data = get(data);
                    }
                    push.apply(results, data);
                    if (outermost && !seed && data.length > 0 && matchedCount + setMatchers.length > 1) {
                      Sizzle.uniqueSort(results);
                    }
                  }
                  return outermost && (dirruns = dirrunsUnique, outermostContext = contextBackup), unmatched;
                };
                return bySet ? markFunction(superMatcher) : superMatcher;
              }(elementMatchers, setMatchers));
              cached.selector = selector;
            }
            return cached;
          }, select = Sizzle.select = function(selector, context, results, seed) {
            var i;
            var tokens;
            var token;
            var type;
            var callback;
            var compiled = "function" == typeof selector && selector;
            var match = !seed && tokenize(selector = compiled.selector || selector);
            if (results = results || [], 1 === match.length) {
              if ((tokens = match[0] = match[0].slice(0)).length > 2 && "ID" === (token = tokens[0]).type && 9 === context.nodeType && documentIsHTML && Expr.relative[tokens[1].type]) {
                if (!(context = (Expr.find.ID(token.matches[0].replace(a, name), context) || [])[0])) {
                  return results;
                }
                if (compiled) {
                  context = context.parentNode;
                }
                selector = selector.slice(tokens.shift().value.length);
              }
              i = matchExpr.needsContext.test(selector) ? 0 : tokens.length;
              for (; i-- && (token = tokens[i], !Expr.relative[type = token.type]);) {
                if ((callback = Expr.find[type]) && (seed = callback(token.matches[0].replace(a, name), _.test(tokens[0].type) && testContext(context.parentNode) || context))) {
                  if (tokens.splice(i, 1), !(selector = seed.length && toSelector(tokens))) {
                    return push.apply(results, seed), results;
                  }
                  break;
                }
              }
            }
            return (compiled || compile(selector, match))(seed, context, !documentIsHTML, results, !context || _.test(selector) && testContext(context.parentNode) || context), results;
          }, support.sortStable = expando.split("").sort(event).join("") === expando, support.detectDuplicates = !!stability, setDocument(), support.sortDetached = assert(function(html) {
            return 1 & html.compareDocumentPosition(document.createElement("fieldset"));
          }), assert(function(aItem) {
            return aItem.innerHTML = "<a href='#'></a>", "#" === aItem.firstChild.getAttribute("href");
          }) || addHandle("type|href|height|width", function(t, e, n) {
            if (!n) {
              return t.getAttribute(e, "type" === e.toLowerCase() ? 1 : 2);
            }
          }), support.attributes && assert(function(aItem) {
            return aItem.innerHTML = "<input/>", aItem.firstChild.setAttribute("value", ""), "" === aItem.firstChild.getAttribute("value");
          }) || addHandle("value", function(src, canCreateDiscussions, n) {
            if (!n && "input" === src.nodeName.toLowerCase()) {
              return src.defaultValue;
            }
          }), assert(function(t) {
            return null == t.getAttribute("disabled");
          }) || addHandle(value, function(elem, name, n) {
            var val;
            if (!n) {
              return true === elem[name] ? name.toLowerCase() : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null;
            }
          }), Sizzle;
        }(window);
        jQuery.find = Sizzle;
        jQuery.expr = Sizzle.selectors;
        jQuery.expr[":"] = jQuery.expr.pseudos;
        jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
        jQuery.text = Sizzle.getText;
        jQuery.isXMLDoc = Sizzle.isXML;
        jQuery.contains = Sizzle.contains;
        jQuery.escapeSelector = Sizzle.escape;
        var dir = function(elem, dir, name) {
          var matched = [];
          var o = void 0 !== name;
          for (; (elem = elem[dir]) && 9 !== elem.nodeType;) {
            if (1 === elem.nodeType) {
              if (o && jQuery(elem).is(name)) {
                break;
              }
              matched.push(elem);
            }
          }
          return matched;
        };
        var _sibling = function(node, elem) {
          var result = [];
          for (; node; node = node.nextSibling) {
            if (1 === node.nodeType && node !== elem) {
              result.push(node);
            }
          }
          return result;
        };
        var rneedsContext = jQuery.expr.match.needsContext;
        var rsingleTag = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;
        jQuery.filter = function(expr, elems, not) {
          var elem = elems[0];
          return not && (expr = ":not(" + expr + ")"), 1 === elems.length && 1 === elem.nodeType ? jQuery.find.matchesSelector(elem, expr) ? [elem] : [] : jQuery.find.matches(expr, jQuery.grep(elems, function(nodeToInspect) {
            return 1 === nodeToInspect.nodeType;
          }));
        };
        jQuery.fn.extend({
          find : function(value) {
            var i;
            var ret;
            var len = this.length;
            var self = this;
            if ("string" != typeof value) {
              return this.pushStack(jQuery(value).filter(function() {
                i = 0;
                for (; i < len; i++) {
                  if (jQuery.contains(self[i], this)) {
                    return true;
                  }
                }
              }));
            }
            ret = this.pushStack([]);
            i = 0;
            for (; i < len; i++) {
              jQuery.find(value, self[i], ret);
            }
            return len > 1 ? jQuery.uniqueSort(ret) : ret;
          },
          filter : function(name) {
            return this.pushStack(winnow(this, name || [], false));
          },
          not : function(selector) {
            return this.pushStack(winnow(this, selector || [], true));
          },
          is : function(message) {
            return !!winnow(this, "string" == typeof message && rneedsContext.test(message) ? jQuery(message) : message || [], false).length;
          }
        });
        var rootjQuery;
        var customSelectorReg = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;
        (jQuery.fn.init = function(selector, context, root) {
          var match;
          var o;
          if (!selector) {
            return this;
          }
          if (root = root || rootjQuery, "string" == typeof selector) {
            if (!(match = "<" === selector[0] && ">" === selector[selector.length - 1] && selector.length >= 3 ? [null, selector, null] : customSelectorReg.exec(selector)) || !match[1] && context) {
              return !context || context.jquery ? (context || root).find(selector) : this.constructor(context).find(selector);
            }
            if (match[1]) {
              if (context = context instanceof jQuery ? context[0] : context, jQuery.merge(this, jQuery.parseHTML(match[1], context && context.nodeType ? context.ownerDocument || context : document, true)), rsingleTag.test(match[1]) && jQuery.isPlainObject(context)) {
                for (match in context) {
                  if (isFunction(this[match])) {
                    this[match](context[match]);
                  } else {
                    this.attr(match, context[match]);
                  }
                }
              }
              return this;
            }
            return (o = document.getElementById(match[2])) && (this[0] = o, this.length = 1), this;
          }
          return selector.nodeType ? (this[0] = selector, this.length = 1, this) : isFunction(selector) ? void 0 !== root.ready ? root.ready(selector) : selector(jQuery) : jQuery.makeArray(selector, this);
        }).prototype = jQuery.fn;
        rootjQuery = jQuery(document);
        var testRxp = /^(?:parents|prev(?:Until|All))/;
        var guaranteedUnique = {
          children : true,
          contents : true,
          next : true,
          prev : true
        };
        jQuery.fn.extend({
          has : function(t) {
            var obj = jQuery(t, this);
            var l = obj.length;
            return this.filter(function() {
              var i = 0;
              for (; i < l; i++) {
                if (jQuery.contains(this, obj[i])) {
                  return true;
                }
              }
            });
          },
          closest : function(selector, context) {
            var cur;
            var i = 0;
            var l = this.length;
            var ret = [];
            var pos = "string" != typeof selector && jQuery(selector);
            if (!rneedsContext.test(selector)) {
              for (; i < l; i++) {
                cur = this[i];
                for (; cur && cur !== context; cur = cur.parentNode) {
                  if (cur.nodeType < 11 && (pos ? pos.index(cur) > -1 : 1 === cur.nodeType && jQuery.find.matchesSelector(cur, selector))) {
                    ret.push(cur);
                    break;
                  }
                }
              }
            }
            return this.pushStack(ret.length > 1 ? jQuery.uniqueSort(ret) : ret);
          },
          index : function(elem) {
            return elem ? "string" == typeof elem ? indexOf.call(jQuery(elem), this[0]) : indexOf.call(this, elem.jquery ? elem[0] : elem) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
          },
          add : function(elem, context) {
            return this.pushStack(jQuery.uniqueSort(jQuery.merge(this.get(), jQuery(elem, context))));
          },
          addBack : function(selector) {
            return this.add(null == selector ? this.prevObject : this.prevObject.filter(selector));
          }
        });
        jQuery.each({
          parent : function(elem) {
            var parent = elem.parentNode;
            return parent && 11 !== parent.nodeType ? parent : null;
          },
          parents : function(elem) {
            return dir(elem, "parentNode");
          },
          parentsUntil : function(elem, i, until) {
            return dir(elem, "parentNode", until);
          },
          next : function(elem) {
            return sibling(elem, "nextSibling");
          },
          prev : function(elem) {
            return sibling(elem, "previousSibling");
          },
          nextAll : function(elem) {
            return dir(elem, "nextSibling");
          },
          prevAll : function(elem) {
            return dir(elem, "previousSibling");
          },
          nextUntil : function(elem, i, until) {
            return dir(elem, "nextSibling", until);
          },
          prevUntil : function(elem, i, until) {
            return dir(elem, "previousSibling", until);
          },
          siblings : function(elem) {
            return _sibling((elem.parentNode || {}).firstChild, elem);
          },
          children : function(elem) {
            return _sibling(elem.firstChild);
          },
          contents : function(elem) {
            return null != elem.contentDocument && getProto(elem.contentDocument) ? elem.contentDocument : (callback(elem, "template") && (elem = elem.content || elem), jQuery.merge([], elem.childNodes));
          }
        }, function(name, e) {
          jQuery.fn[name] = function(index, target) {
            var ret = jQuery.map(this, e, index);
            return "Until" !== name.slice(-5) && (target = index), target && "string" == typeof target && (ret = jQuery.filter(target, ret)), this.length > 1 && (guaranteedUnique[name] || jQuery.uniqueSort(ret), testRxp.test(name) && ret.reverse()), this.pushStack(ret);
          };
        });
        var context = /[^\x20\t\r\n\f]+/g;
        jQuery.Callbacks = function(options) {
          options = "string" == typeof options ? function(t) {
            var subwikiListsCache = {};
            return jQuery.each(t.match(context) || [], function(canCreateDiscussions, wikiId) {
              subwikiListsCache[wikiId] = true;
            }), subwikiListsCache;
          }(options) : jQuery.extend({}, options);
          var e;
          var n;
          var evOrig;
          var t;
          var c = [];
          var s = [];
          var b = -1;
          var fire = function() {
            t = t || options.once;
            evOrig = e = true;
            for (; s.length; b = -1) {
              n = s.shift();
              for (; ++b < c.length;) {
                if (false === c[b].apply(n[0], n[1]) && options.stopOnFalse) {
                  b = c.length;
                  n = false;
                }
              }
            }
            if (!options.memory) {
              n = false;
            }
            e = false;
            if (t) {
              c = n ? [] : "";
            }
          };
          var self = {
            add : function() {
              return c && (n && !e && (b = c.length - 1, s.push(n)), function add(callback) {
                jQuery.each(callback, function(n, name) {
                  if (isFunction(name)) {
                    if (!(options.unique && self.has(name))) {
                      c.push(name);
                    }
                  } else {
                    if (name && name.length && "string" !== type(name)) {
                      add(name);
                    }
                  }
                });
              }(arguments), n && !e && fire()), this;
            },
            remove : function() {
              return jQuery.each(arguments, function(canCreateDiscussions, img) {
                var a;
                for (; (a = jQuery.inArray(img, c, a)) > -1;) {
                  c.splice(a, 1);
                  if (a <= b) {
                    b--;
                  }
                }
              }), this;
            },
            has : function(className) {
              return className ? jQuery.inArray(className, c) > -1 : c.length > 0;
            },
            empty : function() {
              return c && (c = []), this;
            },
            disable : function() {
              return t = s = [], c = n = "", this;
            },
            disabled : function() {
              return !c;
            },
            lock : function() {
              return t = s = [], n || e || (c = n = ""), this;
            },
            locked : function() {
              return !!t;
            },
            fireWith : function(context, args) {
              return t || (args = [context, (args = args || []).slice ? args.slice() : args], s.push(args), e || fire()), this;
            },
            fire : function() {
              return self.fireWith(this, arguments), this;
            },
            fired : function() {
              return !!evOrig;
            }
          };
          return self;
        };
        jQuery.extend({
          Deferred : function(func) {
            var d = [["notify", "progress", jQuery.Callbacks("memory"), jQuery.Callbacks("memory"), 2], ["resolve", "done", jQuery.Callbacks("once memory"), jQuery.Callbacks("once memory"), 0, "resolved"], ["reject", "fail", jQuery.Callbacks("once memory"), jQuery.Callbacks("once memory"), 1, "rejected"]];
            var state = "pending";
            var promise = {
              state : function() {
                return state;
              },
              always : function() {
                return deferred.done(arguments).fail(arguments), this;
              },
              catch : function(fn) {
                return promise.then(null, fn);
              },
              pipe : function() {
                var fns = arguments;
                return jQuery.Deferred(function(newDefer) {
                  jQuery.each(d, function(canCreateDiscussions, tuple) {
                    var fn = isFunction(fns[tuple[4]]) && fns[tuple[4]];
                    deferred[tuple[1]](function() {
                      var returned = fn && fn.apply(this, arguments);
                      if (returned && isFunction(returned.promise)) {
                        returned.promise().progress(newDefer.notify).done(newDefer.resolve).fail(newDefer.reject);
                      } else {
                        newDefer[tuple[0] + "With"](this, fn ? [returned] : arguments);
                      }
                    });
                  });
                  fns = null;
                }).promise();
              },
              then : function(error, fn, handler) {
                function callback(i, options, view, args) {
                  return function() {
                    var elem = this;
                    var values = arguments;
                    var apply = function() {
                      var value;
                      var self;
                      if (!(i < id)) {
                        if ((value = view.apply(elem, values)) === options.promise()) {
                          throw new TypeError("Thenable self-resolution");
                        }
                        self = value && ("object" == typeof value || "function" == typeof value) && value.then;
                        if (isFunction(self)) {
                          if (args) {
                            self.call(value, callback(id, options, v, args), callback(id, options, undefined, args));
                          } else {
                            id++;
                            self.call(value, callback(id, options, v, args), callback(id, options, undefined, args), callback(id, options, v, options.notifyWith));
                          }
                        } else {
                          if (view !== v) {
                            elem = void 0;
                            values = [value];
                          }
                          (args || options.resolveWith)(elem, values);
                        }
                      }
                    };
                    var method = args ? apply : function() {
                      try {
                        apply();
                      } catch (scheduled) {
                        if (jQuery.Deferred.exceptionHook) {
                          jQuery.Deferred.exceptionHook(scheduled, method.stackTrace);
                        }
                        if (i + 1 >= id) {
                          if (view !== undefined) {
                            elem = void 0;
                            values = [scheduled];
                          }
                          options.rejectWith(elem, values);
                        }
                      }
                    };
                    if (i) {
                      method();
                    } else {
                      if (jQuery.Deferred.getStackHook) {
                        method.stackTrace = jQuery.Deferred.getStackHook();
                      }
                      window.setTimeout(method);
                    }
                  };
                }
                var id = 0;
                return jQuery.Deferred(function(self) {
                  d[0][3].add(callback(0, self, isFunction(handler) ? handler : v, self.notifyWith));
                  d[1][3].add(callback(0, self, isFunction(error) ? error : v));
                  d[2][3].add(callback(0, self, isFunction(fn) ? fn : undefined));
                }).promise();
              },
              promise : function(context) {
                return null != context ? jQuery.extend(context, promise) : promise;
              }
            };
            var deferred = {};
            return jQuery.each(d, function(s, tuple) {
              var list = tuple[2];
              var stateString = tuple[5];
              promise[tuple[1]] = list.add;
              if (stateString) {
                list.add(function() {
                  state = stateString;
                }, d[3 - s][2].disable, d[3 - s][3].disable, d[0][2].lock, d[0][3].lock);
              }
              list.add(tuple[3].fire);
              deferred[tuple[0]] = function() {
                return deferred[tuple[0] + "With"](this === deferred ? void 0 : this, arguments), this;
              };
              deferred[tuple[0] + "With"] = list.fireWith;
            }), promise.promise(deferred), func && func.call(deferred, deferred), deferred;
          },
          when : function(ok) {
            var sampleSize = arguments.length;
            var i = sampleSize;
            var elements = Array(i);
            var args = slice.call(arguments);
            var self = jQuery.Deferred();
            var callback = function(index) {
              return function(value) {
                elements[index] = this;
                args[index] = arguments.length > 1 ? slice.call(arguments) : value;
                if (!--sampleSize) {
                  self.resolveWith(elements, args);
                }
              };
            };
            if (sampleSize <= 1 && (require(ok, self.done(callback(i)).resolve, self.reject, !sampleSize), "pending" === self.state() || isFunction(args[i] && args[i].then))) {
              return self.then();
            }
            for (; i--;) {
              require(args[i], callback(i), self.reject);
            }
            return self.promise();
          }
        });
        var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
        jQuery.Deferred.exceptionHook = function(error, stack) {
          if (window.console && window.console.warn && error && rerrorNames.test(error.name)) {
            window.console.warn("jQuery.Deferred exception: " + error.message, error.stack, stack);
          }
        };
        jQuery.readyException = function(error) {
          window.setTimeout(function() {
            throw error;
          });
        };
        var f = jQuery.Deferred();
        jQuery.fn.ready = function(t) {
          return f.then(t).catch(function(t) {
            jQuery.readyException(t);
          }), this;
        };
        jQuery.extend({
          isReady : false,
          readyWait : 1,
          ready : function(user) {
            if (!(true === user ? --jQuery.readyWait : jQuery.isReady)) {
              jQuery.isReady = true;
              if (!(true !== user && --jQuery.readyWait > 0)) {
                f.resolveWith(document, [jQuery]);
              }
            }
          }
        });
        jQuery.ready.then = f.then;
        if ("complete" === document.readyState || "loading" !== document.readyState && !document.documentElement.doScroll) {
          window.setTimeout(jQuery.ready);
        } else {
          document.addEventListener("DOMContentLoaded", $__jsx_onload);
          window.addEventListener("load", $__jsx_onload);
        }
        var access = function(elems, fn, key, value, chainable, emptyGet, raw) {
          var i = 0;
          var len = elems.length;
          var bulk = null == key;
          if ("object" === type(key)) {
            for (i in chainable = true, key) {
              access(elems, fn, i, key[i], true, emptyGet, raw);
            }
          } else {
            if (void 0 !== value && (chainable = true, isFunction(value) || (raw = true), bulk && (raw ? (fn.call(elems, value), fn = null) : (bulk = fn, fn = function(elem, e, value) {
              return bulk.call(jQuery(elem), value);
            })), fn)) {
              for (; i < len; i++) {
                fn(elems[i], key, raw ? value : value.call(elems[i], i, fn(elems[i], key)));
              }
            }
          }
          return chainable ? elems : bulk ? fn.call(elems) : len ? fn(elems[0], key) : emptyGet;
        };
        var _kerningNamesHash_escapeEscape = /^-ms-/;
        var rcharset = /-([a-z])/g;
        var acceptData = function(elem) {
          return 1 === elem.nodeType || 9 === elem.nodeType || !+elem.nodeType;
        };
        Data.uid = 1;
        Data.prototype = {
          cache : function(elem) {
            var value = elem[this.expando];
            return value || (value = {}, acceptData(elem) && (elem.nodeType ? elem[this.expando] = value : Object.defineProperty(elem, this.expando, {
              value : value,
              configurable : true
            }))), value;
          },
          set : function(key, value, str) {
            var name;
            var obj = this.cache(key);
            if ("string" == typeof value) {
              obj[camelCase(value)] = str;
            } else {
              for (name in value) {
                obj[camelCase(name)] = value[name];
              }
            }
            return obj;
          },
          get : function(data, key) {
            return void 0 === key ? this.cache(data) : data[this.expando] && data[this.expando][camelCase(key)];
          },
          access : function(value, fn, key) {
            return void 0 === fn || fn && "string" == typeof fn && void 0 === key ? this.get(value, fn) : (this.set(value, fn, key), void 0 !== key ? key : fn);
          },
          remove : function(owner, name) {
            var i;
            var cache = owner[this.expando];
            if (void 0 !== cache) {
              if (void 0 !== name) {
                i = (name = Array.isArray(name) ? name.map(camelCase) : (name = camelCase(name)) in cache ? [name] : name.match(context) || []).length;
                for (; i--;) {
                  delete cache[name[i]];
                }
              }
              if (void 0 === name || jQuery.isEmptyObject(cache)) {
                if (owner.nodeType) {
                  owner[this.expando] = void 0;
                } else {
                  delete owner[this.expando];
                }
              }
            }
          },
          hasData : function(owner) {
            var cache = owner[this.expando];
            return void 0 !== cache && !jQuery.isEmptyObject(cache);
          }
        };
        var dataPriv = new Data;
        var data_priv = new Data;
        var contribRegex = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/;
        var dashExpr = /[A-Z]/g;
        jQuery.extend({
          hasData : function(elem) {
            return data_priv.hasData(elem) || dataPriv.hasData(elem);
          },
          data : function(key, name, data) {
            return data_priv.access(key, name, data);
          },
          removeData : function(elem, name) {
            data_priv.remove(elem, name);
          },
          _data : function(elem, name, data) {
            return dataPriv.access(elem, name, data);
          },
          _removeData : function(elem, name) {
            dataPriv.remove(elem, name);
          }
        });
        jQuery.fn.extend({
          data : function(key, value) {
            var w;
            var name;
            var cache;
            var elem = this[0];
            var root = elem && elem.attributes;
            if (void 0 === key) {
              if (this.length && (cache = data_priv.get(elem), 1 === elem.nodeType && !dataPriv.get(elem, "hasDataAttrs"))) {
                w = root.length;
                for (; w--;) {
                  if (root[w] && 0 === (name = root[w].name).indexOf("data-")) {
                    name = camelCase(name.slice(5));
                    render(elem, name, cache[name]);
                  }
                }
                dataPriv.set(elem, "hasDataAttrs", true);
              }
              return cache;
            }
            return "object" == typeof key ? this.each(function() {
              data_priv.set(this, key);
            }) : access(this, function(data) {
              var element;
              if (elem && void 0 === data) {
                return void 0 !== (element = data_priv.get(elem, key)) || void 0 !== (element = render(elem, key)) ? element : void 0;
              }
              this.each(function() {
                data_priv.set(this, key, data);
              });
            }, null, value, arguments.length > 1, null, true);
          },
          removeData : function(key) {
            return this.each(function() {
              data_priv.remove(this, key);
            });
          }
        });
        jQuery.extend({
          queue : function(elem, type, data) {
            var q;
            if (elem) {
              return type = (type || "fx") + "queue", q = dataPriv.get(elem, type), data && (!q || Array.isArray(data) ? q = dataPriv.access(elem, type, jQuery.makeArray(data)) : q.push(data)), q || [];
            }
          },
          dequeue : function(elem, type) {
            type = type || "fx";
            var queue = jQuery.queue(elem, type);
            var i = queue.length;
            var listener = queue.shift();
            var handle = jQuery._queueHooks(elem, type);
            if ("inprogress" === listener) {
              listener = queue.shift();
              i--;
            }
            if (listener) {
              if ("fx" === type) {
                queue.unshift("inprogress");
              }
              delete handle.stop;
              listener.call(elem, function() {
                jQuery.dequeue(elem, type);
              }, handle);
            }
            if (!i && handle) {
              handle.empty.fire();
            }
          },
          _queueHooks : function(elem, type) {
            var key = type + "queueHooks";
            return dataPriv.get(elem, key) || dataPriv.access(elem, key, {
              empty : jQuery.Callbacks("once memory").add(function() {
                dataPriv.remove(elem, [type + "queue", key]);
              })
            });
          }
        });
        jQuery.fn.extend({
          queue : function(type, data) {
            var setter = 2;
            return "string" != typeof type && (data = type, type = "fx", setter--), arguments.length < setter ? jQuery.queue(this[0], type) : void 0 === data ? this : this.each(function() {
              var queue = jQuery.queue(this, type, data);
              jQuery._queueHooks(this, type);
              if ("fx" === type && "inprogress" !== queue[0]) {
                jQuery.dequeue(this, type);
              }
            });
          },
          dequeue : function(type) {
            return this.each(function() {
              jQuery.dequeue(this, type);
            });
          },
          clearQueue : function(type) {
            return this.queue(type || "fx", []);
          },
          promise : function(type, obj) {
            var sel;
            var l = 1;
            var defer = jQuery.Deferred();
            var elements = this;
            var i = this.length;
            var resolve = function() {
              if (!--l) {
                defer.resolveWith(elements, [elements]);
              }
            };
            if ("string" != typeof type) {
              obj = type;
              type = void 0;
            }
            type = type || "fx";
            for (; i--;) {
              if ((sel = dataPriv.get(elements[i], type + "queueHooks")) && sel.empty) {
                l++;
                sel.empty.add(resolve);
              }
            }
            return resolve(), defer.promise(obj);
          }
        });
        var FSSource = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source;
        var regex = new RegExp("^(?:([+-])=|)(" + FSSource + ")([a-z%]*)$", "i");
        var cssExpand = ["Top", "Right", "Bottom", "Left"];
        var node = document.documentElement;
        var get = function(elem) {
          return jQuery.contains(elem.ownerDocument, elem);
        };
        var _prefName = {
          composed : true
        };
        if (node.getRootNode) {
          get = function(p) {
            return jQuery.contains(p.ownerDocument, p) || p.getRootNode(_prefName) === p.ownerDocument;
          };
        }
        var isHidden = function(elem, el) {
          return "none" === (elem = el || elem).style.display || "" === elem.style.display && get(elem) && "none" === jQuery.css(elem, "display");
        };
        var defaultDisplayMap = {};
        jQuery.fn.extend({
          show : function() {
            return showHide(this, true);
          },
          hide : function() {
            return showHide(this);
          },
          toggle : function(state) {
            return "boolean" == typeof state ? state ? this.show() : this.hide() : this.each(function() {
              if (isHidden(this)) {
                jQuery(this).show();
              } else {
                jQuery(this).hide();
              }
            });
          }
        });
        var content_elem;
        var input;
        var path = /^(?:checkbox|radio)$/i;
        var fullLinkRegex = /<([a-z][^\/\0>\x20\t\r\n\f]*)/i;
        var opacityRe = /^$|^module$|\/(?:java|ecma)script/i;
        content_elem = document.createDocumentFragment().appendChild(document.createElement("div"));
        (input = document.createElement("input")).setAttribute("type", "radio");
        input.setAttribute("checked", "checked");
        input.setAttribute("name", "t");
        content_elem.appendChild(input);
        support.checkClone = content_elem.cloneNode(true).cloneNode(true).lastChild.checked;
        content_elem.innerHTML = "<textarea>x</textarea>";
        support.noCloneChecked = !!content_elem.cloneNode(true).lastChild.defaultValue;
        content_elem.innerHTML = "<option></option>";
        support.option = !!content_elem.lastChild;
        var wrapMap = {
          thead : [1, "<table>", "</table>"],
          col : [2, "<table><colgroup>", "</colgroup></table>"],
          tr : [2, "<table><tbody>", "</tbody></table>"],
          td : [3, "<table><tbody><tr>", "</tr></tbody></table>"],
          _default : [0, "", ""]
        };
        wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
        wrapMap.th = wrapMap.td;
        if (!support.option) {
          wrapMap.optgroup = wrapMap.option = [1, "<select multiple='multiple'>", "</select>"];
        }
        var re_commas = /<|&#?\w+;/;
        var result = /^([^.]*)(?:\.(.+)|)/;
        jQuery.event = {
          global : {},
          add : function(elem, item, handler, data, selector) {
            var handleObjIn;
            var eventHandle;
            var BROWSER_ENGINES;
            var events;
            var i;
            var handleObj;
            var special;
            var handlers;
            var type;
            var h;
            var origType;
            var elemData = dataPriv.get(elem);
            if (acceptData(elem)) {
              if (handler.handler) {
                handler = (handleObjIn = handler).handler;
                selector = handleObjIn.selector;
              }
              if (selector) {
                jQuery.find.matchesSelector(node, selector);
              }
              if (!handler.guid) {
                handler.guid = jQuery.guid++;
              }
              if (!(events = elemData.events)) {
                events = elemData.events = Object.create(null);
              }
              if (!(eventHandle = elemData.handle)) {
                eventHandle = elemData.handle = function(e) {
                  return void 0 !== jQuery && jQuery.event.triggered !== e.type ? jQuery.event.dispatch.apply(elem, arguments) : void 0;
                };
              }
              i = (item = (item || "").match(context) || [""]).length;
              for (; i--;) {
                type = origType = (BROWSER_ENGINES = result.exec(item[i]) || [])[1];
                h = (BROWSER_ENGINES[2] || "").split(".").sort();
                if (type) {
                  special = jQuery.event.special[type] || {};
                  type = (selector ? special.delegateType : special.bindType) || type;
                  special = jQuery.event.special[type] || {};
                  handleObj = jQuery.extend({
                    type : type,
                    origType : origType,
                    data : data,
                    handler : handler,
                    guid : handler.guid,
                    selector : selector,
                    needsContext : selector && jQuery.expr.match.needsContext.test(selector),
                    namespace : h.join(".")
                  }, handleObjIn);
                  if (!(handlers = events[type])) {
                    (handlers = events[type] = []).delegateCount = 0;
                    if (!(special.setup && false !== special.setup.call(elem, data, h, eventHandle))) {
                      if (elem.addEventListener) {
                        elem.addEventListener(type, eventHandle);
                      }
                    }
                  }
                  if (special.add) {
                    special.add.call(elem, handleObj);
                    if (!handleObj.handler.guid) {
                      handleObj.handler.guid = handler.guid;
                    }
                  }
                  if (selector) {
                    handlers.splice(handlers.delegateCount++, 0, handleObj);
                  } else {
                    handlers.push(handleObj);
                  }
                  jQuery.event.global[type] = true;
                }
              }
            }
          },
          remove : function(elem, data, fn, selector, mappedTypes) {
            var i;
            var _;
            var tmp;
            var events;
            var t;
            var handleObj;
            var special;
            var handlers;
            var type;
            var h;
            var origType;
            var elemData = dataPriv.hasData(elem) && dataPriv.get(elem);
            if (elemData && (events = elemData.events)) {
              t = (data = (data || "").match(context) || [""]).length;
              for (; t--;) {
                if (type = origType = (tmp = result.exec(data[t]) || [])[1], h = (tmp[2] || "").split(".").sort(), type) {
                  special = jQuery.event.special[type] || {};
                  handlers = events[type = (selector ? special.delegateType : special.bindType) || type] || [];
                  tmp = tmp[2] && new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)");
                  _ = i = handlers.length;
                  for (; i--;) {
                    handleObj = handlers[i];
                    if (!(!mappedTypes && origType !== handleObj.origType || fn && fn.guid !== handleObj.guid || tmp && !tmp.test(handleObj.namespace) || selector && selector !== handleObj.selector && ("**" !== selector || !handleObj.selector))) {
                      handlers.splice(i, 1);
                      if (handleObj.selector) {
                        handlers.delegateCount--;
                      }
                      if (special.remove) {
                        special.remove.call(elem, handleObj);
                      }
                    }
                  }
                  if (_ && !handlers.length) {
                    if (!(special.teardown && false !== special.teardown.call(elem, h, elemData.handle))) {
                      jQuery.removeEvent(elem, type, elemData.handle);
                    }
                    delete events[type];
                  }
                } else {
                  for (type in events) {
                    jQuery.event.remove(elem, type + data[t], fn, selector, true);
                  }
                }
              }
              if (jQuery.isEmptyObject(events)) {
                dataPriv.remove(elem, "handle events");
              }
            }
          },
          dispatch : function(e) {
            var i;
            var j;
            var ret;
            var matched;
            var handleObj;
            var handlerQueue;
            var args = new Array(arguments.length);
            var event = jQuery.event.fix(e);
            var handlers = (dataPriv.get(this, "events") || Object.create(null))[event.type] || [];
            var special = jQuery.event.special[event.type] || {};
            args[0] = event;
            i = 1;
            for (; i < arguments.length; i++) {
              args[i] = arguments[i];
            }
            if (event.delegateTarget = this, !special.preDispatch || false !== special.preDispatch.call(this, event)) {
              handlerQueue = jQuery.event.handlers.call(this, event, handlers);
              i = 0;
              for (; (matched = handlerQueue[i++]) && !event.isPropagationStopped();) {
                event.currentTarget = matched.elem;
                j = 0;
                for (; (handleObj = matched.handlers[j++]) && !event.isImmediatePropagationStopped();) {
                  if (!(event.rnamespace && false !== handleObj.namespace && !event.rnamespace.test(handleObj.namespace))) {
                    event.handleObj = handleObj;
                    event.data = handleObj.data;
                    if (void 0 !== (ret = ((jQuery.event.special[handleObj.origType] || {}).handle || handleObj.handler).apply(matched.elem, args)) && false === (event.result = ret)) {
                      event.preventDefault();
                      event.stopPropagation();
                    }
                  }
                }
              }
              return special.postDispatch && special.postDispatch.call(this, event), event.result;
            }
          },
          handlers : function(event, handlers) {
            var i;
            var handleObj;
            var name;
            var matches;
            var fieldOrdinals;
            var handlerQueue = [];
            var delegateCount = handlers.delegateCount;
            var cur = event.target;
            if (delegateCount && cur.nodeType && !("click" === event.type && event.button >= 1)) {
              for (; cur !== this; cur = cur.parentNode || this) {
                if (1 === cur.nodeType && ("click" !== event.type || true !== cur.disabled)) {
                  matches = [];
                  fieldOrdinals = {};
                  i = 0;
                  for (; i < delegateCount; i++) {
                    if (void 0 === fieldOrdinals[name = (handleObj = handlers[i]).selector + " "]) {
                      fieldOrdinals[name] = handleObj.needsContext ? jQuery(name, this).index(cur) > -1 : jQuery.find(name, this, null, [cur]).length;
                    }
                    if (fieldOrdinals[name]) {
                      matches.push(handleObj);
                    }
                  }
                  if (matches.length) {
                    handlerQueue.push({
                      elem : cur,
                      handlers : matches
                    });
                  }
                }
              }
            }
            return cur = this, delegateCount < handlers.length && handlerQueue.push({
              elem : cur,
              handlers : handlers.slice(delegateCount)
            }), handlerQueue;
          },
          addProp : function(name, hook) {
            Object.defineProperty(jQuery.Event.prototype, name, {
              enumerable : true,
              configurable : true,
              get : isFunction(hook) ? function() {
                if (this.originalEvent) {
                  return hook(this.originalEvent);
                }
              } : function() {
                if (this.originalEvent) {
                  return this.originalEvent[name];
                }
              },
              set : function(type) {
                Object.defineProperty(this, name, {
                  enumerable : true,
                  configurable : true,
                  writable : true,
                  value : type
                });
              }
            });
          },
          fix : function(originalEvent) {
            return originalEvent[jQuery.expando] ? originalEvent : new jQuery.Event(originalEvent);
          },
          special : {
            load : {
              noBubble : true
            },
            click : {
              setup : function(t) {
                var type = this || t;
                return path.test(type.type) && type.click && callback(type, "input") && on(type, "click", returnTrue), false;
              },
              trigger : function(type) {
                var icon = this || type;
                return path.test(icon.type) && icon.click && callback(icon, "input") && on(icon, "click"), true;
              },
              _default : function(event) {
                var node = event.target;
                return path.test(node.type) && node.click && callback(node, "input") && dataPriv.get(node, "click") || callback(node, "a");
              }
            },
            beforeunload : {
              postDispatch : function(event) {
                if (void 0 !== event.result && event.originalEvent) {
                  event.originalEvent.returnValue = event.result;
                }
              }
            }
          }
        };
        jQuery.removeEvent = function(e, type, cb) {
          if (e.removeEventListener) {
            e.removeEventListener(type, cb);
          }
        };
        jQuery.Event = function(src, props) {
          if (!(this instanceof jQuery.Event)) {
            return new jQuery.Event(src, props);
          }
          if (src && src.type) {
            this.originalEvent = src;
            this.type = src.type;
            this.isDefaultPrevented = src.defaultPrevented || void 0 === src.defaultPrevented && false === src.returnValue ? returnTrue : returnFalse;
            this.target = src.target && 3 === src.target.nodeType ? src.target.parentNode : src.target;
            this.currentTarget = src.currentTarget;
            this.relatedTarget = src.relatedTarget;
          } else {
            this.type = src;
          }
          if (props) {
            jQuery.extend(this, props);
          }
          this.timeStamp = src && src.timeStamp || Date.now();
          this[jQuery.expando] = true;
        };
        jQuery.Event.prototype = {
          constructor : jQuery.Event,
          isDefaultPrevented : returnFalse,
          isPropagationStopped : returnFalse,
          isImmediatePropagationStopped : returnFalse,
          isSimulated : false,
          preventDefault : function() {
            var e = this.originalEvent;
            this.isDefaultPrevented = returnTrue;
            if (e && !this.isSimulated) {
              e.preventDefault();
            }
          },
          stopPropagation : function() {
            var e = this.originalEvent;
            this.isPropagationStopped = returnTrue;
            if (e && !this.isSimulated) {
              e.stopPropagation();
            }
          },
          stopImmediatePropagation : function() {
            var e = this.originalEvent;
            this.isImmediatePropagationStopped = returnTrue;
            if (e && !this.isSimulated) {
              e.stopImmediatePropagation();
            }
            this.stopPropagation();
          }
        };
        jQuery.each({
          altKey : true,
          bubbles : true,
          cancelable : true,
          changedTouches : true,
          ctrlKey : true,
          detail : true,
          eventPhase : true,
          metaKey : true,
          pageX : true,
          pageY : true,
          shiftKey : true,
          view : true,
          char : true,
          code : true,
          charCode : true,
          key : true,
          keyCode : true,
          button : true,
          buttons : true,
          clientX : true,
          clientY : true,
          offsetX : true,
          offsetY : true,
          pointerId : true,
          pointerType : true,
          screenX : true,
          screenY : true,
          targetTouches : true,
          toElement : true,
          touches : true,
          which : true
        }, jQuery.event.addProp);
        jQuery.each({
          focus : "focusin",
          blur : "focusout"
        }, function(name, fix) {
          jQuery.event.special[name] = {
            setup : function() {
              return on(this, name, moveHandler), false;
            },
            trigger : function() {
              return on(this, name), true;
            },
            _default : function() {
              return true;
            },
            delegateType : fix
          };
        });
        jQuery.each({
          mouseenter : "mouseover",
          mouseleave : "mouseout",
          pointerenter : "pointerover",
          pointerleave : "pointerout"
        }, function(orig, fix) {
          jQuery.event.special[orig] = {
            delegateType : fix,
            bindType : fix,
            handle : function(event) {
              var _ref12;
              var document = this;
              var b = event.relatedTarget;
              var handleObj = event.handleObj;
              return b && (b === document || jQuery.contains(document, b)) || (event.type = handleObj.origType, _ref12 = handleObj.handler.apply(this, arguments), event.type = fix), _ref12;
            }
          };
        });
        jQuery.fn.extend({
          on : function(type, event, data, callback) {
            return bind(this, type, event, data, callback);
          },
          one : function(event, callback, name, handler) {
            return bind(this, event, callback, name, handler, 1);
          },
          off : function(types, callback, fn) {
            var handleObj;
            var type;
            if (types && types.preventDefault && types.handleObj) {
              return handleObj = types.handleObj, jQuery(types.delegateTarget).off(handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType, handleObj.selector, handleObj.handler), this;
            }
            if ("object" == typeof types) {
              for (type in types) {
                this.off(type, callback, types[type]);
              }
              return this;
            }
            return false !== callback && "function" != typeof callback || (fn = callback, callback = void 0), false === fn && (fn = returnFalse), this.each(function() {
              jQuery.event.remove(this, types, fn, callback);
            });
          }
        });
        var _tacet = /<script|<style|<link/i;
        var partten = /checked\s*(?:[^=]|=\s*.checked.)/i;
        var query = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
        jQuery.extend({
          htmlPrefilter : function(html) {
            return html;
          },
          clone : function(elem, n, array) {
            var i;
            var l;
            var srcElements;
            var destElements;
            var clone = elem.cloneNode(true);
            var inPage = get(elem);
            if (!(support.noCloneChecked || 1 !== elem.nodeType && 11 !== elem.nodeType || jQuery.isXMLDoc(elem))) {
              destElements = getAll(clone);
              i = 0;
              l = (srcElements = getAll(elem)).length;
              for (; i < l; i++) {
                fixInput(srcElements[i], destElements[i]);
              }
            }
            if (n) {
              if (array) {
                srcElements = srcElements || getAll(elem);
                destElements = destElements || getAll(clone);
                i = 0;
                l = srcElements.length;
                for (; i < l; i++) {
                  cloneCopyEvent(srcElements[i], destElements[i]);
                }
              } else {
                cloneCopyEvent(elem, clone);
              }
            }
            return (destElements = getAll(clone, "script")).length > 0 && setGlobalEval(destElements, !inPage && getAll(elem, "script")), clone;
          },
          cleanData : function(elems) {
            var data;
            var elem;
            var type;
            var special = jQuery.event.special;
            var i = 0;
            for (; void 0 !== (elem = elems[i]); i++) {
              if (acceptData(elem)) {
                if (data = elem[dataPriv.expando]) {
                  if (data.events) {
                    for (type in data.events) {
                      if (special[type]) {
                        jQuery.event.remove(elem, type);
                      } else {
                        jQuery.removeEvent(elem, type, data.handle);
                      }
                    }
                  }
                  elem[dataPriv.expando] = void 0;
                }
                if (elem[data_priv.expando]) {
                  elem[data_priv.expando] = void 0;
                }
              }
            }
          }
        });
        jQuery.fn.extend({
          detach : function(f) {
            return remove(this, f, true);
          },
          remove : function(elem) {
            return remove(this, elem);
          },
          text : function(value) {
            return access(this, function(value) {
              return void 0 === value ? jQuery.text(this) : this.empty().each(function() {
                if (!(1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType)) {
                  this.textContent = value;
                }
              });
            }, null, value, arguments.length);
          },
          append : function() {
            return domManip(this, arguments, function(elem) {
              if (!(1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType)) {
                manipulationTarget(this, elem).appendChild(elem);
              }
            });
          },
          prepend : function() {
            return domManip(this, arguments, function(elem) {
              if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                var target = manipulationTarget(this, elem);
                target.insertBefore(elem, target.firstChild);
              }
            });
          },
          before : function() {
            return domManip(this, arguments, function(elem) {
              if (this.parentNode) {
                this.parentNode.insertBefore(elem, this);
              }
            });
          },
          after : function() {
            return domManip(this, arguments, function(elem) {
              if (this.parentNode) {
                this.parentNode.insertBefore(elem, this.nextSibling);
              }
            });
          },
          empty : function() {
            var node;
            var PARENT_NODE = 0;
            for (; null != (node = this[PARENT_NODE]); PARENT_NODE++) {
              if (1 === node.nodeType) {
                jQuery.cleanData(getAll(node, false));
                node.textContent = "";
              }
            }
            return this;
          },
          clone : function(value, options) {
            return value = null != value && value, options = null == options ? value : options, this.map(function() {
              return jQuery.clone(this, value, options);
            });
          },
          html : function(value) {
            return access(this, function(value) {
              var elem = this[0] || {};
              var thatpos = 0;
              var i = this.length;
              if (void 0 === value && 1 === elem.nodeType) {
                return elem.innerHTML;
              }
              if ("string" == typeof value && !_tacet.test(value) && !wrapMap[(fullLinkRegex.exec(value) || ["", ""])[1].toLowerCase()]) {
                value = jQuery.htmlPrefilter(value);
                try {
                  for (; thatpos < i; thatpos++) {
                    if (1 === (elem = this[thatpos] || {}).nodeType) {
                      jQuery.cleanData(getAll(elem, false));
                      elem.innerHTML = value;
                    }
                  }
                  elem = 0;
                } catch (t) {
                }
              }
              if (elem) {
                this.empty().append(value);
              }
            }, null, value, arguments.length);
          },
          replaceWith : function() {
            var ignored = [];
            return domManip(this, arguments, function(e) {
              var div = this.parentNode;
              if (jQuery.inArray(this, ignored) < 0) {
                jQuery.cleanData(getAll(this));
                if (div) {
                  div.replaceChild(e, this);
                }
              }
            }, ignored);
          }
        });
        jQuery.each({
          appendTo : "append",
          prependTo : "prepend",
          insertBefore : "before",
          insertAfter : "after",
          replaceAll : "replaceWith"
        }, function(original, name) {
          jQuery.fn[original] = function(path) {
            var param;
            var ret = [];
            var a = jQuery(path);
            var last = a.length - 1;
            var i = 0;
            for (; i <= last; i++) {
              param = i === last ? this : this.clone(true);
              jQuery(a[i])[name](param);
              push.apply(ret, param.get());
            }
            return this.pushStack(ret);
          };
        });
        var rnumnonpx = new RegExp("^(" + FSSource + ")(?!px)[a-z%]+$", "i");
        var getStyles = function(elem) {
          var win = elem.ownerDocument.defaultView;
          return win && win.opener || (win = window), win.getComputedStyle(elem);
        };
        var swap = function(context, obj, position) {
          var removed;
          var key;
          var pyobj = {};
          for (key in obj) {
            pyobj[key] = context.style[key];
            context.style[key] = obj[key];
          }
          for (key in removed = position.call(context), obj) {
            context.style[key] = pyobj[key];
          }
          return removed;
        };
        var inlineAttributeIgnoreCommentRegex = new RegExp(cssExpand.join("|"), "i");
        !function() {
          function computeStyleTests() {
            if (div) {
              parent.style.cssText = "position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0";
              div.style.cssText = "position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%";
              node.appendChild(parent).appendChild(div);
              var style = window.getComputedStyle(div);
              res = "1%" !== style.top;
              l = 12 === parseRound(style.marginLeft);
              div.style.right = "60%";
              s = 36 === parseRound(style.right);
              o = 36 === parseRound(style.width);
              div.style.position = "absolute";
              r = 12 === parseRound(div.offsetWidth / 3);
              node.removeChild(parent);
              div = null;
            }
          }
          function parseRound(fontSize) {
            return Math.round(parseFloat(fontSize));
          }
          var res;
          var o;
          var r;
          var s;
          var a;
          var l;
          var parent = document.createElement("div");
          var div = document.createElement("div");
          if (div.style) {
            div.style.backgroundClip = "content-box";
            div.cloneNode(true).style.backgroundClip = "";
            support.clearCloneStyle = "content-box" === div.style.backgroundClip;
            jQuery.extend(support, {
              boxSizingReliable : function() {
                return computeStyleTests(), o;
              },
              pixelBoxStyles : function() {
                return computeStyleTests(), s;
              },
              pixelPosition : function() {
                return computeStyleTests(), res;
              },
              reliableMarginLeft : function() {
                return computeStyleTests(), l;
              },
              scrollboxSize : function() {
                return computeStyleTests(), r;
              },
              reliableTrDimensions : function() {
                var parent;
                var div;
                var n;
                var cs;
                return null == a && (parent = document.createElement("table"), div = document.createElement("tr"), n = document.createElement("div"), parent.style.cssText = "position:absolute;left:-11111px;border-collapse:separate", div.style.cssText = "border:1px solid", div.style.height = "1px", n.style.height = "9px", n.style.display = "block", node.appendChild(parent).appendChild(div).appendChild(n), cs = window.getComputedStyle(div), a = parseInt(cs.height, 10) + parseInt(cs.borderTopWidth, 
                10) + parseInt(cs.borderBottomWidth, 10) === div.offsetHeight, node.removeChild(parent)), a;
              }
            });
          }
        }();
        var prefixes = ["Webkit", "Moz", "ms"];
        var testStyle = document.createElement("div").style;
        var aSupports = {};
        var rdisplayswap = /^(none|table(?!-c[ea]).+)/;
        var ngTranslationProvider = /^--/;
        var cssShow = {
          position : "absolute",
          visibility : "hidden",
          display : "block"
        };
        var cssNormalTransform = {
          letterSpacing : "0",
          fontWeight : "400"
        };
        jQuery.extend({
          cssHooks : {
            opacity : {
              get : function(elem, data) {
                if (data) {
                  var to = curCSS(elem, "opacity");
                  return "" === to ? "1" : to;
                }
              }
            }
          },
          cssNumber : {
            animationIterationCount : true,
            columnCount : true,
            fillOpacity : true,
            flexGrow : true,
            flexShrink : true,
            fontWeight : true,
            gridArea : true,
            gridColumn : true,
            gridColumnEnd : true,
            gridColumnStart : true,
            gridRow : true,
            gridRowEnd : true,
            gridRowStart : true,
            lineHeight : true,
            opacity : true,
            order : true,
            orphans : true,
            widows : true,
            zIndex : true,
            zoom : true
          },
          cssProps : {},
          style : function(elem, name, value, extra) {
            if (elem && 3 !== elem.nodeType && 8 !== elem.nodeType && elem.style) {
              var ret;
              var type;
              var hooks;
              var prop = camelCase(name);
              var versionByName = ngTranslationProvider.test(name);
              var style = elem.style;
              if (versionByName || (name = camelize(prop)), hooks = jQuery.cssHooks[name] || jQuery.cssHooks[prop], void 0 === value) {
                return hooks && "get" in hooks && void 0 !== (ret = hooks.get(elem, false, extra)) ? ret : style[name];
              }
              if ("string" === (type = typeof value) && (ret = regex.exec(value)) && ret[1]) {
                value = adjustCSS(elem, name, ret);
                type = "number";
              }
              if (null != value && value == value) {
                if (!("number" !== type || versionByName)) {
                  value = value + (ret && ret[3] || (jQuery.cssNumber[prop] ? "" : "px"));
                }
                if (!(support.clearCloneStyle || "" !== value || 0 !== name.indexOf("background"))) {
                  style[name] = "inherit";
                }
                if (!(hooks && "set" in hooks && void 0 === (value = hooks.set(elem, value, extra)))) {
                  if (versionByName) {
                    style.setProperty(name, value);
                  } else {
                    style[name] = value;
                  }
                }
              }
            }
          },
          css : function(key, name, value, styles) {
            var val;
            var length;
            var hooks;
            var prop = camelCase(name);
            return ngTranslationProvider.test(name) || (name = camelize(prop)), (hooks = jQuery.cssHooks[name] || jQuery.cssHooks[prop]) && "get" in hooks && (val = hooks.get(key, true, value)), void 0 === val && (val = curCSS(key, name, styles)), "normal" === val && name in cssNormalTransform && (val = cssNormalTransform[name]), "" === value || value ? (length = parseFloat(val), true === value || isFinite(length) ? length || 0 : val) : val;
          }
        });
        jQuery.each(["height", "width"], function(canCreateDiscussions, name) {
          jQuery.cssHooks[name] = {
            get : function(elem, data, options) {
              if (data) {
                return !rdisplayswap.test(jQuery.css(elem, "display")) || elem.getClientRects().length && elem.getBoundingClientRect().width ? load(elem, name, options) : swap(elem, cssShow, function() {
                  return load(elem, name, options);
                });
              }
            },
            set : function(elem, value, extra) {
              var m;
              var styles = getStyles(elem);
              var extraPrefix = !support.scrollboxSize() && "absolute" === styles.position;
              var valueIsBorderBox = (extraPrefix || extra) && "border-box" === jQuery.css(elem, "boxSizing", false, styles);
              var i = extra ? augmentWidthOrHeight(elem, name, extra, valueIsBorderBox, styles) : 0;
              return valueIsBorderBox && extraPrefix && (i = i - Math.ceil(elem["offset" + name[0].toUpperCase() + name.slice(1)] - parseFloat(styles[name]) - augmentWidthOrHeight(elem, name, "border", false, styles) - .5)), i && (m = regex.exec(value)) && "px" !== (m[3] || "px") && (elem.style[name] = value, value = jQuery.css(elem, name)), set(0, value, i);
            }
          };
        });
        jQuery.cssHooks.marginLeft = addGetHookIf(support.reliableMarginLeft, function(elem, canCreateDiscussions) {
          if (canCreateDiscussions) {
            return (parseFloat(curCSS(elem, "marginLeft")) || elem.getBoundingClientRect().left - swap(elem, {
              marginLeft : 0
            }, function() {
              return elem.getBoundingClientRect().left;
            })) + "px";
          }
        });
        jQuery.each({
          margin : "",
          padding : "",
          border : "Width"
        }, function(prefix, suffix) {
          jQuery.cssHooks[prefix + suffix] = {
            expand : function(expected) {
              var i = 0;
              var expanded = {};
              var stops = "string" == typeof expected ? expected.split(" ") : [expected];
              for (; i < 4; i++) {
                expanded[prefix + cssExpand[i] + suffix] = stops[i] || stops[i - 2] || stops[0];
              }
              return expanded;
            }
          };
          if ("margin" !== prefix) {
            jQuery.cssHooks[prefix + suffix].set = set;
          }
        });
        jQuery.fn.extend({
          css : function(name, value) {
            return access(this, function(elem, name, undefined) {
              var styles;
              var l;
              var map = {};
              var i = 0;
              if (Array.isArray(name)) {
                styles = getStyles(elem);
                l = name.length;
                for (; i < l; i++) {
                  map[name[i]] = jQuery.css(elem, name[i], false, styles);
                }
                return map;
              }
              return void 0 !== undefined ? jQuery.style(elem, name, undefined) : jQuery.css(elem, name);
            }, name, value, arguments.length > 1);
          }
        });
        jQuery.Tween = Tween;
        Tween.prototype = {
          constructor : Tween,
          init : function(node, options, prop, end, easing, unit) {
            this.elem = node;
            this.prop = prop;
            this.easing = easing || jQuery.easing._default;
            this.options = options;
            this.start = this.now = this.cur();
            this.end = end;
            this.unit = unit || (jQuery.cssNumber[prop] ? "" : "px");
          },
          cur : function() {
            var hooks = Tween.propHooks[this.prop];
            return hooks && hooks.get ? hooks.get(this) : Tween.propHooks._default.get(this);
          },
          run : function(percent) {
            var eased;
            var hooks = Tween.propHooks[this.prop];
            return this.options.duration ? this.pos = eased = jQuery.easing[this.easing](percent, this.options.duration * percent, 0, 1, this.options.duration) : this.pos = eased = percent, this.now = (this.end - this.start) * eased + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), hooks && hooks.set ? hooks.set(this) : Tween.propHooks._default.set(this), this;
          }
        };
        Tween.prototype.init.prototype = Tween.prototype;
        Tween.propHooks = {
          _default : {
            get : function(s) {
              var fitWidth;
              return 1 !== s.elem.nodeType || null != s.elem[s.prop] && null == s.elem.style[s.prop] ? s.elem[s.prop] : (fitWidth = jQuery.css(s.elem, s.prop, "")) && "auto" !== fitWidth ? fitWidth : 0;
            },
            set : function(tween) {
              if (jQuery.fx.step[tween.prop]) {
                jQuery.fx.step[tween.prop](tween);
              } else {
                if (1 !== tween.elem.nodeType || !jQuery.cssHooks[tween.prop] && null == tween.elem.style[camelize(tween.prop)]) {
                  tween.elem[tween.prop] = tween.now;
                } else {
                  jQuery.style(tween.elem, tween.prop, tween.now + tween.unit);
                }
              }
            }
          }
        };
        Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
          set : function(tween) {
            if (tween.elem.nodeType && tween.elem.parentNode) {
              tween.elem[tween.prop] = tween.now;
            }
          }
        };
        jQuery.easing = {
          linear : function(p) {
            return p;
          },
          swing : function(p) {
            return .5 - Math.cos(p * Math.PI) / 2;
          },
          _default : "swing"
        };
        jQuery.fx = Tween.prototype.init;
        jQuery.fx.step = {};
        var fxNow;
        var source;
        var trueRE = /^(?:toggle|show|hide)$/;
        var rrun = /queueHooks$/;
        jQuery.Animation = jQuery.extend(Animation, {
          tweeners : {
            "*" : [function(prop, value) {
              var tween = this.createTween(prop, value);
              return adjustCSS(tween.elem, prop, regex.exec(value), tween), tween;
            }]
          },
          tweener : function(props, callback) {
            if (isFunction(props)) {
              callback = props;
              props = ["*"];
            } else {
              props = props.match(context);
            }
            var prop;
            var i = 0;
            var inputsSize = props.length;
            for (; i < inputsSize; i++) {
              prop = props[i];
              Animation.tweeners[prop] = Animation.tweeners[prop] || [];
              Animation.tweeners[prop].unshift(callback);
            }
          },
          prefilters : [function(elem, props, config) {
            var prop;
            var value;
            var matched;
            var hooks;
            var oldfire;
            var tween;
            var restoreDisplay;
            var display;
            var f = "width" in props || "height" in props;
            var anim = this;
            var orig = {};
            var style = elem.style;
            var hidden = elem.nodeType && isHidden(elem);
            var dataShow = dataPriv.get(elem, "fxshow");
            for (prop in config.queue || (null == (hooks = jQuery._queueHooks(elem, "fx")).unqueued && (hooks.unqueued = 0, oldfire = hooks.empty.fire, hooks.empty.fire = function() {
              if (!hooks.unqueued) {
                oldfire();
              }
            }), hooks.unqueued++, anim.always(function() {
              anim.always(function() {
                hooks.unqueued--;
                if (!jQuery.queue(elem, "fx").length) {
                  hooks.empty.fire();
                }
              });
            })), props) {
              if (value = props[prop], trueRE.test(value)) {
                if (delete props[prop], matched = matched || "toggle" === value, value === (hidden ? "hide" : "show")) {
                  if ("show" !== value || !dataShow || void 0 === dataShow[prop]) {
                    continue;
                  }
                  hidden = true;
                }
                orig[prop] = dataShow && dataShow[prop] || jQuery.style(elem, prop);
              }
            }
            if ((tween = !jQuery.isEmptyObject(props)) || !jQuery.isEmptyObject(orig)) {
              for (prop in f && 1 === elem.nodeType && (config.overflow = [style.overflow, style.overflowX, style.overflowY], null == (restoreDisplay = dataShow && dataShow.display) && (restoreDisplay = dataPriv.get(elem, "display")), "none" === (display = jQuery.css(elem, "display")) && (restoreDisplay ? display = restoreDisplay : (showHide([elem], true), restoreDisplay = elem.style.display || restoreDisplay, display = jQuery.css(elem, "display"), showHide([elem]))), ("inline" === display || "inline-block" === 
              display && null != restoreDisplay) && "none" === jQuery.css(elem, "float") && (tween || (anim.done(function() {
                style.display = restoreDisplay;
              }), null == restoreDisplay && (display = style.display, restoreDisplay = "none" === display ? "" : display)), style.display = "inline-block")), config.overflow && (style.overflow = "hidden", anim.always(function() {
                style.overflow = config.overflow[0];
                style.overflowX = config.overflow[1];
                style.overflowY = config.overflow[2];
              })), tween = false, orig) {
                if (!tween) {
                  if (dataShow) {
                    if ("hidden" in dataShow) {
                      hidden = dataShow.hidden;
                    }
                  } else {
                    dataShow = dataPriv.access(elem, "fxshow", {
                      display : restoreDisplay
                    });
                  }
                  if (matched) {
                    dataShow.hidden = !hidden;
                  }
                  if (hidden) {
                    showHide([elem], true);
                  }
                  anim.done(function() {
                    for (prop in hidden || showHide([elem]), dataPriv.remove(elem, "fxshow"), orig) {
                      jQuery.style(elem, prop, orig[prop]);
                    }
                  });
                }
                tween = createTween(hidden ? dataShow[prop] : 0, prop, anim);
                if (!(prop in dataShow)) {
                  dataShow[prop] = tween.start;
                  if (hidden) {
                    tween.end = tween.start;
                    tween.start = 0;
                  }
                }
              }
            }
          }],
          prefilter : function(callback, options) {
            if (options) {
              Animation.prefilters.unshift(callback);
            } else {
              Animation.prefilters.push(callback);
            }
          }
        });
        jQuery.speed = function(value, name, text) {
          var opt = value && "object" == typeof value ? jQuery.extend({}, value) : {
            complete : text || !text && name || isFunction(value) && value,
            duration : value,
            easing : text && name || name && !isFunction(name) && name
          };
          return jQuery.fx.off ? opt.duration = 0 : "number" != typeof opt.duration && (opt.duration in jQuery.fx.speeds ? opt.duration = jQuery.fx.speeds[opt.duration] : opt.duration = jQuery.fx.speeds._default), null != opt.queue && true !== opt.queue || (opt.queue = "fx"), opt.old = opt.complete, opt.complete = function() {
            if (isFunction(opt.old)) {
              opt.old.call(this);
            }
            if (opt.queue) {
              jQuery.dequeue(this, opt.queue);
            }
          }, opt;
        };
        jQuery.fn.extend({
          fadeTo : function(speed, to, callback, context) {
            return this.filter(isHidden).css("opacity", 0).show().end().animate({
              opacity : to
            }, speed, callback, context);
          },
          animate : function(prop, speed, easing, callback) {
            var empty = jQuery.isEmptyObject(prop);
            var optall = jQuery.speed(speed, easing, callback);
            var doAnimation = function() {
              var anim = Animation(this, jQuery.extend({}, prop), optall);
              if (empty || dataPriv.get(this, "finish")) {
                anim.stop(true);
              }
            };
            return doAnimation.finish = doAnimation, empty || false === optall.queue ? this.each(doAnimation) : this.queue(optall.queue, doAnimation);
          },
          stop : function(type, n, t) {
            var callback = function(o) {
              var s = o.stop;
              delete o.stop;
              s(t);
            };
            return "string" != typeof type && (t = n, n = type, type = void 0), n && this.queue(type || "fx", []), this.each(function() {
              var cmp = true;
              var index = null != type && type + "queueHooks";
              var timers = jQuery.timers;
              var data = dataPriv.get(this);
              if (index) {
                if (data[index] && data[index].stop) {
                  callback(data[index]);
                }
              } else {
                for (index in data) {
                  if (data[index] && data[index].stop && rrun.test(index)) {
                    callback(data[index]);
                  }
                }
              }
              index = timers.length;
              for (; index--;) {
                if (!(timers[index].elem !== this || null != type && timers[index].queue !== type)) {
                  timers[index].anim.stop(t);
                  cmp = false;
                  timers.splice(index, 1);
                }
              }
              if (!(!cmp && t)) {
                jQuery.dequeue(this, type);
              }
            });
          },
          finish : function(type) {
            return false !== type && (type = type || "fx"), this.each(function() {
              var index;
              var data = dataPriv.get(this);
              var queue = data[type + "queue"];
              var hooks = data[type + "queueHooks"];
              var timers = jQuery.timers;
              var length = queue ? queue.length : 0;
              data.finish = true;
              jQuery.queue(this, type, []);
              if (hooks && hooks.stop) {
                hooks.stop.call(this, true);
              }
              index = timers.length;
              for (; index--;) {
                if (timers[index].elem === this && timers[index].queue === type) {
                  timers[index].anim.stop(true);
                  timers.splice(index, 1);
                }
              }
              index = 0;
              for (; index < length; index++) {
                if (queue[index] && queue[index].finish) {
                  queue[index].finish.call(this);
                }
              }
              delete data.finish;
            });
          }
        });
        jQuery.each(["toggle", "show", "hide"], function(canCreateDiscussions, name) {
          var cssFn = jQuery.fn[name];
          jQuery.fn[name] = function(x, callback, options) {
            return null == x || "boolean" == typeof x ? cssFn.apply(this, arguments) : this.animate(genFx(name, true), x, callback, options);
          };
        });
        jQuery.each({
          slideDown : genFx("show"),
          slideUp : genFx("hide"),
          slideToggle : genFx("toggle"),
          fadeIn : {
            opacity : "show"
          },
          fadeOut : {
            opacity : "hide"
          },
          fadeToggle : {
            opacity : "toggle"
          }
        }, function(original, props) {
          jQuery.fn[original] = function(speed, callback, options) {
            return this.animate(props, speed, callback, options);
          };
        });
        jQuery.timers = [];
        jQuery.fx.tick = function() {
          var maxBet;
          var i = 0;
          var timers = jQuery.timers;
          fxNow = Date.now();
          for (; i < timers.length; i++) {
            if (!((maxBet = timers[i])() || timers[i] !== maxBet)) {
              timers.splice(i--, 1);
            }
          }
          if (!timers.length) {
            jQuery.fx.stop();
          }
          fxNow = void 0;
        };
        jQuery.fx.timer = function(url) {
          jQuery.timers.push(url);
          jQuery.fx.start();
        };
        jQuery.fx.interval = 13;
        jQuery.fx.start = function() {
          if (!source) {
            source = true;
            step();
          }
        };
        jQuery.fx.stop = function() {
          source = null;
        };
        jQuery.fx.speeds = {
          slow : 600,
          fast : 200,
          _default : 400
        };
        jQuery.fn.delay = function(e, type) {
          return e = jQuery.fx && jQuery.fx.speeds[e] || e, type = type || "fx", this.queue(type, function(ask, incoming_item) {
            var o = window.setTimeout(ask, e);
            incoming_item.stop = function() {
              window.clearTimeout(o);
            };
          });
        };
        (function() {
          var elem = document.createElement("input");
          var opt = document.createElement("select").appendChild(document.createElement("option"));
          elem.type = "checkbox";
          support.checkOn = "" !== elem.value;
          support.optSelected = opt.selected;
          (elem = document.createElement("input")).value = "t";
          elem.type = "radio";
          support.radioValue = "t" === elem.value;
        })();
        var boolHook;
        var attrHandle = jQuery.expr.attrHandle;
        jQuery.fn.extend({
          attr : function(name, value) {
            return access(this, jQuery.attr, name, value, arguments.length > 1);
          },
          removeAttr : function(name) {
            return this.each(function() {
              jQuery.removeAttr(this, name);
            });
          }
        });
        jQuery.extend({
          attr : function(elem, name, value) {
            var ret;
            var hooks;
            var type = elem.nodeType;
            if (3 !== type && 8 !== type && 2 !== type) {
              return void 0 === elem.getAttribute ? jQuery.prop(elem, name, value) : (1 === type && jQuery.isXMLDoc(elem) || (hooks = jQuery.attrHooks[name.toLowerCase()] || (jQuery.expr.match.bool.test(name) ? boolHook : void 0)), void 0 !== value ? null === value ? void jQuery.removeAttr(elem, name) : hooks && "set" in hooks && void 0 !== (ret = hooks.set(elem, value, name)) ? ret : (elem.setAttribute(name, value + ""), value) : hooks && "get" in hooks && null !== (ret = hooks.get(elem, name)) ? 
              ret : null == (ret = jQuery.find.attr(elem, name)) ? void 0 : ret);
            }
          },
          attrHooks : {
            type : {
              set : function(item, value) {
                if (!support.radioValue && "radio" === value && callback(item, "input")) {
                  var n = item.value;
                  return item.setAttribute("type", value), n && (item.value = n), value;
                }
              }
            }
          },
          removeAttr : function(name, value) {
            var match;
            var curr = 0;
            var matches = value && value.match(context);
            if (matches && 1 === name.nodeType) {
              for (; match = matches[curr++];) {
                name.removeAttribute(match);
              }
            }
          }
        });
        boolHook = {
          set : function(elem, value, key) {
            return false === value ? jQuery.removeAttr(elem, key) : elem.setAttribute(key, key), key;
          }
        };
        jQuery.each(jQuery.expr.match.bool.source.match(/\w+/g), function(canCreateDiscussions, name) {
          var n = attrHandle[name] || jQuery.find.attr;
          attrHandle[name] = function(window, status, s) {
            var ret;
            var handle;
            var lowercaseName = status.toLowerCase();
            return s || (handle = attrHandle[lowercaseName], attrHandle[lowercaseName] = ret, ret = null != n(window, status, s) ? lowercaseName : null, attrHandle[lowercaseName] = handle), ret;
          };
        });
        var k_r_success_contrls = /^(?:input|select|textarea|button)$/i;
        var submittable = /^(?:a|area)$/i;
        jQuery.fn.extend({
          prop : function(name, value) {
            return access(this, jQuery.prop, name, value, arguments.length > 1);
          },
          removeProp : function(name) {
            return this.each(function() {
              delete this[jQuery.propFix[name] || name];
            });
          }
        });
        jQuery.extend({
          prop : function(elem, name, value) {
            var ret;
            var hooks;
            var type = elem.nodeType;
            if (3 !== type && 8 !== type && 2 !== type) {
              return 1 === type && jQuery.isXMLDoc(elem) || (name = jQuery.propFix[name] || name, hooks = jQuery.propHooks[name]), void 0 !== value ? hooks && "set" in hooks && void 0 !== (ret = hooks.set(elem, value, name)) ? ret : elem[name] = value : hooks && "get" in hooks && null !== (ret = hooks.get(elem, name)) ? ret : elem[name];
            }
          },
          propHooks : {
            tabIndex : {
              get : function(element) {
                var idx = jQuery.find.attr(element, "tabindex");
                return idx ? parseInt(idx, 10) : k_r_success_contrls.test(element.nodeName) || submittable.test(element.nodeName) && element.href ? 0 : -1;
              }
            }
          },
          propFix : {
            for : "htmlFor",
            class : "className"
          }
        });
        if (!support.optSelected) {
          jQuery.propHooks.selected = {
            get : function(e) {
              var elem = e.parentNode;
              return elem && elem.parentNode && elem.parentNode.selectedIndex, null;
            },
            set : function(e) {
              var elem = e.parentNode;
              if (elem) {
                elem.selectedIndex;
                if (elem.parentNode) {
                  elem.parentNode.selectedIndex;
                }
              }
            }
          };
        }
        jQuery.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
          jQuery.propFix[this.toLowerCase()] = this;
        });
        jQuery.fn.extend({
          addClass : function(name) {
            var str;
            var el;
            var html;
            var z;
            var k;
            var endPos;
            var a;
            var l = 0;
            if (isFunction(name)) {
              return this.each(function(i) {
                jQuery(this).addClass(name.call(this, i, getClass(this)));
              });
            }
            if ((str = trim(name)).length) {
              for (; el = this[l++];) {
                if (z = getClass(el), html = 1 === el.nodeType && " " + $(z) + " ") {
                  endPos = 0;
                  for (; k = str[endPos++];) {
                    if (html.indexOf(" " + k + " ") < 0) {
                      html = html + (k + " ");
                    }
                  }
                  if (z !== (a = $(html))) {
                    el.setAttribute("class", a);
                  }
                }
              }
            }
            return this;
          },
          removeClass : function(name) {
            var node;
            var el;
            var path;
            var v;
            var codeGeneratorFunc;
            var count;
            var b;
            var l = 0;
            if (isFunction(name)) {
              return this.each(function(i) {
                jQuery(this).removeClass(name.call(this, i, getClass(this)));
              });
            }
            if (!arguments.length) {
              return this.attr("class", "");
            }
            if ((node = trim(name)).length) {
              for (; el = this[l++];) {
                if (v = getClass(el), path = 1 === el.nodeType && " " + $(v) + " ") {
                  count = 0;
                  for (; codeGeneratorFunc = node[count++];) {
                    for (; path.indexOf(" " + codeGeneratorFunc + " ") > -1;) {
                      path = path.replace(" " + codeGeneratorFunc + " ", " ");
                    }
                  }
                  if (v !== (b = $(path))) {
                    el.setAttribute("class", b);
                  }
                }
              }
            }
            return this;
          },
          toggleClass : function(value, stateVal) {
            var undefined = typeof value;
            var i = "string" === undefined || Array.isArray(value);
            return "boolean" == typeof stateVal && i ? stateVal ? this.addClass(value) : this.removeClass(value) : isFunction(value) ? this.each(function(i) {
              jQuery(this).toggleClass(value.call(this, i, getClass(this), stateVal), stateVal);
            }) : this.each(function() {
              var className;
              var j;
              var $body;
              var target;
              if (i) {
                j = 0;
                $body = jQuery(this);
                target = trim(value);
                for (; className = target[j++];) {
                  if ($body.hasClass(className)) {
                    $body.removeClass(className);
                  } else {
                    $body.addClass(className);
                  }
                }
              } else {
                if (!(void 0 !== value && "boolean" !== undefined)) {
                  if (className = getClass(this)) {
                    dataPriv.set(this, "__className__", className);
                  }
                  if (this.setAttribute) {
                    this.setAttribute("class", className || false === value ? "" : dataPriv.get(this, "__className__") || "");
                  }
                }
              }
            });
          },
          hasClass : function(name) {
            var sceneUid;
            var el;
            var i = 0;
            sceneUid = " " + name + " ";
            for (; el = this[i++];) {
              if (1 === el.nodeType && (" " + $(getClass(el)) + " ").indexOf(sceneUid) > -1) {
                return true;
              }
            }
            return false;
          }
        });
        var n = /\r/g;
        jQuery.fn.extend({
          val : function(v) {
            var hooks;
            var value;
            var raw;
            var elem = this[0];
            return arguments.length ? (raw = isFunction(v), this.each(function(a) {
              var val;
              if (1 === this.nodeType) {
                if (null == (val = raw ? v.call(this, a, jQuery(this).val()) : v)) {
                  val = "";
                } else {
                  if ("number" == typeof val) {
                    val = val + "";
                  } else {
                    if (Array.isArray(val)) {
                      val = jQuery.map(val, function(value) {
                        return null == value ? "" : value + "";
                      });
                    }
                  }
                }
                if (!((hooks = jQuery.valHooks[this.type] || jQuery.valHooks[this.nodeName.toLowerCase()]) && "set" in hooks && void 0 !== hooks.set(this, val, "value"))) {
                  this.value = val;
                }
              }
            })) : elem ? (hooks = jQuery.valHooks[elem.type] || jQuery.valHooks[elem.nodeName.toLowerCase()]) && "get" in hooks && void 0 !== (value = hooks.get(elem, "value")) ? value : "string" == typeof(value = elem.value) ? value.replace(n, "") : null == value ? "" : value : void 0;
          }
        });
        jQuery.extend({
          valHooks : {
            option : {
              get : function(value) {
                var decodedValue = jQuery.find.attr(value, "value");
                return null != decodedValue ? decodedValue : $(jQuery.text(value));
              }
            },
            select : {
              get : function(elem) {
                var value;
                var e;
                var i;
                var options = elem.options;
                var index = elem.selectedIndex;
                var one = "select-one" === elem.type;
                var values = one ? null : [];
                var max = one ? index + 1 : options.length;
                i = index < 0 ? max : one ? index : 0;
                for (; i < max; i++) {
                  if (((e = options[i]).selected || i === index) && !e.disabled && (!e.parentNode.disabled || !callback(e.parentNode, "optgroup"))) {
                    if (value = jQuery(e).val(), one) {
                      return value;
                    }
                    values.push(value);
                  }
                }
                return values;
              },
              set : function(elem, value) {
                var outputFn;
                var option;
                var options = elem.options;
                var result = jQuery.makeArray(value);
                var i = options.length;
                for (; i--;) {
                  if ((option = options[i]).selected = jQuery.inArray(jQuery.valHooks.option.get(option), result) > -1) {
                    outputFn = true;
                  }
                }
                return outputFn || (elem.selectedIndex = -1), result;
              }
            }
          }
        });
        jQuery.each(["radio", "checkbox"], function() {
          jQuery.valHooks[this] = {
            set : function(elem, value) {
              if (Array.isArray(value)) {
                return elem.checked = jQuery.inArray(jQuery(elem).val(), value) > -1;
              }
            }
          };
          if (!support.checkOn) {
            jQuery.valHooks[this].get = function(elem) {
              return null === elem.getAttribute("value") ? "on" : elem.value;
            };
          }
        });
        support.focusin = "onfocusin" in window;
        var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/;
        var onInspectorMove = function(e) {
          e.stopPropagation();
        };
        jQuery.extend(jQuery.event, {
          trigger : function(event, value, elem, onlyHandlers) {
            var i;
            var cur;
            var tmp;
            var bubbleType;
            var ontype;
            var next;
            var special;
            var parent;
            var eventPath = [elem || document];
            var type = hasOwn.call(event, "type") ? event.type : event;
            var v = hasOwn.call(event, "namespace") ? event.namespace.split(".") : [];
            if (cur = parent = tmp = elem = elem || document, 3 !== elem.nodeType && 8 !== elem.nodeType && !rfocusMorph.test(type + jQuery.event.triggered) && (type.indexOf(".") > -1 && (v = type.split("."), type = v.shift(), v.sort()), ontype = type.indexOf(":") < 0 && "on" + type, (event = event[jQuery.expando] ? event : new jQuery.Event(type, "object" == typeof event && event)).isTrigger = onlyHandlers ? 2 : 3, event.namespace = v.join("."), event.rnamespace = event.namespace ? new RegExp("(^|\\.)" + 
            v.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, event.result = void 0, event.target || (event.target = elem), value = null == value ? [event] : jQuery.makeArray(value, [event]), special = jQuery.event.special[type] || {}, onlyHandlers || !special.trigger || false !== special.trigger.apply(elem, value))) {
              if (!onlyHandlers && !special.noBubble && !isWindow(elem)) {
                bubbleType = special.delegateType || type;
                if (!rfocusMorph.test(bubbleType + type)) {
                  cur = cur.parentNode;
                }
                for (; cur; cur = cur.parentNode) {
                  eventPath.push(cur);
                  tmp = cur;
                }
                if (tmp === (elem.ownerDocument || document)) {
                  eventPath.push(tmp.defaultView || tmp.parentWindow || window);
                }
              }
              i = 0;
              for (; (cur = eventPath[i++]) && !event.isPropagationStopped();) {
                parent = cur;
                event.type = i > 1 ? bubbleType : special.bindType || type;
                if (next = (dataPriv.get(cur, "events") || Object.create(null))[event.type] && dataPriv.get(cur, "handle")) {
                  next.apply(cur, value);
                }
                if ((next = ontype && cur[ontype]) && next.apply && acceptData(cur)) {
                  event.result = next.apply(cur, value);
                  if (false === event.result) {
                    event.preventDefault();
                  }
                }
              }
              return event.type = type, onlyHandlers || event.isDefaultPrevented() || special._default && false !== special._default.apply(eventPath.pop(), value) || !acceptData(elem) || ontype && isFunction(elem[type]) && !isWindow(elem) && ((tmp = elem[ontype]) && (elem[ontype] = null), jQuery.event.triggered = type, event.isPropagationStopped() && parent.addEventListener(type, onInspectorMove), elem[type](), event.isPropagationStopped() && parent.removeEventListener(type, onInspectorMove), jQuery.event.triggered = 
              void 0, tmp && (elem[ontype] = tmp)), event.result;
            }
          },
          simulate : function(type, elem, options) {
            var tab = jQuery.extend(new jQuery.Event, options, {
              type : type,
              isSimulated : true
            });
            jQuery.event.trigger(tab, null, elem);
          }
        });
        jQuery.fn.extend({
          trigger : function(type, data) {
            return this.each(function() {
              jQuery.event.trigger(type, data, this);
            });
          },
          triggerHandler : function(type, data) {
            var parent = this[0];
            if (parent) {
              return jQuery.event.trigger(type, data, parent, true);
            }
          }
        });
        if (!support.focusin) {
          jQuery.each({
            focus : "focusin",
            blur : "focusout"
          }, function(orig, fix) {
            var handler = function(event) {
              jQuery.event.simulate(fix, event.target, jQuery.event.fix(event));
            };
            jQuery.event.special[fix] = {
              setup : function() {
                var doc = this.ownerDocument || this.document || this;
                var attaches = dataPriv.access(doc, fix);
                if (!attaches) {
                  doc.addEventListener(orig, handler, true);
                }
                dataPriv.access(doc, fix, (attaches || 0) + 1);
              },
              teardown : function() {
                var doc = this.ownerDocument || this.document || this;
                var attaches = dataPriv.access(doc, fix) - 1;
                if (attaches) {
                  dataPriv.access(doc, fix, attaches);
                } else {
                  doc.removeEventListener(orig, handler, true);
                  dataPriv.remove(doc, fix);
                }
              }
            };
          });
        }
        var location = window.location;
        var _enum = {
          guid : Date.now()
        };
        var rquery = /\?/;
        jQuery.parseXML = function(value) {
          var o;
          var n;
          if (!value || "string" != typeof value) {
            return null;
          }
          try {
            o = (new window.DOMParser).parseFromString(value, "text/xml");
          } catch (t) {
          }
          return n = o && o.getElementsByTagName("parsererror")[0], o && !n || jQuery.error("Invalid XML: " + (n ? jQuery.map(n.childNodes, function(selfContext) {
            return selfContext.textContent;
          }).join("\n") : value)), o;
        };
        var regCls = /\[\]$/;
        var reVowels = /\r?\n/g;
        var reHasHexPrefix = /^(?:submit|button|image|reset|file)$/i;
        var rsubmittable = /^(?:input|select|textarea|keygen)/i;
        jQuery.param = function(a, cb) {
          var j;
          var displayUsedBy = [];
          var add = function(file, val) {
            var value = isFunction(val) ? val() : val;
            displayUsedBy[displayUsedBy.length] = encodeURIComponent(file) + "=" + encodeURIComponent(null == value ? "" : value);
          };
          if (null == a) {
            return "";
          }
          if (Array.isArray(a) || a.jquery && !jQuery.isPlainObject(a)) {
            jQuery.each(a, function() {
              add(this.name, this.value);
            });
          } else {
            for (j in a) {
              fn(j, a[j], cb, add);
            }
          }
          return displayUsedBy.join("&");
        };
        jQuery.fn.extend({
          serialize : function() {
            return jQuery.param(this.serializeArray());
          },
          serializeArray : function() {
            return this.map(function() {
              var elements = jQuery.prop(this, "elements");
              return elements ? jQuery.makeArray(elements) : this;
            }).filter(function() {
              var string = this.type;
              return this.name && !jQuery(this).is(":disabled") && rsubmittable.test(this.nodeName) && !reHasHexPrefix.test(string) && (this.checked || !path.test(string));
            }).map(function(canCreateDiscussions, ctlParams) {
              var val = jQuery(this).val();
              return null == val ? null : Array.isArray(val) ? jQuery.map(val, function(val) {
                return {
                  name : ctlParams.name,
                  value : val.replace(reVowels, "\r\n")
                };
              }) : {
                name : ctlParams.name,
                value : val.replace(reVowels, "\r\n")
              };
            }).get();
          }
        });
        var jsre = /%20/g;
        var rhash = /#.*$/;
        var rts = /([?&])_=[^&]*/;
        var rheaders = /^(.*?):[ \t]*([^\r\n]*)$/gm;
        var re = /^(?:GET|HEAD)$/;
        var rprotocol = /^\/\//;
        var prefilters = {};
        var transports = {};
        var Me = "*/".concat("*");
        var originAnchor = document.createElement("a");
        originAnchor.href = location.href;
        jQuery.extend({
          active : 0,
          lastModified : {},
          etag : {},
          ajaxSettings : {
            url : location.href,
            type : "GET",
            isLocal : /^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(location.protocol),
            global : true,
            processData : true,
            async : true,
            contentType : "application/x-www-form-urlencoded; charset=UTF-8",
            accepts : {
              "*" : Me,
              text : "text/plain",
              html : "text/html",
              xml : "application/xml, text/xml",
              json : "application/json, text/javascript"
            },
            contents : {
              xml : /\bxml\b/,
              html : /\bhtml/,
              json : /\bjson\b/
            },
            responseFields : {
              xml : "responseXML",
              text : "responseText",
              json : "responseJSON"
            },
            converters : {
              "* text" : String,
              "text html" : true,
              "text json" : JSON.parse,
              "text xml" : jQuery.parseXML
            },
            flatOptions : {
              url : true,
              context : true
            }
          },
          ajaxSetup : function(target, settings) {
            return settings ? ajaxExtend(ajaxExtend(target, jQuery.ajaxSettings), settings) : ajaxExtend(jQuery.ajaxSettings, target);
          },
          ajaxPrefilter : addToPrefiltersOrTransports(prefilters),
          ajaxTransport : addToPrefiltersOrTransports(transports),
          ajax : function(url, options) {
            function done(status, nativeStatusText, responses, headers) {
              var isSuccess;
              var success;
              var error;
              var response;
              var modified;
              var statusText = nativeStatusText;
              if (!completed) {
                completed = true;
                if (showAboveTimeout) {
                  window.clearTimeout(showAboveTimeout);
                }
                transport = void 0;
                responseHeadersString = headers || "";
                jqXHR.readyState = status > 0 ? 4 : 0;
                isSuccess = status >= 200 && status < 300 || 304 === status;
                if (responses) {
                  response = function(s, ajaxRequest, responses) {
                    var ct;
                    var type;
                    var finalDataType;
                    var firstDataType;
                    var contents = s.contents;
                    var dataTypes = s.dataTypes;
                    for (; "*" === dataTypes[0];) {
                      dataTypes.shift();
                      if (void 0 === ct) {
                        ct = s.mimeType || ajaxRequest.getResponseHeader("Content-Type");
                      }
                    }
                    if (ct) {
                      for (type in contents) {
                        if (contents[type] && contents[type].test(ct)) {
                          dataTypes.unshift(type);
                          break;
                        }
                      }
                    }
                    if (dataTypes[0] in responses) {
                      finalDataType = dataTypes[0];
                    } else {
                      for (type in responses) {
                        if (!dataTypes[0] || s.converters[type + " " + dataTypes[0]]) {
                          finalDataType = type;
                          break;
                        }
                        if (!firstDataType) {
                          firstDataType = type;
                        }
                      }
                      finalDataType = finalDataType || firstDataType;
                    }
                    if (finalDataType) {
                      return finalDataType !== dataTypes[0] && dataTypes.unshift(finalDataType), responses[finalDataType];
                    }
                  }(s, jqXHR, responses);
                }
                if (!isSuccess && jQuery.inArray("script", s.dataTypes) > -1 && jQuery.inArray("json", s.dataTypes) < 0) {
                  s.converters["text script"] = function() {
                  };
                }
                response = function(s, response, jqXHR, isSuccess) {
                  var conv2;
                  var current;
                  var conv;
                  var data;
                  var prev;
                  var converters = {};
                  var myFish = s.dataTypes.slice();
                  if (myFish[1]) {
                    for (conv in s.converters) {
                      converters[conv.toLowerCase()] = s.converters[conv];
                    }
                  }
                  current = myFish.shift();
                  for (; current;) {
                    if (s.responseFields[current] && (jqXHR[s.responseFields[current]] = response), !prev && isSuccess && s.dataFilter && (response = s.dataFilter(response, s.dataType)), prev = current, current = myFish.shift()) {
                      if ("*" === current) {
                        current = prev;
                      } else {
                        if ("*" !== prev && prev !== current) {
                          if (!(conv = converters[prev + " " + current] || converters["* " + current])) {
                            for (conv2 in converters) {
                              if ((data = conv2.split(" "))[1] === current && (conv = converters[prev + " " + data[0]] || converters["* " + data[0]])) {
                                if (true === conv) {
                                  conv = converters[conv2];
                                } else {
                                  if (true !== converters[conv2]) {
                                    current = data[0];
                                    myFish.unshift(data[1]);
                                  }
                                }
                                break;
                              }
                            }
                          }
                          if (true !== conv) {
                            if (conv && s.throws) {
                              response = conv(response);
                            } else {
                              try {
                                response = conv(response);
                              } catch (e) {
                                return {
                                  state : "parsererror",
                                  error : conv ? e : "No conversion from " + prev + " to " + current
                                };
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                  return {
                    state : "success",
                    data : response
                  };
                }(s, response, jqXHR, isSuccess);
                if (isSuccess) {
                  if (s.ifModified) {
                    if (modified = jqXHR.getResponseHeader("Last-Modified")) {
                      jQuery.lastModified[cacheURL] = modified;
                    }
                    if (modified = jqXHR.getResponseHeader("etag")) {
                      jQuery.etag[cacheURL] = modified;
                    }
                  }
                  if (204 === status || "HEAD" === s.type) {
                    statusText = "nocontent";
                  } else {
                    if (304 === status) {
                      statusText = "notmodified";
                    } else {
                      statusText = response.state;
                      success = response.data;
                      isSuccess = !(error = response.error);
                    }
                  }
                } else {
                  error = statusText;
                  if (!(!status && statusText)) {
                    statusText = "error";
                    if (status < 0) {
                      status = 0;
                    }
                  }
                }
                jqXHR.status = status;
                jqXHR.statusText = (nativeStatusText || statusText) + "";
                if (isSuccess) {
                  deferred.resolveWith(obj, [success, statusText, jqXHR]);
                } else {
                  deferred.rejectWith(obj, [jqXHR, statusText, error]);
                }
                jqXHR.statusCode(statusCode);
                statusCode = void 0;
                if (c) {
                  globalEventContext.trigger(isSuccess ? "ajaxSuccess" : "ajaxError", [jqXHR, s, isSuccess ? success : error]);
                }
                completeDeferred.fireWith(obj, [jqXHR, statusText]);
                if (c) {
                  globalEventContext.trigger("ajaxComplete", [jqXHR, s]);
                  if (!--jQuery.active) {
                    jQuery.event.trigger("ajaxStop");
                  }
                }
              }
            }
            if ("object" == typeof url) {
              options = url;
              url = void 0;
            }
            options = options || {};
            var transport;
            var cacheURL;
            var responseHeadersString;
            var yuiEvent;
            var showAboveTimeout;
            var urlAnchor;
            var completed;
            var c;
            var i;
            var uncached;
            var s = jQuery.ajaxSetup({}, options);
            var obj = s.context || s;
            var globalEventContext = s.context && (obj.nodeType || obj.jquery) ? jQuery(obj) : jQuery.event;
            var deferred = jQuery.Deferred();
            var completeDeferred = jQuery.Callbacks("once memory");
            var statusCode = s.statusCode || {};
            var data = {};
            var requestHeadersNames = {};
            var status = "canceled";
            var jqXHR = {
              readyState : 0,
              getResponseHeader : function(header) {
                var e;
                if (completed) {
                  if (!yuiEvent) {
                    yuiEvent = {};
                    for (; e = rheaders.exec(responseHeadersString);) {
                      yuiEvent[e[1].toLowerCase() + " "] = (yuiEvent[e[1].toLowerCase() + " "] || []).concat(e[2]);
                    }
                  }
                  e = yuiEvent[header.toLowerCase() + " "];
                }
                return null == e ? null : e.join(", ");
              },
              getAllResponseHeaders : function() {
                return completed ? responseHeadersString : null;
              },
              setRequestHeader : function(name, value) {
                return null == completed && (name = requestHeadersNames[name.toLowerCase()] = requestHeadersNames[name.toLowerCase()] || name, data[name] = value), this;
              },
              overrideMimeType : function(type) {
                return null == completed && (s.mimeType = type), this;
              },
              statusCode : function(map) {
                var tmp;
                if (map) {
                  if (completed) {
                    jqXHR.always(map[jqXHR.status]);
                  } else {
                    for (tmp in map) {
                      statusCode[tmp] = [statusCode[tmp], map[tmp]];
                    }
                  }
                }
                return this;
              },
              abort : function(type) {
                var statusText = type || status;
                return transport && transport.abort(statusText), done(0, statusText), this;
              }
            };
            if (deferred.promise(jqXHR), s.url = ((url || s.url || location.href) + "").replace(rprotocol, location.protocol + "//"), s.type = options.method || options.type || s.method || s.type, s.dataTypes = (s.dataType || "*").toLowerCase().match(context) || [""], null == s.crossDomain) {
              urlAnchor = document.createElement("a");
              try {
                urlAnchor.href = s.url;
                urlAnchor.href = urlAnchor.href;
                s.crossDomain = originAnchor.protocol + "//" + originAnchor.host != urlAnchor.protocol + "//" + urlAnchor.host;
              } catch (t) {
                s.crossDomain = true;
              }
            }
            if (s.data && s.processData && "string" != typeof s.data && (s.data = jQuery.param(s.data, s.traditional)), inspectPrefiltersOrTransports(prefilters, s, options, jqXHR), completed) {
              return jqXHR;
            }
            for (i in(c = jQuery.event && s.global) && 0 == jQuery.active++ && jQuery.event.trigger("ajaxStart"), s.type = s.type.toUpperCase(), s.hasContent = !re.test(s.type), cacheURL = s.url.replace(rhash, ""), s.hasContent ? s.data && s.processData && 0 === (s.contentType || "").indexOf("application/x-www-form-urlencoded") && (s.data = s.data.replace(jsre, "+")) : (uncached = s.url.slice(cacheURL.length), s.data && (s.processData || "string" == typeof s.data) && (cacheURL = cacheURL + ((rquery.test(cacheURL) ? 
            "&" : "?") + s.data), delete s.data), false === s.cache && (cacheURL = cacheURL.replace(rts, "$1"), uncached = (rquery.test(cacheURL) ? "&" : "?") + "_=" + _enum.guid++ + uncached), s.url = cacheURL + uncached), s.ifModified && (jQuery.lastModified[cacheURL] && jqXHR.setRequestHeader("If-Modified-Since", jQuery.lastModified[cacheURL]), jQuery.etag[cacheURL] && jqXHR.setRequestHeader("If-None-Match", jQuery.etag[cacheURL])), (s.data && s.hasContent && false !== s.contentType || options.contentType) && 
            jqXHR.setRequestHeader("Content-Type", s.contentType), jqXHR.setRequestHeader("Accept", s.dataTypes[0] && s.accepts[s.dataTypes[0]] ? s.accepts[s.dataTypes[0]] + ("*" !== s.dataTypes[0] ? ", " + Me + "; q=0.01" : "") : s.accepts["*"]), s.headers) {
              jqXHR.setRequestHeader(i, s.headers[i]);
            }
            if (s.beforeSend && (false === s.beforeSend.call(obj, jqXHR, s) || completed)) {
              return jqXHR.abort();
            }
            if (status = "abort", completeDeferred.add(s.complete), jqXHR.done(s.success), jqXHR.fail(s.error), transport = inspectPrefiltersOrTransports(transports, s, options, jqXHR)) {
              if (jqXHR.readyState = 1, c && globalEventContext.trigger("ajaxSend", [jqXHR, s]), completed) {
                return jqXHR;
              }
              if (s.async && s.timeout > 0) {
                showAboveTimeout = window.setTimeout(function() {
                  jqXHR.abort("timeout");
                }, s.timeout);
              }
              try {
                completed = false;
                transport.send(data, done);
              } catch (success) {
                if (completed) {
                  throw success;
                }
                done(-1, success);
              }
            } else {
              done(-1, "No Transport");
            }
            return jqXHR;
          },
          getJSON : function(name, callback, options) {
            return jQuery.get(name, callback, options, "json");
          },
          getScript : function(data, name) {
            return jQuery.get(data, void 0, name, "script");
          }
        });
        jQuery.each(["get", "post"], function(canCreateDiscussions, method) {
          jQuery[method] = function(url, part, s, o) {
            return isFunction(part) && (o = o || s, s = part, part = void 0), jQuery.ajax(jQuery.extend({
              url : url,
              type : method,
              dataType : o,
              data : part,
              success : s
            }, jQuery.isPlainObject(url) && url));
          };
        });
        jQuery.ajaxPrefilter(function(settings) {
          var name;
          for (name in settings.headers) {
            if ("content-type" === name.toLowerCase()) {
              settings.contentType = settings.headers[name] || "";
            }
          }
        });
        jQuery._evalUrl = function(t, value, url) {
          return jQuery.ajax({
            url : t,
            type : "GET",
            dataType : "script",
            cache : true,
            async : false,
            global : false,
            converters : {
              "text script" : function() {
              }
            },
            dataFilter : function(data) {
              jQuery.globalEval(data, value, url);
            }
          });
        };
        jQuery.fn.extend({
          wrapAll : function(html) {
            var e;
            return this[0] && (isFunction(html) && (html = html.call(this[0])), e = jQuery(html, this[0].ownerDocument).eq(0).clone(true), this[0].parentNode && e.insertBefore(this[0]), e.map(function() {
              var elem = this;
              for (; elem.firstElementChild;) {
                elem = elem.firstElementChild;
              }
              return elem;
            }).append(this)), this;
          },
          wrapInner : function(html) {
            return isFunction(html) ? this.each(function(i) {
              jQuery(this).wrapInner(html.call(this, i));
            }) : this.each(function() {
              var e = jQuery(this);
              var contents = e.contents();
              if (contents.length) {
                contents.wrapAll(html);
              } else {
                e.append(html);
              }
            });
          },
          wrap : function(callback) {
            var hasCallback = isFunction(callback);
            return this.each(function(i) {
              jQuery(this).wrapAll(hasCallback ? callback.call(this, i) : callback);
            });
          },
          unwrap : function(data) {
            return this.parent(data).not("body").each(function() {
              jQuery(this).replaceWith(this.childNodes);
            }), this;
          }
        });
        jQuery.expr.pseudos.hidden = function(value) {
          return !jQuery.expr.pseudos.visible(value);
        };
        jQuery.expr.pseudos.visible = function(elem) {
          return !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length);
        };
        jQuery.ajaxSettings.xhr = function() {
          try {
            return new window.XMLHttpRequest;
          } catch (t) {
          }
        };
        var xhrSuccessStatus = {
          0 : 200,
          1223 : 204
        };
        var xhrSupported = jQuery.ajaxSettings.xhr();
        support.cors = !!xhrSupported && "withCredentials" in xhrSupported;
        support.ajax = xhrSupported = !!xhrSupported;
        jQuery.ajaxTransport(function(options) {
          var callback;
          var errorCallback;
          if (support.cors || xhrSupported && !options.crossDomain) {
            return {
              send : function(headers, callback) {
                var name;
                var xhr = options.xhr();
                if (xhr.open(options.type, options.url, options.async, options.username, options.password), options.xhrFields) {
                  for (name in options.xhrFields) {
                    xhr[name] = options.xhrFields[name];
                  }
                }
                for (name in options.mimeType && xhr.overrideMimeType && xhr.overrideMimeType(options.mimeType), options.crossDomain || headers["X-Requested-With"] || (headers["X-Requested-With"] = "XMLHttpRequest"), headers) {
                  xhr.setRequestHeader(name, headers[name]);
                }
                callback = function(event) {
                  return function() {
                    if (callback) {
                      callback = errorCallback = xhr.onload = xhr.onerror = xhr.onabort = xhr.ontimeout = xhr.onreadystatechange = null;
                      if ("abort" === event) {
                        xhr.abort();
                      } else {
                        if ("error" === event) {
                          if ("number" != typeof xhr.status) {
                            callback(0, "error");
                          } else {
                            callback(xhr.status, xhr.statusText);
                          }
                        } else {
                          callback(xhrSuccessStatus[xhr.status] || xhr.status, xhr.statusText, "text" !== (xhr.responseType || "text") || "string" != typeof xhr.responseText ? {
                            binary : xhr.response
                          } : {
                            text : xhr.responseText
                          }, xhr.getAllResponseHeaders());
                        }
                      }
                    }
                  };
                };
                xhr.onload = callback();
                errorCallback = xhr.onerror = xhr.ontimeout = callback("error");
                if (void 0 !== xhr.onabort) {
                  xhr.onabort = errorCallback;
                } else {
                  xhr.onreadystatechange = function() {
                    if (4 === xhr.readyState) {
                      window.setTimeout(function() {
                        if (callback) {
                          errorCallback();
                        }
                      });
                    }
                  };
                }
                callback = callback("abort");
                try {
                  xhr.send(options.hasContent && options.data || null);
                } catch (t) {
                  if (callback) {
                    throw t;
                  }
                }
              },
              abort : function() {
                if (callback) {
                  callback();
                }
              }
            };
          }
        });
        jQuery.ajaxPrefilter(function(options) {
          if (options.crossDomain) {
            options.contents.script = false;
          }
        });
        jQuery.ajaxSetup({
          accepts : {
            script : "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
          },
          contents : {
            script : /\b(?:java|ecma)script\b/
          },
          converters : {
            "text script" : function(value) {
              return jQuery.globalEval(value), value;
            }
          }
        });
        jQuery.ajaxPrefilter("script", function(settings) {
          if (void 0 === settings.cache) {
            settings.cache = false;
          }
          if (settings.crossDomain) {
            settings.type = "GET";
          }
        });
        jQuery.ajaxTransport("script", function(options) {
          var fileElem;
          var callback;
          if (options.crossDomain || options.scriptAttrs) {
            return {
              send : function(payloadBuffer, done) {
                fileElem = jQuery("<script>").attr(options.scriptAttrs || {}).prop({
                  charset : options.scriptCharset,
                  src : options.url
                }).on("load error", callback = function(result) {
                  fileElem.remove();
                  callback = null;
                  if (result) {
                    done("error" === result.type ? 404 : 200, result.type);
                  }
                });
                document.head.appendChild(fileElem[0]);
              },
              abort : function() {
                if (callback) {
                  callback();
                }
              }
            };
          }
        });
        var summary;
        var oldCallbacks = [];
        var rjsonp = /(=)\?(?=&|$)|\?\?/;
        jQuery.ajaxSetup({
          jsonp : "callback",
          jsonpCallback : function() {
            var indexLookupKey = oldCallbacks.pop() || jQuery.expando + "_" + _enum.guid++;
            return this[indexLookupKey] = true, indexLookupKey;
          }
        });
        jQuery.ajaxPrefilter("json jsonp", function(s, originalSettings, scanners) {
          var callbackName;
          var overwritten;
          var responseContainer;
          var jsonProp = false !== s.jsonp && (rjsonp.test(s.url) ? "url" : "string" == typeof s.data && 0 === (s.contentType || "").indexOf("application/x-www-form-urlencoded") && rjsonp.test(s.data) && "data");
          if (jsonProp || "jsonp" === s.dataTypes[0]) {
            return callbackName = s.jsonpCallback = isFunction(s.jsonpCallback) ? s.jsonpCallback() : s.jsonpCallback, jsonProp ? s[jsonProp] = s[jsonProp].replace(rjsonp, "$1" + callbackName) : false !== s.jsonp && (s.url += (rquery.test(s.url) ? "&" : "?") + s.jsonp + "=" + callbackName), s.converters["script json"] = function() {
              return responseContainer || jQuery.error(callbackName + " was not called"), responseContainer[0];
            }, s.dataTypes[0] = "json", overwritten = window[callbackName], window[callbackName] = function() {
              responseContainer = arguments;
            }, scanners.always(function() {
              if (void 0 === overwritten) {
                jQuery(window).removeProp(callbackName);
              } else {
                window[callbackName] = overwritten;
              }
              if (s[callbackName]) {
                s.jsonpCallback = originalSettings.jsonpCallback;
                oldCallbacks.push(callbackName);
              }
              if (responseContainer && isFunction(overwritten)) {
                overwritten(responseContainer[0]);
              }
              responseContainer = overwritten = void 0;
            }), "script";
          }
        });
        support.createHTMLDocument = ((summary = document.implementation.createHTMLDocument("").body).innerHTML = "<form></form><form></form>", 2 === summary.childNodes.length);
        jQuery.parseHTML = function(data, context, keepScripts) {
          return "string" != typeof data ? [] : ("boolean" == typeof context && (keepScripts = context, context = false), context || (support.createHTMLDocument ? ((target = (context = document.implementation.createHTMLDocument("")).createElement("base")).href = document.location.href, context.head.appendChild(target)) : context = document), scripts = !keepScripts && [], (parsed = rsingleTag.exec(data)) ? [context.createElement(parsed[1])] : (parsed = buildFragment([data], context, scripts), scripts && 
          scripts.length && jQuery(scripts).remove(), jQuery.merge([], parsed.childNodes)));
          var target;
          var parsed;
          var scripts;
        };
        jQuery.fn.load = function(addr, value, callback) {
          var selector;
          var method;
          var args;
          var self = this;
          var i = addr.indexOf(" ");
          return i > -1 && (selector = $(addr.slice(i)), addr = addr.slice(0, i)), isFunction(value) ? (callback = value, value = void 0) : value && "object" == typeof value && (method = "POST"), self.length > 0 && jQuery.ajax({
            url : addr,
            type : method || "GET",
            dataType : "html",
            data : value
          }).done(function(responseText) {
            args = arguments;
            self.html(selector ? jQuery("<div>").append(jQuery.parseHTML(responseText)).find(selector) : responseText);
          }).always(callback && function(key, name) {
            self.each(function() {
              callback.apply(this, args || [key.responseText, name, key]);
            });
          }), this;
        };
        jQuery.expr.pseudos.animated = function(elem) {
          return jQuery.grep(jQuery.timers, function(fn) {
            return elem === fn.elem;
          }).length;
        };
        jQuery.offset = {
          setOffset : function(element, options, x) {
            var _base2;
            var lcX;
            var curCSSTop;
            var i;
            var curOffset;
            var curCSSLeft;
            var propertyName = jQuery.css(element, "position");
            var c = jQuery(element);
            var f = {};
            if ("static" === propertyName) {
              element.style.position = "relative";
            }
            curOffset = c.offset();
            curCSSTop = jQuery.css(element, "top");
            curCSSLeft = jQuery.css(element, "left");
            if (("absolute" === propertyName || "fixed" === propertyName) && (curCSSTop + curCSSLeft).indexOf("auto") > -1) {
              i = (_base2 = c.position()).top;
              lcX = _base2.left;
            } else {
              i = parseFloat(curCSSTop) || 0;
              lcX = parseFloat(curCSSLeft) || 0;
            }
            if (isFunction(options)) {
              options = options.call(element, x, jQuery.extend({}, curOffset));
            }
            if (null != options.top) {
              f.top = options.top - curOffset.top + i;
            }
            if (null != options.left) {
              f.left = options.left - curOffset.left + lcX;
            }
            if ("using" in options) {
              options.using.call(element, f);
            } else {
              c.css(f);
            }
          }
        };
        jQuery.fn.extend({
          offset : function(y) {
            if (arguments.length) {
              return void 0 === y ? this : this.each(function(i) {
                jQuery.offset.setOffset(this, y, i);
              });
            }
            var box;
            var win;
            var aTarget = this[0];
            return aTarget ? aTarget.getClientRects().length ? (box = aTarget.getBoundingClientRect(), win = aTarget.ownerDocument.defaultView, {
              top : box.top + win.pageYOffset,
              left : box.left + win.pageXOffset
            }) : {
              top : 0,
              left : 0
            } : void 0;
          },
          position : function() {
            if (this[0]) {
              var el;
              var offset;
              var node;
              var element = this[0];
              var parentOffset = {
                top : 0,
                left : 0
              };
              if ("fixed" === jQuery.css(element, "position")) {
                offset = element.getBoundingClientRect();
              } else {
                offset = this.offset();
                node = element.ownerDocument;
                el = element.offsetParent || node.documentElement;
                for (; el && (el === node.body || el === node.documentElement) && "static" === jQuery.css(el, "position");) {
                  el = el.parentNode;
                }
                if (el && el !== element && 1 === el.nodeType) {
                  (parentOffset = jQuery(el).offset()).top += jQuery.css(el, "borderTopWidth", true);
                  parentOffset.left += jQuery.css(el, "borderLeftWidth", true);
                }
              }
              return {
                top : offset.top - parentOffset.top - jQuery.css(element, "marginTop", true),
                left : offset.left - parentOffset.left - jQuery.css(element, "marginLeft", true)
              };
            }
          },
          offsetParent : function() {
            return this.map(function() {
              var parent = this.offsetParent;
              for (; parent && "static" === jQuery.css(parent, "position");) {
                parent = parent.offsetParent;
              }
              return parent || node;
            });
          }
        });
        jQuery.each({
          scrollLeft : "pageXOffset",
          scrollTop : "pageYOffset"
        }, function(type, prop) {
          var top = "pageYOffset" === prop;
          jQuery.fn[type] = function(value) {
            return access(this, function(node, method, val) {
              var win;
              if (isWindow(node) ? win = node : 9 === node.nodeType && (win = node.defaultView), void 0 === val) {
                return win ? win[prop] : node[method];
              }
              if (win) {
                win.scrollTo(top ? win.pageXOffset : val, top ? val : win.pageYOffset);
              } else {
                node[method] = val;
              }
            }, type, value, arguments.length);
          };
        });
        jQuery.each(["top", "left"], function(canCreateDiscussions, prop) {
          jQuery.cssHooks[prop] = addGetHookIf(support.pixelPosition, function(parent, val) {
            if (val) {
              return val = curCSS(parent, prop), rnumnonpx.test(val) ? jQuery(parent).position()[prop] + "px" : val;
            }
          });
        });
        jQuery.each({
          Height : "height",
          Width : "width"
        }, function(name, type) {
          jQuery.each({
            padding : "inner" + name,
            content : type,
            "" : "outer" + name
          }, function(defaultExtra, type) {
            jQuery.fn[type] = function(margin, boardManager) {
              var chainable = arguments.length && (defaultExtra || "boolean" != typeof margin);
              var extra = defaultExtra || (true === margin || true === boardManager ? "margin" : "border");
              return access(this, function(el, offset, undefined) {
                var doc;
                return isWindow(el) ? 0 === type.indexOf("outer") ? el["inner" + name] : el.document.documentElement["client" + name] : 9 === el.nodeType ? (doc = el.documentElement, Math.max(el.body["scroll" + name], doc["scroll" + name], el.body["offset" + name], doc["offset" + name], doc["client" + name])) : void 0 === undefined ? jQuery.css(el, offset, extra) : jQuery.style(el, offset, undefined, extra);
              }, type, chainable ? margin : void 0, chainable);
            };
          });
        });
        jQuery.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(canCreateDiscussions, type) {
          jQuery.fn[type] = function(volumeChange) {
            return this.on(type, volumeChange);
          };
        });
        jQuery.fn.extend({
          bind : function(type, data, fn) {
            return this.on(type, null, data, fn);
          },
          unbind : function(type, fn) {
            return this.off(type, null, fn);
          },
          delegate : function(callback, type, fn, t) {
            return this.on(type, callback, fn, t);
          },
          undelegate : function(selector, event, callback) {
            return 1 === arguments.length ? this.off(selector, "**") : this.off(event, selector || "**", callback);
          },
          hover : function(fnOver, fnOut) {
            return this.mouseenter(fnOver).mouseleave(fnOut || fnOver);
          }
        });
        jQuery.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "), function(canCreateDiscussions, type) {
          jQuery.fn[type] = function(data, callback) {
            return arguments.length > 0 ? this.on(type, null, data, callback) : this.trigger(type);
          };
        });
        var rvolatile = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
        jQuery.proxy = function(f, c) {
          var j;
          var headArgs;
          var proxy;
          if ("string" == typeof c && (j = f[c], c = f, f = j), isFunction(f)) {
            return headArgs = slice.call(arguments, 2), proxy = function() {
              return f.apply(c || this, headArgs.concat(slice.call(arguments)));
            }, proxy.guid = f.guid = f.guid || jQuery.guid++, proxy;
          }
        };
        jQuery.holdReady = function(hold) {
          if (hold) {
            jQuery.readyWait++;
          } else {
            jQuery.ready(true);
          }
        };
        jQuery.isArray = Array.isArray;
        jQuery.parseJSON = JSON.parse;
        jQuery.nodeName = callback;
        jQuery.isFunction = isFunction;
        jQuery.isWindow = isWindow;
        jQuery.camelCase = camelCase;
        jQuery.type = type;
        jQuery.now = Date.now;
        jQuery.isNumeric = function(value) {
          var undefined = jQuery.type(value);
          return ("number" === undefined || "string" === undefined) && !isNaN(value - parseFloat(value));
        };
        jQuery.trim = function(text) {
          return null == text ? "" : (text + "").replace(rvolatile, "");
        };
        if (!(void 0 === (multiple = function() {
          return jQuery;
        }.apply(args, [])))) {
          module.exports = multiple;
        }
        var _jQuery = window.jQuery;
        var old$ = window.$;
        return jQuery.noConflict = function(deep) {
          return window.$ === jQuery && (window.$ = old$), deep && window.jQuery === jQuery && (window.jQuery = _jQuery), jQuery;
        }, void 0 === canCreateDiscussions && (window.jQuery = window.$ = jQuery), jQuery;
      });
    },
    850 : () => {
    }
  };
  var cache = {};
  t.m = m;
  nodes = [];
  t.O = (t, x, y, w) => {
    if (!x) {
      var h = 1 / 0;
      i = 0;
      for (; i < nodes.length; i++) {
        var [x, y, w] = nodes[i];
        var a = true;
        var k = 0;
        for (; k < x.length; k++) {
          if ((false & w || h >= w) && Object.keys(t.O).every((i) => {
            return t.O[i](x[k]);
          })) {
            x.splice(k--, 1);
          } else {
            a = false;
            if (w < h) {
              h = w;
            }
          }
        }
        if (a) {
          nodes.splice(i--, 1);
          var w = y();
          if (void 0 !== w) {
            t = w;
          }
        }
      }
      return t;
    }
    w = w || 0;
    var i = nodes.length;
    for (; i > 0 && nodes[i - 1][2] > w; i--) {
      nodes[i] = nodes[i - 1];
    }
    nodes[i] = [x, y, w];
  };
  t.o = (e, input) => {
    return Object.prototype.hasOwnProperty.call(e, input);
  };
  (() => {
    var obj = {
      773 : 0,
      870 : 0
    };
    t.O.j = (f) => {
      return 0 === obj[f];
    };
    var parse = (_, val) => {
      var n;
      var key;
      var [m, d, expected] = val;
      var i = 0;
      if (m.some((typeIdField) => {
        return 0 !== obj[typeIdField];
      })) {
        for (n in d) {
          if (t.o(d, n)) {
            t.m[n] = d[n];
          }
        }
        if (expected) {
          var op = expected(t);
        }
      }
      if (_) {
        _(val);
      }
      for (; i < m.length; i++) {
        key = m[i];
        if (t.o(obj, key) && obj[key]) {
          obj[key][0]();
        }
        obj[m[i]] = 0;
      }
      return t.O(op);
    };
    var history = self.webpackChunk = self.webpackChunk || [];
    history.forEach(parse.bind(null, 0));
    history.push = parse.bind(null, history.push.bind(history));
  })();
  t.O(void 0, [870], () => {
    return t(1);
  });
  var e = t.O(void 0, [870], () => {
    return t(850);
  });
  e = t.O(e);
})();
