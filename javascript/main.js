$(document).ready(function(){
  $('#searchUser').on('keyup',function(e){
    console.log(e.target.value);
    let username=e.target.value;
    $.ajax({
      url:'https://api.github.com/users/'+username,
      data:{
        client_id:'Your Client Id',
        client_secret:'The Client Secret'
      }
    }).done(function(profileData){
      $.ajax({
         url:'https://api.github.com/users/'+username+'/repos',
         data:{
           client_id:'Your Client Id',
           client_secret:'The Client Secret'
         }
      }).done(function(repository){
        console.log(repository);
         $.each(repository,function(index,repository){
           $('#showRepos').append(`
             <div class="well">
                        <div class="card">
                          <div class="row">
                            <div class="col-md-7">
                              <strong>${repository.name}</strong>: ${repository.description}
                            </div>
                            <div class="col-md-3">
                              <span class="badge badge-dark"><strong>Forks</strong>: ${repository.forks_count}</span>
                              <span class="badge badge-primary"><strong>Watchers</strong>: ${repository.watchers_count}</span>
                              <span class="badge badge-success"><strong>Stars</strong>: ${repository.stargazers_count}</span>
                            </div>
                            <div class="col-md-2">
                              <a href="${repository.html_url}" target="_blank" class="btn btn-default">Repo Page</a>
                            </div>
                          </div>
                        </div>
             `);
         });
      });
      console.log(profileData);
      $('#showResults').html(`
        <div class="panel panel-default">
        <div class="panel-heading">
        <h3 class="panel-title">${profileData.name}</h3>
        </div>
        <div class="panel-body">
        <div class="row">
        <div class="col-md-3">
        <img class="img_size" src="${profileData.avatar_url}" class="tumbnails"/>
        <a href="${profileData.html_url}" target="_blank" class="btn btn-primary btn-block">View Profile</a>
        </div>
        <div class="col-md-9">
        <span class="badge badge-dark">Public Repos: ${profileData.public_repos}</span>
        <span class="badge badge-primary">Public Gists: ${profileData.public_gists}</span>
        <span class="badge badge-success">Followers: ${profileData.followers}</span>
        <span class="badge badge-info">Following: ${profileData.following}</span>
        <br><br>
        <ul class="list-group">
               <li class="list-group-item">Company: ${profileData.company}</li>
               <li>Location:${profileData.location}</li>
               <li>Blog:${profileData.blog}</li>
               <li>BIO: ${profileData.bio}</li>
        </div>

        </div>
        <h3 class="panel-title">Latest Repos</h3>
        <div id="showRepos"></div>
        </div>
        </div>
        `);
      });
    });
  });
