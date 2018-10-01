"use strict";
class Suranadira {
  constructor(properties) {

    /**
     * The properties bag
     */
    this.properties = [];

    /**
     * Initial properties
     */
    this.applyProperties(properties);

    /**
     * Type definitions
     */
    this.priorities = {
      "none": 0,
      "voices": 1,
      "characters": 2,
      "both": 3
    };
    this.phases = {
      "none": 0,
      "elements": 1,
      "radicals": 2,
      "roots": 3,
      "words": 4
    };
    this.syllablesColorCodingModes = {
      "none": 0,
      "allSyllables": 1
    };
    this.charactersColorCodingModes = {
      "none": 0,
      "someComponentCycles": 1,
      "allComponentCycles": 2,
      "someElements": 3,
      "allElements": 4,
      "someLevels": 5,
      "allPhases": 6
    };
    this.voicesColorCodingModes = {
      "none": 0,
      "groupVoices": 1,
      "allGroups": 2
    };
    this.opacityTypes = {
      "opacityFull": 1,
      "opacityDimmed": 0.3,
      "opacityNone": 0
    };


    /**
     * Public properties
     * NB: Do not overwrite the initial properties!
     */
    properties = {
      "classEnabled": true,
      "debug": false,
      "user": null,
      "overridePentade": null // new Big("0") // 2037 // 1968 // 1939 // 1940 // null // new Big("1015") // 4090 // null // new Big("2038") // new Big("1970") // 9882 null // new Big("4093") // 4096 | null // new Big("74864608542088869"); // null
    }
    this.applyProperties(properties, false);

    /**
     * Object bindings
     */
    properties = {
      "stage": $("#stage"),
      "canvas": $("#canvas_sura"),
      "canvas_": document.getElementById("canvas_sura"),
      "canvasRC": $("#canvas_rc"),
      "canvasCircles": $("#canvas_circles"),
      "buffer": $("#buffer"),
      "buffer2": $("#buffer2"),
      "score": $("#score"),
      "score2": $("#score2"),
      "pentadeSelectorContainerID": "#pentade-selector-container",
      "pentadeSelectorContainer": $("#pentade-selector-container"),
      "pentadeSelectorClass": ".pentade-selector",
      "pentadeSelectors": $(".pentade-selector"),
      "pentadeSelector": $("#pentade-selector")
    }
    this.applyProperties(properties);

    /**
     * Behaviour properties
     */
    properties = {
      "unit": 40, // 13 (min) | 16 | 40; 15; // 20; // init (3..n)
      "startLevel": 0,
      "endLevel": 19, // 7 // 3 // 11; // 27; // 15; // 55; // 52; // if set to null, end level is calculated
      "startExcerptCharacters": 0,
      "endExcerptCharacters": 19,
      "startExcerptVoices": 0,
      "endExcerptVoices": 19,
      "voicesPerGroup": 4,  // this.height
      "singleStrand": false,  // init
      "bufferMarginX": -5,  // -5; // 0; // units
      "preloadPositions": 5, // *** DO NOT CHANGE THIS ***
      "animateStepUnits": 1,   // 5; // units
      "rcOffsetX": 15,
      "hideIdleCursorAfter": 3 // seconds
    }
    this.applyProperties(properties);

    /**
     * Appearance properties
     */
    properties = {
      "canvasAspectRatio": 2.39, // 39 // 1.2 | 2.39;
      "width": null, // init, Suranadira width in units, will be set according to the screen width
      "height": this.endLevel - this.startLevel + 1,
      // "colors": ["steelblue", "MediumSeaGreen", "maroon", "gold", "BlueViolet", "DarkSlateGray"],
      "colors": ["#4682B4", "#3CB371", "#800000", "#FFD700", "#8A2BE2", "#2F4F4F"],
      "colorsDimmed": [], // calculated at runtime
      "backgroundColor": "black",
      "strokeWidth": 5, // init
      "strokeWidthVoices": 3, // 3
      "strokeWidthTruthGrid": 1,
      "opacityCharacters": 1, // 0 | 1
      "opacityVoices": 1, // 1 | 0.3
      "opacityCircles": 1,
      "opacityTruthGrid": 0.7,
      "radiusCircles": Math.round(18 / 100 * this.unit) // 20
    }
    this.applyProperties(properties);

    /**
     * Initial behaviour properties
     */
    properties = {
      "priority": this.priorities.characters,
      "trimCharacters": false, // false,
      "markLevels": [1], // [1, 2, 3, 4],
      "markElements": [0, 1, 5],
      "phaseMode": this.phases.roots, // words radicals
      "syllablesColorCodingMode": this.syllablesColorCodingModes.allSyllables,
      "charactersColorCodingMode": this.charactersColorCodingModes.allElements, // allComponentCycles // allPhases // allComponentCycles;
      "voicesColorCodingMode": this.voicesColorCodingModes.allGroups // none | groupVoices | allGroups
    }
    this.applyProperties(properties);

    /**
     * Time constants
     */
    properties = {
      "secondsPerDay": 86400,
      "pentadesPerDay": Math.pow(2, 12), // One day = 12 Levels
      "scoreTempo": 4218.75, // 8437.5 / this.time_ratio; // 2109.375; // 4218.75; // 2109.375; // 8437.5; // 4218.75; // 5273.4375; 14 levels (pro pentade) | 4218.75; // 12 Levels (pro position)
      "useEra": true
    }
    this.applyProperties(properties);

    /**
     * Time properties
     */
    properties = {
      "positionsPerDay": 5 * this.pentadesPerDay,
      "msPerPosition": this.secondsPerDay / this.positionsPerDay * 1000,
      "msPerPentade": 5 * this.msPerPosition,
      "animationTempo": this.scoreTempo / 4, // 1318.359375; // Math.round(this.scoreTempo * 0.618)
      "animationEasing": "swing"
    }
    this.applyProperties(properties);

    /**
     * Enable/disable properties
     */
    properties = {
      "voicesEnabled": true,
      "circlesEnabled": true,
      "charactersEnabled": true,
      "truthGridEnabled": false,
      "syllablesEnabled": false,
      "animationEnabled": true,
      "scoreEnabled": true,
      "metronomeEnabled": false,
      "runtimeCommandsEnabled": true
    }
    this.applyProperties(properties, false);

    /**
     * Runtime properties
     */
    properties = {
      "dec": "",
      "isLevelVisible": false,
      "currLevel": 0,
      "left": null,
      "offsetX": 0,
      "offsetY": this.unit / 2,
      "mouseEventsAllowed": true,
      "stageTop": null,
      "stageWidth": null,
      "stageHeight": null,
      "wesen": null,
      "preloadedPosition": null,
      "preloadedPentade": null,
      "currentPosition": null,
      "isSynchronizing": false,
      "circlesOffsetX": 28,
      "windowHeight": 0,
      "selectedPentade": 0,
      "bufferTime": 0,  // -1; // init
      "timerSuranadira": null,
      "timerWindowResizing": null,
      "timerMouseMove": null,
      "countBufferReloaded": 0,
      "bufferLocalPosition": 0,
      "groups": Math.floor(this.height / this.voicesPerGroup), // 1
      "audioContext": null,
      "osc": null, // oscillator
      "workerRuntime": null, // runtime Worker
      // "sharedWorker": null, // shared Worker
      "isInitialized": false,
      "fields": [], // debug fields, supplied by the external js-script "fields.js"
      "fieldsCache": [],
      "voiceLevels": [],
      "voiceLevels2": [],
      "scoreBeats": [],
      "scoreBeats2": [], // buffered
      "partCurrent": null,
      "pageCurrent": null,
      "beatCurrent": null,
      "partLast": 63,
      "beatStart": null,
      "pageWidth": null,
      "pageHeight": null,
      "pageScale": 1.71875,
      "isPageLoaded": false,
      "scoreHeight": null,
      "dn": [] // delta numbers of pentades
    }
    this.applyProperties(properties);

    /**
     * Testing properties
     */
    // properties = {
    //   "overridePentade": null // 2037 // 1968 // 1939 // 1940 // null // new Big("1015") // 4090 // null // new Big("2038") // new Big("1970") // 9882 null // new Big("4093") // 4096 | null // new Big("74864608542088869"); // null
    // }
    // this.applyProperties(properties);

    /**
     * Private properties
     */
    if (this.classEnabled) {
      this.activateWorkerRuntime();
      // else this.initAndLoadEvents();
    }
  }

  recalculateProperties() {
    // console.log("recalculateProperties");
    this.height = this.endLevel - this.startLevel + 1;
    this.radiusCircles = Math.round(18 / 100 * this.unit); // 20
    this.positionsPerDay = 5 * this.pentadesPerDay;
    this.msPerPosition = this.secondsPerDay / this.positionsPerDay * 1000;
    this.msPerPentade = 5 * this.msPerPosition;
    this.animationTempo = this.scoreTempo / 4; // 1318.359375; // Math.round(this.scoreTempo * 0.618)
    this.offsetY = this.unit / 2;
    this.groups = Math.floor(this.height / this.voicesPerGroup);
    this.trimCharacters = (this.voicesEnabled || this.circlesEnabled) && this.charactersEnabled;
    this.updateCircles();
    this.updateScore();
  }

  generateDimmedColors() {
    var this_ = this, thisHex, thisRGB, thisHSL, thisH, thisS, thisL;
    $.each(this.colors, function(id, color) {
      // console.log(id, color);
      thisRGB = this_.hexToRgb(color);
      if (thisRGB != null) {
        thisHSL = this_.rgbToHsl(thisRGB.r, thisRGB.g, thisRGB.b);
        // console.log(thisHSL);
        thisH = thisHSL.h / 1;
        thisS = thisHSL.s / 1;
        thisL = thisHSL.l / 5;
        // console.log(thisL);
        thisRGB = this_.hslToRgb(thisH, thisS, thisL);
        thisHex = this_.rgbToHex(thisRGB.r, thisRGB.g, thisRGB.b);
      } else {
        thisHex = color;
      }
      this_.colorsDimmed[id] = thisHex;
    });
    // console.log(this_.colorsDimmed);
  }

  /**
   * Animation Functions
   */

  hideCircles() {
    this.canvasCircles.hide();
  }

  showCircles() {
    this.canvasCircles.show();
  }

  /**
   * Function animateCircles
   * @return {void}
   */
  animateCircles() {
    // if (!this.circlesEnabled) {
    //   this.hideCircles();
    // } else {
    //   this.showCircles();
    // }
    var debug = false;
    var this_ = this;
    var circles_unprocessed = this.height;
    var half_stroke_width = this.strokeWidthVoices / 2;
    var vy;

    var x = this.bufferTime + 1 + this.circlesOffsetX;
    try {
      for (var y = 0; y < this.height; y++) {
        if (y < this.startExcerptVoices || y > this.endExcerptVoices) continue;
      // for (var y = this.startLevel; y < this.endLevel + 1; y++) {
        vy = this.voiceLevels2[x][y]; // occasionally undefined "voiceLevels2" error occurs, probably after the sleep mode
        this.canvasCircles.stopLayer('circle' + y);
        this.canvasCircles.animateLayer('circle' + y, {
          y: vy * this.unit + this.offsetY + half_stroke_width
          // opacity: this.opacityCircles
        }, {
          duration: this_.animationTempo,
          easing: this_.animationEasing,
          complete: function (layer) {
            circles_unprocessed--;
            if (circles_unprocessed == 0) {
              if (debug) console.log("All circles processed");
            }
          }
        });
      } // for
    } catch(error) {
      console.log(error);
    }
    this_.bufferTime++;
  }

  isLastPage() {
    return this.pageCurrent >= this.getLastPageID();
  }

  getLastPageID() {
    if (this.partCurrent < 62) return 9;
    else return 10; // pages 62 and 63
  }

  loadScoreToBuffer(part, page) {
    // alert(page);
    // console.log(part, page);
    /// if (!this.scoreEnabled) return;
    this.showDebugInfo("loadScoreToBuffer", "part: " + part + ", page: " + page);
    var this_ = this;
    // if (this.pageCurrent == null) this.pageCurrent = 1;
    $(this.score2).attr("src", "controller/get_png.php?part-last=" + this.partLast + "&part=" + part + "&page=" + page + "&r=" + Math.random());
    // $(this.score2).attr("src", "controller/get_png.php?part-last=" + this.partLast + "&part=" + part + "&page=" + page);
    $(this.score2).on("load", function() {
      // console.log("score2 loaded");
      if (!this_.isPageLoaded) {
        this_.loadScoreFromBuffer(0);
        this_.animateScore(false, true);
        // var startBeat = this_.beatStart; // this_.beatCurrent;
        // console.log("startBeat (B): " + startBeat);
        // alert(this_.beatStart);
        this_.gotoBeat(this_.beatStart);
        this_.startTimer();
        if (this_.beatStart > 3) {
          if (!this_.isLastPage()) {
            // this_.showDebugInfo("test", "not last page (0)");
            this_.workerRuntime.postMessage(["retrieve-metronome", this_.user, this_.partCurrent, this_.pageCurrent + 1]);
          } else {
            // this_.showDebugInfo("test", "last page (0)");
            if (this_.partCurrent < this_.partLast) {
              this_.workerRuntime.postMessage(["retrieve-metronome", this_.user, this_.partCurrent + 1, 1]); // 2x
            } else {
              this_.workerRuntime.postMessage(["retrieve-metronome", this_.user, 1, 1]);
            }
          }
        } //
      }
    });
  }

  gotoBeat(beat_id) {
    for (var n = 1; n < beat_id + 1; n++) {
      this.animateScore(true, true);
    }
  }

  loadScoreFromBuffer(first_beat) {
    this.showDebugInfo("loadScoreFromBuffer", "part: " + this.partCurrent + ", page: " + this.pageCurrent);
    var this_ = this;
    var reset_position = true;
    // var left = 960 - 2 * 1275 / this.pageScale - first_beat / this.pageScale - 3;
    var left = (this.circlesOffsetX - this.preloadPositions) * this.unit - 2 * this.pageWidth / this.pageScale - first_beat / this.pageScale - 3;
    // this.showDebugInfo("test", this.circlesOffsetX * this.unit);
    // this.showDebugInfo("test", this.pageWidth);
    if (reset_position) {
      // console.log("visible:" + this.isVisible($(this.score2)));
      $(this.score2).offset({ left: left });
      // $(this.score2).css("left", left + "px");
      if (this.scoreEnabled) {
        this.show(this.score2);
        this.hide(this.score);
      }
      // this.score.hide();
    }
    $(this.score).attr("src", $(this.score2).attr("src"));

    if (reset_position) {
      $(this_.score).offset({ left: left });

      if (this_.scoreEnabled) {
        this_.show(this_.score);
        this_.hide(this_.score2);
        this_.updateCircles();
      }
    }
    this.isPageLoaded = true;
    // $(this.score).on("load", function() {
    //   $("body").fadeIn(500, function() {
    //   });
    // });
  }

  animateScore(increment, goto_beat) {
    if (!this.isPageLoaded) return;
    // if (!this.scoreBeats.length) return;
    if (!this.scoreBeats2.length) return;
    if (typeof increment == "undefined") increment = true;
    if (typeof goto_beat == "undefined") goto_beat = false;
    var this_ = this;
    var prev_last_beat, first_beat;
    if (this.beatCurrent == null) {
      this.beatCurrent = 0;
      this.showDebugInfo("beatCurrent", this.beatCurrent);
    }
    if (this.beatCurrent == 0) {
      prev_last_beat = (this.scoreBeats.length > 0 ? this.scoreBeats.pop() : 0);
      // console.log("prev_last_beat: " + prev_last_beat);
      this.scoreBeats = this.scoreBeats2.slice();
      first_beat = this.scoreBeats[0];
      this.scoreBeats[0] += prev_last_beat;
      if (increment) {
        this.pageCurrent++;
        if (this.pageCurrent > this.getLastPageID()) {
          this.partCurrent++;
          if (this.partCurrent > this.partLast) this.partCurrent = 1;
          this.showDebugInfo("partCurrent", this.partCurrent);
          this.pageCurrent = 1;
        }
        this.showDebugInfo("pageCurrent", this.pageCurrent);
      }
    }
    // console.log(this.beatCurrent);
    // if (this.beatCurrent == 0) this.score.offset({left: 960});
    // console.log("posX: " + this.scoreBeats[this.beatCurrent]);
    this.score.animate({
      left: "-=" + this.scoreBeats[this.beatCurrent] / this.pageScale
    }, !goto_beat ? this.animationTempo : (-1), function() {
      // console.log($(this_.score).offset().left);
      $(this_.score2).offset({ left: $(this_.score).offset().left });
      if (this_.beatCurrent == 0) this_.loadScoreFromBuffer(first_beat);
      this_.beatCurrent++;
      // console.log("beatCurrent (C): " + this_.beatCurrent);
      // console.log("scoreBeats (length): " + this_.scoreBeats.length);
      this_.beatCurrent %= (this_.scoreBeats.length - 1);
      this_.showDebugInfo("beatCurrent", this_.beatCurrent);

      if (this_.beatCurrent == 3) {
        // console.log("retrieve-metronome for: " + (this_.pageCurrent + 1));
        if (!this_.isLastPage()) {
          // this_.showDebugInfo("test", "not last page (1): " + this_.pageCurrent);
          this_.workerRuntime.postMessage(["retrieve-metronome", this_.user, this_.partCurrent, this_.pageCurrent + 1]);
        } else {
          // this_.showDebugInfo("test", "last page (1)");
          if (this_.partCurrent < this_.partLast) {
            this_.workerRuntime.postMessage(["retrieve-metronome", this_.user, this_.partCurrent + 1, 1]);
          } else {
            this_.workerRuntime.postMessage(["retrieve-metronome", this_.user, 1, 1]);
          }
        }
      }
    });
  }

  /**
   * Function animateBuffer
   * @return {[type]}   [description]
   */
  animateBuffer() {
    var debug = false;
    var this_ = this;

    /* Animate Pentade Selectors to follow the buffer */
    this.pentadeSelectorContainer.animate({
      left: "-=" + this_.unit * this_.animateStepUnits
    }, this_.animationTempo, function() {
      // do nothing
    });

    /* Animate buffer */
    this_.buffer.animate({
      left: "-=" + this_.unit * this_.animateStepUnits
    }, this_.animationTempo, function() {
      if (debug) console.log("Animation complete.");
      this_.preloadedPentade = this_.preloadedPentade.plus(this_.animateStepUnits / 5); // 1
      this_.showDebugInfo("preloadedPentade", this_.preloadedPentade);
      this_.currentPosition = this_.currentPosition.plus(1);
      this_.showDebugInfo("currentPosition", this_.currentPosition);
      // this_.adjustedPentade = this_.adjustedPentade.plus(this_.animateStepUnits / 5); // 1
      // this_.showDebugInfo("adjustedPentade", this_.adjustedPentade);
      //////// if (this_.runtimeCommandsEnabled) this_.workerRuntime.postMessage(["retrieve-configuration", this_.user]);
      if (this_.bufferLocalPosition % 5 == 0) {
        this_.calcDeltaForPentades();
        if (this_.runtimeCommandsEnabled) this_.workerRuntime.postMessage(["retrieve-configuration", this_.user]);
      } else if (this_.bufferLocalPosition % 5 == 2) {
        this_.preloadedPosition = this_.preloadedPosition.plus(this_.preloadPositions); // 5
        this_.showDebugInfo("preloadedPosition", this_.preloadedPosition.toString());
        this_.synchronizeSuranadira(this_.preloadedPosition);
        if (debug) console.log("preloadedPosition: " + this_.preloadedPosition);
        this_.getVoiceLevels(this_.getVoiceLevelsCurrent());
        this_.canvas.removeLayers();
        this_.drawSuranadira();
        // this_.preloadedPentade = this_.preloadedPentade.plus(this_.animateStepUnits); // new
      } else if (this_.bufferLocalPosition % 5 == 4) {
        this_.pentadeSelectors.trigger( "mouseleave" );
        this_.pentadeSelectorContainer.stop();
        this_.loadFromBuffer(true);
        // this_.preloadedPentade = this_.preloadedPentade.plus(this_.animateStepUnits); // new
        /// this_.showDebugInfo("preloadedPentade", this_.preloadedPentade);
      }
      this_.bufferLocalPosition += 1;
      this_.bufferLocalPosition %= 5;
      this_.showDebugInfo("bufferLocalPosition", this_.bufferLocalPosition);
      // if (this_.wesen != null) {
      //   this_.selectedPentade = Big(this_.selectedPentade).plus(1);
      //   console.log(parseInt(this_.selectedPentade));
      //   this_.drawRC(this_.selectedPentade);
      // }
      if (debug) console.log("x: " + parseInt(this_.bufferLocalPosition));
    });

  } ///

  /**
   * Drawing Functions
   */

   /**
    * Function drawSuranadira
    * @return {void}
    */
 	drawSuranadira() {
    switch (this.priority) {
      case this.priorities.characters:
        this.opacityVoices = this.opacityTypes.opacityDimmed;
        // this.opacityCircles = this.opacityTypes.opacityDimmed;
        this.opacityCharacters = this.opacityTypes.opacityFull;
        break;
      case this.priorities.none:
        this.opacityVoices = this.opacityTypes.opacityDimmed;
        // this.opacityCircles = this.opacityTypes.opacityDimmed;
        this.opacityCharacters = this.opacityTypes.opacityDimmed;
        break;
      case this.priorities.both:
        this.opacityVoices = this.opacityTypes.opacityFull;
        // this.opacityCircles = this.opacityTypes.opacityFull;
        this.opacityCharacters = this.opacityTypes.opacityFull;
        break;
      default: // this.priorities.voices
      this.opacityVoices = this.opacityTypes.opacityFull;
      // this.opacityCircles = this.opacityTypes.opacityFull;
      this.opacityCharacters = this.opacityTypes.opacityDimmed;
    }
    this.canvas.prop("width", this.width * this.unit);
    var addLevel = this.charactersEnabled && !this.trimCharacters ? 1 : 0;
    this.canvas.prop("height", (this.height + addLevel) * this.unit);
    this.drawBackground(this.canvas);
    if (this.truthGridEnabled) this.drawTruthGrid(this.canvas);
    if (this.priority == this.priorities.voices) {
      if (this.charactersEnabled) this.drawCharacters(this.canvas);
      if (this.voicesEnabled) this.drawVoices(this.canvas);
      /// this.drawCircles();
    } else {
      if (this.voicesEnabled) this.drawVoices(this.canvas);
      /// this.drawCircles();
      if (this.charactersEnabled) {
        this.drawCharacters(this.canvas);
      }
    }
    if (this.syllablesEnabled) this.drawSyllables(this.canvas);
    this.saveToBuffer();
 	}

   /**
    * Function drawRC
    * @param  {[type]} bufferLocalPentade [description]
    * @return {[type]}         [description]
    */
   drawRC(selectedPentade) {
     var color = 1; // 0
     this.dec = selectedPentade;
     this.canvasRC.removeLayers();
     this.canvasRC.drawLayers();
     this.compose(false, this.canvasRC, color);
   }

  /**
   * Function drawComponent
   * @param  {[type]}  canvas     [description]
   * @param  {[type]}  component     [description]
   * @param  {[type]}  strand        [description]
   * @param  {[type]}  delta         [description]
   * @param  {[type]}  predecessor   [description]
   * @param  {[type]}  x             [description]
   * @param  {[type]}  y             [description]
   * @param  {Boolean} is_split_form [description]
   * @return {[type]}                [description]
   */
	drawComponent(canvas, component, strand, delta, predecessor, x, y, is_split_form, color) {
		var _debug = false;
    color = color | 0;
		if (!is_split_form && $.inArray(component, ["Z", "S", "O", "I"]) < 0) {
      if (x > this.rcOffsetX + 6 && (strand && component == "N")) x -= 6;
  		if (x < this.rcOffsetX - 6 && (!strand && component == "U")) x += 6;
    }
		if (component == "V" || component == "I" || component == "O") {
			// do nothing
		} else {
			this.singleStrand = false; // test: 439411235102
		}
		switch (component) {
			case "J":
				x += delta < 2 ? -2 : -1;
				y = this.drawStretch(canvas, "H", component, delta - 1, x, y, color);
				this.drawElement(canvas, "J", component, delta < 2 ? x : x - 1, y, color);
				x += delta < 2 ? 0 : -1;
				strand = delta < 2 ? true : false;
				break;
			case "V":
				x -= 1;
				y = this.drawStretch(canvas, "H", component, delta - 1, x, y, color);
				this.drawElement(canvas, "V", component, x, y, color);
				x += 1;
				break;
			case "I":
				this.drawElement(canvas, !this.singleStrand ? "II" : "I", component, x, y, color);
				y += 1;
				break;
			case "U":
				x += !strand ? -3 : 0;
				strand = true;
				this.drawElement(canvas, "IA", component, x, y, color);
				y += 1;
				y = this.drawStretch(canvas, "M", component, delta, x, y, color);
				this.drawElement(canvas, "VI", component, x, y, color);
				x += 1;
				strand = false;
				break;
			case "N":
				x += !strand ? -1 : 2;
				strand = false;
				this.drawElement(canvas, "AI", component, x, y, color);
				y++;
				y = this.drawStretch(canvas, "M", component, delta, x, y, color);
				this.drawElement(canvas, "IV", component, x, y, color);
				strand = true;
				break;
			case "O":
				if (!strand) { // OI
					x -= 1;
					this.drawElement(canvas, !this.singleStrand ? "AI" : "A", component, x, y, color);
					y += 1;
					y = this.drawStretch(canvas, !this.singleStrand ? "M" : "H", component, !this.singleStrand ? delta : delta - 2, x, y, color);
					this.drawElement(canvas, !this.singleStrand ? "VI" : "V", component, x, y, color);
					x += 1; // test: 50
				} else { // IO
					this.drawElement(canvas, "IA", component, x, y, color);
					y += 1;
					y = this.drawStretch(canvas, "M", component, delta, x, y, color);
					this.drawElement(canvas, "IV", component, x, y, color);
				}
				break;
			case "Z":
        // console.log(y + ' == ' + this.endLevel);
				if (predecessor == "I1J1") {
					x += 2;
				} else {
          if (y == this.endLevel - 1) { // last level, do not shift Z-component
            x += !strand ? -1 : (delta % 2 == 0 ? -1 : -1);
          } else {
            x += !strand ? -1 : (delta % 2 == 0 ? -1 : -4); // test: 79
          }
					strand = !strand;
				};
				this.drawElement(canvas, "ZZ", component, x, y, color);
				if (predecessor == "I1J1") {
				} else {
					x += !strand ? (delta % 2 == 0 ? 0 : 3) : 0; // test: 47, 79, 143
				}
				break;
			case "S":
				if (y >= this.endLevel) {
					x += 0;
				} else {
					x += !strand ? (delta % 2 == 0 ? 0 : -3) : 0;
				}
				this.drawElement(canvas, "SS", component, x, y, color);
				strand = !strand;
				x += !strand ? (delta % 2 == 0 ? 1 : 1) : (delta % 2 == 0 ? 1 : -2); // test: 23, 39, 92, 156, 231243628466
				break;
			default:
				// unknown component
		}
		if (_debug) {
			console.log("predecessor: " + predecessor);
			console.log("component: " + component);
			console.log("strand: " + (strand ? "right" : "left"));
		}
		return {strand: strand, x: x};
	}

  /**
   * Function drawCharacters
   * @param  {[type]} canvas [description]
   * @return {[type]}        [description]
   */
  drawCharacters(canvas, color) {
    var color = 0;
    var left = new Big(this.preloadedPosition);
    var a, ax;
    var addLevel = this.trimCharacters ? 1 : 0;
    this.offsetX = -(this.offsetY); // offsetX + rc_offset;
    for(var y = 0; y < this.height - addLevel; y++) {
      if (y < this.startExcerptCharacters || y > this.endExcerptCharacters) continue;
    // for(var y = this.startLevel; y < this.endLevel; y++) {
      a = [];
      for(var x = 0; x < this.width; x++) {
        ax = left.plus(x); // absolute x
        a[0] = this.logos(ax, y);
        a[1] = this.logos(ax.minus(1), y + 1);
        a[2] = this.logos(ax.plus(1), y + 1);
        if (a[0] == 0) { // connector at the top
          color = this.getCharactersColor(ax, y);
          if (!a[1] || !a[2]) {
            if (!a[1]) this.drawStroke(canvas, ["suranadira", "stroke-1", "color-" + color], 1, x, y, color);
            if (!a[2]) this.drawStroke(canvas, ["suranadira", "stroke-2", "color-" + color], 2, x, y, color);
          } else {
            this.drawStroke(canvas, ["suranadira", "stroke-0", "color-" + color], 0, x, y, color);
          }
        }
      }
    }
    this.moveForwardSelectedElements(canvas);
  }

  /**
   * [moveForwardSelectedElements description]
   * @param  {[type]} canvas [description]
   * @return {[type]}        [description]
   */
  moveForwardSelectedElements(canvas) {
    // switch (this.charactersColorCodingMode) {
    //   case this.charactersColorCodingModes.someElements:
    //   case this.charactersColorCodingModes.allPhases:
        var layerGroup = canvas.getLayerGroup("color-1");
        // canvas.moveLayer(layerGroup, 1000);
        $.each(layerGroup, function(index, layer) {
          // console.log("MOVE");
          canvas.moveLayer(layer, 2000);
        });
        canvas.drawLayers();
    //     break;
    //   default:
    // }
  }

   /**
    * Function drawVoices
    * Draws the Suranadira voices.
    * @return {void}
    */
   drawVoices(canvas) {
     var colors, color = 1;
     var vy;
     // var half_stroke_width = this.strokeWidth / 2;
     var half_stroke_width = this.strokeWidthVoices / 2;
     if (this.priority == this.priorities.voices || this.priority == this.priorities.both) colors = this.colors;
     else colors = this.colorsDimmed;
     var obj = {
       layer: true,
       groups: ["suranadira", "voices", "voice-" + y],
       // strokeStyle: this.colors[color],
       rounded: true,
       closed: false,
       opacity: 1, // this.opacityVoices,
       strokeWidth: 2 * half_stroke_width
     };
     for(var y = 0; y < this.height; y++) {
       if (y < this.startExcerptVoices || y > this.endExcerptVoices) continue;
     // for(var y = this.startLevel; y < this.endLevel + 1; y++) {
       for(var x = 0; x < this.width; x++) {
         vy = this.voiceLevels[x][y];
         obj["x" + (x + 1)] = x * this.unit;
         obj["y" + (x + 1)] = vy * this.unit + this.offsetY + half_stroke_width;
         color = this.getVoiceColor(x, y);
         // obj["strokeStyle"] = this.colors[color];
         obj["strokeStyle"] = colors[color];
         // obj["strokeStyle"] = this.colors[0];
       }
       canvas.drawLine(obj);
     }
   }

   /**
    * Function drawCircles
    * @return {void}
    */
   drawCircles() {
     // if (!this.circlesEnabled) return;
     var obj, colors = this.colors, voice = 0, color = 0;
     var half_stroke_width = this.strokeWidthVoices / 2;
     // var half_stroke_width = this.strokeWidth / 2;
     // console.log(this.priority == this.priorities.voices || this.priority == this.priorities.both);
     // if (this.priority == this.priorities.voices || this.priority == this.priorities.both) colors = this.colors;
     // else colors = this.colorsDimmed;
     obj = {
       layer: true,
       groups: ["suranadira", "circles"],
       x: this.unit * 3,
       radius: this.radiusCircles,
       visible: false,
       // opacity: this.circlesEnabled ? this.opacityCircles : 0
       opacity: 0.7 // 1 // this.opacityCircles // 0
     };
     var x = this.bufferTime + 0 + this.circlesOffsetX;
     var vy;
     // var thisOpacity;
     for (var y = 0; y < this.height; y++) {
       // thisOpacity = this.circlesEnabled ? this.opacityCircles : 0;
       // if (y < this.startExcerptVoices || y > this.endExcerptVoices) thisOpacity = 0;
     // for (var y = this.startLevel; y < this.endLevel + 1; y++) {
       vy = this.voiceLevels2[x][y];
       obj["name"] = "circle" + y;
       color = this.getVoiceColor(x, y);
       obj["fillStyle"] = colors[color];
       obj["y"] = this.unit * vy + this.offsetY + half_stroke_width;
       // obj["opacity"] = 0 // thisOpacity;
       this.canvasCircles.drawArc(obj);
     }
   }

   /**
    * Function updateScore
    * @return {void}
    */
   updateScore() {
     if (this.scoreEnabled) this.showScore();
     else this.hideScore();
   }

   /**
    * Function updateCircles
    * @return {void}
    */
   updateCircles() {
     // console.log("updateCircles");
     var this_ = this;
     var colors = this.colors, color = 0;
     var layerGroup = this.canvasCircles.getLayerGroup("circles");
     // if (this.priority == this.priorities.voices || this.priority == this.priorities.both) colors = this.colors;
     // else colors = this.colorsDimmed;
     if (typeof layerGroup != "undefined") {
       var x = this.bufferTime + 0 + this.circlesOffsetX;
       var y;
       $.each(layerGroup, function(index, layer) {
         y = layer.index;
         color = this_.getVoiceColor(x, y);
         layer.fillStyle = colors[color];
         // layer.opacity = this_.opacityCircles;
         // console.log(layer.opacity);
         layer.visible = !(y < this_.startExcerptVoices || y > this_.endExcerptVoices);
       });
     }
     // console.log("opacity: " + this.opacityCircles);
    // this.canvasCircles.setLayerGroup('circles', {
    //   opacity: this.opacityCircles
    // });
     if (this.circlesEnabled) this.showCircles();
     else this.hideCircles();
     this.canvasCircles.drawLayers();
   }

   /**
    * Function drawStretch
    * @param  {[type]} canvas    [description]
    * @param  {[type]} type      [description]
    * @param  {[type]} component [description]
    * @param  {[type]} delta     [description]
    * @param  {[type]} x         [description]
    * @param  {[type]} y         [description]
    * @return {[type]}           [description]
    */
 	drawStretch(canvas, type, component, delta, x, y, color) {
     color = color | 0;
 		switch (type) {
 			case "H":
 				for (var n = 0; n < delta; n++) {
 					this.drawElement(canvas, "H", component, x, y, color);
 					y++;
 				}
 				break;
 			case "M":
 				for (var n = 2; n < delta; n++) {
 					this.drawElement(canvas, "M", component, x, y, color);
 					y++;
 				}
 				break;
 			default:
 				// unknown stretch type
 		}
 		return y;
 	}

   /**
    * Function drawElement
    * @param  {[type]} canvas    [description]
    * @param  {[type]} element   [description]
    * @param  {[type]} component [description]
    * @param  {[type]} x         [description]
    * @param  {[type]} y         [description]
    * @return {[type]}           [description]
    */
 	drawElement(canvas, element, component, x, y, color) {
     color = color | 0;
 		switch (element) {
 			case "H":
 				this.drawStroke(canvas, ["stroke-0", "element-" + element, "component-" + component, "level-" + this.currLevel], 0, x - 1, y, color);
 				this.drawStroke(canvas, ["stroke-0", "element-" + element, "component-" + component, "level-" + this.currLevel], 0, x + 1, y, color);
 				break;
 			case "M":
 				this.drawStroke(canvas, ["stroke-0", "element-" + element, "component-" + component, "level-" + this.currLevel], 0, x - 1, y, color);
 				this.drawStroke(canvas, ["stroke-0", "element-" + element, "component-" + component, "level-" + this.currLevel], 0, x + 1, y, color);
 				this.drawStroke(canvas, ["stroke-0", "element-" + element, "component-" + component, "level-" + this.currLevel], 0, x + 3, y, color);
 				break;
 			case "J":
 				this.drawStroke(canvas, ["stroke-1", "element-" + element, "component-" + component, "level-" + this.currLevel], 1, x, y, color);
 				this.drawStroke(canvas, ["stroke-0", "element-" + element, "component-" + component, "level-" + this.currLevel], 0, x + 2, y, color);
 				break;
 			case "I":
 				this.drawStroke(canvas, ["stroke-0", "element-" + element, "component-" + component, "level-" + this.currLevel], 0, x - 1, y, color);
 				break;
 			case "II":
 				this.drawStroke(canvas, ["stroke-0", "element-" + element, "component-" + component, "level-" + this.currLevel], 0, x - 1, y, color);
 				this.drawStroke(canvas, ["stroke-0", "element-" + element, "component-" + component, "level-" + this.currLevel], 0, x + 2, y, color);
 				break;
 			case "A":
 				this.drawStroke(canvas, ["stroke-1", "element-" + element, "component-" + component, "level-" + this.currLevel], 1, x + 0, y, color);
 				this.drawStroke(canvas, ["stroke-2", "element-" + element, "component-" + component, "level-" + this.currLevel], 2, x + 0, y, color);
 				break;
 			case "AI":
 				this.drawStroke(canvas, ["stroke-1", "element-" + element, "component-" + component, "level-" + this.currLevel], 1, x + 0, y, color);
 				this.drawStroke(canvas, ["stroke-2", "element-" + element, "component-" + component, "level-" + this.currLevel], 2, x + 0, y, color);
 				this.drawStroke(canvas, ["stroke-0", "element-" + element, "component-" + component, "level-" + this.currLevel], 0, x + 3, y, color);
 				break;
 			case "IA":
 				this.drawStroke(canvas, ["stroke-0", "element-" + element, "component-" + component, "level-" + this.currLevel], 0, x + -1, y, color);
 				this.drawStroke(canvas, ["stroke-1", "element-" + element, "component-" + component, "level-" + this.currLevel], 1, x + 2, y, color);
 				this.drawStroke(canvas, ["stroke-2", "element-" + element, "component-" + component, "level-" + this.currLevel], 2, x + 2, y, color);
 				break;
 			case "V":
 				this.drawStroke(canvas, ["stroke-2", "element-" + element, "component-" + component, "level-" + this.currLevel], 2, x - 1, y, color);
 				this.drawStroke(canvas, ["stroke-1", "element-" + element, "component-" + component, "level-" + this.currLevel], 1, x + 1, y, color);
 				break;
 			case "IV":
 				this.drawStroke(canvas, ["stroke-0", "element-" + element, "component-" + component, "level-" + this.currLevel], 0, x - 1, y, color);
 				this.drawStroke(canvas, ["stroke-2", "element-" + element, "component-" + component, "level-" + this.currLevel], 2, x + 1, y, color);
 				this.drawStroke(canvas, ["stroke-1", "element-" + element, "component-" + component, "level-" + this.currLevel], 1, x + 3, y, color);
 				break;
 			case "VI":
 				this.drawStroke(canvas, ["stroke-1", "element-" + element, "component-" + component, "level-" + this.currLevel], 1, x + 1, y, color);
 				this.drawStroke(canvas, ["stroke-2", "element-" + element, "component-" + component, "level-" + this.currLevel], 2, x + -1, y, color);
 				this.drawStroke(canvas, ["stroke-0", "element-" + element, "component-" + component, "level-" + this.currLevel], 0, x + 3, y, color);
 				break;
 			case "S":
 				this.drawStroke(canvas, ["stroke-2", "element-" + element, "component-" + component, "level-" + this.currLevel], 2, x - 1, y, color);
 				break;
 			case "SS":
 				this.drawStroke(canvas, ["stroke-2", "element-" + element, "component-" + component, "level-" + this.currLevel], 2, x - 1, y, color);
 				this.drawStroke(canvas, ["stroke-2", "element-" + element, "component-" + component, "level-" + this.currLevel], 2, x + 2, y, color);
 				break;
 			case "Z":
 				this.drawStroke(canvas, ["stroke-1", "element-" + element, "component-" + component, "level-" + this.currLevel], 1, x + 0, y, color);
 				break;
 			case "ZZ":
 				this.drawStroke(canvas, ["stroke-1", "element-" + element, "component-" + component, "level-" + this.currLevel], 1, x + 0, y, color);
 				this.drawStroke(canvas, ["stroke-1", "element-" + element, "component-" + component, "level-" + this.currLevel], 1, x + 3, y, color);
 				break;
 			default:
 				// unknown element
 		}
 	}

   /**
    * Function drawStroke
    * Draws three kinds of Suranadira-strokes:
    * (verical, diagonal left and diagonal right)
    * @param  {[type]} groups [description]
    * @param  {[type]} type   [description]
    * @param  {[type]} x      [description]
    * @param  {[type]} y      [description]
    * @param  {[type]} color  [description]
    * @return {[type]}        [description]
    */
   drawStroke(canvas, groups, type, x, y, color) {
     color = color | 0;
     var this_ = this;
     var colors;
     if (y < this.startLevel || y >= this.endLevel + 1) {
       this.isLevelVisible = false;
       return;
     } else {
       this.isLevelVisible = true;
     }
     if (this.priority == this.priorities.characters || this.priority == this.priorities.both) colors = this.colors;
     else colors = this.colorsDimmed;
     // console.log(this.priorities.characters);
     // groups.push("stroke_" + x + "_" + y);
     // var thisHex;
     // var thisRGB = this.hexToRgb(this.colors[color]);
     // if (thisRGB != null) {
     //   var thisHSL = this.rgbToHsl(thisRGB.r, thisRGB.g, thisRGB.b);
     //   // console.log(thisHSL);
     //   var thisH = thisHSL.h / 1;
     //   var thisS = thisHSL.s / 1;
     //   var thisL = thisHSL.l / 1;
     //   // console.log(thisL);
     //   thisRGB = this.hslToRgb(thisH, thisS, thisL);
     //   thisHex = this.rgbToHex(thisRGB.r, thisRGB.g, thisRGB.b);
     // } else {
     //   thisHex = this.colors[color];
     // }
     // console.log(this.colors[color], thisRGB);
     var obj = {
       layer: true,
       // name: "stroke_" + x + "_" + y,
       groups: groups,
       // strokeStyle: this.colors[color],
       strokeStyle: colors[color],
       // strokeStyle: thisHex,
       rounded: true,
       closed: false,
       opacity: 1, // this.opacityCharacters,
       strokeWidth: this.strokeWidth,
       mousedown: function(layer) {
         var a = layer.groups[3].split('-');
         canvas.triggerLayerEvent("hotspot-" + a[1], "mousedown");
       },
       mouseup: function(layer) {
         if (layer.groups.length > 3) {
           var a = layer.groups[3].split('-');
           // canvas.drawLayers();
           canvas.triggerLayerEvent("hotspot-" + a[1], "mouseup");
         }
       },
       mouseover: function(layer) {
         if (layer.groups.length > 3) {
           var a = layer.groups[3].split('-');
           // canvas.drawLayers();
           canvas.triggerLayerEvent("hotspot-" + a[1], "mouseover");
         }
       },
       mouseout: function(layer) {
         if (layer.groups.length > 3) {
           var a = layer.groups[3].split('-');
           // canvas.drawLayers();
           canvas.triggerLayerEvent("hotspot-" + a[1], "mouseout");
         }
       },
     };

     switch (type) {
       case 0: // vertical
         obj['x1'] = this.unit + x * this.unit + this.offsetX;
         obj['y1'] = 0 + y * this.unit + this.offsetY - this.startLevel * this.unit;
         obj['x2'] = this.unit + x * this.unit + this.offsetX;
         obj['y2'] = this.unit + y * this.unit + this.offsetY - this.startLevel * this.unit;
         break;
       case 1: // diagonal left
         obj['x1'] = this.unit + x * this.unit + this.offsetX;
         obj['y1'] = 0 + y * this.unit + this.offsetY - this.startLevel * this.unit;
         obj['x2'] = 0 + x * this.unit + this.offsetX;
         obj['y2'] = this.unit + y * this.unit + this.offsetY - this.startLevel * this.unit;
         break;
       case 2: // diagonal right
         obj['x1'] = this.unit + x * this.unit + this.offsetX;
         obj['y1'] = 0 + y * this.unit + this.offsetY - this.startLevel * this.unit;
         obj['x2'] = 2 * this.unit + x * this.unit + this.offsetX;
         obj['y2'] = this.unit + y * this.unit + this.offsetY - this.startLevel * this.unit;
         break;
       default:
         // unknown type
     }
     canvas.drawLine(obj);
   }

   /**
    * Function drawSyllables
    * @param  {[type]} canvas [description]
    * @param  {[type]} color [description]
    * @return {[type]}        [description]
    */
   drawSyllables(canvas, color) {
     var color = 0;
     var left = new Big(this.preloadedPosition);
     var ax, ay;
     var x1, y1, x2, y2, type;
     var offsetX = (this.offsetY); // offsetX + rc_offset;
     // var half_stroke_width = this.strokeWidthVoices / 2; // this.strokeWidth / 2; // strokeWidthVoices
     // var half_stroke_width = this.strokeWidth / 2;
     var half_stroke_width = this.strokeWidthVoices / 2;
     for(var y = 0; y < this.height - 0; y++) {
     // for(var y = this.startLevel; y < this.endLevel + 1; y++) {
       ay = y * this.unit + this.offsetY;
       // console.log(ay);
       // this.drawSyllableLine(canvas, 0, ay, this.width * this.unit, ay, color);
       for(var x = 0; x < this.width; x++) {
         ax = left.plus(x); // absolute x
         if (this.logos(ax, y) == 0) { // connector at the top
           // color = this.getCharactersColor(ax, y);
           /// this.drawSyllableCircle(canvas, x * this.unit + offsetX, y * this.unit + this.offsetY + half_stroke_width, 8);
           x1 = x * this.unit + offsetX + this.unit / 2;
           y1 = y * this.unit + this.offsetY + half_stroke_width;
           // x2 = x1 + (this.logos(ax.plus(2), y) == 0 ? this.unit : 2 * this.unit);
           if (this.logos(ax.plus(2), y) == 0) {
             x2 = x1 + this.unit;
             type = 0;
           } else {
             x2 = x1 + 2 * this.unit;
             type = 1;
           }
           y2 = y1;
           this.drawSyllableLine(canvas, x1, y1, x2, y2, color, type);
         }
       }
     }
   }

   /**
    * Function drawVoices
    * Draws the Suranadira voices.
    * @return {void}
    */
   drawSyllableLine(canvas, x1, y1, x2, y2, color, type) {
     if (this.syllablesColorCodingMode == this.syllablesColorCodingModes.allSyllables) color = (type == 0 ? 0 : 1);
     else color = 0;
     var half_stroke_width = this.strokeWidthVoices / 2;
     // var strokeWidth = this.strokeWidthVoices; // 5;
     // var half_stroke_width = 0; // strokeWidth / 2;
     // var half_stroke_width = 0; // this.strokeWidthVoices / 2;
     var obj = {
       layer: true,
       groups: ["syllables", "syllable-type-" + type, "syllable-line-" + y1],
       // strokeStyle: this.colors[color],
       rounded: true,
       closed: false,
       opacity: 1, // this.opacityVoices,
       strokeWidth: 2 * half_stroke_width, // this.strokeWidthVoices,
       strokeStyle: this.colors[color],
       x1: x1,
       x2: x2,
       y1: y1,
       y2: y2
     };
     canvas.drawLine(obj);
   }

   /**
    * Function drawCircle
    * @return {void}
    */
   drawSyllableCircle(canvas, x, y, color) {
     // if (!this.circlesEnabled) return;
     var obj, voice = 0, color = 0;
     obj = {
       // name: "circle" + voice,
       layer: true,
       groups: ["syllables", "syllable-circle"],
       x: x,
       y: y,
       radius: this.unit / 2, // this.radiusCircles,
       // fillStyle: this.colors[voice % this.voicesPerGroup],
       opacity: 1, // this.opacityVoices,
       name: "syllable-circle-" + x + "-" + y,
       fillStyle: this.backgroundColor
     };
     canvas.drawArc(obj);
   }

   /**
    * Function drawHotspot
    * @param  {[type]} id    [description]
    * @param  {[type]} delta [description]
    * @param  {[type]} x     [description]
    * @param  {[type]} y     [description]
    * @return {[type]}       [description]
    */
 	drawHotspot(canvas, id, delta, x, y) {
     var this_ = this;
 		canvas.drawRect({
 			name: "hotspot-" + this.currLevel,
 			groups: ["id-" + id],
 			layer: true,
 		  // fillStyle: 'blue',
 			// strokeStyle: 'red',
 			// strokeWidth: 1,
 		  x: (x - 1) * this.unit + this.offsetX, y: y * this.unit + this.offsetY,
 		  width: 5 * this.unit, // stageWidth,
 		  height: delta * this.unit,
 			fromCenter: false,
 			mousedown: function(layer) {
 				var a = layer.name.split('-');
 				this_.markLevel(a[1], 1);
 				canvas.drawLayers();
 			},
 			mouseup: function(layer) {
 				var a = layer.name.split('-');
 				var b = layer.groups[0].split('-');
 				this_.markLevel(a[1], 2);
 				canvas.drawLayers();
 				if (true) this_.wesen = a[1];
         console.log(this_.wesen);
 			},
 			mouseover: function(layer) {
 				var a = layer.name.split('-');
 				this_.markLevel(a[1], 2);
 				// canvas.drawLayers();
 		  },
 			mouseout: function(layer) {
 				var a = layer.name.split('-');
 				this_.markLevel(a[1], 0);
 				// canvas.drawLayers();
 		  }
 		});
 	}

   /**
    * Function drawModules
    * @param  {[type]} canvas [description]
    * @param  {[type]} x      [description]
    * @param  {[type]} y      [description]
    * @return {[type]}        [description]
    */
 	drawModules(canvas, x, y) {
 		for (var n = 0; n <= this.height; n+=4) {
 			if (n > 0 && n < this.height) this.drawModule(canvas, x, y + n);
 		}
 	}

   /**
    * Function drawModule
    * @param  {[type]} canvas [description]
    * @param  {[type]} x      [description]
    * @param  {[type]} y      [description]
    * @return {[type]}        [description]
    */
 	drawModule(canvas, x, y) {
 		// if (this.get_left) return;
 		var obj = {
 			layer: true,
 			strokeStyle: this.colors[1],
 			rounded: true,
 			closed: false,
 			opacity: 1,
 			strokeWidth: 1
 		};
 		obj['x1'] = 0;
 		obj['y1'] = 0 + y * this.unit + this.offsetY - this.startLevel * this.unit;
 		obj['x2'] = this.stageWidth;
 		obj['y2'] = 0 + y * this.unit + this.offsetY - this.startLevel * this.unit;
 		canvas.drawLine(obj);
 	}

  drawTruthGrid(canvas, color) {
    color = color | 5;
    var obj = {
      layer: true,
      groups: ["truth-grid"],
      strokeStyle: this.colors[color],
      rounded: true,
      closed: false,
      opacity: this.opacityTruthGrid,
      strokeWidth: this.strokeWidthTruthGrid
    }
    var truthGridParity = parseInt(this.preloadedPentade.minus(this.preloadedPentade.mod(1)).mod(2));
    var offsetX = -this.offsetY; // * (truthGridParity ? -1 : 1);
    var addLevel = this.charactersEnabled && !this.trimCharacters ? 1 : 0;
    var y1 = 0, y2 = (this.height + addLevel) * this.unit;
    // console.log(truthGridParity + ' - ' + this.countBufferReloaded % 2);
    for(var x = 0; x < this.width; x += 2) {
      obj["x1"] = x * this.unit + (this.countBufferReloaded % 2 ? -offsetX : offsetX);
      if (this.countBufferReloaded == 0) {
        if (truthGridParity) obj["x1"] -= 2 * offsetX;
      } else {
        if (truthGridParity == this.countBufferReloaded % 2) obj["x1"] -= 2 * offsetX;
      }
      obj["x2"] = obj["x1"];
      obj["y1"] = y1;
      obj["y2"] = y2;
      canvas.drawLine(obj);
    }
  }


   drawBackground(canvas) {
    var addLevel = this.charactersEnabled && !this.trimCharacters ? 1 : 0;
    canvas.removeLayer("background");
 		canvas.drawRect({
 			name: "background",
 			// groups: ["id-" + id],
 			layer: true, // true,
 		  fillStyle: this.backgroundColor, // 'black',
 			// strokeStyle: 'red',
 			// strokeWidth: 1,
 		  x: 0,
      y: 0,
 		  width: this.width * this.unit,
      // height: this.stageHeight,
      height: (this.height + addLevel) * this.unit,
 			fromCenter: false
 		});
 	}

  loadEvents() {
    var this_ = this;

    /**
     * Reloads Suranadira if the stage dimensions have changed
     */
    $(window).resize(function(e) {
      if (!this_.haveStageDimensionsChanged()) return;
      // console.log("Resize");
      clearTimeout(this_.timerWindowResizing);
      this_.timerWindowResizing = setTimeout(function() {
        // console.log(this_.haveStageDimensionsChanged());
        /// if (!this_.haveStageDimensionsChanged()) return;
        // console.log("resize");
        // this_.resizeStage();
        this_.reload();
      }, 250);
      e.stopImmediatePropagation();
    });
    // $("*").mouseenter(function() {
    //   this_.currentCursor = $(this).css("cursor");
    //   this_.currentElement = this;
    // });

    /**
     * Hides mouse cursor when idle
     */
    $("body").mousemove(function() {
      this_.hideIdleCursor();
    });

    /**
     * Executes on window unload event,
     * frees browser/computer resources
     */
    $(window).on("unload", function() {
      if (this_.workerRuntime != null) this_.workerRuntime.terminate();
    });
  }

  /**
   * Function hideIdleCursor
   * @return {void}
   */
  hideIdleCursor() {
    var this_ = this;
    clearTimeout(this_.timerMouseMove);
    this_.showCursor();
    this_.timerMouseMove = setTimeout(function() {
      this_.hideCursor();
      // console.log("hide cursor");
    }, this_.hideIdleCursorAfter * 1000);
  }

  showCursor() {
    if ($("body").hasClass("cursor-hidden")) $("body").removeClass("cursor-hidden");
  }

  hideCursor() {
    if (!$("body").hasClass("cursor-hidden")) $("body").addClass("cursor-hidden");
  }

  /**
   * Function reload
   * @param  {[type]} e [description]
   * @return {[type]}   [description]
   */
  reload(e) {
    this.stopTimer();
    $("#reload").trigger("click");
  }

  /**
   * Function applyProperties
   * @param  {[type]} properties [description]
   * @param  {[type]} overwrite  [description]
   * @return {[type]}            [description]
   */
  applyProperties(properties, overwrite) {
    if (typeof overwrite == "undefined") overwrite = true;
    for (var k in properties) {
      // console.log(k, properties[k]);
      if (overwrite || typeof this[k] == "undefined") {
        this[k] = properties[k];
        this.properties[k] = properties[k];
      };
    }
  }

  getProperties() {
    // console.log(this.properties);
    return this.properties;
  }

  updateProperty(key, value) {
    this.properties[key] = value;
  }

  init() {
    // this.showInfo("Initializing Suranadira...");
    this.hide(this.buffer2);
    this.hide(this.buffer);
    this.hide(this.canvasRC);
    this.hide(this.score2);
    this.hide(this.score);
    this.generateDimmedColors();
    this.resizeStage();
    this.redraw();
    this.loadScore();
    this.requireLazy();
    this.hideCursor();
    this.activateAudioContext();
  }

  loadScore() {
    this.isPageLoaded = false;
    var startPositionDay = this.currentPosition.mod(10240).plus(0);
    var position = this.getScorePosition(startPositionDay);
    this.showDebugInfo("startPositionDay", startPositionDay + " (" + position + ")");
    // this.showDebugInfo("test", position);
    this.partCurrent = position[0]; // 1..n
    this.pageCurrent = position[1]; // 1..n
    this.beatStart = position[2]; // 16; // 0..n
    this.showDebugInfo("partCurrent", this.partCurrent);
    this.showDebugInfo("pageCurrent", this.pageCurrent);
    // this.beatCurrent = 4;
    // console.log("beatCurrent (A): " + this.beatCurrent);
    this.workerRuntime.postMessage(["retrieve-metronome", this.user, this.partCurrent, this.pageCurrent]);
    // this.showDebugInfo("test", this.pageCurrent);
  }

  getScorePosition(position) {
    // console.log("position: " + position);
    // position = position.mod(10240);
    position = parseInt(position);
    if (position < 9882) { // parts 1..61
      var part = Math.floor(position / (9 * 3 * 6)) + 1;
      var page = (Math.floor(position / (3 * 6)) % 9) + 1;
      var beat = position % (3 * 6) + 1;
    } else if (position < 10062) { // part 62
      position -= 9882;
      var part = 62;
      var page = (Math.floor(position / (3 * 6)) % 10) + 1;
      var beat = position % (3 * 6) + 1;
    } else { // part 63
      position -= 10062;
      var part = 63;
      var page = (Math.floor(position / (3 * 6)) % 10) + 1;
      var beat = position % (3 * 6) + 1;
    }
    if (part == 63 && page == 10) {
      if (beat == 16) beat = 15; // hack
    } else {
      if (beat == 18) beat = 17; // hack
    }
    return [part, page, beat];
  }

  activateAudioContext() {
    this.audioContext = new AudioContext();
  }

  loadConfiguration(data) {
    // console.log(data);
    var this_ = this;
    if (data != "empty") {
      // var command, commands = data.split(";");
      var commands = JSON.parse(data);
      // console.log(commands);
      // var mustReload = false;
      var prev_endLevel = this_.endLevel;
      var prev_unit = this_.unit;
      var prev_voicesEnabled = this_.voicesEnabled;
      var prev_charactersEnabled = this_.charactersEnabled;
      var prev_truthGridEnabled = this_.truthGridEnabled;
      var prev_scoreEnabled = this_.scoreEnabled;
      // this_.saveState();
      $.each(commands, function(id, command) {
        // console.log(command);
        // command = command_string.split("_");
        switch (command[2]) {
          case "boolean":
            command[1] = (command[1] === 'true');
            break;
          case "number":
            command[1] = parseInt(command[1]);
            break;
          case "array":
            // console.log(command[1]);
            command[1] = JSON.parse(command[1]);
            break;
          case "sarray":
            // command[1] = JSON.parse(command[1]);
            command[1] = command[1].split(",");
            // console.log(command[1]);
            break;
          default:
        }
        this_[command[0]] = command[1];
        this_.properties[command[0]] = command[1];
        this_.showDebugInfo("runtimeCommand", command[0] + " = " + command[1]);
      });


      if (this_.isInitialized) {
        if (
          this_.endLevel != prev_endLevel
          || this_.unit != prev_unit
          // || this_.voicesEnabled != prev_voicesEnabled
          // || this_.charactersEnabled != prev_charactersEnabled
          // || this_.scoreEnabled != prev_scoreEnabled
          // || this_.truthGridEnabled != prev_truthGridEnabled
        ) this_.reload();
        else {
          this_.recalculateProperties();
          this_.resizeStage();
        }
      } else {
        this_.recalculateProperties();
      }
    }
    // initAndLoadEvents
  }

  initAndLoadEvents() {
    // if (!this.isInitialized) {
      this.init();
      this.loadEvents();
      this.isInitialized = true;
    // }
  }

  activateWorkerRuntime() {
    var this_ = this;
    this.workerRuntime = new Worker('model/class.suranadira.runtime.js');
    /// this.workerRuntime.postMessage(["retrieve-configuration"]);
    if (this.user == null) {
      this.workerRuntime.postMessage(["retrieve-user", getCookie("suranadira-user"), getCookie("pairing-guid"), getCookie("pairing-code")]);
    } else {
      this.workerRuntime.postMessage(["retrieve-configuration", this.user]);
    }
    if (0) {
      this.workerRuntime.postMessage(["save-metronome", 1]);
    }
    this.workerRuntime.onmessage = function(e) {
      if (this_.isSynchronizing) {
        return;
      }
      // console.log("Command received: ");
      // console.log(e.data[1]);
      // if (!e.isTrusted) return;
      if (e.data[1] == "empty") return; // AS_ADDED
      // var command = e.data.split("_");
      // this_.saveState();
      if (e.isTrusted) {
        if (e.data[0].length) {
          switch (e.data[0]) {
            case "user":
              this_.user = e.data[1];
              setCookie("suranadira-user", this_.user, 365 * 10);
              // console.log("user: " + this_.user);
              // this_.user = 1; // override
              this_.workerRuntime.postMessage(["retrieve-configuration", this_.user]);
              break;
            case "configuration":
              // console.log("configuration");
              this_.loadConfiguration(e.data[1]);
              if (!this_.isInitialized) this_.initAndLoadEvents();
              break;
            case "metronome":
              // console.log(e.data);
              this_.scoreBeats2 = JSON.parse(e.data[1]);
              this_.pageWidth = e.data[2];
              this_.pageHeight = e.data[3];
              if (!this_.isPageLoaded) {
                this_.loadScoreToBuffer(this_.partCurrent, this_.pageCurrent);
                // console.log("case A"); // 1
              } else {
                // this_.showDebugInfo("test", "part: " + this_.partCurrent + ", page: " + this_.pageCurrent);
                if (!this_.isLastPage()) {
                  this_.loadScoreToBuffer(this_.partCurrent, this_.pageCurrent + 1);
                  // console.log("case B");
                } else {
                  if (this_.partCurrent < this_.partLast) {
                    this_.loadScoreToBuffer(this_.partCurrent + 1, 1);
                    // console.log("case C"); // 2
                  } else {
                    this_.loadScoreToBuffer(1, 1);
                    // console.log("case D");
                  }
                }
              }
              // console.log(this_.scoreBeats2);
              break;
            default:
              // unknown response type from the worker
          }
        }
      }
    } ///
  }

  reset() {
    this.stopTimer();
    this.pentadeSelectors.off("mouseup");
    $("#debug").html("");
    $("#stage").html($("#stage").html());
  }

  requireLazy() {
    var this_ = this;
    $.getScript("js/fields.js", function() {
      for (var k in fields) {
        this_.addField(fields[k], $('#' + fields[k]));
      }
    });
  }

  /**
   * Function showDebugInfo
   * @param  {[type]} key   [description]
   * @param  {[type]} value [description]
   * @return {[type]}       [description]
   */
  showDebugInfo(key, value) {
    if (typeof this.fields[key] != "undefined") this.fields[key].text(value);
    this.fieldsCache[key] = value;
  }

  refreshDebugInfo() {
    for (var key in this.fieldsCache) {
      // console.log(key, this.fieldsCache[key].toString());
      if (typeof this.fieldsCache[key] != "undefined") {
        this.showDebugInfo(key, this.fieldsCache[key].toString());
      } else {
        console.log("Undefined debug key: " + key);
      }
    }
  }

  addField(key, value) {
    this.fields[key] = value;
  }

  hide(e) {
    e.css("opacity", 0).css("z-index", -1);
  }

  show(e) {
    // e.css("opacity", 0.5).css("z-index", 1000);
    e.css("opacity", 1).css("z-index", 1000);
  }

  isVisible(e) {
    return e.css("opacity") != 0;
  }

  startTimer() {
    if (this.timerSuranadira != null) return; // timer already started
    var this_ = this;
    var tick_fired = false;
    var tick_fired2 = false;
    var metronome_double_speed = true;
    this.timerSuranadira = setInterval(function() {
      var date = new Date;
      var time = new Big(date.getTime() - this_.tzOffset());
      var tick = new Big((time.div(this_.scoreTempo)));
      tick = tick.round(5).mod(1);
      var tick_display = parseFloat(tick.minus(0.4)); // 0.5
      tick = parseFloat(tick);
      if (!tick_fired && tick >= 0.40 && tick < 0.50) {
        tick_fired = true;
        this_.getStageWidth(false);
        this_.fireMetronomeTick();
        this_.animateBuffer();
        this_.animateScore();
        // console.log("Circles opacity 2: " + this_.opacityCircles);
        this_.animateCircles();
        ///// if (this_.runtimeCommandsEnabled) this_.workerRuntime.postMessage('retrieve-configuration');
        this_.showDebugInfo("timerPrecision", tick_display);
        if (this_.debug) this_.refreshDebugInfo();
      } else if (tick_fired && tick < 0.4) {
        tick_fired = false;
        tick_fired2 = false;
      }
      // Fire second metronome tick
      if (metronome_double_speed) {
        if (tick_fired && !tick_fired2 && tick >= 0.90 && tick < 1.00) {
          tick_fired2 = true;
          this_.fireMetronomeTick();
        }
      }
    }, 1);
  }

  fireMetronomeTick() {
    if (!this.metronomeEnabled) return;
    var gain = this.audioContext.createGain();
    gain.connect(this.audioContext.destination);
    this.osc = this.audioContext.createOscillator();
    this.osc.connect(gain);
    gain.gain.value = 0.5; // 0.5
    this.osc.type = "sine"; // sine | square
    // if (this.bufferLocalPosition > 0) {
    //   this.osc.frequency.value = 440.0;
    // } else {
    //   this.osc.frequency.value = 880.0;
    // }
    this.osc.frequency.value = 440.0; // 880.0
    var time = this.audioContext.currentTime;
    var noteLength = 0.05; // sec
    this.osc.start(time);
    this.osc.stop(time + noteLength);
  }

  stopTimer() {
    if (this.timerSuranadira != null) {
      clearInterval(this.timerSuranadira);
      this.timerSuranadira = null;
    }
  }

  getStageWidth(test) {
    var stageWidth;
    stageWidth = $(window).width();
    if (!test) this.stageWidth = stageWidth;
    else return stageWidth;
    // this.stageWidth = screen.width;
  }

  getStageHeight(test, stageWidth) {
    if (typeof stageWidth == "undefined") stageWidth = this.stageWidth;
    var stageHeight,
    maxStageHeight = stageWidth / this.canvasAspectRatio;
    stageHeight = maxStageHeight;
    // this.windowHeight = $(window).innerHeight();
    // this.windowHeight = window.screen.height;
    this.windowHeight = $(window).height();
    var minStageHeight = this.windowHeight * 0.7;
    minStageHeight -= minStageHeight % this.unit + this.offsetY;
    if (stageHeight > this.windowHeight) {
      stageHeight = this.windowHeight;
    } else if (stageHeight < minStageHeight) {
      stageHeight = minStageHeight;
    }
    var addLevel = this.charactersEnabled && !this.trimCharacters ? 1 : 0;
    var bufferHeight = (this.height + addLevel) * this.unit;
    if (bufferHeight <= maxStageHeight && stageHeight < bufferHeight) {
      stageHeight = (this.height + addLevel) * this.unit;
    }
    if (!test) this.stageHeight = stageHeight;
    else return stageHeight;
  }

  setupPentadeSelectors() {
    var pentade_selector;
    this.pentadeSelectors.remove();
    this.pentadeSelectorContainer.css("width", this.width * this.unit);
    this.pentadeSelectorContainer.css("height", this.height * this.unit);
    // this.pentadeSelectorContainer.offset({ left: offsetX });
    for (var n = 0; n < Math.ceil(this.width / 5); n++) {
      pentade_selector = this.pentadeSelector.clone();
      pentade_selector.appendTo(this.pentadeSelectorContainerID);
      pentade_selector.attr("id", "pentade-selector-" + n);
      pentade_selector.attr("pentade-selector", n);
      pentade_selector.addClass("pentade-selector");
      /// pentade_selector.css("position", "relative");
      /// pentade_selector.css("display", "inline-block");
      pentade_selector.css("top", (0) + "px");
      pentade_selector.css("width", (5 * this.unit) + "px");
      pentade_selector.css("height", ((this.height - 1) * this.unit) + "px");
      // pentade_selector.css("background", this.colors[0]);
      /// pentade_selector.css("background", "none");
      pentade_selector.css("opacity", this.debug ? "1" : "0"); //
      /// pentade_selector.css("box-sizing", "border-box"); //
      /// pentade_selector.css("border", "1px solid red");
      /// pentade_selector.css("border-collapse", "collapse");
    }
    this.pentadeSelectors = $(this.pentadeSelectorClass);
  }

  setupPentadeSelectorEvents() {
    if (!this.debug) return; // disabled in this version
    var this_ = this;
    this.pentadeSelectors.on("mouseup", function(e) {
      this_.hideSuranadira();
      var bufferLocalPentade = $(e.target).attr("pentade-selector");
      this_.showDebugInfo("bufferLocalPentade", bufferLocalPentade);
      var selectedPentade = $(this).attr("pentade");
      this_.showDebugInfo("selectedPentade", selectedPentade.toString());
      var rc_x = $(this).offset().left;
      this_.drawRC(selectedPentade);
      this_.showRC(rc_x);
    });
    // this.pentadeSelectors.on("mouseenter", function(e) {
    //   this_.pentadeSelectors.css("cursor", "pointer");
    // });
  }

  showRC(x) {
    this.canvasRC.offset({left: x - this.rcOffsetX * this.unit + 3 * this.unit})
    // this.canvasRC.show();
    this.show(this.canvasRC);
  }

  hideRC() {
    // this.view = null;
    this.canvasRC.hide();
  }

  hideSuranadira() {
    this.hide(this.buffer);
    this.hide(this.pentadeSelectorContainer);
    this.hide(this.canvasCircles);
  }

  showSuranadira() {
    this.show(this.buffer);
    this.show(this.pentadeSelectorContainer);
    this.hide(this.canvasRC);
    this.show(this.canvasCircles);
  }

  hideScore() {
    // this.hideSuranadira();
    this.hide(this.score2);
    this.hide(this.score);
    //this.hide(this.canvasCircles);
  }

  showScore() {
    this.show(this.score);
    this.show(this.score2);
    // this.show(this.canvasCircles);
    // this.hide(this.buffer);
    // this.hide(this.pentadeSelectorContainer);
    // this.hide(this.canvasRC);
  }

  onSuranadiraLoaded() {
    this.showSuranadira();
    this.keyboardInteractions();
  }

  keyboardInteractions() {
    var this_ = this;
    $(document).keyup(function(e) {
      // console.log(e.keyCode);
      switch (e.keyCode) {
        case 27: // ESC
          if (this_.debug) this_.showSuranadira();
          break;
        case 32: // Space
          if (this_.debug) {
            console.log("Simulating out of sync");
            this_.preloadedPosition = this_.preloadedPosition.minus(20); // simulate out of sync
          }
          break;
        case 82: // R
          if (e.shiftKey) {
            // console.log("Shift-R");
            if (this_.debug) this_.updateProperty("endLevel", 11);
          }
          break;
        case 84: // T
          if (this_.debug) {
            this_.reload();
            e.stopImmediatePropagation();
          }
          break;
        default:
          // do nothing
      }
      // if (e.keyCode == 27) { // ESC
      //   this_.showSuranadira();
      //   // this_.hideRC();
      // } else if (e.keyCode == 32) { // Space
      //   if (this_.debug) {
      //     console.log("Simulating out of sync");
      //     this_.preloadedPosition = this_.preloadedPosition.minus(20); // simulate out of sync
      //   }
      // }
      /// e.stopImmediatePropagation();
    }); // keyup
  }

  getJacobsthal(m) {
    if (m < 0) return Math.pow(2, m);
    var a = [0, 1];
    for(var n = 2; n < m + 1; n++) {
      a[n] = Big(a[n - 1]).plus(Big(2).mul(Big(a[n - 2])));
      if (n >= m) break;
    }
    return a[m];
  }

  markComponentCyclesSome(x, y) {
    var p = x.div(5);
    p = p.minus(p.mod(1));
    var d = this.dn[p.toString()];
    // console.log(d);
    var b = 0, c, L;
    for (var k1 in d) {
      b += d[k1];
      c = 0;
      for (var k2 in this.markLevels) {
        L = this.markLevels[k2];
        if (b == L) {
          c = d[k1];
          if (y < L && y >= L - c) return parseInt(k2) + 1; // c > 1 &&
        }
      }
    }
    // console.log(d);
    return 0;
  }

  markComponentCyclesAll(x, y) {
    var p = x.div(5);
    p = p.minus(p.mod(1));
    var d = this.dn[p.toString()];
    // console.log(d);
    var b = 0, c, L;
    for (var k1 in d) {
      b += d[k1];
      c = d[k1];
      if (y < b && y >= b - c) return (b % 2) + 0; // c > 1 &&
    }
    // console.log(d);
    return 0;
  }

  // markElementsAll(x, y) {
  //   var p = x.mod(Math.pow(2, y + 1) * 5),
  //   phase_h = (Math.pow(2, y) + (y % 2 ? 0 : 1)) * 2  - 1, //
  //   phase_a = phase_h + this.getJacobsthal(y) * 6,
  //   phase_z = phase_a + this.getJacobsthal(y - 1) * 6,
  //   phase_v = phase_z + (this.getJacobsthal(y)) * 6 - (y % 2 ? 3 : 0),
  //   phase_i = phase_v + Math.pow(2, y) * 3;
  //   if (p.cmp(phase_h) < 1) return 1;
  //   else if (p.cmp(phase_a) < 1) return 2;
  //   else if (p.cmp(phase_z) < 1) return 3;
  //   else if (p.cmp(phase_v) < 1) return 4;
  //   else if (p.cmp(phase_i) < 1) return 5;
  //   else return 0;
  // }

  markElementsAll(x, y) {
    var p = x.mod(Math.pow(2, y + 1) * 5),
    phase_0 = 1,
    phase_h = phase_0 + (Math.pow(2, y) + (y % 2 ? 0 : 1)) * 2 - 1, //
    phase_a = phase_h + this.getJacobsthal(y) * 6 - 1,
    phase_z = phase_a + this.getJacobsthal(y - 1) * 6,
    phase_v = phase_z + (this.getJacobsthal(y)) * 6 - (y % 2 ? 3 : 0),
    phase_i = phase_v + Math.pow(2, y) * 3;
    if (p.cmp(phase_0) < 1) return 0;
    else if (p.cmp(phase_h) < 1) return 2;
    else if (p.cmp(phase_a) < 1) return 0;
    else if (p.cmp(phase_z) < 1) return 1;
    else if (p.cmp(phase_v) < 1) return 1;
    else if (p.cmp(phase_i) < 1) return 2;
    else return 0;
  }

  markElementsSome(x, y) {
    var p = x.mod(Math.pow(2, y + 1) * 5),
    phase_0 = 1,
    phase_h = phase_0 + (Math.pow(2, y) + (y % 2 ? 0 : 1)) * 2 - 1, //
    phase_a = phase_h + this.getJacobsthal(y) * 6 - 1,
    phase_z = phase_a + this.getJacobsthal(y - 1) * 6,
    phase_v = phase_z + (this.getJacobsthal(y)) * 6 - (y % 2 ? 3 : 0),
    phase_i = phase_v + Math.pow(2, y) * 3;
    // console.log($.inArray("A", this.markElements));
    if ($.inArray(0, this.markElements) >= 0 && (p.cmp(phase_0) < 1)) return 1;
    else if ($.inArray(1, this.markElements) >= 0 && (p.cmp(phase_0) > 0) && (p.cmp(phase_h) < 1)) return 1;
    else if ($.inArray(2, this.markElements) >= 0 && (p.cmp(phase_h) > 0) && (p.cmp(phase_a) < 1)) return 1;
    else if ($.inArray(3, this.markElements) >= 0 && (p.cmp(phase_a) > 0) && (p.cmp(phase_z) < 1)) return 1;
    else if ($.inArray(4, this.markElements) >= 0 && (p.cmp(phase_z) > 0) && (p.cmp(phase_v) < 1)) return 1;
    else if ($.inArray(5, this.markElements) >= 0 && (p.cmp(phase_v) > 0) && (p.cmp(phase_i) < 1)) return 1;
    else return 0;
  }

  markPhasesAll(x, y) {
    if (this.phaseMode < this.phases.elements) return;
    return (Math.floor(y / this.phaseMode) % 2);
  }

  markLevelsSome(x, y) {
    var L;
    // if (y == 2) return 1;
    // else return 0;
    for (var k in this.markLevels) {
      L = this.markLevels[k];
      if (y + 1 == L) {
        return 1;
      }
    }
    return 0;
  }

  getCharactersColor(x, y) {
    switch (this.charactersColorCodingMode) {
      case this.charactersColorCodingModes.someComponentCycles:
        return this.markComponentCyclesSome(x, y);
        break;
      case this.charactersColorCodingModes.allComponentCycles:
        return this.markComponentCyclesAll(x, y);
        break;
      case this.charactersColorCodingModes.allElements:
        return this.markElementsAll(x, y);
        break;
      case this.charactersColorCodingModes.someElements:
        return this.markElementsSome(x, y);
        break;
      case this.charactersColorCodingModes.allPhases:
        return this.markPhasesAll(x, y);
        break;
      case this.charactersColorCodingModes.someLevels:
        return this.markLevelsSome(x, y);
        break;
      default:
        return 0; // default color
    }
    // if (this.charactersColorCodingMode == this.charactersColorCodingModes.someComponentCycles) return this.markComponentCyclesSome(x, y);
    // else if (this.charactersColorCodingMode == this.charactersColorCodingModes.allComponentCycles) return this.markComponentCyclesAll(x, y);
    // else return 0; // default color
  }

  calcDeltaForPentades() {
    if (this.charactersColorCodingMode == this.charactersColorCodingModes.none) return;
    var ps, pa, p = this.preloadedPentade.minus(this.preloadedPentade.mod(1)); // pentade
    for (var n = 0; n < Math.ceil(this.width / 5); n++) {
      pa = p.plus(n);
      ps = pa.toString();
      if (typeof this.dn[ps] == "undefined") this.dn[ps] = this.dec2delta(pa).reverse();
    }
  }

  getVoiceColor(x, y) {
    switch (this.voicesColorCodingMode) {
      case this.voicesColorCodingModes.groupVoices:
        return y % this.voicesPerGroup;
        break;
      case this.voicesColorCodingModes.allGroups:
        return Math.floor(y / this.voicesPerGroup) % 2;
        break;
      default: // this.voicesColorCodingModes.none
        return 0; // default color
    }
  }

  /**
   * Function saveToBuffer
   * Saves the canvas content to the second buffer.
   * @return {void}
   */
  saveToBuffer() {
    this.buffer2.attr("src", this.canvas_.toDataURL());
  }

  /**
   * Function loadFromBuffer
   * Loads the contents of the second buffer to the buffer.
   * Makes sure the transition runs smoothly.
   * @param  {boolean} reset_position If set to TRUE, resets the left position of the second buffer
   * @return {void}
   */
  loadFromBuffer(reset_position) {
    var this_ = this;
    reset_position = reset_position | false;
    if (reset_position) {
      this.buffer2.offset({ left: this.buffer.offset().left + this.unit * this.preloadPositions });
      this.show(this.buffer2);
      this.buffer.hide();
    }
    this.buffer.attr("src", this.buffer2.attr("src"));
    if (reset_position) {
      this.buffer.offset({ left: this.buffer.offset().left + this.unit * this.preloadPositions });
      this.buffer.show();
      this.hide(this.buffer2);
      var bufferInitialPosition = this.buffer.offset().left;
      this.resetPentadeSelectorContainer();
    }
    this.assignPentadesToSelectors();
    this.fetchVoiceLevels();
    // console.log("updateAppearance");
    this.updateAppearance();
    this.countBufferReloaded++;
    this.showDebugInfo("countBufferReloaded", this.countBufferReloaded)
    // $("body").fadeIn(500, function() {
    // });
    // if (this.isSynchronizing) {
    //   this.isSynchronizing = false;
    //   this.showSuranadira();
    //   this.hideInfo();
    // }
  }

  updateAppearance() {
    // console.log("updateAppearance");
    switch (this.priority) {
      case this.priorities.characters:
        this.opacityVoices = this.opacityTypes.opacityDimmed;
        this.opacityCircles = this.opacityTypes.opacityDimmed;
        this.opacityCharacters = this.opacityTypes.opacityFull;
        break;
      case this.priorities.none:
        this.opacityVoices = this.opacityTypes.opacityDimmed;
        this.opacityCircles = this.opacityTypes.opacityDimmed;
        this.opacityCharacters = this.opacityTypes.opacityDimmed;
        break;
      case this.priorities.both:
        this.opacityVoices = this.opacityTypes.opacityFull;
        this.opacityCircles = this.opacityTypes.opacityFull;
        this.opacityCharacters = this.opacityTypes.opacityFull;
        break;
      default: // this.priorities.voices
      this.opacityVoices = this.opacityTypes.opacityFull;
      this.opacityCircles = this.opacityTypes.opacityFull;
      this.opacityCharacters = this.opacityTypes.opacityDimmed;
    }

    this.updateCircles();
    /// this.updateScore();
  }

  assignPentadesToSelectors() {
    var this_ = this,
    this_pentade_new,
    this_info,
    this_pentade = this.preloadedPentade;
    this_pentade = this_pentade.minus(this_pentade.mod(1));
    // console.log(this_.pentadeSelectors);
    $.each(this_.pentadeSelectors, function(index, value) {
      this_pentade_new = this_pentade.plus(index);
      // console.log(this_pentade_new);
      $(this).attr("pentade", this_pentade_new);
      this_info = "<div class=\"info-text info-text-large\">" + index + "</div>";
      this_info += "<div class=\"info-text info-text-small\">" + this_pentade_new.toString() + "</div>";
      if (this_.debug) $(this).html(this_info);
      // if (this_.debug) {
      //   this_info = "<div style=\"display: block;\">";
      //     this_info += "<div style\"\">" + index + "</div>";
      //     this_info += "<div><small><small>" + this_pentade_new.toString() + "</small></small></div>";
      //   this_info += "</div>";
      //   $(this_info).appendTo(this.pentadeSelectorContainerID);
      //   console.log(value);
      //   $(this_info).offset({left: $(this).offset().left, top: $(this).offset().top,});
      //   $(this_info).show();
      // }
    });
  }

  /**
   * Function fetchVoiceLevels
   * @return {void}
   */
  fetchVoiceLevels() {
    this.voiceLevels2 = this.voiceLevels.map(function(arr) {
      return arr.slice();
    });
    this.bufferTime = 0;
  }

  /**
   * Function setInitLeft
   * @return {void}
   */
  setInitLeft() {
    this.buffer.offset({ left: this.bufferMarginX * this.unit });
    this.resetPentadeSelectorContainer();
  }

  /**
   * Function resetPentadeSelectorContainer
   */
  resetPentadeSelectorContainer() {
    this.pentadeSelectorContainer.offset({ left: (this.bufferMarginX - 1) * this.unit });
  }

  /**
   * Function markLevel
   * @param  {[type]}  id     [description]
   * @param  {[type]}  color  [description]
   * @param  {Boolean} is_new [description]
   * @return {[type]}         [description]
   */
	markLevel(id, color, is_new) {
		if (typeof is_new == "undefined") is_new = false;
		id = parseInt(id);
		var thisComponentID = "level-" + id;
    var this_ = this;
		var layerGroup = this.canvasRC.getLayerGroup(thisComponentID);
		if (typeof layerGroup != "undefined") {
			if (is_new) console.log("wesen: " + this.wesen);
			this.canvasRC.setLayerGroup(thisComponentID, {
				strokeStyle: this.colors[color]
			});
			$.each(layerGroup, function(index, layer) {
				this_.canvasRC.moveLayer(layer, 1000);
			});
		} else {
			if (id + 1 <= this.endLevel) {
				this.wesen = id + 1;
				this.markLevel(this.wesen, color, true);
			}
		}
	}

  /**
   * Function resizeStage
   * @return {[type]}                  [description]
   */
	resizeStage() {
		var scale = true; // override
    // this.stageWidth = $(window).innerWidth(); // 400
    // this.stageWidth = window.screen.width; // 400
    // this.stageWidth = $(window).width(); // 400
    this.getStageWidth(false);
    // this.stageWidth = $(window).outerWidth(); // 400
    this.getStageHeight(false);
		if (!scale) {
			this.stage.prop("height", this.stageHeight);
		} else {
      this.stage.css("width", this.stageWidth + "px");
			this.stage.css("height", this.stageHeight + "px");
      this.stage.css("min-height", this.stageHeight + "px");
      this.stage.css("max-height", this.stageHeight + "px");
      // console.log("stageHeight (css): " + this.stage.css("height"));
		}
    // console.log("this.width: " + Math.ceil(this.stageWidth / this.unit));
    this.width = Math.ceil(this.stageWidth / this.unit + 2 * this.preloadPositions) + 5
    this.showDebugInfo("bufferWidth", this.width);
    this.stageTop = this.stage.offset().top;
    this.resizeActors();
	}

  haveStageDimensionsChanged() {
    var stageWidth = this.getStageWidth(true),
    stageHeight = this.getStageHeight(true, stageWidth);
    return !(stageWidth == this.stageWidth && stageHeight == this.stageHeight);
  }

  resizeActors() {
    var contentOffsetTop = this.stageHeight / 2 - (this.height * this.unit) / 2 + this.stageTop;
    if (contentOffsetTop < this.stageTop) contentOffsetTop = this.stageTop;
    this.canvasRC.prop("height", (this.height - 0.5) * this.unit);
    this.canvasRC.prop("width", 30 * this.unit);
    this.canvasRC.offset({ left: this.stageWidth / 2 - 15 * this.unit, top: contentOffsetTop });
    this.circlesOffsetX = Math.floor(this.stageWidth / this.unit / 2) - this.bufferMarginX;
    if (this.canvasCircles.prop("height") != this.height * this.unit) {
      this.canvasCircles.prop("height", this.height * this.unit);
    }
    if (this.canvasCircles.prop("width") != 6 * this.unit) {
      this.canvasCircles.prop("width", 6 * this.unit);
    }
    this.canvasCircles.offset({
      left: (-3 + this.circlesOffsetX) * this.unit + this.bufferMarginX * this.unit,
      top: contentOffsetTop
    }); // 28

    this.buffer2.offset({ top: contentOffsetTop });
    this.buffer.offset({ top: contentOffsetTop });
    this.pentadeSelectorContainer.offset({ top: contentOffsetTop + this.offsetY });
    var scoreOffsetTop = this.stageTop;
    this.scoreHeight = this.stageHeight;
    this.score2.offset({ top: scoreOffsetTop });
    this.score.offset({ top: scoreOffsetTop });
    this.score2.prop("height", this.scoreHeight);
    this.score.prop("height", this.scoreHeight);
    this.pageScale = (1650 - 260) / this.scoreHeight; // 255 = $trim_top + $trim_bottom in get_png.php
  }

  showInfo(text) {
    $("#info").text(text);
    this.show($("#info"));
  }

  hideInfo() {
    this.hide($("#info"));
  }

  synchronizeSuranadira(position) {
    if (this.overridePentade != null || this.scoreEnabled) return;
    var this_ = this;
    var expectedPosition = null;
    expectedPosition = this.getPosition();
    this.showDebugInfo("expectedPosition", expectedPosition.toString());
    if (position.minus(expectedPosition).abs().cmp(10) >= 0) { // two or more pentades apart
      this.isSynchronizing = true;
      this.stopTimer();
      // console.log("Synchronizing...");
      this.showInfo("Synchronizing Suranadira...");
      this.hideSuranadira();
      this.hideScore();
      /// this.isSynchronizing = true;
      // this.setSuranadiraPosition();
      setTimeout(function() {
        this_.reload();
      }, 1000);
    }
  }

  /**
   * Function getCurrentPentade
   * @return {[type]} [description]
   */
  getCurrentPentade() {
    if (1) {
      var date = new Date;
    } else { // test for different dates and times
      // var date = new Date("2018-06-04 23:59:59");
      var date = new Date("2018-06-10 23:59:59");
      // var date = new Date("2018-06-04 11:59:59");
      // var date = new Date("2018-06-05 14:23:59");
    }
    var time = new Big(date.getTime() - this.tzOffset());
    var interval = new Big(this.scoreTempo).times(5);
    // interval = interval.times(this.time_ratio); // To show the full cycle in 11 levels instead of 12
    var this_pentade = new Big(time.div(interval)).round();
    var this_circles_pentade = Math.round(this.circlesOffsetX / 5);
    // console.log("this_circles_pentade: " + this_circles_pentade);
    this_pentade = this_pentade.minus(this_circles_pentade);
    if (this.useEra) {
      // console.log("pentadesPerDay: " + this.pentadesPerDay);
      var era = new Big(this.pentadesPerDay).times("1000000000000000"); // 16384 // 18277492302156 | 1000000000000
      this_pentade = this_pentade.plus(era);
    }
    if (this.overridePentade != null) this_pentade = this.overridePentade;
    // this_pentade = this_pentade.minus(this_pentade.mod(1)); // floor
    return this_pentade;
  }

  /**
   * Function getPosition
   * Calculates a position by pentade
   * @param  {Big} pentade The pentade, if not supplied the current pentade is used.
   * @return {Big}         The position.
   */
  getPosition(pentade) {
    if (typeof pentade == "undefined") var pentade = this.getCurrentPentade();
    return pentade.times(5);
  }

  /**
   * Function setSuranadiraPosition
   */
  setSuranadiraPosition() {
    this.preloadedPentade = this.getCurrentPentade();
    this.showDebugInfo("preloadedPentade", this.preloadedPentade);
    this.preloadedPosition = this.getPosition(this.preloadedPentade); // .times(5);
    this.showDebugInfo("preloadedPosition", this.preloadedPosition);
    this.currentPosition = this.preloadedPosition.plus(this.circlesOffsetX);
    this.showDebugInfo("currentPosition", this.currentPosition);
  }

  /**
   * Function redraw
   * @param  {boolean} resize [description]
   * @return {[type]}        [description]
   */
	redraw() {
    var this_ = this;
    this_.stopTimer();
    this_.canvas.removeLayers();
    this_.setSuranadiraPosition();
    this_.getVoiceLevels(this_.getVoiceLevelsDefault());
    this_.calcDeltaForPentades(); ///
    this_.drawSuranadira();
    this_.setupPentadeSelectors();
    this_.setupPentadeSelectorEvents();
    this_.loadFromBuffer(false);
    this_.setInitLeft();
    var this_buffer_top = this_.stageHeight / 2 - this_.height * this.offsetY;
    if (this_buffer_top < 0) this_buffer_top = 0;
    this_.buffer.css("top", this_buffer_top + "px");
    this_.buffer2.css("top", this_buffer_top + "px");
    this_.canvasRC.css("top", this_buffer_top + "px");
    // this_.canvasCircles.css("top", this_buffer_top + this_.strokeWidthVoices / 1 + "px");
    this_.canvasCircles.css("top", this_buffer_top + "px");
    this_.pentadeSelectorContainer.css("top", (this_buffer_top + this_.offsetY) + "px");
    // this_.hideCircles();
    this_.drawCircles();
    if (this_.animationEnabled && !this_.scoreEnabled) this_.updateCircles();
    // this_.updateScore();
    this_.onSuranadiraLoaded();
    if (this_.animationEnabled && !this_.scoreEnabled) this_.startTimer();
	}

  /**
   * Function getContentTop
   * @return {float} The content top position in pixels
   */
  getContentTop() {
    var this_buffer_top = this.stageHeight / 2 - this.height * this.offsetY;
    if (this_buffer_top < 0) this_buffer_top = 0;
    return this_buffer_top + this.offsetY;
  }

  /**
   * Function compose
   * @param  {boolean} resize [description]
   * @return {void}
   */
	compose(resize, canvas, color) {
    var debug = false;
    color = color | 0;
		if (typeof resize == "undefined") resize = true;
		var strand = false;
		var deltaNumber = this.dec2delta(this.dec);
    if (this.endLevel == null) this.endLevel = this.dec2bin(this.dec).length - 1;
		this.height = this.endLevel - this.startLevel + 1;
		if (resize) this.resizeStage(false);

		this.singleStrand = true; // init
		this.currLevel = 0; // init
		var position = 0;
		var predecessor = [];
		var component;
		deltaNumber.reverse();
    var ret = {x: this.rcOffsetX, y: position};
		var y = 0;
		var y_temp = 0;
		var component_id = 0;
    var this_ = this;
    if (debug) console.log("start drawing RC");
		$.each(deltaNumber, function(index, delta) {
      if (y >= this_.endLevel) return false;
			delta = parseInt(delta);
			y_temp = y;
			this_.currLevel += delta;
		  component = this_.chooseComponent(delta, position, predecessor.join(""));
			ret = this_.drawComponent(canvas, component, strand, delta, predecessor.join(""), ret.x, y, false, color);
			if (component == "Z" || component == "S") {
				y += 1;
				predecessor.unshift(component + (delta - 1));
				component = this_.chooseComponent(delta - 1, position + 1, null);
				strand = ret.strand;
				ret = this_.drawComponent(canvas, component, strand, delta - 1, null, ret.x, y, true, color);
				y += delta - 1;
				predecessor.unshift(component + (delta - 1));
			} else {
				y += delta;
				predecessor.unshift(component + delta);
			}
      if (this_.currLevel <= this_.endLevel + 1) {
				if (this_.mouseEventsAllowed) this_.drawHotspot(canvas, component_id, delta, ret.x, y_temp);
			}
			predecessor = predecessor.slice(0, 2);
			strand = ret.strand;
			position = y;
			component_id++;
		});
    if (debug) console.log("end drawing RC");
	}

  /**
   * Function chooseComponent
   * @param  {[type]} delta       [description]
   * @param  {[type]} position    [description]
   * @param  {[type]} predecessor [description]
   * @return {[type]}             [description]
   */
	chooseComponent(delta, position, predecessor) {
		if (delta % 2 == 1 && position == 0) return "J";
		else if (delta % 2 == 0 && position == 0) return "V";
		else if (delta > 1 && position % 2 == 0 && $.inArray(predecessor, ["I1J1", "I1I1", "I1U2"]) > (-1)) return "Z";
		else if (delta > 1 && position % 2 == 1 && $.inArray(predecessor, ["I1I1", "I1N2"]) > (-1)) return "S";
		else if (delta % 2 == 0 && position % 2 == 0) return "N";
		else if (delta % 2 == 0 && position % 2 == 1) return "U";
		else if (delta == 1) return "I";
		else if (delta % 2 == 1) return "O";
		else console.log("undefined");
	}

  // Suranadira Music functions

  swapKeyValue(a) {
    // return a;
    var b = [];
    for (var n = 0; n < a.length; n++) {
    // for (var n = this.startLevel; n < this.endLevel + 1; n++) {
      b[a[n]] = n;
    }
    return b;
  }

  /**
   * Function getVoiceLevels
   * @param  {array} v The initial voice levels array
   * @return {array}   The voice levels 2D-array (for each x-position)
   *                    for a Suranadira section.
   */
  getVoiceLevels(v) {
    var debug = false;
    var groups = this.groups;
    var width = this.width;
    // var firstGroup = Math.floor(this.startLevel / 4);
    // var lastGroup = Math.floor((this.endLevel + 0) / 4);
    // console.log("firstGroup: " + firstGroup);
    // console.log("lastGroup: " + lastGroup);
    var g = [];
    for (var n = 0; n < groups + 1; n++) { /// 0
    // for (var n = firstGroup; n < lastGroup + 1; n++) { /// 0
      g[n] = this.getVoiceLevelsGroup(v, n);
    }
    var r = [];
    for (var n = 0; n < width + 1; n++) {
      r[n] = [];
      for (var m = 0; m < groups + 1; m++) { /// 0
      // for (var m = firstGroup; m < lastGroup + 1; m++) { /// 0
        r[n] = r[n].concat(g[m][n]);
      }
      // r[n] = r[n].concat(g[0][n], g[1][n], g[2][n]);
      if (debug) console.log(r[n]);
      // console.log(this.swapKeyValue(r[n]));
      // r1[n] = r[n];
      r[n] = this.swapKeyValue(r[n]); // voice of level -> level of voice
    }
    this.voiceLevels = r;
    // this.levelVoices = r1;
    return r;
  }

  /**
   * Function getVoiceLevelsGroup
   * @param  {array} v The initial voice levels array
   * @param  {integer} group The group ID
   * @return {array}   The voice levels 2D-array (for each x-position)
   *                   for a Suranadira section for the selected group.
   */
   getVoiceLevelsGroup(v, group) {
     var debug = false;
     var width = this.width, height = this.height;
     var left = new Big(this.preloadedPosition);
     var groups = this.groups;
     var voicesPerGroup = Math.floor(height / groups);
     // console.log("voicesPerGroup: " + voicesPerGroup);
     var offset_y = group * voicesPerGroup;
     var a, r = [];
     var group_first_voice = group * voicesPerGroup;
     v = v.slice(group_first_voice, group_first_voice + voicesPerGroup);
     // v = v.filter(function(){return true;});
     // var v = [0, 1, 2, 3];
     if (debug) console.log(v);
     r.push(v);
     for(var x = 0; x < width; x++) {
       a = [];
       for(var y = offset_y; y < offset_y + voicesPerGroup; y++) {
         a.push(this.logos(left.plus(x), y));
       }
       // console.log(a);
       v = this.rotateVoices(a, v);
       if (debug) console.log(x, v);
       r.push(v);
     }
     // if (debug) console.log(r);
     return r;
   }

  /**
   * Function rotateVoices
   * @param  {array} p Rotation pattern
   * @param  {array} v Voice levels array
   * @return {array}   New voice levels array
   */
  rotateVoices(p, v) {
    var from = null;
    var to = null;
    var free = null;
    var a = v.slice(0);
    // console.log(a);
    for (var n = 0; n < p.length; n++) { // rotate down
    // for (var n = p.length - 1; n >= 0; n--) { // rotate up
      if (p[n] == 0) {
        to = n;
        if (from == null) free = n;
        else a[to] = v[from];
        from = n;
      }
    }
    if (free != from) a[free] = v[from];
    return a;
  }

  /**
   * Function getVoiceLevelsDefault
   * @return {array} The default voice levels e.g. [0, 1, 2, 3]
   */
  getVoiceLevelsDefault() {
    var height = this.height;
    var v = [];
    for (var n = 0; n < height; n++) { /// 0
    // for (var n = this.startLevel; n < this.endLevel + 1; n++) {
      v[n] = n;
    }
    // console.log(v);
    return v;
  }

  getVoiceLevelsCurrent() {
    // this.voiceLevels[x][y]
    // console.log(this.voiceLevels[25]);
    /// return this.voiceLevels[this.preloadPositions];
    return this.swapKeyValue(this.voiceLevels[this.preloadPositions]);
  }

  // End Suranadira Music functions

	logos(x, y) {
		x = new Big(x);
		var t,
		c = Big(5).times(Big(2).pow(y)),
		r = t = x.mod(c).minus(c.times(4).div(10));
		t = t.cmp(0);
		return t < 0 ? parseInt(r.mod(2)) : parseInt(r.mod(3));
	}

	dec2delta(k) {
		var p = (-1),
		k = new Big(k),
		b = new Big(2),
		c = 0,
		d = [];
		while (k.cmp(0) == 1) {
			c = b.pow(this.log2(k));
			k = k.minus(c);
			if (p > (-1)) d.push(p - this.log2(c));
			p = this.log2(c);
		}
		d.push(p + 1);
		return d;
	}

	log2(dec) {
		return this.dec2bin(dec).length - 1;
	}

	dec2bin(dec) {
    // Big.DP = 20;
		Big.RM = 0;
		dec = new Big(dec);
		var digits = [0, 1],
    rest,
		value = "";
		while(dec.cmp(1) == 1) {
			rest = dec.mod(2).toFixed(0);
			dec = dec.div(2).toFixed(0);
			value = digits[parseInt(rest)] + value;
			dec = new Big(dec);
		}
		value = digits[parseInt(dec)] + value;
		return value;
	}

	getRandom(iterations = 2) {
		var rnd = "";
		for (var n = 0; n < iterations; n++) {
			rnd += Math.floor(Math.random() * 1000000) + 1;
			rnd = rnd.toString();
		}
		return rnd;
	}

  /**
   * Returns the current timezone offset in milliseconds
   */
  tzOffset() {
    var autoDST = false,
		d = new Date();
    if (autoDST) {
      var jan = new Date(d.getFullYear(), 0, 1);
      var jul = new Date(d.getFullYear(), 6, 1);
      return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset()) * 60 * 1000;
    } else {
      return d.getTimezoneOffset() * 60 * 1000;
    }
	}

  /**
   * Returns milliseconds since midnight
   * @param  {date} d A date
   * @return {float}   Milliseconds
   */
  getMsSinceMidnight(d) {
    var e = new Date(d);
    return d - e.setHours(0,0,0,0);
  }

  hexToRgb(hex) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
        return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
  }

  rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }

  /**
  * Converts an RGB color value to HSL. Conversion formula
  * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
  * Assumes r, g, and b are contained in the set [0, 255] and
  * returns h, s, and l in the set [0, 1].
  *
  * @param   Number  r       The red color value
  * @param   Number  g       The green color value
  * @param   Number  b       The blue color value
  * @return  Array           The HSL representation
  */
  rgbToHsl(r, g, b) {
    r /= 255, g /= 255, b /= 255;

    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;

    if (max == min) {
      h = s = 0; // achromatic
    } else {
      var d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }

      h /= 6;
    }

    return {h: h, s: s, l: l};
  }

  /**
  * Converts an HSL color value to RGB. Conversion formula
  * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
  * Assumes h, s, and l are contained in the set [0, 1] and
  * returns r, g, and b in the set [0, 255].
  *
  * @param   Number  h       The hue
  * @param   Number  s       The saturation
  * @param   Number  l       The lightness
  * @return  Array           The RGB representation
  */
  hslToRgb(h, s, l) {
    var r, g, b;

    if (s == 0) {
      r = g = b = l; // achromatic
    } else {
      var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      var p = 2 * l - q;

      r = this.hue2rgb(p, q, h + 1/3);
      g = this.hue2rgb(p, q, h);
      b = this.hue2rgb(p, q, h - 1/3);
    }

    return {r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255)};
  }

  hue2rgb(p, q, t) {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1/6) return p + (q - p) * 6 * t;
    if (t < 1/2) return q;
    if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
    return p;
  }

}
