import { useMemo } from "react";
import { isLoggedIn, userTypes } from "./userCheck";

export const useMemoizationUserCheck = () => {
    const memoizationIsLoggedIn = useMemo(() => isLoggedIn(), []);
    const memoizationUserType = useMemo(() => userTypes(), []);

    return{
        memoizationIsLoggedIn,
        memoizationUserType
    }
}