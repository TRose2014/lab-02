'use strict';

let allhornBeastOne = [];
let allhornBeastTwo = [];

function HornBeasts(hornBeast){
  this.image_url = hornBeast.image_url;
  this.title = hornBeast.title;
  this.description = hornBeast.description;
  this.keyword = hornBeast.keyword;
  this.horns = hornBeast.horns;
}

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
  $('#beasts').empty();

  if (event.target.id === 'galOne') {
    allhornBeastOne.forEach(newHornBeastObject => {
      $('#beasts').append(newHornBeastObject.toHtml());
    });
    createKeywords('one');
  } else {
    allhornBeastTwo.forEach(newHornBeastObject => {
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
