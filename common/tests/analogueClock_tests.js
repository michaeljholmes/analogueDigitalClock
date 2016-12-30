import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import AnalogueClock from '../components/AnalogueClock.js';

describe('<AnalogueClock/>', () => {
  describe('test that clock componenets are rendered correctly', () => {
    const wrapper = shallow(<AnalogueClock minutes={30} hours={4} clockSize={200}/>);
    const square = wrapper.find('Square');
    it('square componenet should exist', () => {
      expect(square).toExist();
    })
  })
})