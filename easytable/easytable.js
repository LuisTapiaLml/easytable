function EasyTable({
    data = [],
    headers = [],
    pagination = Boolean,
    numRows = 10,
    fetchPagination = Boolean,
    upDateDataFunc = null,
    clases = []
    
} = {}) {

    this.data = data;
    this.headers = headers;
    this.pagination = pagination;
    this.clases = clases;
    
    this.elTable = HTMLElement;
    this.elTbody = HTMLElement;
    this.elPagination = HTMLElement ;

    this.numRowsPerPage = numRows;
    this.pages = [];
    this.currentPage = 0;
    this.numPages = 0;

    this.init();

    return this;
}



EasyTable.prototype.init = function () {

    this.elTable = document.createElement('table');

    const thead = document.createElement('thead');

    this.elTbody = document.createElement('tbody');

    this.elTable.append(thead);

    this.elTable.append(this.elTbody);

    if (this.clases.length !== 0) {
        this.elTable.classList.add(...this.clases);
    }

    this.render_headers();

    this.load_data();
}


EasyTable.prototype.render_headers = function () {

    if (this.headers.length === 0) {
        throw new Error('header must not be an empty array');
    }

    const tr = document.createElement('tr');


    this.headers.forEach(header => {

        const th = document.createElement('th');

        th.innerText = header.name;

        tr.append(th);
    });

    this.elTable.querySelector('thead').append(tr);
}


EasyTable.prototype.load_data = function () {
    
    this.pages = [] ;

    if (this.data.length === 0) {
        throw new Error('data is empty')
    }

    this.numPages = Math.ceil( this.data.length / this.numRowsPerPage);

    let i, j

    for (i = 0, j = this.data.length; i < j; i += this.numRowsPerPage) {

        this.pages.push( this.data.slice(i, i + this.numRowsPerPage ) ); 
        
    }

    this.render_page();
}


EasyTable.prototype.upDateData = function (data){

    this.data = data ;

    this.load_data();
}

EasyTable.prototype.render_page = function( page = this.currentPage ) {

    this.elTbody.innerHTML = ``;

    if( page > this.pages.length || page < 0  ){
        throw new Error("This page doesn't exist");
    }    

    const dataToRender = this.pages[page];

    dataToRender.forEach( data => {

        const tr = document.createElement('tr');

        this.headers.forEach( header => {

            const td =  document.createElement('td');

            if ('custom' in header){
            
                const elementToAppend =  header.custom(data);

                if( typeof( elementToAppend ) === 'string' ){
                
                    td.innerHTML = elementToAppend ;
                
                }else if( typeof( elementToAppend ) === 'object' ){

                    td.append( elementToAppend );
                    
                }
                
            }else{

                td.innerText =  data[header.nameToMatch];
            
            }

            tr.append(td);

        });

        this.elTbody.append( tr );

    });

}


EasyTable.prototype.render = function () {
    
    const main_container = document.createElement('div');

    main_container.classList.add('easy-table-wrap');

    main_container.append(this.elTable);

    this.render_pagination();

    return main_container;
}


EasyTable.prototype.render_pagination = function (){

    this.elPagination =  document.createElement('div');

    this.elPagination.classList.add('easy-table-pagination-wrapper');
    
    const previous_buttton =  document.createElement('button');
    const next_button =  document.createElement('button');

    previous_buttton.classList.add('easy-table-pagination-previous-button');
    previous_buttton.classList.add('easy-table-pagination-next-button');
    

    

}