var MovieContainer = React.createClass({
	getInitialState : function(){
		return{
			Search : [],
			SelectedMovie : {}
		}
	},
	handleMovieSearch : function(e){
		$.ajax({
			url : 'http://www.omdbapi.com/?s='+ e.target.value +'&y=&plot=short&r=json',
			method : 'get',
			crossDomain:true
		}).done(function(data){
			if(this.isMounted()){
				this.setState({
					Search : data.Search
				})
			}
		}.bind(this));
	},
	handleSelectedMovie : function(imdbID){
		$.ajax({
			url : 'http://www.omdbapi.com/?i='+ imdbID +'&y=&plot=short&r=json',
			method : 'get',
			crossDomain:true
		}).done(function(data){
			console.log(data)
			if(this.isMounted()){
				this.setState({
					SelectedMovie : data
				})
			}
		}.bind(this));
	},
	render : function(){
		return (
			<div>
				<div class="movieSearchBar">
					<input type="text" id="searchForMovie" onChange={this.handleMovieSearch} />
				</div>
				<div className="movieListArea">
					<MovieList results={this.state.Search} drillDownResult={this.handleSelectedMovie} />
				</div>
				<div className="selectedMovieArea">
					<SelectedMovie selectedMovie={this.state.SelectedMovie} />
				</div>
			</div>
		)
	}
});

//Renders the movie list.
var MovieList = React.createClass({
	getDefaultProps : function(){
		return {
			results : []
		}
	},
	render : function(){
		var _this = this;
		var movies = this.props.results.map(function(movie){
			return(
				<MoviePoster movie={movie} clickAction = {_this.props.drillDownResult} />
			)
		});

		return (
			<div>
				<ul className="movieSearchResultHolder">
					{movies}
				</ul>
			</div>
		)
	}
});

var MoviePoster = React.createClass({
	handleOnClick : function(e){
		 this.props.clickAction(this.props.movie.imdbID);
	},
	render : function(){
		var moviePoster = (this.props.movie.Poster !== 'N/A') ? <img className="MoviePoster"  src={this.props.movie.Poster} /> : ''; 
		return (
			<li onClick={this.handleOnClick}>
				{moviePoster}
				 <br/> {this.props.movie.Title} - ({this.props.movie.Year}) 
			</li>
		)
	}
});

var SelectedMovie = React.createClass({
	render : function(){
		var moviePoster = (this.props.selectedMovie.Poster !== 'N/A') ? <img  src={this.props.selectedMovie.Poster} /> : ''; 
		
		return (
			<div>
				Detail
				<h1>{this.props.selectedMovie.Title}</h1>
				{moviePoster}
				<h4>Awards</h4>
				<p>{this.props.selectedMovie.Awards}</p>

			</div>
		)
	}
});

//Renders the dom.
ReactDOM.render(
	<MovieContainer />,
	document.getElementById('movies')
);