'use strict';

function HornBeasts(hornBeast){
  this.image_url = hornBeast.image_url;
  this.title = hornBeast.title;
  this.description = hornBeast.description;
  this.keyword = hornBeast.keyword;
  this.horns = hornBeast.horns;
}



// let allhornBeast = [];

// function HornBeasts(rawDataObject){
//   for(let key in rawDataObject){
//     this[key] = rawDataObject[key];
//   }
// }

// HornBeasts.prototype.toHtml = () => {
//   let source = $('#photo-template').html();
//   let template= Handlebars.compile(source);
//   return template(this);

// };

// dataSetOne.forEach(dataSetObject => {
//   allhornBeast.push(new HornBeasts(dataSetObject));
// });

// allhornBeast.forEach(newHornBeastObject => {
//   console.log(newHornBeastObject);
//   $('main').append(newHornBeastObject.toHtml());
// });

HornBeasts.allhornBeast = [];

HornBeasts.prototype.render = function() {
  // Create beasts
  let hornBeastClone = $('#photo-template').clone();
  let $hornBeastClone = $(hornBeastClone[0].content);

  //Give content beasts

  $hornBeastClone.find('h2').text(this.title);
  $hornBeastClone.find('img').attr('src', this.image_url);
  $hornBeastClone.find('img').attr('value', this.keyword);
  $hornBeastClone.find('p').text(this.description);

  //Append beasts
  $hornBeastClone.appendTo('main');
};

HornBeasts.readJson = (str) => {
  $.get(str)
    .then(data => {
      data.forEach(element => {
        HornBeasts.allhornBeast.push(new HornBeasts(element));
      });
    })
    .then(HornBeasts.loadHornBeasts);
};

HornBeasts.loadHornBeasts = () => {
  HornBeasts.allhornBeast.sort((a, b) => {
    if (a.title < b.title) {
      return -1;
    }
    if (a.title > b.title) {
      return 1;
    }
  });

  HornBeasts.allhornBeast.forEach(hornBeast => hornBeast.render());
  // $('main').append(hornBeast.toHtml());
  HornBeasts.createKeywords();
};
// HornBeasts.createKeywords();


HornBeasts.createKeywords = () => {
  const keywordObj = {};

  HornBeasts.allhornBeast.forEach(element => {
    if(keywordObj[element.keyword] !== element.keyword){
      keywordObj[element.keyword] = element.keyword;
      $('#optionsList').append(`<option value="${element.keyword}">${element.keyword}</option>'`);
    }
  });
  $('#optionsList').on('change', queryBeasts);
};

let queryBeasts = (event) => {
  $('section').hide();

  let img = $(`img[value="${event.target.value}"]`).parent();
  $(img).show();
};

$('li').click((event) => {
  HornBeasts.allhornBeast = [];

  $('main').empty();
  $('main').append('<template id="photo-template"><section><h2></h2><img src="" alt=""><p></p></section></template>');

  if (event.target.id === 'galOne') {
    HornBeasts.readJson('../data/page-1.json');
  } else {
    HornBeasts.readJson('../data/page-2.json');
  }
});

$(()=> HornBeasts.readJson('../data/page-1.json'));
