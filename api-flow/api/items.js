let items = [];

module.exports = (app, rutaitems) => {

  // api/pub/items
  app.route(rutaitems)
    .get((req, res) => {
      if (items && items.length > 0)
        res.json(items);
      else
        res.status(204).send();
    })
    .post((req, res) => {
      let nuevoItem = req.body
      nuevoItem._id = new Date().getTime().toString();
      items.push(nuevoItem)
      res.status(201).json(nuevoItem);
    })
    .delete((req, res) => {
      items = [];
      res.status(204).send();
    });
  // // api/pub/items/159
  app.route(`${rutaitems}/:id`)
    .get((req, res) => {
      let itemsFound = getItemById(req.params.id);
      if (itemsFound && itemsFound.length > 0)
        res.json(itemsFound[0]);
      else
        res.status(404).send();
    })
    .put((req, res) => {
      let itemsFound = getItemById(req.params.id);
      if (itemsFound && itemsFound.length > 0) {
        itemsFound[0] = req.body;
        res.json(itemsFound[0]);
      } else {
        res.status(404).send();
      }

    })
    .delete((req, res) => {
      let itemsFound = getItemById(req.params.id);
      if (itemsFound && itemsFound.length > 0) {
        items.splice(req.params.id, 1)
        res.status(204).send();
      } else {
        res.status(404).send();
      }
    });


  var getItemById = (id) => items.filter(i => i._id == id);


  var resError = (err, res) => {
    console.error(err);
    res.status(500).send(err);
  }
}