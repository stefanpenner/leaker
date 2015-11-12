import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    let posts = [];
    let i = 0;
    while(i < 100) {
      posts.push(Ember.Object.create({name:"Test" + i}));
      i++;
    }
    return posts;
  }
});
