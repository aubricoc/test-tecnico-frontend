import renderer from 'react-test-renderer';
import expect from "expect";
import DiscoverItem from "../DiscoverItem";

it('should print name when render DiscoverItem', done => {
	const name = 'MyAlbum';
	const images = [{url: '/'}];
	const render = renderer.create(<DiscoverItem images={images} name={name}/>);
	setImmediate(() => {
		const root = render.root;
		expect(root.findByProps({className: 'discover-item__title'}).props.children).toEqual(name);
		done();
	});
});
