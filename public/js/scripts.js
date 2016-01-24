console.log('...loaded');

window.fbAsyncInit = function() {
  FB.init({
    appId      : '1499610890345471',
    cookie     : true,
    xfbml      : true,
    version    : 'v2.2'
  });
  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
};

(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function logIn(username, password, callback) {
  $.ajax({
    method: 'post',
    url: 'api/users/authenticate',
    data: {username: username, password: password},
    success: function(data){
      $.cookie('token', data.token);
      callback(data);
    }
  });
}

function setLogInFormHandler(){
  $('form#log-in').on('submit', function(e){
    e.preventDefault();

    var usernameField = $(this).find('input[name="username"]');
    var username = usernameField.val();
    usernameField.val('');

    var passwordField = $(this).find('input[name="password"]');
    var password = passwordField.val();
    passwordField.val('');

    logIn(username, password, function(data){
      window.location.href = '/profile';
    });
  });
}

function setLogOutHandler(){
  $('form#log-out').on('submit', function(e){
    e.preventDefault();
    $.removeCookie('token');
    FB.logout(function(response) {
      console.log('user is now logged-out');
    });
    window.location.href = '/';
  });
};

function getAllProfiles(callback){
  callback = callback || function(){};
  $.ajax({
    url: '/api/otters',
    success: function(data){
      var otters = data.Otter;
      callback(otters);
    }
  });
}

function renderProfile(otter){
  var $el = $('<div>').addClass('container ' + otter.id );
  $el.append( $('<img>').addClass('list img').attr('src' , otter.img) );
  $el.append( $('<div>').addClass('list name').text(otter.name + ' ' + otter.lastname) );

  $('.profilelist').append($el);

}

function renderProfileList(otters, $list){
  $list.empty();
  var otter;
  for (var i = 0; i < otters.length; i++) {
    otter = otters[i];
    $profileView = renderProfile(otter);
    $list.append($profileView);
  }
}

var k;

function renderProjectList(otters, $projectList){
  $projectList.empty();
  var project;
  for (var i = 0; i < otters.length; i++) {
    project = otters[i].projects
    for (k = 0 ; k < project.length; k++) {
      $projectView = renderProject(project);
      $projectList.append($projectView);
    }
  }
}

var j;

function renderBlogList(otters, $blogList){
  $blogList.empty();
  var blog;
  for (var i = 0; i < otters.length; i++) {
    blog = otters[i].blogs
    for ( j = 0 ; j < blog.length; j++) {
      $blogView = renderBlog(blog);
      $blogList.append($blogView);
    }
  }
}

function updateViews(){
  getAllProfiles(function(otters){
    var $list = $('.profilelist');
    var $projectList = $('.projectlist');
    var $blogList = $('.globalblog');
    renderProfileList(otters, $list);
    renderProjectList(otters, $projectList);
    renderBlogList(otters, $blogList);
  });
}

function makeDiv(name,lastname,bday,zodiac,bloodtype,placeOfBirth,currentCity,favoriteBook,favoriteSong,favoriteMovie,favoriteFood,favoriteTvShow,gender,gitHub,linkedIn,website,facebook,twitter,instagram,tumblr,languages,coding,group,graduate,bio,img,projects,blogs){
  var $el = $('<div>').addClass('container');
  $el.append( $('<img>').addClass('img').attr('src' , img) );
  $el.append( $('<div>').addClass('name').text(name + ' ' + lastname) );
  $el.append( $('<div>').addClass('bday').text(bday) );
  $el.append( $('<div>').addClass('gender').text(gender) );
  $el.append( $('<div>').addClass('zodiac').text(zodiac) );
  $el.append( $('<div>').addClass('bloodtype').text(bloodtype) );
  $el.append( $('<div>').addClass('placeOfBirth').html("<img src='http://maps.googleapis.com/maps/api/staticmap?center=" + placeOfBirth + "&size=320x200&zoom=11&style=element:geometry.stroke|visibility:off&style=feature:landscape|element:geometry|saturation:-100&style=feature:water|saturation:-100|invert_lightness:true&key=AIzaSyDz4AJ9TK_qNtpYLKVmfYK6a8oVt4dL9yc' />") );
  $el.append( $('<div>').addClass('currentCity').html("<img src='http://maps.googleapis.com/maps/api/staticmap?center=" + currentCity + "&size=320x200&zoom=11&style=element:geometry.stroke|visibility:off&style=feature:landscape|element:geometry|saturation:-100&style=feature:water|saturation:-100|invert_lightness:true&key=AIzaSyDz4AJ9TK_qNtpYLKVmfYK6a8oVt4dL9yc' />") );
  $el.append( $('<div>').addClass('languages').text(languages) );
  $el.append( $('<div>').addClass('coding').text(coding) );
  $el.append( $('<div>').addClass('group').text(group) );
  $el.append( $('<div>').addClass('graduate').text(graduate) );
  $el.append( $('<div>').addClass('favoriteBook').text(favoriteBook) );
  $el.append( $('<div>').addClass('favoriteSong').text(favoriteSong) );
  $el.append( $('<div>').addClass('favoriteMovie').text(favoriteMovie) );
  $el.append( $('<div>').addClass('favoriteFood').text(favoriteFood) );
  $el.append( $('<div>').addClass('favoriteTvShow').text(favoriteTvShow) );
  $el.append( $('<div>').addClass('gitHub').html("<a target='_blank' href='http://www.github.com/" + gitHub + "'> GitHub </a>") );
  $el.append( $('<div>').addClass('linkedIn').html("<a target='_blank' href='https://www.linkedin.com/in/" + linkedIn + "'> LinkedIn </a>") );
  $el.append( $('<div>').addClass('facebook').html("<a target='_blank' href='https://www.facebook.com/" + facebook + "'> Facebook </a>") );
  $el.append( $('<div>').addClass('twitter').html("<a target='_blank' href='https://www.twitter.com/" + twitter + "'> Twitter </a>") );
  $el.append( $('<div>').addClass('instagram').html("<a target='_blank' href='https://www.instagram.com/" + instagram + "'> Instagram </a>") );
  $el.append( $('<div>').addClass('tumblr').html("<a target='_blank' href='https://" + tumblr + ".tumblr.com/'> Tumblr </a>") );
  $el.append( $('<div>').addClass('website').html("<a target='_blank' href='http://" + website + "'> Website </a>") );
  $el.append( $('<div>').addClass('bio').text(bio) );
  for (var i = 0; i < projects.length; i++) {
    var project = projects[i];
    var $proj = $('<div>').addClass('profileproject');
    $proj.append( $('<div>').addClass('projectName').text(project.projectName) );
    $proj.append( $('<img>').addClass('projectImg').attr('src' , project.projectImg) );
    $('.profileprojects').append($proj);
  }
  for (var i = 0; i < blogs.length; i++) {
    var blog = blogs[i];
    var $blog = $('<div>').addClass('profileblogpost');
    $blog.append( $('<div>').addClass('blogBody').html(blog.blogBody) );
    $('.profileblog').append($blog);
  }

  $('.profilebody').append($el);
}

function makeDivProject(project){
  var $el = $('<div>').addClass('projectSum');
  $el.append( $('<div>').addClass('projectName').text(project[k].projectName) );
  $el.append( $('<div>').addClass('projectLanguage').text(project[k].projectLanguage) );
  $el.append( $('<img>').addClass('projectImg').attr('src' , project[k].projectImg) );
  $el.append( $('<div>').addClass('projectDescription').text(project[k].projectDescription) );
  $el.append( $('<div>').addClass('projectGitHubLink').text(project[k].projectGitHubLink) );
  $el.append( $('<div>').addClass('projectPublicLink').text(project[k].projectPublicLink) );
  $('.project').append($el);
}

function makeProfile(){
  $.ajax({
    method: 'get',
    url: '/api/otters/profile',
    success: function(data){
      var name = data.Otter.name;
      var lastname = data.Otter.lastname;
      var bday = data.Otter.bday;
      var zodiac = data.Otter.zodiac;
      var bloodtype = data.Otter.bloodtype;
      var placeOfBirth = data.Otter.placeOfBirth;
      var currentCity = data.Otter.currentCity;
      var favoriteBook = data.Otter.favoriteBook;
      var favoriteSong = data.Otter.favoriteSong;
      var favoriteMovie = data.Otter.favoriteMovie;
      var favoriteFood = data.Otter.favoriteFood;
      var favoriteTvShow = data.Otter.favoriteTvShow;
      var gender = data.Otter.gender;
      var gitHub = data.Otter.gitHub;
      var linkedIn = data.Otter.linkedIn;
      var website = data.Otter.website;
      var facebook = data.Otter.facebook;
      var twitter = data.Otter.twitter;
      var instagram = data.Otter.instagram;
      var tumblr = data.Otter.tumblr;
      var languages = data.Otter.languages;
      var coding = data.Otter.coding;
      var group = data.Otter.group;
      var graduate = data.Otter.graduate;
      var bio = data.Otter.bio;
      var img = data.Otter.img;
      var projects = data.Otter.projects;
      var blogs = data.Otter.blogs;
      makeDiv(name,lastname,bday,zodiac,bloodtype,placeOfBirth,currentCity,favoriteBook,favoriteSong,favoriteMovie,favoriteFood,favoriteTvShow,gender,gitHub,linkedIn,website,facebook,twitter,instagram,tumblr,languages,coding,group,graduate,bio,img,projects,blogs);
    }
  });
}

function createProfile(otterData, callback){
  callback = callback || function(){};
  $.ajax({
    method: 'post',
    data: {
      name: otterData.name,
      img: otterData.img,
      lastname:otterData.lastname,
      bday:otterData.bday,
      zodiac:otterData.zodiac,
      bloodtype:otterData.bloodtype,
      placeOfBirth:otterData.placeOfBirth,
      currentCity:otterData.currentCity,
      favoriteBook:otterData.favoriteBook,
      favoriteSong:otterData.favoriteSong,
      favoriteMovie:otterData.favoriteMovie,
      favoriteFood:otterData.favoriteFood,
      formFavoriteTvShow:otterData.favoriteTvShow,
      gender:otterData.gender,
      gitHub:otterData.gitHub,
      linkedIn:otterData.linkedIn,
      website:otterData.website,
      facebook:otterData.facebook,
      twitter:otterData.twitter,
      instagram:otterData.instagram,
      tumblr:otterData.tumblr,
      languages:otterData.languages,
      coding:otterData.coding,
      group:otterData.group,
      graduate:otterData.graduate,
      bio:otterData.bio,
    },
    url: '/api/otters',
    success: function(data){
      var img = data.img;
      callback(img);
      makeProfile();
    }
  });
}

function setProfileFormHandler(){
  $('form#getData').on('submit', function(e){
    e.preventDefault();
    $('#img').attr('src','');
    var formName = $(this).find('input[name="name"]').val();
    var formLastName = $(this).find('input[name="lastname"]').val();
    var formBday = $(this).find('input[name="bday"]').val();
    var formZodiac = $(this).find('select[name="zodiac"]').val();
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
    var formGroup = $(this).find('input[name="group"]').val();
    var formGraduate = $(this).find('input[name="graduate"]').val();
    var formBio = $(this).find('textarea[name="bio"]').val();
    var formUrl = $(this).find('input[name="url"]').val();
    var otterData = {

      name:formName,
      lastname:formLastName,
      bday:formBday,
      zodiac:formZodiac,
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
      group:formGroup,
      graduate:formGraduate,
      bio:formBio,
      img: formUrl

    };
    createProfile(otterData, function(img){
    })
  });
}

function createProject(projectData, callback){
  callback = callback || function(){};
  $.ajax({
    url: '/api/otters/projects',
    method: 'post',
    data: {projectData},
    success: function(data){
      var project = data.project;
      callback(project);
    }
  });
}

function setBlogFormHandler(){
  $('form#getBlogData').on('submit', function(e){
    e.preventDefault();
    var formBlogBody = $(this).find('textarea[name="blogBody"]').val();
    var blogData = {
      blogBody:formBlogBody,
    };
    createBlog(blogData, function(blog){
    })
  });
}

function setProjectFormHandler(){
  $('form#getProjectData').on('submit', function(e){
    e.preventDefault();
    var formProjectName = $(this).find('input[name="projectName"]').val();
    var formProjectLanguage = $(this).find('input[name="projectLanguage"]').val();
    var formProjectImg = $(this).find('input[name="projectImg"]').val();
    var formProjectDescription = $(this).find('input[name="projectDescription"]').val();
    var formProjectGitHubLink = $(this).find('input[name="projectGitHubLink"]').val();
    var formProjectPublicLink = $(this).find('input[name="projectPublicLink"]').val();
    var projectData = {
      projectName:formProjectName,
      projectLanguage:formProjectLanguage,
      projectImg:formProjectImg,
      projectDescription:formProjectDescription,
      projectGitHubLink:formProjectGitHubLink,
      projectPublicLink:formProjectPublicLink
    };
    $('.projectform').toggle();
    createProject(projectData, function(project){
    })
  });
}

function createProject(projectData, callback){
  callback = callback || function(){};
  $.ajax({
    url: '/api/otters/projects',
    method: 'post',
    data: {projectData},
    success: function(data){
      var project = data.project;
      callback(project);
    }
  });
}

function renderProject(project){
  var $el = $('<div>').addClass('projectSum');
  $el.append( $('<div>').addClass('projectName').text(project[k].projectName) );
  // $el.append( $('<div>').addClass('projectLanguage').text(project[k].projectLanguage) );
  $el.append( $('<img>').addClass('projectImg').attr('src' , project[k].projectImg) );
  // $el.append( $('<div>').addClass('projectDescription').text(project[k].projectDescription) );
  // $el.append( $('<div>').addClass('projectGitHubLink').text(project[k].projectGitHubLink) );
  // $el.append( $('<div>').addClass('projectPublicLink').text(project[k].projectPublicLink) );
  $('.projectlist').append($el);
}

function setBlogFormHandler(){
  $('form#getBlogData').on('submit', function(e){
    e.preventDefault();
    var formBlogBody = $(this).find('textarea[name="blogBody"]').val();
    var blogData = {
      blogBody:formBlogBody,
    };
    createBlog(blogData, function(blog){
    })
  });
}

function createBlog(blogData, callback){
  callback = callback || function(){};
  $.ajax({
    url: '/api/otters/blogs',
    method: 'post',
    data: {blogData},
    success: function(data){
       var blog = data.blog;
      callback(blog);
    }
  });
}

function renderBlog(blog){
  var $el = $('<div>').addClass('globalblogposts');
  $el.append( $('<div>').addClass('blogBody').html(blog[j].blogBody) );
  return $el;
}



$(function(){
  setLogInFormHandler();
  setProjectFormHandler();
  setBlogFormHandler();
  setLogOutHandler();
  makeProfile();
  updateViews();

  $(".openprojectform").on('click', function(){
    $('.projectform').toggle();
  })

  $(".closeprojectform").on('click', function(){
    $('.projectform').toggle();
  })

  $(".toggleprojectlist").on('click', function(){
    $('.projectlist').show();
    $('.profilelist').hide();
    $('.profile').hide();
    $('.project').hide();
  })

  $(".toggleprofilelist").on('click', function(){
    $('.profilelist').show();
    $('.profile').hide();
    $('.projectlist').hide();
    $('.project').hide();
  })

  function readImage() {
    var size = this.files[0].size;
      if ( this.files && this.files[0] ) {
        if(size > 156250){
          $('#url').val('');
          $('#img').attr( "src", '' );
          $("#asd").val('');
          alert("Could not upload more than 125Kb");
        } else {
          var FR = new FileReader();
          FR.onload = function(e) {
            $('#img').attr( "src", e.target.result );
            $('#url').val( e.target.result );
          };
          FR.readAsDataURL( this.files[0] );
        }
      }
    }
  $("#asd").change( readImage );
  setProfileFormHandler();
})
