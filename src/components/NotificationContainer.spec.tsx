import * as React from 'react';
import { mount, CommonWrapper, shallow } from 'enzyme';
import { Provider } from 'react-redux';

import { NotificationContainerProps } from '../types';
import { ExpectedNotificationContainer } from '../helpers/expectedComponents'
import NotificationContainer from './NotificationContainer';
import { genNotifications, mockStore } from '../helpers/configureTests';

type NoteType = CommonWrapper<NotificationContainerProps,{}>;

describe('testing <NotificationContainer />',() => {
  let notifications: any = null;
  let store: any = null;
  let otherProps = {
    position: 'tr',
    transition: {
      classNames: 'foo'
    }
  };

  beforeEach(() => {
    notifications = genNotifications(3);
    store = mockStore({ notifictions: [] });
  });

  it('should mount with default props',() => {
    let wrapper: NoteType = mount(
      <NotificationContainer notifications={[]} position="tr" />
    );

    expect(wrapper.props().notifications).toEqual([]);
  });

  it('should render no notifications',() => {
    let wrapper: NoteType = shallow(
      <NotificationContainer notifications={[]} position="tr" />
    );

    let expected: NoteType = shallow(
      <ExpectedNotificationContainer notifications={[]} position="tr" />
    );

    expect(wrapper.html()).toEqual(expected.html());
  });

 it('should render notifications',() => {
    let wrapper: NoteType = mount(
      <Provider store={store}>
        <NotificationContainer notifications={notifications} {...otherProps} />
      </Provider>
    );

    let expected: NoteType = mount(
      <Provider store={store}>
        <ExpectedNotificationContainer notifications={notifications} {...otherProps} />
      </Provider>
    );

    expect(wrapper.html()).toEqual(expected.html());
  });

})
