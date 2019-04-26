'use strict';

let allhornBeastOne = [];
let allhornBeastTwo = [];
let activeDeck = 'allhornBeastOne';

function HornBeasts(rawDataObject){
  for(let key in rawDataObject){
    this[key] = rawDataObject[key];
  }
}

HornBeasts.prototype.toHtml = function() {
  let source = $('#photo-template').html();
  let template = Handlebars.compile(source);
  return template(this);
};

$('li').click((event) => {
  console.log('hello');
  $('#beasts').empty();

  if (event.target.id === 'galOne') {
    allhornBeastOne.forEach(newHornBeastObject => {
      activeDeck = 'allhornBeastOne';
      $('#beasts').append(newHornBeastObject.toHtml());
    });
    createKeywords('one');
  } else {
    allhornBeastTwo.forEach(newHornBeastObject => {
      activeDeck = 'allhornBeastTwo';
      $('#beasts').append(newHornBeastObject.toHtml());
    });
    createKeywords('two');
  }
});

let createKeywords = (val) => {
  const keywordObj = {};
  let deck;

  $('#optionsList').empty();

  if (val === 'one') {
    deck = allhornBeastOne;
  } else {
    deck = allhornBeastTwo;
  }

  deck.forEach(beast => {
    if (keywordObj[beast.keyword] !== beast.keyword) {
      keywordObj[beast.keyword] = beast.keyword;
      $('#optionsList').append(`<option value="${beast.keyword}">${beast.keyword}</option>'`);
    }
  });

  $('#optionsList').on('change', queryBeasts);
};

let queryBeasts = (event) => {
  $('#beasts').children().hide();

  let img = $(`img[value="${event.target.value}"]`).parent();
  $(img).show();
};

let sortEverything = () => {
  let arr = [allhornBeastOne, allhornBeastTwo];

  arr.forEach(beastArr => {
    beastArr.sort((a, b) => {
      if (a.title < b.title) {
        return -1;
      } else {
        return 1;
      }
    });
  });

  if (activeDeck === 'allhornBeastOne') {
    $('#galOne').click();
  } else {
    $('#galTwo').click();
  }
};

let sortReverse = () => {
  let arr = [allhornBeastOne, allhornBeastTwo];

  arr.forEach(beastArr => {
    beastArr.sort((a, b) => {
      if (a.title < b.title) {
        return 1;
      } else {
        return -1;
      }
    });
  });

  if (activeDeck === 'allhornBeastOne') {
    $('#galOne').click();
  } else {
    $('#galTwo').click();
  }
};

dataSetOne.forEach(dataSetObject => {
  allhornBeastOne.push(new HornBeasts(dataSetObject));

  if (allhornBeastOne.length === dataSetOne.length) {
    createKeywords('one');
  }
});

dataSetTwo.forEach(dataSetObject => {
  allhornBeastTwo.push(new HornBeasts(dataSetObject));

  if (allhornBeastTwo.length === dataSetTwo.length) {
    sortEverything();
  }
});

allhornBeastOne.forEach(newHornBeastObject => {
  $('#beasts').append(newHornBeastObject.toHtml());
});

$('form').on('change', (event) => {
  if (event.target.id === 'alphabetical') {
    sortEverything();
  } else {
    sortReverse();
  }
});
