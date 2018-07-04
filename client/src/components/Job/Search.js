import React from 'react';

const Search = () => (

    <div div className="Search">
    <form className="form" onSubmit= {event => this.handleSubmit(event)}>
       <input type="text" name="search" placeholder="Enter Search Text"/>
       <button type="submit"  className="button-primary">Submit</button>
               
   </form>    
   
   
   </div>
);


export default Search;