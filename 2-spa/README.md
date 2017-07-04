```
 npm start

 // basic
 ng g m routes/home
 ng g c routes/home/home --flat --export
 
 // delegated
 ng g m routes/about --routing
 ng g c routes/about/about --flat

 // lazy
 ng g m routes/operations --routing
 ng g c routes/operations/operations --flat

 // nested
 ng g c routes/operations/new
 ng g c routes/operations/list

 // params
 ng g c routes/operations/item

```