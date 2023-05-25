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
    <div class="_2kGtEHAlQ5t5sY3jvz-wwl" role="dialog" aria-modal="true" aria-labelledby="dialogHeader" aria-describedby="dialogBodyText" id="dialog" style="background-color:rgba(0,0,0,.85)">
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
    
    function renderTracks(tracks) {
      $("#popup").append(mockedHtmlForTracks);
      
    }
    
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


  
  var mockedHtmlForTracks = `
            <music-shoveler primary-text="Spotify Playlists" class="hydrated" id="list-playlist">
                </music-shoveler>


  <music-container class="hydrated">
  <!---->
  <div>
    <div class="_3yhmPlrZ9kJ1NcTx4yoBLu   ">
      <div></div>
      <div class="_1xpp05rcYIwWA_tv8t2Aac">
        <div class="_3bX1IY2t1o6SakF2rd-yk_" style="position: relative; will-change: transform; direction: ltr;">
          <div style="height: 320px; width: 100%;">
            <music-image-row data-key="HavanaCamila CabelloCamila0" icon-name="play" show-action-button="" primary-text="Havana" primary-href="/albums/B077XTDTRY?trackAsin=B077XPVT72" secondary-text-1="Camila Cabello"  secondary-href-2="/albums/B077XTDTRY" image-src="https://m.media-amazon.com/images/I/81Zt68aBVIL._SX472_SY472_BL0_QL100_.jpg" show-border="" secondary-tags="" role="row" tabindex="0" aria-disabled="false" aria-roledescription="sortable" aria-describedby="DndDescribedBy-2" style="position: absolute; left: 0px; top: 0px; height: 80px; width: 100%;" class="hydrated" render-secondary-text-inline="">
              <!---->
              <span class="index">1</span>
              <span class="image">
                <music-image place-holder-src="" src="https://m.media-amazon.com/images/I/81Zt68aBVIL._SX472_SY472_BL0_QL100_.jpg" alt="Havana" size="56" class="hydrated"></music-image>
                <music-playback-button tabindex="-1" class="playback-button hydrated" role="button" icon-name="play" show-action-button="" size="small" variant="primary">
                  <music-icon class="equalizer-icon hydrated" name="equalizeron" size="small" variant="solid">
                    <span>
                      <picture>
                        <source srcset="https://m.media-amazon.com/images/G/01/digital/music/player/web/EQ_accent.webp" type="image/webp">
                        <img src="https://m.media-amazon.com/images/G/01/digital/music/player/web/EQ_accent.gif">
                      </picture>
                    </span>
                  </music-icon>
                  <music-button class="action-icon-button hydrated" icon-only="" icon-name="play" tabindex="0" role="button" aria-disabled="false" aria-label="play" variant="primary" refinement="none" size="small"></music-button>
                </music-playback-button>
              </span>
              <div class="content">
                <div class="col1">
                  <music-link title="Havana" role="link" class="hydrated">
                    <!---->
                    <a href="/albums/B077XTDTRY?trackAsin=B077XPVT72" rel="false">Havana</a>
                    <div class="tags">
                      <music-tag-group slot="tags" role="contentinfo" class="hydrated"></music-tag-group>
                    </div>
                  </music-link>
                </div>
                <div class="col2">
                  <div class="inline">
                    <music-link title="Camila Cabello" role="link" kind="secondary" class="hydrated">
                      <!---->
                      <span>Camila Cabello</span>
                      <div class="tags"></div>
                    </music-link>
                    <span class="detail-dot">•</span>
                    <music-link title="Camila" role="link" kind="secondary" class="hydrated">
                      <!---->
                      <a href="/albums/B077XTDTRY" rel="false">Camila</a>
                      <div class="tags"></div>
                    </music-link>
                  </div>
                </div>
                <div class="col4">
                  <music-link title="03:37" role="link" kind="secondary" class="hydrated">
                    <!---->
                    <span>03:37</span>
                    <div class="tags"></div>
                  </music-link>
                </div>
              </div>
              <music-button slot="buttons" size="small" icon-only="" icon-name="add" title="Add to My Music" aria-label="Add to My Music" role="button" aria-disabled="false" tabindex="0" variant="primary" refinement="none" class="hydrated"></music-button>
              <music-button slot="contextMenu" icon-name="more" icon-only="" size="small" role="button" aria-disabled="false" tabindex="0" variant="primary" refinement="none" class="hydrated"></music-button>
            </music-image-row>
            <music-image-row data-key="SeñoritaShawn MendesSeñorita1" icon-name="play" show-action-button="" primary-text="Señorita" primary-href="/albums/B07TBBD7Y8?trackAsin=B07T99CY9L" secondary-text-1="Shawn Mendes"  secondary-href-2="/albums/B07TBBD7Y8" image-src="https://m.media-amazon.com/images/I/81DXI2TsT9L._SX472_SY472_BL0_QL100_.jpg" show-border="" secondary-tags="" role="row" tabindex="0" aria-disabled="false" aria-roledescription="sortable" aria-describedby="DndDescribedBy-2" style="position: absolute; left: 0px; top: 80px; height: 80px; width: 100%;" class="hydrated" render-secondary-text-inline="">
              <!---->
              <span class="index">2</span>
              <span class="image">
                <music-image place-holder-src="" src="https://m.media-amazon.com/images/I/81DXI2TsT9L._SX472_SY472_BL0_QL100_.jpg" alt="Señorita" size="56" class="hydrated"></music-image>
                <music-playback-button tabindex="-1" class="playback-button hydrated" role="button" icon-name="play" show-action-button="" size="small" variant="primary">
                  <music-icon class="equalizer-icon hydrated" name="equalizeron" size="small" variant="solid">
                    <span>
                      <picture>
                        <source srcset="https://m.media-amazon.com/images/G/01/digital/music/player/web/EQ_accent.webp" type="image/webp">
                        <img src="https://m.media-amazon.com/images/G/01/digital/music/player/web/EQ_accent.gif">
                      </picture>
                    </span>
                  </music-icon>
                  <music-button class="action-icon-button hydrated" icon-only="" icon-name="play" tabindex="0" role="button" aria-disabled="false" aria-label="play" variant="primary" refinement="none" size="small"></music-button>
                </music-playback-button>
              </span>
              <div class="content">
                <div class="col1">
                  <music-link title="Señorita" role="link" class="hydrated">
                    <!---->
                    <a href="/albums/B07TBBD7Y8?trackAsin=B07T99CY9L" rel="false">Señorita</a>
                    <div class="tags">
                      <music-tag-group slot="tags" role="contentinfo" class="hydrated"></music-tag-group>
                    </div>
                  </music-link>
                </div>
                <div class="col2">
                  <div class="inline">
                    <music-link title="Shawn Mendes" role="link" kind="secondary" class="hydrated">
                      <!---->
                      <span>Shawn Mendes</span>
                      <div class="tags"></div>
                    </music-link>
                    <span class="detail-dot">•</span>
                    <music-link title="Señorita" role="link" kind="secondary" class="hydrated">
                      <!---->
                      <a href="/albums/B07TBBD7Y8" rel="false">Señorita</a>
                      <div class="tags"></div>
                    </music-link>
                  </div>
                </div>
                <div class="col4">
                  <music-link title="03:11" role="link" kind="secondary" class="hydrated">
                    <!---->
                    <span>03:11</span>
                    <div class="tags"></div>
                  </music-link>
                </div>
              </div>
              <music-button slot="buttons" size="small" icon-only="" icon-name="add" title="Add to My Music" aria-label="Add to My Music" role="button" aria-disabled="false" tabindex="0" variant="primary" refinement="none" class="hydrated"></music-button>
              <music-button slot="contextMenu" icon-name="more" icon-only="" size="small" role="button" aria-disabled="false" tabindex="0" variant="primary" refinement="none" class="hydrated"></music-button>
            </music-image-row>
            <music-image-row data-key="BelieverImagine DragonsEvolve2" icon-name="play" show-action-button="" primary-text="Believer" primary-href="/albums/B079VSDTZP?trackAsin=B079VDQRPX" secondary-text-1="Imagine Dragons" secondary-href-2="/albums/B079VSDTZP" image-src="https://m.media-amazon.com/images/I/71U0Sn3O+qL._SX472_SY472_BL0_QL100_.jpg" show-border="" secondary-tags="" role="row" tabindex="0" aria-disabled="false" aria-roledescription="sortable" aria-describedby="DndDescribedBy-2" style="position: absolute; left: 0px; top: 160px; height: 80px; width: 100%;" class="hydrated" render-secondary-text-inline="">
              <!---->
              <span class="index">3</span>
              <span class="image">
                <music-image place-holder-src="" src="https://m.media-amazon.com/images/I/71U0Sn3O+qL._SX472_SY472_BL0_QL100_.jpg" alt="Believer" size="56" class="hydrated"></music-image>
                <music-playback-button tabindex="-1" class="playback-button hydrated" role="button" icon-name="play" show-action-button="" size="small" variant="primary">
                  <music-icon class="equalizer-icon hydrated" name="equalizeron" size="small" variant="solid">
                    <span>
                      <picture>
                        <source srcset="https://m.media-amazon.com/images/G/01/digital/music/player/web/EQ_accent.webp" type="image/webp">
                        <img src="https://m.media-amazon.com/images/G/01/digital/music/player/web/EQ_accent.gif">
                      </picture>
                    </span>
                  </music-icon>
                  <music-button class="action-icon-button hydrated" icon-only="" icon-name="play" tabindex="0" role="button" aria-disabled="false" aria-label="play" variant="primary" refinement="none" size="small"></music-button>
                </music-playback-button>
              </span>
              <div class="content">
                <div class="col1">
                  <music-link title="Believer" role="link" class="hydrated">
                    <!---->
                    <a href="/albums/B079VSDTZP?trackAsin=B079VDQRPX" rel="false">Believer</a>
                    <div class="tags">
                      <music-tag-group slot="tags" role="contentinfo" class="hydrated"></music-tag-group>
                    </div>
                  </music-link>
                </div>
                <div class="col2">
                  <div class="inline">
                    <music-link title="Imagine Dragons" role="link" kind="secondary" class="hydrated">
                      <!---->
                      <span>Imagine Dragons</span>
                      <div class="tags"></div>
                    </music-link>
                    <span class="detail-dot">•</span>
                    <music-link title="Evolve" role="link" kind="secondary" class="hydrated">
                      <!---->
                      <a href="/albums/B079VSDTZP" rel="false">Evolve</a>
                      <div class="tags"></div>
                    </music-link>
                  </div>
                </div>
                <div class="col4">
                  <music-link title="03:24" role="link" kind="secondary" class="hydrated">
                    <!---->
                    <span>03:24</span>
                    <div class="tags"></div>
                  </music-link>
                </div>
              </div>
              <music-button slot="buttons" size="small" icon-only="" icon-name="add" title="Add to My Music" aria-label="Add to My Music" role="button" aria-disabled="false" tabindex="0" variant="primary" refinement="none" class="hydrated"></music-button>
              <music-button slot="contextMenu" icon-name="more" icon-only="" size="small" role="button" aria-disabled="false" tabindex="0" variant="primary" refinement="none" class="hydrated"></music-button>
            </music-image-row>
            <music-image-row data-key="ThunderImagine DragonsEvolve3" icon-name="play" show-action-button="" primary-text="Thunder" primary-href="/albums/B079VSDTZP?trackAsin=B079VHLP5S" secondary-text-1="Imagine Dragons"  secondary-href-2="/albums/B079VSDTZP" image-src="https://m.media-amazon.com/images/I/71U0Sn3O+qL._SX472_SY472_BL0_QL100_.jpg" show-border="" secondary-tags="" role="row" tabindex="0" aria-disabled="false" aria-roledescription="sortable" aria-describedby="DndDescribedBy-2" style="position: absolute; left: 0px; top: 240px; height: 80px; width: 100%;" class="hydrated" render-secondary-text-inline="">
              <!---->
              <span class="index">4</span>
              <span class="image">
                <music-image place-holder-src="" src="https://m.media-amazon.com/images/I/71U0Sn3O+qL._SX472_SY472_BL0_QL100_.jpg" alt="Thunder" size="56" class="hydrated"></music-image>
                <music-playback-button tabindex="-1" class="playback-button hydrated" role="button" icon-name="play" show-action-button="" size="small" variant="primary">
                  <music-icon class="equalizer-icon hydrated" name="equalizeron" size="small" variant="solid">
                    <span>
                      <picture>
                        <source srcset="https://m.media-amazon.com/images/G/01/digital/music/player/web/EQ_accent.webp" type="image/webp">
                        <img src="https://m.media-amazon.com/images/G/01/digital/music/player/web/EQ_accent.gif">
                      </picture>
                    </span>
                  </music-icon>
                  <music-button class="action-icon-button hydrated" icon-only="" icon-name="play" tabindex="0" role="button" aria-disabled="false" aria-label="play" variant="primary" refinement="none" size="small"></music-button>
                </music-playback-button>
              </span>
              <div class="content">
                <div class="col1">
                  <music-link title="Thunder" role="link" class="hydrated">
                    <!---->
                    <a href="/albums/B079VSDTZP?trackAsin=B079VHLP5S" rel="false">Thunder</a>
                    <div class="tags">
                      <music-tag-group slot="tags" role="contentinfo" class="hydrated"></music-tag-group>
                    </div>
                  </music-link>
                </div>
                <div class="col2">
                  <div class="inline">
                    <music-link title="Imagine Dragons" role="link" kind="secondary" class="hydrated">
                      <!---->
                      <span>Imagine Dragons</span>
                      <div class="tags"></div>
                    </music-link>
                    <span class="detail-dot">•</span>
                    <music-link title="Evolve" role="link" kind="secondary" class="hydrated">
                      <!---->
                      <a href="/albums/B079VSDTZP" rel="false">Evolve</a>
                      <div class="tags"></div>
                    </music-link>
                  </div>
                </div>
                <div class="col4">
                  <music-link title="03:07" role="link" kind="secondary" class="hydrated">
                    <!---->
                    <span>03:07</span>
                    <div class="tags"></div>
                  </music-link>
                </div>
              </div>
              <music-button slot="buttons" size="small" icon-only="" icon-name="add" title="Add to My Music" aria-label="Add to My Music" role="button" aria-disabled="false" tabindex="0" variant="primary" refinement="none" class="hydrated"></music-button>
              <music-button slot="contextMenu" icon-name="more" icon-only="" size="small" role="button" aria-disabled="false" tabindex="0" variant="primary" refinement="none" class="hydrated"></music-button>
            </music-image-row>
          </div>
        </div>
      </div>
    </div>
    <div id="DndDescribedBy-2" style="display: none;"> To pick up a draggable item, press the space bar. While dragging, use the arrow keys to move the item. Press space again to drop the item in its new position, or press escape to cancel. </div>
    <div id="DndLiveRegion-2" role="status" aria-live="assertive" aria-atomic="true" style="position: fixed; width: 1px; height: 1px; margin: -1px; border: 0px; padding: 0px; overflow: hidden; clip: rect(0px, 0px, 0px, 0px); clip-path: inset(100%); white-space: nowrap;"></div>
  </div>
</music-container>
  
`
}, 2000)

