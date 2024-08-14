import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
  value: instagramDataReducer;
};

type instagramDataReducer = {
  creatorId: string;
  pageId: string;
  businessId: string;
  longLivedAccessToken: string;
  username: string;
  profilePictureURL: string;
  followersCount: number;
  followersTopCities: { [city: string]: number };
  followersAge: { [age: string]: number };
  followersGender: { [gender: string]: number };
  monthlyImpressions: number;
  monthlyReach: number;
};

const initialState = {
  value: {
    creatorId: "",
  } as instagramDataReducer,
} as InitialState;

export const instagramData = createSlice({
  name: "instagramData",
  initialState,
  reducers: {
    instagramDataInfo: (
      state,
      action: PayloadAction<Partial<instagramDataReducer>>
    ) => {
      state.value = {
        ...state.value,
        ...action.payload,
      };
    },
    resetInstagramData: () => {
      initialState;
    },
  },
});

export const { instagramDataInfo, resetInstagramData } = instagramData.actions;
export default instagramData.reducer;
