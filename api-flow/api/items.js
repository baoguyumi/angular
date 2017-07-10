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
      const nuevoItem = req.body
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
      const index = getIndexById(req.params.id);
      if (index)
        res.json(items[index]);
      else
        res.status(404).send();
    })
    .put((req, res) => {
      const index = getIndexById(req.params.id);
      if (index) {
        items[index] = req.body;
        res.json(items[index]);
      } else {
        res.status(404).send();
      }

    })
    .delete((req, res) => {
      const index = getIndexById(req.params.id);
      if (index) {
        items.splice(index, 1)
        res.status(204).send();
      } else {
        res.status(404).send();
      }
    });


  var getIndexById = (id) => items.findIndex(i => i._id == id);


  var resError = (err, res) => {
    console.error(err);
    res.status(500).send(err);
  }
}