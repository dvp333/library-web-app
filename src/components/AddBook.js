import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { compose } from 'recompose'
import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../queries/queries'

class AddBook extends Component {

    constructor ( props ) {
        super (props)
        this.state = {
            name: '',
            genre: '',
            authorId: '-1'
        }
    }

    displayAuthors () {
        const data = this.props.getAuthorsQuery
        return data.loading ? (<option disabled>Loading authors...</option>)
                            : (data.authors.map(author => (<option key={author.id} value={author.id}>{author.name}</option>)))
    }

    submitForm (e) {
        e.preventDefault()
        this.props.addBookMutation({
            variables: {
                name: this.state.name,
                genre: this.state.genre,
                authorId: this.state.authorId
            },
            refetchQueries: [{query: getBooksQuery}]
        })
    }

    render () {
        return (
            <form id="add-book" onSubmit={this.submitForm.bind(this)}>

                <div className="field">
                    <label>Book name:</label>
                    <input type="text" onChange={(e) => this.setState({name: e.target.value})}/>
                </div>

                <div className="field">
                    <label>Genre:</label>
                    <input type="text" onChange={(e) => this.setState({genre: e.target.value})}/>
                </div>

                <div className="field">
                    <label>Author:</label>
                    <select  onChange={(e) => this.setState({authorId: e.target.value})}>
                        <option value="-1">Select author</option>
                        {this.displayAuthors()}
                    </select>
                </div>

                <button>+</button>

            </form>
        )
    }

}

export default compose(
    graphql(getAuthorsQuery, {name: "getAuthorsQuery"}),
    graphql(addBookMutation, {name: "addBookMutation"})
)(AddBook)