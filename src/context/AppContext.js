/* eslint-disable no-case-declarations */
import React, { createContext, useReducer } from 'react';
import get from 'lodash/get';
import set from 'lodash/set';
import remove from 'lodash/remove';

import initialData from '../assets/starter/data.json';
import initialTheme from '../assets/starter/theme.json';
import { move } from '../utils';

const initialState = {
  data: {
    profile: {
      heading: 'Profile',
      photo: '',
      firstName: '',
      lastName: '',
      subtitle: '',
      address: {
        line1: '',
        line2: '',
        line3: '',
      },
      phone: '',
      website: '',
      email: '',
    },
    objective: {
      heading: 'Objective',
      body: '',
    },
    work: {
      heading: 'Work Experience',
      items: [],
    },
    education: {
      heading: 'Education',
      items: [],
    },
    awards: {
      heading: 'Honors & Awards',
      items: [],
    },
    certifications: {
      heading: 'Certifications',
      items: [],
    },
    skills: {
      heading: 'Skills & Hobbies',
      items: [],
    },
    extras: {
      heading: 'Personal Information',
      items: [],
    },
  },
  theme: {
    font: {
      family: '',
    },
    colors: {
      background: '',
      accent: '',
      body: '',
    },
  },
};

const reducer = (state, { type, payload }) => {
  let items;

  switch (type) {
    case 'add_item':
      items = get({ ...state }, `data.${payload.key}.items`, []);
      items.push(payload.value);
      return set({ ...state }, `data.${payload.key}.items`, items);
    case 'delete_item':
      items = get({ ...state }, `data.${payload.key}.items`, []);
      remove(items, x => x === payload.value);
      return set({ ...state }, `data.${payload.key}.items`, items);
    case 'move_item_up':
      items = get({ ...state }, `data.${payload.key}.items`, []);
      move(items, payload.value, -1);
      return set({ ...state }, `data.${payload.key}.items`, items);
    case 'move_item_down':
      items = get({ ...state }, `data.${payload.key}.items`, []);
      move(items, payload.value, 1);
      return set({ ...state }, `data.${payload.key}.items`, items);
    case 'on_input':
      return set({ ...state }, payload.key, payload.value);
    case 'populate_starter':
      return {
        ...state,
        data: initialData,
        theme: initialTheme,
      };
    case 'reset':
      return initialState;
    default:
      throw state;
  }
};

const AppContext = createContext(initialState);
const { Provider } = AppContext;

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export const AppProvider = StateProvider;
export const AppConsumer = AppContext.Consumer;

export default AppContext;