# Sumo Survey Code Challenge


## API

**Users**
- Create - `POST /users`

**Survey**
- Show - `GET /survey`

**Questions**
- List - `GET /questions`
- Create - `POST /questions`
- Update - `PATCH /questions/:id`
- Delete - `DELETE /questions/id`

**Answer**
- List - `GET /questions/:id/answers`
- Create - `POST /questions/:id/answers`
- Update - `PATCH /questions/:id/answers/:aid`
- Delete - `DELETE /questions/id/answers/:aid`


### Error response format
```js
{
  message: "I am an error message",
  name: "I am the param/field name causing this error", // Optional
  value: "I am the value that was sent" // Optional
}
```
