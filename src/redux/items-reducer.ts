import { AnyAction } from "redux";
import { itemsAPI } from "../api/api";
import { AppDispatch } from "./store";

export type ItemType = {
  id: number;
  name: string;
  description: string;
  position: [{ sector: string; cell: number }];
};

export interface IItems extends Array<ItemType> {}

export interface IItemsReducer {
  allItems: IItems;
  pageSize: number;
  isFetching: boolean;
}

let initialState: IItemsReducer = {
  allItems: [],
  pageSize: 10,
  isFetching: false,
};

export enum ItemsActionTypes {
  FETCH_ITEMS = "FETCH_ITEMS",
  ADD_ITEM = "ADD_ITEM",
  DELETE_ITEM = "DELETE_ITEM",
  UPDATE_UTEM = "UPDATE_UTEM",
}

let itemsReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case ItemsActionTypes.FETCH_ITEMS:
      return {
        ...state,
        allItems: action.items,
      };

    case ItemsActionTypes.DELETE_ITEM:
      return {
        ...state,
        allItems: state.allItems.filter((item) => item.id !== action.id),
      };

    case ItemsActionTypes.ADD_ITEM:
      return {
        ...state,
        allItems: [...state.allItems, action.item],
      };

    case ItemsActionTypes.UPDATE_UTEM:
      return {
        ...state,
        allItems: state.allItems.filter((item) => {
          if (item.id === action.id) {
            item.name = action.name;
            item.description = action.description;
            item.position = action.position;
          }
          return item;
        }),
      };
    default:
      return state;
  }
};

export const getItemById = (val: number) => async (dispatch: AppDispatch) => {
  let response = await itemsAPI
    .getItem(val)
    .then((response: any) => response.data);
  dispatch({ type: ItemsActionTypes.FETCH_ITEMS, items: response });
};

export const getItems = () => async (dispatch: AppDispatch) => {
  let response = await itemsAPI
    .getItems()
    .then((response: any) => response.data);
  dispatch({ type: ItemsActionTypes.FETCH_ITEMS, items: response });
};

export default itemsReducer;
