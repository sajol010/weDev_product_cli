
const auth = function ({context, next}){
    if (!context.store.state.isAuthenticated) {
        return next({
            name: 'Login'
        });
    }

    return next();
}

export default auth;