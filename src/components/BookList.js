import React, {Component} from 'react';
import {graphql} from 'react-apollo'
import {getBooksQuery} from '../queries/queries'

class BookList extends Component {
  displayBooks(){
    const data = this.props.data
    return data.loading ? (<li>Loading books...</li>)
                        : (data.books.map(book => (<li key={book.id}>{book.name}</li>)))
  }

  render() {
    return (
      <div>
          <ul id="book-list">
              {this.displayBooks()}
          </ul>
      </div>
    );
  }
}

export default graphql(getBooksQuery)(BookList);