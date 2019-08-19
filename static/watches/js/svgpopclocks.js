var SVGPopWatch = (function () {

	SVGPopWatch.TimeUpdater = (function () {
		function TimeUpdater(params) {
			this.parent = params.parent;
			this.updateInterval = params.updateInterval;
			this.displaySeconds = params.displaySeconds;

			this.computeTimeAndDate(params.customDate);
			this.updaterSetup();
		};

		TimeUpdater.prototype.computeTimeAndDate = function (customDate) {
			if (customDate) {
				this.initialDate = new Date(customDate);
			} else {
				this.initialDate = new Date();
			}

			// Save initial time
			this.time = {
				hours: this.initialDate.getHours(),
				minutes: this.initialDate.getMinutes(),
				seconds: this.initialDate.getSeconds(),
				milliseconds: this.initialDate.getMilliseconds()
			};

			// Save initial date
			this.date = {
				year: this.initialDate.getFullYear(),
				month: this.initialDate.getMonth(),
				day: this.initialDate.getDate(),
			};
		};

		TimeUpdater.prototype.updaterSetup = function () {
			// The first time the pointers move, is not exactly one minute after the svg is loaded
			if (this.updateInterval === 'stop') return;

			// Setup updateTime
			if (this.updateInterval > 1000) {
				this.initialDelay = (60 - this.time.seconds) * 1000;
				setTimeout(bind(this, function () {
					this.updateTime();
					setInterval(bind(this, this.updateTime), this.updateInterval);
				}), this.initialDelay);
			} else {
				setInterval(bind(this, this.updateTime), this.updateInterval);
			}

			// Setup updateDate
			var midnight = new Date(this.date.year, this.date.month, this.date.day, 24, 0, 0, 0);
			var timeToMidnight = midnight.getTime() - this.initialDate.getTime();
			setTimeout(bind(this, function () {
				this.updateDate();
				setInterval(bind(this, this.updateDate), 86400000);
			}), timeToMidnight);
		};

		TimeUpdater.prototype.updateDate = function () {
			var dateObject = new Date(this.date.year, this.date.month, this.date.day);
			dateObject.setDate(dateObject.getDate() + 1);
			this.date.year = dateObject.getFullYear();
			this.date.month = dateObject.getMonth();
			this.date.day = dateObject.getDate();

			window.dispatchEvent(this.parent.dateUpdatedEvent);
		};

		TimeUpdater.prototype.updateTime = function () {
			var dateObject = new Date(0, 0, 0, this.time.hours, this.time.minutes, this.time.seconds, this.time.milliseconds);
			dateObject.setTime(dateObject.getTime() + this.updateInterval);
			this.time.hours = dateObject.getHours();
			this.time.minutes = dateObject.getMinutes();
			this.time.seconds = dateObject.getSeconds();
			this.time.milliseconds = dateObject.getMilliseconds();

			window.dispatchEvent(this.parent.timeUpdatedEvent);
		};

		return TimeUpdater;
	})();

	SVGPopWatch.SizeUpdater = (function () {
		function SizeUpdater(params) {
			this.parent = params.parent;
			this.svgElement = params.svgElement;
			this.details = params.details;

			window.addEventListener("resize", bind(this, this.updateSVG));
			this.updateSVG();
		};

		SizeUpdater.prototype.updateSVG = function () {
			var width = this.svgElement.getBoundingClientRect().width;
			if (width < 64) {
				this.hideLabels();
				this.hideWeather();
			} else if (width < 96) {
				this.showLabels();
				this.hideWeather();
			} else {
				this.showLabels();
				this.showWeather();
			}
		};

		SizeUpdater.prototype.hideLabels = function () {
			if (!this.parent.clockLabels) return;
			this.parent.clockLabels.attr({
				opacity: 0
			});
		};

		SizeUpdater.prototype.hideWeather = function () {
			this.isWeatherVisible = false;
			if (!this.parent.weatherUpdater) return;
			this.parent.weatherUpdater.weatherDetails.attr({
				opacity: 0
			});
		};

		SizeUpdater.prototype.showLabels = function () {
			if (!this.parent.clockLabels) return;
			this.parent.clockLabels.attr({
				opacity: this.parent.clockStyle.fillOpacity
			});
		};

		SizeUpdater.prototype.showWeather = function () {
			this.isWeatherVisible = true;
			if (!this.parent.weatherUpdater) return;
			this.parent.weatherUpdater.weatherDetails.attr({
				opacity: this.parent.weatherStyle.opacity
			});
		};

		return SizeUpdater;
	})();

	SVGPopWatch.PointerUpdater = (function () {
		function PointerUpdater(params) {
			this.parent = params.parent;
			this.hoursPointer = params.hoursPointer;
			this.minutesPointer = params.minutesPointer;
			this.secondsPointer = params.secondsPointer;

			window.addEventListener('timeUpdated', bind(this, this.updatePointers));
		};

		PointerUpdater.prototype.updatePointers = function () {
			if (this.parent.timeUpdater.displaySeconds) {
				this.secondPointerAngle = this.parent.timeUpdater.time.seconds * 6.0;
				this.rotatePointer(this.secondsPointer, this.secondPointerAngle, '128 128');
			}

			this.minutePointerAngle = this.parent.timeUpdater.time.minutes * 6.0 + this.parent.timeUpdater.time.seconds * 0.1;
			this.rotatePointer(this.minutesPointer, this.minutePointerAngle, '128 128');

			this.hourPointerAngle = ((this.parent.timeUpdater.time.hours % 12) * 30.0) + (this.parent.timeUpdater.time.minutes * 0.5);
			this.rotatePointer(this.hoursPointer, this.hourPointerAngle, '128 128');
		};

		PointerUpdater.prototype.rotatePointer = function (pointer, angle, clockCenter) {
			pointer.attr({
				'transform': 'r' + angle + ' ' + clockCenter
			});
		}

		return PointerUpdater;
	})();

	SVGPopWatch.WeatherUpdater = (function () {
		function WeatherUpdater(params) {
			this.parent = params.parent;
			this.weatherLocation = params.weatherLocation;
			this.weatherPath = params.weatherPath;

			this.updateWeather();
			setInterval(bind(this, this.updateWeather), 1000 * 60 * 60);
		};

		WeatherUpdater.prototype.updateWeather = function () {
			var xhr = new XMLHttpRequest();

			// Forecast
			if (this.parent.weatherDate) {
				xhr.open("GET", "http://api.openweathermap.org/data/2.5/forecast/daily?q="
					+ this.weatherLocation.city + ","
					+ this.weatherLocation.country
					+ "&cnt=" + this.parent.weatherDate
					+ "&APPID=4b8d50c3bbf4b20b2a5dcd37bd580aae", true);
			} else {
				xhr.open("GET", "http://api.openweathermap.org/data/2.5/weather?q="
					+ this.weatherLocation.city + ","
					+ this.weatherLocation.country
					+ "&APPID=4b8d50c3bbf4b20b2a5dcd37bd580aae", true);
			}

			xhr.onload = bind(this, function (e) {
				if (xhr.readyState === 4) {
					if (xhr.status === 200) {
						var response = JSON.parse(xhr.responseText);
						if (this.parent.weatherDate) {
							this.weatherCode = response.list[this.parent.weatherDate - 1].weather[0].icon;
						} else {
							this.weatherCode = response.weather[0].icon;
						}
						Snap.load(this.weatherPath + this.weatherCode + '.svg', bind(this, this.onWeatherLoaded));
					} else {
						console.error(xhr.statusText);
					}
				}
			});
			xhr.onerror = function (e) {
				console.error(xhr.statusText);
			};
			xhr.send(null);
		};

		WeatherUpdater.prototype.onWeatherLoaded = function (data) {
			if (this.weatherDetails) {
				this.weatherDetails.animate({
					opacity: 0,
				}, 500, mina.easeinout);
				this.weatherDetails.remove();
			}
			this.parent.snap.append(data.select("#weather"));


			this.weatherDetails = this.parent.snap.select("#weather");
			this.weatherDetails.insertAfter(this.parent.clockZone);
			this.weatherDetails.attr({
				opacity: 0,
				transform: 's' + this.parent.pointerScaleFactor + ' ' + this.parent.pointerScaleFactor + ' 128 128'
			});
			var weatherElements = this.weatherDetails.selectAll('*');
			if (this.parent.weatherStyle.style === 'monochrome') {
				var self = this;
				weatherElements.forEach(function (element) {
					element.attr({
						fill: self.parent.weatherStyle.color,
						stroke: self.parent.weatherStyle.color
					});
				});
			} else if (this.parent.weatherStyle.style === 'stroke-only') {
				var self = this;
				weatherElements.forEach(function (element) {
					element.attr({
						stroke: self.parent.weatherStyle.color,
						fillOpacity: 0
					});
				});
			}
			this.weatherDetails.animate({
				opacity: this.parent.sizeUpdater.isWeatherVisible? this.parent.weatherStyle.opacity : 0
			}, 1000, mina.easeinout);
		};

		return WeatherUpdater;
	})();

	function SVGPopWatch(parameters) {
		this.targetElementId = 'svg',
		this.clockBasePath = 'svg/base/',
		this.clockPointersPath = 'svg/pointers/',
		this.weatherPath = 'svg/weather/',
		this.clockStyle = {
			watchFace: 'base1.svg',
			fill: '#fff',
			fillOpacity: 1,
			stroke: '#000',
			strokeOpacity: 1,
			labelColor: '#000'
		};
		this.pointerStyle = {
			pointers: 'pointers11.svg',
			hours: {
				fill: '#000',
				fillOpacity: 1,
				stroke: '#000',
				strokeOpacity: 1,
			},
			minutes: {
				fill: '#000',
				fillOpacity: 1,
				stroke: '#000',
				strokeOpacity: 1,
			},
			seconds: {
				fill: '#000',
				fillOpacity: 1,
				stroke: '#000',
				strokeOpacity: 1,
			}
		};
		this.weatherStyle = {
			style: 'default', //monochrome, stroke-only, default
			color: '#000',
			opacity: 1
		};
		this.updateInterval = 1000;
		this.displaySeconds = true;
		this.info = {
			weather: true
		};
		this.weatherLocation = {
			city: 'south boston',
			country: 'us'
		};
		for (var k in parameters) {
			this[k] = parameters[k];
		}
		this.createEvents();
		this.snapSetup();
	};

	SVGPopWatch.prototype.createEvents = function () {
		this.timeUpdatedEvent = document.createEvent('Event');
		this.timeUpdatedEvent.initEvent('timeUpdated', true, true);

		this.dateUpdatedEvent = document.createEvent('Event');
		this.dateUpdatedEvent.initEvent('dateUpdated', true, true);
	}

	SVGPopWatch.prototype.snapSetup = function () {
		this.snap = Snap("#" + this.targetElementId);
		this.svgElement = document.getElementById(this.targetElementId);
		Snap.load(this.clockBasePath + this.clockStyle.watchFace, bind(this, this.onWatchFaceLoaded));
		Snap.load(this.clockPointersPath + this.pointerStyle.pointers, bind(this, this.onPointersLoaded));
	};

	SVGPopWatch.prototype.initWatchFace = function () {
		if (this.clockStyle.strokeWidth) {
			this.innerClockRadius = 128 - (this.clockStyle.strokeWidth / 2);
		} else {
			this.innerClockRadius = this.clockZone.attr('r');
			this.clockStyle.strokeWidth = 256 - 2 * this.innerClockRadius;
		}
		this.clockZone.attr(this.clockStyle);
		this.clockZone.attr({
			transform: 'r-90',
			strokeDasharray: this.clockZone.perimeter,
			strokeDashoffset: -this.clockZone.perimeter,
			fillOpacity: 0,
			r: this.innerClockRadius
		});

		var newLabelWidth = 128 - this.clockStyle.strokeWidth - 8;
		var labelScaleFactor = newLabelWidth / (this.clockLabels.getBBox().w / 2);
		this.clockLabels.attr({
			opacity: 0,
			transform: 's' + labelScaleFactor
		});

		var allLabels = this.clockLabels.selectAll('*');
		var self = this;
		allLabels.forEach(function (element) {
			element.attr({
				opacity: 0,
				fill: self.clockStyle.labelColor,
				stroke: self.clockStyle.labelColor,
			});
		})

		this.showWatchFace();
	}

	SVGPopWatch.prototype.initPointers = function () {
		this.pointerScaleFactor = (116 - this.clockStyle.strokeWidth) / 116;
		this.pointerGroup.attr({
			opacity: 0,
			transform: 's0.05 0.05 128 128'
		})

		var self = this;

		this.hoursPointer.attr({transform: 'r' + this.hourPointerAngle + ' 128 128'});
		this.hoursPointer.attr(this.pointerStyle.hours);
		var hoursPointerElements = this.hoursPointer.selectAll('*');
		hoursPointerElements.forEach(function (element) {
			element.attr(self.pointerStyle.hours);
		});

		this.minutesPointer.attr({transform: 'r' + this.minutePointerAngle + ' 128 128'});
		this.minutesPointer.attr(this.pointerStyle.minutes);
		var minutesPointerElements = this.minutesPointer.selectAll('*');
		minutesPointerElements.forEach(function (element) {
			element.attr(self.pointerStyle.minutes);
		});

		if (this.displaySeconds) {
			this.secondsPointer.attr({transform: 'r' + this.secondPointerAngle + ' 128 128'});
			this.secondsPointer.attr(this.pointerStyle.seconds);
			var secondsPointerElements = this.secondsPointer.selectAll('*');
			secondsPointerElements.forEach(function (element) {
				element.attr(self.pointerStyle.seconds);
			});
		} else {
			this.secondsPointer.attr({
				opacity: 0
			})
		}
	};

	SVGPopWatch.prototype.showWatchFace = function () {
		// Initial animations
		this.clockZone.animate({
			'stroke-dashoffset': '0',
		}, 1000, mina.easein,
		bind(this, function () {
				this.clockLabels.animate({
					opacity: this.clockStyle.fillOpacity,
				}, 1000, mina.easein);
				this.clockZone.animate({
					fillOpacity: this.clockStyle.fillOpacity,
					strokeOpacity: this.clockStyle.strokeOpacity
				}, 1000, mina.easeinout);

				var allLabels = this.clockLabels.selectAll('*');
				var self = this;
				allLabels.forEach(function (element) {
					element.animate({
						opacity: self.clockStyle.fillOpacity,
					}, 1000, mina.easein);
				})
				this.showPointers();
			}));
	};

	SVGPopWatch.prototype.showPointers = function () {
		this.pointerGroup.animate({
			opacity: 1,
			transform: 's' + this.pointerScaleFactor + ' ' + this.pointerScaleFactor + ' 128 128'
		}, 1000, mina.easeinout);
	};

	SVGPopWatch.prototype.onWatchFaceLoaded = function (data) {
		this.snap.append(data.select('#clock-zone'));
		this.snap.append(data.select('#clock-labels'));

		this.clockZone = this.snap.select("#clock-zone");
		this.clockLabels = this.snap.select("#clock-labels");
		this.clockZone.perimeter = 4 * Math.PI * this.clockZone.attr("r");
		this.clockGroup = this.snap.group(this.clockZone, this.clockLabels);

		if (this.pointerGroup) {
			this.clockGroup.after(this.pointerGroup);
		}

		this.initWatchFace();
	};

	SVGPopWatch.prototype.onPointersLoaded = function (data) {
		this.snap.append(data.select('#hours'));
		this.snap.append(data.select('#minutes'));
		this.snap.append(data.select('#seconds'));

		this.hoursPointer = this.snap.select("#hours");
		this.minutesPointer = this.snap.select("#minutes");
		this.secondsPointer = this.snap.select("#seconds");
		this.pointerGroup = this.snap.group(this.hoursPointer, this.minutesPointer, this.secondsPointer);

		this.initPointers();

		this.sizeUpdater = new SVGPopWatch.SizeUpdater({
			parent: this,
			svgElement: this.svgElement
		});

		this.pointerUpdater = new SVGPopWatch.PointerUpdater({
			parent: this,
			hoursPointer: this.hoursPointer,
			minutesPointer: this.minutesPointer,
			secondsPointer: this.secondsPointer
		});

		this.timeUpdater = new SVGPopWatch.TimeUpdater({
			parent: this,
			updateInterval: this.updateInterval,
			displaySeconds: this.displaySeconds,
			customDate: this.customDate
		});

		if (this.info.weather) {
			this.weatherUpdater = new SVGPopWatch.WeatherUpdater({
				parent: this,
				weatherLocation: this.weatherLocation,
				weatherPath: this.weatherPath
			});
		}

	};

	/**
	 * Helper function to pass object scope to function callbacks
	 */
	function bind(scope, fn) {
		return function () {
			return fn.apply(scope, arguments);
		}
	}

	return SVGPopWatch;
})();
