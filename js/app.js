'use strict';


function HornBeasts(hornBeast){
  this.image_url = hornBeast.image_url;
  this.title = hornBeast.title;
  this.description = hornBeast.description;
  this.keyword = hornBeast.keyword;
  this.horns = hornBeast.horns;
}

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

HornBeasts.readJson = () => {
  $.get('../data/page-1.json')
    .then(data => {
      data.forEach(element => {
        HornBeasts.allhornBeast.push(new HornBeasts(element));
      });
    })
    .then(HornBeasts.loadHornBeasts);
};

HornBeasts.loadHornBeasts = () => {
  HornBeasts.allhornBeast.forEach(hornBeast => hornBeast.render());
  HornBeasts.createKeywords();
};

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

$(()=> HornBeasts.readJson());

