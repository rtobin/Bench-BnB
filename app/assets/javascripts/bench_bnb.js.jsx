$(function () {
  // var Router = ReactRouter.Router;
  // var Route = ReactRouter.Route;
  // var IndexRoute = ReactRouter.IndexRoute;

  var rootEl = document.getElementById('content');

  React.render((

    <Search />
    // <Router>
    //   <Route path="/" component={Search}>
    //     <Route path="benches/:benchId" component={onDetail} />
    //
    //   </Route>
    // </Router>
  ), rootEl);
});
