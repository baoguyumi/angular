let items = [];

module.exports = (app, url) => {

  // api/priv/operations
  app.route(url)
    .get((req, res) => {
      if (items && items.length > 0)
        res.json(items);
      else
        res.status(204).send();
    })
    .post((req, res) => {
      const item = req.body
      item._id = new Date().getTime().toString();
      item.owner = req.user;
      items.push(item)
      res.status(201).json(item);
    })
    .delete((req, res) => {
      items = [];
      res.status(204).send();
    });
  // // api/priv/operations/159
  app.route(`${url}/:id`)
    .get((req, res) => {
      const index = getIndexByOwnerId(req.user, req.params.id);
      if (index)
        res.json(items[index]);
      else
        res.status(404).send();
    })
    .put((req, res) => {
      const index = getIndexByOwnerId(req.user, req.params.id);
      if (index) {
        items[index] = req.body;
        res.json(items[index]);
      } else {
        res.status(404).send();
      }

    })
    .delete((req, res) => {
      const index = getIndexByOwnerId(req.user, req.params.id);
      if (index) {
        items.splice(index, 1)
        res.status(204).send();
      } else {
        res.status(404).send();
      }
    });

  var getIndexByOwnerId = (owner, id) => items.findIndex(i => i.owner == owner && i._id == id);

}