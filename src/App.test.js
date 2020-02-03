import React from 'react';
import { render } from '@testing-library/react';
import { BillieText } from './App';
import renderer from 'react-test-renderer';

test('BillieText colors each letter with a Billie color', () => {
  const text = 'Hey we got your 🐕 here!'
  const component = renderer.create(
    <BillieText text={text} />
  );

  let tree = component.toJSON();

  expect(tree.children[0].props.style.color).toBe('#8093FF');
  expect(tree.children[2].props.style.color).toBe('#FF9472');

  // It loops to beginning of colors
  expect(tree.children[5].props.style.color).toBe('#8093FF');
});
