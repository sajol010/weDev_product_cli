const nextFactory = function(context, middleware, index) {
    const subsequestMiddileware = middleware[index];
    if (!subsequestMiddileware) {
        return context.next;
    }
    return (...parameters) => {
        const nextMiddleware = nextFactory(context, middleware, index + 1);
        window[subsequestMiddileware]({ context, next: nextMiddleware });
    }
}

export default nextFactory;