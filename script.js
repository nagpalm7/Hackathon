// Here You can type your custom JavaScript...

setTimeout( function() {
  var GET_ACCESS_TOKEN_ENDPOINT = `http://127.0.0.1:5000/get_access_token`;
  var GET_PLAYLISTS_ENDPOINT = `http://127.0.0.1:5000/get_playlists/`
  var GET_TRACKS_ENDPOINT = "http://127.0.0.1:5000/get_list_of_tracks_in_playlist/"
  var ACCESS_TOKEN = null;
  var PLAYLISTS = [];

  
  function import_playlist_onclick_handler() {
    $.ajax({url: GET_ACCESS_TOKEN_ENDPOINT, success: function(response){
        ACCESS_TOKEN = response.token;
        console.log(ACCESS_TOKEN);
        
        get_playlists();
        
      }});
  }
  
  function get_playlists() {
    $.ajax({url: GET_PLAYLISTS_ENDPOINT + ACCESS_TOKEN, success: function(response){
      PLAYLISTS = response;
      console.log(PLAYLISTS);
      showSelectPlaylistDialog();
    }});
  }
  
  function renderImportButton() {
    // import button to switch with ease
    var importButton = `<music-button id="import-spotify" size="medium" role="button" aria-disabled="false" tabindex="0" variant="solid" refinement="none" class="hydrated">Import Playlist</music-button>`;
    $(importButton).insertAfter($( "._8Lmlu_O0b8c_hn2EmsVOP" ))
  }
  
  function showSelectPlaylistDialog() {
    var htmlDialog = `
    <!-- Main wrapper -->
    <div class="_2kGtEHAlQ5t5sY3jvz-wwl" role="dialog" aria-modal="true" aria-labelledby="dialogHeader" aria-describedby="dialogBodyText" id="dialog">
      <!-- Container -->
      <div class="L52PZ2FT6jOLZWHbmxu77 ">
        <!-- close button -->
        <div class="_36F8cqHWW8NQ-u_s9-NURc" id="dialogCloseButton">
          <music-button role="button" size="small" icon-only="" icon-name="cancel" aria-disabled="false" tabindex="0" aria-label="Dismiss" variant="glass" refinement="none" class="hydrated"></music-button>
        </div>
    
        <!-- Playlists -->
        <div id = "popup">
          <music-shoveler primary-text="Spotify Playlists" class="hydrated" id="list-playlist">
            
          </music-shoveler>
        </div>
        
    
        <p class="music-tertiary-text"></p>
      </div>
    </div>
    `;
    
    
    $(htmlDialog).insertAfter($( "#vnpv" ));
    PLAYLISTS.forEach( playlist => {
      var title = `${playlist.playlist_name}${playlist.number_of_tracks}`;
      var playlistObject = `
      <music-vertical-item 
        id=${playlist.playlist_uri} 
        style="min-width: 200px" 
        data-key=${title} 
        image-src=${playlist.image} 
        primary-text=${title} 
        parent-size="small" 
        kind="square" 
        label="" 
        role="gridcell"
        icon-name="caretright"
        class="hydrated playlist-item-very-unique">
        <music-tag-group slot="tags" role="contentinfo" class="hydrated">
        </music-tag-group>
      </music-vertical-item>
    `;
      $( "#list-playlist" ).append(playlistObject);
    })
   
    
    $(".playlist-item-very-unique").click(function(event){
      $.ajax({url: GET_TRACKS_ENDPOINT + event.target.id + "/" +ACCESS_TOKEN, success: function(response){
        console.log(response);
      $("#list-playlist").hide();
      renderTracks(response);
    }});
      
    })
  }

  renderImportButton();

  // Onclick action for import button
  $("#import-spotify").click(function(){
      import_playlist_onclick_handler();
  });
 
}, 2000)

