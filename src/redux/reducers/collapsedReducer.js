let initState = {
    collapsed: false
}

const collapsedReducer = (preState = initState, action) => {
    switch (action.type) {
        case 'changeCollapsed':
            let newState = { ...preState }
            newState.collapsed = !newState.collapsed
            return newState
    }
    return preState
}

export { collapsedReducer }