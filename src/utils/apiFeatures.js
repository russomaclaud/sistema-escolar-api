class APIFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    search() {
        const keyword = this.queryStr.keyword
            ? {
                  nombre: {
                      $regex: this.queryStr.keyword,
                      $options: 'i',
                  },
              }
            : {};

        // console.log(keyword);

        this.query = this.query.find({ ...keyword });
        return this;
    }

    filter() {
        const queryCopy = { ...this.queryStr };

        // console.log(queryCopy);

        // Removing fields from the query
        const removeFields = ['keyword', 'limit', 'page'];

        removeFields.forEach((el) => delete queryCopy[el]);

        // console.log(queryCopy);

        // Filter Avanzado para edad, votos, likes o faltas etc mayor a o menor a:
        // ejemplo en postman en la url ?keyword=estudiantes&edad[gte]=15&edad[lte]=25 devuelve {edad: {gte: '18', lte:'25'}}
        let queryStr = JSON.stringify(queryCopy);

        queryStr = queryStr.replace(
            /\b(gt|gte|lt|lte)\b/g,
            (match) => `$${match}`
        );

        // console.log(queryStr);

        this.query = this.query.find(JSON.parse(queryStr));
        return this;
    }

    pagination(resultPorPage) {
        const currentPage = Number(this.queryStr.page) || 1;
        const skip = resultPorPage * (currentPage - 1);

        this.query = this.query.limit(resultPorPage).skip(skip);

        return this;
    }
}

module.exports = APIFeatures;
