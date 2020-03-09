import React, { Component } from "react";
import { Mutation, Query, ApolloConsumer } from "react-apollo";
import Queries from "../../graphql/queries";
import Player from "../Player";
import Default from "../../assets/images/default.png";

const { FETCH_PLAYLIST } = Queries;

class AlbumShow extends Component {
  constructor(props) {
    super(props)
  }

  handlePlay(client, data, song) {
    console.log(song);
    client.writeData({
      data: {
        currentAlbum: data.album,
        currentSong: song
      }
    })
  }

  render() {
    return (
      <ApolloConsumer>
        {(client) => {
          return (
            <Query query={FETCH_PLAYLIST}
              variables={{ id: this.props.match.params.id }}
            >
              {({ loading, error, data }) => {
                if (loading) return <p>Loading...</p>;
                if (error) return <p>Error</p>;
                console.log(data)
                return (
                  <div className="playlist-show"
                    style={{
                      top: "100px",
                      position: "absolute",
                      left: "300px",
                      color: "white",
                      display: "flex",
                      flexDirection: "row",
                      fontFamily: 'Noto Sans'
                    }}
                  >
                    <div className="left-side">
                      <img className="left-album-cover" src={Default}/>
                      <p className="album-name">{data.playlist.name}</p>
                      <p className="left-artist-name">{data.playlist.creator.username}</p>
                      <p className="album-show-play-button" onClick={e => this.handlePlay(client, data)}>PLAY</p>
                      <p className="song-count">{data.playlist.songs.length}</p>
                    </div>
                    <div className="right-side">
                      <ul>
                        {data.playlist.songs.map((song) => (
                          <li key={song._id}>
                            <div className="songInfo">
                              <p onClick={e => this.handlePlay(client, data, song)}><i className="fab fa-itunes-note"></i></p>
                              <div className="songTitle-artist-name">
                                <p className="albumshow-song-title" onClick={e => this.handlePlay(client, data, song)}>{song.title}</p>
                                <p className="right-artist-name">{song.artist.name}</p>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* <Player currentSong={this.state.currentSong} albumTitle={data.playlist} artistName={data.playlist.creator.username} /> */}
                  </div>
                )
              }}
            </Query>
          )
        }}
      </ApolloConsumer>
    )
  }
};

export default AlbumShow;

//data.album.songs.url