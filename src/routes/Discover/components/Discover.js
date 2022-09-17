import React, {Component} from 'react';
import DiscoverBlock from './DiscoverBlock/components/DiscoverBlock';
import '../styles/_discover.scss';
import SpotifyService from "../../../common/services/SpotifyService";

export default class Discover extends Component {
  constructor() {
    super();

    this.state = {
      newReleases: [],
      playlists: [],
      categories: []
    };
  }

  componentDidMount() {
    SpotifyService.getToken().then(token => {
      SpotifyService.fetchNewReleases(token).then(newReleases => {
        this.setState({
          newReleases: newReleases
        });
      }).catch(err => console.error(err));
      SpotifyService.fetchFeaturedPlaylists(token).then(playlists => {
        this.setState({
          playlists: playlists
        });
      });
      SpotifyService.fetchCategories(token).then(categories => {
        this.setState({
          categories: categories
        });
      });
    });
  }

  render() {
    const {newReleases, playlists, categories} = this.state;

    return (
      <div className="discover">
        <DiscoverBlock text="RELEASED THIS WEEK" id="released" data={newReleases}/>
        <DiscoverBlock text="FEATURED PLAYLISTS" id="featured" data={playlists}/>
        <DiscoverBlock text="BROWSE" id="browse" data={categories} imagesKey="icons"/>
      </div>
    );
  }
}
