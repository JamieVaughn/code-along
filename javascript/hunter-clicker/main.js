/* ======= Model ======= */

var model = {
  currentprey: null,
  playing: true,
  swings: 18,
  preys: [
      {
          clickCount : 0,
          name : 'Carnivine',
          imgSrc :  "https://raw.githubusercontent.com/sparklinlabs/superpowers-asset-packs/master/prehistoric-platformer/monsters/plant-1.png",
          width: 810,
          height: 340,
          frames: 6,
          rows: 4,
          rowPx: [0, 67, 166.68, 200],
          attackRow: 3,
          defeatRow: 4,
          flip: true,
          hp: 16,
          isDefeated: false,
          loot: ['🥬', 24]
      },
      {
          clickCount : 0,
          name : 'Grass Chopper',
          imgSrc : 'https://raw.githubusercontent.com/sparklinlabs/superpowers-asset-packs/master/prehistoric-platformer/monsters/insect-1.png',
          width: 387,
          height: 138,
          frames: 5,
          rows: 2,
          rowPx: [0, 100.5],
          attackRow: 1,
          defeatRow: 2,
          flip: true,
          hp: 12,
          isDefeated: false,
          loot: ['🍤', 22]
      },
      {
          clickCount : 0,
          name : 'Hurtle',
          imgSrc : 'https://raw.githubusercontent.com/sparklinlabs/superpowers-asset-packs/master/prehistoric-platformer/monsters/turtle-1.png',
          width: 360,
          height: 152,
          frames: 6,
          rows: 4,
          rowPx: [0, 34, 67, 101],
          attackRow: 2,
          defeatRow: 4,
          flip: false,
          hp: 28,
          isDefeated: false,
          loot: ['🍖', 40]
      },
      {
          clickCount : 0,
          name : 'Lizorde',
          imgSrc : 'https://raw.githubusercontent.com/sparklinlabs/superpowers-asset-packs/master/prehistoric-platformer/monsters/lizard-2.png',
          width: 630,
          height: 204,
          frames: 6,
          rows: 4,
          rowPx: [0, 34, 67, 100],
          attackRow: 3,
          defeatRow: 4,
          flip: true,
          hp: 20,
          isDefeated: false,
          loot: ['🍗', 45]
      },
      {
          clickCount : 0,
          name : 'Visciousaur',
          imgSrc : 'https://raw.githubusercontent.com/sparklinlabs/superpowers-asset-packs/master/prehistoric-platformer/monsters/tyrannosaurus-1.png',
          width: 906,
          height: 420,
          frames: 6,
          rows: 5,
          rowPx: [5, 65, 164, 353],
          attackRow: 1,
          defeatRow: 4,
          flip: false,
          hp: 30,
          isDefeated: false,
          loot: ['🥩', 75]
      }
  ]
};


/* ======= controller ======= */

var controller = {

  init: function() {
      // set our current prey to the first one in the list
      model.currentprey = model.preys[0];

      // tell our views to initialize
      preyListView.init();
      preyView.init();
  },

  getCurrentprey: function() {
      return model.currentprey;
  },

  getpreys: function() {
      return model.preys;
  },

  // set the currently-selected prey to the object passed in
  setCurrentprey: function(prey) {
      model.currentprey = prey;
  },

  // increments the counter for the currently-selected prey
  incrementCounter: function() {
    model.swings--;
    if(!model.playing) return
    if(model.currentprey.clickCount < model.currentprey.hp) {
      model.currentprey.clickCount++;
    }
    preyView.render();
  },
};


/* ======= View ======= */

var preyView = {

  init: function() {
      // store pointers to our DOM elements for easy access later
      this.preyElem = document.getElementById('prey');
      this.preyNameElem = document.getElementById('prey-name');
      this.preyImageElem = document.getElementById('prey-img');
      this.countElem = document.getElementById('prey-count');
      this.keyframesElem = document.getElementById('keyframes');

      // on click, increment the current prey's counter
      this.preyImageElem.addEventListener('click', function(){
          if(model.playing) controller.incrementCounter();
          preyView.render()
      });

      // render this view (update the DOM elements with the right values)
      this.render();
  },

  render: function() {
    document.querySelector('#clicks').innerText = model.swings
      // update the DOM elements with values from the current prey
      this.preyImageElem.classList.remove('dead')
      this.preyImageElem.dataset.loot = ''
      var currentprey = controller.getCurrentprey();
      console.table(currentprey)
      let animationMode = currentprey?.clickCount >= currentprey?.hp ? 'defeatRow' : 'attackRow' 
      this.countElem.textContent = currentprey.clickCount;
      this.preyNameElem.textContent = currentprey.name;
    //Customize Spritesheet manipulation for each prey element
      this.preyImageElem.style.background = "url("+currentprey.imgSrc+") left top";
      let excess = 0
      if(currentprey.name === 'Visciousaur') excess = 8
      this.preyImageElem.style.height = (currentprey.height/currentprey.rows) + excess +"px";
      this.preyImageElem.style.width = currentprey.width/currentprey.frames +"px";
      this.preyImageElem.style.animationTimingFunction = "steps("+currentprey.frames+")";
      if(animationMode === 'defeatRow') {
        currentprey.isDefeated = true
        this.preyImageElem.classList.add('dead')
        this.preyImageElem.dataset.loot = currentprey.loot[0]
        model.swings += model.currentprey.loot[1]
        model.currentprey.loot[1] = 0
      }
      let yPos = currentprey.rowPx[currentprey[animationMode] - 1] // had to set custom y offset for each creature, since spritesheets were not consistent grids
      this.keyframesElem.innerHTML = `@keyframes play {
        0% { 
          background-position: 0px ${yPos}%; 
        }
        100% { 
          background-position: ${currentprey.width}px ${yPos}%; 
        }
      }`;
    // flip spritesheet if necessary
      if(currentprey.flip){
      this.preyImageElem.style.transform = "scaleX(-1)";
    }else{
      this.preyImageElem.style.transform = "scaleX(1)";
    }
    preyView.checkStatus()
  },

  // check win/lose condiiton
  checkStatus: function () {
    if(model.swings < 1) {
      model.playing = false
      document.querySelector('#hero-name').innerText = '😭 You Starved!! 😱'
      document.querySelector('#hero-name').classList.add('starved')
    }
    if(model.preys.filter(prey => prey.isDefeated === false).length === 0) {
      model.playing = false
      document.querySelector('#hero-name').innerText = '🙌 You Feasted!! 😋'
      document.querySelector('#hero-name').classList.add('feasted')
    }
  }
};

var preyListView = {

  init: function() {
      // store the DOM element for easy access later
      this.preyListElem = document.getElementById('prey-list');

      // render this view (update the DOM elements with the right values)
      this.render();
  },

  render: function() {
      var prey, elem, i;
      // get the preys we'll be rendering from the controller
      var preys = controller.getpreys();

      // empty the prey list
      this.preyListElem.innerHTML = '';

      // loop over the preys
      for (i = 0; i < preys.length; i++) {
          // this is the prey we're currently looping over
          prey = preys[i];

          // make a new prey list item and set its text
          elem = document.createElement('li');
          elem.textContent = prey.name;

          // on click, setCurrentprey and render the preyView
          // (this uses our closure-in-a-loop trick to connect the value
          //  of the prey variable to the click event function)
          elem.addEventListener('click', (function(preyCopy) {
              return function() {
                  controller.setCurrentprey(preyCopy);
                  preyView.render();
              };
          })(prey));

          // finally, add the element to the list
          this.preyListElem.appendChild(elem);
      }
  }
};

// make it go!
controller.init();
