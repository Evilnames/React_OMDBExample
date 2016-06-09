var MovieContainer = React.createClass({
	getInitialState : function(){
		return{
			Search : []
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
		}.bind(this))
	},
	render : function(){
		return (
			<div>
				<input type="text" id="searchForMovie" onChange={this.handleMovieSearch} />
				<MovieList results={this.state.Search} />
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
		var movies = this.props.results.map(function(movie){
			var moviePoster = (movie.Poster !== 'N/A') ? <img src={movie.Poster} /> : ''; 
			return(
				<li id={movie.imdbId}>
					{moviePoster}
					 <br/> {movie.Title} - ({movie.Year}) 
					
				</li>
			)
			;
		});

		return (
			<div>
				<h3>Movies Found</h3>
				<ul>
					{movies}
				</ul>
			</div>
		)
	}
})

//Renders the dom.
ReactDOM.render(
	<MovieContainer />,
	document.getElementById('movies')
);