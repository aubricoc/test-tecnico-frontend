import Discover from '../Discover';
import renderer from 'react-test-renderer';
import jest from "jest-mock";
import expect from "expect";
import SpotifyService from "../../../../common/services/SpotifyService";
import DiscoverBlock from "../DiscoverBlock";
import DiscoverItem from "../DiscoverBlock/components/DiscoverItem";

SpotifyService.getToken = jest.fn().mockResolvedValue('test-token');

it('should no print items when render Discover with empty data from api', done => {
  SpotifyService.fetchNewReleases = jest.fn().mockResolvedValueOnce([]);
  SpotifyService.fetchFeaturedPlaylists = jest.fn().mockResolvedValueOnce([]);
  SpotifyService.fetchCategories = jest.fn().mockResolvedValueOnce([]);

  const render = renderer.create(<Discover/>);
  setImmediate(() => {
    const root = render.root;
    expect(root.findAllByType(DiscoverBlock)).toHaveLength(3);
    expect(root.findByProps({id: 'released'}).findAllByType(DiscoverItem)).toHaveLength(0);
    expect(root.findByProps({id: 'featured'}).findAllByType(DiscoverItem)).toHaveLength(0);
    expect(root.findByProps({id: 'browse'}).findAllByType(DiscoverItem)).toHaveLength(0);
    done();
  });
});

it('should print items when render Discover with data from api', done => {
  SpotifyService.fetchNewReleases = jest.fn().mockResolvedValueOnce([
    {name: '1', images:[{url:'/1'}]}
  ]);
  SpotifyService.fetchFeaturedPlaylists = jest.fn().mockResolvedValueOnce([
    {name: '2', images:[{url:'/2'}]},
    {name: '3', images:[{url:'/3'}]}
  ]);
  SpotifyService.fetchCategories = jest.fn().mockResolvedValueOnce([
    {name: '4', icons:[{url:'/4'}]},
    {name: '5', icons:[{url:'/5'}]},
    {name: '6', icons:[{url:'/6'}]}
  ]);

  const render = renderer.create(<Discover/>);
  setImmediate(() => {
    const root = render.root;
    expect(root.findAllByType(DiscoverBlock)).toHaveLength(3);
    expect(root.findAllByType(DiscoverItem)).toHaveLength(6);
    expect(root.findByProps({id: 'released'}).findAllByType(DiscoverItem)).toHaveLength(1);
    expect(root.findByProps({id: 'featured'}).findAllByType(DiscoverItem)).toHaveLength(2);
    expect(root.findByProps({id: 'browse'}).findAllByType(DiscoverItem)).toHaveLength(3);
    done();
  });
});
