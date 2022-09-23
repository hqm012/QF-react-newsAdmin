const initState = {
    loading: false
}
export const loadingReducer = (preState = initState, action) => {

    switch (action.type) {
        case 'changeLoading':
            let newState = { ...preState }
            newState.loading = action.payload
            return newState
    }

    return preState
}