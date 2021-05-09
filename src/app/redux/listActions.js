export const addList = (name) => {
  return {type: 'ADD_LIST', name};
};

export const removeList = (listIndex) => {
  return {type: 'REMOVE_LIST', listIndex};
};

export const addCard = (listIndex, title, desc) => {
  return {type: 'ADD_CARD', listIndex, title, desc};
};

export const removeCard = (listIndex, cardIndex) => {
  return {type: 'REMOVE_CARD', listIndex, cardIndex};
};

export const dragDropCard = (childId, sourceIndex, destinationIndex) => {
  return {type: 'DRAG_DROP', childId, sourceIndex, destinationIndex};
};
