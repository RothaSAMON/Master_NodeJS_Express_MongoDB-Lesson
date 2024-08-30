class APIFeatures {
  //constructor function and remember that this is the function that gets automatically called as soon as we create a new object out of this class
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const queryObj = { ...this.queryString };
    const excluderFields = ['page', 'sort', 'limit', 'fields'];
    excluderFields.forEach((el) => delete queryObj[el]);

    // 1B) Advanced filtering
    let queryStr = JSON.stringify(queryObj);
    //And so the regular expression to find one of these four words goes like this
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`); //And then we also need to add this \b before and after, and that's because we only want to match these exact words. and that is this g flag here which means that it will actually happen multiple times.

    // console.log(req.query, queryObj);
    //where when we wanted to query for all the documents, we simply used find()

    //So what would the filter object actually look like?
    // { difficulty: 'easy', duration: { Sgte: 5 } }
    // gte, gt, lte, lt

    this.query = this.query.find(JSON.parse(queryStr));
    //let query = Tour.find(JSON.parse(queryStr));

    return this; //return "this" and this is simply the entire object
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt'); //were added at different times, then they would now be ordered by the date they were created.
    }
    return this; //return "this" and this is simply the entire object
  }

  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }
    return this; //return "this" and this is simply the entire object
  }

  paginate() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 100;
    const skip = (page - 1) * limit; //this number here is all the results that come before the page that we're actually requesting now.
    //page=2&limit=10 (page 1 = 1-10, page 2 = 11-20, page 3 = 21-30)
    this.query = this.query.skip(skip).limit(limit); //and so this limit here is actually exactly the same as the limit that we defined in the query string.

    return this; //return "this" and this is simply the entire object
  }
}

module.exports = APIFeatures;
