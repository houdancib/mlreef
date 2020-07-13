import React from 'react';
import { mount, shallow } from 'enzyme';
import { dataPipeLines } from 'testData';
import ProcessorsList, { Processor } from 'components/views/PipelinesExecutionView/processorsList';

const setup = () => shallow(
  <ProcessorsList
    handleDragStart={() => { }}
    processors={dataPipeLines}
  />,
);

const mockedProcessor = dataPipeLines[0];

const setupProcessor = () => mount(
  <Processor
    handleDragStart={() => { }}
    processorData={mockedProcessor}
  />,
);

describe('check processors on the first render', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup();
  });

  test('assert that data pipeline cards are shown', () => {
    expect(wrapper.find('Processor').length).toBe(dataPipeLines.length);
  });
});

describe('test specific features in processor comp', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setupProcessor();
  });
  test('assert that title, description and data type are in the comp', () => {
    const titleContent = wrapper.find('.processor-title > p').at(0);
    wrapper.find('button').simulate('click', {});
    expect(titleContent.text()).toBe(mockedProcessor.name);
    expect(wrapper.find('.processor-content > p').text()).toBe(mockedProcessor.description);
    expect(wrapper.find('.processor-content > div > p').at(0).text().includes(mockedProcessor.inputDataType)).toBe(true);
  });
});