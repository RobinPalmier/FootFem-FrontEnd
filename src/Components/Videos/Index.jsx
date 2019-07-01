import React, { Component } from 'react';

class Videos extends Component {

  state = {
    youtubePlaylistDatas: null,
  }

  componentDidMount() {
    this.getYoutubeDatas();
  }

  getYoutubeDatas() {
    fetch("https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=15&playlistId=PLCGIzmTE4d0ic-x5M9c0C1MvQla301_zo&key=AIzaSyBcpblMXYwaU0gCg7QoPMZmONE-Sj8_jNs",  {method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      }
    })
    .then((res)=>{
        if (res.status !== 200) {
           return;
        }
        return res.json()
    })
    .then((data) => {
        const youtubeDatas = data.items;
        this.setState({youtubePlaylistDatas: youtubeDatas});
        // this.setState({ match : match[0], matchId : match[0].fifa_id});
        // this.setState({commentsData: {...this.state.commentsData, matchId: this.state.fifaId}});
        // this.getMatchComments(this.state.fifaId);
    });
  }





  render() {
    return (
          <div className='content-video'>
            <div className='video-content-fetch'>
              {this.state.youtubePlaylistDatas &&
                this.state.youtubePlaylistDatas.map((video, index) => {
                  return(
                    <div className='video-box' key={index}>
                      <iframe src={"https://www.youtube.com/embed/"+ video.snippet.resourceId.videoId} frameBorder={"0"} allow={"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"} allowFullScreen></iframe>
                      <h3>{video.snippet.title}</h3>
                    </div>
                  )
                })
              }
              </div>
          </div>
    )
  }
}

export default Videos;
