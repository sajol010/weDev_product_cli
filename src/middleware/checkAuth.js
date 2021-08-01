
const checkAuth = function ({context, next}){
    console.log(context.store.getters.isAutenticated)
    if (context.store.getters.isAutenticated) {
        return next({
            name: 'ListProduct'
        });
    }

    return next();
}

export default checkAuth;