TODO Class

# Handling Express Errors
My journey of studying error handling in express.js.

## Overview
Crucial:
- Custom error handlers
- Async Errors
- Defining Custom Error Class

Important:
- Express "Built-in" Error Handler
- Mongoose Errors

## 446. Express "Built in" Error Handlers
- Error
  - Programmer syntax error
  - Connection error
  - API error
- Error Code handling

`throw new Error("Password required!");`

## 447. Defining Custom Error Handlers
`app.use()` that have 4 parameters would automatically become a default error handler.
```js
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
  next(err)
})
```

## 448. Error Class
Error code example:
- 400 Bad request -> Client error
- 401 Unauthorized
- 403 Forbidden
- 404
- 405 Method not allowed
- 406 Not Acceptable
- 407 Proxy Authentication Required
- 408 Request timeout -> Server send termination of connection warning
- 409 Conflict -> State conflict
- 410 Gone -> Recommendation to delete association of client and server

How we customize express handle error:
- `app.<method>` would throw error with status code
  - preferably **make own error `class`**
    - on different files and export, then import to router
- catch at last by the `app.use` error handler
  - Access **error** status via `const {status} = err`
  - Access **message** status via `const {status} = err`
  - Default: `const { message = "Something went wrong", status = 500 } = err;`

## 449. & 450. Handling Async Errors & More
- Send back error not found from database `return next(new AppError(...))`
- Try catch error from mongoose

## 451. Making wrapAsync function (async utility)
- Manually we try and catch
- But we can just wrap an async and automatically throw it 
  - For syntactic sugar 

```js
function wrapAsync(fn) {
	return function (req, res, next) {
		fn(req, res, next).catch((e) => next(e));
	};
}
```

# 452. Differentiating Mongoose Errors
- ValidationError
- CastError

Ways to handle error in mongoose:
- Handle error name differently in express
- Custom error message in mongoose