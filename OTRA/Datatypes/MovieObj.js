module.exports={
    MovieSearchItemDto,
    MovieSearchDto
}

function MovieSearchItemDto(obj) {
    this.title = obj.title
    this.id = obj.id
    this.releaseDate = obj.release_date
    this.voteAverage = obj.vote_average
    //caso a imagem não exista colocar uma imagem 'no image'
    this.img = obj.poster_path == undefined? 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/No_image_3x4.svg/1024px-No_image_3x4.svg.png'
        :'https://image.tmdb.org/t/p/w500'+ obj.poster_path
    this.toString = function (){

    }

}




function MovieSearchDto(obj) {
    this.results = []
    this.currPage = obj.page
    this.prev = (this.currPage - 1);
    this.next = (this.currPage + 1);
    this.numPages = obj.total_pages
    var result = obj.results
    if(result!=undefined){
        result.forEach(element => {
            this.results.push(new MovieSearchItemDto(element))
        })
    }


}

