export {default as oftenUsedSlice} from "./model/slice/oftenUsedSlice";

export {
    fetchRegionsData,
    fetchEducationLanguage
} from "./model/thunk/oftenUsedThunk";

export {
    getRegions,
    getEducationLanguages,
    getOftenUsedLoading,
    getOftenUsedError
} from "./model/selector/oftenUsedSelector";

