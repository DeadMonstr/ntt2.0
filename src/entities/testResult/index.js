export {TestResultList} from "./ui/testResultList/testResultList";

export {default as testResultSlice} from "./module/testResultSlice";

export {
    getTestResultData,
    getTestResultError,
    getTestResultLoading
} from "./module/testResultSelector";

export {fetchTestResults} from "./module/testResultThunk";

