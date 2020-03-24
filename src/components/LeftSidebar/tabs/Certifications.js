import React, { useState, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import set from 'lodash/set';

import TextField from '../../../shared/TextField';
import AppContext from '../../../context/AppContext';

const CertificationsTab = ({ data, onChange }) => {
  const context = useContext(AppContext);
  const { dispatch } = context;

  return (
    <>
      {data.certifications.items.map((x, index) => (
        <Item
          item={x}
          key={x.id}
          index={index}
          onChange={onChange}
          dispatch={dispatch}
          first={index === 0}
          last={index === data.certifications.items.length - 1}
        />
      ))}
      <AddItem dispatch={dispatch} />
    </>
  );
};

const AddItem = ({ dispatch }) => {
  const [isOpen, setOpen] = useState(false);
  const [item, setItem] = useState({
    id: uuidv4(),
    title: '',
    subtitle: '',
  });

  const onChange = (key, value) => setItem(set({ ...item }, key, value));

  const addItem = () => {
    dispatch({
      type: 'add_item',
      payload: {
        key: 'certifications',
        value: item,
      },
    });

    setItem({
      id: uuidv4(),
      title: '',
      subtitle: '',
    });

    setOpen(false);
  };

  return (
    <div className="border border-gray-200 rounded p-5">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setOpen(!isOpen)}
      >
        <h6 className="text-sm font-medium">Add Certification</h6>
        <i className="material-icons">{isOpen ? 'expand_less' : 'expand_more'}</i>
      </div>

      <div className={`mt-6 ${isOpen ? 'block' : 'hidden'}`}>
        <TextField
          label="Title"
          placeholder="Android Development Nanodegree"
          value={item.title}
          onChange={v => onChange('title', v)}
        />

        <TextField
          label="Subtitle"
          placeholder="Udacity"
          value={item.subtitle}
          onChange={v => onChange('subtitle', v)}
        />

        <button
          type="button"
          onClick={addItem}
          className="mt-4 bg-gray-600 hover:bg-gray-700 text-white text-sm font-medium py-2 px-5 rounded"
        >
          <div className="flex items-center">
            <i className="material-icons mr-2 font-bold text-base">add</i>
            <span className="text-sm">Add</span>
          </div>
        </button>
      </div>
    </div>
  );
};

const Item = ({ item, index, onChange, dispatch, first, last }) => {
  const [isOpen, setOpen] = useState(false);
  const identifier = `data.certifications.items[${index}]`;

  const deleteItem = () =>
    dispatch({
      type: 'delete_item',
      payload: {
        key: 'certifications',
        value: item,
      },
    });

  const moveItemUp = () =>
    dispatch({
      type: 'move_item_up',
      payload: {
        key: 'certifications',
        value: item,
      },
    });

  const moveItemDown = () =>
    dispatch({
      type: 'move_item_down',
      payload: {
        key: 'certifications',
        value: item,
      },
    });

  return (
    <div className="my-4 border border-gray-200 rounded p-5">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setOpen(!isOpen)}
      >
        <h6 className="text-sm font-medium">{item.title}</h6>
        <i className="material-icons">{isOpen ? 'expand_less' : 'expand_more'}</i>
      </div>

      <div className={`mt-6 ${isOpen ? 'block' : 'hidden'}`}>
        <TextField
          label="Title"
          placeholder="Android Development Nanodegree"
          value={item.title}
          onChange={v => onChange(`${identifier}.title`, v)}
        />

        <TextField
          label="Subtitle"
          placeholder="Udacity"
          value={item.subtitle}
          onChange={v => onChange(`${identifier}.subtitle`, v)}
        />

        <div className="mt-6 flex justify-between">
          <button
            type="button"
            onClick={deleteItem}
            className="bg-red-600 hover:bg-red-700 text-white text-sm font-medium py-2 px-5 rounded"
          >
            <div className="flex items-center">
              <i className="material-icons mr-2 font-bold text-base">delete</i>
              <span className="text-sm">Delete</span>
            </div>
          </button>

          <div className="flex">
            {!first && (
              <button
                type="button"
                onClick={moveItemUp}
                className="bg-gray-600 hover:bg-gray-700 text-white text-sm font-medium py-2 px-4 rounded mr-2"
              >
                <div className="flex items-center">
                  <i className="material-icons font-bold text-base">arrow_upward</i>
                </div>
              </button>
            )}

            {!last && (
              <button
                type="button"
                onClick={moveItemDown}
                className="bg-gray-600 hover:bg-gray-700 text-white text-sm font-medium py-2 px-4 rounded"
              >
                <div className="flex items-center">
                  <i className="material-icons font-bold text-base">arrow_downward</i>
                </div>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificationsTab;