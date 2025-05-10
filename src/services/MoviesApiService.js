const BASE_URL = "https://api.themoviedb.org/3/discover/movie";
const BEARER_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMDY2MWEyMDZlODQ0ZDYxZTAwNzdjNmRiYzc1NjcyMyIsIm5iZiI6MTc0NjkwMDIyMC43ODEsInN1YiI6IjY4MWY5NGZjZDEzMGIyZmM2ZDVhMjJiMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6ReAPZAMvY3XTQVCJpk2Q6e6xQAfGAvBxkeS5jnmQec";

export default class MoviesApiService {
  constructor() {
    this.currentPage = 1;
    this.totalPages = 1;
    this.submittedObj = {};
  }

  async getData(submittedObj) {
    this.submittedObj = submittedObj;
    this.currentPage = 1;
    return this.fetchMovies();
  }

  async getNext() {
    if (this.hasNext()) {
      this.currentPage += 1;
      return this.fetchMovies();
    }
    return [];
  }

  async getPrev() {
    if (this.hasPrev()) {
      this.currentPage -= 1;
      return this.fetchMovies();
    }
    return [];
  }

  hasNext() {
    return this.currentPage < this.totalPages;
  }

  hasPrev() {
    return this.currentPage > 1;
  }

  getFormStructureObject() {
    return [
      {
        name: "year",
        type: "number",
        min: 1890,
        max: new Date().getFullYear(),
      },
    ];
  }

  async fetchMovies() {
    const { year } = this.submittedObj;
    const url = `${BASE_URL}?include_adult=false&include_video=false&language=en-US&sort_by=popularity.desc&page=${this.currentPage}&primary_release_year=${year}`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${BEARER_TOKEN}`,
      },
    };

    const resp = await fetch(url, options);
    if (!resp.ok) {
      throw new Error(await resp.text());
    }

    const data = await resp.json();
    console.log(data);
    
    this.totalPages = data.total_pages;
    return data.results.map(movie => ({
      thumbnailTitle: movie.title,
      thumbnailImg: movie.poster_path
        ? `https://image.tmdb.org/t/p/w200${movie.poster_path}f`
        : "../../images/noImage.webp",
      detailedImg: movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}f`
        : "../../images/noImage.webp",
      detailedTitle: movie.overview || "No description available",
    }));
  }
}