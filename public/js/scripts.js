console.log('...loaded');

//aleksa staff --------

$(function(){
// updateImageAndViews();

  var $imgUrl;
  function readImage() {
      if ( this.files && this.files[0] ) {
          var FR = new FileReader();
          FR.onload = function(e) {
               $('#img').attr( "src", e.target.result );
               $('#url').val(e.target.result);
               $imgUrl = $('#base').append( ($('<p>').text( e.target.result ) ));
               console.log($imgUrl);
          };
          FR.readAsDataURL( this.files[0] );
      }
  }
  $("#asd").change( readImage );
  setImgFormHandler();

  var $el = $('#avatar');
  var $formId = $('#form');
  getName($el, $formId);

}) ///finish main function on load


function renderAvatar(name,$el){
  var url = 'http://api.adorable.io/avatar/'+name;
  $el.append($('<img>').attr("src",'http://api.adorable.io/avatar/150/'+name));
}

function getName($el,$formId){
  $($formId).on('submit', function(e){
    e.preventDefault();
    $el.empty();
    var nameField = $(this).find('input[name="name"]');
    var name = nameField.val();
    nameField.val('');
    renderAvatar(name,$el);
})
}


function createImg(imgData, callback){
  callback = callback || function(){};
  $.ajax({
    method: 'post',
    data: {
      name: imgData.name,
      img: imgData.img,
      lastname:imgData.lastname,
      bday:imgData.bday,
      zodiak:imgData.zodiak,
      bloodtype:imgData.bloodtype,
      placeOfBirth:imgData.placeOfBirth,
      currentCity:imgData.currentCity,
      favoriteBook:imgData.favoriteBook,
      favoriteSong:imgData.favoriteSong,
      favoriteMovie:imgData.favoriteMovie,
      favoriteFood:imgData.favoriteFood,
      formFavoriteTvShow:imgData.favoriteTvShow,
      gender:imgData.gender,
      gitHub:imgData.gitHub,
      linkedIn:imgData.linkedIn,
      website:imgData.website,
      facebook:imgData.facebook,
      twitter:imgData.twitter,
      instagram:imgData.instagram,
      tumblr:imgData.tumblr,
      languages:imgData.languages,
      coding:imgData.coding,
      bio:imgData.bio,
    },
    url: '/api/otters',
    success: function(data){
      var img = data.img;
      callback(img);
      console.log('dddddd', data);
    }
  });
}

function setImgFormHandler(){
  $('form#getUrl').on('submit', function(e){
    e.preventDefault();
    $('#img').attr('src','');
    var formName = $(this).find('input[name="name"]').val();
    var formLastName = $(this).find('input[name="lastname"]').val();
    var formBday = $(this).find('input[name="bday"]').val();
    var formZodiak = $(this).find('select[name="zodiak"]').val();
    var formBloodtype = $(this).find('input[name="bloodtype"]').val();
    var formPlaceOfBirth = $(this).find('input[name="placeOfBirth"]').val();
    var formCurrentCity = $(this).find('input[name="currentCity"]').val();
    var formFavoriteBook = $(this).find('input[name="favoriteBook"]').val();
    var formFavoriteSong = $(this).find('input[name="favoriteSong"]').val();
    var formFavoriteMovie = $(this).find('input[name="favoriteMovie"]').val();
    var formFavoriteFood = $(this).find('input[name="favoriteFood"]').val();
    var formFavoriteTvShow = $(this).find('input[name="favoriteTvShow"]').val();
    var formGender = $(this).find('input[name="gender"]').val();
    var formGitHub = $(this).find('input[name="gitHub"]').val();
    var formLinkedIn = $(this).find('input[name="linkedIn"]').val();
    var formWebsite = $(this).find('input[name="website"]').val();
    var formFacebook = $(this).find('input[name="facebook"]').val();
    var formTwitter = $(this).find('input[name="twitter"]').val();
    var formInstagram = $(this).find('input[name="instagram"]').val();
    var formTumblr = $(this).find('input[name="tumblr"]').val();
    var formLanguages = $(this).find('input[name="languages"]').val();
    var formCoding = $(this).find('input[name="coding"]').val();
    var formBio = $(this).find('textarea[name="bio"]').val();
    var formUrl = $(this).find('input[name="url"]').val();
    var imgData = {

      name:formName,
      lastname:formLastName,
      bday:formBday,
      zodiak:formZodiak,
      bloodtype:formBloodtype,
      placeOfBirth:formPlaceOfBirth,
      currentCity:formCurrentCity,
      favoriteBook:formFavoriteBook,
      favoriteSong:formFavoriteSong,
      favoriteMovie:formFavoriteMovie,
      favoriteFood:formFavoriteFood,
      favoriteTvShow:formFavoriteTvShow,
      gender:formGender,
      gitHub:formGitHub,
      linkedIn:formLinkedIn,
      website:formWebsite,
      facebook:formFacebook,
      twitter:formTwitter,
      instagram:formInstagram,
      tumblr:formTumblr,
      languages:formLanguages,
      coding:formCoding,
      bio:formBio,
      img: formUrl

    };
    createImg(imgData, function(img){

      console.log('weeeee', img);
    })
    updateImageAndViews();

  });
}



//try to get img from db

function getAllImg(callback){
  console.log('aaaaa');
  callback = callback || function(){}
    $.ajax({
      url: '/api/otters',
      success: function(data){
        console.log(data.Otter + "wooow");
        var images = data.Otter;
        callback(images);
      }
    });

}


  function renderImage(image){
    var images = image.img;
    console.log(images.length);
    console.log("file reader   "+images);
    var $el = ('#imgFromDB');
      var $img = ( $('<img>').attr('src', images) );
      $( "#imgFromDB" ).append( $img );

  }

  function updateImageAndViews(){
    console.log('updateImageAndViews');
    getAllImg(function(images){
      console.log('here');
      var $list = $('#imgFromDB');
      renderImageList(images, $list)
    })
  }

  function renderImageList(images, $list){
    $list.empty();
    var image;
    for(var i = 0; i<images.length; i++){
      image = images[i];
      $imageView = renderImage(image);
      $list.append($imageView);
    }
  }


  //aleksa staff ends ----
