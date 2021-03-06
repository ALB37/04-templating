'use strict';

let articles = [];

function Article (rawDataObj) {
  this.author = rawDataObj.author;
  this.authorUrl = rawDataObj.authorUrl;
  this.title = rawDataObj.title;
  this.category = rawDataObj.category;
  this.body = rawDataObj.body;
  this.publishedOn = rawDataObj.publishedOn;
}

Article.prototype.toHtml = function() {
  // DONE: Use Handlebars to render your articles. Get your template from the DOM and "compile" your template with Handlebars.
  let source   = $('#entry-template').html();
  let template = Handlebars.compile(source);

  // REVIEWED: If your template will use properties that aren't on the object yet, add them.
  // Since your template can't hold any JS logic, we need to execute the logic here.
  // The result is added to the object as a new property, which can then be referenced by key in the template.
  // For example, you might want to display how old a post is, or say "(draft)" if it has no publication date:
  this.daysAgo = parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000);
  this.publishStatus = this.publishedOn ? `published ${this.daysAgo} days ago` : '(draft)';

  // DONE: Use the method that Handlebars gave you to return your filled-in html template for THIS article.
  return template(this);

};

// COMMENTED: Why are there parentheses around "(a,b)" in the .sort() method, but not around the "articleObject" or "article" arguments in the .forEach() methods?
// The a and b are parameters in the sort method. "articleObject" and "article" are arbitrary names passed as arguments which represent the elements which the forEach function is looping over in the RawData and articles arrays. Since there is only one argument on the latter two functions, thier argument list does not have to be surrounded by a set of parenthesis.

rawData.sort((a,b) => {
  return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
});

rawData.forEach(articleObject => {
  articles.push(new Article(articleObject));
});

articles.forEach(article => {
  $('#articles').append(article.toHtml());
});
