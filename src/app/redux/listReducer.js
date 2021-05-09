import {uniqueId} from 'lodash';

const initialState = {
  lists: [
    {
      name: 'Teams',
      id: uniqueId('list'),
      children: [
        {title: 'product', desc: 'pending tasks', id: uniqueId('child')},
        {title: 'sales', desc: 'sales prices', id: uniqueId()},
      ],
    },
    {
      name: 'products',
      id: uniqueId('list'),
      children: [{title: 'testing', desc: 'test infra', id: uniqueId('child')}],
    },
  ],
};

export function listReducer(state = initialState, action) {
  const listCopy = [...state.lists];

  switch (action.type) {
    case 'ADD_LIST':
      return {
        lists: state.lists.concat({
          name: action.name,
          id: uniqueId('list'),
          children: [],
        }),
      };

    case 'REMOVE_LIST':
      listCopy.splice(action.listIndex, 1);
      return {...state, lists: listCopy};

    case 'ADD_CARD':
      const listchildrenCopy = [...listCopy[action.listIndex].children];
      listchildrenCopy.unshift({
        title: action.title,
        desc: action.desc,
        id: uniqueId('child'),
      });
      listCopy[action.listIndex] = {
        ...listCopy[action.listIndex],
        children: listchildrenCopy,
      };
      return {lists: listCopy};

    case 'REMOVE_CARD':
      const listchildrenCopy1 = [...listCopy[action.listIndex].children];
      listchildrenCopy1.splice(action.cardIndex, 1);
      listCopy[action.listIndex] = {
        ...listCopy[action.listIndex],
        children: listchildrenCopy1,
      };
      return {lists: listCopy};

    case 'DRAG_DROP':
      const sourceChildCopy = [...state.lists[action.sourceIndex].children];
      const childIndex = sourceChildCopy.findIndex(
        (child) => child.id == action.childId
      );
      const [childData] = sourceChildCopy.splice(childIndex, 1);
      listCopy[action.sourceIndex] = {
        ...listCopy[action.sourceIndex],
        children: sourceChildCopy,
      };
      const destchildrenCopy = [...listCopy[action.destinationIndex].children];
      destchildrenCopy.unshift({
        title: childData.title,
        desc: childData.desc,
        id: uniqueId('child'),
      });
      listCopy[action.destinationIndex] = {
        ...listCopy[action.destinationIndex],
        children: destchildrenCopy,
      };
      return {lists: listCopy};

    default:
      return state;
  }
}
